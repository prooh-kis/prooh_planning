import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { message } from "antd";

import { addDetailsToCreateCampaign, getMyCreateCampaignsListForPlan } from "../../actions/campaignAction";
import { NoDataView } from "../../components/molecules/NoDataView";
import { SearchInputField } from "../../components";
import { CampaignsListModel } from "../../components/molecules/CampaignsListModel";
import { LoadingScreen } from "../../components/molecules/LoadingScreen";

import { CAMPAIGN_PLANNER, SCREEN_OWNER } from "../../constants/userConstants";
import { getCampaignPageNameFromCampaignType } from "../../utils/campaignUtils";

export const MyPlansListPage: React.FC = () => {
  const dispatch = useDispatch<any>();
  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState("");

  const { userInfo } = useSelector((state: any) => state.auth);
  const {
    loading,
    error,
    data: campaignsList,
  } = useSelector((state: any) => state.myCreateCampaignsListForPlanGet);

  const { success, data: campaignDetails } = useSelector(
    (state: any) => state.detailsToCreateCampaignAdd
  );

  useEffect(() => {
    if (!userInfo) return navigate("/auth");

    if (![CAMPAIGN_PLANNER, SCREEN_OWNER].includes(userInfo?.userRole)) {
      message.error("You have no access to this page");
      return navigate("/auth");
    }

    if (userInfo?.userRole === CAMPAIGN_PLANNER) {
      dispatch(getMyCreateCampaignsListForPlan({ id: userInfo._id }));
    }

    if (success) {
      const pageName = getCampaignPageNameFromCampaignType(campaignDetails?.campaignType);
      navigate(`/${pageName}/${campaignDetails._id}/view`, {
        state: { from: "planlist" }
      });
    }
  }, [dispatch, navigate, userInfo, success, campaignDetails]);

  const filteredCampaigns = campaignsList?.filter(
    (campaign: any) =>
      campaign?.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      campaign?.brandName?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCampaignClick = (data: any) => {
    dispatch(addDetailsToCreateCampaign({ id: data?._id }));

  };

  return (
    <div className="w-full h-full bg-gray-100 p-4">
      {/* Header */}
      <div className="flex items-center gap-2 border-b pb-2">
        <i className="fi fi-sr-megaphone text-blue-500 text-xl"></i>
        <h1 className="text-lg font-semibold text-primaryText">
          My Plans List
        </h1>
      </div>

      {/* Search Input */}
      <div className="mt-4">
        <SearchInputField
          value={searchQuery}
          onChange={setSearchQuery}
          placeholder="Search by campaign name or brand"
        />
      </div>

      {/* Campaign List */}
      <div className="mt-4 h-[70vh] overflow-y-auto no-scrollbar rounded-lg">
        {loading ? (
          <LoadingScreen />
        ) : filteredCampaigns?.length === 0 ? (
          <NoDataView />
        ) : (
          filteredCampaigns?.map((data: any) => (
            <div
              key={data._id}
              className="cursor-pointer"
              onClick={() => handleCampaignClick(data)}
            >
              <CampaignsListModel data={data} />
            </div>
          ))
        )}
      </div>
    </div>
  );
};

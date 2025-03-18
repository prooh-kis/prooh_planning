import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { message } from "antd";
import { getMyCreateCampaignsListForPlan } from "../../actions/campaignAction";
import { NoDataView } from "../../components/molecules/NoDataView";
import { SearchInputField } from "../../components";
import { LoadingScreen } from "../../components/molecules/LoadingScreen";
import { CAMPAIGN_PLANNER, SCREEN_OWNER } from "../../constants/userConstants";
import { getCampaignPageNameFromCampaignType } from "../../utils/campaignUtils";
import { CampaignCardForPlan } from "../../components/molecules/CampaignCardForPlan";

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
  }, [dispatch, navigate, userInfo, campaignDetails]);

  const filteredCampaigns = campaignsList?.filter(
    (campaign: any) =>
      campaign?.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      campaign?.brandName?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCampaignClick = (data: any) => {
    const pageName = getCampaignPageNameFromCampaignType(data?.campaignType);
    navigate(`/${pageName}/${data._id}/view`, {
      state: { from: "planlist" },
    });
  };

  const handleEdit = (data: any) => {
    const pageName = getCampaignPageNameFromCampaignType(data?.campaignType);
    navigate(`/${pageName}/${data._id}/edit`, {
      state: { from: "planlist" },
    });
  };

  return (
    <div className="w-full h-full p-4">
      {/* Header */}
      <div className="flex items-center gap-2 border-b pb-2">
        <i className="fi fi-sr-megaphone text-[#3F3CBB80] text-[14px] flex items-center justify-center"></i>
        <h1 className="text-lg font-semibold text-primaryText">
          My Plans List
        </h1>
      </div>

      {/* Search Input */}
      <div className="mt-4 w-full">
        <SearchInputField
          value={searchQuery}
          onChange={setSearchQuery}
          placeholder="Search by campaign name or brand"
        />
      </div>

      {/* Campaign List */}
      <div className="mt-2 h-[80vh] overflow-y-auto no-scrollbar rounded-lg flex flex-col gap-4">
        {loading ? (
          <LoadingScreen />
        ) : filteredCampaigns?.length === 0 ? (
          <NoDataView />
        ) : (
          filteredCampaigns?.map((data: any) => (
            <div
              key={data._id}
              className="cursor-pointer"
              onDoubleClick={() => handleCampaignClick(data)}
            >
              <CampaignCardForPlan data={data} handleEdit={handleEdit} />
            </div>
          ))
        )}
      </div>
    </div>
  );
};

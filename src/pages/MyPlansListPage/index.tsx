import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { message } from "antd";

import { getMyCreateCampaignsListForPlan } from "../../actions/campaignAction";
import { NoDataView } from "../../components/molecules/NoDataView";
import { SearchInputField } from "../../components";
import { CampaignsListModel } from "../../components/molecules/CampaignsListModel";
import { LoadingScreen } from "../../components/molecules/LoadingScreen";

import { CAMPAIGN_PLANNER, SCREEN_OWNER } from "../../constants/userConstants";
import { getCampaignPageNameFromCampaignType } from "../../utils/campaignUtils";

export const MyPlansListPage: React.FC = () => {
  const dispatch = useDispatch<any>();
  const navigate = useNavigate();

  // State to manage search input
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Getting userInfo from Redux
  const { userInfo } = useSelector((state: any) => state.auth);

  // Getting campaign list from Redux
  const {
    loading: loadingCampaignsListForPlan,
    error: errorCampaignsListForPlan,
    data: campaignsListForPlan,
  } = useSelector((state: any) => state.myCreateCampaignsListForPlanGet);

  // Handle user access and fetch data
  useEffect(() => {
    if (!userInfo) {
      navigate("/auth");
    }

    if (
      userInfo?.userRole !== CAMPAIGN_PLANNER &&
      userInfo?.userRole !== SCREEN_OWNER
    ) {
      message.error("You have no access to this page");
      navigate("/auth");
      return;
    }

    if (userInfo?.userRole === CAMPAIGN_PLANNER) {
      dispatch(getMyCreateCampaignsListForPlan({ id: userInfo?._id }));
    }
  }, [dispatch, navigate, userInfo]);

  // Handle search functionality
  const filteredCampaigns = campaignsListForPlan?.filter(
    (campaign: any) =>
      campaign?.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      campaign?.brandName?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Handle campaign card click
  const handleCampaignClick = (data: any) => {
    const pageName = getCampaignPageNameFromCampaignType(data?.campaignType);
    navigate(`/${pageName}/${data._id}`);
  };

  return (
    <div className="w-full h-full mt-8 bg-[#F5F5F5]">
      {/* Header */}
      <div className="flex justify-between border-b py-2 bg-[#FFFFFF]">
        <div className="flex gap-2 items-center">
          <i className="fi fi-sr-megaphone flex items-center text-[#129BFF]"></i>
          <h1 className="text-[18px] text-primaryText font-semibold">
            My Plans List
          </h1>
        </div>
      </div>

      {/* Search Input */}
      <div className="w-full p-2 bg-[#D7D7D750]">
        <div className="grid grid-cols-8 gap-2">
          <div className="col-span-8">
            <SearchInputField
              value={searchQuery}
              onChange={setSearchQuery}
              placeholder="Search Campaign by campaign name or brand"
            />
          </div>
        </div>

        {/* Campaign List */}
        <div className="overflow-y-scroll no-scrollbar h-[80vh] my-1 rounded-[12px]">
          {loadingCampaignsListForPlan ? (
            <LoadingScreen />
          ) : filteredCampaigns?.length === 0 ? (
            <NoDataView />
          ) : (
            filteredCampaigns?.map((data: any, i: number) => (
              <div
                key={i}
                className="pointer-cursor"
                onClick={() => handleCampaignClick(data)}
              >
                <CampaignsListModel data={data} />
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

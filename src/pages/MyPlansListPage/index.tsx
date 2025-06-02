import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { message } from "antd";
import { getMyCreateCampaignsListForPlan } from "../../actions/campaignAction";
import { NoDataView } from "../../components/molecules/NoDataView";
import { ReloadButton, SearchInputField } from "../../components";
import { LoadingScreen } from "../../components/molecules/LoadingScreen";
import {
  CAMPAIGN_MANAGER,
  CAMPAIGN_PLANNER,
} from "../../constants/userConstants";
import { getCampaignPageNameFromCampaignType } from "../../utils/campaignUtils";
import { CampaignCardForPlan } from "../../components/molecules/CampaignCardForPlan";
import {
  EDIT_CAMPAIGN,
  VIEW_CAMPAIGN,
} from "../../constants/campaignConstants";
import { removeAllKeyFromLocalStorage } from "../../utils/localStorageUtils";

export const MyPlansListPage: React.FC = () => {
  const dispatch = useDispatch<any>();
  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState("");
  const targetDivRef = useRef(null);
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

    if (
      userInfo?.userRole === CAMPAIGN_PLANNER ||
      userInfo?.userRole === CAMPAIGN_MANAGER
    ) {
      removeAllKeyFromLocalStorage();
      dispatch(getMyCreateCampaignsListForPlan({ id: userInfo._id }));
    } else {
      message.error("You have no access to this page");
      return navigate("/auth");
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
      state: { from: VIEW_CAMPAIGN },
    });
  };

  const handleEdit = (data: any) => {
    const pageName = getCampaignPageNameFromCampaignType(data?.campaignType);
    navigate(`/${pageName}/${data._id}/edit`, {
      state: { from: EDIT_CAMPAIGN },
    });
  };

  const reset = () => {
    dispatch(getMyCreateCampaignsListForPlan({ id: userInfo._id }));
  };

  return (
    <div className="w-full">
      <div className="bg-white w-auto rounded-[4px] mr-2">
        <div className="flex justify-between pr-8 border-b">
          <div className="flex gap-4 items-center p-4 ">
            <i className="fi fi-sr-megaphone flex items-center justify-center text-[#8B5CF680]"></i>
            <h1 className="text-[16px] font-semibold">
              My Plans List{" "}
              <span className="text-[14px] text-[#68879C] ">
                ({filteredCampaigns?.length})
              </span>
            </h1>
            <ReloadButton onClick={reset} />
          </div>
          <div className="flex items-center mt-1 w-96">
            <SearchInputField
              value={searchQuery}
              onChange={setSearchQuery}
              placeholder="Search Campaign by campaign name or brand"
            />
          </div>
        </div>
      </div>
      <div className="mt-2">
        {loading ? (
          <LoadingScreen />
        ) : filteredCampaigns?.length === 0 ? (
          <NoDataView />
        ) : (
          <div
            className="h-[80vh] overflow-y-auto scrollbar-minimal  pr-2 rounded-lg flex flex-col gap-2"
            ref={targetDivRef}
          >
            {filteredCampaigns?.map((data: any, index: any) => (
              <div
                key={data._id}
                className="cursor-pointer"
                onDoubleClick={() => handleCampaignClick(data)}
              >
                <CampaignCardForPlan data={data} handleEdit={handleEdit} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

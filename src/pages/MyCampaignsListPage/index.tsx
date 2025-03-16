import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  getMyCreateCampaignsList,
  getMyCreateCampaignsManagerRequestsList,
  getMyCreateCampaignsVendorRequestsList,
} from "../../actions/campaignAction";
import {
  CAMPAIGN_MANAGER,
  CAMPAIGN_PLANNER,
  SCREEN_OWNER,
} from "../../constants/userConstants";
import { SearchInputField, TabWithoutIcon } from "../../components/index";

import { CampaignsListModel } from "../../components/molecules/CampaignsListModel";
import { NoDataView } from "../../components/molecules/NoDataView";
import { LoadingScreen } from "../../components/molecules/LoadingScreen";

const allTabs = [
  {
    id: "1",
    label: "Active",
  },
  {
    id: "2",
    label: "Completed",
  },
];

export const MyCampaignsListPage: React.FC = () => {
  const dispatch = useDispatch<any>();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState<any>("");
  const targetDivRef = useRef<HTMLDivElement>(null);
  const [currentTab, setCurrentTab] = useState<any>("1");

  const auth = useSelector((state: any) => state.auth);
  const { userInfo } = auth;

  const myCreateCampaignsListGet = useSelector(
    (state: any) => state.myCreateCampaignsListGet
  );
  const {
    loading: loadingCampaignsList,
    error: errorCampaignsList,
    data: campaignsList,
  } = myCreateCampaignsListGet;

  const myCreateCampaignsVendorRequestsListGet = useSelector(
    (state: any) => state.myCreateCampaignsVendorRequestsListGet
  );
  const {
    loading: loadingVendorList,
    error: errorVendorList,
    data: vendorCampaignsList,
  } = myCreateCampaignsVendorRequestsListGet;

  const myCreateCampaignsManagerRequestsListGet = useSelector(
    (state: any) => state.myCreateCampaignsManagerRequestsListGet
  );
  const {
    loading: loadingManagerRequestsList,
    error: errorManagerRequestsList,
    data: clientRequestsList,
  } = myCreateCampaignsManagerRequestsListGet;

  const loading =
    loadingManagerRequestsList || loadingVendorList || loadingCampaignsList;

  useEffect(() => {
    if (
      userInfo?.userRole === CAMPAIGN_PLANNER ||
      userInfo?.userRole === CAMPAIGN_MANAGER
    ) {
      if (currentTab === "1") {
        dispatch(
          getMyCreateCampaignsList({ id: userInfo?._id, type: "Active" })
        );
      }
      if (currentTab === "2") {
        dispatch(
          getMyCreateCampaignsList({ id: userInfo?._id, type: "Completed" })
        );
      }
    }
  }, [userInfo, currentTab]);

  useEffect(() => {
    if (!userInfo) {
      navigate("/login");
    }

    if (userInfo?.isMaster) {
      dispatch(
        getMyCreateCampaignsVendorRequestsList({
          id: userInfo?._id,
          status: "Active",
        })
      );
    }
    if (userInfo?.userRole === SCREEN_OWNER) {
      dispatch(
        getMyCreateCampaignsManagerRequestsList({
          id: userInfo?._id,
          type: "complete",
        })
      );
    }
  }, [dispatch, navigate, userInfo]);

  const campaignList =
    userInfo?.userRole === CAMPAIGN_PLANNER ||
    userInfo?.userRole === CAMPAIGN_MANAGER
      ? campaignsList
      : userInfo?.isBrand && userInfo?.userRole === SCREEN_OWNER
      ? clientRequestsList
      : userInfo?.isMaster
      ? vendorCampaignsList?.campaigns
      : [];

  const filteredCampaigns = campaignList?.filter(
    (campaign: any) =>
      campaign?.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      campaign?.brandName?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="w-full p-4">
      <div className="flex justify-between border-b pb-2">
        <div className="flex gap-2 items-center">
          <i className="fi fi-sr-megaphone flex items-center justify-center text-[14px] text-[#129BFF]"></i>
          <h1 className="text-[18px] text-primaryText font-semibold">
            My Campaign Plans
          </h1>
        </div>
      </div>
      <div className="px-2">
        <TabWithoutIcon
          currentTab={currentTab}
          setCurrentTab={setCurrentTab}
          tabData={allTabs}
        />
      </div>

      <div className="w-full p-2">
        <div className="grid grid-cols-8 gap-2">
          <div className="col-span-5">
            <SearchInputField
              value={searchQuery}
              onChange={setSearchQuery}
              placeholder="Search Campaign by campaign name or brand"
            />
          </div>
        </div>
        {loading ? (
          <LoadingScreen />
        ) : filteredCampaigns?.length === 0 ? (
          <NoDataView />
        ) : (
          <div className="overflow-y-scroll scrollbar-minimal h-[80vh] my-1 rounded-[12px] pr-2">
            {filteredCampaigns?.map((data: any, i: any) => (
              <div
                key={i}
                className="pointer-cursor"
                onClick={() => navigate(`/campaignDetails/${data._id}`)}
              >
                <CampaignsListModel data={data} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

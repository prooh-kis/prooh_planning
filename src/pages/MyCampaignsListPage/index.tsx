import React, { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Loading } from "../../components/Loading";
import {
  cloneCampaignAction,
  getAllCampaignsDetailsAction,
} from "../../actions/campaignAction";
import { TabWithoutIcon } from "../../components/molecules/TabWithoutIcon";
import {
  NoDataView,
  ReloadButton,
  SearchInputField,
} from "../../components/index";
import { campaignCreationTypeTabs } from "../../constants/tabDataConstant";
import {
  CAMPAIGN_STATUS_ACTIVE,
  CLONE_CAMPAIGN_RESET,
  EDIT_CAMPAIGN,
} from "../../constants/campaignConstants";
import { CAMPAIGN_CREATION_GET_ALL_CAMPAIGN_DATA_PLANNING_PAGE } from "../../constants/userConstants";
import { CampaignsListModel } from "../../components/molecules/CampaignsListModel";
import { GET_CAMPAIGN_DASHBOARD_DATA_RESET } from "../../constants/screenConstants";
import { removeAllKeyFromLocalStorage } from "../../utils/localStorageUtils";
import { notification } from "antd";
// import CampaignCreationModal from "../../components/popup/CampaignCreationModal";

export const MyCampaignsListPage: React.FC = () => {
  const dispatch = useDispatch<any>();
  const navigate = useNavigate();
  const targetDivRef = useRef<HTMLDivElement>(null);

  const [currentTab, setCurrentTab] = useState<any>("1");
  const [searchQuery, setSearchQuery] = useState<any>("");
  const [selectedCard, setSelectedCard] = useState<any>(null);
  const [open, setOpen] = useState<boolean>(false);

  const auth = useSelector((state: any) => state.auth);
  const { userInfo } = auth;

  const allCampaignsDataGet = useSelector(
    (state: any) => state.allCampaignsDataGet
  );
  const { loading, error, data: allCampaigns } = allCampaignsDataGet;

  const cloneCampaign = useSelector((state: any) => state.cloneCampaign);
  const {
    loading: loadingClone,
    error: errorClone,
    success: successClone,
    data: campaignData,
  } = cloneCampaign;

  useEffect(() => {
    if (userInfo && !userInfo?.isMaster) {
      // message.error("Not a screen owner!!!");
    } else if (!allCampaigns) {
      dispatch(
        getAllCampaignsDetailsAction({
          userId: userInfo?._id,
          status: CAMPAIGN_STATUS_ACTIVE,
          event: CAMPAIGN_CREATION_GET_ALL_CAMPAIGN_DATA_PLANNING_PAGE,
        })
      );
    }
    removeAllKeyFromLocalStorage();
    dispatch({ type: GET_CAMPAIGN_DASHBOARD_DATA_RESET });
  }, [dispatch, userInfo]);

  const handleCardClick = (id: any) => {
    setSelectedCard(id);
  };

  const handleGetCampaignByStatus = useCallback(
    (status: any) => {
      setCurrentTab(status);
      dispatch(
        getAllCampaignsDetailsAction({
          userId: userInfo?._id,
          status: campaignCreationTypeTabs?.filter(
            (tab: any) => tab.id === status
          )[0]?.value,
          event: CAMPAIGN_CREATION_GET_ALL_CAMPAIGN_DATA_PLANNING_PAGE,
        })
      );
    },
    [dispatch, userInfo]
  );

  const reset = () => {
    dispatch(
      getAllCampaignsDetailsAction({
        userId: userInfo?._id,
        status: CAMPAIGN_STATUS_ACTIVE,
        event: CAMPAIGN_CREATION_GET_ALL_CAMPAIGN_DATA_PLANNING_PAGE,
      })
    );
  };

  const handleDoubleClick = (id: string) => {
    // Save the current scroll position
    if (targetDivRef.current) {
      sessionStorage.setItem(
        "campaignsScrollPosition",
        targetDivRef.current.scrollTop.toString()
      );
    }
    // navigate(`/campaignDetails/${id}`);
    navigate(`/campaignDashboard/${id}`);
  };

  const handleClone = (id: string) => {
    // setOpen(true);
    dispatch(cloneCampaignAction({ id }));
  };

  const handleCreate = (value: any) => {
    console.log("value :", value);
  };

  useEffect(() => {
    if (successClone) {
      notification.success({
        message: "Clone Create Success",
        description: "Clone create successfully",
      });
      const data = campaignData?.clonedCampaign;
      console.log("data : ", data);
      navigate(`/${data?.campaignType?.toLowerCase()}plan/${data._id}`, {
        state: { from: EDIT_CAMPAIGN },
      });
      dispatch({ type: CLONE_CAMPAIGN_RESET });
    }
    if (errorClone) {
      notification.error({
        message: "Clone Create Error",
        description: errorClone,
      });
      dispatch({ type: CLONE_CAMPAIGN_RESET });
    }
  }, [errorClone, successClone]);

  useEffect(() => {
    handleGetCampaignByStatus(currentTab);
    // Restore scroll position when coming back to this page
    const savedScrollPosition =
      sessionStorage.getItem("campaignsScrollPosition") || "0";
    if (targetDivRef.current) {
      targetDivRef.current.scrollTop = parseInt(savedScrollPosition, 10);
    }
  }, [currentTab, handleGetCampaignByStatus]);

  return (
    <div className="w-full">
      {/* <CampaignCreationModal
        visible={open}
        onCancel={() => setOpen(false)}
        onCreate={handleCreate}
      /> */}
      <div className="bg-white w-auto rounded-[4px] mr-2">
        <div className="flex justify-between pr-8 border-b">
          <div className="flex gap-4 items-center p-4 ">
            <i className="fi fi-sr-megaphone flex items-center justify-center text-[#8B5CF680]"></i>
            <h1 className="text-[16px] font-semibold">
              My Campaigns{" "}
              <span className="text-[14px] text-[#68879C] ">
                (
                {
                  allCampaigns?.filter(
                    (campaign: any) =>
                      campaign?.campaignName
                        ?.toLowerCase()
                        .includes(searchQuery) ||
                      campaign?.brandName
                        ?.toLowerCase()
                        .includes(searchQuery) ||
                      campaign?.campaignName
                        ?.toUpperCase()
                        .includes(searchQuery) ||
                      campaign?.brandName?.toUpperCase().includes(searchQuery)
                  )?.length
                }
                )
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

        <div className="mt-1 px-4">
          <TabWithoutIcon
            currentTab={currentTab}
            setCurrentTab={handleGetCampaignByStatus}
            tabData={campaignCreationTypeTabs}
          />
        </div>
      </div>
      {loading ? (
        <div className="w-full">
          <Loading />
        </div>
      ) : (
        <div className="mt-1">
          {allCampaigns?.length === 0 && (
            <div className="pt-4">
              <NoDataView />
            </div>
          )}
          <div
            className="h-[80vh] overflow-y-auto scrollbar-minimal mt-1 mr-2 rounded-lg flex flex-col gap-4"
            ref={targetDivRef}
          >
            {allCampaigns
              ?.filter(
                (campaign: any) =>
                  campaign?.campaignName?.toLowerCase().includes(searchQuery) ||
                  campaign?.brandName?.toLowerCase().includes(searchQuery) ||
                  campaign?.campaignName?.toUpperCase().includes(searchQuery) ||
                  campaign?.brandName?.toUpperCase().includes(searchQuery)
              )
              ?.map((data: any, index: any) => (
                <div key={index} className="pointer-cursor">
                  <CampaignsListModel
                    data={data}
                    handleClone={handleClone}
                    handleGoToDashBoard={(id: string) =>
                      navigate(`/new-dashboard/${id}`)
                    }
                  />
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  );
};

import React, { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
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
import {
  CAMPAIGN_CREATION_CREATE_CLONE_PLANNING_PAGE,
  CAMPAIGN_CREATION_GET_ALL_CAMPAIGN_DATA_PLANNING_PAGE,
} from "../../constants/userConstants";
import { CampaignsListModel } from "../../components/molecules/CampaignsListModel";
import { GET_CAMPAIGN_DASHBOARD_DATA_RESET } from "../../constants/screenConstants";
import { removeAllKeyFromLocalStorage } from "../../utils/localStorageUtils";
import { notification } from "antd";
import { LoadingScreen } from "../../components/molecules/LoadingScreen";
import {
  SearchableSelect,
  SearchableSelectV2,
} from "../../components/atoms/SearchableSelect";

export const MyCampaignsListPage: React.FC = () => {
  const dispatch = useDispatch<any>();
  const navigate = useNavigate();
  const targetDivRef = useRef<HTMLDivElement>(null);

  const [currentTab, setCurrentTab] = useState<any>("1");
  const [searchQuery, setSearchQuery] = useState<any>("");
  const [selectedCard, setSelectedCard] = useState<any>(null);
  const [open, setOpen] = useState<boolean>(false);
  const [plannerId, setPlannerId] = useState<any>("");

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

  const fetchCampaigns = useCallback(() => {
    if (userInfo && !userInfo?.isMaster) {
      return;
    }
    dispatch(
      getAllCampaignsDetailsAction({
        plannerId: plannerId ? [plannerId] : [],
        userId: userInfo?._id,
        status: CAMPAIGN_STATUS_ACTIVE,
        event: CAMPAIGN_CREATION_GET_ALL_CAMPAIGN_DATA_PLANNING_PAGE,
      })
    );
  }, [dispatch, userInfo, plannerId]);

  useEffect(() => {
    fetchCampaigns();
    removeAllKeyFromLocalStorage();
    dispatch({ type: GET_CAMPAIGN_DASHBOARD_DATA_RESET });
  }, [dispatch, userInfo, fetchCampaigns]);

  const handleCardClick = (id: any) => {
    setSelectedCard(id);
  };

  const handleGetCampaignByStatus = useCallback(
    (status: any) => {
      setCurrentTab(status);
      dispatch(
        getAllCampaignsDetailsAction({
          plannerId: plannerId ? [plannerId] : [],
          userId: userInfo?._id,
          status: campaignCreationTypeTabs?.filter(
            (tab: any) => tab.id === status
          )[0]?.value,
          event: CAMPAIGN_CREATION_GET_ALL_CAMPAIGN_DATA_PLANNING_PAGE,
        })
      );
    },
    [dispatch, userInfo, plannerId]
  );

  const reset = () => {
    setPlannerId(""); // Reset plannerId when reloading
    dispatch(
      getAllCampaignsDetailsAction({
        plannerId: [],
        userId: userInfo?._id,
        status: CAMPAIGN_STATUS_ACTIVE,
        event: CAMPAIGN_CREATION_GET_ALL_CAMPAIGN_DATA_PLANNING_PAGE,
      })
    );
  };

  const handleDoubleClick = (id: string) => {
    if (targetDivRef.current) {
      sessionStorage.setItem(
        "campaignsScrollPosition",
        targetDivRef.current.scrollTop.toString()
      );
    }
    navigate(`/campaignDetails/${id}`);
  };

  const handleClone = (id: string) => {
    dispatch(
      cloneCampaignAction({
        id: id,
        event: CAMPAIGN_CREATION_CREATE_CLONE_PLANNING_PAGE,
      })
    );
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
    const savedScrollPosition =
      sessionStorage.getItem("campaignsScrollPosition") || "0";
    if (targetDivRef.current) {
      targetDivRef.current.scrollTop = parseInt(savedScrollPosition, 10);
    }
  }, [currentTab, handleGetCampaignByStatus]);

  const filteredCampaigns = allCampaigns?.result?.filter(
    (campaign: any) =>
      campaign?.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      campaign?.brandName?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="w-full">
      <div className="bg-white w-auto rounded-[4px] mr-2">
        <div className="flex justify-between pr-8 border-b">
          <div className="flex gap-4 items-center p-4 ">
            <i className="fi fi-sr-megaphone flex items-center justify-center text-[#8B5CF680]"></i>
            <h1 className="text-[16px] font-semibold">
              My Campaigns{" "}
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

        <div className="mt-1 px-4 flex justify-between items-center pr-8">
          <TabWithoutIcon
            currentTab={currentTab}
            setCurrentTab={handleGetCampaignByStatus}
            tabData={campaignCreationTypeTabs}
          />
          <div>
            <SearchableSelectV2
              options={allCampaigns?.plannerData?.map((data: any) => {
                return {
                  label: data.name,
                  value: data._id,
                };
              })}
              value={plannerId}
              onChange={(value) => setPlannerId(value)}
              placeholder="Filter by planner"
              showSearch
              allowClear
              className="w-96 pb-1"
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
            className="h-[76vh] overflow-y-auto scrollbar-minimal  pr-2 rounded-lg flex flex-col gap-2"
            ref={targetDivRef}
          >
            {filteredCampaigns?.map((data: any, index: any) => (
              <div
                key={index}
                className="pointer-cursor"
                onDoubleClick={() => handleDoubleClick(data?._id)}
              >
                <CampaignsListModel
                  data={data}
                  handleClone={handleClone}
                  handleGoToDashBoard={(id: string) =>
                    navigate(`/campaignDashboard/${id}`)
                  }
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

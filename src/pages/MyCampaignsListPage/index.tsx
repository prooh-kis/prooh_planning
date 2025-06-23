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
import { notification, Tooltip } from "antd";
import { LoadingScreen } from "../../components/molecules/LoadingScreen";
import { Input } from "../../components/atoms/Input";

export const MyCampaignsListPage: React.FC = () => {
  const dispatch = useDispatch<any>();
  const navigate = useNavigate();
  const targetDivRef = useRef<HTMLDivElement>(null);

  const wrapperRef = useRef<any>(null);
  const [currentTab, setCurrentTab] = useState<any>("1");
  const [searchQuery, setSearchQuery] = useState<any>("");
  const [selectedCard, setSelectedCard] = useState<any>(null);
  const [open, setOpen] = useState<boolean>(false);
  const [plannerId, setPlannerId] = useState<any>("");
  const [showPlannerList, setShowPlannerList] = useState<boolean>(false);
  const [plannerSearch, setPlannerSearch] = useState<string>("");

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

  console.log(userInfo.email)
  const reset = () => {
    setPlannerId("");
    setShowPlannerList(false);
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

  const handlePlannerSelect = (id: string) => {
    setPlannerId(id);
    setShowPlannerList(false);
    setPlannerSearch("");
  };

  const clearPlannerFilter = () => {
    setPlannerId("");
    setShowPlannerList(false);
    setPlannerSearch("");
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

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        clearPlannerFilter();
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filteredCampaigns = allCampaigns?.result?.filter(
    (campaign: any) =>
      campaign?.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      campaign?.brandName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      campaign?.clientName?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredPlanners = allCampaigns?.plannerData?.filter((planner: any) =>
    planner.name.toLowerCase().includes(plannerSearch.toLowerCase())
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
          <div className="flex items-center gap-4 mt-1 w-96">
            <SearchInputField
              value={searchQuery}
              onChange={setSearchQuery}
              placeholder="Search by name, brand, client"
            />
            <div className="relative">
              <Tooltip title="Filer Campaign By Planner Name">
                <i
                  className={`flex items-center  text-gray-700 fi ${
                    plannerId ? "fi-sr-filter " : "fi-tr-filter "
                  }`}
                  onClick={() => setShowPlannerList(!showPlannerList)}
                ></i>
              </Tooltip>
              {showPlannerList && (
                <div
                  ref={wrapperRef}
                  className="absolute top-10 right-0 z-10 bg-white shadow-lg rounded-md p-2 w-64"
                >
                  <Input
                    value={plannerSearch}
                    onChange={(e) => setPlannerSearch(e.target.value)}
                    placeholder="Search planners..."
                    className="mb-2"
                  />
                  <div className="max-h-60 overflow-y-auto">
                    {filteredPlanners?.length > 0 ? (
                      filteredPlanners.map((planner: any) => (
                        <div
                          key={planner._id}
                          className={`p-2 hover:bg-gray-100 cursor-pointer ${
                            plannerId === planner._id ? "bg-blue-50" : ""
                          }`}
                          onClick={() => handlePlannerSelect(planner._id)}
                        >
                          <span className="truncate block">{planner.name}</span>
                        </div>
                      ))
                    ) : (
                      <div className="p-2 text-gray-500">No planners found</div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="mt-1 px-4 flex justify-between items-center pr-8">
          <TabWithoutIcon
            currentTab={currentTab}
            setCurrentTab={handleGetCampaignByStatus}
            tabData={campaignCreationTypeTabs}
          />
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

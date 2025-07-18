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
  CAMPAIGN_STATUS_COMPLETED,
  CLONE_CAMPAIGN_RESET,
  EDIT_CAMPAIGN,
  GET_ALL_CAMPAIGNS_DATA_RESET,
} from "../../constants/campaignConstants";
import {
  CAMPAIGN_CREATION_CREATE_CLONE_PLANNING_PAGE,
  CAMPAIGN_CREATION_GET_ALL_CAMPAIGN_DATA_PLANNING_PAGE,
} from "../../constants/userConstants";
import { GET_CAMPAIGN_DASHBOARD_DATA_RESET } from "../../constants/screenConstants";
import { removeAllKeyFromLocalStorage } from "../../utils/localStorageUtils";
import { notification, Tooltip } from "antd";
import { LoadingScreen } from "../../components/molecules/LoadingScreen";
import { Input } from "../../components/atoms/Input";
import { CampaignAnalysis } from "./CampaignAnalysis";
import { getMyOrgDetailsAction, getOrgLevelCampaignStatusAction } from "../../actions/organizationAction";
import { GET_ORG_LEVEL_CAMPAIGN_STATUS_RESET } from "../../constants/organizationConstants";
import { MultiColorLinearBar2 } from "../../components/molecules/MultiColorLinearBar2";
import { CampaignListTable } from "./CampaignListTable";

type FilterKey = 'hom' | 'hoc' | 'manager' | 'coordinator' | 'vendor' | 'agency' | 'screen' | 'campaignCreation';

export const MyCampaignsListPageAdvance: React.FC = () => {
  const dispatch = useDispatch<any>();
  const navigate = useNavigate();
  const targetDivRef = useRef<HTMLDivElement>(null);

  const wrapperRef = useRef<any>(null);
  const [currentTab, setCurrentTab] = useState<any>("1");
  const [searchQuery, setSearchQuery] = useState<any>("");
  const [plannerId, setPlannerId] = useState<any>("");
  const [showPlannerList, setShowPlannerList] = useState<boolean>(false);
  const [plannerSearch, setPlannerSearch] = useState<string>("");
  const [initializeFilters, setInitializeFilters] = useState<boolean>(true);

  const [allCampaignsData, setAllCampaignsData] = useState<any>([]);
  const [filters, setFilters] = useState<any>({
    hom: [],
    hoc: [],
    manager: [],
    coordinator: [],
    vendor: [],
    agency: [],
    screen: [],
    campaignCreation: [],
  });
  const [initialFilters, setInitialFilters] = useState<any>(null);

  const auth = useSelector((state: any) => state.auth);
  const { userInfo } = auth;

  const { loading, error, data: allCampaigns } = useSelector(
    (state: any) => state.allCampaignsDataGet
  );

  const {
    loading: loadingMyOrg,
    error: errorMyOrg,
    data: myOrg
  } = useSelector((state: any) => state.myOrgDetailsGet);

  const {
    loading: loadingClone,
    error: errorClone,
    success: successClone,
    data: campaignData,
  } = useSelector((state: any) => state.cloneCampaign);

  const {
    loading: loadingOrgLevelCampaignStatus,
    error: errorOrgLevelCampaignStatus,
    data: orgLevelCampaignStatus,
  } = useSelector((state: any) => state.orgLevelCampaignStatusGet);

  const fetchCampaigns = useCallback(() => {
    if (!userInfo) {
      return;
    }
    dispatch(getMyOrgDetailsAction({
      id: userInfo?._id,
    }));

    dispatch(getOrgLevelCampaignStatusAction({
      id: userInfo?._id,
      filters: filters,
      initialFilters: initialFilters,
      status: CAMPAIGN_STATUS_ACTIVE,
      event: CAMPAIGN_CREATION_GET_ALL_CAMPAIGN_DATA_PLANNING_PAGE,
    }));
    
  }, [dispatch, userInfo]);

  useEffect(() => {
    fetchCampaigns();
    removeAllKeyFromLocalStorage();
    dispatch({ type: GET_CAMPAIGN_DASHBOARD_DATA_RESET });
    dispatch({ type: GET_ORG_LEVEL_CAMPAIGN_STATUS_RESET });

  }, [dispatch, userInfo, fetchCampaigns]);


  const handleGetCampaignByStatus = useCallback(
    (status: any) => {
      setCurrentTab(status);
      dispatch({
        type: GET_ORG_LEVEL_CAMPAIGN_STATUS_RESET
      });
      dispatch({
        type: GET_ALL_CAMPAIGNS_DATA_RESET
      })
      setAllCampaignsData([]);
      setFilters({
        hom: [],
        hoc: [],
        manager: [],
        coordinator: [],
        vendor: [],
        agency: [],
        screen: [],
        campaignCreation: [],
      });
      setInitialFilters(null);
      setInitialFilters(false);

      dispatch(getOrgLevelCampaignStatusAction({
        id: userInfo?._id,
        filters: {
          hom: [],
          hoc: [],
          manager: [],
          coordinator: [],
          vendor: [],
          agency: [],
          screen: [],
          campaignCreation: [],
        },
        initialFilters: null,
        status: campaignCreationTypeTabs?.filter(
          (tab: any) => tab.id === status
        )[0]?.value,
        event: CAMPAIGN_CREATION_GET_ALL_CAMPAIGN_DATA_PLANNING_PAGE,
      }));
    },
    [dispatch, userInfo]
  );
// console.log(JSON.stringify(filters));
  const reset = () => {
    setPlannerId("");
    setShowPlannerList(false);
    // if (currentTab === "1") {
      dispatch(getOrgLevelCampaignStatusAction({
        id: userInfo?._id,
        filters: filters,
        initialFilters: initialFilters,
        status: CAMPAIGN_STATUS_ACTIVE,
        event: CAMPAIGN_CREATION_GET_ALL_CAMPAIGN_DATA_PLANNING_PAGE,
      }));
    // } else {
    //   dispatch(
    //     getAllCampaignsDetailsAction({
    //       plannerId: [userInfo?._id],
    //       userId: userInfo?._id,
    //       status: CAMPAIGN_STATUS_ACTIVE,
    //       event: CAMPAIGN_CREATION_GET_ALL_CAMPAIGN_DATA_PLANNING_PAGE,
    //     })
    //   );
    // }
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

  const handlePlannerSelect = (id: string) => {
    console.log(id)
    setPlannerId(id);
    setShowPlannerList(false);
    setPlannerSearch(id.toString());
    setSearchQuery(() => {
      console.log(myOrg?.officialMembers)
      console.log(myOrg?.officialMembers?.find((member: any) => member.userId.toString() === id.toString())?.name)
      return myOrg?.officialMembers?.find((member: any) => member.userId.toString() === id.toString())?.name
    })
  };

  const clearPlannerFilter = () => {
    setPlannerId("");
    setShowPlannerList(false);
    setPlannerSearch("");
  };
  
  useEffect(() => {
    if (errorClone) {
      notification.error({
        message: "Clone Create Error",
        description: errorClone,
      });
      dispatch({ type: CLONE_CAMPAIGN_RESET });
    }
    if (errorMyOrg) {
      notification.error({
        message: "My Org Error",
        description: errorMyOrg,
      });
    }
  }, [errorClone, errorMyOrg, dispatch]);

  useEffect(() => {
    if (successClone) {
      notification.success({
        message: "Clone Create Success",
        description: "Clone create successfully",
      });
      const data = campaignData?.clonedCampaign;
      navigate(`/${data?.campaignType?.toLowerCase()}plan/${data?._id}`, {
        state: { from: EDIT_CAMPAIGN },
      });
      dispatch({ type: CLONE_CAMPAIGN_RESET });
    }
  }, [campaignData?.clonedCampaign, dispatch, navigate, successClone]);

  useEffect(() => {
    const savedScrollPosition =
      sessionStorage.getItem("campaignsScrollPosition") || "0";
    if (targetDivRef.current) {
      targetDivRef.current.scrollTop = parseInt(savedScrollPosition, 10);
    }
  }, []);

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

  useEffect(() => {
    if (orgLevelCampaignStatus?.data) {
      setAllCampaignsData(Object.values(orgLevelCampaignStatus?.data?.campaigns));
    }
  },[orgLevelCampaignStatus]);

  useEffect(() => {
    if (orgLevelCampaignStatus?.data) {
      if (!initialFilters && initializeFilters) {
        setInitialFilters({
          hom: Object.keys(orgLevelCampaignStatus?.data?.managerHeads),
          manager: Object.keys(orgLevelCampaignStatus?.data?.managers),
          coordinator: Object.keys(orgLevelCampaignStatus?.data?.coordinators),
          vendor: Object.keys(orgLevelCampaignStatus?.data?.vendors),
          agency: Object.keys(orgLevelCampaignStatus?.data?.agencies),
          screen: Object.keys(orgLevelCampaignStatus?.data?.screens),
          campaignCreation: orgLevelCampaignStatus?.data?.campaignCreations,
        });
      }
      setInitializeFilters(false);
      setFilters((prev: any) => {
        return {
          ...prev,
          hom: Object.keys(orgLevelCampaignStatus?.data?.managerHeads),
          manager: Object.keys(orgLevelCampaignStatus?.data?.managers),
          coordinator: Object.keys(orgLevelCampaignStatus?.data?.coordinators),
          vendor: Object.keys(orgLevelCampaignStatus?.data?.vendors),
          agency: Object.keys(orgLevelCampaignStatus?.data?.agencies),
          screen: Object.keys(orgLevelCampaignStatus?.data?.screens),
          campaignCreation: Object.keys(orgLevelCampaignStatus?.data?.campaignCreations),
        }
      })
    }
  },[orgLevelCampaignStatus, initializeFilters, initialFilters]);

  const filteredPlanners = myOrg?.officialMembers?.filter((planner: any) =>
    planner.name.toLowerCase().includes(plannerSearch.toLowerCase())
  );


  const filteredCampaigns = allCampaignsData?.filter(
    (campaign: any) =>
      campaign?.name?.toLowerCase().includes(searchQuery.toLowerCase())
      || campaign?.brandName?.toLowerCase().includes(searchQuery.toLowerCase())
      || campaign?.clientName?.toLowerCase().includes(searchQuery.toLowerCase())
      || campaign?.campaignPlannerName?.toLowerCase().includes(searchQuery.toLowerCase())
      || campaign?.campaignManagerName?.toLowerCase().includes(searchQuery.toLowerCase())
      || campaign?.campaignCoordinatorName?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const updateFilterArray = (current: string[], value: string, checked: boolean): string[] => {
    return checked 
      ? [...new Set([...current, value])]
      : current.filter(v => v !== value && !["All","0"].includes(v));
  };

  const handleFilters = (type: FilterKey, value: string, checked: boolean) => {
    try {
      let filtersToUpdate = { ...filters };
      if (type === 'hom') {
        const updatedHOM = updateFilterArray(filters.hom, value, checked);
        const hom = orgLevelCampaignStatus?.roleGroups?.["HOM"]?.find((hom: any) => hom.name === value);
        const homManagers = orgLevelCampaignStatus?.roleGroups?.["MANAGER"]?.filter((manager: any) => hom.userId.toString() === manager.reportsTo.toString())?.map((m: any) => m.name);
        
        filtersToUpdate = {
          ...filters,
          hom: updatedHOM,
          manager: checked
            ? [...new Set([...filters.manager, ...homManagers])]
            : filters.manager.filter((manager: string) => !homManagers.includes(manager) && manager !== "All"),
        };
      } 
      else {
        filtersToUpdate = {
          ...filters,
          [type]: updateFilterArray(filters[type], value, checked)
        };
      }

      var updatedFilters: any;

      setFilters(() => {
        updatedFilters = filtersToUpdate
        if (filtersToUpdate.hom.length !== filters.hom.length) {
          updatedFilters = {...updatedFilters, hom: updatedFilters.hom.filter((member: any) => member !== "All")};
        }
        if (filtersToUpdate.manager.length !== filters.manager.length) {
          updatedFilters = {...updatedFilters, manager: updatedFilters.manager.filter((member: any) => member !== "All")};
        }
        if (filtersToUpdate.coordinator.length !== filters.coordinator.length) {
          updatedFilters = {...updatedFilters, coordinator: updatedFilters.coordinator.filter((member: any) => member !== "All")};
        }
        if (filtersToUpdate.vendor.length !== filters.vendor.length) {
          updatedFilters = {...updatedFilters, vendor: updatedFilters.vendor.filter((member: any) => member !== "All")};
        }
        if (filtersToUpdate.agency.length !== filters.agency.length) {
          updatedFilters = {...updatedFilters, agency: updatedFilters.agency.filter((member: any) => member !== "All")};
        }
        if (filtersToUpdate.screen.length !== filters.screen.length) {
          updatedFilters = {...updatedFilters, screen: updatedFilters.screen.filter((member: any) => member !== "All")};
        }
        if (filtersToUpdate.campaignCreation.length !== filters.campaignCreation.length) {
          updatedFilters = {...updatedFilters, campaignCreation: updatedFilters.campaignCreation.filter((member: any) => member !== "0")};
        }
        return updatedFilters;
      });
      
      dispatch(getOrgLevelCampaignStatusAction({
        id: userInfo?._id,
        filters: updatedFilters,
        initialFilters: filters,
        status: CAMPAIGN_STATUS_ACTIVE,
        event: CAMPAIGN_CREATION_GET_ALL_CAMPAIGN_DATA_PLANNING_PAGE,
      }));
      
    } catch (error) {
      console.error('Error in handleFilters:', error);
    }
  };
  return (
    <div className="w-full pr-1 font-custom">
      <div className="bg-white w-auto rounded-[4px]">
        <div className="">
          <div className="">
            <div className="flex gap-4 items-center p-2">
              <img className="w-12 h-12 rounded-[8px] border border-[#D7D7D750]" src={userInfo?.avatar} alt={userInfo?.name} />
              <div>
                <h1 className="text-[16px] font-semibold">Hello, {userInfo?.name}</h1>
                <p className="text-[12px] text-[#68879C]">
                  {
                  myOrg?.officialMembers?.find((member: any) => member.userId.toString() === userInfo?._id.toString()).role === "HOM"
                    ? "Group Head View"
                    : myOrg?.officialMembers?.find((member: any) => member.userId.toString() === userInfo?._id.toString()).role === "MANAGER"
                    ? "Planner View"
                    : myOrg?.officialMembers?.find((member: any) => member.userId.toString() === userInfo?._id.toString()).role === "COORDINATOR"
                    ? "Coordinator View"
                    : myOrg?.officialMembers?.find((member: any) => member.userId.toString() === userInfo?._id.toString()).role === "ADMIN"
                    ? "Admin View"
                    : "Default View"
                  }
                </p>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex gap-4 items-center p-2">
              <h1 className="text-[16px] font-semibold">
                My Campaigns{" "}
                <span className="text-[14px] text-[#68879C] ">
                  ({orgLevelCampaignStatus?.data?.totalCampaigns})
                </span>
              </h1>
              <ReloadButton onClick={reset} />
            </div>
          </div>
        </div>

        <div className="px-2 flex justify-between items-center pr-8">
          <TabWithoutIcon
            currentTab={currentTab}
            setCurrentTab={handleGetCampaignByStatus}
            tabData={campaignCreationTypeTabs}
          />
        </div>
      </div>
      {["1", "3"].includes(currentTab) && (
        <div className="grid grid-cols-12 mt-1 bg-white rounded-[8px] p-4 mr-2">
          <h1 className="col-span-3 text-[12px] font-regular">
            {
              currentTab == "2" ? "Upcoming" : currentTab === "3" ? "Completed" : "Active"
            } Campaign Performance
          </h1>
          <div className="col-span-8 flex items-center">
            <MultiColorLinearBar2
              delivered={
              orgLevelCampaignStatus?.data?.performance * 100
              }
              expected={100}
              total={100}
              deliveredColor={orgLevelCampaignStatus?.data?.performance < 1 ? "bg-[#EF4444]" : "bg-[#4DB37E]"}
              expectedColor="bg-[#E6E6E6]"
              totalColor="bg-[#D3EDFF]"
              height="h-[5px]"
            />
          </div>
          
          <h1 className={`col-span-1 text-[12px] ${orgLevelCampaignStatus?.data?.performance < 1 ? "text-[#EF4444]" : "text-[#4DB37E]"} font-semibold flex justify-center`}>
            {(orgLevelCampaignStatus?.data?.performance * 100 || 0)?.toFixed(0)} %
          </h1>
        </div>
      )}
      <div className="mt-1">
        {loadingOrgLevelCampaignStatus ? (
          <LoadingScreen />
        ) : (
          <div className="mr-2 mb-1">
            {["1", "3"].includes(currentTab) && (
              <CampaignAnalysis 
                userInfo={userInfo} 
                myOrg={myOrg}
                loadingOrgLevelCampaignStatus={loadingOrgLevelCampaignStatus} 
                errorOrgLevelCampaignStatus={errorOrgLevelCampaignStatus} 
                orgLevelCampaignStatus={orgLevelCampaignStatus}
                filters={filters}
                handleFilters={handleFilters}
                initialFilters={initialFilters}
              />
            )}
          </div>
        )}

          <div className="bg-white rounded-[8px] mr-2 shadow-md p-4" ref={targetDivRef}>
            <div className="flex justify-between items-center">
              <h1 className="text-[14px] font-semibold">
                {
                  currentTab == "2" ? "Upcoming" : currentTab === "3" ? "Completed" : "Active"
                } Campaigns ({orgLevelCampaignStatus?.data?.totalCampaigns || 0})
              </h1>
              <div className="flex items-center gap-4 w-96">
                <SearchInputField
                  value={searchQuery}
                  onChange={setSearchQuery}
                  placeholder="Search by name, brand, client"
                  className="h-7 text-[12px]"
                />
                <div className="relative">
                  <Tooltip title="Filer Campaign By Planner Name">
                    <button
                      className="flex items-center text-[12px] text-primaryButton gap-2 border border-primaryButton rounded-[4px] px-2 h-6"
                      type="button"
                      onClick={() => setShowPlannerList(!showPlannerList)}
                    >
                      <i
                        className={`flex items-center text-[12px] text-primaryButton fi ${
                          plannerId ? "fi-rr-settings-sliders " : "fi-rr-settings-sliders "
                        }`}
                      ></i>
                      Filter
                    </button>
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
                        className="mb-2 h-8 text-[12px] w-full"
                      />
                      <div className="max-h-60 overflow-y-auto">
                        {filteredPlanners?.length > 0 ? (
                          filteredPlanners.map((planner: any) => (
                            <div
                              key={planner?.userId}
                              className={`p-2 hover:bg-gray-100 cursor-pointer ${
                                plannerId === planner?.userId ? "bg-blue-50" : ""
                              }`}
                              onClick={() => handlePlannerSelect(planner?.userId)}
                            >
                              <span className="text-[12px] truncate block">{planner.name}</span>
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
          {loading? (
            <LoadingScreen />
          ) : filteredCampaigns?.length === 0 ? (
            <NoDataView />
          ) : (
            <div className="">
              <CampaignListTable
                data={filteredCampaigns}
                onDoubleClick={handleDoubleClick}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

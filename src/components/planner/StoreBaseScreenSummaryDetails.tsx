import { TabWithoutIcon } from "../molecules/TabWithoutIcon";
import { TabWithIcon } from "../molecules/TabWithIcon";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { screenSummaryTabData } from "../../utils/hardCoddedData";
import { ScreenSummaryTable } from "../tables/ScreenSummaryTable";
import { ViewPlanPic } from "../segments/ViewPlanPic";
import { PlanSummaryTable } from "../tables/PlanSummaryTable";
import { useDispatch, useSelector } from "react-redux";
import {
  getPlanningPageFooterData,
  getScreenSummaryData,
} from "../../actions/screenAction";
import {
  getDataFromLocalStorage,
  saveDataOnLocalStorage,
} from "../../utils/localStorageUtils";
import { useLocation } from "react-router-dom";
import { Footer } from "../../components/footer";
import {
  FULL_CAMPAIGN_PLAN,
  SCREEN_SUMMARY_SELECTION,
  SCREEN_SUMMARY_TABLE_DATA,
  SCREEN_TYPE_TOGGLE_SELECTION,
} from "../../constants/localStorageConstants";
import { addDetailsToCreateCampaign } from "../../actions/campaignAction";
import { Loading } from "../../components/Loading";
import { message, Tooltip } from "antd";
import { ADD_DETAILS_TO_CREATE_CAMPAIGN_RESET } from "../../constants/campaignConstants";
import { LoadingScreen } from "../../components/molecules/LoadingScreen";
import { GET_SCREEN_SUMMARY_PLAN_TABLE_DATA_RESET } from "../../constants/screenConstants";
import { ScreenFilters } from "../../components/segments/ScreenFilters";

interface ScreenSummaryDetailsProps {
  setCurrentStep: (step: number) => void;
  step: number;
  campaignId?: any;
  regularVsCohortSuccessStatus?: any;
  successAddCampaignDetails?: any;
  pageSuccess?: boolean;
  setPageSuccess?: any;
}

export const StoreBaseScreenSummaryDetails = ({
  setCurrentStep,
  step,
  campaignId,
  successAddCampaignDetails,
  pageSuccess,
  setPageSuccess,
}: ScreenSummaryDetailsProps) => {
  const dispatch = useDispatch<any>();
  const { pathname } = useLocation();

  const [currentSummaryTab, setCurrentSummaryTab] = useState<string>("1");
  const [currentCity, setCurrentCity] = useState<string>("");
  const [cityTabData, setCityTabData] = useState<any[]>([]);
  const [showSummary, setShowSummary] = useState<any>(null);
  const [listView, setListView] = useState<boolean>(true);
  const [cityZones, setCityZones] = useState<any>({});
  const [cityTP, setCityTP] = useState<any>({});
  const [screenTypes, setScreenTypes] = useState<any>({});
  const [screenTypeToggle, setScreenTypeToggle] = useState<any>(getDataFromLocalStorage(SCREEN_TYPE_TOGGLE_SELECTION)?.[campaignId]);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [screensBuyingCount, setScreensBuyingCount] = useState<any>(getDataFromLocalStorage(SCREEN_SUMMARY_SELECTION)?.[campaignId] ?? {});
  const [filterType, setFilterType] = useState<string>("Touchpoints");
  const [zoneFilters, setZoneFilters] = useState<any[]>([]);
  const [tpFilters, setTpFilters] = useState<any[]>([]);
  const [stFilters, setStFilters] = useState<any[]>([]);

  const screenSummaryDataGet = useSelector((state: any) => state.screenSummaryDataGet);
  const { loading: loadingScreenSummary, error: errorScreenSummary, data: screenSummaryData } = screenSummaryDataGet;

  const screenSummaryPlanTableDataGet = useSelector((state: any) => state.screenSummaryPlanTableDataGet);
  const { loading: loadingScreenSummaryPlanTable, error: errorScreenSummaryPlanTable, data: screenSummaryPlanTableData } = screenSummaryPlanTableDataGet;

  const dropdownRef = useRef<HTMLDivElement>(null);

  const regularVsCohort =
  getDataFromLocalStorage(FULL_CAMPAIGN_PLAN)?.[campaignId]?.selectedType;


  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const getSelectedScreenIdsFromAllCities = (citiesData: any = {}) => {
    let activeScreenIds: any[] = [];
    for (const city in citiesData) {
      const screens = citiesData[city] ?? {};
      const activeScreens = Object.keys(screens).filter((screenId) => screens[screenId]?.status === true);
      activeScreenIds = activeScreenIds.concat(activeScreens);
    }
    return activeScreenIds;
  };

  const getTabValue = useCallback((dataScreenSummary: any) => {
    if (
      dataScreenSummary &&
      getDataFromLocalStorage(SCREEN_SUMMARY_SELECTION)?.[campaignId] &&
      Object.keys(
        getDataFromLocalStorage(SCREEN_SUMMARY_SELECTION)?.[campaignId]
      )?.length !== 0
    ) {
      return Object.keys(
        getDataFromLocalStorage(SCREEN_SUMMARY_SELECTION)?.[campaignId]
      )?.map((s: any, index: any) => {
        return {
          id: `${index + 1}`,
          label: s,
          params:
            getDataFromLocalStorage(SCREEN_SUMMARY_SELECTION)?.[campaignId] !==
              null ||
            getDataFromLocalStorage(SCREEN_SUMMARY_SELECTION)?.[campaignId] !==
              undefined
              ? [
                  Object.values(
                    getDataFromLocalStorage(SCREEN_SUMMARY_SELECTION)?.[
                      campaignId
                    ]?.[s]
                  )
                    ?.map((f: any) => f.status)
                    ?.filter((s: any) => s === true)?.length,
                  Object.values(
                    getDataFromLocalStorage(SCREEN_SUMMARY_SELECTION)?.[
                      campaignId
                    ]?.[s]
                  )
                    ?.map((f: any) => f.status)
                    ?.filter((s: any) => s === false)?.length,
                ]
              : [0, 0],
        };
      });
    } else return [];
  },[campaignId]);

  useEffect(() => {
    if (!successAddCampaignDetails) return;
    setPageSuccess(true);
  }, [setPageSuccess, successAddCampaignDetails]);

  useEffect(() => {
    if (!pageSuccess) return;
    dispatch(getScreenSummaryData({ id: campaignId, type: getDataFromLocalStorage(FULL_CAMPAIGN_PLAN)?.[campaignId]?.selectedType }));
    dispatch(getPlanningPageFooterData({ id: campaignId, pageName: "Screen Summary Page" }));
    dispatch({ type: ADD_DETAILS_TO_CREATE_CAMPAIGN_RESET });
    dispatch({ type: GET_SCREEN_SUMMARY_PLAN_TABLE_DATA_RESET });
  }, [campaignId, dispatch, pageSuccess]);

  useEffect(() => {
    if (screenSummaryData || screensBuyingCount) {
      saveDataOnLocalStorage(SCREEN_SUMMARY_SELECTION, { [campaignId]: screensBuyingCount });
      setCityTabData(getTabValue(screenSummaryData));
      const selectedCity = Object.keys(screensBuyingCount ?? {})[Number(currentSummaryTab) - 1];
      setCurrentCity(selectedCity);
      setZoneFilters(Object.keys(cityZones[selectedCity] ?? {}));
      setTpFilters(Object.keys(cityTP[selectedCity] ?? {}));
      // console.log(Object.keys(screenTypes[selectedCity]) ?? {});
      setStFilters(Object.keys(screenTypes[selectedCity] ?? {}));
    }
  }, [dispatch, campaignId, getTabValue, screenSummaryData, screensBuyingCount, currentSummaryTab, cityZones, cityTP, screenTypes]);

  // Function to re-evaluate the filter state based on screen statuses
  const reEvaluateFilters = () => {
    const updatedZoneFilters: any[] = [];
    const updatedTpFilters: any[] = [];
    const updatedStFilters: any[] = [];
  
    // Iterate through all screens in the current city
    Object.values(screensBuyingCount[currentCity] || {}).forEach((screen: any) => {
      const screenType = screen.data.screenType || "";

      const { zoneOrRegion, touchPoint } = screen.data.location || {};
      // If the screen is selected, add its zone, touchpoint, and screenType to the filters
      if (screen.status) {
        if (zoneOrRegion && !updatedZoneFilters.includes(zoneOrRegion)) {
          updatedZoneFilters.push(zoneOrRegion);
        }
        if (touchPoint && !updatedTpFilters.includes(touchPoint)) {
          updatedTpFilters.push(touchPoint);
        }
        if (screenType && !updatedStFilters.includes(screenType)) {
          updatedStFilters.push(screenType);
        }
      }
    });
  
    // Update the filter states
    setZoneFilters(updatedZoneFilters);
    setTpFilters(updatedTpFilters);
    setStFilters(updatedStFilters);
  };

  useEffect(() => {
    reEvaluateFilters();
  }, [screensBuyingCount, currentCity]);

  const handleSave = () => {
    if (!pathname.split("/").includes("view")) {
  
      dispatch(addDetailsToCreateCampaign({
        pageName: "Screen Summary Page",
        id: campaignId,
        totalScreens: getSelectedScreenIdsFromAllCities(screensBuyingCount),
        totalImpression: getDataFromLocalStorage(SCREEN_SUMMARY_TABLE_DATA)?.[campaignId]?.total?.totalImpression,
        totalReach: getDataFromLocalStorage(SCREEN_SUMMARY_TABLE_DATA)?.[campaignId]?.total?.totalReach,
        totalCampaignBudget: getDataFromLocalStorage(SCREEN_SUMMARY_TABLE_DATA)?.[campaignId]?.total?.totalCampaignBudget,
        totalCpm: getDataFromLocalStorage(SCREEN_SUMMARY_TABLE_DATA)?.[campaignId]?.total?.totalCpm,
        duration: getDataFromLocalStorage(FULL_CAMPAIGN_PLAN)?.[campaignId]?.duration,
      }));
      setCurrentStep(step + 1);
    } else {
      setCurrentStep(step + 1);
    }
  };

  const filteredScreensData = useCallback(() => {
    if (!screensBuyingCount || !Object.keys(screensBuyingCount).length) return { result: [], allResult: [] };

    let selectedCityScreens = screensBuyingCount[Object.keys(screensBuyingCount)[Number(currentSummaryTab) - 1]] ?? {};
    let result = Object.values(selectedCityScreens)?.map((f: any) => f.data);

    let allResult = result;
    if (zoneFilters.length > 0) {
      result = result?.filter((s: any) => zoneFilters.includes(s.location?.zoneOrRegion ?? ""));
    }
    if (tpFilters.length > 0) {
      result = result?.filter((s: any) => tpFilters.includes(s.location?.touchPoint ?? ""));
    }
    if (stFilters.length > 0) {
      result = result?.filter((s: any) => stFilters.includes(s.screenType ?? ""));
    }
    return { result, allResult };
  }, [screensBuyingCount, zoneFilters, tpFilters, stFilters, currentSummaryTab]);

  const handleScreenClick = ({ screen, city, statusRes, suppressMessage = false }: any) => {
    const screenId = screen._id;
    const networkType = ""; // Assuming networkType is not used for now

    const updatedScreensBuyingCount = { ...screensBuyingCount };
    const currentCityScreens = updatedScreensBuyingCount[city] || {};

    if (networkType !== "") {
      let newStatus = statusRes !== undefined ? statusRes : !currentCityScreens[screenId]?.status;
      for (const id in currentCityScreens) {
        if (currentCityScreens[id].data.networkType === networkType) {
          currentCityScreens[id] = { ...currentCityScreens[id], status: newStatus };
        }
      }
      if (!suppressMessage) {
        message.info(`You are ${newStatus ? "selecting" : "deselecting"} a screen from ${networkType}. Any action applicable to any one screen of any network will be applicable on all the screens of the same network.`);
      }
    } else {
      if (statusRes === undefined && currentCityScreens[screenId]) {
        currentCityScreens[screenId].status = !currentCityScreens[screenId].status;
      } else {
        currentCityScreens[screenId] = { status: statusRes, data: screen };
      }
    }

    updatedScreensBuyingCount[city] = currentCityScreens;
    setScreensBuyingCount(updatedScreensBuyingCount);
    saveDataOnLocalStorage(SCREEN_SUMMARY_SELECTION, { [campaignId]: updatedScreensBuyingCount });
  };

  const handleScreenTypeClick = ({ screenType, myData, city, touchpoint, statusNow, zone }: any) => {
    const screens: any[] = [];
    const stToggle = { ...screenTypeToggle };

    if (zone !== "") {
      myData[zone]?.forEach((s: any) => screens.push(s));
    } else {
      for (const zone in myData) {
        myData[zone]?.forEach((s: any) => screens.push(s));
      }
    }

    const allSelected = screens.every((s: any) => screensBuyingCount[currentCity]?.[s._id]?.status);
    stToggle[city][touchpoint][screenType] = !allSelected;
    saveDataOnLocalStorage(SCREEN_TYPE_TOGGLE_SELECTION, { [campaignId]: stToggle });
    setScreenTypeToggle(stToggle);

    const networkMessageTracker = new Set<string>();
    screens.forEach((s: any) => {
      const shouldShowMessage = s.network !== "" && !networkMessageTracker.has(s.networkType);
      handleScreenClick({ screen: s, city, touchpoint, statusRes: !allSelected, suppressMessage: !shouldShowMessage });
      if (shouldShowMessage) {
        networkMessageTracker.add(s.networkType);
      }
    });
  };

  const handleFilterSelection = ({ type, value, checked }: any) => {
    // Update the filter state (zoneFilters, tpFilters, or stFilters)
    if (type === "zone") {
      setZoneFilters((prev: any[]) => (checked ? [...prev, value] : prev.filter((item: any) => item !== value)));
    }
    if (type === "tp") {
      setTpFilters((prev: any[]) => (checked ? [...prev, value] : prev.filter((item: any) => item !== value)));
    }
    if (type === "st") {
      setStFilters((prev: any[]) => (checked ? [...prev, value] : prev.filter((item: any) => item !== value)));
    }

    // Call handleScreenTypeClick to update the status of all screens within the filter
    if (type === "zone" || type === "tp" || type === "st") {
      const filterValue = value;

      // Find all screens that match the filter
      const filteredScreens = Object.values(screensBuyingCount[currentCity] || {}).filter((screen: any) => {
        if (type === "zone") {
          return screen.data.location?.zoneOrRegion === filterValue;
        } else if (type === "tp") {
          return screen.data.location?.touchPoint === filterValue;
        } else if (type === "st") {
          return screen.data.screenType === filterValue;
        }
        return false;
      });

      // Update the status of all filtered screens
      filteredScreens.forEach((screen: any) => {
        handleScreenClick({
          screen: screen.data,
          city: currentCity,
          statusRes: checked, // Set status to true if checked, false if unchecked
          suppressMessage: true, // Suppress messages to avoid spamming
        });
      });
      // After updating screen statuses, re-evaluate the filter state
      reEvaluateFilters();
    }
  };

  return (
    <div className="w-full">
      {errorScreenSummary && (
        <div className="p-4 bg-red-300 text-[#FFFFFF] ">
          Something went wrong! please refresh the page...
        </div>
      )}
      {loadingScreenSummary || loadingScreenSummaryPlanTable ? (
        <LoadingScreen />
      ) : (
        <div className="w-full">
          <h1 className="text-3xl ">
            Screens summary as per “
            {regularVsCohort === "cohort" ? "COHORT" : "REGULAR"}” selection{" "}
          </h1>
          <h1 className="text-sm text-gray-500 ">
            You can further optimized your plan by deselecting locations in the
            screen summary
          </h1>
          <div className="pb-2">
            <div className="w-full">
              <div className="py-2 grid grid-cols-12 flex justify-between">
                <div className="col-span-8 overflow-x-scroll no-scrollbar">
                  {loadingScreenSummary && (
                    <div className="flex rounded-b justify-between w-full h-[32px] animate-pulse">
                      <div className="h-[32px] bg-[#D7D7D750] rounded-b dark:bg-[#D7D7D7] w-full"></div>
                    </div>
                  )}
                  {!loadingScreenSummary && screenSummaryData && cityTabData?.length !== 0 && (
                    <TabWithoutIcon
                      currentTab={currentSummaryTab}
                      setCurrentTab={setCurrentSummaryTab}
                      tabData={cityTabData}
                    />
                  )}
                </div>
                <div className="col-span-4 flex items-center justify-end gap-2 truncate">
                  {isOpen && (
                    <div ref={dropdownRef}>
                      <ScreenFilters
                        currentSummaryTab={currentSummaryTab}
                        cityZones={cityZones}
                        cityTP={cityTP}
                        screenTypes={screenTypes}
                        zoneFilters={zoneFilters}
                        tpFilters={tpFilters}
                        stFilters={stFilters}
                        handleFilterSelection={handleFilterSelection}
                        filteredScreensData={filteredScreensData}
                        screensBuyingCount={screensBuyingCount}
                        filterType={filterType}
                        setFilterType={setFilterType}
                        setIsOpen={setIsOpen}
                        listView={listView}
                        setCurrentCity={setCurrentCity}
                        setZoneFilters={setZoneFilters}
                        setTpFilters={setTpFilters}
                        setStFilters={setStFilters}
                      />
                    </div>
                  )}
                  {listView && (
                    <button
                      className="text-white text-[12px] px-4 py-1 rounded-full bg-primaryButton"
                      title="filter"
                      type="button"
                      onClick={() => {
                        // console.log(filteredScreensData())
                        setIsOpen((prev: any) => !prev);
                      }}
                    >
                      Filter
                    </button>
                  )}
                  <Tooltip title="Click to see the list view">
                    <div
                      className={`cursor-pointer truncate p-1 h-6 border rounded flex items-center gap-1 ${
                        listView && "border-primaryButton"
                      }`}
                      onClick={() => setListView(true)}
                    >
                      <i
                        className={`fi fi-rr-table-list flex items-center
                      text-[12px]
                      ${listView && "text-primaryButton"}`}
                      ></i>
                    </div>
                  </Tooltip>
                  <Tooltip title="Click to see the grid view">
                    <div
                      className={`cursor-pointer truncate p-1 h-6 border rounded flex items-center gap-1 ${
                        !listView && "border-primaryButton"
                      }`}
                      onClick={() => setListView(false)}
                    >
                      <i
                        className={`fi fi-sr-apps flex items-center
                      text-[12px]
                      ${!listView && "text-primaryButton"}`}
                      ></i>
                    </div>
                  </Tooltip>
                </div>
              </div>
              {loadingScreenSummary && <Loading />}
              {listView ? (
                <ScreenSummaryTable
                  data={screenSummaryData}
                  currentCity={currentCity}
                  currentSummaryTab={currentSummaryTab}
                  setCurrentCity={setCurrentCity}
                  setScreensBuyingCount={setScreensBuyingCount}
                  screensBuyingCount={screensBuyingCount}
                  setCityZones={setCityZones}
                  cityZones={cityZones}
                  setCityTP={setCityTP}
                  cityTP={cityTP}
                  setScreenTypes={setScreenTypes}
                  campaignId={campaignId}
                  listView={listView}
                  screenTypeToggle={screenTypeToggle}
                  setScreenTypeToggle={setScreenTypeToggle}
                  handleScreenTypeClick={handleScreenTypeClick}
                  handleScreenClick={handleScreenClick}
                />
              ) : (
                <div className="grid grid-cols-12 gap-8 pt-2 mb-16">
                  <div className="col-span-3 border rounded-[12px] h-[60vh] p-3 overflow-y-auto">
                    <ScreenFilters
                      cityZones={cityZones}
                      cityTP={cityTP}
                      screenTypes={screenTypes}
                      zoneFilters={zoneFilters}
                      tpFilters={tpFilters}
                      stFilters={stFilters}
                      handleFilterSelection={handleFilterSelection}
                      filteredScreensData={filteredScreensData}
                      screensBuyingCount={screensBuyingCount}
                      currentSummaryTab={currentSummaryTab}
                      listView={listView}
                      setCurrentCity={setCurrentCity}
                      setZoneFilters={setZoneFilters}
                      setTpFilters={setTpFilters}
                      setStFilters={setStFilters}
                      filterType={filterType}
                      setFilterType={setFilterType}
                    />
                  </div>
                  <div className="col-span-9 rounded grid grid-cols-12 flex flex-wrap gap-4 overflow-scroll no-scrollbar h-[60vh]">
                    {filteredScreensData()?.result
                      // ?.filter((sc: any) => {
                      //   return (
                      //     sc.pricePerSlot >= priceFilter?.min &&
                      //     sc.pricePerSlot <= priceFilter?.max
                      //   );
                      // })
                      ?.map((screen: any, index: any) => (
                        <div key={index} className="col-span-3">
                          <ViewPlanPic
                            screen={screen}
                            screens={screensBuyingCount}
                            currentSummaryTab={currentSummaryTab}
                            handleScreenClick={handleScreenClick}
                          />
                        </div>
                      ))}
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="px-4 fixed bottom-0 left-0 w-full bg-[#FFFFFF]">
            <Footer
              mainTitle="Continue"
              handleBack={() => {
                setCurrentStep(step - 1);
              }}
              handleSave={handleSave}
              campaignId={campaignId}
              pageName={"Select Screens Page"}
              successAddCampaignDetails={successAddCampaignDetails}
            />
          </div>
        </div>
      )}
    </div>
  );
};
import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { message, Tooltip } from "antd";

// Components
// import { PlanSummaryTable } from "./PlanSummaryTable";
import { Footer } from "../../components/footer";

// Actions & Constants
import { 
  getPlanningPageFooterData, 
  getScreenSummaryData, 
  getScreenSummaryDataIKnowItAll
} from "../../actions/screenAction";
import { addDetailsToCreateCampaign } from "../../actions/campaignAction";
import { 
  ADD_DETAILS_TO_CREATE_CAMPAIGN_RESET,
} from "../../constants/campaignConstants";

// Utils
import { screenSummaryTabData } from "../../utils/hardCoddedData";
import { LoadingScreen } from "../../components/molecules/LoadingScreen";
import { TabWithIcon, TabWithoutIcon, ViewPlanPic } from "../../components";
import { ScreenFilters } from "../../components/segments/ScreenFilters";
import { ScreenSummaryTableIKnowItAll } from "./ScreenSummaryTableIKnowItAll";
import { getDataFromLocalStorage, saveDataOnLocalStorage } from "../../utils/localStorageUtils";
import { SCREEN_SUMMARY_SELECTION, SCREEN_TYPE_TOGGLE_SELECTION } from "../../constants/localStorageConstants";

interface ScreenSummaryDetailsProps {
  setCurrentStep: (step: number) => void;
  step: number;
  campaignId?: any;
  regularVsCohortSuccessStatus?: any;
  campaignDetails?: any;
}

export const IKnowItAllScreenSummaryDetails = ({
  setCurrentStep,
  step,
  campaignId,
  campaignDetails,
}: ScreenSummaryDetailsProps) => {
  const dispatch = useDispatch<any>();
  const { pathname } = useLocation();
  const dropdownRef = useRef<HTMLDivElement>(null);

  // State
  const [currentSummaryTab, setCurrentSummaryTab] = useState("1");
  const [currentCity, setCurrentCity] = useState("");
  const [listView, setListView] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [filterType, setFilterType] = useState("Touchpoints");
  
  // Filter states
  const [zoneFilters, setZoneFilters] = useState<any[]>([]);
  const [tpFilters, setTpFilters] = useState<any[]>([]);
  const [stFilters, setStFilters] = useState<any[]>([]);
  
  // Data states
  const [cityZones, setCityZones] = useState<any>({});
  const [cityTP, setCityTP] = useState<any>({});
  const [screenTypes, setScreenTypes] = useState<any>({});
  const [screenTypeToggle, setScreenTypeToggle] = useState<any>({});
  const [screensBuyingCount, setScreensBuyingCount] = useState<any>({});

  // Redux selectors
  const {
    loading: loadingAddDetails,
    error: errorAddDetails,
    success: successAddDetails,
  } = useSelector((state: any) => state.detailsToCreateCampaignAdd);

  const {
    loading: loadingScreenSummary,
    error: errorScreenSummary,
    data: screenSummaryData,
  } = useSelector((state: any) => state.screenSummaryDataIKnowItAllGet);


  // Memoized values
  const memoizedScreenData = useMemo(() => screenSummaryData || {}, [screenSummaryData]);
  const isViewPage = pathname.split("/").includes("view");

  const cityTabData = useMemo(() => {
    return Object.keys(screensBuyingCount).map((city, index) => {
      const cityScreens = screensBuyingCount[city] || {};
      const selectedCount = Object.values(cityScreens).filter((s: any) => s.status).length;
      
      return {
        id: `${index + 1}`,
        label: city,
        params: [selectedCount, Object.values(cityScreens).length - selectedCount],
      };
    });
  }, [screensBuyingCount]);

  // Handlers
  const handleClickOutside = useCallback((event: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
      setIsOpen(false);
    }
  }, []);

  const getSelectedScreenIdsFromAllCities = useCallback((citiesData: any = {}) => {
    return Object.values(citiesData).flatMap((cityScreens: any) => 
      Object.entries(cityScreens)
        .filter(([_, screen]: [any, any]) => screen?.status)
        .map(([screenId]) => screenId)
    );
  }, []);

  const reEvaluateFilters = useCallback(() => {
    if (!currentCity || !screensBuyingCount[currentCity]) return;

    const filters = {
      zones: new Set<string>(),
      tps: new Set<string>(),
      sts: new Set<string>(),
    };

    Object.values(screensBuyingCount[currentCity]).forEach((screen: any) => {
      if (screen.status) {
        const { zoneOrRegion, touchPoint } = screen.data.location || {};
        const screenType = screen.data.screenType || "";

        if (zoneOrRegion) filters.zones.add(zoneOrRegion);
        if (touchPoint) filters.tps.add(touchPoint);
        if (screenType) filters.sts.add(screenType);
      }
    });

    setZoneFilters(Array.from(filters.zones));
    setTpFilters(Array.from(filters.tps));
    setStFilters(Array.from(filters.sts));
  }, [currentCity, screensBuyingCount]);

  const handleScreenClick = useCallback(({ screen, city, statusRes }: any) => {
    const screenId = screen._id;

    setScreensBuyingCount((prev: any) => ({
      ...prev,
      [city]: {
        ...prev[city],
        [screenId]: {
          status: statusRes ?? !prev[city]?.[screenId]?.status,
          data: screen
        }
      }
    }));

    setTimeout(reEvaluateFilters, 0);
  }, [reEvaluateFilters]);

  const handleSave = useCallback(() => {
    if (!isViewPage) {
      if (getSelectedScreenIdsFromAllCities(screensBuyingCount)?.length === 0) {
        dispatch({ type: ADD_DETAILS_TO_CREATE_CAMPAIGN_RESET });
        return message.error("Please select atleast 1 screen to proceed further...");
      }

      dispatch(addDetailsToCreateCampaign({
        pageName: "Select Screens Page",
        id: campaignId,
        screenIds: getSelectedScreenIdsFromAllCities(screensBuyingCount),
      }));
    } else {
      setCurrentStep(step + 1);
    }
  }, [
    isViewPage,
    dispatch,
    campaignId,
    getSelectedScreenIdsFromAllCities,
    screensBuyingCount,
    step,
    setCurrentStep
  ]);

  // Effects
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [handleClickOutside]);

  useEffect(() => {
    if (!campaignDetails) return;
    
    if (errorAddDetails) message.error("Error in add campaign details...");
    if (errorScreenSummary) message.error("Error in fetching screen summary data...");

    dispatch(getScreenSummaryDataIKnowItAll({
      id: campaignId,
    }));
    
    dispatch(getPlanningPageFooterData({
      id: campaignId,
      pageName: "Select Screens Page",
    }));
  }, [campaignId, campaignDetails, errorAddDetails, errorScreenSummary, dispatch]);

  useEffect(() => {
    if (successAddDetails) {
      dispatch({ type: ADD_DETAILS_TO_CREATE_CAMPAIGN_RESET });
      setCurrentStep(step + 1);
    }
  }, [successAddDetails, step, setCurrentStep, dispatch]);

  useEffect(() => {
    if (screensBuyingCount && Object.keys(screensBuyingCount).length > 0) {
      const selectedCity = Object.keys(screensBuyingCount)[Number(currentSummaryTab) - 1];
      if (selectedCity && selectedCity !== currentCity) {
        setCurrentCity(selectedCity);
      }
    }
  }, [screensBuyingCount, currentSummaryTab, currentCity]);

  useEffect(() => {
    reEvaluateFilters();
  }, [currentCity, screensBuyingCount, reEvaluateFilters]);

  useEffect(() => {
    if (Object.keys(screensBuyingCount).length === 0 && screenSummaryData) {
      // Restore selections when coming back to tab 1
      const storedSelection = getDataFromLocalStorage(SCREEN_SUMMARY_SELECTION)?.[campaignId];
      if (storedSelection) {
        setScreensBuyingCount(storedSelection);
      }
    }
  }, [campaignId, screenSummaryData, screensBuyingCount]);
  
  useEffect(() => {
    return () => {
      if (successAddDetails) {
        localStorage.removeItem(SCREEN_SUMMARY_SELECTION);
        localStorage.removeItem(SCREEN_TYPE_TOGGLE_SELECTION);
      }
    };
  }, [successAddDetails]);

  // Filtered data
  const filteredScreensData = useMemo(() => {
    if (!screensBuyingCount || !Object.keys(screensBuyingCount).length) {
      return { result: [], allResult: [] };
    }

    const selectedCityScreens = screensBuyingCount[
      Object.keys(screensBuyingCount)[Number(currentSummaryTab) - 1]
    ] ?? {};
    
    const allScreens = Object.values(selectedCityScreens).map((f: any) => f.data);
    
    const filtered = allScreens.filter((s: any) => 
      (zoneFilters.length === 0 || zoneFilters.includes(s.location?.zoneOrRegion ?? "")) &&
      (tpFilters.length === 0 || tpFilters.includes(s.location?.touchPoint ?? "")) &&
      (stFilters.length === 0 || stFilters.includes(s.screenType ?? ""))
    );

    return { result: filtered, allResult: allScreens };
  }, [screensBuyingCount, currentSummaryTab, zoneFilters, tpFilters, stFilters]);

  if (errorScreenSummary) {
    return (
      <div className="p-4 bg-red-300 text-[#FFFFFF]">
        Something went wrong! Please refresh the page...
      </div>
    );
  }

  if (loadingScreenSummary) {
    return <LoadingScreen />;
  }

  return (
    <div className="w-full">
      <h1 className="text-[24px] text-primaryText font-semibold">
        Screens summary{" "}
      </h1>
      <h1 className="text-[14px] text-gray-500 treading-[29px]">
        You can further optimize your plan by deselecting locations in the screen summary
      </h1>
      
      <div className="pb-2">
        <div className="w-full">
          <div className="py-2 grid grid-cols-12 flex justify-between">
            <div className="col-span-8 overflow-x-scroll no-scrollbar">
              {cityTabData?.length > 0 && (
                <TabWithoutIcon
                  currentTab={currentSummaryTab}
                  setCurrentTab={setCurrentSummaryTab}
                  tabData={cityTabData}
                  key={JSON.stringify(cityTabData)}
                />
              )}
            </div>
            <div className="col-span-4 flex items-center justify-end gap-2 truncate">
              {isOpen && (
                <div ref={dropdownRef}>
                  <ScreenFilters
                    setIsOpen={setIsOpen}
                    cityZones={cityZones}
                    cityTP={cityTP}
                    screenTypes={screenTypes}
                    zoneFilters={zoneFilters}
                    tpFilters={tpFilters}
                    stFilters={stFilters}
                    handleFilterSelection={({ type, value, checked }: any) => {
                      const update = (prev: any[]) => 
                        checked ? [...prev, value] : prev.filter(item => item !== value);
                      type === "zone" ? setZoneFilters(update) : 
                      type === "tp" ? setTpFilters(update) : 
                      setStFilters(update);
                    }}
                    filteredScreensData={filteredScreensData}
                    screensBuyingCount={screensBuyingCount}
                    currentSummaryTab={currentSummaryTab}
                    listView={listView}
                    setCurrentCity={setCurrentCity}
                    setZoneFilters={setZoneFilters}
                    setTpFilters={setTpFilters}
                    setStFilters={setStFilters}
                    filterType={filterType}
                    setScreensBuyingCount={setScreensBuyingCount}
                    setFilterType={setFilterType}
                  />
                </div>
              )}
              {listView && (
                <button
                  className={`text-white text-[12px] px-4 py-1 rounded-full hover:bg-primaryButton
                    ${isOpen ? "bg-primaryButton" : "bg-gray-400"}`}
                  title="filter"
                  type="button"
                  onClick={() => setIsOpen(prev => !prev)}
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
                    className={`fi fi-rr-table-list flex items-center text-[12px] ${
                      listView ? "text-primaryButton" : "text-[#B9B9B9]"
                    }`}
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
                    className={`fi fi-sr-apps flex items-center text-[12px] ${
                      !listView ? "text-primaryButton" : "text-[#B9B9B9]"
                    }`}
                  ></i>
                </div>
              </Tooltip>
            </div>
          </div>
          
          {listView ? (
            <ScreenSummaryTableIKnowItAll
              listView={true}
              data={memoizedScreenData}
              currentCity={currentCity}
              screensBuyingCount={screensBuyingCount}
              setCityZones={setCityZones}
              cityZones={cityZones}
              setCityTP={setCityTP}
              cityTP={cityTP}
              setScreenTypes={setScreenTypes}
              setScreenTypeToggle={setScreenTypeToggle}
              campaignId={campaignId}
              screenTypeToggle={screenTypeToggle}
              setScreensBuyingCount={setScreensBuyingCount}
              handleScreenClick={handleScreenClick}
              campaignDetails={campaignDetails}
            />
          ) : (
            <div className="grid grid-cols-12 gap-8 pt-2 mb-16">
              <div className="col-span-3 border rounded-[12px] h-[60vh] p-4 overflow-y-auto scrollbar-minimal">
                <ScreenFilters
                  setIsOpen={setIsOpen}
                  cityZones={cityZones}
                  cityTP={cityTP}
                  screenTypes={screenTypes}
                  zoneFilters={zoneFilters}
                  tpFilters={tpFilters}
                  stFilters={stFilters}
                  handleFilterSelection={({ type, value, checked }: any) => {
                    const update = (prev: any[]) => 
                      checked ? [...prev, value] : prev.filter(item => item !== value);
                    type === "zone" ? setZoneFilters(update) : 
                    type === "tp" ? setTpFilters(update) : 
                    setStFilters(update);
                  }}
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
              <div className="col-span-9 rounded grid grid-cols-12 flex flex-wrap gap-8 overflow-scroll no-scrollbar h-[60vh]">
                {filteredScreensData.result?.map((screen: any, index: any) => (
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
          handleBack={() => setCurrentStep(step - 1)}
          handleSave={handleSave}
          campaignId={campaignId}
          pageName={"Select Screens Page"}
          loadingCost={loadingAddDetails || loadingScreenSummary}
          successCampaignDetails={successAddDetails}
        />
      </div>
    </div>
  );
};
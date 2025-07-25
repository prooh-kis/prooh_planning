import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { message, Tooltip } from "antd";

// Components
import { PlanSummaryTable } from "./PlanSummaryTable";
import { Footer } from "../../components/footer";

// Actions & Constants
import {
  getPlanningPageFooterData,
  getRegularVsCohortPriceData,
  getScreenSummaryData,
  getScreenSummaryPlanTableData,
} from "../../actions/screenAction";
import { addDetailsToCreateCampaign } from "../../actions/campaignAction";
import { ADD_DETAILS_TO_CREATE_CAMPAIGN_RESET } from "../../constants/campaignConstants";

// Utils
import { screenSummaryTabData } from "../../utils/hardCoddedData";
import { LoadingScreen } from "../../components/molecules/LoadingScreen";
import { TabWithIcon, TabWithoutIcon, ViewPlanPic } from "../../components";
import { ScreenFilters } from "../../components/segments/ScreenFilters";
import { ScreenSummaryTable } from "./ScreenSummaryTable";
import {
  getDataFromLocalStorage,
  saveDataOnLocalStorage,
} from "../../utils/localStorageUtils";
import {
  SCREEN_SUMMARY_SELECTION,
  SCREEN_TYPE_TOGGLE_SELECTION,
} from "../../constants/localStorageConstants";
import { CAMPAIGN_CREATION_ADD_DETAILS_TO_CREATE_CAMPAIGN_PLANNING_PAGE } from "../../constants/userConstants";

interface ScreenSummaryDetailsProps {
  setCurrentStep: (step: number) => void;
  step: number;
  campaignId?: any;
  regularVsCohortSuccessStatus?: any;
  campaignDetails?: any;
}

export const ScreenSummaryDetails = ({
  setCurrentStep,
  step,
  campaignId,
  campaignDetails,
}: ScreenSummaryDetailsProps) => {
  const dispatch = useDispatch<any>();
  const { pathname } = useLocation();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const regularVsCohort = campaignDetails?.selectedType;

  // State
  const [currentTab, setCurrentTab] = useState("1");
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
  const [screenSummaryTableData, setScreenSummaryTableData] = useState<any>({});

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
  } = useSelector((state: any) => state.screenSummaryDataGet);

  const {
    loading: loadingPriceData,
    data: priceData,
    error: errorPriceData,
  } = useSelector((state: any) => state.regularVsCohortPriceDataGet);

  const {
    loading: loadingScreenSummaryPlanTable,
    error: errorScreenSummaryPlanTable,
    data: screenSummaryPlanTableData,
  } = useSelector((state: any) => state.screenSummaryPlanTableDataGet);

  // Memoized values
  const memoizedScreenData = useMemo(
    () => screenSummaryData || {},
    [screenSummaryData]
  );
  const isViewPage = pathname.split("/").includes("view");
  const isStoreBasedPlan = pathname.split("/").includes("storebasedplan");

  const cityTabData = useMemo(() => {
    return Object.keys(screensBuyingCount).map((city, index) => {
      const cityScreens = screensBuyingCount[city] || {};
      const selectedCount = Object.values(cityScreens).filter(
        (s: any) => s.status
      ).length;

      return {
        id: `${index + 1}`,
        label: city,
        params: [
          selectedCount,
          Object.values(cityScreens).length - selectedCount,
        ],
      };
    });
  }, [screensBuyingCount]);

  // Handlers
  const handleClickOutside = useCallback((event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false);
    }
  }, []);

  const getSelectedScreenIdsFromAllCities = useCallback(
    (citiesData: any = {}) => {
      return Object.values(citiesData).flatMap((cityScreens: any) =>
        Object.entries(cityScreens)
          .filter(([_, screen]: [any, any]) => screen?.status)
          .map(([screenId]) => screenId)
      );
    },
    []
  );

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

  const handleScreenClick = useCallback(
    ({ screen, city, statusRes }: any) => {
      const screenId = screen._id;

      setScreensBuyingCount((prev: any) => {
        const newState = {
          ...prev,
          [city]: {
            ...prev[city],
            [screenId]: {
              status: statusRes ?? !prev[city]?.[screenId]?.status,
              data: screen,
            },
          },
        };

        // Immediately update filters after state change
        const updatedFilters = {
          zones: new Set(zoneFilters),
          tps: new Set(tpFilters),
          sts: new Set(stFilters),
        };

        if (statusRes !== undefined) {
          if (statusRes) {
            if (screen.location?.zoneOrRegion)
              updatedFilters.zones.add(screen.location.zoneOrRegion);
            if (screen.location?.touchPoint)
              updatedFilters.tps.add(screen.location.touchPoint);
            if (screen.screenType) updatedFilters.sts.add(screen.screenType);
          } else {
            // Check if we should remove the filters when deselecting
            const shouldRemoveZone = !Object.values(newState[city] || {}).some(
              (s: any) =>
                s.status &&
                s.data.location?.zoneOrRegion === screen.location?.zoneOrRegion
            );
            const shouldRemoveTp = !Object.values(newState[city] || {}).some(
              (s: any) =>
                s.status &&
                s.data.location?.touchPoint === screen.location?.touchPoint
            );
            const shouldRemoveSt = !Object.values(newState[city] || {}).some(
              (s: any) => s.status && s.data.screenType === screen.screenType
            );

            if (shouldRemoveZone && screen.location?.zoneOrRegion) {
              updatedFilters.zones.delete(screen.location.zoneOrRegion);
            }
            if (shouldRemoveTp && screen.location?.touchPoint) {
              updatedFilters.tps.delete(screen.location.touchPoint);
            }
            if (shouldRemoveSt && screen.screenType) {
              updatedFilters.sts.delete(screen.screenType);
            }
          }
        }

        setZoneFilters(Array.from(updatedFilters.zones));
        setTpFilters(Array.from(updatedFilters.tps));
        setStFilters(Array.from(updatedFilters.sts));

        return newState;
      });

      saveDataOnLocalStorage(SCREEN_SUMMARY_SELECTION, {
        [campaignId]: {
          ...screensBuyingCount,
          [city]: {
            ...screensBuyingCount[city],
            [screenId]: {
              status:
                statusRes ?? !screensBuyingCount[city]?.[screenId]?.status,
              data: screen,
            },
          },
        },
      });
    },
    [campaignId, screensBuyingCount, zoneFilters, tpFilters, stFilters]
  );

  const handleSave = useCallback(() => {
    if (!isViewPage) {
      if (getSelectedScreenIdsFromAllCities(screensBuyingCount)?.length === 0) {
        dispatch({ type: ADD_DETAILS_TO_CREATE_CAMPAIGN_RESET });
        return message.error(
          "Please select atleast 1 screen to proceed further..."
        );
      }
      if (currentTab === "1") {
        saveDataOnLocalStorage(SCREEN_SUMMARY_SELECTION, {
          [campaignId]: screensBuyingCount,
        });
        setCurrentTab("2");
      } else {
        dispatch(
          addDetailsToCreateCampaign({
            event:
              CAMPAIGN_CREATION_ADD_DETAILS_TO_CREATE_CAMPAIGN_PLANNING_PAGE,
            pageName: "Screen Summary Page",
            id: campaignId,
            totalScreens: getSelectedScreenIdsFromAllCities(screensBuyingCount),
            totalImpression: screenSummaryPlanTableData?.total?.totalImpression,
            totalReach: screenSummaryPlanTableData?.total?.totalReach,
            totalCampaignBudget:
              screenSummaryPlanTableData?.total?.totalCampaignBudget,
            totalCpm: screenSummaryPlanTableData?.total?.totalCpm,
            duration: campaignDetails?.duration,
          })
        );
      }
    } else {
      setCurrentStep(step + 1);
    }
  }, [
    isViewPage,
    getSelectedScreenIdsFromAllCities,
    screensBuyingCount,
    currentTab,
    dispatch,
    campaignId,
    screenSummaryPlanTableData?.total?.totalImpression,
    screenSummaryPlanTableData?.total?.totalReach,
    screenSummaryPlanTableData?.total?.totalCampaignBudget,
    screenSummaryPlanTableData?.total?.totalCpm,
    campaignDetails?.duration,
    setCurrentStep,
    step,
  ]);

  // Effects
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [handleClickOutside]);

  useEffect(() => {
    if (errorScreenSummary) {
      message.error("Error in fetching screen summary data...");
    }
    if (errorAddDetails) {
      message.error("Error in fetching Add Details...");
    }
  }, [errorScreenSummary, errorAddDetails]);

  useEffect(() => {
    if (!campaignDetails) return;

    dispatch(
      getScreenSummaryData({
        id: campaignId,
        type: campaignDetails?.selectedType,
      })
    );
    dispatch(
      getPlanningPageFooterData({
        id: campaignId,
        pageName: "Screen Summary Page",
      })
    );
  }, [campaignId, campaignDetails, dispatch]);

  useEffect(() => {
    if (errorScreenSummaryPlanTable) {
      message.error(
        "Error in fetching plan summary data for selected screens..."
      );
    }
    if (errorPriceData) {
      message.error("Error in fetching audience wise pricing data...");
    }

    if (currentTab == "2") {
      const screenIds = getSelectedScreenIdsFromAllCities(screensBuyingCount);
      dispatch(
        getScreenSummaryPlanTableData({ id: campaignDetails?._id, screenIds })
      );

      if (!priceData) {
        dispatch(
          getRegularVsCohortPriceData({
            id: campaignDetails?._id,
            screenIds,
            cohorts: campaignDetails?.cohorts,
            gender: campaignDetails?.gender,
            duration: campaignDetails?.duration,
          })
        );
      }
    }
  }, [
    campaignDetails,
    currentTab,
    dispatch,
    errorPriceData,
    errorScreenSummaryPlanTable,
    getSelectedScreenIdsFromAllCities,
    priceData,
    screensBuyingCount,
  ]);

  useEffect(() => {
    if (successAddDetails) {
      dispatch({ type: ADD_DETAILS_TO_CREATE_CAMPAIGN_RESET });
      setCurrentStep(step + 1);
    }
  }, [successAddDetails, step, setCurrentStep, dispatch]);

  useEffect(() => {
    if (screensBuyingCount && Object.keys(screensBuyingCount).length > 0) {
      const selectedCity =
        Object.keys(screensBuyingCount)[Number(currentSummaryTab) - 1];
      if (selectedCity && selectedCity !== currentCity) {
        setCurrentCity(selectedCity);
      }
    }
  }, [screensBuyingCount, currentSummaryTab, currentCity]);

  useEffect(() => {
    reEvaluateFilters();
  }, [currentCity, screensBuyingCount, reEvaluateFilters]);

  useEffect(() => {
    if (
      currentTab === "1" &&
      Object.keys(screensBuyingCount).length === 0 &&
      screenSummaryData
    ) {
      // Restore selections when coming back to tab 1
      const storedSelection = getDataFromLocalStorage(
        SCREEN_SUMMARY_SELECTION
      )?.[campaignId];
      if (storedSelection) {
        setScreensBuyingCount(storedSelection);
      }
    }
  }, [campaignId, currentTab, screenSummaryData, screensBuyingCount]);

  useEffect(() => {
    return () => {
      if (successAddDetails) {
        localStorage.removeItem(SCREEN_SUMMARY_SELECTION);
        localStorage.removeItem(SCREEN_TYPE_TOGGLE_SELECTION);
      }
    };
  }, [successAddDetails]);

  // Filtered data - now updates in real-time
  const filteredScreensData = useMemo(() => {
    if (!screensBuyingCount || !Object.keys(screensBuyingCount).length) {
      return { result: [], allResult: [] };
    }

    const selectedCityScreens =
      screensBuyingCount[
        Object.keys(screensBuyingCount)[Number(currentSummaryTab) - 1]
      ] ?? {};

    const allScreens = Object.values(selectedCityScreens).map(
      (f: any) => f.data
    );

    const filtered = allScreens.filter(
      (s: any) =>
        (zoneFilters.length === 0 ||
          zoneFilters.includes(s.location?.zoneOrRegion ?? "")) &&
        (tpFilters.length === 0 ||
          tpFilters.includes(s.location?.touchPoint ?? "")) &&
        (stFilters.length === 0 || stFilters.includes(s.screenType ?? ""))
    );

    return { result: filtered, allResult: allScreens };
  }, [
    screensBuyingCount,
    currentSummaryTab,
    zoneFilters,
    tpFilters,
    stFilters,
  ]);

  const handleFilterSelection = useCallback(
    ({ type, value, checked }: any) => {
      // Update filter state immediately
      if (type === "zone") {
        setZoneFilters((prev) =>
          checked ? [...prev, value] : prev.filter((item) => item !== value)
        );
      } else if (type === "tp") {
        setTpFilters((prev) =>
          checked ? [...prev, value] : prev.filter((item) => item !== value)
        );
      } else if (type === "st") {
        setStFilters((prev) =>
          checked ? [...prev, value] : prev.filter((item) => item !== value)
        );
      }

      // Update screen selections based on filter change
      if (currentCity && screensBuyingCount[currentCity]) {
        const screensToUpdate = Object.entries(screensBuyingCount[currentCity])
          .filter(([_, screen]: [any, any]) => {
            const s = screen.data;
            if (type === "zone") return s.location?.zoneOrRegion === value;
            if (type === "tp") return s.location?.touchPoint === value;
            if (type === "st") return s.screenType === value;
            return false;
          })
          .map(([id, screen]: any) => ({ id, screen }));

        if (screensToUpdate.length > 0) {
          setScreensBuyingCount((prev: any) => {
            const newState = { ...prev };
            screensToUpdate.forEach(({ id, screen }) => {
              newState[currentCity] = {
                ...newState[currentCity],
                [id]: {
                  ...screen,
                  status: checked,
                },
              };
            });
            saveDataOnLocalStorage(SCREEN_SUMMARY_SELECTION, {
              [campaignId]: newState,
            });
            return newState;
          });
        }
      }
    },
    [currentCity, screensBuyingCount, campaignId]
  );

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
        <span className="text-[#6f7fbe]">
          ({regularVsCohort === "cohort" ? "Cohort" : "Regular"} Plan)
        </span>
      </h1>
      <h1 className="text-[14px] text-gray-500 treading-[29px]">
        You can further optimize your plan by deselecting locations in the
        screen summary
      </h1>

      {!isStoreBasedPlan && (
        <div className="mt-4">
          <TabWithIcon
            currentTab={currentTab}
            setCurrentTab={(e: any) => {
              saveDataOnLocalStorage(SCREEN_SUMMARY_SELECTION, {
                [campaignId]: screensBuyingCount,
              });
              setCurrentTab(e);
            }}
            tabData={screenSummaryTabData}
            justify="justify-start"
          />
        </div>
      )}

      <div className="pb-2">
        {currentTab === "1" ? (
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
                    onClick={() => setIsOpen((prev) => !prev)}
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
              <ScreenSummaryTable
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
                setScreenSummaryTableData={setScreenSummaryTableData}
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
                <div className="col-span-9 rounded grid grid-cols-12 flex flex-wrap gap-8 overflow-scroll no-scrollbar h-[60vh]">
                  {filteredScreensData.result?.map(
                    (screen: any, index: any) => (
                      <div key={index} className="col-span-3">
                        <ViewPlanPic
                          screen={screen}
                          screens={screensBuyingCount}
                          currentSummaryTab={currentSummaryTab}
                          handleScreenClick={handleScreenClick}
                        />
                      </div>
                    )
                  )}
                </div>
              </div>
            )}
          </div>
        ) : (
          <PlanSummaryTable
            regularVsCohort={regularVsCohort}
            loadingScreenSummaryPlanTable={loadingScreenSummaryPlanTable}
            loadingPriceData={loadingPriceData}
            priceData={priceData}
            screenSummaryPlanTableData={screenSummaryPlanTableData}
          />
        )}
      </div>

      <div className="px-4 fixed bottom-0 left-0 w-full bg-[#FFFFFF]">
        <Footer
          mainTitle="Continue"
          handleBack={() => setCurrentStep(step - 1)}
          handleSave={handleSave}
          campaignId={campaignId}
          pageName={
            isStoreBasedPlan && currentTab === "1"
              ? "Select Screens Page"
              : "Screen Summary Page"
          }
          loadingCost={loadingAddDetails || loadingScreenSummary}
          successCampaignDetails={successAddDetails}
        />
      </div>
    </div>
  );
};

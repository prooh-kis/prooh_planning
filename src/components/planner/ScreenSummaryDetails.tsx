import { TabWithoutIcon } from "../molecules/TabWithoutIcon";
import { TabWithIcon } from "../molecules/TabWithIcon";
import React, { useCallback, useEffect, useState } from "react";
import { screenSummaryTabData } from "../../utils/hardCoddedData";
import { ScreenSummaryTable } from "../tables/ScreenSummaryTable";
import { ViewPlanPic } from "../segments/ViewPlanPic";
import { PlanSummaryTable } from "../tables/PlanSummaryTable";
import { useDispatch, useSelector } from "react-redux";
import {
  getPlanningPageFooterData,
  getScreenSummaryData,
  getScreenSummaryPlanTableData,
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
} from "../../constants/localStorageConstants";
import { addDetailsToCreateCampaign } from "../../actions/campaignAction";
import { Loading } from "../../components/Loading";
import { message, Tooltip } from "antd";

interface Tab {
  label: string;
  id: string;
}

interface ScreenSummaryDetailsProps {
  setCurrentStep: (step: number) => void;
  step: number;
  campaignId?: any;
  regularVsCohortSuccessStatus?: any;
  successAddCampaignDetails?: any;
  success?: any;
}

export const ScreenSummaryDetails = ({
  setCurrentStep,
  step,
  campaignId,
  regularVsCohortSuccessStatus,
  success,
  successAddCampaignDetails,
}: ScreenSummaryDetailsProps) => {
  const dispatch = useDispatch<any>();
  const { pathname } = useLocation();

  const [currentTab, setCurrentTab] = useState<string>("1");

  const [currentSummaryTab, setCurrentSummaryTab] = useState<any>("1");
  const [currentCity, setCurrentCity] = useState<string>("");
  const [citiesCreative, setCitiesCreative] = useState<any>([]);
  const [cityTabData, setCityTabData] = useState<any>([]);

  const [priceFilter, setPriceFilter] = useState<any>({
    min: 1,
    max: 300,
  });

  const [regularVsCohort, setRegularVsCohort] = useState<any>(
    getDataFromLocalStorage(FULL_CAMPAIGN_PLAN)?.[campaignId]?.selectedType
  );
  const [showSummary, setShowSummary] = useState<any>(null);

  const [listView, setListView] = useState<any>(true);
  const [cityZones, setCityZones] = useState<any>({});
  const [cityTP, setCityTP] = useState<any>({});
  const [screenTypes, setScreenTypes] = useState<any>({});

  const [screensBuyingCount, setScreensBuyingCount] = useState(() => {
    // Check localStorage on the first load
    return getDataFromLocalStorage(SCREEN_SUMMARY_SELECTION)?.[campaignId]
      ? getDataFromLocalStorage(SCREEN_SUMMARY_SELECTION)?.[campaignId]
      : {};
  });
  const [visitedTab, setVisitedTab] = useState<any>([]);

  const screenSummaryDataGet = useSelector(
    (state: any) => state.screenSummaryDataGet
  );
  const {
    loading: loadingScreenSummary,
    error: errorScreenSummary,
    data: screenSummaryData,
  } = screenSummaryDataGet;

  const screenSummaryPlanTableDataGet = useSelector(
    (state: any) => state.screenSummaryPlanTableDataGet
  );
  const {
    loading: loadingScreenSummaryPlanTable,
    error: errorScreenSummaryPlanTable,
    data: screenSummaryPlanTableData,
  } = screenSummaryPlanTableDataGet;

  const getSelectedScreenIdsFromAllCities = (citiesData: any) => {
    let activeScreenIds: any = [];

    for (const city in citiesData) {
      const screens = citiesData[city];
      const activeScreens = Object.keys(screens).filter(
        (screenId) => screens[screenId].status === true
      );
      activeScreenIds = activeScreenIds.concat(activeScreens);
    }

    return activeScreenIds;
  };

  const handleSelectCurrentTab = (id: string) => {
    setCurrentSummaryTab(id);

    const city = citiesCreative?.find((data: any) => data.id === id)?.label;
    if (city) {
      setCurrentCity(city);
    } else {
      setCurrentCity(currentCity);
    }
    setVisitedTab((pre: any) => {
      return pre.map((data: any) => {
        if (data?.id == id) {
          data.visited = true;
          // console.log(data);
        }
        // console.log(data, "2");

        return { pre, ...data };
      });
    });
  };

  const getTabValue = (dataScreenSummary: any) => {
    if (
      dataScreenSummary &&
      getDataFromLocalStorage(SCREEN_SUMMARY_SELECTION)?.[campaignId] &&
      Object.keys(
        getDataFromLocalStorage(SCREEN_SUMMARY_SELECTION)?.[campaignId]
      )?.length !== 0
    ) {
      return Object.keys(getDataFromLocalStorage(SCREEN_SUMMARY_SELECTION)?.[campaignId])?.map((s: any, index: any) => {
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
  };

  const refreshScreenSummary = () => {
    dispatch(
      getScreenSummaryPlanTableData({
        id: campaignId,
        screenIds: getSelectedScreenIdsFromAllCities(screensBuyingCount),
      })
    );
  };

  const handleSetVisitedValue = (dataScreenSummary: any) => {
    let data: any = [];
    if (
      dataScreenSummary &&
      getDataFromLocalStorage(SCREEN_SUMMARY_SELECTION)?.[campaignId] &&
      Object.keys(
        getDataFromLocalStorage(SCREEN_SUMMARY_SELECTION)?.[campaignId] || {}
      )?.length !== 0
    ) {
      data = Object.keys(dataScreenSummary).map((s: any, index: any) => {
        return {
          id: `${index + 1}`,
          visited: index == 0 ? true : false,
        };
      });
    }
    setVisitedTab([...data]);
  };

  const handleSaveAndContinue = async () => {
    if (pathname.split("/").splice(-2)[0] === "iknowitallplan") {
      console.log(getSelectedScreenIdsFromAllCities(screensBuyingCount));
      console.log(getDataFromLocalStorage(FULL_CAMPAIGN_PLAN)?.[campaignId])
      if (currentTab === "1") {
        dispatch(
          addDetailsToCreateCampaign({
            pageName: "Select Screens Page",
            id: pathname.split("/").splice(-1)[0],
            screenIds: getSelectedScreenIdsFromAllCities(screensBuyingCount),
          })
        );
      } else if (currentTab === "2") {
        dispatch(
          addDetailsToCreateCampaign({
            pageName: "Screen Summary Page",
            id: pathname.split("/").splice(-1)[0],
            totalScreens: getSelectedScreenIdsFromAllCities(screensBuyingCount),
            totalImpression:
            getDataFromLocalStorage(SCREEN_SUMMARY_TABLE_DATA)?.[campaignId]?.total
              ?.totalImpression,
          totalReach:
            getDataFromLocalStorage(SCREEN_SUMMARY_TABLE_DATA)?.[campaignId]?.total
              ?.totalReach,
          totalCampaignBudget:
            getDataFromLocalStorage(SCREEN_SUMMARY_TABLE_DATA)?.[campaignId]?.total
              ?.totalCampaignBudget,
          totalCpm:
            getDataFromLocalStorage(SCREEN_SUMMARY_TABLE_DATA)?.[campaignId]?.total
              ?.totalCpm,
          })
        );
      }
    } else {
      dispatch(
        addDetailsToCreateCampaign({
          pageName: "Screen Summary Page",
          id: pathname.split("/").splice(-1)[0],
          totalScreens: getSelectedScreenIdsFromAllCities(screensBuyingCount),
          totalImpression:
            getDataFromLocalStorage(FULL_CAMPAIGN_PLAN)?.[campaignId]
              ?.totalImpression,
          totalReach:
            getDataFromLocalStorage(FULL_CAMPAIGN_PLAN)?.[campaignId]
              ?.totalReach,
          totalCampaignBudget:
            getDataFromLocalStorage(FULL_CAMPAIGN_PLAN)?.[campaignId]
              ?.totalCampaignBudget,
          totalCpm:
            getDataFromLocalStorage(FULL_CAMPAIGN_PLAN)?.[campaignId]
              ?.totalCpm,
        })
      );
    }

    setCurrentStep(step + 1);
  };

  useEffect(() => {
    if (
      pathname.split("/").splice(-2)[0] !== "iknowitallplan" ||
      step === 2
    ) {
      dispatch(
        getScreenSummaryData({
          id: campaignId,
          type: getDataFromLocalStorage(FULL_CAMPAIGN_PLAN)?.[campaignId]
            ?.selectedType,
        })
      );
    }

    dispatch(
      getPlanningPageFooterData({
        id: campaignId,
        pageName: "Screen Summary Page",
      })
    );
  }, [campaignId, dispatch, pathname, currentTab]);

  useEffect(() => {
    const type =
      getDataFromLocalStorage(FULL_CAMPAIGN_PLAN)?.[campaignId]?.selectedType;
    setRegularVsCohort(type);
    if (pathname.split("/").includes("iknowitallplan") && step === 4) {
      setCurrentTab("2");
    } else {
      setCurrentTab("1");
    }
    // if (screenSummaryPlanTableData) {
    //   saveDataOnLocalStorage(SCREEN_SUMMARY_TABLE_DATA, {
    //     [campaignId]: screenSummaryPlanTableData,
    //   });
    // }

  }, [campaignId, pathname, screenSummaryPlanTableData, step]);

  useEffect(() => {
    if (screenSummaryData) {
      // console.log(screenSummaryData);
      dispatch(
        getScreenSummaryPlanTableData({
          id: campaignId,
          screenIds: getSelectedScreenIdsFromAllCities(screensBuyingCount),
        })
      );

      saveDataOnLocalStorage(SCREEN_SUMMARY_SELECTION, {
        [campaignId]: screensBuyingCount,
      });
      setCityTabData(getTabValue(screenSummaryData));
    }
  }, [
    dispatch,
    campaignId,
    screenSummaryData,
    screensBuyingCount,
  ]);

  useEffect(() => {
    // if (errorScreenSummary) {
    //   window.location.reload();
    // }
  }, [errorScreenSummary]);

  console.log("cityTabData : ", cityTabData);

  return (
    <div className="w-full py-3">
      <h1 className="text-3xl ">
        Screens summary as per “
        {regularVsCohort === "cohort" ? "COHORT" : "REGULAR"}” selection{" "}
      </h1>
      <h1 className="text-sm text-gray-500 ">
        You can further optimized your plan by deselecting locations in the
        screen summary
      </h1>
      {pathname.split("/").splice(-2)[0] === "iknowitallplan" ? (
        <></>
      ) : (
        <div className="mt-2">
          {!loadingScreenSummary && screenSummaryData && (
            <TabWithIcon
              currentTab={currentTab}
              setCurrentTab={setCurrentTab}
              tabData={screenSummaryTabData}
            />
          )}
        </div>
      )}

      {loadingScreenSummary ? (
        <Loading />
      ) : errorScreenSummary ? (
        <div className="p-4 bg-red-300 text-[#FFFFFF] ">
          Something went wrong! please refresh the page...
        </div>
      ) : (
        <div className="pb-10">
          {currentTab === "1" ? (
            <div>
              <div className="py-2 grid grid-cols-12 flex justify-between">
                <div className="col-span-8 overflow-x-scroll no-scrollbar">
                  {!loadingScreenSummary &&
                    screenSummaryData &&
                    cityTabData?.length !== 0 && (
                      <TabWithoutIcon
                        currentTab={currentSummaryTab}
                        setCurrentTab={handleSelectCurrentTab}
                        tabData={cityTabData}
                      />
                    )}
                </div>
                <div className="col-span-4 flex gap-2 truncate">
                  <Tooltip title="Single click to select the filter and Double click to deselect the filter">
                    <div
                      className={`truncate px-1 border ${priceFilter.min === 1 && priceFilter.max === 100
                        ? "border-[#129BFF]"
                        : ""
                        } rounded flex items-center gap-1`}
                      onClick={() => {
                        setPriceFilter({
                          min: 1,
                          max: 100,
                        });
                      }}
                      onDoubleClick={() => {
                        setPriceFilter({
                          min: 1,
                          max: 300,
                        });
                      }}
                    >
                      <i className="fi fi-sr-star flex items-center text-[12px] text-[#F1BC00]"></i>
                      <p className="text-[12px] truncate">
                        &#8377;1 - &#8377;100
                      </p>
                    </div>
                  </Tooltip>
                  <Tooltip title="Single click to select the filter and Double click to deselect the filter">
                    <div
                      className={`truncate px-1 border ${priceFilter.min === 100 && priceFilter.max === 300
                        ? "border-[#129BFF]"
                        : ""
                        } rounded flex items-center gap-1`}
                      onClick={() => {
                        setPriceFilter({
                          min: 100,
                          max: 300,
                        });
                      }}
                      onDoubleClick={() => {
                        setPriceFilter({
                          min: 1,
                          max: 300,
                        });
                      }}
                    >
                      <i className="fi fi-sr-star flex items-center text-[12px] text-[#F1BC00]"></i>
                      <i className="fi fi-sr-star flex items-center text-[12px] text-[#F1BC00]"></i>
                      <p className="text-[12px] truncate">
                        &#8377;101 - &#8377;300
                      </p>
                    </div>
                  </Tooltip>
                  <Tooltip title="Click to see the list view">
                    <div
                      className={`truncate px-1 border rounded flex items-center gap-1 ${listView && "border-primaryButton"
                        }`}
                      onClick={() => setListView(true)}
                    >
                      <i
                        className={`fi fi-rr-table-list flex items-center
                          text-[12px]
                          ${listView && "text-primaryButton"}`}
                      ></i>
                      <p
                        className={`${listView && "text-primaryButton"
                          } text-[12px] truncate`}
                      >
                        List View
                      </p>
                    </div>
                  </Tooltip>
                  <Tooltip title="Click to see the grid view">
                    <div
                      className={`truncate px-1 border rounded flex items-center gap-1 ${!listView && "border-primaryButton"
                        }`}
                      onClick={() => setListView(false)}
                    >
                      <i
                        className={`fi fi-sr-apps flex items-center
                          text-[12px]
                          ${!listView && "text-primaryButton"}`}
                      ></i>
                      <p
                        className={`${!listView && "text-primaryButton"
                          } text-[12px] truncate`}
                      >
                        Grid View
                      </p>
                    </div>
                  </Tooltip>
                </div>
              </div>
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
                  refreshScreenSummary={refreshScreenSummary}
                  priceFilter={priceFilter}
                  campaignId={campaignId}
                  listView={listView}
                />
              ) : (
                <ViewPlanPic
                  currentSummaryTab={currentSummaryTab}
                  screensBuyingCount={screensBuyingCount}
                  setScreensBuyingCount={setScreensBuyingCount}
                  refreshScreenSummary={refreshScreenSummary}
                  cityZones={cityZones}
                  cityTP={cityTP}
                  screenTypes={screenTypes}
                  setCurrentCity={setCurrentCity}
                  priceFilter={priceFilter}
                  listView={listView}
                />
              )}
            </div>
          ) : (
            currentTab === "2" && (
              <div className="w-full">
                <PlanSummaryTable
                  success={success}
                  showSummary={showSummary}
                  setShowSummary={setShowSummary}
                  regularVsCohort={regularVsCohort}
                  loading={loadingScreenSummaryPlanTable}
                  error={errorScreenSummaryPlanTable}
                  data={screenSummaryPlanTableData}
                  getSelectedScreenIdsFromAllCities={
                    getSelectedScreenIdsFromAllCities
                  }
                  campaignId={campaignId}
                  screensBuyingCount={screensBuyingCount}
                  pathname={pathname}
                />
              </div>
            )
          )}
        </div>
      )}
      <div className="px-4 fixed bottom-0 left-0 w-full bg-[#FFFFFF]">
        <Footer
          handleBack={() => {
            setCurrentStep(step - 1);
          }}
          handleSave={() => {
            let result =
              visitedTab?.filter((data: any) => data.visited == false)?.length >
              0;
            // if (result) {
            //   message.warning("Please visit all city wise screens once");
            // } else {
            handleSaveAndContinue();
            // }
          }}
          campaignId={campaignId}
          pageName="Screen Summary Page"
          successAddCampaignDetails={successAddCampaignDetails}
        />
      </div>
    </div>
  );
};

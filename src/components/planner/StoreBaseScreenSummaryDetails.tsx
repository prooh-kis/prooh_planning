import { TabWithoutIcon } from "../molecules/TabWithoutIcon";
import React, { useEffect, useState } from "react";
import { ScreenSummaryTable } from "../tables/ScreenSummaryTable";
import { ViewPlanPic } from "../segments/ViewPlanPic";
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
import { Footer } from "../footer";
import {
  FULL_CAMPAIGN_PLAN,
  SCREEN_SUMMARY_SELECTION,
} from "../../constants/localStorageConstants";
import { addDetailsToCreateCampaign } from "../../actions/campaignAction";
import { Tooltip } from "antd";
import { ADD_DETAILS_TO_CREATE_CAMPAIGN_RESET } from "../../constants/campaignConstants";
import { LoadingScreen } from "../molecules/LoadingScreen";

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

  const [currentSummaryTab, setCurrentSummaryTab] = useState<any>("1");
  const [currentCity, setCurrentCity] = useState<string>("");
  const [citiesCreative, setCitiesCreative] = useState<any>([]);
  const [cityTabData, setCityTabData] = useState<any>([]);
  const [pageLoading, setPageLoading] = useState<boolean>(true);
  const [priceFilter, setPriceFilter] = useState<any>({
    min: 1,
    max: 300,
  });

  const [regularVsCohort, setRegularVsCohort] = useState<any>(
    getDataFromLocalStorage(FULL_CAMPAIGN_PLAN)?.[campaignId]?.selectedType
  );
  const [listView, setListView] = useState<any>(true);
  const [cityZones, setCityZones] = useState<any>({});
  const [cityTP, setCityTP] = useState<any>({});
  const [screenTypes, setScreenTypes] = useState<any>({});

  const [screensBuyingCount, setScreensBuyingCount] = useState(() => {
    // Check localStorage on the first load
    return (
      getDataFromLocalStorage(SCREEN_SUMMARY_SELECTION)?.[campaignId] ?? {}
    );
  });

  const screenSummaryDataGet = useSelector(
    (state: any) => state.screenSummaryDataGet
  );
  const {
    loading: loadingScreenSummaryIKnowItAll,
    error: errorScreenSummaryIKnowItAll,
    data: screenSummaryDataIKnowItAll,
  } = screenSummaryDataGet;

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
  };

  const getTabValue = (dataScreenSummary: any) => {
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
  };

  const handleSaveAndContinue = async () => {
    if (!pathname.split("/").includes("view")) {

      dispatch(
        addDetailsToCreateCampaign({
          pageName: "Select Screens Page",
          id: pathname.split("/").splice(-1)[0],
          screenIds: getSelectedScreenIdsFromAllCities(screensBuyingCount),
        })
      );
    }
    setCurrentStep(step + 1);
  };

  useEffect(() => {
    if (!successAddCampaignDetails) return;
    dispatch({
      type: ADD_DETAILS_TO_CREATE_CAMPAIGN_RESET,
    });
    setPageSuccess(true);
  }, [successAddCampaignDetails]);

  useEffect(() => {
    if (!pageSuccess) return;
    dispatch({
      type: ADD_DETAILS_TO_CREATE_CAMPAIGN_RESET,
    });
    dispatch(
      getScreenSummaryData({
        id: campaignId,
        type: getDataFromLocalStorage(FULL_CAMPAIGN_PLAN)?.[campaignId]
          ?.selectedType,
      })
    );
    dispatch(
      getPlanningPageFooterData({
        id: campaignId,
        pageName: "Select Screens Page",
      })
    );
  }, [campaignId, dispatch, pageSuccess]);

  useEffect(() => {
    const type =
      getDataFromLocalStorage(FULL_CAMPAIGN_PLAN)?.[campaignId]?.selectedType;
    setRegularVsCohort(type);
  }, [campaignId]);

  useEffect(() => {
    if (screenSummaryDataIKnowItAll || screensBuyingCount) {
      saveDataOnLocalStorage(SCREEN_SUMMARY_SELECTION, {
        [campaignId]: screensBuyingCount,
      });
      setCityTabData(getTabValue(screenSummaryDataIKnowItAll));
      setPageLoading(false);
    }
  }, [dispatch, campaignId, screenSummaryDataIKnowItAll, screensBuyingCount]);

  return (
    <div className="w-full">
      {pageLoading ? (
        <LoadingScreen />
      ) : errorScreenSummaryIKnowItAll ? (
        <div className="p-4 bg-red-300 text-[#FFFFFF] ">
          Something went wrong! please refresh the page...
        </div>
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

          <div className="pb-10">
            <div className="w-full">
              <div className="py-2 grid grid-cols-12 flex justify-between">
                <div className="col-span-8 overflow-x-scroll no-scrollbar">
                  {!loadingScreenSummaryIKnowItAll &&
                    screenSummaryDataIKnowItAll &&
                    cityTabData?.length !== 0 && (
                      <TabWithoutIcon
                        currentTab={currentSummaryTab}
                        setCurrentTab={handleSelectCurrentTab}
                        tabData={cityTabData}
                      />
                    )}
                </div>
                <div className="col-span-4 flex  justify-end gap-2 truncate">
                  <Tooltip title="Single click to select the filter and Double click to deselect the filter">
                    <div
                      className={`truncate px-1 border ${
                        priceFilter.min === 1 && priceFilter.max === 100
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
                      className={`truncate px-1 border ${
                        priceFilter.min === 100 && priceFilter.max === 300
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
                      className={`truncate px-1 border rounded flex items-center gap-1 ${
                        listView && "border-primaryButton"
                      }`}
                      onClick={() => setListView(true)}
                    >
                      <i
                        className={`fi fi-rr-table-list flex items-center
                          text-[12px]
                          ${listView && "text-primaryButton"}`}
                      ></i>
                      <p
                        className={`${
                          listView && "text-primaryButton"
                        } text-[12px] truncate`}
                      >
                        List View
                      </p>
                    </div>
                  </Tooltip>
                  <Tooltip title="Click to see the grid view">
                    <div
                      className={`truncate px-1 border rounded flex items-center gap-1 ${
                        !listView && "border-primaryButton"
                      }`}
                      onClick={() => setListView(false)}
                    >
                      <i
                        className={`fi fi-sr-apps flex items-center
                          text-[12px]
                          ${!listView && "text-primaryButton"}`}
                      ></i>
                      <p
                        className={`${
                          !listView && "text-primaryButton"
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
                  data={screenSummaryDataIKnowItAll}
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
                  refreshScreenSummary={() => {}}
                  priceFilter={priceFilter}
                  campaignId={campaignId}
                  listView={listView}
                />
              ) : (
                <ViewPlanPic
                  currentSummaryTab={currentSummaryTab}
                  screensBuyingCount={screensBuyingCount}
                  setScreensBuyingCount={setScreensBuyingCount}
                  refreshScreenSummary={() => {}}
                  cityZones={cityZones}
                  cityTP={cityTP}
                  screenTypes={screenTypes}
                  setCurrentCity={setCurrentCity}
                  priceFilter={priceFilter}
                  listView={listView}
                />
              )}
            </div>
          </div>
          <div className="px-4 fixed bottom-0 left-0 w-full bg-[#FFFFFF]">
            <Footer
              handleBack={() => {
                setCurrentStep(step - 1);
              }}
              handleSave={() => {
                handleSaveAndContinue();
              }}
              campaignId={campaignId}
              pageName={`Select Screens Page`}
              successAddCampaignDetails={successAddCampaignDetails}
            />
          </div>
        </div>
      )}
    </div>
  );
};

import { TabWithoutIcon } from "../molecules/TabWithoutIcon";
import { TabWithIcon } from "../molecules/TabWithIcon";
import React, { useEffect, useState } from "react";
import {
  // screenSummaryData,
  screenSummaryTabData,
} from "../../utils/hardCoddedData";
import { ScreenSummaryTable } from "../tables/ScreenSummaryTable";
import { ViewPlanPic } from "../segments/ViewPlanPic";
import { PlanSummaryTable } from "../tables/PlanSummaryTable";
import { useDispatch, useSelector } from "react-redux";
import { getScreenSummaryData, getScreenSummaryPlanTableData } from "../../actions/screenAction";
import { getDataFromLocalStorage, saveDataOnLocalStorage } from "../../utils/localStorageUtils";
import { useLocation } from "react-router-dom";
import { Footer } from "../../components/footer";
import { REGULAR_VS_COHORT_PRICE_DATA, SCREEN_SUMMARY_DATA, SCREEN_SUMMARY_SELECTION, SCREEN_SUMMARY_TABLE_DATA } from "../../constants/localStorageConstants";
import { addDetailsToCreateCampaign } from "../../actions/campaignAction";
import { message } from "antd";

interface Tab {
  label: string;
  id: string;
}

interface EnterCampaignBasicDetailsProps {
  setCurrentStep: (step: number) => void;
  step: number;
}

export const ScreenSummaryDetails = ({
  setCurrentStep,
  step,
}: EnterCampaignBasicDetailsProps) => {
  const dispatch = useDispatch<any>();
  const { pathname } = useLocation();
  
  const [currentTab, setCurrentTab] = useState<string>("1");
  const [currentSummaryTab, setCurrentSummaryTab] = useState<any>("1");
  const [isDisabled, setIsDisabled] = useState<any>(true);

  const [regularVsCohort, setRegularVsCohort] = useState<any>(getDataFromLocalStorage("campaign").basicDetails["regularVsCohort"]);
  const [showSummary, setShowSummary] = useState<any>(null);

  const [listView, setListView] = useState<any>(true);
  const [currentCity, setCurrentCity] = useState<any>(null);
  const [cityZones, setCityZones] = useState<any>({});
  const [cityTP, setCityTP] = useState<any>({});
  const [screenTypes, setScreenTypes] = useState<any>({});


  const [screensBuyingCount, setScreensBuyingCount] = useState<any>(getDataFromLocalStorage(SCREEN_SUMMARY_SELECTION));

  // console.log(getDataFromLocalStorage("campaign").basicDetails)

  const screenSummaryDataGet = useSelector((state: any) => state.screenSummaryDataGet);
  const {
    loading: loadingScreenSummary,
    error: errorScreenSummary,
    data: screenSummaryData,
  } = screenSummaryDataGet;

  const screenSummaryPlanTableDataGet = useSelector((state: any) => state.screenSummaryPlanTableDataGet);
  const {
    loading: loadingScreenSummaryPlanTable,
    error: errorScreenSummaryPlanTable,
    data: screenSummaryPlanTableData,
  } = screenSummaryPlanTableDataGet;

  const getSelectedScreenIdsFromAllCities = (citiesData: any) => {
    let activeScreenIds: any = [];
    
    for (const city in citiesData) {
      const screens = citiesData[city];
      const activeScreens = Object.keys(screens).filter(screenId => screens[screenId].status === true);
      activeScreenIds = activeScreenIds.concat(activeScreens);
    }
    
    return activeScreenIds;
  };
  
  const refreshScreenSummary = () => {
    // dispatch(getScreenSummaryData({
    //   id: pathname.split("/").splice(-1)[0],
    //   type: getDataFromLocalStorage("campaign").basicDetails["regularVsCohort"]
    // }));

    dispatch(getScreenSummaryPlanTableData({
      id: pathname.split("/").splice(-1)[0],
      screenIds: getSelectedScreenIdsFromAllCities(screensBuyingCount),

    }));
  };

  useEffect(() => {
    if (!screenSummaryData) {
      dispatch(getScreenSummaryData({
        id: pathname.split("/").splice(-1)[0],
        type: getDataFromLocalStorage("campaign").basicDetails["regularVsCohort"]
      }))
    }

    if (!screenSummaryPlanTableData) {
      dispatch(getScreenSummaryPlanTableData({
        id: pathname.split("/").splice(-1)[0],
        screenIds: getSelectedScreenIdsFromAllCities(screensBuyingCount),
      }));
    }

  },[screenSummaryData, dispatch, pathname, screensBuyingCount, screenSummaryPlanTableData]);
  
  useEffect(() => {
    setRegularVsCohort(getDataFromLocalStorage("campaign").basicDetails["regularVsCohort"]);

    saveDataOnLocalStorage(SCREEN_SUMMARY_TABLE_DATA, screenSummaryPlanTableData);
    saveDataOnLocalStorage(SCREEN_SUMMARY_DATA, screenSummaryData);

  },[screenSummaryData, screenSummaryPlanTableData]);

  return (
    <div className="w-full py-3">
      <h1 className="text-3xl ">
        Screens summary as per “{regularVsCohort === "cohort" ? "COHORT" : "REGULAR"}” selection{" "}
      </h1>
      <h1 className="text-sm text-gray-500 ">
        You can further optimized your plan by deselecting locations in the
        screen summary
      </h1>
      <i className="fi fi-rr-screen-play text-black flex items-center"></i>

      <div className="mt-2">
        <TabWithIcon
          currentTab={currentTab}
          setCurrentTab={setCurrentTab}
          tabData={screenSummaryTabData}
        />
      </div>

      {loadingScreenSummary ? (
        <h1>Loading...</h1>
      ) : errorScreenSummary ? (
        <p>Error: {JSON.stringify(errorScreenSummary)}</p>
      ) : (
        <div className="">
    
          {currentTab === "1" ? (
            <div>
              <div className="py-2 flex justify-between">
                <div className="">
                  {screenSummaryData && screensBuyingCount && (
                    <TabWithoutIcon
                      currentTab={currentSummaryTab}
                      setCurrentTab={(tab: Tab) => {
                        setCurrentSummaryTab(tab);
                        setCurrentCity(Object.keys(screenSummaryData)[Number(tab) - 1]);
                      }}
                      tabData={Object.keys(screenSummaryData).map((s: any, index: any) => {
                        return {
                          id: `${index + 1}`,
                          label: s,
                          params: getDataFromLocalStorage(SCREEN_SUMMARY_SELECTION) !== null ? [
                            Object.values(getDataFromLocalStorage(SCREEN_SUMMARY_SELECTION)[s])?.map((f: any) => f.status)?.filter((s: any) => s === true).length,
                            Object.values(getDataFromLocalStorage(SCREEN_SUMMARY_SELECTION)[s])?.map((f: any) => f.status)?.filter((s: any) => s === false).length
                          ] : [0,0]
                        };
                      })}
                    />
                  )}
                </div>
                <div className="flex gap-2">
                  <div className="px-1 border rounded flex items-center gap-1 ">
                    <i className="fi fi-sr-star flex items-center text-[12px] text-yellow-500"></i>
                    <p className="text-[12px]">&#8377;200 - &#8377;400</p>
                  </div>
                  <div className="px-1 border rounded flex items-center gap-1">
                    <i className="fi fi-sr-star flex items-center text-[12px] text-yellow-500"></i>
                    <i className="fi fi-sr-star flex items-center text-[12px] text-yellow-500"></i>
                    <p className="text-[12px]">&#8377;400 - &#8377;600</p>
                  </div>
                  <div
                    className={`px-1 border rounded flex items-center gap-1 ${listView && "border-primaryButton"}`}
                    onClick={() => setListView(true)}
                  >
                    <i
                      className={
                        `fi fi-rr-table-list flex items-center
                        text-[12px]
                        ${listView && "text-primaryButton"}`
                      }
                    ></i>
                    <p className={`${listView && "text-primaryButton"} text-[12px]`}>List View</p>
                  </div>
                  <div 
                    className={`px-1 border rounded flex items-center gap-1 ${!listView && "border-primaryButton"}`}
                    onClick={() => setListView(false)}
                  >
                    <i className={
                        `fi fi-sr-apps flex items-center
                        text-[12px]
                        ${!listView && "text-primaryButton"}`
                      }></i>
                    <p className={`${!listView && "text-primaryButton"} text-[12px]`}>Grid View</p>
                  </div>
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
                />
              ) : (
                <ViewPlanPic
                  screens={Object.values(screensBuyingCount[currentCity])?.map((f: any) => f.data)}
                  cityZones={Object.keys(cityZones[currentCity])}
                  cityTP={Object.keys(cityTP[currentCity])}
                  screenTypes={Object.keys(screenTypes[currentCity])}
                />
              )}
            </div>
          ) : currentTab === "2" && (
            <div>
              <PlanSummaryTable
                showSummary={showSummary}
                setShowSummary={setShowSummary}
                regularVsCohort={regularVsCohort}
                loading={loadingScreenSummaryPlanTable}
                error={errorScreenSummaryPlanTable}
                data={screenSummaryPlanTableData}
              />
            </div>
          )}
        </div>
      )}
      <div className="px-4 fixed bottom-0 left-0 w-full bg-white">
        <Footer
          handleBack={() => {
            setCurrentStep(step - 1);
          }}
          handleSave={() => {
            // if (isDisabled) {
            //   message.error("Please  confirm screen selection");
            // } else {
              dispatch(addDetailsToCreateCampaign({
                pageName: "Screen Summary Page",
                id: pathname.split("/").splice(-1)[0],
                screenWiseSlotDetails: getDataFromLocalStorage(REGULAR_VS_COHORT_PRICE_DATA)?.[`${regularVsCohort}`].touchPointData,
                totalScreens: getSelectedScreenIdsFromAllCities(screensBuyingCount),
                totalImpression: getDataFromLocalStorage(SCREEN_SUMMARY_TABLE_DATA)["total"].totalImpression,
                totalReach: getDataFromLocalStorage(SCREEN_SUMMARY_TABLE_DATA)["total"].totalReach,
                totalCampaignBudget:getDataFromLocalStorage(SCREEN_SUMMARY_TABLE_DATA)["total"].totalCampaignBudget,
                totalCpm: getDataFromLocalStorage(SCREEN_SUMMARY_TABLE_DATA)["total"].totalCpm,
              }));
              setCurrentStep(step + 1);
            // };
          }}
          totalScreensData={{}}
        />
      </div>
    </div>
  );
};

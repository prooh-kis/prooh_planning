import { TabWithoutIcon } from "../molecules/TabWithoutIcon";
import { TabWithIcon } from "../molecules/TabWithIcon";
import React, { useEffect, useState } from "react";
import {
  // screenSummaryData,
  screenSummaryTabData,
} from "../../utils/hardCoddedData";
import { ScreenSummaryTable } from "../tables/ScreenSummaryTable";
import { ViewPlanPic } from "../segments/ViewPlanPic";
import { PlainSummary } from "../tables/PlainSummaryTable";
import { useDispatch, useSelector } from "react-redux";
import { getScreenSummaryData, getScreenSummaryPlanTableData } from "../../actions/screenAction";
import { getDataFromLocalStorage } from "../../utils/localStorageUtils";
import { useLocation } from "react-router-dom";
import { Footer } from "../../components/footer";

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
  const [currentTab, setCurrentTab] = useState<string>("1");
  const [currentSummaryTab, setCurrentSummaryTab] = useState<any>("1");
  const [listView, setListView] = useState<any>(true);
  const [currentCity, setCurrentCity] = useState<any>(null);
  const [cityZones, setCityZones] = useState<any>({});
  const [cityTP, setCityTP] = useState<any>({});
  const [screenTypes, setScreenTypes] = useState<any>({});


  const [screensBuyingCount, setScreensBuyingCount] = useState<any>(null);

  const dispatch = useDispatch<any>();
  const { pathname } = useLocation();
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


  useEffect(() => {
    if (!screenSummaryData) {
      dispatch(getScreenSummaryData({
        id: pathname.split("/").splice(-1)[0],
        type: getDataFromLocalStorage("campaign").basicDetails["regularVsCohort"]
      }))
    }
    dispatch(getScreenSummaryPlanTableData({
      id: pathname.split("/").splice(-1)[0],
    }));

  },[screenSummaryData, dispatch, pathname]);

  return (
    <div className="w-full py-3">
      <h1 className="text-3xl ">
        screens summary as per “cohort plan” selected{" "}
      </h1>
      <h1 className="text-sm text-gray-500 ">
        you can further optimized your plan by deselecting locations in the
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
                          params: [Object.values(screensBuyingCount[s])?.map((f: any) => f.status)?.filter((s: any) => s === true).length, Object.values(screensBuyingCount[s])?.map((f: any) => f.status)?.filter((s: any) => s === false).length]
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
            <PlainSummary
              loading={loadingScreenSummaryPlanTable}
              error={errorScreenSummaryPlanTable}
              data={screenSummaryPlanTableData}
            />
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
            //   dispatch(addDetailsToCreateCampaign({
            //     pageName: "Screen Summary Page",
            //     id: pathname.split("/").splice(-1)[0],
            //     screenWiseSlotDetails: priceData?.regular?.touchPointData,
            //     totalScreens: priceData?.cohort?.touchPointData,
            //     totalImpression: selectedBuyingOption
            //     totalUniqueImpression:
            //     totalCampaignBudget:
            //     totalCpm:
            //   }));
            //   setCurrentStep(step + 1);
            // };
          }}
          totalScreensData={{}}
        />
      </div>
    </div>
  );
};

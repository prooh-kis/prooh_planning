import { TabWithoutIcon } from "../../components/molecules/TabWithoutIcon";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSiteLevelPerformanceTabWiseForPlannerDashboard } from "../../actions/dashboardAction";
import {
  siteLevelPerformanceTabData,
  siteLevelAnalysisTabData,
} from "../../constants/tabDataConstant";
import { SiteLevelAnalysis } from "./SiteLevelAnalysis";
import { SiteLevelLogReport } from "./SiteLevelLogReport";
import { MonitoringPic } from "../../components/segments/MonitoringPic";

const SiteLevelComponent = ({ screenData, screenLevelData }: any) => {
  const dispatch = useDispatch<any>();
  const [currentAnalysisTab, setCurrentAnalysisTab] = useState<string>("1");
  const [currentTab1, setCurrentTab1] = useState<string>("1");

  const siteAnalysisTabData = siteLevelPerformanceTabData;

  const {
    loading: loadingTabWiseSiteData,
    error: errorTabWiseSiteData,
    data: tabWiseSiteData,
  } = useSelector(
    (state: any) => state.siteLevelPerformanceTabWiseForPlannerDashboard
  );

  const getData = () => {
    const datesArray = Object.keys(tabWiseSiteData)?.map((date: any) => date);
    const countsArray = Object.values(tabWiseSiteData)?.map(
      (slot: any) => slot
    );
    return { datesArray, countsArray };
  };

  useEffect(() => {
    dispatch(
      getSiteLevelPerformanceTabWiseForPlannerDashboard({
        campaignId: screenData.campaignId,
        tab: siteAnalysisTabData.find(
          (tab: any) => tab.id == currentAnalysisTab
        )?.value,
      })
    );
  }, [dispatch, screenData, siteAnalysisTabData, currentAnalysisTab]);

  return (
    <div className="w-full h-full truncate">
      {/* <h1 className="text-[20px] font-semibold font-inter text-[#0E212E] pb-2">
        {screenData?.screenName}
      </h1>
      <div className="w-full">
        <TabWithoutIcon
          tabData={siteLevelAnalysisTabData}
          currentTab={currentTab1}
          setCurrentTab={setCurrentTab1}
          textSize="text-[14px]"
        />
      </div>

      {currentTab1 == "1" ? ( */}
      <div className="w-full">
        <TabWithoutIcon
          tabData={siteAnalysisTabData}
          currentTab={currentAnalysisTab}
          setCurrentTab={setCurrentAnalysisTab}
          textSize="text-[14px]"
        />
        <SiteLevelAnalysis
          currentTab={currentAnalysisTab}
          screenLevelData={screenLevelData}
          getData={getData}
          loadingTabWiseSiteData={loadingTabWiseSiteData}
          tabWiseSiteData={tabWiseSiteData}
        />
      </div>
      {/* ) : currentTab1 == "2" ? (
        <div className="w-full">
          <div className="py-4">
            <MonitoringPic
              result={screenData?.monitoringData || []}
              className="grid-cols-5"
              cardHeight="h-[200px]"
            />
          </div>
        </div>
      ) : currentTab1 == "3" ? (
        <SiteLevelLogReport />
      ) : null} */}
    </div>
  );
};

export default SiteLevelComponent;

import { TabWithoutIcon } from "../../components/molecules/TabWithoutIcon";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSiteLevelPerformanceTabWiseForPlannerDashboard } from "../../actions/dashboardAction";
import { siteLevelPerformanceTabData, siteLevelAnalysisTabData, siteLevelMonitoringTabData } from "../../constants/tabDataConstant";
import { SiteLevelAnalysis } from "./SiteLevelAnalysis";
import { SiteLevelMonitoringPictures } from "./SiteLevelMonitoringPictures";
import { message } from "antd";
import { SiteLevelLogReport } from "./SiteLevelLogReport";

const SiteLevelComponent = ({ screenData, screenLevelData }: any) => {
  const dispatch = useDispatch<any>();
  const [currentAnalysisTab, setCurrentAnalysisTab] = useState<string>("1");
  const [currentMonitoringTab, setCurrentMonitoringTab] = useState<string>("1");
  const [currentTab1, setCurrentTab1] = useState<string>("1");

  const [monitoringTime, setMonitoringTime] = useState<any>("day");
  const [isDownloadingAll, setIsDownloadingAll] = useState<boolean>(false);
  const [downloadProgress, setDownloadProgress] = useState<{
    current: number;
    total: number;
  }>({ current: 0, total: 0 });

  const siteAnalysisTabData = siteLevelPerformanceTabData;
  const siteMonitoringTabData = siteLevelMonitoringTabData;

  const {
    loading: loadingTabWiseSiteData,
    error: errorTabWiseSiteData,
    data: tabWiseSiteData
  } = useSelector((state: any) => state.siteLevelPerformanceTabWiseForPlannerDashboard);

  const getData = () => {
    const datesArray = Object.keys(tabWiseSiteData)?.map((date: any) => date);
    const countsArray = Object.values(tabWiseSiteData)?.map((slot: any) => slot);
    return { datesArray, countsArray };
  };

  const handleDownload = async (url: string, filename: string) => {
    if (!url) return;
    try {
      const response = await fetch(url);
      const blob = await response.blob();
      const blobUrl = window.URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = blobUrl;
      a.download = filename || "download";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);

      window.URL.revokeObjectURL(blobUrl);
      return true;
    } catch (error) {
      console.error("Download failed:", error);
      message.error(`Download failed for ${filename}`);
      return false;
    }
  };

  // Function to handle "Download All"
  const handleDownloadAll = async () => {
    setIsDownloadingAll(true);
    setDownloadProgress({ current: 0, total: 0 });
    message.info("Preparing files for download...");

    const filesToDownload: { url: string; filename: string }[] = [];
    const days = ["day", "night", "misc"];
    const mediaTypes = ["video", "images", "geoTag", "newspaper"];

    // // Build the files to download array
    // days.forEach((time) => {
    //   mediaTypes.forEach((type) => {
    //     const files = monitoringPics?.timeWiseMonitoringData?.[time]?.[type];
    //     if (files?.length > 0) {
    //       filesToDownload.push({
    //         url: files[0], // Taking only the first file of each type
    //         filename: `${type}-${time}-${moment(monitoringDate).format(
    //           "YYYY-MM-DD"
    //         )}.${type === "video" ? "mp4" : "jpg"}`,
    //       });
    //     }
    //   });
    // });

    setDownloadProgress((prev) => ({ ...prev, total: filesToDownload.length }));

    if (filesToDownload.length === 0) {
      message.warning("No files available to download.");
      setIsDownloadingAll(false);
      return;
    }

    let successCount = 0;
    // Use a traditional for loop instead of for...of with entries()
    for (let i = 0; i < filesToDownload.length; i++) {
      const file = filesToDownload[i];
      const success = await handleDownload(file.url, file.filename);
      if (success) successCount++;
      setDownloadProgress({ current: i + 1, total: filesToDownload.length });
    }

    if (successCount === filesToDownload.length) {
      message.success(`All ${successCount} files downloaded successfully!`);
    } else {
      message.warning(
        `Downloaded ${successCount} out of ${filesToDownload.length} files.`
      );
    }

    setIsDownloadingAll(false);
  };
  

  useEffect(() => {
      dispatch(getSiteLevelPerformanceTabWiseForPlannerDashboard({
        campaignId: screenData.campaignId,
        tab: siteAnalysisTabData.find((tab: any) => tab.id == currentAnalysisTab)?.value
      }))
  },[dispatch, screenData, siteAnalysisTabData, currentAnalysisTab]);

  return (
    <div className="w-full h-full truncate">
      <h1 className="text-[20px] font-semibold font-inter text-[#0E212E] pb-2">
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

      {currentTab1 == "1" ? (
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
        
      ) : currentTab1 == "2" ? (
        <div className="w-full">
          <div className="flex items-center justify-between">
            <TabWithoutIcon
              tabData={siteMonitoringTabData}
              currentTab={currentMonitoringTab}
              setCurrentTab={setCurrentMonitoringTab}
              textSize="text-[14px]"
            />
            <div className="flex items-center gap-2">
              {isDownloadingAll && (
                <span className="text-sm text-gray-600">
                  Downloading {downloadProgress.current} of{" "}
                  {downloadProgress.total}
                </span>
              )}
              <button
                onClick={handleDownloadAll}
                disabled={isDownloadingAll}
                className={`h-8 text-white text-sm px-3 py-1 rounded shadow-md transition ${
                  isDownloadingAll
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-[#129BFF] hover:bg-[#107ACC]"
                }`}
              >
                {isDownloadingAll ? "Downloading..." : "Download All"}
              </button>
            </div>
          </div>
          
          <SiteLevelMonitoringPictures
            monitoringTime={monitoringTime}
            monitoringPics={[]}
            handleDownload={handleDownload}
          />
        </div>
      ) : currentTab1 == "3" ? (
        <SiteLevelLogReport />
      ) : null}

    </div>
  );
};

export default SiteLevelComponent;

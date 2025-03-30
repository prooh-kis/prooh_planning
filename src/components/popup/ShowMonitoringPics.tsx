import React, { useCallback, useEffect, useState } from "react";
import moment from "moment";
import { useSelector, useDispatch } from "react-redux";
import { getAllDatesBetween } from "../../utils/dateAndTimeUtils";
import { CalendarPopup } from "./CalendarPopup";
import { NoDataView } from "../../components/molecules/NoDataView";
import { TabWithoutIcon } from "../../components/molecules/TabWithoutIcon";
import { MonitoringPictures } from "../../components/segments/MonitoringPictures";
import { campaignMonitoringTab } from "../../constants/tabDataConstant";
import { GetCampaignMonitoringPicsAction } from "../../actions/campaignAction";
import { message } from "antd";

export const ShowMonitoringPicsPopup = (props: any) => {
  const dispatch = useDispatch<any>();
  const { campaign, screenId, campaignCreation } = props;
  const dateToday = new Date();
  const [isShow, setShow] = useState<boolean>(true);
  const [currentTab, setCurrentTab] = useState<any>("1");
  const [openCalendarPopup, setOpenCalendarPopup] = useState<any>(false);
  const [monitoringDate, setMonitoringDate] = useState<any>(dateToday);
  const [allDates, setAllDates] = useState<any>([]);
  const [monitoringTime, setMonitoringTime] = useState<any>("day");
  const [isDownloadingAll, setIsDownloadingAll] = useState<boolean>(false);
  const [downloadProgress, setDownloadProgress] = useState<{
    current: number;
    total: number;
  }>({ current: 0, total: 0 });

  const campaignMonitoringPicsGet = useSelector(
    (state: any) => state.campaignMonitoringPicsGet
  );
  const {
    loading: loadingMonitoringPics,
    error: errorMonitoringPics,
    data: monitoringPics,
  } = campaignMonitoringPicsGet;

  const handleCampaignClick = () => {
    setAllDates(() => {
      return getAllDatesBetween(
        campaignCreation.startDate,
        campaignCreation.endDate
      );
    });
  };

  const handleSetCurrentTab = (id: string) => {
    setCurrentTab(id);
    switch (id) {
      case "1":
        setMonitoringTime("day");
        break;
      case "2":
        setMonitoringTime("night");
        break;
      case "3":
        setMonitoringTime("misc");
        break;
      default:
        setMonitoringTime("day");
        break;
    }
  };

  const handleCallGetScreenCampaignMonitoring = useCallback(() => {
    if (campaign?.campaignId && screenId) {
      dispatch(
        GetCampaignMonitoringPicsAction({
          screenId,
          campaignId: campaign?.campaignId,
          date: monitoringDate,
        })
      );
    }
  }, [campaign, screenId]);

  const handleClick = useCallback(
    (value: boolean) => {
      setShow(value);
    },
    [isShow]
  );

  useEffect(() => {
    if (campaign && screenId) {
      handleCallGetScreenCampaignMonitoring();
      handleCampaignClick();
    }
  }, [props]);

  const handleDateChange = (date: Date) => {
    setMonitoringDate(date);
    dispatch(
      GetCampaignMonitoringPicsAction({
        screenId,
        campaignId: campaign?.campaignId,
        date: date,
      })
    );
  };

  useEffect(() => {
    if (props?.open) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
    // Clean up the effect when the component unmounts
    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [props?.open]);

  if (!props?.open) {
    return null;
  }

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

    // Build the files to download array
    days.forEach((time) => {
      mediaTypes.forEach((type) => {
        const files = monitoringPics?.timeWiseMonitoringData?.[time]?.[type];
        if (files?.length > 0) {
          filesToDownload.push({
            url: files[0], // Taking only the first file of each type
            filename: `${type}-${time}-${moment(monitoringDate).format(
              "YYYY-MM-DD"
            )}.${type === "video" ? "mp4" : "jpg"}`,
          });
        }
      });
    });

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

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-10 ">
      <div
        className="bg-[#FFFFFF] p-4 rounded-lg shadow-lg w-full max-w-full relative overflow-auto max-h-auto "
        style={{ height: "80vh", width: "70vw" }}
      >
        {openCalendarPopup && (
          <div className="p-1 overflow-scroll no-scrollbar">
            <CalendarPopup
              onClose={() => setOpenCalendarPopup(false)}
              dates={allDates}
              monitoringDate={monitoringDate}
              setMonitoringDate={handleDateChange}
              openCalendarPopup={openCalendarPopup}
            />
          </div>
        )}
        <div className="flex justify-between">
          <div className="w-full flex items-center justify-between">
            <h1 className="text-[16px] font-semibold">Campaign Monitoring</h1>
            <i
              className="fi fi-br-circle-xmark"
              onClick={() => props?.onClose()}
            ></i>
          </div>
        </div>
        {isShow && (
          <div>
            <div className="flex justify-end ">
              <div
                className="border border-1 py-2 px-4 text-[#129BFF] text-[14px] cursor-pointer flex gap-2 items-center rounded-md"
                title="click to change date"
                onClick={() => setOpenCalendarPopup(true)}
              >
                <i className="fi fi-rr-calendar-lines-pen"></i>
                {moment(monitoringDate).format("DD-MM-YYYY")}
              </div>
            </div>

            {loadingMonitoringPics ? (
              <h1 className="w-full py-1 px-4 border border-1 border-[#F1BC00] bg-yellow-100 text-[#000000] rounded-md mt-2">
                Loading Data...., please wait
              </h1>
            ) : !monitoringPics ? (
              <NoDataView />
            ) : (
              <div>
                <div className="flex justify-between items-center">
                  <TabWithoutIcon
                    currentTab={currentTab}
                    setCurrentTab={handleSetCurrentTab}
                    tabData={campaignMonitoringTab}
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
                <div className="h-auto pt-2">
                  <div className="w-full">
                    <MonitoringPictures
                      isUsedForShow={true}
                      handleUploadClick={() => {}}
                      time={monitoringTime}
                      setMonitoringMedia={() => {}}
                      setMonitoringTime={() => {}}
                      monitoringData={monitoringPics}
                      screenId={monitoringPics?.screenId}
                      campaignId={monitoringPics?.campaignId}
                      setFileType={() => {}}
                      handleDownload={handleDownload}
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

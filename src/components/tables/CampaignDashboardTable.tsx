import React, { useEffect, useState } from "react";
import { formatNumber } from "../../utils/formatValue";
import { useDispatch, useSelector } from "react-redux";
import { GetCampaignMonitoringPicsAction } from "../../actions/campaignAction";
import { ShowCampaignLogsPopup } from "../../components/popup/ShowCampaignLogsPopup";
import { ShowMonitoringPicsPopup } from "../../components/popup/ShowMonitoringPics";
import {
  calculateDaysPlayed,
  convertIntoDateAndTime,
  getTimeDifferenceInMin,
} from "../../utils/dateAndTimeUtils";
import { message, Tooltip } from "antd";
import { downloadExcel } from "../../utils/excelUtils";
import axios from "axios";
import { LinearBar } from "../../components/molecules/linearbar";
import SiteLevelAnalysis from "../../components/segments/SiteLevelAnalysis";

const analyticsV1 = `${process.env.REACT_APP_PROOH_SERVER}/api/v1/analytics`;

interface CostSummaryTableProps {
  screenLevelData?: any;
  campaignDetails?: any;
  city: string;
  currentTouchPoint: string;
}

interface PercentageDisplayProps {
  delivered: number;
  promised: number;
  options?: {
    isTillDate?: boolean;
    campaignDays?: number;
    totalDays?: number;
  };
  className?: string;
}

export const calculatePercentageDifference = (
  delivered: number,
  promised: number,
  options?: {
    isTillDate?: boolean;
    campaignDays?: number;
    totalDays?: number;
  }
): { value: number; isPositive: boolean } => {
  if (promised === 0) return { value: 0, isPositive: false };

  const effectiveDelivered = options?.isTillDate
    ? delivered / (options.campaignDays || 1)
    : delivered;

  const effectivePromised = options?.isTillDate
    ? promised / (options.totalDays || 1)
    : promised;

  const difference = effectiveDelivered - effectivePromised;
  const percentage = Number(
    ((difference / effectivePromised) * 100).toFixed(2)
  );

  return {
    value: percentage,
    isPositive: percentage > 0,
  };
};

const PercentageDisplay: React.FC<PercentageDisplayProps> = ({
  delivered,
  promised,
  options,
  className = "",
}) => {
  const { value, isPositive } = calculatePercentageDifference(
    delivered,
    promised,
    options
  );

  return (
    <p
      className={`text-[10px] ${
        isPositive ? "text-[#2A892D]" : "text-[#CC0000]"
      } ${className}`}
    >
      {`(${value}%)`}
      <i className={`fi fi-rr-arrow-${isPositive ? "up" : "down"}`}></i>
    </p>
  );
};

const getScreenClassName = (lastActive: any) => {
  if (lastActive) {
    if (getTimeDifferenceInMin(lastActive) < 15)
      return "border w-4 h-4 bg-[#348730] rounded-full justify-end";
    else return "border w-4 h-4 bg-[#ffec33] rounded-full justify-end";
  } else return "border w-4 h-4 bg-[#ff3333] rounded-full justify-end";
};

const getScreenStatus = (lastActive: any) => {
  if (lastActive) {
    if (getTimeDifferenceInMin(lastActive) < 15) return "Active";
    else return "Close";
  } else return "Close";
};

const getAllDates = ({ startDate, endDate }: any) => {
  const dates = [];
  let currentDate = new Date(startDate);
  const lastDate = new Date(endDate);

  while (currentDate <= lastDate) {
    dates.push(currentDate.toISOString().split("T")[0]);
    currentDate.setDate(currentDate.getDate() + 1);
  }

  return dates;
};

export const CampaignDashboardTable = ({
  screenLevelData,
  campaignDetails,
  city,
  currentTouchPoint,
}: CostSummaryTableProps) => {
  const dispatch = useDispatch<any>();
  const [isDownLoad, setIsDownload] = useState<string>("");
  const [openLogsPopup, setOpenLogsPopup] = useState<any>(false);
  const [openMonitoringPicsPopup, setOpenMonitoringPicsPopup] =
    useState<any>(false);
  const [screenId, setScreenId] = useState<any>(null);
  const [currentIndex, setCurrentIndex] = useState<any>(null);
  const [campaignData, setCampaignData] = useState<any>({});
  const [currentWeek, setCurrentWeek] = useState<any>(1);
  const [currentDay, setCurrentDay] = useState<any>(1);
  const [currentDate, setCurrentDate] = useState<any>(new Date().toUTCString());

  const campaignLogsGet = useSelector((state: any) => state.campaignLogsGet);
  const {
    loading: loadingLogs,
    error: errorLogs,
    data: logs,
  } = campaignLogsGet;

  useEffect(() => {
    if (campaignDetails?.startDate && campaignDetails?.endDate) {
      const start = new Date(campaignDetails.startDate);
      const today = new Date();

      if (today < start) {
        setCurrentDay(1);
        setCurrentWeek(1);
      } else {
        const daysPassed =
          Math.floor(
            (today.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)
          ) + 1;
        setCurrentDay(daysPassed % 7);
        setCurrentWeek(Math.ceil(daysPassed / 7));
      }
    }
  }, [campaignDetails]);

  const onClose = () => {
    setOpenLogsPopup(false);
    setOpenMonitoringPicsPopup(false);
    setScreenId(null);
  };

  const downloadLogs = async (campaignId: string) => {
    try {
      message.info("Start fetching data, it will take some time");
      setIsDownload(campaignId);
      const { data } = await axios.get(
        `${analyticsV1}/downloadAllCampaignLogs?campaignId=${campaignId}`
      );
      await downloadExcel({
        campaign: data?.campaign,
        campaignLog: data?.logs,
      });
      message.success("Downloaded success full!");
      setIsDownload("");
    } catch (error: any) {
      message.error(error.message);
      setIsDownload("");
    }
  };

  const downloadFileFromUrl = (fileUrl: string, fileName: string) => {
    if (!fileUrl) {
      message.error("You can download logs from tomorrow");
      return;
    }

    const campaignEndDate = campaignDetails?.endDate
      ? new Date(campaignDetails.endDate)
      : null;

    if (campaignEndDate && new Date() > campaignEndDate) {
      message.info("Downloading all logs, please wait for some time...");
    } else {
      message.info(
        "Logs till yesterday will be downloaded as the campaign is still live today..."
      );
    }

    const link = document.createElement("a");
    link.href = fileUrl;
    link.setAttribute("download", fileName);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const allDates: any = getAllDates({
    startDate: campaignDetails?.startDate,
    endDate: campaignDetails?.endDate,
  });

  const campaignDays =
    calculateDaysPlayed(campaignDetails?.startDate, campaignDetails?.endDate) ||
    1;
  const totalDays = campaignDetails?.duration || 1;

  return (
    <div>
      <ShowMonitoringPicsPopup
        campaign={screenLevelData?.[screenId]}
        screenId={screenId}
        campaignCreation={campaignDetails}
        onClose={onClose}
        open={openMonitoringPicsPopup}
      />
      <ShowCampaignLogsPopup
        logs={logs}
        loading={loadingLogs}
        open={openLogsPopup}
        onClose={onClose}
        campaignData={campaignData}
        campaignDetails={campaignDetails}
        setCurrentDay={setCurrentDay}
        setCurrentWeek={setCurrentWeek}
        currentDay={currentDay}
        currentWeek={currentWeek}
        allDates={allDates}
        setCurrentDate={setCurrentDate}
        currentDate={currentDate}
        isDownLoad={isDownLoad}
        downloadLogs={downloadLogs}
      />
      <table className="table-auto w-full">
        <thead className="bg-[#EFF9FF] text-[#707070] font-medium rounded-[6px] w-full flex justify-between items-center">
          <tr className="flex w-full items-center h-[40px] border-b">
            <th className="w-full flex items-center justify-center">
              <h1 className="text-[14px]">Sr.</h1>
            </th>
            <th className="w-full flex items-center justify-center truncate">
              <h1 className="text-[14px] truncate">Screen Name</h1>
            </th>
            <th className="w-full flex items-center justify-center">
              <h1 className="text-[14px]">Location</h1>
            </th>
            <th className="w-full flex items-center justify-center">
              <h1 className="text-[14px]">Touch point</h1>
            </th>
            <th className="w-full flex items-center justify-center">
              <h1 className="text-[14px]">Slots Played</h1>
            </th>
            <th className="w-full flex items-center justify-center">
              <h1 className="text-[14px]">Impressions</h1>
            </th>
            <th className="w-full flex items-center justify-center">
              <h1 className="text-[14px]">Cost</h1>
            </th>
            <th className="w-full flex items-center justify-center">
              <h1 className="text-[14px]">Delivery</h1>
            </th>
            <th className="w-full flex items-center justify-center">
              <h1 className="text-[14px]">Monitoring</h1>
            </th>
            <th className="w-full flex items-center justify-center">
              <h1 className="text-[14px]">Action</h1>
            </th>
          </tr>
        </thead>
        <tbody className="max-h-[250px] overflow-scroll">
          {Object.keys(screenLevelData || {})
            .filter((d: string) => d !== "totalData")
            .filter((d: string) => {
              const item = screenLevelData[d];
              const cityMatch = city ? item?.city === city : true;
              const touchpointMatch = currentTouchPoint
                ? item?.touchPoint === currentTouchPoint
                : true;
              return cityMatch && touchpointMatch;
            })
            .map((data: string, index: number) => (
              <React.Fragment key={index}>
                <tr
                  key={data}
                  className="flex w-full h-[40px] hover:bg-gray-100 hover:rounded-[6px] border-b text-[#0E212E]"
                >
                  <td className="w-full flex items-center justify-center">
                    <p className="text-[12px]">{index + 1}</p>
                  </td>
                  <td className="w-full flex items-center justify-start gap-2 truncate">
                    <Tooltip
                      title={`${getScreenStatus(
                        screenLevelData?.[data]?.lastActive
                      )}, ${convertIntoDateAndTime(
                        screenLevelData?.[data]?.lastActive
                      )} `}
                    >
                      <div
                        className={getScreenClassName(
                          screenLevelData?.[data]?.lastActive
                        )}
                      />
                    </Tooltip>
                    <p className="text-[12px] truncate px-1">
                      {screenLevelData[data]?.screenName}
                    </p>
                  </td>
                  <td className="w-full flex items-center justify-center truncate">
                    <p className="text-[12px] truncate">
                      {screenLevelData[data]?.location}
                    </p>
                  </td>
                  <td className="w-full flex items-center justify-center truncate">
                    <p className="text-[12px] truncate">
                      {screenLevelData[data]?.touchPoint}
                    </p>
                  </td>
                  <td className="w-full flex items-center justify-center">
                    <div className="flex flex-row justify-center items-center gap-1">
                      <p className="text-[12px]">
                        {formatNumber(screenLevelData[data]?.slotsDelivered)}
                      </p>
                      <PercentageDisplay
                        delivered={screenLevelData[data]?.slotsDelivered}
                        promised={screenLevelData[data]?.slotsPromisedTillDate}
                        options={{
                          isTillDate: true,
                          campaignDays,
                          totalDays,
                        }}
                      />
                    </div>
                  </td>
                  <td className="w-full flex items-center justify-center">
                    <div className="flex flex-row justify-center items-center gap-1">
                      <p className="text-[12px]">
                        {formatNumber(
                          screenLevelData[data]?.impressionsDelivered?.toFixed(
                            0
                          )
                        )}
                      </p>
                      <PercentageDisplay
                        delivered={screenLevelData[data]?.impressionsDelivered}
                        promised={
                          screenLevelData[data]?.impressionsPromisedTillDate
                        }
                        options={{
                          isTillDate: true,
                          campaignDays,
                          totalDays,
                        }}
                      />
                    </div>
                  </td>
                  <td className="w-full flex items-center justify-center">
                    <div className="flex flex-row justify-center items-center gap-1">
                      <p className="text-[12px]">
                        {formatNumber(
                          screenLevelData[data]?.costConsumed?.toFixed(0)
                        )}
                      </p>
                      <PercentageDisplay
                        delivered={screenLevelData[data]?.costConsumed}
                        promised={screenLevelData[data]?.costTakenTillDate}
                        options={{
                          isTillDate: true,
                          campaignDays,
                          totalDays,
                        }}
                      />
                    </div>
                  </td>
                  <td className="w-full flex items-center justify-center gap-1">
                    <div className="w-[28px]">
                      <LinearBar
                        value={
                          (screenLevelData?.[data]?.slotsDelivered * 100) /
                          screenLevelData?.[data]?.slotsPromised
                        }
                        colors={["#D9D9D9", "#2A892D"]}
                        highest={100}
                        percent={false}
                      />
                    </div>
                    <p className="text-[12px]">
                      {(
                        (screenLevelData?.[data]?.slotsDelivered * 100) /
                        screenLevelData?.[data]?.slotsPromised
                      )?.toFixed(0)}
                      %
                    </p>
                  </td>
                  <td className="w-full flex items-center justify-center">
                    <Tooltip title="View Monitoring Pics">
                      <i
                        className="fi fi-sr-picture text-[12px] text-[#129BFF]"
                        onClick={() => {
                          dispatch(
                            GetCampaignMonitoringPicsAction({
                              campaignId: screenLevelData[data]?.campaignId,
                              screenId: data,
                              date: campaignDetails.startDate,
                            })
                          );
                          setScreenId(data);
                          setOpenMonitoringPicsPopup(true);
                        }}
                      ></i>
                    </Tooltip>
                  </td>
                  <td className="w-full flex items-center justify-center">
                    <div className="flex gap-4">
                      <Tooltip title="View Logs">
                        <i
                          className={`fi fi-sr-eye text-[12px] text-[#129BFF]`}
                          onClick={() => {
                            setCampaignData(screenLevelData[data]);
                            setOpenLogsPopup(true);
                          }}
                        ></i>
                      </Tooltip>
                      <Tooltip title="Download logs in one click">
                        <i
                          className={`fi fi-sr-download text-[12px] ${
                            isDownLoad == screenLevelData[data]?.campaignId
                              ? "text-gray-400"
                              : "text-[#129BFF]"
                          }`}
                          onClick={() => {
                            downloadFileFromUrl(
                              screenLevelData[data].logUrl,
                              `${screenLevelData[data]?.screenName}`
                            );
                          }}
                        ></i>
                      </Tooltip>
                      <i
                        className="fi fi-rs-chart-histogram text-[12px] text-[#129BFF]"
                        title="Analytic"
                        onClick={() => {
                          setCurrentIndex(currentIndex === data ? null : data);
                        }}
                      ></i>
                    </div>
                  </td>
                </tr>
                {currentIndex === data && (
                  <tr className="h-full w-full p-4">
                    <td>
                      <SiteLevelAnalysis />
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
        </tbody>
      </table>
    </div>
  );
};
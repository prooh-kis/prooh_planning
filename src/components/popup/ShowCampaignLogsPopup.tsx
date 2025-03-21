import { message, Skeleton, Tooltip } from "antd";
import React, { useEffect, useMemo, useRef } from "react";
import {
  formatDateForLogs,
  getTimeFromDate,
  transformToAmPm,
} from "../../utils/dateAndTimeUtils";
import { NoDataView } from "../../components/molecules/NoDataView";
import { CalenderScaleStepper } from "../../components/molecules/CalenderScale2";
import { useDispatch } from "react-redux";
import { GetCampaignLogsAction } from "../../actions/campaignAction";
import { downloadExcel } from "../../utils/excelUtils";

type DataRow = {
  time: string;
  creativeName: string;
  status: string;
  // delivered: number;
  // promised: number;
  // averageLogTIme: string;
};

type DataStructure = {
  [date: string]: DataRow[];
};

export const ShowCampaignLogsPopup = ({
  open,
  onClose,
  logs,
  loading,
  campaignData,
  campaignDetails,
  setCurrentDay,
  setCurrentWeek,
  currentDay,
  currentWeek,
  allDates,
  setCurrentDate,
  currentDate,
  downloadLogs,
  isDownLoad,
}: any) => {
  const dispatch = useDispatch<any>();
  const scrollRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  const newData = useMemo(() => {
    return logs?.reduce((accum: DataStructure, current: any) => {
      const key: any = formatDateForLogs(current?.logTime)?.logDate;
      if (!accum[key]) {
        accum[key] = [];
      }
      accum[key].push({
        time: getTimeFromDate(current?.logTime),
        creativeName: current?.mediaId?.split("_")[1] || "Unknown",
        status: current?.screenStatus,
      });
      return accum;
    }, {});
  }, [logs]);

  const newCombinedData = useMemo(() => {
    let hrWiseLogs: any;

    if (newData) {
      hrWiseLogs = logs?.reduce((result: any, item: any) => {
        const date: any = formatDateForLogs(item?.logTime)?.logDate; // Assuming today's date
        const [time, period] = item?.logTime?.split(" ");
        let [hour, minute, second] = time?.split("T")[1]?.split(":");

        if (period === "PM" && hour !== "12") {
          hour = String(Number(hour) + 12);
        } else if (period === "AM" && hour === "12") {
          hour = "00";
        }

        if (!result[date]) {
          result[date] = {};
        }

        if (!result[date][hour]) {
          result[date][hour] = [];
        }

        result[date][hour].push(item);
        return result;
      }, {});
    }

    return { hrWiseLogs: hrWiseLogs };
  }, [logs, newData]);

  const calculateAvgTimeGap = (entries: any) => {
    if (entries.length < 2) return "N/A"; // Not enough data to calculate gap

    // Sort entries by time
    const sortedEntries = [...entries].sort((a, b) => a.sortTime - b.sortTime);

    // Compute total time gap
    let totalGap = 0;
    for (let i = 1; i < sortedEntries.length; i++) {
      totalGap += sortedEntries[i].sortTime - sortedEntries[i - 1].sortTime;
    }

    // Calculate average gap in milliseconds
    const avgGapMs = totalGap / (sortedEntries.length - 1);

    // Convert to minutes and seconds
    const minutes = Math.floor(avgGapMs / 60000);
    const seconds = ((avgGapMs % 60000) / 1000).toFixed(0);

    return minutes > 0 ? `${minutes} m ${seconds} sec` : `${seconds} sec`;
  };

  useEffect(() => {
    if (campaignData?.campaignId) {
      dispatch(
        GetCampaignLogsAction({
          campaignId: campaignData?.campaignId,
          date: formatDateForLogs(currentDate)?.apiDate,
          // date: "13/03/2025"
        })
      );
    }
  }, [dispatch, campaignData, currentDate]);

  useEffect(() => {
    if (open) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
    // Clean up the effect when the component unmounts
    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [open]);

  if (!open) {
    return null;
  }

  const handelDownloadLogs = () => {
    downloadExcel({ campaign: campaignDetails, campaignLog: logs });
  };
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-10 mt-16">
      <div
        className="bg-[#FFFFFF] p-4 rounded-lg shadow-lg w-full max-w-full relative overflow-auto max-h-auto "
        style={{ height: "90vh", width: "95vw" }}
      >
        <div className="flex justify-end">
          <i className="fi fi-br-circle-xmark" onClick={() => onClose()}></i>
        </div>
        <div className="flex justify-between p-4">
          <div>
            <h1 className="font-semibold text-[20px] text-[#0E212E] leading-[19.36px]">
              Log Report
            </h1>
            {/* <h1>{campaign?.screenName}</h1> */}
            <h1 className="text-[14px] text-[#5B7180] leading-[16.94px] py-1">
              {logs?.campaign?.name}
            </h1>
          </div>
          <div className="flex gap-4 items-center">
            {!loading && logs?.length > 0 && (
              <button
                title="s"
                className="border border-1 py-2 px-4 rounded-lg bg-blue text-[#FFFFFF] font-custom font-semibold hover:bg-[#129BFF] text-center"
                onClick={handelDownloadLogs}
              >
                <i className="fi fi-sr-file-download pr-4"></i>
                Download Current Logs
              </button>
            )}
          </div>
        </div>
        <div>
          <CalenderScaleStepper
            setCurrentDay={setCurrentDay}
            setCurrentWeek={setCurrentWeek}
            currentDay={currentDay}
            currentWeek={currentWeek}
            allDates={allDates}
            setCurrentDate={setCurrentDate}
            campaignData={campaignData}
            loading={loading}
          />
        </div>
        {loading ? (
          <div className="pt-12">
            <Skeleton active paragraph={{ rows: 12 }} />
          </div>
        ) : logs?.length > 0 ? (
          <div className="p-1">
            <div className="bg-white rounded py-4">
              <h1 className="font-semibold text-[16px] text-[#0E212E] leading-[19.36px]">
                Hourly Based Logs{" "}
              </h1>
            </div>
            <div className="mx-auto p-6">
              <div className="grid grid-cols-12">
                <div className="col-span-1 p-2 border flex justify-center items-center">
                  <h2 className="text-sm font-bold text-gray-700 ">{"Date"}</h2>
                </div>
                <div className="col-span-11 grid grid-cols-12">
                  <div className="col-span-3 p-2 border flex justify-center items-center">
                    <h2 className="text-sm font-semibold text-gray-600">
                      {"Hour"}
                    </h2>
                  </div>
                  <div className="col-span-6 grid grid-cols-12 border">
                    <div className="col-span-3 py-2 flex items-center justify-center">
                      <h2 className="text-sm font-semibold text-gray-600">
                        {"Time"}
                      </h2>
                    </div>
                    <div className="col-span-4 py-2 flex items-center justify-center">
                      <h2 className="text-sm font-semibold text-gray-600">
                        {"Creative"}
                      </h2>
                    </div>
                    <div className="col-span-3 py-2 flex items-center justify-center">
                      <h2 className="text-sm font-semibold text-gray-600">
                        {"Brand"}
                      </h2>
                    </div>
                    <div className="col-span-2 py-2 flex justify-center">
                      <i className="fi fi-br-wifi text-[#22C55E] flex items-center justify-center"></i>
                    </div>
                  </div>
                  <div className="col-span-3 grid grid-cols-3 border">
                    <div className="col-span-1 py-2 border flex items-center justify-center">
                      <h2 className="text-sm font-semibold text-gray-600">
                        {"Delivered"}
                      </h2>
                    </div>
                    <div className="col-span-1 py-2 border flex items-center justify-center">
                      <h2 className="text-sm font-semibold text-gray-600">
                        {"Promised"}
                      </h2>
                    </div>
                    <div className="col-span-1 py-2 px-4 border flex items-center justify-center">
                      <h2 className="text-sm font-semibold text-gray-600">
                        {"Av. Loop Time"}
                      </h2>
                    </div>
                  </div>
                </div>
              </div>
              {Object.entries(newCombinedData?.hrWiseLogs).map(
                ([date, hours]: any) => (
                  <div key={date}>
                    {formatDateForLogs(`${date} 00:00:00 GMT`).apiDate !==
                      formatDateForLogs(`${currentDate} 00:00:00 GMT`)
                        .apiDate && (
                      <div className="flex items-center gap-2 py-2">
                        <h1 className="font-custom text-[16px]">
                          Logs from previous day being saved on this day
                        </h1>
                        <Tooltip title="If the screen is switched of without saving the last logs on the server, the date is saved next day when the device is online after being started again...">
                          <i className="fi fi-br-info text-gray-400 lg:text-[14px] text-[12px] flex items-center justify-center"></i>
                        </Tooltip>
                      </div>
                    )}
                    <div className="grid grid-cols-12 mb-6 w-full border-b">
                      <div className="col-span-1 p-2 border flex justify-center items-center h-[50vh]">
                        <h2 className="text-xl font-bold text-gray-700">
                          {date}
                        </h2>
                      </div>
                      <div className="col-span-11 h-[50vh] overflow-scroll no-scrollbar">
                        {Object.keys(hours)
                          .sort((a, b) => Number(a) - Number(b))
                          .map((key) => [key, hours[key]])
                          .map(([hour, entries]: any) => (
                            <div
                              key={hour}
                              className="grid grid-cols-12 h-[50vh]"
                            >
                              <div className="col-span-3 p-2 border flex justify-center items-center h-[50vh]">
                                <h3 className="text-md font-semibold text-gray-600 truncate">
                                  {transformToAmPm(`${hour}:00:00`)} to{" "}
                                  {transformToAmPm(`${hour}:59:59`)}
                                </h3>
                              </div>
                              <div
                                className="col-span-6 overflow-scroll no-scrollbar h-[50vh]"
                                ref={(el) => (scrollRefs.current[hour] = el)}
                              >
                                <table className="min-w-full bg-white">
                                  <tbody>
                                    {entries.map((entry: any, index: any) => (
                                      <tr
                                        key={index}
                                        className="grid grid-cols-12 border hover:bg-gray-50 text-gray-700 p-1"
                                      >
                                        <td className="col-span-3 py-2 flex items-center justify-center">
                                          {new Date(
                                            entry.logTime
                                          ).toLocaleTimeString()}
                                        </td>
                                        <td className="col-span-4 py-2 flex items-center justify-center">
                                          {entry.campaignName}
                                        </td>
                                        <td className="col-span-3 py-2 flex items-center justify-center">
                                          {entry.brandName}
                                        </td>
                                        <td
                                          className={`col-span-2 py-2 flex items-center justify-center ${
                                            entry.screenStatus === "online"
                                              ? "text-green-600"
                                              : "text-red-600"
                                          }`}
                                        >
                                          {entry.screenStatus}
                                        </td>
                                      </tr>
                                    ))}
                                  </tbody>
                                </table>
                              </div>
                              <div className="col-span-3 h-auto grid grid-cols-3">
                                <div className="col-span-1 border flex justify-center items-center gap-2 p-2">
                                  <h1
                                    className={
                                      entries.length /
                                        (17 * campaignDetails?.sov) >=
                                      1
                                        ? "text-[#2A892D]"
                                        : "text-[#CC0000]"
                                    }
                                  >
                                    {entries.length}
                                  </h1>
                                  <p
                                    className={
                                      entries.length /
                                        (17 * campaignDetails?.sov) >=
                                      1
                                        ? "text-[#2A892D] text-sm"
                                        : "text-[#CC0000] text-sm"
                                    }
                                  >
                                    {entries.length /
                                      (17 * campaignDetails?.sov) >
                                    1
                                      ? `(+${Number(
                                          (entries.length /
                                            (17 * campaignDetails?.sov)) *
                                            100
                                        ).toFixed(0)}%)`
                                      : entries.length /
                                          (17 * campaignDetails?.sov) <
                                        1
                                      ? `(-${Number(
                                          100 -
                                            (entries.length /
                                              (17 * campaignDetails?.sov)) *
                                              100
                                        ).toFixed(0)}%)`
                                      : `✔`}
                                  </p>
                                </div>
                                <div className="col-span-1 border flex justify-center items-center p-2">
                                  {17 * campaignDetails?.sov}
                                </div>
                                <div className="col-span-1 border flex justify-center items-center p-2">
                                  {calculateAvgTimeGap(entries) === "N/A"
                                    ? "--"
                                    : calculateAvgTimeGap(entries)}
                                </div>
                              </div>
                            </div>
                          ))}
                      </div>
                    </div>
                  </div>
                )
              )}
            </div>
          </div>
        ) : (
          <div className="flex justify-center items-center pt-12">
            <NoDataView />
          </div>
        )}
      </div>
    </div>
  );
};

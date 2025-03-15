import { Skeleton } from "antd";
import React, { useEffect, useMemo } from "react";
import {
  calculateDaysPlayed,
  convertDateIntoDateMonthYear,
  formatDateForLogs,
  getTimeFromDate,
  transformToAmPm,
} from "../../utils/dateAndTimeUtils";
import { DownLoadCampaignLogReport } from "../../components/molecules/DownLoadCampaignLogReport";
import { NoDataView } from "../../components/molecules/NoDataView";
import { CalendarScaleSlider } from "../../components/molecules/CalenderScaleSlider";

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
}: any) => {
  console.log(campaignData, logs);
  const newData = useMemo(() => {
    return logs?.reduce((accum: DataStructure, current: any) => {
      const key: any = formatDateForLogs(current?.logTime)?.logDate;
      if (!accum[key]) {
        accum[key] = [];
      }
      accum[key].push({
        time: getTimeFromDate(current?.logTime),
        creativeName: current?.mediaId?.split("_")[1] || "Unknown",
        status: current?.screenStatus
      });
      return accum;
    }, {});
  }, [logs]);

  const newCombinedData = useMemo(() => {

    let hrWiseLogs: any;

    if (newData) {
      hrWiseLogs = logs?.reduce((result: any, item: any) => {
          const date: any = formatDateForLogs(item?.logTime)?.logDate; // Assuming today's date
          const [time, period] = item?.logTime?.split(' ');
          let [hour, minute, second] = time?.split("T")[1]?.split(':');
          
          if (period === 'PM' && hour !== '12') {
              hour = String(Number(hour) + 12);
          } else if (period === 'AM' && hour === '12') {
              hour = '00';
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
      // hrWiseLogs = {
      //   "Thu Mar 13 2025": {
      //     "11": [
      //       {
      //         "sortTime": 1741847394000,
      //         "logTime": "2025-03-13T11:59:54.000+05:30",
      //         "deviceTime": "Thu Mar 13 11:59:54 GMT+05:30 2025",
      //         "mediaId": "67c83e18efc34a9341bf34a8_1X1_new",
      //         "campaignId": "67a0a6a85f055df930bc2336",
      //         "campaignName": "Rudram250203",
      //         "brandName": "RUDRAM",
      //         "screenStatus": "online"
      //       },
      //       {
      //         "sortTime": 1741847199000,
      //         "logTime": "2025-03-13T11:56:39.000+05:30",
      //         "deviceTime": "Thu Mar 13 11:56:39 GMT+05:30 2025",
      //         "mediaId": "67c83e18efc34a9341bf34a8_1X1_new",
      //         "campaignId": "67a0a6a85f055df930bc2336",
      //         "campaignName": "Rudram250203",
      //         "brandName": "RUDRAM",
      //         "screenStatus": "online"
      //       }
      //     ],
      //     "12": [
      //       {
      //         "sortTime": 1741850881000,
      //         "logTime": "2025-03-13T12:58:01.000+05:30",
      //         "deviceTime": "Thu Mar 13 12:58:01 GMT+05:30 2025",
      //         "mediaId": "67c83e18efc34a9341bf34a8_1X1_new",
      //         "campaignId": "67a0a6a85f055df930bc2336",
      //         "campaignName": "Rudram250203",
      //         "brandName": "RUDRAM",
      //         "screenStatus": "online"
      //       },
      //       {
      //         "sortTime": 1741850687000,
      //         "logTime": "2025-03-13T12:54:47.000+05:30",
      //         "deviceTime": "Thu Mar 13 12:54:47 GMT+05:30 2025",
      //         "mediaId": "67c83e18efc34a9341bf34a8_1X1_new",
      //         "campaignId": "67a0a6a85f055df930bc2336",
      //         "campaignName": "Rudram250203",
      //         "brandName": "RUDRAM",
      //         "screenStatus": "online"
      //       },
      //       {
      //         "sortTime": 1741850493000,
      //         "logTime": "2025-03-13T12:51:33.000+05:30",
      //         "deviceTime": "Thu Mar 13 12:51:33 GMT+05:30 2025",
      //         "mediaId": "67c83e18efc34a9341bf34a8_1X1_new",
      //         "campaignId": "67a0a6a85f055df930bc2336",
      //         "campaignName": "Rudram250203",
      //         "brandName": "RUDRAM",
      //         "screenStatus": "online"
      //       },
      //       {
      //         "sortTime": 1741850299000,
      //         "logTime": "2025-03-13T12:48:19.000+05:30",
      //         "deviceTime": "Thu Mar 13 12:48:19 GMT+05:30 2025",
      //         "mediaId": "67c83e18efc34a9341bf34a8_1X1_new",
      //         "campaignId": "67a0a6a85f055df930bc2336",
      //         "campaignName": "Rudram250203",
      //         "brandName": "RUDRAM",
      //         "screenStatus": "online"
      //       },
      //       {
      //         "sortTime": 1741850105000,
      //         "logTime": "2025-03-13T12:45:05.000+05:30",
      //         "deviceTime": "Thu Mar 13 12:45:05 GMT+05:30 2025",
      //         "mediaId": "67c83e18efc34a9341bf34a8_1X1_new",
      //         "campaignId": "67a0a6a85f055df930bc2336",
      //         "campaignName": "Rudram250203",
      //         "brandName": "RUDRAM",
      //         "screenStatus": "online"
      //       },
      //       {
      //         "sortTime": 1741849912000,
      //         "logTime": "2025-03-13T12:41:52.000+05:30",
      //         "deviceTime": "Thu Mar 13 12:41:52 GMT+05:30 2025",
      //         "mediaId": "67c83e18efc34a9341bf34a8_1X1_new",
      //         "campaignId": "67a0a6a85f055df930bc2336",
      //         "campaignName": "Rudram250203",
      //         "brandName": "RUDRAM",
      //         "screenStatus": "online"
      //       },
      //       {
      //         "sortTime": 1741849718000,
      //         "logTime": "2025-03-13T12:38:38.000+05:30",
      //         "deviceTime": "Thu Mar 13 12:38:38 GMT+05:30 2025",
      //         "mediaId": "67c83e18efc34a9341bf34a8_1X1_new",
      //         "campaignId": "67a0a6a85f055df930bc2336",
      //         "campaignName": "Rudram250203",
      //         "brandName": "RUDRAM",
      //         "screenStatus": "online"
      //       },
      //       {
      //         "sortTime": 1741849525000,
      //         "logTime": "2025-03-13T12:35:25.000+05:30",
      //         "deviceTime": "Thu Mar 13 12:35:25 GMT+05:30 2025",
      //         "mediaId": "67c83e18efc34a9341bf34a8_1X1_new",
      //         "campaignId": "67a0a6a85f055df930bc2336",
      //         "campaignName": "Rudram250203",
      //         "brandName": "RUDRAM",
      //         "screenStatus": "online"
      //       },
      //       {
      //         "sortTime": 1741849332000,
      //         "logTime": "2025-03-13T12:32:12.000+05:30",
      //         "deviceTime": "Thu Mar 13 12:32:12 GMT+05:30 2025",
      //         "mediaId": "67c83e18efc34a9341bf34a8_1X1_new",
      //         "campaignId": "67a0a6a85f055df930bc2336",
      //         "campaignName": "Rudram250203",
      //         "brandName": "RUDRAM",
      //         "screenStatus": "online"
      //       },
      //       {
      //         "sortTime": 1741849138000,
      //         "logTime": "2025-03-13T12:28:58.000+05:30",
      //         "deviceTime": "Thu Mar 13 12:28:58 GMT+05:30 2025",
      //         "mediaId": "67c83e18efc34a9341bf34a8_1X1_new",
      //         "campaignId": "67a0a6a85f055df930bc2336",
      //         "campaignName": "Rudram250203",
      //         "brandName": "RUDRAM",
      //         "screenStatus": "online"
      //       },
      //       {
      //         "sortTime": 1741848944000,
      //         "logTime": "2025-03-13T12:25:44.000+05:30",
      //         "deviceTime": "Thu Mar 13 12:25:44 GMT+05:30 2025",
      //         "mediaId": "67c83e18efc34a9341bf34a8_1X1_new",
      //         "campaignId": "67a0a6a85f055df930bc2336",
      //         "campaignName": "Rudram250203",
      //         "brandName": "RUDRAM",
      //         "screenStatus": "online"
      //       },
      //       {
      //         "sortTime": 1741848750000,
      //         "logTime": "2025-03-13T12:22:30.000+05:30",
      //         "deviceTime": "Thu Mar 13 12:22:30 GMT+05:30 2025",
      //         "mediaId": "67c83e18efc34a9341bf34a8_1X1_new",
      //         "campaignId": "67a0a6a85f055df930bc2336",
      //         "campaignName": "Rudram250203",
      //         "brandName": "RUDRAM",
      //         "screenStatus": "online"
      //       },
      //       {
      //         "sortTime": 1741848556000,
      //         "logTime": "2025-03-13T12:19:16.000+05:30",
      //         "deviceTime": "Thu Mar 13 12:19:16 GMT+05:30 2025",
      //         "mediaId": "67c83e18efc34a9341bf34a8_1X1_new",
      //         "campaignId": "67a0a6a85f055df930bc2336",
      //         "campaignName": "Rudram250203",
      //         "brandName": "RUDRAM",
      //         "screenStatus": "online"
      //       },
      //       {
      //         "sortTime": 1741848363000,
      //         "logTime": "2025-03-13T12:16:03.000+05:30",
      //         "deviceTime": "Thu Mar 13 12:16:03 GMT+05:30 2025",
      //         "mediaId": "67c83e18efc34a9341bf34a8_1X1_new",
      //         "campaignId": "67a0a6a85f055df930bc2336",
      //         "campaignName": "Rudram250203",
      //         "brandName": "RUDRAM",
      //         "screenStatus": "online"
      //       },
      //       {
      //         "sortTime": 1741848169000,
      //         "logTime": "2025-03-13T12:12:49.000+05:30",
      //         "deviceTime": "Thu Mar 13 12:12:49 GMT+05:30 2025",
      //         "mediaId": "67c83e18efc34a9341bf34a8_1X1_new",
      //         "campaignId": "67a0a6a85f055df930bc2336",
      //         "campaignName": "Rudram250203",
      //         "brandName": "RUDRAM",
      //         "screenStatus": "online"
      //       },
      //       {
      //         "sortTime": 1741847975000,
      //         "logTime": "2025-03-13T12:09:35.000+05:30",
      //         "deviceTime": "Thu Mar 13 12:09:35 GMT+05:30 2025",
      //         "mediaId": "67c83e18efc34a9341bf34a8_1X1_new",
      //         "campaignId": "67a0a6a85f055df930bc2336",
      //         "campaignName": "Rudram250203",
      //         "brandName": "RUDRAM",
      //         "screenStatus": "online"
      //       },
      //       {
      //         "sortTime": 1741847782000,
      //         "logTime": "2025-03-13T12:06:22.000+05:30",
      //         "deviceTime": "Thu Mar 13 12:06:22 GMT+05:30 2025",
      //         "mediaId": "67c83e18efc34a9341bf34a8_1X1_new",
      //         "campaignId": "67a0a6a85f055df930bc2336",
      //         "campaignName": "Rudram250203",
      //         "brandName": "RUDRAM",
      //         "screenStatus": "online"
      //       },
      //       {
      //         "sortTime": 1741847588000,
      //         "logTime": "2025-03-13T12:03:08.000+05:30",
      //         "deviceTime": "Thu Mar 13 12:03:08 GMT+05:30 2025",
      //         "mediaId": "67c83e18efc34a9341bf34a8_1X1_new",
      //         "campaignId": "67a0a6a85f055df930bc2336",
      //         "campaignName": "Rudram250203",
      //         "brandName": "RUDRAM",
      //         "screenStatus": "online"
      //       }
      //     ]
      //   }
      // }
    }

    return {hrWiseLogs: hrWiseLogs};

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
  
    // Convert to minutes or seconds
    if (avgGapMs < 60000) {
      return (avgGapMs / 1000).toFixed(2) + " sec"; // Less than 1 min → Show in seconds
    } else {
      return (avgGapMs / 60000).toFixed(2) + " min"; // 1 min or more → Show in minutes
    }
  };

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
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-10 ">
      <div
        className="bg-[#FFFFFF] p-4 rounded-lg shadow-lg w-full max-w-full relative overflow-auto max-h-auto "
        style={{ height: "80vh", width: "95vw" }}
      >
        <div className="flex justify-end">
          <i className="fi fi-br-circle-xmark" onClick={() => onClose()}></i>
        </div>
        <div className="flex justify-between p-4 border">
          <div>
            <h1 className="font-semibold text-[16px] text-[#0E212E] leading-[19.36px]">
              Log Report
            </h1>
            {/* <h1>{campaign?.screenName}</h1> */}
            <h1 className="text-[14px] text-[#5B7180] leading-[16.94px] py-1">
              {logs?.campaign?.name}
            </h1>
          </div>
          {!loading && logs?.logs?.length > 0 && (
            <DownLoadCampaignLogReport
              campaignLog={logs?.logs}
              campaign={logs?.campaign}
            />
          )}
        </div>
        <div className="flex items-center justify-center py-8 border">
          <CalendarScaleSlider
            days={calculateDaysPlayed(
              campaignDetails?.startDate,
              campaignDetails?.endDate
            )}
            daysPlayed={
              calculateDaysPlayed(
                campaignDetails?.startDate,
                campaignDetails?.endDate
              ) === 0
                ? 1
                : calculateDaysPlayed(
                  campaignDetails?.startDate,
                    campaignDetails?.endDate
                  )
            }
          />
        </div>

        {loading ? (
          <div className="py-4">
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
              {Object.entries(newCombinedData?.hrWiseLogs).map(([date, hours]: any) => (
                <div key={date} className="flex mb-6 w-full">
                  <div className="p-2 border flex justify-center items-center h-[50vh]">
                    <h2 className="text-xl font-bold text-gray-700 mb-2">{date}</h2>
                  </div>
                  <div className="h-[50vh] border overflow-scroll no-scrollbar">
                    {Object.entries(hours).map(([hour, entries]: any) => (
                      <div key={hour} className="flex">
                        <div className="p-2 border flex justify-center items-center">
                          <h3 className="text-lg font-semibold text-gray-600 mb-2">
                            {transformToAmPm(`${hour}:00:00`)} to {transformToAmPm(`${hour}:59:59`)}
                          </h3>  
                        </div>
                        
                        <div className="overflow-scroll no-scrollbar h-auto border">
                          <table className="min-w-full bg-white">
                            
                            <tbody>
                              {entries.map((entry: any, index: any) => (
                                <tr
                                  key={index}
                                  className="border-b hover:bg-gray-50 text-gray-700"
                                >
                                  <td className="py-2 px-4 border">{new Date(entry.logTime).toLocaleTimeString()}</td>
                                  <td className="py-2 px-4 border">
                                    {entry.campaignName}
                                  </td>
                                  <td className="py-2 px-4 border">{entry.brandName}</td>
                                  <td
                                    className={`py-2 px-4 border ${
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
                        <div className="h-auto grid grid-cols-3">
                          <div className="col-span-1 flex justify-center items-center gap-2 p-2">
                            <h1 className={(entries.length/(17 * campaignDetails?.sov)) >= 1 ? "text-[#2A892D]" : "text-[#CC0000]"}>
                              {entries.length}
                            </h1>
                            <p className={(entries.length/(17 * campaignDetails?.sov)) >= 1 ? "text-[#2A892D] text-sm" : "text-[#CC0000] text-sm"}>
                              {(entries.length/(17 * campaignDetails?.sov)) > 1 ? `(+${Number(((entries.length/(17 * campaignDetails?.sov))*100)).toFixed(0)}%)` : (entries.length/(17 * campaignDetails?.sov)) < 1 ? `(-${Number(100 - ((entries.length/(17 * campaignDetails?.sov)) * 100)).toFixed(0)}%)` : `✔`}
                            </p>
                          </div>
                          <div className="col-span-1 border flex justify-center items-center p-2">
                            {17 * campaignDetails?.sov}
                          </div>
                          <div className="col-span-1 flex justify-center items-center p-2">
                            {calculateAvgTimeGap(entries)}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            {/* <div className="overflow-scroll scrollbar-minimal h-[50vh]">
              <table className="auto w-full border border-gray-300 shadow-md rounded-lg">
                <thead className="bg-gray-200 text-left">
                  <tr>
                    <th className="border p-1">Days</th>
                    <th className="border p-1">Date</th>
                    <th className="border p-1">Time</th>
                    <th className="border p-1">Creative Name</th>
                    <th className="border p-1">Status</th>
                    <th className="border p-1">Delivered</th>
                    <th className="border p-1">Promised</th>
                    <th className="border p-1">Avg Log Time</th>
                  </tr>
                </thead>
                <tbody className="text-sm">
                  {Object.keys(newData).map((date: string, i) => {
                    const records = newData[date];

                    return records.map((data: DataRow, j: number) => (
                      <tr key={`${date}-${j}`} className="hover:bg-gray-100">
                        {j === 0 && (
                          <td
                            className="border p-1 font-semibold text-center"
                            rowSpan={records.length}
                          >
                            {i + 1}
                          </td>
                        )}
                        <td className="border p-1">{date}</td>
                        <td className="border p-1">{data.time}</td>
                        <td className="border p-1">{data.creativeName}</td>
                        <td
                          className={`border p-1 ${
                            data.status === "online"
                              ? `text-[#59A237]`
                              : `text-[#5B7180]`
                          }`}
                        >
                          {data.status}
                        </td>
                        {j === 0 && (
                          <td
                            className="border p-1 font-semibold text-center"
                            rowSpan={records.length}
                          >
                            {newCombinedData.combinedData?.delivered}
                          </td>
                        )}
                        {j === 0 && (
                          <td
                            className="border p-1 font-semibold text-center"
                            rowSpan={records.length}
                          >
                            {newCombinedData.combinedData?.promised}
                          </td>
                        )}
                        {j === 0 && (
                          <td
                            className="border p-1 font-semibold text-center"
                            rowSpan={records.length}
                          >
                            {newCombinedData.combinedData?.averageLogTIme}
                          </td>
                        )}
                      </tr>
                    ));
                  })}
                </tbody>
              </table>
            </div> */}
          </div>
        ) : (
          <NoDataView />
        )}
      </div>
    </div>
  );
};

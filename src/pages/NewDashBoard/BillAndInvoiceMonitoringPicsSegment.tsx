import React, { useEffect, useMemo, useRef, useState } from "react";
import { convertDateIntoDateMonthYear, formatDateForLogs, getTimeFromDate } from "../../utils/dateAndTimeUtils";
import { Skeleton, Tooltip } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { TIME_ZONES } from "../../constants/helperConstants";
import { GetCampaignLogsAction } from "../../actions/campaignAction";
import { LoadingScreen } from "../../components/molecules/LoadingScreen";

interface BillAndInvoiceMonitoringPicsSegmentProps {
 campaignDetails?: any;
 currentDate?: any;
 siteLevelData?: any;
}

export const BillAndInvoiceMonitoringPicsSegment = ({ siteLevelData, campaignDetails, currentDate }: BillAndInvoiceMonitoringPicsSegmentProps) => {

  const dispatch = useDispatch<any>();

  const scrollRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});
  let seq = 0;

  const {
    loading: loadingLogs,
    error: errorLogs,
    data: logs,
  } = useSelector((state: any) => state.campaignLogsGet);
  
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

  const newData = useMemo(() => {
    if (logs && logs.length > 0) {
      return logs?.reduce((accum: any, current: any) => {
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
    } else {
      return null;
    }
    
  }, [logs]);

  const newCombinedData = useMemo(() => {
    let hrWiseLogs: any;
    if (newData && logs && logs.length) {
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


  useEffect(() => {
    if (logs?.length == 0 || !logs?.length) {
        seq++;
       
    }
  },[logs, seq, dispatch]);

  useEffect(() => {
    if (siteLevelData?.[seq].campaignId) {
      dispatch(
        GetCampaignLogsAction({
          campaignId: siteLevelData?.[seq].campaignId,
          date: formatDateForLogs(currentDate)?.apiDate,
        }));
    }
    
  }, [dispatch, siteLevelData, currentDate, seq]);

 return (
  <div className="w-full border-t my-2 py-2">
   <div className="flex items-top gap-2 w-full">
    <div className="w-[15vw] rounded-[8px]">
     <img className="rounded-[8px]" src={siteLevelData?.[seq]?.images?.[0]} alt="screen"/>
    </div>
    <div className="w-full">
     <h1 className="text-[16px] font-bold">{siteLevelData?.[seq]?.screenName}</h1>
     <div className="w-full flex items-center justify-between gap-4">
      <div className="py-2">
       <div className="grid grid-cols-3 gap-4">
        <div className="col-span-1">
         <p className="text-[12px] text-gray-500 truncate">Touchpoint</p>
        </div>
        <div className="col-span-2">
         <p className="text-[12px] text-gray-500 truncate">- {siteLevelData?.[seq]?.touchPoint}</p>
        </div>
       </div>
       <div className="grid grid-cols-3 gap-4">
        <div className="col-span-1">
         <p className="text-[12px] text-gray-500 truncate">Screen Type</p>
        </div>
        <div className="col-span-2">
         <p className="text-[12px] text-gray-500 truncate">- {siteLevelData?.[seq]?.screenType}</p>
        </div>
       </div>
       <div className="grid grid-cols-3 gap-4">
        <div className="col-span-1">
         <p className="text-[12px] text-gray-500 truncate">Location</p>
        </div>
        <div className="col-span-2">
         <p className="text-[12px] text-gray-500 truncate">- {siteLevelData?.[seq]?.location}</p>
        </div>
       </div>
      </div>
      <div className="py-2">
       <div className="grid grid-cols-2 gap-4">
        <div className="col-span-1">
         <p className="text-[12px] text-gray-500 truncate">Start Date</p>
        </div>
        <div className="col-span-1">
         <p className="text-[12px] text-gray-500 truncate">- {convertDateIntoDateMonthYear(campaignDetails?.startDate)}</p>
        </div>
       </div>
       <div className="grid grid-cols-2 gap-4">
        <div className="col-span-1">
         <p className="text-[12px] text-gray-500 truncate">End Date</p>
        </div>
        <div className="col-span-1">
         <p className="text-[12px] text-gray-500 truncate">- {convertDateIntoDateMonthYear(campaignDetails?.endDate)}</p>
        </div>
       </div>
       <div className="grid grid-cols-2 gap-4">
        <div className="col-span-1">
         <p className="text-[12px] text-gray-500 truncate">Duration</p>
        </div>
        <div className="col-span-1">
         <p className="text-[12px] text-gray-500 truncate">- {campaignDetails?.duration} Days</p>
        </div>
       </div>
      </div>
     </div>
    </div>
   </div>
   <div className="w-full py-2">
    <table className="w-full">
     <thead className="w-full">
      <tr className="grid grid-cols-10 text-[12px] bg-gray-100 p-1">
       <th className="col-span-2 border-r border-gray-200">Pics Type</th>
       <th className="col-span-2 border-r border-gray-200">Day Shot</th>
       <th className="col-span-2 border-r border-gray-200">Newspaper</th>
       <th className="col-span-2 border-r border-gray-200">GPS</th>
       <th className="col-span-2">Night Shot</th>
      </tr>
     </thead>
     <tbody className="w-full">
      {siteLevelData?.[seq]?.monitoringData?.map((data: any, index: any) => (
       <tr className="grid grid-cols-10 gap-1 pt-1" key={index}>
        <td className="col-span-2 h-[120px] border border-gray-100 rounded-[4px] text-[12px] flex flex-col items-center justify-center">
          <h1>
            {data.dateType.split("Date")[0].toUpperCase()}
          </h1>
          <h1>
            {convertDateIntoDateMonthYear(data.date)}
          </h1>
        </td>
        <td className="col-span-2 h-[120px]">
         {data?.monitoringTypeWiseData?.find((d: any) => d?.monitoringType === "dayShot")?.monitoringUrls?.[0]?.awsUrl ? (
          <img className="h-full w-full rounded-[4px]" src={data?.monitoringTypeWiseData?.find((d: any) => d?.monitoringType === "dayShot")?.monitoringUrls?.[0]?.awsUrl} alt="dayShot" />
         ) : (
          <div className="h-full border border-gray-100 rounded-[4px] bg-gray-50 text-[12px] text-gray-400 flex items-center justify-center">
           No Image
          </div>
         )}
         {/* {data.monitoringTypeWiseData.find((d: any) => d.monitoringType === "dayShot")?.monitoringUrls[0]?.awsUrl} */}
        </td>
        <td className="col-span-2 h-[120px]">
         {data?.monitoringTypeWiseData?.find((d: any) => d?.monitoringType === "dayShot")?.monitoringUrls?.[0]?.awsUrl ? (
          <img className="h-full w-full rounded-[4px]" src={data?.monitoringTypeWiseData?.find((d: any) => d?.monitoringType === "withNewspaper")?.monitoringUrls?.[0]?.awsUrl} alt="withNewspaper" />
         ) : (
          <div className="h-full border border-gray-100 rounded-[4px] bg-gray-50 text-[12px] text-gray-400 flex items-center justify-center">
           No Image
          </div>
         )}
        </td>
        <td className="col-span-2 h-[120px]">
         {data?.monitoringTypeWiseData?.find((d: any) => d?.monitoringType === "dayShot")?.monitoringUrls?.[0]?.awsUrl ? (
          <img className="h-full w-full rounded-[4px]" src={data?.monitoringTypeWiseData?.find((d: any) => d?.monitoringType === "withGeoTag")?.monitoringUrls?.[0]?.awsUrl} alt="withGeoTag" />
         ) : (
          <div className="h-full border border-gray-100 rounded-[4px] bg-gray-50 text-[12px] text-gray-400 flex items-center justify-center">
           No Image
          </div>
         )}
        </td>
        <td className="col-span-2 h-[120px]">
         {data?.monitoringTypeWiseData?.find((d: any) => d?.monitoringType === "dayShot")?.monitoringUrls?.[0]?.awsUrl ? (
          <img className="h-full w-full rounded-[4px]" src={data?.monitoringTypeWiseData?.find((d: any) => d?.monitoringType === "nightShot")?.monitoringUrls?.[0]?.awsUrl} alt="nightShot" />
         ) : (
          <div className="h-full border border-gray-100 rounded-[4px] bg-gray-50 text-[12px] text-gray-400 flex items-center justify-center">
           No Image
          </div>
         )}
        </td>
       </tr>
      ))}

     </tbody>
    </table>
   </div>
   <div className="w-full py-2">
    <h1 className="text-[12px] font-semibold pt-2 px-1">{siteLevelData?.[seq]?.screenName}</h1>
    <div className="col-span-7 border border-gray-100 mt-2">
     <div className="grid grid-cols-10 bg-gray-100">
      <div className="col-span-6 grid grid-cols-12">
        <div className="col-span-1 py-1 flex items-center justify-center">
          <h2 className=" text-[12px] font-semibold truncate">
          {"Spot"}
          </h2>
        </div>
        <div className="col-span-3 py-1 flex items-center justify-center">
          <h2 className=" text-[12px] font-semibold truncate">
          {"Time"}
          </h2>
        </div>
        <div className="col-span-4 py-1 flex items-center justify-center">
          <h2 className=" text-[12px] font-semibold truncate">
          {"Creative"}
          </h2>
        </div>
        <div className="col-span-2 py-1 flex items-center justify-center">
          <h2 className=" text-[12px] font-semibold ">
          {"Brand"}
          </h2>
        </div>
        <div className="col-span-2 py-1 flex justify-center">
          <i className="fi fi-br-wifi  flex items-center justify-center"></i>
        </div>
      </div>
      <div className="col-span-4 border-b grid grid-cols-4">
        <div className="col-span-1 py-1 flex items-center justify-center">
          <h2 className=" text-[12px] font-semibold truncate">
          {"Delivered"}
          </h2>
        </div>
        <div className="col-span-1 py-1 flex items-center justify-center">
          <h2 className=" text-[12px] font-semibold truncate">
          {"Promised"}
          </h2>
        </div>
        <div className="col-span-1 py-1 flex items-center justify-center">
          <h2 className=" text-[12px] font-semibold truncate">
          {"Av. Loop Time"}
          </h2>
        </div>
        <div className="col-span-1 py-1 flex items-center justify-center">
          <h2 className=" text-[12px] font-semibold truncate">
          {"Time Zone"}
          </h2>
        </div>
      </div>
     </div>
     {loadingLogs ? (
      <div className="pt-12">
       <LoadingScreen />
      </div>
     ) : logs?.length > 0 && Object.entries(newCombinedData?.hrWiseLogs).map(
      ([date, hours]: any) => (
       <div key={date}>
        <div className="border-r border-gray-100 rounded-br-[12px]">
         {Object.keys(hours)
          .sort((a, b) => Number(a) - Number(b))
          .map((key) => [key, hours[key]])
          .map(([hour, entries]: any, i: any) => (
           <div
            key={hour}
            className="grid grid-cols-10 "
           >
            <div
             className="col-span-6 border-b"
             ref={(el) => (scrollRefs.current[hour] = el)}
            >
             <table className="min-w-full h-full bg-white">
              <tbody>
               {entries.map((entry: any, index: any) => (
                <tr
                 key={index}
                 className={`
                  h-full grid grid-cols-12 border-b border-gray-100 hover:bg-gray-50 text-gray-700 p-1
                   "bg-[#00A0FA10]"}
                 `}
                >
                 <td className="col-span-1 py-2 flex items-center justify-center">
                  <h1 className="text-[12px]">
                   {index+1}
                  </h1>
                 </td>
                 <td className="col-span-3 py-2 flex items-center justify-center">
                  <h1 className="text-[12px]">
                   {new Date(entry.logTime).toLocaleString()}
                  </h1>
                 </td>
                 <td className="col-span-4 py-2 flex items-center justify-center">
                  <h1 className="text-[12px]">
                   {entry.mediaId.split("_")[1]}
                  </h1>
                 </td>
                 <td className="col-span-2 py-2 flex items-center justify-center">
                  <h1 className="text-[12px]">
                   {entry.brandName}
                  </h1>
                 </td>
                 <td
                  className={`col-span-2 py-2 flex items-center justify-center ${
                   entry.screenStatus === "online"
                    ? "text-[#59A237]"
                    : "text-gray-500"
                  }`}
                 >
                  <h1 className="text-[12px]">
                   {entry.screenStatus.toUpperCase()}
                  </h1>
                 </td>
                </tr>
               ))}
              </tbody>
             </table>
            </div>
            <div className={`
             col-span-3 h-auto border-b border-l border-gray-100 grid grid-cols-3 bg-[#FFFFFF]
            `}>
              <div className="col-span-1 flex justify-center items-top gap-2 p-2">
                <h1
                className={
                  entries.length /
                  (17 * campaignDetails?.sov) >=
                  1
                  ? "text-[#2A892D] text-[12px]"
                  : "text-[#CC0000] text-[12px]"
                }
                >
                {entries.length}
                </h1>
                <p
                className={
                  entries.length /
                  (17 * campaignDetails?.sov) >=
                  1
                  ? "text-[#2A892D] text-[12px]"
                  : "text-[#CC0000] text-[12px]"
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
              <div className="col-span-1 border-x border-gray-100 flex justify-center items-top p-2">
                <h1 className="text-[12px]">
                {17 * campaignDetails?.sov}
                </h1>
              </div>
              <div className="col-span-1 border-r border-gray-100 flex justify-center items-top p-2">
                <h1 className="text-[12px]">
                {calculateAvgTimeGap(entries) === "N/A"
                  ? "--"
                  : calculateAvgTimeGap(entries)}
                </h1>
              </div>
              
            </div>
            <div className="col-span-1 flex justify-center items-top p-2">
              <h1 className="text-[12px]">
                {TIME_ZONES?.["t1"].includes(Number(hour)) ? "T1 (Morning) (2:00 AM to 10:59 AM)" : 
                  TIME_ZONES?.["t2"].includes(Number(hour)) ? "T2 (Afternoon) (11:00 AM to 3:59 PM)" :
                  TIME_ZONES?.["t3"].includes(Number(hour)) ? "T3 (Evening) (04:00 PM to 08:59 PM)" :
                  TIME_ZONES?.["t4"].includes(Number(hour)) ? "T4 (Night) (09:00 PM to 01:59 AM)" :
                  "All Day"}
              </h1>
            </div>
           </div>
          ))}
        </div>
       </div>
      )
     )}
    </div>
   </div>
  </div>
 );
};

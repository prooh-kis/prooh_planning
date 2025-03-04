import { Skeleton } from "antd";
import React, { useEffect, useMemo } from "react";
import {
  calculateDaysPlayed,
  convertDataTimeToLocale,
  convertDateIntoDateMonthYear,
  getNumberOfDaysBetweenTwoDates,
  getTimeFromDate,
} from "../../utils/dateAndTimeUtils";
import { DownLoadCampaignLogReport } from "../../components/molecules/DownLoadCampaignLogReport";
import { NoDataView } from "../../components/molecules/NoDataView";
import { PrimaryButton } from "../../components/atoms/PrimaryButton";
import { CalendarScaleSlider } from "../../components/molecules/CalenderScaleSlider";

type DataRow = {
  time: string;
  creativeName: string;
  status: string;
  delivered: number;
  promised: number;
  averageLogTIme: string;
};

type DataStructure = {
  [date: string]: DataRow[];
};

export const ShowCampaignLogsPopup = ({
  open,
  onClose,
  logs,
  loading,
}: any) => {
  const newData = useMemo(() => {
    return logs?.logs?.reduce((accum: DataStructure, current: any) => {
      const key = convertDateIntoDateMonthYear(current?.logTime);
      if (!accum[key]) {
        accum[key] = [];
      }
      const existingCount = accum[key]?.length;

      accum[key].push({
        time: getTimeFromDate(current?.logTime),
        creativeName: current?.mediaId?.split("_")[1] || "Unknown",
        status: current?.screenStatus,
        delivered: existingCount + 1,
        promised: 30,
        averageLogTIme: "2 Min 30 Sec",
      });
      return accum;
    }, {});
  }, [logs?.logs]);

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
            days={getNumberOfDaysBetweenTwoDates(
              logs?.campaign?.startDate,
              logs?.campaign?.endDate
            )}
            daysPlayed={
              calculateDaysPlayed(
                logs?.campaign?.startDate,
                logs?.campaign?.endDate
              ) === 0
                ? 1
                : calculateDaysPlayed(
                    logs?.campaign?.startDate,
                    logs?.campaign?.endDate
                  )
            }
          />
        </div>

        {loading ? (
          <div className="py-4">
            <Skeleton active paragraph={{ rows: 12 }} />
          </div>
        ) : logs?.logs?.length > 0 ? (
          <div className="p-1">
            <div className="bg-white rounded py-4">
              <h1 className="font-semibold text-[16px] text-[#0E212E] leading-[19.36px]">
                Hourly Based Logs{" "}
              </h1>
            </div>
            <div className="overflow-scroll scrollbar-minimal h-[50vh]">
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
                  {Object.keys(newData || {}).map((date: string, i) => {
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
                            {data.delivered}
                          </td>
                        )}
                        {j === 0 && (
                          <td
                            className="border p-1 font-semibold text-center"
                            rowSpan={records.length}
                          >
                            {data.promised}
                          </td>
                        )}
                        {j === 0 && (
                          <td
                            className="border p-1 font-semibold text-center"
                            rowSpan={records.length}
                          >
                            {data.averageLogTIme}
                          </td>
                        )}
                      </tr>
                    ));
                  })}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <NoDataView />
        )}
      </div>
    </div>
  );
};

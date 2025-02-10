import { Skeleton } from "antd";
import React, { useEffect } from "react";
import { calculateDaysPlayed, convertDataTimeToLocale, getNumberOfDaysBetweenTwoDates } from "../../utils/dateAndTimeUtils";
import { DownLoadCampaignLogReport } from "../../components/molecules/DownLoadCampaignLogReport";
import { NoDataView } from "../../components/molecules/NoDataView";
import { PrimaryButton } from "../../components/atoms/PrimaryButton";
import { CalendarScaleSlider } from "../../components/molecules/CalenderScaleSlider";

export const ShowCampaignLogsPopup = ({
  open,
  onClose,
  logs,
  loading,
}: any) => {
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
      {/* <div className="">
        <div className="bg-white rounded">
          <div className="flex justify-between w-[95vw] p-4 border-b">
            <div className="px-2">
              <h1 className="lg:text-[16px] text-[14px] font-semibold">Log Report</h1>
              <h1 className="text-[12px] text-gray-500">{logs?.campaign?.name}</h1>
            </div>
            <div className="flex items-center gap-4">
              <PrimaryButton
                title="Export"
                rounded="rounded"
                height="h-8"
                width="w-16"
                textSize="text-[12px]"
              />
              <i className="fi fi-br-circle-xmark" onClick={() => onClose()}></i>
            </div>
          </div>
          <div className="flex items-center justify-center pt-12 pb-8">
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
        </div>
        <div className="bg-white rounded mt-2 p-4">
          <h1 className="">Hourly Logs</h1>
        </div>

      </div> */}
      
      <div
        className="bg-[#FFFFFF] p-4 rounded-lg shadow-lg w-full max-w-full relative overflow-auto max-h-auto "
        style={{ height: "80vh", width: "95vw" }}
      >
        <div className="flex justify-between">
          <h1 className="text-[16px] font-bold">
            Campaign Logs : <span className="">{logs?.campaign?.name}</span>
          </h1>
          <i className="fi fi-br-circle-xmark" onClick={() => onClose()}></i>
        </div>
        {!loading && logs?.logs?.length > 0 && (
          <DownLoadCampaignLogReport
            campaignLog={logs?.logs}
            campaign={logs?.campaign}
          />
        )}
        {loading ? (
          <div className="py-4">
            <Skeleton active paragraph={{ rows: 12 }} />
          </div>
        ) : logs?.logs?.length > 0 ? (
          <div className="p-2">
            <table className="auto h-[20rem] ">
              <thead>
                <tr className="gap-4">
                  <th className="border p-2 ">Sl. No</th>
                  <th className="border p-2">Log Time</th>
                  <th className="border p-2">Device Time</th>
                  <th className="border p-2">Creative Name</th>
                  <th className="border p-2">ScreenName</th>
                  <th className="border p-2">Device Status</th>
                </tr>
              </thead>
              <tbody className="overflow-scroll h-[60vh] no-scrollbar text-[14px]">
                {logs.logs?.map((c: any, i: any) => (
                  <tr className="" key={i}>
                    <td className="border p-2">{i + 1}</td>
                    <td className="border p-2">
                      {convertDataTimeToLocale(c.logTime)}
                    </td>
                    <td className="border p-2">
                      {convertDataTimeToLocale(c.deviceTime)}
                    </td>
                    <td className="border p-2">{c.mediaId?.split("_")[1]}</td>
                    <td className="border p-2">{logs?.campaign?.screenName}</td>
                    <td
                      className={
                        c.screenStatus === "online"
                          ? "border p-2 bg-greenbg text-black"
                          : "border p-2 bg-redbg text-black"
                      }
                      onClick={() => {
                        console.log(c.screenStatus);
                      }}
                    >
                      {c.screenStatus}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <NoDataView />
        )}
      </div>
    </div>
  );
};

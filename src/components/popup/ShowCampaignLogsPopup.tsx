import { convertDataTimeToLocale } from "../../utils/dateAndTimeUtils";
import { SkeletonLoader } from "../../components/molecules/SkeletonLoader";
import React, { useEffect } from "react";

interface ShowCampaignLogsPopupProps {
  openLogsPopup?: any;
  logs?: any;
  loading?: any;
  onClose?: any;
  error?: any;
  screenName?: any;
}

export function ShowCampaignLogsPopup({
  openLogsPopup,
  logs,
  loading,
  error,
  onClose,
  screenName,
}: ShowCampaignLogsPopupProps) {
  useEffect(() => {
    if (openLogsPopup) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [openLogsPopup]);

  if (!openLogsPopup) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-10">
      <div className="border bg-white rounded-[10px] h-3/4 w-3/4 p-1">
        <div
          className="relative inset-0 flex items-center justify-between gap-4 p-3"
          onClick={() => onClose()}
        >
          <h1>Screen: {screenName}</h1>
          <i className="fi fi-br-circle-xmark"></i>
        </div>
        <div className="p-2 overflow-scroll no-scrollbar h-[65vh]">
          <div className="flex flex-wrap justify-center items-center gap-2">
            {loading? (
              <div className="w-full h-[50vh] border">
                <SkeletonLoader />
              </div>
            ) : error ? (
              <div>
                <h1>
                  {error}
                </h1>
              </div>
            ) : (
              <div>
            <table className="w-full">
              <thead className="w-full">
                <tr>
                  <th className="border px-4">Sl. No</th>
                  <th className="border px-4">Playback Time</th>
                  <th className="border px-4">Device Status</th>
                </tr>
              </thead>
              <tbody className="overflow-auto">
                {logs?.map((c: any, i: any) => (
                  <tr className="" key={i}>
                    <td className="border px-4">{i + 1}</td>
                    <td className="border px-4">
                      {convertDataTimeToLocale(c.time)}
                    </td>
                    <td className="border px-4">{c.screenStatus}</td>
                  </tr>
                ))}
              </tbody>
            </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

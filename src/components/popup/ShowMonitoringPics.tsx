import { convertDataTimeToLocale } from "../../utils/dateAndTimeUtils";
import { SkeletonLoader } from "../../components/molecules/SkeletonLoader";
import React, { useEffect } from "react";

interface ShowMonitoringPicsPopupProps {
  openMonitoringPicsPopup?: any;
  monitoringPics?: any;
  loading?: any;
  onClose?: any;
  error?: any;
  screenName?: any;
}

export function ShowMonitoringPicsPopup({
  openMonitoringPicsPopup,
  monitoringPics,
  loading,
  error,
  onClose,
  screenName,
}: ShowMonitoringPicsPopupProps) {
  useEffect(() => {
    if (openMonitoringPicsPopup) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [openMonitoringPicsPopup]);

  if (!openMonitoringPicsPopup) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-10">
      <div className="border bg-white rounded-[10px] h-3/4 w-3/4 p-1">
        <div
          className="relative inset-0 flex items-center justify-end gap-4 p-3"
          onClick={() => onClose()}
        >
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
                  {error?.message}
                </h1>
              </div>
            ) : (
              <div>
                <h1>{`"Pictures coming soon..."`}</h1>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

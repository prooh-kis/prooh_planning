import { PieChart } from "../../components/MyCharts/PieCharts";
import React, { useEffect } from "react";

interface CalendarPopupProps {
  open?: boolean;
  dates?: any;
  onClose?: any;
  mediaTypeData?: any;
  setMonitoringDate?: any;
}

export function ShowMediaTypePopup({
  onClose,
  open,
  mediaTypeData,
}: CalendarPopupProps) {
  useEffect(() => {
    if (open) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [open]);

  if (!open) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-10">
      <div className="border bg-[#FFFFFF] rounded-[10px] h-1.9/4 w-1/4 p-1">
        <div
          className="relative inset-0 flex items-center justify-end gap-4 p-3"
          onClick={() => onClose(false)}
        >
          <i className="fi fi-br-circle-xmark"></i>
        </div>
        <div className="px-2 overflow-scroll no-scrollbar h-[30vh]">
          <div className="flex justify-between">
            <h1 className="text-[#0E212E] text-[24px] font-semibold leading-[32.68px]">
              Media Type
            </h1>
          </div>

          <div className="">
            <PieChart
              data={{
                labels: ["Connected", "Third Party"],
                values: [
                  mediaTypeData?.Connected,
                  mediaTypeData?.["Third Party"],
                ],
                colors: ["#84D3FF", "#FFBE17"],
                centerText: `${
                  mediaTypeData?.Connected + mediaTypeData?.["Third Party"]
                } Screens`,
              }}
            />
            <div className="flex gap-4 pr-16 justify-center mt-8">
              <div className="flex gap-4 items-center">
                <div className="h-4 w-4 bg-[#84D3FF]"></div>
                <h1>Connected</h1>
              </div>
              <div className="flex gap-4 items-center">
                <div className="h-4 w-4 bg-[#FFBE17]"></div>
                <h1>Third party</h1>
              </div>
            </div>{" "}
          </div>
        </div>
      </div>
    </div>
  );
}

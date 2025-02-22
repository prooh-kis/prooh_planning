import { PieChart } from "../../components/MyCharts/PieCharts";
import React, { useEffect } from "react";

interface CalendarPopupProps {
  open?: boolean;
  dates?: any;
  onClose?: any;
  myData?: any;
  setMonitoringDate?: any;
}

const data = {
  Approved: {
    screenCount: 15,
    connected: 10,
    "Third party": 5,
  },
  Pending: {
    screenCount: 5,
    connected: 4,
    "Third party": 1,
  },
  Rejected: {
    screenCount: 6,
    connected: 4,
    "Third party": 2,
  },
};

export function StatusPopup({ onClose, open, myData }: CalendarPopupProps) {
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
      <div className="border bg-[#FFFFFF] rounded-[10px] h-2/4 w-2/4 p-1">
        <div
          className="relative inset-0 flex items-center justify-end gap-4 p-3"
          onClick={() => onClose(false)}
        >
          <i className="fi fi-br-circle-xmark"></i>
        </div>
        <div className="px-2 overflow-scroll no-scrollbar h-[40vh]">
          <div className="flex justify-between">
            <h1 className="text-[#0E212E] text-[24px] font-semibold leading-[32.68px]">
              Status
            </h1>
            <div className="flex gap-4 pr-16">
              <div className="flex gap-4 items-center">
                <div className="h-4 w-4 bg-[#84D3FF]"></div>
                <h1>Connected</h1>
              </div>
              <div className="flex gap-4 items-center">
                <div className="h-4 w-4 bg-[#FFBE17]"></div>
                <h1>Third party</h1>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-12 mt-4  flex justify-center">
            {myData?.Approved?.Connected + myData?.Approved?.["Third Party"] >
              0 && (
              <div className="col-span-4">
                <PieChart
                  data={{
                    labels: ["Connected", "Third Party"],
                    values: [
                      myData?.Approved?.Connected,
                      myData?.Approved?.["Third Party"],
                    ],
                    colors: ["#84D3FF", "#FFBE17"],
                    centerText: `${
                      myData?.Approved?.Connected +
                      myData?.Approved?.["Third Party"]
                    } Screens`,
                  }}
                />
                <h1 className="text-center pt-4">Approved</h1>
              </div>
            )}
            {myData?.Pending?.Connected + myData?.Pending?.["Third Party"] >
              0 && (
              <div className="col-span-4">
                <PieChart
                  data={{
                    labels: ["Connected", "Third Party"],
                    values: [
                      myData?.Pending?.Connected,
                      myData?.Pending?.["Third Party"],
                    ],
                    colors: ["#84D3FF", "#FFBE17"],
                    centerText: `${
                      myData?.Pending?.Connected +
                      myData?.Pending?.["Third Party"]
                    } Screens`,
                  }}
                />
                <h1 className="text-center pt-4">Pending</h1>
              </div>
            )}

            {myData?.Rejected?.Connected + myData?.Rejected?.["Third Party"] >
              0 && (
              <div className="col-span-4">
                <PieChart
                  data={{
                    labels: ["Connected", "Third Party"],
                    values: [
                      myData?.Rejected?.Connected,
                      myData?.Rejected?.["Third Party"],
                    ],
                    colors: ["#84D3FF", "#FFBE17"],
                    centerText: `${
                      myData?.Rejected?.Connected +
                      myData?.Rejected?.["Third Party"]
                    } Screens`,
                  }}
                />
                <h1 className="text-center pt-4">Rejected</h1>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

import React, { useState } from "react";

interface TimeData {
  percentage: number;
  included: boolean;
}

interface DayData {
  morning: TimeData;
  afternoon: TimeData;
  evening: TimeData;
  night: TimeData;
}
interface DayWiseData {
  weekdays: DayData;
  saturdays: DayData;
  sundays: DayData;
}
interface Props {
  currentTab: keyof DayWiseData;
  bottomTableData: BottomTableData;
}

interface BottomTableData {
  selected: {
    morning: number;
    afternoon: number;
    evening: number;
    night: number;
  };
  totalTable: {
    weekdays: {
      morning: number;
      afternoon: number;
      evening: number;
      night: number;
    };
    saturdays: {
      morning: number;
      afternoon: number;
      evening: number;
      night: number;
    };
    sundays: {
      morning: number;
      afternoon: number;
      evening: number;
      night: number;
    };
  };
}

export const AdsPlaySelectedSummaryTable = ({
  currentTab,
  resultData,
  bottomTableData,
}: any) => {
  const getUpto2Decimal = (value: any) => {
    return `${Number(value)?.toFixed(2)}%`;
  };
  return (
    <div className="w-full border-r border-b">
      {/* header of the table */}
      <div className="flex w-full align-center bg-[#DEDEDE] text-[#2B2B2B] text-[14px] py-2">
        <h1 className="w-full text-center "></h1>
        <h1 className="w-full text-center "> TouchPoint</h1>
        <h1 className="w-full text-center "> Screen</h1>
        <h1 className="w-full text-center "> T1 (Morning)</h1>
        <h1 className="w-full text-center "> T2 (Afternoon)</h1>
        <h1 className="w-full text-center "> T3 (Evening)</h1>
        <h1 className="w-full text-center "> T4 (Night)</h1>
      </div>
      <div className="flex w-full align-center py-2 text-[14px]">
        <h1 className="w-full text-center ">Selected</h1>
        <h1 className="w-full text-center ">{Object.keys(resultData||{})?.length}</h1>
        <h1 className="w-full text-center ">{resultData?.reduce((total: any, touchPoint: any) => total + touchPoint.screenData.length, 0)}</h1>
        <h1 className="w-full text-center ">
          {getUpto2Decimal(bottomTableData?.selected?.morning)}
        </h1>
        <h1 className="w-full text-center ">
          {" "}
          {getUpto2Decimal(bottomTableData?.selected?.afternoon)}
        </h1>
        <h1 className="w-full text-center ">
          {" "}
          {getUpto2Decimal(bottomTableData?.selected?.evening)}
        </h1>
        <h1 className="w-full text-center ">
          {" "}
          {getUpto2Decimal(bottomTableData?.selected?.night)}
        </h1>
      </div>
      <div className="flex w-full align-center bg-[#E8F6FF] text-[#1297E2] py-2 text-[14px] ">
        <h1 className="w-full text-center ">Total</h1>
        <h1 className="w-full text-center ">{Object.keys(resultData || {})?.length}</h1>
        <h1 className="w-full text-center ">{resultData?.reduce((total: any, touchPoint: any) => total + touchPoint.screenData.length, 0)}</h1>
        <h1 className="w-full text-center ">
          {getUpto2Decimal(bottomTableData?.selected?.morning)}
        </h1>
        <h1 className="w-full text-center ">
          {getUpto2Decimal(bottomTableData?.selected?.afternoon)}
        </h1>
        <h1 className="w-full text-center ">
          {getUpto2Decimal(bottomTableData?.selected?.evening)}
        </h1>
        <h1 className="w-full text-center ">
          {getUpto2Decimal(bottomTableData?.selected?.night)}
        </h1>
      </div>
    </div>
  );
};

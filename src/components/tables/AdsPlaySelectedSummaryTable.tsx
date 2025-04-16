import React, { useMemo, useState } from "react";

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
  bottomTableData?: BottomTableData;
  totals?: any;
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
  resultData,
  totals,
}: any) => {
  const getUpto2Decimal = (value: any) => {
    return `${Number(value)?.toFixed(2)}%`;
  };
  return (
    <div className="w-full">
      <div className="flex rounded-t w-full align-center bg-[#DEDEDE] text-[#2B2B2B] text-[14px] py-2">
        <h1 className="w-full text-center "></h1>
        <h1 className="w-full text-center "> Touchpoint </h1>
        <h1 className="w-full text-center "> Screen </h1>
        <h1 className="w-full text-center "> Morning </h1>
        <h1 className="w-full text-center "> Afternoon </h1>
        <h1 className="w-full text-center "> Evening </h1>
        <h1 className="w-full text-center "> Night </h1>
      </div>
      <div className="rounded-b flex w-full align-center border-b border-x py-2 text-[14px]">
        <h1 className="w-full text-center ">Total</h1>
        <h1 className="w-full text-center ">{resultData?.length || 0}</h1>
        <h1 className="w-full text-center ">{resultData?.reduce((total: any, touchPoint: any) => total + touchPoint.screenData.length, 0) || 0}</h1>
        <h1 className="w-full text-center ">100.00%</h1>
        <h1 className="w-full text-center ">100.00%</h1>
        <h1 className="w-full text-center ">100.00%</h1>
        <h1 className="w-full text-center ">100.00%</h1>
      </div>
      <div className="flex w-full align-center py-2 bg-[#E8F6FF] text-[#1297E2] text-[14px] border">
        <h1 className="w-full text-center ">Selected</h1>
        <h1 className="w-full text-center ">{resultData?.length || 0}</h1>
        <h1 className="w-full text-center ">{totals.totalScreens || 0}</h1>
        <h1 className="w-full text-center ">{getUpto2Decimal(totals.selected.morning)}</h1>
        <h1 className="w-full text-center ">{getUpto2Decimal(totals.selected.afternoon)}</h1>
        <h1 className="w-full text-center ">{getUpto2Decimal(totals.selected.evening)}</h1>
        <h1 className="w-full text-center ">{getUpto2Decimal(totals.selected.night)}</h1>
      </div>
    </div>
  );
};
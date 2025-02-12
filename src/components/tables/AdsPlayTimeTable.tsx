import React, { useCallback, useEffect, useMemo, useState } from "react";

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

interface ScreenData {
  screenName: string;
  dayWiseData: DayWiseData;
}

interface ResultData {
  touchPoint: string;
  screenData: ScreenData[];
}

interface Props {
  currentTab: keyof DayWiseData;
  data: ResultData[];
  setData: any;
  bottomTableData: any;
}

export const AdsPlayTimeTable = ({
  currentTab,
  data,
  setData,
  bottomTableData,
}: Props) => {
  const getUpto2Decimal = (value: any) => {
    return `${Number(value)?.toFixed(2)}%`;
  };

  const handleSelectTime = (
    index: number,
    dayData: keyof DayData,
    included: boolean,
    index1: number
  ) => {
    setData((prevData: any) =>
      prevData.map((d: ResultData, i: number) =>
        i === index
          ? {
              ...d,
              screenData: d.screenData.map((d1: ScreenData, j: number) =>
                j === index1
                  ? {
                      ...d1,
                      dayWiseData: {
                        ...d1.dayWiseData,
                        [currentTab]: {
                          ...d1.dayWiseData[currentTab],
                          [dayData]: {
                            ...d1.dayWiseData[currentTab][dayData],
                            included: !included,
                          },
                        },
                      },
                    }
                  : d1
              ),
            }
          : d
      )
    );
  };

  return (
    <div className="w-full border-b text[#2B2B2B]">
      {/* header of the table */}
      <div className="flex w-full align-center grid grid-cols-12 bg-[#C9E9FF] py-2">
        <h1 className="w-full text-center col-span-2 "> TouchPoint</h1>
        <h1 className="w-full text-center col-span-2 "> Screen</h1>
        <h1 className="w-full text-center col-span-2 "> T1 Morning</h1>
        <h1 className="w-full text-center col-span-2 "> T2 Afternoon</h1>
        <h1 className="w-full text-center col-span-2 "> T3 Evening</h1>
        <h1 className="w-full text-center col-span-2 "> T4 Night</h1>
      </div>
      <div className="overflow-y-auto h-[50vh]">
        {/* d= {screenData : [], touchPoint }*/}
        {data?.map((d: ResultData, i: number) => (
          <div key={i} className="grid grid-cols-12">
            <div className=" flex justify-between items-center border-b border-l col-span-2 py-2 px-4 truncate">
              <h1 className="text-[14px] truncate">{d?.touchPoint}</h1>
            </div>
            <div className="col-span-10">
              {/* d1 = {dayWiseData : {}, screenName :""} */}
              {d?.screenData?.map((d1: ScreenData, j: any) => (
                <div key={j} className={`grid grid-cols-10 border-l flex`}>
                  <div className={`col-span-2 py-2 px-4 border-b border-l `}>
                    <div className="flex justify-between items-center truncate ">
                      <h1 className="text-[14px]">{d1?.screenName}</h1>
                    </div>
                  </div>
                  <div className={`col-span-2 py-2 px-4 border-b border-l`}>
                    <div className="flex justify-around items-center ">
                      <div
                        className="cursor-pointer"
                        onClick={() => {
                          handleSelectTime(
                            i,
                            "morning",
                            d1?.dayWiseData[currentTab]?.morning?.included,
                            j
                          );
                        }}
                      >
                        <i
                          className={`fi ${
                            d1?.dayWiseData[currentTab]?.morning?.included
                              ? "fi-br-check text-[#358E0B]"
                              : "fi-br-cross text-[#FF0808]"
                          } flex items-center text-[12px]`}
                        ></i>
                      </div>
                      <h1 className="text-[14px]">
                        {getUpto2Decimal(
                          d1?.dayWiseData[currentTab]?.morning?.percentage
                        )}
                      </h1>
                    </div>
                  </div>
                  <div className={`col-span-2 py-2 px-4 border-b border-l`}>
                    <div className="flex justify-around items-center ">
                      <div
                        className="cursor-pointer"
                        onClick={() => {
                          handleSelectTime(
                            i,
                            "afternoon",
                            d1?.dayWiseData[currentTab]?.afternoon?.included,
                            j
                          );
                        }}
                      >
                        <i
                          className={`fi ${
                            d1?.dayWiseData[currentTab]?.afternoon?.included
                              ? "fi-br-check text-[#358E0B]"
                              : "fi-br-cross text-[#FF0808]"
                          } flex items-center text-[12px]`}
                        ></i>
                      </div>
                      <h1 className="text-[14px]">
                        {getUpto2Decimal(
                          d1?.dayWiseData[currentTab]?.afternoon?.percentage
                        )}
                      </h1>
                    </div>
                  </div>
                  <div className={`col-span-2 py-2 px-4 border-b border-l`}>
                    <div className="flex justify-around items-center ">
                      <div
                        className="cursor-pointer"
                        onClick={() => {
                          handleSelectTime(
                            i,
                            "evening",
                            d1?.dayWiseData[currentTab]?.evening?.included,
                            j
                          );
                        }}
                      >
                        <i
                          className={`fi ${
                            d1?.dayWiseData[currentTab]?.evening?.included
                              ? "fi-br-check text-[#358E0B]"
                              : "fi-br-cross text-[#FF0808]"
                          } flex items-center text-[12px]`}
                        ></i>
                      </div>
                      <h1 className="text-[14px]">
                        {getUpto2Decimal(
                          d1?.dayWiseData[currentTab]?.evening?.percentage
                        )}
                      </h1>
                    </div>
                  </div>
                  {/* d1?.dayWiseData[currentTab]?.night?.included */}
                  <div className={`col-span-2 py-2 px-4 border-b border-x`}>
                    <div className="flex justify-around items-center ">
                      <div
                        className="cursor-pointer"
                        onClick={() => {
                          handleSelectTime(
                            i,
                            "night",
                            d1?.dayWiseData[currentTab]?.night?.included,
                            j
                          );
                        }}
                      >
                        <i
                          className={`fi ${
                            d1?.dayWiseData[currentTab]?.night?.included
                              ? "fi-br-check text-[#358E0B]"
                              : "fi-br-cross text-[#FF0808]"
                          } flex items-center text-[12px]`}
                        ></i>
                      </div>
                      <h1 className="text-[14px]">
                        {getUpto2Decimal(
                          d1?.dayWiseData[currentTab]?.night?.percentage
                        )}
                      </h1>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className="flex w-full align-center grid grid-cols-12">
        <h1 className="w-full text-center bg-[#C9E9FF] border-b border-l py-2 col-span-2">
          {" "}
          Total {data?.length}
        </h1>
        <h1 className="w-full text-center text-[#1297E2] border-b border-l py-2 col-span-2">
          {data?.reduce((accum: number, current: ResultData) => {
            return accum + current?.screenData?.length;
          }, 0)}
        </h1>
        <h1 className="w-full text-center text-[#1297E2] border-b border-l py-2 col-span-2">
          {getUpto2Decimal(bottomTableData?.totalTable?.[currentTab]?.morning)}
        </h1>
        <h1 className="w-full text-center text-[#1297E2] border-b border-l py-2 col-span-2">
          {getUpto2Decimal(
            bottomTableData?.totalTable?.[currentTab]?.afternoon
          )}
        </h1>
        <h1 className="w-full text-center text-[#1297E2] border-b border-l py-2 col-span-2">
          {getUpto2Decimal(bottomTableData?.totalTable?.[currentTab]?.evening)}
        </h1>
        <h1 className="w-full text-center text-[#1297E2] border-b border-x py-2 col-span-2">
          {getUpto2Decimal(bottomTableData?.totalTable?.[currentTab]?.night)}
        </h1>
      </div>
    </div>
  );
};

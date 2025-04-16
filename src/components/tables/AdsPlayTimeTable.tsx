import { Tooltip } from "antd";
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
  bottomTableData?: any;
  totals?: any;
  campaignDetails?: any;
}


export const AdsPlayTimeTable = ({
  currentTab,
  data,
  setData,
  totals,
  campaignDetails
}: Props) => {
  const getUpto2Decimal = (value: any) => {
    return `${Number(value)?.toFixed(2)}%`;
  };

  const handleSelectTime = (
    row: number,
    dayData: keyof DayData,
    included: boolean,
    column: number
  ) => {
    setData((prevData: any) => {
      return prevData.map((d: ResultData, i: number) => {
        if (i === row) {
          return {
            ...d,
            screenData: d.screenData.map((d1: ScreenData, j: number) => {
              if (j === column) {
                return {
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
                };
              }
              return d1;
            }),
          };
        }
        return d;
      });
    });
  };

  const handleSelectTimeZone = (dayData: keyof DayData, included: boolean) => {
    setData((prevData: any) => {
      return prevData.map((d: ResultData) => {
        return {
          ...d,
          screenData: d.screenData.map((d1: ScreenData) => {
            return {
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
            };
          }),
        };
      });
    });
  };

  function countKeys(keys: any) {
    let count = 0;
    for (const key in keys) {
      if (typeof keys[key] === "object" && keys[key] !== null) {
        count += Object.keys(keys[key]).length;
      }
    }
    return count;
  }

  return (
    <div className="w-full">
      {/* header of the table */}
      <div className="flex w-full align-center grid grid-cols-12 bg-[#C9E9FF] py-2 rounded-t">
        <h1 className="w-full text-center col-span-2 ">TouchPoint</h1>
        <h1 className="w-full text-center col-span-2 ">Screen</h1>
        <div className="w-full flex items-center justify-center gap-4 col-span-2">
          <Tooltip title="Morning time includes morning hours from">
            <h1 className="text-center  ">Morning</h1>
          </Tooltip>
          <div
            className="cursor-pointer"
            onClick={() => {
              const allMorningIncluded = data?.flatMap((d) => 
                d.screenData?.flatMap((d1) => 
                  d1.dayWiseData[currentTab]?.morning?.included
                )
              ).every((da) => da === true);
              
              handleSelectTimeZone("morning", allMorningIncluded);
            }}
          >
            <i
              className={`fi ${
                data?.flatMap(d => 
                  d.screenData?.flatMap(d1 => 
                    d1.dayWiseData[currentTab]?.morning?.included
                  )
                ).every(included => included === true)
                  ? "fi-br-check text-[#358E0B]"
                  : "fi-br-cross text-[#FF0808]"
              } flex items-center text-[12px]`}
            ></i>
          </div>
        </div>
        <div className="w-full flex items-center justify-center gap-4 col-span-2">
          <Tooltip title="Afternoon time includes afternoon hours from">
            <h1 className="text-center">Afternoon</h1>
          </Tooltip>
          <div
            className="cursor-pointer"
            onClick={() => {
              const allAfternoonIncluded = data?.flatMap((d) => 
                d.screenData?.flatMap((d1) => 
                  d1.dayWiseData[currentTab]?.afternoon?.included
                )
              ).every((da) => da === true);
              
              handleSelectTimeZone("afternoon", allAfternoonIncluded);
            }}            
          >
            <i
              className={`fi ${
                data?.flatMap(d => 
                  d.screenData?.flatMap(d1 => 
                    d1.dayWiseData[currentTab]?.afternoon?.included
                  )
                ).every(included => included === true)
                  ? "fi-br-check text-[#358E0B]"
                  : "fi-br-cross text-[#FF0808]"
              } flex items-center text-[12px]`}
            ></i>
          </div>
        </div>
        <div className="w-full flex items-center justify-center gap-4 col-span-2">
          <Tooltip title="Evening time includes evening hours from">
            <h1 className="text-center">Evening</h1>
          </Tooltip>
          <div
            className="cursor-pointer"
            onClick={() => {
              const allEveningIncluded = data?.flatMap((d) => 
                d.screenData?.flatMap((d1) => 
                  d1.dayWiseData[currentTab]?.evening?.included
                )
              ).every((da) => da === true);
              
              handleSelectTimeZone("evening", allEveningIncluded);
            }}
          >
            <i
              className={`fi ${
                data?.flatMap(d => 
                  d.screenData?.flatMap(d1 => 
                    d1.dayWiseData[currentTab]?.evening?.included
                  )
                ).every(included => included === true)
                  ? "fi-br-check text-[#358E0B]"
                  : "fi-br-cross text-[#FF0808]"
              } flex items-center text-[12px]`}
            ></i>

          </div>
        </div>
        <div className="w-full flex items-center justify-center gap-4 col-span-2">
          <Tooltip title="Night time includes night hours from">
            <h1 className="text-center">Night</h1>
          </Tooltip>
          <div
            className="cursor-pointer"
            onClick={() => {
              const allNightIncluded = data?.flatMap((d) => 
                d.screenData?.flatMap((d1) => 
                  d1.dayWiseData[currentTab]?.night?.included
                )
              ).every((da) => da === true);
              
              handleSelectTimeZone("night", allNightIncluded);
            }}
            
          >
            <i
              className={`fi ${
                data?.flatMap(d => 
                  d.screenData?.flatMap(d1 => 
                    d1.dayWiseData[currentTab]?.night?.included
                  )
                ).every(included => included === true)
                  ? "fi-br-check text-[#358E0B]"
                  : "fi-br-cross text-[#FF0808]"
              } flex items-center text-[12px]`}
            ></i>
          </div>
        </div>
      </div>
      <div
        className={`overflow-y-auto h-[${countKeys(data) > 10 ? "35vh" : ""}]`}
      >
        {/* d= {screenData : [], touchPoint }*/}
        {data?.map((d: ResultData, i: number) => (
          <div key={i} className="grid grid-cols-12">
            <div className=" flex justify-between items-center border-l border-b col-span-2 py-2 px-4 truncate">
              <h1 className="text-[14px] truncate">{d?.touchPoint}</h1>
            </div>
            <div className="col-span-10">
              {d?.screenData?.map((d1: ScreenData, j: any) => (
                <div key={j} className={`grid grid-cols-10 flex`}>
                  <div className={`col-span-2 py-2 px-4 border-b border-l `}>
                    <div className="flex justify-between items-center truncate ">
                      <h1 className="text-[14px]">{d1?.screenName}</h1>
                    </div>
                  </div>
                  <div className={`col-span-2 py-2 px-4 border-b border-l`}>
                    <div className="flex justify-around items-center ">
                      <h1 className="text-[14px]">
                        {getUpto2Decimal(
                          d1?.dayWiseData[currentTab]?.morning?.percentage
                        )}
                      </h1>
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
                    </div>
                  </div>
                  <div className={`col-span-2 py-2 px-4 border-b border-l`}>
                    <div className="flex justify-around items-center ">
                      <h1 className="text-[14px]">
                        {getUpto2Decimal(
                          d1?.dayWiseData[currentTab]?.afternoon?.percentage
                        )}
                      </h1>
                      <div
                        className="cursor-pointer"
                        onClick={() => {
                          handleSelectTime(i,"afternoon",d1?.dayWiseData[currentTab]?.afternoon?.included,j);
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
                    </div>
                  </div>
                  <div className={`col-span-2 py-2 px-4 border-b border-l`}>
                    <div className="flex justify-around items-center ">
                      <h1 className="text-[14px]">
                        {getUpto2Decimal(
                          d1?.dayWiseData[currentTab]?.evening?.percentage
                        )}
                      </h1>
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
                    </div>
                  </div>
                  <div className={`col-span-2 py-2 px-4 border-b border-x`}>
                    <div className="flex justify-around items-center ">
                      <h1 className="text-[14px]">
                        {getUpto2Decimal(
                          d1?.dayWiseData[currentTab]?.night?.percentage
                        )}
                      </h1>
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
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className="flex w-full align-center grid grid-cols-12 ">
        <h1 className="w-full text-center bg-[#C9E9FF] border-l rounded-bl py-2 col-span-2">
          Total {data?.length}
        </h1>
        <h1 className="w-full text-center text-[#1297E2] border-l border-b py-2 col-span-2">
          {data?.reduce((accum: number, current: ResultData) => {
            return accum + current?.screenData?.length;
          }, 0)}
        </h1>
        <h1 className="w-full text-center text-[#1297E2] border-l border-b py-2 col-span-2">
          {getUpto2Decimal(totals.morning)}
        </h1>
        <h1 className="w-full text-center text-[#1297E2] border-l border-b py-2 col-span-2">
          {getUpto2Decimal(totals.afternoon)}
        </h1>
        <h1 className="w-full text-center text-[#1297E2] border-l border-b py-2 col-span-2">
          {getUpto2Decimal(totals.evening)}
        </h1>
        <h1 className="w-full text-center text-[#1297E2] border-x border-b rounded-br py-2 col-span-2">
          {getUpto2Decimal(totals.night)}
        </h1>
      </div>
    </div>
  );
};
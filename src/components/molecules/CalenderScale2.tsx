import { getDataFromLocalStorage } from "../../utils/localStorageUtils";
import { signout } from "../../actions/userAction";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CURRENT_STEP } from "../../constants/localStorageConstants";
import { useLocation } from "react-router-dom";
import { message, Tooltip } from "antd";
import { formatDateForLogs, getNumberOfDaysBetweenTwoDates } from "../../utils/dateAndTimeUtils";

interface StepSliderProps {
  currentDay: number;
  currentWeek: number;
  setCurrentDay?: any;
  setCurrentWeek?: any;
  campaignId?: any;
  setPageSuccess?: any;
  allDates?: any;
  setCurrentDate?: any;
  campaignData?: any;
  loading?: any;
}

export const CalenderScaleStepper = ({
  setCurrentDay,
  setCurrentWeek,
  currentDay,
  currentWeek,
  allDates,
  setCurrentDate,
  campaignData,
  loading,
}: StepSliderProps) => {
  const dispatch = useDispatch<any>();
  const { pathname } = useLocation();

  const auth = useSelector((state: any) => state.auth);
  const { userInfo } = auth;

  const groupDatesByWeek = (dates: string[]) => {
    const weeks: { [key: string]: string[] } = {};
  
    dates.forEach((date, index) => {
      const weekIndex = Math.floor(index / 7) + 1; // Group every 7 days into a "week"
      const weekKey = `Week ${weekIndex}`;
  
      if (!weeks[weekKey]) weeks[weekKey] = [];
      weeks[weekKey].push(date);
    });
  
    return Object.entries(weeks); // Returns an array of [weekName, dates]
  };
  
  const weeks = groupDatesByWeek(allDates);


  const handleStepClick = (input: any) => {
    if (!loading) {
      if (input.type == "week") {
        setCurrentWeek(input.step + 1);
        if (currentDay > Object.values(weeks)[input.step][1].length) {
          setCurrentDay(Object.values(weeks)[input.step][1].length);
        } 
        setCurrentDate(Object.values(weeks)[input.step][1][currentDay-1]);
      } else 
      if (input.type == "day") {
        setCurrentDay(input.step + 1);
        setCurrentDate(Object.values(weeks)[currentWeek-1][1][input.step])
      }
    } else {
      message.info("Fetching logs is a tedious task, please let us fetch the earlier request logs first and then continue...")
    }
    
  };

  useEffect(() => {
    if (!userInfo) {
      dispatch(signout());
    }
  }, [dispatch, userInfo]);
  return (
    <div className="w-full">
      <div className="pt-12 mb-20">
        <div className="flex-1 h-1 bg-gray-200 relative mx-4">
          <div className="absolute inset-x-0 flex justify-between">
            <div
              className="absolute h-1 inset-x-0 bg-primaryButton transition-all duration-500"
              style={{ width: `${Number((currentWeek - 1) / (weeks.length - 1)) * 100}%` }}
            />
            {weeks.map(([week, dates], i) => (
              <div
                key={i}
                onClick={() => {
                  if (getNumberOfDaysBetweenTwoDates(new Date(), new Date(Object.values(weeks)[i][1][currentDay-1])) > 0) {
                    message.info("Still to come...");
                  } else {
                    handleStepClick({type: "week", step: i});
                  }
                }}
                className="relative flex flex-col items-center"
              >
                <div
                  className={`relative w-4 h-4 rounded-full -mt-1.5 flex flex-col items-center
                    ${
                      i <= currentWeek - 1
                        ? "bg-primaryButton"
                        : "border border-primaryButton bg-gray-200"
                    }
                  `}
                >
                  <Tooltip title={week}>
                    <div className="relative mt-[-32px] w-full">
                      <div
                        className={`flex w-full gap-2 font-custom text-[12px] ${
                          i <= currentWeek - 1
                            ? "text-primaryButton"
                            : "text-[#D6D2D2]"
                        }`}
                      >
                        {week.split(" ")[1]}
                      </div>
                    </div>
                  </Tooltip>
                </div>
                {/* Adjust label positioning: left-aligned for first step, centered otherwise, right-aligned for last step */}
                {i === currentWeek - 1 && (
                  <div
                    className={`font-custom  absolute top-full mt-2 text-primaryButton text-[12px] font-medium whitespace-nowrap
                      ${
                        i === 0
                          ? "left-0"
                          : i + 1 === weeks.length
                          ? "right-0"
                          : "left-1/2 transform -translate-x-1/2"
                      }
                    `}
                  >
                    {week}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="pt-2 mb-6">
        <div className="flex-1 h-1 bg-gray-200 relative mx-4">
          <div className="absolute inset-x-0 flex justify-between">
            <div
              className="absolute h-1 inset-x-0 bg-primaryButton transition-all duration-500"
              style={{ width: `${(Number(currentDay - 1) / (Object.values(weeks)[currentWeek-1][1].length - 1)) * 100}%` }}
            />
            {Object.values(weeks)[currentWeek-1][1].map((_, i) => (
              <div
                key={i}
                onClick={() => {
                  if (getNumberOfDaysBetweenTwoDates(new Date(), new Date(Object.values(weeks)[currentWeek-1][1][i])) > 0) {
                    message.info("Still to come...");
                  } else {
                    handleStepClick({type: "day", step: i});
                  }
                }}

                className="relative flex flex-col items-center"
              >
                <div
                  className={`relative w-4 h-4 rounded-full -mt-1.5 flex flex-col items-center
                    ${
                      i <= currentDay - 1
                        ? "bg-primaryButton"
                        : "border border-primaryButton bg-gray-200"
                    }
                  `}
                >
                  <Tooltip title={Object.values(weeks)[currentWeek-1][1][i]}>
                    <div className="relative mt-[-32px] w-full">
                      <div
                        className={`font-custom flex w-full gap-2 -ml-[8px] text-[12px] ${
                          i <= currentDay - 1
                            ? "text-primaryButton"
                            : "text-[#D6D2D2]"
                        }`}
                      >
                        {Object.values(weeks)[currentWeek-1][1][i].split("-").splice(1, 2).join(("/"))}
                      </div>
                    </div>
                  </Tooltip>
                </div>
                <div
                  className={`absolute top-full mt-2 flex items-center w-full
                      ${
                        i === 0 && i === currentDay - 1
                          ? "left-8"
                        : i === 0 ? "left-0"
                          : i + 1 === Object.values(weeks)[currentWeek-1][1].length && i === currentDay - 1
                          ? "right-12"
                          : "left-1/2 transform -translate-x-1/2"
                      }
                  `}
                >
                  <div className={`relative -left-8`}>
                    {i === currentDay - 1 && (
                      <h1 className="font-custom text-[12px] text-primaryButton font-medium whitespace-nowrap">
                        {Object.values(weeks)[currentWeek-1][1][currentDay - 1]}
                      </h1>
                    )}
                  </div>
                  <div className={`relative
                    ${i === currentDay - 1 ? "-left-6" : ""}
                    `}>
                    {campaignData?.slotsPlayedPerDay
                          ?.filter((data: any) => formatDateForLogs(new Date(data.date)).apiDate === formatDateForLogs(new Date(Object.values(weeks)[currentWeek-1][1][i])).apiDate).length > 0 && (
                      <h1 className={`font-custom text-[12px] 
                        ${
                          (campaignData?.slotsPlayedPerDay
                          ?.filter((data: any) => formatDateForLogs(new Date(data.date)).apiDate === formatDateForLogs(new Date(Object.values(weeks)[currentWeek-1][1][i])).apiDate)[0]?.countPromised / 
                          campaignData?.slotsPlayedPerDay
                            ?.filter((data: any) => formatDateForLogs(new Date(data.date)).apiDate === formatDateForLogs(new Date(Object.values(weeks)[currentWeek-1][1][i])).apiDate)[0]?.count) < 1 ?
                            "text-[#EF4444]" : "text-[#22C55E]"
                          }
                        `}>
                        {Number((campaignData?.slotsPlayedPerDay
                            ?.filter((data: any) => formatDateForLogs(new Date(data.date)).apiDate === formatDateForLogs(new Date(Object.values(weeks)[currentWeek-1][1][i])).apiDate)[0]?.countPromised / 
                            campaignData?.slotsPlayedPerDay
                              ?.filter((data: any) => formatDateForLogs(new Date(data.date)).apiDate === formatDateForLogs(new Date(Object.values(weeks)[currentWeek-1][1][i])).apiDate)[0]?.count) * 100).toFixed(0)
                            }%
                      </h1>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

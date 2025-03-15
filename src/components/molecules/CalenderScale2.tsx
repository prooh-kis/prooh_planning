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
}

export const CalenderScaleStepper = ({
  setCurrentDay,
  setCurrentWeek,
  currentDay,
  currentWeek,
  allDates,
  setCurrentDate,
  campaignData,
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
    if (input.type == "week") {
      setCurrentWeek(input.step + 1);
      setCurrentDate(Object.values(weeks)[input.step][1][currentDay-1]);
    }
    if (input.type == "day") {
      setCurrentDay(input.step + 1);
      setCurrentDate(Object.values(weeks)[currentWeek-1][1][input.step])
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
              style={{ width: `${(Number(currentWeek - 1) / (weeks.length - 1)) * 100}%` }}
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
                        className={`flex w-full gap-2 ${
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
                    className={`absolute top-full mt-2 text-primaryButton text-[14px] font-medium whitespace-nowrap
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
            {Object.values(weeks)[currentWeek-1][1].map((_, j) => (
              <div
                key={j}
                onClick={() => {
                  if (getNumberOfDaysBetweenTwoDates(new Date(), new Date(Object.values(weeks)[currentWeek-1][1][j])) > 0) {
                    message.info("Still to come...");
                  } else {
                    handleStepClick({type: "day", step: j});
                  }
                }}

                className="relative flex flex-col items-center"
              >
                <div
                  className={`relative w-4 h-4 rounded-full -mt-1.5 flex flex-col items-center
                    ${
                      j <= currentDay - 1
                        ? "bg-primaryButton"
                        : "border border-primaryButton bg-gray-200"
                    }
                  `}
                >
                  <Tooltip title={Object.values(weeks)[currentWeek-1][1][j]}>
                    <div className="relative mt-[-32px] w-full">
                      <div
                        className={`flex w-full gap-2 -ml-[8px] ${
                          j <= currentDay - 1
                            ? "text-primaryButton"
                            : "text-[#D6D2D2]"
                        }`}
                      >
                        {Object.values(weeks)[currentWeek-1][1][j].split("-").splice(1, 2).join(("/"))}
                      </div>
                    </div>
                  </Tooltip>
                </div>
                <div
                className={`absolute top-full mt-2 flex items-center w-full
                 
                `}
                >
                  {j === currentDay - 1 && (
                    <div
                      className={`
                        ${
                          j === currentDay - 1
                            ? ""
                            : ""
                        }
                         ${
                            j === 0
                              ? "left-0"
                              : j + 1 === Object.values(weeks)[currentWeek-1][1].length
                              ? "right-0"
                              : "left-1/2 transform -translate-x-1/2"
                          }
                      `}
                    >
                      <h1 className="text-primaryButton text-[14px] font-medium whitespace-nowrap">
                        {Object.values(weeks)[currentWeek-1][1][currentDay - 1]}
                      </h1>
                      
                    </div>
                  )}
                  {campaignData?.slotsPlayedPerDay
                          ?.filter((data: any) => formatDateForLogs(new Date(data.date)).apiDate === formatDateForLogs(new Date(Object.values(weeks)[currentWeek-1][1][j])).apiDate).length > 0 && (
                    <h1 className={`text-[12px] 
                      ${(campaignData?.slotsPlayedPerDay
                        ?.filter((data: any) => formatDateForLogs(new Date(data.date)).apiDate === formatDateForLogs(new Date(Object.values(weeks)[currentWeek-1][1][j])).apiDate)[0]?.countPromised / 
                        campaignData?.slotsPlayedPerDay
                          ?.filter((data: any) => formatDateForLogs(new Date(data.date)).apiDate === formatDateForLogs(new Date(Object.values(weeks)[currentWeek-1][1][j])).apiDate)[0]?.count) < 1 ?
                           "text-[#EF4444]" : "text-[#22C55E]"}
                      ${
                          j === 0
                            ? "left-0"
                            : j + 1 === Object.values(weeks)[currentWeek-1][1].length
                            ? "right-0"
                            : ""
                        }
                      `}>
                      {Number((campaignData?.slotsPlayedPerDay
                          ?.filter((data: any) => formatDateForLogs(new Date(data.date)).apiDate === formatDateForLogs(new Date(Object.values(weeks)[currentWeek-1][1][j])).apiDate)[0]?.countPromised / 
                          campaignData?.slotsPlayedPerDay
                            ?.filter((data: any) => formatDateForLogs(new Date(data.date)).apiDate === formatDateForLogs(new Date(Object.values(weeks)[currentWeek-1][1][j])).apiDate)[0]?.count) * 100).toFixed(0)
                          }%
                    </h1>
                  )}

                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

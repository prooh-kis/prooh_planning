import { signout } from "../../actions/userAction";
import React, { useEffect, useMemo, useCallback, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { message, Tooltip } from "antd";
import {
  formatDateForLogs,
  getNumberOfDaysBetweenTwoDates,
} from "../../utils/dateAndTimeUtils";
import moment from "moment";

interface StepSliderProps {
  currentDay: number;
  currentWeek: number;
  setCurrentDay?: (day: number) => void;
  setCurrentWeek?: (week: number) => void;
  campaignId?: any;
  setPageSuccess?: any;
  allDates?: Array<{value: string, label: string}>;
  setCurrentDate?: (date: string) => void;
  currentDate?: string;
  calendarData?: any;
  loading?: boolean;
  openSiteMapView?: any;
}

export const CalenderScaleStepper = ({
  setCurrentDay,
  setCurrentWeek,
  currentDay,
  currentWeek,
  allDates = [],
  setCurrentDate,
  currentDate,
  calendarData,
  loading,
  openSiteMapView,
}: StepSliderProps) => {

  const componentRef = useRef<HTMLDivElement>(null);
  const dispatch = useDispatch<any>();
  const { pathname } = useLocation();
  const auth = useSelector((state: any) => state.auth);
  const { userInfo } = auth;
  const [showTooltip, setShowTooltip] = useState<any>(true);

  const groupDatesByWeek = useCallback((dates: Array<{value: string, label: string}>) => {
    const weeks: { [key: string]: Array<{value: string, label: string}> } = {};

    dates.forEach((date, index) => {
      const weekIndex = Math.floor(index / 7) + 1;
      const weekKey = `Week ${weekIndex}`;

      if (!weeks[weekKey]) weeks[weekKey] = [];
      weeks[weekKey].push(date);
    });
    Object.keys(weeks)?.forEach((weekKey: any) => {

      if (weekKey !== "End") {
        const dateToAdd = new Date(weeks[weekKey][weeks[weekKey].length-1]?.value);
        dateToAdd.setDate(dateToAdd.getDate() + 1);
        const resultDate = dateToAdd.toISOString().split('T')[0];

        weeks[weekKey].push(({
          value: resultDate, label: "End"
        }))
      }
    })
    weeks["End"] = [];
    return Object.entries(weeks);
  }, []);

  const weeks = useMemo(() => groupDatesByWeek(allDates), [allDates, groupDatesByWeek]);

  const getWeekPercentageValue = useCallback((data: any) => {
    const formatToMDY = (dateStr: any) => {
      const date = new Date(dateStr);
      return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
    };

    const matchingDates = new Set(data?.[1]?.map((d: any) => formatToMDY(d.value)));
    return calendarData?.reduce(
      (totals: any, entry: any) => {
        if (matchingDates.has(entry.date)) {
          totals.totalCount += entry.count;
          totals.totalCountPromised += entry.countPromised;
        }
        return totals;
      },
      { totalCount: 0, totalCountPromised: 0 }
    );
  }, [calendarData]);

  const handleStepClick = useCallback((input: any) => {
    if (loading) {
      message.info(
        "Fetching logs is a tedious task, please let us fetch the earlier request logs first and then continue..."
      );
      return;
    }

    if (input.type === "week") {
      setCurrentWeek?.(input.step + 1);
      if (currentDay > weeks[input.step][1].length) {
        setCurrentDay?.(weeks[input.step][1].length);
      }
      setCurrentDate?.(weeks[input.step][1][currentDay - 1].value);
    } else if (input.type === "day") {
      setCurrentDay?.(input.step + 1);
      setCurrentDate?.(weeks[currentWeek - 1][1][input.step].value);
    }
  }, [loading, currentDay, currentWeek, weeks, setCurrentDay, setCurrentWeek, setCurrentDate]);

  // const getValueDateWise = useCallback((label: string, i: number) => {
  //   const result = calendarData?.find(
  //     (data: any) =>
  //       formatDateForLogs(new Date(data.date)).apiDate ===
  //       formatDateForLogs(new Date(weeks[currentWeek - 1][1][i].value))
  //         .apiDate
  //   )?.[label];
  //   return Number(result);
  // }, [calendarData, currentWeek, weeks]);

  const getPercentageValue = useCallback((delivered: number, promised: number) => {
    const percentage = (delivered / promised) * 100 || 0;
    return `${percentage.toFixed(0)}%`;
  }, []);

  const getCurrentTime = useCallback(() => {
    const weekDates = weeks?.[currentWeek - 1]?.[1] || [];
    const numberOfGaps = weekDates.length - 1;
    let timeMarkerPosition = 0;

    for (let i = 0; i < numberOfGaps; i++) {
      const start = new Date(weekDates[i].value);
      const end = new Date(weekDates[i + 1].value);
      const now = new Date();
      if (now >= start && now <= end) {
        const hoursSinceStart = (now.getTime() - start.getTime()) / (1000 * 60 * 60);
        const percentageOfGap = (hoursSinceStart / 24) * (100 / numberOfGaps);
        timeMarkerPosition = (i * (100 / numberOfGaps)) + percentageOfGap;
        break;
      }
    }
    return timeMarkerPosition;
  }, [currentWeek, weeks]);

  const getCurrentDay = useCallback(() => {
    const today = moment();
    let todayMarkerLeft = 0;

    if (weeks.length > 1) {
      const totalWeeks = weeks.length - 1;

      weeks.forEach(([_, dates], weekIndex) => {
        const match = dates.find((d) =>
          moment(d.value).isSame(today, "day")
        );
        if (match) {
          const dayIndex = dates.indexOf(match);
          const percentPerWeek = 100 / totalWeeks;
          const percentPerDay = percentPerWeek / 7;
          todayMarkerLeft = weekIndex * percentPerWeek + dayIndex * percentPerDay;
        }
      });
    }
    return todayMarkerLeft;
  }, [weeks]);

  useEffect(() => {
    if (!userInfo) {
      dispatch(signout());
    }
  }, [dispatch, userInfo]);


  useEffect(() => {
    const checkVisibility = () => {
      if (componentRef.current) {
        const rect = componentRef.current.getBoundingClientRect();
        const viewportHeight = window.innerHeight || document.documentElement.clientHeight;
        
        // Check if the component is in the middle of the viewport
        const componentMiddle = rect.top + rect.height / 2;
        const viewportMiddle = viewportHeight / 2;
        const isInMiddle = Math.abs(componentMiddle - viewportMiddle) < viewportHeight * 0.25;
        setShowTooltip(isInMiddle);
      }
      if (openSiteMapView) {
        setShowTooltip(false)
      }
    };

    // Initial check
    checkVisibility();

    // Add scroll event listener
    window.addEventListener('scroll', checkVisibility);
    // Cleanup
    return () => {
      window.removeEventListener('scroll', checkVisibility);
    };
  }, [openSiteMapView]);
  

  useEffect(() => {
    if (currentDate && allDates.length > 0) {
      // Find the index of the currentDate in allDates
      const dateIndex = allDates.findIndex(date => 
        new Date(date.value).toDateString() === new Date(currentDate).toDateString()
      );
      
      if (dateIndex >= 0) {
        // Calculate the week number (1-based)
        const weekNumber = Math.floor(dateIndex / 7) + 1;
        // Calculate the day number within the week (1-based)
        const dayNumber = (dateIndex % 7) + 1;
        
        setCurrentWeek?.(weekNumber);
        setCurrentDay?.(dayNumber);
      }
    }
  }, [currentDate, allDates, setCurrentWeek, setCurrentDay]);


  // Replace the currentWeekPercentage and currentWeekPercentageColor useMemos with:

  const allWeekPercentages = useMemo(() => {
    return weeks.map((week) => {
      const weekData = getWeekPercentageValue(week);
      if (!weekData) return { percentage: 0, color: "#2A892D" };
      
      const percentage = (weekData.totalCount * 100 / weekData.totalCountPromised).toFixed(0);
      const color = weekData.totalCount / weekData.totalCountPromised > 1 ? "#2A892D" : "#FF4747";
      
      return {
        percentage,
        color
      };
    });
  }, [weeks, getWeekPercentageValue]);
  // Then you can access the current week's data like this:
  const currentWeekPercentage = allWeekPercentages[currentWeek - 1]?.percentage || 0;
  const currentWeekPercentageColor = allWeekPercentages[currentWeek - 1]?.color || "#FF4747";
  return (
    <div className="w-full cursor-pointer" ref={componentRef}>
      <div className="pt-12 mb-20 flex justify-center">
        <div className={`flex-${weeks.length === 1 ? 0 : 1} h-1 bg-[#D1E5F7] relative mx-1`}>
          <div className="absolute inset-x-0 flex justify-between">
            <div
              className="absolute h-1 inset-x-0 bg-[#DC6700] rounded transition-all duration-500"
              style={{
                width: `${weeks?.length === 1 ? 0 :
                  Number((currentWeek - 1) / (weeks.length - 1)) * 100
                }%`,
              }}
            />
            {getCurrentDay() > 0 && (
              <div
                className="absolute z-1 absolute h-1 inset-x-0 bg-[#FFD700] rounded transition-all duration-500"
                style={{
                  width: `${getCurrentDay() - (Number((currentWeek - 1) / (weeks.length - 1)) * 100)}%`,
                  left: `${weeks?.length === 1 ? 0 :
                  Number((currentWeek - 1) / (weeks.length - 1)) * 100
                }%`
                  // opacity: 0.3
                }}
              >
                <Tooltip id="1" placement="bottom" title={
                  <div className="flex items-center gap-2">
                    <i className="fi fi-rr-calendar-lines text-[12px] flex items-center"></i>
                    <h1 className="text-[12px]">{`${new Date().toDateString()}`}</h1>
                  </div>
                  } open={showTooltip}>
                  <div
                    className="absolute h-1 w-[2px] bg-[#FFD700] rounded-full"
                    style={{
                      left: `100%`
                    }}
                  />
                </Tooltip>
              </div>
            )}
            {weeks.map(([week, dates], i) => {
              const isCurrentWeek = i === currentWeek - 1;
              const isPastWeek = i < currentWeek - 1;
              const weekColor = isPastWeek || isCurrentWeek ? "text-[#00000090] font-semibold" : "text-[#D6D2D2]";
              const bgColor = isPastWeek || isCurrentWeek ? "bg-[#DC6700]" : "border bg-[#D1E5F7]";

              // Get the percentage data for this week
              const weekPercentageData = allWeekPercentages[i];
  
              let labelPosition = "";
              if (i === 0 && weeks.length !== 1) {
                labelPosition = "left-0";
              } else if (i === 0 && weeks.length === 1) {
                labelPosition = "-left-1/2";
              } else if (i + 1 === weeks.length) {
                labelPosition = "right-0";
              } else {
                labelPosition = "left-1/2 transform ";
              }

              return (
                <div
                  key={i}
                  onClick={() => {
                    if (
                      !weeks[i][1][currentDay - 1] || 
                      getNumberOfDaysBetweenTwoDates(
                        new Date(),
                        new Date(weeks[i][1][currentDay - 1]?.value)
                      ) > 0
                    ) {
                      message.info("Still to come...");
                    } else {
                      handleStepClick({ type: "week", step: i });
                    }
                  }}
                  className="relative flex flex-col items-center"
                >
                  <div className={`relative w-3 h-3 rounded-full -mt-1 flex flex-col items-center ${bgColor}`}>
                    {/* Circular marker */}
                    <div className={`absolute inset-0 rounded-full ${bgColor}`} />
                    
                    <Tooltip id="2" title={week}>
                      <div className={`relative mt-[-24px] w-full flex items-center ${i == 0 ? "" : i+1 == weeks?.length ? "justify-end" : "justify-center"} w-full gap-1`}>
                        <h1 className={`text-[12px] whitespace-nowrap ${labelPosition} ${weekColor}`}>
                          {week}
                        </h1>
                        {(isPastWeek || isCurrentWeek) && weekPercentageData && (
                          <h1 className={`text-[12px] font-medium whitespace-nowrap text-[${currentWeekPercentageColor}]`}>
                            ({weekPercentageData.percentage}%)
                          </h1>
                        )}
                      </div>
                    </Tooltip>
                    {isCurrentWeek && (
                      <div className="absolute w-3 h-3 rounded-full flex flex-col items-center bg-[#DC6700] animate-ping" />
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <div className="pt-4 mb-12">
        <div className="flex-1 h-1 bg-[#D1E5F7] relative mx-1">
          <div className="absolute inset-x-0 flex justify-between">
            <div
              className="absolute h-1 inset-x-0 bg-[#DC6700] rounded transition-all duration-500"
              style={{
                width: `${(Number(currentDay - 1) / (weeks?.[currentWeek - 1]?.[1]?.length - 1)) * 100}%`,
              }}
            />
            {getCurrentTime() > 0 && (
              <div
                className="absolute h-1 inset-x-0 bg-[#FFD700] rounded transition-all duration-500"
                style={{
                  width: `${getCurrentTime() - (Number(currentDay - 1) / (weeks?.[currentWeek - 1]?.[1]?.length - 1)) * 100}%`,
                  left: `${(Number(currentDay - 1) / (weeks?.[currentWeek - 1]?.[1]?.length - 1)) * 100}%`
                }}
              >
                <Tooltip id="3" placement="bottom"
                  title={
                    <div className="flex items-center gap-2">
                      <i className="fi fi-br-clock text-[12px] flex items-center"></i>
                      <h1 className="text-[12px]">{moment().format("hh:mm A")}</h1>
                    </div>
                  } 
                  open={showTooltip}
                >
                  <div
                    className="absolute h-1 w-[2px] bg-[#FFD700] z-1 rounded-full"
                    style={{
                      left: `100%`
                    }}
                  />
              </Tooltip>
              </div>
            )}
           
            {weeks?.[currentWeek - 1]?.[1]?.map((dateObj, i) => {

              const isCurrentDay = i === currentDay - 1;
              const isPastDay = i < currentDay - 1;
              const dayColor = isPastDay || isCurrentDay ? "text-[#00000090] font-semibold" : "text-[#D6D2D2]";
              const bgColor = isPastDay || isCurrentDay ? "bg-[#DC6700]" : "border bg-[#D1E5F7]";

              const dayData = calendarData?.find((s: any) => 
                new Date(s.date).toDateString() === new Date(dateObj.value).toDateString()
              );
              const percentageValue = dayData ? getPercentageValue(dayData.count, dayData.countPromised) : "";
              const percentageColor = dayData?.count / dayData?.countPromised > 1 ? "#2A892D" : "#FF4747";

              return (
                <div
                  key={i}
                  onClick={() => {
                    if (getNumberOfDaysBetweenTwoDates(new Date(), new Date(dateObj.value)) > 0) {
                      message.info("Still to come...");
                    } else {
                      handleStepClick({ type: "day", step: i });
                    }
                  }}
                  className="relative flex flex-col items-center justify-center"
                >
                  <div className={`relative w-3 h-3 rounded-full -mt-1 flex flex-col items-center ${bgColor}`}>
                    {/* Circular marker */}
                    <div className={`absolute inset-0 rounded-full ${bgColor}`} />
                    
                    {isCurrentDay && (
                      <div className="absolute w-3 h-3 rounded-full flex flex-col items-center bg-[#DC6700] animate-ping" />
                    )}
                    <Tooltip id="4" title={dateObj.value} >
                      <div className="relative mt-[-24px] w-full cursor-pointer flex items-center justify-center">
                        <div className={`flex ${i == 0 ? "" : i+1 == weeks?.[currentWeek - 1]?.[1]?.length ? "justify-end" : "justify-center"} items-center w-full gap-1 -ml-[8px]`}>
                          <h1 className={`text-[12px] text-nowrap ${dayColor}`}>
                            {dateObj.label}
                          </h1>
                          {calendarData && new Date(dateObj.value).getTime() < new Date().getTime() && dayData && (
                            <h1 className={`text-[10px] font-medium whitespace-nowrap text-[${percentageColor}]`}>
                              ({percentageValue || 0 })
                            </h1>
                          )}
                        </div>
                   
                      </div>
                    </Tooltip>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
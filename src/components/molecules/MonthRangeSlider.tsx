import { signout } from "../../actions/userAction";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

interface StepSliderProps {
  months: number;
  month: number;
  setMonth?: any;
  setMonthName: any;
}

export const MonthRangeSlider = ({
  setMonth,
  months,
  month,
  setMonthName,
}: StepSliderProps) => {
  const dispatch = useDispatch<any>();
  const auth = useSelector((state: any) => state.auth);
  const { userInfo } = auth;

  // Function to handle step marker click
  const handleStepClick = (step: number, month: string) => {
    setMonth(step);
    setMonthName(month);
  };

  // Example labels for each step
  const stepLabels = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  useEffect(() => {
    if (!userInfo) {
      dispatch(signout());
    }
  }, [dispatch, userInfo]);

  return (
    <div className="relative w-full flex items-center mt-4">
      {/* Line behind the circles */}
      <div
        className="absolute top-1/2 h-[2px]"
        style={{
          // left: month === 1 ? `calc(50% / ${months})` : month === 9 ? `calc(50% / ${months})` : `calc(40% / ${months})`, // Starts the line at the center of the first step
          // right: month === 1 ? `calc(50% / ${months})` : month === 9 ? `calc(50% / ${months})` : `calc(40% / ${months})`, // Ends the line at the center of the last step
          left: `calc(40% / ${months})`,
          right: `calc(40% / ${months})`,
          transform: "translateY(-50%)",
        }}
      ></div>

      <div className="flex justify-between items-center mt-[-33px] relative z-10 w-full border-b">
        {stepLabels?.map((value, i) => (
          <div
            key={i}
            className="relative flex flex-col w-full"
            onClick={() => handleStepClick(i, value)}
          >
            {/* Icon or Text for each step */}
            <div className="mb-2">
              <span
                className={
                  // month === 1 ?
                  //   `text-blue-500 text-[14px] pr-0 pl-0 truncate` :
                  // month === 9 ?
                  //   `text-blue-500 text-[14px] text-right pr-0 pl-0 truncate` :
                  `text-[#737373] text-[14px] truncate`
                }
              >
                {value}
              </span>
            </div>

            {/* The clickable circle for each step */}
            <div
              className={`cursor-pointer transition-all duration-500 ${
                i === month
                  ? "h-1 w-full rounded-full border-1 border-y bg-[#129BFF]" // Larger circle with steps, same size as future
                  : "h-1 border border-white w-full" // White for future steps
              }`}
            ></div>
          </div>
        ))}
      </div>
    </div>
  );
};

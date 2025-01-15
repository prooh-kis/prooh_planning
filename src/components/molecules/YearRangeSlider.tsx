import { signout } from "../../actions/userAction";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

interface StepSliderProps {
  years: number;
  year: number;
  setYear?: any;
}

export const YearRangeSlider = ({ setYear, years, year }: StepSliderProps) => {
  const dispatch = useDispatch<any>();
  const auth = useSelector((state: any) => state.auth);
  const { userInfo } = auth;

  // Example labels for each step
  const stepLabels = [2023, 2024, 2025, 2026, 2027];

  // Function to handle step marker click
  const handleStepClick = (step: number) => {
    setYear(stepLabels[step]);
  };

  useEffect(() => {
    if (!userInfo) {
      dispatch(signout());
    }
  }, [dispatch, userInfo]);

  return (
    <div className="w-full pt-6 pr-[-20px]">
      {/* Step Line */}
      <div className="relative w-full flex items-center">
        {/* Line behind the circles */}
        <div
          className="absolute top-1/2 bg-[#129BFF] h-[2px]"
          style={{
            // left: month === 1 ? `calc(50% / ${months})` : month === 9 ? `calc(50% / ${months})` : `calc(40% / ${months})`, // Starts the line at the center of the first step
            // right: month === 1 ? `calc(50% / ${months})` : month === 9 ? `calc(50% / ${months})` : `calc(40% / ${months})`, // Ends the line at the center of the last step
            left: `calc(40% / ${years})`,
            right: `calc(40% / ${years})`,
            transform: "translateY(-50%)",
          }}
        ></div>

        <div className="flex justify-between items-center mt-[-33px] relative z-10 w-full">
          {stepLabels?.map((value: any, i) => (
            <div
              key={i}
              className="relative flex flex-col items-center w-full"
              onClick={() => {
                if (value <= new Date().getFullYear()) {
                  handleStepClick(i);
                }
              }}
            >
              {/* Icon or Text for each step */}
              <div className="mb-2">
                <span
                  className={
                    // month === 1 ?
                    //   `text-[#129BFF] text-[14px] pr-0 pl-0 truncate` :
                    // month === 9 ?
                    //   `text-[#129BFF] text-[14px] text-right pr-0 pl-0 truncate` :
                    `text-[#129BFF] text-[14px] pr-0 pl-0 truncate`
                  }
                >
                  {value}
                </span>
              </div>

              {/* The clickable circle for each step */}
              <div
                className={`cursor-pointer transition-all duration-500 ${
                  value < year
                    ? "h-2 w-2 rounded-full border border-[#129BFF] bg-[#129BFF]"
                    : value === year
                    ? "h-3 w-3 rounded-full border-1 border bg-[#129BFF] border-white" // Larger circle with steps, same size as future
                    : "h-2 w-2 rounded-full border border-[#129BFF] bg-[#FFFFFF]" // White for future steps
                }`}
              ></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

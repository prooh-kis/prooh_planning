import { signout } from "../../actions/userAction";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

interface StepSliderProps {
  months: number;
  month: number;
  setMonth?: any;
}

export const MonthRangeSlider = ({ setMonth, months, month }: StepSliderProps) => {

  const dispatch = useDispatch<any>();
  const auth = useSelector((state: any) => state.auth);
  const { userInfo } = auth;

  // Function to handle step marker click
  const handleStepClick = (step: number) => {
    setMonth(step);
  };

  // Example Flaticon SVG URLs (replace these with actual SVG URLs or import local SVGs)
  const icons = [
    <i key={1} className="fi fi-sr-megaphone text-[14px]"></i>, // Example icon for step 1
    <i key={1} className="fi fi-rr-location-crosshairs text-[14px]"></i>, // Example icon for step 2
    <i key={1} className="fi fi-br-settings-sliders text-[14px]"></i>, // Example icon for step 3
    <i key={1} className="fi fi-sr-users-alt text-[14px]"></i>, // Example icon for step 4
    <i key={1} className="fi fi-sr-document-signed text-[14px]"></i>, // Example icon for step 5
    <i key={1} className="fi fi-sr-tap text-[14px]"></i>, // Example icon for step 6
    <i key={1} className="fi fi-ss-sack text-[14px]"></i>, // Example icon for step 7
    <i key={1} className="fi fi-sr-cloud-upload-alt text-[14px]"></i>, // Example icon for step 8
    <i key={1} className="fi fi-sr-dashboard-monitor text-[14px]"></i>, // Example icon for step 9
  ];

  // Example labels for each step
  const stepLabels = [
    "Januray", "February", "March", "April", "May", 
    "June", "July", "August", "September", "October", "November", "December"
  ];

  useEffect(() => {
    if (!userInfo) {
      dispatch(signout())
    }
  },[dispatch, userInfo])

  return (
    <div className="w-[100vw] py-0 mx-[-40px] px-20">
      {/* Step Line */}
      <div className="relative w-full flex items-center">
        {/* Line behind the circles */}
        <div
          className="absolute top-1/2 bg-blue-500 h-[2px]"
          style={{
            // left: month === 1 ? `calc(50% / ${months})` : month === 9 ? `calc(50% / ${months})` : `calc(40% / ${months})`, // Starts the line at the center of the first step
            // right: month === 1 ? `calc(50% / ${months})` : month === 9 ? `calc(50% / ${months})` : `calc(40% / ${months})`, // Ends the line at the center of the last step
            left: `calc(40% / ${months})`,
            right: `calc(40% / ${months})`,
            transform: "translateY(-50%)",
          }}
        ></div>

        <div className="flex justify-between items-center mt-[-33px] relative z-10 w-full">
          {Array.from({ length: months }, (_, i) => (
            <div
              key={i}
              className="relative flex flex-col items-center w-full"
              onClick={() => handleStepClick(i + 1)}
            >
              {/* Icon or Text for each step */}
              <div className="mb-2">
                  <span className={
                    // month === 1 ?
                    //   `text-blue-500 text-[14px] pr-0 pl-0 truncate` :
                    // month === 9 ?
                    //   `text-blue-500 text-[14px] text-right pr-0 pl-0 truncate` :
                      `text-blue-500 text-[14px] pr-0 pl-0 truncate`
                  }>
                    {stepLabels[i]} {/* Show the label text for the current step */}
                  </span>
           
              </div>

              {/* The clickable circle for each step */}
              <div
                className={`cursor-pointer transition-all duration-500 ${
                  i + 1 === month
                    ? "h-2 w-full rounded-full border-1 border-y bg-blue-500" // Larger circle with steps, same size as future
                    : "h-1 border border-white w-full bg-blue-500" // White for future steps
                }`}
              ></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

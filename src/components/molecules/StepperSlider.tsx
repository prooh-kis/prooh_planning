import React, { useState } from "react";

interface StepSliderProps {
  steps: number;
  step: number;
  setStep?: any;
}

export const StepperSlider: React.FC<StepSliderProps> = ({ setStep, steps, step }) => {

  // Function to handle step marker click
  const handleStepClick = (step: number) => {
    setStep(step);
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
    "Basic Details", "Audience Selection", "Advanced Filters", "Cohort Selection", "Screens Summary", 
    "Trigger Selection", "Vendor Approval", "Creative Upload", "Dashboard"
  ];

  return (
    <div className="w-[100vw] py-0 mx-[-40px]">
      {/* Step Line */}
      <div className="relative w-full flex items-center">
        {/* Line behind the circles */}
        <div
          className="absolute top-1/2 bg-blue-500 h-[2px]"
          style={{
            left: step === 1 ? `calc(50% / ${steps})` : step === 9 ? `calc(50% / ${steps})` : `calc(40% / ${steps})`, // Starts the line at the center of the first step
            right: step === 1 ? `calc(50% / ${steps})` : step === 9 ? `calc(50% / ${steps})` : `calc(40% / ${steps})`, // Ends the line at the center of the last step
            transform: "translateY(-50%)",
          }}
        ></div>

        <div className="flex justify-between items-center mt-[-33px] relative z-10 w-full">
          {Array.from({ length: steps }, (_, i) => (
            <div
              key={i}
              className="relative flex flex-col items-center w-full"
              onClick={() => handleStepClick(i + 1)}
            >
              {/* Icon or Text for each step */}
              <div className="mb-2">
                {i + 1 === step ? (
                  <span className={
                    step === 1 ?
                      `text-blue-500 text-[14px] pr-0 pl-0 truncate` :
                    step === 9 ?
                      `text-blue-500 text-[14px] text-right pr-0 pl-0 truncate` :
                      `text-blue-500 text-[14px] pr-40 pl-40 truncate`
                  }>
                    {stepLabels[i]} {/* Show the label text for the current step */}
                  </span>
                ) : (
                  <i
                    className={`fi ${
                      i + 1 <= step
                        ? "text-blue-500" // Blue for selected steps
                        : "text-gray-300" // Gray for unselected steps
                    }`}
                  >
                    {icons[i]}
                  </i>
                )}
              </div>

              {/* The clickable circle for each step */}
              <div
                className={`cursor-pointer rounded-full transition-all duration-500 ${
                  i + 1 === step
                    ? "h-4 w-4 bg-white border-2 border-blue-500" // Larger circle with ring for active step
                    : i + 1 < step
                    ? "h-3 w-3 bg-blue-500 border border-blue-500" // Blue for previous steps, same size as future
                    : "h-3 w-3 bg-white border border-blue-500" // White for future steps
                }`}
              ></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

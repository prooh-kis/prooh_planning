import React, { useState } from "react";

interface StepSliderProps {
  steps: number;
  step: number;
  setStep?: any;
}

export const VerticalStepperSlider: React.FC<StepSliderProps> = ({ setStep, steps, step }) => {
  const [currentStep, setCurrentStep] = useState<number>(step);

  // Function to handle step marker click
  const handleStepClick = (step: number) => {
    setCurrentStep(step);
    setStep(step);
  };

  // Example labels for each step
  const stepLabels = [
    "Conditional To Weather Situations",
    "Conditional To Sporting Events",
    "Empty Slots",
    "Special Day",
  ];

  return (
    <div className="h-full py-0 px-5 flex flex-col w-full">
      {/* Step Line */}
      <div className="relative flex flex-col " style={{ height: "100%" }}>
        {/* Line behind the circles */}
        <div
          className="absolute bg-gray-100 w-[2px]"
          style={{
            height: `calc(100% - 32px)`, // Dynamically set the height based on stepper circle size
            top: "16px", // Starts at the center of the first step circle (half of its height)
            left: '1.5%', // Position the line relative to the circles
            transform: 'translateX(-50%)',
          }}
        ></div>

        <div className="flex flex-col justify-between items-center relative z-10 h-full gap-6">
          {Array.from({ length: steps }, (_, i) => (
            <div
              key={i}
              className="relative flex justify-start items-center gap-4 w-full cursor-pointer"
              onClick={() => handleStepClick(i + 1)}
            >
              {/* The clickable circle for each step */}
              <div
                className={`transition-all duration-500 rounded-full flex items-center ${
                  i + 1 === currentStep
                    ? "h-4 w-4 bg-white border-2 border-[#166235] ml-[-2px]" // Active step circle
                    : "h-3 w-3 bg-gray-100 border border-gray-100" // Inactive step circle
                }`}
              ></div>

              {/* Step label */}
              <span
                className={`px-2 ${
                  i + 1 === currentStep ? "text-[#166235]" : "text-gray-400"
                } text-[14px] truncate`}
              >
                {stepLabels[i]}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

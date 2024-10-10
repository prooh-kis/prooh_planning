import React, { useState } from "react";

interface StepSliderProps {
  steps: number;
  step: number;
  setStep?: any;
  setTrigger?: any;
  trigger?: any;
  stepLabels?: any;
}

export const VerticalStepperSlider: React.FC<StepSliderProps> = ({ setStep, steps, step, setTrigger, trigger }) => {
  // Example labels for each step
  const stepLabels = [
    {
      label: "Conditional To Weather Situations",
      value: "weather",
    },
    {
      label: "Conditional To Sporting Events",
      value: "sport",
    },
    {
      label: "Empty Slots",
      value: "empty",
    }
  ];

  // Function to handle step marker click
  const handleStepClick = (step: number) => {
    setStep(step);
    const triggerType: any = {};
    triggerType["triggerType"] = stepLabels[step-1].value
    setTrigger(triggerType);

  };



  return (
    <div className="h-full py-0 px-5 flex flex-col w-full">
      {/* Step Line */}
      <div className="relative flex flex-col">
        <div className="flex flex-col justify-between items-center relative z-10 h-full gap-4">
          {Array.from({ length: steps }, (_, i) => (
            <div
              key={i}
              className="relative flex justify-start items-center gap-4 w-full cursor-pointer"
              onClick={() => handleStepClick(i + 1)}
            >
              {/* The clickable circle for each step */}
              <div
                className={`transition-all duration-500 rounded-full flex items-center ${
                  i + 1 === step
                    ? "h-4 w-4 bg-white border-2 border-[#166235] ml-[-2px]" // Active step circle
                    : "h-3 w-3 bg-gray-100 border border-gray-100" // Inactive step circle
                }`}
              ></div>

              {/* Step label */}
              <span
                className={`px-2 ${
                  i + 1 === step ? "text-[#166235]" : "text-gray-400"
                } text-[14px] truncate`}
              >
                {stepLabels[i]?.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

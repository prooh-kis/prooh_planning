import { Tooltip } from "antd";
import React from "react";

interface StepSliderProps {
  steps: number;
  step: number;
  setStep: (step: number) => void;
  setTrigger: (trigger: { triggerType: string }) => void;
}

export const VerticalStepperSlider: React.FC<StepSliderProps> = ({
  steps,
  step,
  setStep,
  setTrigger,
}) => {
  const stepLabels = [
    { label: "Conditional To Weather Situations", value: "weather" },
    { label: "Empty Slots", value: "empty" },
    { label: "Conditional To Sporting Events", value: "sport" },
  ];

  const handleStepClick = (selectedStep: number) => {
    if (selectedStep === 3) return; // Step 3 is disabled
    setStep(selectedStep);
    setTrigger({ triggerType: stepLabels[selectedStep - 1].value });
  };

  return (
    <div className="flex flex-col w-full px-5 py-0">
      {stepLabels.map((stepItem, index) => {
        const isActive = index + 1 === step;
        return (
          <div
            key={index}
            className={`flex items-center gap-3 cursor-pointer py-2 transition-all duration-300 
              ${isActive ? "text-[#166235] font-semibold" : "text-gray-500"}`}
            onClick={() => handleStepClick(index + 1)}
          >
            {/* Outer Circle (1px border) */}
            <div
              className={`w-5 h-5 flex items-center justify-center border rounded-full transition-all duration-300
                ${isActive ? "border-[#166235]" : "border-gray-400"}
              `}
            >
              {/* Inner Filled Circle */}
              {isActive && (
                <div className="w-3 h-3 bg-[#166235] rounded-full"></div>
              )}
            </div>

            {/* Step Label with Tooltip */}
            <Tooltip
              title={
                index + 1 === 3
                  ? "Sporting events based triggers coming soon..."
                  : `Click to select "${stepItem.label}" trigger`
              }
            >
              <span className="truncate text-[14px]">{stepItem.label}</span>
            </Tooltip>
          </div>
        );
      })}
    </div>
  );
};

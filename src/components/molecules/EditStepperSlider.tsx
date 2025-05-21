import { signout } from "../../actions/userAction";
import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { Tooltip } from "antd";

interface StepSliderProps {
  steps: number;
  step: number;
  setStep?: any;
  campaignId?: any;
  setPageSuccess?: any;
}

export const EditStepperSlider = ({
  campaignId,
  setStep,
  steps,
  step,
  setPageSuccess,
}: StepSliderProps) => {
  const dispatch = useDispatch<any>();
  const { pathname } = useLocation();

  console.log("StepperSlider : ", pathname);

  const auth = useSelector((state: any) => state.auth);
  const { userInfo } = auth;

  // Function to handle step marker click
  const handleStepClick = React.useCallback(
    (clickedStep: number) => {
      if (clickedStep + 1 === step) return; // prevent unnecessary updates

      setStep(clickedStep + 1);
    },
    [pathname, campaignId, setStep, step]
  );

  // Example Flaticon SVG URLs (replace these with actual SVG URLs or import local SVGs)
  const icons: any = useMemo(() => {
    return [
      <i key={1} className="fi fi-sr-cloud-upload-alt text-[14px]"></i>, // Example icon for step 8
      <i key={2} className="fi fi-sr-dashboard-monitor text-[14px]"></i>, // Example icon for step 9
    ];
  }, [pathname]);

  // Example labels for each step
  const stepLabels: any = useMemo(() => {
    return ["Creative Upload", "Vendor Confirmation"];
  }, [pathname]);

  useEffect(() => {
    if (!userInfo) {
      dispatch(signout());
    }
  }, [dispatch, userInfo]);

  return (
    <div className="w-full">
      <div className="flex items-center justify-between pt-0 mb-6">
        <div className="flex-1 h-1 bg-gray-200 relative mx-4">
          <div className="absolute inset-x-0 flex justify-between">
            <div
              className="absolute h-1 inset-x-0 bg-primaryButton transition-all duration-500"
              style={{ width: `${(Number(step - 1) / (steps - 1)) * 100}%` }}
            />
            {[...Array(steps)].map((_, i) =>
              icons[i] && stepLabels[i] ? (
                <div
                  key={i}
                  onClick={() => handleStepClick(i)}
                  className="relative flex flex-col items-center cursor-pointer"
                >
                  <div
                    className={`relative w-4 h-4 rounded-full -mt-1.5 flex flex-col items-center
                      ${
                        i <= step - 1
                          ? "bg-primaryButton"
                          : "border bg-gray-200"
                      }
                    `}
                  >
                    <Tooltip title={stepLabels[i] ?? "Step " + (i + 1)}>
                      <div className="relative mt-[-32px] w-full">
                        <div
                          className={`flex w-full gap-2 ${
                            i + 1 <= step
                              ? "text-primaryButton"
                              : "text-[#D6D2D2]"
                          }`}
                        >
                          {icons[i] ?? (
                            <i className="fi fi-sr-question text-[14px]"></i>
                          )}
                        </div>
                      </div>
                    </Tooltip>
                  </div>
                  {/* Adjust label positioning: left-aligned for first step, centered otherwise, right-aligned for last step */}
                  {i + 1 === step && (
                    <div
                      className={`absolute top-full mt-2 text-primaryButton text-[14px] font-medium whitespace-nowrap
                        ${
                          i === 0
                            ? "left-0"
                            : i + 1 === steps
                            ? "right-0"
                            : "left-1/2 transform -translate-x-1/2"
                        }
                      `}
                    >
                      {stepLabels[step - 1]}
                    </div>
                  )}
                </div>
              ) : null
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

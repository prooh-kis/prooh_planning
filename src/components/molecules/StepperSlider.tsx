import { getDataFromLocalStorage } from "../../utils/localStorageUtils";
import { signout } from "../../actions/userAction";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CURRENT_STEP } from "../../constants/localStorageConstants";
import { useLocation } from "react-router-dom";
import { Tooltip } from "antd";

interface StepSliderProps {
  steps: number;
  step: number;
  setStep?: any;
  campaignId?: any;
  setPageSuccess?: any;
}

export const StepperSlider = ({
  campaignId,
  setStep,
  steps,
  step,
  setPageSuccess,
}: StepSliderProps) => {
  const dispatch = useDispatch<any>();
  const { pathname } = useLocation();

  const auth = useSelector((state: any) => state.auth);
  const { userInfo } = auth;

  // Function to handle step marker click
  const handleStepClick = React.useCallback((clickedStep: number) => {
    if (clickedStep + 1 === step) return; // prevent unnecessary updates
    
    if (
      !pathname.split("/").includes("view") &&
      campaignId &&
      getDataFromLocalStorage(CURRENT_STEP)?.[campaignId] >= clickedStep + 1
    ) {
      setStep(clickedStep + 1);
    }
  }, [pathname, campaignId, setStep, step]);

  // Example Flaticon SVG URLs (replace these with actual SVG URLs or import local SVGs)
  const icons: any = useMemo(() => {
    return pathname.split("/").includes("iknowitallplan")
    ? [
        <i key={1} className="fi fi-sr-megaphone text-[14px]"></i>, // Example icon for step 1
        <i key={2} className="fi fi-br-settings-sliders text-[14px]"></i>, // Example icon for step 3
        <i key={3} className="fi fi-br-clock-three text-[14px]"></i>, // Example icon for step 4
        <i key={4} className="fi fi-sr-document-signed text-[14px]"></i>, // Example icon for step 5
        <i key={5} className="fi fi-ss-sack text-[14px]"></i>, // Example icon for step 7
        <i key={6} className="fi fi-sr-cloud-upload-alt text-[14px]"></i>, // Example icon for step 8
        <i key={7} className="fi fi-sr-dashboard-monitor text-[14px]"></i>, // Example icon for step 9
      ]
    : pathname.split("/").includes("specialdayplan")
    ? [
        <i key={1} className="fi fi-sr-megaphone text-[14px]"></i>, // Example icon for step 1
        <i key={2} className="fi fi-rr-location-crosshairs text-[14px]"></i>, // Example icon for step 2
        <i key={3} className="fi fi-br-settings-sliders text-[14px]"></i>, // Example icon for step 3
        <i key={4} className="fi fi-sr-users-alt text-[14px]"></i>, // Example icon for step 4
        <i key={5} className="fi fi-sr-document-signed text-[14px]"></i>, // Example icon for step 5
        <i key={6} className="fi fi-ss-sack text-[14px]"></i>, // Example icon for step 7
        <i key={7} className="fi fi-sr-cloud-upload-alt text-[14px]"></i>, // Example icon for step 8
        <i key={8} className="fi fi-sr-dashboard-monitor text-[14px]"></i>, // Example icon for step 9
      ]
    : pathname.split("/").includes("storebasedplan")
    ? [
        <i key={1} className="fi fi-sr-megaphone text-[14px]"></i>, // Example icon for step 1
        <i key={2} className="fi fi-br-settings-sliders text-[14px]"></i>, // Example icon for step 3
        <i key={3} className="fi fi-sr-document-signed text-[14px]"></i>, // Example icon for step 4
        <i key={4} className="fi fi-br-clock-three text-[14px]"></i>, // Example icon for step 4
        <i key={5} className="fi fi-sr-document-signed text-[14px]"></i>,
        <i key={6} className="fi fi-ss-sack text-[14px]"></i>, // Example icon for step 7
        <i key={7} className="fi fi-sr-cloud-upload-alt text-[14px]"></i>, // Example icon for step 8
        <i key={8} className="fi fi-sr-dashboard-monitor text-[14px]"></i>, // Example icon for step 9
      ]
    : pathname.split("/").includes("triggerbasedplan")
    ? [
        <i key={1} className="fi fi-sr-megaphone text-[14px]"></i>, // Example icon for step 1
        <i key={2} className="fi fi-sr-tap text-[14px]"></i>, // Example icon for step 6
        <i key={3} className="fi fi-rr-location-crosshairs text-[14px]"></i>, // Example icon for step 2
        <i key={4} className="fi fi-br-settings-sliders text-[14px]"></i>, // Example icon for step 3
        <i key={5} className="fi fi-sr-users-alt text-[14px]"></i>, // Example icon for step 4
        <i key={6} className="fi fi-sr-document-signed text-[14px]"></i>, // Example icon for step 5
        <i key={7} className="fi fi-ss-sack text-[14px]"></i>, // Example icon for step 7
        <i key={8} className="fi fi-sr-cloud-upload-alt text-[14px]"></i>, // Example icon for step 8
        <i key={9} className="fi fi-sr-dashboard-monitor text-[14px]"></i>, // Example icon for step 9
      ]
    : [
        <i key={1} className="fi fi-sr-megaphone text-[14px]"></i>, // Example icon for step 1
        <i key={2} className="fi fi-rr-location-crosshairs text-[14px]"></i>, // Example icon for step 2
        <i key={3} className="fi fi-br-settings-sliders text-[14px]"></i>, // Example icon for step 3
        <i key={4} className="fi fi-sr-users-alt text-[14px]"></i>, // Example icon for step 4
        <i key={5} className="fi fi-sr-document-signed text-[14px]"></i>, // Example icon for step 5
        <i key={6} className="fi fi-sr-tap text-[14px]"></i>, // Example icon for step 6
        <i key={7} className="fi fi-ss-sack text-[14px]"></i>, // Example icon for step 7
        <i key={8} className="fi fi-sr-cloud-upload-alt text-[14px]"></i>, // Example icon for step 8
        <i key={9} className="fi fi-sr-dashboard-monitor text-[14px]"></i>, // Example icon for step 9
      ];
    },[pathname]);

  // Example labels for each step
  const stepLabels: any = useMemo(() => {
   return pathname.split("/").includes("iknowitallplan")
    ? [
        "Basic Details",
        "Select Screens",
        "Select Time",
        "Plan Summary",
        "Vendor Approval",
        "Creative Upload",
        "Vendor Confirmation",
      ]
    : pathname.split("/").includes("specialdayplan")
    ? [
        "Topical Day",
        "Audience Selection",
        "Advanced Filters",
        "Cohort Selection",
        "Screens Summary",
        "Final Budget",
        "Creative Upload",
        "Vendor Confirmation",
      ]
    : pathname.split("/").includes("storebasedplan")
    ? [
        "Basic Details",
        "Advanced Filters",
        "Select Screens",
        "Select Time",
        "Plan Summary",
        "Vendor Approval",
        "Creative Upload",
        "Vendor Confirmation",
      ]
    : pathname.split("/").includes("triggerbasedplan")
    ? [
        "Basic Details",
        "Trigger Selection",
        "Audience Selection",
        "Advanced Filters",
        "Cohort Selection",
        "Screens Summary",
        "Vendor Approval",
        "Creative Upload",
        "Vendor Confirmation",
      ]
    : [
        "Basic Details",
        "Audience Selection",
        "Advanced Filters",
        "Cohort Selection",
        "Screens Summary",
        "Trigger Selection",
        "Vendor Approval",
        "Creative Upload",
        "Vendor Confirmation",
      ];
  },[pathname]);

  useEffect(() => {
    if (!userInfo) {
      dispatch(signout());
    }
  }, [dispatch, userInfo]);

  return (
    <div className="w-full bg-white mt-6">
      <div className="mx-auto">
        <div className="w-full h-full flex items-center py-3">
          <div className="flex items-center justify-between w-full">
            <div className="flex-1 h-1 bg-gray-200 relative mx-4">
              <div className="absolute inset-x-0 flex justify-between">
                <div
                  className="absolute h-1 inset-x-0 bg-primaryButton transition-all duration-500"
                  style={{ width: `${(Number(step - 1) / (steps - 1)) * 100}%` }}
                />
                {[...Array(steps)].map((_, i) => (
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
                              {icons[i] ?? <i className="fi fi-sr-question text-[14px]"></i>}
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
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

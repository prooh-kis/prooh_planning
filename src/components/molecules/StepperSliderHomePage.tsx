import { getDataFromLocalStorage } from "../../utils/localStorageUtils";
import { signout } from "../../actions/userAction";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CURRENT_STEP } from "../../constants/localStorageConstants";
import { useLocation } from "react-router-dom";
import { Tooltip } from "antd";
import { advertisersSteps, dataHeroSteps, mediaOwnersSteps } from "../../data/LandingPageData";

interface StepSliderHomePageProps {
  steps: number;
  step: number;
  setStep?: any;
  campaignId?: any;
}

export const StepperSliderHomePage = ({ campaignId, setStep, steps, step }: StepSliderHomePageProps) => {

  const dispatch = useDispatch<any>();
  const { pathname } = useLocation();

  const auth = useSelector((state: any) => state.auth);
  const { userInfo } = auth;

  // Function to handle step marker click
  const handleStepClick = (step: number) => {
    // console.log(getDataFromLocalStorage(CURRENT_STEP), step)
    if (campaignId && getDataFromLocalStorage(CURRENT_STEP)?.[campaignId] >= step) {
      setStep(step);
      // console.log(":saddasd:")
    }
    if (campaignId) {
      setStep(String(step));
    }
  };

  // Example Flaticon SVG URLs (replace these with actual SVG URLs or import local SVGs)
  const icons = campaignId === "advertisersSteps" ? [
    <i key={1} className="fi fi-sr-megaphone text-[14px]"></i>, // Example icon for step 1
    <i key={2} className="fi fi-rr-location-crosshairs text-[14px]"></i>, // Example icon for step 2
    <i key={3} className="fi fi-br-settings-sliders text-[14px]"></i>, // Example icon for step 3
    <i key={4} className="fi fi-sr-users-alt text-[14px]"></i>, // Example icon for step 4
    <i key={5} className="fi fi-sr-document-signed text-[14px]"></i>, // Example icon for step 5
    <i key={6} className="fi fi-ss-sack text-[14px]"></i>, // Example icon for step 7
    <i key={7} className="fi fi-sr-cloud-upload-alt text-[14px]"></i>, // Example icon for step 8
    <i key={8} className="fi fi-sr-dashboard-monitor text-[14px]"></i>, // Example icon for step 9
  ] : campaignId === "mediaOwnersSteps" ? [
    <i key={1} className="fi fi-sr-megaphone text-[14px]"></i>, // Example icon for step 1
    <i key={2} className="fi fi-rr-location-crosshairs text-[14px]"></i>, // Example icon for step 2
    <i key={3} className="fi fi-br-settings-sliders text-[14px]"></i>, // Example icon for step 3
    <i key={4} className="fi fi-sr-users-alt text-[14px]"></i>, // Example icon for step 4
    <i key={5} className="fi fi-sr-document-signed text-[14px]"></i>, // Example icon for step 5
  ] : campaignId === "dataHeroSteps" ? [
    <i key={1} className="fi fi-sr-megaphone text-[14px]"></i>, // Example icon for step 1
    <i key={2} className="fi fi-rr-location-crosshairs text-[14px]"></i>, // Example icon for step 2
    <i key={3} className="fi fi-br-settings-sliders text-[14px]"></i>, // Example icon for step 3
    <i key={4} className="fi fi-sr-users-alt text-[14px]"></i>, // Example icon for step 4

  ] : [];

  // Example labels for each step
  const stepLabels = campaignId === "advertisersSteps" ? advertisersSteps?.map((step: any) => step.label) :
  campaignId === "mediaOwnersSteps" ? mediaOwnersSteps?.map((step: any) => step.label) :
  campaignId === "dataHeroSteps" ? dataHeroSteps?.map((step: any) => step.label) : [];

  useEffect(() => {
    if (!userInfo) {
      dispatch(signout())
    }
  },[dispatch, userInfo])

  return (
    <div className="w-[100vw] py-0 mx-[-40px]">
      {/* Step Line */}
      <div className="relative w-full flex items-center">
        {/* Line behind the circles */}
        <div
          className="absolute top-1/2 bg-[#00A0FA] h-[2px]"
          style={{
            left: step === 1 ? `calc(50% / ${steps})` : step === steps ? `calc(50% / ${steps})` : `calc(40% / ${steps})`, // Starts the line at the center of the first step
            right: step === 1 ? `calc(50% / ${steps})` : step === steps ? `calc(50% / ${steps})` : `calc(40% / ${steps})`, // Ends the line at the center of the last step
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
                      `text-primaryButton text-[14px] pr-0 pl-0 truncate` :
                    step === 9 ?
                      `text-primaryButton text-[14px] text-right pr-0 pl-0 truncate` :
                      `text-primaryButton text-[14px] pr-40 pl-40 truncate`
                  }>
                    {stepLabels[i]} {/* Show the label text for the current step */}
                  </span>
                ) : (
                  <i
                    className={`fi ${
                      i + 1 <= step
                        ? "text-primaryButton" // Blue for selected steps
                        : "text-[#D6D2D2]" // Gray for unselected steps
                    }`}
                  >
                    {icons[i]}
                  </i>
                )}
              </div>

              {/* The clickable circle for each step */}
              <Tooltip
                title={stepLabels[i]}
              >
                <div
                  className={`cursor-pointer rounded-full transition-all duration-500 
                    ${i + 1 === step
                      ? "h-4 w-4 bg-[#ffffff] border-2 border-primaryButton" // Larger circle with ring for active step
                      : i + 1 < step
                      ? "h-3 w-3 bg-[#00A0FA] border border-primaryButton" // Blue for previous steps, same size as future
                      : "h-3 w-3 bg-[#ffffff] border border-primaryButton" // White for future steps
                  }`}
                ></div>
              </Tooltip>
       
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

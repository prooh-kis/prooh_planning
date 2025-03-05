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
    if (campaignId) {
      setStep(String(step));
    }
  };
  console.log(step);

  // Example Flaticon SVG URLs (replace these with actual SVG URLs or import local SVGs)
  const icons = campaignId === "advertisersSteps" ? [
    <i key={0} className="fi fi-sr-megaphone text-[14px] flex items-center justify-center"></i>, // Example icon for step 1
    <i key={1} className="fi fi-rr-location-crosshairs text-[14px] flex items-center justify-center"></i>, // Example icon for step 2
    <i key={2} className="fi fi-br-settings-sliders text-[14px] flex items-center justify-center"></i>, // Example icon for step 3
    <i key={3} className="fi fi-sr-users-alt text-[14px] flex items-center justify-center"></i>, // Example icon for step 4
    <i key={4} className="fi fi-sr-document-signed text-[14px] flex items-center justify-center"></i>, // Example icon for step 5
    <i key={5} className="fi fi-ss-sack text-[14px] flex items-center justify-center"></i>, // Example icon for step 7
    <i key={6} className="fi fi-sr-cloud-upload-alt text-[14px] flex items-center justify-center"></i>, // Example icon for step 8
    <i key={7} className="fi fi-sr-dashboard-monitor text-[14px] flex items-center justify-center"></i>, // Example icon for step 9
  ] : campaignId === "mediaOwnersSteps" ? [
    <i key={0} className="fi fi-sr-megaphone text-[14px] flex items-center justify-center"></i>, // Example icon for step 1
    <i key={1} className="fi fi-rr-location-crosshairs text-[14px] flex items-center justify-center"></i>, // Example icon for step 2
    <i key={2} className="fi fi-br-settings-sliders text-[14px] flex items-center justify-center"></i>, // Example icon for step 3
    <i key={3} className="fi fi-sr-users-alt text-[14px] flex items-center justify-center"></i>, // Example icon for step 4
    <i key={4} className="fi fi-sr-document-signed text-[14px] flex items-center justify-center"></i>, // Example icon for step 5
  ] : campaignId === "dataHeroSteps" ? [
    <i key={0} className="fi fi-sr-megaphone text-[14px] flex items-center justify-center"></i>, // Example icon for step 1
    <i key={1} className="fi fi-rr-location-crosshairs text-[14px] flex items-center justify-center"></i>, // Example icon for step 2
    <i key={2} className="fi fi-br-settings-sliders text-[14px] flex items-center justify-center"></i>, // Example icon for step 3
    <i key={3} className="fi fi-sr-users-alt text-[14px] flex items-center justify-center"></i>, // Example icon for step 4

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
    <div className="w-full">
      <div className="flex items-center justify-between my-6">
        <div className="flex-1 h-1 bg-gray-200 relative mx-4">
          <div className="absolute inset-x-0 flex justify-between">
            <div 
              className="absolute h-1 inset-x-0 bg-primaryButton transition-all duration-500"
              // style={{ width: `${((currentOfferIndex) / [2022, 2023, 2024, 2025].length) * 100}%` }}
              style={{ width: `${Number(step)/(steps-1) * 100}%` }}


            />
            {[...Array(steps)].map((_, i) => (
              <div 
                key={i}
                onClick={() => handleStepClick(i)}
                className={`relative w-4 h-4 rounded-full -mt-1.5 flex flex-col items-center
                  ${i <= step ? 'bg-primaryButton' : 'border border-primaryButton bg-gray-200'}
                `}
              >
              <Tooltip
                title={stepLabels[i]}
              >
                {/* Icon or Text for each step */}
                <div className="relative mt-[-32px] w-full">
                  
                  <div
                      className={`fi ${
                        i <= step
                          ? "text-primaryButton" // Blue for selected steps
                          : "text-[#D6D2D2]" // Gray for unselected steps
                      }`}
                    >
                    {icons[i]}
                  </div>
                </div>
              </Tooltip>
              </div>
            ))}
          </div>
          <div
            className={
              `flex justify-center w-full mt-4 text-primaryButton text-[14px] font-medium truncate`
          }>
            {stepLabels[step]} {/* Show the label text for the current step */}
          </div>
        </div>
      </div>
      
    </div>
  );
};

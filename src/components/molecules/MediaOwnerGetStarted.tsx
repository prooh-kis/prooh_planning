import { mediaImage } from "../../assets";
import React from "react";

export const MediaOwnerGetStarted = () => {
  return (
    <div className="bg-[#4281F6] h-auto sm:h-[400px] lg:h-[500px] w-full px-4 sm:px-10 lg:px-20 py-10 mt-10 rounded-[19px]">
      <div className="flex flex-col-reverse sm:flex-row items-center sm:items-start justify-between">
        <div className="flex flex-col max-w-full sm:max-w-md lg:max-w-lg text-center sm:text-left">
          <h1
            className="text-[#FFFFFF] text-sm sm:text-base lg:text-[16px] mt-4 sm:mt-8 font-medium 
            leading-[20px] sm:leading-[22px] lg:leading-[24px] 
            tracking-[0.15em] sm:tracking-[0.18em] lg:tracking-[0.21em]"
          >
            <i className="fi fi-sr-sparkles text-[#FFFFFF] text-[20px]"></i>{" "}
            Offer for <span className="font-bold">media owner</span>
          </h1>
          <h1
            className="text-[#FFFFFF] text-lg sm:text-2xl lg:text-[48px] mt-4 sm:mt-8 font-semibold 
            leading-[36px] sm:leading-[40px] lg:leading-[51.84px] 
            tracking-[-0.01em] sm:tracking-[-0.015em] lg:tracking-[-0.02em]"
          >
            Monetize Your Screens Onboard Your DOOH Inventory Today!
          </h1>
          <h1
            className="text-[#FFFFFF] text-sm sm:text-base lg:text-[16px] my-4 sm:my-8 font-normal 
            leading-[20px] sm:leading-[22px] lg:leading-[24px] 
            tracking-[-0.01em] sm:tracking-[-0.015em] lg:tracking-[-0.02em]"
          >
            Unlock new revenue streams by listing your DOOH inventory with us.
            Seamless onboarding, real-time insights, and maximized earnings!
          </h1>
          <button
            className="bg-[#FFFFFF] text-[#129BFF] rounded-full text-[14px] sm:text-[16px] font-bold 
            hover:bg-black hover:text-[#FFFFFF] hover:text-[18px] w-[163px] h-[50px] mx-auto sm:mx-0"
          >
            Get Started
          </button>
        </div>
        {/* Hide Image on Mobile */}
        <div className="hidden sm:block w-full max-w-xs sm:max-w-sm lg:max-w-md h-auto sm:h-[450px]">
          <img
            src={mediaImage}
            alt="Media Owner"
            className="h-full w-full object-contain"
          />
        </div>
      </div>
    </div>
  );
};

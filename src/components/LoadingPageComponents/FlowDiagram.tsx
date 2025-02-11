import { ImageCarousel } from "../../components/molecules/ImageCarousel";
import { images } from "../../data/LandingPageData";
import React, { useState } from "react";
import illu1 from "../../assets/images/illu1.png";
import illu2 from "../../assets/images/illu2.png";
import illu3 from "../../assets/images/illu3.png";
import illu4 from "../../assets/images/illu4.png";
import illu5 from "../../assets/images/illu5.png";
import illu6 from "../../assets/images/illu6.png";
import illu7 from "../../assets/images/illu7.png";
import { PrimaryButton } from "../../components/atoms/PrimaryButton";

export const FlowDiagram = () => {

  return (
    <div className="lg:px-16 px-4 w-full pt-12">
      <div className="flex">
        <div className="flex items-center">
          <code className="rotated-text">FLY AND DMP</code>
        </div>
        <div className="w-full grid grid-cols-2 h-[420px] py-4">
          <div className="col-span-1 flex justify-center items-start">
            <img src={illu1} alt={"Supply Side Platform"} className="w-60"/>
          </div>
          <div className="col-span-1 flex justify-center items-end">
            <img src={illu2} alt={"Audience Intelligence Data"} className="w-60"/>
          </div>
        </div>
      </div>
      <div className="flex">
        <div className="flex items-center">
          <code className="rotated-text">PROOH PLANNING TOOL</code>
        </div>
        <div className="w-full grid grid-cols-3 h-[420px] py-4">
          <div className="col-span-1 flex justify-center items-start">
            <img src={illu3} alt={"Instant Campaign Planning With Prooh"} className="w-60"/>
          </div>
          <div className="col-span-1 flex justify-center items-center">
            <img src={illu4} alt={"Hassle Free Pre-Deployment Approvals"} className="w-60"/>
          </div>
          <div className="col-span-1 flex justify-center items-end">
            <img src={illu5} alt={"Real Time Campaign Deployment"} className="w-60"/>
          </div>
        </div>
      </div>
      <div className="flex">
        <div className="flex items-center">
          <code className="rotated-text">REPORTING AND INVOICING</code>
        </div>
        <div className="w-full grid grid-cols-2 h-[420px] py-4">
          <div className="col-span-1 flex justify-center items-start">
            <img src={illu6} alt={"Real-Time Campaign Reporting And Impression Adjustment"} className="w-60"/>
          </div>
          <div className="col-span-1 flex justify-center items-end">
            <img src={illu7} alt={"Auto Invoicing And Archiving"} className="w-60"/>
          </div>
        </div>
      </div>
      <div className="mt-6 md:mt-8 flex justify-center">
        <PrimaryButton
          title="Start Planning"
          rounded="rounded-[8px]"
          // action={() => navigate(AUTH)} // Scroll to the target on click
          icon={<i className="fi fi-sr-megaphone mx-2 flex items-center jusify-center"></i>}
        />
      </div>
    </div>
  );
};

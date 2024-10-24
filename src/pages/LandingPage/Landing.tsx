import { Player } from "@lordicon/react";
import { CampaignTemplates } from "../../components/index";
import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AnimatedIcon } from "../../components/molecules/AnimatedIcon";
import { PrimaryButton } from "../../components/atoms/PrimaryButton";
import { SecondaryButton } from "../../components/atoms/SecondaryButton";
import asus from "../../assets/images/asus.png";
import samsung from "../../assets/images/samsung.png";
import { ImageCarousel } from "../../components/molecules/ImageCarousel";
import { LandingPageMap } from "../../components/molecules/LandingPageMap";
import { LandingPageMapFooter } from "../../components/molecules/LandingPageMapFooter";
import { LandingPageMapHeader } from "../../components/molecules/LandingPageMapHeader";

const confetti = require("../../assets/lottie/confetti.json");

const images = [
  asus,
  samsung,
  asus,
  samsung,
  asus,
  samsung,
  asus,
  samsung,
  asus,
  samsung,
];

export const Landing: React.FC = () => {
  const dispatch = useDispatch<any>();
  const navigate = useNavigate();
  const targetDivRef = useRef<HTMLDivElement>(null);

  const auth = useSelector((state: any) => state.auth);
  const { userInfo } = auth;

  const scrollToTarget = () => {
    if (targetDivRef.current) {
      targetDivRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="mt-6 w-full h-full pb-5 flex justify-center items-center">
      <div className="w-full">
        <div className="w-full flex justify-center items-center gap-2">
          <div className="flex items-center">
            <AnimatedIcon size={20} icon={confetti} />
          </div>
          <p className="text-[14px]">Prooh planner is now live</p>
        </div>
        <div className="w-full flex flex-col justify-center items-center pb-4">
          <h1 className="text-[64px] font-bold text-[#254354] mb-[-10px]">Pay For Reach, Not For Space</h1>
          <h1 className="text-[64px] font-bold text-[#254354] mt-[-10px]">Impressions Advertising</h1>
          <p className="text-[14px] w-[500px] text-center">
            {"PROOH's"} media planning tool uses geospatial data, POI data, Govt. Traffic Data amongst other Data sets to determine total
          </p>
        </div>
        <div className="flex gap-2 justify-center py-4">
          <PrimaryButton
            title="Start Planning"
            rounded="rounded-[5px]"
            action={scrollToTarget} // Scroll to the target on click
          />
          <PrimaryButton
            title="Call Us"
            rounded="rounded-[5px]"
            reverse={true}
            icon={<i className="fi fi-sr-phone-call flex items-center pr-2"></i>}
          />
        </div>
        <div className="pt-12 pb-8">
          <div className="flex justify-center gap-2 py-2">
            <h1 className="text-[12px] font-bold text-primaryButton">Demand</h1>
            <h1 className="text-[12px] text-secondaryButton">Supply</h1>
          </div>
          <div className="flex gap-4 items-center">
            <ImageCarousel images={images} imagesToShow={6} />
          </div>
        </div>
        <div ref={targetDivRef} className="pb-32">
          <div className="relative">
            <LandingPageMapHeader />
          </div>
          <div className="h-[720px] z-0">
            <LandingPageMap />
          </div>
          <div>
            <LandingPageMapFooter />
          </div>
        </div>
        <div className="px-8">
          <div className="flex flex-col justify-center items-center">
            <h1 className="text-[48px] text-[#254354] font-bold mb-0 leading-tight">
              We sell DOOH on <span className="text-[#129BFF]">Impressions</span> only.
            </h1>
            <h1 className="text-[48px] text-[#254354] font-bold mb-0 leading-tight">
              No Fixed Rental.
            </h1>
          </div>
          
          <div className="grid grid-cols-12 my-8">
            <div className="col-span-3 px-12 py-4">
              <div className="rounded-[12px] border border-[#129BFF] w-1/4 flex justify-center items-center p-4">
                <i className="fi fi-br-bullseye-arrow text-[30px] text-[#129BFF] flex items-center"></i>
              </div>
              <h2 className="text-[14px] font-semibold pt-4">
                Data-Driven Targeting
              </h2>
              <p className="text-[12px] pt-2">
                {"PROOH's"} media planning tools uses geospatial, POI and traffic data to estimate audience impressions at specific locations.
              </p>
            </div>
            <div className="col-span-3 px-12 py-4 border-x">
              <div className="rounded-[12px] border border-[#129BFF] w-1/4 flex justify-center items-center p-4">
                <i className="fi fi-sr-marker text-[30px] text-[#129BFF] flex items-center"></i>
              </div>
              <h2 className="text-[14px] font-semibold pt-4">
                Location Insights
              </h2>
              <p className="text-[12px] pt-2">
                Brands can target locations with the best audience reach using DOOH options, LTS scoring, historical site data, and direct pricing.
              </p>
            </div>
            <div className="col-span-3 px-12 py-4 border-r">
              <div className="rounded-[12px] border border-[#129BFF] w-1/4 flex justify-center items-center p-4">
                <i className="fi fi-ss-laptop-code text-[30px] text-[#129BFF] flex items-center"></i>
              </div>
              <h2 className="text-[14px] font-semibold pt-4">
                Programmatic Deployment
              </h2>
              <p className="text-[12px] pt-2">
                Deploy creatives on DOOH screens programmatically, ensuring efficient and effective targeting of your advertising campaign.                
              </p>
            </div>
            <div className="col-span-3 px-12 py-4">
              <div className="rounded-[12px] border border-[#129BFF] w-1/4 flex justify-center items-center p-4">
                <i className="fi fi-sr-document text-[30px] text-[#129BFF] flex items-center"></i>
              </div>
              <h2 className="text-[14px] font-semibold pt-4">
                Planning To Deployment
              </h2>
              <p className="text-[12px] pt-2">
                Plan your campaign and track live data on a client-accessible dashboard, measuring actual impressions against predictions.               
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <h1 className="text-[48px] text-[#254354] font-bold mb-0 leading-tight">
              Easy, Simple, Affordable
            </h1>
            <p className="text-[12px] text-[#61737D] w-1/2">
              Easily manage your DOOH advertising campaigns and optmise your media planning by buying only what truly suits your {"campaign's"} need.
            </p>
          </div>
          <div className="grid grid-cols-12 gap-8">
            <div className="col-span-4 py-4">
              <div className="rounded-[12px] h-80 bg-gray-100 my-4">

              </div>
              <h1>
                Automatic PO Generation
              </h1>
              <p>

              </p>
            </div>
            <div className="col-span-4 py-4">
              <div className="rounded-[12px] h-80 bg-gray-100 my-4">

              </div>
              <h1>
                Automatic PO Generation
              </h1>
              <p>

              </p>
            </div>
            <div className="col-span-4 py-4">
              <div className="rounded-[12px] h-80 bg-gray-100 my-4">

              </div>
              <h1>
                Automatic PO Generation
              </h1>
              <p>

              </p>
            </div>
            
          </div>
          <div className="flex justify-center items-center py-20">
            <span className="block w-full border-t-[1px] border-gray-200 border-dashed"></span>
          </div>

        </div>
      </div>
    </div>
  );
};

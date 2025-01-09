import { RightSideArrowsImageCarousel } from "../../components/molecules/RightSideArrowsImageCrousel";
import { meetArchitects } from "../../data/LandingPageData";
import React from "react";

export const ProohCreator = () => {
  return (
    <div className="w-full px-16">
      <div className="p-4 sm:p-8">
        <div className="flex gap-2 items-center">
          <i className="fi fi-sr-heart text-[12px] sm:text-[14px] text-primaryButton flex items-center"></i>
          <h1 className="text-[12px] sm:text-[14px]">Our Team</h1>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 mt-4">
          <div className="md:col-span-5">
            <h1 className="text-[28px] sm:text-[40px] lg:text-[48px] font-semibold text-[#0E212E] leading-[38px] sm:leading-[50px] lg:leading-[50.88px] tracking-[-0.03em] w-[409px] h-[153px] pr-8">
              Meet The Creators Behind Our Vision
            </h1>
          </div>
          <div className="md:col-span-7 flex w-[627px]">
            <p className="text-[14px] sm:text-[16px] lg:text-[20px] leading-relaxed text-[#254354]">
              Meet the passionate leaders driving our mission. Their expertise
              and commitment to excellence propel us forward, creating lasting
              impact and inspiring success.
            </p>
          </div>
        </div>
        <div>
          <RightSideArrowsImageCarousel images={meetArchitects} />
        </div>
      </div>
    </div>
  );
};

import { RightSideArrowsImageCarousel } from "../../components/molecules/RightSideArrowsImageCrousel";
import { meetArchitects } from "../../data/LandingPageData";
import React from "react";

export const ProohCreator = ({
  title = "Meet The Creators Behind Our Vision",
  description = "Meet the passionate leaders driving our mission. Their expertise and commitment to excellence propel us forward, creating lasting impact and inspiring success.",
  images = meetArchitects,
}) => {
  return (
    <div className="w-full px-6 md:px-16">
      <div className="p-4 sm:p-8">
        <div className="flex gap-2 items-center">
          <i className="fi fi-sr-heart text-[12px] sm:text-[14px] text-primaryButton"></i>
          <h2 className="text-[12px] sm:text-[14px] font-medium text-primaryButton">
            Our Team
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 mt-4">
          <div className="md:col-span-5">
            <h2 className="text-[28px] sm:text-[40px] lg:text-[48px] font-semibold text-[#0E212E] leading-tight tracking-tight">
              {title}
            </h2>
          </div>
          <div className="md:col-span-7">
            <p className="text-[14px] sm:text-[16px] lg:text-[20px] text-[#254354] leading-relaxed">
              {description}
            </p>
          </div>
        </div>
        <div className="mt-8">
          <RightSideArrowsImageCarousel images={images} />
        </div>
      </div>
    </div>
  );
};

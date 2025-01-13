import { PrimaryButton } from "../../components/atoms/PrimaryButton";
import React from "react";
import { useNavigate } from "react-router-dom";
import { AUTH } from "../../routes/routes";
import { CarouselImageView } from "../../components/molecules/CarouselImageView";
import { carouselImages } from "../../data/LandingPageData";

export const Section1 = () => {
  const navigate = useNavigate();
  return (
    <div className="w-full grid grid-cols-2 md:grid-cols-12 gap-8 md:gap-16 px-6 md:px-16 py-16 md:py-32">
      {/* Text Content */}
      <div className="col-span-2 md:col-span-5 flex justify-center md:justify-start">
        <div className="w-full md:w-[516px]">
          <h1 className="text-[28px] md:text-[40px] lg:text-[48px] font-bold text-[#20272C]  leading-[45px] tracking-[-0.02em]">
            End-to-end <br />
            campaign management platform for
            <span className="bg-primaryButton text-white rounded-[10px] text-[20px] md:text-[32px] px-2 ml-2">
              DOOH
            </span>
          </h1>
          <p className="text-[12px] md:text-[14px] text-[#4C6590] text-start mt-4 md:mt-8">
            {`Prooh: India’s 1st 'Audience Guarantee' OOH Media Company,
            delivering data-driven planning, audience measurement, performance
            proof, and 100% cost transparency.`}
          </p>
          <div className="mt-6 md:mt-8 flex justify-start">
            <PrimaryButton
              title="Start Planning"
              rounded="rounded-[5px]"
              action={() => navigate(AUTH)} // Scroll to the target on click
            />
          </div>
        </div>
      </div>

      {/* Carousel Section */}
      <div className="col-span-2 md:col-span-7 flex justify-center md:justify-start">
        <div className="w-full max-w-[738px]">
          <CarouselImageView showThumbnails={false} images={carouselImages} />
        </div>
      </div>
    </div>
  );
};

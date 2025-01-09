import { PrimaryButton } from "../../components/atoms/PrimaryButton";
import React from "react";
import { useNavigate } from "react-router-dom";
import { AUTH } from "../../routes/routes";
import { CarouselImageView } from "../../components/molecules/CarouselImageView";
import { carouselImages } from "../../data/LandingPageData";

export const Section1 = () => {
  const navigate = useNavigate();
  return (
    <div className="w-full grid grid-cols-12 gap-16 px-16 py-32">
      <div className="col-span-5">
        <div className="w-[516px]">
          <h1 className="lg:text-[48px] md:text-[40px] font-black text-[#20272C] text-wrap">
            End-to-end campaign management platform for
            <span className="bg-primaryButton text-white rounded-[10px] text-[32px] px-1 ml-2">
              DOOH
            </span>
          </h1>
          <p className="text-[14px] text-[#4C6590] text-start text-wrap mt-8">
            {
              "Prooh: India’s 1st 'Audience Guarantee' OOH Media Company, delivering data-driven planning, audience measurement, performance proof, and 100% cost transparency"
            }
          </p>
          <div className="mt-8 flex justify-start">
            <PrimaryButton
              title="Start Planning"
              rounded="rounded-[5px]"
              action={() => navigate(AUTH)} // Scroll to the target on click
            />
          </div>
        </div>
      </div>
      <div className="col-span-7  p-0 m-0 flex flex-start max-w-[738px] max-h-[370px]">
        <CarouselImageView showThumbnails={false} images={carouselImages} />
      </div>
    </div>
  );
};

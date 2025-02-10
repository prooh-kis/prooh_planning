import { PrimaryButton } from "../../components/atoms/PrimaryButton";
import React from "react";
import { useNavigate } from "react-router-dom";
import { AUTH } from "../../routes/routes";
// import { CarouselImageView } from "../../components/molecules/CarouselImageView";
// import { carouselImages } from "../../data/LandingPageData";

export const Section1 = () => {
  const navigate = useNavigate();
  
  return (
    <div className="w-full flex justify-center items-center min-h-screen px-6 md:px-32 py-0">
      {/* Text Content */}
      <div className="w-full max-w-[900px] text-center">
        <h1 className="text-[32px] md:text-[52px] font-bold text-[#20272C] leading-[60px] tracking-[-0.02em]">
          <span className="whitespace-nowrap">End-to-end campaign</span> <br />
          management platform for
          <span className="bg-primaryButton text-[#FFFFFF] rounded-[10px] px-3 ml-2 text-[32px] md:text-[40px]">
            DOOH
          </span>
        </h1>
        <p className="text-[14px] md:text-[18px] text-[#4C6590] mt-6 md:mt-10">
          {`Prooh: India’s 1st 'Audience Guarantee' OOH Media Company,
          delivering data-driven planning, audience measurement, performance
          proof, and 100% cost transparency.`}
        </p>

        {/* Buttons Section */}
        <div className="mt-8 md:mt-12 flex justify-center gap-4">
          <PrimaryButton
            title="Start Planning"
            rounded="rounded-[5px]"
            action={() => navigate(AUTH)}
          />
          <button
            onClick={() => navigate("/contact")}
            className="bg-[#FFFFFF] text-[#129BFF] border-[2px] border-[#129BFF] rounded-[5px] px-6 py-3 text-sm md:text-base font-bold 
                      hover:bg-[#129BFF] hover:text-[#FFFFFF] transition-all shadow-[0px_0px_0px_3px_#129BFF] rounded-lg"
          >
            Contact Us
          </button>
        </div>
      </div>

      {/* Carousel Section (Commented Out) */}
      {/* 
      <div className="w-full md:w-1/2 flex justify-center">
        <div className="w-full max-w-[738px]">
          <CarouselImageView showThumbnails={false} images={carouselImages} />
        </div>
      </div>
      */}
    </div>
  );
};

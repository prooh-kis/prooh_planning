import { PrimaryButton } from "../../components/atoms/PrimaryButton";
import React from "react";
import { useNavigate } from "react-router-dom";
import { AUTH } from "../../routes/routes";
import { CarouselImageView } from "../../components/molecules/CarouselImageView";

export const Section1 = () => {
  const navigate = useNavigate();
  return (
    <div className="w-full gap-8 md:gap-16 px-6 md:px-16 pt-16 md:pt-32">
      {/* Text Content */}
      <div className="w-full flex flex-col justify-center items-center">
        <code className="text-[10px] md:text-[12px] lg:text-[16px] mb-[-14px] font-semibold">End-To-End</code>
        <h1 className="font-custom font-bold text-[24px] md:text-[60px] lg:text-[80px] text-[#20272C] text-center w-[90vw]">
          Campaign Management Platform For DOOH
        </h1>
        <p className="text-[12px] md:text-[14px] text-[#4C6590] text-center mt-4 md:mt-8 w-[80vw]">
          {`Prooh: India’s 1st 'Audience Guarantee' DOOH Media Company,
          delivering data-driven planning, audience measurement, performance
          proof, and 100% cost transparency.`}
        </p>
        <div className="mt-6 md:mt-8 flex justify-start">
          <PrimaryButton
            title="Start Planning"
            rounded="rounded-full"
            action={() => navigate(AUTH)} // Scroll to the target on click
            icon={<i className="fi fi-sr-megaphone mx-2 flex items-center jusify-center"></i>}
          />
        </div>
      </div>
    </div>
  );
};

import { PrimaryButton } from "../../components/atoms/PrimaryButton";
import React from "react";
import { useNavigate } from "react-router-dom";
import { AUTH } from "../../routes/routes";

export const Section1 = () => {
  const navigate = useNavigate();
  return (
    <div className="w-full px-6 md:px-16 pt-20 md:pt-32 flex justify-center">
      {/* Text Content */}
      <div className="w-full max-w-[982px] flex flex-col justify-center items-center text-center">
        {/* Small Heading */}
        <h1
          className="text-[10px] sm:text-[12px] md:text-[14px] lg:text-[16px] font-semibold tracking-[0.10em] 
          leading-[14px] sm:leading-[16px] md:leading-[20px] lg:leading-[24px]"
        >
          End-To-End
        </h1>

        {/* Main Title */}
        <h1
          className="font-custom font-semibold text-[24px] sm:text-[40px] md:text-[60px] lg:text-[84px] text-[#20272C] 
          leading-[32px] sm:leading-[44px] md:leading-[72px] lg:leading-[97px] tracking-[-0.01em]"
        >
          Campaign Management Platform For DOOH
        </h1>

        {/* Description */}
        <p
          className="text-[14px] sm:text-[16px] md:text-[18px] lg:text-[20px] text-[#4C6590] mt-4 md:mt-8 
          leading-[22px] sm:leading-[26px] md:leading-[28px] lg:leading-[30px] tracking-normal"
        >
          {`Prooh: India’s 1st 'Audience Guarantee' DOOH Media Company, delivering data-driven planning, audience measurement, performance proof, and 100% cost transparency.`}
        </p>

        {/* CTA Button - Centered */}
        <div className="mt-6 md:mt-8 flex justify-center">
          <PrimaryButton
            title="Create"
            rounded="rounded-full"
            action={() => navigate(AUTH)}
            icon={
              <i className="fi fi-sr-megaphone mx-2 flex items-center justify-center"></i>
            }
          />
        </div>
      </div>
    </div>
  );
};

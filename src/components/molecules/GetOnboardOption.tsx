import { useNavigate } from "react-router-dom";
import { image9 } from "../../assets";
import React from "react";

export const GetOnboardOption = () => {
  const navigate = useNavigate();
  return (
    <div className="w-full p-8 sm:px-40 bg-[#129BFF] flex flex-col sm:flex-row justify-between mt-4 lg:mt-8">
      <div>
        <h1 className="text-[#FFFFFF] text-[30px] sm:text-[49px] font-bold w-full sm:w-[593px] leading-[57.2px] tracking-[-0.01em]">
          {`Monetize Your unsold inventory Today!`}
        </h1>
        <button
          className="bg-[#FFFFFF] text-[#129BFF] rounded-[9px] text-[14px] sm:text-[16px] mt-8 font-bold hover:bg-black hover:text-[#FFFFFF] hover:text-[18px] w-[163px] h-[50px]"
          onClick={() => navigate("/auth")}
        >
          Get Onboard
        </button>
      </div>
      <div className="w-full sm:w-auto mt-8 sm:mt-0">
        <img src={image9} alt="" className="w-full h-full" />
      </div>
    </div>
  );
};

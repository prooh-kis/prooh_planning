import { ImageCarousel } from "../../components/molecules/ImageCarousel";
import { images } from "../../data/LandingPageData";
import React, { useState } from "react";

export const FloatingBrandIcon = () => {
  const [selectOption, setSelectOption] = useState<string>("Demand");

  return (
    <div className="lg:px-16 px-4 w-full">
      <div className="flex justify-center gap-2">
        {["Demand", "Supply"].map((option) => (
          <button
            key={option}
            className={`rounded-[15px] px-4 py-2 lg:text-[14px] md:text-[12px]  ${
              selectOption === option ? "active-button" : "inactive-button"
            }`}
            onClick={() => setSelectOption(option)}
          >
            {option}
          </button>
        ))}
      </div>
      <div className="flex gap-4 items-center ">
        <ImageCarousel images={images} imagesToShow={6} />
      </div>
    </div>
  );
};

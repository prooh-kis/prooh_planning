import React, { useState } from "react";
import { testO11 } from "../../assets";
import quotes from "../../assets/icons/quotes.png";

const testimonials = [
  {
    image: testO11,
    quote:
      "Being a Tech Company, we believe in everything which can demonstrate measurability. PROOH practices are extremely fresh and deliver the assurances around accountability.",
    author: "Ms. Bhawna Talwar",
    position: "Brand Marketing",
  },
  // Add more testimonials here
];

export const FeedBack = ({
  title = "Wall of Love",
  sectionDescription = "Feedback From Those We've Shared Experiences With",
  testimonialsData = testimonials,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const totalTestimonials = testimonialsData.length;

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? totalTestimonials - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === totalTestimonials - 1 ? 0 : prevIndex + 1
    );
  };

  const { image, quote, author, position } = testimonialsData[currentIndex];

  return (
    <div className="px-4 w-full">
      <div className="bg-gradient-to-b from-[#F3FAFF] to-[#FFFFFF] py-8 px-4 md:py-16 lg:px-16 rounded-[21px]">
        {/* Section Header */}
        <div className="flex gap-2 items-center mb-4">
          <i className="fi fi-sr-heart lg:text-[14px] text-[12px] text-primaryButton"></i>
          <h2 className="lg:text-[14px] text-[12px] text-[#183246]">{title}</h2>
        </div>

        {/* Title and Description */}
        <h1 className="text-[24px] md:text-[32px] lg:text-[48px] font-semibold text-[#183246] leading-[32px] md:leading-[42px] lg:leading-[55.2px] tracking-[-0.03em] mb-4">
          {sectionDescription}
        </h1>
        <p className="text-[12px] md:text-[14px] lg:text-[16px] text-[#4B5563] font-normal leading-[20px] md:leading-[22px] lg:leading-[24px]">
          Hopeful and confident, he overcame shyness and found happiness in
          life, embracing joy without hesitation.
        </p>

        {/* Testimonial Content */}
        <div className="mt-8 flex flex-col lg:flex-row gap-4 lg:gap-8 items-center">
          {/* Testimonial Image */}
          <img
            src={image}
            alt="Testimonial Visual"
            className="h-[200px] w-full md:h-[260px] md:w-[373px] object-cover rounded-lg shadow-md"
          />

          {/* Testimonial Text */}
          <div className="w-full md:w-[630px] h-auto flex flex-col">
            {/* Quotation Mark Icon */}
            <img
              src={quotes}
              alt="Quotes"
              className="h-8 w-8 mb-4 bg-blue-500 mask mask-image"
            />

            {/* Quote Content */}
            <p className="text-[16px] md:text-[20px] lg:text-[24px] text-[#254354] font-normal leading-[24px] md:leading-[30px] lg:leading-[34px] tracking-[-0.02em]">
              {quote}
            </p>

            {/* Author Info */}
            <p className="text-[16px] md:text-[18px] lg:text-[20px] text-[#254354] font-bold leading-[24px] mt-2">
              {author}
            </p>
            <p className="text-[14px] md:text-[16px] text-[#688799] font-normal leading-[19.36px]">
              {position}
            </p>

            {/* Pagination and Navigation */}
            <div className="flex justify-between items-center mt-4">
              {/* Page Counter */}
              <p className="text-[14px] md:text-[16px] text-[#5A5A5A] font-normal">
                <span className="text-[#129BFF]">
                  {String(currentIndex + 1).padStart(2, "0")}
                </span>{" "}
                / {String(totalTestimonials).padStart(2, "0")}
              </p>

              {/* Navigation Arrows */}
              <div className="flex gap-4 items-center">
                <button onClick={handlePrev} aria-label="Previous">
                  <i className="fi fi-rr-arrow-small-left text-[#8E8E8E]"></i>
                </button>
                <button onClick={handleNext} aria-label="Next">
                  <i className="fi fi-rr-arrow-small-right"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

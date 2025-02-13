import React, { useEffect, useState } from "react";
import quotes from "../../assets/icons/quotes.png";
import { testimonials } from "./../../data/LandingPageData";

interface Testimonial {
  image: string;
  quote: string;
  author: string;
  position: string;
}

interface FeedBackProps {
  title?: string;
  sectionDescription?: string;
  testimonialsData?: Testimonial[];
}

export const FeedBack: React.FC<FeedBackProps> = (props) => {

  const [testi, setTesti] = useState<any>(testimonials);
  return (
    <div className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="flex justify-center items-center gap-2 mb-4">
              <i className="fi fi-sr-heart w-5 h-5 text-primaryButton"></i>
              <span className="text-gray-600">Wall of love</span>
            </div>
            <h2 className="font-custom text-4xl font-bold text-gray-900 mb-4">
              Feedback From Those {"We've"}<br />
              Shared Experiences With
            </h2>
            
            {/* Filter Buttons */}
            <div className="flex justify-center gap-4 mt-8">
              <button
                id=""
                type="button"
                onClick={() => {
                  setTesti(() => {
                    return testimonials
                  })
                }}
                className="px-6 py-2 bg-primaryButton text-white rounded-full"
              >
                All(98)
              </button>
              <button
                id=""
                onClick={() => {
                  setTesti(() => {
                    return testimonials?.filter((te: any) => te.type === "Media Owner")
                  })
                }}
                type="button"className="px-6 py-2 bg-gray-100 text-gray-600 rounded-full hover:bg-gray-200"
              >
                Media Owner
              </button>
              <button
                id=""
                type="button"
                onClick={() => {
                  setTesti(() => {
                    return testimonials?.filter((te: any) => te.type === "Advertiser")
                  })
                }}
                className="px-6 py-2 bg-gray-100 text-gray-600 rounded-full hover:bg-gray-200"
              >
                Advertiser
              </button>
              <button
                id=""
                type="button"
                onClick={() => {
                  setTesti(() => {
                    return testimonials?.filter((te: any) => te.type === "Data Heroes")
                  })
                }}
                className="px-6 py-2 bg-gray-100 text-gray-600 rounded-full hover:bg-gray-200"
              >
                Data Heroes
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 animate-slide-left px-4">
            {testi.slice(0, 8).map((testimonial: any) => (
              <div key={testimonial.id} className="bg-white rounded-xl p-6 shadow-lg">
                {/* User Info */}
                <div className="flex items-center gap-3 mb-4">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <h3 className="font-semibold text-gray-900">{testimonial.name}</h3>
                    <p className="text-sm text-gray-500">{testimonial.role}</p>
                  </div>
                </div>

                {/* Rating */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <i key={i} className="fi fi-sr-star w-5 h-5 text-primaryButton"></i>
                    ))}
                  </div>
                  <span className="text-sm text-gray-500">{testimonial.date}</span>
                </div>

                {/* Content */}
                <h4 className="font-semibold text-gray-900 mb-2">{testimonial.comment}</h4>
                <p className="text-gray-600 mb-4">{testimonial.description}</p>
                
                {/* Experience Date */}
                <p className="text-sm text-gray-400">
                  Date of experience: {testimonial.experienceDate}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    // <div className="px-4 w-full">
    //   <div className="bg-gradient-to-b from-[#F3FAFF] to-[#FFFFFF] py-8 px-4 md:py-16 lg:px-16 rounded-[21px]">
    //     {/* Section Header */}
    //     <div className="flex gap-2 items-center mb-4">
    //       <i className="fi fi-sr-heart lg:text-[14px] text-[12px] text-primaryButton"></i>
    //       <h2 className="lg:text-[14px] text-[12px] text-[#183246]">{title}</h2>
    //     </div>

    //     {/* Title and Description */}
    //     <h1 className="text-[24px] md:text-[32px] lg:text-[48px] font-semibold text-[#183246] leading-[32px] md:leading-[42px] lg:leading-[55.2px] tracking-[-0.03em] mb-4">
    //       {sectionDescription}
    //     </h1>
    //     <p className="text-[12px] md:text-[14px] lg:text-[16px] text-[#4B5563] font-normal leading-[20px] md:leading-[22px] lg:leading-[24px]">
    //       Hopeful and confident, he overcame shyness and found happiness in
    //       life, embracing joy without hesitation.
    //     </p>

    //     {/* Testimonial Content */}
    //     <div className="mt-8 flex flex-col lg:flex-row gap-4 lg:gap-8 items-center">
    //       {/* Testimonial Image */}
    //       <img
    //         src={image}
    //         alt="Testimonial Visual"
    //         className="h-[200px] w-full md:h-[260px] md:w-[373px] object-cover rounded-md"
    //       />

    //       {/* Testimonial Text */}
    //       <div className="w-full md:w-[630px] h-auto flex flex-col">
    //         {/* Quotation Mark Icon */}
    //         <img
    //           src={quotes}
    //           alt="Quotes"
    //           className="h-8 w-8 mb-4 bg-[#129BFF] mask mask-image "
    //         />

    //         {/* Quote Content */}
    //         <p className="text-[16px] md:text-[20px] lg:text-[24px] text-[#254354] font-normal leading-[24px] md:leading-[30px] lg:leading-[34px] tracking-[-0.02em]">
    //           {quote}
    //         </p>

    //         {/* Author Info */}
    //         <p className="text-[16px] md:text-[18px] lg:text-[20px] text-[#254354] font-bold leading-[24px] mt-2">
    //           {author}
    //         </p>
    //         <p className="text-[14px] md:text-[16px] text-[#688799] font-normal leading-[19.36px] w-full lg:w-[269px]">
    //           {position}
    //         </p>

    //         {/* Pagination and Navigation */}
    //         <div className="flex justify-between items-center mt-4">
    //           {/* Page Counter */}
    //           <p className="text-[14px] md:text-[16px] text-[#5A5A5A] font-normal">
    //             <span className="text-[#129BFF]">
    //               {String(currentIndex + 1).padStart(2, "0")}
    //             </span>{" "}
    //             / {String(totalTestimonials).padStart(2, "0")}
    //           </p>

    //           {/* Navigation Arrows */}
    //           <div className="flex gap-4 items-center">
    //             <button onClick={handlePrev} aria-label="Previous">
    //               <i className="fi fi-rr-arrow-small-left text-[#8E8E8E]"></i>
    //             </button>
    //             <button onClick={handleNext} aria-label="Next">
    //               <i className="fi fi-rr-arrow-small-right"></i>
    //             </button>
    //           </div>
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // </div>
  );
};

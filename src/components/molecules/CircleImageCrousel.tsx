import React, { useState } from "react";
import quotes from "../../assets/icons/quotes.png";

interface CarouselProps {
  images: string[];
}

export const CircleImageCarousel: React.FC<CarouselProps> = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <div className="relative w-full mx-auto overflow-hidden p-2 w-[1144px]">
      {/* Carousel Wrapper */}
      <div className="flex items-center justify-center p-4 ">
        {/* Arrows */}
        <button
          onClick={handlePrevious}
          className="absolute left-0 h-8 w-8 z-10 border border-gray-100 text-gray-700 p-1 rounded-full shadow-md hover:bg-primaryButton focus:outline-none focus:ring"
        >
          &#10094;
        </button>
        <div className="flex space-x-4 relative p-2 px-8">
          {images.map((image, index) => {
            const position =
              (index - currentIndex + images.length) % images.length;
            let scale = "scale-75";
            let opacity = "opacity-70 grayscale";
            let zIndex = "z-0";

            // Center image styles
            if (position === 0) {
              scale = "scale-125";
              opacity = "opacity-100";
              zIndex = "z-10";
            }

            return (
              <div
                key={index}
                className={`relative transform transition-all duration-500 ${scale} ${opacity} ${zIndex}`}
              >
                <img
                  src={image}
                  alt={`Image ${index + 1}`}
                  className="w-auto h-auto mx-h-[114px] max-w-[114px] object-cover rounded-full shadow-lg"
                />
              </div>
            );
          })}
        </div>
        <button
          onClick={handleNext}
          className="absolute right-0 h-8 w-8 z-10 border border-gray-100 text-gray-700 p-1 rounded-full shadow-md hover:bg-primaryButton focus:outline-none focus:ring"
        >
          &#10095;
        </button>
      </div>
      <div className="flex items-end justify-center gap-4 py-8">
        <div className="flex flex-col items-center">
          <img
            className="h-8 w-8 bg-blue-500 mask mask-image"
            src={quotes}
            alt={"quotes"}
          />
          <h1 className="lg:text-[24px] text-[18px] font-bold">
            Mr. Vinay Talwar,
          </h1>
          <p className="lg:text-[16px] text-[12px]">Brand Marketing</p>
        </div>
        <div className="flex items-end justify-center w-3/4">
          <p className="lg:text-[20px] text-[20px] text-wrap">
            Being a tech company, we believe in everything which can demonstrate
            measurability. Prooh practices are extremely fresh and delivers the
            assurances around accountability.
          </p>
        </div>
      </div>
    </div>
  );
};

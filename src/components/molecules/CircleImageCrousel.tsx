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
    <div className="relative mx-auto overflow-hidden w-full max-w-screen-lg p-4">
      {/* Carousel Section */}
      <div className="flex items-center justify-center relative">
        {/* Previous Button */}
        <button
          onClick={handlePrevious}
          className="absolute left-0 h-8 w-8 z-10 border border-gray-100 text-gray-700 p-1 rounded-full shadow-md hover:bg-primaryButton focus:outline-none focus:ring"
        >
          &#10094;
        </button>

        {/* Image Carousel */}
        <div className="flex space-x-4 p-4 overflow-hidden">
          {images.map((image, index) => {
            const position =
              (index - currentIndex + images.length) % images.length;
            const isActive = position === 0;

            return (
              <div
                key={index}
                className={`transform transition-all duration-500 ${
                  isActive
                    ? "scale-110 z-10 opacity-100"
                    : "scale-75 opacity-50"
                }`}
              >
                <img
                  src={image}
                  alt={`Carousel Image ${index + 1}`}
                  className="w-24 h-24 lg:w-28 lg:h-28 object-cover rounded-full shadow-lg"
                />
              </div>
            );
          })}
        </div>

        {/* Next Button */}
        <button
          onClick={handleNext}
          aria-label="Next Slide"
          className="absolute right-0 h-8 w-8 z-10 border border-gray-300 text-gray-700 p-1 rounded-full shadow-md hover:bg-blue-500 hover:text-white focus:outline-none focus:ring"
        >
          &#10095;
        </button>
      </div>

      {/* Testimonial Section */}
      <div className="flex flex-col lg:flex-row items-center justify-center gap-8 py-8">
        <figure className="flex flex-col items-center text-center">
          <img
            src={quotes}
            alt="Quotes Icon"
            className="h-8 w-8 mb-4 bg-blue-500 mask mask-image"
          />
          <figcaption className="text-lg lg:text-xl font-bold">
            Mr. Vinay Talwar
          </figcaption>
          <p className="text-sm lg:text-md text-gray-600">Brand Marketing</p>
        </figure>
        <blockquote className="lg:w-3/4 text-center lg:text-left text-gray-700 text-md lg:text-lg">
          {` Being a tech company, we believe in everything which can demonstrate
          measurability. Prooh practices are extremely fresh and deliver the
          assurances around accountability.`}
        </blockquote>
      </div>
    </div>
  );
};

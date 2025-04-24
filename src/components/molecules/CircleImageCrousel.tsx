import React, { useEffect, useState } from "react";
import quotes from "../../assets/icons/quotes.png";

interface CarouselProps {
  image: string;
  name: string;
  position: string;
  aboutMe: string;
}

interface Users {
  heroData: CarouselProps[];
}

export const CircleImageCarousel: React.FC<Users> = ({ heroData }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const [imagesToShow, setImagesToShow] = useState(9); // Default to 9 for laptop view

  // Update imagesToShow based on screen size
  useEffect(() => {
    const updateImagesToShow = () => {
      if (window.innerWidth < 768) {
        // Mobile view
        setImagesToShow(4);
      } else {
        // Laptop or larger
        setImagesToShow(9);
      }
    };

    updateImagesToShow(); // Initial check
    window.addEventListener("resize", updateImagesToShow);

    return () => {
      window.removeEventListener("resize", updateImagesToShow); // Cleanup
    };
  }, []);

  // Handle previous button click
  const handlePrevious = () => {
    if (currentIndex != 0)
      setCurrentIndex((prevIndex) => (prevIndex === 0 ? 0 : prevIndex - 1));
  };

  // Handle next button click
  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === heroData.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <div className="relative mx-auto overflow-hidden w-full max-w-screen-lg p-4">
      {/* Carousel Section */}
      <div className="flex items-center justify-center relative">
        {/* Previous Button */}
        <button
          onClick={handlePrevious}
          className="absolute left-0 h-8 w-8 z-10 border border-gray-100 text-gray-700 p-1 rounded-full shadow-md hover:bg-primaryButton hover:text-[#FFFFFF] focus:outline-none focus:ring"
        >
          &#10094;
        </button>

        {/* Image Carousel */}
        <div className="flex space-x-4 p-4 overflow-hidden items-center">
          {heroData
            .slice(currentIndex, currentIndex + imagesToShow)
            .map((singleData: CarouselProps, index: number) => {
              const absoluteIndex = (currentIndex + index) % heroData.length;
              const isActive = absoluteIndex === currentIndex;
              return (
                <div key={index}>
                  <div
                    key={index}
                    className={`transform transition-all duration-500 ${
                      isActive ? "scale-110 z-10 opacity-100" : ""
                    }`}
                  >
                    <img
                      src={singleData?.image}
                      alt={`Carousel Image ${index + 1}`}
                      className={`w-[72px] h-[72px] lg:w-[84px] lg:h-[84px] object-cover rounded-[100%] ${
                        isActive ? "filter-none" : "filter grayscale"
                      }`}
                      loading="lazy"
                    />
                  </div>
                  {isActive && (
                    <div className="h-[11px] w-[80px] rounded-[100%] bg-[#B7CBD7] mt-4"></div>
                  )}
                </div>
              );
            })}
        </div>

        {/* Next Button */}
        <button
          onClick={handleNext}
          aria-label="Next Slide"
          className="absolute right-0 h-8 w-8 z-10 border border-gray-100 text-gray-700 p-1 rounded-full shadow-md hover:bg-primaryButton hover:text-[#FFFFFF] focus:outline-none focus:ring"
        >
          &#10095;
        </button>
      </div>

      {/* Testimonial Section */}
      <div className="flex flex-col lg:flex-row items-center justify-center gap-8 pb-4 bg-[#F9FDFF] mt-8 rounded-[38px]">
        <figure className="flex flex-col items-center text-center p-0 m-0">
          <img
            src={quotes}
            alt="Quotes Icon"
            className="h-8 w-8 mt-[-20px]bg-[#129BFF] mask mask-image"
          />
          <figcaption className="text-lg lg:text-xl font-bold">
            {heroData[currentIndex]?.name}
          </figcaption>
          <p className="text-sm lg:text-md text-gray-600">
            {heroData[currentIndex]?.position}
          </p>
        </figure>
        <blockquote className="lg:w-3/4 lg:text-left text-gray-700 text-md lg:text-lg mt-4">
          {heroData[currentIndex]?.aboutMe}
        </blockquote>
      </div>
    </div>
  );
};

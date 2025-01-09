import React, { useState, useEffect } from "react";

interface CarouselProps {
  images: any[];
}

export const RightSideArrowsImageCarousel: React.FC<CarouselProps> = ({
  images,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

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

  useEffect(() => {
    if (isPaused) return;

    const autoScroll = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 3000); // Change slide every 3 seconds

    return () => clearInterval(autoScroll);
  }, [isPaused, images.length]);

  return (
    <div
      className="relative w-full mx-auto overflow-hidden"
      onMouseEnter={() => setIsPaused(true)} // Pause on mouse enter
      onMouseLeave={() => setIsPaused(false)} // Resume on mouse leave
    >
      {/* Carousel Wrapper */}
      <div className="grid grid-cols-12 py-8">
        {/* Images and Arrows */}
        <div className="col-span-11 flex items-center space-x-4">
          {images.map((image, index) => {
            // Determine the position of the image relative to the current index
            const position =
              (index - currentIndex + images.length) % images.length;

            // Only display the images that should be visible
            if (position < 0 || position > 2) return null;

            return (
              <div
                key={index}
                className={`relative transform transition-all duration-500 ease-in-out ${
                  position === 0
                    ? "scale-100 opacity-100 z-10"
                    : "scale-95 opacity-70 grayscale z-0"
                }`}
              >
                <img
                  src={image.image}
                  alt={`Image ${index + 1}`}
                  className="w-[250px] sm:w-[300px] lg:w-[320px] h-auto md:h-[320px] object-cover rounded-[32px] shadow-lg"
                />
                <h1 className="lg:text-[16px] text-[12px] font-semibold text-[#254354] flex justify-center pt-2">
                  {image.name}
                </h1>
                <p className="lg:text-[16px] text-[12px] text-[#75848D] flex justify-center text-wrap pb-2 truncate">
                  {image.role}
                </p>
              </div>
            );
          })}
        </div>
        {/* Navigation Arrows */}
        <div className="absolute right-0 top-1/2 transform -translate-y-1/2 flex items-center gap-8 h-full">
          <button
            onClick={handlePrevious}
            className="h-8 w-8 z-10 border border-gray-100 text-[#129BFF] p-1 rounded-full shadow-md hover:bg-primaryButton focus:outline-none focus:ring"
          >
            &#10094;
          </button>
          <button
            onClick={handleNext}
            className="h-8 w-8 z-10 border border-gray-100 text-[#129BFF] p-1 rounded-full shadow-md hover:bg-primaryButton focus:outline-none focus:ring"
          >
            &#10095;
          </button>
        </div>
      </div>
    </div>
  );
};

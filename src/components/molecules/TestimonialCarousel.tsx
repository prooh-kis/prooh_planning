import React, { useState, useEffect } from 'react';

interface CarouselProps {
  images: string[]; // Array of image URLs
}

export const TestimonialCarousel: React.FC<CarouselProps> = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(1); // Start from the first "real" image
  const [isPaused, setIsPaused] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Extend images array with clones for smooth looping
  const extendedImages = [
    images[images.length - 1], // Clone the last image
    ...images,
    images[0], // Clone the first image
  ];

  const handlePrevious = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex((prevIndex) => prevIndex - 1);
  };

  const handleNext = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex((prevIndex) => prevIndex + 1);
  };

  // Auto-scroll effect
  useEffect(() => {
    if (isPaused) return;

    const autoScroll = setInterval(() => {
      handleNext();
    }, 3000); // Change slide every 3 seconds

    return () => clearInterval(autoScroll);
  }, [isPaused]);

  // Handle the wrap-around effect
  useEffect(() => {
    if (!isTransitioning) return;

    const transitionEnd = setTimeout(() => {
      setIsTransitioning(false);
      if (currentIndex === 0) {
        setCurrentIndex(images.length);
      } else if (currentIndex === extendedImages.length - 1) {
        setCurrentIndex(1);
      }
    }, 500); // Match the CSS transition duration

    return () => clearTimeout(transitionEnd);
  }, [currentIndex, isTransitioning, images.length, extendedImages.length]);

  return (
    <div
      className="relative w-full h-full overflow-hidden"
      onMouseEnter={() => setIsPaused(true)} // Pause on mouse enter
      onMouseLeave={() => setIsPaused(false)} // Resume on mouse leave
    >
      {/* Carousel Wrapper */}
      <div
        className="flex transition-transform duration-500 ease-in-out h-full"
        style={{
          transform: `translateX(-${currentIndex * 100}%)`, // Slide effect
          // width: `${extendedImages.length * 100}%`, // Dynamic width for all images
          width: `100%`
        }}
      >
        {extendedImages.map((image, index) => (
          <div
            key={index}
            className="flex-shrink-0 flex justify-center items-center w-full h-full"
          >
            <img
              src={image}
              alt={`Image ${index}`}
              className="object-contain rounded-[12px] shadow-lg max-h-full max-w-full"
            />
          </div>
        ))}
      </div>
      {/* Navigation Arrows */}
      <button
        onClick={handlePrevious}
        className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-100 text-gray-500 p-2 rounded-full z-10"
      >
        &#10094;
      </button>
      <button
        onClick={handleNext}
        className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-100 text-gray-500 p-2 rounded-full z-10"
      >
        &#10095;
      </button>
    </div>
  );
};

import React, { useState } from 'react';

interface ImageCarouselProps {
  images: string[];
  imagesToShow: number; // Number of images to display at once
  slideDuration?: number; // Duration in seconds for one full sliding loop
}

export const ImageCarousel: React.FC<ImageCarouselProps> = ({
  images,
  imagesToShow,
  slideDuration = 30, // Default sliding duration in seconds for a full loop
}) => {
  const [isHovered, setIsHovered] = useState(false); // State to track hover
  const [currentIndex, setCurrentIndex] = useState(0); // State for current image index

  // Duplicate the images array to create the infinite loop effect
  const duplicatedImages = [...images, ...images];

  // Calculate the width of each image based on imagesToShow
  const imageWidth = 100 / imagesToShow;

  // Function to handle mouse move and update current index
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isHovered) return; // Only process if hovered

    const carouselRect = e.currentTarget.getBoundingClientRect();
    const mouseX = e.clientX - carouselRect.left; // Get mouse X position relative to carousel
    const index = Math.floor((mouseX / carouselRect.width) * duplicatedImages.length);
    setCurrentIndex(index % images.length); // Set the current index, ensuring it wraps around
  };

  return (
    <div
      className="relative w-full overflow-hidden py-2"
      onMouseEnter={() => setIsHovered(true)} // Stop on hover
      onMouseLeave={() => setIsHovered(false)} // Resume sliding when not hovered
      onMouseMove={handleMouseMove} // Update index on mouse move
    >
      <div
        className="flex justify-around gap-4 py-1"
        style={{
          animation: `${isHovered ? 'none' : `slide-left ${slideDuration}s linear infinite`}`,
          width: `${(duplicatedImages.length * 100) / imagesToShow}%`,
          transform: `translateX(-${currentIndex * imageWidth}%)`, // Adjust position based on current index
        }}
      >
        {duplicatedImages.map((image, index) => (
          <div
            key={index}
            className="flex-shrink-0 px-2"
            style={{ width: `${imageWidth/4}%` }}
          >
            <img
              src={image}
              alt={`Slide ${index}`}
              className="w-full h-8 object-fit" // Adjust height here
            />
          </div>
        ))}
      </div>

      {/* Use a <style> tag with regular CSS syntax */}
      <style>
        {`
          @keyframes slide-left {
            0% {
              transform: translateX(0);
            }
            100% {
              transform: translateX(-50%);
            }
          }
        `}
      </style>
    </div>
  );
};

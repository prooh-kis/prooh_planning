import { Carousel } from "antd";
import React, { memo, useRef } from "react";

interface Props {
  images: string[];
  showThumbnails?: boolean;
}

const MyCarousel = ({ images, showThumbnails = true }: Props) => {
  const carouselRef = useRef<any>(null);

  const handleThumbnailClick = (index: number) => {
    if (carouselRef.current) {
      carouselRef.current.goTo(index, true);
    }
  };

  return (
    <div className="w-full">
      {/* Main Carousel */}
      <Carousel
        ref={carouselRef}
        effect="fade"
        arrows
        autoplay
        autoplaySpeed={3000}
        infinite
        className="rounded-md"
      >
        {images.map((image, index) => (
          <div key={index}>
            {image.endsWith(".mp4") ? (
              <video
                src={image}
                className="h-auto w-full object-cover rounded-md"
                controls
              />
            ) : (
              <img
                src={image}
                alt={`carousel-img-${index}`}
                className="h-auto w-full object-cover rounded-md"
              />
            )}
          </div>
        ))}
      </Carousel>

      {/* Thumbnails */}
      {showThumbnails && (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-2 mt-4">
          {images.map((image, index) => (
            <div
              key={index}
              className="cursor-pointer rounded-md overflow-hidden border border-gray-200 hover:border-[#129BFF]"
              onClick={() => handleThumbnailClick(index)}
            >
              {image.endsWith(".mp4") ? (
                <video
                  src={image}
                  className="h-full w-full object-cover"
                  muted
                />
              ) : (
                <img
                  src={image}
                  alt={`thumbnail-${index}`}
                  className="h-full w-full object-cover"
                />
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export const CarouselImageView = memo(MyCarousel);

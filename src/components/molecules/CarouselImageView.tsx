import { Carousel } from "antd";
import React, { memo, useRef, useState } from "react";

interface Props {
  images: string[];
  showThumbnails?: any;
}

const MyCarousel = ({ images, showThumbnails=true }: Props) => {
  const carouselRef = useRef<any>(null);
  const onChange = (currentSlide: any) => {
  };

  const handleThumbnailClick = (index: any) => {
    if (carouselRef.current) {
      carouselRef.current.goTo(index, true);
    }
  }
  return (
    <div className="w-full">
      <Carousel ref={carouselRef} effect={"fade"} arrows autoplay autoplaySpeed={2000} infinite={true} afterChange={onChange}>
        {images.map((image, index) => (
          <div key={index}>
            {image.split(".")[image.split(".")?.length - 1] === "mp4" ? (
              <video
                src={image}
                className="h-auto w-full object-fill rounded-md"
                controls={true}
              />
            ) : (
              <img
                src={image}
                alt=""
                className="h-auto w-full object-fill rounded-md"
              />
            )}

          </div>
        ))}
      </Carousel>
      {showThumbnails && (
        <div className="py-2 grid grid-cols-3 gap-2">
          {images?.map((image, index) => (
            <div className="col-span-1" key={index}
              onClick={() => {
                handleThumbnailClick(index);
              }}
            >
              {image?.split(".")[image.split(".")?.length - 1] !== "mp4" ? (
                <img
                  src={image}
                  alt=""
                  className="rounded h-full w-full object-fill"
                />
              ) : (
                <video
                  src={image}
                  className="rounded h-full w-full object-fill"
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

import { Carousel } from "antd";
import React, { memo } from "react";

interface Props {
  images: string[];
}

const myFunction = ({ images }: Props) => {
  console.log("images : ", images);
  const onChange = (currentSlide: any) => {
    console.log(currentSlide);
  };
  return (
    <Carousel afterChange={onChange}>
      {images.map((image) => (
        <img src={image} alt="" className="h-[48vh] w-full rounded-md" />
      ))}
    </Carousel>
  );
};

export const CarouselImageView = memo(myFunction);

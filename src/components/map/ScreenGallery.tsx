import React, {FunctionComponent, useState} from 'react';

import {ListingDetails} from './types';
import clsx from 'clsx';

interface Props {
  images: string[];
  isExtended: boolean;
  details: ListingDetails;
}

export const ScreenGallery: FunctionComponent<Props> = ({
  images,
  isExtended = false,
  details,
}) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleBack = (event: any) => {
    event.stopPropagation();
    if (currentImageIndex > 0) {
      setCurrentImageIndex(currentImageIndex - 1);
    }
  };

  const handleNext = (event: any) => {
    event.stopPropagation();
    if (currentImageIndex < images?.length - 1) {
      setCurrentImageIndex(currentImageIndex + 1);
    }
  };

  return (
    <div className={clsx(
      'relative w-full h-full',
      isExtended && 'opacity-100 visible'
    )}>
      <img className="w-full h-full" src={images?.[currentImageIndex]} alt="Real estate listing photo" />

      <div className={clsx(
        'absolute inset-0 flex flex-col justify-end items-center opacity-0 invisible p-4 transition-opacity',
        isExtended && 'opacity-100 visible'
      )}>
        <div className="flex justify-between w-full transform translate-y-1/2">
          <button
            className="p-2 bg-white text-[#22C55E] shadow-md disabled:opacity-0 flex items-center gap-2 transition-opacity"
            onClick={handleBack}
            disabled={currentImageIndex === 0}
          >
            <span className="material-symbols-outlined">chevron_left</span>
          </button>
          <button
            className="p-2 bg-white text-[#22C55E] shadow-md disabled:opacity-0 flex items-center gap-2 transition-opacity"
            onClick={handleNext}
            disabled={currentImageIndex === images?.length - 1}>
            <span className="material-symbols-outlined">chevron_right</span>
          </button>
        </div>
        <div className="flex mt-2">
          {images?.map((_, index) => (
            <span
              key={index}
              className={clsx(
                'cursor-pointer h-2 w-2 mx-1 bg-white bg-opacity-60 rounded-full transition-colors',
                index === currentImageIndex && 'bg-white'
              )}></span>
          ))}
        </div>
      </div>
    </div>
  );
};

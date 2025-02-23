import React, {FunctionComponent, useState} from 'react';
import {AdvancedMarker} from '@vis.gl/react-google-maps';
import classNames from 'classnames';

import {ScreenListingDetails} from './ScreenListingDetails';
import {ScreenGallery} from './ScreenGallery';

import {ScreenListing} from './types';

import { SelectedMarkerIcon } from './SelectedMarkerIcon';
import clsx from 'clsx';

interface Props {
  screenListing?: ScreenListing;
  marker?: any;
}

export const CustomAdvancedMarker: FunctionComponent<Props> = ({
  marker
}) => {
  const [clicked, setClicked] = useState(false);
  const [hovered, setHovered] = useState(false);
  const position = {
    lat: marker.lat,
    lng: marker.lng
  };

  const renderCustomPin = () => {
    return (
      <div className="">
        <div className={clsx(
            'relative flex items-center justify-center p-1 rounded-full transition-all',
            {
              'h-[34px] w-[34px] max-w-[34px] bg-[#3B82F6]': !clicked,
              'h-[80px] w-[80px] max-w-[80px] bg-[#3B82F6]': hovered,
              'h-[317px] max-w-[650px] bg-[#3B82F6] rounded-none': clicked,
            }
          )}>
          <button className={clsx(
              'absolute top-2 right-2 p-2 text-[#3B82F6] hidden',
              { 'flex': clicked }
            )}>
            <span className="material-symbols-outlined !visible !opacity-100"> close </span>
          </button>

          <div className="relative flex items-center justify-center w-full h-full max-w-[285px] bg-cover overflow-hidden transition-opacity">
            <ScreenGallery
              images={marker.images}
              isExtended={clicked}
              details={{property_type: ""}}
            />
            <span className={clsx('absolute transition-opacity', { 'opacity-0': clicked || hovered })}>
              <SelectedMarkerIcon />
              {/* <i className="fi fi-sr-marker text-[#8B5CF6] text-[24px]"></i> */}

            </span>
          </div>
          <ScreenListingDetails details={marker?.details} />
        </div>

        <div className={clsx(
            'absolute bottom-0 left-1/2 w-0 h-0 border-[8px] border-solid border-[#3B82F6] transform -translate-x-1/2 rotate-45 transition-transform',
            {
              'scale-125': hovered || clicked,
            }
          )}/>
      </div>
    );
  };

  return (
    <>
      <AdvancedMarker
        position={position}
        title={'AdvancedMarker with custom html content.'}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className="cursor-pointer relative transition-transform"
        onClick={() => setClicked(!clicked)}>
        {renderCustomPin()}
      </AdvancedMarker>
    </>
  );
};
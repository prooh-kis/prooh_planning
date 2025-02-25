import React, {FunctionComponent} from 'react';

import {ListingDetails} from './types';

interface Props {
  details: ListingDetails;
}

export const ScreenListingDetails: FunctionComponent<Props> = ({
  details
}) => {
  const {
    property_type
  } = details;

  return (
    <div className="bg-white h-full max-w-full rounded-r-lg p-6 opacity-0 invisible transition-opacity">
      <div className="flex flex-col justify-center gap-4 h-full">
        <h2 className="text-[#FFFFFF] text-xl font-bold leading-7 tracking-wide m-0">{property_type}</h2>
      </div>
    </div>
  );
};
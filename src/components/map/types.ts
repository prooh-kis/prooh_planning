export interface ScreenListing {
  uuid: string;
  details?: ListingDetails;
  images: string[];
  isExtended?: boolean;
}

export interface ListingDetails {
  property_type: string;
}
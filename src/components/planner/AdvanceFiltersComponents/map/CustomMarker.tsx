import React, {FunctionComponent, useState} from 'react';
import {AdvancedMarker, InfoWindow, useAdvancedMarkerRef} from '@vis.gl/react-google-maps';


interface Props {
  key?: any;
  markerData?: any;
  color?: any;
  size?: any;
  action?: any;
  screenData?: any;
}

export const CustomAdvancedMarker: FunctionComponent<Props> = ({
  key,
  markerData,
  color,
  size,
  action,
  screenData,
}) => {
  const [clicked, setClicked] = useState(false);
  const [hovered, setHovered] = useState(false);
  const position = {
    lat: markerData.lat,
    lng: markerData.lng
  };
  const [markerRef, marker] = useAdvancedMarkerRef();

  const renderCustomPin = () => {
    return (
      <div>
        <div className={`h-full w-full rounded-full`}>
          {hovered && (
            <h1>{markerData?.screenType}</h1>
          )}
          <i className={`
            ${hovered ? `${markerData?.screenType === "Spectacular" ? "fi fi-sr-circle-i text-[36px]" : 
              markerData?.screenType === "Large" ? "fi fi-sr-circle-l text-[32px]" : "fi fi-sr-circle-s text-[28px]"} `: 
              `${markerData?.screenType === "Spectacular" ? "fi fi-ss-circle text-[32px]" : 
              markerData?.screenType === "Large" ? "fi fi-ss-circle text-[28px]" : "fi fi-ss-circle text-[24px]"} `}
            flex items-center justify-center text-[${color}]`}></i>
        </div>  
      </div>
      
    );
  };

  return (
    <div className="flex justify-center">
      <AdvancedMarker
        key={key}
        ref={markerRef}
        position={position}
        title={'AdvancedMarker with custom html content.'}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className="cursor-pointer relative transition-transform"
        onClick={() => {
          action(markerData);
          setClicked(!clicked);
        }}>
        {renderCustomPin()}
        {screenData && ((screenData?.lat === markerData?.lat) && (screenData?.lng === markerData?.lng)) && (
          <InfoWindow
            anchor={marker}
            position={{lat: screenData?.lat, lng: screenData?.lng}}
            onCloseClick={() => {
              // setScreenData(null);
            }}
            // headerContent={<h3>Screen Detail</h3>}
            minWidth={250}
            maxWidth={400}
            headerDisabled={true}
            style={{ borderRadius: "8px", paddingRight: "6px", paddingLeft: "-18px", marginRight: "6px" }}
            className="flex items-cente justify-center"
          >
            <div className="flex justify-center items-center">
              <div style={{ textAlign: 'center', maxWidth: '240px' }}>
                <img
                  src={screenData.images[0]}
                  alt={screenData.name}
                  style={{ width: '100%', borderRadius: '8px' }}
                />
                <div className="flex flex-col justify-center items-center gap-1 p-2">
                  <h1 className="text-[14px] font-semibold truncate w-full">
                    {screenData.name}
                  </h1>
                  <h1 className="text-[12px] truncate w-full">
                    {screenData?.details.address}, {screenData?.details?.city}
                  </h1>
                </div>
              </div>
            </div>
          </InfoWindow>

        )}
      </AdvancedMarker>
      
    </div>
  );
};
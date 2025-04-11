import React, { FunctionComponent, useState } from "react";
import { AdvancedMarker } from "@vis.gl/react-google-maps";
import { LinearBar } from "../../components/molecules/linearbar";

interface Props {
  marker?: any;
  color?: any;
  size?: any;
  action?: any;
}

export const NewCustomMarker: FunctionComponent<Props> = ({
  marker,
  color,
  size,
  action,
}) => {
  const [clicked, setClicked] = useState(false);
  const [hovered, setHovered] = useState(false);
  const position = {
    lat: marker.lat,
    lng: marker.lng,
  };

  const renderCustomPin = (marker: any) => {
    const getPercentage = (delivered: number, promised: number) => {
      return ((delivered / promised) * 100).toFixed(0);
    };
    return (
      <div>
        <div className={`h-full w-[105px] rounded-full`}>
          <div className="p-2 bg-[#FFFFFF] rounded-[8px]">
            {/* hardware performance not Completed */}
            <div className="flex justify-between gap-1 items-center">
              <LinearBar
                value={marker?.slotsDelivered}
                colors={["#BDC8FF", "#6982FF"]}
                highest={marker?.slotsPromised}
                percent={false}
              />
              <p>
                {getPercentage(marker?.slotsDelivered, marker?.slotsPromised)}%
              </p>
            </div>
            <div className="flex justify-between gap-1 items-center">
              <LinearBar
                value={marker?.slotsDelivered}
                colors={["#FFC3C3", "#FF0000"]}
                highest={marker?.slotsPromisedTillDate}
                percent={false}
              />
              <p>
                {getPercentage(
                  marker?.slotsDelivered,
                  marker?.slotsPromisedTillDate
                )}
                %
              </p>
            </div>
            <div className="flex justify-between gap-1 items-center">
              <LinearBar
                value={marker?.slotsDeliveredToday}
                colors={["#FFF2C3", "#FFDB5D"]}
                highest={marker?.slotsPromisedToday}
                percent={false}
              />
              <p>
                {getPercentage(
                  marker?.slotsDeliveredToday,
                  marker?.slotsPromisedToday
                )}
                %
              </p>
            </div>
          </div>
          <i
            className={`
            ${
              marker?.screenType === "Spectacular"
                ? "fi fi-ss-circle text-[32px]"
                : marker?.screenType === "Large"
                ? "fi fi-ss-circle text-[28px]"
                : "fi fi-ss-circle text-[24px]"
            }
            flex items-center justify-center text-[${color}]`}
          ></i>
        </div>
      </div>
    );
  };

  return (
    <>
      <AdvancedMarker
        position={position}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className="cursor-pointer relative transition-transform"
        onClick={() => {
          action(marker);
          console.log(marker);
          setClicked(!clicked);
        }}
      >
        {renderCustomPin(marker)}
      </AdvancedMarker>
    </>
  );
};

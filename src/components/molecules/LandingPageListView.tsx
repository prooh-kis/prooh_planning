import { CheckboxInput } from "../atoms/CheckboxInput";
import { formatNumber } from "../../utils/formatValue";
import React, { useState } from "react";

function Screen({ screen }: any) {
  return (
    <div className="hover:shadow-md px-1 rounded-md">
      <img src={screen?.images[0]} alt="" className="h-36 w-full rounded-md" />
      <div className="py-2 px-1 truncate">
        <h1 className="text-[14px] font-bold truncate ">{screen?.screenName}</h1>
        <h1 className="text-[12px]">
          {screen.location.city}, {screen.location.touchPoint}
        </h1>
        <h1 className="text-[12px]">
          {formatNumber(Number(screen.audiences?.audienceNumbersDayWise?.totalAudienceCount))} Impressions/Month
        </h1>
        <div className="flex justify-between">
          <div className="flex gap-1">
            <h1 className="text-[12px] font-semibold">&#8377;{screen.pricePerSlot} / Slot</h1>
            <i className="fi fi-sr-star flex items-center text-[12px] text-yellow-500"></i>
            <i className="fi fi-sr-star flex items-center text-[12px] text-yellow-500"></i>
          </div>
          <div className="flex items-center">
            {/* <i className="fi fi-sr-add flex items-center text-[12px] text-green-500"></i> */}
            <i className="fi-ss-minus-circle flex items-center text-[12px] text-red-500"></i>

          </div>
        </div>
      </div>

    </div>
  );
}

export function LandingPageListView({ screens, countries, cities, touchPoints }: any) {

  const [screensData, setScreensData] = useState<any>(screens);
  return (
    <div className="grid grid-cols-12 gap-8 py-2">
      <div className="col-span-3 border rounded-[12px] p-3 overflow-y-auto">
        <div className="flex justify-between items-center">
          <h1 className="text-[16px]">Filters</h1>
          <p className="text-[12px]">Clear All</p>
        </div>
        <div className="py-2">
          <h1 className="font-semibold">Country</h1>
          {countries?.map((zone: any, i: any) => (
            <div key={i} className="p-2">
              <CheckboxInput label={`${zone} (${screens?.filter((screen: any) => screen.location.country === zone)?.length})`} />
            </div>
          ))}
        </div>
        <div className="py-2">
          <h1 className="font-semibold">Cities</h1>
          {cities?.map((ct: any, j: any) => (
            <div key={j} className="p-2">
              <CheckboxInput label={`${ct} (${screens?.filter((screen: any) => screen.location.city === ct)?.length})`} />
            </div>
          ))}
        </div>
        <div className="py-2 h-80 overflow-y-auto">
          <h1 className="font-semibold">Touchpoints</h1>
          {touchPoints?.map((tp: any, k: any) => (
            <div key={k} className="p-2">
              <CheckboxInput label={`${tp} (${screens?.filter((screen: any) => screen.location.touchPoint === tp)?.length})`} />
            </div>
          ))}
        </div>
      </div>
      <div className="col-span-9 rounded-[12px] grid grid-cols-12 flex flex-wrap gap-4 overflow-scroll h-[80vh]">
        {screens?.map((screen: any, index: any) => (
          <div key={index} className="col-span-3">
            <Screen screen={screen} />
          </div>
        ))}
      </div>  
    </div>
    
  );
}

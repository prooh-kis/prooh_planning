import { CheckboxInput } from "../../components/atoms/CheckboxInput";
import { formatNumber } from "../../utils/formatValue";
import React from "react";

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
          {formatNumber(screen.impressionPerMonth)} Impressions/Month
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

export function ViewPlanPic({ screens, screenTypes, cityZones, cityTP }: any) {
  return (
    <div className="grid grid-cols-12 gap-8 py-2">
      <div className="col-span-3 border rounded-[12px] p-3 overflow-y-auto">
        <div className="flex justify-between items-center">
          <h1 className="text-[16px]">Filters</h1>
          <p className="text-[12px]">Clear All</p>
        </div>
        <div className="py-2">
          <h1 className="font-semibold">Zone</h1>
          {cityZones?.map((zone: any, i: any) => (
            <div key={i} className="p-2">
              <CheckboxInput label={zone} />
            </div>
          ))}
        </div>
        <div className="py-2">
          <h1 className="font-semibold">Touchpoint</h1>
          {cityTP?.map((tp: any, j: any) => (
            <div key={j} className="p-2">
              <CheckboxInput label={tp} />
            </div>
          ))}
        </div>
        <div className="py-2">
          <h1 className="font-semibold">ScreenType</h1>
          {screenTypes?.map((st: any, k: any) => (
            <div key={k} className="p-2">
              <CheckboxInput label={st} />
            </div>
          ))}
        </div>
      </div>
      <div className="col-span-9 rounded-[12px] grid grid-cols-12 flex flex-wrap gap-4 overflow-scroll h-[60vh]">
        {screens?.map((screen: any, index: any) => (
          <div key={index} className="col-span-3">
            <Screen screen={screen} />
          </div>
        ))}
      </div>  
    </div>
    
  );
}

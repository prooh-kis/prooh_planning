import { CheckboxInput } from "../../components/atoms/CheckboxInput";
import { formatNumber } from "../../utils/formatValue";
import React, { useCallback, useEffect, useState } from "react";

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

  const [zoneFilters, setZoneFilters] = useState<any>(cityZones);
  const [tpFilters, setTpFilters] = useState<any>(cityTP);
  const [stFilters, setStFilters] = useState<any>(screenTypes);

  const filteredScreensData = useCallback(() => {
    let result = screens;
  
    // Filter by zone if zoneFilters has values
    if (zoneFilters.length > 0) {
      result = result?.filter((s: any) => zoneFilters.includes(s.location.zoneOrRegion));
      console.log(result, "zone");
    }
  
    // Filter by touch point if tpFilters has values
    if (tpFilters.length > 0) {
      result = result?.filter((s: any) => tpFilters.includes(s.location.touchPoint));
      console.log(result, "tp");

    }
  
    // Filter by screen type if stFilters has values
    if (stFilters.length > 0) {
      result = result?.filter((s: any) => stFilters.includes(s.screenType));
      console.log(result, "st");

    }
  
    return result;
  }, [screens, zoneFilters, tpFilters, stFilters]);
  
  const handleFilterSelection = ({type, value, checked}: any) => {
    if (type === "zone") {
      if (checked) {
        setZoneFilters((prev: any) => {
          return [
            ...prev, value
          ]
        });
      } else {
        setZoneFilters((prev: any) => {
          return prev.filter((item: any) => item !== value);
        });
      }
    }
    if (type === "tp") {
      if (checked) {
        setTpFilters((prev: any) => {
          return [
            ...prev, value
          ]
        });
      } else {
        setTpFilters((prev: any) => {
          return prev.filter((item: any) => item !== value);
        });
      }
    }
    if (type === "st") {
      if (checked) {
        setStFilters((prev: any) => {
          return [
            ...prev, value
          ]
        });
      } else {
        setStFilters((prev: any) => {
          return prev.filter((item: any) => item !== value);
        });
      }
    }

  }
  console.log(zoneFilters, tpFilters, stFilters);
  useEffect(() => {
  
  },[]);
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
            <div key={i} className="flex items-center justify-between p-2">
              <CheckboxInput
                label={zone}
                checked={zoneFilters?.includes(zone)}
                onChange={(checked) => handleFilterSelection({type: "zone", value: zone, checked})}
              />
              <p className="text-[14px]">({filteredScreensData()?.filter((s: any) => s.location.zoneOrRegion === zone)?.length})</p>
            </div>
          ))}
        </div>
        <div className="py-2">
          <h1 className="font-semibold">Touchpoint</h1>
          {cityTP?.map((tp: any, j: any) => (
            <div key={j} className="lex items-center justify-between p-2">
              <CheckboxInput
                label={tp}
                checked={tpFilters?.includes(tp)}
                onChange={(checked) => handleFilterSelection({type: "tp", value: tp, checked})}
              />
              <p className="text-[14px]">({filteredScreensData()?.filter((s: any) => s.location.touchPoint === tp)?.length})</p>

            </div>
          ))}
        </div>
        <div className="py-2">
          <h1 className="font-semibold">ScreenType</h1>
          {screenTypes?.map((st: any, k: any) => (
            <div key={k} className="lex items-center justify-between p-2">
              <CheckboxInput
                label={st}
                checked={stFilters?.includes(st)}
                onChange={(checked) => handleFilterSelection({type: "st", value: st, checked})}
              />
              <p className="text-[14px]">({filteredScreensData()?.filter((s: any) => s.screenType === st)?.length})</p>
            </div>
          ))}
        </div>
      </div>
      <div className="col-span-9 rounded-[12px] grid grid-cols-12 flex flex-wrap gap-4 overflow-scroll h-[60vh]">
        {filteredScreensData()?.map((screen: any, index: any) => (
          <div key={index} className="col-span-3">
            <Screen screen={screen} />
          </div>
        ))}
      </div>  
    </div>
    
  );
}

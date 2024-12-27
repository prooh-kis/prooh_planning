import { CheckboxInput } from "../atoms/CheckboxInput";
import { formatNumber } from "../../utils/formatValue";
import React, { useCallback, useEffect, useState } from "react";
import { ViewPlanPic } from "../../components/segments/ViewPlanPic";

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

export function LandingPageListView({ screens }: any) {

  const [currentSummaryTab, setCurrentSummaryTab] = useState<any>("1");


  const [priceFilter, setPriceFilter] = useState<any>({
    min: 1,
    max: 300
  });


  const [cityZones, setCityZones] = useState<any>({});
  const [cityTP, setCityTP] = useState<any>({});
  const [screenTypes, setScreenTypes] = useState<any>({});

  const [screensBuyingCount, setScreensBuyingCount] = useState({});

  const handleData = useCallback(
    (myData: any) => {
      if (screens !== undefined) {
        let myData;
        const zones: any = {};
        const tps: any = {};
        const myScreens: any = {};
        const types: any = {};
        const stToggle: any = {};
  
        for (const screen of screens) {
          myScreens[screen.location.city] = {};
          myScreens[screen.location.city][screen.location.touchPoint] = {};
          myScreens[screen.location.city][screen.location.touchPoint][screen.screenType] = {};
          myScreens[screen.location.city][screen.location.touchPoint][screen.screenType][screen.location.zoneOrRegion] = [];
          myScreens[screen.location.city][screen.location.touchPoint][screen.screenType][screen.location.zoneOrRegion]?.push(screen);
        }
  
        myData = myScreens;
  
        for (const city in myScreens) {
          zones[city] = {};
          tps[city] = {};
          types[city] = {};
          stToggle[city] = {};
          for (const tp in myData[city]) {
            tps[city][tp] = {};
            stToggle[city][tp] = {};
            for (const st in myData[city][tp]) {
              tps[city][tp][st] = [];
              types[city][st] = [];
              for (const zone in myData[city][tp][st]) {
                zones[city][zone] = [];
                for (const screen in myData[city][tp][st][zone]) {
                  zones[city][zone].push(
                    myData[city][tp][st][zone][screen]?.screenName
                  );
                  tps[city][tp][st].push(
                    myData[city][tp][st][zone][screen]?.screenName
                  );
                  types[city][st].push(
                    myData[city][tp][st][zone][screen]?.screenName
                  );
                }
              }
            }
          }
        }
  
        // setCurrentCity(Object.keys(data)[Number(currentSummaryTab) - 1]);
        setCityZones(zones);
        setCityTP(tps);
        setScreenTypes(types);
  
        setScreensBuyingCount(myScreens);
  
      }
    },
    [
      currentSummaryTab,
      // data,
      setCityTP,
      setCityZones,
      setScreenTypes,
      setScreensBuyingCount,
    ]
  );

  useEffect(() => {
    if (screens) {
      handleData(screens);

    }
  }, [screens, handleData]);

  const refreshScreenSummary = () => {};

  console.log(currentSummaryTab);
  console.log(screensBuyingCount);
  console.log(cityZones);
  console.log(cityTP);
  console.log(screenTypes);
  console.log(priceFilter);


  return (
    <div className="grid grid-cols-12 gap-8 py-2">
      {/* <ViewPlanPic
        currentSummaryTab={currentSummaryTab}
        screensBuyingCount={screensBuyingCount}
        setScreensBuyingCount={() => {}}
        refreshScreenSummary={refreshScreenSummary}
        cityZones={cityZones}
        cityTP={cityTP}
        screenTypes={screenTypes}
        setCurrentCity={() => {}}
        priceFilter={priceFilter}
        listView={false}
      /> */}
      <div className="col-span-3 border rounded-[12px] p-3 h-[60vh] overflow-y-auto">
        <div className="flex justify-between items-center">
          <h1 className="text-[16px]">Filters</h1>
          <p className="text-[12px]">Clear All</p>
        </div>
        {/* <div className="py-2">
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
        </div> */}
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

import React, { useCallback, useEffect, useState } from "react";
import { TabWithoutIcon } from "../molecules/TabWithoutIcon";
import { ScreenDataModel } from "../../components/popup/ScreenDataModel";
import { getDataFromLocalStorage, saveDataOnLocalStorage } from "../../utils/localStorageUtils";
import { SCREEN_SUMMARY_SELECTION } from "../../constants/localStorageConstants";


export const ScreenSummaryTable = ({
  data,
  currentCity,
  setCurrentCity,
  currentSummaryTab,
  setScreensBuyingCount,
  screensBuyingCount,
  setCityZones,
  cityZones,
  setCityTP,
  cityTP,
  setScreenTypes
}: any) => {

  const handleData = useCallback((myData: any) => {
    const zones: any = {};
    const tps: any = {};
    const screens: any = {}
    const types: any = {};

    for (const city in myData) {
      zones[city] = {};
      tps[city] = {};
      screens[city] = {}
      types[city] = {};
      for (const tp in myData[city]) {
        tps[city][tp] = {};
        for (const st in myData[city][tp]) {
          tps[city][tp][st] = [];
          types[city][st] = []
          for (const zone in myData[city][tp][st]) {
            zones[city][zone] = [];
            for (const screen in myData[city][tp][st][zone]) {
              zones[city][zone].push(myData[city][tp][st][zone][screen]?.screenName);
              tps[city][tp][st].push(myData[city][tp][st][zone][screen]?.screenName);
              types[city][st].push(myData[city][tp][st][zone][screen]?.screenName);

              screens[city][myData[city][tp][st][zone][screen]?._id] = {}
              screens[city][myData[city][tp][st][zone][screen]?._id]["status"] = true
              screens[city][myData[city][tp][st][zone][screen]?._id]["data"] = myData[city][tp][st][zone][screen]
            }
          }
        }
      }
    }

    setCurrentCity(Object.keys(data)[Number(currentSummaryTab) - 1]);
    setCityZones(zones);
    setCityTP(tps);
    setScreenTypes(types);
    setScreensBuyingCount(screens);
    // if (saveDataOnLocalStorage(SCREEN_SUMMARY_SELECTION, screens) === undefined) {
    //   saveDataOnLocalStorage(SCREEN_SUMMARY_SELECTION, screens);
    // }

  }, [currentSummaryTab, data, setCityTP, setCityZones, setCurrentCity, setScreenTypes, setScreensBuyingCount]);

  const handleScreenClick = (myScreen: any) => {
    if (Object.keys(screensBuyingCount[currentCity]).includes(myScreen._id)) {
      screensBuyingCount[currentCity][myScreen._id].status = !screensBuyingCount[currentCity][myScreen._id].status;
    }
    setScreensBuyingCount(screensBuyingCount);
    console.log(screensBuyingCount[currentCity][myScreen._id].status)
    saveDataOnLocalStorage(SCREEN_SUMMARY_SELECTION, screensBuyingCount);
  }

  const handleScreenTypeClick = (myData: any) => {
    const screens: any = []
    let count = 0;

    for (const zone in myData) {
      myData[zone]?.map((s: any) => {
        screens.push(s);
      });
    }

    screens?.map((s: any) => {
      if (Object.keys(screensBuyingCount[currentCity]).includes(s._id)) {
        screensBuyingCount[currentCity][s._id].status = !screensBuyingCount[currentCity][s._id].status;
        count++;
      }
    })
    setScreensBuyingCount(screensBuyingCount);
    saveDataOnLocalStorage(SCREEN_SUMMARY_SELECTION, screensBuyingCount);

    console.log(count);
    // if (screensBuyingCount[currentCity].length === screensBuyingCount[currentCity]?.filter((s: any) => s.status === false).length) {
      console.log(screensBuyingCount[currentCity]);
    // }

  }

  useEffect(() => {
    if (data !== undefined) {
      handleData(data);
    }
  }, [data, handleData]);

  return (
    <div className="">
      {currentCity&& data && Object.keys(cityZones).length > 0 && (
        <div className="w-full border-r border-b">
          <div className="bg-blue-200 grid grid-cols-12 flex items-center">
            <div className="py-2 col-span-2">
              <h1 className="text-[16px] font-bold flex justify-center">Touchpoints</h1>
            </div>
            <div className="py-2 col-span-3 border-l">
              <h1 className="text-[16px] font-bold flex justify-center">Screen Type</h1>
            </div>
            <div className={`
              
              col-span-7 grid grid-cols-8
              flex items-center
              `}
            >
              {Object.keys(cityZones[currentCity])?.map((d: any, i: any) => (
                <div className="border-x py-2 px-3 col-span-4 flex justify-center truncate" key={i}>
                  <h1 className="text-[16px] font-bold flex justify-center truncate">{d}</h1>
                </div> 
              ))}
            </div>
          </div>
          <div className="overflow-y-auto h-96">
            {Object.keys(data[currentCity])?.map((tp: any, i: any) => (
              <div key={i} className="grid grid-cols-12">
                <div className="border-b border-l col-span-2 py-2 px-4 truncate">
                  <h1 className="text-[14px] truncate">{tp}</h1>
                </div>
                <div className="col-span-10">
                  {Object.keys(cityTP?.[currentCity]?.[tp])?.map((st: any, j: any) => (
                    <div key={j} className={`grid grid-cols-10 border-l`}>
                      <div className={`col-span-3 py-2 px-4 border-b`}>
                        <div className="flex justify-between items-center">
                            <h1 className="text-[14px]">{st}</h1>
                            <div onClick={() => {
                              // if (screensBuyingCount)
                              handleScreenTypeClick(data[currentCity][tp][st])
                            }}>
                              <i className={`fi fi-br-check flex items-center text-green-500 text-[12px]`}></i>
                            </div>
                          </div>
                      </div>
                      <div className={`
                        col-span-7 grid grid-cols-8
                        ${Object.keys(cityZones[currentCity]).length > 1 
                          ? "overflow-x-auto" : ""}
                        `}
                      >
                        {Object.keys(cityZones[currentCity])?.map((zone: any, k: any) => (
                          <div key={k}
                            className={`
                              ${Object.keys(cityZones[currentCity]).length > 1 ? "col-span-4" : "col-span-4"}
                              `}
                            >
                            {data[currentCity][tp][st][zone]?.map(
                              (screen: any, m: any) => (
                                <div
                                  key={m}
                                  className={`flex gap-4 justify-between
                                    border-x py-2 px-4 border-b
                                    truncate
                                  `}
                                >
                                    <ScreenDataModel
                                      screen={screen || ""}
                                    />
                                    <div className="flex gap-4 justify-between items-center">
                                      <div className="flex gap-1 items-center">
                                        <i className="fi fi-sr-star flex items-center text-[12px] text-yellow-500"></i>
                                        <i className="fi fi-sr-star flex items-center text-[12px] text-yellow-500"></i>
                                      </div>
                                      <div onClick={() => handleScreenClick(screen)}>
                                        {getDataFromLocalStorage(SCREEN_SUMMARY_SELECTION)[currentCity][screen._id].status === false ? (
                                          <i className={`fi fi-br-cross  flex items-center text-red-500 text-[12px]`}></i>
                                        ) : (
                                          <i className={`fi fi-br-check flex items-center text-green-500 text-[12px]`}></i>
                                        )}
                                      </div>
                                    </div>
                                </div>
                              )
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          
        </div>
      )}
    </div>
  );
};

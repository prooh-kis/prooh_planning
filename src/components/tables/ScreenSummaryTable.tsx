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
  setScreenTypes,
  refreshScreenSummary
}: any) => {
  const [screenTypeToggle, setScreenTypeToggle] = useState<any>({});

  const handleData = useCallback((myData: any) => {
    const zones: any = {};
    const tps: any = {};
    const screens: any = {};
    const types: any = {};
    const stToggle: any = {};

    for (const city in myData) {
      zones[city] = {};
      tps[city] = {};
      screens[city] = {};
      types[city] = {};
      for (const tp in myData[city]) {
        tps[city][tp] = {};
        for (const st in myData[city][tp]) {
          tps[city][tp][st] = [];
          types[city][st] = [];
          stToggle[st] = true;
          for (const zone in myData[city][tp][st]) {
            zones[city][zone] = [];
            for (const screen in myData[city][tp][st][zone]) {
              zones[city][zone].push(myData[city][tp][st][zone][screen]?.screenName);
              tps[city][tp][st].push(myData[city][tp][st][zone][screen]?.screenName);
              types[city][st].push(myData[city][tp][st][zone][screen]?.screenName);

              screens[city][myData[city][tp][st][zone][screen]?._id] = {};
              screens[city][myData[city][tp][st][zone][screen]?._id]["status"] = true;
              screens[city][myData[city][tp][st][zone][screen]?._id]["data"] = myData[city][tp][st][zone][screen];
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
    setScreenTypeToggle(stToggle);

  }, [currentSummaryTab, data, setCityTP, setCityZones, setCurrentCity, setScreenTypes, setScreensBuyingCount]);

  const updateScreenTypeStatus = (screenType: any) => {
    const currentScreens = Object.keys(screensBuyingCount[currentCity] || {});
    const allScreensStatuses = currentScreens.map(screenId => screensBuyingCount[currentCity][screenId]?.status);

    // Check if at least one individual screen status is true
    const anyScreenTrue = allScreensStatuses.some(status => status === true);

    // Update screen type toggle based on individual screens' statuses
    setScreenTypeToggle((prevState: any) => ({
      ...prevState,
      [screenType]: anyScreenTrue // Set to true if any are true, false otherwise
    }));
  };

  const handleScreenClick = (screen: any) => {
    const screenId = screen._id;
    const updatedScreens = { ...screensBuyingCount[currentCity] };

    if (updatedScreens[screenId]) {
      updatedScreens[screenId].status = !updatedScreens[screenId].status;
    }

    const newScreensBuyingCount = { ...screensBuyingCount, [currentCity]: updatedScreens };

    setScreensBuyingCount(newScreensBuyingCount);
    saveDataOnLocalStorage(SCREEN_SUMMARY_SELECTION, newScreensBuyingCount);

    // Update the screen type status based on the updated screen status
    Object.keys(cityTP?.[currentCity] || {}).forEach(screenType => {
      updateScreenTypeStatus(screenType);
    });
  };

  const handleScreenTypeClick = (screenType: any, myData: any) => {
    console.log(screenTypeToggle[screenType]);
    const updatedScreens = { ...screensBuyingCount[currentCity] };
    const screens: any = [];

    const stToggle = screenTypeToggle;

    console.log(stToggle);
    for (const zone in myData) {
      myData[zone]?.map((s: any) => {
        console.log(updatedScreens[s._id])
        if (!stToggle[screenType] && updatedScreens[s._id].status) {
          updatedScreens[s._id].status = true
        }

        screens.push(s);
      });
    }

    // Get current status for all screens in the type
    const allSelected = screens.every((s: any) => screensBuyingCount[currentCity]?.[s._id]?.status);

    console.log(allSelected)
    screens.forEach((s: any) => {
      handleScreenClick(s); // Update individual screen status
    });

    stToggle[screenType] = !allSelected;

    // Toggle screen type status based on current status
    setScreenTypeToggle(stToggle);
    console.log(stToggle)

    // Update the screens buying count and save
    setScreensBuyingCount({ ...screensBuyingCount });
    saveDataOnLocalStorage(SCREEN_SUMMARY_SELECTION, screensBuyingCount);

    console.log('asdadsa')
    // Call to refresh can be added if necessary
    // refreshScreenSummary();
  };

  useEffect(() => {
    if (data !== undefined) {
      handleData(data);
    }
  }, [data, handleData]);

  console.log(screenTypeToggle)
  return (
    <div className="">
      {currentCity && data && Object.keys(cityZones).length > 0 && (
        <div className="w-full border-r border-b">
          <div className="bg-blue-200 grid grid-cols-12 flex items-center">
            <div className="py-2 col-span-2">
              <h1 className="text-[16px] font-bold flex justify-center">Touchpoints</h1>
            </div>
            <div className="py-2 col-span-3 border-l">
              <h1 className="text-[16px] font-bold flex justify-center">Screen Type</h1>
            </div>
            <div className={`col-span-7 grid grid-cols-8 flex items-center`}>
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
                          <div onClick={() => handleScreenTypeClick(st, data[currentCity][tp][st])}>
                            <i className={`fi ${screenTypeToggle[st] ? 'fi-br-check text-green-500' : 'fi-br-cross text-red-500'} flex items-center text-[12px]`}></i>
                          </div>
                        </div>
                      </div>
                      <div className={`col-span-7 grid grid-cols-8`}>
                        {Object.keys(cityZones[currentCity])?.map((zone: any, k: any) => (
                          <div key={k} className={`col-span-4`}>
                            {data[currentCity][tp][st][zone]?.map((screen: any, m: any) => (
                              <div key={m} className={`flex gap-4 justify-between border-x py-2 px-4 border-b truncate`}>
                                <ScreenDataModel screen={screen || ""} />
                                <div className="flex gap-4 justify-between items-center">
                                  <div className="flex gap-1 items-center">
                                    <i className="fi fi-sr-star flex items-center text-[12px] text-yellow-500"></i>
                                    <i className="fi fi-sr-star flex items-center text-[12px] text-yellow-500"></i>
                                  </div>
                                  <div onClick={() => {screenTypeToggle[st] &&
                                    handleScreenClick(screen)
                                    }}>
                                    {getDataFromLocalStorage(SCREEN_SUMMARY_SELECTION) !== null && getDataFromLocalStorage(SCREEN_SUMMARY_SELECTION)[currentCity][screen._id].status === false ? (
                                      <i className={`fi fi-br-cross flex items-center text-red-500 text-[12px]`}></i>
                                    ) : (
                                      <i className={`fi fi-br-check flex items-center text-green-500 text-[12px]`}></i>
                                    )}
                                  </div>
                                </div>
                              </div>
                            ))}
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

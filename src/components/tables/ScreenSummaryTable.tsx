import React, { useCallback, useEffect, useState } from "react";
import { ScreenDataModel } from "../../components/popup/ScreenDataModel";
import {
  getDataFromLocalStorage,
  saveDataOnLocalStorage,
} from "../../utils/localStorageUtils";
import {
  SCREEN_SUMMARY_SELECTION,
  SCREEN_TYPE_TOGGLE_SELECTION,
} from "../../constants/localStorageConstants";
import { Tooltip } from "antd";

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
  refreshScreenSummary,
  priceFilter,
}: any) => {
  const [screenTypeToggle, setScreenTypeToggle] = useState<any>(
    getDataFromLocalStorage(SCREEN_TYPE_TOGGLE_SELECTION)
  );

  const handleData = useCallback(
    (myData: any) => {
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
        stToggle[city] = {};
        for (const tp in myData[city]) {
          tps[city][tp] = {};
          stToggle[city][tp] = {};
          for (const st in myData[city][tp]) {
            tps[city][tp][st] = [];
            types[city][st] = [];
            stToggle[city][tp][st] =
              getDataFromLocalStorage(SCREEN_TYPE_TOGGLE_SELECTION)?.[city]?.[
                tp
              ]?.[st] || true;
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
                screens[city][`${myData[city][tp][st][zone][screen]?._id}`] = {
                  status: true, // Set all screens as selected by default
                  data: myData[city][tp][st][zone][screen],
                };
              }
            }
          }
        }
      }

      setCurrentCity(Object.keys(data)[Number(currentSummaryTab) - 1]);
      setCityZones(zones);
      setCityTP(tps);
      setScreenTypes(types);
      if (
        !getDataFromLocalStorage(SCREEN_SUMMARY_SELECTION) ||
        Object.keys(getDataFromLocalStorage(SCREEN_SUMMARY_SELECTION))
          ?.length === 0
      ) {
        setScreensBuyingCount(screens);
      } else {
        setScreensBuyingCount(
          getDataFromLocalStorage(SCREEN_SUMMARY_SELECTION)
        );
      }
      setScreenTypeToggle(stToggle);
      saveDataOnLocalStorage(SCREEN_TYPE_TOGGLE_SELECTION, stToggle);
    },
    [
      currentSummaryTab,
      data,
      setCityTP,
      setCityZones,
      setCurrentCity,
      setScreenTypes,
      setScreensBuyingCount,
    ]
  );

  useEffect(() => {
    if (data !== undefined) {
      handleData(data);
    }
  }, [data, handleData]);

  const handleScreenClick = useCallback(({ screen, city, statusRes }: any) => {
    const screenId = screen._id;

    // Create a deep clone to avoid modifying the original state directly
    const updatedScreensBuyingCount = { ...screensBuyingCount };

    const currentCityScreens = updatedScreensBuyingCount[city] || {};

    // Toggle the status of the selected screen
    if (statusRes === undefined && currentCityScreens[screenId]) {
      currentCityScreens[screenId].status =
        !currentCityScreens[screenId].status;
    } else {
      currentCityScreens[screenId] = {
        status: statusRes,
        data: screen,
      };
    }

    // Update the specific city's screens in screensBuyingCount while preserving other cities
    updatedScreensBuyingCount[city] = currentCityScreens;

    // Save the updated state
    setScreensBuyingCount(updatedScreensBuyingCount);

    refreshScreenSummary();
  },[refreshScreenSummary, screensBuyingCount]);


  const handleScreenTypeClick = ({
    screenType,
    myData,
    city,
    touchpoint,
    statusNow,
  }: any) => {
    // const updatedScreens = { ...screensBuyingCount[currentCity] };
    const screens: any = [];

    const stToggle = { ...screenTypeToggle };

    for (const zone in myData) {
      myData[zone]?.map((s: any) => {
        screens.push(s);
      });
    }

    // Get current status for all screens in the type
    const allSelected = screens.every(
      (s: any) => screensBuyingCount[currentCity]?.[s._id]?.status
    );

    stToggle[city][touchpoint][screenType] = !allSelected;
    console.log(stToggle[city][touchpoint][screenType])
    // Toggle screen type status based on current status
    setScreenTypeToggle(stToggle);
    saveDataOnLocalStorage(SCREEN_TYPE_TOGGLE_SELECTION, stToggle);

    screens.forEach((s: any) => {
      handleScreenClick({ screen: s, city, touchpoint, statusRes: !allSelected }); // Update individual screen status
    });

    // Update the screens buying count and save
    setScreensBuyingCount({ ...screensBuyingCount });
  };
  
  return (
    <div className="h-full">
      {currentCity && data && Object.keys(cityZones).length > 0 && (
        <div className="w-full h-full border-r border-b">
          <div className="bg-blue-200 grid grid-cols-12 flex items-center">
            <div className="py-2 col-span-2">
              <h1 className="text-[16px] font-bold flex justify-center">
                Touchpoints
              </h1>
            </div>
            <div className="py-2 col-span-2 border-l">
              <h1 className="text-[16px] font-bold flex justify-center">
                Screen Type
              </h1>
            </div>
            <div className="py-2 col-span-8 overflow-x-auto no-scrollbar">
              <div
                className="grid grid-cols-[repeat(auto-fit,minmax(8rem,1fr))] gap-0"
                style={{ width: 'calc(8rem * 8)' }} // Ensures each column has a fixed width
              
              >
                {Object.keys(cityZones[currentCity])?.map((d: any, i: any) => (
                  <div className="col-span-1 border-x min-w-[2rem] truncate" key={i}>
                    <h1 className="md:text-[16px] sm:text-[14px] font-bold flex justify-center truncate">
                      {d}
                    </h1>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="overflow-y-auto h-[60vh]">
            {Object.keys(data?.[currentCity])?.map((tp: any, i: any) => (
              <div key={i} className="grid grid-cols-12">
                <div className="border-b border-l col-span-2 py-2 px-4 truncate">
                  <Tooltip
                    title={tp}
                  >
                    <h1 className="text-[14px] truncate">{tp}</h1>
                  </Tooltip>
                </div>
                <div className="col-span-10 ">
                  {Object.keys(cityTP?.[currentCity]?.[tp])?.map(
                    (st: any, j: any) => (
                      <div key={j} className={`grid grid-cols-10 border-b`}>
                        <div className={`col-span-2 py-2 px-4 border-x`}>
                          <div className="flex justify-between items-center">
                            <Tooltip
                              title={`${st}`}
                            >
                              <h1 className="text-[14px] truncate">{st}</h1>
                            </Tooltip>
                            <div
                              onClick={() => {
                                handleScreenTypeClick({
                                  screenType: st,
                                  myData: data[currentCity][tp][st],
                                  city: currentCity,
                                  touchpoint: tp,
                                  statusNow: screenTypeToggle?.[currentCity]?.[
                                    tp
                                  ]?.[st]
                                    // ? true
                                    // : false,
                                });
                              }}
                            >
                              <i
                                className={`fi ${
                                  screenTypeToggle?.[currentCity]?.[tp]?.[st]
                                    ? "fi-br-check text-green-500"
                                    : "fi-br-cross text-red-500"
                                } flex items-center text-[12px]`}
                              ></i>
                            </div>
                          </div>
                        </div>
                        <div className={`col-span-8 overflow-x-auto no-scrollbar`}>
                          <div
                            className="grid grid-cols-[repeat(auto-fit,minmax(8rem,1fr))] gap-0"
                            style={{ width: 'calc(8rem * 8)' }} // Ensures each column has a fixed width
                          >
                            {Object.keys(cityZones?.[currentCity])?.map(
                              (zone: any, k: any) => (
                                <div key={k} className={`col-span-1 border-x min-w-[2rem] truncate`}>
                                  {data?.[currentCity]?.[tp]?.[st]?.[zone]?.filter((sc: any) => {
                                      return sc.pricePerSlot >= priceFilter?.min && sc.pricePerSlot <= priceFilter?.max
                                    })?.map(
                                    (screen: any, m: any) => (
                                      <div
                                        key={m}
                                        className={`flex gap-4 justify-between py-2 px-4 border-y truncate`}
                                      >
                                        <ScreenDataModel
                                          screen={screen || ""}
                                          handleRemove={() => {
                                            handleScreenClick({
                                              screen,
                                              city: currentCity,
                                              touchpoint: tp,
                                            });
                                          }}
                                          isAdded={
                                            screensBuyingCount[currentCity]?.[
                                              screen._id
                                            ]?.status
                                          }
                                        />
                                        <div className="flex gap-4 justify-between items-center">
                                          <div className="flex gap-1 items-center">
                                            <i className="fi fi-sr-star flex items-center text-[12px] text-yellow-500"></i>
                                            {screen.pricePerSlot > 100 && (
                                              <i className="fi fi-sr-star flex items-center text-[12px] text-yellow-500"></i>
                                            )}
                                          </div>
                                          <div
                                            onClick={() => {
                                              handleScreenClick({
                                                screen,
                                                city: currentCity,
                                                touchpoint: tp,
                                                // status: screensBuyingCount[currentCity]?.[screen._id]?.status
                                              });
                                            }}
                                          >
                                            {screensBuyingCount[currentCity]?.[
                                              screen._id
                                            ]?.status === false ? (
                                              <i
                                                className={`fi fi-br-cross flex items-center text-red-500 text-[12px]`}
                                              ></i>
                                            ) : (
                                              <i
                                                className={`fi fi-br-check flex items-center text-green-500 text-[12px]`}
                                              ></i>
                                            )}
                                          </div>
                                        </div>
                                      </div>
                                    )
                                  )}
                                </div>
                              )
                            )}
                          </div>

                        </div>
                      </div>
                    )
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

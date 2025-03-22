import React, { useCallback, useEffect, useState } from "react";
import { ScreenDataModel } from "../../components/popup/ScreenDataModel";
import {
  getDataFromLocalStorage,
  saveDataOnLocalStorage,
} from "../../utils/localStorageUtils";
import {
  FULL_CAMPAIGN_PLAN,
  SCREEN_SUMMARY_SELECTION,
  SCREEN_TYPE_TOGGLE_SELECTION,
} from "../../constants/localStorageConstants";
import { message, Tooltip } from "antd";

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
  priceFilter,
  campaignId,
  listView,
  screenTypeToggle,
  setScreenTypeToggle,
  handleScreenClick,
  handleScreenTypeClick,
}: any) => {


  const handleData = useCallback(
    (myData: any) => {
      const zones: any = {};
      const tps: any = {};
      const screens: any = {};
      const types: any = {};
      const stToggle: any = {};

      if (!getDataFromLocalStorage(SCREEN_SUMMARY_SELECTION)?.[campaignId]) {

      }
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
              getDataFromLocalStorage(SCREEN_TYPE_TOGGLE_SELECTION)?.[
              campaignId
              ]?.[city]?.[tp]?.[st] || true;
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
                let screenId = myData[city][tp][st][zone][screen]?._id
                screens[city][`${myData[city][tp][st][zone][screen]?._id}`] = {
                  status: getDataFromLocalStorage(SCREEN_SUMMARY_SELECTION)?.[campaignId]?.[city]?.[screenId] ? 
                    getDataFromLocalStorage(SCREEN_SUMMARY_SELECTION)?.[campaignId]?.[city]?.[screenId].status : 
                    getDataFromLocalStorage(FULL_CAMPAIGN_PLAN)?.[campaignId]?.screenIds?.length > 0 &&
                    !getDataFromLocalStorage(FULL_CAMPAIGN_PLAN)?.[campaignId]?.screenIds.includes(myData[city][tp][st][zone][screen]?._id) ?
                    false : true, // Set all screens as selected by default
                  data: myData[city][tp][st][zone][screen],
                };
              }
            }
          }
        }
      }

      setCurrentCity(Object.keys(myData)[Number(currentSummaryTab) - 1]);
      setCityZones(zones);
      setCityTP(tps);
      setScreenTypes(types);
      saveDataOnLocalStorage(SCREEN_SUMMARY_SELECTION, {
        [campaignId]: screens,
      });
      if (
        !getDataFromLocalStorage(SCREEN_SUMMARY_SELECTION)?.[campaignId] ||
        Object.keys(
          getDataFromLocalStorage(SCREEN_SUMMARY_SELECTION)?.[campaignId]
        )?.length === 0
      ) {
        setScreensBuyingCount(screens);
      } else {
        setScreensBuyingCount(
          getDataFromLocalStorage(SCREEN_SUMMARY_SELECTION)?.[campaignId]
        );
      }
      setScreenTypeToggle(stToggle);
      saveDataOnLocalStorage(SCREEN_TYPE_TOGGLE_SELECTION, {
        [campaignId]: stToggle,
      });
    },
    [
      campaignId,
      currentSummaryTab,
      setCityTP,
      setCityZones,
      setCurrentCity,
      setScreenTypes,
      setScreensBuyingCount,
      setScreenTypeToggle
    ]
  );
  
  useEffect(() => {
    if (data !== undefined) {
      handleData(data);
    }
  }, [data, handleData]);

  return (
    <div className="h-full">
      
      {currentCity && data && Object.keys(cityZones).length > 0 && (
        <div className="w-full h-full border-b">
          <div className="bg-[#D0D0D0] grid grid-cols-12 flex items-center">
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
            <div className="col-span-8">
              <div
                id="scroll-container"
                className="overflow-x-auto no-scrollbar sync-scroll-row"
                onScroll={(e) => {
                  const scrollLeft = e.currentTarget.scrollLeft;
                  document
                    .querySelectorAll(".sync-scroll")
                    .forEach((el) => (el.scrollLeft = scrollLeft));
                }}
              >
                <div
                  className={`grid ${Object.keys(cityZones[currentCity]).length > 3 ? "grid-cols-[repeat(auto-fit,minmax(8rem,0.5fr))]" : "grid-cols-[repeat(auto-fit,minmax(4rem,0.5fr))]"} gap-0`}
                  style={{ width: Object.keys(cityZones[currentCity]).length > 3 ? "calc(8rem * 8)" : "calc(4rem * 8)"}}
                >
                  {Object.keys(cityZones[currentCity])?.map(
                    (d: any, i: any) => (
                      <div
                        className="col-span-1 border-x min-w-[2rem]"
                        key={i}
                      >
                        <h1 className="md:text-[16px] sm:text-[14px] py-2 font-bold flex justify-center truncate">
                          {d?.split(" ")?.splice(0, 3)?.join(" ")}
                        </h1>
                      </div>
                    )
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="overflow-y-auto scrollbar-minimal h-[50vh] pb-10">
            {Object.keys(data?.[currentCity] || {})?.map((tp: any, i: any) => (
              <div key={i} className="grid grid-cols-12">
                <div className="border-b border-l col-span-2 py-2 px-4 border-r truncate">
                  <Tooltip title={tp}>
                    <h1 className="text-[14px] truncate">{tp}</h1>
                  </Tooltip>
                </div>
                <div className="col-span-10">
                  {Object.keys(cityTP?.[currentCity]?.[tp])?.map(
                    (st: any, j: any) => (
                      <div key={j} className="grid grid-cols-10 border-b border-r">
                        <div className="col-span-2 py-2 px-4 border-r">
                          <div className="flex justify-between items-center">
                            <Tooltip title={`${st}`}>
                              <h1 className="text-[14px] truncate">{st}</h1>
                            </Tooltip>
                            <div
                              onClick={() => {
                                handleScreenTypeClick({
                                  screenType: st,
                                  myData: data[currentCity][tp][st],
                                  city: currentCity,
                                  touchpoint: tp,
                                  zone: "",
                                  statusNow:
                                    screenTypeToggle?.[currentCity]?.[tp]?.[st],
                                });
                              }}
                            >
                              <i
                                className={`fi ${screenTypeToggle?.[currentCity]?.[tp]?.[st]
                                    ? "fi-br-check text-[#358E0B]"
                                    : "fi-br-cross text-[#FF0808]"
                                  } flex items-center text-[12px]`}
                              ></i>
                            </div>
                          </div>
                        </div>
                        <div className="col-span-8 overflow-x-auto no-scrollbar sync-scroll"
                          id="scroll-container-row"
                          onScroll={(e) => {
                            const scrollLeft = e.currentTarget.scrollLeft;
                            document
                              .querySelectorAll(".sync-scroll-row")
                              .forEach((el) => (el.scrollLeft = scrollLeft));
                          }}
                        >
                          <div
                            className={`grid ${Object.keys(cityZones[currentCity]).length > 3 ? "grid-cols-[repeat(auto-fit,minmax(8rem,0.5fr))]" : "grid-cols-[repeat(auto-fit,minmax(4rem,0.5fr))]"} gap-0`}
                            style={{ width: Object.keys(cityZones[currentCity]).length > 3 ? "calc(8rem * 8)" : "calc(4rem * 8)"}}
                          >
                            {Object.keys(cityZones?.[currentCity])?.map(
                              (zone: any, k: any) => (
                                <div
                                  key={k}
                                  className="col-span-1 border-r min-w-[2rem] truncate"
                                >
                                  {data?.[currentCity]?.[tp]?.[st]?.[zone]
                                    ?.filter((sc: any) => {
                                      return (
                                        sc.pricePerSlot >= priceFilter?.min &&
                                        sc.pricePerSlot <= priceFilter?.max
                                      );
                                    })
                                    ?.map((screen: any, m: any) => (
                                      <div
                                        key={m}
                                        className={`flex gap-4 justify-between py-2 px-4 ${m == 0 ? "" : "border-t"}  truncate`}
                                      >
                                        <ScreenDataModel
                                          listView={listView}
                                          campaignId={campaignId}
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
                                            <i className="fi fi-sr-star flex items-center text-[12px] text-[#F1BC00]"></i>
                                            {screen.pricePerSlot > 100 && (
                                              <i className="fi fi-sr-star flex items-center text-[12px] text-[#F1BC00]"></i>
                                            )}
                                          </div>
                                          <div
                                            onClick={() => {
                                              handleScreenClick({
                                                screen,
                                                city: currentCity,
                                                touchpoint: tp,
                                              });
                                            }}
                                          >
                                            {screensBuyingCount[currentCity]?.[
                                              screen._id
                                            ]?.status === false ? (
                                              <i className="fi fi-br-cross flex items-center text-[#FF0808] text-[12px]"></i>
                                            ) : (
                                              <i className="fi fi-br-check flex items-center text-[#358E0B] text-[12px]"></i>
                                            )}
                                          </div>
                                        </div>
                                      </div>
                                    ))}
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
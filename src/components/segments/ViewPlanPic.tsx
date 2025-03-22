import { ScreenDataModel } from "../../components/popup/ScreenDataModel";
import { CheckboxInput } from "../../components/atoms/CheckboxInput";
import { formatNumber } from "../../utils/formatValue";
import React, { useCallback, useEffect, useState } from "react";
import { ScreenFilters } from "./ScreenFilters";

function Screen({
  screens,
  screen,
  currentSummaryTab,
  handleScreenClick,
}: any) {
  return (
    <div
      className={`hover:shadow-md rounded-md ${
        screens[Object.keys(screens)[Number(currentSummaryTab) - 1]][screen._id]
          .status === false
          ? "border border-red-300"
          : ""
      }`}
    >
      <img src={screen?.images[0]} alt="" className="h-36 w-full rounded-md" />
      <div className="py-2 px-1 truncate">
        <ScreenDataModel
          screen={screen || ""}
          handleRemove={() => {
            handleScreenClick({
              screen,
              city: Object.keys(screens)[Number(currentSummaryTab) - 1],
              touchpoint: screen.location.touchPoint,
            });
          }}
          isAdded={
            screens[Object.keys(screens)[Number(currentSummaryTab) - 1]]?.[
              screen._id
            ]?.status
          }
        />
        {/* <h1 className="text-[14px] font-bold truncate ">{screen?.screenName}</h1> */}
        <h1 className="text-[12px] truncate">
          {screen.location.city}, {screen.location.touchPoint}
        </h1>
        <h1 className="text-[12px]">
          {formatNumber(screen.impressionPerMonth)} Impressions/Month
        </h1>
        <div className="flex justify-between">
          <div className="flex gap-1">
            <h1 className="text-[12px] font-semibold">
              &#8377;{screen.pricePerSlot} / Slot
            </h1>
            {screen.pricePerSlot > 100 && (
              <i className="fi fi-sr-star flex items-center text-[12px] text-[#F1BC00]"></i>
            )}
            <i className="fi fi-sr-star flex items-center text-[12px] text-[#F1BC00]"></i>
          </div>
          <div
            className="flex items-center"
            onClick={() => {
              handleScreenClick({
                screen,
                city: Object.keys(screens)[Number(currentSummaryTab) - 1],
                touchpoint: screen.location.touchPoint,
              });
            }}
          >
            {/* <i className="fi fi-sr-add flex items-center text-[12px] text-[#358E0B]"></i> */}
            {screens[Object.keys(screens)[Number(currentSummaryTab) - 1]][
              screen._id
            ].status === true ? (
              <i className="fi-ss-minus-circle flex items-center text-[12px] text-[#FF0808]"></i>
            ) : (
              <i className="fi fi-sr-add flex items-center text-[12px] text-[#358E0B]"></i>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}


export function ViewPlanPic({
  screensBuyingCount,
  setScreensBuyingCount,
  listView,
  screenTypes,
  currentSummaryTab,
  setCurrentCity,
  priceFilter,
  cityZones,
  cityTP,
  zoneFilters,
  tpFilters,
  stFilters,
  setZoneFilters,
  setTpFilters,
  setStFilters,
}: any) {


  const filteredScreensData = useCallback(() => {
    // console.log(Object.keys(screens)[Number(currentSummaryTab) - 1])
    let allResult: any;
    let result = Object.values(
      screensBuyingCount[
        Object.keys(screensBuyingCount)[Number(currentSummaryTab) - 1]
      ]
    )?.map((f: any) => f.data);

    allResult = result;
    // Filter by zone if zoneFilters has values
    if (zoneFilters.length > 0) {
      result = result?.filter((s: any) =>
        zoneFilters.includes(s.location.zoneOrRegion)
      );
      // console.log(result, "zone");
    }

    // Filter by touch point if tpFilters has values
    if (tpFilters.length > 0) {
      result = result?.filter((s: any) =>
        tpFilters.includes(s.location.touchPoint)
      );
      // console.log(result, "tp");
    }

    // Filter by screen type if stFilters has values
    if (stFilters.length > 0) {
      result = result?.filter((s: any) => stFilters.includes(s.screenType));
      // console.log(result, "st");
    }
    return { result, allResult };
  }, [
    screensBuyingCount,
    zoneFilters,
    tpFilters,
    stFilters,
    currentSummaryTab,
  ]);

  const handleFilterSelection = ({ type, value, checked }: any) => {

    if (type === "zone") {
      if (checked) {
        setZoneFilters((prev: any) => {
          return [...prev, value];
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
          return [...prev, value];
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
          return [...prev, value];
        });
      } else {
        setStFilters((prev: any) => {
          return prev.filter((item: any) => item !== value);
        });
      }
    }
  };

  const handleScreenClick = useCallback(
    ({ screen, city, statusRes }: any) => {
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

      // refreshScreenSummary();
    },
    [screensBuyingCount, setScreensBuyingCount]
  );

  // console.log(zoneFilters, tpFilters, stFilters);
  useEffect(() => {
    const selectedCity =
      Object.keys(screensBuyingCount)[Number(currentSummaryTab) - 1];
    setCurrentCity(selectedCity);

    setZoneFilters(
      Object.keys(
        cityZones[
          Object.keys(screensBuyingCount)[Number(currentSummaryTab) - 1]
        ]
      )
    );
    setTpFilters(
      Object.keys(
        cityTP[Object.keys(screensBuyingCount)[Number(currentSummaryTab) - 1]]
      )
    );
    setStFilters(
      Object.keys(
        screenTypes[
          Object.keys(screensBuyingCount)[Number(currentSummaryTab) - 1]
        ]
      )
    );
  }, [
    cityTP,
    cityZones,
    currentSummaryTab,
    screenTypes,
    screensBuyingCount,
    setCurrentCity,
  ]);

  return (
    <div className="grid grid-cols-12 gap-8 pt-2 mb-16">
      <div className="col-span-3 border rounded-[12px] h-[60vh] p-3 overflow-y-auto">
        <ScreenFilters
          cityZones={cityZones}
          cityTP={cityTP}
          screenTypes={screenTypes}
          zoneFilters={zoneFilters}
          tpFilters={tpFilters}
          stFilters={stFilters}
          handleFilterSelection={handleFilterSelection}
          filteredScreensData={filteredScreensData}
          screensBuyingCount={screensBuyingCount}
          currentSummaryTab={currentSummaryTab}
          listView={listView}
        />
      </div>
      <div className="col-span-9 rounded grid grid-cols-12 flex flex-wrap gap-4 overflow-scroll no-scrollbar h-[60vh]">
        {filteredScreensData()
          ?.result?.filter((sc: any) => {
            return (
              sc.pricePerSlot >= priceFilter?.min &&
              sc.pricePerSlot <= priceFilter?.max
            );
          })
          ?.map((screen: any, index: any) => (
            <div key={index} className="col-span-3">
              <Screen
                handleScreenClick={handleScreenClick}
                screen={screen}
                screens={screensBuyingCount}
                currentSummaryTab={currentSummaryTab}
              />
            </div>
          ))}
      </div>
    </div>
  );
}
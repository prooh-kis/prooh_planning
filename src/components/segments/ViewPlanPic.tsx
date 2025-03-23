import { ScreenDataModel } from "../../components/popup/ScreenDataModel";
import { CheckboxInput } from "../../components/atoms/CheckboxInput";
import { formatNumber } from "../../utils/formatValue";
import React, { useCallback, useEffect, useState } from "react";
import { ScreenFilters } from "./ScreenFilters";

export function ViewPlanPic({
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
import React, { useState } from "react";
interface TabInterface {
  label: string;
  id: string;
}

interface Props {
  tabData: TabInterface[];
  currentTab: string;
  onClick: any;
}

export function TabWithoutIcon({ tabData, currentTab, onClick }: Props) {
  return (
    <div className="flex gap-4">
      {tabData.map((tab: TabInterface) => (
        <div
          onClick={() => onClick(tab)}
          className={
            currentTab === tab.id
              ? "flex gap-4 text-blue-500 items-center text-lg  border-b-2 border-blue-500 py-1 px-2"
              : "flex gap-2 text-gray-500 items-center text-lg py-1 px-2"
          }
        >
          <h1>{tab.label}</h1>
        </div>
      ))}
    </div>
  );
}

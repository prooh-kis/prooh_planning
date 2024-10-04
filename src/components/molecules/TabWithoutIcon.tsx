import React, { useState } from "react";
interface TabInterface {
  params: any;
  label: string;
  id: string;
}

interface Props {
  tabData: TabInterface[];
  currentTab: string;
  setCurrentTab: any;
}

export function TabWithoutIcon({ tabData, currentTab, setCurrentTab }: any) {

// Define icons for availability
  const CheckIcon = () => <span className="text-green-500 font-bold">✔</span>;
  const CrossIcon = () => <span className="text-red-500 font-bold">✘</span>;
 
  return (
    <div className="flex gap-4">
      {tabData?.map((tab: TabInterface, index: any) => (
        <div
          key={index}
          onClick={() => setCurrentTab(tab.id)}
          className={
            currentTab === tab.id
              ? "flex gap-4 items-center text-lg border-b-2 border-blue-500 py-1"
              : "flex gap-2 items-center text-lg py-1 px-2"
          }
        >
          <h1 className={currentTab === tab.id ? "text-blue-500" : "text-gray-500"}>{tab.label}</h1>
          {tab.params && (
            <div className="flex gap-2 items-center">
              <div className="flex gap-1 items-center">
                <p className={currentTab === tab.id ? "text-green-500 text-sm" : "text-gray-500 text-sm"}>{tab.params[0]}</p>
                <span className={currentTab === tab.id ? "text-sm text-green-500 font-regular" : "text-sm text-gray-500 font-regular"}>✔</span>
              </div>
              <div className="flex gap-1 items-center">
                <p className={currentTab === tab.id ? "text-red-500 text-sm" : "text-gray-500 text-sm"}>{tab.params[1]}</p>
                <span className={currentTab === tab.id ? "text-sm text-red-500 font-regular" : "text-sm text-gray-500 font-regular"}>✘</span>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

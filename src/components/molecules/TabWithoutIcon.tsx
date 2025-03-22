import { Tooltip } from "antd";
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

export function  TabWithoutIcon({ tabData, currentTab, setCurrentTab }: any) {

  return (
    <div className="inline-flex items-center gap-4 w-fit">
      {tabData?.map((tab: TabInterface, index: any) => (
        <div
          key={index}
          onClick={() => {
            setCurrentTab(tab.id);
          }}
          className={
            currentTab === tab.id
              ? "flex gap-4 items-center text-[16px] border-b-2 border-primaryButton py-2  pr-2"
              : "flex gap-2 items-center text-[16px] py-2 pr-2 border-b-2 border-white"
          }
        >
          <h1
            className={
              currentTab === tab.id
                ? "text-primaryButton font-semibold truncate pr-2"
                : "text-gray-500 truncate pr-2"
            }
          >
            {tab.label}
          </h1>
          {tab.params && (
            <div className="flex gap-2 items-center">
              <Tooltip title={`Selected Screens`}>
                <div className="flex gap-1 items-center">
                  <p
                    className={
                      currentTab === tab.id
                        ? "text-[#358E0B] text-[12px]"
                        : "text-gray-500 text-[12px]"
                    }
                  >
                    {tab.params[0]}
                  </p>
                  <i
                    className={`fi fi-br-check flex items-center ${
                      currentTab === tab.id ? "text-[#358E0B]" : "text-gray-500"
                    } text-[12px]`}
                  ></i>
                </div>
              </Tooltip>
              <Tooltip title={`Unselected Screens`}>
                <div className="flex gap-1 items-center">
                  <p
                    className={
                      currentTab === tab.id
                        ? "text-[#FF0808] text-[12px]"
                        : "text-gray-500 text-[12px]"
                    }
                  >
                    {tab.params[1]}
                  </p>
                  <i
                    className={`fi fi-br-cross flex items-center ${
                      currentTab === tab.id ? "text-[#FF0808]" : "text-gray-500"
                    } text-[10px]`}
                  ></i>
                </div>
              </Tooltip>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

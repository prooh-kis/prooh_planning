import { getNumberOfDaysBetweenTwoDates } from "../../utils/dateAndTimeUtils";
import React, { useEffect } from "react";
import { LinearBar } from "./linearbar";
import { MultiColorLinearBar2 } from "./MultiColorLinearBar2";
import { formatNumber } from "../../utils/formatValue";


interface BarChartProps {
  campaignDetails?: any;
  type?: any;
  screenLevelData?: any;
}

export const DashboardGrid: React.FC<BarChartProps> = ({
  campaignDetails,
  type,
  screenLevelData
}) => {

  return (
    <div className="w-full">
      {type === "duration" ? (
        <div>
          <div className="flex items-center gap-2">
            <div className="rounded-full bg-violetbg p-2">
              <i className="fi fi-rr-calendar text-violet lg:text-[14px] text-[12px] flex items-center justify-center"></i>
            </div>
            <h1 className="lg:text-[14px] md:text-[12px] font-bold truncate">Campaign Duration</h1>
            <i className="fi fi-br-info text-gray-400 lg:text-[14px] text-[12px] flex items-center justify-center"></i>
          </div>

          <div className="p-2">
          <h1 className="lg:text-[40px] text-[36px] text-gray-400">
            <span className="text-gray-900">
              {`${getNumberOfDaysBetweenTwoDates(campaignDetails?.startDate, new Date())}`}
            </span> / {campaignDetails?.duration}
          </h1>
          </div>
          <div className="p-2">
          <LinearBar
            value={getNumberOfDaysBetweenTwoDates(campaignDetails?.startDate, new Date())}
            colors={["#F3F3F3", "#7AB3A2"]}
            highest={campaignDetails?.duration}
            percent={false}
          />
          </div>
        </div>
      ) : type === "audience" ? (
        <div>
          <div className="flex items-center gap-2">
            <div className="rounded-full bg-bluebg p-2">
              <i className="fi fi-rr-target-audience text-blue lg:text-[14px] text-[12px] flex items-center justify-center"></i>
            </div>
            <h1 className="lg:text-[14px] md:text-[12px] font-bold truncate">Audience Impressions</h1>
            <i className="fi fi-br-info text-gray-400 lg:text-[14px] text-[12px] flex items-center justify-center"></i>
          </div>
          <div className="p-2">
            <h1 className="lg:text-[40px] text-[36px] text-gray-900">{formatNumber(screenLevelData?.result?.totalData?.impressionsDelivered?.toFixed(0))}</h1>
          </div>
          <div className="p-2">
            <MultiColorLinearBar2
              delivered={screenLevelData?.result?.totalData?.impressionsDelivered?.toFixed(0)}
              expected={screenLevelData?.result?.totalData?.impressionsPromised?.toFixed(0) * getNumberOfDaysBetweenTwoDates(campaignDetails?.startDate, new Date()) / campaignDetails?.duration}
              total={screenLevelData?.result?.totalData?.impressionsPromised?.toFixed(0)}
            />
          </div>
        </div>
      ) : type === "screen" ? (
        <div>
          <div className="flex items-center gap-2">
            <div className="rounded-full bg-purple-100 p-2">
              <i className="fi fi-rs-dashboard text-purple-500 lg:text-[14px] text-[12px] flex items-center justify-center"></i>
            </div>
            <h1 className="lg:text-[14px] md:text-[12px] font-bold truncate">Screen Performance</h1>
            <i className="fi fi-br-info text-gray-400 lg:text-[14px] text-[12px] flex items-center justify-center"></i>
          </div>
          <div className="p-2">
            <h1 className="lg:text-[40px] text-[36px] text-gray-900">{formatNumber(screenLevelData?.result?.totalData?.screenPerformance?.toFixed(0))}%</h1>
          </div>
          <div className="p-2">
            <LinearBar
              value={screenLevelData?.result?.totalData?.screenPerformance?.toFixed(0)}
              colors={["#F3F3F3", "#7AB3A2"]}
              highest={100}
            />
          </div>
        </div>
      ) : type === "spot" ? (
        <div>
          <div className="flex items-center gap-2">
            <div className="rounded-full bg-indigobg p-2">
              <i className="fi fi-rs-selling text-indigo lg:text-[14px] text-[12px] flex items-center justify-center"></i>
            </div>
            <h1 className="lg:text-[14px] md:text-[12px] font-bold truncate">Spot Delivery</h1>
            <i className="fi fi-br-info text-gray-400 lg:text-[14px] text-[12px] flex items-center justify-center"></i>
          </div>
          <div className="p-2">
            <h1 className="lg:text-[40px] text-[36px] text-gray-900">{formatNumber(screenLevelData?.result?.totalData?.slotsDelivered?.toFixed(0))}</h1>
          </div>
          <div className="p-2">
            <MultiColorLinearBar2
              delivered={screenLevelData?.result?.totalData?.slotsDelivered?.toFixed(0)}
              expected={screenLevelData?.result?.totalData?.slotsPromised?.toFixed(0) * getNumberOfDaysBetweenTwoDates(campaignDetails?.startDate, new Date()) / campaignDetails?.duration}
              total={screenLevelData?.result?.totalData?.slotsPromised?.toFixed(0)}
            />
          </div>
        </div>
      ) : type === "cost" ? (
        <div>
          <div className="flex items-center gap-2">
            <div className="rounded-full bg-greenbg p-2">
              <i className="fi fi-br-sack text-green lg:text-[14px] text-[12px] flex items-center justify-center"></i>
            </div>
            <h1 className="lg:text-[14px] md:text-[12px] font-bold truncate">Cost Consumed</h1>
            <i className="fi fi-br-info text-gray-400 lg:text-[14px] text-[12px] flex items-center justify-center"></i>
          </div>
          <div className="p-2">
            <h1 className="lg:text-[40px] text-[36px] text-gray-900">&#8377;{screenLevelData?.result?.totalData?.costConsumed?.toFixed(0)}</h1>
          </div>
          <div className="p-2">
            <LinearBar
              percent={false}
              value={screenLevelData?.result?.totalData?.costConsumed?.toFixed(0)}
              colors={["#F3F3F3", "#7AB3A2"]}
              highest={screenLevelData?.result?.totalData?.costTaken?.toFixed(0)}
            />
          </div>
        </div>
      ) : null}

    </div>
  );
};

import React, { useState } from "react";
import { CampaignDashboardTable } from "../../components/tables/CampaignDashboardTable";
import { EnhancedSelect } from "../../components/atoms/EnhancedSelect";
import ButtonInput from "../../components/atoms/ButtonInput";

export const SiteLevelPerformance = ({
  siteLevelData = [],
  campaignDetails,
}: any) => {
  const [currentCity, setCurrentCity] = useState<string>("");
  const [currentTouchPoint, setCurrentTouchPoint] = useState<string>("");

  const getUniqueOptions = (key: string) => {
    if (!Array.isArray(siteLevelData)) return [];
    const uniqueValues = Array.from(
      new Set(siteLevelData.map((item: any) => item?.[key]).filter(Boolean))
    );
    return uniqueValues.map((value) => ({
      label: value,
      value,
    }));
  };

  const renderSelect = (
    placeholder: string,
    value: string,
    onChange: (val: string) => void,
    key: string
  ) => (
    <EnhancedSelect
      options={getUniqueOptions(key)}
      onChange={onChange}
      placeholder={placeholder}
      value={value}
      size="sm"
    />
  );

  return (
    <div className="bg-[#FFFFFF] mt-2 w-full border border-gray-100 rounded-[12px] flex justify-between px-2">
      <div className="w-full">
        <div className="flex justify-between">
          <h1 className="text-[16px] py-4 px-2 font-normal leading-[19.36px] text[#0E212E]">
            Site Level Performance
          </h1>
          <div className="flex gap-4 items-center">
            {renderSelect(
              "Filter by city",
              currentCity,
              setCurrentCity,
              "city"
            )}
            {renderSelect(
              "Filter by touchPoint",
              currentTouchPoint,
              setCurrentTouchPoint,
              "touchPoint"
            )}

            <ButtonInput variant="outline" size="small">
              View All Logs
            </ButtonInput>
          </div>
        </div>

        <CampaignDashboardTable
          campaignDetails={campaignDetails}
          screenLevelData={siteLevelData}
          city={currentCity}
          currentTouchPoint={currentTouchPoint}
        />
      </div>
    </div>
  );
};

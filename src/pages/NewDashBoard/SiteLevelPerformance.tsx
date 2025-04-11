import React, { useState } from "react";
import { CampaignDashboardTable } from "../../components/tables/CampaignDashboardTable";
import { EnhancedSelect } from "../../components/atoms/EnhancedSelect";
import ButtonInput from "../../components/atoms/ButtonInput";

interface SiteData {
  city?: string;
  touchPoint?: string;
  screenType?: string;
  [key: string]: any;
}

interface SiteLevelPerformanceProps {
  siteLevelData?: SiteData[];
  campaignDetails?: any;
}

export const SiteLevelPerformance: React.FC<SiteLevelPerformanceProps> = ({
  siteLevelData = [],
  campaignDetails,
}) => {
  const [filters, setFilters] = useState({
    city: "",
    touchPoint: "",
    screenType: "",
  });

  const getUniqueOptions = (key: keyof SiteData) => {
    const uniqueValues = Array.from(
      new Set(
        siteLevelData
          .map((item) => item?.[key])
          .filter((value): value is string => Boolean(value))
      )
    );
    return uniqueValues.map((value) => ({ label: value, value }));
  };

  const getUniqueOptions1 = (key: keyof SiteData) => {
    const uniqueValues = Array.from(
      new Set(
        siteLevelData
          .map((item) => item?.[key])
          .filter((value): value is string => Boolean(value))
      )
    );
    return uniqueValues.map((value) => ({
      label:
        value === "Spectacular"
          ? "Iconic"
          : value === "Large"
          ? "Big"
          : "Small",
      value,
    }));
  };

  const handleFilterChange = (key: keyof typeof filters, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const resetFilters = () => {
    setFilters({
      city: "",
      touchPoint: "",
      screenType: "",
    });
  };

  const filteredResults = siteLevelData.filter((item) => {
    return (
      (!filters.city || item.city === filters.city) &&
      (!filters.touchPoint || item.touchPoint === filters.touchPoint) &&
      (!filters.screenType || item.screenType === filters.screenType)
    );
  });

  return (
    <div className="bg-white mt-2 w-full border border-gray-100 rounded-xl flex justify-between px-2">
      <div className="w-full">
        <div className="flex justify-between items-center">
          <h1 className="text-base py-4 px-2 font-semibold leading-5 text-gray-900">
            Site Level Performance
          </h1>
          <div className="flex gap-4 items-center">
            <EnhancedSelect
              options={getUniqueOptions("city")}
              onChange={(val) => handleFilterChange("city", val)}
              placeholder="Filter by city"
              value={filters.city}
              size="sm"
            />
            <EnhancedSelect
              options={getUniqueOptions("touchPoint")}
              onChange={(val) => handleFilterChange("touchPoint", val)}
              placeholder="Filter by touchPoint"
              value={filters.touchPoint}
              size="sm"
            />
            <EnhancedSelect
              options={getUniqueOptions1("screenType")}
              onChange={(val) => handleFilterChange("screenType", val)}
              placeholder="Filter by Screen Type"
              value={filters.screenType}
              size="sm"
            />
            <ButtonInput variant="outline" size="small" onClick={resetFilters}>
              Reset
            </ButtonInput>
            <ButtonInput variant="outline" size="small">
              View All Logs
            </ButtonInput>
          </div>
        </div>

        <CampaignDashboardTable
          campaignDetails={campaignDetails}
          screenLevelData={filteredResults}
        />
      </div>
    </div>
  );
};

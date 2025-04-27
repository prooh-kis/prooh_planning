import React, { useState } from "react";

interface SiteData {
  city?: string;
  touchPoint?: string;
  screenType?: string;
  [key: string]: any;
}

export const MonitoringPicturesAllSitesPopup = ({
  handleCancel,
  siteLevelData,
  loadingSiteLevel,
}: any) => {
  const [filters, setFilters] = useState({
    city: "",
    touchPoint: "",
    screenType: "",
  });

  const getUniqueOptions = (key: keyof SiteData) => {
    const uniqueValues = Array.from(
      new Set(
        siteLevelData
          ?.map((item: any) => item?.[key])
          ?.filter((value: any): value is string => Boolean(value))
      )
    );
    return uniqueValues.map((value) => ({ label: value, value }));
  };

  const getUniqueOptions1 = (key: keyof SiteData) => {
    const uniqueValues = Array.from(
      new Set(
        siteLevelData
          ?.map((item: any) => item?.[key])
          ?.filter((value: any): value is string => Boolean(value))
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

  const filteredResults = siteLevelData?.filter((item: any) => {
    return (
      (!filters.city || item.city === filters.city) &&
      (!filters.touchPoint || item.touchPoint === filters.touchPoint) &&
      (!filters.screenType || item.screenType === filters.screenType)
    );
  });

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-10 font-inter">
      <div className="border bg-[#FFFFFF] rounded-[10px] h-[80vh] w-[95%] p-4">
        <div className="relative inset-0 flex items-center justify-between gap-4 py-2 pr-5 border-b">
          <div className="flex gap-2 items-center">
            <h1 className="text-[#0E212E] font-semibold text-[20px] font-inter">
              Monitoring Pictures{" "}
              <span className="text-[#B0B0B0] text-[14px]">
                {/* ({sitesDataMapViewData?.length || 0} Sites) */}
              </span>
            </h1>
          </div>

          <i
            className="fi fi-br-cross text-[14px] cursor-pointer"
            onClick={handleCancel}
          />
        </div>
        <div className="grid grid-cols-12">
          <div className="col-span-7 grid grid-cols-10">
            <div className="col-span-3"></div>
            <div className="col-span-4"></div>
            <div className="col-span-3"></div>
          </div>
          <div className="col-span-5">
            <div className=""></div>
          </div>
        </div>
      </div>
    </div>
  );
};

import { useState } from "react";
import { formatNumber } from "../../utils/formatValue";
import { YearRangeSlider } from "./YearRangeSlider";

export function LandingPageMapStats({ data }: any) {
  const [year, setYear] = useState<any>("All");

  return (
    <div className="w-full rounded-[12px]">
      <div className="grid grid-cols-3 w-full gap-2">
        {[
          { label: "Countries", value: data?.countries },
          { label: "Cities", value: data?.cities },
          {
            label: "Touchpoints",
            value: data?.touchPoints?.length,
          },
          { label: "Venues", value: data?.venues },
          {
            label: "Screens",
            value: data?.screens?.length,
          },
          {
            label: "Reach",
            value: formatNumber(Number(data?.reach)),
          },
          {
            label: "CPM",
            value: `${data?.averagePricePerSlot?.toFixed(0)}`,
          },
          {
            label: "Campaigns",
            value: data?.campaigns,
          },
          {
            label: "Avg sq. ft",
            value: 204,
          },
        ].map((item, index) => (
          <div
            key={index}
            className={`truncate lg:py-6 py-4 px-8 col-span-1 flex flex-col items-center text-[#20272C] justify-center bg-[#EFF9FF] rounded-[12px]`}
          >
            <h1 className="lg:text-[32px] text-[20px] font-bold">
              {item.value ? item.value : 0}
            </h1>
            <p className="lg:text-[16px] text-[12px] truncate">{item.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

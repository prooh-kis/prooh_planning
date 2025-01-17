import { useState } from "react";
import { formatNumber } from "../../utils/formatValue";
import { YearRangeSlider } from "./YearRangeSlider";

export function LandingPageMapFooter({ data }: any) {
  const [year, setYear] = useState<any>("All");

  return (
    <div className="w-full bg-[#FFFFFF] rounded-[12px]">
      <div className="flex flex-col gap-4 py-2 w-full lg:w-[413px]">
        <h1 className="text-[40px] leading-[48px] font-bold tracking-[-0.03em] text-[#20272C] text-left font-inter">
          Our Advertising Journey
        </h1>

        <p className="text-[16px] font-[400] tracking-[-0.03em] text-[#254354] text-left font-inter">
          Our platform helps your business in managing expenses. These are some
          of the reasons why you
        </p>
      </div>
      <div className="flex items-center gap-2 py-4 w-full lg:w-[413px]">
        {["All", "2021", "2022", "2023"].map((value: string) => (
          <div
            key={value}
            onClick={() => setYear(value)}
            className={`py-1 px-2 rounded-[6px] lg:text-[14px] text-[12px] ${
              year === value
                ? "bg-[#129BFF] text-[#FFFFFF]"
                : "bg-[#F6F6F6] text-[#414141]"
            }`}
          >
            {value}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-3 py-4 w-full lg:w-[413px]">
        {[
          { label: "Countries", value: data?.countries, border: "border-b" },
          { label: "Cities", value: data?.cities, border: "border-x border-b" },
          {
            label: "Touchpoints",
            value: data?.touchPoints?.length,
            border: "border-b",
          },
          { label: "Venues", value: data?.venues },
          {
            label: "Screens",
            value: data?.screens?.length,
            border: "border-x",
          },
          {
            label: "Reach",
            value: formatNumber(Number(data?.reach)),
            border: "border-b",
          },
          {
            label: "Per Slot",
            value: `${data?.averagePricePerSlot?.toFixed(0)}`,
            border: "border-t",
          },
          {
            label: "Campaigns",
            value: data?.campaigns,
            border: "border-x border-t",
          },
          {
            label: "Avg sq. ft",
            value: 204,
          },
        ].map((item, index) => (
          <div
            key={index}
            className={`py-4 px-6 lg:px-8 col-span-1 flex flex-col items-center text-[#20272C] justify-center truncate ${
              item.border || ""
            }`}
          >
            <h1 className="lg:text-[32px] text-[24px] font-bold">
              {item.value ? item.value : 0}
            </h1>
            <p className="lg:text-[16px] text-[12px]truncate">{item.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

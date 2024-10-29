import { useState } from "react";
import { formatNumber } from "../../utils/formatValue";
import { YearRangeSlider } from "./YearRangeSlider";

export function LandingPageMapFooter({data}: any) {
  
  const [year, setYear] = useState<any>(new Date().getFullYear());
  return (
    <div
      className="absolute mt-[-120px] left-1/2 transform -translate-x-1/2 w-[90%] z-10 p-4 border bg-white rounded-[12px] shadow-lg"
      style={{ marginBottom: "0px" }}
    >
      <div className="grid grid-cols-12 pb-6">
        <div className="col-span-3">
          <h1 className="text-[32px] text-[#1F485F] font-semibold">Our journey so far</h1>
        </div>
        <div className="col-span-9">
          <YearRangeSlider
             setYear={setYear}
             years={5}
             year={year}
          />
        </div>
      </div>
      <div className="flex justify-between items-center">
        <div className="rounded-[12px] bg-[#F6FBFF] w-36 px-2 py-4 flex flex-col justify-center items-center">
          <h1 className="text-[#129BFF] text-[14px] font-bold">{data?.countries}</h1>
          <p className="text-[#129BFF] text-[12px]">Country</p>
        </div>
        <div className="rounded-[12px] bg-[#F6FBFF] w-36 px-2 py-4 flex flex-col justify-center items-center">
          <h1 className="text-[#129BFF] text-[14px] font-bold">{data?.cities}</h1>
          <p className="text-[#129BFF] text-[12px]">Cities</p>
        </div>
        <div className="rounded-[12px] bg-[#F6FBFF] w-36 px-2 py-4 flex flex-col justify-center items-center">
          <h1 className="text-[#129BFF] text-[14px] font-bold">{data?.touchPoints}</h1>
          <p className="text-[#129BFF] text-[12px]">Touchpoints</p>
        </div>
        <div className="rounded-[12px] bg-[#F6FBFF] w-36 px-2 py-4 flex flex-col justify-center items-center">
          <h1 className="text-[#129BFF] text-[14px] font-bold">{data?.venues}</h1>
          <p className="text-[#129BFF] text-[12px]">Venues</p>
        </div>
        <div className="rounded-[12px] bg-[#F6FBFF] w-36 px-2 py-4 flex flex-col justify-center items-center">
          <h1 className="text-[#129BFF] text-[14px] font-bold">{data?.screens?.length}</h1>
          <p className="text-[#129BFF] text-[12px]">Screens</p>
        </div>
        <div className="rounded-[12px] bg-[#F6FBFF] w-36 px-2 py-4 flex flex-col justify-center items-center">
          <h1 className="text-[#129BFF] text-[14px] font-bold">{formatNumber(Number(data?.reach))}</h1>
          <p className="text-[#129BFF] text-[12px]">Reach</p>
        </div>
        <div className="rounded-[12px] bg-[#F6FBFF] w-36 px-2 py-4 flex flex-col justify-center items-center truncate">
          <h1 className="text-[#129BFF] text-[14px] font-bold">&#8377;{data?.averagePricePerSlot}</h1>
          <p className="text-[#129BFF] text-[12px] truncate">Per Slot Price</p>
        </div>
        <div className="rounded-[12px] bg-[#F6FBFF] w-36 px-1 py-4 flex flex-col justify-center items-center truncate">
          <h1 className="text-[#129BFF] text-[14px] font-bold">{data?.campaigns}</h1>
          <p className="text-[#129BFF] text-[12px] truncate">Planned Campaigns</p>
        </div>
      </div>
    </div>
  );
}

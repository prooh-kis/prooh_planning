import { useState } from "react";
import { formatNumber } from "../../utils/formatValue";
import { YearRangeSlider } from "./YearRangeSlider";

export function LandingPageMapFooter({data}: any) {
  
  const [year, setYear] = useState<any>(new Date().getFullYear());
  return (
    // <div
    //   className="absolute mt-4 left-1/2 transform -translate-x-1/2 w-[90%] z-10 p-4 border bg-white rounded-[12px] shadow-lg"
    //   style={{ marginBottom: "0px" }}
    // >
    <div className="w-full p-4 bg-white rounded-[12px]">
      <div className="flex flex-col gap-4 py-2">
        <h1 className="text-[32px] text-[#1F485F] font-semibold text-wrap">Our Advertising Journey</h1>
        <p className="lg:text-[14px] text-[12px] text-wrap">Our platform helps your business in managing expenses. These are some of the reasons why you</p>
      </div>
      <div className="flex items-center gap-2 py-4">
        {/* <YearRangeSlider
            setYear={setYear}
            years={3}
            year={year}
        /> */}
        <div className="bg-gray-100 py-1 px-2 rounded-[6px]">
          <h1 className="lg:text-[14px] text-[12px]">All</h1>
        </div>
        <div className="bg-gray-100 py-1 px-2 rounded-[6px]">
          <h1 className="lg:text-[14px] text-[12px]">2021</h1>
        </div>
        <div className="bg-gray-100 py-1 px-2 rounded-[6px]">
          <h1 className="lg:text-[14px] text-[12px]">2022</h1>
        </div>
        <div className="bg-gray-100 py-1 px-2 rounded-[6px]">
          <h1 className="lg:text-[14px] text-[12px]">2023</h1>
        </div>
        <div className="bg-primaryButton py-1 px-2 rounded-[6px]">
          <h1 className="lg:text-[14px] text-[12px] text-white font-semibold">2024</h1>
        </div>
      </div>
      <div className="grid grid-cols-3 py-4">
        <div className="py-4 px-8 col-span-1 border-b flex flex-col items-center justify-center">
          <h1 className="lg:text-[32px] text-[24px] font-bold">{data?.countries}</h1>
          <p className="text-[12px] truncate">Country</p>
        </div>
        <div className="py-4 px-8 col-span-1 border-x border-b flex flex-col items-center justify-center">
          <h1 className="lg:text-[32px] text-[24px] font-bold">{data?.cities}</h1>
          <p className=" text-[12px] truncate">Cities</p>
        </div>
        <div className="py-4 px-8 col-span-1 border-b flex flex-col items-center justify-center">
          <h1 className="lg:text-[32px] text-[24px] font-bold">{data?.touchPoints?.length}</h1>
          <p className="text-[12px] truncate">Touchpoints</p>
        </div>
        <div className="py-4 px-8 col-span-1 flex flex-col items-center justify-center">
          <h1 className="lg:text-[32px] text-[24px] font-bold">{data?.venues}</h1>
          <p className="text-[12px] truncate">Venues</p>
        </div>
        <div className="py-4 px-8 col-span-1 border-x flex flex-col items-center justify-center">
          <h1 className="lg:text-[32px] text-[24px] font-bold">{data?.screens?.length}</h1>
          <p className="text-[12px] truncate">Screens</p>
        </div>
        <div className="py-4 px-8 col-span-1 flex flex-col items-center justify-center">
          <h1 className="lg:text-[32px] text-[24px] font-bold">{formatNumber(Number(data?.reach))}</h1>
          <p className="text-[12px] truncate">Reach</p>
        </div>
        <div className="py-4 px-8 col-span-1 border-t flex flex-col items-center justify-center">
          <h1 className="lg:text-[32px] text-[24px] font-bold">&#8377;{data?.averagePricePerSlot?.toFixed(0)}</h1>
          <p className="text-[12px] truncate">Per Slot</p>
        </div>
        <div className="py-4 px-8 col-span-1 border-x border-t flex flex-col items-center justify-center">
          <h1 className="lg:text-[32px] text-[24px] font-bold">{data?.campaigns}</h1>
          <p className="text-[12px] truncate">Campaigns</p>
        </div>
        <div className="py-4 px-8 col-span-1 border-t flex flex-col items-center justify-center">
          {/* <h1 className="lg:text-[32px] text-[24px] font-bold">{data?.touchPoints?.length}</h1>
          <p className="text-[12px] truncate">Touchpoints</p> */}
        </div>
      </div>
    </div>
  );
}

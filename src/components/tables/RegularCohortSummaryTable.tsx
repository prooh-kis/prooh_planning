import { Tooltip } from "antd";
import { TabWithIcon } from "../../components/molecules/TabWithIcon";
import { useState } from "react";

interface RegularCohortSummaryTableProps {
  touchPointData?: any;
  type?: any;
}

export const RegularCohortSummaryTable = ({ type, touchPointData }: RegularCohortSummaryTableProps) => {
  const days: any = {
    "weekdays" : "Weekdays",
    "saturdays": "Saturdays",
    "sundays": "Sundays"
  };

  const [day, setDay] = useState<any>("weekdays");

  const calculateIncludedVsTotal = (data: any) => {
    const result: any = {
      morning: { included: 0, total: 0 },
      afternoon: { included: 0, total: 0 },
      evening: { included: 0, total: 0 },
      night: { included: 0, total: 0 },
      overall: { included: 0, total: 0 }
    };
  
    data.forEach((entry: any) => {
      const dayWiseData = entry.dayWiseData;
      Object.values(dayWiseData).forEach((dayData: any) => {
        Object.keys(result).forEach((period: any) => {
          if (period !== "overall" && dayData[period]) {
            // Update counts for individual periods
            result[period].total += 1;
            if (dayData[period].included) {
              result[period].included += 1;
            }
            // Update overall counts
            result.overall.total += 1;
            if (dayData[period].included) {
              result.overall.included += 1;
            }
          }
        });
      });
    });

    const saved: any = (result["overall"]["included"] * 100/
    result["overall"]["total"]).toFixed(0);
    const wastagePercentage = 100 - Number(saved);
    return wastagePercentage;
  };
  
  return (
    <div className="py-4">
      <div className="flex gap-2 pt-2">
        <h1 className="md:text-[14px] sm:text-[12px]">{type === "cohort" ? "Cohort" : "Regular"} Time & Day Summary</h1>
        <Tooltip
          className=""
        >
          <i className="fi fi-rs-info flex items-center text-[#9A9A9A] text-[10px]"></i>
        </Tooltip>
      </div>
      <div className="flex justify-between border-b my-2">
        <div className="flex gap-10">
          {Object.keys(days)?.map((d: any, i: any) => (
            <div key={i}
              onClick={() => {
                setDay(d);
              }}
              className={`py-1 px-1 ${day === d && "border-b border-primaryButton"}`}
            >
              <h1 className="text-[14px]">{days[d]}</h1>
            </div>
          ))}
        </div>
        <div className="flex gap-2 items-center">
          <h1 className="text-[14px]">
            Wastage Controlled
          </h1>
          <Tooltip
            title={
              calculateIncludedVsTotal(touchPointData) > 0 ? `We have ommitted ${calculateIncludedVsTotal(touchPointData)}% of overall slots, which have lower exposure to your target audience and reduced your wastage` : 
              `All the slots are relevantly exposed to your target audience`
            }
          >
            <i className="fi fi-rs-info pr-1 text-[14px] text-gray-400 flex justify-center items-center"></i>
          </Tooltip>
          <h1 className="text-[14px] text-green-500">
            {calculateIncludedVsTotal(touchPointData)}%
          </h1>
        </div>
      </div>
      <table className="w-full">
        <thead className={`w-full`}>
          <tr className="bg-[#C9E9FF] w-full h-[40px]">
            <th className="text-[14px] font-semibold px-2">
              Touchpoint
            </th>
            <th className="text-[14px] font-semibold px-2">
              Morning
            </th>
            <th className="text-[14px] font-semibold  px-2">
              Afternoon
            </th>
            <th className="text-[14px] font-semibold  px-2">
              Evening
            </th>
            <th className="text-[14px] font-semibold px-2">
              Night
            </th>
          </tr>
          <tr className="bg-[#FAFAFA] h-[40px]">
            <th>{" "}</th>
            <th className="text-[12px] font-semibold px-2">08 AM - 12 Noon</th>
            <th className="text-[12px] font-semibold px-2">12 Noon - 05 PM</th>
            <th className="text-[12px] font-semibold px-2">05 PM - 09 PM</th>
            <th className="text-[12px] font-semibold px-2">09 PM - 01 AM</th>

          </tr>
        </thead>
        <tbody>
          {touchPointData?.map((tp: any, index: any) => (
            <tr key={index} className="border-b">
              <td className="p-2 truncate">
                <p className="text-[14px] flex justify-start truncate">
                  {tp?.touchPoint}
                </p>
              </td>
              <td className="p-2">
                <div className="grid grid-cols-3 flex justify-center items-center">
                    {tp?.dayWiseData[day]["morning"]["included"] ? 
                      <i className="fi fi-br-check flex items-center text-green-500 text-[12px]"></i>
                    :
                      <i className="fi fi-br-cross flex items-center text-red-500 text-[12px]"></i>
                    }
                    <p className={`${!tp?.dayWiseData[day]["morning"]["included"] && "text-red-500"} col-span-1 text-[12px] flex justify-center`}>
                      {tp?.dayWiseData[day]["morning"]["percentage"].toFixed(1)}%
                    </p>
                </div>
               
              </td>
              <td className="p-2">
                <div className="grid grid-cols-3 flex justify-center items-center">
                  {tp?.dayWiseData[day]["afternoon"]["included"] ? 
                    <i className="fi fi-br-check flex items-center text-green-500 text-[12px]"></i>
                  :
                    <i className="fi fi-br-cross flex items-center text-red-500 text-[10px]"></i>
                  }
                  <p className={`${!tp?.dayWiseData[day]["afternoon"]["included"] && "text-red-500"} col-span-1 text-[12px] flex justify-center`}>
                    {tp?.dayWiseData[day]["afternoon"]["percentage"].toFixed(1)}%
                  </p>
                </div>
              </td>
              <td className="p-2">
                <div className="grid grid-cols-3 flex justify-center items-center">
                  {tp?.dayWiseData[day]["evening"]["included"] ? 
                    <i className="fi fi-br-check flex items-center text-green-500 text-[12px]"></i>
                  :
                    <i className="fi fi-br-cross flex items-center text-red-500 text-[10px]"></i>
                  }
                  <p className={`${!tp?.dayWiseData[day]["evening"]["included"] && "text-red-500"} col-span-1 text-[12px] flex justify-center`}>
                    {tp?.dayWiseData[day]["evening"]["percentage"].toFixed(1)}%
                  </p>
                </div>
              </td>
              <td className="p-2">
                <div className="grid grid-cols-3 flex justify-center items-center">
                  {tp?.dayWiseData[day]["night"]["included"] ? 
                    <i className="fi fi-br-check flex items-center text-green-500 text-[12px]"></i>
                  :
                    <i className="fi fi-br-cross flex items-center text-red-500 text-[10px]"></i>
                  }
                  <p className={`${!tp?.dayWiseData[day]["night"]["included"] && "text-red-500"} col-span-1 text-[12px] flex justify-center`}>
                    {tp?.dayWiseData[day]["night"]["percentage"].toFixed(1)}%
                  </p>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
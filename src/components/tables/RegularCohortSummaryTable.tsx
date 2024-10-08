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
  return (
    <div className="py-4">
      <div className="flex gap-2">
        <h1>{type === "cohort" ? "Cohort" : "Regular"} Time & Day Summary</h1>
        <i className="fi fi-rs-info flex items-center text-[#9A9A9A] text-[12px]"></i>
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
          <h1 className="text-[14px]">
            22%
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
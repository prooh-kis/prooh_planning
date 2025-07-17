import React, { useEffect, useState } from "react";
import { TeamOutlined, DownOutlined, RightOutlined } from "@ant-design/icons";
import { convertDataTimeToLocale, getCampaignEndingStatus } from "../../utils/dateAndTimeUtils";
import { formattedINR } from "../../utils/formatValue";
import { MultiColorLinearBar2 } from "../../components/molecules/MultiColorLinearBar2";

interface CampaignListTableProps {
  data?: any;
  onDoubleClick?: any;
}

export const CampaignListTable: React.FC<CampaignListTableProps> = ({
  data,
  onDoubleClick
}) => {
 
  return (
    <div className="w-full py-2">
     <table className="w-full">
      <thead className="w-full">
        <tr className="bg-primaryButton w-full grid grid-cols-12 rounded-t-[8px] text-white text-[10px]">
          <th className="py-2 col-span-5 flex justify-around items-center truncate">
            <div className="grid grid-cols-12 w-full">
              <h1 className="col-span-1 truncate">Sl.No.</h1>
              <h1 className="col-span-4 text-start truncate">Campaign</h1>
              <h1 className="col-span-3 text-start truncate">Brand</h1>
              <h1 className="col-span-3 text-start truncate">Group</h1>
              <h1 className="col-span-1 text-center truncate">Screens</h1>
            </div>
          </th>
          <th className="py-2 col-span-3 flex justify-around items-center truncate">
            <div className="grid grid-cols-8 w-full">
              <h1 className="col-span-4 truncate">Start</h1>
              <h1 className="col-span-4 truncate">End</h1>

            </div>
          </th>
          <th className="py-2 col-span-4 flex justify-around items-center truncate">
            <div className="grid grid-cols-12 w-full">
              <h1 className="col-span-2 text-center truncate">Ends In</h1>
              <h1 className="col-span-2 text-center truncate">Budget</h1>
              <h1 className="col-span-3 truncate">Performance</h1>
              <h1 className="col-span-2 truncate">Monitoring</h1>
              <h1 className="col-span-3 text-start truncate">Manager</h1>

            </div>
          </th>
        </tr>
      </thead>
      <tbody>
        {data?.map((campaign: any, i: any) => (
          <tr key={i} className={`border w-full grid grid-cols-12 text-[10px] ${i === data?.length - 1 ? "rounded-b-[8px]" : ""} hover:bg-[#E6E6E650] cursor-pointer`} onDoubleClick={() => onDoubleClick(campaign?.campaignCreationId)}>
            <td className="py-2 col-span-5 truncate flex justify-around items-center gap-2">
              <div className="grid grid-cols-12 w-full">
                <h1 className="col-span-1 truncate px-2">{i+1}.</h1>
                <h1 className="col-span-4 truncate text-start">{campaign?.name}</h1>
                <h1 className="col-span-3 truncate text-start">{campaign?.brandName}</h1>
                <h1 className="col-span-3 truncate text-start">{campaign?.clientName}</h1>
                <h1 className="col-span-1 truncate text-center">{campaign?.screenIds?.length}</h1>
              </div>
            </td>
            <td className="py-2 col-span-3 truncate flex justify-around items-center gap-2">
              <div className="grid grid-cols-8 w-full">
                <h1 className="col-span-4 truncate text-center">{convertDataTimeToLocale(campaign?.startDate)}</h1>
                <h1 className="col-span-4 truncate text-center">{convertDataTimeToLocale(campaign?.endDate)}</h1>
              </div>
            </td>
      
            <td className="py-2 col-span-4 truncate flex justify-around items-center gap-2">
              <div className="grid grid-cols-12 w-full">
                <h1 className="col-span-2 truncate text-center">{getCampaignEndingStatus(campaign?.endDate).split("Ends In : ")[1]}</h1>
                <h1 className="col-span-2 truncate text-center">{formattedINR(campaign?.totalCampaignBudget)}</h1>
                <div className="col-span-3 flex items-center gap-2 truncate text-center px-3">
                  <MultiColorLinearBar2 
                    delivered={Number((campaign?.performance * 100).toFixed(0))} 
                    expected={100}
                    total={100}
                    height="h-1"
                    deliveredColor={`${campaign?.performance >= 1 ? "bg-[#4DB37E]" : "bg-[#EF4444]" }`}
                    expectedColor="bg-[#E6E6E6]"
                    totalColor="bg-[#E6E6E6]"
                  />
                  <h1 className={`${campaign?.performance >= 1 ? "text-[#4DB37E]" : "text-[#EF4444]" }`}>
                    {(campaign?.performance * 100).toFixed(0)} %
                  </h1>
                </div>
                <h1 className="col-span-2 truncate text-center">mon</h1>
                <h1 className="col-span-3 truncate text-start">{campaign?.campaignPlannerName}</h1>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
     </table>
    </div>
  );
};

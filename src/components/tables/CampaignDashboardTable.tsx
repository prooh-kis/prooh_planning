import { formatNumber } from "../../utils/formatValue"

interface CostSummartTabelProps {
  screenLevelData?: any,
}

export const CampaignDashboardTable = ({
  screenLevelData
}: CostSummartTabelProps) => {

  return (
    <div>
      <table className="table-auto w-full">
        <thead className="bg-[#F7F7F7] w-full flex justify-between items-center">
          <tr className="flex w-full items-center h-[40px]">
            <th className="w-full flex items-center justify-center">
              <h1 className="text-[14px] text-[#21394F]">Sr.</h1>
            </th>
            <th className="w-full flex items-center justify-center">
              <h1 className="text-[14px] text-[#21394F]">Screen Name</h1>
            </th>
            <th className="w-full flex items-center justify-center">
              <h1 className="text-[14px] text-[#21394F]">Location</h1>
            </th>
            <th className="w-full flex items-center justify-center">
              <h1 className="text-[14px] text-[#21394F]">Touchpoint</h1>
            </th>
            <th className="w-full flex items-center justify-center">
              <h1 className="text-[14px] text-[#21394F]">Days</h1>
            </th>
            <th className="w-full flex items-center justify-center">
              <h1 className="text-[14px] text-[#21394F]">Spots</h1>
            </th>
            <th className="w-full flex items-center justify-center">
              <h1 className="text-[14px] text-[#21394F]">Impressions</h1>
            </th>
            <th className="w-full flex items-center justify-center">
              <h1 className="text-[14px] text-[#21394F]">Cost</h1>
            </th>
            <th className="w-full flex items-center justify-center">
              <h1 className="text-[14px] text-[#21394F]">Delivery</h1>
            </th>
            <th className="w-full flex items-center justify-center">
              <h1 className="text-[14px] text-[#21394F]">Logs</h1>
            </th>
            <th className="w-full flex items-center justify-center">
              <h1 className="text-[14px] text-[#21394F]">Monitoring</h1>
            </th>
            <th className="w-full flex items-center justify-center">
              <h1 className="text-[14px] text-[#21394F]">Action</h1>
            </th>
          </tr>
        </thead>
        <tbody className="overflow-scroll">
          {screenLevelData && Object.keys(screenLevelData)?.length && Object.keys(screenLevelData)?.filter((d: any) => d !== "totalData")?.map((data: any, index: any) => (
            <tr key={data} className="flex w-full h-[40px]">
              <td className="w-full flex items-center justify-center">
                <p className="text-[12px]">{index + 1}</p>
              </td>
              <td className="w-full flex items-center justify-center truncate">
                <p className="text-[12px] truncate px-1">{screenLevelData[data]?.screenName}</p>
              </td>
              <td className="w-full flex items-center justify-center">
                <p className="text-[12px]">{screenLevelData[data]?.location}</p>
              </td>
              <td className="w-full flex items-center justify-center">
                <p className="text-[12px]">{screenLevelData[data]?.touchPoint}</p>
              </td>
              <td className="w-full flex items-center justify-center">
                <p className="text-[12px]">{screenLevelData[data]?.durationPromised}</p>
              </td>
              <td className="w-full flex items-center justify-center">
                <p className="text-[12px]">{screenLevelData[data]?.slotsDelivered}</p>
              </td>
              <td className="w-full flex items-center justify-center">
                <p className="text-[12px]">
                  {formatNumber(screenLevelData[data]?.impressionsDelivered.toFixed(0))}
                </p>
              </td>
              <td className="w-full flex items-center justify-center">
                <p className="text-[12px]">
                  {formatNumber(screenLevelData[data]?.costConsumed.toFixed(0))}
                </p>
              </td>
              <td className="w-full flex items-center justify-center">
                <p className="text-[12px]">
                  {(screenLevelData[data]?.slotsDelivered * 100 / screenLevelData[data]?.slotsPromised).toFixed(2)} %
                </p>
              </td>
              <td className="w-full flex items-center justify-center">
                <i className="fi fi-sr-down-to-line text-[12px] text-[#129BFF]"></i>
              </td>
              <td className="w-full flex items-center justify-center">
                <i className="fi fi-sr-picture text-[12px] text-[#129BFF]"></i>
              </td>
              <td className="w-full flex items-center justify-center">
                <i className="fi fi-sr-eye text-[12px] text-[#129BFF]"></i>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>

  )
}

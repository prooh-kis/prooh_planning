import { formatNumber } from "../../utils/formatValue"

interface CostSummartTabelProps {
  totalData?: any,
  selectedData?: any,
  screenLevelData?: any,
}

export const CampaignDashboardTable = ({
  totalData,
  selectedData,
  screenLevelData
}: CostSummartTabelProps) => {
  
  return (

    <table className="w-full">
      <thead className="bg-[#F7F7F7] flex justify-between items-center w-full">
        <tr className="flex justify-between w-full h-[40px]">
          <th className="flex w-full items-center justify-center gap-2">
            <h1 className="text-[14px] text-[#21394F]">
              Sr.
            </h1>
          </th>
          <th className="flex w-full items-center justify-center gap-2">
            <h1 className="text-[14px] text-[#21394F]">
              Screen Name
            </h1>
          </th>
          <th className="flex w-full items-center justify-center gap-2">
            <h1 className="text-[14px] text-[#21394F]">
              Location
            </h1>
          </th>
          <th className="flex w-full items-center justify-center gap-2">
            <h1 className="text-[14px] text-[#21394F]">
              Touchpoint
            </h1>
          </th>
          <th className="flex w-full items-center justify-center gap-2">
            <h1 className="text-[14px] text-[#21394F]">
              Days
            </h1>
          </th>
          <th className="flex w-full items-center justify-center gap-2">
            <h1 className="text-[14px] text-[#21394F]">
              Slots Played
            </h1>
          </th>
          <th className="flex w-full items-center justify-center gap-2">
            <h1 className="text-[14px] text-[#21394F]">
              Impressions
            </h1>
          </th>
          <th className="flex w-full items-center justify-center gap-2">
            <h1 className="text-[14px] text-[#21394F]">
              Cost
            </h1>
          </th>
          <th className="flex w-full items-center justify-center gap-2">
            <h1 className="text-[14px] text-[#21394F]">
              Delivery
            </h1>
          </th>
          <th className="flex w-full items-center justify-center gap-2">
            <h1 className="text-[14px] text-[#21394F]">
              Log Report
            </h1>
          </th>
          <th className="flex w-full items-center justify-center gap-2">
            <h1 className="text-[14px] text-[#21394F]">
              Monitoring
            </h1>
          </th>
          <th className="flex w-full items-center justify-center gap-2">
            <h1 className="text-[14px] text-[#21394F]">
              Action
            </h1>
          </th>
        </tr>
      </thead>
      <tbody className="border overflow-scroll w-full">
        {screenLevelData && Object.keys(screenLevelData)?.length && Object.keys(screenLevelData)?.map((data: any, index: any) => (
          <tr key={data} className="flex justify-between w-full h-[40px]">
            <td className="flex w-full items-center justify-center gap-2">
              <p className="text-[12px]">{index + 1}</p>
            </td>
            <td className="flex w-full items-center justify-center gap-2">
              <p className="text-[12px]">
                {screenLevelData[data]?.screenName}
              </p>
            </td>
            <td className="flex w-full items-center justify-center gap-2">
              <p className="text-[12px]">
                {screenLevelData[data]?.location}
              </p>
            </td>
            <td className="flex w-full items-center justify-center gap-2">
              <p className="text-[12px]">
                {screenLevelData[data]?.touchPoint}
              </p>
            </td>
            <td className="flex w-full items-center justify-center gap-2">
              <p className="text-[12px]">
                {screenLevelData[data]?.durationPromised}
              </p>
            </td>
            <td className="flex w-full items-center justify-center gap-2">
              <p className="text-[12px]">
                {screenLevelData[data]?.slotsDelivered}
              </p>
            </td>
            <td className="flex w-full items-center justify-center gap-2">
              <p className="text-[12px]">
                {screenLevelData[data]?.impressionsDelivered}
              </p>
            </td>
            <td className="flex w-full items-center justify-center gap-2">
              <p className="text-[12px]">
                {screenLevelData[data]?.costConsumed}
              </p>
            </td>
            <td className="flex w-full items-center justify-center gap-2">
              <p className="text-[12px]">
                {screenLevelData[data]?.impressionsDelivered } %
              </p>
            </td>
            <td className="flex w-full items-center justify-center gap-2">
              <p className="text-[12px]">
                Download
              </p>
            </td>
            <td className="flex w-full items-center justify-center gap-2">
              <p className="text-[12px]">
                View
              </p>
            </td>
            <td>
              <p className="text-[12px]">
                See
              </p>
            </td>
          </tr>
        ))}
     </tbody>
    </table>
  )
}
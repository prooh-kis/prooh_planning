import { formatNumber } from "../../utils/formatValue"

interface CostSummartTabelProps {
  totalData?: any,
  selectedData?: any,
}

export const CampaignDashboardTable = ({
  totalData,
  selectedData,
}: CostSummartTabelProps) => {
  return (

    <table className="w-full">
      <thead className="bg-[#F7F7F7] flex justify-between items-center w-full">
        <tr className="flex justify-between w-full h-[40px]">
          <th className="flex w-full items-center justify-center gap-2">
            <h1 className="text-[14px] text-[#21394F]">
              
            </h1>
          </th>
          <th className="flex w-full items-center justify-center gap-2">
            <h1 className="text-[14px] text-[#21394F]">
              Cities
            </h1>
          </th>
          <th className="flex w-full items-center justify-center gap-2">
            <h1 className="text-[14px] text-[#21394F]">
              Touchpoints
            </h1>
          </th>
          <th className="flex w-full items-center justify-center gap-2">
            <h1 className="text-[14px] text-[#21394F]">
              Screens
            </h1>
          </th>
          <th className="flex w-full items-center justify-center gap-2">
            <h1 className="text-[14px] text-[#21394F]">
              Duration
            </h1>
          </th>
          <th className="flex w-full items-center justify-center gap-2">
            <h1 className="text-[14px] text-[#21394F]">
              Impressions
            </h1>
          </th>
          <th className="flex w-full items-center justify-center gap-2">
            <h1 className="text-[14px] text-[#21394F]">
              Budget
            </h1>
          </th>
          <th className="flex w-full items-center justify-center gap-2">
            <h1 className="text-[14px] text-[#21394F]">
              CPM
            </h1>
          </th>
        </tr>
      </thead>
      <tbody className="border overflow-scroll">
     </tbody>
    </table>
  )
}
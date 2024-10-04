import { formatNumber } from "../../utils/formatValue";

interface RegularCohortSlotsCampaignTableProps {
  priceData?: any;
  setShowSummary?: any;
  type?: any;
  showSummary?: any;
}
export const RegularCohortSlotsCampaignTable = ({ type, setShowSummary, priceData, showSummary }: RegularCohortSlotsCampaignTableProps) => {
  return (
    <table className="w-full">
      <thead className={`bg-[${type === "regular" ? "#F7F7F7" : "#DFE8FF"}] flex justify-between items-center w-full`}>
        <tr className="flex justify-between w-full h-[40px]">
          <th className="flex w-full items-center justify-center gap-2">
            <h1 className="text-[14px] text-[#21394F]">
              Total Screens
            </h1>
          </th>
          <th className="flex w-full items-center justify-center gap-2">
            <h1 className="text-[14px] text-[#21394F]">
              CPM
            </h1>
          </th>
          <th className="flex w-full items-center justify-center gap-2">
            <h1 className="text-[14px] text-[#21394F]">
              Impressions/Day
            </h1>
          </th>
          <th className="flex w-full items-center justify-center gap-2">
            <h1 className="text-[14px] text-[#21394F]">
              Total Slots/Day
            </h1>
          </th>
          <th className="flex w-full items-center justify-center gap-2">
            <h1 className="text-[14px] text-[#21394F]">
              Price/Slot
            </h1>
          </th>
          <th className="flex w-full items-center justify-center gap-2">
            <h1 className="text-[14px] text-[#21394F]">
              Total Cost
            </h1>
          </th>
          {/* <th className="flex w-full items-center justify-center gap-2">
            <h1 className="text-[14px] text-[#21394F]">
              SOV
            </h1>
          </th> */}
          <th className="flex w-full items-center justify-center gap-2">
            <h1 className="text-[14px] text-[#21394F]">
              Duration
            </h1>
          </th>
          <th className="flex w-full items-center justify-center gap-2">
            <h1 className="text-[14px] text-[#21394F]">
              Details
            </h1>
          </th>
        </tr>
      </thead>
      <tbody className="border overflow-scroll">
        <tr className=" flex justify-between border-b w-full h-[45px]">
          <th className="flex w-full items-center justify-center gap-2">
            <h1 className="text-[14px] text-[#21394F]">
              {priceData?.tableData?.totalScreens}
            </h1>
          </th>
          <th className="flex w-full items-center justify-center gap-2">
            <h1 className="text-[14px] text-[#21394F] font-normal">
              &#8377;{
                priceData?.tableData?.cpm.toFixed(0) > 1 
                  ? priceData?.tableData?.cpm.toFixed(0)
                  : 1
              }
            </h1>
          </th>
          <th className="flex w-full items-center justify-center gap-2">
            <h1 className="text-[14px] text-[#21394F] font-normal">
              {formatNumber(priceData?.tableData?.impressionPerDay.toFixed(0) || 0)}
            </h1>
          </th>
          <th className="flex w-full items-center justify-center gap-2">
            <h1 className="text-[14px] text-[#21394F] font-normal">
              {priceData?.tableData?.totalSlotsPerDay.toFixed(0)}
            </h1>
          </th>
          <th className="flex w-full items-center justify-center gap-2">
            <h1 className="text-[14px] text-[#21394F] font-normal">
              &#8377;{priceData?.tableData?.pricePerSlot.toFixed(0)}
            </h1>
          </th>
          <th className="flex w-full items-center justify-center gap-2">
            <h1 className="text-[14px] text-[#21394F] font-normal">
              &#8377;{formatNumber(priceData?.tableData?.costOfCampaign.toFixed(0) || 0)}
            </h1>
          </th>
          {/* <th className="flex w-full items-center justify-center gap-2">
            <h1 className="text-[14px] text-[#21394F] font-normal">
              {priceData?.tableData?.sov}
            </h1>
          </th> */}
          <th className="flex w-full items-center justify-center gap-2">
            <h1 className="text-[14px] text-[#21394F] font-normal">
              {priceData?.tableData?.duration} Days
            </h1>
          </th>
          <th
            className="flex w-full items-center justify-center gap-2"
            onClick={() => {
              if (showSummary === type) {
                setShowSummary(null);
              } else {
                setShowSummary(type);
              }
            }}
          >
            <h1 className="text-[14px] text-[#21394F] font-normal">
              <i className="fi fi-sr-eye"></i>
            </h1>
          </th>
        </tr>
      </tbody>
    </table>
  )
}
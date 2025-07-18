import { Loading } from "../../components/Loading";
import { formatNumber } from "../../utils/formatValue";

interface RegularCohortSlotsCampaignTableProps {
  priceData?: any;
  setShowSummary?: any;
  type?: any;
  showSummary?: any;
  loading?: boolean;
  campaignDetails?: any;
}
export const RegularCohortSlotsCampaignTable = ({
  type,
  setShowSummary,
  priceData,
  showSummary,
  loading,
  campaignDetails,
}: RegularCohortSlotsCampaignTableProps) => {
  return (
    <table className="w-full">
      <thead
        className={`border rounded-t
          ${type === "regular" ? "bg-[#F7F7F7]" : "bg-[#DFE8FF]"}
        flex justify-between items-center w-full`}
      >
        <tr className="flex justify-between w-full h-[40px] grid grid-cols-12">
          <th className="col-span-1 flex w-full items-center justify-center gap-2 border-r truncate">
            <h1 className="text-[14px] text-[#21394F] truncate">
              City
            </h1>
          </th>
          <th className="col-span-1 flex w-full items-center justify-center gap-2 border-r truncate">
            <h1 className="text-[14px] text-[#21394F] truncate">
              Screens
            </h1>
          </th>
          <th className="col-span-1 flex w-full items-center justify-center gap-2 border-r">
            <h1 className="text-[14px] text-[#21394F]">CPM</h1>
          </th>
          <th className="col-span-2 flex w-full items-center justify-center gap-2 border-r truncate">
            <h1 className="text-[14px] text-[#21394F] truncate">
              Impressions/Day
            </h1>
          </th>
          <th className="col-span-2 flex w-full items-center justify-center gap-2 border-r truncate">
            <h1 className="text-[14px] text-[#21394F] truncate">
              Slots/Day
            </h1>
          </th>
          <th className="col-span-1 flex w-full items-center justify-center gap-2 border-r">
            <h1 className="text-[14px] text-[#21394F]">Price/Slot</h1>
          </th>
          <th className="col-span-2 flex w-full items-center justify-center gap-2 border-r">
            <h1 className="text-[14px] text-[#21394F]">Total Cost</h1>
          </th>
          {/* <th className="flex w-full items-center justify-center gap-2 border-r">
            <h1 className="text-[14px] text-[#21394F]">SOV</h1>
          </th> */}
          <th className="col-span-1 flex w-full items-center justify-center gap-2 border-r">
            <h1 className="text-[14px] text-[#21394F]">Duration</h1>
          </th>
          <th className="col-span-1 flex w-full items-center justify-center gap-2">
            <h1 className="text-[14px] text-[#21394F]">View</h1>
          </th>
        </tr>
      </thead>
      <tbody className="overflow-scroll">
        {loading ? (
          <tr className="flex border rounded-b justify-between w-full h-[45px] animate-pulse">
            <td className="h-[45px] bg-gray-200 rounded-b dark:bg-gray-700 w-full"></td>
          </tr>
        ) : (
        <tr className="flex justify-between border rounded-b w-full h-[45px] grid grid-cols-12">
          <td className="col-span-1 flex w-full items-center justify-center gap-2">
            <h1 className="text-[14px] text-[#21394F]">
              {priceData?.tableData?.totalCities}
            </h1>
          </td>
          <td className="col-span-1 flex w-full items-center justify-center gap-2">
            <h1 className="text-[14px] text-[#21394F]">
              {priceData?.tableData?.totalScreens}
            </h1>
          </td>
          <td className="col-span-1 flex w-full items-center justify-center gap-2">
            <h1 className="text-[14px] text-[#21394F] font-normal">
              &#8377;
              {priceData?.tableData?.cpm?.toFixed(0) > 1
                ? priceData?.tableData?.cpm?.toFixed(0)
                : 1}
            </h1>
          </td>
          <td className="col-span-2 flex w-full items-center justify-center gap-2">
            <h1 className="text-[14px] text-[#21394F] font-normal">
              {formatNumber(
                priceData?.tableData?.impressionPerDay?.toFixed(0) || 0
              )}
            </h1>
          </td>
          <td className="col-span-2 flex w-full items-center justify-center gap-2">
            <h1 className="text-[14px] text-[#21394F] font-normal">
              {priceData?.tableData?.totalSlotsPerDay?.toFixed(0)}
            </h1>
          </td>
          <td className="col-span-1 flex w-full items-center justify-center gap-2">
            <h1 className="text-[14px] text-[#21394F] font-normal">
              &#8377; {priceData?.tableData?.pricePerSlot?.toFixed(2)}
            </h1>
          </td>
          <td className="col-span-2 flex w-full items-center justify-center gap-2">
            <h1 className="text-[14px] text-[#21394F] font-normal">
              &#8377;
              {formatNumber(
                priceData?.tableData?.costOfCampaign?.toFixed(0) || 0
              )}
            </h1>
          </td>
          {/* <td className="flex w-full items-center justify-center gap-2">
            <h1 className="text-[14px] text-[#21394F] font-normal">
              {priceData?.tableData?.sov}
            </h1>
          </td> */}
          <td className="col-span-1 flex w-full items-center justify-center gap-2">
            <h1 className="text-[14px] text-[#21394F] font-normal">
              {priceData?.tableData?.duration} Days
            </h1>
          </td>
          <td
            className="col-span-1 flex w-full items-center justify-center gap-2"
            onClick={() => {
              // console.log(showSummary);
              // console.log(type, "type");

              if (showSummary === type) {
                setShowSummary(null);
              } else {
                setShowSummary(type);
              }
            }}
          >
            <h1 className="font-normal">
              <i
                className={`fi fi-sr-eye text-[14px] hover:text-[#129BFF] ${
                  showSummary === type ? "text-[#129BFF]" : "text-[#B9B9B9]"
                }`}
              ></i>
            </h1>
          </td>
        </tr>
        )}
      </tbody>
    </table>
  );
};

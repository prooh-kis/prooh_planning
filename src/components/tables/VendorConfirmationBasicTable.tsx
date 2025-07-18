import { Tooltip } from "antd";
import {
  convertDateIntoDateMonthYear,
} from "../../utils/dateAndTimeUtils";
import { formatNumber } from "../../utils/formatValue";

export const VendorConfirmationBasicTable = ({
  vendorConfirmationData,
}: any) => {
  return (
    <div className="w-full py-1">
      <div className="grid grid-cols-2 gap-4">
        <div className="col-span-1">
          <div className="grid grid-cols-2 ">
            <div className="border py-1 px-4 bg-[#F7F7F7] rounded-tl-[8px] truncate">
              <h1 className="text-[14px]">Campaign Name</h1>
            </div>
            <div className="border py-1 px-4 rounded-tr-[8px] truncate">
              <h1 className="text-[14px]">{vendorConfirmationData?.name}</h1>
            </div>
          </div>
          
          <div className="grid grid-cols-2">
            <div className="border py-1 px-4 bg-[#F7F7F7] truncate">
              <h1 className="text-[14px]">Campaign Type</h1>
            </div>
            <div className="border py-1 px-4 truncate">
              <h1 className="text-[14px]">
                {vendorConfirmationData?.campaignType}
              </h1>
            </div>
          </div>
          <div className="grid grid-cols-2">
            <div className="border py-1 px-4 bg-[#F7F7F7] truncate">
              <h1 className="text-[14px]">Trigger</h1>
            </div>
            <div className="border py-1 px-4 truncate">
              <h1 className="text-[14px]">
                {vendorConfirmationData?.trigger === "weatherTriggers"
                  ? "Weather Trigger"
                  : vendorConfirmationData?.trigger === "sportsTriggers"
                  ? "Sports Trigger"
                  : vendorConfirmationData?.trigger === "vacantSlots"
                  ? "Fill Vacancy"
                  : "None"}
              </h1>
            </div>
          </div>
          <div className="grid grid-cols-2">
            <div className="border py-1 px-4 bg-[#F7F7F7] truncate">
              <h1 className="text-[14px]">Discount</h1>
            </div>
            <div className="border py-1 px-4 truncate">
              <h1 className="text-[14px]">{(vendorConfirmationData?.totalDiscount * 100 /vendorConfirmationData?.totalCampaignBudget)?.toFixed(2)} %</h1>
            </div>
          </div>
          <div className="grid grid-cols-2">
            <div className="border py-1 px-4 bg-[#F7F7F7] rounded-bl-[8px] truncate">
              <h1 className="text-[14px]">Total Cost</h1>
            </div>
            <div className="border py-1 px-4 rounded-br-[8px] truncate">
              <h1 className="text-[14px] text-[#5FAC90] font-semibold">
                &#8377; {Number(vendorConfirmationData?.finalCampaignBudget || vendorConfirmationData?.totalCampaignBudget)?.toFixed(2)}
              </h1>
            </div>
          </div>
        </div>
        <div className="col-span-1">
          <div className="grid grid-cols-2">
            <div className="border py-1 px-4 bg-[#F7F7F7] rounded-tl-[8px] truncate">
              <h1 className="text-[14px]">Start Date</h1>
            </div>
            <div className="border py-1 px-4 rounded-tr-[8px] truncate">
              <h1 className="text-[14px]">
                {convertDateIntoDateMonthYear(
                  vendorConfirmationData?.startDate
                )}
              </h1>
            </div>
          </div>
          <div className="grid grid-cols-2">
            <div className="border py-1 px-4 bg-[#F7F7F7] truncate">
              <h1 className="text-[14px]">End Date</h1>
            </div>
            <div className="border py-1 px-4 truncate">
              <h1 className="text-[14px]">
                {convertDateIntoDateMonthYear(vendorConfirmationData?.endDate)}
              </h1>
            </div>
          </div>
          <div className="grid grid-cols-2">
            <div className="border py-1 px-4 bg-[#F7F7F7] truncate">
              <h1 className="text-[14px]">Duration</h1>
            </div>
            <div className="border py-1 px-4 truncate">
              <h1 className="text-[14px]">
                {vendorConfirmationData?.duration}
              </h1>
            </div>
          </div>
          <div className="grid grid-cols-2">
            <div className="border py-1 px-4 bg-[#F7F7F7] truncate">
              <h1 className="text-[14px]">Client Name</h1>
            </div>
            <div className="border py-1 px-4 truncate">
              <Tooltip title={vendorConfirmationData?.clientName}>
                <h1 className="text-[14px] truncate">
                  {vendorConfirmationData?.clientName}
                </h1>
              </Tooltip>
            </div>
          </div>
          <div className="grid grid-cols-2">
            <div className="border py-1 px-4 bg-[#F7F7F7] rounded-bl-[8px] truncate">
              <h1 className="text-[14px]">Brand Name</h1>
            </div>
            <div className="border py-1 px-4 rounded-br-[8px] truncate">
              <h1 className="text-[14px]">
                {vendorConfirmationData?.brandName}
              </h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

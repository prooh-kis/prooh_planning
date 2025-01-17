import { getDataFromLocalStorage } from "../../utils/localStorageUtils";
import { ChangeCampaignDuration } from "../../components/popup/ChangeCampaignDuration";
import { formatNumber } from "../../utils/formatValue";
import { SkeletonLoader } from "../../components/molecules/SkeletonLoader";
import { Tooltip } from "antd";
import clsx from "clsx";

interface CostSummartTabelProps {
  loading?: any;
  totalData?: any;
  pageName?: any;
}

export const CostSummaryTable1 = ({
  totalData,
  pageName,
  loading,
}: CostSummartTabelProps) => {
  const getCurrentStep = getDataFromLocalStorage("currentStep");
  return (
    <table className="w-full">
      <thead className="bg-[#F7F7F7] flex justify-between items-center w-full">
        <tr className="flex justify-between w-full h-[40px]">
          <th className="flex w-full items-center justify-center gap-2">
            <h1 className="lg:text-[14px] md:text-[12px] text-[#21394F]">
              Step
            </h1>
          </th>
          <th className="flex w-full items-center justify-center gap-2">
            <h1 className="lg:text-[14px] md:text-[12px] text-[#21394F]">
              Cities
            </h1>
          </th>
          <th className="flex w-full items-center justify-center gap-2">
            <h1 className="lg:text-[14px] md:text-[12px] text-[#21394F]">
              Touchpoints
            </h1>
          </th>
          <th className="flex w-full items-center justify-center gap-2">
            <h1 className="lg:text-[14px] md:text-[12px] text-[#21394F]">
              Screens
            </h1>
          </th>
          <th className="flex w-full items-center justify-center gap-2">
            <h1 className="lg:text-[14px] md:text-[12px] text-[#21394F]">
              Duration
            </h1>
            <ChangeCampaignDuration
              campaignId={Object.keys(getCurrentStep || {})?.[0]}
            />
          </th>
          <th className="flex w-full items-center justify-center gap-2">
            <h1 className="lg:text-[14px] md:text-[12px] text-[#21394F]">
              Impressions
            </h1>
          </th>
          <th className="flex w-full items-center justify-center gap-2">
            <h1 className="lg:text-[14px] md:text-[12px] text-[#21394F]">
              Budget
            </h1>
          </th>
          <th className="flex w-full items-center justify-center gap-2">
            <h1 className="lg:text-[14px] md:text-[12px] text-[#21394F]">
              CPM
            </h1>
          </th>
          <th className="flex w-full items-center justify-center gap-2">
            <h1 className="lg:text-[14px] md:text-[12px] text-[#21394F]">
              Price/Slot
            </h1>
          </th>
        </tr>
      </thead>
      <tbody className="border overflow-scroll">
        {loading && (
          <tr className="flex justify-between border-b w-full h-[45px]">
            <th className="w-full h-[45px] flex justify-between">
              <SkeletonLoader />
            </th>
          </tr>
        )}

        {totalData?.map((data: any, i: any) => (
          <tr
            key={i}
            className={clsx(
              `${
                pageName === data.step ? "bg-[#F0F9FF]" : ""
              } flex justify-between border-b w-full h-[45px]`
            )}
          >
            <th className="flex w-full items-center justify-center gap-2 truncate px-2">
              <Tooltip>
                <h1 className="lg:text-[14px] md:text-[12px] text-[#21394F] truncate">
                  {data.step}
                </h1>
              </Tooltip>
            </th>
            <th className="flex w-full items-center justify-center gap-2">
              <h1 className="lg:text-[14px] md:text-[12px] text-[#21394F] font-normal">
                {data?.totalCities}
              </h1>
            </th>
            <th className="flex w-full items-center justify-center gap-2">
              <h1 className="lg:text-[14px] md:text-[12px] text-[#21394F] font-normal">
                {data?.totalTouchPoints}
              </h1>
            </th>
            <th className="flex w-full items-center justify-center gap-2">
              <h1 className="lg:text-[14px] md:text-[12px] text-[#21394F] font-normal">
                {data?.totalScreens}
              </h1>
            </th>
            <th className="flex w-full items-center justify-center gap-2">
              <div className="grid grid-cols-4 w-full items-center">
                <p className="col-span-1"></p>
                <h1 className="col-span-2 lg:text-[14px] md:text-[12px] text-[#21394F] truncate font-normal">
                  {data?.totalDuration} Days
                </h1>
              </div>
            </th>
            <th className="flex w-full items-center justify-center gap-2">
              <h1 className="lg:text-[14px] md:text-[12px] text-[#21394F] font-normal">
                {formatNumber(data?.totalImpression || 0)}
              </h1>
            </th>
            <th className="flex w-full items-center justify-center gap-2">
              <h1 className="lg:text-[14px] md:text-[12px] text-[#FF0808]">
                &#8377;{formatNumber(data?.totalCampaignBudget || 0)}
              </h1>
            </th>
            <th className="flex w-full items-center justify-center gap-2">
              <h1 className="lg:text-[14px] md:text-[12px] text-[#21394F] font-normal">
                &#8377;{data?.totalCpm?.toFixed(2) || 0}
              </h1>
            </th>
            <th className="flex w-full items-center justify-center gap-2">
              <h1 className="lg:text-[14px] md:text-[12px] text-[#21394F] font-normal">
                &#8377;{data?.pricePerSlot?.toFixed(2) || 0}
              </h1>
            </th>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

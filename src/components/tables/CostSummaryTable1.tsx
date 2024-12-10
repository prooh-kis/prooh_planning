import { getDataFromLocalStorage } from "../../utils/localStorageUtils";
import { ChangeCampaignDuration } from "../../components/popup/ChangeCampaignDuration";
import { formatNumber } from "../../utils/formatValue";
import { SkeletonLoader } from "../../components/molecules/SkeletonLoader";

interface CostSummartTabelProps {
  loading?: any,
  totalData?: any;
  selectedData?: any;
}

export const CostSummaryTable1 = ({
  totalData,
  selectedData,
  loading
}: CostSummartTabelProps) => {
  const getCurrentStep = getDataFromLocalStorage("currentStep");
  return (
    <table className="w-full">
      <thead className="bg-[#F7F7F7] flex justify-between items-center w-full">
        <tr className="flex justify-between w-full h-[40px]">
          <th className="flex w-full items-center justify-center gap-2">
            <h1 className="text-[14px] text-[#21394F]"></h1>
          </th>
          <th className="flex w-full items-center justify-center gap-2">
            <h1 className="text-[14px] text-[#21394F]">Cities</h1>
          </th>
          <th className="flex w-full items-center justify-center gap-2">
            <h1 className="text-[14px] text-[#21394F]">Touchpoints</h1>
          </th>
          <th className="flex w-full items-center justify-center gap-2">
            <h1 className="text-[14px] text-[#21394F]">Screens</h1>
          </th>
          <th className="flex w-full items-center justify-center gap-2">
            <h1 className="text-[14px] text-[#21394F]">Duration</h1>
          </th>
          <th className="flex w-full items-center justify-center gap-2">
            <h1 className="text-[14px] text-[#21394F]">Impressions</h1>
          </th>
          <th className="flex w-full items-center justify-center gap-2">
            <h1 className="text-[14px] text-[#21394F]">Budget</h1>
          </th>
          <th className="flex w-full items-center justify-center gap-2">
            <h1 className="text-[14px] text-[#21394F]">CPM</h1>
          </th>
        </tr>
      </thead>
      <tbody className="border overflow-scroll">
        <tr className=" flex justify-between border-b w-full h-[45px]">
          <th className="flex w-full items-center justify-center gap-2">
            <h1 className="text-[14px] text-[#21394F]">Total</h1>
          </th>
          <th className="flex w-full items-center justify-center gap-2">
            <h1 className="text-[14px] text-[#21394F] font-normal">
              {totalData?.citiesTotalCount}
            </h1>
          </th>
          <th className="flex w-full items-center justify-center gap-2">
            <h1 className="text-[14px] text-[#21394F] font-normal">
              {totalData?.touchPointsTotalCount}
            </h1>
          </th>
          <th className="flex w-full items-center justify-center gap-2">
            <h1 className="text-[14px] text-[#21394F] font-normal">
              {totalData?.screensTotalCount}
            </h1>
          </th>
          <th className="flex w-full items-center justify-center gap-2">
            <h1 className="text-[14px] text-[#21394F] font-normal">30 Days</h1>
          </th>
          <th className="flex w-full items-center justify-center gap-2">
            <h1 className="text-[14px] text-[#21394F] font-normal">
              {formatNumber(totalData?.impressionTotalCount || 0)}
            </h1>
          </th>
          <th className="flex w-full items-center justify-center gap-2">
            <h1 className="text-[14px] text-[#21394F] font-normal">
              &#8377;{formatNumber(totalData?.budgetTotal || 0)}
            </h1>
          </th>
          <th className="flex w-full items-center justify-center gap-2">
            <h1 className="text-[14px] text-[#21394F] font-normal">
              &#8377;{totalData?.cpmTotal?.toFixed(2)}
            </h1>
          </th>
        </tr>
        {loading ? (
          <tr className="flex justify-between border-b w-full h-[45px]">
            <th className="w-full h-[45px] flex justify-between">
              <SkeletonLoader />
            </th>
          </tr>
        ) : (
          <tr className="bg-[#F0F9FF] flex justify-between border-b w-full h-[45px]">
            <th className="flex w-full items-center justify-center gap-2">
              <h1 className="text-[14px] text-[#21394F]">
                Selected
              </h1>
            </th>
            <th className="flex w-full items-center justify-center gap-2">
              <h1 className="text-[14px] text-[#21394F] font-normal">
                {totalData?.citiesSelectedCount}
              </h1>
            </th>
            <th className="flex w-full items-center justify-center gap-2">
              <h1 className="text-[14px] text-[#21394F] font-normal">
                {totalData?.touchPointsSelectedCount}
              </h1>
            </th>
            <th className="flex w-full items-center justify-center gap-2">
              <h1 className="text-[14px] text-[#21394F] font-normal">
                {totalData?.screensSelectedCount}
              </h1>
            </th>
            <th className="flex w-full items-center justify-center gap-2">
              <div className="grid grid-cols-4 w-full items-center">
                <p className="col-span-1"></p>
                <h1 className="col-span-2 text-[14px] text-[#21394F] truncate font-normal">
                  {totalData?.durationSelected} Days
                </h1>
                <ChangeCampaignDuration
                  campaignId={Object.keys(getCurrentStep || {})?.[0]}
                />
              </div>
            </th>
            <th className="flex w-full items-center justify-center gap-2">
              <h1 className="text-[14px] text-[#21394F] font-normal">
                {formatNumber(totalData?.impressionSelectedCount || 0)}
              </h1>
            </th>
            <th className="flex w-full items-center justify-center gap-2">
              <h1 className="text-[14px] text-red-500">
                &#8377;{formatNumber(totalData?.budgetSelected || 0)}
              </h1>
            </th>
            <th className="flex w-full items-center justify-center gap-2">
              <h1 className="text-[14px] text-[#21394F] font-normal">
                &#8377;{totalData?.cpmSelected?.toFixed(2) || 0}
              </h1>
            </th>
          </tr>
        )}

      </tbody>
    </table>
  );
};

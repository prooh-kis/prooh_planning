import { formatNumber } from "../../utils/formatValue";
import React from "react";
import { RegularCohortSummaryTable } from "./RegularCohortSummaryTable";
import { RegularCohortSlotsCampaignTable } from "./RegularCohortSlotsCampaignTable";
import { getDataFromLocalStorage } from "../../utils/localStorageUtils";
import { REGULAR_VS_COHORT_PRICE_DATA } from "../../constants/localStorageConstants";
import { useSelector } from "react-redux";

export function PlanSummaryTable({
  regularVsCohort,
  showSummary,
  setShowSummary,
  loading,
  error,
  data
}: any) {

  const regularVsCohortPriceDataGet = useSelector((state: any) => state.regularVsCohortPriceDataGet);
  const {
    loading: loadingPriceData,
    error: errorPriceData,
    data: priceData,
  } = regularVsCohortPriceDataGet;

  return (
    <div>
      <div className="py-4">
        <h1 className="py-2">{regularVsCohort === "cohort" ? "Cohort" : "Regular"} slots per day buying</h1>
        <RegularCohortSlotsCampaignTable
          type={regularVsCohort}
          priceData={getDataFromLocalStorage(REGULAR_VS_COHORT_PRICE_DATA)?.[`${regularVsCohort}`]}
          setShowSummary={setShowSummary}
          showSummary={showSummary}
        />
        {showSummary === "cohort" && (
          <RegularCohortSummaryTable
            type={regularVsCohort}
            touchPointData={getDataFromLocalStorage(REGULAR_VS_COHORT_PRICE_DATA)?.[`${regularVsCohort}`]?.touchPointData}
        />
        )}
      </div>
      <h1 className="py-2 text-[14px] font-semibold">Final Screens Summary as per you choice</h1>
      <div className="w-100% py-2 bg-gray-200 text-center rounded-sm">
        Summary
      </div>
      <table className="w-full border border-1 ">
        <thead>
          <tr className="py-1 border border-1">
            <th className="border border-1">Cities</th>
            <th className="border border-1">Total Screens</th>
            <th className="border border-1">Total Reach</th>
            <th className="border border-1">
              Total Impression
            </th>
            <th className="border border-1">Total Budget</th>
            <th className="border border-1">CPM</th>
          </tr>
        </thead>
        {data && (
          <tbody className="w-full">
            {Object.keys(data)?.map((d: any, i: any) => (
              <tr key={i} className={`
              ${i === Object.keys(data).length - 1 ? "font-bold bg-[#F1F9FF]" : ""}
                py-1 text-[14px] border border-1`
              }>
                <td className="border py-2 border-1 text-center">{d.toUpperCase()}</td>
                <td className="border py-2 border-1 text-center">{data[d]?.totalScreens}</td>
                <td className="border py-2 border-1 text-center">{formatNumber(data[d]?.totalReach?.toFixed(0))}</td>
                <td className="border py-2 border-1 text-center">{formatNumber(data[d]?.totalImpression?.toFixed(0))}</td>
                <td className="border py-2 border-1 text-center">&#8377;{formatNumber(data[d]?.totalCampaignBudget)}</td>
                <td className="border py-2 border-1 text-center">&#8377;{data[d]?.totalCpm?.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        )}
      </table>
    </div>
  );
}

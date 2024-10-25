import { formatNumber } from "../../utils/formatValue";
import React, { useEffect } from "react";
import { RegularCohortSummaryTable } from "./RegularCohortSummaryTable";
import { RegularCohortSlotsCampaignTable } from "./RegularCohortSlotsCampaignTable";
import { getDataFromLocalStorage } from "../../utils/localStorageUtils";
import { REGULAR_VS_COHORT_PRICE_DATA } from "../../constants/localStorageConstants";
import { getScreenSummaryPlanTableData } from "../../actions/screenAction";
import { useDispatch } from "react-redux";

export function PlanSummaryTable({
  regularVsCohort,
  showSummary,
  setShowSummary,
  campaignId,
  getSelectedScreenIdsFromAllCities,
  data,
  loading,error,
  screensBuyingCount,
}: any) {

  const dispatch = useDispatch<any>();

  useEffect(() => {
    dispatch(
      getScreenSummaryPlanTableData({
        id: campaignId,
        screenIds: getSelectedScreenIdsFromAllCities(screensBuyingCount),
      })
    );
  },[dispatch]);
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
      <div className="w-full py-4">
        <h1 className="py-2 text-[14px] font-semibold">Final Screens Summary as per you choice</h1>

        <table className="w-full border border-1 ">
          <thead>
            <tr className="py-1 h-[40px] bg-[#F1F9FF] border border-1">
              <th className="border border-1">Cities</th>
              <th className="border border-1">Screens</th>
              <th className="border border-1">CPM</th>
              <th className="border border-1">
                Impressions/Day
              </th>
              <th className="border border-1">
                Slots/Day
              </th>
              <th className="border border-1">
                Price/slot
              </th>
              <th className="border border-1">Cost</th>
              <th className="border border-1">SOV</th>
              <th className="border border-1">Duration</th>
            </tr>
          </thead>
          {data && (
            <tbody className="w-full">
              {Object.keys(data)?.filter((s: any) => s === "total")?.map((d: any, i: any) => (
                <tr key={i} className={`
                ${i === Object.keys(data).length - 1 ? "" : ""}
                  py-1 text-[14px] border border-1`
                }>
                  <td className="border py-2 border-1 text-center">{Object.keys(data).length - 1}</td>
                  <td className="border py-2 border-1 text-center">{data[d]?.totalScreens}</td>
                  <td className="border py-2 border-1 text-center">&#8377;{data[d]?.totalCpm?.toFixed(2)}</td>
                  <td className="border py-2 border-1 text-center">{formatNumber(data[d]?.totalImpression?.toFixed(0))}</td>
                  <td className="border py-2 border-1 text-center">{data[d]?.totalSlots?.toFixed(0)}</td>
                  <td className="border py-2 border-1 text-center">{formatNumber(data[d]?.pricePerSlot?.toFixed(0))}</td>
                  <td className="border py-2 border-1 text-center">&#8377;{formatNumber(data[d]?.totalCampaignBudget)}</td>
                  <td className="border py-2 border-1 text-center">{data[d]?.sov}</td>
                  <td className="border py-2 border-1 text-center">{data[d]?.duration} Days</td>
                </tr>
              ))}
            </tbody>
          )}
        </table>
      </div>
      <div className="w-full py-4">
        <h1 className="py-2 text-[14px] font-semibold">Screen Summary City Wise</h1>

        <table className="w-full border border-1 ">
          <thead>
            <tr className="py-1 h-[40px] bg-[#F1F9FF] border border-1">
              <th className="border border-1">Cities</th>
              <th className="border border-1">Screens</th>
              <th className="border border-1">CPM</th>
              <th className="border border-1">
                Impressions/Day
              </th>
              <th className="border border-1">
                Slots/Day
              </th>
              <th className="border border-1">
                Price/slot
              </th>
              <th className="border border-1">Cost</th>
              <th className="border border-1">SOV</th>
              <th className="border border-1">Duration</th>
            </tr>
          </thead>
          {data && (
            <tbody className="w-full">
              {Object.keys(data)?.filter((s: any) => s !== "total")?.map((d: any, i: any) => (
                <tr key={i} className={`
                ${i === Object.keys(data).length - 1 ? "" : ""}
                  py-1 text-[14px] border border-1`
                }>
                  <td className="border py-2 border-1 text-center">{d.toUpperCase()}</td>
                  <td className="border py-2 border-1 text-center">{data[d]?.totalScreens}</td>
                  <td className="border py-2 border-1 text-center">&#8377;{data[d]?.totalCpm?.toFixed(2)}</td>
                  <td className="border py-2 border-1 text-center">{formatNumber(data[d]?.totalImpression?.toFixed(0))}</td>
                  <td className="border py-2 border-1 text-center">{data[d]?.totalSlots?.toFixed(0)}</td>
                  <td className="border py-2 border-1 text-center">{formatNumber(data[d]?.pricePerSlot?.toFixed(0))}</td>
                  <td className="border py-2 border-1 text-center">&#8377;{formatNumber(data[d]?.totalCampaignBudget)}</td>
                  <td className="border py-2 border-1 text-center">{data[d]?.sov}</td>
                  <td className="border py-2 border-1 text-center">{data[d]?.duration} Days</td>
                </tr>
              ))}
            </tbody>
          )}
        </table>
      </div>
    </div>
  );
}

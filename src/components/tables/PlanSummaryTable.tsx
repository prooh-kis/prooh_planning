import { formatNumber } from "../../utils/formatValue";
import React, { useEffect } from "react";
import { RegularCohortSummaryTable } from "./RegularCohortSummaryTable";
import { RegularCohortSlotsCampaignTable } from "./RegularCohortSlotsCampaignTable";
import { getDataFromLocalStorage } from "../../utils/localStorageUtils";
import { FULL_CAMPAIGN_PLAN, REGULAR_VS_COHORT_PRICE_DATA } from "../../constants/localStorageConstants";
import { getRegularVsCohortPriceData, getScreenSummaryPlanTableData } from "../../actions/screenAction";
import { useDispatch, useSelector } from "react-redux";
import { Tooltip } from "antd";
import { SkeletonLoader } from "../../components/molecules/SkeletonLoader";

export function PlanSummaryTable({
  regularVsCohort,
  showSummary,
  setShowSummary,
  campaignId,
  getSelectedScreenIdsFromAllCities,
  data,
  loading,
  error,
  screensBuyingCount,
  pathname,
}: any) {
  const dispatch = useDispatch<any>();

  const regularVsCohortPriceDataGet = useSelector(
    (state: any) => state.regularVsCohortPriceDataGet
  );
  const {
    loading: loadingPriceData,
    error: errorPriceData,
    data: priceData,
  } = regularVsCohortPriceDataGet;

  useEffect(() => {
    dispatch(
      getScreenSummaryPlanTableData({
        id: campaignId,
        screenIds: getSelectedScreenIdsFromAllCities(screensBuyingCount),
      })
    );

    if (!priceData && getDataFromLocalStorage(REGULAR_VS_COHORT_PRICE_DATA)?.[campaignId]?.[
      `${regularVsCohort}`] === undefined) {
        dispatch(getRegularVsCohortPriceData({
          id: campaignId,
          screenIds: getDataFromLocalStorage(FULL_CAMPAIGN_PLAN)?.[campaignId]?.screenIds,
          cohorts: getDataFromLocalStorage(FULL_CAMPAIGN_PLAN)?.[campaignId]?.cohorts,
          gender: getDataFromLocalStorage(FULL_CAMPAIGN_PLAN)?.[campaignId]?.gender,
          duration: getDataFromLocalStorage(FULL_CAMPAIGN_PLAN)?.[campaignId]?.duration,
        }));
      }
  }, [dispatch]);

  console.log(data);
  return (
    <div>
      {pathname.split("/").splice(-2)[0] !== "iknowitallplan" && (
        <div className="py-4">
          <div className="flex justify-start gap-2">
            <h1 className="py-2">
              {regularVsCohort === "cohort" ? "Cohort" : "Regular"} slots per day
              buying
            </h1>
            <Tooltip
              title="See below the final summary of your screen selection and related costs and deliverables"
            >
              <i className="fi fi-rs-info pr-1 text-[10px] text-gray-400 flex justify-center items-center"></i>
            </Tooltip>
          </div>

          <RegularCohortSlotsCampaignTable
            type={regularVsCohort}
            priceData={
              getDataFromLocalStorage(REGULAR_VS_COHORT_PRICE_DATA)?.[campaignId]?.[
                `${regularVsCohort}`
              ]
            }
            setShowSummary={setShowSummary}
            showSummary={showSummary}
          />

          {showSummary === regularVsCohort && (
            <RegularCohortSummaryTable
              type={regularVsCohort}
              touchPointData={
                getDataFromLocalStorage(REGULAR_VS_COHORT_PRICE_DATA)?.[campaignId]?.[
                  `${regularVsCohort}`
                ]?.touchPointData
              }
            />
          )}
        </div>
      )}

      <div className="w-full py-4">
        <div className="flex justify-start gap-2">
          <h1 className="py-2 text-[14px] font-semibold">
            Final Screens Summary as per you choice
          </h1>
          <Tooltip
            title="See below the final summary of your screen selection and related costs and deliverables"
          >
            <i className="fi fi-rs-info pr-1 text-[10px] text-gray-400 flex justify-center items-center"></i>
          </Tooltip>

        </div>

        <table className="w-full">
          <thead className="border rounded-t">
            <tr className="py-1 h-[40px] bg-[#F1F9FF] md:text-[14px] sm:text-[12px]">
              <th className="border border-r">Cities</th>
              <th className="border border-r">Screens</th>
              <th className="border border-r">CPM</th>
              <th className="border border-r">Impressions/Day</th>
              <th className="border border-r">Slots/Day</th>
              <th className="border border-r">Price/slot</th>
              <th className="border border-r">Cost</th>
              <th className="border border-r">SOV</th>
              <th className="">Duration</th>
            </tr>
          </thead>
          {loading && (
            <tbody className="w-full">
              <tr className="w-full h-full">
                <th className="w-full h-full">
                  <SkeletonLoader />
                </th>
              </tr>
            </tbody>
          )}
          {data && (
            <tbody className="w-full">
              {Object.keys(data)
                ?.filter((s: any) => s === "total")
                ?.map((d: any, i: any) => (
                  <tr
                    key={i}
                    className={`
                ${i === Object.keys(data).length - 1 ? "" : ""}
                  py-1 text-[14px] border border-1`}
                  >
                    <td className="py-2 text-center">
                      {Object.keys(data).length - 1}
                    </td>
                    <td className="py-2 text-center">
                      {data[d]?.totalScreens}
                    </td>
                    <td className="py-2 text-center">
                      &#8377;{data[d]?.totalCpm?.toFixed(0)}
                    </td>
                    <td className="py-2 text-center">
                      {formatNumber(data[d]?.totalImpression?.toFixed(0))}
                    </td>
                    <td className="py-2 text-center">
                      {data[d]?.totalSlots?.toFixed(0)}
                    </td>
                    <td className="py-2 text-center">
                      &#8377;{formatNumber(data[d]?.pricePerSlot?.toFixed(0))}
                    </td>
                    <td className="py-2 text-center">
                      &#8377;{formatNumber(data[d]?.totalCampaignBudget)}
                    </td>
                    <td className="py-2 text-center">
                      {data[d]?.sov}
                    </td>
                    <td className="py-2 text-center">
                      {data[d]?.duration} Days
                    </td>
                  </tr>
                ))}
            </tbody>
          )}
        </table>
      </div>
      <div className="w-full py-4">
        <div className="flex justify-start gap-2">
          <h1 className="py-2 text-[14px] font-semibold">
            Screen Summary City Wise
          </h1>
          <Tooltip
              title="See below the final summary of your screen selection on cities basis and their related costs and deliverables"
            >
              <i className="fi fi-rs-info pr-1 text-[10px] text-gray-400 flex justify-center items-center"></i>
          </Tooltip>
        </div>


        <table className="w-full rounded-[12px]">
          <thead className="w-full">
            <tr className="py-1 h-[40px] bg-[#F1F9FF] md:text-[14px] sm:text-[12px]">
              <th className="border border-r">City</th>
              <th className="border border-r">Screens</th>
              <th className="border border-r">CPM</th>
              <th className="border border-r">Impressions/Day</th>
              <th className="border border-r">Slots/Day</th>
              <th className="border border-r">Price/slot</th>
              <th className="border border-r">Cost</th>
              <th className="border border-r">SOV</th>
              <th className="border">Duration</th>
            </tr>
          </thead>
          {loading && (
            <tbody className="w-full">
              <tr className="w-full h-full">
                <th className="w-full h-full">
                  <SkeletonLoader />
                </th>
              </tr>
            </tbody>
          )}
          {data && (
            <tbody className="w-full">
              {Object.keys(data)
                ?.filter((s: any) => s !== "total")
                ?.map((d: any, i: any) => (
                  <tr
                    key={i}
                    className={`
                ${i === Object.keys(data).length - 1 ? "" : ""}
                  py-1 text-[14px] border border-1`}
                  >
                    <td className="py-2 text-center">
                      {d.toUpperCase()}
                    </td>
                    <td className="py-2 text-center">
                      {data[d]?.totalScreens}
                    </td>
                    <td className="py-2 text-center">
                      &#8377;{data[d]?.totalCpm?.toFixed(0)}
                    </td>
                    <td className="py-2 text-center">
                      {formatNumber(data[d]?.totalImpression?.toFixed(0))}
                    </td>
                    <td className="py-2 text-center">
                      {data[d]?.totalSlots?.toFixed(0)}
                    </td>
                    <td className="py-2 text-center">
                      {formatNumber(data[d]?.pricePerSlot?.toFixed(0))}
                    </td>
                    <td className="py-2 text-center">
                      &#8377;{formatNumber(data[d]?.totalCampaignBudget)}
                    </td>
                    <td className="py-2 text-center">
                      {data[d]?.sov}
                    </td>
                    <td className="py-2 text-center">
                      {data[d]?.duration} Days
                    </td>
                  </tr>
                ))}
            </tbody>
          )}
        </table>
      </div>
    </div>
  );
}

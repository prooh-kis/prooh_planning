import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { message, Tooltip } from "antd";
import { formatNumber } from "../../utils/formatValue";
import { Loading } from "../../components/Loading";
import { 
  RegularCohortSlotsCampaignTable, 
  RegularCohortSummaryTable 
} from "../../components/tables";
import {
  getRegularVsCohortPriceData,
  getScreenSummaryPlanTableData,
  getTableDataScreenWiseAdPlayTime,
} from "../../actions/screenAction";
import { CAMPAIGN_PLAN_TYPE_KNOW } from "../../constants/campaignConstants";
import { LoadingScreen } from "../../components/molecules/LoadingScreen";

interface PlanSummaryTableProps {
  regularVsCohort: string;
  loadingScreenSummaryPlanTable: any;
  loadingPriceData: any;
  priceData: any;
  screenSummaryPlanTableData?: any;
}

export function PlanSummaryTable({
  regularVsCohort,
  loadingScreenSummaryPlanTable,
  loadingPriceData,
  priceData,
  screenSummaryPlanTableData,
}: PlanSummaryTableProps) {
  const [showSummary, setShowSummary] = useState<any>(false);

  const renderTableRow = (item: any, key: string, isTotal = false) => (
    <tr key={key} className="border rounded-b py-1 text-[14px] grid grid-cols-12 text-capitalize">
      <td className="py-2 text-center col-span-1">
        {isTotal ? Object.keys(screenSummaryPlanTableData).length - 1 : key}
      </td>
      <td className="py-2 text-center col-span-1">{item?.totalScreens}</td>
      <td className="py-2 text-center col-span-1">&#8377;{item?.totalCpm?.toFixed(0)}</td>
      <td className="py-2 text-center col-span-2">{formatNumber(item?.totalImpression?.toFixed(0))}</td>
      <td className="py-2 text-center col-span-2">{item?.totalSlots?.toFixed(0)}</td>
      <td className="py-2 text-center col-span-1">{formatNumber(item?.pricePerSlot?.toFixed(0))}</td>
      <td className="py-2 text-center col-span-2">
        &#8377;{formatNumber(item?.totalCampaignBudget?.toFixed(0))}
      </td>
      <td className="py-2 text-center col-span-2">{item?.duration} Days</td>
    </tr>
  );

  const renderLoadingState = () => (
    <tr>
      <td>
        <Loading row={2} />
      </td>
    </tr>
  );

  const tableHeaders = (
    <tr className="rounded-t border border-gray-200 flex items-center h-[40px] bg-[#F1F9FF] md:text-[14px] sm:text-[12px] grid grid-cols-12">
      <th className="col-span-1 h-full flex items-center justify-center">City</th>
      <th className="col-span-1 h-full flex items-center justify-center border-x">Screens</th>
      <th className="col-span-1 h-full flex items-center justify-center ">CPM</th>
      <th className="col-span-2 h-full flex items-center justify-center border-x">Impressions/Day</th>
      <th className="col-span-2 h-full flex items-center justify-center ">Slots/Day</th>
      <th className="col-span-1 h-full flex items-center justify-center border-x">Price/slot</th>
      <th className="col-span-2 h-full flex items-center justify-center">Total Cost</th>
      <th className="col-span-2 h-full flex items-center justify-center border-l">Duration</th>
    </tr>
  );

  if (loadingScreenSummaryPlanTable || loadingPriceData) {
    return (
      <LoadingScreen />
    )
  }

  return (
    <div className="w-full max-h-[60vh] overflow-scroll no-scrollbar">
      <div className="py-4">
        <div className="flex justify-start gap-2">
          <h1 className="py-2">
            {regularVsCohort === "cohort" ? "Cohort" : "Regular"} slots per day buying
          </h1>
          <Tooltip title="See below the final summary of your screen selection and related costs and deliverables">
            <i className="fi fi-rs-info pr-1 text-[10px] text-gray-400 flex justify-center items-center"></i>
          </Tooltip>
        </div>
        
        {loadingPriceData ? (
          <Loading row={2} />
        ) : (
          <RegularCohortSlotsCampaignTable
            type={regularVsCohort}
            priceData={priceData?.[regularVsCohort]}
            loading={loadingPriceData}
            setShowSummary={setShowSummary}
            showSummary={showSummary}
          />
        )}
        {showSummary && (
          <RegularCohortSummaryTable
            type={regularVsCohort}
            touchPointData={priceData?.[regularVsCohort]?.touchPointData}
          />
        )}
        
        
      </div>

      <div className="w-full py-4">
        <div className="flex justify-start gap-2">
          <h1 className="py-2 text-[16px] font-semibold">
            Final Screens Summary as per your choice
          </h1>
          <Tooltip title="See below the final summary of your screen selection and related costs and deliverables">
            <i className="fi fi-rs-info pr-1 text-[10px] text-gray-400 flex justify-center items-center"></i>
          </Tooltip>
        </div>

        <table className="w-full">
          <thead className="rounded-t">{tableHeaders}</thead>
          <tbody className="w-full overflow-scroll">
            {loadingScreenSummaryPlanTable || loadingPriceData || !screenSummaryPlanTableData ? (
              renderLoadingState()
            ) : (
              Object.keys(screenSummaryPlanTableData)
                .filter((s: any) => s === "total")
                .map((d: any) => renderTableRow(screenSummaryPlanTableData[d], d, true))
            )}
          </tbody>
        </table>
      </div>

      <div className="w-full py-4 pb-16">
        <div className="flex justify-start gap-2">
          <h1 className="py-2 text-[16px] font-semibold">
            Screen Summary City Wise
          </h1>
          <Tooltip title="See below the final summary of your screen selection on cities basis and their related costs and deliverables">
            <i className="fi fi-rs-info pr-1 text-[10px] text-gray-400 flex justify-center items-center"></i>
          </Tooltip>
        </div>

        <table className="w-full rounded-[12px]">
          <thead className="w-full">{tableHeaders}</thead>
          <tbody className="w-full">
            {loadingScreenSummaryPlanTable || loadingPriceData || !screenSummaryPlanTableData ? (
              renderLoadingState()
            ) : (
              Object.keys(screenSummaryPlanTableData)
                .filter((s: any) => s !== "total")
                .map((d: any) => renderTableRow(screenSummaryPlanTableData[d], d))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
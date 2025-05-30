import React from "react";
import { useDispatch } from "react-redux";
import { Tooltip } from "antd";
import { formatNumber } from "../../utils/formatValue";
import { Loading } from "../../components/Loading";

import { LoadingScreen } from "../../components/molecules/LoadingScreen";

interface PlanSummaryTableProps {
  screenSummaryPlanTableData: any;
  loadingScreenSummaryPlanTable?: any;
  step?: any;
}

export function PlanSummaryTable({
  screenSummaryPlanTableData,
  loadingScreenSummaryPlanTable,
}: PlanSummaryTableProps) {

  const renderTableRow = (item: any, key: string, isTotal = false) => (
    <tr key={key} className="py-1 text-[14px] border border-1">
      <td className="py-2 text-center">
        {isTotal ? Object.keys(screenSummaryPlanTableData).length - 1 : key.toUpperCase()}
      </td>
      <td className="py-2 text-center">{item?.totalScreens}</td>
      <td className="py-2 text-center">&#8377;{item?.totalCpm?.toFixed(0)}</td>
      <td className="py-2 text-center">{formatNumber(item?.totalImpression?.toFixed(0))}</td>
      <td className="py-2 text-center">{item?.totalSlots?.toFixed(0)}</td>
      <td className="py-2 text-center">{formatNumber(item?.pricePerSlot?.toFixed(0))}</td>
      <td className="py-2 text-center">
        &#8377;{formatNumber(item?.totalCampaignBudget?.toFixed(0))}
      </td>
      <td className="py-2 text-center">{item?.sov}</td>
      <td className="py-2 text-center">{item?.duration} Days</td>
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
    <tr className="py-1 h-[40px] bg-[#F1F9FF] md:text-[14px] sm:text-[12px]">
      <th className="border border-r">City</th>
      <th className="border border-r">Screens</th>
      <th className="border border-r">CPM</th>
      <th className="border border-r">Impressions/Day</th>
      <th className="border border-r">Slots/Day</th>
      <th className="border border-r">Price/slot</th>
      <th className="border border-r">Total Cost</th>
      <th className="border border-r">SOV</th>
      <th className="border">Duration</th>
    </tr>
  );

  if (loadingScreenSummaryPlanTable) {
    return (
      <LoadingScreen />
    )
  }

  return (
    <div className="w-full max-h-[60vh] overflow-scroll no-scrollbar">
      <div className="w-full py-4">
        <div className="flex justify-start gap-2">
          <h1 className="py-2 text-[14px] font-semibold">
            Final Screens Summary as per your choice
          </h1>
          <Tooltip title="See below the final summary of your screen selection and related costs and deliverables">
            <i className="fi fi-rs-info pr-1 text-[10px] text-gray-400 flex justify-center items-center"></i>
          </Tooltip>
        </div>

        <table className="w-full">
          <thead className="border rounded-t">{tableHeaders}</thead>
          <tbody className="w-full overflow-scroll">
            {loadingScreenSummaryPlanTable || !screenSummaryPlanTableData ? (
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
          <h1 className="py-2 text-[14px] font-semibold">
            Screen Summary City Wise
          </h1>
          <Tooltip title="See below the final summary of your screen selection on cities basis and their related costs and deliverables">
            <i className="fi fi-rs-info pr-1 text-[10px] text-gray-400 flex justify-center items-center"></i>
          </Tooltip>
        </div>

        <table className="w-full rounded-[12px]">
          <thead className="w-full">{tableHeaders}</thead>
          <tbody className="w-full">
            {loadingScreenSummaryPlanTable || !screenSummaryPlanTableData ? (
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
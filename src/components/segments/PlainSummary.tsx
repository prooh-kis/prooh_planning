import { formatNumber } from "../../utils/formatValue";
import React from "react";

export function PlainSummary({ loading, error, data }: any) {
  return (
    <div>
      <div className="w-100% py-2 bg-gray-200 text-center rounded-sm">
        Summary
      </div>
      <table className="w-full border border-1 ">
        <thead>
          <tr className="py-1 border border-1">
            <th className="border border-1">Cities</th>
            <th className="border border-1">Total screens</th>
            <th className="border border-1">Total impression</th>
            <th className="border border-1">
              Total impression based on time schedule
            </th>
            <th className="border border-1">Total campaign budget</th>
            <th className="border border-1">CPM</th>
          </tr>
        </thead>
        <tbody className="w-full">
          {Object.keys(data)?.map((d: any, i: any) => (
            <tr key={i} className="py-1 border border-1">
              <td className="border border-1 text-center">{d}</td>
              <td className="border border-1 text-center">{data[d]?.totalScreens}</td>
              <td className="border border-1 text-center">{data[d]?.totalImpression}</td>
              <td className="border border-1 text-center">{data[d]?.totalImpressionBasedOnSchedule.toFixed(0)}</td>
              <td className="border border-1 text-center">{formatNumber(data[d]?.totalCampaignBudget)}</td>
              <td className="border border-1 text-center">{data[d]?.totalCpm.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

import { LinearBar } from "../../components/molecules/linearbar";
import { formatNumber } from "../../utils/formatValue";

interface DashboardImpressionDetailsTableProps {
  screenLevelData?: any;
}

export const DashboardImpressionDetailsTable = ({
  screenLevelData,
}: DashboardImpressionDetailsTableProps) => {
  return (
    <table className="w-full">
      <thead className="w-full rounded-[12px]">
        <tr className="grid grid-cols-12">
          <th className="col-span-4 rounded-tl-[8px] bg-gray-100 text-[14px] py-1">
            <div className="p-1">
              <h1 className="text-[12px] font-regular">Audience Type</h1>
            </div>
          </th>
          <th className="col-span-2 bg-gray-100">
            <div className="p-1">
              <h1 className="text-[12px] font-regular">Male</h1>
            </div>
          </th>
          <th className="col-span-2 bg-gray-100">
            <div className="p-1">
              <h1 className="text-[12px] font-regular">Female</h1>
            </div>
          </th>
          <th className="col-span-2 bg-gray-100">
            <div className="p-1">
              <h1 className="text-[12px] font-regular">Delivered</h1>
            </div>
          </th>
          <th className="col-span-2 rounded-tr-[8px] bg-gray-100">
            <div className="p-1">
              <h1 className="text-[12px] font-regular">Promised</h1>
            </div>
          </th>
        </tr>
      </thead>
      <tbody className="block h-[220px] overflow-y-scroll">
        {Object.keys(screenLevelData?.["totalData"]?.impressionsCohortWise)
          ?.map((imp: any, index: any) => (
            <tr
              key={index}
              className="p-2 grid grid-cols-12 gap-2 border-b"
            >
              <td className="col-span-4 text-[12px]">
                <div className="flex items-center">
                  <p>
                    {
                      screenLevelData?.["totalData"]?.impressionsCohortWise[imp]
                        ?.cohort
                    }
                  </p>
                </div>
              </td>
              <td className="col-span-2">
                <div className="flex gap-4 items-center">
                  <LinearBar
                    percent={false}
                    value={
                        screenLevelData?.["totalData"]?.impressionsCohortWise[
                          imp
                        ]?.impressionDeliveredMale?.toFixed(0)
                      || 0
                    }
                    colors={["", "#84CBFF"]}
                    highest={
                        screenLevelData["totalData"]?.impressionsCohortWise[
                          imp
                        ]?.impressionPromisedMale?.toFixed(0)
                    }
                  />
                  <p className="text-[10px]">
                    {formatNumber(
                      screenLevelData?.["totalData"]?.impressionsCohortWise[
                        imp
                      ]?.impressionDeliveredMale?.toFixed(0)
                    ) || 0}
                  </p>
                </div>
              </td>
              <td className="col-span-2">
                <div className="flex gap-4 items-center">
                  <LinearBar
                    percent={false}
                    value={
                        screenLevelData?.["totalData"]?.impressionsCohortWise[
                          imp
                        ]?.impressionDeliveredFemale?.toFixed(0)
                      || 0
                    }
                    colors={["", "#D0B3FF"]}
                    highest={
                        screenLevelData["totalData"]?.impressionsCohortWise[
                          imp
                        ]?.impressionPromisedFemale?.toFixed(0)
                    }
                  />
                  <p className="text-[10px]">
                    {formatNumber(
                      screenLevelData?.["totalData"]?.impressionsCohortWise[
                        imp
                      ]?.impressionDeliveredFemale?.toFixed(0)
                    ) || 0}
                  </p>
                </div>
              </td>
              <td className="col-span-2 text-[12px]">
                <div className="flex items-center justify-center">
                  <p>
                    {formatNumber(
                      screenLevelData?.["totalData"]?.impressionsCohortWise[
                        imp
                      ]?.impressionDeliveredTotal?.toFixed(0)
                    ) || 0}
                  </p>
                </div>
              </td>
              <td className="col-span-2 text-[12px]">
                <div className="flex items-center justify-center">
                  <p>
                    {formatNumber(
                      screenLevelData?.["totalData"]?.impressionsCohortWise[
                        imp
                      ]?.impressionPromisedTotal?.toFixed(0)
                    ) || 0}
                  </p>
                </div>
              </td>
            </tr>
          ))}
      </tbody>
    </table>
  );
};

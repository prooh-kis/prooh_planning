import { LinearBar } from "../../components/molecules/linearbar"
import { formatNumber } from "../../utils/formatValue"

interface DashboardImpressionDetailsTableProps {
  screenLevelData?: any
}

export const DashboardImpressionDetailsTable = ({
  screenLevelData
}: DashboardImpressionDetailsTableProps) => {
  return (
    <table className="w-full">
    <thead>
      <tr className="bg-[#129BFF] text-[14px] text-white">
        <th className="py-1">
          <div className="border-r ">
            <h1 className="font-semibold">
              Audience Type
            </h1>
          </div>
        </th>
        <th>
          <div>
            <h1 className="font-semibold">
              Gender
            </h1>
          </div>
        </th>
        <th className="">
          <div className="border-x">
            <h1 className="font-semibold">
              Audience Impression % - {screenLevelData["totalData"]?.durationDelivered === 0 ? 1 : screenLevelData["totalData"]?.durationDelivered} Days Duration 
            </h1>
          </div>
        </th>
        <th>
          <div>
            <h1 className="font-semibold">
              Delivered
            </h1>
          </div>
        </th>
        <th className="">
          <div className="border-x">
            <h1 className="font-semibold">
              Promised
            </h1>
          </div>
          
        </th>
      </tr>
    </thead>
    <tbody className="">
      {Object.keys(screenLevelData["totalData"]?.impressionsCohortWise)?.map((imp: any, index: any) => (
        <tr key={index} className="border-b">
          <td className="text-[12px]">
            <div className="flex items-center pl-4 border-x">
              <p>
                {screenLevelData["totalData"]?.impressionsCohortWise[imp].cohort}
              </p>
            </div>
          </td>
          <td className="text-[12px]">
            <div className="flex flex-col gap-1 pl-4">
              <p>
                Male
              </p>
              <p>
                Female
              </p>
            </div>

          </td>
          <td className="">
            <div className="flex flex-col gap-2 px-2 border-x">
              <LinearBar value={40} colors={["","#84CBFF"]} highest={100} />
              <LinearBar value={60} colors={["","#D0B3FF"]} highest={100} />
            </div>
          </td>
          <td className="text-[12px]">
            <div className="flex items-center justify-center">
              <p>
                {formatNumber(screenLevelData["totalData"]?.impressionsCohortWise[imp].impressionDelivered.toFixed(0))}
              </p>
            </div>
          </td>
          <td className="text-[12px]">
            <div className="flex items-center justify-center border-x">
              <p>
                {formatNumber(screenLevelData["totalData"]?.impressionsCohortWise[imp].impressionPromised.toFixed(0))}
              </p>
            </div>
          </td>
        </tr>
      ))}

    </tbody>
  </table>
    
  )
}
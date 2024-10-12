import { formatNumber } from "../../utils/formatValue"

interface MyRequestsListTableProps {
  requestsList?: any,
}

export const MyRequestsListTable = ({
  requestsList
}: MyRequestsListTableProps) => {
  return (
    <table className="w-full">
      <thead>
        <tr className="bg-[#129BFF] text-white text-[14px]">
          <th className="py-2 font-semibold">
            <h1>
              Sl.No.
            </h1>
          </th>
          <th className="py-2 font-semibold">
            <h1>
              Campaign Name
            </h1>
          </th>
          <th className="py-2 font-semibold">
            <h1>
              Brand Name
            </h1>
          </th>
          <th className="py-2 font-semibold">
            <h1>
              Client Name
            </h1>
          </th>
          <th className="py-2 font-semibold">
            <h1>
              Start Date
            </h1>
          </th>
          <th className="py-2 font-semibold">
            <h1>
              End Date
            </h1>
          </th>
          <th className="py-2 font-semibold">
            <h1>
              Campaign Type
            </h1>
          </th>
          <th className="py-2 font-semibold">
            <h1>
              Time Remaining
            </h1>
          </th>
          <th className="py-2 font-semibold">
            <h1>
              Action
            </h1>
          </th>
        </tr>
      </thead>
      <tbody>
        {requestsList?.map((request: any, i: any) => (
          <tr key={i}>
            <td>
              <h1>
                {i+1}
              </h1>
            </td>
            <td>
              <h1>
                {i+1}
              </h1>
            </td>
            <td>
              <h1>
                {i+1}
              </h1>
            </td>
            <td>
              <h1>
                {i+1}
              </h1>
            </td>
            <td>
              <h1>
                {i+1}
              </h1>
            </td>
            <td>
              <h1>
                {i+1}
              </h1>
            </td>
            <td>
              <h1>
                {i+1}
              </h1>
            </td>
            
          </tr>
        ))}
      </tbody>
    </table>
  )
}
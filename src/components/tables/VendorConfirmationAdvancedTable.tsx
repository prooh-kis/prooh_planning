import { CheckboxInput } from "../../components/atoms/CheckboxInput"

export const VendorConfirmationAdvancedTable = ({}) => {
  return (
    <table className="w-full">
      <thead>
        <tr className="bg-[#D6EEFF]">
          <th className="p-2">
            <CheckboxInput />
          </th>
          <th className="py-2">
            <h1 className="text-[14px]">
              Screen Name
            </h1>
          </th>
          <th className="py-2">
            <h1 className="text-[14px]">
              Touchpoint
            </h1>
          </th>
          <th className="py-2">
            <div className="flex gap-2">
              <h1 className="text-[14px]">Media Type</h1>
              <i className="fi fi-rs-info flex items-center text-[#9A9A9A] text-[12px]"></i>
            </div>
          </th>
          <th className="py-2">
            <h1 className="text-[14px]">
              Cost
            </h1>
          </th>
          <th className="py-2">
            <div className="flex gap-2">
              <h1 className="text-[14px]">Status</h1>
              <i className="fi fi-rs-info flex items-center text-[#9A9A9A] text-[12px]"></i>
            </div>
          </th>
          <th className="py-2">
            <h1 className="text-[14px]">
              Creative
            </h1>
          </th>
          <th className="py-2">
            <h1 className="text-[14px]">
              Action
            </h1>
          </th>
        </tr>
      </thead>
      <tbody></tbody>
    </table>
  )
}
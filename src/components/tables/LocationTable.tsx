import { Checkbox } from "../../components/atoms/CheckboxInput";

export const LocationTable = () => {
  return (

    <table className="w-full">
      <thead className="bg-[#F7F7F7] w-full">
        <tr className="flex justify-between w-full h-[40px] px-2">
          <th className="flex items-center justify-center gap-2">
            <h1 className="text-[14px] text-[#21394F]">
              Location
            </h1>
            <i className="fi fi-rs-info flex items-center text-[#9A9A9A] text-[12px]"></i>
          </th>
          <th className="flex items-center justify-center gap-4">
            <Checkbox label="Male" onChange={() => {}} />
            <Checkbox label="Female" onChange={() => {}} />
          </th>
        </tr>
      </thead>
      <tbody className="border overflow-scroll">
        <tr className=" flex justify-between w-full p-2 border-b border-gray-100">
          <td className="flex items-center justify-center p-2 flex justify-between">
            <Checkbox label="Delhi NCR"/>
          </td>
        </tr>
      </tbody>
    </table>
  )
}
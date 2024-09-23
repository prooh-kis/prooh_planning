import { Checkbox } from "../../components/atoms/CheckboxInput";

export const LocationTable = () => {
  return (

    <table className="w-full">
      <thead className="bg-[#F7F7F7] flex justify-between items-center w-full">
        <tr className="flex justify-between w-full h-[40px] px-2">
          <th className="flex items-center justify-center gap-2">
            <h1 className="text-[14px] text-[#21394F]">
              Location
            </h1>
            <i className="fi fi-rs-info flex items-center text-[#9A9A9A]"></i>
          </th>
          <th className="flex items-center justify-center gap-4">
            <Checkbox label="Male" onChange={() => {}} />
            <Checkbox label="Female" onChange={() => {}} />
          </th>
        </tr>
      </thead>
      <tbody className="border overflow-scroll">
        <tr className=" flex justify-between w-full p-2">
          <td className="flex items-center justify-center p-2 flex justify-between">
            <Checkbox label="Delhi NCR"/>
          </td>
          <td className="flex items-center justify-center gap-4">
            
          </td>
        </tr>
      </tbody>
    </table>
  )
}
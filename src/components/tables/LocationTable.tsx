import { CheckboxInput } from "../../components/atoms/CheckboxInput";

interface LocationTableProps {
  markets?: any;
}
export const LocationTable = ({ markets }: LocationTableProps) => {
  console.log(markets)
  return (

    <table className="w-full">
      <thead className="bg-[#F7F7F7] w-full">
        <tr className="grid grid-cols-8 w-full h-[40px]">
          <th className="col-span-4 flex items-center px-2 gap-2">
            <h1 className="text-[14px] text-[#21394F]">
              Location
            </h1>
            <i className="fi fi-rs-info flex items-center text-[#9A9A9A] text-[12px]"></i>
          </th>
          <th className="col-span-4 flex items-center justify-center gap-2">
            <CheckboxInput label="Male" onChange={() => {}} />
            <CheckboxInput label="Female" onChange={() => {}} />
          </th>
        </tr>
      </thead>
      <tbody className="border overflow-scroll">
        {Object.keys(markets)?.map((market: any, index: any) => (
          <tr key={index} className="grid grid-cols-8 w-full h-[40px] border-b border-gray-100">
            <td className="col-span-4 flex items-center px-2">
              <CheckboxInput label={`${market}`}/>
            </td>
            <td className="col-span-4 flex items-center justify-around gap-2">
              <p className="text-[14px] text-[#21394F]">
                {markets[market]["gender"]["Male"]}
              </p>
              <p className="text-[14px] text-[#21394F]">
                {markets[market]["gender"]["Female"]}
              </p>
            </td>
          </tr>
        ))}
  
      </tbody>
    </table>
  )
}
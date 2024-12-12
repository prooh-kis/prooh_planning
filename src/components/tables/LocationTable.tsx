import { SkeletonLoader } from "../../components/molecules/SkeletonLoader";
import { CheckboxInput } from "../../components/atoms/CheckboxInput";
import { Tooltip } from "antd";

interface LocationTableProps {
  markets?: any;
  selectedMarkets?: any;
  setSelectedMarkets?: any;
  selectedGender?: any;
  setSelectedGender?: any;
  loading?: any;
  handleSelection?: any;
}
export const LocationTable = ({
  markets,
  loading,
  selectedMarkets,
  setSelectedMarkets,
  handleSelection,
  selectedGender,
  setSelectedGender,
}: LocationTableProps) => {

  const handleCheckClick = ({ type, checked }: any) => {
    if (type === "Male") {
      if (checked && !selectedGender.includes("Male")) {
        setSelectedGender([...selectedGender, "Male"]);
        handleSelection({
          type: "gender",
          data: [...selectedGender, "Male"],
        });
      } else {
        const gender = selectedGender?.filter((gender: any) => gender !== "Male")
        setSelectedGender(gender);
        handleSelection({
          type: "gender",
          data: gender,
        });
      }
    } else if (type === "Female") {
      if (checked && !selectedGender.includes("Female")) {
        setSelectedGender([...selectedGender, "Female"]);
        handleSelection({
          type: "gender",
          data: [...selectedGender, "Female"],
        });
      } else {
        const gender = selectedGender?.filter((gender: any) => gender !== "Female")
        setSelectedGender(gender);
        handleSelection({
          type: "gender",
          data: gender,
        });
      }
    }
    return {checked};
   
  }

  return (

    <table className="w-full">
      <thead className="bg-[#F7F7F7] w-full">
        <tr className="grid grid-cols-8 w-full h-[40px]">
          <th className="col-span-4 flex items-center px-2 gap-2">
            <h1 className="md:text-[14px] sm:text-[12px] text-[#21394F]">
              Location
            </h1>
            <Tooltip
              title="Choose your target audience gender wise in the given locations"
            >
              <i className="fi fi-rs-info flex items-center text-[#9A9A9A] text-[12px]"></i>
            </Tooltip>
          </th>
          <th className="col-span-4 flex items-center justify-center gap-2">
            <CheckboxInput
              disabled={loading}
              label="Male"
              checked={selectedGender.includes("Male") ? true : false}
              onChange={(e: any) => handleCheckClick({type: "Male", checked: e})}
            />
            <CheckboxInput
              disabled={loading}
              label="Female"
              checked={selectedGender.includes("Female")? true : false}
              onChange={(e: any) => handleCheckClick({type: "Female", checked: e})} 
            />
          </th>
        </tr>
      </thead>
      <tbody className="border overflow-scroll">
        {loading && (
          <tr className="w-full">
            <th className="w-full">
              <SkeletonLoader />
            </th>
          </tr>
        )}
        {Object.keys(markets)?.map((market: any, index: any) => (
          <tr key={index} className="grid grid-cols-8 w-full h-[40px] border-b border-gray-100">
            <td className="col-span-4 flex items-center px-2">
              <CheckboxInput label={`${market}`} disabled={true} checked={true} onChange={() => {}}/>
            </td>
            <td className="col-span-4 flex items-center justify-around gap-2">
              <p className="text-[14px] text-[#21394F]">
                {(markets[market]["gender"]["Male"]).toFixed(1)}
              </p>
              <p className="text-[14px] text-[#21394F]">
                {(markets[market]["gender"]["Female"]).toFixed(1)}
              </p>
            </td>
          </tr>
        ))}
  
      </tbody>
    </table>
  )
}
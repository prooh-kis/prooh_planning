import { SkeletonLoader } from "../../components/molecules/SkeletonLoader";
import { CheckboxInput } from "../../components/atoms/CheckboxInput";
import { Tooltip } from "antd";
import { Loading } from "../../components/Loading";
import { StateCityZoneCheckboxTree } from "../molecules/StateCityZoneCheckboxTree";

interface LocationTableProps {
  selectedGender?: any;
  setSelectedGender?: any;
  loading?: any;
  handleSelection?: any;
  data?: any;
  setSelectedCity?: any;
  setSelectedZone?: any;
}
export const LocationTable = ({
  loading,
  selectedGender,
  setSelectedGender,
  data,
  setSelectedCity,
  setSelectedZone,
}: LocationTableProps) => {
  const handleCheckClick = ({ type, checked }: any) => {
    if (type === "Male") {
      if (checked && !selectedGender.includes("Male")) {
        setSelectedGender([...selectedGender, "Male"]);
        // handleSelection({
        //   type: "gender",
        //   data: [...selectedGender, "Male"],
        // });
      } else {
        const gender = selectedGender?.filter(
          (gender: any) => gender !== "Male"
        );
        setSelectedGender(gender);
        // handleSelection({
        //   type: "gender",
        //   data: gender,
        // });
      }
    } else if (type === "Female") {
      if (checked && !selectedGender.includes("Female")) {
        setSelectedGender([...selectedGender, "Female"]);
        // handleSelection({
        //   type: "gender",
        //   data: [...selectedGender, "Female"],
        // });
      } else {
        const gender = selectedGender?.filter(
          (gender: any) => gender !== "Female"
        );
        setSelectedGender(gender);
        // handleSelection({
        //   type: "gender",
        //   data: gender,
        // });
      }
    }
    return { checked };
  };

  return (
    <table className="w-full">
      <thead className="bg-[#F7F7F7] w-full">
        <tr className="grid grid-cols-12 w-full h-[40px] px-2">
          <th className="col-span-9 flex items-center px-1 gap-2">
            <div className="flex gap-2 items-center px-1">
              {/* <Tooltip title="Choose your target audience gender wise in the given locations">
                <i className="fi fi-sr-land-layer-location flex items-center lg:text-[14px] text-[12px] text-[#21394F]"></i>
              </Tooltip> */}
              <h1 className="lg:text-[14px] text-[12px] text-[#21394F]">
                Locations
              </h1>
            </div>
          </th>
          <th className="col-span-3 flex items-center">
            <CheckboxInput
              disabled={loading}
              label="Male"
              checked={selectedGender.includes("Male") ? true : false}
              onChange={(e: any) =>
                handleCheckClick({ type: "Male", checked: e })
              }
              icon="fi fi-sr-man-head"
              showIcon={true}
            />
            <CheckboxInput
              disabled={loading}
              label="Female"
              checked={selectedGender.includes("Female") ? true : false}
              onChange={(e: any) =>
                handleCheckClick({ type: "Female", checked: e })
              }
              icon="fi fi-sr-woman-head"
              showIcon={true}
            />
          </th>
        </tr>
      </thead>
      <tbody className="border overflow-scroll">
        <tr className="flex">
          <td className="w-full">
            <StateCityZoneCheckboxTree
              data={data || {}}
              loading={loading}
              setSelectedCity={setSelectedCity}
              setSelectedZone={setSelectedZone}
            />
          </td>
        </tr>
      </tbody>
    </table>
  );
};

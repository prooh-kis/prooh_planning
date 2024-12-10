import { DropdownInput } from "../../components/atoms/DropdownInput";

interface DashboardFiltersProps {

}
export const DashboardFilters = ({}: DashboardFiltersProps) => {
 
  return (
    <div className="flex gap-2 py-2">
      <DropdownInput
        height="h-8"
        width="w-20"
        placeHolder="All"
        selectedOption={""}
        setSelectedOption={""}
        options={[{
          label: "All",
          value: "",
        }]}
      />
      <DropdownInput
        height="h-8"
        width="w-20"
        placeHolder="Gurgaon"
        selectedOption={""}
        setSelectedOption={""}
        options={[{
          label: "Gurgaon",
          value: "",
        }]}
      />
      <DropdownInput
        height="h-8"
        width="w-20"
        placeHolder="QSR"
        selectedOption={""}
        setSelectedOption={""}
        options={[{
          label: "QSR",
          value: "",
        }]}
      />
      <DropdownInput
        height="h-8"
        width="w-20"
        placeHolder="Premium"
        selectedOption={""}
        setSelectedOption={""}
        options={[{
          label: "Premium",
          value: "",
        }]}
      />
      <DropdownInput
        height="h-8"
        width="w-20"
        placeHolder="Regular"
        selectedOption={""}
        setSelectedOption={""}
        options={[{
          label: "Regular",
          value: "",
        }]}
      />
    </div>
  )
}
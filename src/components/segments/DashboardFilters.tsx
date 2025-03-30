import { DropdownInput } from "../../components/atoms/DropdownInput";

interface DashboardFiltersProps {
  campaignDetails?: any;
  handleSelectCity: any;
  handleSelectTouchPoint: any;
  touchPointList: string[];
  cityList: string[];
}
export const DashboardFilters = ({
  campaignDetails,
  handleSelectCity,
  handleSelectTouchPoint,
  touchPointList,
  cityList,
}: DashboardFiltersProps) => {
  return (
    <div className="grid grid-cols-6 gap-2 py-2 ">
      <h1 className="col-span-2 flex items-center">
        <span>
          <i className="fi fi-rr-calendar-clock flex items-center pr-2"></i>
        </span>
        {`${new Date(campaignDetails?.startDate)
          .toDateString()
          ?.split(" ")
          ?.splice(1, 2)
          ?.join(" ")} - ${new Date(campaignDetails?.endDate)
          .toDateString()
          ?.split(" ")
          ?.splice(1, 3)
          ?.join(" ")}`}
      </h1>
      {/* <DropdownInput
        border="border-gray-100"
        height="h-8"
        width="w-full"
        placeHolder={`${new Date(campaignDetails?.startDate)
          .toDateString()
          ?.split(" ")
          ?.splice(1, 2)
          ?.join(" ")} - ${new Date(campaignDetails?.endDate)
          .toDateString()
          ?.split(" ")
          ?.splice(1, 3)
          ?.join(" ")}`}
        selectedOption={""}
        setSelectedOption={""}
        options={[
          {
            label: `Start Date: ${new Date(campaignDetails?.startDate)
              .toDateString()
              ?.split(" ")
              ?.splice(0, 4)
              ?.join(" ")}`,
            value: "",
          },
          {
            label: `End Date: ${new Date(campaignDetails?.endDate)
              .toDateString()
              ?.split(" ")
              ?.splice(0, 4)
              ?.join(" ")}`,
            value: "",
          },
          {
            label: `Duration: ${campaignDetails?.duration} Days`,
            value: "",
          },
        ]}
      /> */}
      <div className="col-span-2">
        <DropdownInput
          border="border-gray-100"
          height="h-8"
          width="w-full"
          selectedOption={""}
          placeHolder="----Select City----"
          setSelectedOption={handleSelectCity}
          options={cityList?.map((city: string) => {
            return {
              label: city,
              value: city,
            };
          })}
        />
      </div>
      <div className="col-span-2">
        <DropdownInput
          border="border-gray-100"
          height="h-8"
          width="w-full"
          selectedOption={""}
          placeHolder="----Select TouchPoint-----"
          setSelectedOption={handleSelectTouchPoint}
          options={touchPointList?.map((tp: string) => {
            return {
              label: tp,
              value: tp,
            };
          })}
        />
      </div>
      {/* <DropdownInput
        border="border-gray-100"
        height="h-8"
        width="w-20"
        placeHolder="Premium"
        selectedOption={""}
        setSelectedOption={""}
        options={[{
          label: "Premium",
          value: "",
        }]}
      /> */}
    </div>
  );
};

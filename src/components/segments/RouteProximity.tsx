import { PrimaryInput } from "../atoms/PrimaryInput";
import { CheckboxInput } from "../atoms/CheckboxInput"
import { PrimaryButton } from "../atoms/PrimaryButton";
import { LinearBar } from "../../components/molecules/linearbar";


interface RouteProximityProps {
  selectedStoreOption?: any;
  handleStoreSelection?: any;
  handleGetExcelData?: any;

}

export const RouteProximity = ({selectedStoreOption, handleStoreSelection, handleGetExcelData}: RouteProximityProps) => {
  return (
    <div className="py-2">
      <div className="flex justify-between py-2">
        <h1 className="text-[20px] text-primaryText">2. Route Proximity</h1>
      </div>
      <div className="pb-2 flex items-center gap-4">
        <div className="flex items-center gap-2">
          <i className="fi fi-br-check text-[14px] text-green-500 flex items-center "></i>
          <p className="text-[14px] text-green-500">Route 1</p>
        </div>
        <div className="flex items-center gap-2">
          <i className="fi fi-br-check text-[14px] text-green-500 flex items-center "></i>
          <p className="text-[14px] text-green-500">Route 2</p>
        </div>
        <div className="flex items-center gap-2">
          {/* <i className="fi fi-br-check text-[14px] text-green-500 flex items-center "></i> */}
          <p className="text-[14px] text-gray-500">Route 3</p>
        </div>
      </div>
      <div className="grid grid-cols-5 gap-2 flex items-center py-2">
        <div className="col-span-2 flex items-center">
          <PrimaryInput 
            action={() => {}}
            prefix={
              <i className="fi fi-sr-map-pin absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-300 w-5 h-5"></i>
            }
          />
        </div>
        <div className="col-span-2">
          <PrimaryInput 
            action={() => {}}
            suffix={
              <i className="fi fi-sr-map-pin absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-300 w-5 h-5"></i>
            }
          />
        </div>
        <div className="col-span-1">
          <PrimaryButton
            title="Find"
            action={() => {}}
            rounded="rounded-[10px]"
          />
        </div>
      </div>
      <div className="py-2">
        <div className="">
          <CheckboxInput color="#52A2FF" label={'Delhi to Gurgaon'}/>
          <div className="pb-1 grid grid-cols-12 gap-2 flex items-center">
            <p className="col-span-1 text-[12px] text-[#52A2FF]">05</p>
            <div className="col-span-9">
              <LinearBar value={5} colors={["#F3F3F3", "#7AB3A2"]} />
            </div>
            <p className="col-span-2 text-[12px] text-semibold flex justify-end">27 Locations</p>
          </div>
        </div>
        <div className="">
          <CheckboxInput color="#52A2FF" label={'Delhi to Gurgaon'}/>
          <div className="pb-1 grid grid-cols-12 gap-2 flex items-center">
            <p className="col-span-1 text-[12px] text-[#52A2FF]">05</p>
            <div className="col-span-9">
              <LinearBar value={5} colors={["#F3F3F3", "#7AB3A2"]} />
            </div>
            <p className="col-span-2 text-[12px] text-semibold flex justify-end">27 Locations</p>
          </div>
        </div>
        <div className="">
          <CheckboxInput color="#52A2FF" label={'Delhi to Gurgaon'}/>
          <div className="pb-1 grid grid-cols-12 gap-2 flex items-center">
            <p className="col-span-1 text-[12px] text-[#52A2FF]">05</p>
            <div className="col-span-9">
              <LinearBar value={5} colors={["#F3F3F3", "#7AB3A2"]} />
            </div>
            <p className="col-span-2 text-[12px] text-semibold flex justify-end">27 Locations</p>
          </div>
        </div>
      </div>
    </div>
  )
}
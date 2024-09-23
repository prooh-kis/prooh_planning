import { useState } from "react";
import { PrimaryButton } from "../../components/atoms/PrimaryButton"
import { PrimaryInput } from "../../components/atoms/PrimaryInput"
import { useNavigate } from "react-router-dom";

export const EnterCampaignBasicDetails: React.FC  = () => {
  const [enterDuration, setEnterDuration] = useState<any>(false);
  const navigate = useNavigate();

  return (
    <div className="w-full">
      <div>
        <h1 className="text-[24px] text-primaryText font-semibold">Add Basic Details</h1>
        <p className="text-[14px] text-secondaryText">Enter your basic details for the campaigns to proceed further</p>
      </div>
      <div className="grid grid-cols-3 gap-8 pt-2">
        <div className="col-span-1 py-1">
          <label className="block text-secondaryText text-[14px] mb-2">Campaign Name</label>
          <PrimaryInput placeholder="Campaign Name" value={""} action={() => {}}/>
        </div>
        <div className="col-span-1 py-1">
          <label className="block text-secondaryText text-[14px] mb-2">Brand Name</label>
          <PrimaryInput placeholder="Brand Name" value={""} action={() => {}}/>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-8 pt-2">
        <div className="col-span-1 py-1">
          <label className="block text-secondaryText text-[14px] mb-2">Client Name</label>
          <PrimaryInput placeholder="Client Name" value={""} action={() => {}}/>
        </div>
        <div className="col-span-1 py-1">
          <label className="block text-secondaryText text-[14px] mb-2">Industry</label>
          <PrimaryInput placeholder="Industry" value={""} action={() => {}}/>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-8 pt-2">
        <div className="col-span-1 py-1">
          <label className="block text-secondaryText text-[14px] mb-2">Start Date</label>
          <PrimaryInput placeholder="Start Date" value={""} action={() => {}}/>  
        </div>
        <div className="col-span-1 py-1">
          <div className="flex justify-between">
            <label className="block text-secondaryText text-[14px] mb-2">
              {!enterDuration ? "End Date" : "Duration"}
              </label>
            <input
              className="mr-2 mt-[0.3rem] h-3.5 w-8 appearance-none rounded-[0.4375rem] bg-neutral-300 before:pointer-events-none before:absolute before:h-3.5 before:w-3.5 before:rounded-full before:bg-transparent before:content-[''] after:absolute after:z-[2] after:-mt-[0.1875rem] after:h-5 after:w-5 after:rounded-full after:border-none after:bg-neutral-100 after:shadow-[0_0px_3px_0_rgb(0_0_0_/_7%),_0_2px_2px_0_rgb(0_0_0_/_4%)] after:transition-[background-color_0.2s,transform_0.2s] after:content-[''] checked:bg-primary checked:after:absolute checked:after:z-[2] checked:after:-mt-[3px] checked:after:ml-[1.0625rem] checked:after:h-5 checked:after:w-5 checked:after:rounded-full checked:after:border-none checked:after:bg-primary checked:after:shadow-[0_3px_1px_-2px_rgba(0,0,0,0.2),_0_2px_2px_0_rgba(0,0,0,0.14),_0_1px_5px_0_rgba(0,0,0,0.12)] checked:after:transition-[background-color_0.2s,transform_0.2s] checked:after:content-[''] hover:cursor-pointer focus:outline-none focus:ring-0 focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[3px_-1px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] focus:after:absolute focus:after:z-[1] focus:after:block focus:after:h-5 focus:after:w-5 focus:after:rounded-full focus:after:content-[''] checked:focus:border-primary checked:focus:bg-primary checked:focus:before:ml-[1.0625rem] checked:focus:before:scale-100 checked:focus:before:shadow-[3px_-1px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] dark:bg-neutral-600 dark:after:bg-neutral-400 dark:checked:bg-primary dark:checked:after:bg-primary dark:focus:before:shadow-[3px_-1px_0px_13px_rgba(255,255,255,0.4)] dark:checked:focus:before:shadow-[3px_-1px_0px_13px_#3b71ca]"
              type="checkbox"
              role="switch"
              title="dffs"
              id="flexSwitchCheckDefault"
              onChange={() => {
                // handleSetNewDuration();
                // setEnterDuration(!enterDuration);
              }}
            />
          </div>
          <PrimaryInput placeholder={!enterDuration ? "End Date" : "0"} value={""} action={() => {}}/>
        </div>
      </div>
      <div className="flex py-4">
        <PrimaryButton rounded="rounded-[6px]" title="Continue" action={() => navigate("/audience&touchpoints")} />
      </div>
    </div>
  )
}
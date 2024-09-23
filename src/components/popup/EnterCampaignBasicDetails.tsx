import { useCallback, useEffect, useState } from "react";
import { PrimaryButton } from "../../components/atoms/PrimaryButton"
import { PrimaryInput } from "../../components/atoms/PrimaryInput"
import { useNavigate } from "react-router-dom";
import { CalendarInput } from "../../components/atoms/CalendarInput";
import { getNumberOfDaysBetweenTwoDates } from "../../utils/dateAndTimeUtils";
import { saveDataOnLocalStorage } from "../../utils/localStorageUtils";

export const EnterCampaignBasicDetails: React.FC  = () => {
  const navigate = useNavigate();

  const [campaignName, setCampaignName] = useState<any>("");
  const [brandName, setBrandName] = useState<any>("");
  const [clientName, setClientName] = useState<any>("");
  const [industry, setIndustry] = useState<any>("");
  const [startDate, setStartDate] = useState<any>("");
  const [endDate, setEndDate] = useState<any>("");
  const [duration, setDuration] = useState<any>("");
  

  const [enterDuration, setEnterDuration] = useState<any>(false);

  const validateForm = () => {
    if (campaignName.length === 0) {
      alert("Please enter campaign name");
      return false;
    } else if (brandName.length === 0) {
      alert("Please enter brand name");
      return false;
    } else if (startDate === undefined || startDate === null) {
      alert("Please enter start data ");
      return false;
    } else if (endDate === undefined || endDate === null) {
      alert("Please enter endData ");
      return false;
    } else {
      return true;
    }
  };

  const saveCampaignDetailsOnLocalStorage = useCallback(() => {
    saveDataOnLocalStorage(`campaign_${brandName}_${campaignName}}`, {
      basicDetails: {
        campaignName: campaignName,
        brandName: brandName,
        clientName: clientName,
        industry: industry,
        startDate: startDate,
        endDate: endDate,
      }
    });
  }, [brandName, campaignName, clientName, endDate, industry, startDate]);


  useEffect(() => {
  },[]);


  const handleSetNewDuration = () => {
    if (startDate && endDate)
      setDuration(getNumberOfDaysBetweenTwoDates(startDate, endDate));
    else alert("Please enter first start , end Date");
  };

  return (
    <div className="w-full">
      <div>
        <h1 className="text-[24px] text-primaryText font-semibold">Add Basic Details</h1>
        <p className="text-[14px] text-secondaryText">Enter your basic details for the campaigns to proceed further</p>
      </div>
      <div className="grid grid-cols-3 gap-8 pt-2">
        <div className="col-span-1 py-1">
          <label className="block text-secondaryText text-[14px] mb-2">Campaign Name</label>
          <PrimaryInput inputType="text" placeholder="Campaign Name" value={campaignName} action={setCampaignName}/>
        </div>
        <div className="col-span-1 py-1">
          <label className="block text-secondaryText text-[14px] mb-2">Brand Name</label>
          <PrimaryInput inputType="text" placeholder="Brand Name" value={brandName} action={setBrandName}/>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-8 pt-2">
        <div className="col-span-1 py-1">
          <label className="block text-secondaryText text-[14px] mb-2">Client Name</label>
          <PrimaryInput inputType="text" placeholder="Client Name" value={clientName} action={setClientName}/>
        </div>
        <div className="col-span-1 py-1">
          <label className="block text-secondaryText text-[14px] mb-2">Industry</label>
          <PrimaryInput inputType="text" placeholder="Industry" value={industry} action={setIndustry}/>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-8 pt-2">
        <div className="col-span-1 py-1">
          <label className="block text-secondaryText text-[14px] mb-2">Start Date</label>
          <CalendarInput placeholder="Start Date" value={startDate} action={setStartDate}/>  
        </div>
        <div className="col-span-1 py-1">
          <div className="flex justify-between">
            <label className="block text-secondaryText text-[14px] mb-2">
              {!enterDuration ? "End Date" : "Duration"}
            </label>
            <input
              className="mr-2 h-3.5 w-8 appearance-none rounded-[0.4375rem] bg-neutral-300 before:pointer-events-none before:absolute before:h-3.5 before:w-3.5 before:rounded-full before:bg-transparent before:content-[''] after:absolute after:z-[2] after:-mt-[0.1875rem] after:h-5 after:w-5 after:rounded-full after:border-none after:bg-neutral-100 after:shadow-[0_0px_3px_0_rgb(0_0_0_/_7%),_0_2px_2px_0_rgb(0_0_0_/_4%)] after:transition-[background-color_0.2s,transform_0.2s] after:content-[''] checked:bg-primary checked:after:absolute checked:after:z-[2] checked:after:-mt-[3px] checked:after:ml-[1.0625rem] checked:after:h-5 checked:after:w-5 checked:after:rounded-full checked:after:border-none checked:after:bg-primary checked:after:shadow-[0_3px_1px_-2px_rgba(0,0,0,0.2),_0_2px_2px_0_rgba(0,0,0,0.14),_0_1px_5px_0_rgba(0,0,0,0.12)] checked:after:transition-[background-color_0.2s,transform_0.2s] checked:after:content-[''] hover:cursor-pointer focus:outline-none focus:ring-0 focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[3px_-1px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] focus:after:absolute focus:after:z-[1] focus:after:block focus:after:h-5 focus:after:w-5 focus:after:rounded-full focus:after:content-[''] checked:focus:border-primary checked:focus:bg-primary checked:focus:before:ml-[1.0625rem] checked:focus:before:scale-100 checked:focus:before:shadow-[3px_-1px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] dark:bg-neutral-600 dark:after:bg-neutral-400 dark:checked:bg-primary dark:checked:after:bg-primary dark:focus:before:shadow-[3px_-1px_0px_13px_rgba(255,255,255,0.4)] dark:checked:focus:before:shadow-[3px_-1px_0px_13px_#3b71ca]"
              type="checkbox"
              role="switch"
              title="toggle"
              id="flexSwitchCheckDefault"
              onChange={() => {
                handleSetNewDuration();
                setEnterDuration(!enterDuration);
              }}
            />
          </div>
          {!enterDuration ? (
            <CalendarInput placeholder={!enterDuration ? "End Date" : "0"} value={!enterDuration ? endDate : duration} action={setEndDate}/>
          ) : (
            <PrimaryInput inputType="number" placeholder="duration" value={duration} action={setDuration}/>
          )}
        </div>
      </div>
      <div className="flex py-4">
        <PrimaryButton rounded="rounded-[6px]" title="Continue" action={() => {
          
          if (validateForm()) {
            saveCampaignDetailsOnLocalStorage();
          }
          navigate("/audience&touchpoints");
          }} />
      </div>
    </div>
  )
}
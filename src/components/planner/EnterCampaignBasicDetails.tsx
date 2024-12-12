import { useCallback, useEffect, useState } from "react";
import { PrimaryButton } from "../atoms/PrimaryButton";
import { PrimaryInput } from "../atoms/PrimaryInput";
import { useNavigate } from "react-router-dom";
import { CalendarInput } from "../atoms/CalendarInput";
import {
  getEndDateFromStartDateANdDuration,
  getNumberOfDaysBetweenTwoDates,
} from "../../utils/dateAndTimeUtils";
import {
  getDataFromLocalStorage,
  saveDataOnLocalStorage,
} from "../../utils/localStorageUtils";
import { message, Tooltip } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { addDetailsToCreateCampaign } from "../../actions/campaignAction";
import { FULL_CAMPAIGN_PLAN } from "../../constants/localStorageConstants";
import { format } from "date-fns";
import { getScreensAudiencesData } from "../../actions/screenAction";
import { ALL_MARKETS } from "../../constants/helperConstants";

interface EnterCampaignBasicDetailsProps {
  setCurrentStep: (step: number) => void;
  step: number;
  userInfo?: any;
  pathname?: string;
  campaignId?: any;
  campaignType: string;
  path: string;
}

export const EnterCampaignBasicDetails = ({
  setCurrentStep,
  step,
  userInfo,
  pathname,
  campaignId,
  campaignType,
  path,
}: EnterCampaignBasicDetailsProps) => {
  const navigate = useNavigate();
  const dispatch = useDispatch<any>();

  const [campaignName, setCampaignName] = useState<any>(
    getDataFromLocalStorage(FULL_CAMPAIGN_PLAN)?.[campaignId]?.name || ""
  );
  const [brandName, setBrandName] = useState<any>(
    getDataFromLocalStorage(FULL_CAMPAIGN_PLAN)?.[campaignId]?.brandName || ""
  );
  const [clientName, setClientName] = useState<any>(
    getDataFromLocalStorage(FULL_CAMPAIGN_PLAN)?.[campaignId]?.clientName || ""
  );
  const [industry, setIndustry] = useState<any>(
    getDataFromLocalStorage(FULL_CAMPAIGN_PLAN)?.[campaignId]?.industry || ""
  );
  const [startDate, setStartDate] = useState<any>(
    getDataFromLocalStorage(FULL_CAMPAIGN_PLAN)?.[campaignId]
      ? new Date(
          getDataFromLocalStorage(FULL_CAMPAIGN_PLAN)?.[campaignId]?.startDate
        )
          ?.toISOString()
          ?.slice(0, 16)
      : ""
  );
  const [endDate, setEndDate] = useState<any>(
    getDataFromLocalStorage(FULL_CAMPAIGN_PLAN)?.[campaignId]
      ? new Date(
          getDataFromLocalStorage(FULL_CAMPAIGN_PLAN)?.[campaignId]?.endDate
        )
          ?.toISOString()
          ?.slice(0, 16)
      : ""
  );

  const [duration, setDuration] = useState<any>(
    getDataFromLocalStorage(FULL_CAMPAIGN_PLAN)?.[campaignId]?.duration || ""
  );

  const [enterDuration, setEnterDuration] = useState<any>(false);

  const detailsToCreateCampaignAdd = useSelector(
    (state: any) => state.detailsToCreateCampaignAdd
  );
  const {
    loading: loadingAddDetails,
    error: errorAddDetails,
    success: successAddDetails,
    data: addDetails,
  } = detailsToCreateCampaignAdd;

  const validateForm = () => {
    if (campaignName.length === 0) {
      message.error("Please enter campaign name");
      return false;
    } else if (brandName.length === 0) {
      message.error("Please enter brand name");
      return false;
    } else if (startDate === "") {
      message.error("Please enter start data ");
      return false;
    } else if (endDate === "") {
      message.error("Please enter endData ");
      return false;
    } else {
      return true;
    }
  };

  // Function to handle duration change and update the end date
  const updateEndDateBasedOnDuration = useCallback(
    (newDuration: number) => {
      if (startDate) {
        const endDate1 = getEndDateFromStartDateANdDuration(
          startDate,
          newDuration
        );
        setEndDate(new Date(endDate1).toISOString().slice(0, 16));
      } else {
        message.error("Please enter a start date first");
      }
    },
    [startDate]
  );

  const handleSetNewDuration = useCallback((dur: any) => {
    // if (!enterDuration) {
    //   setDuration(getNumberOfDaysBetweenTwoDates(startDate, endDate));
    // } else {
      updateEndDateBasedOnDuration(dur);
    // }
    // else message.error("Please enter first start , end Date");
  }, [
    // endDate,
    // enterDuration,
    // startDate,
    updateEndDateBasedOnDuration,
  ]);

  const saveCampaignDetailsOnLocalStorage = useCallback(() => {
    handleSetNewDuration(duration);

    dispatch(
      addDetailsToCreateCampaign({
        pageName: "Basic Details Page",
        name: campaignName,
        brandName: brandName,
        campaignType: campaignType,
        clientName: clientName,
        industry: industry,
        startDate: new Date(startDate).toISOString(),
        endDate: new Date(endDate).toISOString(),
        duration: duration,
        campaignPlannerId: userInfo?._id,
        campaignPlannerName: userInfo?.name,
        campaignPlannerEmail: userInfo?.email,
        campaignManagerId: userInfo?.primaryUserId,
        campaignManagerEmail: userInfo?.primaryUserEmail,
      })
    );
  }, [
    handleSetNewDuration,
    dispatch,
    campaignName,
    brandName,
    campaignType,
    duration,
    clientName,
    industry,
    startDate,
    endDate,
    userInfo?._id,
    userInfo?.name,
    userInfo?.email,
    userInfo?.primaryUserId,
    userInfo?.primaryUserEmail,
  ]);

  useEffect(() => {
    if (errorAddDetails) {
      message.error(errorAddDetails);
    }

    if (successAddDetails) {
      navigate(`/${path}/${addDetails?._id}`);
      setCurrentStep(step + 1);
    }
    // dispatch(getScreensAudiencesData({
    //   id: getDataFromLocalStorage(FULL_CAMPAIGN_PLAN)?.[campaignId]?._id,
    //   markets: ALL_MARKETS
    // }));
  }, [
    navigate,
    step,
    setCurrentStep,
    successAddDetails,
    errorAddDetails,
    addDetails,
    path,
    dispatch,
    campaignId,
  ]);

  return (
    <div className="w-full py-3">
      <div className="">
        <h1 className="text-[24px] text-primaryText font-semibold">
          Add Basic Details
        </h1>
        <p className="text-[14px] text-secondaryText">
          Enter your basic details for the campaigns to proceed further
        </p>
      </div>
      <div className="grid grid-cols-3 gap-8 pt-2">
        <div className="col-span-1 py-1">
          <div className="block flex justify-between gap-2 items-center mb-2">
            <label className="text-secondaryText text-[14px] ">
              Campaign Name
            </label>
            <Tooltip
              title="Enter a unique name for your campaign"
            >
              <i className="fi fi-sr-info text-[10px] text-gray-400 flex justify-center items-center"></i>
            </Tooltip>
          </div>

          <PrimaryInput
            inputType="text"
            placeholder="Campaign Name"
            value={campaignName}
            action={setCampaignName}
          />
        </div>
        <div className="col-span-1 py-1">
          <div className="block flex justify-between gap-2 items-center mb-2">
            <label className="block text-secondaryText text-[14px]">
              Brand Name
            </label>
            <Tooltip
              title="Enter campaign's brand name"
            >
              <i className="fi fi-sr-info text-[10px] text-gray-400 flex justify-center items-center"></i>
            </Tooltip>
          </div>

          <PrimaryInput
            inputType="text"
            placeholder="Brand Name"
            value={brandName}
            action={(value) => setBrandName(value?.toUpperCase())}
          />
        </div>
      </div>
      <div className="grid grid-cols-3 gap-8 pt-2">
        <div className="col-span-1 py-1">
          <div className="block flex justify-between justify-betweengap-2 items-center mb-2">
            <label className="block text-secondaryText text-[14px]">
              Industry            
            </label>
            <Tooltip
              title="Enter industry name your brand belongs to"
            >
              <i className="fi fi-sr-info text-[10px] text-gray-400 flex justify-center items-center"></i>
            </Tooltip>
          </div>
          <PrimaryInput
            inputType="text"
            placeholder="Industry"
            value={industry}
            action={setIndustry}
          />
        </div>
        <div className="col-span-1 py-1">
          <div className="block flex justify-between gap-2 items-center mb-2">
            <label className="block text-secondaryText text-[14px]">
              Agency / Client
            </label>
            <Tooltip
              title="Enter Agency's name or client's name who is managing the campaign"
            >
              <i className="fi fi-sr-info text-[10px] text-gray-400 flex justify-center items-center"></i>
            </Tooltip>
          </div>
          <PrimaryInput
            inputType="text"
            placeholder="Agency / Client Name"
            value={clientName}
            action={setClientName}
          />
        </div>
        
      </div>
      <div className="grid grid-cols-3 gap-8 pt-2">
        <div className="col-span-1 py-1">
          <div className="block flex justify-between gap-2 items-center mb-2">
            <label className="block text-secondaryText text-[14px]">
              Start Date
            </label>
            <Tooltip
              title="Select Date from when the campaign is to be started"
            >
              <i className="fi fi-sr-info text-[10px] text-gray-400 flex justify-center items-center"></i>
            </Tooltip>
          </div>
          <CalendarInput
            placeholder="Start Date"
            value={startDate}
            action={setStartDate}
            disabled={false}
            minDate={new Date()}
          />
        </div>
        <div className="col-span-1 py-1">
          <div className="block flex justify-between gap-2 items-center mb-2">
            <label className="block text-secondaryText text-[14px]">
              Duration
            </label>
            <Tooltip
              title="Enter total duration of campaigns in days"
            >
              <i className="fi fi-sr-info text-[10px] text-gray-400 flex justify-center items-center"></i>
            </Tooltip>
          </div>
          {/* <input
            className="mr-2 h-3.5 w-8 appearance-none rounded-[0.4375rem] bg-neutral-300 before:pointer-events-none before:absolute before:h-3.5 before:w-3.5 before:rounded-full before:bg-transparent before:content-[''] after:absolute after:z-[2] after:-mt-[0.1875rem] after:h-5 after:w-5 after:rounded-full after:border-none after:bg-neutral-100 after:shadow-[0_0px_3px_0_rgb(0_0_0_/_7%),_0_2px_2px_0_rgb(0_0_0_/_4%)] after:transition-[background-color_0.2s,transform_0.2s] after:content-[''] checked:bg-primary checked:after:absolute checked:after:z-[2] checked:after:-mt-[3px] checked:after:ml-[1.0625rem] checked:after:h-5 checked:after:w-5 checked:after:rounded-full checked:after:border-none checked:after:bg-primary checked:after:shadow-[0_3px_1px_-2px_rgba(0,0,0,0.2),_0_2px_2px_0_rgba(0,0,0,0.14),_0_1px_5px_0_rgba(0,0,0,0.12)] checked:after:transition-[background-color_0.2s,transform_0.2s] checked:after:content-[''] hover:cursor-pointer focus:outline-none focus:ring-0 focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[3px_-1px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] focus:after:absolute focus:after:z-[1] focus:after:block focus:after:h-5 focus:after:w-5 focus:after:rounded-full focus:after:content-[''] checked:focus:border-primary checked:focus:bg-primary checked:focus:before:ml-[1.0625rem] checked:focus:before:scale-100 checked:focus:before:shadow-[3px_-1px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] dark:bg-neutral-600 dark:after:bg-neutral-400 dark:checked:bg-primary dark:checked:after:bg-primary dark:focus:before:shadow-[3px_-1px_0px_13px_rgba(255,255,255,0.4)] dark:checked:focus:before:shadow-[3px_-1px_0px_13px_#3b71ca]"
            type="checkbox"
            role="switch"
            title="Enter duration"
            id="flexSwitchCheckDefault"
            onChange={() => {
              handleSetNewDuration();
              setEnterDuration(!enterDuration);
            }}
          /> */}
          {/* {!enterDuration ? (
            <CalendarInput
              placeholder={!enterDuration ? "End Date" : "0"}
              value={endDate}
              action={(e: any) => {
                setEndDate(e);
              }}
              minDate={startDate || new Date()}
              disabled={false}
            />
          ) : ( */}
            <PrimaryInput
              inputType="number"
              placeholder="duration"
              value={duration}
              disabled={startDate === ""}
              action={(e: any) => {
                setDuration(e);
                handleSetNewDuration(e);
              }}
            />
          {/* )} */}
        </div>
      </div>
      {endDate !== "" && startDate !== "" && duration && (
        <h1 className="text-[12px] pt-4 text-blue-500">
          Note: The billing of your campaign will start from {new Date(startDate).toLocaleDateString()} to {new Date(endDate).toLocaleDateString()}...
        </h1> 
      )}

      <div className="flex py-4">
        {!loadingAddDetails && (
          <PrimaryButton
            disabled={loadingAddDetails}
            rounded="rounded-[6px]"
            title="Continue"
            action={() => {
              if (validateForm()) {
                saveCampaignDetailsOnLocalStorage();
              }
            }}
          />
        )}
      </div>
    </div>
  );
};

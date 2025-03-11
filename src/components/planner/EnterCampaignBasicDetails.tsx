import { useCallback, useEffect, useState } from "react";
import { PrimaryInput } from "../atoms/PrimaryInput";
import { useNavigate } from "react-router-dom";
import { CalendarInput } from "../atoms/CalendarInput";
import { getEndDateFromStartDateAndDuration } from "../../utils/dateAndTimeUtils";
import { getDataFromLocalStorage } from "../../utils/localStorageUtils";
import { message, Tooltip } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { addDetailsToCreateCampaign } from "../../actions/campaignAction";
import { FULL_CAMPAIGN_PLAN } from "../../constants/localStorageConstants";
import {
  addClientAgencyDetails,
  getAllClientAgencyNames,
} from "../../actions/clientAgencyAction";
import { SuggestionInput } from "../../components/atoms/SuggestionInput";
import { DropdownInput } from "../../components/atoms/DropdownInput";

interface EnterCampaignBasicDetailsProps {
  setCurrentStep: (step: number) => void;
  step: number;
  userInfo?: any;
  campaignId?: any;
  campaignType: string;
  path: string;
}
const allIndex = [1, 2, 3, 6].map((data: any) => {
  return {
    label: data,
    value: data,
  };
});
export const EnterCampaignBasicDetails = ({
  setCurrentStep,
  step,
  userInfo,
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

  const [sov, setSov] = useState<number>(
    getDataFromLocalStorage(FULL_CAMPAIGN_PLAN)?.[campaignId]?.sov || 1
  );

  const detailsToCreateCampaignAdd = useSelector(
    (state: any) => state.detailsToCreateCampaignAdd
  );
  const {
    loading: loadingAddDetails,
    error: errorAddDetails,
    success: successAddDetails,
    data: addDetails,
  } = detailsToCreateCampaignAdd;

  const allClientAgencyNamesListGet = useSelector(
    (state: any) => state.allClientAgencyNamesListGet
  );
  const {
    loading: loadingClientAgencyNames,
    error: errorClientAgencyNames,
    data: clientAgencyNamesList,
  } = allClientAgencyNamesListGet;

  const handleAddNewClient = (value: string) => {
    if (
      !clientAgencyNamesList?.find(
        (data: any) => data.clientAgencyName === value
      )
    ) {
      dispatch(
        addClientAgencyDetails({ clientAgencyName: value?.toUpperCase() })
      );
    }
  };

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

  const updateEndDateBasedOnDuration = useCallback(
    (newDuration: number) => {
      if (startDate) {
        const endDate1 = getEndDateFromStartDateAndDuration(
          startDate,
          newDuration
        );
        setEndDate(new Date(endDate1).toISOString());
      } else {
        message.error("Please enter a start date first");
      }
    },
    [startDate]
  );

  const saveCampaignDetailsOnLocalStorage = useCallback(() => {
    updateEndDateBasedOnDuration(duration);
    handleAddNewClient(clientName);
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
        sov: sov,
      })
    );
  }, [
    updateEndDateBasedOnDuration,
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
    sov,
  ]);

  useEffect(() => {
    if (errorAddDetails) {
      message.error(errorAddDetails);
    }

    if (successAddDetails) {
      navigate(`/${path}/${addDetails?._id}`);
      setCurrentStep(step + 1);
    }
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

  useEffect(() => {
    dispatch(getAllClientAgencyNames());
  }, [dispatch]);

  const handleStartDateChange = (value: any) => {
    if (new Date() > new Date(value)) {
      message.error("start date must be greater then today data and time!");
      setStartDate("");
    } else setStartDate(value);
  };

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
            <Tooltip title="Enter a unique name for your campaign">
              <i className="fi fi-rs-info pr-1 text-[10px] text-gray-400 flex justify-center items-center"></i>
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
            <Tooltip title="Enter campaign's brand name">
              <i className="fi fi-rs-info pr-1 text-[10px] text-gray-400 flex justify-center items-center"></i>
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
          <div className="block flex justify-between gap-2 items-center mb-2">
            <label className="block text-secondaryText text-[14px]">
              Agency / Client
            </label>
            <Tooltip title="Enter Agency's name or client's name who is managing the campaign">
              <i className="fi fi-rs-info pr-1 text-[10px] text-gray-400 flex justify-center items-center"></i>
            </Tooltip>
          </div>
          <SuggestionInput
            suggestions={clientAgencyNamesList?.map(
              (value: any) => value.clientAgencyName
            )}
            placeholder="Client/Agency Name"
            onChange={(value: string) => setClientName(value?.toUpperCase())}
            value={clientName || ""}
          />
        </div>
        <div className="col-span-1 py-1">
          <div className="block flex justify-between justify-betweengap-2 items-center mb-2">
            <label className="block text-secondaryText text-[14px]">
              Industry Type
            </label>
            <Tooltip title="Enter industry name your brand belongs to">
              <i className="fi fi-rs-info pr-1 text-[10px] text-gray-400 flex justify-center items-center"></i>
            </Tooltip>
          </div>
          <PrimaryInput
            inputType="text"
            placeholder="Industry Type"
            value={industry}
            action={setIndustry}
          />
        </div>
      </div>
      <div className="grid grid-cols-3 gap-8 pt-2">
        <div className="col-span-1 py-1">
          <div className="block flex justify-between gap-2 items-center mb-2">
            <label className="block text-secondaryText text-[14px]">
              Start Date
            </label>
            <Tooltip title="Select Date from when the campaign is to be started">
              <i className="fi fi-rs-info pr-1 text-[10px] text-gray-400 flex justify-center items-center"></i>
            </Tooltip>
          </div>
          <CalendarInput
            placeholder="Start Date"
            value={startDate}
            action={handleStartDateChange}
            disabled={false}
            minDate={new Date()}
          />
        </div>
        <div className="col-span-1 py-1">
          <div className="block flex justify-between gap-2 items-center mb-2">
            <label className="block text-secondaryText text-[14px]">
              Duration (Days)
            </label>
            <Tooltip title="Enter total duration of campaigns in days">
              <i className="fi fi-rs-info pr-1 text-[10px] text-gray-400 flex justify-center items-center"></i>
            </Tooltip>
          </div>
          <PrimaryInput
            inputType="number"
            placeholder="30"
            value={duration}
            disabled={startDate === ""}
            action={(e: any) => {
              setDuration(e);
              updateEndDateBasedOnDuration(e);
            }}
          />
        </div>
      </div>
      <div className="grid grid-cols-3 gap-8 pt-2">
        <div className="col-span-1 py-1">
          <div className="block flex justify-between gap-2 items-center mb-2">
            <label className="block text-secondaryText text-[14px]">SOV</label>
            <Tooltip title="How many times you want to play creatives in one loop">
              <i className="fi fi-rs-info pr-1 text-[10px] text-gray-400 flex justify-center items-center"></i>
            </Tooltip>
          </div>
          <DropdownInput
            options={allIndex}
            selectedOptions={sov}
            placeHolder="Select SOV"
            setSelectedOption={setSov}
          />
        </div>
      </div>
      {endDate !== "" && startDate !== "" && duration && (
        <h1 className="text-[12px] pt-4 text-[#129BFF]">
          Note: Your campaign will be billed from{" "}
          {new Date(startDate).toLocaleDateString()} to{" "}
          {new Date(
            getEndDateFromStartDateAndDuration(startDate, duration)
          ).toLocaleDateString()}
          ...
        </h1>
      )}

      <div className="flex py-4">
        <button
          type="submit"
          className="border border-1 py-2 px-8 text-[16px]  font-semibold rounded-md bg-[#00A0FA] text-[#FFFFFF] hover:bg-[#D7D7D7] hover:text-black truncate font-custom h-12 w-48"
          title="Save and go next"
          onClick={() => {
            if (validateForm()) {
              saveCampaignDetailsOnLocalStorage();
            }
          }}
          disabled={loadingAddDetails}
        >
          {loadingAddDetails ? "Please Wait...." : "Continue"}
        </button>
      </div>
    </div>
  );
};

import { useCallback, useEffect, useState } from "react";
import { PrimaryInput } from "../../components/atoms/PrimaryInput";
import { useLocation, useNavigate } from "react-router-dom";
import { CalendarInput } from "../../components/atoms/CalendarInput";
import {
  getCampaignDurationFromStartAndEndDate,
  getEndDateFromStartDateAndDuration,
} from "../../utils/dateAndTimeUtils";
import { message, Tooltip } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { addDetailsToCreateCampaign } from "../../actions/campaignAction";
import {
  addClientAgencyDetails,
  getAllClientAgencyNames,
} from "../../actions/clientAgencyAction";
import { SuggestionInput } from "../../components/atoms/SuggestionInput";
import { DropdownInput } from "../../components/atoms/DropdownInput";
import { ADD_DETAILS_TO_CREATE_CAMPAIGN_RESET } from "../../constants/campaignConstants";

interface EnterCampaignBasicDetailsProps {
  setCurrentStep: (step: number) => void;
  step: number;
  userInfo?: any;
  campaignId?: any;
  path: string;
  campaignDetails?: any;
  campaignType?: any;
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
  campaignDetails,
  campaignType,
  path,
}: EnterCampaignBasicDetailsProps) => {
  const navigate = useNavigate();
  const dispatch = useDispatch<any>();
  const { pathname } = useLocation();
  
  const [campaignName, setCampaignName] = useState<any>(campaignDetails?.name || "");
  const [brandName, setBrandName] = useState<any>(campaignDetails?.brandName || "");
  const [clientName, setClientName] = useState<any>(campaignDetails?.clientName || "");
  const [industry, setIndustry] = useState<any>(campaignDetails?.industry || "");
  const [startDate, setStartDate] = useState<any>(() => {
    const localDate = new Date(
      campaignDetails?.startDate
    );
    const utcDate = new Date(
      localDate.getTime() - localDate.getTimezoneOffset() * 60000
    );

    return campaignDetails
      ? utcDate.toISOString().slice(0, 16)
      : "";
  });
  const [endDate, setEndDate] = useState<any>(() => {
    const localDate = new Date(
      campaignDetails?.endDate
    );
    const utcDate = new Date(
      localDate.getTime() - localDate.getTimezoneOffset() * 60000
    );

    return campaignDetails
      ? utcDate.toISOString().slice(0, 16)
      : "";
  });
  const [duration, setDuration] = useState<any>(campaignDetails?.duration || "");
  const [sov, setSov] = useState<number>(campaignDetails?.sov || 1);

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
    data: clientAgencyNamesList,
  } = allClientAgencyNamesListGet;

  const handleAddNewClient = useCallback(
    (value: string) => {
      if (!clientAgencyNamesList?.find((data: any) => data.clientAgencyName === value)) {
        dispatch(
          addClientAgencyDetails({ clientAgencyName: value?.toUpperCase() })
        );
      }
    },
    [dispatch, clientAgencyNamesList]
  );

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

        // Convert to YYYY-MM-DDTHH:mm format in local timezone
        const formattedEndDate = new Date(endDate1)
          .toLocaleString("en-CA", { timeZone: "Asia/Kolkata", hour12: false })
          .replace(", ", "T")
          .slice(0, 16); // Keep only "YYYY-MM-DDTHH:mm"

        setEndDate(formattedEndDate);
      } else {
        message.error("Please enter a start date first");
      }
    },
    [startDate]
  );

  const saveCampaignDetailsOnLocalStorage = useCallback(() => {
    if (!pathname.split("/").includes("view")) {
      updateEndDateBasedOnDuration(duration);
      handleAddNewClient(clientName);
      dispatch(
        addDetailsToCreateCampaign({
          id: campaignId,
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
    } else {
      setCurrentStep(step + 1);
    }
  }, [
    step,
    setCurrentStep,
    pathname,
    updateEndDateBasedOnDuration,
    duration,
    handleAddNewClient,
    clientName,
    dispatch,
    campaignId,
    campaignName,
    brandName,
    campaignType,
    industry,
    startDate,
    endDate,
    userInfo,
    sov,
  ]);

  useEffect(() => {
    if (errorAddDetails) {
      message.error(errorAddDetails);
    }

    if (successAddDetails && !pathname.split("/").includes("view") && !pathname.split("/").includes("edit")) {

      navigate(`/${path}/${addDetails?._id}`);
      setCurrentStep(step + 1);
      dispatch({
        type: ADD_DETAILS_TO_CREATE_CAMPAIGN_RESET,
      });  
    }

  }, [addDetails?._id, dispatch, errorAddDetails, navigate, path, pathname, setCurrentStep, step, successAddDetails]);

  useEffect(() => {
    dispatch(getAllClientAgencyNames());
  }, [dispatch]);

  useEffect(() => {
    if (campaignDetails) {
      setCampaignName(campaignDetails?.name);
      setBrandName(campaignDetails?.brandName);
      setClientName(campaignDetails?.clientName);
      setIndustry(campaignDetails?.industry);
      setStartDate(() => {
        const localDate = new Date(
          campaignDetails?.startDate
        );
        const utcDate = new Date(
          localDate.getTime() - localDate.getTimezoneOffset() * 60000
        );
    
        return campaignDetails
          ? utcDate.toISOString().slice(0, 16)
          : "";
      });
      setEndDate(() => {
        const localDate = new Date(
          campaignDetails?.endDate
        );
        const utcDate = new Date(
          localDate.getTime() - localDate.getTimezoneOffset() * 60000
        );
    
        return campaignDetails
          ? utcDate.toISOString().slice(0, 16)
          : "";
      });
      setSov(campaignDetails?.sov);
      setDuration(campaignDetails?.duration);
    }
  },[campaignDetails]);

  const handleDateChange = (value: any, type: any) => {
    if (type === "start") {
      if (new Date() > new Date(value)) {
        message.error("Start date must be greater than today!");
        setStartDate("");
      } else {
        setStartDate(value);
        if (duration) {
          const endDate1 = getEndDateFromStartDateAndDuration(value, duration);
          setEndDate(new Date(endDate1).toISOString());
        }
      }
    }

    if (type === "end") {
      if (new Date(startDate) > new Date(value)) {
        message.error("End date must be greater than start date!");
        setEndDate("");
      } else {
        setEndDate(value);
        const calculatedDuration = getCampaignDurationFromStartAndEndDate(
          startDate,
          value
        );
        setDuration(calculatedDuration);
      }
    }
  };


  return (
    <div className="w-full">
      <div className="pt-8">
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
            <label className="text-secondaryText text-[14px] truncate">
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
            <label className="block text-secondaryText text-[14px] truncate">
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
            <label className="block text-secondaryText text-[14px] truncate">
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
            <label className="block text-secondaryText text-[14px] truncate">
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
            <label className="block text-secondaryText text-[14px] truncate">
              Start Date
            </label>
            <Tooltip title="Select Date from when the campaign is to be started">
              <i className="fi fi-rs-info pr-1 text-[10px] text-gray-400 flex justify-center items-center"></i>
            </Tooltip>
          </div>
          <CalendarInput
            placeholder="Start Date"
            value={startDate}
            action={(e: any) => handleDateChange(e, "start")}
            disabled={false}
            minDate={new Date()}
          />
        </div>

        <div className="col-span-1 py-1">
          <div className="block flex justify-between gap-2 items-center mb-2">
            <label className="block text-secondaryText text-[14px] truncate">
              End Date
            </label>
            <Tooltip title="Select Date from when the campaign is to be started">
              <i className="fi fi-rs-info pr-1 text-[10px] text-gray-400 flex justify-center items-center"></i>
            </Tooltip>
          </div>
          <CalendarInput
            placeholder="End Date"
            value={endDate}
            action={(e: any) => {
              if (startDate === "") {
                message.error("Please select start date first!");
                return;
              }
              handleDateChange(e, "end");
            }}
            disabled={false}
            minDate={new Date()}
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
            selectedOption={sov}
            placeHolder="Select SOV"
            setSelectedOption={setSov}
            height="h-[48px]"
          />
        </div>
        <div className="col-span-1 py-1">
          <div className="block flex justify-between gap-2 items-center mb-2">
            <label className="block text-secondaryText text-[14px] truncate">
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
            // disabled={startDate === ""}
            action={(value: any) => {
              if (startDate === "") {
                message.error("Please select start date first!");
                return;
              }
              setDuration(value);
              updateEndDateBasedOnDuration(value);
            }}
          />
        </div>
      </div>

      <div className="flex py-8">
        <button
          type="submit"
          className="border border-1 py-2 px-8 text-[16px] font-semibold rounded-md bg-[#00A0FA] text-[#FFFFFF] hover:bg-[#D7D7D7] hover:text-black truncate font-custom h-12 w-48"
          title="Save and go next"
          onClick={() => {
            if (validateForm()) {
              saveCampaignDetailsOnLocalStorage();
            }
          }}
          disabled={loadingAddDetails}
        >
          {loadingAddDetails ? "Please Wait...." : !campaignId ? "Create" : "Continue"}
        </button>
      </div>
    </div>
  );
};

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
import {
  ADD_DETAILS_TO_CREATE_CAMPAIGN_RESET,
  ORDERED_SOV,
} from "../../constants/campaignConstants";
import { getDataFromLocalStorage } from "../../utils/localStorageUtils";
import { ALL_BRAND_LIST } from "../../constants/localStorageConstants";
import { getAllBrandAndNetworkAction } from "../../actions/creativeAction";
import ButtonInput from "../../components/atoms/ButtonInput";
import { CAMPAIGN_CREATION_ADD_DETAILS_TO_CREATE_CAMPAIGN_PLANNING_PAGE } from "../../constants/userConstants";
import { getAllPlannerIdsAndEmail } from "../../actions/screenAction";
import { format } from "date-fns";
import { monitoringTypes } from "../../constants/helperConstants";

interface EnterCampaignBasicDetailsProps {
  setCurrentStep: (step: number) => void;
  step: number;
  userInfo?: any;
  campaignId?: any;
  path: string;
  campaignDetails?: any;
  campaignType?: any;
}

interface MonitoringTypeData {
  dates: string[];
  monitoringType: any[];
}

interface InitialData {
  startDate: MonitoringTypeData;
  midDate: MonitoringTypeData;
  endDate: MonitoringTypeData;
}

const allIndex = [
  1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18,
].map((value) => {
  return {
    label: value.toString(),
    value: value,
  };
});

const allIndexOrderedSov = [1, 2, 3, 6, 18].map((value) => {
  return {
    label: value.toString(),
    value: value,
  };
});
// ["Select SOV Type", "ordered", "continuous", "random"];
const sovTypeOptions = [
  {
    label: "Ordered",
    value: "ordered",
  },
  {
    label: "Continuous",
    value: "continuous",
  },
  {
    label: "Random",
    value: "random",
  },
];
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

  const [campaignName, setCampaignName] = useState<any>(
    campaignDetails?.name || ""
  );
  const [brandName, setBrandName] = useState<any>(
    campaignDetails?.brandName || ""
  );
  const [clientName, setClientName] = useState<any>(
    campaignDetails?.clientName || ""
  );
  const [industry, setIndustry] = useState<any>(
    campaignDetails?.industry || ""
  );

  const [initialData, setInitialData] = useState<InitialData>({
    startDate: {
      dates: [format(new Date(), "yyyy-MM-dd")],
      monitoringType: monitoringTypes?.map((type: any) => type.value),
    },
    endDate: {
      dates: [format(new Date(), "yyyy-MM-dd")],
      monitoringType: monitoringTypes?.map((type: any) => type.value),
    },
    midDate: {
      dates: [],
      monitoringType: [],
    },
  });

  console.log("initialData : ", initialData);

  const [startDate, setStartDate] = useState<any>(() => {
    const localDate = new Date(campaignDetails?.startDate);
    const utcDate = new Date(
      localDate.getTime() - localDate.getTimezoneOffset() * 60000
    );

    return campaignDetails ? utcDate.toISOString().slice(0, 16) : "";
  });
  const [endDate, setEndDate] = useState<any>(() => {
    const localDate = new Date(campaignDetails?.endDate);
    const utcDate = new Date(
      localDate.getTime() - localDate.getTimezoneOffset() * 60000
    );

    return campaignDetails ? utcDate.toISOString().slice(0, 16) : "";
  });
  const [duration, setDuration] = useState<any>(
    campaignDetails?.duration || ""
  );
  const [sov, setSov] = useState<number>(campaignDetails?.sov || 1);
  const [sovType, setSovType] = useState<string>(
    campaignDetails?.sovType || "continuous"
  );
  const [managerId, setManagerId] = useState<string>(
    campaignDetails?.campaignManagerId || ""
  );
  const [managerEmail, setManagerEmail] = useState<string>(
    campaignDetails?.campaignManagerEmail || ""
  );
  const [allPlannerData, setAllPlannerData] = useState<any>([]);

  const [error, setError] = useState<string>("");

  const detailsToCreateCampaignAdd = useSelector(
    (state: any) => state.detailsToCreateCampaignAdd
  );
  const {
    loading: loadingAddDetails,
    error: errorAddDetails,
    success: successAddDetails,
    data: addDetails,
  } = detailsToCreateCampaignAdd;

  const allPlannerIdsAndEmail = useSelector(
    (state: any) => state.allPlannerIdsAndEmail
  );
  const {
    loading: loadingAllPlanner,
    error: errorAllPlanner,
    success: successAllPlanner,
    data: AllPlanner,
  } = allPlannerIdsAndEmail;

  const allClientAgencyNamesListGet = useSelector(
    (state: any) => state.allClientAgencyNamesListGet
  );
  const { data: clientAgencyNamesList } = allClientAgencyNamesListGet;

  const handleAddNewClient = useCallback(
    (value: string) => {
      if (
        !clientAgencyNamesList?.find(
          (data: any) => data.clientAgencyName === value
        )
      ) {
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
    } else if (sovType === "") {
      message.error("Please select sov type ");
      return false;
    } else if (managerId === "") {
      message.error("Please select manager ");
      return false;
    } else if (!initialData["midDate"].dates[0]) {
      message.error("Please select mid date monitoring ");
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
        setInitialData((pre: InitialData) => {
          return {
            ...pre,
            endDate: {
              dates: [format(new Date(formattedEndDate), "yyyy-MM-dd")],
              monitoringType: monitoringTypes.map((type: any) => type.value),
            },
          };
        });
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
          event: CAMPAIGN_CREATION_ADD_DETAILS_TO_CREATE_CAMPAIGN_PLANNING_PAGE,
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
          campaignManagerId: managerId,
          campaignManagerEmail: managerEmail,
          sov: sov,
          sovType,
          monitoringSelection: initialData,
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
    initialData,
    managerId,
    managerEmail,
  ]);

  useEffect(() => {
    if (errorAddDetails) {
      message.error(errorAddDetails);
    }

    if (
      successAddDetails &&
      !pathname.split("/").includes("view") &&
      !pathname.split("/").includes("edit")
    ) {
      navigate(`/${path}/${addDetails?._id}`);
      setCurrentStep(step + 1);
      dispatch({
        type: ADD_DETAILS_TO_CREATE_CAMPAIGN_RESET,
      });
    }
  }, [
    addDetails?._id,
    dispatch,
    errorAddDetails,
    navigate,
    path,
    pathname,
    setCurrentStep,
    step,
    successAddDetails,
  ]);

  useEffect(() => {
    if (successAllPlanner) {
      setAllPlannerData(AllPlanner);
    }
  }, [successAllPlanner]);

  useEffect(() => {
    dispatch(getAllClientAgencyNames());
    dispatch(getAllBrandAndNetworkAction());
    dispatch(getAllPlannerIdsAndEmail({ id: userInfo?._id }));
  }, []);

  useEffect(() => {
    if (campaignDetails) {
      setCampaignName(campaignDetails?.name);
      setBrandName(campaignDetails?.brandName);
      setClientName(campaignDetails?.clientName);
      setIndustry(campaignDetails?.industry);
      setStartDate(() => {
        const localDate = new Date(campaignDetails?.startDate);
        const utcDate = new Date(
          localDate.getTime() - localDate.getTimezoneOffset() * 60000
        );

        return campaignDetails ? utcDate.toISOString().slice(0, 16) : "";
      });
      setEndDate(() => {
        const localDate = new Date(campaignDetails?.endDate);
        const utcDate = new Date(
          localDate.getTime() - localDate.getTimezoneOffset() * 60000
        );

        return campaignDetails ? utcDate.toISOString().slice(0, 16) : "";
      });
      setSov(campaignDetails?.sov);
      setSovType(campaignDetails?.sovType);
      setManagerId(campaignDetails?.campaignManagerId.toString());
      setManagerEmail(campaignDetails?.campaignManagerEmail);
      setDuration(campaignDetails?.duration);
      setInitialData(campaignDetails?.monitoringSelection);
    }
  }, [campaignDetails]);

  const handleDateChange = (value: any, type: any) => {
    if (type === "start") {
      if (new Date() > new Date(value)) {
        message.error("Start date must be greater than today!");
        setStartDate("");
      } else {
        setStartDate(value);
        setInitialData((pre: InitialData) => {
          return {
            ...pre,
            startDate: {
              dates: [format(new Date(value), "yyyy-MM-dd")],
              monitoringType: monitoringTypes.map((type: any) => type.value),
            },
          };
        });
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
        setInitialData((pre: InitialData) => {
          return {
            ...pre,
            endDate: {
              dates: [format(new Date(value), "yyyy-MM-dd")],
              monitoringType: monitoringTypes.map((type: any) => type.value),
            },
          };
        });
        setDuration(calculatedDuration);
      }
    }
  };

  const handleDateInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInitialData((pre: InitialData) => {
      return {
        ...pre,
        midDate: {
          dates: [format(new Date(e.target.value), "yyyy-MM-dd")],
          monitoringType: monitoringTypes.map((type: any) => type.value),
        },
      };
    });
  };

  return (
    <div className="w-full h-[76vh] overflow-y-auto  scrollbar-minimal px-1">
      <div className="pt-8">
        <h1 className="text-[24px] text-primaryText font-semibold">
          Add Basic Details
        </h1>
        <p className="text-[14px] text-secondaryText">
          Enter your basic details for the campaigns to proceed further
        </p>
      </div>
      {/* {error && (
        <div className="bg-[#FF3F33] text-[#FFFFFF]  text-[16px] font-semibold p-4 flex justify-between mt-2">
          <h1>{error}</h1>
          <i className="fi fi-br-circle-xmark flex items-center"></i>
        </div>
      )} */}
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

          <SuggestionInput
            suggestions={getDataFromLocalStorage(ALL_BRAND_LIST)}
            onChange={(value: string) =>
              setBrandName(
                String(value ?? "")
                  .toUpperCase()
                  .trim()
              )
            }
            value={brandName || ""}
            placeholder="Brand Name"
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
            <label className="block text-secondaryText text-[14px]">
              Select Manager
            </label>
            <Tooltip title="How many times you want to play creatives in one loop">
              <i className="fi fi-rs-info pr-1 text-[10px] text-gray-400 flex justify-center items-center"></i>
            </Tooltip>
          </div>
          <DropdownInput
            options={allPlannerData?.map((data: any) => {
              return {
                label: `${data.name}`,
                value: data._id.toString(),
              };
            })}
            selectedOption={managerId}
            placeHolder="Select Manager"
            setSelectedOption={(value: any) => {
              setManagerId(value);
              setManagerEmail(
                allPlannerData?.find((data: any) => data._id === value)
                  ?.email || ""
              );
            }}
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

      <div className="grid grid-cols-3 gap-8 pt-2">
        <div className="col-span-1 py-1">
          <div className="block flex justify-between gap-2 items-center mb-2">
            <label className="block text-secondaryText text-[14px]">
              SOV Type
            </label>
            <Tooltip title="How many times you want to play creatives in one loop">
              <i className="fi fi-rs-info pr-1 text-[10px] text-gray-400 flex justify-center items-center"></i>
            </Tooltip>
          </div>
          <DropdownInput
            options={sovTypeOptions}
            selectedOption={sovType}
            placeHolder="Select SOV Type"
            setSelectedOption={setSovType}
            height="h-[48px]"
          />
        </div>
        <div className="col-span-1 py-1">
          <div className="block flex justify-between gap-2 items-center mb-2">
            <label className="block text-secondaryText text-[14px]">SOV</label>
            <Tooltip title="How many times you want to play creatives in one loop">
              <i className="fi fi-rs-info pr-1 text-[10px] text-gray-400 flex justify-center items-center"></i>
            </Tooltip>
          </div>
          <DropdownInput
            options={sovType == ORDERED_SOV ? allIndexOrderedSov : allIndex}
            selectedOption={sov}
            placeHolder="Select SOV"
            setSelectedOption={setSov}
            height="h-[48px]"
          />
        </div>
      </div>

      <div className="grid grid-cols-3 gap-8 pt-2">
        <div className="col-span-1 py-1">
          <div className="block flex justify-between gap-2 items-center mb-2">
            <label className="block text-secondaryText text-[14px]">
              Select Mid Date Monitoring Date
            </label>
            <Tooltip title="Monitoring start and end data will always be your campaign start and end date ">
              <i className="fi fi-rs-info pr-1 text-[10px] text-gray-400 flex justify-center items-center"></i>
            </Tooltip>
          </div>
          <input
            title="date"
            type="date"
            className="h-[48px] w-full border px-4 rounded-md"
            value={initialData["midDate"].dates[0]}
            onChange={handleDateInputChange}
            min={initialData["startDate"].dates[0]}
            max={initialData["endDate"].dates[0]}
          />
        </div>
      </div>

      <div className="flex py-8">
        <ButtonInput
          onClick={() => {
            if (validateForm()) {
              saveCampaignDetailsOnLocalStorage();
            }
          }}
          variant="primary"
          loading={loadingAddDetails}
        >
          {!campaignId ? "Create" : "Continue"}
        </ButtonInput>
      </div>
    </div>
  );
};

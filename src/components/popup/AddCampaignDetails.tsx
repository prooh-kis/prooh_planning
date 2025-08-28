import { PrimaryInput } from "../atoms/PrimaryInput";
import { message, Modal, Select, Tooltip } from "antd";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import {
  addClientAgencyDetails,
  getAllClientAgencyNames,
} from "../../actions/clientAgencyAction";
import { DropdownInput } from "../../components/atoms/DropdownInput";
import { SuggestionInput } from "../../components/atoms/SuggestionInput";
import { useLocation, useNavigate } from "react-router-dom";
import { ADD_DETAILS_TO_CREATE_CAMPAIGN_RESET } from "../../constants/campaignConstants";
import { getAllPlannerIdsAndEmail } from "../../actions/screenAction";
import { getDataFromLocalStorage } from "../../utils/localStorageUtils";
import { ALL_BRAND_LIST } from "../../constants/localStorageConstants";
import { getMyOrgDetailsAction } from "../../actions/organizationAction";
import { industryTypes } from "../../data/touchpointData";

const allIndex = [1, 2, 3, 6].map((data: any) => {
  return {
    label: data,
    value: data,
  };
});

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

export const AddCampaignDetails = ({
  handleCancel,
  step,
  open,
  userInfo,
  router,
  setCurrentStep,
  campaignDetails,
  campaignDuration = 1,
  handleSaveData,
  selectedSpacialDay,
  startDate,
  endDate,
  duration,
  path,
}: any) => {
  const dispatch = useDispatch<any>();
  const navigate = useNavigate();
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

  const [sov, setSov] = useState<any>(campaignDetails?.sov || 1);
  const [sovType, setSovType] = useState<string>(
    campaignDetails?.sovType || "continuous"
  );
  const [managerId, setManagerId] = useState<string>(
    campaignDetails?.campaignManagerId || ""
  );
  const [managerEmail, setManagerEmail] = useState<string>(
    campaignDetails?.campaignManagerEmail || ""
  );
  const [coordinatorId, setCoordinatorId] = useState<string>(
    campaignDetails?.campaignCoordinatorId || ""
  );
  const [coordinatorEmail, setCoordinatorEmail] = useState<string>(
    campaignDetails?.campaignCoordinatorEmail || ""
  );

  const allClientAgencyNamesListGet = useSelector(
    (state: any) => state.allClientAgencyNamesListGet
  );
  const {
    loading: loadingClientAgencyNames,
    error: errorClientAgencyNames,
    data: clientAgencyNamesList,
  } = allClientAgencyNamesListGet;

  const allPlannerIdsAndEmail = useSelector(
    (state: any) => state.allPlannerIdsAndEmail
  );
  const {
    loading: loadingAllPlanner,
    error: errorAllPlanner,
    success: successAllPlanner,
    data: allPlannerData,
  } = allPlannerIdsAndEmail;

  const detailsToCreateCampaignAdd = useSelector(
    (state: any) => state.detailsToCreateCampaignAdd
  );
  const {
    loading: loadingAddDetails,
    error: errorAddDetails,
    success: successAddDetails,
    data: addDetails,
  } = detailsToCreateCampaignAdd;

  const {
    loading: loadingMyOrg,
    error: errorMyOrg,
    data: myOrg,
  } = useSelector((state: any) => state.myOrgDetailsGet);

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

  const [enterDuration, setEnterDuration] = useState<any>(false);

  const validateForm = () => {
    if (campaignName.length === 0) {
      message.error("Please enter campaign name");
      return false;
    } else if (brandName.length === 0) {
      message.error("Please enter brand name");
      return false;
    } else if (industry.length === 0) {
      message.error("Please enter industry name");
      return false;
    } else {
      return true;
    }
  };

  const saveCampaignDetailsOnLocalStorage = () => {
    if (!pathname.split("/").includes("view")) {
      if (validateForm()) {
        handleAddNewClient(clientName);
        handleSaveData({
          pageName: "Basic Details Page",
          name: campaignName,
          brandName: brandName,
          campaignType: router,
          clientName: clientName,
          industry: industry,
          startDate: startDate,
          endDate: endDate,
          duration: duration,
          campaignPlannerId: userInfo?._id,
          campaignPlannerName: userInfo?.name,
          campaignPlannerEmail: userInfo?.email,
          campaignManagerId: managerId,
          campaignManagerEmail: managerEmail,
          campaignCoordinatorId: coordinatorId,
          campaignCoordinatorEmail: coordinatorEmail,
          sov: sov,
          sovType,
        });
      }
    } else {
      setCurrentStep(2);
    }
  };

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
    dispatch(getAllClientAgencyNames());
    dispatch(getAllPlannerIdsAndEmail({ id: userInfo?._id }));
    dispatch(getMyOrgDetailsAction({ id: userInfo?._id }));
  }, [dispatch, userInfo]);

  useEffect(() => {
    if (campaignDetails) {
      setCampaignName(campaignDetails?.name);
      setBrandName(campaignDetails?.brandName);
      setClientName(campaignDetails?.clientName);
      setIndustry(campaignDetails?.industry);
      setSov(campaignDetails?.sov);
      setCoordinatorEmail(campaignDetails?.campaignCoordinatorEmail);
      setManagerEmail(campaignDetails?.campaignManagerEmail);
      setCoordinatorId(campaignDetails?.campaignCoordinatorId);
      setManagerId(campaignDetails?.campaignManagerId);
    }
  }, [campaignDetails]);

  return (
    <Modal
      closable={true}
      open={open}
      onCancel={handleCancel}
      footer={[]}
      width={800}
      maskClosable={false}
    >
      <div className="">
        <h1 className="text-[24px] font-semibold">Add Basic Details</h1>
        <h1 className="text-[14px] text-[#8D8D8D]">
          Topical Day Selected - {selectedSpacialDay}
        </h1>
        <div className="grid grid-cols-2 gap-8 pt-4">
          <div className="col-span-1 py-1">
            <label className="block text-secondaryText text-[14px] mb-2">
              Campaign Name
            </label>
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
            <SuggestionInput
              suggestions={getDataFromLocalStorage(ALL_BRAND_LIST)}
              placeholder="Brand Name"
              onChange={(value) => {
                setBrandName(value?.toUpperCase());
              }}
              value={brandName}
            />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-8 pt-2">
          <div className="col-span-1 py-1">
            <label className="block text-secondaryText text-[14px] mb-2">
              Client / Group
            </label>
            <SuggestionInput
              suggestions={clientAgencyNamesList?.map(
                (value: any) => value.clientAgencyName
              )}
              placeholder="Client/Agency Name"
              onChange={setClientName}
              value={clientName || ""}
            />
          </div>
          <div className="col-span-1 py-1">
            <label className="block text-secondaryText text-[14px] mb-2">
              Industry
            </label>
            <Select
              placeholder="Select Industry"
              size="large"
              showSearch
              optionFilterProp="label"
              onChange={(value) => setIndustry(value)}
              options={industryTypes}
              value={industry}
              className="w-full"
            ></Select>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-8 pt-2">
          <div className="col-span-1 py-1">
            <label className="block text-secondaryText text-[14px] mb-2">
              Start Date
            </label>
            <PrimaryInput
              inputType="text"
              placeholder="Industry"
              value={startDate}
              action={() => {}}
            />
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
                  setEnterDuration(!enterDuration);
                }}
              />
            </div>
            {!enterDuration ? (
              <PrimaryInput
                inputType="text"
                placeholder="Industry"
                value={endDate}
                action={() => {}}
              />
            ) : (
              <PrimaryInput
                inputType="number"
                placeholder="duration"
                value={duration}
                action={() => {}}
              />
            )}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-8 pt-2">
          <div className="col-span-1 py-1">
            <div className="block flex justify-between gap-2 items-center mb-2">
              <label className="block text-secondaryText text-[14px]">
                SOV
              </label>
              <Tooltip title="How many times you want to play creatives in one loop">
                <i className="fi fi-rs-info pr-1 text-[10px] text-gray-400 flex justify-center items-center"></i>
              </Tooltip>
            </div>
            <DropdownInput
              options={allIndex}
              selectedOption={sov}
              placeHolder="Select SOV"
              setSelectedOption={setSov}
            />
          </div>
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
        </div>
        <div className="grid grid-cols-2 gap-8 pt-2">
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
              // options={myOrg?.officialMembers?.filter((mem: any) =>
              //   mem.userId.toString() === myOrg?.officialMembers?.find((member: any) =>
              //     member.userId === userInfo?._id
              //   )?.reportsTo.toString()
              // )?.map((data: any) => ({
              //   label: data?.name,
              //   value: data?.userId,
              // }))}
              options={allPlannerData?.map((data: any) => ({
                label: data?.name,
                value: data?._id,
              }))}
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
              <label className="block text-secondaryText text-[14px]">
                Select Coordinator
              </label>
              <Tooltip title="How many times you want to play creatives in one loop">
                <i className="fi fi-rs-info pr-1 text-[10px] text-gray-400 flex justify-center items-center"></i>
              </Tooltip>
            </div>
            <DropdownInput
              // options={allPlannerData?.filter((planner: any) => myOrg?.officialMembers?.filter((mem: any) => mem.role === "COORDINATOR")?.map((mem: any) => mem?.userId?.toString()).includes(planner._id))?.map((data: any) => {
              //   return {
              //     label: data?.name,
              //     value: data?._id,
              //   };
              // })}
              options={allPlannerData?.map((data: any) => ({
                label: data?.name,
                value: data?._id,
              }))}
              selectedOption={coordinatorId}
              placeHolder="Select Coordinator"
              setSelectedOption={(value: any) => {
                setCoordinatorId(value);
                setCoordinatorEmail(
                  allPlannerData?.find((data: any) => data._id === value)
                    ?.email || ""
                );
              }}
              height="h-[48px]"
            />
          </div>
        </div>

        <button
          type="submit"
          className="px-8 py-2 mt-4 text-[16px] font-semibold bg-[#1297E2] text-[#FFFFFF] rounded-md w-full"
          onClick={saveCampaignDetailsOnLocalStorage}
        >
          Save
        </button>
      </div>
    </Modal>
  );
};

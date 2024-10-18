import { PrimaryInput } from "../../components/atoms/PrimaryInput";
import { getDataFromLocalStorage } from "../../utils/localStorageUtils";
import { message, Modal } from "antd";
import React, { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FULL_CAMPAIGN_PLAN } from "../../constants/localStorageConstants";
import { useSelector } from "react-redux";
import { addDetailsToCreateCampaign } from "../../actions/campaignAction";
import { getNumberOfDaysBetweenTwoDates } from "../../utils/dateAndTimeUtils";
import { CalendarInput } from "../../components/atoms/CalendarInput";

export const AddCampaignDetailForSpacialDay = ({
  handleCancel,
  open,
  setCurrentStep,
  step,
  userInfo,
  pathname,
  campaignId,
}: any) => {
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
      : new Date()?.toISOString()?.slice(0, 16)
  );
  const [endDate, setEndDate] = useState<any>(
    getDataFromLocalStorage(FULL_CAMPAIGN_PLAN)?.[campaignId]
      ? new Date(
          getDataFromLocalStorage(FULL_CAMPAIGN_PLAN)?.[campaignId]?.endDate
        )
          ?.toISOString()
          ?.slice(0, 16)
      : new Date()?.toISOString()?.slice(0, 16)
  );

  const [duration, setDuration] = useState<any>(
    getDataFromLocalStorage(FULL_CAMPAIGN_PLAN)?.[campaignId]?.duration || 2
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
    } else {
      return true;
    }
  };

  const saveCampaignDetailsOnLocalStorage = useCallback(() => {
    dispatch(
      addDetailsToCreateCampaign({
        pageName: "Basic Details Page",
        name: campaignName,
        brandName: brandName,
        campaignType: "Specialdayplan",
        clientName: clientName,
        industry: industry,
        startDate: startDate,
        endDate: endDate,
        duration: duration,
        campaignPlannerId: userInfo?._id,
        campaignPlannerName: userInfo?.name,
        campaignPlannerEmail: userInfo?.email,
        campaignManagerId: userInfo?.primaryUserId,
        campaignManagerEmail: userInfo?.primaryUserEmail,
      })
    );
  }, [
    dispatch,
    campaignName,
    brandName,
    clientName,
    industry,
    startDate,
    endDate,
    duration,
    userInfo?._id,
    userInfo?.name,
    userInfo?.email,
    userInfo?.primaryUserId,
    userInfo?.primaryUserEmail,
  ]);

  const handleSetNewDuration = () => {
    if (startDate && endDate)
      setDuration(getNumberOfDaysBetweenTwoDates(startDate, endDate));
    else message.error("Please enter first start , end Date");
  };

  useEffect(() => {
    if (errorAddDetails) {
      message.error(errorAddDetails);
    }

    if (successAddDetails) {
      setCurrentStep(step + 1);
      navigate(`/specialdayplan/${addDetails?._id}`);
    }
  }, [navigate, successAddDetails, errorAddDetails]);

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
          Topical Day Selected -Vivekananda Jayanti
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
            <label className="block text-secondaryText text-[14px] mb-2">
              Brand Name
            </label>
            <PrimaryInput
              inputType="text"
              placeholder="Brand Name"
              value={brandName}
              action={setBrandName}
            />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-8 pt-2">
          <div className="col-span-1 py-1">
            <label className="block text-secondaryText text-[14px] mb-2">
              Client Name
            </label>
            <PrimaryInput
              inputType="text"
              placeholder="Client Name"
              value={clientName}
              action={setClientName}
            />
          </div>
          <div className="col-span-1 py-1">
            <label className="block text-secondaryText text-[14px] mb-2">
              Industry
            </label>
            <PrimaryInput
              inputType="text"
              placeholder="Industry"
              value={industry}
              action={setIndustry}
            />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-8 pt-2">
          <div className="col-span-1 py-1">
            <label className="block text-secondaryText text-[14px] mb-2">
              Start Date
            </label>
            <CalendarInput
              placeholder="Start Date"
              value={startDate}
              action={setStartDate}
              disabled={true}
            />
          </div>
          <div className="col-span-1 py-1">
            <label className="block text-secondaryText text-[14px] mb-2">
              Duration
            </label>
            <PrimaryInput
              inputType="text"
              placeholder="Industry"
              value={duration}
              action={() => {}}
            />
          </div>
        </div>
        <button
          className="px-8 py-2 mt-4 text-[16px] font-semibold bg-[#1297E2] text-white rounded-md w-full"
          onClick={saveCampaignDetailsOnLocalStorage}
        >
          Save
        </button>
      </div>
    </Modal>
  );
};

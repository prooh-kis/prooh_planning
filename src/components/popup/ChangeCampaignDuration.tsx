import { PrimaryInput } from "../atoms/PrimaryInput";
import { getDataFromLocalStorage } from "../../utils/localStorageUtils";
import { message, Modal, Tooltip } from "antd";
import React, { useCallback, useEffect, useState } from "react";
import { FULL_CAMPAIGN_PLAN } from "../../constants/localStorageConstants";
import {
  getEndDateFromStartDateANdDuration,
  getNumberOfDaysBetweenTwoDates,
} from "../../utils/dateAndTimeUtils";
import { CalendarInput } from "../atoms/CalendarInput";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { changeCampaignDuration } from "../../actions/campaignAction";
import { start } from "repl";
import { CHANGE_CAMPAIGN_DURATION_RESET } from "../../constants/campaignConstants";

export const ChangeCampaignDuration = ({ campaignId }: any) => {
  const dispatch = useDispatch<any>();
  const [open, setOpen] = useState<boolean>(false);

  const [startDate, setStartDate] = useState<any>();
  const [endDate, setEndDate] = useState<any>();
  const [duration, setDuration] = useState<any>(30);
  const [enterDuration, setEnterDuration] = useState<any>(false);

  const handleOpen = useCallback(() => {
    setOpen(true);
  }, [open]);

  const handleClose = useCallback(() => {
    setOpen(false);
  }, [open]);

  const updateCampaignDuration = useSelector(
    (state: any) => state.updateCampaignDuration
  );
  const {
    loading: loadingAddDetails,
    error: errorChangeDuration,
    success: successChangeDuration,
  } = updateCampaignDuration;

  const validateForm = () => {
    if (startDate === "") {
      message.error("Please enter start data ");
      return false;
    } else if (endDate === "") {
      message.error("Please enter endData ");
      return false;
    } else if (!duration) {
      message.error("Please check duration not added ");
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

  const handleSetNewDuration = useCallback(
    (dur: any) => {
      updateEndDateBasedOnDuration(dur);
    },
    [updateEndDateBasedOnDuration]
  );

  const saveCampaignDetailsOnLocalStorage = useCallback(() => {
    handleSetNewDuration(duration);
    if (validateForm()) {
      dispatch(
        changeCampaignDuration({
          id: campaignId,
          startDate: startDate,
          endDate: endDate,
          duration: duration,
        })
      );
    }
  }, [handleSetNewDuration, dispatch, startDate, endDate, duration]);

  useEffect(() => {
    if (errorChangeDuration) {
      message.error(errorChangeDuration);
      dispatch({ type: CHANGE_CAMPAIGN_DURATION_RESET });
    } else if (successChangeDuration) {
      message.success("Campaign duration updated!");
      dispatch({ type: CHANGE_CAMPAIGN_DURATION_RESET });
      handleClose();
      window.location.reload();
    }
  }, [dispatch, successChangeDuration, errorChangeDuration]);

  useEffect(() => {
    const endDate = getDataFromLocalStorage(FULL_CAMPAIGN_PLAN)?.[campaignId]
      ? new Date(
          getDataFromLocalStorage(FULL_CAMPAIGN_PLAN)?.[campaignId]?.endDate
        )
          ?.toISOString()
          ?.slice(0, 16)
      : "";
    const startDate = getDataFromLocalStorage(FULL_CAMPAIGN_PLAN)?.[campaignId]
      ? new Date(
          getDataFromLocalStorage(FULL_CAMPAIGN_PLAN)?.[campaignId]?.startDate
        )
          ?.toISOString()
          ?.slice(0, 16)
      : "";
    const duration =
      getDataFromLocalStorage(FULL_CAMPAIGN_PLAN)?.[campaignId]?.duration || 30;
    setStartDate(startDate?.split("T")[0]);
    setEndDate(endDate);
    setDuration(duration);
  }, [campaignId]);

  return (
    <div>
      <h1
        className="col-span-1 text-[12px] text-right text-red-500 font-normal"
        onClick={handleOpen}
      >
        Edit
      </h1>
      <Modal
        closable={true}
        open={open}
        onCancel={handleClose}
        footer={[]}
        width={500}
        maskClosable={false}
      >
        <div className="">
          <h1 className="text-[24px] font-semibold">
            Change Start and End Date
          </h1>

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
                action={setStartDate}
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
                  handleSetNewDuration(e);
                }}
              />
            </div>
          </div>
          {endDate !== "" && startDate !== "" && duration && (
            <h1 className="text-[12px] pt-4 text-[#129BFF]">
              Note: The billing of your campaign will start from{" "}
              {new Date(startDate).toLocaleDateString()} to{" "}
              {new Date(endDate).toLocaleDateString()}...
            </h1>
          )}
          <button
            className="px-8 py-2 mt-4 text-[16px] font-semibold bg-[#1297E2] text-[#FFFFFF] rounded-md w-full"
            onClick={saveCampaignDetailsOnLocalStorage}
            disabled={loadingAddDetails}
          >
            {loadingAddDetails ? "Updating..." : "Save"}
          </button>
        </div>
      </Modal>
    </div>
  );
};

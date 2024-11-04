import { PrimaryInput } from "../atoms/PrimaryInput";
import { getDataFromLocalStorage } from "../../utils/localStorageUtils";
import { message, Modal } from "antd";
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

  const handleSetNewDuration = useCallback(() => {
    if (!enterDuration) {
      setDuration(getNumberOfDaysBetweenTwoDates(startDate, endDate));
    } else {
      updateEndDateBasedOnDuration(duration);
    }
  }, [
    duration,
    endDate,
    enterDuration,
    startDate,
    updateEndDateBasedOnDuration,
  ]);

  const saveCampaignDetailsOnLocalStorage = useCallback(() => {
    handleSetNewDuration();
    if (validateForm()) {
      dispatch(
        changeCampaignDuration({
          id: campaignId,
          startDate: startDate,
          endDate: endDate,
          duration: getNumberOfDaysBetweenTwoDates(startDate, endDate),
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
  }, [successChangeDuration, errorChangeDuration]);

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
    setStartDate(startDate);
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

          <div className="grid grid-cols-2 gap-8 pt-2">
            <div className="col-span-1 py-1">
              <label className="block text-secondaryText text-[14px] mb-2">
                Start Date
              </label>
              <CalendarInput
                placeholder="Start Date"
                value={startDate}
                action={setStartDate}
                disabled={false}
                minDate={new Date()}
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
                    handleSetNewDuration();
                    setEnterDuration(!enterDuration);
                  }}
                />
              </div>
              {!enterDuration ? (
                <CalendarInput
                  placeholder={!enterDuration ? "End Date" : "0"}
                  value={endDate}
                  action={(e: any) => {
                    setEndDate(e);
                  }}
                  disabled={false}
                  minDate={startDate || new Date()}
                />
              ) : (
                <PrimaryInput
                  inputType="number"
                  placeholder="duration"
                  value={duration}
                  action={(e: any) => {
                    setDuration(e);
                    handleSetNewDuration();
                  }}
                />
              )}
            </div>
          </div>
          <button
            className="px-8 py-2 mt-4 text-[16px] font-semibold bg-[#1297E2] text-white rounded-md w-full"
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

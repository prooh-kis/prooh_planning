import React, { useCallback, useEffect, useState } from "react";
import moment from "moment";
import { useSelector, useDispatch } from "react-redux";
import { getAllDatesBetween } from "../../utils/dateAndTimeUtils";
import { CalendarPopup } from "./CalendarPopup";
import { NoDataView } from "../../components/molecules/NoDataView";
import { TabWithoutIcon } from "../../components/molecules/TabWithoutIcon";
import { MonitoringPictures } from "../../components/segments/MonitoringPictures";
import { campaignMonitoringTab } from "../../constants/tabDataConstant";
import { GetCampaignMonitoringPicsAction } from "../../actions/campaignAction";

export const ShowMonitoringPicsPopup = (props: any) => {
  const dispatch = useDispatch<any>();
  const { campaign, screenId, campaignCreation } = props;
  const dateToday = new Date();
  const [isShow, setShow] = useState<boolean>(true);
  const [currentTab, setCurrentTab] = useState<any>("1");
  const [openCalendarPopup, setOpenCalendarPopup] = useState<any>(false);
  const [monitoringDate, setMonitoringDate] = useState<any>(dateToday);
  const [allDates, setAllDates] = useState<any>([]);
  const [monitoringTime, setMonitoringTime] = useState<any>("day");

  const campaignMonitoringPicsGet = useSelector(
    (state: any) => state.campaignMonitoringPicsGet
  );
  const {
    loading: loadingMonitoringPics,
    error: errorMonitoringPics,
    data: monitoringPics,
  } = campaignMonitoringPicsGet;

  const handleCampaignClick = () => {
    setAllDates(() => {
      return getAllDatesBetween(
        campaignCreation.startDate,
        campaignCreation.endDate
      );
    });
  };

  const handleSetCurrentTab = (id: string) => {
    setCurrentTab(id);
    switch (id) {
      case "1":
        setMonitoringTime("day");
        break;
      case "2":
        setMonitoringTime("night");
        break;
      case "3":
        setMonitoringTime("misc");
        break;
      default:
        setMonitoringTime("day");
        break;
    }
  };

  const handleCallGetScreenCampaignMonitoring = useCallback(() => {
    if (campaign?.campaignId && screenId) {
      dispatch(
        GetCampaignMonitoringPicsAction({
          screenId,
          campaignId: campaign?.campaignId,
          date: monitoringDate,
        })
      );
    }
  }, [campaign, screenId]);

  const handleClick = useCallback(
    (value: boolean) => {
      setShow(value);
    },
    [isShow]
  );

  useEffect(() => {
    if (campaign && screenId) {
      handleCallGetScreenCampaignMonitoring();
      handleCampaignClick();
    }
  }, [props]);

  const handleDateChange = (date: Date) => {
    setMonitoringDate(date);
    dispatch(
      GetCampaignMonitoringPicsAction({
        screenId,
        campaignId: campaign?.campaignId,
        date: date,
      })
    );
  };

  useEffect(() => {
    if (props?.open) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
    // Clean up the effect when the component unmounts
    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [props?.open]);

  if (!props?.open) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-10 ">
      <div
        className="bg-[#FFFFFF] p-4 rounded-lg shadow-lg w-full max-w-full relative overflow-auto max-h-auto "
        style={{ height: "80vh", width: "70vw" }}
      >
        {openCalendarPopup && (
          <div className="p-1 overflow-scroll no-scrollbar">
            <CalendarPopup
              onClose={() => setOpenCalendarPopup(false)}
              dates={allDates}
              monitoringDate={monitoringDate}
              setMonitoringDate={handleDateChange}
              openCalendarPopup={openCalendarPopup}
            />
          </div>
        )}
        <div className="flex justify-between">
          <div className="w-full flex items-center justify-between">
            <h1 className="text-[16px] font-semibold">Campaign Monitoring</h1>

            <i
              className="fi fi-br-circle-xmark"
              onClick={() => props?.onClose()}
            ></i>
          </div>
          {/* {isShow ? (
            <i
              className="fi fi-br-angle-small-down"
              onClick={() => handleClick(false)}
            ></i>
          ) : (
            <i
              className="fi fi-rr-angle-small-up"
              onClick={() => handleClick(true)}
            ></i>
          )} */}
        </div>
        {isShow && (
          <div>
            <div className="flex justify-end ">
              <div
                className="border border-1 py-2 px-4 text-[#129BFF] text-[14px] cursor-pointer flex gap-2 items-center rounded-md"
                title="click to change date"
                onClick={() => setOpenCalendarPopup(true)}
              >
                <i className="fi fi-rr-calendar-lines-pen"></i>
                {moment(monitoringDate).format("DD-MM-YYYY")}
              </div>
            </div>

            {loadingMonitoringPics ? (
              <h1 className="w-full py-1 px-4 border border-1 border-[#F1BC00] bg-yellow-100 text-[#000000] rounded-md mt-2">
                Loading Data...., please wait
              </h1>
            ) : !monitoringPics ? (
              <NoDataView />
            ) : (
              <div>
                <TabWithoutIcon
                  currentTab={currentTab}
                  setCurrentTab={handleSetCurrentTab}
                  tabData={campaignMonitoringTab}
                />
                <div className="h-auto pt-2">
                  <div className="w-full">
                    <MonitoringPictures
                      isUsedForShow={true}
                      handleUploadClick={() => {}}
                      time={monitoringTime}
                      setMonitoringMedia={() => {}}
                      setMonitoringTime={() => {}}
                      monitoringData={monitoringPics}
                      screenId={monitoringPics?.screenId}
                      campaignId={monitoringPics?.campaignId}
                      setFileType={() => {}}
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

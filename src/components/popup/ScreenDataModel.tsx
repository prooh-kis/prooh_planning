import { getDataFromLocalStorage } from "../../utils/localStorageUtils";
import { TabWithoutIcon } from "../../components/molecules/TabWithoutIcon";
import { CarouselImageView } from "../molecules/CarouselImageView";
import { Modal, Tooltip } from "antd";
import React, { useCallback, useState } from "react";
import { FULL_CAMPAIGN_PLAN } from "../../constants/localStorageConstants";

interface Props {
  screen: any;
  handleRemove: any;
  isAdded: boolean;
  campaignId?: any;
  listView?: any;
}

const allTabs = [
  {
    id: "1",
    label: "Why This?",
  },
  {
    id: "2",
    label: "Specification",
  },
  {
    id: "3",
    label: "Cohort Time",
  },
];

export function ScreenDataModel({
  campaignId,
  screen,
  handleRemove,
  isAdded,
  listView,
}: Props) {
  const [open, setOpen] = useState<boolean>(false);
  const [currentTab, setCurrentTab] = useState<any>("1");
  const [currentDayTab, setCurrentDayTab] = useState<any>("1");

  const [allDays, setAllDays] = useState<any>([
    {
      id: "1",
      label: "Weekdays",
      value: "weekdays",
    },
    {
      id: "2",
      label: "Saturdays",
      value: "saturdays",
    },
    {
      id: "3",
      label: "Sundays",
      value: "sundays",
    },
  ]);

  const handleCancel = useCallback(() => {
    setOpen(false);
  }, []);

  const handleOpen = useCallback(() => {
    setOpen(true);
  }, []);

  const handleRemoveScreen = () => {
    if (isAdded) {
      if (confirm("Do u really want to remove this screen")) {
        setOpen(false);
        handleRemove();
      }
    } else {
      if (confirm("Do u really want to select this screen")) {
        setOpen(false);
        handleRemove();
      }
    }
  };

  return (
    <div className="truncate">
      <div className="truncate" onClick={handleOpen}>
        <Tooltip title={screen?.screenName}>
          <h1
            className={`text-[14px] ${
              listView ? "font-regular" : "font-semibold"
            } truncate`}
          >
            {screen?.screenName}
          </h1>
        </Tooltip>
      </div>
      <Modal open={open} onCancel={handleCancel} footer={[]} width={1100}>
        <div className="">
          <div className="py-2">
            <h1 className="text-xl font-semibold">{screen.screenName}</h1>
            <h1 className="text-sm">
              {screen.location.address}, {screen.location.city},{" "}
              {screen.location.zoneOrRegion}
            </h1>
          </div>
          <div className="grid grid-cols-12 gap-4">
            <div className="col-span-6">
              <CarouselImageView images={screen.images} />
            </div>
            <div className="col-span-6">
              <div className="">
                <div className="border-b w-full">
                  <TabWithoutIcon
                    currentTab={currentTab}
                    setCurrentTab={setCurrentTab}
                    tabData={allTabs}
                  />
                </div>
                {currentTab === "1" ? (
                  <div>
                    <div className="p-2">
                      <h1 className="text-[14px]">
                        Your campaign parameters have{" "}
                        {
                          getDataFromLocalStorage(FULL_CAMPAIGN_PLAN)?.[
                            campaignId
                          ]?.touchPoints?.length
                        }{" "}
                        touchpoints, with{" "}
                        {
                          getDataFromLocalStorage(FULL_CAMPAIGN_PLAN)?.[
                            campaignId
                          ]?.cohorts?.length
                        }{" "}
                        cohorts selection.
                      </h1>
                    </div>
                    <div className="flex gap-2 p-2">
                      <div className="">
                        <span className="bg-[#129BFF] h-4 w-4 rounded-full" />
                      </div>
                      <div>
                        <h1 className="text-[12px]">Target Touchpoint</h1>
                        <h1 className="text-[14px] font-semibold">
                          {
                            getDataFromLocalStorage(FULL_CAMPAIGN_PLAN)?.[
                              campaignId
                            ]?.touchPoints?.filter(
                              (t: any) => t === screen.location.touchPoint
                            )[0]
                          }
                        </h1>
                      </div>
                    </div>
                    <div className="flex gap-2 p-2">
                      <div className="">
                        <span className="bg-[#129BFF] h-4 w-4 rounded-full" />
                      </div>
                      <div>
                        <h1 className="text-[12px]">Target Audience</h1>
                        <div>
                          {getDataFromLocalStorage(FULL_CAMPAIGN_PLAN)?.[
                            campaignId
                          ]?.cohorts?.map((c: any, i: any) => (
                            <h1 key={i} className="text-[14px] font-semibold">
                              {c}
                            </h1>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2 p-2">
                      <div className="">
                        <span className="bg-[#129BFF] h-4 w-4 rounded-full" />
                      </div>
                      <div>
                        <h1 className="text-[12px]">Screen Type</h1>
                        <h1 className="text-[14px] font-semibold">
                          {screen.screenType}
                        </h1>
                      </div>
                    </div>
                  </div>
                ) : currentTab === "2" ? (
                  <div className="p-2">
                    <div className="pb-4">
                      <h1 className="text-[14px]">
                        Please find the details of the screen selected below.
                      </h1>
                    </div>
                    <div className="grid grid-cols-2 gap-2 flex items-center py-1">
                      <div className="col-span-1 flex gap-2">
                        <h1 className="text-[12px]">Placement area</h1>
                        <Tooltip>
                          <i></i>
                        </Tooltip>
                      </div>
                      <div className="col-span-1">
                        <h1 className="text-[14px] font-semibold">
                          {screen.location.touchPoint}, {screen?.location?.city}
                        </h1>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-2 flex items-center py-1">
                      <div className="col-span-1">
                        <h1 className="text-[12px]">Integration status</h1>
                      </div>
                      <div className="col-span-1">
                        <h1 className="text-[14px] font-semibold">
                          {screen?.integrationStatus ? "Yes" : "No"}
                        </h1>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-2 flex items-center py-1">
                      <div className="col-span-1">
                        <h1 className="text-[12px]">Hardware pitch</h1>
                      </div>
                      <div className="col-span-1">
                        <h1 className="text-[14px] font-semibold">
                          {screen?.hardwarePitch || "P8"}
                        </h1>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-2 flex items-center py-1">
                      <div className="col-span-1">
                        <h1 className="text-[12px]">Pin Code</h1>
                      </div>
                      <div className="col-span-1">
                        <h1 className="text-[14px] font-semibold">
                          {screen?.location?.pincode || 221008}
                        </h1>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-2 flex items-center py-1">
                      <div className="col-span-1">
                        <h1 className="text-[12px]">Operational hours</h1>
                      </div>
                      <div className="col-span-1">
                        <h1 className="text-[14px] font-semibold">
                          {screen?.operationalDuration?.totalDuration / 60} Hrs
                        </h1>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-2 flex items-center py-1">
                      <div className="col-span-1">
                        <h1 className="text-[12px]">Operational time</h1>
                      </div>
                      <div className="col-span-1">
                        <h1 className="text-[14px] font-semibold">
                          {screen?.operationalDuration?.onTime} -{" "}
                          {screen?.operationalDuration?.offTime}
                        </h1>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-2 flex items-center py-1">
                      <div className="col-span-1">
                        <h1 className="text-[12px]">Resolution</h1>
                      </div>
                      <div className="col-span-1">
                        <h1 className="text-[14px] font-semibold">
                          {screen?.screenResolution}
                        </h1>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-2 flex items-center py-1">
                      <div className="col-span-1">
                        <h1 className="text-[12px]">Size</h1>
                      </div>
                      <div className="col-span-1">
                        <h1 className="text-[14px] font-semibold">
                          {screen?.screenLength}
                          {""} x {screen?.screenWidth}
                          {""}
                        </h1>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-2 flex items-center py-1">
                      <div className="col-span-1">
                        <h1 className="text-[12px]">Network Type</h1>
                      </div>
                      <div className="col-span-1">
                        <h1 className="text-[14px] font-semibold">
                          {screen?.networkType || "Individual"}
                        </h1>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-2 flex items-center py-1">
                      <div className="col-span-1">
                        <h1 className="text-[12px]">Slots Per Day</h1>
                      </div>
                      <div className="col-span-1">
                        <h1 className="text-[14px] font-semibold">
                          {screen?.slotsPerDay.toFixed(0)}
                        </h1>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-2 flex items-center py-1">
                      <div className="col-span-1">
                        <h1 className="text-[12px]">Slot length in seconds</h1>
                      </div>
                      <div className="col-span-1">
                        <h1 className="text-[14px] font-semibold">
                          {screen?.slotLengthSeconds} secs
                        </h1>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-2 flex items-center py-1">
                      <div className="col-span-1">
                        <h1 className="text-[12px]">Screen Rent</h1>
                      </div>
                      <div className="col-span-1">
                        <h1 className="text-[14px] font-semibold">
                          &#8377; {screen?.pricePerSlot}
                        </h1>
                      </div>
                    </div>
                  </div>
                ) : currentTab === "3" ? (
                  <div>
                    <div className="p-2">
                      <h1 className="text-[14px]">
                        Your campaign parameters have{" "}
                        {
                          getDataFromLocalStorage(FULL_CAMPAIGN_PLAN)?.[
                            campaignId
                          ]?.cohorts?.length
                        }{" "}
                        cohorts selections for audiences having maximum
                        penetration at these times.
                      </h1>
                    </div>
                    <div className="">
                      {allDays?.map((day: any, i: any) => (
                        <div className="p-2" key={i}>
                          <h1 className="text-[14px] font-semibold">
                            {day?.label}
                          </h1>
                          <div className="grid grid-cols-4 gap-2">
                            {screen?.selectedTime
                              ?.filter((ss: any) => ss.day === day.value)
                              ?.map((s: any, j: any) => (
                                <div
                                  key={j}
                                  className="col-span-1 rounded bg-blue-50 my-2 py-1 flex flex-col items-center"
                                >
                                  <h1 className="text-[12px] font-semibold">
                                    {s.slot.toUpperCase()}
                                  </h1>
                                  <h1 className="text-[12px] truncate">
                                    {s.slot === "morning"
                                      ? "8 AM to 12 Noon"
                                      : s.slot === "noon"
                                      ? "12 Noon to 4 PM"
                                      : s.slot === "evening"
                                      ? "4 PM to 8 PM"
                                      : "8 PM to 12 PM"}
                                  </h1>
                                </div>
                              ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : null}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-4 py-4 px-2">
            <button
              onClick={handleRemoveScreen}
              type="submit"
              className={
                !isAdded
                  ? "w-full border border-1 py-2 px-4 rounded-md hover:bg-[#129BFF] hover:text-[#FFFFFF] text-lg"
                  : "w-full border border-1 py-2 px-4 rounded-md hover:bg-red-400 hover:text-[#FFFFFF] text-lg"
              }
            >
              {isAdded ? "Remove Screen" : "Add this screen"}
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}

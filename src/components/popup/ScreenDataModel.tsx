import { CarouselImageView } from "../molecules/CarouselImageView";
import { Modal } from "antd";
import React, { useCallback, useState } from "react";

interface Props {
  screen: any;
}

export function ScreenDataModel({ screen }: Props) {
  const [open, setOpen] = useState<boolean>(false);

  const handleCancel = useCallback(() => {
    setOpen(false);
  }, []);

  const handleOpen = useCallback(() => {
    setOpen(true);
  }, []);

  return (
    <div className="truncate">
      <div className="truncate">
        <h1 className="text-[14px] truncate" onClick={handleOpen}>{screen?.screenName}</h1>
      </div>
      <Modal open={open} onCancel={handleCancel} footer={[]} width={1100}>
        <div className="flex gap-8">
          <div className="w-96">
            <CarouselImageView images={screen.images} />
          </div>
          <div className="w-100%">
            <h1 className="text-xl font-semibold pb-4">
              {screen.screenName}
            </h1>
            <div className="flex justify-between gap-4">
              <div className="flex flex-col gap-2 font-semibold">
                <h1 className="">Placement area</h1>
                <h1>Integration status</h1>
                <h1>Hardware pitch</h1>
                <h1>Pine code</h1>
                <h1>Operational hours</h1>
                <h1>Operational time</h1>
                <h1>Resolution</h1>
                <h1>Size</h1>
                <h1>Network Type</h1>
                <h1>Slots Per Day</h1>
                <h1>Slot length in sec.</h1>
                <h1>Screen Rent</h1>
              </div>
              <div className="flex flex-col gap-2">
                <div className="flex flex-col gap-2 font-normal">
                  <h1>{screen.location.touchPoint}, {screen?.location?.city}</h1>
                  <h1>{screen?.integrationStatus ? "Yes" : "No"}</h1>
                  <h1>{screen?.hardwarePitch || "P8"}</h1>
                  <h1>{screen?.location?.pincode || 221008}</h1>
                  <h1>{screen?.operationalDuration?.totalDuration / 60} Hrs</h1>
                  <h1>
                    {screen?.operationalDuration?.onTime}AM -{" "}
                    {screen?.operationalDuration?.offTime}AM
                  </h1>
                  <h1>{screen?.screenResolution}</h1>
                  <h1>
                    {screen?.screenLength}{''} x {screen?.screenWidth}{''}
                  </h1>
                  <h1>{screen?.networkType || "Single"}</h1>
                  <h1>{screen?.slotsPerDay.toFixed(0)}</h1>
                  <h1>{screen?.slotLengthSeconds} secs</h1>
                  <h1>&#8377; {screen?.pricePerSlot}</h1>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="pt-4">
          <h1 className="py-2 text-xl font-semibold">
            Your selected cohort time
          </h1>
          <div className="flex justify-between items-end">
            <div className="flex gap-4 text-gray-500">
              {screen?.selectedTime?.map((s: any, i: any) => (
                <div key={i} className="border border-1 py-2 px-6 flex flex-col items-center">
                  <h1 className="text-[12px] font-semibold">{s.day.toUpperCase()}</h1>
                  <h1 className="text-[16px] font-semibold">{s.slot.toUpperCase()}</h1>
                  <h1 className="text-[12px]">
                    {s.slot === "morning" ? "8 AM to 12 Noon" :
                      s.slot === "noon" ? "12 Noon to 4 PM" :
                      s.slot === "evening" ? "4 PM to 8 PM" :
                      "8 PM to 12 PM"
                    }
                  </h1>
                </div>
              ))}
      
            </div>
            <div className="flex  items-center gap-4 ">
              <button
                className="border border-1 py-2 px-4 rounded-md hover:bg-blue-500 hover:text-white"
                title="Go back"
              >
                Remove screen
              </button>
              <button
                className="border border-1 py-2 px-4 rounded-md bg-blue-500 text-white hover:bg-blue-600"
                title="Save and go next"
              >
                Next screen
              </button>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}

import { Modal } from "antd";
import React, { useCallback, useEffect, useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";

const localizer = momentLocalizer(moment);

export const EventCalender = ({ events }: any) => {
  const [open, setOpen] = useState<boolean>(false);
  const state = {
    events: [
      {
        start: moment().toDate(),
        end: moment().add(1, "days").toDate(),
        title: "Some title",
      },
    ],
  };

  const handleCancel = useCallback(() => {
    setOpen(false);
  }, [open]);

  const handleOpen = useCallback(() => {
    setOpen(true);
  }, [open]);

  return (
    <div>
      <div
        className="border border-1 border-[#129BFF] text-[#129BFF] px-4 py-2 flex gap-4 rounded-md cursor-pointer"
        onClick={handleOpen}
      >
        <i className="fi fi-rs-calendar"></i>
        <h1>Select Custom Date</h1>
      </div>

      <Modal
        closable={true}
        open={open}
        onCancel={handleCancel}
        footer={[]}
        style={{ top: 5 }}
        width={1000}
        maskClosable={false}
      >
        <div className="p-4">
          <Calendar
            localizer={localizer}
            defaultDate={new Date()}
            defaultView="month"
            events={events?.map((data: any) => {
              return {
                start: moment(data?.date).toDate(),
                end: moment(data?.date).add(1, "days").toDate(),
                title: data.specialDay,
              };
            })}
            style={{ height: "100vh" }}
          />
        </div>
      </Modal>
    </div>
  );
};

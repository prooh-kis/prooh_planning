import { Modal } from "antd";
import React, { useCallback, useEffect, useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import axios from "axios";
const localizer = momentLocalizer(moment);

export const EventCalender = () => {
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

  //   useEffect(() => {
  //     axios
  //       .get(
  //         "https://api.api-ninjas.com/v1/holidays?country=india&year=2025&type=public_holiday",
  //         {
  //           headers: {
  //             "X-Api-Key": "YOUR_API_KEY",
  //           },
  //         }
  //       )
  //       .then((data) => console.log("data", data));
  //   }, []);

  return (
    <div>
      <div
        className="border border-1 border-blue-500 text-blue-500 px-4 py-2 flex gap-4 rounded-md cursor-pointer"
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
            events={state.events}
            style={{ height: "100vh" }}
          />
        </div>
      </Modal>
    </div>
  );
};

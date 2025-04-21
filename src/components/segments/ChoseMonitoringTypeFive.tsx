import { Checkbox } from "antd";
import { TabWithoutIcon } from "../molecules/TabWithoutIcon";
import { useEffect, useRef, useState } from "react";
import ButtonInput from "../atoms/ButtonInput";
import { CalendarInput } from "../atoms/CalendarInput";
import { getAllDatesBetween } from "../../utils/dateAndTimeUtils";
import { format } from "date-fns";
import { monitoringTypes } from "../../constants/helperConstants";

interface MonitoringTypeData {
  dates: string[];
  monitoringTypes: any[];
}

interface InitialData {
  startDate: MonitoringTypeData;
  midDate: MonitoringTypeData;
  endDate: MonitoringTypeData;
}

interface CalenderInputProps {
  label: string;
  onClick: () => void;
  isActive: boolean;
}

function ShowCalenderInput({ label, onClick, isActive }: CalenderInputProps) {
  return (
    <div
      onClick={isActive ? onClick : undefined}
      className={`cols-span-1 p-2 border rounded-[5px] flex justify-between items-center ${
        isActive
          ? "cursor-pointer border-[#D2D2D2]"
          : "cursor-not-allowed border-[#E0E0E0] bg-gray-50 opacity-70"
      }`}
    >
      <div className="flex gap-2 items-center">
        <i
          className={`fi fi-rr-calendar flex items-center ${
            isActive ? "text-[#129BFF]" : "text-gray-400"
          }`}
        ></i>
        <p
          className={!isActive ? "text-gray-500 text-[14px]" : "text-[14px] text-[#000000]"}
        >
          {label}
        </p>
      </div>
      <i
        className={`fi fi-ss-angle-small-down ${
          !isActive ? "text-gray-400" : "text-[#000000]"
        }`}
      ></i>
    </div>
  );
}

export const ChoseMonitoringTypeFive = ({ initialData, setInitialData }: any) => {
  const dateInputRef = useRef<HTMLInputElement>(null);

  const [showDemoDates, setShowDemoDates] = useState<any>(false);

  const [isShow, setIsShow] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [option, setOption] = useState<keyof InitialData>("midDate");

  const currentMonitoringData = initialData[option];
 

  const [selectedDates, setSelectedDates] = useState<string[]>(
    currentMonitoringData.dates || []
  );



  const handleCheckboxChange = (
    checked: boolean,
    value: string
  ) => {
    setInitialData((prev: any) => {
      const newData = { ...prev };
      for (const date in newData) {
        const currentOption: any = newData[date];

        if (checked) {
          currentOption.monitoringType = [
            ...currentOption.monitoringType,
            value,
          ];
        } else {
          currentOption.monitoringType =
            currentOption.monitoringType.filter((item: any) => item !== value);
        }
      }
     
      return newData;
    });
  };

  const handleDateChange = (dates: string[]) => {
    setInitialData((prev: InitialData) => ({
      ...prev,
      [option]: {
        ...prev[option],
        dates: dates,
        monitoringType: monitoringTypes?.map((type: any) => type.value)
      },
    }));
  };

  const handleDateInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedDates([e.target.value]);
    handleDateChange([e.target.value]);
  };

  const selectMidDate = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedDates([e.target.value]);
    handleDateChange([e.target.value]);
  }

  const handleCalendarClick = () => {
    if (dateInputRef.current) {
      dateInputRef.current.showPicker();
    }
  };


  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsShow(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative w-full">
      <div className="grid grid-cols-3 gap-6">
        <div className="col-span-1">
          <label className="text-[12px]">Start Date</label>
          <ShowCalenderInput
            label={initialData["startDate"].dates[0]}
            isActive={false}
            onClick={() => {
              setOption("startDate");
              setIsShow(true);
            }}
          />
        </div>
        <div className="col-span-1">
          <label className="text-[12px]" onClick={() => setShowDemoDates(!showDemoDates)}>Mid Date</label>
          {showDemoDates ? (
            <div className="px-2 py-2 border rounded-[5px] gap-1 flex justify-start items-center text-[14px]">
              <i className={`py-1 fi fi-rr-calendar text-[#129BFF] text-[16px] flex items-center`}></i>
              <select
                className="w-full flex items-center"
                title="a"
                value={initialData["midDate"].dates[0] || "Mid Date"}
                onChange={selectMidDate}
              >
                <option value={""} label={"Select Mid Date"} />
                <option
                  value={
                    `${format(getAllDatesBetween(initialData["startDate"].dates[0], initialData["endDate"].dates[0])[Math.round(getAllDatesBetween(initialData["startDate"].dates[0], initialData["endDate"].dates[0]).length/2 - 1)], "yyyy-mm-dd")}`
                  } label={
                    `${format(getAllDatesBetween(initialData["startDate"].dates[0], initialData["endDate"].dates[0])[Math.round(getAllDatesBetween(initialData["startDate"].dates[0], initialData["endDate"].dates[0]).length/2 - 1)], "yyyy-mm-dd")}`
                  }
                />
                <option
                  value={
                    `${format(getAllDatesBetween(initialData["startDate"].dates[0], initialData["endDate"].dates[0])[Math.round(getAllDatesBetween(initialData["startDate"].dates[0], initialData["endDate"].dates[0]).length/2)], "yyyy-mm-dd")}`
                  } label={
                  `${format(getAllDatesBetween(initialData["startDate"].dates[0], initialData["endDate"].dates[0])[Math.round(getAllDatesBetween(initialData["startDate"].dates[0], initialData["endDate"].dates[0]).length/2)], "yyyy-mm-dd")}`
                  }
                />
                <option
                  value={
                    `${format(getAllDatesBetween(initialData["startDate"].dates[0], initialData["endDate"].dates[0])[Math.round(getAllDatesBetween(initialData["startDate"].dates[0], initialData["endDate"].dates[0]).length/2 + 1)], "yyyy-mm-dd")}`
                  } label={
                    `${format(getAllDatesBetween(initialData["startDate"].dates[0], initialData["endDate"].dates[0])[Math.round(getAllDatesBetween(initialData["startDate"].dates[0], initialData["endDate"].dates[0]).length/2 + 1)], "yyyy-mm-dd")}`
                  }
                />
              </select>
            </div>
          ) : (
            <ShowCalenderInput
              label={initialData["midDate"].dates[0] || "Mid Date"}
              isActive={true}
              onClick={handleCalendarClick}
            />
          )}

          <input
            title="date"
            type="date"
            ref={dateInputRef}
            className="absolute opacity-0 w-0 h-0"
            value={initialData["midDate"].dates[0] || "Mid Date"}
            onChange={handleDateInputChange}
            min={initialData["startDate"].dates[0]}
            max={initialData["endDate"].dates[0]}
          />
          
        </div>
        <div className="col-span-1">
          <label className="text-[12px]">End Date</label>
          <ShowCalenderInput
            label={initialData["endDate"].dates[0]}
            isActive={false}
            onClick={() => {
              setOption("endDate");
              setIsShow(true);
            }}
          />
        </div>
      </div>
      
      <div className="w-full grid grid-cols-3 gap-4 my-4">
        {monitoringTypes
          ?.map((value: any, i: any) => (
            <div key={i} className="col-span-1 flex items-center gap-4">
              <div className="flex items-center gap-2 truncate">
                <i className={`text-[#129BFF] text-[12px] ${value.icon}`}></i>
                <h1 className="text-[12px] truncate">{value.label}</h1>
              </div>

              <i className="fi fi-br-check flex items-center text-[12px] text-[#1FA523]"></i>
            </div>
          ))}
      </div>

      
    </div>
  );
};

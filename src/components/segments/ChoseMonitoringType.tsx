import { Checkbox } from "antd";
import { TabWithoutIcon } from "../../components/molecules/TabWithoutIcon";
import { useEffect, useRef, useState } from "react";
import ButtonInput from "../../components/atoms/ButtonInput";

interface MonitoringTypeData {
  dates: string[];
  dayMonitoringType: string[];
  nightMonitoringType: string[];
}

interface InitialData {
  startDate: MonitoringTypeData;
  midDate: MonitoringTypeData;
  endDate: MonitoringTypeData;
}

interface PopupProps {
  tabData: { id: string; label: string }[];
  currentTab: string;
  setCurrentTab: (tab: string) => void;
  title: string;
  option: keyof InitialData;
  initialData: InitialData;
  handleSave: (type: string, checked: boolean, value: string) => void;
  monitoringType: string[];
  handleDateChange: (date: any) => void;
  isActive: boolean;
  onClose: () => void;
}

interface CalenderInputProps {
  label: string;
  onClick: () => void;
  isActive: boolean;
}

function CalenderInput({ label, onClick, isActive }: CalenderInputProps) {
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
          className={`fi fi-rr-calendar ${
            isActive ? "text-[#129BFF]" : "text-gray-400"
          }`}
        ></i>
        <p
          className={!isActive ? "text-gray-500" : "text-[14px] text-[#000000]"}
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

function Popup({
  tabData,
  currentTab,
  setCurrentTab,
  title,
  option,
  initialData,
  handleSave,
  monitoringType,
  handleDateChange,
  isActive,
  onClose,
}: PopupProps) {
  const currentMonitoringData = initialData[option];
  const currentTypes =
    currentTab === "1"
      ? currentMonitoringData.dayMonitoringType
      : currentMonitoringData.nightMonitoringType;
  const [selectedDates, setSelectedDates] = useState<string[]>(
    currentMonitoringData.dates || []
  );
  const dateInputRef = useRef<HTMLInputElement>(null);
  const [tempDate, setTempDate] = useState("");

  const handleAddDate = (date: string) => {
    if (!isActive) return;
    if (!date) return;

    const updatedDates = selectedDates.includes(date)
      ? selectedDates.filter((d) => d !== date) // Remove if already exists
      : [...selectedDates, date]; // Add if new

    setSelectedDates(updatedDates);
    handleDateChange(updatedDates);
    setTempDate("");
  };

  const handleCalendarClick = () => {
    if (dateInputRef.current) {
      dateInputRef.current.showPicker();
    }
  };

  const handleDateInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedDates((pre) => [...pre, e.target.value]);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-10">
      <div className="border bg-[#FFFFFF] rounded-[10px] h-auto w-[426px] p-8">
        <h1 className="text-[20px] font-semibold text-[#0E212E] leading-[16.94px]">
          {title}
        </h1>
        <div className="flex gap-4 my-2">
          <TabWithoutIcon
            tabData={tabData}
            currentTab={currentTab}
            setCurrentTab={setCurrentTab}
          />
        </div>

        <div className="relative mb-2">
          <CalenderInput
            label={selectedDates.length > 0 ? `Date selected` : "Select Dates"}
            onClick={handleCalendarClick}
            isActive={isActive}
          />
          <input
            title={"da"}
            type="date"
            ref={dateInputRef}
            className="absolute opacity-0 w-0 h-0"
            value={tempDate}
            onChange={handleDateInputChange}
          />
        </div>

        {selectedDates.length > 0 && (
          <div className="mb-4">
            <div className="text-sm font-medium text-gray-700 mb-1">
              Selected Dates:
            </div>
            <div className="flex flex-wrap gap-2">
              {selectedDates.map((date) => (
                <div
                  key={date}
                  className="flex items-center bg-gray-100 px-2 py-1 rounded text-sm"
                >
                  {date}
                  {isActive && (
                    <button
                      onClick={() => handleAddDate(date)}
                      className="ml-2 text-gray-500 hover:text-red-500"
                    >
                      ×
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="grid grid-cols-2 gap-4 my-4">
          {monitoringType
            ?.filter(
              (value) => !(currentTab === "2" && value === "With Newspaper")
            )
            ?.map((value: string) => (
              <Checkbox
                key={value}
                checked={currentTypes.includes(value)}
                onChange={(e) =>
                  handleSave(currentTab, e.target.checked, value)
                }
              >
                {value}
              </Checkbox>
            ))}
        </div>

        <ButtonInput onClick={onClose}>Save Details</ButtonInput>
      </div>
    </div>
  );
}

export const ChoseMonitoringType = ({ initialData, setInitialData }: any) => {
  const [isShow, setIsShow] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [tabData, setTabData] = useState<{ id: string; label: string }[]>([]);
  const [currentTab, setCurrentTab] = useState<string>("1");
  const [option, setOption] = useState<keyof InitialData>("startDate");

  const monitoringTypes = [
    "Digital Dated Picture",
    "Without Digital date",
    "With Newspaper",
    "Full Loop Video",
    "With Geo Tag",
  ];

  const handleCheckboxChange = (
    tab: string,
    checked: boolean,
    value: string
  ) => {
    setInitialData((prev: InitialData) => {
      const newData = { ...prev };
      const currentOption = newData[option];

      if (tab === "1") {
        // Day tab
        if (checked) {
          currentOption.dayMonitoringType = [
            ...currentOption.dayMonitoringType,
            value,
          ];
        } else {
          currentOption.dayMonitoringType =
            currentOption.dayMonitoringType.filter((item) => item !== value);
        }
      } else {
        // Night tab
        if (checked) {
          currentOption.nightMonitoringType = [
            ...currentOption.nightMonitoringType,
            value,
          ];
        } else {
          currentOption.nightMonitoringType =
            currentOption.nightMonitoringType.filter((item) => item !== value);
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
      },
    }));
  };

  useEffect(() => {
    setTabData([
      { id: "1", label: "Day" },
      { id: "2", label: "Night" },
    ]);
  }, []);

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
    <div className="grid grid-cols-3 gap-6 relative">
      <CalenderInput
        label="Start Date"
        isActive={true}
        onClick={() => {
          setOption("startDate");
          setIsShow(true);
        }}
      />
      <CalenderInput
        label="Mid Date"
        isActive={true}
        onClick={() => {
          setOption("midDate");
          setIsShow(true);
        }}
      />
      <CalenderInput
        label="End Date"
        isActive={true}
        onClick={() => {
          setOption("endDate");
          setIsShow(true);
        }}
      />

      {isShow && (
        <Popup
          tabData={tabData}
          currentTab={currentTab}
          setCurrentTab={setCurrentTab}
          option={option}
          title={`${
            option.charAt(0).toUpperCase() +
            option.slice(1).replace("Date", " Date")
          } Monitoring`}
          monitoringType={monitoringTypes}
          handleSave={handleCheckboxChange}
          initialData={initialData}
          handleDateChange={handleDateChange}
          isActive={
            option === "startDate" || option === "endDate" ? false : true
          }
          onClose={() => setIsShow(false)}
        />
      )}
    </div>
  );
};

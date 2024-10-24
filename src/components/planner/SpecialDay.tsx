import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { message, Select } from "antd";
import { AddCampaignDetails } from "../popup/AddCampaignDetails";
import { EventCalender } from "../../components/popup/EventCalender";
import { MonthRangeSlider } from "../../components/molecules/MonthRangeSlider";
import moment from "moment";
import {
  getCalendarListData,
  getIndustryCategory,
} from "../../actions/calenderAction";
import { useSelector } from "react-redux";
import { getTableDataForSelectTopicalDayPage } from "../../actions/screenAction";
import { SingleCalenderData } from "../../components/molecules/SingleCalenderData";
import { addDetailsToCreateCampaign } from "../../actions/campaignAction";
import { endOfDay, startOfDay } from "date-fns";

const lastDateMonthWise: any = {
  1: 31,
  2: 28,
  3: 31,
  4: 30,
  5: 31,
  6: 30,
  7: 31,
  8: 31,
  9: 30,
  10: 31,
  11: 30,
  12: 31,
};

interface SpecialDayProps {
  setCurrentStep: (step: number) => void;
  step: number;
  userInfo?: any;
  pathname?: string;
  campaignId?: any;
}

export const SpecialDay = ({
  setCurrentStep,
  step,
  userInfo,
  pathname,
  campaignId,
}: SpecialDayProps) => {
  const navigate = useNavigate();
  const dispatch = useDispatch<any>();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [month, setMonth] = useState<number>(new Date().getMonth());
  const [monthName, setMonthName] = useState<string>("");
  const [idCampaign, setCampaignId] = useState<any>(campaignId || "");
  const [category, setCategory] = useState<string>("");
  const [selectedDate, setSelectedDate] = useState<any>("");
  const [selectedSpacialDay, setSelectedSpacialDay] = useState<string>("");

  console.log("ffffffffffffff : ", selectedDate);
  const industryCategory = useSelector((state: any) => state.industryCategory);
  const {
    loading: loadingCategory,
    error: errorScreenSummaryPlanTable,
    data: industryCategoryData,
  } = industryCategory;
  const calendarListData = useSelector((state: any) => state.calendarListData);
  const {
    loading: loadingCalendarListDat,
    error: errorCalendarListDat,
    data: calendarListData1,
  } = calendarListData;

  const tableDataForSelectTopicalDay = useSelector(
    (state: any) => state.tableDataForSelectTopicalDay
  );
  const {
    loading: loadingTableDataForSelectTopicalDay,
    error: errorTableDataForSelectTopicalDay,
    data: tableDataForSelectTopicalDay1,
  } = tableDataForSelectTopicalDay;

  const detailsToCreateCampaignAdd = useSelector(
    (state: any) => state.detailsToCreateCampaignAdd
  );
  const {
    loading: loadingAddDetails,
    error: errorAddDetails,
    success: successAddDetails,
    data: addDetails,
  } = detailsToCreateCampaignAdd;

  const getLastDay = (month: number) => {
    return lastDateMonthWise[month];
  };

  const handleCancel = useCallback(() => {
    setIsOpen(false);
  }, [isOpen]);

  const handleOpenModel = useCallback(() => {
    console.log("selectedDate : ", selectedDate);
    if (selectedDate) setIsOpen(true);
    else message.error("Please select Date first");
  }, [isOpen, selectedDate]);

  useEffect(() => {
    dispatch(getTableDataForSelectTopicalDayPage({ impactFactor: 0.2 }));
  }, [dispatch]);

  useEffect(() => {
    const year = new Date().getFullYear();
    const lastDays = getLastDay(month);

    dispatch(
      getCalendarListData({
        startDate: `${year}-${month + 1}-01`,
        endDate: `${year}-${month + 1}-${lastDays}`,
        category: [category],
      })
    );
  }, [category, month]);

  useEffect(() => {
    dispatch(getIndustryCategory({ category: [], industry: [] }));
  }, []);

  useEffect(() => {
    if (errorAddDetails) {
      message.error(errorAddDetails);
    }

    if (successAddDetails) {
      setCampaignId(addDetails._id);
      setCurrentStep(step + 1);
      navigate(`/specialdayplan/${addDetails?._id}`);
    }
  }, [navigate, successAddDetails, errorAddDetails]);

  const handleSaveData = (data: any) => {
    console.log("all datat :", data);
    dispatch(
      addDetailsToCreateCampaign({
        ...data,
        startDate: moment(selectedDate).format(),
        endDate: moment(selectedDate).add(1, "days").format(),
        duration: 1,
        category: category,
      })
    );
  };

  return (
    <div className="w-full py-3">
      <AddCampaignDetails
        handleCancel={handleCancel}
        open={isOpen}
        userInfo={userInfo}
        setCurrentStep={setCurrentStep}
        step={step}
        router="specialdayplan"
        setCampaignId={setCampaignId}
        campaignId={idCampaign}
        date={selectedDate}
        startDate={selectedDate}
        endDate={moment(selectedDate).add(1, "days").format("YYYY-MM-DD")}
        duration={1}
        handleSaveData={handleSaveData}
        selectedSpacialDay={selectedSpacialDay}
      />
      <h1 className="text-[24px] text-primaryText font-semibold">
        Select Topical Day
      </h1>
      <div className="flex  justify-between">
        <div className="flex gap-4">
          <Select
            options={industryCategoryData?.filteredIndustryCategory?.map(
              (data: any) => {
                return { label: data?.catergory, value: data?.catergory };
              }
            )}
            onChange={setCategory}
            showSearch
            placeholder="Select your category"
            size="large"
            loading={loadingCategory}
            style={{ width: "456px" }}
          />
          <button
            onClick={() => setCategory("")}
            className="border border-1 px-4 py-2 rounded-md"
          >
            Reset
          </button>
        </div>
        <EventCalender events={calendarListData1?.filteredCalendar || []} />
      </div>
      <div className="">
        <h1 className="py-2">Months</h1>
        <div className="py-4 w-full">
          <MonthRangeSlider
            // min={1} max={12} onChange={() => {}}
            setMonth={setMonth}
            setMonthName={setMonthName}
            months={12}
            month={month}
          />
        </div>
      </div>
      <div className="flex gap-8">
        <div className="w-full border border-1 rounded-xl p-8">
          <h1>Topical days in {monthName} </h1>
          <h1 className="text-[#888888]">
            You have found {calendarListData1?.filteredCalendar?.length} events
            according to your category{" "}
          </h1>
          <div className="flex flex-col gap-4 mt-4 overflow-y-auto pr-4 h-96">
            {calendarListData1?.filteredCalendar?.map(
              (value: any, index: any) => (
                <div key={index}>
                  <SingleCalenderData
                    data={value}
                    setSelectedDate={setSelectedDate}
                    selectedDate={selectedDate}
                    setSelectedSpacialDay={setSelectedSpacialDay}
                  />
                  <div className="border border-1"></div>
                </div>
              )
            )}
          </div>
        </div>
        <div className="w-full border border-1 rounded-xl p-8">
          <div className="flex justify-between">
            <h1>your selection - {selectedSpacialDay}</h1>
            <h1 className="text-blue-500">
              {selectedDate
                ? moment(selectedDate).format("ll")
                : "No date selected"}
            </h1>
          </div>
          <h1 className="text-[#888888] text-[14px] py-2">
            your final bill will include the cost of all the additional slots,{" "}
          </h1>
          <div className="flex flex-col gap-4 mt-4 overflow-y-auto h-96">
            {Object.keys(tableDataForSelectTopicalDay1 || {})?.map(
              (key: string, index: any) => (
                <div key={index} className="pr-4">
                  <div className="flex justify-between">
                    <h1 className="py-2">{key}</h1>
                    <h1
                      className={
                        key === "Total Budget"
                          ? "text-[#1297E2] text-[20px]"
                          : "text-[#CC1C1C]"
                      }
                    >
                      {tableDataForSelectTopicalDay1[key]}
                    </h1>
                  </div>
                  <div className="border border-1"></div>
                </div>
              )
            )}
          </div>
          <h1 className="text-[#E90707] text-[14px] mt-4">
            Note - these fields are subject to change when you <br /> proceed
            for optimizing this plan
          </h1>
        </div>
      </div>
      <div className="flex justify-end mt-4">
        <button
          className="px-8 py-2 bg-[#1297E2] text-white rounded-md"
          onClick={handleOpenModel}
        >
          Proceed To Cost Optimization
        </button>
      </div>
    </div>
  );
};

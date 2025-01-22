import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { message, Select } from "antd";
import { AddCampaignDetails } from "../popup/AddCampaignDetails";
import { EventCalender } from "../../components/popup/EventCalender";
import { MonthRangeSlider } from "../../components/molecules/MonthRangeSlider";
import moment from "moment";
import {
  getCalendarListData,
  getIndustryCategory,
} from "../../actions/calenderAction";
import { useSelector, useDispatch } from "react-redux";
import { getPlanningPageFooterData, getTableDataForSelectTopicalDayPage } from "../../actions/screenAction";
import { SingleCalenderData } from "../../components/molecules/SingleCalenderData";
import { addDetailsToCreateCampaign } from "../../actions/campaignAction";
import { endOfDay, startOfDay } from "date-fns";
import { formatNumber } from "../../utils/formatValue";

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

  const tableDataForSelectTopicalDayPageGet = useSelector(
    (state: any) => state.tableDataForSelectTopicalDayPageGet
  );
  const {
    loading: loadingTableDataForSelectTopicalDay,
    error: errorTableDataForSelectTopicalDay,
    data: tableDataForSelectTopicalDay1,
  } = tableDataForSelectTopicalDayPageGet;

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
        endDate: `${year}-${month + 1}-31`,
        category: [category],
      })
    );
  }, [category, month]);

  useEffect(() => {
    dispatch(getIndustryCategory({ category: [], industry: [] }));
    // dispatch(getPlanningPageFooterData({
    //   id: campaignId,
    //   pageName: "Set Ad Play time Page",
    // }));
  }, [dispatch]);

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
      <h1 className="text-[24px] text-[#232323] font-semibold leading-[32.68px] tracking-[-0.02em]">
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
            className="border border-[#D9D9D9] px-4 py-2 rounded-md text-[#D9D9D9]"
          >
            Reset
          </button>
        </div>
        {/* <EventCalender events={calendarListData1?.filteredCalendar || []} /> */}
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
          <h1 className="text-[16px] font-semibold text-[#212121] leading-[21.79px]">
            Topical days in {monthName}{" "}
          </h1>
          <h1 className="text-[16px] font-normal text-[#737373]  leading-[21.79px] tracking-[-0.02em]">
            You have found{" "}
            <span className="text-[#232323] font-bold">
              {calendarListData1?.filteredCalendar?.length}{" "}
            </span>
            events according to your category{" "}
          </h1>
          <div className="flex flex-col gap-4 mt-4 overflow-y-auto pr-4 h-96">
            {loadingCalendarListDat && (
              <div className="flex flex-col gap-4">
                <div
                  className={`p-2 animate-pulse bg-[#D7D7D7] rounded h-20 w-full}`}
                ></div>
                <div
                  className={`p-2 animate-pulse bg-[#D7D7D7] rounded h-20 w-full}`}
                ></div>
                <div
                  className={`p-2 animate-pulse bg-[#D7D7D7] rounded h-20 w-full}`}
                ></div>
              </div>
            )}
            {calendarListData1?.filteredCalendar?.map(
              (value: any, index: any) => (
                <SingleCalenderData
                  data={value}
                  key={index}
                  loading={loadingCalendarListDat}
                  setSelectedDate={setSelectedDate}
                  selectedDate={selectedDate}
                  setSelectedSpacialDay={setSelectedSpacialDay}
                />
              )
            )}
          </div>
        </div>
        <div className="w-full border border-1 rounded-xl p-8">
          <div className="flex justify-between">
            <h1 className="text-[16px] font-semibold text-[#232323]  leading-[21.79px]">
              Your Selection - {selectedSpacialDay}
            </h1>
            <h1 className="text-[#129BFF]">
              {selectedDate
                ? moment(selectedDate).format("ll")
                : "No date selected"}
            </h1>
          </div>
          <h1 className="text-[14px] font-normal text-[#737373]  leading-[19.07px]">
            Your final bill will include the cost of all the additional slots,{" "}
          </h1>
          <div className="flex flex-col gap-2 mt-4 overflow-y-auto max-h-[396px]">
            {Object.keys(tableDataForSelectTopicalDay1 || {})?.map(
              (key: string, index: any) => (
                <div key={index} className="pr-4">
                  <div className="flex justify-between">
                    <h1 className="text-[16px] font-normal text-[#232323]  leading-[21.79px] pb-2">
                      {key}
                    </h1>
                    <h1
                      className={`${
                        key === "Total Budget"
                          ? "text-[#1297E2]"
                          : "text-[#CC1C1C]"
                      } text-[14px] leading-[21.79px] tracking-[-0.02em]`}
                    >
                      {key === "per slot price" ||
                      key === "Total Budget" ||
                      key === "CPM"
                        ? "\u20B9 "
                        : ""}
                      {!isNaN(Number(tableDataForSelectTopicalDay1[key]))
                        ? formatNumber(
                            Number(tableDataForSelectTopicalDay1[key]).toFixed(
                              0
                            )
                          )
                        : tableDataForSelectTopicalDay1[key]}
                      {key === "Campaign Duration" ? " Days" : ""}
                    </h1>
                  </div>
                  <div className="border border-1"></div>
                </div>
              )
            )}
          </div>
          <h1 className="text-[#E90707] text-[14px] leading-[21.79px] mt-4">
            Note - These Fields Are Subject To Change When You <br /> Proceed
            For Optimizing This Plan
          </h1>
        </div>
      </div>
      <div className="flex justify-end mt-4">
        <button
          className="px-8 py-2 bg-[#1297E2] text-[#FFFFFF] rounded-md"
          onClick={handleOpenModel}
        >
          Proceed To Cost Optimization
        </button>
      </div>
    </div>
  );
};

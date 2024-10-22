import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Select } from "antd";
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

function SingleCalenderData({ data }: any) {
  const getDay = (date: string) => {
    return moment(date).format("ll");
  };
  return (
    <div className="flex justify-between hover:border hover:border-1 hover:border-blue-500 hover:text-blue-500 py-4 px-4 rounded-lg">
      <div className="flex gap-2">
        <div className="rounded-[100%] h-8 w-8 p-2 bg-gray-100 i justify-center">
          <i className="fi fi-ss-cake-birthday text-[#28A61D] "></i>
        </div>
        <div>
          <h1>{data?.specialDay}</h1>
          <h1 className="text-[#737373] text-[13px] ">
            your final bill will include the cost of all
          </h1>
        </div>
      </div>
      <div className="flex gap-4">
        <div>
          <h1 className="text-[24px]">
            {getDay(data?.date).split(" ")[1]?.split(",")[0]}
          </h1>
          <h1 className="text-[#737373] text-[13px] ">
            {getDay(data?.date).split(" ")[0]}
          </h1>
        </div>
        <input title="month" type="checkbox" className="text-[24px]" />
      </div>
    </div>
  );
}

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
  const [dummay, setDummat] = useState<any>([1, 2, 3, 4, 5, 6]);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const [month, setMonth] = useState<any>(new Date().getMonth());

  const [idCampaign, setCampaignId] = useState<any>(campaignId || "");

  const [data, setData] = useState<any>({
    "Campaign Duration": "1 Day",
    "Total Cities": "03",
    "Total Touchpoints": "40",
    "Total Sites": "70",
    "Avg Impression Per Day": "100k",
    "Total Slots": "2000",
    "Slot Duration": "10 sec in 3 mins",
    "per slot price": "₹200",
    CPM: "₹0.2",
    "Total Budget": "₹2,80,000",
  });
  const [category, setCategory] = useState<string>("");

  const industryCategory = useSelector((state: any) => state.industryCategory);
  const {
    loading: loadingCategory,
    error: errorScreenSummaryPlanTable,
    data: industryCategoryData,
  } = industryCategory;
  // tableDataForSelectTopicalDay
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

  const handleCancel = useCallback(() => {
    setIsOpen(false);
  }, [isOpen]);

  const handleOpenModel = useCallback(() => {
    setIsOpen(true);
  }, [isOpen]);

  useEffect(() => {
    // dispatch(getTableDataForSelectTopicalDayPage({ impactFactor: 0.2 }));
  }, [dispatch]);

  useEffect(() => {
    dispatch(
      getCalendarListData({
        startDate: "2024-04-5",
        endDate: "2024-09-28",
        category: [category],
      })
    );
  }, [category]);

  useEffect(() => {
    dispatch(getIndustryCategory({ category: [], industry: [] }));
  }, []);


  const handleRangeChange = (startMonth: string, endMonth: string) => {
    console.log(`Selected range: ${startMonth} to ${endMonth}`);
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
        <div className="pt-5">
          <MonthRangeSlider
            // min={1} max={12} onChange={() => {}}
            setMonth={setMonth}
            months={12}
            month={month}
          />
        </div>

      </div>
      <div className="flex gap-8">
        <div className="w-full border border-1 rounded-xl p-8">
          <h1>Topical days in feb </h1>
          <h1 className="text-[#888888]">
            You have found {calendarListData1?.filteredCalendar?.length} events
            according to your category{" "}
          </h1>
          <div className="flex flex-col gap-4 mt-4 overflow-y-auto h-96">
            {calendarListData1?.filteredCalendar?.map(
              (value: any, index: any) => (
                <div key={index}>
                  <SingleCalenderData data={value} />
                  <div className="border border-1"></div>
                </div>
              )
            )}
          </div>
        </div>
        <div className="w-full border border-1 rounded-xl p-8">
          <div className="flex justify-between">
            <h1>your selection - Vivekananda Jayanti</h1>
            <h1 className="text-blue-500">2 Feb 2024</h1>
          </div>
          <h1 className="text-[#888888] text-[14px] py-2">
            your final bill will include the cost of all the additional slots,{" "}
          </h1>
          <div className="flex flex-col gap-4 mt-4 overflow-y-auto h-96">
            {Object.keys(tableDataForSelectTopicalDay1 || {})?.map(
              (key: string, index: any) => (
                <div key={index}>
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
            for optimising this plan
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

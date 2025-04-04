import React, { useEffect, useState } from "react";
import { AdsPlayTimeTabData } from "../../utils/hardCoddedData";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { Footer } from "../../components/footer";
import {
  AdsPlaySelectedSummaryTable,
  AdsPlayTimeTable,
} from "../../components/tables";
import { addDetailsToCreateCampaign } from "../../actions/campaignAction";
import {
  getPlanningPageFooterData,
  getTableDataScreenWiseAdPlayTime,
} from "../../actions/screenAction";
import { ADD_DETAILS_TO_CREATE_CAMPAIGN_RESET } from "../../constants/campaignConstants";
import { CustomTabWithSelectAll } from "../../components/molecules/CustomTabWithSelectAll";
import { LoadingScreen } from "../../components/molecules/LoadingScreen";

interface SelectionStats {
  selected: {
    morning: number;
    afternoon: number;
    evening: number;
    night: number;
  };
  totalScreens: number;
  totalPossibleSelections: number;
  byDayType: {
    weekdays: {
      morning: number;
      afternoon: number;
      evening: number;
      night: number;
    };
    saturdays: {
      morning: number;
      afternoon: number;
      evening: number;
      night: number;
    };
    sundays: {
      morning: number;
      afternoon: number;
      evening: number;
      night: number;
    };
  };
}
interface Tab {
  label: string;
  id: string;
}

interface TimeData {
  percentage: number;
  included: boolean;
}

interface DayData {
  morning: TimeData;
  afternoon: TimeData;
  evening: TimeData;
  night: TimeData;
}

interface DayWiseData {
  weekdays: DayData;
  saturdays: DayData;
  sundays: DayData;
}

interface ScreenData {
  screenName: string;
  dayWiseData: DayWiseData;
}

interface ResultData {
  touchPoint: string;
  screenData: ScreenData[];
}

interface EnterCampaignBasicDetailsProps {
  setCurrentStep: (step: number) => void;
  step: number;
  campaignId?: any;
  successAddCampaignDetails?: any;
  loading?: any;
  pageSuccess?: boolean;
  setPageSuccess?: any;
}

export const SetAdsPlayTime = ({
  setCurrentStep,
  step,
  campaignId,
  successAddCampaignDetails,
  pageSuccess = false,
  setPageSuccess,
}: EnterCampaignBasicDetailsProps) => {
  const dispatch = useDispatch<any>();
  const { pathname } = useLocation();
  const [pageLoading, setPageLoading] = useState<boolean>(true);
  const [currentTab, setCurrentTab] = useState<keyof DayWiseData>("weekdays");

  const tableDataScreenWiseAdPlayTimeGet = useSelector(
    (state: any) => state.tableDataScreenWiseAdPlayTimeGet
  );
  const {
    loading: loadingTableData,
    error,
    data: tableData,
  } = tableDataScreenWiseAdPlayTimeGet;

  const [data, setData] = useState<ResultData[]>([]);

  // Calculate stats based on current data
  const calculateSelectionStats = (data: ResultData[]): SelectionStats => {
    if (!data || data.length === 0) return { 
      selected: { morning: 0, afternoon: 0, evening: 0, night: 0 },
      totalScreens: 0,
      totalPossibleSelections: 0,
      byDayType: {
        weekdays: { morning: 0, afternoon: 0, evening: 0, night: 0 },
        saturdays: { morning: 0, afternoon: 0, evening: 0, night: 0 },
        sundays: { morning: 0, afternoon: 0, evening: 0, night: 0 }
      }
    };
  
    let morningSelected = 0;
    let afternoonSelected = 0;
    let eveningSelected = 0;
    let nightSelected = 0;
    let totalPossibleSelections = 0;
    let totalScreens = 0;
  
    const dayTypes = ['weekdays', 'saturdays', 'sundays'] as const;
    const byDayType = {
      weekdays: { morning: 0, afternoon: 0, evening: 0, night: 0 },
      saturdays: { morning: 0, afternoon: 0, evening: 0, night: 0 },
      sundays: { morning: 0, afternoon: 0, evening: 0, night: 0 }
    };
  
    data.forEach((touchPoint) => {
      touchPoint.screenData.forEach((screen) => {
        totalScreens++;
        
        dayTypes.forEach(dayType => {
          totalPossibleSelections++;
          const dayData = screen.dayWiseData[dayType];
  
          if (dayData?.morning?.included) {
            morningSelected++;
            byDayType[dayType].morning++;
          }
          if (dayData?.afternoon?.included) {
            afternoonSelected++;
            byDayType[dayType].afternoon++;
          }
          if (dayData?.evening?.included) {
            eveningSelected++;
            byDayType[dayType].evening++;
          }
          if (dayData?.night?.included) {
            nightSelected++;
            byDayType[dayType].night++;
          }
        });
      });
    });
  
    const calculatePercentage = (count: number, total: number) => 
      total > 0 ? (count / total) * 100 : 0;
  
    return {
      selected: {
        morning: calculatePercentage(morningSelected, totalPossibleSelections),
        afternoon: calculatePercentage(afternoonSelected, totalPossibleSelections),
        evening: calculatePercentage(eveningSelected, totalPossibleSelections),
        night: calculatePercentage(nightSelected, totalPossibleSelections),
      },
      totalScreens,
      totalPossibleSelections,
      byDayType: {
        weekdays: {
          morning: calculatePercentage(byDayType.weekdays.morning, totalScreens),
          afternoon: calculatePercentage(byDayType.weekdays.afternoon, totalScreens),
          evening: calculatePercentage(byDayType.weekdays.evening, totalScreens),
          night: calculatePercentage(byDayType.weekdays.night, totalScreens),
        },
        saturdays: {
          morning: calculatePercentage(byDayType.saturdays.morning, totalScreens),
          afternoon: calculatePercentage(byDayType.saturdays.afternoon, totalScreens),
          evening: calculatePercentage(byDayType.saturdays.evening, totalScreens),
          night: calculatePercentage(byDayType.saturdays.night, totalScreens),
        },
        sundays: {
          morning: calculatePercentage(byDayType.sundays.morning, totalScreens),
          afternoon: calculatePercentage(byDayType.sundays.afternoon, totalScreens),
          evening: calculatePercentage(byDayType.sundays.evening, totalScreens),
          night: calculatePercentage(byDayType.sundays.night, totalScreens),
        }
      }
    };
  };

  const summaryStats = calculateSelectionStats(data);
  const mainTableStats = calculateSelectionStats(data).byDayType[currentTab];

  const handleSaveAndContinue = async (e: any) => {
    e.preventDefault();
    if (!pathname.split("/").includes("view")) {
      dispatch(
        addDetailsToCreateCampaign({
          pageName: "Set Ad Play time Page",
          id: pathname.split("/").splice(-1)[0],
          touchPointWiseDetails: data,
        })
      );
      setPageSuccess(false);
    }
    setCurrentStep(step + 1);
  };

  // Set page success when campaign details are successfully added
  useEffect(() => {
    if (successAddCampaignDetails) {
      dispatch({ type: ADD_DETAILS_TO_CREATE_CAMPAIGN_RESET });
      setPageSuccess(true);
    }
  }, [successAddCampaignDetails, dispatch, setPageSuccess]);

  // Load data when component mounts or when campaignId changes
  useEffect(() => {
    if (!pageSuccess) return;
    dispatch(getTableDataScreenWiseAdPlayTime({ id: campaignId }));
    dispatch(getPlanningPageFooterData({
      id: campaignId,
      pageName: "Set Ad Play time Page",
    }));

  }, [dispatch, pageSuccess, campaignId]);

  // Update local data state when tableData changes
  useEffect(() => {
    if (tableData?.result) {
      setData(tableData.result);
      setPageLoading(false);
    }
  }, [tableData]);

  const toggleAllIncludesByCurrentTab = (
    included: boolean,
    currentTab: keyof DayWiseData
  ) => {
    setData((prevData) =>
      prevData.map((d) => ({
        ...d,
        screenData: d.screenData.map((d1) => ({
          ...d1,
          dayWiseData: {
            ...d1.dayWiseData,
            [currentTab]: {
              morning: { ...d1.dayWiseData[currentTab].morning, included },
              afternoon: { ...d1.dayWiseData[currentTab].afternoon, included },
              evening: { ...d1.dayWiseData[currentTab].evening, included },
              night: { ...d1.dayWiseData[currentTab].night, included },
            },
          },
        })),
      }))
    );
  };

  return (
    <div className="w-full">
      {pageLoading ? (
        <LoadingScreen />
      ) : error ? (
        <div className="p-4 bg-red-300 text-[#FFFFFF]">
          Something went wrong! Please refresh the page...
        </div>
      ) : (
        <div className="w-full">
          <h1 className="text-[24px] font-semibold">Set Ads Play time</h1>
          <h1 className="text-sm text-gray-500">
            Your final bill will include the cost of all the additional slots,
            at the same cost that your slots were booked.
          </h1>
          <div className="mt-4">
            <CustomTabWithSelectAll
              currentTab={currentTab}
              setCurrentTab={setCurrentTab}
              tabData={AdsPlayTimeTabData}
              handleClick={toggleAllIncludesByCurrentTab}
            />
          </div>
          <div className="mt-2">
            <AdsPlayTimeTable
              currentTab={currentTab}
              data={data}
              setData={setData}
              bottomTableData={tableData?.bottomTableData}
              totals={mainTableStats}
            />
          </div>
          <h1 className="text-xl py-4">Selected summary</h1>
          <div className="mt-2 pb-20">
            <AdsPlaySelectedSummaryTable
              resultData={data}
              totals={summaryStats}
            />
          </div>

          <div className="px-4 fixed bottom-0 left-0 w-full bg-[#FFFFFF]">
            <Footer
              mainTitle="Continue"
              handleBack={() => setCurrentStep(step - 1)}
              handleSave={handleSaveAndContinue}
              campaignId={campaignId}
              pageName="Set Ad Play time Page"
            />
          </div>
        </div>
      )}
    </div>
  );
};
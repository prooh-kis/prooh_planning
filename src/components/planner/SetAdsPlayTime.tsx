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

interface BottomTableData {
  selected: {
    morning: number;
    afternoon: number;
    evening: number;
    night: number;
  };
  totalTable: {
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
  pageSuccess,
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

  const handleSaveAndContinue = async (e: any) => {
    e.preventDefault();
    dispatch(
      addDetailsToCreateCampaign({
        pageName: "Set Ad Play time Page",
        id: pathname.split("/").splice(-1)[0],
        touchPointWiseDetails: data,
      })
    );
    setPageSuccess(false);
    setCurrentStep(step + 1);
  };

  useEffect(() => {
    if (tableData) {
      setData(tableData?.result);
      setPageLoading(false);
    }
  }, [tableData]);

  useEffect(() => {
    if (!pageSuccess) return;
    dispatch(getTableDataScreenWiseAdPlayTime({ id: campaignId }));
    dispatch(
      getPlanningPageFooterData({
        id: campaignId,
        pageName: "Set Ad Play time Page",
      })
    );
  }, [dispatch, campaignId, pageSuccess]);

  useEffect(() => {
    if (successAddCampaignDetails && !loadingTableData) {
      setPageSuccess(true);
      dispatch({ type: ADD_DETAILS_TO_CREATE_CAMPAIGN_RESET });
    }
  }, [successAddCampaignDetails, loadingTableData]);

  const toggleAllIncludesByCurrentTab = (
    included: boolean,
    currentTab: keyof DayWiseData
  ) => {
    setData((prevData: any) =>
      prevData.map((d: ResultData, i: number) => {
        return {
          ...d,
          screenData: d.screenData.map((d1: ScreenData, j: number) => {
            return {
              ...d1,
              dayWiseData: {
                ...d1.dayWiseData,
                [currentTab]: {
                  morning: {
                    ...d1.dayWiseData[currentTab].morning,
                    included: included,
                  },
                  afternoon: {
                    ...d1.dayWiseData[currentTab].afternoon,
                    included: included,
                  },
                  evening: {
                    ...d1.dayWiseData[currentTab].evening,
                    included: included,
                  },
                  night: {
                    ...d1.dayWiseData[currentTab].night,
                    included: included,
                  },
                },
              },
            };
          }),
        };
      })
    );
  };

  return (
    <div className="w-full py-3">
      {pageLoading ? (
        <LoadingScreen />
      ) : error ? (
        <div className="p-4 bg-red-300 text-[#FFFFFF] ">
          Something went wrong! please refresh the page...
        </div>
      ) : (
        <div className="w-full py-3">
          <h1 className="text-[24px] font-semibold ">Set Ads Play time</h1>
          <h1 className="text-sm text-gray-500 ">
            your final bill will include the cost of all the additional slots,
            at the same cost that your slots were booked.
          </h1>
          <div className="">
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
            />
          </div>
          <h1 className="text-xl py-4">Selected summary</h1>
          <div className="mt-2 pb-20">
            <AdsPlaySelectedSummaryTable
              currentTab={currentTab}
              resultData={tableData?.result}
              bottomTableData={tableData?.bottomTableData}
            />
          </div>

          <div className="px-4 fixed bottom-0 left-0 w-full bg-[#FFFFFF]">
            <Footer
              handleBack={() => {
                setCurrentStep(step - 1);
              }}
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

import { TabWithIcon } from "../molecules/TabWithIcon";
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
import { getPlanningPageFooterData, getTableDataScreenWiseAdPlayTime } from "../../actions/screenAction";
import { Loading } from "../../components/Loading";

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
}

export const SetAdsPlayTime = ({
  setCurrentStep,
  step,
  campaignId,
}: EnterCampaignBasicDetailsProps) => {
  const dispatch = useDispatch<any>();
  const { pathname } = useLocation();

  const [currentTab, setCurrentTab] = useState<keyof DayWiseData>("weekdays");
  // const [data, setData] = useState<ResultData[]>([]);

  const tableDataScreenWiseAdPlayTimeGet = useSelector(
    (state: any) => state.tableDataScreenWiseAdPlayTimeGet
  );
  const { loading, error, data: tableData } = tableDataScreenWiseAdPlayTimeGet;

  const [data, setData] = useState<ResultData[]>(tableData?.result);
  const [bottomTableData, setBottomTableData] = useState<BottomTableData>(
    tableData?.bottomTableData
  );

  // const tableDataSetAdPlayTimeStore = useSelector(
  //   (state: any) => state.tableDataSetAdPlayTimeStore
  // );
  // const {
  //   loading: loadingSetPlayAdTime,
  //   error: errorSetPlayAdTime,
  //   data: bottomTableData,
  // } = tableDataSetAdPlayTimeStore;

  const handleSaveAndContinue = async (e: any) => {
    e.preventDefault();
    setTimeout(() => {
      dispatch(
        addDetailsToCreateCampaign({
          pageName: "Set Ad Play time Page",
          id: pathname.split("/").splice(-1)[0],
          touchPointWiseDetails: data,
        })
      );
      setCurrentStep(step + 1);
      console.log("data : ", data);
    }, 0);
  };

  useEffect(() => {
    if (tableData) {
      setData(tableData?.result);
      setBottomTableData(tableData?.bottomTableData);
    }
  }, [tableData]);

  useEffect(() => {
    dispatch(getTableDataScreenWiseAdPlayTime({ id: campaignId }));
    dispatch(getPlanningPageFooterData({
      id: campaignId,
      pageName: "Set Ad Play time Page",
    }));
  }, [dispatch, campaignId]);

  // useEffect(() => {
  //   if (data) {
  //     dispatch(
  //       tableDataSetAdPlayTime({
  //         touchPointScreenWiseData: tableData?.result,
  //         id: campaignId,
  //       })
  //     );
  //     console.log("successfullt dispatch");
  //     console.log("tableData  4444: ", data);
  //   }
  // }, [tableData, campaignId]);

  return (
    <div className="w-full py-3">
      <h1 className="text-3xl ">Set Ads Play time</h1>
      <h1 className="text-sm text-gray-500 ">
        your final bill will include the cost of all the additional slots, at
        the same cost that your slots were booked.
      </h1>
      <div className="mt-2">
        <TabWithIcon
          currentTab={currentTab}
          setCurrentTab={setCurrentTab}
          tabData={AdsPlayTimeTabData}
        />
      </div>
      {loading ? (
        <Loading />
      ) : error ? (
        <p></p>
      ) : (
        <div className="mt-2">
          <AdsPlayTimeTable
            currentTab={currentTab}
            data={data}
            setData={setData}
            bottomTableData={tableData?.bottomTableData}
          />
        </div>
      )}

      <h1 className="text-xl py-4">Selected summary</h1>
      {loading ? (
        <Loading />
      ) : error ? (
        <p></p>
      ) : (
        <div className="mt-2">
          <AdsPlaySelectedSummaryTable
            currentTab={currentTab}
            bottomTableData={tableData?.bottomTableData}
          />
        </div>
      )}

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
  );
};

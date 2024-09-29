import { useEffect, useState } from "react";
import { PrimaryButton } from "../atoms/PrimaryButton";
import { PrimaryInput } from "../atoms/PrimaryInput";
import { useNavigate } from "react-router-dom";
import { CalendarInput } from "../atoms/CalendarInput";
import { getNumberOfDaysBetweenTwoDates } from "../../utils/dateAndTimeUtils";
import { CampaignPlaningFooter } from "../CampaignPlaningFooter";


import { getAllLocalStorageData, saveDataOnLocalStorage } from "../../utils/localStorageUtils";
import { AudienceCohortTable, CostSummaryTable1, LocationTable, TouchpointTable } from "../tables";
import { audienceCohortData, touchpointData } from "../../data";
import { useDispatch, useSelector } from "react-redux";
import { getScreenDataByAudiences } from "../../actions/screenAction";
import { Message } from "../Message";
import { Loading } from "../Loading";

interface EnterAudienceTouchpointDetailsProps {
  setCurrentStep: (step: number) => void;
  step: number;
  data: any;
  loading?: boolean;
  error?: any;
}

export const AudienceTouchPointsDetails = ({ setCurrentStep, step, data, error }: EnterAudienceTouchpointDetailsProps) => {
  const navigate = useNavigate();
  const dispatch = useDispatch<any>();

  const [audienceScreenData, setAudienceScreenData] = useState<any>({});
  const [markets, setMarkets] = useState<any>({});
  const [audiences, setAudiences] = useState<any>({});
  const [touchPoints, setTouchPoints] = useState<any>({});

  const [totalScreens, setTotalScreens] = useState<any>(0);

  const getMatchedData = (myData: any) => {
    setMarkets(myData);

    let audiencesData: any = {};
    for (const market in myData) {
      for (const audience in myData[market]["audience"]) {
        audiencesData[audience] = (Number(myData[market]["audience"][audience]["Male"]) + Number(myData[market]["audience"][audience]["Female"]) / 2).toFixed(2);
      }
    }
    setAudiences(audiencesData);

    let touchpointsData: any = {};
    let totalScreens = 0;
    for (const market in myData) {
      for (const touchPoint in myData[market]["touchpoint"]) {
        touchpointsData[touchPoint] = {
          "screens": Object.keys(myData[market]["touchpoint"][touchPoint]),
          "gender": {},
        }
        for (const screen in myData[market]["touchpoint"][touchPoint]) {
          let totalMale = 0;
          let totalFemale = 0;
          let count = 0;
          totalScreens++;

          for (const group in myData[market]["touchpoint"][touchPoint][screen]) {
              totalMale += Number(myData[market]["touchpoint"][touchPoint][screen][group]["Male"]) || 0;
              totalFemale += Number(myData[market]["touchpoint"][touchPoint][screen][group]["Female"]) || 0;
              count++;
          }
          console.log(Number(totalMale))
           // Calculate the average for each gender
           const avgMale = (totalMale / count).toFixed(2);
           const avgFemale = (totalFemale / count).toFixed(2);

          touchpointsData[touchPoint].gender = {
            "Male": avgMale,
            "Female": avgFemale
          };
          setTotalScreens(totalScreens);
        }
      }
    }
    setTouchPoints(touchpointsData);

    return {audiencesData, touchpointsData};
  }


  useEffect(() => {
  
    if (getAllLocalStorageData()) {
      setAudienceScreenData(JSON.parse(getAllLocalStorageData()["screen_audience_data_1"]));
      getMatchedData(JSON.parse(getAllLocalStorageData()["screen_audience_data_1"]).marketData)
    }

  }, [])


  return (
    <div className="w-full py-3">
      <div>
        <h1 className="text-[24px] text-primaryText font-semibold">
          Select Target Audiences and Touchpoints
        </h1>
        <p className="text-[14px] text-secondaryText">
          Choose the audiences you want to target at your desired touchpoints
        </p>
      </div>
      <div className="grid grid-cols-8 gap-1 pt-4">
        <div className="col-span-2 flex justify-center">
          <LocationTable markets={markets} />
        </div>
        <div className="col-span-3 flex justify-center">
          <AudienceCohortTable audiences={audiences} />
        </div>
        <div className="col-span-3 flex justify-center">
          <TouchpointTable totalScreens={totalScreens} touchPoints={touchPoints} />
        </div>
      </div>
      <div className="pt-2">
        <CostSummaryTable1 />
      </div>
      <div className="flex justify-start items-center gap-2 pt-2">
        <i className="fi fi-sr-lightbulb-on text-[#FFB904]"></i>
        <h1 className="text-[14px] text-[#178967]">
          Prooh Tip:- select target audience and select select target audience
          and location target audience and location location
        </h1>
      </div>
      <CampaignPlaningFooter
        handleBack={() => {
          setCurrentStep(step - 1);
        }}
        handleSave={() => {
          setCurrentStep(step + 1);
        }}
      />
    </div>
  );
};

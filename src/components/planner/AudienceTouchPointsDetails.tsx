import { useEffect, useState } from "react";
import { PrimaryButton } from "../atoms/PrimaryButton";
import { PrimaryInput } from "../atoms/PrimaryInput";
import { useNavigate } from "react-router-dom";
import { CalendarInput } from "../atoms/CalendarInput";
import { getNumberOfDaysBetweenTwoDates } from "../../utils/dateAndTimeUtils";


import { getAllLocalStorageData, saveDataOnLocalStorage } from "../../utils/localStorageUtils";
import { AudienceCohortTable, CostSummaryTable1, LocationTable, TouchpointTable } from "../tables";
import { audienceCohortData, touchpointData } from "../../data";
import { useDispatch, useSelector } from "react-redux";
import { Message } from "../Message";
import { Loading } from "../Loading";
import { Footer } from "../../components/footer";
import { getScreensCostData } from "../../actions/screenAction";

interface EnterAudienceTouchpointDetailsProps {
  setCurrentStep: (step: number) => void;
  step: number;
  data?: any;
  loading?: boolean;
  error?: any;
}

export const AudienceTouchPointsDetails = ({ setCurrentStep, step, error }: EnterAudienceTouchpointDetailsProps) => {
  const navigate = useNavigate();
  const dispatch = useDispatch<any>();

  const [markets, setMarkets] = useState<any>({});
  const [audiences, setAudiences] = useState<any>({});
  const [touchPoints, setTouchPoints] = useState<any>({});

  const [totalScreensData, setTotalScreensData] = useState<any>({});
  const [selectedScreensData, setSelectedScreensData] = useState<any>({});

  const [selectedMarket, setSelectedMarket] = useState<any>([]);
  const [selectedGender, setSelectedGender] = useState<any>(["Male", "Female"]);
  const [selectedAudiences, setSelectedAudiences] = useState<any>([]);
  const [selectedTouchPoints, setSelectedTouchPoints] = useState<any>([]);

  

  const getMatchedData = (myData: any) => {
    setMarkets(myData);
    let audiencesData: any = {};
    for (const market in myData) {
      for (const audience in myData[market]["audience"]) {
        // console.log(audience);
        // console.log(myData[market]["audience"][audience]);
        audiencesData[audience] = myData[market]["audience"][audience]["Total"].toFixed(2)
      }
    }
    setAudiences(audiencesData);
    setSelectedAudiences(Object.keys(audiencesData));
    let touchpointsData: any = {};
    for (const market in myData) {
      for (const touchPoint in myData[market]["touchPoint"]) {
        touchpointsData[touchPoint] = {
          "Screen": myData[market]["touchPoint"][touchPoint].screenPercent,
          "Female": myData[market]["touchPoint"][touchPoint].femaleAudiencePercent,
          "Male": myData[market]["touchPoint"][touchPoint].maleAudiencePercent,
          "Audience": myData[market]["touchPoint"][touchPoint].audiencePercent,
        }
        
      }
    }
    setTouchPoints(touchpointsData);
    setSelectedTouchPoints(Object.keys(touchpointsData));

    return {audiencesData, touchpointsData};
  }

  const getCostData = (myData: any) => {
    setTotalScreensData(myData);
    setSelectedScreensData(myData);
  }


  useEffect(() => {
  
    if (getAllLocalStorageData()) {
      getMatchedData(JSON.parse(getAllLocalStorageData()["audienceData"]))
      getCostData(JSON.parse(getAllLocalStorageData()["totalScreenCostData"]))

    }
    dispatch(getScreensCostData({
      cohorts: selectedAudiences,
      touchPoints: selectedTouchPoints,
      duration: 30,
      gender: selectedGender.length === 1 && selectedGender.includes("Male") ? "male" : selectedGender.length === 1 && selectedGender.includes("Female") ? "female" : "both"
    }));

  }, [dispatch])


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
          <LocationTable
            markets={markets}
            selectedMarkets={selectedMarket}
            selectedGender={selectedGender}
            setSelectedGender={setSelectedGender}
          />
        </div>
        <div className="col-span-3 flex justify-center">
          <AudienceCohortTable
            audiences={audiences}
            selectedAudiences={selectedAudiences}
            setSelectedAudiences={setSelectedAudiences}
          />
        </div>
        <div className="col-span-3 flex justify-center">
          <TouchpointTable
            touchPoints={touchPoints}
            selectedTouchPoints={selectedTouchPoints}
            setSelectedTouchPoints={setSelectedTouchPoints}
            selectedGender={selectedGender}
          />
        </div>
      </div>
      <div className="pt-2">
        <CostSummaryTable1
          totalData={totalScreensData}
          selectedData={selectedScreensData}
        />
      </div>
      <div className="flex justify-start items-center gap-2 pt-2">
        <i className="fi fi-sr-lightbulb-on text-[#FFB904]"></i>
        <h1 className="text-[14px] text-[#178967]">
          Prooh Tip:- select target audience and select select target audience
          and location target audience and location location
        </h1>
      </div>
      {/* <Footer
        handleBack={() => {
          setCurrentStep(step - 1);
        }}
        handleSave={() => {
          setCurrentStep(step + 1);
        }}
      /> */}
    </div>
  );
};

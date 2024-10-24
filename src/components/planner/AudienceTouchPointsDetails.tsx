import { useCallback, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  getAllLocalStorageData,
  getDataFromLocalStorage,
  saveDataOnLocalStorage,
} from "../../utils/localStorageUtils";
import {
  AudienceCohortTable,
  CostSummaryTable1,
  LocationTable,
  TouchpointTable,
} from "../tables";
import { useDispatch, useSelector } from "react-redux";
import { Footer } from "../../components/footer";
import { getScreenDataForAdvanceFilters, getScreensCostData } from "../../actions/screenAction";
import { AUDIENCE_DATA, CAMPAIGN, COST_SUMMARY, FULL_CAMPAIGN_PLAN, SELECTED_AUDIENCE_TOUCHPOINTS, TOTAL_SCREEN_COST_DATA } from "../../constants/localStorageConstants";
import { addDetailsToCreateCampaign } from "../../actions/campaignAction";
import { ALL_COHORTS, ALL_MARKETS, ALL_TOUCHPOINTS } from "../../constants/helperConstants";

interface EnterAudienceTouchpointDetailsProps {
  setCurrentStep: (step: number) => void;
  step: number;
  data?: any;
  loading?: boolean;
  error?: any;
  marketRef?: any;
  audienceRef?: any;
  touchpointRef?: any;
  campaignId?: any;
}

export const AudienceTouchPointsDetails = ({
  setCurrentStep,
  step,
  error,
  marketRef,
  audienceRef,
  touchpointRef,
  campaignId,
}: EnterAudienceTouchpointDetailsProps) => {
  const navigate = useNavigate();
  const dispatch = useDispatch<any>();

  const [markets, setMarkets] = useState<any>({});
  const [audiences, setAudiences] = useState<any>({});
  const [touchPoints, setTouchPoints] = useState<any>({});

  const [totalScreensData, setTotalScreensData] = useState<any>({});
  const [selectedScreensData, setSelectedScreensData] = useState<any>({});

  const [selectedMarket, setSelectedMarket] = useState<any>(getDataFromLocalStorage(FULL_CAMPAIGN_PLAN)?.[campaignId]?.markets || []);
  const [selectedGender, setSelectedGender] = useState<any>(
    getDataFromLocalStorage(FULL_CAMPAIGN_PLAN)?.[campaignId]?.gender === "male" ? ["Male"] :
    getDataFromLocalStorage(FULL_CAMPAIGN_PLAN)?.[campaignId]?.gender === "female" ? ["Female"] : ["Male", "Female"]
  );
  const [selectedAudiences, setSelectedAudiences] = useState<any>(getDataFromLocalStorage(FULL_CAMPAIGN_PLAN)?.[campaignId]?.cohorts || []);
  const [selectedTouchPoints, setSelectedTouchPoints] = useState<any>(getDataFromLocalStorage(FULL_CAMPAIGN_PLAN)?.[campaignId]?.touchPoints || []);

  const screensAudiencesDataGet = useSelector(
    (state: any) => state.screensAudiencesDataGet
  );
  const {
    loading: loadingAudiences,
    error: errorAudiences,
    data: screensAudiences,
  } = screensAudiencesDataGet;

  const screensCostDataGet = useSelector(
    (state: any) => state.screensCostDataGet
  );
  const {
    loading: loadingCost,
    error: errorCost,
    data: screensCost,
  } = screensCostDataGet;

  const getMatchedData = (myData: any) => {
    setMarkets(myData);
    
    let audiencesData: any = {};
    for (const market in myData) {
      for (const audience in myData[market]["audience"]) {
        audiencesData[audience] =
          myData[market]["audience"][audience]["Total"].toFixed(2);
      }
    }
    setAudiences(audiencesData);
    setSelectedAudiences(
      getDataFromLocalStorage(FULL_CAMPAIGN_PLAN)?.[campaignId]?.cohorts.length !== 0 ?
      getDataFromLocalStorage(FULL_CAMPAIGN_PLAN)?.[campaignId]?.cohorts : Object.keys(audiencesData)
    );
    let touchPointsData: any = {};
    for (const market in myData) {
      for (const touchPoint in myData[market]["touchPoint"]) {
        touchPointsData[touchPoint] = {
          Screen: myData[market]["touchPoint"][touchPoint].screenPercent,
          Female:
            myData[market]["touchPoint"][touchPoint].femaleAudiencePercent,
          Male: myData[market]["touchPoint"][touchPoint].maleAudiencePercent,
          Audience: myData[market]["touchPoint"][touchPoint].audiencePercent,
        };
      }
    }
    setTouchPoints(touchPointsData);
    setSelectedTouchPoints(
      getDataFromLocalStorage(FULL_CAMPAIGN_PLAN)?.[campaignId]?.touchPoints.length !== 0 ?
      getDataFromLocalStorage(FULL_CAMPAIGN_PLAN)?.[campaignId]?.touchPoints : Object.keys(touchPointsData)
    );

    if (getDataFromLocalStorage(FULL_CAMPAIGN_PLAN)?.[campaignId]?.gender === "male") {
      setSelectedGender(["Male"]);
    } else if (getDataFromLocalStorage(FULL_CAMPAIGN_PLAN)?.[campaignId]?.gender === "female") {
      setSelectedGender(["Female"]);
    } else if (getDataFromLocalStorage(FULL_CAMPAIGN_PLAN)?.[campaignId]?.gender === "both") {
      setSelectedGender(["Male", "Female"]);
    }

    return { audiencesData, touchPointsData };
  };

  const setCostData = (myData: any) => {
    setTotalScreensData(myData);
    setSelectedScreensData(myData);
  };

  useEffect(() => {
    if (screensCost) {
      saveDataOnLocalStorage(TOTAL_SCREEN_COST_DATA, screensCost);
      setCostData(screensCost);
      saveDataOnLocalStorage(SELECTED_AUDIENCE_TOUCHPOINTS, {
        cohorts: selectedAudiences,
        touchPoints: selectedTouchPoints,
        gender: selectedGender.length === 1 && selectedGender.includes("Male")
          ? "male"
          : selectedGender.length === 1 && selectedGender.includes("Female")
          ? "female"
          : "both",
        duration: getDataFromLocalStorage(FULL_CAMPAIGN_PLAN)?.[campaignId]?.duration || 30,
      });
      
    }
  }, [screensCost]);

  useEffect(() => {

    dispatch(
      getScreensCostData({
        id: getDataFromLocalStorage(FULL_CAMPAIGN_PLAN)?.[campaignId]?._id,
        cohorts: getDataFromLocalStorage(FULL_CAMPAIGN_PLAN)?.[campaignId]?.cohorts.length !== 0 ? getDataFromLocalStorage(FULL_CAMPAIGN_PLAN)?.[campaignId]?.cohorts : ALL_COHORTS,
        touchPoints: getDataFromLocalStorage(FULL_CAMPAIGN_PLAN)?.[campaignId]?.touchPoints.length !== 0 ? getDataFromLocalStorage(FULL_CAMPAIGN_PLAN)?.[campaignId]?.touchPoints : ALL_TOUCHPOINTS,
        duration: getDataFromLocalStorage(FULL_CAMPAIGN_PLAN)?.[campaignId]?.duration,
        gender: getDataFromLocalStorage(FULL_CAMPAIGN_PLAN)?.[campaignId]?.gender !== "" ? getDataFromLocalStorage(FULL_CAMPAIGN_PLAN)?.[campaignId]?.gender : "both",
      })
    );

    dispatch(
      getScreenDataForAdvanceFilters({
        id: getDataFromLocalStorage(FULL_CAMPAIGN_PLAN)?.[campaignId]?._id,
        touchPoints: selectedTouchPoints,
      })
    );
  }, [dispatch]);

  useEffect(() => {
    if (
      screensAudiences 
    ) {
      getMatchedData(screensAudiences);
    } else {
      getMatchedData(
        getDataFromLocalStorage(AUDIENCE_DATA) || {}
      );
    }

    setCostData(
      getDataFromLocalStorage(TOTAL_SCREEN_COST_DATA) || {}
    );
  }, [screensAudiences]);

  const handleSelection = useCallback((input: any) => {
    dispatch(
      getScreensCostData({
        id: getDataFromLocalStorage(FULL_CAMPAIGN_PLAN)?.[campaignId]?._id,
        cohorts: input.type === "cohorts" ? input.data : selectedAudiences,
        touchPoints: input.type === "touchPoints" ? input.data : selectedTouchPoints,
        duration: getDataFromLocalStorage(FULL_CAMPAIGN_PLAN)?.[campaignId]?.duration,
        gender: input.type === "gender" ? input.data :
          selectedGender.length === 1 && selectedGender.includes("Male")
            ? "male"
            : selectedGender.length === 1 && selectedGender.includes("Female")
            ? "female"
            : "both",
      })
    );
  },[campaignId, dispatch, selectedAudiences, selectedGender, selectedTouchPoints])

  return (
    <div className="w-full py-3">
      <div>
        <h1 className="text-[24px] text-primaryText font-semibold">
          Select Target Audiences and TouchPoints
        </h1>
        <p className="text-[14px] text-secondaryText">
          Choose the audiences you want to target at your desired touchPoints
        </p>
      </div>
      <div className="grid grid-cols-8 gap-1 pt-4">
        <div ref={marketRef} className="col-span-2 flex justify-center">
          <LocationTable
            markets={markets}
            handleSelection={handleSelection}
            selectedMarkets={selectedMarket}
            selectedGender={selectedGender}
            setSelectedGender={setSelectedGender}
          />
          
        </div>
        <div ref={audienceRef} className="col-span-3 flex justify-center">
          <AudienceCohortTable
            handleSelection={handleSelection}
            audiences={audiences}
            selectedAudiences={selectedAudiences}
            setSelectedAudiences={setSelectedAudiences}
          />

        </div>
        <div ref={touchpointRef} className="col-span-3 flex justify-center">
          <TouchpointTable
            handleSelection={handleSelection}
            touchPoints={touchPoints}
            selectedTouchPoints={selectedTouchPoints}
            setSelectedTouchPoints={setSelectedTouchPoints}
          />
        </div>
      </div>
      <div className="pt-2">
        <CostSummaryTable1
          loading={loadingCost}
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
      <div className="px-4 fixed bottom-0 left-0 w-full bg-white">
        <Footer
          loading={loadingCost || loadingAudiences}
          error={errorCost || errorAudiences}
          handleBack={() => {
            setCurrentStep(step - 1);
          }}
          handleSave={() => {
            dispatch(addDetailsToCreateCampaign({
              pageName: "Audience And TouchPoint Page",
              id: campaignId,
              markets: Object.keys(getDataFromLocalStorage(AUDIENCE_DATA)),
              cohorts: getDataFromLocalStorage(SELECTED_AUDIENCE_TOUCHPOINTS).cohorts,
              touchPoints: getDataFromLocalStorage(SELECTED_AUDIENCE_TOUCHPOINTS).touchPoints,
              gender: getDataFromLocalStorage(SELECTED_AUDIENCE_TOUCHPOINTS).gender,
              screensSelectedCount: screensCost?.screensSelectedCount, 
              impressionSelectedCount: screensCost?.impressionSelectedCount,
              budgetSelected: screensCost.budgetSelected,
              cpmSelected: screensCost.cpmSelected, 
            }))
            setCurrentStep(step + 1);
            saveDataOnLocalStorage(COST_SUMMARY, [
              selectedScreensData,
              totalScreensData,
            ])
          }}
          totalScreensData={[]}
        />
      </div>
    </div>
  );
};

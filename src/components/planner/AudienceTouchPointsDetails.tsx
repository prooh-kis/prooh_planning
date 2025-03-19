import { useCallback, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  getDataFromLocalStorage,
  saveDataOnLocalStorage,
} from "../../utils/localStorageUtils";
import { AudienceCohortTable, LocationTable, TouchpointTable } from "../tables";
import { useDispatch, useSelector } from "react-redux";
import { Footer } from "../../components/footer";
import {
  getPlanningPageFooterData,
  getScreenDataForAdvanceFilters,
  getScreensAudiencesData,
  getScreensCostData,
} from "../../actions/screenAction";
import {
  AUDIENCE_DATA,
  FULL_CAMPAIGN_PLAN,
  SELECTED_AUDIENCE_TOUCHPOINTS,
  TOTAL_SCREEN_COST_DATA,
} from "../../constants/localStorageConstants";
import { addDetailsToCreateCampaign } from "../../actions/campaignAction";
import { ALL_COHORTS, ALL_TOUCHPOINTS } from "../../constants/helperConstants";
import { LoadingScreen } from "../../components/molecules/LoadingScreen";
import { ADD_DETAILS_TO_CREATE_CAMPAIGN_RESET } from "../../constants/campaignConstants";

interface EnterAudienceTouchpointDetailsProps {
  setCurrentStep: (step: number) => void;
  step: number;
  data?: any;
  marketRef?: any;
  audienceRef?: any;
  touchpointRef?: any;
  campaignId?: any;
  successAddCampaignDetails?: any;
  pageSuccess?: boolean;
  setPageSuccess?: any;
}

export const AudienceTouchPointsDetails = ({
  setCurrentStep,
  step,
  marketRef,
  audienceRef,
  touchpointRef,
  campaignId,
  successAddCampaignDetails,
  pageSuccess,
  setPageSuccess,
}: EnterAudienceTouchpointDetailsProps) => {
  const navigate = useNavigate();
  const dispatch = useDispatch<any>();
  const { pathname } = useLocation();

  const [locked, setLocked] = useState<any>({
    cohorts: false,
    touchPoints: false,
  });

  const [markets, setMarkets] = useState<any>({});
  const [audiences, setAudiences] = useState<any>({});
  const [touchPoints, setTouchPoints] = useState<any>({});
  const [zones, setSelectedZone] = useState<string[]>([]);
  const [cities, setSelectedCity] = useState<string[]>([]);

  const [totalScreensData, setTotalScreensData] = useState<any>({});
  const [selectedScreensData, setSelectedScreensData] = useState<any>({});

  const [selectedMarket, setSelectedMarket] = useState<any>(
    getDataFromLocalStorage(FULL_CAMPAIGN_PLAN)?.[campaignId]?.markets || []
  );
  const [selectedGender, setSelectedGender] = useState<any>(
    getDataFromLocalStorage(FULL_CAMPAIGN_PLAN)?.[campaignId]?.gender === "Male"
      ? ["Male"]
      : getDataFromLocalStorage(FULL_CAMPAIGN_PLAN)?.[campaignId]?.gender ===
        "Female"
      ? ["Female"]
      : ["Male", "Female"]
  );
  const [selectedAudiences, setSelectedAudiences] = useState<any>(
    getDataFromLocalStorage(FULL_CAMPAIGN_PLAN)?.[campaignId]?.cohorts || []
  );

  const [selectedTouchPoints, setSelectedTouchPoints] = useState<any>(
    getDataFromLocalStorage(FULL_CAMPAIGN_PLAN)?.[campaignId]?.touchPoints || []
  );

  const [showIconHighlight, setShowIconHighlight] = useState<any>(false);

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

  const getMatchedData = useCallback((myData: any) => {
    const { id, ...marketData } = myData;
    setMarkets(marketData);

    let audiencesData: any = {};
    for (const market in myData) {
      for (const audience in myData[market]["audience"]) {
        audiencesData[audience] =
          myData[market]["audience"][audience]["Total"].toFixed(2);
      }
    }
    setAudiences(audiencesData);
    setSelectedAudiences(
      getDataFromLocalStorage(FULL_CAMPAIGN_PLAN)?.[campaignId]?.cohorts
        .length !== 0
        ? getDataFromLocalStorage(FULL_CAMPAIGN_PLAN)?.[campaignId]?.cohorts
        : Object.keys(audiencesData)
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
      getDataFromLocalStorage(FULL_CAMPAIGN_PLAN)?.[campaignId]?.touchPoints
        .length !== 0
        ? getDataFromLocalStorage(FULL_CAMPAIGN_PLAN)?.[campaignId]?.touchPoints
        : Object.keys(touchPointsData)
    );

    setSelectedGender(selectedGender);

    return { audiencesData, touchPointsData };
  },[campaignId, selectedGender]);

  const setCostData = (myData: any) => {
    setTotalScreensData(myData);
    setSelectedScreensData(myData);
  };

  useEffect(() => {
    if (!pageSuccess) return;
    dispatch(
      getScreensAudiencesData({
        id: campaignId,
        markets:
          getDataFromLocalStorage(FULL_CAMPAIGN_PLAN)?.[campaignId]?.markets,
      })
    );

    dispatch(
      getScreensCostData({
        id: campaignId,
        cohorts:
          getDataFromLocalStorage(FULL_CAMPAIGN_PLAN)?.[campaignId]?.cohorts
            .length !== 0
            ? getDataFromLocalStorage(FULL_CAMPAIGN_PLAN)?.[campaignId]?.cohorts
            : ALL_COHORTS,
        touchPoints:
          getDataFromLocalStorage(FULL_CAMPAIGN_PLAN)?.[campaignId]?.touchPoints
            .length !== 0
            ? getDataFromLocalStorage(FULL_CAMPAIGN_PLAN)?.[campaignId]
                ?.touchPoints
            : ALL_TOUCHPOINTS,
        duration:
          getDataFromLocalStorage(FULL_CAMPAIGN_PLAN)?.[campaignId]?.duration,
        gender:
          getDataFromLocalStorage(FULL_CAMPAIGN_PLAN)?.[campaignId]?.gender !==
          ""
            ? getDataFromLocalStorage(FULL_CAMPAIGN_PLAN)?.[campaignId]?.gender
            : "both",
      })
    );

    dispatch(
      getPlanningPageFooterData({
        id: campaignId,
        pageName: "Audience And TouchPoint Page",
      })
    );
    dispatch({
      type: ADD_DETAILS_TO_CREATE_CAMPAIGN_RESET,
    });
  }, [dispatch, pageSuccess, campaignId]);

  useEffect(() => {
    if (!successAddCampaignDetails) return;

    setPageSuccess(true);
  }, [setPageSuccess, successAddCampaignDetails]);

  useEffect(() => {
    if (screensCost) {
      dispatch(
        getScreenDataForAdvanceFilters({
          id: getDataFromLocalStorage(FULL_CAMPAIGN_PLAN)?.[campaignId]?._id,
          touchPoints: selectedTouchPoints,
        })
      );
      saveDataOnLocalStorage(TOTAL_SCREEN_COST_DATA, {
        [campaignId]: screensCost,
      });
      setCostData(screensCost);
      saveDataOnLocalStorage(SELECTED_AUDIENCE_TOUCHPOINTS, {
        [campaignId]: {
          cohorts: selectedAudiences,
          touchPoints: selectedTouchPoints,
          gender:
            selectedGender.length === 1 && selectedGender.includes("Male")
              ? "Male"
              : selectedGender.length === 1 && selectedGender.includes("Female")
              ? "Female"
              : "both",
          duration:
            getDataFromLocalStorage(FULL_CAMPAIGN_PLAN)?.[campaignId]
              ?.duration || 30,
        },
      });
    }
  }, [dispatch, screensCost, campaignId, selectedAudiences, selectedGender, selectedTouchPoints]);

  useEffect(() => {
    if (screensAudiences) {
      getMatchedData(screensAudiences);
    } else {
      getMatchedData(
        getDataFromLocalStorage(AUDIENCE_DATA)?.[campaignId] || {}
      );
    }

    setCostData(
      getDataFromLocalStorage(TOTAL_SCREEN_COST_DATA)?.[campaignId] || {}
    );
  }, [screensAudiences, campaignId, getMatchedData]);

  const handleSelection = (input: any) => {
    dispatch(
      getScreensCostData({
        id: campaignId,
        cohorts: input.type === "cohorts" ? input.data : selectedAudiences,
        touchPoints:
          input.type === "touchPoints" ? input.data : selectedTouchPoints,
        duration:
          getDataFromLocalStorage(FULL_CAMPAIGN_PLAN)?.[campaignId]?.duration,
        gender:
          input.type === "gender"
            ? input.data
            : selectedGender.length === 1 && selectedGender.includes("Male")
            ? "Male"
            : selectedGender.length === 1 && selectedGender.includes("Female")
            ? "Female"
            : "both",
      })
    );
  };

  const getSelectedGender = () => {
    return selectedGender.length === 1 && selectedGender.includes("Male")
      ? "Male"
      : selectedGender.length === 1 && selectedGender.includes("Female")
      ? "Female"
      : "both";
  };

  const handleSaveAndContinue = () => {
    if (!pathname.split("/").includes("view")) {
      dispatch(
        addDetailsToCreateCampaign({
          pageName: "Audience And TouchPoint Page",
          id: campaignId,
          markets: Object.keys(screensAudiences)?.filter((c: any) => c !== "id"),
          cohorts: selectedAudiences,
          touchPoints: selectedTouchPoints,
          gender: getSelectedGender(),
          screensSelectedCount: screensCost?.screensSelectedCount,
          impressionSelectedCount: screensCost?.impressionSelectedCount,
          budgetSelected: screensCost?.budgetSelected,
          cpmSelected: screensCost?.cpmSelected,
          pricePerSlotSelectedCount: screensCost?.pricePerSlotSelected,
          citiesSelectedCount: screensCost?.citiesSelectedCount,
          cities,
          zones,
        })
      );
      setPageSuccess(false);
      setCurrentStep(step + 1);

    } else {
      setPageSuccess(true);
      setCurrentStep(step + 1);
    }
  };

  return (
    <>
      {loadingAudiences || loadingCost ? (
        <LoadingScreen />
      ) : (
        <div className="w-full">
          <div>
            <h1 className="text-[24px] text-primaryText font-semibold">
              Select Target Audiences and TouchPoints
            </h1>
            <p className="text-[14px] text-secondaryText">
              Choose the audiences you want to target at your desired
              touchPoints
            </p>
          </div>
          <div className="grid grid-cols-8 gap-1 pt-4">
            <div ref={marketRef} className="col-span-2 flex justify-center">
              <LocationTable
                loading={loadingAudiences || loadingCost}
                markets={markets}
                handleSelection={handleSelection}
                selectedMarkets={selectedMarket}
                selectedGender={selectedGender}
                setSelectedGender={setSelectedGender}
                data={screensAudiences || {}}
                setSelectedCity={setSelectedCity}
                setSelectedZone={setSelectedZone}
              />
            </div>
            <div ref={audienceRef} className="col-span-3 flex justify-center">
              <AudienceCohortTable
                showIconHighlight={showIconHighlight}
                loading={loadingAudiences || loadingCost}
                locked={locked}
                setLocked={setLocked}
                handleSelection={handleSelection}
                audiences={audiences}
                selectedAudiences={selectedAudiences}
                setSelectedAudiences={setSelectedAudiences}
              />
            </div>
            <div ref={touchpointRef} className="col-span-3 flex justify-center">
              <TouchpointTable
                loading={loadingAudiences || loadingCost}
                locked={locked}
                setLocked={setLocked}
                handleSelection={handleSelection}
                touchPoints={touchPoints}
                selectedTouchPoints={selectedTouchPoints}
                setSelectedTouchPoints={(value: string[]) => {
                  console.log("new Value :", value);
                  setSelectedTouchPoints(value);
                }}
              />
            </div>
          </div>
          <div className="flex justify-start items-center gap-2 pt-2 pb-20">
            <i className="fi fi-sr-lightbulb-on text-[#FFB904]"></i>
            <h1 className="text-[14px] text-[#178967]">
              Prooh Tip:- select target audience and select select target
              audience and location target audience and location location
            </h1>
          </div>
          <div className="px-4 fixed bottom-0 left-0 w-full bg-[#FFFFFF]">
            <Footer
              mainTitle={"Continue"}
              handleBack={() => {
                setCurrentStep(step - 1);
              }}
              handleSave={handleSaveAndContinue}
              campaignId={campaignId}
              pageName="Audience And TouchPoint Page"
              successAddCampaignDetails={successAddCampaignDetails}
              loadingCost={loadingAudiences || loadingCost}
            />
          </div>
        </div>
      )}
    </>
  );
};

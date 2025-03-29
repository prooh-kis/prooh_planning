import { useCallback, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  AudienceCohortTable,
  LocationTable,
  TouchpointTable,
} from "../../components/tables";
import { useDispatch, useSelector } from "react-redux";
import { Footer } from "../../components/footer";
import {
  getPlanningPageFooterData,
  getScreensAudiencesData,
  getScreensCostData,
} from "../../actions/screenAction";

import { addDetailsToCreateCampaign } from "../../actions/campaignAction";
import { LoadingScreen } from "../../components/molecules/LoadingScreen";
import { ADD_DETAILS_TO_CREATE_CAMPAIGN_RESET } from "../../constants/campaignConstants";
import { message } from "antd";
import { saveDataOnLocalStorage } from "../../utils/localStorageUtils";

interface EnterAudienceTouchpointDetailsProps {
  setCurrentStep: (step: number) => void;
  step: number;
  data?: any;
  campaignId?: any;
  campaignDetails?: any;
}

export const AudienceTouchPointsDetails = ({
  setCurrentStep,
  step,
  campaignId,
  campaignDetails,
}: EnterAudienceTouchpointDetailsProps) => {
  const navigate = useNavigate();
  const dispatch = useDispatch<any>();
  const { pathname } = useLocation();

  const [markets, setMarkets] = useState<any>({});
  const [audiences, setAudiences] = useState<any>({});
  const [touchPoints, setTouchPoints] = useState<any>({});
  const [zones, setSelectedZone] = useState<string[]>(
    campaignDetails?.zones || []
  );
  const [cities, setSelectedCity] = useState<string[]>(
    campaignDetails?.cities || []
  );

  const [selectedGender, setSelectedGender] = useState<any>(
    campaignDetails?.gender === "Male"
      ? ["Male"]
      : campaignDetails?.gender === "Female"
      ? ["Female"]
      : ["Male", "Female"]
  );
  const [selectedAudiences, setSelectedAudiences] = useState<any>(
    campaignDetails?.cohorts || []
  );

  const [selectedTouchPoints, setSelectedTouchPoints] = useState<any>(
    campaignDetails?.touchPoints || []
  );

  const detailsToCreateCampaignAdd = useSelector(
    (state: any) => state.detailsToCreateCampaignAdd
  );
  const {
    loading: loadingAddDetails,
    error: errorAddDetails,
    success: successAddDetails,
  } = detailsToCreateCampaignAdd;

  const screensAudiencesDataGet = useSelector(
    (state: any) => state.screensAudiencesDataGet
  );
  const {
    loading: loadingAudiences,
    error: errorAudiences,
    data: screensAudiences,
  } = screensAudiencesDataGet;

  const getMatchedData = useCallback(
    (myData: any) => {
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
        campaignDetails?.cohorts.length !== 0
          ? campaignDetails?.cohorts
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
        campaignDetails?.touchPoints.length !== 0
          ? campaignDetails?.touchPoints
          : Object.keys(touchPointsData)
      );

      setSelectedGender(selectedGender);

      return { audiencesData, touchPointsData };
    },
    [campaignDetails?.cohorts, campaignDetails?.touchPoints, selectedGender]
  );

  useEffect(() => {
    if (!campaignDetails) return;

    const data = [
      ...(campaignDetails?.markets || []),
      ...(campaignDetails?.cities || []),
      ...(campaignDetails?.zones || []),
    ].reduce((acc: Record<string, boolean>, item: string) => {
      acc[item] = true;
      return acc;
    }, {});
    saveDataOnLocalStorage("STATE_CITY_ZONE", data);

    if (errorAudiences) {
      message.error("Error in fetching audience data");
    }

    if (errorAddDetails) {
      message.error("Error in saving campaigns details, please check your requests...");
      dispatch({ type: ADD_DETAILS_TO_CREATE_CAMPAIGN_RESET });
    }

    dispatch(
      getScreensAudiencesData({
        id: campaignId,
        markets: campaignDetails?.markets,
      })
    );
    dispatch(
      getPlanningPageFooterData({
        id: campaignId,
        pageName: "Audience And TouchPoint Page",
      })
    );
  }, [campaignId, campaignDetails, dispatch, errorAudiences, errorAddDetails]);

  useEffect(() => {
    if (successAddDetails) {
      dispatch({
        type: ADD_DETAILS_TO_CREATE_CAMPAIGN_RESET,
      });
      setCurrentStep(step + 1);
    }
  }, [dispatch, successAddDetails, step, setCurrentStep]);

  useEffect(() => {
    if (screensAudiences) {
      getMatchedData(screensAudiences);
    }
  }, [screensAudiences, getMatchedData]);

  const handleSelection = (input: any) => {
    dispatch(
      getScreensCostData({
        id: campaignId,
        cohorts: input.type === "cohorts" ? input.data : selectedAudiences,
        touchPoints:
          input.type === "touchPoints" ? input.data : selectedTouchPoints,
        duration: campaignDetails?.duration,
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

  const getSelectedGender = useCallback(() => {
    return selectedGender.length === 1 && selectedGender.includes("Male")
      ? "Male"
      : selectedGender.length === 1 && selectedGender.includes("Female")
      ? "Female"
      : "both";
  }, [selectedGender]);

  const handleSaveAndContinue = useCallback(() => {
    if (!pathname.split("/").includes("view")) {
      dispatch(
        addDetailsToCreateCampaign({
          pageName: "Audience And TouchPoint Page",
          id: campaignId,
          markets: Object.keys(screensAudiences)?.filter(
            (c: any) => c !== "id"
          ),
          cohorts: selectedAudiences,
          touchPoints: selectedTouchPoints,
          gender: getSelectedGender(),
          cities,
          zones,
        })
      );
    }
  }, [
    pathname,
    dispatch,
    campaignId,
    screensAudiences,
    selectedAudiences,
    selectedTouchPoints,
    getSelectedGender,
    cities,
    zones,
  ]);

  return (
    <>
      {loadingAudiences ? (
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
            <div className="col-span-2 flex justify-center">
              <LocationTable
                loading={loadingAudiences}
                handleSelection={handleSelection}
                selectedGender={selectedGender}
                setSelectedGender={setSelectedGender}
                data={screensAudiences || {}}
                setSelectedCity={setSelectedCity}
                setSelectedZone={setSelectedZone}
              />
            </div>
            <div className="col-span-3 flex justify-center">
              <AudienceCohortTable
                loading={loadingAudiences}
                handleSelection={handleSelection}
                audiences={audiences}
                selectedAudiences={selectedAudiences}
                setSelectedAudiences={setSelectedAudiences}
              />
            </div>
            <div className="col-span-3 flex justify-center">
              <TouchpointTable
                loading={loadingAudiences}
                handleSelection={handleSelection}
                touchPoints={touchPoints}
                selectedTouchPoints={selectedTouchPoints}
                setSelectedTouchPoints={(value: string[]) => {
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
              successCampaignDetails={successAddDetails}
              loadingCost={loadingAudiences || loadingAddDetails}
            />
          </div>
        </div>
      )}
    </>
  );
};

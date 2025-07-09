import { useCallback, useEffect, useState, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  AudienceCohortTable,
  LocationTable,
  TouchpointTable,
} from "../../components/tables";
import { useDispatch, useSelector } from "react-redux";
import { Footer } from "../../components/footer";
import {
  getLocationWiseFiltersForScreensAudiencesData,
  getPlanningPageFooterData,
  getScreensAudiencesData,
  getScreensCostData,
} from "../../actions/screenAction";

import { addDetailsToCreateCampaign } from "../../actions/campaignAction";
import { LoadingScreen } from "../../components/molecules/LoadingScreen";
import { ADD_DETAILS_TO_CREATE_CAMPAIGN_RESET } from "../../constants/campaignConstants";
import { message } from "antd";
import { saveDataOnLocalStorage } from "../../utils/localStorageUtils";
import { CAMPAIGN_CREATION_ADD_DETAILS_TO_CREATE_CAMPAIGN_PLANNING_PAGE } from "../../constants/userConstants";

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

  const [audiences, setAudiences] = useState<any>({});
  const [touchPoints, setTouchPoints] = useState<any>({});
  const [markets, setMarkets] = useState<any>(campaignDetails.markets || []);
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

  // Refs for tracking state changes
  const isInitialMount = useRef(true);
  const prevFilters = useRef({ markets, cities, zones });

  const detailsToCreateCampaignAdd = useSelector(
    (state: any) => state.detailsToCreateCampaignAdd
  );
  const {
    loading: loadingAddDetails,
    error: errorAddDetails,
    success: successAddDetails,
  } = detailsToCreateCampaignAdd;

  const {
    loading: loadingLocationWiseFilters,
    error: errorLocationWiseFilters,
    data: locationWiseFilters,
  } = useSelector(
    (state: any) => state.getLocationWiseFiltersForScreensAudiencesDataGet
  );

  const {
    loading: loadingAudiences,
    error: errorAudiences,
    data: screensAudiences,
  } = useSelector((state: any) => state.screensAudiencesDataGet);

  const getMatchedData = useCallback(
    (myData: any) => {
      const { id, ...marketData } = myData;

      let audiencesData: any = {};
      for (const market in marketData) {
        for (const audience in marketData[market]["audience"]) {
          audiencesData[audience] =
            marketData[market]["audience"][audience]["Total"].toFixed(2);
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
    if (errorLocationWiseFilters) {
      message.error("Error in getting location filters");
    }

    if (errorAudiences) {
      message.error("Error in fetching audience data");
    }

    if (errorAddDetails) {
      message.error("Error in saving campaigns details");
    }

    if (errorLocationWiseFilters) {
      message.error("Error in getting location filters");
    }
  }, [errorAudiences, errorAddDetails, errorLocationWiseFilters]);

  useEffect(() => {
    if (!campaignDetails) return;

    dispatch(getLocationWiseFiltersForScreensAudiencesData({ id: campaignId }));

    dispatch(
      getPlanningPageFooterData({
        id: campaignId,
        pageName: "Audience And TouchPoint Page",
      })
    );

    // Initial data fetch complete
  }, [campaignId, campaignDetails, dispatch]);

  useEffect(() => {
    // Don't run on initial mount or if we don't have locationWiseFilters yet
    if (isInitialMount.current || !locationWiseFilters) {
      isInitialMount.current = false;
      return;
    }

    // Check if any of the location filters have actually changed
    const currentFilters = { markets, cities, zones };
    const hasFiltersChanged =
      JSON.stringify(prevFilters.current) !== JSON.stringify(currentFilters);

    if (hasFiltersChanged) {
      // Update the ref with current filters
      prevFilters.current = { ...currentFilters };

      // Add a small debounce to prevent rapid successive calls
      const timer = setTimeout(() => {
        dispatch(
          getScreensAudiencesData({
            id: campaignId,
            markets,
            cities,
            zones,
          })
        );
      }, 500);

      return () => clearTimeout(timer);
    }
  }, [markets, cities, zones, campaignId, dispatch, locationWiseFilters]);

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
          event: CAMPAIGN_CREATION_ADD_DETAILS_TO_CREATE_CAMPAIGN_PLANNING_PAGE,
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
    <div className="">
      {loadingLocationWiseFilters ? (
        <LoadingScreen />
      ) : (
        <div className="w-full">
          <div className="">
            <h1 className="text-[24px] text-primaryText font-semibold">
              Select Target Audiences and TouchPoints
            </h1>
            <p className="text-[14px] text-secondaryText">
              Choose the audiences you want to target at your desired
              touchPoints
            </p>
          </div>
          <div className="grid grid-cols-9 gap-1 py-2">
            <div className="col-span-3 flex justify-center">
              <LocationTable
                loading={loadingLocationWiseFilters}
                selectedGender={selectedGender}
                setSelectedGender={setSelectedGender}
                data={locationWiseFilters || {}}
                setSelectedCity={setSelectedCity}
                cities={cities}
                zones={zones}
                setSelectedZone={setSelectedZone}
              />
            </div>
            <div className="col-span-3 flex justify-center">
              <AudienceCohortTable
                loading={loadingAudiences}
                audiences={audiences}
                selectedAudiences={selectedAudiences}
                setSelectedAudiences={setSelectedAudiences}
              />
            </div>
            <div className="col-span-3 flex justify-center">
              <TouchpointTable
                loading={loadingAudiences}
                touchPoints={touchPoints}
                selectedTouchPoints={selectedTouchPoints}
                setSelectedTouchPoints={(value: string[]) => {
                  setSelectedTouchPoints(value);
                }}
              />
            </div>
          </div>
          <div className="flex justify-start items-center gap-2">
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
    </div>
  );
};

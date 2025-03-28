import { useEffect, useState } from "react";
import { RadioInput } from "../../components/atoms/RadioInput";
import { VerticalLine } from "../../components/molecules/VerticalLine";
import {
  RegularCohortSlotsCampaignTable,
  RegularCohortSummaryTable,
} from "../../components/tables";
import { useDispatch, useSelector } from "react-redux";
import {
  getPlanningPageFooterData,
  getRegularVsCohortPriceData,
} from "../../actions/screenAction";
import { Footer } from "../../components/footer";
import { message, Tooltip } from "antd";
import { addDetailsToCreateCampaign } from "../../actions/campaignAction";
import { useLocation } from "react-router-dom";
import { ADD_DETAILS_TO_CREATE_CAMPAIGN_RESET } from "../../constants/campaignConstants";
import { LoadingScreen } from "../../components/molecules/LoadingScreen";

export const RegularCohortComparisonDetails = ({
  campaignId,
  setCurrentStep,
  step,
  campaignDetails,
}: any) => {
  const dispatch = useDispatch<any>();
  const { pathname } = useLocation();
  const [selecting, setSelecting] = useState<string | null>(null);
  const [isDisabled, setIsDisabled] = useState<boolean>(true);
  const [showSummary, setShowSummary] = useState<string | null>(null);
  const [selectedBuyingOption, setSelectedBuyingOption] = useState<string>("");

  const detailsToCreateCampaignAdd = useSelector(
    (state: any) => state.detailsToCreateCampaignAdd
  );
  const {
    loading: loadingAddDetails,
    error: errorAddDetails,
    success: successAddDetails,
  } = detailsToCreateCampaignAdd;

  const {
    loading: loadingPriceData,
    error: errorPriceData,
    data: priceData,
  } = useSelector((state: any) => state.regularVsCohortPriceDataGet);


  useEffect(() => {
    if (!campaignDetails) return;
    if (errorAddDetails) {
      message.error("Error in add campaign details...")
    }
    if (errorPriceData) {
      message.error("Error in getting impression wise data...")
    }
    dispatch(
      getRegularVsCohortPriceData({
        id: campaignId,
        screenIds: campaignDetails?.screenIds,
        cohorts: campaignDetails?.cohorts,
        gender: campaignDetails?.gender,
        duration: campaignDetails?.duration,
      })
    );

    dispatch(
      getPlanningPageFooterData({
        id: campaignId,
        pageName: "Compare Plan Page",
      })
    );

  }, [dispatch, campaignId, campaignDetails, errorPriceData, errorAddDetails]);

  useEffect(() => {
    if (successAddDetails) {
      dispatch({
        type: ADD_DETAILS_TO_CREATE_CAMPAIGN_RESET,
      });
      setCurrentStep(step+1);
    }
  },[successAddDetails, step, setCurrentStep, dispatch]);

  const handleRegularVsCohortSelection = (type: string) => {
    setSelectedBuyingOption(type);
    setShowSummary(null);
    setIsDisabled(false);
  };

  return (
    <div className="w-full">
      {errorPriceData && <p>Error: {errorPriceData}</p>}
      {loadingPriceData ? (
        <LoadingScreen />
      ) : (
        <div className="w-full">
          <h1 className="text-[24px] text-primaryText font-semibold">
            Compare Plan
          </h1>
          <p className="text-[14px] text-secondaryText">
            Choose between a Regular Slots Campaign or customize your slots with
            cohort data
          </p>

          <div className="flex gap-2">
            <div className="pt-6">
              <VerticalLine height="auto" color="#B5B5B5" thickness="1px" />
              <VerticalLine height="auto" color="#B5B5B5" thickness="1px" />
            </div>
            <div className="w-full max-h-[60vh] overflow-scroll no-scrollbar">
              {["regular", "cohort"].map((type) => (
                <div key={type} className="py-2">
                  <div className="py-2 flex items-center gap-2">
                    <h1 className="md:text-[16px] sm:text-[14px]">
                      {type === "regular"
                        ? "Regular slots per day buying"
                        : "Cohort slots per day buying"}
                    </h1>
                    <Tooltip
                      title={
                        type === "regular"
                          ? "Regular slots have more than 7% of total audiences available on the site"
                          : "Cohort slots have more than 15% of total audiences available on the site"
                      }
                    >
                      <i className="fi fi-rs-info lg:text-[12px] md:text-[10px] text-gray-400 flex items-center"></i>
                    </Tooltip>
                  </div>
                  <div
                    className={`w-full ${
                      selecting === type
                        ? "border border-[#C9E9FF] rounded"
                        : ""
                    }`}
                    onMouseEnter={() => !showSummary && setSelecting(type)}
                    onMouseLeave={() => setSelecting(null)}
                  >
                    <RegularCohortSlotsCampaignTable
                      priceData={priceData?.[type]}
                      setShowSummary={setShowSummary}
                      type={type}
                      showSummary={showSummary}
                      loading={loadingPriceData}
                    />
                  </div>
                  {showSummary === type && (
                    <RegularCohortSummaryTable
                      type={type}
                      touchPointData={priceData?.[type]?.touchPointData}
                    />
                  )}
                  {priceData?.[type]?.tableData?.impressionPerDay  || !priceData?.[type]?.tableData?.totalSlotsPerDay && (
                    <div className="flex justify-center items-center py-1">
                      <h1 className="text-[#EF4444] text-[12px] font-semibold">You are getting zero (0) impressions per day after your filter selection. Please update the filters and try again...</h1>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="w-full">
            <div className="py-2 flex justify-start items-center gap-2">
              <h1 className="md:text-[16px] sm:text-[14px]">
                Choose your desired targeting option among the above
              </h1>
              <Tooltip title="Choose between Regular and Cohort slots based on audience availability">
                <i className="fi fi-rs-info sm:text-[14px] md:text-[12px] text-gray-400 flex justify-center items-center"></i>
              </Tooltip>
            </div>
            <div className="flex gap-8 mt-4">
              {["regular", "cohort"].map((type) => (
                <RadioInput
                  key={type}
                  title={
                    type === "regular"
                      ? "Regular Slots Per Day"
                      : "Cohort Slots Per Day"
                  }
                  value={type}
                  isChecked={selectedBuyingOption === type}
                  onChange={() => handleRegularVsCohortSelection(type)}
                />
              ))}
            </div>
          </div>

          <div className="px-4 fixed bottom-0 left-0 w-full bg-[#FFFFFF]">
            <Footer
              mainTitle={isDisabled ? "Choose to Confirm" : "Continue"}
              handleBack={() => setCurrentStep(step - 1)}
              handleSave={() => {
                if (isDisabled) {
                  message.error("Please confirm your selection");
                } else {
                  dispatch(
                    addDetailsToCreateCampaign({
                      pageName: "Compare Plan Page",
                      id: campaignId,
                      regularTouchPointWiseSlotDetails:
                        priceData?.regular?.touchPointData,
                      cohortTouchPointWiseSlotDetails:
                        priceData?.cohort?.touchPointData,
                      selectedType: selectedBuyingOption,
                      tableData: priceData?.[selectedBuyingOption]?.tableData,
                    })
                  );
                }
              }}
              disabled={
                priceData?.regular?.tableData?.impressionPerDay === 0 ||
                priceData?.cohort?.tableData?.impressionPerDay === 0
              }
              campaignId={campaignId}
              pageName="Compare Plan Page"
              loadingCost={loadingAddDetails || loadingPriceData}
              successCampaignDetails={successAddDetails}
            />
          </div>
        </div>
      )}
    </div>
  );
};

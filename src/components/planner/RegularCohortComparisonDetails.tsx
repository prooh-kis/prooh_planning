import { useEffect, useState } from "react";
import { RadioInput } from "../atoms/RadioInput";
import { VerticalLine } from "../molecules/VerticalLine";
import {
  RegularCohortSlotsCampaignTable,
  RegularCohortSummaryTable,
} from "../tables";
import { useDispatch, useSelector } from "react-redux";
import {
  getPlanningPageFooterData,
  getRegularVsCohortPriceData,
} from "../../actions/screenAction";
import {
  getDataFromLocalStorage,
  saveDataOnLocalStorage,
} from "../../utils/localStorageUtils";
import { Footer } from "../../components/footer";
import { message, Tooltip } from "antd";
import { addDetailsToCreateCampaign } from "../../actions/campaignAction";
import { useLocation } from "react-router-dom";
import { FULL_CAMPAIGN_PLAN } from "../../constants/localStorageConstants";
import { ADD_DETAILS_TO_CREATE_CAMPAIGN_RESET } from "../../constants/campaignConstants";
import { LoadingScreen } from "../../components/molecules/LoadingScreen";

export const RegularCohortComparisonDetails = ({
  campaignId,
  setCurrentStep,
  step,
  successAddCampaignDetails,
  pageSuccess,
  setPageSuccess,
}: any) => {
  const dispatch = useDispatch<any>();
  const { pathname } = useLocation();
  const [pageLoading, setPageLoading] = useState<boolean>(true);
  const [selecting, setSelecting] = useState<string | null>(null);
  const [isDisabled, setIsDisabled] = useState<boolean>(true);
  const [showSummary, setShowSummary] = useState<string | null>(null);

  const [screenIds, setScreenIds] = useState<any>(
    getDataFromLocalStorage(FULL_CAMPAIGN_PLAN)?.[campaignId]?.screenIds || []
  );
  const [cohorts, setCohorts] = useState<any>(
    getDataFromLocalStorage(FULL_CAMPAIGN_PLAN)?.[campaignId]?.cohorts || []
  );
  const [gender, setGender] = useState<string>(
    getDataFromLocalStorage(FULL_CAMPAIGN_PLAN)?.[campaignId]?.gender || "both"
  );
  const [duration, setDuration] = useState<number>(
    getDataFromLocalStorage(FULL_CAMPAIGN_PLAN)?.[campaignId]?.duration || 30
  );

  const [selectedBuyingOption, setSelectedBuyingOption] =
    useState<string>("regular");

  const {
    loading: loadingPriceData,
    error: errorPriceData,
    data: priceData,
  } = useSelector((state: any) => state.regularVsCohortPriceDataGet);

  useEffect(() => {
    if (priceData) {
      setPageLoading(false);
    }
  }, [priceData]);

  useEffect(() => {
    if (!pageSuccess) return;

    dispatch(
      getRegularVsCohortPriceData({
        id: campaignId,
        screenIds,
        cohorts,
        gender,
        duration,
      })
    );

    dispatch(
      getPlanningPageFooterData({
        id: campaignId,
        pageName: "Compare Plan Page",
      })
    );

    dispatch({ type: ADD_DETAILS_TO_CREATE_CAMPAIGN_RESET });
  }, [cohorts, dispatch, duration, gender, screenIds, campaignId, pageSuccess]);

  useEffect(() => {
    if (!successAddCampaignDetails) return;
    dispatch({ type: ADD_DETAILS_TO_CREATE_CAMPAIGN_RESET });
    setPageSuccess(true);
  }, [successAddCampaignDetails]);

  const handleRegularVsCohortSelection = (type: string) => {
    console.log("type : ", type);
    setSelectedBuyingOption(type);
    setShowSummary(null);
    setIsDisabled(false);
    const campaign =
      getDataFromLocalStorage(FULL_CAMPAIGN_PLAN)?.[campaignId] || {};
    campaign["selectedType"] = type;
    saveDataOnLocalStorage(FULL_CAMPAIGN_PLAN, { [campaignId]: campaign });
  };

  return (
    <div className="w-full">
      {errorPriceData && <p>Error: {errorPriceData}</p>}
      {pageLoading ? (
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
            <div className="flex gap-4 pt-1">
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
              handleBack={() => setCurrentStep(step - 1)}
              handleSave={() => {
                if (!pathname.split("/").includes("view")) {
                  if (isDisabled) {
                    message.error("Please confirm screen selection");
                  } else {
                    dispatch(
                      addDetailsToCreateCampaign({
                        pageName: "Compare Plan Page",
                        id: pathname.split("/").pop(),
                        regularTouchPointWiseSlotDetails:
                          priceData?.regular?.touchPointData,
                        cohortTouchPointWiseSlotDetails:
                          priceData?.cohort?.touchPointData,
                        selectedType: selectedBuyingOption,
                        tableData: priceData?.[selectedBuyingOption]?.tableData,
                      })
                    );
                    setCurrentStep(step + 1);
                  }
                } else {
                  setCurrentStep(step + 1);
                }
                
              }}
              disabled={
                priceData?.regular?.tableData?.impressionPerDay === 0 ||
                priceData?.cohort?.tableData?.impressionPerDay === 0
              }
              campaignId={campaignId}
              pageName="Compare Plan Page"
              successAddCampaignDetails={successAddCampaignDetails}
            />
          </div>
        </div>
      )}
    </div>
  );
};

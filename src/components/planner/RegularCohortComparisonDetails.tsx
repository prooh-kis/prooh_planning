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
import {
  FULL_CAMPAIGN_PLAN,
  REGULAR_VS_COHORT_PRICE_DATA,
  SCREEN_SUMMARY_SELECTION,
} from "../../constants/localStorageConstants";
import { ADD_DETAILS_TO_CREATE_CAMPAIGN_RESET } from "../../constants/campaignConstants";
import { LoadingScreen } from "../../components/molecules/LoadingScreen";

export const RegularCohortComparisonDetails = ({
  campaignId,
  setCurrentStep,
  step,
  successAddCampaignDetails,
}: any) => {
  const dispatch = useDispatch<any>();
  const { pathname } = useLocation();
  const [pageLoading, setPageLoading] = useState<boolean>(true);
  const [selecting, setSelecting] = useState<any>(null);
  const [isDisabled, setIsDisabled] = useState<any>(true);
  const [showSummary, setShowSummary] = useState<any>(null);
  const [screenIds, setScreenIds] = useState<any>(
    getDataFromLocalStorage(FULL_CAMPAIGN_PLAN)?.[campaignId]?.screenIds || []
  );
  const [cohorts, setCohorts] = useState<any>(
    getDataFromLocalStorage(FULL_CAMPAIGN_PLAN)?.[campaignId]?.cohorts || []
  );
  const [gender, setGender] = useState<any>(
    getDataFromLocalStorage(FULL_CAMPAIGN_PLAN)?.[campaignId]?.gender || "both"
  );
  const [duration, setDuration] = useState<any>(
    getDataFromLocalStorage(FULL_CAMPAIGN_PLAN)?.[campaignId]?.duration || 30
  );

  const [selectedBuyingOption, setSelectedBuyingOption] =
    useState<any>("Regular");

  const regularVsCohortPriceDataGet = useSelector(
    (state: any) => state.regularVsCohortPriceDataGet
  );
  const {
    loading: loadingPriceData,
    error: errorPriceData,
    data: priceData,
  } = regularVsCohortPriceDataGet;

  useEffect(() => {
    if (!priceData) return;

    setPageLoading(false);
    // saveDataOnLocalStorage(SCREEN_SUMMARY_SELECTION, { [campaignId]: {} });

    // if (
    //   priceData?.regular?.tableData.impressionPerDay === 0 ||
    //   priceData?.cohort?.tableData.impressionPerDay === 0
    // ) {
    //   message.error(
    //     "Please select an appropriate number of audiences to get relevant impressions from the available inventories..."
    //   );
    // }
  }, [priceData, campaignId]);

  useEffect(() => {
    if (!successAddCampaignDetails) return;

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
  }, [
    cohorts,
    dispatch,
    duration,
    gender,
    screenIds,
    campaignId,
    successAddCampaignDetails,
  ]);

  const handleRegularVsCohortSelection = (type: any) => {
    setSelectedBuyingOption(type);
    setShowSummary(null);
    setIsDisabled(false);
    const campaign =
      getDataFromLocalStorage(FULL_CAMPAIGN_PLAN)?.[campaignId] || {};
    campaign["selectedType"] = type;
    const tcamp = {
      [campaign?._id || campaignId]: campaign,
    };
    saveDataOnLocalStorage(FULL_CAMPAIGN_PLAN, tcamp);
  };

  return (
    <div className="w-full">
      <div className="ml-[-16px]">
        <h1 className="text-[24px] text-primaryText font-semibold">
          Compare Plan
        </h1>
        <p className="text-[14px] text-secondaryText">
          Choose between a Regular Slots Campaign or a customize your slots with
          cohort data
        </p>
      </div>
      {errorPriceData && <p>Error: {errorPriceData}</p>}
      {pageLoading ? (
        <LoadingScreen />
      ) : (
        <div>
          <div className="flex gap-2">
            <div className="ml-[-25px] pt-6">
              <VerticalLine height="120px" color="#B5B5B5" thickness="1px" />
              {/* <h1 className="py-4">vs</h1> */}
              <VerticalLine height="100px" color="#B5B5B5" thickness="1px" />
            </div>
            <div className="w-full">
              <div className="py-2">
                <div className="py-2 flex items-center gap-2">
                  <h1 className="md:text-[16px] sm:text-[14px]">
                    Regular slots per day buying
                  </h1>
                  <Tooltip title="Regular slots only have those slots in a timezone, which have more than 7% of total audiences available on the site">
                    <i className="fi fi-rs-info lg:text-[12px] md:text-[10px] text-gray-400 flex justify-center items-center"></i>
                  </Tooltip>
                </div>
                <div
                  className={`w-full ${
                    selecting === "regular"
                      ? "border border-[#C9E9FF] rounded"
                      : ""
                  }`}
                  onMouseEnter={() => {
                    if (!showSummary) {
                      setSelecting("regular");
                      // handleRegularVsCohortSelection("regular");
                    }
                  }}
                  onMouseLeave={() => {
                    setSelecting(null);
                  }}
                >
                  <RegularCohortSlotsCampaignTable
                    priceData={priceData?.regular}
                    setShowSummary={setShowSummary}
                    type="regular"
                    showSummary={showSummary}
                    loading={loadingPriceData}
                  />
                </div>
                {showSummary === "regular" && (
                  <RegularCohortSummaryTable
                    type="regular"
                    touchPointData={priceData?.regular?.touchPointData}
                  />
                )}
              </div>
              <div className="py-2">
                <div className="py-2 flex items-center gap-2">
                  <h1 className="md:text-[16px] sm:text-[14px]">
                    Cohort slots per day buying
                  </h1>
                  <Tooltip title="Cohort slots target your selected audiences using those slots in a timezone, which have more than 15% of total audiences available on the site">
                    <i className="fi fi-rs-info lg:text-[12px] md:text-[10px] text-gray-400 flex justify-center items-center"></i>
                  </Tooltip>
                </div>
                <div
                  className={`w-full ${
                    selecting === "cohort"
                      ? "border border-[#C9E9FF] rounded"
                      : ""
                  }`}
                  onMouseEnter={() => {
                    if (!showSummary) {
                      setSelecting("cohort");
                      // handleRegularVsCohortSelection("cohort");
                    }
                  }}
                  onMouseLeave={() => {
                    setSelecting(null);
                  }}
                >
                  <RegularCohortSlotsCampaignTable
                    type="cohort"
                    priceData={priceData?.cohort}
                    setShowSummary={setShowSummary}
                    showSummary={showSummary}
                    loading={loadingPriceData}
                  />
                </div>

                {showSummary === "cohort" && (
                  <RegularCohortSummaryTable
                    type="cohort"
                    touchPointData={priceData?.cohort?.touchPointData}
                  />
                )}
              </div>
            </div>
          </div>

          <div className="w-full">
            <div className="py-2 flex justify-start items-center gap-2">
              <h1 className="md:text-[16px] sm:text-[14px]">
                Choose your desired targeting option among the above
              </h1>
              <Tooltip title="Cohort slots target your selected audiences using those slots in a timezone, which have more than 7% of total audiences available on the site">
                <i className="fi fi-rs-info sm:text-[14px] md:text-[12px] text-gray-400 flex justify-center items-center"></i>
              </Tooltip>
            </div>
            <div className="flex justify-start gap-4 pt-1">
              <div
                onMouseEnter={() => {
                  setSelecting("regular");
                }}
                onMouseDown={() => {
                  setSelecting("regular");
                }}
              >
                <RadioInput
                  title="Regular Slots Per Day"
                  value={"regular"}
                  isChecked={selectedBuyingOption === "regular" ? true : false}
                  onChange={() => {
                    handleRegularVsCohortSelection("regular");
                  }}
                />
              </div>
              <div
                onMouseEnter={() => {
                  setSelecting("cohort");
                }}
                onMouseDown={() => {
                  setSelecting("cohort");
                }}
              >
                <RadioInput
                  title="Cohort Slots Per Day"
                  value={"cohort"}
                  isChecked={selectedBuyingOption === "cohort" ? true : false}
                  onChange={() => {
                    handleRegularVsCohortSelection("cohort");
                  }}
                />
              </div>
            </div>
          </div>

          <div className="px-4 fixed bottom-0 left-0 w-full bg-[#FFFFFF]">
            <Footer
              handleBack={() => {
                setCurrentStep(step - 1);
              }}
              handleSave={() => {
                if (isDisabled) {
                  message.error("Please  confirm screen selection");
                } else {
                  dispatch(
                    addDetailsToCreateCampaign({
                      pageName: "Compare Plan Page",
                      id: pathname.split("/").splice(-1)[0],
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

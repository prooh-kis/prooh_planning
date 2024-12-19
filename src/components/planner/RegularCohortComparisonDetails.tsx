import { useEffect, useState } from "react";
import { RadioInput } from "../atoms/RadioInput";
import { VerticalLine } from "../molecules/VerticalLine";
import {
  RegularCohortSlotsCampaignTable,
  RegularCohortSummaryTable,
} from "../tables";
import { useDispatch, useSelector } from "react-redux";
import {
  getRegularVsCohortPriceData,
} from "../../actions/screenAction";
import {
  getAllLocalStorageData,
  getDataFromLocalStorage,
  saveDataOnLocalStorage,
} from "../../utils/localStorageUtils";
import { Footer } from "../../components/footer";
import { message, Tooltip } from "antd";
import { addDetailsToCreateCampaign } from "../../actions/campaignAction";
import { useLocation } from "react-router-dom";
import { CAMPAIGN, COST_SUMMARY, FULL_CAMPAIGN_PLAN, REGULAR_VS_COHORT_PRICE_DATA, SCREEN_SUMMARY_SELECTION } from "../../constants/localStorageConstants";
import { Loading } from "../../components/Loading";

export const RegularCohortComparisonDetails = ({campaignId, setCurrentStep, step}: any) => {

  const dispatch = useDispatch<any>();
  const { pathname } = useLocation();

  // for beauty
  const [selecting, setSelecting] = useState<any>(null);

  // for beauty

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
    if (!priceData) {
      dispatch(getRegularVsCohortPriceData({
        id: campaignId,
        screenIds: screenIds,
        cohorts: cohorts,
        gender: gender,
        duration: duration,
      }));
    } else {
      saveDataOnLocalStorage(
        REGULAR_VS_COHORT_PRICE_DATA,
        {[campaignId]: priceData}
      );
    }
    saveDataOnLocalStorage(SCREEN_SUMMARY_SELECTION, {[campaignId]: {}});
  }, [priceData, cohorts, dispatch, duration, gender, screenIds, campaignId]);

  const handleRegularVsCohortSelection = (type: any) => {
    setSelectedBuyingOption(type);
    setShowSummary(null);
    setIsDisabled(false);
    const campaign = getDataFromLocalStorage(FULL_CAMPAIGN_PLAN)?.[campaignId] || {};
    campaign["selectedType"] = type;
    const tcamp = {
      [campaign?._id || campaignId]: campaign,
    };
    saveDataOnLocalStorage(FULL_CAMPAIGN_PLAN, tcamp);
    // dispatch(getScreenSummaryData({
    //   id: pathname.split("/").splice(-1)[0],
    //   type: type
    // }));
  }

  return (
    <div className="w-full pt-3">
      <div>
        <h1 className="text-[24px] text-primaryText font-semibold">
          Compare Plan
        </h1>
        <p className="text-[14px] text-secondaryText">
          Choose between a Regular Slots Campaign or a customize your slots with
          cohort data
        </p>
      </div>
      {loadingPriceData ? (
        <Loading/>
      ) : errorPriceData ? (
        <p>Error: {errorPriceData}</p>
      ) : (
        <div className="flex gap-2">
          <div className="ml-[-25px] pt-6">
            <VerticalLine height="120px" color="#B5B5B5" thickness="1px" />
            <h1 className="py-4">vs</h1>
            <VerticalLine height="100px" color="#B5B5B5" thickness="1px" />
          </div>
          <div className="w-full">
            <div className="py-2">
              <div className="py-2 flex items-center gap-2">
                <h1 className="md:text-[16px] sm:text-[14px]">Regular slots per day buying</h1>
                <Tooltip
                  title="Regular slots only have those slots in a timezone, which have more than 4% of total audiences available on the site"
                >
                  <i className="fi fi-rs-info lg:text-[12px] md:text-[10px] text-gray-400 flex justify-center items-center"></i>
                </Tooltip>
              </div>
              <div className={`w-full ${selecting === "regular" ? "border border-blue-300 rounded" : ""}`}
                onMouseEnter={() => {
                  setSelecting("regular");
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
                <h1 className="md:text-[16px] sm:text-[14px]">Cohort slots per day buying</h1>
                <Tooltip
                  title="Cohort slots target your selected audiences using those slots in a timezone, which have more than 7% of total audiences available on the site"
                >
                  <i className="fi fi-rs-info lg:text-[12px] md:text-[10px] text-gray-400 flex justify-center items-center"></i>
                </Tooltip>
              </div>
              <div className={`w-full ${selecting === "cohort" ? "border border-blue-300 rounded" : ""}`}
                onMouseEnter={() => {
                  setSelecting("cohort");
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
      )}

      <div className="w-full">
        <div className="py-2 flex justify-start items-center gap-2">
          <h1 className="md:text-[16px] sm:text-[14px]">
            Choose your desired targeting option among the above
          </h1>
          <Tooltip
            title="Cohort slots target your selected audiences using those slots in a timezone, which have more than 7% of total audiences available on the site"
          >
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


      <div className="px-4 fixed bottom-0 left-0 w-full bg-white">
        <Footer
          handleBack={() => {
            setCurrentStep(step - 1);
          }}
          handleSave={() => {
            if (isDisabled) {
              message.error("Please  confirm screen selection");
            } else {
              dispatch(addDetailsToCreateCampaign({
                pageName: "Compare Plan Page",
                id: pathname.split("/").splice(-1)[0],
                regularTouchPointWiseSlotDetails: priceData?.regular?.touchPointData,
                cohortTouchPointWiseSlotDetails: priceData?.cohort?.touchPointData,
                selectedType: selectedBuyingOption,
                tableData: priceData?.[selectedBuyingOption]?.tableData,
              }));
              setCurrentStep(step + 1);
            };
          }}
          campaignId={campaignId}
        />
      </div>
    </div>
  );
};

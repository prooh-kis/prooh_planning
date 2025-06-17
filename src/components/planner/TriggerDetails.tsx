import { WeatherSegment } from "../../components/segments/WeatherSegment";
import { TabWithIcon } from "../../components/molecules/TabWithIcon";
import { VerticalStepperSlider } from "../../components/molecules/VerticalStepperSlide";
import { useCallback, useEffect, useState } from "react";
import { SportsSegment } from "../../components/segments/SportsSegment";
import { BuyVacantSlots } from "../../components/segments/BuyVacantSlots";
import { OpenBudgetSegment } from "../../components/segments/OpenBudgetSegment";
import { PrimaryButton } from "../../components/atoms/PrimaryButton";
import { formatNumber } from "../../utils/formatValue";
import { Footer } from "../../components/footer";
import { DropdownInput } from "../../components/atoms/DropdownInput";
import { message, Radio } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { addDetailsToCreateCampaign } from "../../actions/campaignAction";
import { useLocation } from "react-router-dom";
import { QuickSummaryReciept } from "../../components/segments/QuickSummaryReciept";
import {
  getPlanningPageFooterData,
  getTableDataForSelectTriggerPage,
} from "../../actions/screenAction";
import { ADD_DETAILS_TO_CREATE_CAMPAIGN_RESET } from "../../constants/campaignConstants";
import { CAMPAIGN_CREATION_ADD_DETAILS_TO_CREATE_CAMPAIGN_PLANNING_PAGE } from "../../constants/userConstants";
import {
  timeOptionSportsTrigger,
  weatherTabData,
} from "../../data/triggerData";

interface TriggerProps {
  setCurrentStep: (step: number) => void;
  step: number;
  campaignId?: any;
  successAddCampaignDetails?: any;
  campaignDetails?: any;
}
export const TriggerDetails = ({
  setCurrentStep,
  step,
  campaignId,
  campaignDetails,
}: TriggerProps) => {
  const dispatch = useDispatch<any>();
  const { pathname } = useLocation();

  const [currentStep1, setCurrentStep1] = useState<any>(1);
  const [currentTab, setCurrentTab] = useState<any>(1);

  const [isDisabled, setIsDisabled] = useState<any>(true);
  const [disableApply, setDisableApply] = useState<any>(true);
  const [triggerSelected, setTriggerSelected] = useState<any>(false);

  const [selectedTrigger, setSelectedTrigger] = useState<any>(null);
  const [selectedTriggerData, setSelectedTriggerData] = useState<any>({
    weatherTriggers: [],
    sportsTriggers: [],
    vacantSlots: [],
  });

  // console.log("selectedTrigger : ", selectedTrigger);
  // console.log("triggerSelected : ", triggerSelected);
  // console.log("selectedTriggerData : ", selectedTriggerData);
  // console.log("currentStep1  : ", currentStep1);
  const [minVal, setMinVal] = useState<any>(0);
  const [maxVal, setMaxVal] = useState<any>(0);
  const [rainType, setRainType] = useState<any>("0");
  const [aqi, setAqi] = useState<any>("");

  const [condition, setCondition] = useState<any>("");

  const [selectedMatchId, setSelectedMatchId] = useState<any>(null);
  const [sport, setSport] = useState<any>("");
  const [player, setPlayer] = useState<any>("");

  const [selectedBudget, setSelectedBudget] = useState<any>(null);
  const [selectedSOV, setSelectedSOV] = useState<any>(null);
  const [selectedTimeOptions, setSelectedTimeOptions] = useState<any>(300);

  const timeOptionsWeatherTrigger = [
    {
      label: "Forever",
      value: "0",
    },
  ];

  const detailsToCreateCampaignAdd = useSelector(
    (state: any) => state.detailsToCreateCampaignAdd
  );
  const {
    loading: loadingAddDetails,
    error: errorAddDetails,
    success: successAddDetails,
  } = detailsToCreateCampaignAdd;

  const tableDataForSelectTriggerPageGet = useSelector(
    (state: any) => state.tableDataForSelectTriggerPageGet
  );
  const {
    loading: loadingTriggerDetails,
    error: errorTriggerDetails,
    data: tableDataForSelectTrigger,
  } = tableDataForSelectTriggerPageGet;

  const handleSelectTrigger = useCallback(() => {
    setSelectedTriggerData(() => {
      return {
        weatherTriggers:
          selectedTrigger?.triggerType === "weather"
            ? [
                {
                  type: weatherTabData?.filter(
                    (w: any) => w.id === currentTab
                  )[0]?.value,
                  minVal: minVal,
                  maxVal: maxVal,
                  rainType: rainType,
                  aqi: aqi,
                  openBudgetSovPercent: selectedSOV,
                  budget: Number(selectedBudget),
                  period: Number(selectedTimeOptions),
                },
              ]
            : [],
        sportsTriggers:
          selectedTrigger?.triggerType === "sport"
            ? [
                {
                  sport: sport,
                  player: player,
                  matchId: selectedMatchId,
                  condition: condition,
                  openBudgetSovPercent: selectedSOV,
                  budget: Number(selectedBudget),
                  period: Number(selectedTimeOptions),
                },
              ]
            : [],
        vacantSlots:
          selectedTrigger?.triggerType === "empty"
            ? [
                {
                  type: "vacantSlots",
                  slotType: condition,
                  openBudgetSovPercent: selectedSOV,
                  budget: Number(selectedBudget),
                  period: Number(selectedTimeOptions),
                },
              ]
            : [],
      };
    });
  }, [
    selectedTrigger,
    minVal,
    maxVal,
    rainType,
    aqi,
    selectedSOV,
    selectedBudget,
    selectedTimeOptions,
    sport,
    player,
    selectedMatchId,
    condition,
    currentTab,
  ]);

  const handleSaveAndContinue = () => {
    if (pathname?.split("/").includes("view")) {
      setCurrentStep(step + 1);
      return;
    }

    // Check if any trigger is selected
    const hasTriggers =
      selectedTriggerData.weatherTriggers.length > 0 ||
      selectedTriggerData.sportsTriggers.length > 0 ||
      selectedTriggerData.vacantSlots.length > 0;

    if (!hasTriggers) {
      message.error("Please select at least one trigger before saving");
      return;
    }

    if (isDisabled) {
      message.error(
        "Please confirm budget for your selected trigger or skip this step"
      );
      return;
    }

    dispatch(
      addDetailsToCreateCampaign({
        event: CAMPAIGN_CREATION_ADD_DETAILS_TO_CREATE_CAMPAIGN_PLANNING_PAGE,
        pageName: "Add Triggers Page",
        id: campaignId,
        triggers: selectedTriggerData,
      })
    );
  };

  const handleSkipTriggerSelection = () => {
    if (confirm("Do you really want to skip this steps?")) {
      setIsDisabled(false);
      dispatch(
        addDetailsToCreateCampaign({
          event: CAMPAIGN_CREATION_ADD_DETAILS_TO_CREATE_CAMPAIGN_PLANNING_PAGE,
          pageName: "Add Triggers Page",
          id: campaignId,
          triggers: {
            weatherTriggers: [],
            sportsTriggers: [],
            vacantSlots: [],
          },
        })
      );
    }
  };

  // setting initial value  when page reload or came from future
  useEffect(() => {
    const trigger = campaignDetails?.triggers;
    if (trigger) {
      setTriggerSelected(true);
      setIsDisabled(false);
    }
    if (trigger?.weatherTriggers?.length > 0) {
      setSelectedTrigger({
        triggerType: "weather",
      });
      setMinVal(trigger?.weatherTriggers[0]?.minVal || 0);
      setMaxVal(trigger?.weatherTriggers[0]?.maxVal || 0);
      setRainType(trigger?.weatherTriggers[0]?.rainType || "0");
      setAqi(trigger?.weatherTriggers[0]?.aqi || "");
      setSelectedSOV(trigger?.weatherTriggers[0]?.openBudgetSovPercent || null);
      setSelectedBudget(
        Number(trigger?.weatherTriggers[0]?.budget).toFixed(0) || null
      );
      setMaxVal(trigger?.weatherTriggers[0]?.maxVal || 0);
      setSelectedTimeOptions(trigger?.weatherTriggers[0]?.period || 300);
    } else if (trigger?.sportsTriggers?.length > 0) {
      setSelectedTrigger({
        triggerType: "sport",
      });
      setSport(trigger?.sportsTriggers[0]?.sport || "");
      setPlayer(trigger?.sportsTriggers[0]?.player || "");
      setSelectedMatchId(trigger?.sportsTriggers[0]?.matchId || "");
      setCondition(trigger?.sportsTriggers[0]?.condition || "");
      setSelectedSOV(trigger?.sportsTriggers[0]?.openBudgetSovPercent || null);
      setSelectedBudget(
        Number(trigger?.sportsTriggers[0]?.budget).toFixed(0) || null
      );
      setSelectedTimeOptions(trigger?.sportsTriggers[0]?.period || 300);
    } else if (trigger?.vacantSlots?.length > 0) {
      setSelectedTrigger({
        triggerType: "empty",
      });
      setCondition(trigger?.sportsTriggers[0]?.condition || "");
      setSelectedSOV(trigger?.sportsTriggers[0]?.openBudgetSovPercent || null);
      setSelectedBudget(
        Number(trigger?.sportsTriggers[0]?.budget).toFixed(0) || null
      );
      setSelectedTimeOptions(trigger?.sportsTriggers[0]?.period || 300);
    }
  }, [campaignDetails, campaignId]);

  // useEffect(() => {
  //   if (selectedTrigger) {
  //     handleSelectTrigger();
  //   }
  // }, [handleSelectTrigger, selectedTrigger]);

  useEffect(() => {
    if (!campaignDetails) return;
    if (errorAddDetails) {
      message.error("Error in add campaign details...");
    }
    if (errorTriggerDetails) {
      message.error("Error in getting impression wise data...");
    }
    dispatch(
      getTableDataForSelectTriggerPage({ duration: 30, impactFactor: 0.1 })
    );
    dispatch(
      getPlanningPageFooterData({
        id: campaignDetails?._id,
        pageName: "Add Triggers Page",
      })
    );
  }, [dispatch, campaignDetails, errorAddDetails, errorTriggerDetails]);

  useEffect(() => {
    if (successAddDetails) {
      dispatch({
        type: ADD_DETAILS_TO_CREATE_CAMPAIGN_RESET,
      });
      setCurrentStep(step + 1);
    }
  }, [successAddDetails, step, setCurrentStep, dispatch]);

  return (
    <div className="w-full">
      <div className="pb-2">
        <h1 className="text-[24px] text-primaryText font-semibold">
          Add Triggers
        </h1>
        {pathname?.split("/")?.includes("triggerbasedplan") ? (
          <div className="flex items-center justify-start gap-4">
            <Radio.Group
              value={currentStep1}
              onChange={(e) => {
                const value = e.target.value;
                setCurrentStep1(value);
                setSelectedTrigger({
                  triggerType: value === 1 ? "weather" : "sport",
                });
              }}
              options={[
                { label: "Weather Conditions", value: 1 },
                { label: "Sports Event", value: 3 },
              ]}
              className="text-[16px]"
            ></Radio.Group>
          </div>
        ) : (
          <div className="flex items-center justify-between">
            <p className="text-[14px] text-secondaryText py-1">
              Choose any one of your desired triggers for contextual targeting
              of you target audiences
            </p>
            {!pathname?.split("/").includes("view") && (
              <p
                className="text-[14px] text-primaryButton underline cursor-pointer"
                onClick={handleSkipTriggerSelection}
              >
                Skip / Remove trigger selection
              </p>
            )}
          </div>
        )}
      </div>
      <div className="grid grid-cols-12 gap-4 w-full pb-16">
        {!pathname?.split("/").includes("triggerbasedplan") && (
          <div className="col-span-4 border rounded py-5 flex flex-col justify-between">
            <div className="">
              <VerticalStepperSlider
                step={currentStep1}
                setStep={setCurrentStep1}
                steps={3}
                setTrigger={setSelectedTrigger}
              />
            </div>
            <p className="p-2 text-[14px] text-[#AF0D0D]">
              <strong>Note:- </strong>
              The Creative of such campaigns shall be contextual. You will be
              asked to upload a separate creative for your trigger based
              campaigns
            </p>
          </div>
        )}
        <div
          className={`${
            pathname?.split("/")?.includes("triggerbasedplan")
              ? "col-span-6"
              : "col-span-8"
          } border rounded p-4 h-[60vh] overflow-y-auto scrollbar-minimal `}
        >
          {currentStep1 === 1 ? (
            <div className="">
              <div className="flex gap-2 justify-between">
                <div className="flex items-center gap-4">
                  <div className="rounded-full bg-[#F5F9FF] p-3 w-16 h-16 flex items-center justify-center">
                    <i className="fi fi-sr-cloud-sun text-[30px] flex items-center text-primaryButton"></i>
                  </div>
                  <div>
                    <h1 className="text-[24px] font-semibold">
                      Weather Situation
                    </h1>
                    <p className="text-[14px]">Choose your weather condition</p>
                  </div>
                </div>
                <div
                  className="flex items-center cursor-pointer"
                  onClick={() => {
                    message.info("Coming soon, stay tuned...");
                  }}
                >
                  <p className="text-[12px] text-primaryButton underline">
                    View use cases
                  </p>
                </div>
              </div>
              <div className="py-1">
                <TabWithIcon
                  trigger={true}
                  justify={true}
                  currentTab={currentTab}
                  setCurrentTab={setCurrentTab}
                  tabData={weatherTabData}
                />
              </div>

              <WeatherSegment
                minVal={minVal}
                setMinVal={setMinVal}
                maxVal={maxVal}
                setMaxVal={setMaxVal}
                rainType={rainType}
                setRainType={setRainType}
                currentTab={Number(currentTab)}
                aqi={aqi}
                setAqi={setAqi}
                setTriggerSelected={setTriggerSelected}
              />
            </div>
          ) : currentStep1 === 3 ? (
            <div>
              <div className="flex gap-2 justify-between">
                <div className="flex items-center gap-4">
                  <div className="rounded-full bg-[#28A61D12] p-3 w-16 h-16 flex items-center justify-center">
                    <i className="fi fi-sr-cricket text-[30px] flex items-center text-[#5A9D42]"></i>
                  </div>
                  <div>
                    <h1 className="text-[24px] font-semibold">
                      Sporting Events
                    </h1>
                    <p className="text-[14px]">Choose your sports event</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <p className="text-[12px] text-primaryButton underline">
                    View use cases
                  </p>
                </div>
              </div>
              <div className="py-2">
                <SportsSegment
                  campaignDetails={campaignDetails}
                  selectedMatchId={selectedMatchId}
                  setSelectedMatchId={setSelectedMatchId}
                  sport={sport}
                  setSport={setSport}
                  player={player}
                  setPlayer={setPlayer}
                  condition={condition}
                  setCondition={setCondition}
                  setTriggerSelected={setTriggerSelected}
                />
              </div>
            </div>
          ) : (
            <div>
              <div className="flex gap-2 justify-between">
                <div className="flex items-center gap-4">
                  <div className="rounded-full bg-[#FF935726] p-3 w-16 h-16 flex items-center justify-center">
                    <i className="fi fi-sr-sign-posts text-[30px] flex items-center text-[#FF9357]"></i>
                  </div>
                  <div>
                    <h1 className="text-[24px] font-semibold">
                      Buy Vacant Slot
                    </h1>
                    <p className="text-[14px]">
                      Buy Vacant slots at discounted cost
                    </p>
                  </div>
                </div>
                <div className="flex items-center">
                  <p className="text-[12px] text-primaryButton underline">
                    View use cases
                  </p>
                </div>
              </div>
              <BuyVacantSlots
                condition={condition}
                setCondition={setCondition}
                setTriggerSelected={setTriggerSelected}
              />
            </div>
          )}
          <div className="">
            <OpenBudgetSegment
              totalCost={
                pathname?.split("/")?.includes("triggerbasedplan")
                  ? tableDataForSelectTrigger?.["Total Budget"]
                  : campaignDetails?.totalCampaignBudget
              }
              selectedSOV={selectedSOV}
              selectedBudget={selectedBudget}
              setSelectedBudget={setSelectedBudget}
              setSelectedSOV={setSelectedSOV}
              triggerSelected={triggerSelected}
              setDisableApply={setDisableApply}
            />
          </div>

          <div className="flex justify-between items-center px-2">
            <div>
              <div className="flex items-center gap-4 pb-1">
                <p className="text-[12px] text-[#969696]">
                  Click here to change the time period for the trigger
                </p>
                <DropdownInput
                  height={"8"}
                  width={"20"}
                  placeHolder={"Set Time"}
                  selectedOption={selectedTimeOptions}
                  setSelectedOption={setSelectedTimeOptions}
                  options={(currentStep1 === 1
                    ? timeOptionsWeatherTrigger
                    : timeOptionSportsTrigger
                  )?.map((m: any) => {
                    return {
                      label: m.label,
                      value: m.value,
                    };
                  })}
                />
              </div>
              <h1 className="text-[16px] text-primary  pt-2">
                Additional budget of
                <span className="font-bold text-[#129BFF]">
                  {" "}
                  &#8377;{formatNumber(Number(selectedBudget).toFixed(0))}{" "}
                </span>
                for your campaign triggers
              </h1>
            </div>

            {!disableApply && (
              <PrimaryButton
                height="h-10"
                width="w-36"
                disabled={disableApply}
                rounded="rounded-full"
                title="Apply Trigger"
                textSize="text-[14px]"
                action={() => {
                  handleSelectTrigger();
                  setIsDisabled(false);
                  message.success(
                    "Trigger applied, please confirm and proceed..."
                  );
                }}
              />
            )}
          </div>
        </div>

        {pathname?.split("/").includes("triggerbasedplan") && (
          <div className="col-span-6 h-full">
            <QuickSummaryReciept
              selectedTrigger={
                currentStep1 === 1 ? "Weather Conditions" : "Sports Event"
              }
              tableDataForSelectTrigger={tableDataForSelectTrigger}
            />
          </div>
        )}
      </div>

      <div className="px-4 fixed bottom-0 left-0 w-full bg-[#FFFFFF] z-10">
        <Footer
          mainTitle={isDisabled ? "Select to Confirm" : "Continue"}
          handleBack={() => {
            setCurrentStep(step - 1);
          }}
          handleSave={handleSaveAndContinue}
          campaignId={campaignId}
          pageName="Add Triggers Page"
          loadingCost={loadingTriggerDetails || loadingAddDetails}
          successCampaignDetails={successAddDetails}
        />
      </div>
    </div>
  );
};

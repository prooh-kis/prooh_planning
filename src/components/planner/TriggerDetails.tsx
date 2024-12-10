import { WeatherSegment } from "../../components/segments/WeatherSegment";
import { TabWithIcon } from "../molecules/TabWithIcon";
import { VerticalStepperSlider } from "../../components/molecules/VerticalStepperSlide";
import { useCallback, useEffect, useState } from "react";
import { CheckboxInput } from "../../components/atoms/CheckboxInput";
import { SportsSegment } from "../../components/segments/SportsSegment";
import { BuyVacantSlots } from "../../components/segments/BuyVacantSlots";
import { OpenBudgetSegment } from "../../components/segments/OpenBudgetSegment";
import { PrimaryButton } from "../../components/atoms/PrimaryButton";
import { formatNumber } from "../../utils/formatValue";
import { Footer } from "../../components/footer";
import { DropdownInput } from "../../components/atoms/DropdownInput";
import {
  getDataFromLocalStorage,
  saveDataOnLocalStorage,
} from "../../utils/localStorageUtils";
import {
  COST_SUMMARY,
  FULL_CAMPAIGN_PLAN,
  SELECTED_TRIGGER,
} from "../../constants/localStorageConstants";
import { message } from "antd";
import { useDispatch } from "react-redux";
import { addDetailsToCreateCampaign } from "../../actions/campaignAction";
import { useLocation } from "react-router-dom";
import { RadioInput } from "../../components/atoms/RadioInput";
import { QuickSummaryReciept } from "../../components/segments/QuickSummaryReciept";
import { getTableDataForSelectTriggerPage } from "../../actions/screenAction";
import { useSelector } from "react-redux";
interface TriggerProps {
  setCurrentStep: (step: number) => void;
  step: number;
  campaignId?: any;
}
export const TriggerDetails = ({ setCurrentStep, step, campaignId }: TriggerProps) => {
  const dispatch = useDispatch<any>();
  const { pathname } = useLocation();

  const [currentStep1, setCurrentStep1] = useState<any>(1);
  const [currentTab, setCurrentTab] = useState<any>(1);

  const [isDisabled, setIsDisabled] = useState<any>(true);
  const [disableApply, setDisableApply] = useState<any>(true);

  const [selectedTrigger, setSelectedTrigger] = useState<any>({
    triggerType: "weather",
  });
  const [minVal, setMinVal] = useState<any>(0);
  const [maxVal, setMaxVal] = useState<any>(0);
  const [rainType, setRainType] = useState<any>("0");
  const [aqi, setAqi] = useState<any>("");

  const [condition, setCondition] = useState<any>("");

  const [selectedMatchId, setSelectedMatchId] = useState<any>("");
  const [sport, setSport] = useState<any>("");
  const [player, setPlayer] = useState<any>("");

  const [selectedBudget, setSelectedBudget] = useState<any>(null);
  const [selectedSOV, setSelectedSOV] = useState<any>(1);
  const [selectedTimeOptions, setSelectedTimeOptions] = useState<any>(300);

  const timeOptions = [
    {
      label: "5 Mins",
      value: "300",
    },
    {
      label: "15 Mins",
      value: "900",
    },
    {
      label: "30 Mins",
      value: "1800",
    },
    {
      label: "1 Hrs",
      value: "3600",
    },
    {
      label: "2 Hrs",
      value: "7200",
    },
    {
      label: "3 Hrs",
      value: "10800",
    },
    {
      label: "4 Hrs",
      value: "14400",
    },
  ];

  const weatherTabData = () => {
    return [
      {
        icon: <i className="fi fi-tr-summer flex items-center"></i>,
        label: "Temperature",
        value: "temperature",
        id: 1,
      },
      {
        icon: <i className="fi fi-ts-cloud-sun-rain flex items-center"></i>,
        label: "Rain",
        value: "rain",
        id: 2,
      },
      {
        icon: <i className="fi fi-ts-pollution flex items-center"></i>,
        label: "AQI",
        value: "aqi",
        id: 3,
      },
    ];
  };

  const tableDataForSelectTriggerPageGet = useSelector(
    (state: any) => state.tableDataForSelectTriggerPageGet
  );
  const {
    loading,
    error,
    data: tableDataForSelectTrigger,
  } = tableDataForSelectTriggerPageGet;

  const handleSelectTrigger = useCallback(() => {
    saveDataOnLocalStorage(SELECTED_TRIGGER, {
      weatherTriggers: [],
      sportsTriggers: [],
      vacantSlots: [],
    });

    saveDataOnLocalStorage(SELECTED_TRIGGER, {
      weatherTriggers:
        selectedTrigger?.triggerType === "weather"
          ? [
              {
                type: weatherTabData()?.filter(
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
    });
  }, [
    currentTab,
    selectedTrigger,
    selectedSOV,
    selectedBudget,
    condition,
    sport,
    player,
    selectedMatchId,
    selectedTimeOptions,
    minVal,
    maxVal,
    rainType,
    aqi,
  ]);

  const handleSaveAndContinue = () => {
    console.log("handle save : ", getDataFromLocalStorage(SELECTED_TRIGGER));
    if (isDisabled) {
      message.error(
        "Please confirm budget for your selected trigger or skip this step"
      );
    } else {
      dispatch(
        addDetailsToCreateCampaign({
          pageName: "Add Triggers Page",
          id: pathname.split("/").splice(-1)[0],
          triggers: getDataFromLocalStorage(SELECTED_TRIGGER),
        })
      );
      setCurrentStep(step + 1);
    }
  };

  const handleSkipTriggerSelection = () => {
    if (confirm("Do you really want to skip this steps?")) {
      saveDataOnLocalStorage(SELECTED_TRIGGER, {
        weatherTriggers: [],
        sportsTriggers: [],
        vacantSlots: [],
      });
      setIsDisabled(false);
      dispatch(
        addDetailsToCreateCampaign({
          pageName: "Add Triggers Page",
          id: pathname.split("/").splice(-1)[0],
          triggers: getDataFromLocalStorage(SELECTED_TRIGGER),
        })
      );
      setCurrentStep(step + 1);
    }
  };

  // setting initial value  when page reload or came from future
  useEffect(() => {
    const trigger = getDataFromLocalStorage(SELECTED_TRIGGER);
    if (trigger?.weatherTriggers?.length > 0) {
      setSelectedTrigger({
        triggerType: "weather",
      });
      setMinVal(trigger?.weatherTriggers[0]?.minVal || 0);
      setMaxVal(trigger?.weatherTriggers[0]?.maxVal || 0);
      setRainType(trigger?.weatherTriggers[0]?.rainType || "0");
      setAqi(trigger?.weatherTriggers[0]?.aqi || "");
      setSelectedSOV(trigger?.weatherTriggers[0]?.openBudgetSovPercent || null);
      setSelectedBudget(trigger?.weatherTriggers[0]?.budget || null);
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
      setSelectedBudget(trigger?.sportsTriggers[0]?.budget || null);
      setSelectedTimeOptions(trigger?.sportsTriggers[0]?.period || 300);
    } else if (trigger?.vacantSlots?.length > 0) {
      setSelectedTrigger({
        triggerType: "empty",
      });
      setCondition(trigger?.sportsTriggers[0]?.condition || "");
      setSelectedSOV(trigger?.sportsTriggers[0]?.openBudgetSovPercent || null);
      setSelectedBudget(trigger?.sportsTriggers[0]?.budget || null);
      setSelectedTimeOptions(trigger?.sportsTriggers[0]?.period || 300);
    }
  }, []);

  useEffect(() => {
    if (selectedTrigger) {
      handleSelectTrigger();
    }
  }, [handleSelectTrigger, selectedTrigger]);

  useEffect(() => {
    dispatch(getTableDataForSelectTriggerPage({ duration: 30, impactFactor: 0.1 }));
}, [dispatch])
  return (
    <div className="w-full py-3">
      <div>
        <h1 className="text-[24px] text-primaryText font-semibold">
          Add Triggers
        </h1>
        {pathname?.split("/")?.includes("triggerbasedplan") ? (
          <div className="flex items-center justify-start gap-4">
            <div className="flex justify-between py-1">
              <RadioInput
                title="Weather Conditions"
                value="1"
                isChecked={currentStep1 === Number("1") ? true : false}
                onChange={() => {
                  setCurrentStep1(Number("1"));
                  setSelectedTrigger({ triggerType: "weather" });
                }}
              />
            </div>
            <div className="flex justify-between py-1">
              <RadioInput
                title="Sports Event"
                value="2"
                isChecked={currentStep1 === Number("2") ? true : false}
                onChange={() => {
                  // setCurrentStep1(Number("2"));
                  // setSelectedTrigger({ triggerType: "sport" });
                }}
              />
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-between">
            <p className="text-[14px] text-secondaryText py-2">
              Choose any one of your desired triggers for contextual targeting of
              you target audiences
            </p>
            <p
              className="text-[14px] text-primaryButton underline cursor-pointer"
              onClick={handleSkipTriggerSelection}
            >
              Skip trigger selection
            </p>
          </div>
        )}

      </div>
      <div className="grid grid-cols-12 gap-4">
        {!pathname?.split("/").includes("triggerbasedplan") && (
          <div className="col-span-4 border rounded py-5 flex flex-col justify-between">
            <div className="h-1/2">
              <VerticalStepperSlider
                step={currentStep1}
                setStep={setCurrentStep1}
                steps={3}
                setTrigger={setSelectedTrigger}
                trigger={selectedTrigger}
              />
            </div>
            <p className="p-2 text-[14px] text-[#AF0D0D]">
              <strong>Note:- </strong>
              The Creative of such campaigns shall be contextual. You will be
              asked to upload a separate creative for your trigger based campaigns
            </p>
          </div>
        )}
  
        <div className={`${pathname?.split("/")?.includes("triggerbasedplan") ? "col-span-6" : "col-span-8"} border rounded p-5`}>
          {currentStep1 === 1 ? (
            <div>
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
                <div className="flex items-center">
                  <p className="text-[12px] text-primaryButton underline">
                    View use cases
                  </p>
                </div>
              </div>
              <div className="py-2">
                <TabWithIcon
                  trigger={true}
                  currentTab={currentTab}
                  setCurrentTab={setCurrentTab}
                  tabData={weatherTabData()}
                />
              </div>

              <WeatherSegment
                minVal={minVal}
                setMinVal={setMinVal}
                maxVal={maxVal}
                setMaxVal={setMaxVal}
                rainType={rainType}
                setRainType={setRainType}
                currentTab={currentTab}
                aqi={aqi}
                setAqi={setAqi}
              />
            </div>
          ) : currentStep1 === 2 ? (
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
                  selectedMatchId={selectedMatchId}
                  setSelectedMatchId={setSelectedMatchId}
                  sport={sport}
                  setSport={setSport}
                  player={player}
                  setPlayer={setPlayer}
                  condition={condition}
                  setCondition={setCondition}
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
              />
            </div>
          )}
          <div className="" onClick={() => setDisableApply(false)}>
            <OpenBudgetSegment
              totalCost={getDataFromLocalStorage(FULL_CAMPAIGN_PLAN)?.[campaignId]?.totalCampaignBudget}
              selectedSOV={selectedSOV}
              selectedBudget={selectedBudget}
              setSelectedBudget={setSelectedBudget}
              setSelectedSOV={setSelectedSOV}
            />
          </div>

          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4">
              <p className="text-[12px] text-[#969696]">
                Click here to change the time period for the trigger
              </p>
              <DropdownInput
                height={"8"}
                width={"20"}
                placeHolder={"Set Time"}
                selectedOption={selectedTimeOptions}
                setSelectedOption={setSelectedTimeOptions}
                options={timeOptions?.map((m: any) => {
                  return {
                    label: m.label,
                    value: m.value,
                  };
                })}
              />
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
                  message.success("Trigger applied, please confirm and proceed...");
                }}
              />
            )}

          </div>
        </div>
        {pathname?.split("/").includes("triggerbasedplan") && (
          <div className="col-span-6 h-full">
            <QuickSummaryReciept selectedTrigger={currentStep1 === 1 ? "Weather Conditions" : "Sports Event"} tableDataForSelectTrigger={tableDataForSelectTrigger} />
          </div>
        )}
      </div>
      <div className="flex gap-4 py-5">
        <CheckboxInput
          label={
            <>
              Kindly re-confirm the additional budget of
              <span className="font-bold">
                {" "}
                &#8377;{formatNumber(Number(selectedBudget))}{" "}
              </span>
              for your campaign triggers
            </>
          }
          disabled={disableApply}
          onChange={() => {
            setIsDisabled(!isDisabled);
          }}
        />
      </div>
      <div className="px-4 fixed bottom-0 left-0 w-full bg-white">
        <Footer
          handleBack={() => {
            setCurrentStep(step - 1);
          }}
          handleSave={handleSaveAndContinue}
          campaignId={campaignId}
        />
      </div>
    </div>
  );
};

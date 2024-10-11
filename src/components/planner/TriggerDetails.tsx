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
import { getDataFromLocalStorage, saveDataOnLocalStorage } from "../../utils/localStorageUtils";
import { SELECTED_TRIGGER } from "../../constants/localStorageConstants";
import { message } from "antd";
import { useDispatch } from "react-redux";
import { addDetailsToCreateCampaign } from "../../actions/campaignAction";
import { useLocation } from "react-router-dom";
interface TriggerProps {
  setCurrentStep: (step: number) => void;
  step: number;
}
export const TriggerDetails = ({ setCurrentStep, step }: TriggerProps) => {

  const dispatch = useDispatch<any>();
  const { pathname } = useLocation();

  const [currentStep1, setCurrentStep1] = useState<any>(1);
  const [currentTab, setCurrentTab] = useState<any>(1);

  const [isDisabled, setIsDisabled] = useState<any>(true);

  const [selectedTrigger, setSelectedTrigger] = useState<any>({ triggerType: "weather"});
  const [minVal, setMinVal] = useState<any>(0);
  const [maxVal, setMaxVal] = useState<any>(0);
  const [rainType, setRainType] = useState<any>("0");
  const [aqi, setAqi] = useState<any>("");

  const [condition, setCondition] = useState<any>("");

  const [selectedMatchId, setSelectedMatchId] = useState<any>("");
  const [sport, setSport] = useState<any>("");
  const [player, setPlayer] = useState<any>("");

  const [selectedBudget, setSelectedBudget] = useState<any>(null);
  const [selectedSOV, setSelectedSOV] = useState<any>(null);
  const [selectedTimeOptions, setSelectedTimeOptions] = useState<any>(300)

  const timeOptions = [{
    label: "1 Hrs",
    value: "3600"
  },{
    label: "2 Hrs",
    value: "7200"
  },{
    label: "3 Hrs",
    value: "10800"
  },{
    label: "4 Hrs",
    value: "14400"
  }];

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
  ]};


  const handleSelectTrigger = useCallback(() => {
    saveDataOnLocalStorage(SELECTED_TRIGGER, {
      weatherTriggers: selectedTrigger?.triggerType === "weather" ? {
        type: weatherTabData()?.filter((w: any) => w.id === currentTab)[0]?.value,
        minVal: minVal,
        maxVal: maxVal,
        rainType: rainType,
        aqi: aqi,
        openBudgetSovPercent: selectedSOV,
        budget: Number(selectedBudget),
        period: Number(selectedTimeOptions),
      } : {},
      sportsTriggers: selectedTrigger?.triggerType === "sport" ? {
        sport: sport,
        player: player,
        matchId: selectedMatchId,
        condition: condition,
        openBudgetSovPercent: selectedSOV,
        budget: Number(selectedBudget),
        period: Number(selectedTimeOptions),

      } : {},
      vacantSlots: selectedTrigger?.triggerType === "empty" ? {
        type: "vacantSlots",
        slotType: condition,
        openBudgetSovPercent: selectedSOV,
        budget: Number(selectedBudget),
        period: Number(selectedTimeOptions),

      } : {},
    })
  },[
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

  useEffect(() => {
    if (selectedTrigger) {
      handleSelectTrigger();      
    }
  },[handleSelectTrigger, selectedTrigger])
  return (
    <div className="w-full py-3">
      <div>
        <h1 className="text-[24px] text-primaryText font-semibold">
          Add Triggers
        </h1>
        <p className="text-[14px] text-secondaryText py-2">
          Choose any one of your desired triggers for contextual targeting of
          you target audiences
        </p>
      </div>
      <div className="grid grid-cols-12 gap-4">
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
        <div className="col-span-8 border rounded p-5">
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
                      Buy Vacant slots at 50% discount
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
          <OpenBudgetSegment
            selectedSOV={selectedSOV}
            selectedBudget={selectedBudget}
            setSelectedBudget={setSelectedBudget}
            setSelectedSOV={setSelectedSOV}
          />
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
                options={
                  timeOptions?.map((m: any) => {
                    return {
                      label: m.label,
                      value: m.value
                    }
                  })
                } 
              />
            </div>
            {/* <PrimaryButton
              height="h-10"
              width="w-36"
              rounded="rounded-full"
              title="Apply Creative"
              textSize="text-[14px]"
              action={handleSelectTrigger}
            /> */}
          </div>
        </div>
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
          onChange={() => {setIsDisabled(!isDisabled)}}
        />
      </div>
      <div className="px-4 fixed bottom-0 left-0 w-full bg-white">
        <Footer
          handleBack={() => {
            setCurrentStep(step - 1);
          }}
          handleSave={() => {
            if (isDisabled) {
              message.error("Please confirm budget for your selected trigger");
            } else {
              dispatch(addDetailsToCreateCampaign({
                pageName: "Add Triggers Page",
                id: pathname.split("/").splice(-1)[0],
                triggers: getDataFromLocalStorage(SELECTED_TRIGGER)
              }));
              setCurrentStep(step + 1);
            };
          }}
          totalScreensData={{}}
        />
      </div>
    </div>
  );
};

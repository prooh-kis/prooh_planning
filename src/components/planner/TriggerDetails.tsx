import { WeatherSegment } from "../../components/segments/WeatherSegment";
import { TabWithIcon } from "../molecules/TabWithIcon";
import { VerticalStepperSlider } from "../../components/molecules/VerticalStepperSlide";
import { useState } from "react";
import { CheckboxInput } from "../../components/atoms/CheckboxInput";
import { SportsSegment } from "../../components/segments/SportsSegment";
import { BuyVacantSlots } from "../../components/segments/BuyVacantSlots";
import { OpenBudgetSegment } from "../../components/segments/OpenBudgetSegment";
import { PrimaryButton } from "../../components/atoms/PrimaryButton";
import { formatNumber } from "../../utils/formatValue";
import { Footer } from "../../components/footer";
interface TriggerProps {
  setCurrentStep: (step: number) => void;
  step: number;
}
export const TriggerDetails = ({ setCurrentStep, step }: TriggerProps) => {
  const [currentStep1, setCurrentStep1] = useState<any>(1);
  const [currentTab, setCurrentTab] = useState<any>(1);

  const [selectedTrigger, setSelectedTrigger] = useState<any>({});
  const [selectedBudget, setSelectedBudget] = useState<any>(null);
  const [selectedSOV, setSelectedSOV] = useState<any>(null);

  const weatherTabData = [
    {
      icon: <i className="fi fi-tr-summer flex items-center"></i>,
      label: "Temperature",
      id: 1,
    },
    {
      icon: <i className="fi fi-ts-cloud-sun-rain flex items-center"></i>,
      label: "Rain",
      id: 2,
    },
    {
      icon: <i className="fi fi-ts-pollution flex items-center"></i>,
      label: "AQI",
      id: 3,
    },
  ];
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
                  tabData={weatherTabData}
                />
              </div>

              <WeatherSegment currentTab={currentTab} />
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
                <SportsSegment />
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
              <BuyVacantSlots />
            </div>
          )}
          <OpenBudgetSegment
            selectedSOV={selectedSOV}
            selectedBudget={selectedBudget}
            setSelectedBudget={setSelectedBudget}
            setSelectedSOV={setSelectedSOV}
          />
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <p className="text-[12px] text-[#969696]">
                A trigger is set for uploading tigger creative towards the end
                of your planning
              </p>
            </div>
            <PrimaryButton
              height="h-10"
              width="w-36"
              rounded="rounded-full"
              title="Apply Creative"
              textSize="text-[14px]"
            />
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
              Kindly re-confirm the additional budget of
              <span className="font-bold"> INR 6000 </span>
              for trigger based ads
            </>
          }
        />
      </div>
      <div className="px-4 fixed bottom-0 left-0 w-full bg-white">
        <Footer
          handleBack={() => {
            setCurrentStep(step - 1);
          }}
          handleSave={() => {
            setCurrentStep(step + 1);
          }}
          totalScreensData={{}}
        />
      </div>
    </div>
  );
};

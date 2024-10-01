
import { WeatherSegment } from "../../components/segments/WeatherSegment";
import { TabWithIcon } from "../../components/TabWithIcon";
import { VerticalStepperSlider } from "../../components/molecules/VerticalStepperSlide";
import { useState } from "react";
import { CheckboxInput } from "../../components/atoms/CheckboxInput";
import { SportsSegment } from "../../components/segments/SportsSegment";

export const TriggerDetails = (props: any) => {
  const [currentStep, setCurrentStep] = useState<any>(1);
  const [currentTab, setCurrentTab] = useState<any>(1)

  const weatherTabData = [
    {
      icon: <i className="fi fi-tr-summer flex items-center"></i>,
      label: "Temperature",
      id: 1,
    },
    {
      icon: <i className="fi fi-ts-cloud-sun-rain flex items-center"></i>,
      label: "Rain Forecast",
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
        <p className="text-[14px] text-secondaryText">
          Choose any one of your desired triggers for contextual targeting of you target audiences
        </p>
      </div>
      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-4 border rounded py-5 flex flex-col justify-between">
          <div className="h-1/2">
            <VerticalStepperSlider step={currentStep} setStep={setCurrentStep} steps={4} />
          </div>
          <p className="p-2">
            <strong>Note:- </strong>
            The Creative of such campaigns shall be contextual.
            You will be asked to upload a separate creative for your trigger based campaigns
          </p>
        </div>
        <div className="col-span-8 border rounded p-5">
          {currentStep === 1 ? (
            <div>
              <h1>Conditional to Weather Situations</h1>
              <TabWithIcon
                currentTab={currentTab}
                setCurrentTab={setCurrentTab}
                tabData={weatherTabData}
              />
              <WeatherSegment currentTab={currentTab}/>
            </div>
          ) : currentStep === 2 ? (
            <div>
              <h1>Conditional to Sporting Events</h1>
              <SportsSegment />
            </div>
          ) : (
            <div></div>
          )}
        </div>
      </div>
      <div className="flex gap-4 py-5">
        <CheckboxInput
          label={
            <>
              Kindly re-confirm the additional budget of 
              <span className="font-bold"> INR 6000 </span> 
              for trigger based ads
            </>
          }
        />
      </div>
    </div>
  )
}
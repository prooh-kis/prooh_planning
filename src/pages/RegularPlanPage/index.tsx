import React, { useState } from 'react';
import { StepperSlider } from '../../components/molecules/StepperSlider';
import { EnterCampaignBasicDetails, AudienceTouchpointDetails } from '../../components/planner';


export const RegularPlanPage: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<any>(1);
  return (
    <div className="w-full h-full">
      <div className="w-full pt-[60px]">
        <StepperSlider step={currentStep} setStep={setCurrentStep} steps={9}/>
      </div>
      <div className="w-full h-full flex justify-center items-top">
        {currentStep === 1 ? (
          <EnterCampaignBasicDetails 
            setCurrentStep={setCurrentStep} 
            step={currentStep} 
          />
        ) : currentStep === 2 ? (
          <AudienceTouchpointDetails />
        ) : (
          <div className="py-2 w-full h-full pb-5 flex justify-center items-center">
            {/* <EnterCampaignBasicDetails /> */}
          </div>
        )}
      </div>
    </div>
   
  );
};

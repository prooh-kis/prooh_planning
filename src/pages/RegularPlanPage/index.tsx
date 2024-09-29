import React, { useEffect, useState } from "react";
import { StepperSlider } from "../../components/molecules/StepperSlider";
import {
  AdvanceFiltersDetails,
  AudienceTouchPointsDetails,
  EnterCampaignBasicDetails,
} from "../../components/planner";
import { ScreenSummaryDetails } from "../../components";
import { useDispatch, useSelector } from 'react-redux';
import { getScreenDataByAudiences } from '../../actions/screenAction';
import { getAllLocalStorageData, saveDataOnLocalStorage } from '../../utils/localStorageUtils';


export const RegularPlanPage: React.FC = () => {
  const dispatch = useDispatch<any>();

  const [currentStep, setCurrentStep] = useState<any>(1);
  
   
  const allScreenDataByAudiencesGet = useSelector((state: any) => state.allScreenDataByAudiencesGet);
  const {
    loading: loadingASDBAG,
    error: errorASDBAG,
    data: dataASDBAG,
  } = allScreenDataByAudiencesGet

  useEffect(() => {
    dispatch(getScreenDataByAudiences({screenIds: []}))
  },[dispatch]);



  useEffect(() => {
    if (dataASDBAG) {
      saveDataOnLocalStorage(`screen_audience_data_1`, dataASDBAG);
    }
  },[dataASDBAG]);

  return (
    <div className="w-full h-full">
      <div className="w-full pt-[60px]">
        <StepperSlider step={currentStep} setStep={setCurrentStep} steps={9} />
      </div>
      <div className="w-full h-full flex justify-center items-top">
        {currentStep === 1 ? (
          <EnterCampaignBasicDetails
            setCurrentStep={setCurrentStep}
            step={currentStep}
          />
        ) : currentStep === 2 ? (
          <AudienceTouchPointsDetails
            setCurrentStep={setCurrentStep}
            step={currentStep}
            data={dataASDBAG}
            loading={loadingASDBAG}
            error={errorASDBAG}
          />
        ) : currentStep === 5 ? (
          <ScreenSummaryDetails
            setCurrentStep={setCurrentStep}
            step={currentStep}
          />
        ) : currentStep === 3  ? (
          <AdvanceFiltersDetails />
        ) : (
          <div className="py-2 w-full h-full pb-5 flex justify-center items-center">
            {/* <EnterCampaignBasicDetails /> */}
          </div>
        )}
      </div>
    </div>
  );
};

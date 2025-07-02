import { AdvanceFiltersDetailsPage } from "./AdvanceFiltersComponents/AdvanceFiltersDetailsPage";

interface AdvanceFiltersDetailsProps {
  step?: any;
  setCurrentStep?: any;
  loading?: boolean;
  error?: any;
  campaignId?: any;
  campaignDetails?: any;
}

export const AdvanceFiltersDetails = ({
  step,
  setCurrentStep,
  campaignId,
  campaignDetails,
}: AdvanceFiltersDetailsProps) => {
  
  return (
    <div className="">
      <AdvanceFiltersDetailsPage
       step={step}
       setCurrentStep={setCurrentStep}
       campaignId={campaignId}
       campaignDetails={campaignDetails}
      />
    </div>
  );
};

import { ScreenSummaryModel } from "../../components/popup/ScreenSummaryModel";
import { formatNumber } from "../../utils/formatValue";
import { useSelector } from "react-redux";
import { SkeletonLoader } from "../../components/molecules/SkeletonLoader";
import ButtonInput from "../../components/atoms/ButtonInput";

export const Footer = ({
  handleSave,
  handleBack,
  isDisabled = false,
  loadingCost,
  pageName,
  mainTitle,
}: any) => {
  const planningPageFooterDataGet = useSelector(
    (state: any) => state.planningPageFooterDataGet
  );
  const { loading, error, data: totalScreensData } = planningPageFooterDataGet;

  return (
    <div className="py-2 z-10 flex justify-between px-4">
      <div className="flex w-full justify-start items-center gap-4">
        {totalScreensData && (
          <div className="flex">
            <ScreenSummaryModel
              pageName={pageName}
              loadingCost={loadingCost}
              totalScreensData={totalScreensData?.finalSummaryStepWise}
            />
          </div>
        )}

        {loading ? (
          <div className="animate-pulse flex w-full justify-start truncate">
            <div className="w-full">
              <p className="text-[14px] font-semibold">
                Please wait while we calculate the cost of your desired plan...
              </p>
            </div>
            <div className="w-full">
              <SkeletonLoader />
            </div>
          </div>
        ) : (
          <div className="flex justify-between items-center gap-4 truncate">
            <div className="flex gap-2 truncate items-center">
              <h1 className="text-[12px] truncate">Cities</h1>
              <h1 className="text-[14px] font-semibold">
                {
                  totalScreensData?.finalSummaryStepWise?.[
                    totalScreensData?.finalSummaryStepWise.length - 1
                  ]?.totalCities
                }
              </h1>
            </div>
            <div className="flex gap-2 truncate items-center">
              <h1 className="text-[12px] truncate">Screens</h1>
              <h1 className="text-[14px] font-semibold">
                {
                  totalScreensData?.finalSummaryStepWise?.[
                    totalScreensData?.finalSummaryStepWise.length - 1
                  ]?.totalScreens
                }
              </h1>
            </div>
            <div className="flex gap-2 truncate items-center">
              <h1 className="text-[12px] truncate">Touchpoints</h1>
              <h1 className="text-[14px] font-semibold">
                {
                  totalScreensData?.finalSummaryStepWise?.[
                    totalScreensData?.finalSummaryStepWise.length - 1
                  ]?.totalTouchPoints
                }
              </h1>
            </div>
            <div className="flex gap-2 truncate items-center">
              <h1 className="text-[12px] truncate">Impressions</h1>
              <h1 className="text-[14px] font-semibold">
                {formatNumber(
                  totalScreensData?.finalSummaryStepWise?.[
                    totalScreensData?.finalSummaryStepWise.length - 1
                  ]?.totalImpression?.toFixed(0) || 0
                )}
              </h1>
            </div>
            <div className="flex gap-2 truncate items-center">
              <h1 className="text-[12px] truncate">Budget</h1>
              <h1 className="text-[14px] font-semibold">
                {" "}
                &#8377;
                {formatNumber(
                  totalScreensData?.finalSummaryStepWise?.[
                    totalScreensData?.finalSummaryStepWise.length - 1
                  ]?.totalCampaignBudget?.toFixed(0) || 0
                )}
              </h1>
            </div>
            <div className="flex gap-2 truncate items-center">
              <h1 className="text-[12px] truncate">CPM</h1>
              <h1 className="text-[14px] font-semibold">
                &#8377;
                {totalScreensData?.finalSummaryStepWise?.[
                  totalScreensData?.finalSummaryStepWise.length - 1
                ]?.totalCpm?.toFixed(2) || 0}
              </h1>
            </div>
            <div className="flex gap-2 truncate items-center">
              <h1 className="text-[12px] truncate">Price Per Slot</h1>
              <h1 className="text-[14px] font-semibold">
                &#8377;
                {totalScreensData?.finalSummaryStepWise?.[
                  totalScreensData?.finalSummaryStepWise.length - 1
                ]?.pricePerSlot?.toFixed(0) || 0}
              </h1>
            </div>
          </div>
        )}
      </div>
      {!loading && !error && (
        <div className="flex w-full justify-end items-center gap-4">
          <ButtonInput onClick={handleBack} variant="outline">
            Back
          </ButtonInput>

          <ButtonInput
            onClick={handleSave}
            variant="primary"
            loading={loadingCost}
          >
            {mainTitle}
          </ButtonInput>
        </div>
      )}
    </div>
  );
};

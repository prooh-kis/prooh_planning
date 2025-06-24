import { convertIntoDateAndTime } from "../../utils/dateAndTimeUtils";
import { formatNumber } from "../../utils/formatValue";

export const getCampaignBasicDetails = (campaignCreated) => {
  const basicDetails = [
    { label: "Campaign Name", value: campaignCreated?.name },
    { label: "Client Name", value: campaignCreated?.clientName },
    { label: "Brand Name", value: campaignCreated?.brandName },
    { label: "Campaign Type", value: campaignCreated?.campaignType },
    {
      label: "Trigger",
      value:
        campaignCreated?.triggers?.weatherTriggers?.length > 0
          ? "Weather Trigger"
          : campaignCreated?.triggers?.sportsTriggers?.length > 0
          ? "Sports Trigger"
          : campaignCreated?.triggers?.vacantSlots?.length > 0
          ? "Fill Vacancy Trigger"
          : "None",
    },
    { label: "Plan Created by", value: campaignCreated?.campaignPlannerName },
    {
      label: "Plan Approved by",
      value: campaignCreated?.campaignManagerName,
    },
  ];
  const durationDetails = [
    {
      label: "Start Date",
      value: convertIntoDateAndTime(campaignCreated?.startDate),
    },
    {
      label: "End Date",
      value: convertIntoDateAndTime(campaignCreated?.endDate),
    },
    // { label: "Duration", value: `${campaignCreated?.duration} Days ` },
    // {
    //   label: "Ends In",
    //   value: getCampaignEndingStatus(campaignCreated?.endDate)?.split(":")[1],
    // },
  ];

  const performanceMatrix = [
    {
      label: "Total Cities",
      value:
        campaignCreated?.finalSummaryStepWise[
          campaignCreated?.finalSummaryStepWise?.length - 1
        ].totalCities,
    },
    {
      label: "Total TouchPoints",
      value:
        campaignCreated?.finalSummaryStepWise[
          campaignCreated?.finalSummaryStepWise?.length - 1
        ].totalTouchPoints,
    },
    { label: "Total Screens", value: campaignCreated?.screenIds?.length },
    {
      label: "Audience Impression",
      value: formatNumber(campaignCreated?.totalImpression),
    },
    {
      label: "Reach",
      value: formatNumber(campaignCreated?.totalReach),
    },
    {
      label: "TG%",
      value: `${Number(
        campaignCreated?.totalImpression / campaignCreated?.totalReach
      ).toFixed(2)}  %`,
    },
    {
      label: "CPM",
      value: `${formatNumber(Number(campaignCreated?.totalCpm).toFixed(2))}`,
      paisa: true,
    },
  ];

  const campaignCost = [
    {
      label: "Plan Cost",
      value: campaignCreated?.totalCampaignBudget?.toLocaleString("en-IN"),
      paisa: true,
    },
    {
      label: "Trigger Cost",
      value:
        campaignCreated?.triggers?.weatherTriggers?.length > 0
          ? campaignCreated?.triggers?.weatherTriggers?.[0]?.budget?.toLocaleString(
              "en-IN"
            )
          : campaignCreated?.triggers?.sportsTriggers?.length > 0
          ? campaignCreated?.triggers?.sportsTriggers?.[0]?.budget?.toLocaleString(
              "en-IN"
            )
          : campaignCreated?.triggers?.vacantSlots?.length > 0
          ? campaignCreated?.triggers?.vacantSlots?.[0]?.budget?.toLocaleString(
              "en-IN"
            )
          : "None",
      paisa: true,
    },
    {
      label: "Total Discount",
      value: campaignCreated?.totalDiscount?.toLocaleString("en-IN"),
      paisa: true,
    },
    {
      label: "Total Cost",
      value:
        campaignCreated?.finalCampaignBudget !== 0
          ? campaignCreated?.finalCampaignBudget?.toLocaleString("en-IN")
          : campaignCreated?.totalCampaignBudget?.toLocaleString("en-IN"),
      paisa: true,
    },
  ];
  return {
    basicDetails,
    durationDetails,
    performanceMatrix,
    campaignCost,
  };
};

import { CAMPAIGN_MANAGER, CAMPAIGN_PLANNER } from "../constants/userConstants";
import {
  CAMPAIGN_PLAN_TYPE_KNOW,
  CAMPAIGN_PLAN_TYPE_REGULAR,
  CAMPAIGN_PLAN_TYPE_STORE,
  CAMPAIGN_PLAN_TYPE_TOPICAL,
  CAMPAIGN_PLAN_TYPE_TRIGGER,
} from "../constants/campaignConstants";

export const getCampaignPageNameFromCampaignType = (value) => {
  if (!value) return "";
  const campaignTypeMap = {
    [CAMPAIGN_PLAN_TYPE_REGULAR]: "regularplan",
    [CAMPAIGN_PLAN_TYPE_TRIGGER]: "triggerbasedplan",
    [CAMPAIGN_PLAN_TYPE_STORE]: "storebasedplan",
    [CAMPAIGN_PLAN_TYPE_TOPICAL]: "specialdayplan",
    [CAMPAIGN_PLAN_TYPE_KNOW]: "iknowitallplan",
  };

  return campaignTypeMap[value] || "";
};

export const getUserRole = (value) => {
  if (!value) return "";

  const userRole = {
    [CAMPAIGN_PLANNER]: "planner",
    [CAMPAIGN_MANAGER]: "planner",
  };

  console.log("getUserRole : ", value, userRole[value]);

  return userRole[value] || "client";
};

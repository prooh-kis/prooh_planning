import {
  ADMIN_REQUEST_LIST,
  MY_PLANS_LIST,
  MY_REQUESTS_LIST,
  USERS,
} from "../routes/routes";

export const campaignMonitoringTab = [
  {
    id: "1",
    label: "Day",
    value: "day",
  },
  {
    id: "2",
    label: "Night",
    value: "night",
  },
  {
    id: "3",
    label: "Miss",
    value: "miss",
  },
];

export const campaignCreationTypeTabs = [
  {
    id: "1",
    label: "Active",
    value: "Active",
  },
  {
    id: "2",
    label: "Upcoming",
    value: "Pending",
  },
  {
    id: "3",
    label: "Completed",
    value: "Completed",
  },
];

export const creativeTypeTab = [
  {
    id: "standardDayTimeCreatives",
    label: "Days",
    value: "standardDayTimeCreatives",
  },
  {
    id: "standardNightTimeCreatives",
    label: "Night",
    value: "standardNightTimeCreatives",
  },
  {
    id: "triggerCreatives",
    label: "Trigger",
    value: "triggerCreatives",
  },
];

// dashboard tab constants
export const CAMPAIGN_DURATION = "campaignDuration";
export const AUDIENCE_IMPRESSION = "audienceImpression";
export const HARDWARE_PERFORMANCE = "hardwarePerformance";
export const SPOT_DELIVERY = "spotDelivery";
export const COST_CONSUMED = "costConsumed";

export const siteLevelPerformanceTabData = [
  { id: "1", label: "Campaign Duration", value: CAMPAIGN_DURATION },
  { id: "3", label: "Hardware Performance", value: HARDWARE_PERFORMANCE },
  { id: "4", label: "Slot delivery", value: SPOT_DELIVERY },
  { id: "5", label: "Cost consumption", value: COST_CONSUMED },
  { id: "2", label: "Audience Impression", value: AUDIENCE_IMPRESSION },
];

export const siteLevelAnalysisTabData = [
  { id: "1", label: "Site Analysis", value: "siteAnalysis" },
  { id: "2", label: "Site Monitoring", value: "siteMonitoring" },
  // { id: "3", label: "Site Logs", value: "siteLogs" },
];

export const siteLevelMonitoringTabData = [
  { id: "1", label: "Start Date", value: "startDate" },
  { id: "2", label: "End Date", value: "endDate" },
  { id: "3", label: "Mid Date", value: "midDate" },
];

export const campaignTypeTabs = [
  {
    id: "1",
    label: "Active",
    value: "Active",
  },
  {
    id: "2",
    label: "Live",
    value: "Live",
  },
  {
    id: "3",
    label: "Upcoming",
    value: "Pending",
  },
  {
    id: "4",
    label: "Hold",
    value: "Hold",
  },
  {
    id: "5",
    label: "Paused",
    value: "Pause",
  },
  {
    id: "6",
    label: "Completed",
    value: "Completed",
  },
  {
    id: "7",
    label: "Deleted",
    value: "Deleted",
  },

  {
    id: "8",
    label: "Default",
    value: "Default",
  },
];
export const queriesTypeTabs = [
  {
    id: "1",
    label: "All",
    value: "All",
  },
  {
    id: "2",
    label: "Unread",
    value: "unread",
  },
  {
    id: "3",
    label: "Read",
    value: "read",
  },
  {
    id: "4",
    label: "Resolved",
    value: "resolved",
  },
];

export const dmpQueriesTypeTabs = [
  {
    id: "1",
    label: "All",
    value: "All",
  },
  {
    id: "2",
    label: "Verified",
    value: "verified",
  },
  {
    id: "3",
    label: "Unverified",
    value: "unverified",
  },
];

export const menuItemsCampaignManager = [
  {
    value: "New Plan",
    path: "/",
    icon: "fi-sr-add-document",
    option: "Create Plan",
  },
  {
    value: "Campaigns",
    path: "/myCampaignsList",
    icon: "fi-sr-megaphone ",
    option: "Campaigns",
  },
  {
    value: "Drafts",
    path: MY_PLANS_LIST,
    icon: "fi-rs-blueprint",
    option: "Drafts",
  },
  {
    value: "Users",
    path: USERS,
    icon: "fi-sr-users-alt ",
    option: "Users",
  },
  {
    value: "Setting",
    path: "/setting",
    icon: "fi-ss-settings",
    option: "Setting",
  },
];

export const menuItemsClientPOCUser = [
  {
    value: "Campaigns",
    path: "/myCampaignsList",
    icon: "fi-sr-megaphone ",
    option: "Campaigns",
  },
  {
    value: "Drafts",
    path: MY_PLANS_LIST,
    icon: "fi-rs-blueprint",
    option: "Drafts",
  },
  {
    value: "Setting",
    path: "/setting",
    icon: "fi-ss-settings",
    option: "Setting",
  },
];

export const menuItemsCampaignPlanner = [
  {
    value: "New Plan",
    path: "/",
    icon: "fi-sr-add-document",
    option: "New Plan",
  },
  {
    value: "Campaigns",
    path: "/myCampaignsList",
    icon: "fi-sr-megaphone ",
    option: "Campaigns",
  },
  {
    value: "Drafts",
    path: MY_PLANS_LIST,
    icon: "fi-rs-blueprint",
    option: "Drafts",
  },
  {
    value: "Setting",
    path: "/setting",
    icon: "fi-ss-settings",
    option: "Setting",
  },
];

export const menuItemsAdmin = [
  {
    value: "FinalRequest",
    path: ADMIN_REQUEST_LIST,
    icon: "fi fi-ss-bell-notification-social-media",
    option: "FinalRequest",
  },
];

export const menuItemsCampaignAdmin = [
  {
    value: "Campaigns",
    path: "/myCampaignsList",
    icon: "fi-sr-megaphone ",
    option: "Campaigns",
  },
];

import { ADVANCE_FILTER_SCREENS_MAP_DATA, AUDIENCE_DATA, CAMPAIGN, CAMPAIGN_CREATIVES, COST_SUMMARY, CURRENT_STEP, FULL_CAMPAIGN_PLAN, REGULAR_VS_COHORT_PRICE_DATA, SCREEN_SUMMARY_DATA, SCREEN_SUMMARY_SELECTION, SCREEN_SUMMARY_TABLE_DATA, SELECTED_AUDIENCE_TOUCHPOINTS, SELECTED_SCREENS_ID, SELECTED_TRIGGER, TOTAL_SCREEN_COST_DATA } from "../constants/localStorageConstants";

export const saveDataOnLocalStorage = (key: string, value: any) => {
  window.localStorage.setItem(key, JSON.stringify(value));
};

export const getAllLocalStorageData = () => {
  const allData: any = {};

  // Loop through all keys in localStorage
  for (let i: number = 0; i < localStorage.length; i++) {
    const key: any = localStorage.key(i); // Get key by index
    const value = localStorage.getItem(key); // Get corresponding value
    allData[key] = value; // Store key-value pair in an object
  }

  return allData;
};

export const getDataFromLocalStorage = (key: string) => {
  const data = window.localStorage.getItem(key);

  if (data !== undefined || data !== null) {
    return data !== null ? JSON.parse(data) : null;
  } else {
    return null;
  }
};

export const removeAllKeyFromLocalStorage = () => {
  const keys: string[] = [
    CURRENT_STEP,
    CAMPAIGN,
    AUDIENCE_DATA,
    TOTAL_SCREEN_COST_DATA,
    SELECTED_AUDIENCE_TOUCHPOINTS,
    ADVANCE_FILTER_SCREENS_MAP_DATA,
    SELECTED_SCREENS_ID,
    REGULAR_VS_COHORT_PRICE_DATA,
    COST_SUMMARY,
    SCREEN_SUMMARY_DATA,
    SCREEN_SUMMARY_TABLE_DATA,
    SCREEN_SUMMARY_SELECTION,
    SELECTED_TRIGGER,
    CAMPAIGN_CREATIVES,
    FULL_CAMPAIGN_PLAN,
  ];
  for (let key of keys) {
    window.localStorage.removeItem(key);
  }
};

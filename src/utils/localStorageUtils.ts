import { AUDIENCES_FILTER_OPTIONS, CAMPAIGN_DETAILS, CREATIVES_DATA, CRICKET_TRIGGERS, FILTERED_SCREENS, WEATHER_TRIGGERS } from "../constants/localStorageConstants";

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
    WEATHER_TRIGGERS,
    CRICKET_TRIGGERS,
    CAMPAIGN_DETAILS,
    AUDIENCES_FILTER_OPTIONS,
    FILTERED_SCREENS,
    CREATIVES_DATA,
  ];
  for (let key of keys) {
    window.localStorage.removeItem(key);
  }
};

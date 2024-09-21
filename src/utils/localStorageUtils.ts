import { AUDIENCES_FILTER_OPTIONS, CAMPAIGN_DETAILS, CREATIVES_DATA, CRICKET_TRIGGERS, FILTERED_SCREENS, WEATHER_TRIGGERS } from "../constants/localStorageConstants";

export const saveDataOnLocalStorage = (key: string, value: any) => {
  window.localStorage.setItem(key, JSON.stringify(value));
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

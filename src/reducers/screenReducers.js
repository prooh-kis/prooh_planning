import {
  getDataFromLocalStorage,
  saveDataOnLocalStorage,
} from "../utils/localStorageUtils";
import {
  GET_CAMPAIGN_DASHBOARD_DATA_ERROR,
  GET_CAMPAIGN_DASHBOARD_DATA_REQUEST,
  GET_CAMPAIGN_DASHBOARD_DATA_SUCCESS,
  GET_FINAL_PLAN_PO_DATA_ERROR,
  GET_FINAL_PLAN_PO_DATA_REQUEST,
  GET_FINAL_PLAN_PO_DATA_SUCCESS,
  GET_SCREEN_DATA_BY_AUDIENCES_ERROR,
  GET_SCREEN_DATA_BY_AUDIENCES_REQUEST,
  GET_SCREEN_DATA_BY_AUDIENCES_SUCCESS,
  GET_SCREEN_DATA_CITY_WISE_FOR_UPLOAD_CREATIVES_ERROR,
  GET_SCREEN_DATA_CITY_WISE_FOR_UPLOAD_CREATIVES_REQUEST,
  GET_SCREEN_DATA_CITY_WISE_FOR_UPLOAD_CREATIVES_RESET,
  GET_SCREEN_DATA_CITY_WISE_FOR_UPLOAD_CREATIVES_SUCCESS,
  GET_SCREEN_SUMMARY_DATA_ERROR,
  GET_SCREEN_SUMMARY_DATA_REQUEST,
  GET_SCREEN_SUMMARY_DATA_SUCCESS,
  GET_SCREEN_SUMMARY_PLAN_TABLE_DATA_ERROR,
  GET_SCREEN_SUMMARY_PLAN_TABLE_DATA_REQUEST,
  GET_SCREEN_SUMMARY_PLAN_TABLE_DATA_SUCCESS,
  GET_SCREENS_COST_DATA_ERROR,
  GET_SCREENS_COST_DATA_REQUEST,
  GET_SCREENS_COST_DATA_SUCCESS,
  GET_SCREENS_DATA_ADVANCE_FILTER_ERROR,
  GET_SCREENS_DATA_ADVANCE_FILTER_REQUEST,
  GET_SCREENS_DATA_ADVANCE_FILTER_SUCCESS,
  GET_SCREENS_PRICE_FOR_REGULAR_COHORT_ERROR,
  GET_SCREENS_PRICE_FOR_REGULAR_COHORT_REQUEST,
  GET_SCREENS_PRICE_FOR_REGULAR_COHORT_SUCCESS,
  GET_TABLE_DATA_FOR_SELECT_TOPICAL_DATA_ERROR,
  GET_TABLE_DATA_FOR_SELECT_TOPICAL_DATA_REQUEST,
  GET_TABLE_DATA_FOR_SELECT_TOPICAL_DATA_SUCCESS,
  GET_VENDOR_CONFIRMATION_DETAILS_ERROR,
  GET_VENDOR_CONFIRMATION_DETAILS_REQUEST,
  GET_VENDOR_CONFIRMATION_DETAILS_SUCCESS,
  GET_VENDOR_CONFIRMATION_STATUS_TABLE_DETAILS_ERROR,
  GET_VENDOR_CONFIRMATION_STATUS_TABLE_DETAILS_REQUEST,
  GET_VENDOR_CONFIRMATION_STATUS_TABLE_DETAILS_SUCCESS,
} from "../constants/screenConstants";
import {
  ADVANCE_FILTER_SCREENS_MAP_DATA,
  AUDIENCE_DATA,
  COST_SUMMARY,
  REGULAR_VS_COHORT_PRICE_DATA,
  SCREEN_SUMMARY_DATA,
  SCREEN_SUMMARY_TABLE_DATA,
  TOTAL_SCREEN_COST_DATA,
} from "../constants/localStorageConstants";

export function screensAudiencesDataGetReducer(state = [], action) {
  switch (action.type) {
    case GET_SCREEN_DATA_BY_AUDIENCES_REQUEST:
      return { loading: true };
    case GET_SCREEN_DATA_BY_AUDIENCES_SUCCESS:
      saveDataOnLocalStorage(AUDIENCE_DATA, action.payload);
      return {
        loading: false,
        data: action.payload,
      };
    case GET_SCREEN_DATA_BY_AUDIENCES_ERROR:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
}

export function screensCostDataGetReducer(state = [], action) {
  switch (action.type) {
    case GET_SCREENS_COST_DATA_REQUEST:
      return { loading: true };
    case GET_SCREENS_COST_DATA_SUCCESS:
      saveDataOnLocalStorage(TOTAL_SCREEN_COST_DATA, action.payload);
      const old = getDataFromLocalStorage(COST_SUMMARY) || [];
      const cost = action.payload;
      const newCost = [cost, ...old];
      saveDataOnLocalStorage(COST_SUMMARY, newCost);
      return {
        loading: false,
        data: action.payload,
      };
    case GET_SCREENS_COST_DATA_ERROR:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
}

export function screensDataAdvanceFilterGetReducer(state = [], action) {
  switch (action.type) {
    case GET_SCREENS_DATA_ADVANCE_FILTER_REQUEST:
      return { loading: true };
    case GET_SCREENS_DATA_ADVANCE_FILTER_SUCCESS:
      saveDataOnLocalStorage(ADVANCE_FILTER_SCREENS_MAP_DATA, action.payload);
      return {
        loading: false,
        data: action.payload,
      };
    case GET_SCREENS_DATA_ADVANCE_FILTER_ERROR:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
}

export function regularVsCohortPriceDataGetReducer(state = [], action) {
  switch (action.type) {
    case GET_SCREENS_PRICE_FOR_REGULAR_COHORT_REQUEST:
      return { loading: true };
    case GET_SCREENS_PRICE_FOR_REGULAR_COHORT_SUCCESS:
      saveDataOnLocalStorage(REGULAR_VS_COHORT_PRICE_DATA, action.payload);
      return {
        loading: false,
        data: action.payload,
      };
    case GET_SCREENS_PRICE_FOR_REGULAR_COHORT_ERROR:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
}

export function screenSummaryDataGetReducer(state = [], action) {
  switch (action.type) {
    case GET_SCREEN_SUMMARY_DATA_REQUEST:
      return { loading: true };
    case GET_SCREEN_SUMMARY_DATA_SUCCESS:
      saveDataOnLocalStorage(SCREEN_SUMMARY_DATA, action.payload);

      return {
        loading: false,
        data: action.payload,
      };
    case GET_SCREEN_SUMMARY_DATA_ERROR:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
}

export function screenSummaryPlanTableDataGetReducer(state = [], action) {
  switch (action.type) {
    case GET_SCREEN_SUMMARY_PLAN_TABLE_DATA_REQUEST:
      return { loading: true };
    case GET_SCREEN_SUMMARY_PLAN_TABLE_DATA_SUCCESS:
      saveDataOnLocalStorage(SCREEN_SUMMARY_TABLE_DATA, action.payload);

      return {
        loading: false,
        data: action.payload,
      };
    case GET_SCREEN_SUMMARY_PLAN_TABLE_DATA_ERROR:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
}

export function finalPlanPOTableDataGetReducer(state = [], action) {
  switch (action.type) {
    case GET_FINAL_PLAN_PO_DATA_REQUEST:
      return { loading: true };
    case GET_FINAL_PLAN_PO_DATA_SUCCESS:
      // saveDataOnLocalStorage(AUDIENCE_DATA, action.payload);

      return {
        loading: false,
        data: action.payload,
      };
    case GET_FINAL_PLAN_PO_DATA_ERROR:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
}

export function screenDataUploadCreativeReducer(state = {}, action) {
  switch (action.type) {
    case GET_SCREEN_DATA_CITY_WISE_FOR_UPLOAD_CREATIVES_REQUEST:
      return { loading: true };
    case GET_SCREEN_DATA_CITY_WISE_FOR_UPLOAD_CREATIVES_SUCCESS:
      return {
        loading: false,
        data: action.payload,
      };
    case GET_SCREEN_DATA_CITY_WISE_FOR_UPLOAD_CREATIVES_ERROR:
      return {
        loading: false,
        error: action.payload,
      };
    case GET_SCREEN_DATA_CITY_WISE_FOR_UPLOAD_CREATIVES_RESET:
      return {};
    default:
      return state;
  }
}

export function vendorConfirmationDetailsGetReducer(state = {}, action) {
  switch (action.type) {
    case GET_VENDOR_CONFIRMATION_DETAILS_REQUEST:
      return { loading: true };
    case GET_VENDOR_CONFIRMATION_DETAILS_SUCCESS:
      return {
        loading: false,
        data: action.payload,
      };
    case GET_VENDOR_CONFIRMATION_DETAILS_ERROR:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
}

export function vendorConfirmationStatusTableDetailsGetReducer(
  state = {},
  action
) {
  switch (action.type) {
    case GET_VENDOR_CONFIRMATION_STATUS_TABLE_DETAILS_REQUEST:
      return { loading: true };
    case GET_VENDOR_CONFIRMATION_STATUS_TABLE_DETAILS_SUCCESS:
      return {
        loading: false,
        data: action.payload,
      };
    case GET_VENDOR_CONFIRMATION_STATUS_TABLE_DETAILS_ERROR:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
}

export function campaignDashboardDataGetReducer(state = {}, action) {
  switch (action.type) {
    case GET_CAMPAIGN_DASHBOARD_DATA_REQUEST:
      return { loading: true };
    case GET_CAMPAIGN_DASHBOARD_DATA_SUCCESS:
      return {
        loading: false,
        data: action.payload,
      };
    case GET_CAMPAIGN_DASHBOARD_DATA_ERROR:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
}

export function getTableDataForSelectTopicalDayPageReducer(state = {}, action) {
  switch (action.type) {
    case GET_TABLE_DATA_FOR_SELECT_TOPICAL_DATA_REQUEST:
      return { loading: true };
    case GET_TABLE_DATA_FOR_SELECT_TOPICAL_DATA_SUCCESS:
      return {
        loading: false,
        data: action.payload,
      };
    case GET_TABLE_DATA_FOR_SELECT_TOPICAL_DATA_ERROR:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
}

import {
  GET_SCREEN_DATA_BY_AUDIENCES_ERROR,
  GET_SCREEN_DATA_BY_AUDIENCES_REQUEST,
  GET_SCREEN_DATA_BY_AUDIENCES_SUCCESS,
  GET_SCREEN_SUMMARY_DATA_ERROR,
  GET_SCREEN_SUMMARY_DATA_REQUEST,
  GET_SCREEN_SUMMARY_DATA_SUCCESS,
  GET_SCREENS_COST_DATA_ERROR,
  GET_SCREENS_COST_DATA_REQUEST,
  GET_SCREENS_COST_DATA_SUCCESS,
  GET_SCREENS_DATA_ADVANCE_FILTER_ERROR,
  GET_SCREENS_DATA_ADVANCE_FILTER_REQUEST,
  GET_SCREENS_DATA_ADVANCE_FILTER_SUCCESS,
  GET_SCREENS_PRICE_FOR_REGULAR_COHORT_ERROR,
  GET_SCREENS_PRICE_FOR_REGULAR_COHORT_REQUEST,
  GET_SCREENS_PRICE_FOR_REGULAR_COHORT_SUCCESS
} from "../constants/screenConstants";

export function screensAudiencesDataGetReducer(state = [], action) {
  switch (action.type) {
    case GET_SCREEN_DATA_BY_AUDIENCES_REQUEST:
      return { loading: true };
    case GET_SCREEN_DATA_BY_AUDIENCES_SUCCESS:
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
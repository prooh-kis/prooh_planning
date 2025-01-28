import {
  GET_CLIENT_AGENCY_DETAILS_FAIL,
  GET_CLIENT_AGENCY_DETAILS_REQUEST,
  GET_CLIENT_AGENCY_DETAILS_RESET,
  GET_CLIENT_AGENCY_DETAILS_SUCCESS,
  GET_CLIENT_AGENCY_NAMES_LIST_FAIL,
  GET_CLIENT_AGENCY_NAMES_LIST_REQUEST,
  GET_CLIENT_AGENCY_NAMES_LIST_RESET,
  GET_CLIENT_AGENCY_NAMES_LIST_SUCCESS,
  REMOVE_CLIENT_AGENCY_FAIL,
  REMOVE_CLIENT_AGENCY_REQUEST,
  REMOVE_CLIENT_AGENCY_RESET,
  REMOVE_CLIENT_AGENCY_SUCCESS,
} from "../constants/clientAgencyConstants";

export function allClientAgencyNamesListGetReducer(state = [], action) {
  switch (action.type) {
    case GET_CLIENT_AGENCY_NAMES_LIST_REQUEST:
      return { loading: true };
    case GET_CLIENT_AGENCY_NAMES_LIST_SUCCESS:
      return {
        loading: false,
        success: true,
        data: action.payload,
      };
    case GET_CLIENT_AGENCY_NAMES_LIST_FAIL:
      return {
        loading: false,
        success: false,
        error: action.payload,
      };
    case GET_CLIENT_AGENCY_NAMES_LIST_RESET:
      return {
        loading: false,
        success: false,
        data: state,
      };
    default:
      return state;
  }
}

export function clientAgencyDetailsGetReducer(state = [], action) {
  switch (action.type) {
    case GET_CLIENT_AGENCY_DETAILS_REQUEST:
      return { loading: true };
    case GET_CLIENT_AGENCY_DETAILS_SUCCESS:
      return {
        loading: false,
        success: true,
        data: action.payload,
      };
    case GET_CLIENT_AGENCY_DETAILS_FAIL:
      return {
        loading: false,
        success: false,
        error: action.payload,
      };
    case GET_CLIENT_AGENCY_DETAILS_RESET:
      return {
        loading: false,
        success: false,
        data: state,
      };
    default:
      return state;
  }
}


export function removeCouponForCampaignReducer(state = [], action) {
  switch (action.type) {
    case REMOVE_CLIENT_AGENCY_REQUEST:
      return { loading: true };
    case REMOVE_CLIENT_AGENCY_SUCCESS:
      return {
        loading: false,
        success: true,
        data: action.payload,
      };
    case REMOVE_CLIENT_AGENCY_FAIL:
      return {
        loading: false,
        success: false,
        error: action.payload,
      };
    case REMOVE_CLIENT_AGENCY_RESET:
      return {
        loading: false,
        success: false,
        data: state,
      };
    default:
      return state;
  }
}

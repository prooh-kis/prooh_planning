import {
  CREATE_NEW_ORG_FAIL,
  CREATE_NEW_ORG_REQUEST,
  CREATE_NEW_ORG_RESET,
  CREATE_NEW_ORG_SUCCESS,
  GET_MY_ORG_DETAILS_FAIL,
  GET_MY_ORG_DETAILS_REQUEST,
  GET_MY_ORG_DETAILS_RESET,
  GET_MY_ORG_DETAILS_SUCCESS,
  GET_ORG_LEVEL_CAMPAIGN_STATUS_FAIL,
  GET_ORG_LEVEL_CAMPAIGN_STATUS_REQUEST,
  GET_ORG_LEVEL_CAMPAIGN_STATUS_RESET,
  GET_ORG_LEVEL_CAMPAIGN_STATUS_SUCCESS
} from "../constants/organizationConstants";

export function myOrgCreateReducer(state = {}, action) {
  switch (action.type) {
    case CREATE_NEW_ORG_REQUEST:
      return { loading: true };
    case CREATE_NEW_ORG_SUCCESS:
      return { loading: false, data: action.payload, success: true };
    case CREATE_NEW_ORG_FAIL:
      return { loading: false, error: action.payload };
    case CREATE_NEW_ORG_RESET:
      return {};
    default:
      return state;
  }
}


export function myOrgDetailsGetReducer(state = {}, action) {
  switch (action.type) {
    case GET_MY_ORG_DETAILS_REQUEST:
      return { loading: true };
    case GET_MY_ORG_DETAILS_SUCCESS:
      return { loading: false, data: action.payload };
    case GET_MY_ORG_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    case GET_MY_ORG_DETAILS_RESET:
      return {};
    default:
      return state;
  }
}

export function orgLevelCampaignStatusGetReducer(state = {}, action) {
  switch (action.type) {
    case GET_ORG_LEVEL_CAMPAIGN_STATUS_REQUEST:
      return { loading: true };
    case GET_ORG_LEVEL_CAMPAIGN_STATUS_SUCCESS:
      return { loading: false, data: action.payload };
    case GET_ORG_LEVEL_CAMPAIGN_STATUS_FAIL:
      return { loading: false, error: action.payload };
    case GET_ORG_LEVEL_CAMPAIGN_STATUS_RESET:
      return {};
    default:
      return state;
  }
}
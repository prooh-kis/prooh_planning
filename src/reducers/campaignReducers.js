import {
  ADD_DETAILS_TO_CREATE_CAMPAIGN_ERROR,
  ADD_DETAILS_TO_CREATE_CAMPAIGN_REQUEST,
  ADD_DETAILS_TO_CREATE_CAMPAIGN_SUCCESS,
  GET_MY_CREATE_CAMPAIGNS_MANAGER_REQUESTS_LIST_ERROR,
  GET_MY_CREATE_CAMPAIGNS_MANAGER_REQUESTS_LIST_REQUEST,
  GET_MY_CREATE_CAMPAIGNS_MANAGER_REQUESTS_LIST_SUCCESS,
  GET_MY_CREATE_CAMPAIGNS_LIST_ERROR,
  GET_MY_CREATE_CAMPAIGNS_LIST_REQUEST,
  GET_MY_CREATE_CAMPAIGNS_LIST_SUCCESS,
  GET_MY_CREATE_CAMPAIGNS_VENDOR_REQUESTS_LIST_REQUEST,
  GET_MY_CREATE_CAMPAIGNS_VENDOR_REQUESTS_LIST_SUCCESS,
  GET_MY_CREATE_CAMPAIGNS_VENDOR_REQUESTS_LIST_ERROR
} from "../constants/campaignConstants";

export function detailsToCreateCampaignAddReducer(state = [], action) {
  switch (action.type) {
    case ADD_DETAILS_TO_CREATE_CAMPAIGN_REQUEST:
      return { loading: true };
    case ADD_DETAILS_TO_CREATE_CAMPAIGN_SUCCESS:
      return {
        loading: false,
        success: true,
        data: action.payload,
      };
    case ADD_DETAILS_TO_CREATE_CAMPAIGN_ERROR:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
}


export function myCreateCampaignsListGetReducer(state = [], action) {
  switch (action.type) {
    case GET_MY_CREATE_CAMPAIGNS_LIST_REQUEST:
      return { loading: true };
    case GET_MY_CREATE_CAMPAIGNS_LIST_SUCCESS:
      return {
        loading: false,
        success: true,
        data: action.payload,
      };
    case GET_MY_CREATE_CAMPAIGNS_LIST_ERROR:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
}

export function myCreateCampaignsManagerRequestsListGetReducer(state = [], action) {
  switch (action.type) {
    case GET_MY_CREATE_CAMPAIGNS_MANAGER_REQUESTS_LIST_REQUEST:
      return { loading: true };
    case GET_MY_CREATE_CAMPAIGNS_MANAGER_REQUESTS_LIST_SUCCESS:
      return {
        loading: false,
        success: true,
        data: action.payload,
      };
    case GET_MY_CREATE_CAMPAIGNS_MANAGER_REQUESTS_LIST_ERROR:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
}

export function myCreateCampaignsVendorRequestsListGetReducer(state = [], action) {
  switch (action.type) {
    case GET_MY_CREATE_CAMPAIGNS_VENDOR_REQUESTS_LIST_REQUEST:
      return { loading: true };
    case GET_MY_CREATE_CAMPAIGNS_VENDOR_REQUESTS_LIST_SUCCESS:
      return {
        loading: false,
        success: true,
        data: action.payload,
      };
    case GET_MY_CREATE_CAMPAIGNS_VENDOR_REQUESTS_LIST_ERROR:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
}



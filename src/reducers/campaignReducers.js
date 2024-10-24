import { saveDataOnLocalStorage } from "../utils/localStorageUtils";
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
  GET_MY_CREATE_CAMPAIGNS_VENDOR_REQUESTS_LIST_ERROR,
  CHANGE_CAMPAIGN_STATUS_AFTER_CREATIVE_UPLOAD_REQUEST,
  CHANGE_CAMPAIGN_STATUS_AFTER_CREATIVE_UPLOAD_SUCCESS,
  CHANGE_CAMPAIGN_STATUS_AFTER_CREATIVE_UPLOAD_ERROR,
  CHANGE_CAMPAIGN_STATUS_AFTER_CREATIVE_UPLOAD_RESET,
  CHANGE_CAMPAIGN_STATUS_AFTER_VENDOR_APPROVAL_REQUEST,
  CHANGE_CAMPAIGN_STATUS_AFTER_VENDOR_APPROVAL_SUCCESS,
  CHANGE_CAMPAIGN_STATUS_AFTER_VENDOR_APPROVAL_ERROR,
  CHANGE_CAMPAIGN_STATUS_AFTER_VENDOR_APPROVAL_RESET,
  ADD_DETAILS_TO_CREATE_CAMPAIGN_RESET
} from "../constants/campaignConstants";
import { FULL_CAMPAIGN_PLAN } from "../constants/localStorageConstants";

export function detailsToCreateCampaignAddReducer(state = [], action) {
  switch (action.type) {
    case ADD_DETAILS_TO_CREATE_CAMPAIGN_REQUEST:
      return { loading: true };
    case ADD_DETAILS_TO_CREATE_CAMPAIGN_SUCCESS:
      const campaign = action.payload;
      const saveData = {};
      saveData[campaign._id] = campaign
      saveDataOnLocalStorage(FULL_CAMPAIGN_PLAN, saveData);
      return {
        loading: false,
        success: true,
        data: action.payload,
      };
    case ADD_DETAILS_TO_CREATE_CAMPAIGN_ERROR:
      return {
        loading: false,
        success: false,
        error: action.payload,
      };
    case ADD_DETAILS_TO_CREATE_CAMPAIGN_RESET:
      return {
        loading: false,
        success: false,
        data: state,
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


export function campaignStatusChangeAfterCreativeUploadReducer(state=[], action) {
  switch (action.type) {
    case CHANGE_CAMPAIGN_STATUS_AFTER_CREATIVE_UPLOAD_REQUEST:
      return { loading: true };
    case CHANGE_CAMPAIGN_STATUS_AFTER_CREATIVE_UPLOAD_SUCCESS:
      return {
        loading: false,
        data: action.payload,
      };
    case CHANGE_CAMPAIGN_STATUS_AFTER_CREATIVE_UPLOAD_ERROR:
      return {
        loading: false,
        error: action.payload,
      };
    case CHANGE_CAMPAIGN_STATUS_AFTER_CREATIVE_UPLOAD_RESET:
      return {};
    default:
      return state;
  }
}


export function campaignStatusChangeAfterVendorApprovalReducer(state=[], action) {
  switch (action.type) {
    case CHANGE_CAMPAIGN_STATUS_AFTER_VENDOR_APPROVAL_REQUEST:
      return { loading: true };
    case CHANGE_CAMPAIGN_STATUS_AFTER_VENDOR_APPROVAL_SUCCESS:
      return {
        loading: false,
        data: action.payload,
      };
    case CHANGE_CAMPAIGN_STATUS_AFTER_VENDOR_APPROVAL_ERROR:
      return {
        loading: false,
        error: action.payload,
      };
    case CHANGE_CAMPAIGN_STATUS_AFTER_VENDOR_APPROVAL_RESET:
      return {};
    default:
      return state;
  }
}
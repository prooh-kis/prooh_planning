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
  ADD_DETAILS_TO_CREATE_CAMPAIGN_RESET,
  CHANGE_CAMPAIGN_DURATION_REQUEST,
  CHANGE_CAMPAIGN_DURATION_SUCCESS,
  CHANGE_CAMPAIGN_DURATION_ERROR,
  CHANGE_CAMPAIGN_DURATION_RESET,
  CAMPAIGN_LOGS_REQUEST,
  CAMPAIGN_LOGS_SUCCESS,
  CAMPAIGN_LOGS_FAIL,
  CAMPAIGN_MONITORING_PICS_REQUEST,
  CAMPAIGN_MONITORING_PICS_SUCCESS,
  CAMPAIGN_MONITORING_PICS_FAIL,
  GET_MY_CREATE_CAMPAIGNS_LIST_FOR_PLAN_REQUEST,
  GET_MY_CREATE_CAMPAIGNS_LIST_FOR_PLAN_SUCCESS,
  GET_MY_CREATE_CAMPAIGNS_LIST_FOR_PLAN_ERROR,
} from "../constants/campaignConstants";
import { FULL_CAMPAIGN_PLAN } from "../constants/localStorageConstants";

export function detailsToCreateCampaignAddReducer(state = [], action) {
  switch (action.type) {
    case ADD_DETAILS_TO_CREATE_CAMPAIGN_REQUEST:
      return { loading: true };
    case ADD_DETAILS_TO_CREATE_CAMPAIGN_SUCCESS:
      const campaign = action.payload;
      const saveData = {};
      saveData[campaign._id] = campaign;
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

export function myCreateCampaignsListForPlanGetReducer(state = [], action) {
  switch (action.type) {
    case GET_MY_CREATE_CAMPAIGNS_LIST_FOR_PLAN_REQUEST:
      return { loading: true };
    case GET_MY_CREATE_CAMPAIGNS_LIST_FOR_PLAN_SUCCESS:
      return {
        loading: false,
        success: true,
        data: action.payload,
      };
    case GET_MY_CREATE_CAMPAIGNS_LIST_FOR_PLAN_ERROR:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
}

export function myCreateCampaignsManagerRequestsListGetReducer(
  state = [],
  action
) {
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

export function myCreateCampaignsVendorRequestsListGetReducer(
  state = [],
  action
) {
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

export function campaignStatusChangeAfterCreativeUploadReducer(
  state = [],
  action
) {
  switch (action.type) {
    case CHANGE_CAMPAIGN_STATUS_AFTER_CREATIVE_UPLOAD_REQUEST:
      return { loading: true };
    case CHANGE_CAMPAIGN_STATUS_AFTER_CREATIVE_UPLOAD_SUCCESS:
      return {
        loading: false,
        data: action.payload,
        success: true,
      };
    case CHANGE_CAMPAIGN_STATUS_AFTER_CREATIVE_UPLOAD_ERROR:
      return {
        loading: false,
        error: action.payload,
        success: false,
      };
    case CHANGE_CAMPAIGN_STATUS_AFTER_CREATIVE_UPLOAD_RESET:
      return {};
    default:
      return state;
  }
}

export function campaignStatusChangeAfterVendorApprovalReducer(
  state = [],
  action
) {
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

export function campaignDurationChangeReducer(state = [], action) {
  switch (action.type) {
    case CHANGE_CAMPAIGN_DURATION_REQUEST:
      return { loading: true };
    case CHANGE_CAMPAIGN_DURATION_SUCCESS:
      const campaign = action.payload;
      const saveData = {};
      saveData[campaign._id] = campaign;
      saveDataOnLocalStorage(FULL_CAMPAIGN_PLAN, saveData);
      return {
        loading: false,
        data: action.payload,
        success: true,
      };
    case CHANGE_CAMPAIGN_DURATION_ERROR:
      return {
        loading: false,
        error: action.payload,
        success: false,
      };
    case CHANGE_CAMPAIGN_DURATION_RESET:
      return {};
    default:
      return state;
  }
}


export function campaignLogsGetReducer(state = [], action) {
  switch (action.type) {
    case CAMPAIGN_LOGS_REQUEST:
      return { loading: true };
    case CAMPAIGN_LOGS_SUCCESS:
      return {
        loading: false,
        data: action.payload,
        success: true,
      };
    case CAMPAIGN_LOGS_FAIL:
      return {
        loading: false,
        error: action.payload,
        success: false,
      };
    default:
      return state;
  }
}

export function campaignMonitoringPicsGetReducer(state = [], action) {
  switch (action.type) {
    case CAMPAIGN_MONITORING_PICS_REQUEST:
      return { loading: true };
    case CAMPAIGN_MONITORING_PICS_SUCCESS:
      return {
        loading: false,
        data: action.payload,
        success: true,
      };
    case CAMPAIGN_MONITORING_PICS_FAIL:
      return {
        loading: false,
        error: action.payload,
        success: false,
      };
    default:
      return state;
  }
}


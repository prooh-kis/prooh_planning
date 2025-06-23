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
  GET_MY_CREATE_CAMPAIGNS_LIST_FOR_PLAN_REQUEST,
  GET_MY_CREATE_CAMPAIGNS_LIST_FOR_PLAN_SUCCESS,
  GET_MY_CREATE_CAMPAIGNS_LIST_FOR_PLAN_ERROR,
  GET_ALL_CAMPAIGNS_DATA_REQUEST,
  GET_ALL_CAMPAIGNS_DATA_SUCCESS,
  GET_ALL_CAMPAIGNS_DATA_FAIL,
  GET_ALL_CAMPAIGNS_DATA_RESET,
  GET_CAMPAIGN_DATA_REQUEST,
  GET_CAMPAIGN_DATA_SUCCESS,
  GET_CAMPAIGN_DATA_FAIL,
  GET_CAMPAIGN_CREATION_SCREENS_DATA_REQUEST,
  GET_CAMPAIGN_CREATION_SCREENS_DATA_SUCCESS,
  GET_CAMPAIGN_CREATION_SCREENS_DATA_FAIL,
  GET_CAMPAIGN_CREATION_SCREENS_DATA_RESET,
  CAMPAIGN_STATUS_CHANGE_REQUEST,
  CAMPAIGN_STATUS_CHANGE_SUCCESS,
  CAMPAIGN_STATUS_CHANGE_FAIL,
  CAMPAIGN_STATUS_CHANGE_RESET,
  EDIT_ALL_SUB_CAMPAIGNS_REQUEST,
  EDIT_ALL_SUB_CAMPAIGNS_SUCCESS,
  EDIT_ALL_SUB_CAMPAIGNS_FAIL,
  EDIT_ALL_SUB_CAMPAIGNS_RESET,
  EDIT_CAMPAIGN_CREATIVE_END_DATE_REQUEST,
  EDIT_CAMPAIGN_CREATIVE_END_DATE_SUCCESS,
  EDIT_CAMPAIGN_CREATIVE_END_DATE_FAIL,
  EDIT_CAMPAIGN_CREATIVE_END_DATE_RESET,
  GET_CAMPAIGN_CREATIONS_DETAILS_REQUEST,
  GET_CAMPAIGN_CREATIONS_DETAILS_SUCCESS,
  GET_CAMPAIGN_CREATIONS_DETAILS_ERROR,
  GET_CAMPAIGN_CREATIONS_DETAILS_RESET,
  CLONE_CAMPAIGN_REQUEST,
  CLONE_CAMPAIGN_SUCCESS,
  CLONE_CAMPAIGN_FAIL,
  CLONE_CAMPAIGN_RESET,
  DOWNLOAD_CAMPAIGN_SUMMARY_PPT_REQUEST,
  DOWNLOAD_CAMPAIGN_SUMMARY_PPT_SUCCESS,
  DOWNLOAD_CAMPAIGN_SUMMARY_PPT_FAIL,
  DOWNLOAD_CAMPAIGN_SUMMARY_PPT_RESET,
} from "../constants/campaignConstants";
import {
  ALL_CAMPAIGNS_LIST,
  FULL_CAMPAIGN_PLAN,
} from "../constants/localStorageConstants";

export function campaignCreationsDetailsGetReducer(state = {}, action) {
  switch (action.type) {
    case GET_CAMPAIGN_CREATIONS_DETAILS_REQUEST:
      return { loading: true };
    case GET_CAMPAIGN_CREATIONS_DETAILS_SUCCESS:
      return {
        loading: false,
        success: true,
        data: action.payload,
      };
    case GET_CAMPAIGN_CREATIONS_DETAILS_ERROR:
      return {
        loading: false,
        success: false,
        error: action.payload,
      };
    case GET_CAMPAIGN_CREATIONS_DETAILS_RESET:
      return {};
    default:
      return state;
  }
}
export function detailsToCreateCampaignAddReducer(state = {}, action) {
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
      return { loading: true, data: [] };
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

export function allCampaignsDataGetReducer(state = {}, action) {
  switch (action.type) {
    case GET_ALL_CAMPAIGNS_DATA_REQUEST:
      return { loading: true };
    case GET_ALL_CAMPAIGNS_DATA_SUCCESS:
      const d = {
        list: action.payload,
      };
      saveDataOnLocalStorage(ALL_CAMPAIGNS_LIST, d);
      return { ...state, loading: false, success: true, data: action.payload };
    case GET_ALL_CAMPAIGNS_DATA_FAIL:
      return { ...state, loading: false, error: action.payload };
    case GET_ALL_CAMPAIGNS_DATA_RESET:
      return {};
    default:
      return state;
  }
}

export function campaignDetailsGetReducer(state = {}, action) {
  switch (action.type) {
    case GET_CAMPAIGN_DATA_REQUEST:
      return { loading: true };
    case GET_CAMPAIGN_DATA_SUCCESS:
      return { ...state, loading: false, success: true, data: action.payload };
    case GET_CAMPAIGN_DATA_FAIL:
      return { ...state, loading: false, error: action.payload };
    case GET_ALL_CAMPAIGNS_DATA_RESET:
      return {};
    default:
      return state;
  }
}

export function campaignCreationScreensDetailsGetReducer(state = {}, action) {
  switch (action.type) {
    case GET_CAMPAIGN_CREATION_SCREENS_DATA_REQUEST:
      return { loading: true };
    case GET_CAMPAIGN_CREATION_SCREENS_DATA_SUCCESS:
      return { ...state, loading: false, success: true, data: action.payload };
    case GET_CAMPAIGN_CREATION_SCREENS_DATA_FAIL:
      return { ...state, loading: false, error: action.payload };
    case GET_CAMPAIGN_CREATION_SCREENS_DATA_RESET:
      return {};
    default:
      return state;
  }
}

export function campaignStatusChangeReducer(state = {}, action) {
  switch (action.type) {
    case CAMPAIGN_STATUS_CHANGE_REQUEST:
      return { loading: true };
    case CAMPAIGN_STATUS_CHANGE_SUCCESS:
      return { ...state, loading: false, success: true, data: action.payload };
    case CAMPAIGN_STATUS_CHANGE_FAIL:
      return { ...state, loading: false, error: action.payload };
    case CAMPAIGN_STATUS_CHANGE_RESET:
      return {};
    default:
      return state;
  }
}

export function editAllSubCampaignsReducer(state = {}, action) {
  switch (action.type) {
    case EDIT_ALL_SUB_CAMPAIGNS_REQUEST:
      return { loading: true };
    case EDIT_ALL_SUB_CAMPAIGNS_SUCCESS:
      return { ...state, loading: false, success: true, data: action.payload };
    case EDIT_ALL_SUB_CAMPAIGNS_FAIL:
      return { ...state, loading: false, error: action.payload };
    case EDIT_ALL_SUB_CAMPAIGNS_RESET:
      return {};
    default:
      return state;
  }
}

export function editCampaignCreativeEndDateReducer(state = {}, action) {
  switch (action.type) {
    case EDIT_CAMPAIGN_CREATIVE_END_DATE_REQUEST:
      return { loading: true };
    case EDIT_CAMPAIGN_CREATIVE_END_DATE_SUCCESS:
      return { loading: false, success: true, data: action.payload };
    case EDIT_CAMPAIGN_CREATIVE_END_DATE_FAIL:
      return { loading: false, error: action.payload };
    case EDIT_CAMPAIGN_CREATIVE_END_DATE_RESET:
      return {};
    default:
      return state;
  }
}

export function cloneCampaignReducer(state = {}, action) {
  switch (action.type) {
    case CLONE_CAMPAIGN_REQUEST:
      return { loading: true };
    case CLONE_CAMPAIGN_SUCCESS:
      return {
        loading: false,
        success: true,
        data: action.payload,
      };
    case CLONE_CAMPAIGN_FAIL:
      return { loading: false, error: action.payload };
    case CLONE_CAMPAIGN_RESET:
      return {};
    default:
      return state;
  }
}

export function downloadCampaignSummaryPPTReducer(state = {}, action) {
  switch (action.type) {
    case DOWNLOAD_CAMPAIGN_SUMMARY_PPT_REQUEST:
      return { loading: true };
    case DOWNLOAD_CAMPAIGN_SUMMARY_PPT_SUCCESS:
      return {
        loading: false,
        success: true,
        data: action.payload,
      };
    case DOWNLOAD_CAMPAIGN_SUMMARY_PPT_FAIL:
      return { loading: false, error: action.payload };
    case DOWNLOAD_CAMPAIGN_SUMMARY_PPT_RESET:
      return {};
    default:
      return state;
  }
}

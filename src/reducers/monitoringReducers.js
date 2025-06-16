import {
  CAMPAIGN_MONITORING_PICS_FAIL,
  CAMPAIGN_MONITORING_PICS_REQUEST,
  CAMPAIGN_MONITORING_PICS_SUCCESS,
  GENERATE_MONITORING_PPT_FAIL,
  GENERATE_MONITORING_PPT_REQUEST,
  GENERATE_MONITORING_PPT_RESET,
  GENERATE_MONITORING_PPT_SUCCESS,
  GET_MONITORING_PPT_JOB_STATUS_FAIL,
  GET_MONITORING_PPT_JOB_STATUS_REQUEST,
  GET_MONITORING_PPT_JOB_STATUS_RESET,
  GET_MONITORING_PPT_JOB_STATUS_SUCCESS,
} from "../constants/monitoringConstant";

export function generateMonitoringPptReducer(state = [], action) {
  switch (action.type) {
    case GENERATE_MONITORING_PPT_REQUEST:
      return { loading: true };
    case GENERATE_MONITORING_PPT_SUCCESS:
      return { loading: false, success: true, data: action.payload };
    case GENERATE_MONITORING_PPT_FAIL:
      return { loading: false, success: false, error: action.payload };
    case GENERATE_MONITORING_PPT_RESET:
      return {};
    default:
      return state;
  }
}

export function getMonitoringPptJobStatusReducer(state = [], action) {
  switch (action.type) {
    case GET_MONITORING_PPT_JOB_STATUS_REQUEST:
      return { loading: true };
    case GET_MONITORING_PPT_JOB_STATUS_SUCCESS:
      return { loading: false, success: true, data: action.payload };
    case GET_MONITORING_PPT_JOB_STATUS_FAIL:
      return { loading: false, success: false, error: action.payload };
    case GET_MONITORING_PPT_JOB_STATUS_RESET:
      return {};
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

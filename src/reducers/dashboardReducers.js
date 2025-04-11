import {
  GET_AUDIENCE_DATA_FOR_PLANNER_DASHBOARD_ERROR,
  GET_AUDIENCE_DATA_FOR_PLANNER_DASHBOARD_REQUEST,
  GET_AUDIENCE_DATA_FOR_PLANNER_DASHBOARD_SUCCESS,
  GET_BASIC_DATA_FOR_PLANNER_DASHBOARD_ERROR,
  GET_BASIC_DATA_FOR_PLANNER_DASHBOARD_REQUEST,
  GET_BASIC_DATA_FOR_PLANNER_DASHBOARD_SUCCESS,
  GET_COST_DATA_FOR_PLANNER_DASHBOARD_ERROR,
  GET_COST_DATA_FOR_PLANNER_DASHBOARD_REQUEST,
  GET_COST_DATA_FOR_PLANNER_DASHBOARD_SUCCESS,
  GET_HARDWARE_PERFORMANCE_DATA_FOR_PLANNER_DASHBOARD_ERROR,
  GET_HARDWARE_PERFORMANCE_DATA_FOR_PLANNER_DASHBOARD_REQUEST,
  GET_HARDWARE_PERFORMANCE_DATA_FOR_PLANNER_DASHBOARD_SUCCESS,
  GET_SITE_DATA_MAP_VIEW_FOR_PLANNER_DASHBOARD_ERROR,
  GET_SITE_DATA_MAP_VIEW_FOR_PLANNER_DASHBOARD_REQUEST,
  GET_SITE_DATA_MAP_VIEW_FOR_PLANNER_DASHBOARD_SUCCESS,
  GET_SITE_LEVEL_PERFORMANCE_DATA_FOR_PLANNER_DASHBOARD_ERROR,
  GET_SITE_LEVEL_PERFORMANCE_DATA_FOR_PLANNER_DASHBOARD_REQUEST,
  GET_SITE_LEVEL_PERFORMANCE_DATA_FOR_PLANNER_DASHBOARD_SUCCESS,
  GET_SITE_MONITORING_PICS_PERCENTAGE_ERROR,
  GET_SITE_MONITORING_PICS_PERCENTAGE_REQUEST,
  GET_SITE_MONITORING_PICS_PERCENTAGE_SUCCESS,
  GET_SPOT_DELIVERY_DATA_FOR_PLANNER_DASHBOARD_ERROR,
  GET_SPOT_DELIVERY_DATA_FOR_PLANNER_DASHBOARD_REQUEST,
  GET_SPOT_DELIVERY_DATA_FOR_PLANNER_DASHBOARD_SUCCESS,
} from "../constants/dashboardConstant";

export function getBasicDataForPlannerDashboardReducer(state = {}, action) {
  switch (action.type) {
    case GET_BASIC_DATA_FOR_PLANNER_DASHBOARD_REQUEST:
      return { loading: true };
    case GET_BASIC_DATA_FOR_PLANNER_DASHBOARD_SUCCESS:
      return {
        loading: false,
        data: action.payload,
      };
    case GET_BASIC_DATA_FOR_PLANNER_DASHBOARD_ERROR:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
}

export function getAudienceDataForPlannerDashboardReducer(state = {}, action) {
  switch (action.type) {
    case GET_AUDIENCE_DATA_FOR_PLANNER_DASHBOARD_REQUEST:
      return { loading: true };
    case GET_AUDIENCE_DATA_FOR_PLANNER_DASHBOARD_SUCCESS:
      return {
        loading: false,
        data: action.payload,
      };
    case GET_AUDIENCE_DATA_FOR_PLANNER_DASHBOARD_ERROR:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
}

export function getHardwarePerformanceDataForPlannerDashboardReducer(
  state = {},
  action
) {
  switch (action.type) {
    case GET_HARDWARE_PERFORMANCE_DATA_FOR_PLANNER_DASHBOARD_REQUEST:
      return { loading: true };
    case GET_HARDWARE_PERFORMANCE_DATA_FOR_PLANNER_DASHBOARD_SUCCESS:
      return {
        loading: false,
        data: action.payload,
      };
    case GET_HARDWARE_PERFORMANCE_DATA_FOR_PLANNER_DASHBOARD_ERROR:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
}

export function getSpotDeliveryDataForPlannerDashboardReducer(
  state = {},
  action
) {
  switch (action.type) {
    case GET_SPOT_DELIVERY_DATA_FOR_PLANNER_DASHBOARD_REQUEST:
      return { loading: true };
    case GET_SPOT_DELIVERY_DATA_FOR_PLANNER_DASHBOARD_SUCCESS:
      return {
        loading: false,
        data: action.payload,
      };
    case GET_SPOT_DELIVERY_DATA_FOR_PLANNER_DASHBOARD_ERROR:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
}

export function getCostDataForPlannerDashboardReducer(state = {}, action) {
  switch (action.type) {
    case GET_COST_DATA_FOR_PLANNER_DASHBOARD_REQUEST:
      return { loading: true };
    case GET_COST_DATA_FOR_PLANNER_DASHBOARD_SUCCESS:
      return {
        loading: false,
        data: action.payload,
      };
    case GET_COST_DATA_FOR_PLANNER_DASHBOARD_ERROR:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
}

export function getSiteLevelPerformanceForPlannerDashboardReducer(
  state = {},
  action
) {
  switch (action.type) {
    case GET_SITE_LEVEL_PERFORMANCE_DATA_FOR_PLANNER_DASHBOARD_REQUEST:
      return { loading: true };
    case GET_SITE_LEVEL_PERFORMANCE_DATA_FOR_PLANNER_DASHBOARD_SUCCESS:
      return {
        loading: false,
        data: action.payload,
      };
    case GET_SITE_LEVEL_PERFORMANCE_DATA_FOR_PLANNER_DASHBOARD_ERROR:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
}

export function getSitesDataMapViewForPlannerDashboardReducer(
  state = {},
  action
) {
  switch (action.type) {
    case GET_SITE_DATA_MAP_VIEW_FOR_PLANNER_DASHBOARD_REQUEST:
      return { loading: true };
    case GET_SITE_DATA_MAP_VIEW_FOR_PLANNER_DASHBOARD_SUCCESS:
      return {
        loading: false,
        data: action.payload,
      };
    case GET_SITE_DATA_MAP_VIEW_FOR_PLANNER_DASHBOARD_ERROR:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
}

export function getSiteMonitoringPicsPercentageReducer(state = {}, action) {
  switch (action.type) {
    case GET_SITE_MONITORING_PICS_PERCENTAGE_REQUEST:
      return { loading: true };
    case GET_SITE_MONITORING_PICS_PERCENTAGE_SUCCESS:
      return {
        loading: false,
        data: action.payload,
      };
    case GET_SITE_MONITORING_PICS_PERCENTAGE_ERROR:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
}

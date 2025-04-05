import axios from "axios";
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
  GET_SITE_LEVEL_PERFORMANCE_DATA_FOR_PLANNER_DASHBOARD_ERROR,
  GET_SITE_LEVEL_PERFORMANCE_DATA_FOR_PLANNER_DASHBOARD_REQUEST,
  GET_SITE_LEVEL_PERFORMANCE_DATA_FOR_PLANNER_DASHBOARD_SUCCESS,
  GET_SPOT_DELIVERY_DATA_FOR_PLANNER_DASHBOARD_ERROR,
  GET_SPOT_DELIVERY_DATA_FOR_PLANNER_DASHBOARD_REQUEST,
  GET_SPOT_DELIVERY_DATA_FOR_PLANNER_DASHBOARD_SUCCESS,
} from "../constants/dashboardConstant";

const newDashboardURL = `${process.env.REACT_APP_PROOH_SERVER}/api/v2/dashboard`;

export const getBasicDataForPlannerDashboard =
  (input) => async (dispatch, getState) => {
    dispatch({
      type: GET_BASIC_DATA_FOR_PLANNER_DASHBOARD_REQUEST,
      payload: input,
    });
    try {
      const { data } = await axios.post(
        `${newDashboardURL}/getBasicDataForPlannerDashboard`,
        input
      );
      dispatch({
        type: GET_BASIC_DATA_FOR_PLANNER_DASHBOARD_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: GET_BASIC_DATA_FOR_PLANNER_DASHBOARD_ERROR,
        payload: {
          message: error.message,
          status: error.response?.status,
          data: error.response?.data,
        },
      });
    }
  };

export const getAudienceDataForPlannerDashboard =
  (input) => async (dispatch, getState) => {
    dispatch({
      type: GET_AUDIENCE_DATA_FOR_PLANNER_DASHBOARD_REQUEST,
      payload: input,
    });
    try {
      const { data } = await axios.post(
        `${newDashboardURL}/getAudienceDataForPlannerDashboard`,
        input
      );
      dispatch({
        type: GET_AUDIENCE_DATA_FOR_PLANNER_DASHBOARD_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: GET_AUDIENCE_DATA_FOR_PLANNER_DASHBOARD_ERROR,
        payload: {
          message: error.message,
          status: error.response?.status,
          data: error.response?.data,
        },
      });
    }
  };

export const getSpotDeliveryDataForPlannerDashboard =
  (input) => async (dispatch, getState) => {
    dispatch({
      type: GET_SPOT_DELIVERY_DATA_FOR_PLANNER_DASHBOARD_REQUEST,
      payload: input,
    });
    try {
      const { data } = await axios.post(
        `${newDashboardURL}/getSpotDeliveryDataForPlannerDashboard`,
        input
      );
      dispatch({
        type: GET_SPOT_DELIVERY_DATA_FOR_PLANNER_DASHBOARD_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: GET_SPOT_DELIVERY_DATA_FOR_PLANNER_DASHBOARD_ERROR,
        payload: {
          message: error.message,
          status: error.response?.status,
          data: error.response?.data,
        },
      });
    }
  };

export const getCostDataForPlannerDashboard =
  (input) => async (dispatch, getState) => {
    dispatch({
      type: GET_COST_DATA_FOR_PLANNER_DASHBOARD_REQUEST,
      payload: input,
    });
    try {
      const { data } = await axios.post(
        `${newDashboardURL}/getCostDataForPlannerDashboard`,
        input
      );
      dispatch({
        type: GET_COST_DATA_FOR_PLANNER_DASHBOARD_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: GET_COST_DATA_FOR_PLANNER_DASHBOARD_ERROR,
        payload: {
          message: error.message,
          status: error.response?.status,
          data: error.response?.data,
        },
      });
    }
  };

export const getSiteLevelPerformanceForPlannerDashboard =
  (input) => async (dispatch, getState) => {
    dispatch({
      type: GET_SITE_LEVEL_PERFORMANCE_DATA_FOR_PLANNER_DASHBOARD_REQUEST,
      payload: input,
    });
    try {
      const { data } = await axios.post(
        `${newDashboardURL}/getSiteLevelPerformanceForPlannerDashboard`,
        input
      );
      dispatch({
        type: GET_SITE_LEVEL_PERFORMANCE_DATA_FOR_PLANNER_DASHBOARD_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: GET_SITE_LEVEL_PERFORMANCE_DATA_FOR_PLANNER_DASHBOARD_ERROR,
        payload: {
          message: error.message,
          status: error.response?.status,
          data: error.response?.data,
        },
      });
    }
  };

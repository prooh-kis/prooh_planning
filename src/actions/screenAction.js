import axios from "axios";
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

const url = `${process.env.REACT_APP_PROOH_SERVER}/api/v2/screens`;

export const getScreensAudiencesData = ({ markets }) => async (dispatch, getState) => {
  dispatch({
    type: GET_SCREEN_DATA_BY_AUDIENCES_REQUEST,
    payload: markets
  });

  try {
    const { data } = await axios.post(`${url}/audienceData`, {
      markets
    });
    dispatch({
      type: GET_SCREEN_DATA_BY_AUDIENCES_SUCCESS,
      payload: data,
    });

  } catch (error) {
    dispatch({
      type: GET_SCREEN_DATA_BY_AUDIENCES_ERROR,
      payload: error,
    });
  }
}


export const getScreensCostData = ({ cohorts, gender, touchPoints, duration }) => async (dispatch, getState) => {
  dispatch({
    type: GET_SCREENS_COST_DATA_REQUEST,
    payload: { cohorts, gender, touchPoints, duration }
  });

  try {
    const { data } = await axios.post(`${url}/tableAudienceTouchPointPage`, {
      cohorts, gender, touchPoints, duration
    });
    dispatch({
      type: GET_SCREENS_COST_DATA_SUCCESS,
      payload: data,
    });

  } catch (error) {
    dispatch({
      type: GET_SCREENS_COST_DATA_ERROR,
      payload: error,
    });
  }
}

export const getScreenDataForAdvanceFilters = ({ touchPoints }) => async (dispatch, getState) => {
  dispatch({
    type: GET_SCREENS_DATA_ADVANCE_FILTER_REQUEST,
    payload: { touchPoints }
  });

  try {
    const { data } = await axios.post(`${url}/screenDataFilterPage`, {
      touchPoints
    });
    dispatch({
      type: GET_SCREENS_DATA_ADVANCE_FILTER_SUCCESS,
      payload: data,
    });

  } catch (error) {
    dispatch({
      type: GET_SCREENS_DATA_ADVANCE_FILTER_ERROR,
      payload: error,
    });
  }
}

export const getRegularVsCohortPriceData = ({ screenIds, cohorts, gender, duration }) => async (dispatch, getState) => {
  dispatch({
    type: GET_SCREENS_PRICE_FOR_REGULAR_COHORT_REQUEST,
    payload: { screenIds, cohorts, gender, duration },
  });

  try {
    const { data } = await axios.post(`${url}/tableDataComparePlanPage`, {
      screenIds, cohorts, gender, duration
    });
    dispatch({
      type: GET_SCREENS_PRICE_FOR_REGULAR_COHORT_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_SCREENS_PRICE_FOR_REGULAR_COHORT_ERROR,
      payload: error,
    });
  }
}

export const getScreenSummaryData = ({screenIds, touchPointData, cohorts, gender}) => async (dispatch, getState) => {
  dispatch({
    type: GET_SCREEN_SUMMARY_DATA_REQUEST,
    payload: { screenIds, touchPointData, cohorts, gender },
  });
  try {
    const { data } = await axios.post(`${url}/screenDataScreenSummaryPage`, {
      screenIds, touchPointData, cohorts, gender
    });
    dispatch({
      type: GET_SCREEN_SUMMARY_DATA_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_SCREEN_SUMMARY_DATA_ERROR,
      payload: error,
    })
  }
}
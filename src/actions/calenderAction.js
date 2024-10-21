// getIndustryCategory

import axios from "axios";
import {
  GET_ALL_CATEGORY_LIST_ERROR,
  GET_ALL_CATEGORY_LIST_REQUEST,
  GET_ALL_CATEGORY_LIST_SUCCESS,
  GET_CALENDER_LIST_DATA_ERROR,
  GET_CALENDER_LIST_DATA_REQUEST,
  GET_CALENDER_LIST_DATA_SUCCESS,
} from "../constants/calenderConstant";

const url = `${process.env.REACT_APP_PROOH_SERVER}/api/v2/integration`;

export const getIndustryCategory = (input) => async (dispatch, getState) => {
  dispatch({
    type: GET_ALL_CATEGORY_LIST_REQUEST,
    payload: input,
  });
  try {
    const { data } = await axios.post(`${url}/getIndustryCategory`, input);
    dispatch({
      type: GET_ALL_CATEGORY_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_ALL_CATEGORY_LIST_ERROR,
      payload: {
        message: error.message,
        status: error.response?.status,
        data: error.response?.data,
      },
    });
  }
};

// getCalendarData

export const getCalendarListData = (input) => async (dispatch, getState) => {
  dispatch({
    type: GET_CALENDER_LIST_DATA_REQUEST,
    payload: input,
  });
  try {
    const { data } = await axios.post(`${url}/getCalendarData`, input);
    dispatch({
      type: GET_CALENDER_LIST_DATA_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_CALENDER_LIST_DATA_ERROR,
      payload: {
        message: error.message,
        status: error.response?.status,
        data: error.response?.data,
      },
    });
  }
};

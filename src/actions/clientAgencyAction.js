import axios from "axios";
import {
  ADD_CLIENT_AGENCY_DETAILS_FAIL,
  ADD_CLIENT_AGENCY_DETAILS_REQUEST,
  ADD_CLIENT_AGENCY_DETAILS_SUCCESS,
  GET_CLIENT_AGENCY_DETAILS_FAIL,
  GET_CLIENT_AGENCY_DETAILS_REQUEST,
  GET_CLIENT_AGENCY_DETAILS_SUCCESS,
  GET_CLIENT_AGENCY_NAMES_LIST_FAIL,
  GET_CLIENT_AGENCY_NAMES_LIST_REQUEST,
  GET_CLIENT_AGENCY_NAMES_LIST_SUCCESS,
  REMOVE_CLIENT_AGENCY_FAIL,
  REMOVE_CLIENT_AGENCY_REQUEST,
  REMOVE_CLIENT_AGENCY_SUCCESS,
} from "../constants/clientAgencyConstants";
import { clientAgencyURL } from "../constants/urlConstant";

export const getAllClientAgencyNames = () => async (dispatch, getState) => {
  dispatch({
    type: GET_CLIENT_AGENCY_NAMES_LIST_REQUEST,
    payload: {},
  });
  try {
    const { data } = await axios.get(`${clientAgencyURL}/allClientAgencyName`);
    dispatch({
      type: GET_CLIENT_AGENCY_NAMES_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_CLIENT_AGENCY_NAMES_LIST_FAIL,
      payload: {
        message: error.message,
        status: error.response?.status,
        data: error.response?.data,
      },
    });
  }
};

export const getClientAgencyDetails =
  ({ clientAgencyName }) =>
  async (dispatch, getState) => {
    dispatch({
      type: GET_CLIENT_AGENCY_DETAILS_REQUEST,
      payload: { clientAgencyName },
    });
    try {
      const { data } = await axios.get(
        `${clientAgencyURL}/getDetails?clientAgencyName=${clientAgencyName}`
      );
      dispatch({
        type: GET_CLIENT_AGENCY_DETAILS_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: GET_CLIENT_AGENCY_DETAILS_FAIL,
        payload: {
          message: error.message,
          status: error.response?.status,
          data: error.response?.data,
        },
      });
    }
  };

export const removeCouponForCampaign =
  ({ campaignCreationId }) =>
  async (dispatch, getState) => {
    dispatch({
      type: REMOVE_CLIENT_AGENCY_REQUEST,
      payload: { campaignCreationId },
    });
    try {
      const { data } = await axios.post(`${clientAgencyURL}/remove`, {
        campaignCreationId,
      });
      dispatch({
        type: REMOVE_CLIENT_AGENCY_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: REMOVE_CLIENT_AGENCY_FAIL,
        payload: {
          message: error.message,
          status: error.response?.status,
          data: error.response?.data,
        },
      });
    }
  };

export const addClientAgencyDetails = (input) => async (dispatch, getState) => {
  dispatch({
    type: ADD_CLIENT_AGENCY_DETAILS_REQUEST,
    payload: input,
  });
  try {
    const { data } = await axios.post(`${clientAgencyURL}/add`, input);
    dispatch({
      type: ADD_CLIENT_AGENCY_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ADD_CLIENT_AGENCY_DETAILS_FAIL,
      payload: {
        message: error.message,
        status: error.response?.status,
        data: error.response?.data,
      },
    });
  }
};

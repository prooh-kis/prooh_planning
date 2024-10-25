import axios from "axios";
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
  CHANGE_CAMPAIGN_STATUS_AFTER_VENDOR_APPROVAL_REQUEST,
  CHANGE_CAMPAIGN_STATUS_AFTER_VENDOR_APPROVAL_SUCCESS,
  CHANGE_CAMPAIGN_STATUS_AFTER_VENDOR_APPROVAL_ERROR,
  CHANGE_CAMPAIGN_DURATION_SUCCESS,
  CHANGE_CAMPAIGN_DURATION_ERROR,
  CHANGE_CAMPAIGN_DURATION_REQUEST,
} from "../constants/campaignConstants";
const url = `${process.env.REACT_APP_PROOH_SERVER}/api/v2/campaigns`;

export const addDetailsToCreateCampaign =
  (input) => async (dispatch, getState) => {
    dispatch({
      type: ADD_DETAILS_TO_CREATE_CAMPAIGN_REQUEST,
      payload: input,
    });
    try {
      const { data } = await axios.post(`${url}/addDataForCampaign`, input);
      dispatch({
        type: ADD_DETAILS_TO_CREATE_CAMPAIGN_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: ADD_DETAILS_TO_CREATE_CAMPAIGN_ERROR,
        payload: {
          message: error.message,
          status: error.response?.status,
          data: error.response?.data,
        },
      });
    }
  };

export const getMyCreateCampaignsList =
  ({ id, type }) =>
  async (dispatch, getState) => {
    dispatch({
      type: GET_MY_CREATE_CAMPAIGNS_LIST_REQUEST,
      payload: { id, type },
    });
    try {
      const { data } = await axios.post(
        `${url}/campaignCreationsCampaignPlanner`,
        { id, type }
      );
      dispatch({
        type: GET_MY_CREATE_CAMPAIGNS_LIST_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: GET_MY_CREATE_CAMPAIGNS_LIST_ERROR,
        payload: {
          message: error.message,
          status: error.response?.status,
          data: error.response?.data,
        },
      });
    }
  };

export const getMyCreateCampaignsManagerRequestsList =
  ({ id, type }) =>
  async (dispatch, getState) => {
    dispatch({
      type: GET_MY_CREATE_CAMPAIGNS_MANAGER_REQUESTS_LIST_REQUEST,
      payload: { id, type },
    });
    try {
      const { data } = await axios.post(
        `${url}/campaignCreationsCampaignManager`,
        { id, type }
      );
      dispatch({
        type: GET_MY_CREATE_CAMPAIGNS_MANAGER_REQUESTS_LIST_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: GET_MY_CREATE_CAMPAIGNS_MANAGER_REQUESTS_LIST_ERROR,
        payload: {
          message: error.message,
          status: error.response?.status,
          data: error.response?.data,
        },
      });
    }
  };

export const getMyCreateCampaignsVendorRequestsList =
  ({ id, status }) =>
  async (dispatch, getState) => {
    dispatch({
      type: GET_MY_CREATE_CAMPAIGNS_VENDOR_REQUESTS_LIST_REQUEST,
      payload: { id, status },
    });
    try {
      const { data } = await axios.post(
        `${url}/campaignCreationsScreenVendor`,
        { id, status }
      );
      dispatch({
        type: GET_MY_CREATE_CAMPAIGNS_VENDOR_REQUESTS_LIST_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: GET_MY_CREATE_CAMPAIGNS_VENDOR_REQUESTS_LIST_ERROR,
        payload: {
          message: error.message,
          status: error.response?.status,
          data: error.response?.data,
        },
      });
    }
  };

export const changeCampaignStatusAfterCreativeUpload =
  ({ id, status }) =>
  async (dispatch, getState) => {
    dispatch({
      type: CHANGE_CAMPAIGN_STATUS_AFTER_CREATIVE_UPLOAD_REQUEST,
      payload: { id, status },
    });
    try {
      const { data } = await axios.post(`${url}/createCampaigns`, {
        id,
        status,
      });
      dispatch({
        type: CHANGE_CAMPAIGN_STATUS_AFTER_CREATIVE_UPLOAD_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: CHANGE_CAMPAIGN_STATUS_AFTER_CREATIVE_UPLOAD_ERROR,
        payload: {
          message: error.message,
          status: error.response?.status,
          data: error.response?.data,
        },
      });
    }
  };

export const changeCampaignStatusAfterVendorApproval =
  ({ ids }) =>
  async (dispatch, getState) => {
    dispatch({
      type: CHANGE_CAMPAIGN_STATUS_AFTER_VENDOR_APPROVAL_REQUEST,
      payload: { ids },
    });
    try {
      const { data } = await axios.post(`${url}/approveCampaignScreenVendor`, {
        ids,
      });
      dispatch({
        type: CHANGE_CAMPAIGN_STATUS_AFTER_VENDOR_APPROVAL_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: CHANGE_CAMPAIGN_STATUS_AFTER_VENDOR_APPROVAL_ERROR,
        payload: {
          message: error.message,
          status: error.response?.status,
          data: error.response?.data,
        },
      });
    }
  };

export const changeCampaignDuration = (input) => async (dispatch, getState) => {
  dispatch({
    type: CHANGE_CAMPAIGN_DURATION_REQUEST,
    payload: input,
  });
  try {
    const { data } = await axios.put(`${url}/update`, input);
    dispatch({
      type: CHANGE_CAMPAIGN_DURATION_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: CHANGE_CAMPAIGN_DURATION_ERROR,
      payload: {
        message: error.message,
        status: error.response?.status,
        data: error.response?.data,
      },
    });
  }
};


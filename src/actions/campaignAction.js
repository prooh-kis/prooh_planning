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
  GET_MY_CREATE_CAMPAIGNS_VENDOR_REQUESTS_LIST_ERROR
} from "../constants/campaignConstants";
const url = `${process.env.REACT_APP_PROOH_SERVER}/api/v2/campaigns`;

export const addDetailsToCreateCampaign = (input) => async (dispatch, getState) => {
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
    })
  }
}


export const getMyCreateCampaignsList = ({id}) => async (dispatch, getState) => {
  dispatch({
    type: GET_MY_CREATE_CAMPAIGNS_LIST_REQUEST,
    payload: {id},
  });
  try {
    const { data } = await axios.post(`${url}/campaignCreationsCampaignPlanner`, {id});
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
    })
  }
}


export const getMyCreateCampaignsManagerRequestsList = ({id}) => async (dispatch, getState) => {
  dispatch({
    type: GET_MY_CREATE_CAMPAIGNS_MANAGER_REQUESTS_LIST_REQUEST,
    payload: {id},
  });
  try {
    const { data } = await axios.post(`${url}/campaignCreationsCampaignManager`, {id});
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
    })
  }
}

export const getMyCreateCampaignsVendorRequestsList = ({id}) => async (dispatch, getState) => {
  dispatch({
    type: GET_MY_CREATE_CAMPAIGNS_VENDOR_REQUESTS_LIST_REQUEST,
    payload: {id},
  });
  try {
    const { data } = await axios.post(`${url}/campaignCreationsScreenVendor`, {id});
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
    })
  }
}
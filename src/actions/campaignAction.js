import axios from "axios";
import {
  ADD_DETAILS_TO_CREATE_CAMPAIGN_ERROR,
  ADD_DETAILS_TO_CREATE_CAMPAIGN_REQUEST,
  ADD_DETAILS_TO_CREATE_CAMPAIGN_SUCCESS
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
      payload: error,
    })
  }
}
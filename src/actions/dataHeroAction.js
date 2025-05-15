import Axios from "axios";

import {
  GET_AUDIENCE_DATA_FAIL,
  GET_AUDIENCE_DATA_REQUEST,
  GET_AUDIENCE_DATA_SUCCESS,
  ADD_HERO_DATA_DETAILS_FAIL,
  ADD_HERO_DATA_DETAILS_REQUEST,
  ADD_HERO_DATA_DETAILS_SUCCESS,
  GET_HERO_DATA_DETAILS_FAIL,
  GET_HERO_DATA_DETAILS_REQUEST,
  GET_HERO_DATA_DETAILS_SUCCESS,
  SAVE_AUDIENCE_DATA_FAIL,
  SAVE_AUDIENCE_DATA_REQUEST,
  SAVE_AUDIENCE_DATA_SUCCESS,
} from "../constants/dataHeroConstants";

const URL = `${process.env.REACT_APP_PROOH_SERVER}/api/v2/heroData`;
const URL2 = `${process.env.REACT_APP_PROOH_SERVER}/api/v2/audiences`;

export const registerHeroData = (reqBody) => async (dispatch) => {
  dispatch({
    type: ADD_HERO_DATA_DETAILS_REQUEST,
    payload: reqBody,
  });
  try {
    const { data } = await Axios.post(`${URL}/register`, reqBody);
    dispatch({
      type: ADD_HERO_DATA_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ADD_HERO_DATA_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getRegisterHeroDataDetails = (userId) => async (dispatch) => {
  dispatch({
    type: GET_HERO_DATA_DETAILS_REQUEST,
    payload: userId,
  });
  try {
    const { data } = await Axios.get(`${URL}?dataHeroUserId=${userId}`);
    dispatch({
      type: GET_HERO_DATA_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_HERO_DATA_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const saveAudienceDataAction = (audienceData) => async (dispatch) => {
  dispatch({
    type: SAVE_AUDIENCE_DATA_REQUEST,
    payload: audienceData,
  });
  try {
    const { data } = await Axios.post(`${URL2}/addAudienceData`, audienceData);
    dispatch({
      type: SAVE_AUDIENCE_DATA_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: SAVE_AUDIENCE_DATA_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getAudienceDataAction = (dataHeroInfo) => async (dispatch) => {
  dispatch({
    type: GET_AUDIENCE_DATA_REQUEST,
    payload: dataHeroInfo,
  });
  try {
    const { data } = await Axios.post(`${URL2}/getAudienceData`, dataHeroInfo);
    dispatch({
      type: GET_AUDIENCE_DATA_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_AUDIENCE_DATA_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

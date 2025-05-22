import axios from "axios";

import {
  SAVE_CONTACT_DETAILS_ERROR,
  SAVE_CONTACT_DETAILS_REQUEST,
  SAVE_CONTACT_DETAILS_SUCCESS,
} from "../constants/LandingPageConstants";

const url = `${process.env.REACT_APP_PROOH_SERVER}/api/v2/landing`;

export const saveContactDetailsForQuery =
  (input) => async (dispatch, getState) => {
    dispatch({
      type: SAVE_CONTACT_DETAILS_REQUEST,
    });
    try {
      const { data } = await axios.post(
        `${url}/saveContactDetailsForQuery`,
        input
      );
      dispatch({
        type: SAVE_CONTACT_DETAILS_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: SAVE_CONTACT_DETAILS_ERROR,
        payload: {
          message: error.message,
          status: error.response?.status,
          data: error.response?.data,
        },
      });
    }
  };

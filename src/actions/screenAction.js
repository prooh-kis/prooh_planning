import axios from "axios";
import { GET_SCREEN_DATA_BY_AUDIENCES_ERROR, GET_SCREEN_DATA_BY_AUDIENCES_REQUEST, GET_SCREEN_DATA_BY_AUDIENCES_SUCCESS } from "../constants/screenConstants";

const url = `${process.env.REACT_APP_PROOH_SERVER}/api/v2/screens`;

export const getScreenDataByAudiences = ({ screenIds }) => async (dispatch, getState) => {
  dispatch({
    type: GET_SCREEN_DATA_BY_AUDIENCES_REQUEST,
    payload: {"screenIds": screenIds}
  });

  try {
    const { data } = await axios.post(`${url}/audienceData`, {
      screenIds
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
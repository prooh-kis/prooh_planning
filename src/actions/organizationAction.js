import Axios from "axios"
import {
  CREATE_NEW_ORG_FAIL,
  CREATE_NEW_ORG_REQUEST,
  CREATE_NEW_ORG_SUCCESS,
  GET_MY_ORG_DETAILS_FAIL,
  GET_MY_ORG_DETAILS_REQUEST,
  GET_MY_ORG_DETAILS_SUCCESS
} from "../constants/organizationConstants";
import { orgV2 } from "../constants/urlConstant";


export const createNewOrgAction = (input) => async (dispatch, getState) => {
  dispatch({
    type: CREATE_NEW_ORG_REQUEST,
    payload: input,
  });
  try {
    const {
      auth: { userInfo },
    } = getState();

    const { data } = await Axios.post(
      `${orgV2}/add`,
      input,
      {
        headers: { authorization: `Bearer ${userInfo.token}` },
      }
    );
    dispatch({
      type: CREATE_NEW_ORG_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: CREATE_NEW_ORG_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};


export const getMyOrgDetailsAction = (input) => async (dispatch, getState) => {
  dispatch({
    type: GET_MY_ORG_DETAILS_REQUEST,
    payload: input,
  });
  try {
    const {
      auth: { userInfo },
    } = getState();

    const { data } = await Axios.get(
      `${orgV2}/getMyOrganizationForAdmin?id=${input.id}`,
      {
        headers: { authorization: `Bearer ${userInfo.token}` },
      }
    );
    dispatch({
      type: GET_MY_ORG_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_MY_ORG_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
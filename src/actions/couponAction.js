import axios from "axios";
import {
  APPLY_COUPON_FAIL,
  APPLY_COUPON_REQUEST,
  APPLY_COUPON_SUCCESS,
  GET_COUPON_LIST_FAIL,
  GET_COUPON_LIST_REQUEST,
  GET_COUPON_LIST_SUCCESS,
  REMOVE_COUPON_FAIL,
  REMOVE_COUPON_REQUEST,
  REMOVE_COUPON_SUCCESS,
} from "../constants/couponConstants";
import { couponURL } from "../constants/urlConstant";

export const getCouponList = () => async (dispatch, getState) => {
  dispatch({
    type: GET_COUPON_LIST_REQUEST,
    payload: {},
  });
  try {
    const { data } = await axios.post(`${couponURL}/get`);
    dispatch({
      type: GET_COUPON_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_COUPON_LIST_FAIL,
      payload: {
        message: error.message,
        status: error.response?.status,
        data: error.response?.data,
      },
    });
  }
};

// { campaignCreationId, couponId } = input
export const applyCouponForCampaign = (input) => async (dispatch, getState) => {
  dispatch({
    type: APPLY_COUPON_REQUEST,
    payload: {},
  });
  try {
    const { data } = await axios.post(`${couponURL}/apply`, input);
    dispatch({
      type: APPLY_COUPON_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: APPLY_COUPON_FAIL,
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
      type: REMOVE_COUPON_REQUEST,
      payload: { campaignCreationId },
    });
    try {
      const { data } = await axios.post(`${couponURL}/remove`, {
        campaignCreationId,
      });
      dispatch({
        type: REMOVE_COUPON_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: REMOVE_COUPON_FAIL,
        payload: {
          message: error.message,
          status: error.response?.status,
          data: error.response?.data,
        },
      });
    }
  };

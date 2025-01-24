import {
  APPLY_COUPON_FAIL,
  APPLY_COUPON_REQUEST,
  APPLY_COUPON_RESET,
  APPLY_COUPON_SUCCESS,
  GET_COUPON_LIST_FAIL,
  GET_COUPON_LIST_REQUEST,
  GET_COUPON_LIST_RESET,
  GET_COUPON_LIST_SUCCESS,
} from "../constants/couponConstants";

export function getCouponListReducer(state = [], action) {
  switch (action.type) {
    case GET_COUPON_LIST_REQUEST:
      return { loading: true };
    case GET_COUPON_LIST_SUCCESS:
      return {
        loading: false,
        success: true,
        data: action.payload,
      };
    case GET_COUPON_LIST_FAIL:
      return {
        loading: false,
        success: false,
        error: action.payload,
      };
    case GET_COUPON_LIST_RESET:
      return {
        loading: false,
        success: false,
        data: state,
      };
    default:
      return state;
  }
}

export function applyCouponForCampaignReducer(state = [], action) {
  switch (action.type) {
    case APPLY_COUPON_REQUEST:
      return { loading: true };
    case APPLY_COUPON_SUCCESS:
      return {
        loading: false,
        success: true,
        data: action.payload,
      };
    case APPLY_COUPON_FAIL:
      return {
        loading: false,
        success: false,
        error: action.payload,
      };
    case APPLY_COUPON_RESET:
      return {
        loading: false,
        success: false,
        data: state,
      };
    default:
      return state;
  }
}

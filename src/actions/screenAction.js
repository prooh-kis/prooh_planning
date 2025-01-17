import axios from "axios";
import {
  GET_CAMPAIGN_DASHBOARD_DATA_ERROR,
  GET_CAMPAIGN_DASHBOARD_DATA_REQUEST,
  GET_CAMPAIGN_DASHBOARD_DATA_SUCCESS,
  GET_FINAL_PLAN_PO_DATA_ERROR,
  GET_FINAL_PLAN_PO_DATA_REQUEST,
  GET_FINAL_PLAN_PO_DATA_SUCCESS,
  GET_LANDING_PAGE_DATA_ERROR,
  GET_LANDING_PAGE_DATA_REQUEST,
  GET_LANDING_PAGE_DATA_SUCCESS,
  GET_SCREEN_DATA_BY_AUDIENCES_ERROR,
  GET_SCREEN_DATA_BY_AUDIENCES_REQUEST,
  GET_SCREEN_DATA_BY_AUDIENCES_SUCCESS,
  GET_SCREEN_DATA_CITY_WISE_FOR_UPLOAD_CREATIVES_ERROR,
  GET_SCREEN_DATA_CITY_WISE_FOR_UPLOAD_CREATIVES_REQUEST,
  GET_SCREEN_DATA_CITY_WISE_FOR_UPLOAD_CREATIVES_SUCCESS,
  GET_SCREEN_SUMMARY_DATA_ERROR,
  GET_SCREEN_SUMMARY_DATA_REQUEST,
  GET_SCREEN_SUMMARY_DATA_SUCCESS,
  GET_SCREEN_SUMMARY_PLAN_TABLE_DATA_ERROR,
  GET_SCREEN_SUMMARY_PLAN_TABLE_DATA_REQUEST,
  GET_SCREEN_SUMMARY_PLAN_TABLE_DATA_SUCCESS,
  GET_SCREENS_COST_DATA_ERROR,
  GET_SCREENS_COST_DATA_REQUEST,
  GET_SCREENS_COST_DATA_SUCCESS,
  GET_SCREENS_DATA_ADVANCE_FILTER_ERROR,
  GET_SCREENS_DATA_ADVANCE_FILTER_REQUEST,
  GET_SCREENS_DATA_ADVANCE_FILTER_SUCCESS,
  GET_SCREENS_PRICE_FOR_REGULAR_COHORT_ERROR,
  GET_SCREENS_PRICE_FOR_REGULAR_COHORT_REQUEST,
  GET_SCREENS_PRICE_FOR_REGULAR_COHORT_SUCCESS,
  GET_TABLE_DATA_FOR_SELECT_TOPICAL_DATA_ERROR,
  GET_TABLE_DATA_FOR_SELECT_TOPICAL_DATA_REQUEST,
  GET_TABLE_DATA_FOR_SELECT_TOPICAL_DATA_SUCCESS,
  GET_TABLE_DATA_FOR_SELECT_TRIGGER_ERROR,
  GET_TABLE_DATA_FOR_SELECT_TRIGGER_REQUEST,
  GET_TABLE_DATA_FOR_SELECT_TRIGGER_SUCCESS,
  GET_TABLE_DATA_SCREEN_WISE_AD_PLAY_ERROR,
  GET_TABLE_DATA_SCREEN_WISE_AD_PLAY_REQUEST,
  GET_TABLE_DATA_SCREEN_WISE_AD_PLAY_SUCCESS,
  GET_VENDOR_CONFIRMATION_DETAILS_ERROR,
  GET_VENDOR_CONFIRMATION_DETAILS_REQUEST,
  GET_VENDOR_CONFIRMATION_DETAILS_SUCCESS,
  GET_VENDOR_CONFIRMATION_STATUS_TABLE_DETAILS_ERROR,
  GET_VENDOR_CONFIRMATION_STATUS_TABLE_DETAILS_REQUEST,
  GET_VENDOR_CONFIRMATION_STATUS_TABLE_DETAILS_SUCCESS,
  PLANNING_PAGE_FOOTER_DATA_ERROR,
  PLANNING_PAGE_FOOTER_DATA_REQUEST,
  PLANNING_PAGE_FOOTER_DATA_SUCCESS,
  TABLE_DATA_SET_AD_PLAY_TIME_ERROR,
  TABLE_DATA_SET_AD_PLAY_TIME_REQUEST,
  TABLE_DATA_SET_AD_PLAY_TIME_SUCCESS,
} from "../constants/screenConstants";

const url = `${process.env.REACT_APP_PROOH_SERVER}/api/v2/screens`;

export const getLandingPageData = () => async (dispatch, getState) => {
  dispatch({
    type: GET_LANDING_PAGE_DATA_REQUEST,
  });
  try {
    const { data } = await axios.get(`${url}/landingPageData`);
    dispatch({
      type: GET_LANDING_PAGE_DATA_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_LANDING_PAGE_DATA_ERROR,
      payload: {
        message: error.message,
        status: error.response?.status,
        data: error.response?.data,
      },
    });
  }
};

export const getScreensAudiencesData =
  ({ id, markets }) =>
  async (dispatch, getState) => {
    dispatch({
      type: GET_SCREEN_DATA_BY_AUDIENCES_REQUEST,
      payload: markets,
    });

    try {
      const { data } = await axios.post(`${url}/audienceData`, {
        id,
        markets,
      });
      dispatch({
        type: GET_SCREEN_DATA_BY_AUDIENCES_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: GET_SCREEN_DATA_BY_AUDIENCES_ERROR,
        payload: {
          message: error.message,
          status: error.response?.status,
          data: error.response?.data,
        },
      });
    }
  };

export const getScreensCostData =
  ({ id, cohorts, gender, touchPoints, duration }) =>
  async (dispatch, getState) => {
    dispatch({
      type: GET_SCREENS_COST_DATA_REQUEST,
      payload: { cohorts, gender, touchPoints, duration },
    });

    try {
      const { data } = await axios.post(`${url}/tableAudienceTouchPointPage`, {
        id,
        cohorts,
        gender,
        touchPoints,
        duration,
      });
      dispatch({
        type: GET_SCREENS_COST_DATA_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: GET_SCREENS_COST_DATA_ERROR,
        payload: {
          message: error.message,
          status: error.response?.status,
          data: error.response?.data,
        },
      });
    }
  };

export const getScreenDataForAdvanceFilters =
  ({ id, touchPoints }) =>
  async (dispatch, getState) => {
    dispatch({
      type: GET_SCREENS_DATA_ADVANCE_FILTER_REQUEST,
      payload: { touchPoints },
    });

    try {
      const { data } = await axios.post(`${url}/screenDataFilterPage`, {
        id,
        touchPoints,
      });
      dispatch({
        type: GET_SCREENS_DATA_ADVANCE_FILTER_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: GET_SCREENS_DATA_ADVANCE_FILTER_ERROR,
        payload: {
          message: error.message,
          status: error.response?.status,
          data: error.response?.data,
        },
      });
    }
  };

export const getRegularVsCohortPriceData =
  ({ id, screenIds, cohorts, gender, duration }) =>
  async (dispatch, getState) => {
    dispatch({
      type: GET_SCREENS_PRICE_FOR_REGULAR_COHORT_REQUEST,
      payload: { screenIds, cohorts, gender, duration },
    });

    try {
      const { data } = await axios.post(`${url}/tableDataComparePlanPage`, {
        id,
        screenIds,
        cohorts,
        gender,
        duration,
      });
      dispatch({
        type: GET_SCREENS_PRICE_FOR_REGULAR_COHORT_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: GET_SCREENS_PRICE_FOR_REGULAR_COHORT_ERROR,
        payload: {
          message: error.message,
          status: error.response?.status,
          data: error.response?.data,
        },
      });
    }
  };

export const getScreenSummaryData =
  ({ id, type = "regular" }) =>
  async (dispatch, getState) => {
    dispatch({
      type: GET_SCREEN_SUMMARY_DATA_REQUEST,
      payload: { id, type },
    });
    try {
      const { data } = await axios.post(`${url}/screenDataScreenSummaryPage`, {
        id,
        type,
      });
      dispatch({
        type: GET_SCREEN_SUMMARY_DATA_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: GET_SCREEN_SUMMARY_DATA_ERROR,
        payload: {
          message: error.message,
          status: error.response?.status,
          data: error.response?.data,
        },
      });
    }
  };

export const getScreenSummaryPlanTableData =
  ({ id, screenIds }) =>
  async (dispatch, getState) => {
    dispatch({
      type: GET_SCREEN_SUMMARY_PLAN_TABLE_DATA_REQUEST,
      payload: { id, screenIds },
    });
    try {
      const { data } = await axios.post(`${url}/tableDataScreenSummaryPage`, {
        id,
        screenIds,
      });
      dispatch({
        type: GET_SCREEN_SUMMARY_PLAN_TABLE_DATA_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: GET_SCREEN_SUMMARY_PLAN_TABLE_DATA_ERROR,
        payload: {
          message: error.message,
          status: error.response?.status,
          data: error.response?.data,
        },
      });
    }
  };

export const getFinalPlanPOTableData =
  (poInput) => async (dispatch, getState) => {
    dispatch({
      type: GET_FINAL_PLAN_PO_DATA_REQUEST,
      payload: poInput,
    });
    try {
      const { data } = await axios.post(
        `${url}/tableDataViewFinalPlanPage`,
        poInput
      );
      dispatch({
        type: GET_FINAL_PLAN_PO_DATA_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: GET_FINAL_PLAN_PO_DATA_ERROR,
        payload: {
          message: error.message,
          status: error.response?.status,
          data: error.response?.data,
        },
      });
    }
  };

export const getScreenDataUploadCreativeData =
  ({ id }) =>
  async (dispatch, getState) => {
    dispatch({
      type: GET_SCREEN_DATA_CITY_WISE_FOR_UPLOAD_CREATIVES_REQUEST,
      payload: { id },
    });
    try {
      const { data } = await axios.post(`${url}/screenDataUploadCreativePage`, {
        id,
      });
      dispatch({
        type: GET_SCREEN_DATA_CITY_WISE_FOR_UPLOAD_CREATIVES_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: GET_SCREEN_DATA_CITY_WISE_FOR_UPLOAD_CREATIVES_ERROR,
        payload: {
          message: error.message,
          status: error.response?.status,
          data: error.response?.data,
        },
      });
    }
  };

export const getVendorConfirmationDetails =
  (vendorInput) => async (dispatch, getState) => {
    dispatch({
      type: GET_VENDOR_CONFIRMATION_DETAILS_REQUEST,
      payload: vendorInput,
    });
    try {
      const { data } = await axios.post(
        `${url}/tableDataVendorCnfPage`,
        vendorInput
      );
      dispatch({
        type: GET_VENDOR_CONFIRMATION_DETAILS_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: GET_VENDOR_CONFIRMATION_DETAILS_ERROR,
        payload: {
          message: error.message,
          status: error.response?.status,
          data: error.response?.data,
        },
      });
    }
  };

export const getVendorConfirmationStatusTableDetails =
  ({ id }) =>
  async (dispatch, getState) => {
    dispatch({
      type: GET_VENDOR_CONFIRMATION_STATUS_TABLE_DETAILS_REQUEST,
      payload: { id },
    });
    try {
      const { data } = await axios.post(`${url}/statusTableVendorCnfPage`, {
        id,
      });
      dispatch({
        type: GET_VENDOR_CONFIRMATION_STATUS_TABLE_DETAILS_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: GET_VENDOR_CONFIRMATION_STATUS_TABLE_DETAILS_ERROR,
        payload: {
          message: error.message,
          status: error.response?.status,
          data: error.response?.data,
        },
      });
    }
  };

export const getCampaignDashboardData =
  ({ id }) =>
  async (dispatch, getState) => {
    dispatch({
      type: GET_CAMPAIGN_DASHBOARD_DATA_REQUEST,
      payload: { id },
    });
    try {
      const { data } = await axios.post(`${url}/campaignDashboard`, { id });
      dispatch({
        type: GET_CAMPAIGN_DASHBOARD_DATA_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: GET_CAMPAIGN_DASHBOARD_DATA_ERROR,
        payload: {
          message: error.message,
          status: error.response?.status,
          data: error.response?.data,
        },
      });
    }
  };

export const getTableDataForSelectTopicalDayPage =
  (input) => async (dispatch, getState) => {
    dispatch({
      type: GET_TABLE_DATA_FOR_SELECT_TOPICAL_DATA_REQUEST,
      payload: input,
    });
    try {
      const { data } = await axios.post(
        `${url}/tableDataForSelectTopicalDayPage`,
        input
      );
      dispatch({
        type: GET_TABLE_DATA_FOR_SELECT_TOPICAL_DATA_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: GET_TABLE_DATA_FOR_SELECT_TOPICAL_DATA_ERROR,
        payload: {
          message: error.message,
          status: error.response?.status,
          data: error.response?.data,
        },
      });
    }
  };

export const getPlanningPageFooterData =
  ({ id, pageName }) =>
  async (dispatch, getState) => {
    dispatch({
      type: PLANNING_PAGE_FOOTER_DATA_REQUEST,
      payload: { id, pageName },
    });
    try {
      const { data } = await axios.post(`${url}/planningPageFooter`, {
        id,
        pageName,
      });
      dispatch({
        type: PLANNING_PAGE_FOOTER_DATA_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: PLANNING_PAGE_FOOTER_DATA_ERROR,
        payload: {
          message: error.message,
          status: error.response?.status,
          data: error.response?.data,
        },
      });
    }
  };

export const getTableDataScreenWiseAdPlayTime =
  ({ id }) =>
  async (dispatch, getState) => {
    dispatch({
      type: GET_TABLE_DATA_SCREEN_WISE_AD_PLAY_REQUEST,
      payload: { id },
    });
    try {
      const { data } = await axios.post(
        `${url}/tableDataScreenWiseAdPLayTime`,
        { id }
      );
      dispatch({
        type: GET_TABLE_DATA_SCREEN_WISE_AD_PLAY_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: GET_TABLE_DATA_SCREEN_WISE_AD_PLAY_ERROR,
        payload: {
          message: error.message,
          status: error.response?.status,
          data: error.response?.data,
        },
      });
    }
  };

export const getTableDataForSelectTriggerPage =
  (input) => async (dispatch, getState) => {
    dispatch({
      type: GET_TABLE_DATA_FOR_SELECT_TRIGGER_REQUEST,
      payload: input,
    });
    try {
      const { data } = await axios.post(
        `${url}/tableDataForSelectTriggerPage`,
        input
      );
      dispatch({
        type: GET_TABLE_DATA_FOR_SELECT_TRIGGER_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: GET_TABLE_DATA_FOR_SELECT_TRIGGER_ERROR,
        payload: {
          message: error.message,
          status: error.response?.status,
          data: error.response?.data,
        },
      });
    }
  };

export const tableDataSetAdPlayTime = (input) => async (dispatch, getState) => {
  dispatch({
    type: TABLE_DATA_SET_AD_PLAY_TIME_REQUEST,
    payload: input,
  });
  try {
    const { data } = await axios.post(`${url}/tableDataSetAdPlayTime`, input);
    dispatch({
      type: TABLE_DATA_SET_AD_PLAY_TIME_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: TABLE_DATA_SET_AD_PLAY_TIME_ERROR,
      payload: {
        message: error.message,
        status: error.response?.status,
        data: error.response?.data,
      },
    });
  }
};

import axios from "axios";
import {
  GET_ALL_FILTERS_DETAILS_FOR_UPLOAD_CREATIVE_PAGE_ERROR,
  GET_ALL_FILTERS_DETAILS_FOR_UPLOAD_CREATIVE_PAGE_REQUEST,
  GET_ALL_FILTERS_DETAILS_FOR_UPLOAD_CREATIVE_PAGE_SUCCESS,
  GET_ALL_PLANNER_IDS_AND_EMAIL_ERROR,
  GET_ALL_PLANNER_IDS_AND_EMAIL_REQUEST,
  GET_ALL_PLANNER_IDS_AND_EMAIL_SUCCESS,
  GET_AUDIENCES_DATA_ADVANCE_FILTER_ERROR,
  GET_AUDIENCES_DATA_ADVANCE_FILTER_REQUEST,
  GET_AUDIENCES_DATA_ADVANCE_FILTER_SUCCESS,
  GET_CREATIVES_FROM_CREATIVE_BUCKET_FOR_UPLOAD_ERROR,
  GET_CREATIVES_FROM_CREATIVE_BUCKET_FOR_UPLOAD_REQUEST,
  GET_CREATIVES_FROM_CREATIVE_BUCKET_FOR_UPLOAD_SUCCESS,
  GET_FINAL_PLAN_PO_DATA_ERROR,
  GET_FINAL_PLAN_PO_DATA_REQUEST,
  GET_FINAL_PLAN_PO_DATA_SUCCESS,
  GET_SCREEN_DATA_BY_AUDIENCES_ERROR,
  GET_SCREEN_DATA_BY_AUDIENCES_REQUEST,
  GET_SCREEN_DATA_BY_AUDIENCES_SUCCESS,
  GET_SCREEN_DATA_CITY_WISE_FOR_UPLOAD_CREATIVES_ERROR,
  GET_SCREEN_DATA_CITY_WISE_FOR_UPLOAD_CREATIVES_REQUEST,
  GET_SCREEN_DATA_CITY_WISE_FOR_UPLOAD_CREATIVES_SUCCESS,
  GET_SCREEN_SUMMARY_DATA_ERROR,
  GET_SCREEN_SUMMARY_DATA_I_KNOW_IT_ALL_ERROR,
  GET_SCREEN_SUMMARY_DATA_I_KNOW_IT_ALL_REQUEST,
  GET_SCREEN_SUMMARY_DATA_I_KNOW_IT_ALL_SUCCESS,
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
import {
  GET_ALL_CATEGORY_LIST_ERROR,
  GET_ALL_CATEGORY_LIST_REQUEST,
  GET_ALL_CATEGORY_LIST_SUCCESS,
  GET_CALENDER_LIST_DATA_ERROR,
  GET_CALENDER_LIST_DATA_REQUEST,
  GET_CALENDER_LIST_DATA_SUCCESS,
} from "../constants/calenderConstant";
import { planningRouterURL } from "../constants/urlConstant";

// tropical day planning
export const getIndustryCategory = (input) => async (dispatch, getState) => {
  dispatch({
    type: GET_ALL_CATEGORY_LIST_REQUEST,
    payload: input,
  });
  try {
    const { data } = await axios.post(
      `${planningRouterURL}/getIndustryCategoryForSelectTopicalDayPage`,
      input
    );
    dispatch({
      type: GET_ALL_CATEGORY_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_ALL_CATEGORY_LIST_ERROR,
      payload: {
        message: error.message,
        status: error.response?.status,
        data: error.response?.data,
      },
    });
  }
};
// tropical day planning
export const getCalendarListData = (input) => async (dispatch, getState) => {
  dispatch({
    type: GET_CALENDER_LIST_DATA_REQUEST,
    payload: input,
  });
  try {
    const { data } = await axios.post(
      `${planningRouterURL}/getCalendarDataForSelectTopicalDayPage`,
      input
    );
    dispatch({
      type: GET_CALENDER_LIST_DATA_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_CALENDER_LIST_DATA_ERROR,
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
      const { data } = await axios.post(`${planningRouterURL}/audienceData`, {
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
      const { data } = await axios.post(
        `${planningRouterURL}/tableAudienceTouchPointPage`,
        {
          id,
          cohorts,
          gender,
          touchPoints,
          duration,
        }
      );
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
      const { data } = await axios.post(
        `${planningRouterURL}/screenDataFilterPage`,
        {
          id,
          touchPoints,
        }
      );
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

export const getPoiBasedAudienceDataForAdvanceFilters =
  ({ id }) =>
  async (dispatch, getState) => {
    dispatch({
      type: GET_AUDIENCES_DATA_ADVANCE_FILTER_REQUEST,
      payload: { id },
    });

    try {
      const { data } = await axios.post(
        `${planningRouterURL}/poiBasedAudienceData`,
        {
          id,
        }
      );
      dispatch({
        type: GET_AUDIENCES_DATA_ADVANCE_FILTER_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: GET_AUDIENCES_DATA_ADVANCE_FILTER_ERROR,
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
      const { data } = await axios.post(
        `${planningRouterURL}/tableDataComparePlanPage`,
        {
          id,
          screenIds,
          cohorts,
          gender,
          duration,
        }
      );
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
      const { data } = await axios.post(
        `${planningRouterURL}/screenDataScreenSummaryPage`,
        {
          id,
          type,
        }
      );
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

export const getScreenSummaryDataIKnowItAll =
  ({ id }) =>
  async (dispatch, getState) => {
    dispatch({
      type: GET_SCREEN_SUMMARY_DATA_I_KNOW_IT_ALL_REQUEST,
      payload: { id },
    });
    try {
      const { data } = await axios.post(
        `${planningRouterURL}/screenDataScreenSummaryPageIKnowItAll`,
        {
          id,
        }
      );
      dispatch({
        type: GET_SCREEN_SUMMARY_DATA_I_KNOW_IT_ALL_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: GET_SCREEN_SUMMARY_DATA_I_KNOW_IT_ALL_ERROR,
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
      const { data } = await axios.post(
        `${planningRouterURL}/tableDataScreenSummaryPage`,
        {
          id,
          screenIds,
        }
      );
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
        `${planningRouterURL}/tableDataViewFinalPlanPage`,
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

export const getVendorConfirmationDetails =
  (vendorInput) => async (dispatch, getState) => {
    dispatch({
      type: GET_VENDOR_CONFIRMATION_DETAILS_REQUEST,
      payload: vendorInput,
    });
    try {
      const { data } = await axios.post(
        `${planningRouterURL}/tableDataVendorCnfPage`,
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
      const { data } = await axios.post(
        `${planningRouterURL}/statusTableVendorCnfPage`,
        {
          id,
        }
      );
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

export const getTableDataForSelectTopicalDayPage =
  (input) => async (dispatch, getState) => {
    dispatch({
      type: GET_TABLE_DATA_FOR_SELECT_TOPICAL_DATA_REQUEST,
      payload: input,
    });
    try {
      const { data } = await axios.post(
        `${planningRouterURL}/tableDataForSelectTopicalDayPage`,
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
      const { data } = await axios.post(
        `${planningRouterURL}/planningPageFooter`,
        {
          id,
          pageName,
        }
      );
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
        `${planningRouterURL}/tableDataScreenWiseAdPLayTime`,
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
        `${planningRouterURL}/tableDataForSelectTriggerPage`,
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
    const { data } = await axios.post(
      `${planningRouterURL}/tableDataSetAdPlayTime`,
      input
    );
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

export const getAllFiltersDetailsForUploadCreativePage =
  (input) => async (dispatch, getState) => {
    dispatch({
      type: GET_ALL_FILTERS_DETAILS_FOR_UPLOAD_CREATIVE_PAGE_REQUEST,
      payload: input,
    });
    try {
      const {
        auth: { userInfo },
      } = getState();

      const { data } = await axios.post(
        `${planningRouterURL}/filterDataUploadCreativePage`,
        input,
        { headers: { authorization: `Bearer ${userInfo.token}` } }
      );
      dispatch({
        type: GET_ALL_FILTERS_DETAILS_FOR_UPLOAD_CREATIVE_PAGE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: GET_ALL_FILTERS_DETAILS_FOR_UPLOAD_CREATIVE_PAGE_ERROR,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const getScreenDataForUploadCreativePageV3 =
  (input) => async (dispatch, getState) => {
    dispatch({
      type: GET_SCREEN_DATA_CITY_WISE_FOR_UPLOAD_CREATIVES_REQUEST,
      payload: input,
    });
    try {
      const {
        auth: { userInfo },
      } = getState();

      const { data } = await axios.post(
        `${planningRouterURL}/screenDataUploadCreativePageV3`,
        input,
        { headers: { authorization: `Bearer ${userInfo.token}` } }
      );
      dispatch({
        type: GET_SCREEN_DATA_CITY_WISE_FOR_UPLOAD_CREATIVES_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: GET_SCREEN_DATA_CITY_WISE_FOR_UPLOAD_CREATIVES_ERROR,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const getCreativesFromCreativeBucketForUploadPage =
  (input) => async (dispatch, getState) => {
    dispatch({
      type: GET_CREATIVES_FROM_CREATIVE_BUCKET_FOR_UPLOAD_REQUEST,
      payload: input,
    });
    try {
      const {
        auth: { userInfo },
      } = getState();

      const { data } = await axios.post(
        `${planningRouterURL}/getCreativesFromCreativeBucketForUploadPage`,
        input,
        { headers: { authorization: `Bearer ${userInfo.token}` } }
      );
      dispatch({
        type: GET_CREATIVES_FROM_CREATIVE_BUCKET_FOR_UPLOAD_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: GET_CREATIVES_FROM_CREATIVE_BUCKET_FOR_UPLOAD_ERROR,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const getAllPlannerIdsAndEmail =
  (input) => async (dispatch, getState) => {
    dispatch({
      type: GET_ALL_PLANNER_IDS_AND_EMAIL_REQUEST,
      payload: input,
    });
    try {
      const {
        auth: { userInfo },
      } = getState();

      const { data } = await axios.post(
        `${planningRouterURL}/getAllPlannerIdsAndEmail`,
        input,
        { headers: { authorization: `Bearer ${userInfo.token}` } }
      );
      dispatch({
        type: GET_ALL_PLANNER_IDS_AND_EMAIL_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: GET_ALL_PLANNER_IDS_AND_EMAIL_ERROR,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

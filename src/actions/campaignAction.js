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
  GET_MY_CREATE_CAMPAIGNS_VENDOR_REQUESTS_LIST_ERROR,
  CHANGE_CAMPAIGN_STATUS_AFTER_VENDOR_APPROVAL_REQUEST,
  CHANGE_CAMPAIGN_STATUS_AFTER_VENDOR_APPROVAL_SUCCESS,
  CHANGE_CAMPAIGN_STATUS_AFTER_VENDOR_APPROVAL_ERROR,
  CHANGE_CAMPAIGN_DURATION_SUCCESS,
  CHANGE_CAMPAIGN_DURATION_ERROR,
  CHANGE_CAMPAIGN_DURATION_REQUEST,
  CAMPAIGN_LOGS_REQUEST,
  CAMPAIGN_LOGS_SUCCESS,
  CAMPAIGN_LOGS_FAIL,
  GET_MY_CREATE_CAMPAIGNS_LIST_FOR_PLAN_REQUEST,
  GET_MY_CREATE_CAMPAIGNS_LIST_FOR_PLAN_SUCCESS,
  GET_MY_CREATE_CAMPAIGNS_LIST_FOR_PLAN_ERROR,
  GET_ALL_CAMPAIGNS_DATA_REQUEST,
  GET_ALL_CAMPAIGNS_DATA_SUCCESS,
  GET_ALL_CAMPAIGNS_DATA_FAIL,
  GET_CAMPAIGN_LOGS_BY_CAMPAIGN_ID_REQUEST,
  GET_CAMPAIGN_LOGS_BY_CAMPAIGN_ID_SUCCESS,
  GET_CAMPAIGN_LOGS_BY_CAMPAIGN_ID_FAIL,
  GET_CAMPAIGN_DATA_REQUEST,
  GET_CAMPAIGN_DATA_SUCCESS,
  GET_CAMPAIGN_DATA_FAIL,
  GET_CAMPAIGN_CREATION_SCREENS_DATA_REQUEST,
  GET_CAMPAIGN_CREATION_SCREENS_DATA_SUCCESS,
  GET_CAMPAIGN_CREATION_SCREENS_DATA_FAIL,
  CAMPAIGN_STATUS_CHANGE_REQUEST,
  CAMPAIGN_STATUS_CHANGE_SUCCESS,
  CAMPAIGN_STATUS_CHANGE_FAIL,
  EDIT_ALL_SUB_CAMPAIGNS_REQUEST,
  EDIT_ALL_SUB_CAMPAIGNS_SUCCESS,
  EDIT_ALL_SUB_CAMPAIGNS_FAIL,
  EDIT_CAMPAIGN_CREATIVE_END_DATE_REQUEST,
  EDIT_CAMPAIGN_CREATIVE_END_DATE_SUCCESS,
  EDIT_CAMPAIGN_CREATIVE_END_DATE_FAIL,
  GET_CAMPAIGN_CREATIONS_DETAILS_REQUEST,
  GET_CAMPAIGN_CREATIONS_DETAILS_SUCCESS,
  GET_CAMPAIGN_CREATIONS_DETAILS_ERROR,
  CLONE_CAMPAIGN_REQUEST,
  CLONE_CAMPAIGN_SUCCESS,
  CLONE_CAMPAIGN_FAIL,
  DOWNLOAD_CAMPAIGN_SUMMARY_PPT_REQUEST,
  DOWNLOAD_CAMPAIGN_SUMMARY_PPT_SUCCESS,
  DOWNLOAD_CAMPAIGN_SUMMARY_PPT_FAIL,
  GET_CAMPAIGN_REQUEST_FINAL_APPROVAL_DETAILS_REQUEST,
  GET_CAMPAIGN_REQUEST_FINAL_APPROVAL_DETAILS_SUCCESS,
  GET_CAMPAIGN_REQUEST_FINAL_APPROVAL_DETAILS_FAIL,
  APPROVE_CAMPAIGN_FINALLY_PROOH_ADMIN_REQUEST,
  APPROVE_CAMPAIGN_FINALLY_PROOH_ADMIN_SUCCESS,
} from "../constants/campaignConstants";
import { removeAllKeyFromLocalStorage } from "../utils/localStorageUtils";
import {
  analyticsURL,
  campaignV2,
  planningRouterURL,
} from "../constants/urlConstant";

export const getCampaignCreationsDetails =
  ({ id }) =>
  async (dispatch, getState) => {
    dispatch({
      type: GET_CAMPAIGN_CREATIONS_DETAILS_REQUEST,
      payload: { id },
    });

    try {
      const { data } = await axios.get(
        `${campaignV2}/campaignDetailsByCampaignCreationId?id=${id}`
      );
      dispatch({
        type: GET_CAMPAIGN_CREATIONS_DETAILS_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: GET_CAMPAIGN_CREATIONS_DETAILS_ERROR,
        payload: {
          message: error.message,
          status: error.response?.status,
          data: error.response?.data,
        },
      });
    }
  };

export const addDetailsToCreateCampaign =
  (input) => async (dispatch, getState) => {
    dispatch({
      type: ADD_DETAILS_TO_CREATE_CAMPAIGN_REQUEST,
      payload: input,
    });
    try {
      removeAllKeyFromLocalStorage();
      const {
        auth: { userInfo },
      } = getState();
      const { data } = await axios.post(
        `${planningRouterURL}/addDataForCampaign`,
        input,
        {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        }
      );

      dispatch({
        type: ADD_DETAILS_TO_CREATE_CAMPAIGN_SUCCESS,
        payload: data,
      });
      dispatch({
        type: GET_CAMPAIGN_CREATIONS_DETAILS_SUCCESS,
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
      });
    }
  };

export const getMyCreateCampaignsList =
  (input) => async (dispatch, getState) => {
    dispatch({
      type: GET_MY_CREATE_CAMPAIGNS_LIST_REQUEST,
      payload: input,
    });
    try {
      const { data } = await axios.post(
        `${campaignV2}/campaignCreationsCampaignPlanner`,
        input
      );
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
      });
    }
  };

export const getMyCreateCampaignsListForPlan =
  ({ id }) =>
  async (dispatch, getState) => {
    dispatch({
      type: GET_MY_CREATE_CAMPAIGNS_LIST_FOR_PLAN_REQUEST,
      payload: { id },
    });
    try {
      const { data } = await axios.post(
        `${campaignV2}/campaignCreationsCampaignPlannerForPlan`,
        { id }
      );
      dispatch({
        type: GET_MY_CREATE_CAMPAIGNS_LIST_FOR_PLAN_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: GET_MY_CREATE_CAMPAIGNS_LIST_FOR_PLAN_ERROR,
        payload: {
          message: error.message,
          status: error.response?.status,
          data: error.response?.data,
        },
      });
    }
  };

export const getMyCreateCampaignsManagerRequestsList =
  ({ id, type }) =>
  async (dispatch, getState) => {
    dispatch({
      type: GET_MY_CREATE_CAMPAIGNS_MANAGER_REQUESTS_LIST_REQUEST,
      payload: { id, type },
    });
    try {
      const { data } = await axios.post(
        `${campaignV2}/campaignCreationsCampaignManager`,
        { id, type }
      );
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
      });
    }
  };

export const changeCampaignStatusAfterVendorApproval =
  ({ approvedIds, disapprovedIds }) =>
  async (dispatch, getState) => {
    dispatch({
      type: CHANGE_CAMPAIGN_STATUS_AFTER_VENDOR_APPROVAL_REQUEST,
      payload: { approvedIds, disapprovedIds },
    });
    try {
      const { data } = await axios.post(
        `${campaignV2}/approveCampaignScreenVendor`,
        {
          approvedIds,
          disapprovedIds,
        }
      );
      dispatch({
        type: CHANGE_CAMPAIGN_STATUS_AFTER_VENDOR_APPROVAL_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: CHANGE_CAMPAIGN_STATUS_AFTER_VENDOR_APPROVAL_ERROR,
        payload: {
          message: error.message,
          status: error.response?.status,
          data: error.response?.data,
        },
      });
    }
  };

export const changeCampaignDuration = (input) => async (dispatch, getState) => {
  dispatch({
    type: CHANGE_CAMPAIGN_DURATION_REQUEST,
    payload: input,
  });
  try {
    const { data } = await axios.put(`${campaignV2}/update`, input);
    dispatch({
      type: CHANGE_CAMPAIGN_DURATION_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: CHANGE_CAMPAIGN_DURATION_ERROR,
      payload: {
        message: error.message,
        status: error.response?.status,
        data: error.response?.data,
      },
    });
  }
};

export const GetCampaignLogsAction =
  ({ campaignId, date }) =>
  async (dispatch, getState) => {
    dispatch({
      type: CAMPAIGN_LOGS_REQUEST,
      payload: { campaignId, date },
    });
    try {
      const { data } = await axios.get(
        `${analyticsURL}/getCampaignLogsDateWise?campaignId=${campaignId}&date=${date}`
      );
      dispatch({
        type: CAMPAIGN_LOGS_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: CAMPAIGN_LOGS_FAIL,
        payload: {
          message: error.message,
          status: error.response?.status,
          data: error.response?.data,
        },
      });
    }
  };

export const getAllCampaignsDetailsAction =
  (input) => async (dispatch, getState) => {
    dispatch({
      type: GET_ALL_CAMPAIGNS_DATA_REQUEST,
      payload: input,
    });
    try {
      const {
        auth: { userInfo },
      } = getState();

      const { data } = await axios.post(`${campaignV2}/all`, input, {
        headers: { authorization: `Bearer ${userInfo.token}` },
      });
      dispatch({
        type: GET_ALL_CAMPAIGNS_DATA_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: GET_ALL_CAMPAIGNS_DATA_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const campaignLogsByCampaignIdAction =
  (campaignId) => async (dispatch) => {
    dispatch({
      type: GET_CAMPAIGN_LOGS_BY_CAMPAIGN_ID_REQUEST,
      payload: campaignId,
    });
    try {
      const { data } = await axios.get(
        `${analyticsURL}/getAllCampaignLogs?campaignId=${campaignId}`
      );
      dispatch({
        type: GET_CAMPAIGN_LOGS_BY_CAMPAIGN_ID_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: GET_CAMPAIGN_LOGS_BY_CAMPAIGN_ID_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const getCampaignDetailsAction =
  (input) => async (dispatch, getState) => {
    dispatch({
      type: GET_CAMPAIGN_DATA_REQUEST,
      payload: input,
    });
    try {
      const {
        auth: { userInfo },
      } = getState();

      const { data } = await axios.post(
        `${campaignV2}/campaignDetails`,
        input,
        {
          headers: { authorization: `Bearer ${userInfo.token}` },
        }
      );
      dispatch({
        type: GET_CAMPAIGN_DATA_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: GET_CAMPAIGN_DATA_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const getCampaignCreatedScreensDetailsAction =
  ({ screenIds }) =>
  async (dispatch) => {
    dispatch({
      type: GET_CAMPAIGN_CREATION_SCREENS_DATA_REQUEST,
      payload: { screenIds },
    });
    try {
      const { data } = await axios.post(
        `${campaignV2}/campaignCreatedScreensDetails`,
        { screenIds }
      );
      dispatch({
        type: GET_CAMPAIGN_CREATION_SCREENS_DATA_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: GET_CAMPAIGN_CREATION_SCREENS_DATA_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const changeCampaignStatusAction =
  (input) => async (dispatch, getState) => {
    dispatch({
      type: CAMPAIGN_STATUS_CHANGE_REQUEST,
      payload: input,
    });
    try {
      const {
        auth: { userInfo },
      } = getState();

      const { data } = await axios.post(
        `${campaignV2}/changeCampaignStatus`,
        input,
        {
          headers: { authorization: `Bearer ${userInfo.token}` },
        }
      );
      dispatch({
        type: CAMPAIGN_STATUS_CHANGE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: CAMPAIGN_STATUS_CHANGE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const editAllSubCampaignsAction =
  (input) => async (dispatch, getState) => {
    dispatch({
      type: EDIT_ALL_SUB_CAMPAIGNS_REQUEST,
      payload: input,
    });
    try {
      const {
        auth: { userInfo },
      } = getState();

      const { data } = await axios.put(
        `${campaignV2}/updateCampaignCreationAndItsAllSubCampaigns`,
        input,
        { headers: { authorization: `Bearer ${userInfo.token}` } }
      );
      dispatch({
        type: EDIT_ALL_SUB_CAMPAIGNS_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: EDIT_ALL_SUB_CAMPAIGNS_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const editCampaignCreativesEndDateAction =
  (input) => async (dispatch, getState) => {
    dispatch({
      type: EDIT_CAMPAIGN_CREATIVE_END_DATE_REQUEST,
      payload: input,
    });
    try {
      const {
        auth: { userInfo },
      } = getState();

      const { data } = await axios.post(
        `${campaignV2}/changeDateAndCreative`,
        input,
        {
          headers: { authorization: `Bearer ${userInfo.token}` },
        }
      );
      dispatch({
        type: EDIT_CAMPAIGN_CREATIVE_END_DATE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: EDIT_CAMPAIGN_CREATIVE_END_DATE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const cloneCampaignAction = (input) => async (dispatch, getState) => {
  dispatch({
    type: CLONE_CAMPAIGN_REQUEST,
    payload: input,
  });
  try {
    const {
      auth: { userInfo },
    } = getState();

    const { data } = await axios.post(`${campaignV2}/createClone`, input, {
      headers: { authorization: `Bearer ${userInfo.token}` },
    });
    dispatch({
      type: CLONE_CAMPAIGN_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: CLONE_CAMPAIGN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const downloadCampaignSummaryPPTAction =
  (input) => async (dispatch, getState) => {
    dispatch({
      type: DOWNLOAD_CAMPAIGN_SUMMARY_PPT_REQUEST,
      payload: input,
    });
    try {
      const { data } = await axios.post(
        `${campaignV2}/downloadCampaignSummaryPPT`,
        input
      );
      dispatch({
        type: DOWNLOAD_CAMPAIGN_SUMMARY_PPT_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: DOWNLOAD_CAMPAIGN_SUMMARY_PPT_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const getCampaignRequestFinalApprovalDetailsForProohAdmin =
  (input) => async (dispatch, getState) => {
    dispatch({
      type: GET_CAMPAIGN_REQUEST_FINAL_APPROVAL_DETAILS_REQUEST,
      payload: input,
    });
    try {
      const {
        auth: { userInfo },
      } = getState();
      const { data } = await axios.post(
        `${campaignV2}/getCampaignRequestFinalApprovalDetailsForProohAdmin`,
        input,
        { headers: { authorization: `Bearer ${userInfo.token}` } }
      );
      dispatch({
        type: GET_CAMPAIGN_REQUEST_FINAL_APPROVAL_DETAILS_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: GET_CAMPAIGN_REQUEST_FINAL_APPROVAL_DETAILS_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const getMyCreateCampaignsVendorRequestsList =
  (input) => async (dispatch, getState) => {
    dispatch({
      type: GET_MY_CREATE_CAMPAIGNS_VENDOR_REQUESTS_LIST_REQUEST,
      payload: input,
    });
    try {
      const {
        auth: { userInfo },
      } = getState();
      const { data } = await axios.post(
        `${campaignV2}/getCampaignRequestListForScreenVendor`,
        input,
        { headers: { authorization: `Bearer ${userInfo.token}` } }
      );
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
      });
    }
  };

export const approveCampaignFinallyProohAdmin =
  (input) => async (dispatch, getState) => {
    dispatch({
      type: APPROVE_CAMPAIGN_FINALLY_PROOH_ADMIN_REQUEST,
      payload: input,
    });
    try {
      const {
        auth: { userInfo },
      } = getState();
      const { data } = await axios.post(
        `${campaignV2}/approveCampaignFinallyProohAdmin`,
        input,
        { headers: { authorization: `Bearer ${userInfo.token}` } }
      );
      dispatch({
        type: APPROVE_CAMPAIGN_FINALLY_PROOH_ADMIN_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: APPROVE_CAMPAIGN_FINALLY_PROOH_ADMIN_REQUEST,
        payload: {
          message: error.message,
          status: error.response?.status,
          data: error.response?.data,
        },
      });
    }
  };

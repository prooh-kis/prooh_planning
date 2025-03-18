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
  CHANGE_CAMPAIGN_STATUS_AFTER_CREATIVE_UPLOAD_REQUEST,
  CHANGE_CAMPAIGN_STATUS_AFTER_CREATIVE_UPLOAD_SUCCESS,
  CHANGE_CAMPAIGN_STATUS_AFTER_CREATIVE_UPLOAD_ERROR,
  CHANGE_CAMPAIGN_STATUS_AFTER_VENDOR_APPROVAL_REQUEST,
  CHANGE_CAMPAIGN_STATUS_AFTER_VENDOR_APPROVAL_SUCCESS,
  CHANGE_CAMPAIGN_STATUS_AFTER_VENDOR_APPROVAL_ERROR,
  CHANGE_CAMPAIGN_DURATION_SUCCESS,
  CHANGE_CAMPAIGN_DURATION_ERROR,
  CHANGE_CAMPAIGN_DURATION_REQUEST,
  CAMPAIGN_LOGS_REQUEST,
  CAMPAIGN_LOGS_SUCCESS,
  CAMPAIGN_LOGS_FAIL,
  CAMPAIGN_MONITORING_PICS_REQUEST,
  CAMPAIGN_MONITORING_PICS_SUCCESS,
  CAMPAIGN_MONITORING_PICS_FAIL,
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
  GET_CAMPAIGN_CREATION_SCREENS_DATA_RESET,
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
} from "../constants/campaignConstants";
const url = `${process.env.REACT_APP_PROOH_SERVER}/api/v2/campaigns`;
const url2 = `${process.env.REACT_APP_PROOH_SERVER}/api/v1/analytics`;


export const addDetailsToCreateCampaign =
  (input) => async (dispatch, getState) => {
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
        payload: {
          message: error.message,
          status: error.response?.status,
          data: error.response?.data,
        },
      });
    }
  };

export const getMyCreateCampaignsList =
  ({ id, type }) =>
    async (dispatch, getState) => {
      dispatch({
        type: GET_MY_CREATE_CAMPAIGNS_LIST_REQUEST,
        payload: { id, type },
      });
      try {
        const { data } = await axios.post(
          `${url}/campaignCreationsCampaignPlanner`,
          { id, type }
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
          `${url}/campaignCreationsCampaignPlannerForPlan`,
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
          `${url}/campaignCreationsCampaignManager`,
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

export const getMyCreateCampaignsVendorRequestsList =
  ({ id, status }) =>
    async (dispatch, getState) => {
      dispatch({
        type: GET_MY_CREATE_CAMPAIGNS_VENDOR_REQUESTS_LIST_REQUEST,
        payload: { id, status },
      });
      try {
        const { data } = await axios.post(
          `${url}/campaignCreationsScreenVendor`,
          { id, status }
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

export const changeCampaignStatusAfterCreativeUpload =
  ({ id, status }) =>
    async (dispatch, getState) => {
      dispatch({
        type: CHANGE_CAMPAIGN_STATUS_AFTER_CREATIVE_UPLOAD_REQUEST,
        payload: { id, status },
      });
      try {
        const { data } = await axios.post(`${url}/createCampaigns`, {
          id,
          status,
        });
        dispatch({
          type: CHANGE_CAMPAIGN_STATUS_AFTER_CREATIVE_UPLOAD_SUCCESS,
          payload: data,
        });
      } catch (error) {
        dispatch({
          type: CHANGE_CAMPAIGN_STATUS_AFTER_CREATIVE_UPLOAD_ERROR,
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
      const { data } = await axios.post(`${url}/approveCampaignScreenVendor`, {
        approvedIds, disapprovedIds
      });
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
    const { data } = await axios.put(`${url}/update`, input);
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


export const GetCampaignLogsAction = ({ campaignId, date }) => async (dispatch, getState) => {
  dispatch({
    type: CAMPAIGN_LOGS_REQUEST,
    payload: { campaignId, date },
  });
  try {
    const { data } = await axios.get(`${url2}/getCampaignLogsDateWise?campaignId=${campaignId}&date=${date}`);
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


export const GetCampaignMonitoringPicsAction = (input) => async (dispatch, getState) => {
  dispatch({
    type: CAMPAIGN_MONITORING_PICS_REQUEST,
    payload: input,
  });
  try {
    const { data } = await axios.get(`${url}/getCampaignMonitoringData?screenId=${input?.screenId}&campaignId=${input?.campaignId}&date=${input?.date}`);
    dispatch({
      type: CAMPAIGN_MONITORING_PICS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: CAMPAIGN_MONITORING_PICS_FAIL,
      payload: {
        message: error.message,
        status: error.response?.status,
        data: error.response?.data,
      },
    });
  }
};


export const getAllCampaignsDetailsAction = (input) => async (dispatch, getState) => {
  dispatch({
    type: GET_ALL_CAMPAIGNS_DATA_REQUEST,
    payload: input,
  });
  try {

    const {
      auth: { userInfo },
    } = getState();

    const { data } = await axios.post(`${url}/all`, input,
      { headers: { authorization: `Bearer ${userInfo.token}` }, }
    );
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
        `${url2}/getAllCampaignLogs?campaignId=${campaignId}`
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

export const getCampaignDetailsAction = (input) => async (dispatch, getState) => {
  dispatch({
    type: GET_CAMPAIGN_DATA_REQUEST,
    payload: input,
  });
  try {

    const {
      auth: { userInfo },
    } = getState();

    const { data } = await axios.post(`${url}/campaignDetails`, input,
      { headers: { authorization: `Bearer ${userInfo.token}` }, }
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

export const getCampaignCreatedScreensDetailsAction = ({ screenIds }) => async (dispatch) => {
  dispatch({
    type: GET_CAMPAIGN_CREATION_SCREENS_DATA_REQUEST,
    payload: { screenIds },
  });
  try {
    const { data } = await axios.post(
      `${url}/campaignCreatedScreensDetails`,
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

export const changeCampaignStatusAction = (input) => async (dispatch, getState) => {
  dispatch({
    type: CAMPAIGN_STATUS_CHANGE_REQUEST,
    payload: input,
  });
  try {
    const {
      auth: { userInfo },
    } = getState();

    const { data } = await axios.post(
      `${url}/changeCampaignStatus`,
      input,
      { headers: { authorization: `Bearer ${userInfo.token}` }, }
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

export const editAllSubCampaignsAction = (input) => async (dispatch, getState) => {
  dispatch({
    type: EDIT_ALL_SUB_CAMPAIGNS_REQUEST,
    payload: input,
  });
  try {

    const {
      auth: { userInfo },
    } = getState();

    const { data } = await axios.put(
      `${url}/updateCampaignCreationAndItsAllSubCampaigns`,
      input,
      { headers: { authorization: `Bearer ${userInfo.token}` }, }
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
        `${url}/changeDateAndCreative`,
        input,
        { headers: { authorization: `Bearer ${userInfo.token}` }, }
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
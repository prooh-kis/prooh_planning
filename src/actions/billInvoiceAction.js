import axios from "axios";
import {
  CREATE_BILL_INVOICE_FAIL,
  CREATE_BILL_INVOICE_REQUEST,
  CREATE_BILL_INVOICE_SUCCESS,
  GENERATE_PDF_GENERATION_FAIL,
  GENERATE_PDF_GENERATION_REQUEST,
  GENERATE_PDF_GENERATION_SUCCESS,
  GET_BILL_INVOICE_FAIL,
  GET_BILL_INVOICE_REQUEST,
  GET_BILL_INVOICE_SUCCESS,
  PULL_JOB_STATUS_FAIL,
  PULL_JOB_STATUS_REQUEST,
  PULL_JOB_STATUS_SUCCESS,
  TAKE_DASHBOARD_SCREENSHOT_FAIL,
  TAKE_DASHBOARD_SCREENSHOT_REQUEST,
  TAKE_DASHBOARD_SCREENSHOT_SUCCESS
} from "../constants/billInvoiceConstant";


const url = `${process.env.REACT_APP_PROOH_SERVER}/api/v2/billInvoice`;

export const createBillInvoice = (input) => async (dispatch, getState) => {
  dispatch({
    type: CREATE_BILL_INVOICE_REQUEST,
    payload: input,
  });
  try {
    const { data } = await axios.post(`${url}/add`, input);
    dispatch({
      type: CREATE_BILL_INVOICE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: CREATE_BILL_INVOICE_FAIL,
      payload: {
        message: error.message,
        status: error.response?.status,
        data: error.response?.data,
      },
    });
  }
};



export const getBillInvoiceDetails = ({ campaignCreationId, invoiceId }) => async (dispatch, getState) => {
  dispatch({
    type: GET_BILL_INVOICE_REQUEST,
    payload: { campaignCreationId, invoiceId },
  });
  try {
    const { data } = await axios.get(`${url}/details?campaignCreationId=${campaignCreationId}${invoiceId ?? `?invoiceId=${invoiceId}`}`);
    dispatch({
      type: GET_BILL_INVOICE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_BILL_INVOICE_FAIL,
      payload: {
        message: error.message,
        status: error.response?.status,
        data: error.response?.data,
      },
    });
  }
};



export const handleInvoicePdfGenerationAction = (input) => async (dispatch, getState) => {
  dispatch({
    type: GENERATE_PDF_GENERATION_REQUEST,
    payload: input,
  });
  try {
    const { data } = await axios.post(`${url}/generatePDF`, input);
    
    dispatch({
      type: GENERATE_PDF_GENERATION_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GENERATE_PDF_GENERATION_FAIL,
      payload: {
        message: error.message,
        status: error.response?.status,
        data: error.response?.data,
      },
    });
  }
};

export const getBillInvoiceJobStatusAction = (input) => async (dispatch, getState) => {
  dispatch({
    type: PULL_JOB_STATUS_REQUEST,
    payload: input,
  });
  try {
    const { data, status, ...response } = await axios.post(`${url}/invoiceGenerationJobStatus`, input);
    if (status === 404 && response.data.message === "No invoice generation job found with this id") {
      dispatch({
        type: PULL_JOB_STATUS_SUCCESS,
        payload: {...response, status: "completed"},
      });
    } else {
      dispatch({
        type: PULL_JOB_STATUS_SUCCESS,
        payload: data,
      });
    }
  } catch (error) {
    dispatch({
      type: PULL_JOB_STATUS_FAIL,
      payload: {
        message: error.message,
        status: error.response?.status,
        data: error.response?.data,
      },
    });
  }

}



export const takeDashboardScreenShotAction = (input) => async (dispatch, getState) => {
  dispatch({
    type: TAKE_DASHBOARD_SCREENSHOT_REQUEST,
    payload: input,
  });
  try {
    const { data } = await axios.post(
      `${url}/takeDashboardScreenshot`,
      input
    );
    dispatch({
      type: TAKE_DASHBOARD_SCREENSHOT_SUCCESS,
      payload: {
        ...data,
        images: data.images ? [...data.images] : []
      }
    });
  } catch (error) {
    dispatch({
      type: TAKE_DASHBOARD_SCREENSHOT_FAIL,
      payload: {
        message: error.message,
        status: error.response?.status,
        data: error.response?.data,
      },
    });
  }
}

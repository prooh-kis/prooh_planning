import axios from "axios";
import {
  CREATE_BILL_INVOICE_FAIL,
  CREATE_BILL_INVOICE_REQUEST,
  CREATE_BILL_INVOICE_SUCCESS,
  GET_BILL_INVOICE_FAIL,
  GET_BILL_INVOICE_REQUEST,
  GET_BILL_INVOICE_SUCCESS
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



export const getBillInvoiceDetails = ({campaignCreationId}) => async (dispatch, getState) => {
  dispatch({
    type: GET_BILL_INVOICE_REQUEST,
    payload: {campaignCreationId},
  });
  try {
    const { data } = await axios.get(`${url}/details?campaignCreationId=${campaignCreationId}`);
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

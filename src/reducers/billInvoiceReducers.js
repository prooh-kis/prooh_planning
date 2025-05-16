import { CREATE_BILL_INVOICE_FAIL, CREATE_BILL_INVOICE_REQUEST, CREATE_BILL_INVOICE_RESET, CREATE_BILL_INVOICE_SUCCESS, GET_BILL_INVOICE_FAIL, GET_BILL_INVOICE_REQUEST, GET_BILL_INVOICE_RESET, GET_BILL_INVOICE_SUCCESS } from "../constants/billInvoiceConstant";


export function billInvoiceCreationReducer(state = [], action) {
  switch (action.type) {
    case CREATE_BILL_INVOICE_REQUEST:
      return { ...state, loading: true };
    case CREATE_BILL_INVOICE_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        data: {
         ...action.payload
        },
      };
    case CREATE_BILL_INVOICE_FAIL:
      return {
        ...state,
        loading: false,
        success: false,
        error: {...action.payload},
      };
    case CREATE_BILL_INVOICE_RESET:
      return {
        ...state,
        loading: false,
        success: false,
        data: {...state},
      };
    default:
      return state;
  }
}



export function billInvoiceDetailsGetReducer(state = [], action) {
  switch (action.type) {
    case GET_BILL_INVOICE_REQUEST:
      return { loading: true };
    case GET_BILL_INVOICE_SUCCESS:
      return {
        loading: false,
        success: true,
        data: action.payload,
      };
    case GET_BILL_INVOICE_FAIL:
      return {
        loading: false,
        success: false,
        error: action.payload,
      };
    case GET_BILL_INVOICE_RESET:
      return {
        loading: false,
        success: false,
        data: state,
      };
    default:
      return state;
  }
}

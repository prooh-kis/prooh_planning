import { CREATE_BILL_INVOICE_FAIL, CREATE_BILL_INVOICE_REQUEST, CREATE_BILL_INVOICE_RESET, CREATE_BILL_INVOICE_SUCCESS, GENERATE_BILL_INVOICE_PDF_GENERATION_FAIL, GENERATE_BILL_INVOICE_PDF_GENERATION_REQUEST, GENERATE_BILL_INVOICE_PDF_GENERATION_RESET, GENERATE_BILL_INVOICE_PDF_GENERATION_SUCCESS, GET_BILL_INVOICE_FAIL, GET_BILL_INVOICE_REQUEST, GET_BILL_INVOICE_RESET, GET_BILL_INVOICE_SUCCESS, PULL_JOB_STATUS_FAIL, PULL_JOB_STATUS_REQUEST, PULL_JOB_STATUS_RESET, PULL_JOB_STATUS_SUCCESS, TAKE_DASHBOARD_SCREENSHOT_FAIL, TAKE_DASHBOARD_SCREENSHOT_REQUEST, TAKE_DASHBOARD_SCREENSHOT_RESET, TAKE_DASHBOARD_SCREENSHOT_SUCCESS } from "../constants/billInvoiceConstant";


export function billInvoiceCreationReducer(state = {}, action) {
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
        data: [],
      };
    default:
      return state;
  }
}


export function handleInvoicePdfGenerationReducer(state = {}, action) {
  switch (action.type) {
    case GENERATE_BILL_INVOICE_PDF_GENERATION_REQUEST:
      return { loading: true };
    case GENERATE_BILL_INVOICE_PDF_GENERATION_SUCCESS:
      return {
        loading: false,
        success: true,
        data: action.payload,
      };
    case GENERATE_BILL_INVOICE_PDF_GENERATION_FAIL:
      return {
        loading: false,
        success: false,
        error: action.payload,
      };
    case GENERATE_BILL_INVOICE_PDF_GENERATION_RESET:
      return {
        loading: false,
        success: false,
        data: state,
      };
    default:
      return state;
  }
}

export function takeDashboardScreenShotReducer(state = { data: null, loading: false, error: null }, action) {
  switch (action.type) {
    case TAKE_DASHBOARD_SCREENSHOT_REQUEST:
      return { 
        ...state,
        loading: true,
        error: null
      };
      
    case TAKE_DASHBOARD_SCREENSHOT_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,  // Make sure payload is a new object/array
        error: null
      };
      
    case TAKE_DASHBOARD_SCREENSHOT_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload ? { ...action.payload } : { message: 'Unknown error' }
      };
    case TAKE_DASHBOARD_SCREENSHOT_RESET:
      return {
        ...state,
        loading: false,
        error: null,
        data: null
      };
    default:
      return state;
  }
}

export function getQueueJobStatusReducer(state = [], action) {
  switch (action.type) {
    case PULL_JOB_STATUS_REQUEST:
      return { loading: true };
    case PULL_JOB_STATUS_SUCCESS:
      return {
        loading: false,
        success: true,
        data: action.payload,
      }
    case PULL_JOB_STATUS_FAIL:
      return {
        loading: false,
        success: false,
        error: action.payload,
      };
    case PULL_JOB_STATUS_RESET:
      return {
        loading: false,
        success: false,
        data: state,
      };
    default:
      return state;
  }
}

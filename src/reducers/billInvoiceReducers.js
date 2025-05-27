import { CREATE_BILL_INVOICE_FAIL, CREATE_BILL_INVOICE_REQUEST, CREATE_BILL_INVOICE_RESET, CREATE_BILL_INVOICE_SUCCESS, GENERATE_PDF_GENERATION_FAIL, GENERATE_PDF_GENERATION_REQUEST, GENERATE_PDF_GENERATION_RESET, GENERATE_PDF_GENERATION_SUCCESS, GET_BILL_INVOICE_FAIL, GET_BILL_INVOICE_REQUEST, GET_BILL_INVOICE_RESET, GET_BILL_INVOICE_SUCCESS, PULL_JOB_STATUS_FAIL, PULL_JOB_STATUS_REQUEST, PULL_JOB_STATUS_RESET, PULL_JOB_STATUS_SUCCESS, TAKE_DASHBOARD_SCREENSHOT_FAIL, TAKE_DASHBOARD_SCREENSHOT_REQUEST, TAKE_DASHBOARD_SCREENSHOT_SUCCESS } from "../constants/billInvoiceConstant";


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
        data: state,
      };
    default:
      return state;
  }
}


export function handleInvoicePdfGenerationReducer(state = {}, action) {
  switch (action.type) {
    case GENERATE_PDF_GENERATION_REQUEST:
      return { loading: true };
    case GENERATE_PDF_GENERATION_SUCCESS:
      return {
        loading: false,
        success: true,
        data: action.payload,
      };
    case GENERATE_PDF_GENERATION_FAIL:
      return {
        loading: false,
        success: false,
        error: action.payload,
      };
    case GENERATE_PDF_GENERATION_RESET:
      return {
        loading: false,
        success: false,
        data: state,
      };
    default:
      return state;
  }
}



export function getBillInvoiceJobStatusReducer(state = [], action) {
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



export function takeDashboardScreenShotReducer(state = {}, action) {
  switch (action.type) {
    case TAKE_DASHBOARD_SCREENSHOT_REQUEST:
      return { 
        ...state,  // Preserve existing state
        loading: true 
      };
      
    case TAKE_DASHBOARD_SCREENSHOT_SUCCESS:
      return {
        ...state,  // Preserve existing state
        loading: false,
        data: {
          ...action.payload,  // Create new object for payload
          // If images is an array, ensure it's a new array
          images: action.payload.images ? [...action.payload.images] : []
        }
      };
      
    case TAKE_DASHBOARD_SCREENSHOT_FAIL:
      return {
        ...state,  // Preserve existing state
        loading: false,
        error: {
          ...action.payload  // Create new error object
        }
      };
      
    default:
      return state;
  }
}
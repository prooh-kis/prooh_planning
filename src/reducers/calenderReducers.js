import {
  GET_ALL_CATEGORY_LIST_ERROR,
  GET_ALL_CATEGORY_LIST_REQUEST,
  GET_ALL_CATEGORY_LIST_SUCCESS,
  GET_CALENDER_LIST_DATA_ERROR,
  GET_CALENDER_LIST_DATA_REQUEST,
  GET_CALENDER_LIST_DATA_SUCCESS,
} from "../constants/calenderConstant";

export function getIndustryCategoryReducer(state = [], action) {
  switch (action.type) {
    case GET_ALL_CATEGORY_LIST_REQUEST:
      return { loading: true };
    case GET_ALL_CATEGORY_LIST_SUCCESS:
      return {
        loading: false,
        success: true,
        data: action.payload,
      };
    case GET_ALL_CATEGORY_LIST_ERROR:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
}

export function getCalendarListDataReducer(state = [], action) {
  switch (action.type) {
    case GET_CALENDER_LIST_DATA_REQUEST:
      return { loading: true };
    case GET_CALENDER_LIST_DATA_SUCCESS:
      return {
        loading: false,
        success: true,
        data: action.payload,
      };
    case GET_CALENDER_LIST_DATA_ERROR:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
}

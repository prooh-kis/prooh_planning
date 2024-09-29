import { GET_SCREEN_DATA_BY_AUDIENCES_ERROR, GET_SCREEN_DATA_BY_AUDIENCES_REQUEST, GET_SCREEN_DATA_BY_AUDIENCES_SUCCESS } from "../constants/screenConstants";

export function allScreenDataByAudiencesGetReducer(state = [], action) {
  switch (action.type) {
    case GET_SCREEN_DATA_BY_AUDIENCES_REQUEST:
      return { loading: true };
    case GET_SCREEN_DATA_BY_AUDIENCES_SUCCESS:
      return {
        loading: false,
        data: action.payload,
      };
    case GET_SCREEN_DATA_BY_AUDIENCES_ERROR:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
}
import {
  SAVE_CONTACT_DETAILS_ERROR,
  SAVE_CONTACT_DETAILS_REQUEST,
  SAVE_CONTACT_DETAILS_RESET,
  SAVE_CONTACT_DETAILS_SUCCESS,
} from "../constants/LandingPageConstants";

export function saveContactDetailsForQueryReducer(state = [], action) {
  switch (action.type) {
    case SAVE_CONTACT_DETAILS_REQUEST:
      return { loading: true };
    case SAVE_CONTACT_DETAILS_SUCCESS:
      return {
        loading: false,
        success: true,
        data: action.payload,
      };
    case SAVE_CONTACT_DETAILS_ERROR:
      return {
        loading: false,
        success: false,
        error: action.payload,
      };
    case SAVE_CONTACT_DETAILS_RESET:
      return {
        loading: false,
        success: false,
        data: state,
      };
    default:
      return state;
  }
}

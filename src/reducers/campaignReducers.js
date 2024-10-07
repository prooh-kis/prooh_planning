import {
  ADD_DETAILS_TO_CREATE_CAMPAIGN_ERROR,
  ADD_DETAILS_TO_CREATE_CAMPAIGN_REQUEST,
  ADD_DETAILS_TO_CREATE_CAMPAIGN_SUCCESS
} from "../constants/campaignConstants";

export function detailsToCreateCampaignAddReducer(state = [], action) {
  switch (action.type) {
    case ADD_DETAILS_TO_CREATE_CAMPAIGN_REQUEST:
      return { loading: true };
    case ADD_DETAILS_TO_CREATE_CAMPAIGN_SUCCESS:
      return {
        loading: false,
        success: true,
        data: action.payload,
      };
    case ADD_DETAILS_TO_CREATE_CAMPAIGN_ERROR:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
}

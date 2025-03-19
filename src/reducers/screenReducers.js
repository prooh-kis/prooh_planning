import {
  getDataFromLocalStorage,
  saveDataOnLocalStorage,
} from "../utils/localStorageUtils";
import {
  GET_AUDIENCES_DATA_ADVANCE_FILTER_ERROR,
  GET_AUDIENCES_DATA_ADVANCE_FILTER_REQUEST,
  GET_AUDIENCES_DATA_ADVANCE_FILTER_SUCCESS,
  GET_CAMPAIGN_DASHBOARD_DATA_ERROR,
  GET_CAMPAIGN_DASHBOARD_DATA_REQUEST,
  GET_CAMPAIGN_DASHBOARD_DATA_SUCCESS,
  GET_FINAL_PLAN_PO_DATA_ERROR,
  GET_FINAL_PLAN_PO_DATA_REQUEST,
  GET_FINAL_PLAN_PO_DATA_SUCCESS,
  GET_LANDING_PAGE_DATA_ERROR,
  GET_LANDING_PAGE_DATA_REQUEST,
  GET_LANDING_PAGE_DATA_SUCCESS,
  GET_SCREEN_DATA_BY_AUDIENCES_ERROR,
  GET_SCREEN_DATA_BY_AUDIENCES_REQUEST,
  GET_SCREEN_DATA_BY_AUDIENCES_SUCCESS,
  GET_SCREEN_DATA_CITY_WISE_FOR_UPLOAD_CREATIVES_ERROR,
  GET_SCREEN_DATA_CITY_WISE_FOR_UPLOAD_CREATIVES_REQUEST,
  GET_SCREEN_DATA_CITY_WISE_FOR_UPLOAD_CREATIVES_RESET,
  GET_SCREEN_DATA_CITY_WISE_FOR_UPLOAD_CREATIVES_SUCCESS,
  GET_SCREEN_SUMMARY_DATA_ERROR,
  GET_SCREEN_SUMMARY_DATA_I_KNOW_IT_ALL_ERROR,
  GET_SCREEN_SUMMARY_DATA_I_KNOW_IT_ALL_REQUEST,
  GET_SCREEN_SUMMARY_DATA_I_KNOW_IT_ALL_SUCCESS,
  GET_SCREEN_SUMMARY_DATA_REQUEST,
  GET_SCREEN_SUMMARY_DATA_SUCCESS,
  GET_SCREEN_SUMMARY_PLAN_TABLE_DATA_ERROR,
  GET_SCREEN_SUMMARY_PLAN_TABLE_DATA_REQUEST,
  GET_SCREEN_SUMMARY_PLAN_TABLE_DATA_RESET,
  GET_SCREEN_SUMMARY_PLAN_TABLE_DATA_SUCCESS,
  GET_SCREENS_COST_DATA_ERROR,
  GET_SCREENS_COST_DATA_REQUEST,
  GET_SCREENS_COST_DATA_SUCCESS,
  GET_SCREENS_DATA_ADVANCE_FILTER_ERROR,
  GET_SCREENS_DATA_ADVANCE_FILTER_REQUEST,
  GET_SCREENS_DATA_ADVANCE_FILTER_SUCCESS,
  GET_SCREENS_PRICE_FOR_REGULAR_COHORT_ERROR,
  GET_SCREENS_PRICE_FOR_REGULAR_COHORT_REQUEST,
  GET_SCREENS_PRICE_FOR_REGULAR_COHORT_SUCCESS,
  GET_TABLE_DATA_FOR_SELECT_TOPICAL_DATA_ERROR,
  GET_TABLE_DATA_FOR_SELECT_TOPICAL_DATA_REQUEST,
  GET_TABLE_DATA_FOR_SELECT_TOPICAL_DATA_SUCCESS,
  GET_TABLE_DATA_FOR_SELECT_TRIGGER_ERROR,
  GET_TABLE_DATA_FOR_SELECT_TRIGGER_REQUEST,
  GET_TABLE_DATA_FOR_SELECT_TRIGGER_SUCCESS,
  GET_TABLE_DATA_SCREEN_WISE_AD_PLAY_ERROR,
  GET_TABLE_DATA_SCREEN_WISE_AD_PLAY_REQUEST,
  GET_TABLE_DATA_SCREEN_WISE_AD_PLAY_SUCCESS,
  GET_VENDOR_CONFIRMATION_DETAILS_ERROR,
  GET_VENDOR_CONFIRMATION_DETAILS_REQUEST,
  GET_VENDOR_CONFIRMATION_DETAILS_SUCCESS,
  GET_VENDOR_CONFIRMATION_STATUS_TABLE_DETAILS_ERROR,
  GET_VENDOR_CONFIRMATION_STATUS_TABLE_DETAILS_REQUEST,
  GET_VENDOR_CONFIRMATION_STATUS_TABLE_DETAILS_SUCCESS,
  PLANNING_PAGE_FOOTER_DATA_ERROR,
  PLANNING_PAGE_FOOTER_DATA_REQUEST,
  PLANNING_PAGE_FOOTER_DATA_SUCCESS,
  TABLE_DATA_SET_AD_PLAY_TIME_ERROR,
  TABLE_DATA_SET_AD_PLAY_TIME_REQUEST,
  TABLE_DATA_SET_AD_PLAY_TIME_SUCCESS,
} from "../constants/screenConstants";
import {
  ADVANCE_FILTER_SCREENS_MAP_DATA,
  AUDIENCE_DATA,
  COST_SUMMARY,
  FOOTER_DATA,
  LANDING_PAGE_DATA,
  REGULAR_VS_COHORT_PRICE_DATA,
  SCREEN_SUMMARY_DATA,
  SCREEN_SUMMARY_TABLE_DATA,
  TOTAL_SCREEN_COST_DATA,
} from "../constants/localStorageConstants";

export function landingPageDataGetReducer(state = {}, action) {
  switch (action.type) {
    case GET_LANDING_PAGE_DATA_REQUEST:
      return { loading: true };
    case GET_LANDING_PAGE_DATA_SUCCESS:
      saveDataOnLocalStorage(LANDING_PAGE_DATA, action.payload);
      return {
        loading: false,
        data: action.payload,
      };
    case GET_LANDING_PAGE_DATA_ERROR:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
}

export function screensAudiencesDataGetReducer(state = [], action) {
  switch (action.type) {
    case GET_SCREEN_DATA_BY_AUDIENCES_REQUEST:
      return { loading: true };
    case GET_SCREEN_DATA_BY_AUDIENCES_SUCCESS:
      const campaign = action.payload;
      const saveData = {};
      saveData[campaign.id] = campaign;
      saveDataOnLocalStorage(AUDIENCE_DATA, saveData);
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

export function screensCostDataGetReducer(state = [], action) {
  switch (action.type) {
    case GET_SCREENS_COST_DATA_REQUEST:
      return { loading: true };
    case GET_SCREENS_COST_DATA_SUCCESS:
      const campaignId = action.payload.id;

      saveDataOnLocalStorage(TOTAL_SCREEN_COST_DATA, {
        [campaignId]: action.payload,
      });
      const old = getDataFromLocalStorage(COST_SUMMARY)?.[campaignId] || [];
      const cost = action.payload;
      const newCost = [cost, ...old];
      saveDataOnLocalStorage(COST_SUMMARY, { [campaignId]: newCost });
      return {
        loading: false,
        data: action.payload,
      };
    case GET_SCREENS_COST_DATA_ERROR:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
}

export function screensDataAdvanceFilterGetReducer(state = [], action) {
  switch (action.type) {
    case GET_SCREENS_DATA_ADVANCE_FILTER_REQUEST:
      return { loading: true };
    case GET_SCREENS_DATA_ADVANCE_FILTER_SUCCESS:
      const campaign = action.payload;
      const saveData = {};
      saveData[campaign.id] = campaign;
      saveDataOnLocalStorage(ADVANCE_FILTER_SCREENS_MAP_DATA, saveData);
      return {
        loading: false,
        data: action.payload,
      };
    case GET_SCREENS_DATA_ADVANCE_FILTER_ERROR:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
}

export function poiBasedAudienceDataAdvanceFilterGetReducer(
  state = [],
  action
) {
  switch (action.type) {
    case GET_AUDIENCES_DATA_ADVANCE_FILTER_REQUEST:
      return { loading: true };
    case GET_AUDIENCES_DATA_ADVANCE_FILTER_SUCCESS:
      const { id, ...data } = action.payload;
      // const saveData = {};
      // saveData[campaign.id] = campaign;
      // saveDataOnLocalStorage(ADVANCE_FILTER_SCREENS_MAP_DATA, saveData);

      return {
        loading: false,
        data: data,
      };
    case GET_AUDIENCES_DATA_ADVANCE_FILTER_ERROR:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
}

export function regularVsCohortPriceDataGetReducer(state = [], action) {
  switch (action.type) {
    case GET_SCREENS_PRICE_FOR_REGULAR_COHORT_REQUEST:
      return { loading: true };
    case GET_SCREENS_PRICE_FOR_REGULAR_COHORT_SUCCESS:
      const campaign = action.payload;
      const saveData = {};
      saveData[campaign.id] = campaign;
      saveDataOnLocalStorage(REGULAR_VS_COHORT_PRICE_DATA, saveData);
      return {
        loading: false,
        data: action.payload,
      };
    case GET_SCREENS_PRICE_FOR_REGULAR_COHORT_ERROR:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
}

export function screenSummaryDataGetReducer(state = {}, action) {
  switch (action.type) {
    case GET_SCREEN_SUMMARY_DATA_REQUEST:
      return { loading: true };
    case GET_SCREEN_SUMMARY_DATA_SUCCESS:
      const { id, ...campaign } = action.payload;
      const saveData = {};
      saveData[id] = campaign;
      saveDataOnLocalStorage(SCREEN_SUMMARY_DATA, saveData);
      return {
        loading: false,
        data: campaign,
      };
    case GET_SCREEN_SUMMARY_DATA_ERROR:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
}

export function screenSummaryDataIKnowItAllGetReducer(state = {}, action) {
  switch (action.type) {
    case GET_SCREEN_SUMMARY_DATA_I_KNOW_IT_ALL_REQUEST:
      return { loading: true };
    case GET_SCREEN_SUMMARY_DATA_I_KNOW_IT_ALL_SUCCESS:
      const { id, ...campaign } = action.payload;
      const saveData = {};
      saveData[id] = campaign;
      saveDataOnLocalStorage(SCREEN_SUMMARY_DATA, saveData);
      return {
        loading: false,
        data: campaign,
      };
    case GET_SCREEN_SUMMARY_DATA_I_KNOW_IT_ALL_ERROR:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
}

export function screenSummaryPlanTableDataGetReducer(state = [], action) {
  switch (action.type) {
    case GET_SCREEN_SUMMARY_PLAN_TABLE_DATA_REQUEST:
      return { loading: true };
    case GET_SCREEN_SUMMARY_PLAN_TABLE_DATA_SUCCESS:
      const { id, ...campaign } = action.payload;
      const saveData = {};
      saveData[id] = campaign;
      saveDataOnLocalStorage(SCREEN_SUMMARY_TABLE_DATA, saveData);

      return {
        loading: false,
        data: campaign,
      };
    case GET_SCREEN_SUMMARY_PLAN_TABLE_DATA_ERROR:
      return {
        loading: false,
        error: action.payload,
      };
    case GET_SCREEN_SUMMARY_PLAN_TABLE_DATA_RESET:
      return {
        loading: false,
        error: {},
      };
    default:
      return state;
  }
}

export function finalPlanPOTableDataGetReducer(state = [], action) {
  switch (action.type) {
    case GET_FINAL_PLAN_PO_DATA_REQUEST:
      return { loading: true };
    case GET_FINAL_PLAN_PO_DATA_SUCCESS:
      // saveDataOnLocalStorage(AUDIENCE_DATA, action.payload);

      return {
        loading: false,
        data: action.payload,
      };
    case GET_FINAL_PLAN_PO_DATA_ERROR:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
}

export function screenDataUploadCreativeReducer(state = {}, action) {
  switch (action.type) {
    case GET_SCREEN_DATA_CITY_WISE_FOR_UPLOAD_CREATIVES_REQUEST:
      return { loading: true };
    case GET_SCREEN_DATA_CITY_WISE_FOR_UPLOAD_CREATIVES_SUCCESS:
      const { id, ...campaign } = action.payload;
      return {
        loading: false,
        data: campaign,
      };
    case GET_SCREEN_DATA_CITY_WISE_FOR_UPLOAD_CREATIVES_ERROR:
      return {
        loading: false,
        error: action.payload,
      };
    case GET_SCREEN_DATA_CITY_WISE_FOR_UPLOAD_CREATIVES_RESET:
      return {};
    default:
      return state;
  }
}

export function vendorConfirmationDetailsGetReducer(state = {}, action) {
  switch (action.type) {
    case GET_VENDOR_CONFIRMATION_DETAILS_REQUEST:
      return { loading: true };
    case GET_VENDOR_CONFIRMATION_DETAILS_SUCCESS:
      return {
        loading: false,
        data: action.payload,
      };
    case GET_VENDOR_CONFIRMATION_DETAILS_ERROR:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
}

export function vendorConfirmationStatusTableDetailsGetReducer(
  state = {},
  action
) {
  switch (action.type) {
    case GET_VENDOR_CONFIRMATION_STATUS_TABLE_DETAILS_REQUEST:
      return { loading: true };
    case GET_VENDOR_CONFIRMATION_STATUS_TABLE_DETAILS_SUCCESS:
      return {
        loading: false,
        data: action.payload,
      };
    case GET_VENDOR_CONFIRMATION_STATUS_TABLE_DETAILS_ERROR:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
}

export function campaignDashboardDataGetReducer(state = {}, action) {
  switch (action.type) {
    case GET_CAMPAIGN_DASHBOARD_DATA_REQUEST:
      return { loading: true };
    case GET_CAMPAIGN_DASHBOARD_DATA_SUCCESS:
      return {
        loading: false,
        data: action.payload,
      };
    case GET_CAMPAIGN_DASHBOARD_DATA_ERROR:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
}

export function tableDataForSelectTopicalDayPageGetReducer(state = {}, action) {
  switch (action.type) {
    case GET_TABLE_DATA_FOR_SELECT_TOPICAL_DATA_REQUEST:
      return { loading: true };
    case GET_TABLE_DATA_FOR_SELECT_TOPICAL_DATA_SUCCESS:
      return {
        loading: false,
        data: action.payload,
      };
    case GET_TABLE_DATA_FOR_SELECT_TOPICAL_DATA_ERROR:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
}

export function planningPageFooterDataGetReducer(state = {}, action) {
  switch (action.type) {
    case PLANNING_PAGE_FOOTER_DATA_REQUEST:
      return { loading: true };
    case PLANNING_PAGE_FOOTER_DATA_SUCCESS:
      const { id, ...finalSummaryStepWise } = action.payload;
      const saveData = {};
      saveData[id] = finalSummaryStepWise;
      saveDataOnLocalStorage(FOOTER_DATA, finalSummaryStepWise);
      return {
        loading: false,
        data: action.payload,
      };
    case PLANNING_PAGE_FOOTER_DATA_ERROR:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
}

export function tableDataScreenWiseAdPlayTimeGetReducer(state = {}, action) {
  switch (action.type) {
    case GET_TABLE_DATA_SCREEN_WISE_AD_PLAY_REQUEST:
      return { loading: true };
    case GET_TABLE_DATA_SCREEN_WISE_AD_PLAY_SUCCESS:
      return {
        loading: false,
        data: action.payload,
      };
    case GET_TABLE_DATA_SCREEN_WISE_AD_PLAY_ERROR:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
}

export function tableDataForSelectTriggerPageGetReducer(state = {}, action) {
  switch (action.type) {
    case GET_TABLE_DATA_FOR_SELECT_TRIGGER_REQUEST:
      return { loading: true };
    case GET_TABLE_DATA_FOR_SELECT_TRIGGER_SUCCESS:
      return {
        loading: false,
        data: action.payload,
      };
    case GET_TABLE_DATA_FOR_SELECT_TRIGGER_ERROR:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
}

export function tableDataSetAdPlayTimeReducer(state = {}, action) {
  switch (action.type) {
    case TABLE_DATA_SET_AD_PLAY_TIME_REQUEST:
      return { loading: true };
    case TABLE_DATA_SET_AD_PLAY_TIME_SUCCESS:
      return {
        loading: false,
        data: action.payload,
      };
    case TABLE_DATA_SET_AD_PLAY_TIME_ERROR:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
}

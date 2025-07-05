import {
  getDataFromLocalStorage,
  saveDataOnLocalStorage,
} from "../utils/localStorageUtils";
import {
  EDIT_COST_DETAILS_SCREEN_WISE_FOR_COST_SUMMARY_ERROR,
  EDIT_COST_DETAILS_SCREEN_WISE_FOR_COST_SUMMARY_REQUEST,
  EDIT_COST_DETAILS_SCREEN_WISE_FOR_COST_SUMMARY_RESET,
  EDIT_COST_DETAILS_SCREEN_WISE_FOR_COST_SUMMARY_SUCCESS,
  GET_ALL_FILTERS_DETAILS_FOR_UPLOAD_CREATIVE_PAGE_ERROR,
  GET_ALL_FILTERS_DETAILS_FOR_UPLOAD_CREATIVE_PAGE_REQUEST,
  GET_ALL_FILTERS_DETAILS_FOR_UPLOAD_CREATIVE_PAGE_SUCCESS,
  GET_ALL_PLANNER_IDS_AND_EMAIL_ERROR,
  GET_ALL_PLANNER_IDS_AND_EMAIL_REQUEST,
  GET_ALL_PLANNER_IDS_AND_EMAIL_SUCCESS,
  GET_AUDIENCES_DATA_ADVANCE_FILTER_ERROR,
  GET_AUDIENCES_DATA_ADVANCE_FILTER_REQUEST,
  GET_AUDIENCES_DATA_ADVANCE_FILTER_SUCCESS,
  GET_BASIC_DETAILS_COST_SUMMARY_ERROR,
  GET_BASIC_DETAILS_COST_SUMMARY_REQUEST,
  GET_BASIC_DETAILS_COST_SUMMARY_SUCCESS,
  GET_CAMPAIGN_DASHBOARD_DATA_ERROR,
  GET_CAMPAIGN_DASHBOARD_DATA_REQUEST,
  GET_CAMPAIGN_DASHBOARD_DATA_RESET,
  GET_CAMPAIGN_DASHBOARD_DATA_SUCCESS,
  GET_CLIENT_COST_FOR_COST_SUMMARY_ERROR,
  GET_CLIENT_COST_FOR_COST_SUMMARY_REQUEST,
  GET_CLIENT_COST_FOR_COST_SUMMARY_SUCCESS,
  GET_CREATIVES_FROM_CREATIVE_BUCKET_FOR_UPLOAD_ERROR,
  GET_CREATIVES_FROM_CREATIVE_BUCKET_FOR_UPLOAD_REQUEST,
  GET_CREATIVES_FROM_CREATIVE_BUCKET_FOR_UPLOAD_SUCCESS,
  GET_FINAL_PLAN_PO_DATA_ERROR,
  GET_FINAL_PLAN_PO_DATA_REQUEST,
  GET_FINAL_PLAN_PO_DATA_SUCCESS,
  GET_GROSS_MARGIN_FOR_COST_SUMMARY_ERROR,
  GET_GROSS_MARGIN_FOR_COST_SUMMARY_REQUEST,
  GET_GROSS_MARGIN_FOR_COST_SUMMARY_SUCCESS,
  GET_INVENTORY_DETAILS_FOR_COST_SUMMARY_ERROR,
  GET_INVENTORY_DETAILS_FOR_COST_SUMMARY_REQUEST,
  GET_INVENTORY_DETAILS_FOR_COST_SUMMARY_SUCCESS,
  GET_LOCATION_WISE_FILTERS_SCREEN_DATA_BY_AUDIENCES_ERROR,
  GET_LOCATION_WISE_FILTERS_SCREEN_DATA_BY_AUDIENCES_REQUEST,
  GET_LOCATION_WISE_FILTERS_SCREEN_DATA_BY_AUDIENCES_SUCCESS,
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
  GET_VENDOR_PAYOUT_FOR_COST_SUMMARY_ERROR,
  GET_VENDOR_PAYOUT_FOR_COST_SUMMARY_REQUEST,
  GET_VENDOR_PAYOUT_FOR_COST_SUMMARY_SUCCESS,
  PLANNING_PAGE_FOOTER_DATA_ERROR,
  PLANNING_PAGE_FOOTER_DATA_REQUEST,
  PLANNING_PAGE_FOOTER_DATA_SUCCESS,
  SEND_BUDGET_APPROVAL_TO_VENDOR_COST_SUMMARY_ERROR,
  SEND_BUDGET_APPROVAL_TO_VENDOR_COST_SUMMARY_REQUEST,
  SEND_BUDGET_APPROVAL_TO_VENDOR_COST_SUMMARY_RESET,
  SEND_BUDGET_APPROVAL_TO_VENDOR_COST_SUMMARY_SUCCESS,
  SEND_BUDGET_APPROVAL_TO_VENDOR_CREATIVE_APPROVAL_ERROR,
  SEND_BUDGET_APPROVAL_TO_VENDOR_CREATIVE_APPROVAL_REQUEST,
  SEND_BUDGET_APPROVAL_TO_VENDOR_CREATIVE_APPROVAL_RESET,
  SEND_BUDGET_APPROVAL_TO_VENDOR_CREATIVE_APPROVAL_SUCCESS,
  TABLE_DATA_SET_AD_PLAY_TIME_ERROR,
  TABLE_DATA_SET_AD_PLAY_TIME_REQUEST,
  TABLE_DATA_SET_AD_PLAY_TIME_SUCCESS,
} from "../constants/screenConstants";
import {
  ADVANCE_FILTER_SCREENS_MAP_DATA,
  AUDIENCE_DATA,
  COST_SUMMARY,
  FOOTER_DATA,
  REGULAR_VS_COHORT_PRICE_DATA,
  SCREEN_SUMMARY_DATA,
  SCREEN_SUMMARY_TABLE_DATA,
  TOTAL_SCREEN_COST_DATA,
} from "../constants/localStorageConstants";

export function getLocationWiseFiltersForScreensAudiencesDataGetReducer(state = [], action) {
  switch (action.type) {
    case GET_LOCATION_WISE_FILTERS_SCREEN_DATA_BY_AUDIENCES_REQUEST:
      return { loading: true };
    case GET_LOCATION_WISE_FILTERS_SCREEN_DATA_BY_AUDIENCES_SUCCESS:
      const campaign = action.payload;
      const saveData = {};
      saveData[campaign.id] = campaign;
      // saveDataOnLocalStorage(AUDIENCE_DATA, saveData);
      return {
        loading: false,
        data: action.payload,
      };
    case GET_LOCATION_WISE_FILTERS_SCREEN_DATA_BY_AUDIENCES_ERROR:
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
      // saveDataOnLocalStorage(AUDIENCE_DATA, saveData);
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

      // saveDataOnLocalStorage(TOTAL_SCREEN_COST_DATA, {
      //   [campaignId]: action.payload,
      // });
      const old = getDataFromLocalStorage(COST_SUMMARY)?.[campaignId] || [];
      const cost = action.payload;
      const newCost = [cost, ...old];
      // saveDataOnLocalStorage(COST_SUMMARY, { [campaignId]: newCost });
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
      // saveDataOnLocalStorage(ADVANCE_FILTER_SCREENS_MAP_DATA, saveData);
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
      // saveDataOnLocalStorage(REGULAR_VS_COHORT_PRICE_DATA, saveData);
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
      // saveDataOnLocalStorage(SCREEN_SUMMARY_DATA, saveData);
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
      // saveDataOnLocalStorage(SCREEN_SUMMARY_DATA, saveData);
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
      // saveDataOnLocalStorage(SCREEN_SUMMARY_TABLE_DATA, saveData);

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

export function screenDataUploadCreativeReducer(state = [], action) {
  switch (action.type) {
    case GET_SCREEN_DATA_CITY_WISE_FOR_UPLOAD_CREATIVES_REQUEST:
      return { loading: true };
    case GET_SCREEN_DATA_CITY_WISE_FOR_UPLOAD_CREATIVES_SUCCESS:
      return {
        loading: false,
        data: action.payload,
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
    case GET_CAMPAIGN_DASHBOARD_DATA_RESET:
      return {};
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
      // saveDataOnLocalStorage(FOOTER_DATA, finalSummaryStepWise);
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

export function getAllFiltersDetailsForUploadCreativePageReducer(
  state = [],
  action
) {
  switch (action.type) {
    case GET_ALL_FILTERS_DETAILS_FOR_UPLOAD_CREATIVE_PAGE_REQUEST:
      return { loading: true };
    case GET_ALL_FILTERS_DETAILS_FOR_UPLOAD_CREATIVE_PAGE_SUCCESS:
      return {
        loading: false,
        data: action.payload,
        success: true,
      };
    case GET_ALL_FILTERS_DETAILS_FOR_UPLOAD_CREATIVE_PAGE_ERROR:
      return {
        loading: false,
        success: false,
        error: action.payload,
      };
    default:
      return state;
  }
}

export function getCreativesFromCreativeBucketForUploadPageReducer(
  state = [],
  action
) {
  switch (action.type) {
    case GET_CREATIVES_FROM_CREATIVE_BUCKET_FOR_UPLOAD_REQUEST:
      return { loading: true };
    case GET_CREATIVES_FROM_CREATIVE_BUCKET_FOR_UPLOAD_SUCCESS:
      return {
        loading: false,
        data: action.payload,
        success: true,
      };
    case GET_CREATIVES_FROM_CREATIVE_BUCKET_FOR_UPLOAD_ERROR:
      return {
        loading: false,
        success: false,
        error: action.payload,
      };
    default:
      return state;
  }
}
export function getAllPlannerIdsAndEmailReducer(state = [], action) {
  switch (action.type) {
    case GET_ALL_PLANNER_IDS_AND_EMAIL_REQUEST:
      return { loading: true };
    case GET_ALL_PLANNER_IDS_AND_EMAIL_SUCCESS:
      return {
        loading: false,
        data: action.payload,
        success: true,
      };
    case GET_ALL_PLANNER_IDS_AND_EMAIL_ERROR:
      return {
        loading: false,
        success: false,
        error: action.payload,
      };
    default:
      return state;
  }
}

export function getBasicDetailsCostSummaryPopupPagerReducer(
  state = [],
  action
) {
  switch (action.type) {
    case GET_BASIC_DETAILS_COST_SUMMARY_REQUEST:
      return { loading: true };
    case GET_BASIC_DETAILS_COST_SUMMARY_SUCCESS:
      return {
        loading: false,
        data: action.payload,
        success: true,
      };
    case GET_BASIC_DETAILS_COST_SUMMARY_ERROR:
      return {
        loading: false,
        success: false,
        error: action.payload,
      };
    default:
      return state;
  }
}

export function getClientCostForCostSummaryPopupPageReducer(
  state = [],
  action
) {
  switch (action.type) {
    case GET_CLIENT_COST_FOR_COST_SUMMARY_REQUEST:
      return { loading: true };
    case GET_CLIENT_COST_FOR_COST_SUMMARY_SUCCESS:
      return {
        loading: false,
        data: action.payload,
        success: true,
      };
    case GET_CLIENT_COST_FOR_COST_SUMMARY_ERROR:
      return {
        loading: false,
        success: false,
        error: action.payload,
      };
    default:
      return state;
  }
}

export function getVendorPayoutForCostSummaryPopupPageReducer(
  state = [],
  action
) {
  switch (action.type) {
    case GET_VENDOR_PAYOUT_FOR_COST_SUMMARY_REQUEST:
      return { loading: true };
    case GET_VENDOR_PAYOUT_FOR_COST_SUMMARY_SUCCESS:
      return {
        loading: false,
        data: action.payload,
        success: true,
      };
    case GET_VENDOR_PAYOUT_FOR_COST_SUMMARY_ERROR:
      return {
        loading: false,
        success: false,
        error: action.payload,
      };
    default:
      return state;
  }
}

export function getGrossMarginForCostSummaryPopupPageReducer(
  state = [],
  action
) {
  switch (action.type) {
    case GET_GROSS_MARGIN_FOR_COST_SUMMARY_REQUEST:
      return { loading: true };
    case GET_GROSS_MARGIN_FOR_COST_SUMMARY_SUCCESS:
      return {
        loading: false,
        data: action.payload,
        success: true,
      };
    case GET_GROSS_MARGIN_FOR_COST_SUMMARY_ERROR:
      return {
        loading: false,
        success: false,
        error: action.payload,
      };
    default:
      return state;
  }
}

export function getInventoryDetailsForCostSummaryPopupPageReducer(
  state = [],
  action
) {
  switch (action.type) {
    case GET_INVENTORY_DETAILS_FOR_COST_SUMMARY_REQUEST:
      return { loading: true };
    case GET_INVENTORY_DETAILS_FOR_COST_SUMMARY_SUCCESS:
      return {
        loading: false,
        data: action.payload,
        success: true,
      };
    case GET_INVENTORY_DETAILS_FOR_COST_SUMMARY_ERROR:
      return {
        loading: false,
        success: false,
        error: action.payload,
      };
    default:
      return state;
  }
}

export function editCostDetailsScreenWiseForCostSummaryPopupPageReducer(
  state = [],
  action
) {
  switch (action.type) {
    case EDIT_COST_DETAILS_SCREEN_WISE_FOR_COST_SUMMARY_REQUEST:
      return { loading: true };
    case EDIT_COST_DETAILS_SCREEN_WISE_FOR_COST_SUMMARY_SUCCESS:
      return {
        loading: false,
        data: action.payload,
        success: true,
      };
    case EDIT_COST_DETAILS_SCREEN_WISE_FOR_COST_SUMMARY_ERROR:
      return {
        loading: false,
        success: false,
        error: action.payload,
      };
    case EDIT_COST_DETAILS_SCREEN_WISE_FOR_COST_SUMMARY_RESET:
      return {
        loading: false,
        success: false,
        error: [],
      };
    default:
      return state;
  }
}



export function sendRequestToVendorForBudgetApprovalCostSheetPopupPageReducer(
  state = [],
  action
) {
  switch (action.type) {
    case SEND_BUDGET_APPROVAL_TO_VENDOR_COST_SUMMARY_REQUEST:
      return { loading: true };
    case SEND_BUDGET_APPROVAL_TO_VENDOR_COST_SUMMARY_SUCCESS:
      return {
        loading: false,
        data: action.payload,
        success: true,
      };
    case SEND_BUDGET_APPROVAL_TO_VENDOR_COST_SUMMARY_ERROR:
      return {
        loading: false,
        success: false,
        error: action.payload,
      };
    case SEND_BUDGET_APPROVAL_TO_VENDOR_COST_SUMMARY_RESET:
      return {
        loading: false,
        success: false,
        error: [],
      };
    default:
      return state;
  }
}



export function sendRequestToVendorForCreativeApprovalReducer(
  state = [],
  action
) {
  switch (action.type) {
    case SEND_BUDGET_APPROVAL_TO_VENDOR_CREATIVE_APPROVAL_REQUEST:
      return { loading: true };
    case SEND_BUDGET_APPROVAL_TO_VENDOR_CREATIVE_APPROVAL_SUCCESS:
      return {
        loading: false,
        data: action.payload,
        success: true,
      };
    case SEND_BUDGET_APPROVAL_TO_VENDOR_CREATIVE_APPROVAL_ERROR:
      return {
        loading: false,
        success: false,
        error: action.payload,
      };
    case SEND_BUDGET_APPROVAL_TO_VENDOR_CREATIVE_APPROVAL_RESET:
      return {
        loading: false,
        success: false,
        error: [],
      };
    default:
      return state;
  }
}

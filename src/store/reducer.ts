
// Auth
import authReducer from "./authSlice";

// Screen Reducers
import * as screenReducers from "../reducers/screenReducers";

// User Reducers
import * as userReducers from "../reducers/userReducers";

// Campaign Reducers
import * as campaignReducers from "../reducers/campaignReducers";

// External API Reducers
import * as externalApiReducers from "../reducers/externalApiReducers";

// Calendar Reducers
import * as calendarReducers from "../reducers/calenderReducers";

// Coupon Reducers
import * as couponReducers from "../reducers/couponReducers";

// Bill Invoice Reducers
import * as billInvoiceReducers from "../reducers/billInvoiceReducers";

// Client/Agency Reducers
import * as clientAgencyReducers from "../reducers/clientAgencyReducers";

// Creative Reducers
import * as creativeReducers from "../reducers/creativeReducers";

// Dashboard Reducers
import * as dashboardReducers from "../reducers/dashboardReducers";

// Data Hero Reducers
import * as dataHeroReducers from "../reducers/dataHeroReducers";



// monitoring Reducers
import * as monitoringReducers from "../reducers/monitoringReducers";

import * as organizationReducers from "../reducers/organizationReducers";




export const rootReducer = {
    // Screen related
    getLocationWiseFiltersForScreensAudiencesDataGet: screenReducers.getLocationWiseFiltersForScreensAudiencesDataGetReducer,
    screensAudiencesDataGet: screenReducers.screensAudiencesDataGetReducer,
    screensCostDataGet: screenReducers.screensCostDataGetReducer,
    screensDataAdvanceFilterGet: screenReducers.screensDataAdvanceFilterGetReducer,
    poiBasedAudienceDataAdvanceFilterGet:
        screenReducers.poiBasedAudienceDataAdvanceFilterGetReducer,
    regularVsCohortPriceDataGet: screenReducers.regularVsCohortPriceDataGetReducer,
    screenSummaryDataGet: screenReducers.screenSummaryDataGetReducer,
    screenSummaryDataIKnowItAllGet: screenReducers.screenSummaryDataIKnowItAllGetReducer,
    screenSummaryPlanTableDataGet: screenReducers.screenSummaryPlanTableDataGetReducer,
    finalPlanPOTableDataGet: screenReducers.finalPlanPOTableDataGetReducer,
    screenDataUploadCreative: screenReducers.screenDataUploadCreativeReducer,
    vendorConfirmationDetailsGet: screenReducers.vendorConfirmationDetailsGetReducer,
    vendorConfirmationStatusTableDetailsGet:
        screenReducers.vendorConfirmationStatusTableDetailsGetReducer,
    campaignDashboardDataGet: screenReducers.campaignDashboardDataGetReducer,
    planningPageFooterDataGet: screenReducers.planningPageFooterDataGetReducer,
    tableDataScreenWiseAdPlayTimeGet: screenReducers.tableDataScreenWiseAdPlayTimeGetReducer,
    tableDataForSelectTopicalDayPageGet: screenReducers.tableDataForSelectTopicalDayPageGetReducer,
    tableDataForSelectTriggerPageGet: screenReducers.tableDataForSelectTriggerPageGetReducer,
    tableDataSetAdPlayTimeStore: screenReducers.tableDataSetAdPlayTimeReducer,
    allFiltersDetailsForUploadCreativePage:
        screenReducers.getAllFiltersDetailsForUploadCreativePageReducer,
    allPlannerIdsAndEmail: screenReducers.getAllPlannerIdsAndEmailReducer,

    creativesFromCreativeBucketForUploadPage: screenReducers.getCreativesFromCreativeBucketForUploadPageReducer,
    basicDetailsForCostSummary: screenReducers.getBasicDetailsCostSummaryPopupPagerReducer,
    clientCostForCostSummary: screenReducers.getClientCostForCostSummaryPopupPageReducer,
    vendorPayoutForCostSummary: screenReducers.getVendorPayoutForCostSummaryPopupPageReducer,
    grossMarginForCostSummary: screenReducers.getGrossMarginForCostSummaryPopupPageReducer,
    inventoryDetailsForCostSummary: screenReducers.getInventoryDetailsForCostSummaryPopupPageReducer,
    editCostDetailsScreenWise: screenReducers.editCostDetailsScreenWiseForCostSummaryPopupPageReducer,
    sendRequestToVendorForBudgetApprovalCostSheetPopupPage: screenReducers.sendRequestToVendorForBudgetApprovalCostSheetPopupPageReducer,
    sendRequestToVendorForCreativeApprovalVendorConfirmationPage: screenReducers.sendRequestToVendorForCreativeApprovalVendorConfirmationPageReducer,
    campaignStatusReportToClientSend: screenReducers.campaignStatusReportToClientSendReducer,
    campaignForFinalApprovalSendVendorConfirmationPage: screenReducers.campaignForFinalApprovalSendVendorConfirmationPageReducer,

    // Campaign related
    campaignCreationsDetailsGet: campaignReducers.campaignCreationsDetailsGetReducer,
    allCampaignsDataGet: campaignReducers.allCampaignsDataGetReducer,
    campaignDetailsGet: campaignReducers.campaignDetailsGetReducer,
    campaignCreatedScreensDetailsGet: campaignReducers.campaignCreationScreensDetailsGetReducer,
    editAllSubCampaigns: campaignReducers.editAllSubCampaignsReducer,
    campaignStatusChange: campaignReducers.campaignStatusChangeReducer,
    changeCampaignCreativeEndDate: campaignReducers.editCampaignCreativeEndDateReducer,
    detailsToCreateCampaignAdd: campaignReducers.detailsToCreateCampaignAddReducer,
    myCreateCampaignsListGet: campaignReducers.myCreateCampaignsListGetReducer,
    myCreateCampaignsListForPlanGet: campaignReducers.myCreateCampaignsListForPlanGetReducer,
    myCreateCampaignsManagerRequestsListGet:
        campaignReducers.myCreateCampaignsManagerRequestsListGetReducer,
    myCreateCampaignsVendorRequestsListGet:
        campaignReducers.myCreateCampaignsVendorRequestsListGetReducer,
    campaignStatusChangeAfterCreativeUpload:
        campaignReducers.campaignStatusChangeAfterCreativeUploadReducer,
    campaignStatusChangeAfterVendorApproval:
        campaignReducers.campaignStatusChangeAfterVendorApprovalReducer,
    updateCampaignDuration: campaignReducers.campaignDurationChangeReducer,
    campaignLogsGet: campaignReducers.campaignLogsGetReducer,
    cloneCampaign: campaignReducers.cloneCampaignReducer,
    downloadCampaignSummaryPPT: campaignReducers.downloadCampaignSummaryPPTReducer,
    campaignRequestFinalApprovalDetails: campaignReducers.getCampaignRequestFinalApprovalDetailsForProohAdminReducer,
    approveCampaignFinally: campaignReducers.approveCampaignFinallyProohAdminReducer,

    // External APIs
    cricketMatchesListGet: externalApiReducers.cricketMatchesListGetReducer,
    playersListGet: externalApiReducers.playersListGetReducer,

    // Auth and User
    auth: authReducer,
    userSignin: userReducers.userSigninReducer,
    userSignup: userReducers.userSignupReducer,
    userAddNewUser: userReducers.userAddNewUserReducer,
    profileUpdate: userReducers.updateUserProfileReducer,
    changePassword: userReducers.changeUserPasswordReducer,
    userUpdatePassword: userReducers.userUpdatePasswordReducer,
    emailVerify: userReducers.userEmailVerificationReducer,
    userSendEmailToResetPassword: userReducers.userSendEmailToResetPasswordReducer,
    emailSendForConfirmation: userReducers.emailSendForConfirmationReducer,
    emailSendForVendorConfirmation: userReducers.emailSendForVendorConfirmationReducer,
    userList: userReducers.userListReducer,
    allUserList: userReducers.userAllListReducer,
    userDelete: userReducers.userDeleteReducer,

    // Calendar
    industryCategory: calendarReducers.getIndustryCategoryReducer,
    calendarListData: calendarReducers.getCalendarListDataReducer,

    // Coupons
    couponList: couponReducers.getCouponListReducer,
    couponApplyForCampaign: couponReducers.applyCouponForCampaignReducer,
    couponRemoveForCampaign: couponReducers.removeCouponForCampaignReducer,

    // Client/Agency
    allClientAgencyNamesListGet: clientAgencyReducers.allClientAgencyNamesListGetReducer,
    clientAgencyDetailsGet: clientAgencyReducers.clientAgencyDetailsGetReducer,
    clientAgencyDetailsAdd: clientAgencyReducers.clientAgencyDetailsAddGetReducer,

    // Bill Invoice
    billInvoiceCreation: billInvoiceReducers.billInvoiceCreationReducer,
    billInvoiceDetailsGet: billInvoiceReducers.billInvoiceDetailsGetReducer,
    handleInvoicePdfGeneration: billInvoiceReducers.handleInvoicePdfGenerationReducer,
    takeDashboardScreenShot: billInvoiceReducers.takeDashboardScreenShotReducer,

    getQueueJobStatus: billInvoiceReducers.getQueueJobStatusReducer,

    // Creative
    creativesMediaUpload: creativeReducers.creativesMediaUploadReducer,
    creativesMediaGet: creativeReducers.creativesMediaGetReducer,
    getAllBrandAndNetwork: creativeReducers.getAllBrandAndNetworkReducer,

    // Dashboard
    basicDataForPlannerDashboard: dashboardReducers.getBasicDataForPlannerDashboardReducer,
    slotDeliveryGraphDateWiseForPlannerDashboard:
        dashboardReducers.getSlotDeliveryGraphDateWiseForPlannerDashboardReducer,
    audienceDataForPlannerDashboard: dashboardReducers.getAudienceDataForPlannerDashboardReducer,
    hardwarePerformanceDataForPlannerDashboard:
        dashboardReducers.getHardwarePerformanceDataForPlannerDashboardReducer,
    spotDeliveryDataForPlannerDashboard:
        dashboardReducers.getSpotDeliveryDataForPlannerDashboardReducer,
    costDataForPlannerDashboard: dashboardReducers.getCostDataForPlannerDashboardReducer,
    siteLevelPerformanceForPlannerDashboard:
        dashboardReducers.getSiteLevelPerformanceForPlannerDashboardReducer,
    siteLevelPerformanceTabWiseForPlannerDashboard:
        dashboardReducers.getSiteLevelPerformanceTabWiseForPlannerDashboardReducer,
    sitesDataMapViewForPlannerDashboard:
        dashboardReducers.getSitesDataMapViewForPlannerDashboardReducer,
    siteMonitoringPicsPercentage: dashboardReducers.getSiteMonitoringPicsPercentageReducer,
    allSitesMonitoringData: dashboardReducers.getAllSitesMonitoringDataReducer,
    siteBasedDataOnLogsPage: dashboardReducers.getSiteBasedDataOnLogsPageReducer,
    getFiltersAndDataForAllLogsPopup: dashboardReducers.getFiltersAndDataForAllLogsPopupReducer,

    // Data Hero
    heroDataRegister: dataHeroReducers.heroDataRegisterReducer,
    heroDataDetails: dataHeroReducers.getHeroDataDetailsReducer,
    audienceDataSave: dataHeroReducers.audienceDataSaveReducer,
    audienceDataGet: dataHeroReducers.audienceDataGetReducer,

    // Monitoring
    campaignMonitoringPicsGet: monitoringReducers.campaignMonitoringPicsGetReducer,
    generateMonitoringPpt: monitoringReducers.generateMonitoringPptReducer,
    getMonitoringPptJobStatus: monitoringReducers.getMonitoringPptJobStatusReducer,

    // Organization
    myOrgDetailsGet: organizationReducers.myOrgDetailsGetReducer,
    myOrgCreate: organizationReducers.myOrgCreateReducer,
    orgLevelCampaignStatusGet: organizationReducers.orgLevelCampaignStatusGetReducer,
};
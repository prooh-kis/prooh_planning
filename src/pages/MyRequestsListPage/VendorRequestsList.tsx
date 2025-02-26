import { TabWithoutIcon } from "../../components/index";
import { PrimaryButton } from "../../components/atoms/PrimaryButton";
import { PrimaryInput } from "../../components/atoms/PrimaryInput";
import React, { useEffect, useState } from "react";
import {
  MyRequestsListTable,
  VendorConfirmationBasicTable,
  VendorConfirmationStatusTable,
} from "../../components/tables";
import { SecondaryButton } from "../../components/atoms/SecondaryButton";
import { useDispatch } from "react-redux";
import { changeCampaignStatusAfterVendorApproval } from "../../actions/campaignAction";
import { useSelector } from "react-redux";
import { message } from "antd";

const allTabs = [
  {
    id: "1",
    label: "All",
  },
  {
    id: "2",
    label: "Approved",
  },
  {
    id: "3",
    label: "Pending",
  },
  {
    id: "4",
    label: "Rejected",
  },
];

export const VendorsRequestsList = ({
  requestsList,
  userInfo,
  campaignsList,
}: any) => {
  const dispatch = useDispatch<any>();
  const [currentTab, setCurrentTab] = useState<any>("1");
  const [showDetails, setShowDetails] = useState<any>({
    show: false,
    data: {},
  });
  const [planRequest, setPlanRequest] = useState<any>([
    {
      campaignCreationId: "",
      campaignName: "",
      brandName: "",
      clientName: "",
      type: "",
      totalCampaignBudget: 0,
      startDate: "",
      endDate: "",
      duration: "",
      campaigns: [],
      screens: [],
    },
  ]);

  const [selectedCampaignIds, setSelectedCampaignIds] = useState<any>([]);

  const campaignStatusChangeAfterVendorApproval = useSelector(
    (state: any) => state.campaignStatusChangeAfterVendorApproval
  );
  const {
    loading: loadingVendorApprovalStatus,
    error: errorVendorApprovalStatus,
    data: vendorApprovalStatus,
  } = campaignStatusChangeAfterVendorApproval;

  useEffect(() => {
    if (vendorApprovalStatus) {
      message.success("Campaign Approved Successfully...");
    }

    if (errorVendorApprovalStatus) {
      message.error("Campaign Approval Failed");
    }

    if (requestsList?.length > 0) {
      setPlanRequest(requestsList);
    }
  }, [requestsList, vendorApprovalStatus, errorVendorApprovalStatus]);

  return (
    <div className="w-full">
      <div className="flex justify-between py-2">
        <TabWithoutIcon
          currentTab={currentTab}
          setCurrentTab={setCurrentTab}
          tabData={allTabs}
        />
        <div
          className="flex items-center"
          onClick={() =>
            setShowDetails({
              show: !showDetails.show,
              data: {},
            })
          }
        >
          <h1 className="text-[16px] text-[#129BFF]">Back</h1>
        </div>
      </div>
      <div className="w-full">
        {!showDetails.show ? (
          <MyRequestsListTable
            requestsList={planRequest}
            setShowDetails={setShowDetails}
            showDetails={showDetails}
          />
        ) : (
          <div className="">
            <VendorConfirmationBasicTable
              vendorConfirmationData={showDetails?.data}
            />

            <div className="flex justify-between items-start mt-4">
              <div className="p-4 shadow-sm rounded-lg">
                <h1 className="text-lg font-semibold mb-2">
                  Screens Selected ({showDetails?.data?.screenIds?.length || 0})
                </h1>

                {showDetails?.data?.screenNames?.length > 0 ? (
                  <ul className="space-y-2">
                    {showDetails?.data?.screenNames?.map(
                      (item: any, index: number) => (
                        <li
                          key={index}
                          className="p-2 bg-gray-100 rounded-md shadow-sm"
                        >
                          {typeof item === "object"
                            ? JSON.stringify(item)
                            : item}
                        </li>
                      )
                    )}
                  </ul>
                ) : (
                  <p className="text-gray-500">No screens selected.</p>
                )}
              </div>
              <div className="flex gap-4">
                <button
                  disabled={loadingVendorApprovalStatus}
                  className={`${
                    loadingVendorApprovalStatus
                      ? "bg-gray text-primaryButton hover:bg-transparent hover:border-primaryButton hover:border-2 hover:text-primaryButton"
                      : "bg-[#129BFF] text-[#FFFFFF] font-custom rounded-[9px] text-[14px] sm:text-[16px] font-bold hover:bg-[#129BFF90] hover:text-[#FFFFFF] w-[170px] h-[40px]"
                  }`}
                  onClick={() => {
                    dispatch(
                      changeCampaignStatusAfterVendorApproval({
                        ids: selectedCampaignIds,
                      })
                    );
                  }}
                >
                  Approve Campaign
                </button>
                <button className="bg-gray-300 text-[#FFFFFF] font-custom rounded-[9px] text-[14px] sm:text-[16px] font-bold hover:bg-[#129BFF90] hover:text-[#FFFFFF] w-[163px] h-[40px]">
                  Reset
                </button>
              </div>
            </div>
            <VendorConfirmationStatusTable
              userInfo={userInfo}
              statusTableData={showDetails?.data}
              selectedCampaignIds={selectedCampaignIds}
              setSelectedCampaignIds={setSelectedCampaignIds}
              campaignsList={campaignsList}
            />
          </div>
        )}
      </div>
    </div>
  );
};

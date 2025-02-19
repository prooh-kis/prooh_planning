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

export const VendorsRequestsList = ({ requestsList, userInfo }: any) => {
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
      setPlanRequest(
        requestsList?.reduce((acc: any, item: any) => {
          if (!Array.isArray(acc)) {
            acc = [];
          }
          const existingCampaign = acc.find(
            (campaign: any) =>
              campaign.campaignCreationId === item.campaignCreationId
          );

          const totalSlotBooked = Number(item.totalSlotBooked);
          const pricePerSlot = Number(item.pricePerSlot);
          const cost = totalSlotBooked * pricePerSlot;

          if (!existingCampaign) {
            acc.push({
              campaignCreationId: item.campaignCreationId,
              name: item.name,
              brandName: item.brandName,
              clientName: item.clientName,
              campaignType: item.campaignType,
              totalCampaignBudget: cost,
              startDate: item.startDate,
              endDate: item.endDate,
              duration: item.campaignDuration,
              campaigns: [item], // You can adjust this if you have multiple campaigns per ID
              triggers: item.triggers,
            });
          } else {
            existingCampaign.totalCampaignBudget += cost;
            if (!existingCampaign.campaigns.includes(item)) {
              existingCampaign.campaigns.push(item);
            }
          }

          return acc;
        }, [])
      );
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
            <div className="">
              <div className="py-2 flex justify-between items-center">
                <h1>
                  Screens Selected ({showDetails?.data?.campaigns?.length})
                </h1>
                <div className="flex gap-4">
                  <button
                    className="bg-[#129BFF] text-[#FFFFFF] font-custom rounded-[9px] text-[14px] sm:text-[16px] font-bold hover:bg-[#129BFF90] hover:text-[#FFFFFF] w-[163px] h-[40px]"
                    onClick={() => {
                      dispatch(
                        changeCampaignStatusAfterVendorApproval({
                          ids: selectedCampaignIds,
                        })
                      );
                    }}
                  >
                    Create Campaign
                  </button>
                  <button className="bg-gray-300 text-[#FFFFFF] font-custom rounded-[9px] text-[14px] sm:text-[16px] font-bold hover:bg-[#129BFF90] hover:text-[#FFFFFF] w-[163px] h-[40px]">
                    Reset
                  </button>
                </div>
              </div>
              <VendorConfirmationStatusTable
                userInfo={userInfo}
                statusTableData={showDetails?.data?.campaigns}
                selectedCampaignIds={selectedCampaignIds}
                setSelectedCampaignIds={setSelectedCampaignIds}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

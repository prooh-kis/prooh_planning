import React, { useEffect, useState } from "react";
import { TeamOutlined, DownOutlined, RightOutlined } from "@ant-design/icons";
import { getNameFromEmailLetters } from "../../utils/formatValue";

interface Campaign {
  _id: string;
  name: string;
  brandName: string;
  clientName: string;
  campaignCoordinatorId: string;
  campaignCoordinatorEmail: string;
  totalCampaignBudget: number;
  startDate: string;
  endDate: string;
  performance?: number;
}

type VendorWiseCampaignsProps = {
  title: string;
  vendorWiseCampaigns: any; // Required prop for backward compatibility
};

export const VendorWiseCampaigns: React.FC<VendorWiseCampaignsProps> = ({
  title,
  vendorWiseCampaigns,
}) => {
  const [vendorList, setVendorList] = useState<string[]>([]);
  const [expandedVendors, setExpandedVendors] = useState<Record<string, boolean>>({});

  useEffect(() => {
    if (vendorWiseCampaigns) {
      setVendorList(Object.keys(vendorWiseCampaigns));
    }
  },[vendorWiseCampaigns]);

  const toggleVendor = (vendor: string) => {
    setExpandedVendors(prev => ({
      ...prev,
      [vendor]: !prev[vendor]
    }));
  };
  
  return (
    <div className="bg-[#FFFFFF] rounded-lg shadow-md p-2 mb-2">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
      
          <i className="fi fi-ss-user-gear flex items-center"></i>
          <h2 className="text-[14px] font-semibold text-[#1F2937]">
            {title}
          </h2>
        </div>
        <span className="flex items-center text-[12px] text-[#6B7280] gap-2">
        ({vendorList.length})
        </span>
      </div>
      
      {vendorList.length === 0 ? (
        <div className="text-center py-4 text-[#6B7280]">
          No Vendor data available
        </div>
      ) : (
        <div className="space-y-2 h-[30vh] overflow-y-auto no-scrollbar">
          {vendorList?.map((vendor: any, i: any) => (
            <div key={i} className="border border-[#E5E7EB] rounded-lg overflow-hidden">
              <div 
                className="bg-[#F9FAFB] px-2 py-3 border-b border-[#E5E7EB] cursor-pointer hover:bg-[#F3F4F6] transition-colors"
                onClick={() => toggleVendor(vendor)}
              >
                <div className="flex flex-col items-start justify-between">
                  <div className="flex items-center">
                    {expandedVendors[vendor] ? (
                      <DownOutlined className="mr-2 text-[#6B7280] text-xs" />
                    ) : (
                      <RightOutlined className="mr-2 text-[#6B7280] text-xs" />
                    )}
                    <span className="font-medium text-[12px] text-[#111827] truncate capitalize">
                      {getNameFromEmailLetters(vendor)}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="flex gap-1 text-[10px] px-1.5 py-0.5 rounded-full bg-[#ECFDF5] text-[#065F46] border border-[#A7F3D0]">
                      <i className="fi fi-sr-screen flex items-center"></i>
                      {Object.keys(vendorWiseCampaigns[vendor].screens).length}
                    </span>
                    <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${(vendorWiseCampaigns[vendor]?.performance || 0) > 1 ? "bg-[#4DB37E30] text-[#4DB37E]" : "bg-[#EF444430] text-[#EF4444]"}`}>
                      {((vendorWiseCampaigns[vendor]?.performance || 0) * 100)?.toFixed(1) || 0}%
                    </span>
                  </div>
                </div>
              </div>
              {expandedVendors[vendor] && Object.keys(vendorWiseCampaigns[vendor].screens).length > 0 && (
                <div className="divide-y divide-[#E5E7EB]">
                  {Object.keys(vendorWiseCampaigns[vendor].screens).map((screen: any, i: any) => (
                    <div key={i} className="px-2 py-3 flex flex-col gap-1">
                      <div className="flex flex-col w-full">
                        <div className="flex items-center justify-start gap-2">
                          <input
                            type="checkbox"
                            className="h-3 w-3 text-[#2563EB] rounded border-[#D1D5DB] focus:ring-[#3B82F6]"
                            // checked={selectedMembers.includes(manager.userId)}
                            // onChange={(e) => handleSelectMember(manager.userId, e.target.checked)}
                            aria-label={`Select ${screen || 'screen'}`}
                          />
                          <span className="font-medium text-[12px] text-[#111827] truncate">
                            {screen}
                          </span>
                          <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${(vendorWiseCampaigns[vendor].screens[screen]?.performance || 0) > 1 ? "bg-[#4DB37E30] text-[#4DB37E]" : "bg-[#EF444430] text-[#EF4444]"}`}>
                            { ((vendorWiseCampaigns[vendor].screens[screen]?.performance || 0) * 100)?.toFixed(1) || 0}%
                          </span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className="flex gap-1 text-[10px] px-1.5 py-0.5 rounded-full bg-[#ECFDF5] text-[#065F46] border border-[#A7F3D0]">
                            <i className="fi fi-sr-megaphone flex items-center"></i>
                            {vendorWiseCampaigns[vendor].screens[screen]?.campaigns?.length}
                          </span>
                        </div>

                        {vendorWiseCampaigns[vendor].screens[screen]?.campaigns && vendorWiseCampaigns[vendor].screens[screen]?.campaigns.length > 0 && (
                          <div className="mt-2 border-t-2 border-l-2 border-[#E5E7EB] pl-2 py-1">
                            {vendorWiseCampaigns[vendor].screens[screen]?.campaigns.map((campaign: any) => (
                              <div key={campaign._id} className="flex flex-col items-start justify-between py-1 gap-1 truncate">
                                <div className="flex items-center gap-2 truncate">
                                  <input
                                    type="checkbox"
                                    className="h-3 w-3 text-[#2563EB] rounded border-[#D1D5DB] focus:ring-[#3B82F6]"
                                    // checked={selectedMembers.includes(coordinator.userId)}
                                    // onChange={(e) => handleSelectMember(coordinator.userId, e.target.checked)}
                                    aria-label={`Select ${campaign.name || 'campaign'}`}
                                  />
                                  <span className="text-xs text-[#4B5563] truncate">
                                    {campaign.name || 'Unnamed Campaign'}
                                  </span>
                                  <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${(campaign?.performance || 0)> 1 ? "bg-[#4DB37E30] text-[#4DB37E]" : "bg-[#EF444430] text-[#EF4444]"}`}>
                                    {((campaign?.performance || 0) * 100)?.toFixed(1) || 0}%
                                  </span>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

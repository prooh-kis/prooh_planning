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
  filters?: any;
  handleFilters?: any;
  initialFilters?: any;
};

export const VendorWiseCampaigns: React.FC<VendorWiseCampaignsProps> = ({
  title,
  vendorWiseCampaigns,
  filters,
  handleFilters,
  initialFilters,
}) => {
  const [vendorList, setVendorList] = useState<string[]>([]);

  useEffect(() => {
    if (vendorWiseCampaigns) {
      setVendorList(Object.keys(vendorWiseCampaigns));
    }
  },[vendorWiseCampaigns]);


  return (
    <div className="bg-[#FFFFFF] rounded-lg p-2">
      <div className="flex items-center justify-between mb-2 border-b py-2">
        <div className="flex items-center gap-2">
          <h2 className="text-[12px] font-semibold text-[#1F2937]">
            {title}
          </h2>
        </div>
      </div>
      
      {vendorList.length === 0 ? (
        <div className="text-center bg-[#F3F4F6] h-[10vh] animate-pulse text-[10px]">
          Loading...
        </div>
      ) : (
        <div className="space-y-2 h-[30vh] overflow-y-auto no-scrollbar">
          {vendorList?.map((vendor: any, i: any) => (
            <div key={i} className="overflow-hidden">
              <div className="px-1 cursor-pointer hover:rounded-[4px] hover:bg-[#F3F4F6] transition-colors">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 truncate">
                  <input
                      type="checkbox"
                      className="cursor-pointer h-3 w-3 text-[#2563EB] rounded border-[#F9FAFB] focus:ring-[#F9FAFB]"
                      checked={vendor === "All"
                        ? filters?.vendor?.length ===
                          (vendorList?.length - 1)
                        : filters?.vendor?.includes(vendor)}
                      onChange={(e) => handleFilters(vendor, e.target.checked)}
                      aria-label={`Select ${vendor || 'vendor'}`}
                      disabled={vendorList.length <= 2 ? true : false}
                    /> 
                    <span className="font-medium text-[10px] text-[#111827] truncate capitalize">
                      {vendor}
                    </span>
                    <span className="text-[10px] text-[#6B7280]">
                      ({vendorWiseCampaigns?.[vendor]?.totalCampaigns})
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${(vendorWiseCampaigns?.[vendor]?.performance || 0) > 1 ? "text-[#4DB37E]" : "text-[#EF4444]"}`}>
                      {((vendorWiseCampaigns?.[vendor]?.performance || 0) * 100)?.toFixed(1) || 0}%
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

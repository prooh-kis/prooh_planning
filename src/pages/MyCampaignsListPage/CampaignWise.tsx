import React, { useEffect, useState } from "react";
import { TeamOutlined, DownOutlined, RightOutlined } from "@ant-design/icons";

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
  handleFilters?: any;
}

type CampaignWiseProps = {
  title: string;
  nameWiseCampaigns: any; // Required prop for backward compatibility
  filters?: any;
  handleFilters?: any;
  initialFilters?: any;
};

export const CampaignWise: React.FC<CampaignWiseProps> = ({
  title,
  nameWiseCampaigns,
  filters,
  handleFilters,
  initialFilters,
}) => {
  const [campaignList, setCampaignList] = useState<string[]>([]);
  useEffect(() => {
    if (nameWiseCampaigns) {
      setCampaignList(Object.keys(nameWiseCampaigns));
    }
  },[nameWiseCampaigns]);

  return (
    <div className="bg-[#FFFFFF] rounded-lg p-2">
      <div className="flex items-center justify-between mb-2 border-b py-2">
        <div className="flex items-center gap-2">
          <h2 className="text-[12px] font-semibold text-[#1F2937]">
            {title}
          </h2>
        </div>
      </div>
      
      {campaignList.length === 0 ? (
        <div className="text-center bg-[#F3F4F6] h-[10vh] animate-pulse text-[10px]">
          Loading...
        </div>
      ) : (
        <div className="space-y-2 h-[30vh] overflow-y-auto no-scrollbar">
          {campaignList?.map((campaign: any, i: any) => (
            <div key={i} className="overflow-hidden">
              <div className="px-1 cursor-pointer hover:rounded-[4px] hover:bg-[#F3F4F6] transition-colors">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 truncate">
                    <input
                      type="checkbox"
                      className="cursor-pointer h-3 w-3 text-[#2563EB] rounded border-[#F9FAFB] focus:ring-[#F9FAFB]"
                      checked={campaign === "0" && initialFilters?.campaignCreation
                        ? filters?.campaignCreation?.length ===
                          (campaignList.length - 1)
                        : filters?.campaignCreation?.includes(campaign.toString())}
                      onChange={(e) => handleFilters("campaignCreation", campaign, e.target.checked)}
                      aria-label={`Select ${nameWiseCampaigns?.[campaign]?.name}`}
                      disabled={campaignList?.length <= 2 ? true : false}
                    /> 
                    <span className="font-medium text-[10px] text-[#111827] truncate capitalize">
                      {nameWiseCampaigns?.[campaign]?.name?.toLowerCase()}
                    </span>
                    {nameWiseCampaigns?.[campaign]?.totalCampaigns && (
                      <span className="text-[10px] text-[#6B7280]">
                        ({nameWiseCampaigns?.[campaign]?.totalCampaigns})
                      </span>
                    )}
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${(nameWiseCampaigns?.[campaign]?.performance || 0) > 0.85 ? "text-[#4DB37E]" : "text-[#EF4444]"}`}>
                      {/* {((nameWiseCampaigns?.[campaign]?.performance || 0) * 100)?.toFixed(0) || 0}% */}
                      {nameWiseCampaigns?.[campaign]?.performance < 1 ? 
                      `-${((1 - nameWiseCampaigns?.[campaign]?.performance || 0) * 100)?.toFixed(0)}`
                      : `+${(((nameWiseCampaigns?.[campaign]?.performance - 1) || 0) * 100)?.toFixed(0)}`
                      }%
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

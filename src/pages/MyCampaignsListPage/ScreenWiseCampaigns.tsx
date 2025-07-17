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
}

type ScreenWiseCampaignsProps = {
  title: string;
  screenWiseCampaigns: any; // Required prop for backward compatibility
  filters?: any;
  handleFilters?: any;
  initialFilters?: any;
};

export const ScreenWiseCampaigns: React.FC<ScreenWiseCampaignsProps> = ({
  title,
  screenWiseCampaigns,
  filters,
  handleFilters,
  initialFilters
}) => {
  const [screenList, setScreenList] = useState<string[]>([]);

  useEffect(() => {
    if (screenWiseCampaigns) {
      setScreenList(Object.keys(screenWiseCampaigns));
    }
  },[screenWiseCampaigns]);

  
  return (
    <div className="bg-[#FFFFFF] rounded-lg p-2">
      <div className="flex items-center justify-between mb-2 border-b py-2">
        <div className="flex items-center gap-2">
          <h2 className="text-[12px] font-semibold text-[#1F2937]">
            {title}
          </h2>
        </div>
      </div>
      
      {screenList.length === 0 ? (
        <div className="text-center py-4 text-[#6B7280]">
          No Agency data available
        </div>
      ) : (
        <div className="space-y-2 h-[30vh] overflow-y-auto no-scrollbar">
          {screenList?.map((screen: any, i: any) => (
            <div key={i} className="overflow-hidden">
              <div className="px-1 cursor-pointer hover:rounded-[4px] hover:bg-[#F3F4F6] transition-colors">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 truncate">
                    <input
                      type="checkbox"
                      className="h-3 w-3 text-[#2563EB] rounded border-[#F9FAFB] focus:ring-[#F9FAFB]"
                      checked={filters?.screen.includes(screen)}
                      onChange={(e) => handleFilters("screen", screen, e.target.checked)}
                      aria-label={`Select ${screen}`}
                      disabled={screenList.length <= 2 ? true : false}
                    /> 
                    <span className="font-medium text-[10px] text-[#111827] truncate capitalize">
                      {screen.toLowerCase()}
                    </span>
                    <span className="text-[10px] text-[#6B7280]">
                      ({screenWiseCampaigns[screen]?.totalCampaigns})
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${(screenWiseCampaigns[screen]?.performance || 0) > 1 ? "text-[#4DB37E]" : "text-[#EF4444]"}`}>
                      {((screenWiseCampaigns[screen]?.performance || 0) * 100)?.toFixed(1) || 0}%
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {initialFilters.screen?.filter((sc: any) => !screenList.includes(sc)).map((screen: any, i: any) => (
            <div key={i} className="overflow-hidden">
              <div className="px-1 cursor-pointer hover:rounded-[4px] hover:bg-[#F3F4F6] transition-colors">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 truncate">
                    <input
                      type="checkbox"
                      className="h-3 w-3 text-[#2563EB] rounded border-[#F9FAFB] focus:ring-[#F9FAFB]"
                      checked={filters?.screen.includes(screen)}
                      onChange={(e) => handleFilters("screen", screen, e.target.checked)}
                      aria-label={`Select ${screen}`}
                    /> 
                    <span className="font-medium text-[10px] text-[#D7D7D7] truncate capitalize">
                      {screen.toLowerCase()}
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

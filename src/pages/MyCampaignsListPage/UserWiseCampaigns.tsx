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

type UserWiseCampaignsProps = {
  title: string;
  userWiseCampaigns: any; // Required prop for backward compatibility
  orgMembers?: any;
};

export const UserWiseCampaigns: React.FC<UserWiseCampaignsProps> = ({
  title,
  userWiseCampaigns,
  orgMembers
}) => {
  const [userList, setUserList] = useState<string[]>([]);
  const [expandedAgencies, setExpandedAgencies] = useState<Record<string, boolean>>({});

  useEffect(() => {
    if (userWiseCampaigns) {
      // setUserList(orgMembers?.filter((member: any) => Object.keys(userWiseCampaigns)?.map((ke: any) => ke.toString()).includes(member.userId.toString()))?.map((member: any) => member.name));
      setUserList(Object.keys(userWiseCampaigns));
    }
  },[userWiseCampaigns, orgMembers]);

  const toggleAgency = (agency: string) => {
    setExpandedAgencies(prev => ({
      ...prev,
      [agency]: !prev[agency]
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
        ({userList.length})
        </span>
      </div>
      
      {userList.length === 0 ? (
        <div className="text-center py-4 text-[#6B7280]">
          No Agency data available
        </div>
      ) : (
        <div className="space-y-2 h-[30vh] overflow-y-auto no-scrollbar">
          {userList?.map((user: any, i: any) => (
            <div key={i} className="border border-[#E5E7EB] rounded-lg overflow-hidden">
              <div 
                className="bg-[#F9FAFB] px-2 py-3 border-b border-[#E5E7EB] cursor-pointer hover:bg-[#F3F4F6] transition-colors"
                onClick={() => toggleAgency(user)}
              >
                <div className="flex flex-col items-start justify-between">
                  <div className="flex items-center">
                    {expandedAgencies[user] ? (
                      <DownOutlined className="mr-2 text-[#6B7280] text-xs" />
                    ) : (
                      <RightOutlined className="mr-2 text-[#6B7280] text-xs" />
                    )}
                    <span className="font-medium text-[12px] text-[#111827] truncate">
                      {user}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="flex gap-1 text-[10px] px-1.5 py-0.5 rounded-full bg-[#ECFDF5] text-[#065F46] border border-[#A7F3D0]">
                      <i className="fi fi-sr-megaphone flex items-center"></i>
                      {userWiseCampaigns[user]?.campaigns?.length}
                    </span>
                    <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${(userWiseCampaigns[user]?.performance || 0) > 1 ? "bg-[#4DB37E30] text-[#4DB37E]" : "bg-[#EF444430] text-[#EF4444]"}`}>
                      {((userWiseCampaigns[user]?.performance || 0) * 100)?.toFixed(1) || 0}%
                    </span>
                  </div>
                </div>
              </div>
              {expandedAgencies[user] && userWiseCampaigns[user]?.campaigns?.length > 0 && (
                <div className="divide-y divide-[#E5E7EB]">
                  {userWiseCampaigns[user]?.campaigns?.map((campaign: any, i: any) => (
                    <div key={i} className="px-2 py-3 flex flex-col gap-1">
                      <div className="flex items-center justify-start gap-2">
                        <input
                          type="checkbox"
                          className="h-3 w-3 text-[#2563EB] rounded border-[#D1D5DB] focus:ring-[#3B82F6]"
                          // checked={selectedMembers.includes(manager.userId)}
                          // onChange={(e) => handleSelectMember(manager.userId, e.target.checked)}
                          aria-label={`Select ${campaign.name || 'campaign'}`}
                        />
                        <span className="font-medium text-[12px] text-[#111827] truncate">
                          {campaign.name}
                        </span>
                        <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${(campaign?.performance || 0) > 1 ? "bg-[#4DB37E30] text-[#4DB37E]" : "bg-[#EF444430] text-[#EF4444]"}`}>
                          {((campaign?.performance || 0) * 100)?.toFixed(1) || 0}%
                        </span>
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

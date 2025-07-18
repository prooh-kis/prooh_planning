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
  filters?: any;
  handleFilters?: any;
  initialFilters?: any;
  orgUser?: any;
};

export const UserWiseCampaigns: React.FC<UserWiseCampaignsProps> = ({
  title,
  userWiseCampaigns,
  orgMembers,
  filters,
  handleFilters,
  initialFilters,
  orgUser,
}) => {
  const [userList, setUserList] = useState<string[]>([]);

  useEffect(() => {
    if (userWiseCampaigns) {
      // setUserList(orgMembers?.filter((member: any) => Object.keys(userWiseCampaigns)?.map((ke: any) => ke.toString()).includes(member.userId.toString()))?.map((member: any) => member.name));
      setUserList(Object.keys(userWiseCampaigns));
    }
  },[userWiseCampaigns, orgMembers]);
  
  return (
    <div className="bg-[#FFFFFF] rounded-lg p-2">
      <div className="flex items-center justify-between mb-2 border-b py-2">
        <div className="flex items-center gap-2">
          <h2 className="text-[12px] font-semibold text-[#1F2937]">
            {title}
          </h2>
        </div>
      </div>
      
      {userList.length === 0 ? (
        <div className="text-center bg-[#F3F4F6] h-[10vh] animate-pulse text-[10px]">
          Loading...
        </div>
      ) : (
        <div className="space-y-2 h-[30vh] overflow-y-auto no-scrollbar">
          {userList?.map((user: any, i: any) => (
            <div key={i} className="overflow-hidden">
              <div 
                className="px-1 cursor-pointer hover:rounded-[4px] hover:bg-[#F3F4F6] transition-colors"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 truncate">
                    <input
                      type="checkbox"
                      className="h-3 w-3 text-[#2563EB] rounded border-[#F9FAFB] focus:ring-[#F9FAFB]"
                      checked={user === "All" ? filters?.[orgUser]?.length === initialFilters?.[orgUser]?.length : filters?.[orgUser]?.includes(user)}
                      onChange={(e) => handleFilters(orgUser, user, e.target.checked)}
                      aria-label={`Select ${user || orgUser}`}
                      disabled={userList?.length <= 2 ? true : false}
                    /> 
                    <span className="font-medium text-[10px] text-[#111827] truncate">
                      {user === "undefined" ? "Unknown" : user}
                    </span>
                    <span className="text-[10px] text-[#6B7280]">
                      ({userWiseCampaigns[user]?.totalCampaigns})
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${(userWiseCampaigns[user]?.performance || 0) > 1 ? "text-[#4DB37E]" : "text-[#EF4444]"}`}>
                      {((userWiseCampaigns[user]?.performance || 0) * 100)?.toFixed(1) || 0}%
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
          {initialFilters?.[orgUser]?.length > 0 && initialFilters?.[orgUser]?.filter((u: any) => !userList.includes(u))?.map((user: any, i: any) => (
            <div key={i} className="overflow-hidden">
              <div 
                className="px-1 cursor-pointer hover:bg-[#F3F4F6] transition-colors"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 truncate">
                    <input
                      type="checkbox"
                      className="h-3 w-3 text-[#D7D7D7] rounded border-[#F9FAFB] focus:ring-[#F9FAFB]"
                      checked={filters?.[orgUser].filter((u: any) => userList.includes(u)).includes(user)}
                      onChange={(e) => handleFilters(orgUser, user, e.target.checked)}
                      aria-label={`Select ${user || orgUser}`}
                    /> 
                    <span className="font-medium text-[10px] text-[#D7D7D7] truncate">
                      {user === "undefined" ? "Unknown" : user}
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

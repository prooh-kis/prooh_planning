import React, { useEffect, useMemo, useState } from "react";
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

interface Coordinator {
  userId: string;
  email: string;
  name?: string;
  role: string;
  totalCampaigns?: number;
  campaignCreations?: Campaign[];
  performance?: number;
}

interface Manager {
  userId: string;
  email: string;
  name?: string;
  role: string;
  coordinators?: Coordinator[];
  totalCampaigns?: number;
  performance?: number;
}

interface HOM {
  userId: string;
  email: string;
  name?: string;
  role: string;
  managers?: Manager[];
  isLeader?: boolean;
  team?: Manager[];
  totalCampaigns?: number;
  performance?: number;
}

interface OrgLevelCampaignStatus {
  data: any;
  roleGroups: any;
}

type TeamHierarchyProps = {
  title: string;
  members: any[]; // Required prop for backward compatibility
  leaderRole: string;
  memberRole: string;
  // @ts-ignore - Using any to avoid unused parameter warnings
  orgLevelCampaignStatus?: OrgLevelCampaignStatus;
  selectionType?: any;
  filters?: any;
  handleFilters?: any;
  initialFilters?: any;
};

export const TeamHierarchy: React.FC<TeamHierarchyProps> = ({
  title,
  leaderRole: _leaderRole, // Prefix with _ to indicate it's intentionally unused
  memberRole: _memberRole, // Prefix with _ to indicate it's intentionally unused
  members,
  orgLevelCampaignStatus = { data: {}, roleGroups: {} } as OrgLevelCampaignStatus,
  selectionType,
  filters,
  handleFilters,
  initialFilters
}) => {
  const [expandedLeaders, setExpandedLeaders] = useState<Record<string, boolean>>(() => {
    if (orgLevelCampaignStatus && orgLevelCampaignStatus?.data?.managerHeads) {
      return {
        [Object.keys(orgLevelCampaignStatus?.data?.managerHeads)[0]]: true
      };
    } else {
      return {};
    }
  });
  
  const toggleLeader = (leaderId: string) => {
    setExpandedLeaders(prev => ({
      ...prev,
      [leaderId]: !prev[leaderId]
    }));
  };

  // These props are intentionally unused but required by the component's interface
  // @ts-ignore - Intentionally unused variables
  const _unused = { _leaderRole, _memberRole, members };
  void _unused; // Use void to satisfy linter

  // const hierarchy = processHierarchy();
  const hierarchy = orgLevelCampaignStatus?.data?.managerHeads;

  return (
    <div className="bg-[#FFFFFF] rounded-lg p-2">
      <div className="flex items-center justify-between mb-2 border-b py-2">
        <div className="flex items-center gap-2">
          <h2 className="text-[12px] font-semibold text-[#1F2937]">
            {title}
          </h2>
        </div>
      </div>
      {!hierarchy || Object.keys(hierarchy)?.length === 0 ? (
        <div className="text-center bg-[#F3F4F6] h-[10vh] animate-pulse text-[10px]">
          Loading...
        </div>
      ) : (
        <div className="space-y-2 h-[30vh] overflow-y-auto no-scrollbar">
          {Object.keys(hierarchy).map((hom: any) => (
            <div key={hierarchy[hom].userId} className="overflow-hidden">
              <div 
                className="px-1 cursor-pointer hover:bg-[#F3F4F6] hover:rounded-[4px] transition-colors"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 truncate">
                    <input
                      type="checkbox"
                      className="h-3 w-3 text-[#2563EB] rounded border-[#F9FAFB] focus:ring-[#F9FAFB]"
                      checked={filters?.hom?.includes(hom) && hierarchy[hom]?.totalCampaigns as number > 0}
                      onChange={(e) => handleFilters("hom", hom, e.target.checked)}
                      aria-label={`Select ${hom || 'hom'}`}
                      disabled={
                        Object.keys(hierarchy[hom]).length === 1 ? true : false
                      }
                    /> 
                    <span 
                      className={`font-medium text-[10px] text-[#111827] truncate ${expandedLeaders[hierarchy[hom].userId] ? 'font-semibold' : 'font-normal'}`} 
                      onClick={() => {
                        if (hierarchy[hom].totalCampaigns > 0) {
                          toggleLeader(hierarchy[hom].userId);
                        }
                      }}
                    >
                      {hom}
                    </span>
                    <span className="text-[10px] text-[#6B7280]">
                      ({hierarchy[hom].totalCampaigns})
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${(hierarchy[hom]?.performance || 0) > 1 ? "text-[#4DB37E]" : "text-[#EF4444]"}`}>
                      {/* {((hierarchy[hom]?.performance || 0) * 100)?.toFixed(1) || 0}% */}
                      {hierarchy[hom]?.performance < 1 ? 
                        `-${((1 - hierarchy[hom]?.performance || 0) * 100)?.toFixed(1)}`
                        : `+${(((hierarchy[hom]?.performance - 1) || 0) * 100)?.toFixed(1)}`
                        }%
                    </span>
                  </div>
                </div>
              </div>
              
              {expandedLeaders[hierarchy[hom].userId] && hierarchy[hom].managers && (
                <div className={`space-y-1 ${selectionType === "checkbox" ? "" : "border-l-2 border-[#F9FAFB] ml-1"}`}>
                  {Object.keys(hierarchy[hom].managers).length > 0 ? (
                    Object.keys(hierarchy[hom].managers).reverse().map((manager: any) => (
                      <div key={manager.userId} className="px-1 hover:bg-[#F3F4F6] hover:rounded-r-[4px] transition-colors cursor-pointer">
                        <div className="flex flex-col w-full">
                          <div className="flex items-center justify-between w-full gap-1">
                            <div className="flex items-center gap-2 truncate">
                              <input
                                type="checkbox"
                                className="h-3 w-3 text-[#2563EB] rounded border-[#F9FAFB] focus:ring-[#F9FAFB]"
                                checked={filters.manager.includes(manager)}
                                onChange={(e) => handleFilters("manager", manager, e.target.checked)}
                                aria-label={`Select ${manager || 'manager'}`}
                                disabled={
                                  Object.keys(hierarchy[hom].managers).length == 1 ? true :
                                  filters.manager?.find((m: any) => m === manager) ? 
                                  hierarchy[hom].managers[manager].totalCampaigns === 0 : 
                                  !filters.manager?.find((m: any) => m === manager) ? true : false
                                }
                              /> 
                              <h3 className="font-medium text-[10px] text-[#111827] truncate">
                                {manager || 'Unnamed Manager'}
                              </h3>
                              <span className="text-[10px] text-[#6B7280]">
                                ({hierarchy[hom].managers[manager].totalCampaigns || 0})
                              </span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${(hierarchy[hom].managers[manager]?.performance || 0)> 1 ? "text-[#4DB37E]" : "text-[#EF4444]"}`}>
                                {hierarchy[hom].managers[manager]?.performance < 1 ? 
                                `-${((1 - hierarchy[hom].managers[manager]?.performance || 0) * 100)?.toFixed(1)}`
                                : `+${(((hierarchy[hom].managers[manager]?.performance - 1) || 0) * 100)?.toFixed(1)}`
                                }%
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="p-4 text-center text-sm text-[#6B7280]">
                      No managers assigned
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

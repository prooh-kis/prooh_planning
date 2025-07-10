import React, { useState } from "react";
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
  managerHierarchy: HOM[];
  coordinatorHierarchy?: any[];
}

type TeamHierarchyProps = {
  title: string;
  members: any[]; // Required prop for backward compatibility
  leaderRole: string;
  memberRole: string;
  selectedMembers: string[];
  // @ts-ignore - Using any to avoid unused parameter warnings
  onSelectMember: (memberId: any, selected: any) => void;
  orgLevelCampaignStatus?: OrgLevelCampaignStatus;
};

export const TeamHierarchy: React.FC<TeamHierarchyProps> = ({
  title,
  leaderRole: _leaderRole, // Prefix with _ to indicate it's intentionally unused
  memberRole: _memberRole, // Prefix with _ to indicate it's intentionally unused
  members,
  selectedMembers,
  onSelectMember,
  orgLevelCampaignStatus = { managerHierarchy: [], coordinatorHierarchy: [] } as OrgLevelCampaignStatus,
}) => {
  const [expandedLeaders, setExpandedLeaders] = useState<Record<string, boolean>>({});
  
  const toggleLeader = (leaderId: string) => {
    setExpandedLeaders(prev => ({
      ...prev,
      [leaderId]: !prev[leaderId]
    }));
  };

  // These props are intentionally unused but required by the component's interface
  // @ts-ignore - Intentionally unused variables
  const _unused = { _leaderRole, _memberRole, members, onSelectMember };
  void _unused; // Use void to satisfy linter
  
  // Handle member selection with proper typing
  const handleSelectMember = (memberId: string, selected: boolean) => {
    // @ts-ignore - We know the types are correct
    onSelectMember(memberId, selected);
  };

  // Process the hierarchy data based on team type
  const processHierarchy = (): HOM[] => {
    // For Coordination Team (HOC and Coordinators)
    if (title.toLowerCase().includes('coordination')) {
      if (!orgLevelCampaignStatus?.coordinatorHierarchy) return [];
      
      return orgLevelCampaignStatus.coordinatorHierarchy.map((hoc: any) => ({
        ...hoc,
        name: hoc.name || hoc.email?.split('@')[0] || 'HOC',
        isLeader: true,
        role: 'HOC',
        team: hoc.coordinators?.map((coord: any) => ({
          ...coord,
          totalCampaigns: coord.campaignCreations?.length || 0,
          name: coord.name || coord.email?.split('@')[0] || 'Coordinator',
        })) || [],
        totalCampaigns: (hoc.coordinators || []).reduce(
          (sum: number, coord: any) => sum + (coord.campaignCreations?.length || 0), 0
        ),
        performance: hoc.performance
      }));
    }
    
    // For Management Team (HOM, Managers, and their Coordinators)
    if (title.toLowerCase().includes('management')) {
      if (!orgLevelCampaignStatus?.managerHierarchy) return [];
      
      return orgLevelCampaignStatus.managerHierarchy.map((hom: HOM) => {
        const managers = hom.managers?.map((manager: Manager) => {
          // Include coordinators for each manager
          const coordinators = manager.coordinators?.map((coordinator: Coordinator) => ({
            ...coordinator,
            totalCampaigns: coordinator.campaignCreations?.length || 0,
            name: coordinator.name || coordinator.email?.split('@')[0] || 'Coordinator',
            performance: coordinator.performance
          })) || [];

          return {
            ...manager,
            name: manager.name || manager.email?.split('@')[0] || 'Manager',
            coordinators,
            // Calculate total campaigns for manager including coordinators
            totalCampaigns: (manager.totalCampaigns || 0) + 
              (coordinators.reduce((sum, coord) => sum + (coord.totalCampaigns || 0), 0)),
            performance: manager.performance
          };
        }) || [];

        // Calculate total campaigns for HOM including all managers and coordinators
        const totalCampaigns = managers.reduce((sum: number, manager: Manager) => {
          return sum + (manager.totalCampaigns || manager.totalCampaigns || 0);
        }, 0);

        return {
          ...hom,
          name: hom.name || hom.email?.split('@')[0] || 'HOM',
          isLeader: true,
          team: managers,
          totalCampaigns,
          role: 'HOM',
          performance: hom.performance
        };
      });
    }
    
    return [];
  };

  const hierarchy = processHierarchy();
  const totalMembers = hierarchy.reduce((sum, hom) => sum + (hom.team?.length || 0), 0);
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
        ({totalMembers})
        </span>
      </div>
      
      {hierarchy.length === 0 ? (
        <div className="text-center py-4 text-[#6B7280]">
          No managers data available
        </div>
      ) : (
        <div className="space-y-2 h-[30vh] overflow-y-auto no-scrollbar">
          {hierarchy.map((hom) => (
            <div key={hom.userId} className="border border-[#E5E7EB] rounded-lg overflow-hidden">
              <div 
                className="bg-[#F9FAFB] px-2 py-3 border-b border-[#E5E7EB] cursor-pointer hover:bg-[#F3F4F6] transition-colors"
                onClick={() => toggleLeader(hom.userId)}
              >
                <div className="flex flex-col items-start justify-between">
                  <div className="flex items-center">
                    {expandedLeaders[hom.userId] ? (
                      <DownOutlined className="mr-2 text-[#6B7280] text-xs" />
                    ) : (
                      <RightOutlined className="mr-2 text-[#6B7280] text-xs" />
                    )}
                    <span className="font-medium text-[12px] text-[#111827] truncate">
                      {hom.name} ({hom.role})
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="flex gap-1 text-xs px-2 py-0.5 rounded-full bg-[#EEF2FF] text-[#4338CA]">
                      <i className="fi fi-ss-user-gear flex items-center"></i>
                      {hom.team?.length || 0}           
                    </span>
                    <span className="flex gap-1 text-[10px] px-1.5 py-0.5 rounded-full bg-[#ECFDF5] text-[#065F46] border border-[#A7F3D0]">
                      <i className="fi fi-sr-megaphone flex items-center"></i>
                      {hom.totalCampaigns}
                    </span>
                    <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${(hom?.performance || 0) > 1 ? "bg-[#4DB37E30] text-[#4DB37E]" : "bg-[#EF444430] text-[#EF4444]"}`}>
                      {((hom?.performance || 0) * 100)?.toFixed(1) || 0}%
                    </span>
                  </div>
                </div>
              </div>
              
              {expandedLeaders[hom.userId] && hom.team && (
                <div className="divide-y divide-[#E5E7EB]">
                  {hom.team.length > 0 ? (
                    hom.team.map((manager) => (
                      <div key={manager.userId} className="px-2 py-2 hover:bg-[#F9FAFB] transition-colors">
                        <div className="flex flex-col w-full">
                          <div className="flex flex-col items-start justify-between w-full gap-1">
                            <div className="flex items-center gap-2">
                              <input
                                type="checkbox"
                                className="h-3 w-3 text-[#2563EB] rounded border-[#D1D5DB] focus:ring-[#3B82F6]"
                                checked={selectedMembers.includes(manager.userId)}
                                onChange={(e) => handleSelectMember(manager.userId, e.target.checked)}
                                aria-label={`Select ${manager.name || 'manager'}`}
                              />
                              <h3 className="font-medium text-[12px] text-[#111827] truncate">
                                {manager.name || 'Unnamed Manager'}
                              </h3>
                              <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${(manager?.performance || 0)> 1 ? "bg-[#4DB37E30] text-[#4DB37E]" : "bg-[#EF444430] text-[#EF4444]"}`}>
                                {((manager?.performance || 0) * 100)?.toFixed(1) || 0}%
                              </span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <span className="flex gap-1 text-xs px-2 py-0.5 rounded-full bg-[#ECFDF5] text-[#065F46] border border-[#A7F3D0]">
                                <i className="fi fi-sr-megaphone flex items-center"></i>
                                {manager.totalCampaigns || 0}
                              </span>
                              <span className="text-xs px-2 py-0.5 rounded-full bg-[#EFF6FF] text-[#1E40AF]">
                                {manager.role}
                              </span>
                            </div>
                          </div>
                          
                          {/* Coordinators section */}
                          {manager.coordinators && manager.coordinators.length > 0 && (
                            <div className="mt-2 border-t-2 border-l-2 border-[#E5E7EB] pl-2 py-1">
                              {manager.coordinators.map(coordinator => (
                                <div key={coordinator.userId} className="flex flex-col items-start justify-between py-1 gap-1 truncate">
                                  <div className="flex items-center gap-2 truncate">
                                    <input
                                      type="checkbox"
                                      className="h-3 w-3 text-[#2563EB] rounded border-[#D1D5DB] focus:ring-[#3B82F6]"
                                      checked={selectedMembers.includes(coordinator.userId)}
                                      onChange={(e) => handleSelectMember(coordinator.userId, e.target.checked)}
                                      aria-label={`Select ${coordinator.name || 'coordinator'}`}
                                    />
                                    <span className="text-xs text-[#4B5563] truncate">
                                      {coordinator.name || 'Unnamed Coordinator'}
                                    </span>
                                    <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${(coordinator?.performance || 0)> 1 ? "bg-[#4DB37E30] text-[#4DB37E]" : "bg-[#EF444430] text-[#EF4444]"}`}>
                                      {((coordinator?.performance || 0) * 100)?.toFixed(1) || 0}%
                                    </span>
                                  </div>
                                  <div className="flex items-center space-x-2">
                                    <span className="flex gap-1 text-[10px] px-1.5 py-0.5 rounded-full bg-[#ECFDF5] text-[#065F46] border border-[#A7F3D0]">
                                      <i className="fi fi-sr-megaphone flex items-center"></i>
                                      {coordinator.totalCampaigns || 0}
                                    </span>
                                    <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-[#EFF6FF] text-[#1E40AF] truncate">
                                      COORDINATOR
                                    </span>
                                  </div>
                                </div>
                              ))}
                            </div>
                          )}
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

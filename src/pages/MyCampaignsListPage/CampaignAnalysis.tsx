import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Loading } from "../../components/Loading";
import { message } from "antd";
import { CampaignAnalysisProps } from "./types";
import { TeamHierarchy } from "./TeamHierarchy";
import { AgencyWiseCampaigns } from "./AgencyWiseCampaigns";
import { VendorWiseCampaigns } from "./VendorWiseCampaigns";

export const CampaignAnalysis: React.FC<CampaignAnalysisProps> = ({
  userInfo,
  myOrg,
  loadingOrgLevelCampaignStatus,
  errorOrgLevelCampaignStatus,
  orgLevelCampaignStatus,
}) => {
  const dispatch = useDispatch<any>();
  const [selectedManagers, setSelectedManagers] = useState<string[]>([]);
  const [selectedCoordinators, setSelectedCoordinators] = useState<string[]>([]);

  const userOrgRole: string = myOrg?.officialMembers.find((member: any) => member.userId === userInfo._id)?.role || ""

  const handleSelectMember = (role: 'manager' | 'coordinator') => 
    (memberId: string, selected: boolean) => {
      if (role === 'manager') {
        setSelectedManagers(prev => 
          selected ? [...prev, memberId] : prev.filter(id => id !== memberId)
        );
      } else {
        setSelectedCoordinators(prev => 
          selected ? [...prev, memberId] : prev.filter(id => id !== memberId)
        );
      }
    };

  useEffect(() => {
    if (errorOrgLevelCampaignStatus) {
      message.error("Error in getting campaign status on organization level");
    }
  }, [errorOrgLevelCampaignStatus]);

  const officialMembers = myOrg?.officialMembers || [];

  if (loadingOrgLevelCampaignStatus) {
    return (
      <div className="flex justify-center py-8">
        <Loading />
      </div>
    );
  }

  console.log("userOrgRole", userOrgRole);
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 mr-2 gap-2">
      {["HOM", "ADMIN"].includes(userOrgRole)&& (
        <div className="md:col-span-1 ">
          <TeamHierarchy
            title="Management Team"
            members={officialMembers}
            leaderRole="HOM"
            memberRole="MANAGER"
            selectedMembers={selectedManagers}
            onSelectMember={handleSelectMember('manager')}
            orgLevelCampaignStatus={orgLevelCampaignStatus}
          />
        </div>
      )}

      {["HOC", "ADMIN"].includes(userOrgRole)&& (
        <div className="md:col-span-1">
          <TeamHierarchy
            title="Coordination Team"
            members={officialMembers}
            leaderRole="HOC"
            memberRole="COORDINATOR"
            selectedMembers={selectedCoordinators}
            onSelectMember={handleSelectMember('coordinator')}
            orgLevelCampaignStatus={orgLevelCampaignStatus}
          />
        </div>
      )}

      <div className="md:col-span-1">
        <AgencyWiseCampaigns
          title="Agencys"
          agencyWiseCampaigns={orgLevelCampaignStatus?.agencyWiseCampaigns}
        />
      </div>
      <div className="md:col-span-1">
        <VendorWiseCampaigns
          title="Vendors"
          vendorWiseCampaigns={orgLevelCampaignStatus?.vendorWiseCampaigns}
        />
      </div>

    </div>
  );
};
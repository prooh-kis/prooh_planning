import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getOrgLevelCampaignStatusAction } from "../../actions/organizationAction";
import { Loading } from "../../components/Loading";
import { message } from "antd";
import { CampaignAnalysisProps } from "./types";
import { TeamHierarchy } from "./TeamHierarchy";

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

  // useEffect(() => {
  //   if (userInfo?._id) {
  //     dispatch(getOrgLevelCampaignStatusAction({ id: userInfo._id }));
  //   }
  // }, [dispatch, userInfo]);

  const officialMembers = myOrg?.officialMembers || [];

  if (loadingOrgLevelCampaignStatus) {
    return (
      <div className="flex justify-center py-8">
        <Loading />
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 mr-2 gap-2">
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
    </div>
  );
};
export interface UserInfo {
  _id: string;
  name: string;
  email: string;
  role: string;
  // Add other user properties as needed
}

export interface OrganizationMember {
  userId: string;
  name: string;
  email: string;
  phone?: string;
  role: 'ADMIN' | 'HOM' | 'HOC' | 'MANAGER' | 'COORDINATOR' | string;
  avatar?: string;
  reportsTo?: string | null;
  workConnections?: string[];
}

export interface Organization {
  _id: string;
  officialMembers: OrganizationMember[];
  // Add other organization properties as needed
}

export interface CampaignAnalysisProps {
  userInfo: UserInfo;
  myOrg: Organization;
  loadingOrgLevelCampaignStatus: boolean;
  errorOrgLevelCampaignStatus: string;
  orgLevelCampaignStatus: any;
}

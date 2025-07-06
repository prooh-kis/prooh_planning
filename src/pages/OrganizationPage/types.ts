// src/pages/OrganizationPage/types/organization.types.ts
export interface Organization {
  _id?: string;
  officialName: string;
  officialLogo: string;
  officialEmail: string;
  officialPhone: string;
  officialWebsite: string;
  officialAddress: any;
  officialAdmin: any;
}

export type Role = 'ADMIN' | 'HOM' | 'HOC' | 'MANAGER' | 'COORDINATOR';

// Array of coordinator user IDs
export type WorkConnection = string[];

export interface Member {
  _id: string;
  userId?: any;
  name: string;
  email: string;
  phone?: string;
  avatar?: string;
  role: Role;
  status?: 'active' | 'inactive' | 'pending';
  reportsTo: string | null;
  workConnections?: WorkConnection; // Array of coordinator user IDs
}
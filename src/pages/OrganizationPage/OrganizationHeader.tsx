// src/pages/OrganizationPage/OrganizationHeader.tsx
import React from 'react';
import { Organization } from './types';
import { EditOutlined } from '@ant-design/icons';

interface OrganizationHeaderProps {
  organization: Organization;
  onEdit: () => void;
  userInfo?: any;
}

export const OrganizationHeader: React.FC<OrganizationHeaderProps> = ({ userInfo, organization, onEdit }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-[#E5E7EB] p-6 mb-8 relative">
      <button
        onClick={onEdit}
        className="absolute top-4 right-4 p-2 text-[#6B7280] hover:text-[#2563EB] transition-colors"
        aria-label="Edit organization details"
        title="Edit organization details"
      >
        <EditOutlined aria-hidden="true" />
        <span className="sr-only">Edit organization details</span>
      </button>
      <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
        <div className="w-24 h-24 rounded-full bg-[#F3F4F6] flex items-center justify-center overflow-hidden border-2 border-[#E5E7EB]">
          <img 
            src={organization?.officialLogo} 
            alt={`${organization?.officialName} logo`} 
            className="w-full h-full object-cover"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.onerror = null;
              target.src = "https://via.placeholder.com/150";
            }}
          />
        </div>
        <div className="flex-1">
          <h1 className="text-2xl font-bold text-[#111827] mb-2">
            {organization?.officialName}
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-[#4B5563]">
            <div className="flex items-start">
              <span className="mr-2">📧</span>
              <a 
                href={`mailto:${organization?.officialEmail}`} 
                className="hover:text-[#2563EB] transition-colors"
              >
                {organization?.officialEmail}
              </a>
            </div>
            <div className="flex items-start">
              <span className="mr-2">📞</span>
              <a 
                href={`tel:${organization?.officialPhone?.replace(/[^0-9+]/g, '')}`} 
                className="hover:text-[#2563EB] transition-colors"
              >
                {organization?.officialPhone}
              </a>
            </div>
            <div className="flex items-start">
              <span className="mr-2">📍</span>
              <span className="whitespace-pre-line">
                {organization?.officialWebsite}
              </span>
            </div>
            <div className="flex items-start">
              <span className="mr-2">📍</span>
              <span className="whitespace-pre-line">
                {organization?.officialAdmin.userId == userInfo?._id && "Admin View"}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

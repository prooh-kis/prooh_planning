// src/pages/OrganizationPage/MemberCard.tsx
import React from 'react';
import { Member, Role } from '../OrganizationPage/types';
import { 
  UserOutlined, 
  EditOutlined, 
  DeleteOutlined, 
  PlusOutlined,
  UserSwitchOutlined
} from '@ant-design/icons';

interface MemberCardProps {
  members?: Member[];
  member: Member;
  level?: number;
  isEditing: boolean;
  onEdit: (member: Member) => void;
  onDelete: (memberId: string) => void;
  getConnectedCoordinators: (member: Member) => Array<Member>;
}

export const MemberCard: React.FC<MemberCardProps> = ({
  member,
  members,
  level = 0,
  isEditing,
  onEdit,
  onDelete,
  getConnectedCoordinators,
}) => {
  const connectedCoordinators = member.role === 'MANAGER' ? getConnectedCoordinators(member) : [];
  const hasConnections = connectedCoordinators.length > 0;

  const renderRoleIcon = (role: Role) => {
    switch (role) {
      case 'ADMIN':
        return <UserSwitchOutlined className="text-[#2563EB]" />;
      case 'HOM':
      case 'HOC':
        return <UserSwitchOutlined className="text-[#16A34A]" />;
      default:
        return <UserOutlined className="text-[#4B5563]" />;
    }
  };

  return (
    <div className={`mb-4 ${level > 0 ? 'ml-4 mt-2' : ''}`}>
      <div className={`flex items-center p-4 bg-white rounded-lg shadow-sm border ${
        hasConnections ? 'border-[#BFDBFE]' : 'border-[#E5E7EB]'
      }`}>
        <div className="flex-shrink-0 mr-4">
          {renderRoleIcon(member.role)}
        </div>
        <div className="flex-1">
          <h3 className="font-medium text-gray-900">{member.name}</h3>
          <p className="text-sm text-gray-500">{member.email}</p>
          <span className="inline-block mt-1 px-2 py-1 text-xs font-semibold rounded-full bg-[#DBEAFE] text-[#1E40AF]">
            {member.role}
          </span>
        </div>
        {isEditing && (
          <div className="flex space-x-2">
            <button
              type="button"
              onClick={() => onEdit(member)}
              className="p-1 text-[#6B7280] hover:text-[#2563EB]"
              aria-label={`Edit ${member.name}`}
              title={`Edit ${member.name}`}
            >
              <EditOutlined style={{ fontSize: '16px' }} aria-hidden="true" />
              <span className="sr-only">Edit {member.name}</span>
            </button>
            <button
              type="button"
              onClick={() => onDelete(member.userId)}
              className="p-1 text-[#6B7280] hover:text-[#DC2626]"
              aria-label={`Delete ${member.name}`}
              title={`Delete ${member.name}`}
            >
              <DeleteOutlined style={{ fontSize: '16px' }} aria-hidden="true" />
              <span className="sr-only">Delete {member.name}</span>
            </button>
          </div>
        )}
      </div>

      {/* Team Members */}
      {member.workConnections && member.workConnections.length > 0 && (
        <div className="mt-2 border-l-2 border-gray-200 pl-4">
          {members?.filter((m: Member) => member.workConnections?.includes(m.userId)).map((teamMember: Member) => (
            <MemberCard
              key={teamMember.userId}
              member={teamMember}
              level={level + 1}
              isEditing={isEditing}
              onEdit={onEdit}
              onDelete={onDelete}
              getConnectedCoordinators={getConnectedCoordinators}
            />
          ))}
        </div>
      )}

      {/* {member.role === 'MANAGER' && connectedCoordinators.length > 0 && (
        <div className="mt-4 ml-4">
          <div className="text-xs font-medium text-gray-500 mb-2 flex items-center">
            <span className="w-4 h-px bg-gray-300 mr-2"></span>
            Works with Coordinators:
          </div>
          <div className="space-y-3">
            {connectedCoordinators.map(coordinator => (
              <div 
                key={coordinator.userId} 
                className="ml-4 p-3 bg-[#EFF6FF] rounded-lg border border-[#BFDBFE]"
              >
                <div className="flex items-center">
                  <UserOutlined className="text-[#2563EB] mr-2" />
                  <span className="font-medium">{coordinator.name}</span>
                  <span className="text-sm text-gray-500 ml-2">
                    ({coordinator.email})
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )} */}
    </div>
  );
};

// src/pages/OrganizationPage/page.tsx
'use client';

import React, { useState, useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createNewOrgAction, getMyOrgDetailsAction } from '../../actions/organizationAction';
import {OrganizationHeader} from './OrganizationHeader';
import {MemberCard} from './MemberCard';
import {OrganizationModal} from './OrganizationModal';
import { Organization, Member, Role } from './types';
import { MemberModal } from './MemberModal';
import { PlusOutlined, TeamOutlined, UserAddOutlined } from '@ant-design/icons';
import { CreateOrgModal } from './CreateOrgModal';
import { MembersTable } from './MembersTable';
import { AddMemberModal } from './AddMemberModal';
import { Button, message } from 'antd';
import { GET_MY_ORG_DETAILS_RESET } from '../../constants/organizationConstants';


const initialOrg: Organization = {
  officialName: "PROOH",
  officialLogo: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse3.mm.bing.net%2Fth%3Fid%3DOIP.c6ASmT7d2qYobP4OPwAxVgAAAA%26pid%3DApi&f=1",
  officialEmail: "contact@prooh.ai",
  officialPhone: "+1 (555) 123-4567",
  officialAddress: {},
  officialWebsite: "https://prooh.ai",
  officialAdmin: {},
};

const initialMembers: Member[] = [
  // ... (your existing members data)
];

export const OrganizationPage: React.FC = () => {
  const dispatch = useDispatch<any>();

  const [isEditing, setIsEditing] = useState(false);
  const [members, setMembers] = useState<Member[]>(initialMembers);
  const [editingMember, setEditingMember] = useState<Partial<Member> | null>(null);
  
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [createOrgError, setCreateOrgError] = useState<string | null>(null);

  const [organization, setOrganization] = useState<Organization>(initialOrg);
  const [editingOrg, setEditingOrg] = useState<Organization | null>(null);
  const [showOrgModal, setShowOrgModal] = useState(false);
  const [showAddMemberModal, setShowAddMemberModal] = useState(false);


  const { userInfo } = useSelector((state: any) => state.auth);
  const {
    loading: loadingMyOrg,
    error: errorMyOrg,
    data: myOrg
  } = useSelector((state: any) => state.myOrgDetailsGet);

  const {
    loading: loadingCreateOrg,
    error: errorCreateOrg,
    success: successCreateOrg
  } = useSelector((state: any) => state.myOrgCreate);

  const getConnectedMembers = useCallback((member: Member) => {
    if (!member.workConnections || member.workConnections.length === 0) return [];
    
    // Return coordinator members that are in the workConnections array
    return members.filter(m => 
      m.role === 'COORDINATOR' && 
      member.workConnections?.includes(m._id)
    );
  }, [members]);

  const handleSaveMember = (updatedMember: Member) => {
    // If role is being changed, update the reportsTo field accordingly
    const existingMember = members.find(m => m._id === updatedMember._id);
    
    if (existingMember && existingMember.role !== updatedMember.role) {
      // Role has changed, update reportsTo based on new role
      if (updatedMember.role === 'MANAGER') {
        // Find HOM to report to
        const hom = members.find(m => m.role === 'HOM');
        updatedMember.reportsTo = hom?._id || null;
        // Clear work connections if role changed to MANAGER
        updatedMember.workConnections = [];
      } else if (updatedMember.role === 'COORDINATOR') {
        // Find HOC to report to
        const hoc = members.find(m => m.role === 'HOC');
        updatedMember.reportsTo = hoc?._id || null;
      } else if (updatedMember.role === 'HOM' || updatedMember.role === 'HOC') {
        // HOM and HOC don't report to anyone
        updatedMember.reportsTo = null;
      }
    }

    setMembers(prevMembers => 
      prevMembers.map(member => 
        member._id === updatedMember._id ? { ...member, ...updatedMember } : member
      )
    );
    
    // Update in the organization
    const updatedMembers = members.map(member => 
      member._id === updatedMember._id ? { ...member, ...updatedMember } : member
    );
    
    dispatch(createNewOrgAction({
      id: organization._id,
      officialName: organization.officialName,
      officialMembers: updatedMembers
    }));
    
    setEditingMember(null);
  };

  const handleAddNewMember = (newMember: Omit<Member, 'id' | 'reportsTo' | 'workConnections'>) => {
    // Determine reportsTo based on role
    let reportsTo = null;
    
    if (newMember.role === 'MANAGER') {
      // Find HOM to report to
      const hom = members.find(m => m.role === 'HOM');
      if (hom) {
        reportsTo = hom._id;
      }
    } else if (newMember.role === 'COORDINATOR') {
      // Find HOC to report to
      const hoc = members.find(m => m.role === 'HOC');
      if (hoc) {
        reportsTo = hoc._id;
      }
    }
    
    // Initialize workConnections as an empty array
    const workConnections: string[] = [];

    const memberWithId: Member = {
      ...newMember,
      userId: newMember.userId,
      reportsTo,
      workConnections,
    };
    
    setMembers(prevMembers => [...prevMembers, memberWithId]);
    dispatch(createNewOrgAction({
      id: organization._id,
      userId: memberWithId.userId,
      officialName: organization.officialName,
      officialMembers: [...members, memberWithId]
    }));
    setShowAddMemberModal(false);
    message.success(`${newMember.name} has been added to the organization`);
  };

  const handleDeleteMember = (memberId: string) => {
    const memberToDelete = members.find(m => m._id === memberId);
    
    if (!memberToDelete) return;

    // If the member being deleted is a manager, clean up work connections
    let updatedMembers = [...members];
    
    if (memberToDelete.role === 'MANAGER') {
      // Remove this manager's ID from any work connections
      updatedMembers = members.map(member => {
        if (member.workConnections) {
          return {
            ...member,
            workConnections: member.workConnections.filter(
              coordinatorId => coordinatorId !== memberId
            )
          };
        }
        return member;
      });
    }
    
    // Remove the member
    updatedMembers = updatedMembers.filter(member => member._id !== memberId);
    
    // If the deleted member was a HOM or HOC, update reportsTo for their direct reports
    if (memberToDelete.role === 'HOM' || memberToDelete.role === 'HOC') {
      const roleToUpdate = memberToDelete.role === 'HOM' ? 'MANAGER' : 'COORDINATOR';
      updatedMembers = updatedMembers.map(member => {
        if (member.role === roleToUpdate && member.reportsTo === memberId) {
          return { ...member, reportsTo: null };
        }
        return member;
      });
    }
    
    setMembers(updatedMembers);
    
    // Update in the organization
    dispatch(createNewOrgAction({
      id: organization._id,
      officialName: organization.officialName,
      officialMembers: updatedMembers
    }));
  };


  const handleCreateOrganization = (orgData: {
    officialName: string;
    officialEmail: string;
    officialPhone: string;
    officialWebsite: string;
  }) => {
    try {
      setCreateOrgError(null);
      dispatch(
        createNewOrgAction({
          ...orgData,
          officialAdmin: {
            userId: userInfo?._id,
            name: userInfo?.name,
            email: userInfo?.email,
            phone: userInfo?.phone
          },
          userId: userInfo?._id
        })
      );

      // Refresh organization data after creation
      if (userInfo?._id) {
        dispatch(getMyOrgDetailsAction({ id: userInfo._id }));
      }
      setShowCreateModal(false);
    } catch (error: any) {
      setCreateOrgError(error.message || 'Failed to create organization');
    }
  };


  const handleEditOrg = () => {
    setEditingOrg({ ...organization });
    setShowOrgModal(true);
  };

  const handleSaveOrg = (updatedOrg: Organization) => {
    setOrganization(updatedOrg);
    setShowOrgModal(false);
  };



  useEffect(() => {
    if (errorCreateOrg) {
      message.error(errorCreateOrg);
    }
  }, [errorCreateOrg])

  useEffect(() => {
    if (myOrg) {
      setOrganization(myOrg);
      setMembers(myOrg.officialMembers)
      dispatch({
        type: GET_MY_ORG_DETAILS_RESET
      })
    }
  },[myOrg, dispatch]);

  // Fetch organization data on mount
  useEffect(() => {
    if (successCreateOrg) {
      message.info("Organization updated successfully");
      dispatch(getMyOrgDetailsAction({ id: userInfo?._id }));
    }
    if (userInfo?._id) {
      dispatch(getMyOrgDetailsAction({id: userInfo?._id}));
    }
  }, [dispatch, userInfo?._id, successCreateOrg]);

  return (
    <React.Fragment>
      <div className="min-h-screen bg-gray-50">
        <CreateOrgModal
          isOpen={showCreateModal}
          onClose={() => {
            setShowCreateModal(false);
            setCreateOrgError(null);
          }}
          onSubmit={handleCreateOrganization}
          loading={loadingMyOrg}
          error={createOrgError}
        />
      {loadingMyOrg && (
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#3B82F6] mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading organization data...</p>
          </div>
        </div>
      )}
      
      {errorMyOrg ? (
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center p-6 max-w-md mx-auto bg-red-50 rounded-lg">
            <div className="text-red-500 mb-4">
              <svg
                className="w-12 h-12 mx-auto"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
            </div>
            <h2 className="text-xl font-semibold text-gray-800 mb-2">Error Loading Organization</h2>
            <p className="text-gray-600 mb-6">{errorMyOrg}</p>
            <button
              onClick={() => errorMyOrg === "Organization not found" ? setShowCreateModal(true) : window.location.reload()}
              className="px-4 py-2 bg-[#3B82F6] text-white rounded-md hover:bg-[#3B82F670] transition-colors"
            >
              {errorMyOrg === "Organization not found" ? "Create Organization" : "Try Again"}
            </button>
          </div>
        </div>
      ) : !myOrg && !loadingMyOrg && !organization && !members && (
        <div className="flex flex-col items-center justify-center min-h-screen p-6">
          <div className="text-center max-w-md">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg
                className="w-12 h-12 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">No Organization Found</h2>
            <p className="text-gray-600 mb-6">
              {"You don't have an organization set up yet. Create one to get started with managing your team."}
            </p>
            <button
              type="button"
              title="Create Organization"
              onClick={() => setShowCreateModal(true)}
              className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors flex items-center mx-auto"
            >
              <PlusOutlined className="mr-2" />
              Create Organization
            </button>
          </div>
        </div>
      )}
      <div className="container mx-auto p-6">
        <OrganizationHeader 
          organization={organization} 
          onEdit={handleEditOrg} 
          userInfo={userInfo}
        />

        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-[#1F2937]">Organization Structure</h2>
          <button
            onClick={() => setIsEditing(!isEditing)}
            className={`px-4 py-2 rounded-md ${
              isEditing 
                ? 'bg-[#FEE2E2] text-[#B91C1C] hover:bg-[#FECACA]' 
                : 'bg-[#DBEAFE] text-[#1D4ED8] hover:bg-[#BFDBFE]'
            } transition-colors`}
          >
            {isEditing ? 'Cancel' : 'Edit Structure'}
          </button>
        </div>

        <div className="bg-[#F9FAFB] p-6 rounded-lg">
          {members
            .filter(m => m.role === 'ADMIN')
            .map(member => (
              <MemberCard
                key={member._id}
                member={member}
                members={members}
                level={0}
                isEditing={isEditing}
                onEdit={setEditingMember}
                onDelete={handleDeleteMember}
                getConnectedCoordinators={getConnectedMembers}
              />
            ))}
          
          {/* Teams sections */}
          <div className="grid grid-cols-1 gap-6 mt-6">
            {/* HOM and Managers Section */}
            <div className="bg-white p-4 rounded-lg border border-[#E5E7EB]">
              <h3 className="text-lg font-semibold mb-4 text-center text-[#2563EB]">Managers Team</h3>
              
              {/* Show MANAGERs without reportsTo at the top */}
              {members
                .filter(member => member.role === 'MANAGER' && !member.reportsTo)
                .map(manager => (
                  <div key={manager._id} className="mb-4">
                    <MemberCard
                      member={manager}
                      members={members}
                      level={0}
                      isEditing={isEditing}
                      onEdit={setEditingMember}
                      onDelete={handleDeleteMember}
                      getConnectedCoordinators={getConnectedMembers}
                    />
                    {/* Show connected coordinators */}
                    <div className="ml-8 mt-2">
                      {manager.workConnections?.map((coordinatorId, index) => {
                        const coordinator = members.find(m => 
                          m.role === 'COORDINATOR' && 
                          m._id === coordinatorId
                        );
                        return coordinator ? (
                          <div key={`${manager._id}-${index}`} className="mt-2">
                            <MemberCard
                              member={coordinator}
                              members={members}
                              level={1}
                              isEditing={isEditing}
                              onEdit={setEditingMember}
                              onDelete={handleDeleteMember}
                              getConnectedCoordinators={getConnectedMembers}
                            />
                          </div>
                        ) : null;
                      })}
                    </div>
                  </div>
                ))}
              
              {/* Show HOM and their direct reports */}
              {members
                ?.filter(member => member.role === 'HOM')
                ?.map(hom => (
                  <div key={hom._id}>
                    <MemberCard
                      member={hom}
                      members={members}
                      level={0}
                      isEditing={isEditing}
                      onEdit={setEditingMember}
                      onDelete={handleDeleteMember}
                      getConnectedCoordinators={getConnectedMembers}
                    />
                    <div className="ml-8 mt-2">
                      {members
                        .filter(member => member.reportsTo === hom._id && member.role === 'MANAGER')
                        .map(manager => (
                          <div key={manager._id} className="mt-2">
                            <MemberCard
                              member={manager}
                              members={members}
                              level={1}
                              isEditing={isEditing}
                              onEdit={setEditingMember}
                              onDelete={handleDeleteMember}
                              getConnectedCoordinators={getConnectedMembers}
                            />
                            {/* Show connected coordinators */}
                            {manager.workConnections?.map((coordinatorId, index) => {
                              const coordinator = members.find(m => 
                                m.role === 'COORDINATOR' && 
                                m._id === coordinatorId
                              );
                              return coordinator ? (
                                <div key={`${manager._id}-${index}`} className="ml-8 mt-2">
                                  <MemberCard
                                    member={coordinator}
                                    members={members}
                                    level={2}
                                    isEditing={isEditing}
                                    onEdit={setEditingMember}
                                    onDelete={handleDeleteMember}
                                    getConnectedCoordinators={getConnectedMembers}
                                  />
                                </div>
                              ) : null;
                            })}
                          </div>
                        ))}
                    </div>
                  </div>
                ))}
            </div>
            
            {/* HOC and Coordinators Section */}
            <div className="bg-white p-4 rounded-lg border border-[#E5E7EB]">
              <h3 className="text-lg font-semibold mb-4 text-center text-[#16A34A]">Coordinators Team</h3>
              {members
                .filter(member => member.role === 'HOC')
                .map(hoc => (
                  <div key={hoc._id}>
                    <MemberCard
                      member={hoc}
                      members={members}
                      level={0}
                      isEditing={isEditing}
                      onEdit={setEditingMember}
                      onDelete={handleDeleteMember}
                      getConnectedCoordinators={getConnectedMembers}
                    />
                    <div className="ml-8 mt-2">
                      {members
                        .filter(member => member.reportsTo === hoc._id && member.role === 'COORDINATOR')
                        .map(coordinator => (
                          <MemberCard
                            key={coordinator._id}
                            member={coordinator}
                            members={members}
                            level={1}
                            isEditing={isEditing}
                            onEdit={setEditingMember}
                            onDelete={handleDeleteMember}
                            getConnectedCoordinators={getConnectedMembers}
                          />
                        ))}
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>

        {/* Members Table Section */}
        <div className="mt-8 bg-white p-6 rounded-lg shadow">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center">
              <TeamOutlined className="text-2xl text-blue-600 mr-3" />
              <h2 className="text-2xl font-semibold text-gray-800">All Organization Members</h2>
            </div>
            <Button 
              type="primary" 
              icon={<UserAddOutlined />}
              onClick={() => setShowAddMemberModal(true)}
            >
              Add Member
            </Button>
          </div>
          <MembersTable 
            members={members} 
            loading={loadingMyOrg || loadingCreateOrg} 
            onRoleUpdate={async (userId: string, newRole: Role) => {
              const memberWithId: any = members.find((member) => member.userId === userId)
              dispatch(createNewOrgAction({    
                id: organization._id,
                userId: memberWithId.userId,
                officialName: organization.officialName,
                officialMembers: [...members.filter((member: any) => member.userId !== userId), {...memberWithId, role: newRole}]
              }));
            }}
          />
        </div>
      </div>

      {showOrgModal && editingOrg && (
          <OrganizationModal
            organization={editingOrg}
            onClose={() => setShowOrgModal(false)}
            onSave={handleSaveOrg}
          />
        )}

        {editingMember && (
          <MemberModal
            member={editingMember}
            onClose={() => setEditingMember(null)}
            onSave={handleSaveMember}
            members={members}
          />
        )}
      </div>

      {showAddMemberModal && (
        <AddMemberModal
          visible={showAddMemberModal}
          onClose={() => setShowAddMemberModal(false)}
          onAddMember={handleAddNewMember}
          existingMembers={members}
        />
      )}
    </React.Fragment>
  );
};

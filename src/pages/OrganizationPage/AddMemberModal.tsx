import React, { useState, useEffect, useCallback } from 'react';
import { Modal, Input, List, Avatar, Button, message, Tag } from 'antd';
import { SearchOutlined, UserAddOutlined } from '@ant-design/icons';
import type { Member } from './types';
import { useDispatch } from 'react-redux';
import { getAllUserList, getUserList } from '../../actions/userAction';
import { useSelector } from 'react-redux';

interface AddMemberModalProps {
  visible: boolean;
  onClose: () => void;
  onAddMember: (newMember: Omit<Member, 'id' | 'reportsTo'>) => void;
  existingMembers: Member[];
}

export const AddMemberModal: React.FC<AddMemberModalProps> = ({
  visible,
  onClose,
  onAddMember,
  existingMembers,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<Array<Omit<Member, 'id' | 'reportsTo'>>>([]);
  const [selectedRole, setSelectedRole] = useState<Member['role']>('COORDINATOR');
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch<any>();

  const { loading: loadingAllUsers, error: errorAllUsers, data: allUsers } = useSelector((state: any) => state.allUserList);

  // Search function to filter users
  const searchUsers = useCallback(async (query: string, allUsers: any) => {
    if (!query.trim()) {
      setSearchResults([]);
      return;
    }

    setLoading(true);
    try {
      if (!allUsers) {
        setSearchResults([]);
        return;
      }

      const searchTerm = query.toLowerCase();
      console.log(searchTerm)
      // Filter users based on search query (name or email)
      const filteredUsers = allUsers.filter((user: any) => 
        user.name.toLowerCase().includes(searchTerm) || 
        user.email.toLowerCase().includes(searchTerm)
      );

      console.log(filteredUsers);
      // Map to Member type and filter out existing members
      const results: Array<Omit<Member, 'id' | 'reportsTo'>> = filteredUsers
        .filter((user: any) => 
          !existingMembers.some((m: Member) => m.email === user.email)
        )
        .map((user: any) => ({
          name: user.name,
          email: user.email,
          role: user.userRole,
          avatar: user.avatar,
          phone: user.phone || '',
          status: 'active' as const,
          userId: user._id
        }));

      setSearchResults(results);
    } catch (error) {
      message.error('Failed to search users');
    } finally {
      setLoading(false);
    }
  }, [existingMembers]);

  useEffect(() => {
  
    if (allUsers) {
      console.log(allUsers);
      searchUsers(searchTerm, allUsers);
    }
  }, [searchTerm, searchUsers]);

  useEffect(() => {
    dispatch(getAllUserList());
  },[dispatch]);

  const handleAddMember = (user: Omit<Member, 'id' | 'reportsTo'>) => {
    console.log(user)
    onAddMember({
      ...user,
      role: selectedRole,
    });
    setSearchTerm('');
    setSearchResults([]);
  };

  const roleOptions: { label: string; value: Member['role'] }[] = [
    { label: 'Coordinator', value: 'COORDINATOR' },
    { label: 'Manager', value: 'MANAGER' },
    // { label: 'Admin', value: 'ADMIN' },
    { label: 'Manager Head', value: 'HOM' },
    { label: 'Coordinator Head', value: 'HOC' },
  ];

  return (
    <Modal
      title={
        <div className="flex items-center">
          <UserAddOutlined className="mr-2" />
          Add Team Member
        </div>
      }
      open={visible}
      onCancel={onClose}
      footer={null}
      width={600}
      className="add-member-modal"
    >
      <div className="mb-4">
        <div className="flex items-center mb-4">
          <SearchOutlined className="text-gray-400 mr-2" />
          <Input
            placeholder="Search by name or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1"
            autoFocus
          />
        </div>

        <div className="mb-4">
          <span className="mr-2 font-medium">Role:</span>
          {roleOptions.map((option) => (
            <Tag
              key={option.value}
              color={selectedRole === option.value ? 'blue' : 'default'}
              onClick={() => setSelectedRole(option.value)}
              className="cursor-pointer px-3 py-1 text-sm"
            >
              {option.label}
            </Tag>
          ))}
        </div>
      </div>

      {loading || loadingAllUsers ? (
        <div className="text-center py-4">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-2 text-gray-600">Searching...</p>
        </div>
      ) : searchTerm && searchResults.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          No users found. Try a different search term.
        </div>
      ) : (
        <List
          itemLayout="horizontal"
          dataSource={searchResults}
          renderItem={(user, index) => (
            <List.Item
              key={user.email || `user-${index}`}
              actions={[
                <Button
                  key="add"
                  type="primary"
                  size="small"
                  onClick={() => handleAddMember(user)}
                >
                  Add
                </Button>,
              ]}
              className="hover:bg-gray-50 px-4 py-3 rounded"
            >
              <List.Item.Meta
                avatar={
                  <Avatar src={user.avatar} icon={<UserAddOutlined />} />
                }
                title={
                  <div className="font-medium">
                    {user.name}
                    <Tag color="blue" className="ml-2">
                      {user.role}
                    </Tag>
                  </div>
                }
                description={
                  <div className="text-gray-600">
                    <div>{user.email}</div>
                    {user.phone && <div>{user.phone}</div>}
                  </div>
                }
              />
            </List.Item>
          )}
        />
      )}
    </Modal>
  );
};

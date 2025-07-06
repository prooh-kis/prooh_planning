import React from 'react';
import { Table, Tag, Avatar, Space, Select } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { UserOutlined, MailOutlined, PhoneOutlined } from '@ant-design/icons';
import { Member, Role } from './types';

const { Option } = Select;

interface MembersTableProps {
  members: Member[];
  loading?: boolean;
  onRoleUpdate?: (userId: string, newRole: Role) => Promise<void>;
  currentUserRole?: Role;
}

export const MembersTable: React.FC<MembersTableProps> = ({ 
  members, 
  loading = false, 
  onRoleUpdate,
  currentUserRole = 'ADMIN' // Default to ADMIN if not provided
}) => {
  console.log(members);
  const getRoleColor = (role: string) => {
    switch (role) {
      case 'ADMIN':
        return 'red';
      case 'HOM': // Manager
        return 'blue';
      case 'HOC': // Coordinator
        return 'green';
      default:
        return 'default';
    }
  };
  const columns: ColumnsType<Member> = [
    {
      title: 'Member',
      dataIndex: 'name',
      key: 'name',
      render: (_, record) => (
        <Space>
          <Avatar 
            src={record.avatar} 
            icon={<UserOutlined />} 
            style={{ backgroundColor: '#1890ff' }} 
          />
          <span>{record.name}</span>
        </Space>
      ),
    },
    {
      title: 'Role',
      dataIndex: 'role',
      key: 'role',
      render: (role) => (
        <Tag color={getRoleColor(role)}>
          {role}
        </Tag>
      ),
      filters: [
        { text: 'Admin', value: 'ADMIN' },
        { text: 'Manager', value: 'HOM' },
        { text: 'Coordinator', value: 'HOC' },
      ],
      onFilter: (value, record) => record.role === value,
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      render: (email) => (
        <Space>
          <MailOutlined />
          <a href={`mailto:${email}`}>{email}</a>
        </Space>
      ),
    },
    {
      title: 'Phone',
      dataIndex: 'phone',
      key: 'phone',
      render: (phone) => (
        phone ? (
          <Space>
            <PhoneOutlined />
            <a href={`tel:${phone}`}>{phone}</a>
          </Space>
        ) : 'N/A'
      ),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Space size="middle">
          {currentUserRole === 'ADMIN' && (
            <Select
              defaultValue={record.role}
              style={{ width: 120 }}
              onChange={(value: Role) => onRoleUpdate?.(record.userId || record._id, value)}
              disabled={record.role === 'ADMIN'}
            >
              {/* <Option value="ADMIN">Admin</Option> */}
              <Option value="HOM">Manager Head</Option>
              <Option value="HOC">Coordinator Head</Option>
              <Option value="MANAGER">Manager</Option>
              <Option value="COORDINATOR">Coordinator</Option>

            </Select>
          )}
        </Space>
      ),
    },
  ];

  return (
    <div key="members-table-container" className="mt-8">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">All Members</h2>
      <Table 
        key="members-table"
        columns={columns} 
        dataSource={members}
        rowKey={(record) => record._id || record.userId || `user-${Math.random().toString(36).substr(2, 9)}`}
        loading={loading}
        pagination={{ pageSize: 10 }}
      />
    </div>
  );
};

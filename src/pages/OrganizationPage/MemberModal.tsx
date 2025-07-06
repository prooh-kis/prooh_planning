// src/pages/OrganizationPage/MemberModal.tsx
import React, { useState } from 'react';
import { Member, Role } from './types';
import { CloseOutlined } from '@ant-design/icons';

interface MemberModalProps {
  member: Partial<Member>;
  members: Member[];
  onClose: () => void;
  onSave: (member: Member) => void;
}

export const MemberModal: React.FC<MemberModalProps> = ({ 
  member, 
  members,
  onClose, 
  onSave 
}) => {
  const [formData, setFormData] = useState<Partial<Member>>(member);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name?.trim()) newErrors.name = 'Name is required';
    if (!formData.email?.trim()) newErrors.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }
    if (!formData.role) newErrors.role = 'Role is required';
    return newErrors;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validateForm();
    
    if (Object.keys(validationErrors).length === 0) {
      onSave(formData as Member);
    } else {
      setErrors(validationErrors);
    }
  };

  const availableRoles: Role[] = ['ADMIN', 'HOM', 'HOC', 'MANAGER', 'COORDINATOR'];
  const availableManagers = members.filter(m => 
    ['ADMIN', 'HOM', 'HOC'].includes(m.role)
  );

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-medium">
            {member._id?.startsWith('new') ? 'Add New' : 'Edit'} Team Member
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
            aria-label="Close"
          >
            <CloseOutlined />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Role *
            </label>
            <select
              title="Select role"
              name="role"
              value={formData.role || ''}
              onChange={handleChange}
              className={`w-full p-2 border rounded-md ${
                errors.role ? 'border-red-500' : 'border-gray-300'
              }`}
            >
              <option value="">Select a role</option>
              {availableRoles.map(role => (
                <option key={role} value={role}>
                  {role}
                </option>
              ))}
            </select>
            {errors.role && (
              <p className="mt-1 text-sm text-red-600">{errors.role}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Reports To
            </label>
            <select
              title="Select reports to"
              name="reportsTo"
              value={formData.reportsTo || ''}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md"
            >
              <option value="">Select a manager</option>
              {availableManagers.map(m => (
                <option key={m._id} value={m._id}>
                  {m.name} ({m.role})
                </option>
              ))}
            </select>
          </div>

          <div className="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-primaryButton text-white rounded-md hover:bg-blue-700"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

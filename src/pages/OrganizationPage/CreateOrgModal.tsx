// src/pages/OrganizationPage/CreateOrgModal.tsx
import React, { useState } from 'react';
import { CloseOutlined } from '@ant-design/icons';

interface CreateOrgModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (orgData: {
    officialName: string;
    officialEmail: string;
    officialPhone: string;
    officialWebsite: string;
  }) => void;
  loading?: boolean;
  error?: string | null;
}

export const CreateOrgModal: React.FC<CreateOrgModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  loading = false,
  error = null
}) => {
  const [formData, setFormData] = useState({
    officialName: '',
    officialEmail: '',
    officialPhone: '',
    officialWebsite: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg w-full max-w-md">
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-xl font-semibold text-[#1F2937]">Create New Organization</h2>
          <button
            type="button"
            title="Close"
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
            disabled={loading}
          >
            <CloseOutlined />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {error && (
            <div className="p-3 bg-red-50 text-red-700 rounded-md text-sm">
              {error}
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-[#374151] mb-1">
              Organization Name *
            </label>
            <input
              type="text"
              name="officialName"
              value={formData.officialName}
              onChange={handleChange}
              required
              className="w-full p-2 border border-[#D1D5DB] rounded-md focus:ring-2 focus:ring-[#3B82F6] focus:border-transparent"
              placeholder="Enter organization name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[#374151] mb-1">
              Official Email *
            </label>
            <input
              type="email"
              name="officialEmail"
              value={formData.officialEmail}
              onChange={handleChange}
              required
              className="w-full p-2 border border-[#D1D5DB] rounded-md focus:ring-2 focus:ring-[#3B82F6] focus:border-transparent"
              placeholder="contact@example.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[#374151] mb-1">
              Phone Number *
            </label>
            <input
              type="tel"
              name="officialPhone"
              value={formData.officialPhone}
              onChange={handleChange}
              required
              className="w-full p-2 border border-[#D1D5DB] rounded-md focus:ring-2 focus:ring-[#3B82F6] focus:border-transparent"
              placeholder="+1 (555) 123-4567"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[#374151] mb-1">
              Website
            </label>
            <input
              type="url"
              name="officialWebsite"
              value={formData.officialWebsite}
              onChange={handleChange}
              className="w-full p-2 border border-[#D1D5DB] rounded-md focus:ring-2 focus:ring-[#3B82F6] focus:border-transparent"
              placeholder="https://example.com"
            />
          </div>

          <div className="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="px-4 py-2 border border-[#D1D5DB] text-[#374151] rounded-md hover:bg-[#F3F4F6] disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 bg-[#3B82F6] text-white rounded-md hover:bg-[#2563EB] disabled:opacity-50 flex items-center"
            >
              {loading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Creating...
                </>
              ) : 'Create Organization'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
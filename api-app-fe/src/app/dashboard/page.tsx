'use client';

import { useState, useEffect } from 'react';
import { EyeIcon, ClipboardIcon, PencilIcon, TrashIcon, PlusIcon } from '@heroicons/react/24/outline';
import { HomeIcon, UserIcon, BeakerIcon, DocumentTextIcon, CodeBracketIcon, BookOpenIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';
import Link from 'next/link';
import { supabase, ApiKey } from '@/lib/supabase';
import DashboardLayout from '@/components/DashboardLayout';

interface CreateKeyModal {
  isOpen: boolean;
  name: string;
  type: 'production' | 'development';
  limit: number;
}

export default function Dashboard() {
  const [apiKeys, setApiKeys] = useState<ApiKey[]>([]);
  const [createModal, setCreateModal] = useState<CreateKeyModal>({
    isOpen: false,
    name: '',
    type: 'development',
    limit: 1000
  });
  const [isCreating, setIsCreating] = useState(false);
  const [editingKey, setEditingKey] = useState<{ id: string; name: string } | null>(null);
  const [editName, setEditName] = useState('');
  const [showKey, setShowKey] = useState<string | null>(null);
  const [nameError, setNameError] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [toast, setToast] = useState<{ message: string; visible: boolean; type: 'success' | 'error' }>({
    message: '',
    visible: false,
    type: 'success'
  });

  // Load API keys on mount
  useEffect(() => {
    loadApiKeys();
  }, []);

  const loadApiKeys = async () => {
    try {
      console.log('Loading API keys...');
      const { data, error } = await supabase
        .from('api_keys')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Supabase error:', error);
        setError(error.message);
        throw error;
      }
      
      console.log('Loaded API keys:', data);
      setApiKeys(data || []);
      setError(null);
    } catch (error) {
      console.error('Error loading API keys:', error);
      setError(error instanceof Error ? error.message : 'Failed to load API keys');
    }
  };

  const showToast = (message: string, type: 'success' | 'error' = 'success') => {
    setToast({ message, visible: true, type });
    setTimeout(() => {
      setToast(prev => ({ ...prev, visible: false }));
    }, 2000);
  };

  const handleCreateKey = async () => {
    if (!createModal.name.trim()) {
      setNameError('Name is required');
      return;
    }
    
    // Check for duplicate name
    if (apiKeys.some(key => key.name.toLowerCase() === createModal.name.trim().toLowerCase())) {
      setNameError('An API key with this name already exists');
      return;
    }
    
    setIsCreating(true);
    setNameError('');
    setError(null);
    
    try {
      console.log('Creating new API key...');
      const prefix = createModal.type === 'production' ? 'tvly_live_' : 'tvly_test_';
      const newKey = prefix + crypto.randomUUID().replace(/-/g, '');
      
      const newApiKey = {
        name: createModal.name.trim(),
        key: newKey,
        type: createModal.type,
        usage_limit: createModal.limit,
        user_id: '00000000-0000-0000-0000-000000000000', // Temporary user ID until auth is implemented
        usage: 0,
        last_used: 'Never'
      };
      
      console.log('Inserting new API key:', newApiKey);
      
      const { data, error } = await supabase
        .from('api_keys')
        .insert([newApiKey])
        .select()
        .single();

      if (error) {
        console.error('Supabase error:', error);
        showToast(error.message, 'error');
        throw error;
      }
      
      console.log('Created API key:', data);
      setApiKeys([data, ...apiKeys]);
      setCreateModal(prev => ({ ...prev, isOpen: false, name: '' }));
      showToast('API key created successfully!');
    } catch (error) {
      console.error('Failed to create API key:', error);
      showToast(error instanceof Error ? error.message : 'Failed to create API key', 'error');
    } finally {
      setIsCreating(false);
    }
  };

  const handleDeleteKey = async (id: string) => {
    try {
      console.log('Deleting API key...');
      
      const { error } = await supabase
        .from('api_keys')
        .delete()
        .eq('id', id);

      if (error) {
        console.error('Supabase error:', error);
        showToast(error.message, 'error');
        throw error;
      }
      
      console.log('Deleted API key:', id);
      setApiKeys(apiKeys.filter(key => key.id !== id));
      showToast('API key deleted successfully!');
    } catch (error) {
      console.error('Failed to delete API key:', error);
      showToast(error instanceof Error ? error.message : 'Failed to delete API key', 'error');
    }
  };

  const startEditing = (key: ApiKey) => {
    setEditingKey({ id: key.id, name: key.name });
    setEditName(key.name);
  };

  const handleEdit = async () => {
    if (!editingKey || !editName.trim()) return;

    // Check for duplicate name
    if (apiKeys.some(key => 
      key.id !== editingKey.id && 
      key.name.toLowerCase() === editName.trim().toLowerCase()
    )) {
      setNameError('An API key with this name already exists');
      return;
    }

    try {
      console.log('Updating API key name...');
      
      const { data, error } = await supabase
        .from('api_keys')
        .update({ name: editName.trim() })
        .eq('id', editingKey.id)
        .select()
        .single();

      if (error) {
        console.error('Supabase error:', error);
        showToast(error.message, 'error');
        throw error;
      }
      
      console.log('Updated API key:', data);
      setApiKeys(apiKeys.map(key => 
        key.id === editingKey.id ? data : key
      ));
      setEditingKey(null);
      setNameError('');
      showToast('API key name updated successfully!');
    } catch (error) {
      console.error('Failed to update API key:', error);
      showToast(error instanceof Error ? error.message : 'Failed to update API key', 'error');
    }
  };

  const cancelEdit = () => {
    setEditingKey(null);
    setNameError('');
  };

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      showToast('API key copied to clipboard!');
    } catch (err) {
      showToast('Failed to copy to clipboard', 'error');
    }
  };

  return (
    <DashboardLayout>
      {/* Toast Notification */}
      <div
        className={`fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 transition-all duration-300 ${
          toast.visible ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-2 opacity-0 scale-95'
        }`}
      >
        <div className={`${
          toast.type === 'success' 
            ? 'bg-gradient-to-r from-rose-300 to-purple-400' 
            : 'bg-gradient-to-r from-red-400 to-red-600'
        } text-white px-6 py-4 rounded-xl shadow-xl flex items-center gap-3 backdrop-blur-sm`}>
          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {toast.type === 'success' ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            )}
          </svg>
          <span className="text-sm font-medium">{toast.message}</span>
        </div>
      </div>

      {/* Current Plan Card */}
      <div className="rounded-xl p-8 bg-gradient-to-r from-rose-200 via-purple-200 to-blue-200">
        <div className="flex justify-between items-start mb-6">
          <div>
            <div className="text-sm font-medium mb-2">CURRENT PLAN</div>
            <h1 className="text-3xl font-bold">Researcher</h1>
          </div>
          <button className="bg-white/90 px-4 py-2 rounded-lg text-sm font-medium hover:bg-white transition-colors">
            Manage Plan
          </button>
        </div>
        
        <div className="mt-6">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium">API Usage</span>
            <span className="text-sm">0 / 1,000 Credits</span>
          </div>
          <div className="h-2 bg-white/30 rounded-full overflow-hidden">
            <div className="h-full bg-white/90 rounded-full" style={{ width: '0%' }} />
          </div>
        </div>
      </div>

      {/* API Keys Section */}
      <div className="bg-white rounded-xl shadow-sm">
        <div className="p-6 border-b">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">API Keys</h2>
            <button
              onClick={() => setCreateModal(prev => ({ ...prev, isOpen: true }))}
              className="px-4 py-2 bg-gradient-to-r from-rose-300 to-purple-400 hover:from-rose-400 hover:to-purple-500 text-white rounded-lg transition-all hover:scale-105 active:scale-95 flex items-center gap-2 shadow-md hover:shadow-lg"
            >
              <PlusIcon className="w-5 h-5" />
              New Key
            </button>
          </div>
        </div>

        <div className="p-6">
          {/* API Keys table */}
          {apiKeys.length === 0 ? (
            <p className="text-gray-500 text-center py-8">No API keys found. Create one to get started.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <colgroup>
                  <col className="w-[25%]" />
                  <col className="w-[8%]" />
                  <col className="w-[15%]" />
                  <col className="w-[42%]" />
                  <col className="w-[10%]" />
                </colgroup>
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">NAME</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">TYPE</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">USAGE</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">KEY</th>
                    <th className="text-right py-3 px-4 text-sm font-medium text-gray-500">OPTIONS</th>
                  </tr>
                </thead>
                <tbody>
                  {apiKeys.map((key) => (
                    <tr key={key.id} className="border-b">
                      <td className="py-3 px-4">
                        {editingKey?.id === key.id ? (
                          <div className="flex gap-2 items-center">
                            <input
                              type="text"
                              value={editName}
                              onChange={(e) => {
                                setEditName(e.target.value);
                                setNameError('');
                              }}
                              className={`px-2 py-1 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none ${
                                nameError ? 'border-red-500' : ''
                              }`}
                              autoFocus
                            />
                            <button
                              onClick={handleEdit}
                              className="px-3 py-1.5 bg-gradient-to-r from-rose-300 to-purple-400 hover:from-rose-400 hover:to-purple-500 text-white rounded-lg transition-all hover:scale-105 active:scale-95 text-sm font-medium flex items-center gap-1 shadow-sm hover:shadow-md"
                            >
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                              </svg>
                              Save
                            </button>
                            <button
                              onClick={cancelEdit}
                              className="px-3 py-1.5 border border-gray-300 rounded-lg hover:bg-gray-100 transition-all hover:scale-105 active:scale-95 text-sm font-medium text-gray-700 flex items-center gap-1"
                            >
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                              </svg>
                              Cancel
                            </button>
                          </div>
                        ) : (
                          <span className="font-medium">{key.name}</span>
                        )}
                        {editingKey?.id === key.id && nameError && (
                          <p className="mt-1 text-sm text-red-500">{nameError}</p>
                        )}
                      </td>
                      <td className="py-3 px-4">
                        <span className={`px-2 py-1 rounded text-sm font-medium ${
                          key.type === 'production' 
                            ? 'bg-purple-100 text-purple-700'
                            : 'bg-gray-100 text-gray-700'
                        }`}>
                          {key.type === 'production' ? 'PROD' : 'DEV'}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex flex-col gap-1">
                          <div className="flex justify-between items-center text-sm">
                            <span className="text-gray-600">
                              {key.usage.toLocaleString()}
                            </span>
                            <span className="text-gray-500">
                              / {key.usage_limit.toLocaleString()}
                            </span>
                          </div>
                          <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                            <div 
                              className={`h-full rounded-full transition-all ${
                                (key.usage / key.usage_limit) > 0.9 
                                  ? 'bg-red-500' 
                                  : (key.usage / key.usage_limit) > 0.7 
                                    ? 'bg-yellow-500' 
                                    : 'bg-purple-500'
                              }`}
                              style={{ 
                                width: `${Math.min((key.usage / key.usage_limit) * 100, 100)}%` 
                              }}
                            />
                          </div>
                        </div>
                      </td>
                      <td className="py-3 px-4 min-w-[300px]">
                        <code className="px-2 py-1 bg-gray-100 rounded text-sm font-mono w-full inline-block">
                          {showKey === key.id ? key.key : '••••••••••••••••'}
                        </code>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex justify-end gap-3">
                          <button
                            onClick={() => setShowKey(showKey === key.id ? null : key.id)}
                            className="p-1.5 text-gray-500 hover:text-gray-700 transition-all hover:scale-110 hover:bg-gray-100 rounded-full"
                            title="View"
                          >
                            <EyeIcon className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => copyToClipboard(key.key)}
                            className="p-1.5 text-gray-500 hover:text-gray-700 transition-all hover:scale-110 hover:bg-gray-100 rounded-full"
                            title="Copy"
                          >
                            <ClipboardIcon className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => startEditing(key)}
                            className="p-1.5 text-gray-500 hover:text-gray-700 transition-all hover:scale-110 hover:bg-gray-100 rounded-full"
                            title="Edit"
                          >
                            <PencilIcon className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteKey(key.id)}
                            className="p-1.5 text-red-500 hover:text-red-700 transition-all hover:scale-110 hover:bg-red-50 rounded-full"
                            title="Delete"
                          >
                            <TrashIcon className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Create Key Modal */}
      {createModal.isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-8 rounded-xl shadow-xl">
            <h2 className="text-xl font-semibold mb-4">Create New API Key</h2>
            <input
              type="text"
              value={createModal.name}
              onChange={(e) => setCreateModal(prev => ({ ...prev, name: e.target.value }))}
              placeholder="Name"
              className="px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            />
            <select
              value={createModal.type}
              onChange={(e) => setCreateModal(prev => ({ ...prev, type: e.target.value as 'production' | 'development' }))}
              className="px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            >
              <option value="production">Production</option>
              <option value="development">Development</option>
            </select>
            <input
              type="number"
              value={createModal.limit}
              onChange={(e) => setCreateModal(prev => ({ ...prev, limit: Number(e.target.value) }))}
              placeholder="Usage Limit"
              className="px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            />
            <button
              onClick={handleCreateKey}
              className="mt-4 px-4 py-2 bg-gradient-to-r from-rose-300 to-purple-400 hover:from-rose-400 hover:to-purple-500 text-white rounded-lg transition-all hover:scale-105 active:scale-95"
            >
              Create Key
            </button>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
} 
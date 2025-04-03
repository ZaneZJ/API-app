'use client';

import { useState, useEffect } from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import { PlanCard } from '@/components/PlanCard';
import { ApiKeysTable } from '@/components/ApiKeysTable';
import { CreateKeyModal } from '@/components/CreateKeyModal';
import { ToastNotification } from '@/components/ToastNotification';
import { useApiKeys } from '@/hooks/useApiKeys';
import { useToast } from '@/hooks/useToast';
import { ApiKey } from '@/lib/supabase';

interface CreateKeyModalState {
  isOpen: boolean;
  name: string;
  type: 'production' | 'development';
  limit: number;
}

export default function Dashboard() {
  const {
    apiKeys,
    isCreating,
    error,
    loadApiKeys,
    createApiKey,
    deleteApiKey,
    updateApiKeyName
  } = useApiKeys();

  const { toast, showToast } = useToast();

  const [createModal, setCreateModal] = useState<CreateKeyModalState>({
    isOpen: false,
    name: '',
    type: 'development',
    limit: 1000
  });

  const [editingKey, setEditingKey] = useState<{ id: string; name: string } | null>(null);
  const [editName, setEditName] = useState('');
  const [showKey, setShowKey] = useState<string | null>(null);
  const [nameError, setNameError] = useState('');

  // Load API keys on mount
  useEffect(() => {
    loadApiKeys();
  }, [loadApiKeys]);

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
    
    setNameError('');
    
    try {
      await createApiKey(createModal.name, createModal.type, createModal.limit);
      setCreateModal(prev => ({ ...prev, isOpen: false, name: '' }));
      showToast('API key created successfully!');
    } catch (error) {
      showToast(error instanceof Error ? error.message : 'Failed to create API key', 'error');
    }
  };

  const handleDeleteKey = async (id: string) => {
    try {
      await deleteApiKey(id);
      showToast('API key deleted successfully!');
    } catch (error) {
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
      await updateApiKeyName(editingKey.id, editName);
      setEditingKey(null);
      setNameError('');
      showToast('API key name updated successfully!');
    } catch (error) {
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
      <ToastNotification toast={toast} />
      
      <div className="space-y-6">
        <PlanCard />
        
        <ApiKeysTable
          apiKeys={apiKeys}
          showKey={showKey}
          editingKey={editingKey}
          editName={editName}
          nameError={nameError}
          onShowKey={setShowKey}
          onCopyKey={copyToClipboard}
          onStartEditing={startEditing}
          onEdit={handleEdit}
          onCancelEdit={cancelEdit}
          onDelete={handleDeleteKey}
          onEditNameChange={setEditName}
          onCreateClick={() => setCreateModal(prev => ({ ...prev, isOpen: true }))}
        />
      </div>

      <CreateKeyModal
        isOpen={createModal.isOpen}
        name={createModal.name}
        type={createModal.type}
        limit={createModal.limit}
        nameError={nameError}
        onClose={() => setCreateModal(prev => ({ ...prev, isOpen: false }))}
        onNameChange={(name) => setCreateModal(prev => ({ ...prev, name }))}
        onTypeChange={(type) => setCreateModal(prev => ({ ...prev, type }))}
        onLimitChange={(limit) => setCreateModal(prev => ({ ...prev, limit }))}
        onCreate={handleCreateKey}
      />
    </DashboardLayout>
  );
} 
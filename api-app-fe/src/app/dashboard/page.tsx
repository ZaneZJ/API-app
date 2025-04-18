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
    loadApiKeys,
    createApiKey,
    deleteApiKey,
    updateApiKeyName,
    isCreating
  } = useApiKeys();

  const { toast, showToast } = useToast();
  const [isLoading, setIsLoading] = useState(true);

  const [createModal, setCreateModal] = useState<CreateKeyModalState>({
    isOpen: false,
    name: '',
    type: 'development',
    limit: 1000
  });

  const [editingKey, setEditingKey] = useState<{ id: string; name: string } | null>(null);
  const [editName, setEditName] = useState('');
  const [visibleKeys, setVisibleKeys] = useState<string[]>([]);
  const [nameError, setNameError] = useState('');

  // Load API keys on mount
  useEffect(() => {
    const loadData = async () => {
      try {
        await loadApiKeys();
      } finally {
        setIsLoading(false);
      }
    };
    loadData();
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
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to create API key';
      showToast(errorMessage, 'error');
    }
  };

  const handleDeleteKey = async (id: string) => {
    try {
      await deleteApiKey(id);
      setVisibleKeys(prev => prev.filter(keyId => keyId !== id));
      showToast('API key deleted successfully!');
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to delete API key';
      showToast(errorMessage, 'error');
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
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to update API key';
      showToast(errorMessage, 'error');
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
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to copy to clipboard';
      showToast(errorMessage, 'error');
    }
  };

  const toggleKeyVisibility = (id: string) => {
    setVisibleKeys(prev => 
      prev.includes(id) 
        ? prev.filter(keyId => keyId !== id) 
        : [...prev, id]
    );
  };

  return (
    <DashboardLayout isModalOpen={createModal.isOpen}>
      <ToastNotification toast={toast} />
      
      <div className="space-y-6">
        <PlanCard />
        
        <ApiKeysTable
          apiKeys={apiKeys}
          showKey={visibleKeys}
          editingKey={editingKey}
          editName={editName}
          nameError={nameError}
          onShowKey={toggleKeyVisibility}
          onCopyKey={copyToClipboard}
          onStartEditing={startEditing}
          onEdit={handleEdit}
          onCancelEdit={cancelEdit}
          onDelete={handleDeleteKey}
          onEditNameChange={setEditName}
          onCreateClick={() => setCreateModal(prev => ({ ...prev, isOpen: true }))}
          isLoading={isLoading}
          isCreating={isCreating}
        />
      </div>

      <CreateKeyModal
        isOpen={createModal.isOpen}
        name={createModal.name}
        type={createModal.type}
        limit={createModal.limit}
        nameError={nameError}
        isCreating={isCreating}
        onClose={() => setCreateModal(prev => ({ ...prev, isOpen: false }))}
        onNameChange={(name) => setCreateModal(prev => ({ ...prev, name }))}
        onTypeChange={(type) => setCreateModal(prev => ({ ...prev, type }))}
        onLimitChange={(limit) => setCreateModal(prev => ({ ...prev, limit }))}
        onCreate={handleCreateKey}
      />
    </DashboardLayout>
  );
} 
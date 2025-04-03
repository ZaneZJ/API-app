'use client';

import { useState, useEffect } from 'react';
import { EyeIcon, ClipboardIcon, PencilIcon, TrashIcon, PlusIcon, SunIcon, MoonIcon } from '@heroicons/react/24/outline';
import { supabase, ApiKey } from '@/lib/supabase';

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
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Load API keys on mount
  useEffect(() => {
    loadApiKeys();
  }, []);

  // Dark mode initialization and management
  useEffect(() => {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const hours = new Date().getHours();
    const isDarkTime = hours < 6 || hours > 18;
    setIsDarkMode(prefersDark || isDarkTime);
    document.documentElement.classList.toggle('dark', prefersDark || isDarkTime);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDarkMode);
    localStorage.setItem('darkMode', isDarkMode ? 'true' : 'false');
  }, [isDarkMode]);

  const loadApiKeys = async () => {
    try {
      const { data, error } = await supabase
        .from('api_keys')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setApiKeys(data || []);
    } catch (error) {
      console.error('Error loading API keys:', error);
    }
  };

  const handleCreateKey = async () => {
    if (!createModal.name.trim()) return;
    
    // Check for duplicate name
    if (apiKeys.some(key => key.name.toLowerCase() === createModal.name.trim().toLowerCase())) {
      setNameError('An API key with this name already exists');
      return;
    }
    
    setIsCreating(true);
    setNameError('');
    try {
      const prefix = createModal.type === 'production' ? 'tvly_live_' : 'tvly_test_';
      const newKey = prefix + crypto.randomUUID().replace(/-/g, '');
      
      const { data, error } = await supabase
        .from('api_keys')
        .insert([{
          name: createModal.name.trim(),
          key: newKey,
          type: createModal.type,
          usage_limit: createModal.limit,
          user_id: '00000000-0000-0000-0000-000000000000' // Temporary user ID until auth is implemented
        }])
        .select()
        .single();

      if (error) throw error;
      
      setApiKeys([data, ...apiKeys]);
      setCreateModal(prev => ({ ...prev, isOpen: false, name: '' }));
    } catch (error) {
      console.error('Failed to create API key:', error);
    } finally {
      setIsCreating(false);
    }
  };

  const handleDeleteKey = async (id: string) => {
    try {
      const { error } = await supabase
        .from('api_keys')
        .delete()
        .eq('id', id);

      if (error) throw error;
      setApiKeys(apiKeys.filter(key => key.id !== id));
    } catch (error) {
      console.error('Failed to delete API key:', error);
    }
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
      const { data, error } = await supabase
        .from('api_keys')
        .update({ name: editName.trim() })
        .eq('id', editingKey.id)
        .select()
        .single();

      if (error) throw error;
      
      setApiKeys(apiKeys.map(key => 
        key.id === editingKey.id ? data : key
      ));
      setEditingKey(null);
      setNameError('');
    } catch (error) {
      console.error('Failed to update API key:', error);
    }
  };

  // ... rest of the component remains the same ...
} 
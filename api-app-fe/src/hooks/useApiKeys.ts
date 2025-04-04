import { useState } from 'react';
import { supabase, ApiKey } from '@/lib/supabase';

export const useApiKeys = () => {
  const [apiKeys, setApiKeys] = useState<ApiKey[]>([]);
  const [isCreating, setIsCreating] = useState(false);
  const [error, setError] = useState<string | null>(null);

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

  const createApiKey = async (name: string, type: 'production' | 'development', limit: number) => {
    setIsCreating(true);
    setError(null);
    
    try {
      console.log('Creating new API key...');
      const prefix = type === 'production' ? 'zj_live_' : 'zj_test_';
      const newKey = prefix + crypto.randomUUID().replace(/-/g, '');
      
      const newApiKey = {
        name: name.trim(),
        key: newKey,
        type,
        usage_limit: limit,
        user_id: '00000000-0000-0000-0000-000000000000',
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
        throw error;
      }
      
      console.log('Created API key:', data);
      setApiKeys([data, ...apiKeys]);
      return data;
    } catch (error) {
      console.error('Failed to create API key:', error);
      throw error;
    } finally {
      setIsCreating(false);
    }
  };

  const deleteApiKey = async (id: string) => {
    try {
      console.log('Deleting API key...');
      
      const { error } = await supabase
        .from('api_keys')
        .delete()
        .eq('id', id);

      if (error) {
        console.error('Supabase error:', error);
        throw error;
      }
      
      console.log('Deleted API key:', id);
      setApiKeys(apiKeys.filter(key => key.id !== id));
    } catch (error) {
      console.error('Failed to delete API key:', error);
      throw error;
    }
  };

  const updateApiKeyName = async (id: string, newName: string) => {
    try {
      console.log('Updating API key name...');
      
      const { data, error } = await supabase
        .from('api_keys')
        .update({ name: newName.trim() })
        .eq('id', id)
        .select()
        .single();

      if (error) {
        console.error('Supabase error:', error);
        throw error;
      }
      
      console.log('Updated API key:', data);
      setApiKeys(apiKeys.map(key => 
        key.id === id ? data : key
      ));
      return data;
    } catch (error) {
      console.error('Failed to update API key:', error);
      throw error;
    }
  };

  return {
    apiKeys,
    isCreating,
    error,
    loadApiKeys,
    createApiKey,
    deleteApiKey,
    updateApiKeyName
  };
}; 
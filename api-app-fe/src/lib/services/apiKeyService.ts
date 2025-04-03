import { supabase } from '@/lib/supabase';
import { ApiKey } from '@/lib/types';

export const apiKeyService = {
  async getApiKeys() {
    const { data, error } = await supabase
      .from('api_keys')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  },

  async createApiKey(newApiKey: Omit<ApiKey, 'id' | 'created_at'>) {
    const { data, error } = await supabase
      .from('api_keys')
      .insert([newApiKey])
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async updateApiKeyName(id: string, name: string) {
    const { data, error } = await supabase
      .from('api_keys')
      .update({ name })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async deleteApiKey(id: string) {
    const { error } = await supabase
      .from('api_keys')
      .delete()
      .eq('id', id);

    if (error) throw error;
  }
}; 
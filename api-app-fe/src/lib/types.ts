export interface ApiKey {
  id: string;
  name: string;
  key: string;
  type: 'production' | 'development';
  usage_limit: number;
  user_id: string;
  usage: number;
  last_used: string;
  created_at?: string;
}

export interface CreateKeyModal {
  isOpen: boolean;
  name: string;
  type: 'production' | 'development';
  limit: number;
} 
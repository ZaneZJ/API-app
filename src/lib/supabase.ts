import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type ApiKey = {
  id: string;
  name: string;
  key: string;
  created_at: string;
  last_used: string;
  type: 'production' | 'development';
  usage: number;
  usage_limit: number;
  user_id: string;
}; 
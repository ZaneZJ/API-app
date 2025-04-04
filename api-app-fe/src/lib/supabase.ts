import { createClient } from '@supabase/supabase-js';

if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
  throw new Error('Missing env.NEXT_PUBLIC_SUPABASE_URL');
}
if (!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
  throw new Error('Missing env.NEXT_PUBLIC_SUPABASE_ANON_KEY');
}

export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  {
    auth: {
      persistSession: true
    }
  }
);

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

export async function validateApiKey(apiKey: string): Promise<boolean> {
  try {
    const response = await fetch('/api/validate-key', {
      headers: {
        'Authorization': `Bearer ${apiKey}`,
      },
    });

    if (response.status === 200) {
      return true;
    }

    return false;
  } catch (error) {
    console.error('Error validating API key:', error);
    return false;
  }
} 
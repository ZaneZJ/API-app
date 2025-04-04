import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET(request: Request) {
  const authHeader = request.headers.get('Authorization');
  
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return new NextResponse(JSON.stringify({ error: 'Missing or invalid Authorization header' }), {
      status: 401,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  const apiKey = authHeader.split(' ')[1];

  try {
    const { data, error } = await supabase
      .from('api_keys')
      .select('id')
      .eq('key', apiKey)
      .single();

    if (error || !data) {
      return new NextResponse(JSON.stringify({ error: 'Invalid API key' }), {
        status: 406,
        headers: {
          'Content-Type': 'application/json',
        },
      });
    }

    return new NextResponse(JSON.stringify({ valid: true }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error('Error validating API key:', error);
    return new NextResponse(
      JSON.stringify({ 
        error: 'Server error validating API key',
        details: error instanceof Error ? error.message : 'Unknown error'
      }),
      {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  }
} 
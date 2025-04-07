import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { getGitHubReadme } from './github';
import { createGitHubSummaryChain } from './chain';

export async function POST(request: Request) {
  // 1. Validate API key from x-api-key header
  const apiKey = request.headers.get('x-api-key');
  
  if (!apiKey) {
    return new NextResponse(JSON.stringify({ error: 'Missing x-api-key header' }), {
      status: 401,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  try {
    // 2. Validate the API key with Supabase and check rate limit
    const { data: keyData, error: keyError } = await supabase
      .from('api_keys')
      .select('id, usage, usage_limit')
      .eq('key', apiKey)
      .single();

    if (keyError || !keyData) {
      return new NextResponse(JSON.stringify({ error: 'Invalid API key' }), {
        status: 406,
        headers: {
          'Content-Type': 'application/json',
        },
      });
    }

    // Check if usage has exceeded rate limit
    if (keyData.usage >= keyData.usage_limit) {
      return new NextResponse(JSON.stringify({ error: 'Rate limit exceeded' }), {
        status: 429,
        headers: {
          'Content-Type': 'application/json',
        },
      });
    }

    // Increment usage count
    const { error: updateError } = await supabase
      .from('api_keys')
      .update({ usage: keyData.usage + 1 })
      .eq('id', keyData.id);

    if (updateError) {
      console.error('Failed to update usage count:', updateError);
      return new NextResponse(JSON.stringify({ error: 'Failed to update usage count' }), {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
        },
      });
    }

    // 3. Parse and validate request body
    let body;
    try {
      body = await request.json();
    } catch {
      return new NextResponse(JSON.stringify({ error: 'Invalid JSON in request body' }), {
        status: 400,
        headers: {
          'Content-Type': 'application/json',
        },
      });
    }

    // 4. Validate githubUrl
    if (!body.githubUrl) {
      return new NextResponse(JSON.stringify({ error: 'Missing githubUrl in request body' }), {
        status: 400,
        headers: {
          'Content-Type': 'application/json',
        },
      });
    }

    // 5. Fetch README content and generate summary
    try {
      const readmeContent = await getGitHubReadme(body.githubUrl);
      
      // Create and run the chain
      const chain = createGitHubSummaryChain();
      const summary = await chain.invoke({
        readme: readmeContent
      });
      
      return new NextResponse(JSON.stringify({
        message: 'README processed successfully',
        url: body.githubUrl,
        readme: readmeContent,
        analysis: summary
      }), {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
        },
      });
    } catch (readmeError) {
      return new NextResponse(JSON.stringify({ 
        error: readmeError instanceof Error ? readmeError.message : 'Failed to fetch README'
      }), {
        status: 404,
        headers: {
          'Content-Type': 'application/json',
        },
      });
    }

  } catch (error) {
    console.error('Server error:', error);
    return new NextResponse(JSON.stringify({ error: 'Server error' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
} 
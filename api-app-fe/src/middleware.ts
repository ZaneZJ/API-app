import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
import type { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  const token = await getToken({ 
    req: request,
    secret: process.env.NEXTAUTH_SECRET
  });
  
  const isAuthPage = request.nextUrl.pathname.startsWith('/auth');
  const isPublicPage = request.nextUrl.pathname === '/';
  const isApiRoute = request.nextUrl.pathname.startsWith('/api');

  // Allow public pages, auth pages, and API routes
  if (isPublicPage || isAuthPage || isApiRoute) {
    return NextResponse.next();
  }

  // Redirect to login if not authenticated
  if (!token) {
    const loginUrl = new URL('/auth/signin', request.url);
    loginUrl.searchParams.set('callbackUrl', request.nextUrl.pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

// Configure which routes to protect
export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * 1. / (home page)
     * 2. /auth/* (auth pages)
     * 3. /_next/* (Next.js internals)
     * 4. /api/* (API routes)
     * 5. /images, /icons, etc. (static files)
     */
    '/((?!api|_next|images|icons|auth|$).*)',
  ],
}; 
import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
import type { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request });
  const isAuthPage = request.nextUrl.pathname.startsWith('/auth');
  const isPublicPage = request.nextUrl.pathname === '/';

  // Allow public pages and auth pages
  if (isPublicPage || isAuthPage) {
    return NextResponse.next();
  }

  // Redirect to login if not authenticated
  if (!token) {
    const loginUrl = new URL('/auth/signin', request.url);
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
     * 4. /api/auth/* (auth API routes)
     * 5. /images, /icons, etc. (static files)
     */
    '/((?!api/auth|_next|images|icons|auth|$).*)',
  ],
}; 
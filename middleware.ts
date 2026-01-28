import { NextRequest, NextResponse } from 'next/server';

// Paths that require authentication
const PROTECTED_PATHS = [
  '/admin',
];

// Paths that are public
const PUBLIC_PATHS = [
  '/',
  '/team',
  '/about',
  '/projects',
  '/departments',
  '/events',
  '/partnerships',
  '/contact',
  '/join-us',
];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Check if current path is protected
  const isProtected = PROTECTED_PATHS.some(path => pathname.startsWith(path));
  
  if (!isProtected) {
    return NextResponse.next();
  }

  // Check for auth token (in production, verify JWT or session)
  const token = request.cookies.get('admin-token')?.value;
  
  if (!token) {
    // Redirect to login page (to be implemented)
    const loginUrl = request.nextUrl.clone();
    loginUrl.pathname = '/admin/login';
    return NextResponse.redirect(loginUrl);
  }

  // In production: validate token signature and expiration
  // For now: basic token presence check
  
  return NextResponse.next();
}

export const config = {
  matcher: [
    // Protected routes
    '/admin/:path*',
    // Exclude public assets
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};

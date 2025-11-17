import { NextResponse } from 'next/server';

export function middleware(request) {
  const { pathname } = request.nextUrl;

  // Check if route is protected (starts with /app)
  if (pathname.startsWith('/app')) {
    // Check for wallet connection in cookies or headers
    // Since we're using localStorage (client-side), we'll check in the client
    // But we can check for a session cookie if needed
    
    // For now, we'll let the client-side handle the redirect
    // The app layout will check wallet connection and redirect if needed
    return NextResponse.next();
  }

  // Allow all other routes
  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};


import { NextRequest, NextResponse } from 'next/server';

/**
 * Wrapper for secure API responses with proper headers
 * Implements production-level security practices
 */
export function withSecurityHeaders(response: NextResponse): NextResponse {
  // CORS headers
  response.headers.set('Access-Control-Allow-Origin', process.env.NEXT_PUBLIC_API_URL || '*');
  response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  // Security headers
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('X-XSS-Protection', '1; mode=block');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  response.headers.set('Permissions-Policy', 'geolocation=(), microphone=(), camera=()');

  // Cache headers
  if (process.env.NODE_ENV === 'production') {
    response.headers.set('Cache-Control', 'public, s-maxage=10, stale-while-revalidate=86400');
  } else {
    response.headers.set('Cache-Control', 'no-store, max-age=0');
  }

  return response;
}

/**
 * Rate limiting helper (basic implementation)
 * In production: Use Redis or external service
 */
const requestCounts = new Map<string, { count: number; resetTime: number }>();

export function checkRateLimit(request: NextRequest): { allowed: boolean; remaining: number } {
  const ip = request.headers.get('x-forwarded-for') || 'unknown';
  const limit = parseInt(process.env.API_RATE_LIMIT_REQUESTS_PER_MINUTE || '60');
  const now = Date.now();

  const entry = requestCounts.get(ip) || { count: 0, resetTime: now + 60000 };

  // Reset if window expired
  if (now > entry.resetTime) {
    entry.count = 0;
    entry.resetTime = now + 60000;
  }

  entry.count++;
  requestCounts.set(ip, entry);

  return {
    allowed: entry.count <= limit,
    remaining: Math.max(0, limit - entry.count),
  };
}

/**
 * Error response with security headers
 */
export function errorResponse(
  message: string,
  status: number = 400,
  details?: Record<string, any>
): NextResponse {
  return withSecurityHeaders(
    NextResponse.json(
      {
        error: message,
        ...(process.env.NODE_ENV === 'development' && details && { details }),
      },
      { status }
    )
  );
}

/**
 * Success response with security headers
 */
export function successResponse(data: any, status: number = 200): NextResponse {
  return withSecurityHeaders(NextResponse.json(data, { status }));
}

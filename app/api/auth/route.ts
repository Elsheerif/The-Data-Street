import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'edge';

/**
 * Basic authentication endpoint
 * In production: Use proper session management with secure cookies
 * Current: Simple token-based approach for demo
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { password } = body;

    if (!password) {
      return NextResponse.json(
        { error: 'Password is required' },
        { status: 400 }
      );
    }

    // In production: Compare against hashed password in database/env
    // For now: Simple demo password (NEVER use in production)
    const DEMO_PASSWORD = process.env.ADMIN_PASSWORD || 'admin123';
    
    if (password !== DEMO_PASSWORD) {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      );
    }

    // Create response with auth token
    const response = NextResponse.json(
      { success: true, message: 'Authenticated' },
      { status: 200 }
    );

    // Set secure cookie (in production: httpOnly, secure, sameSite)
    const token = Buffer.from(`${Date.now()}:${Math.random()}`).toString('base64');
    response.cookies.set('admin-token', token, {
      httpOnly: false, // In production: true
      secure: process.env.NODE_ENV === 'production', // Only HTTPS in production
      sameSite: 'lax',
      maxAge: 60 * 60 * 24, // 24 hours
    });

    return response;
  } catch (error) {
    console.error('Auth error:', error);
    return NextResponse.json(
      { error: 'Authentication failed' },
      { status: 500 }
    );
  }
}

/**
 * Logout endpoint
 */
export async function DELETE(request: NextRequest) {
  const response = NextResponse.json(
    { success: true, message: 'Logged out' },
    { status: 200 }
  );

  response.cookies.delete('admin-token');
  return response;
}

import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { withSecurityHeaders, checkRateLimit, errorResponse, successResponse } from '@/lib/api-security';

export const runtime = 'edge';

export async function GET(request: NextRequest) {
  try {
    // Check rate limit in production
    if (process.env.API_RATE_LIMIT_ENABLED === 'true') {
      const rateLimit = checkRateLimit(request);
      if (!rateLimit.allowed) {
        return errorResponse('Too many requests. Please try again later.', 429);
      }
    }

    const { searchParams } = new URL(request.url);
    const departmentId = searchParams.get('departmentId');
    const status = searchParams.get('status');
    const search = searchParams.get('search');

    const where: any = {};

    if (departmentId) {
      where.departmentId = parseInt(departmentId);
    }

    if (status) {
      where.status = status.toUpperCase();
    }

    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { email: { contains: search, mode: 'insensitive' } },
        { roleTitle: { contains: search, mode: 'insensitive' } },
        { bio: { contains: search, mode: 'insensitive' } },
      ];
    }

    const members = await prisma.member.findMany({
      where,
      include: {
        department: true,
        committee: true,
        projects: {
          include: {
            project: true,
          },
        },
      },
      orderBy: {
        name: 'asc',
      },
    });

    return successResponse(members);
  } catch (error) {
    console.error('Error fetching members:', error);
    return errorResponse('Failed to fetch members', 500, { error });
  }
}

export async function POST(request: NextRequest) {
  try {
    // Check rate limit in production
    if (process.env.API_RATE_LIMIT_ENABLED === 'true') {
      const rateLimit = checkRateLimit(request);
      if (!rateLimit.allowed) {
        return errorResponse('Too many requests. Please try again later.', 429);
      }
    }

    const body = await request.json();

    const {
      name,
      email,
      phone,
      photoUrl,
      bio,
      roleTitle,
      departmentId,
      committeeId,
      skills,
      joinDate,
      socialLinkedIn,
      socialGitHub,
      status,
    } = body;

    if (!name || !email) {
      return errorResponse('Name and email are required', 400);
    }

    const member = await prisma.member.create({
      data: {
        name,
        email,
        phone,
        photoUrl,
        bio,
        roleTitle,
        departmentId: departmentId ? parseInt(departmentId) : null,
        committeeId: committeeId ? parseInt(committeeId) : null,
        skills: skills || [],
        joinDate: joinDate ? new Date(joinDate) : null,
        socialLinkedIn,
        socialGitHub,
        status: status || 'ACTIVE',
      },
      include: {
        department: true,
        committee: true,
      },
    });

    return successResponse(member, 201);
  } catch (error: any) {
    console.error('Error creating member:', error);

    if (error.code === 'P2002') {
      return errorResponse('Email already exists', 400);
    }

    return errorResponse('Failed to create member', 500, { error: error.message });
  }
}

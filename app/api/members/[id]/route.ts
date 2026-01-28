import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const runtime = 'edge';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const memberId = parseInt(id);

    const member = await prisma.member.findUnique({
      where: { id: memberId },
      include: {
        department: true,
        committee: true,
        projects: {
          include: {
            project: true,
          },
        },
      },
    });

    if (!member) {
      return NextResponse.json(
        { error: 'Member not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(member, { status: 200 });
  } catch (error) {
    console.error('Error fetching member:', error);
    return NextResponse.json(
      { error: 'Failed to fetch member' },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const memberId = parseInt(id);
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
      status,
      joinDate,
      socialLinkedIn,
      socialGitHub,
    } = body;

    const member = await prisma.member.update({
      where: { id: memberId },
      data: {
        ...(name && { name }),
        ...(email && { email }),
        ...(phone !== undefined && { phone }),
        ...(photoUrl !== undefined && { photoUrl }),
        ...(bio !== undefined && { bio }),
        ...(roleTitle !== undefined && { roleTitle }),
        ...(departmentId !== undefined && { departmentId: departmentId ? parseInt(departmentId) : null }),
        ...(committeeId !== undefined && { committeeId: committeeId ? parseInt(committeeId) : null }),
        ...(skills && { skills }),
        ...(status && { status }),
        ...(joinDate && { joinDate: new Date(joinDate) }),
        ...(socialLinkedIn !== undefined && { socialLinkedIn }),
        ...(socialGitHub !== undefined && { socialGitHub }),
      },
      include: {
        department: true,
        committee: true,
      },
    });

    return NextResponse.json(member, { status: 200 });
  } catch (error: any) {
    console.error('Error updating member:', error);

    if (error.code === 'P2025') {
      return NextResponse.json(
        { error: 'Member not found' },
        { status: 404 }
      );
    }

    if (error.code === 'P2002') {
      return NextResponse.json(
        { error: 'Email already exists' },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: 'Failed to update member' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const memberId = parseInt(id);

    await prisma.member.delete({
      where: { id: memberId },
    });

    return NextResponse.json(
      { message: 'Member deleted successfully' },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Error deleting member:', error);

    if (error.code === 'P2025') {
      return NextResponse.json(
        { error: 'Member not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { error: 'Failed to delete member' },
      { status: 500 }
    );
  }
}

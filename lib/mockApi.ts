'use client';

// Mock API layer - client-side data management with localStorage persistence
// This replaces database calls with in-memory state

import { members as initialMembers, departments as initialDepartments } from './data';

interface Member {
  id: string;
  name: string;
  email: string;
  phone?: string;
  roleTitle: string;
  department: string;
  status: 'ACTIVE' | 'ALUMNI' | 'INACTIVE';
  bio?: string;
  skills?: string[];
  joinDate?: string;
  socialLinkedIn?: string;
  socialGitHub?: string;
}

interface Department {
  id: string;
  name: string;
  description: string;
  icon: string;
}

// Initialize stores
let membersStore: Member[] = [];
let departmentsStore: Department[] = [];

// Load from localStorage or use initial data
const loadStores = () => {
  if (typeof window === 'undefined') {
    membersStore = initialMembers as any;
    departmentsStore = initialDepartments as any;
    return;
  }

  const savedMembers = localStorage.getItem('datastreet_members');
  const savedDepts = localStorage.getItem('datastreet_departments');

  if (savedMembers) {
    try {
      membersStore = JSON.parse(savedMembers);
    } catch {
      membersStore = initialMembers as any;
    }
  } else {
    membersStore = initialMembers as any;
  }

  if (savedDepts) {
    try {
      departmentsStore = JSON.parse(savedDepts);
    } catch {
      departmentsStore = initialDepartments as any;
    }
  } else {
    departmentsStore = initialDepartments as any;
  }
};

// Save to localStorage
const saveMembersToStorage = () => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('datastreet_members', JSON.stringify(membersStore));
  }
};

const saveDepartmentsToStorage = () => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('datastreet_departments', JSON.stringify(departmentsStore));
  }
};

// Utility delay function
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Initialize on module load
if (typeof window !== 'undefined') {
  loadStores();
}

export const mockApi = {
  // Initialize stores
  init: () => loadStores(),

  // ============ MEMBERS API ============

  getMembers: async (filters?: { status?: string; department?: string; search?: string }) => {
    await delay(300);
    loadStores();

    let result = [...membersStore];

    if (filters?.status && filters.status !== 'all') {
      result = result.filter(m => m.status === filters.status);
    }

    if (filters?.department) {
      result = result.filter(m => m.department === filters.department);
    }

    if (filters?.search) {
      const searchLower = filters.search.toLowerCase();
      result = result.filter(m =>
        m.name.toLowerCase().includes(searchLower) ||
        m.email.toLowerCase().includes(searchLower) ||
        m.roleTitle.toLowerCase().includes(searchLower)
      );
    }

    return result;
  },

  getMember: async (id: string) => {
    await delay(200);
    loadStores();
    const member = membersStore.find(m => m.id === id);
    if (!member) throw new Error('Member not found');
    return member;
  },

  createMember: async (data: Omit<Member, 'id'>) => {
    await delay(400);
    loadStores();

    // Check for duplicate email
    if (membersStore.some(m => m.email === data.email)) {
      throw new Error('Email already exists');
    }

    const newMember: Member = {
      id: `member-${Date.now()}`,
      ...data,
    };

    membersStore.push(newMember);
    saveMembersToStorage();
    return newMember;
  },

  updateMember: async (id: string, data: Partial<Member>) => {
    await delay(400);
    loadStores();

    const index = membersStore.findIndex(m => m.id === id);
    if (index === -1) throw new Error('Member not found');

    // Check for duplicate email
    if (data.email && data.email !== membersStore[index].email) {
      if (membersStore.some(m => m.id !== id && m.email === data.email)) {
        throw new Error('Email already exists');
      }
    }

    membersStore[index] = { ...membersStore[index], ...data };
    saveMembersToStorage();
    return membersStore[index];
  },

  deleteMember: async (id: string) => {
    await delay(300);
    loadStores();

    const index = membersStore.findIndex(m => m.id === id);
    if (index === -1) throw new Error('Member not found');

    const deleted = membersStore[index];
    membersStore.splice(index, 1);
    saveMembersToStorage();
    return deleted;
  },

  // ============ DEPARTMENTS API ============

  getDepartments: async () => {
    await delay(300);
    loadStores();

    return departmentsStore.map(dept => ({
      ...dept,
      memberCount: membersStore.filter(m => m.department === dept.id).length,
    }));
  },

  getDepartment: async (id: string) => {
    await delay(200);
    loadStores();

    const dept = departmentsStore.find(d => d.id === id);
    if (!dept) throw new Error('Department not found');

    return {
      ...dept,
      members: membersStore.filter(m => m.department === id),
    };
  },

  createDepartment: async (data: Omit<Department, 'id'>) => {
    await delay(400);
    loadStores();

    const newDept: Department = {
      id: `dept-${Date.now()}`,
      ...data,
    };

    departmentsStore.push(newDept);
    saveDepartmentsToStorage();
    return newDept;
  },

  updateDepartment: async (id: string, data: Partial<Department>) => {
    await delay(400);
    loadStores();

    const index = departmentsStore.findIndex(d => d.id === id);
    if (index === -1) throw new Error('Department not found');

    departmentsStore[index] = { ...departmentsStore[index], ...data };
    saveDepartmentsToStorage();
    return departmentsStore[index];
  },

  deleteDepartment: async (id: string) => {
    await delay(300);
    loadStores();

    if (membersStore.some(m => m.department === id)) {
      throw new Error('Cannot delete department with members');
    }

    const index = departmentsStore.findIndex(d => d.id === id);
    if (index === -1) throw new Error('Department not found');

    const deleted = departmentsStore[index];
    departmentsStore.splice(index, 1);
    saveDepartmentsToStorage();
    return deleted;
  },

  // ============ DASHBOARD STATS ============

  getDashboardStats: async () => {
    await delay(300);
    loadStores();

    return {
      totalMembers: membersStore.length,
      activeMembers: membersStore.filter(m => m.status === 'ACTIVE').length,
      alumniMembers: membersStore.filter(m => m.status === 'ALUMNI').length,
      inactiveMembers: membersStore.filter(m => m.status === 'INACTIVE').length,
      totalDepartments: departmentsStore.length,
    };
  },

  // ============ ACTIVITY LOG ============

  getActivityLog: async () => {
    await delay(200);
    // Return mock activity log
    return [
      {
        id: '1',
        action: 'Member created',
        details: 'New member added to Data Engineering',
        timestamp: new Date(Date.now() - 3600000),
        type: 'create',
      },
      {
        id: '2',
        action: 'Member updated',
        details: 'Member status changed to ALUMNI',
        timestamp: new Date(Date.now() - 7200000),
        type: 'update',
      },
      {
        id: '3',
        action: 'Department created',
        details: 'New AI/ML Committee established',
        timestamp: new Date(Date.now() - 86400000),
        type: 'create',
      },
    ];
  },
};

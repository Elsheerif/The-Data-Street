'use client';

import { useEffect, useState } from 'react';
import { Edit2, Trash2, Plus, Search, Loader } from 'lucide-react';
import Link from 'next/link';
import { useToast } from '@/components/ui/Toast';
import { ConfirmDialog } from '@/components/ui/ConfirmDialog';

interface Member {
  id: number;
  name: string;
  email: string;
  roleTitle: string;
  departmentId: number;
  department?: { id: number; name: string };
  status: 'ACTIVE' | 'ALUMNI' | 'INACTIVE';
}

interface DepartmentInfo {
  id: number;
  name: string;
}

export default function MembersAdmin() {
  const [members, setMembers] = useState<Member[]>([]);
  const [departments, setDepartments] = useState<DepartmentInfo[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'ACTIVE' | 'ALUMNI' | 'INACTIVE'>('all');
  const [deleteConfirm, setDeleteConfirm] = useState<{ open: boolean; id: number | null }>({ open: false, id: null });
  const [deleting, setDeleting] = useState(false);
  const { addToast } = useToast();

  useEffect(() => {
    fetchMembers();
    fetchDepartments();
  }, []);

  const fetchMembers = async () => {
    try {
      const res = await fetch('/api/members');
      if (!res.ok) throw new Error('Failed to fetch members');
      const data = await res.json();
      setMembers(data);
    } catch (error) {
      console.error('Error fetching members:', error);
      addToast('Failed to load members', 'error');
    } finally {
      setLoading(false);
    }
  };

  const fetchDepartments = async () => {
    try {
      const res = await fetch('/api/departments');
      if (!res.ok) throw new Error('Failed to fetch departments');
      const data = await res.json();
      setDepartments(data);
    } catch (error) {
      console.error('Error fetching departments:', error);
    }
  };

  const filteredMembers = members.filter((member) => {
    const searchMatch =
      member.name.toLowerCase().includes(search.toLowerCase()) ||
      member.email.toLowerCase().includes(search.toLowerCase()) ||
      member.roleTitle.toLowerCase().includes(search.toLowerCase());

    const statusMatch = statusFilter === 'all' || member.status === statusFilter;

    return searchMatch && statusMatch;
  });

  const handleDeleteClick = (id: number) => {
    setDeleteConfirm({ open: true, id });
  };

  const handleConfirmDelete = async () => {
    if (!deleteConfirm.id) return;

    setDeleting(true);
    try {
      const res = await fetch(`/api/members/${deleteConfirm.id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Failed to delete member');
      setMembers(members.filter(m => m.id !== deleteConfirm.id));
      addToast('Member deleted successfully', 'success');
      setDeleteConfirm({ open: false, id: null });
    } catch (error) {
      console.error('Error deleting member:', error);
      addToast('Failed to delete member', 'error');
    } finally {
      setDeleting(false);
    }
  };

  const getDepartmentName = (deptId: number) => {
    return departments.find(d => d.id === deptId)?.name || 'Unassigned';
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ACTIVE':
        return 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/20 dark:text-emerald-300';
      case 'ALUMNI':
        return 'bg-blue-100 text-blue-700 dark:bg-blue-900/20 dark:text-blue-300';
      case 'INACTIVE':
        return 'bg-gray-100 text-gray-700 dark:bg-gray-900/20 dark:text-gray-300';
      default:
        return '';
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-heading text-3xl font-bold text-navy dark:text-white">Members</h1>
          <p className="font-body text-gray-600 dark:text-white/70">Manage team members and their information</p>
        </div>
        <Link
          href="/admin/members/add"
          className="flex items-center gap-2 px-4 py-2 bg-teal text-white rounded-lg hover:bg-teal/90 transition-colors font-medium"
        >
          <Plus size={20} />
          <span>Add Member</span>
        </Link>
      </div>

      {/* Filters and Search */}
      <div className="bg-white dark:bg-navy rounded-lg shadow p-4 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-3 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search by name, email, or role..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal dark:bg-navy/50 dark:text-white dark:border-white/10"
            />
          </div>

          {/* Status Filter */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as any)}
            className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal dark:bg-navy/50 dark:text-white dark:border-white/10"
          >
            <option value="all">All Status</option>
            <option value="ACTIVE">Active</option>
            <option value="ALUMNI">Alumni</option>
            <option value="INACTIVE">Inactive</option>
          </select>
        </div>
      </div>

      {/* Members Table */}
      <div className="bg-white dark:bg-navy rounded-lg shadow overflow-hidden">
        {loading ? (
          <div className="p-8 text-center">
            <p className="font-body text-gray-600 dark:text-white/70">Loading members...</p>
          </div>
        ) : filteredMembers.length === 0 ? (
          <div className="p-8 text-center">
            <p className="font-body text-gray-600 dark:text-white/70">
              {search || statusFilter !== 'all' ? 'No members found' : 'No members yet'}
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200 bg-gray-50 dark:bg-navy/50 dark:border-white/10">
                  <th className="px-6 py-4 text-left font-semibold text-navy dark:text-white">
                    Name
                  </th>
                  <th className="px-6 py-4 text-left font-semibold text-navy dark:text-white">
                    Email
                  </th>
                  <th className="px-6 py-4 text-left font-semibold text-navy dark:text-white">
                    Role
                  </th>
                  <th className="px-6 py-4 text-left font-semibold text-navy dark:text-white">
                    Department
                  </th>
                  <th className="px-6 py-4 text-left font-semibold text-navy dark:text-white">
                    Status
                  </th>
                  <th className="px-6 py-4 text-center font-semibold text-navy dark:text-white">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredMembers.map((member) => (
                  <tr
                    key={member.id}
                    className="border-b border-gray-100 hover:bg-gray-50 dark:hover:bg-navy/50 dark:border-white/5 transition-colors"
                  >
                    <td className="px-6 py-4 font-medium text-navy dark:text-white">{member.name}</td>
                    <td className="px-6 py-4 text-gray-600 dark:text-white/70 text-sm">
                      {member.email}
                    </td>
                    <td className="px-6 py-4 text-gray-600 dark:text-white/70 text-sm">
                      {member.roleTitle}
                    </td>
                    <td className="px-6 py-4 text-gray-600 dark:text-white/70 text-sm">
                      {getDepartmentName(member.departmentId)}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(member.status)}`}>
                        {member.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <div className="flex items-center justify-center gap-2">
                        <Link
                          href={`/admin/members/${member.id}`}
                          className="p-2 hover:bg-gray-100 dark:hover:bg-navy/50 rounded-lg transition-colors"
                          title="Edit"
                        >
                          <Edit2 size={18} className="text-teal" />
                        </Link>
                        <button
                          onClick={() => handleDeleteClick(member.id)}
                          className="p-2 hover:bg-gray-100 dark:hover:bg-navy/50 rounded-lg transition-colors"
                          title="Delete"
                        >
                          <Trash2 size={18} className="text-red-500" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Summary */}
      <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
        <p className="font-body text-sm text-blue-900 dark:text-blue-200">
          Showing <span className="font-semibold">{filteredMembers.length}</span> of{' '}
          <span className="font-semibold">{members.length}</span> members
        </p>
      </div>

      {/* Delete Confirmation Dialog */}
      <ConfirmDialog
        isOpen={deleteConfirm.open}
        title="Delete Member"
        message="Are you sure you want to delete this member? This action cannot be undone."
        confirmText="Delete"
        cancelText="Cancel"
        isDangerous={true}
        isLoading={deleting}
        onConfirm={handleConfirmDelete}
        onCancel={() => setDeleteConfirm({ open: false, id: null })}
      />
    </div>
  );
}

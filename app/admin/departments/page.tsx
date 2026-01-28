'use client';

import { useEffect, useState } from 'react';
import { Edit2, Trash2, Plus, Search, X } from 'lucide-react';
import Link from 'next/link';

interface Department {
  id: number;
  name: string;
  description: string | null;
  members: { id: number }[];
}

export default function DepartmentsAdmin() {
  const [departments, setDepartments] = useState<Department[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ name: '', description: '' });
  const [editingId, setEditingId] = useState<number | null>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchDepartments();
  }, []);

  const fetchDepartments = async () => {
    try {
      const res = await fetch('/api/departments');
      const data = await res.json();
      setDepartments(data);
    } catch (error) {
      console.error('Error fetching departments:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredDepartments = departments.filter((dept) =>
    dept.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!formData.name.trim()) {
      setError('Department name is required');
      return;
    }

    try {
      if (editingId) {
        // Update
        const res = await fetch(`/api/departments/${editingId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        });

        if (!res.ok) throw new Error('Failed to update');
        const updated = await res.json();
        setDepartments(departments.map((d) => (d.id === editingId ? updated : d)));
      } else {
        // Create
        const res = await fetch('/api/departments', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        });

        if (!res.ok) throw new Error('Failed to create');
        const created = await res.json();
        setDepartments([...departments, created]);
      }

      setFormData({ name: '', description: '' });
      setEditingId(null);
      setShowForm(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    }
  };

  const handleEdit = (dept: Department) => {
    setFormData({ name: dept.name, description: dept.description || '' });
    setEditingId(dept.id);
    setShowForm(true);
  };

  const handleDelete = async (id: number) => {
    if (confirm('Are you sure? This cannot be undone.')) {
      try {
        await fetch(`/api/departments/${id}`, { method: 'DELETE' });
        setDepartments(departments.filter((d) => d.id !== id));
      } catch (error) {
        setError('Failed to delete department');
      }
    }
  };

  const handleCancel = () => {
    setFormData({ name: '', description: '' });
    setEditingId(null);
    setShowForm(false);
    setError('');
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-heading text-3xl font-bold text-navy dark:text-white">Departments</h1>
          <p className="font-body text-gray-600 dark:text-white/70">Manage team departments and committees</p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="flex items-center gap-2 px-4 py-2 bg-teal text-white rounded-lg hover:bg-teal/90 transition-colors"
        >
          <Plus size={20} />
          <span className="font-heading font-medium">{showForm ? 'Cancel' : 'Add Department'}</span>
        </button>
      </div>

      {/* Add/Edit Form */}
      {showForm && (
        <div className="bg-white dark:bg-navy rounded-lg shadow p-6 mb-8">
          <h2 className="font-heading text-xl font-bold text-navy dark:text-white mb-4">
            {editingId ? 'Edit Department' : 'New Department'}
          </h2>

          {error && (
            <div className="mb-4 p-3 bg-red-100 text-red-700 dark:bg-red-900/20 dark:text-red-300 rounded-lg">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block font-body font-semibold text-navy dark:text-white mb-2">
                Department Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-2 rounded-lg border border-gray-cool/20 focus:outline-none focus:ring-2 focus:ring-teal dark:bg-navy/50 dark:text-white"
                placeholder="e.g. Data Engineering"
              />
            </div>

            <div>
              <label className="block font-body font-semibold text-navy dark:text-white mb-2">Description</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={3}
                className="w-full px-4 py-2 rounded-lg border border-gray-cool/20 focus:outline-none focus:ring-2 focus:ring-teal dark:bg-navy/50 dark:text-white resize-none"
                placeholder="Optional department description..."
              />
            </div>

            <div className="flex gap-4">
              <button
                type="submit"
                className="flex-1 px-4 py-2 bg-teal text-white rounded-lg hover:bg-teal/90 transition-colors font-heading font-semibold"
              >
                {editingId ? 'Update' : 'Create'}
              </button>
              <button
                type="button"
                onClick={handleCancel}
                className="flex-1 px-4 py-2 bg-gray-200 text-gray-800 dark:bg-navy/50 dark:text-white rounded-lg hover:bg-gray-300 transition-colors font-heading font-semibold"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Search */}
      <div className="bg-white dark:bg-navy rounded-lg shadow p-4 mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-3 text-gray-400" size={18} />
          <input
            type="text"
            placeholder="Search departments..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-cool/20 focus:outline-none focus:ring-2 focus:ring-teal dark:bg-navy/50 dark:text-white"
          />
        </div>
      </div>

      {/* Departments Grid */}
      <div>
        {loading ? (
          <div className="text-center py-8">
            <p className="font-body text-gray-600 dark:text-white/70">Loading departments...</p>
          </div>
        ) : filteredDepartments.length === 0 ? (
          <div className="text-center py-8">
            <p className="font-body text-gray-600 dark:text-white/70">No departments found</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDepartments.map((dept) => (
              <div key={dept.id} className="bg-white dark:bg-navy rounded-lg shadow p-6 hover:shadow-lg transition-shadow">
                <h3 className="font-heading text-lg font-bold text-navy dark:text-white mb-2">{dept.name}</h3>

                {dept.description && (
                  <p className="font-body text-sm text-gray-600 dark:text-white/70 mb-4 line-clamp-2">
                    {dept.description}
                  </p>
                )}

                <div className="mb-4">
                  <span className="text-xs bg-teal/10 text-teal px-3 py-1 rounded-full">
                    {dept.members.length} member{dept.members.length !== 1 ? 's' : ''}
                  </span>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(dept)}
                    className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-blue-100 text-blue-700 dark:bg-blue-900/20 dark:text-blue-300 rounded-lg hover:bg-blue-200 transition-colors"
                  >
                    <Edit2 size={16} />
                    <span className="font-body text-sm font-medium">Edit</span>
                  </button>
                  <button
                    onClick={() => handleDelete(dept.id)}
                    className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-red-100 text-red-700 dark:bg-red-900/20 dark:text-red-300 rounded-lg hover:bg-red-200 transition-colors"
                  >
                    <Trash2 size={16} />
                    <span className="font-body text-sm font-medium">Delete</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Summary */}
      <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700 rounded-lg">
        <p className="font-body text-sm text-blue-900 dark:text-blue-200">
          Total: <span className="font-semibold">{departments.length}</span> departments
        </p>
      </div>
    </div>
  );
}

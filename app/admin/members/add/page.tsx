'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { useToast } from '@/components/ui/Toast';
import { validateMemberForm, ValidationErrors } from '@/lib/validation';

interface Department {
  id: number;
  name: string;
}

export default function AddMember() {
  const router = useRouter();
  const { addToast } = useToast();
  const [departments, setDepartments] = useState<Department[]>([]);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<ValidationErrors>({});

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    roleTitle: '',
    departmentId: '',
    bio: '',
    joinDate: new Date().toISOString().split('T')[0],
    socialLinkedIn: '',
    socialGitHub: '',
    status: 'ACTIVE' as const,
  });

  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const res = await fetch('/api/departments');
        if (!res.ok) throw new Error('Failed to fetch departments');
        const data = await res.json();
        setDepartments(data);
      } catch (error) {
        console.error('Error fetching departments:', error);
        addToast('Failed to load departments', 'error');
      }
    };

    fetchDepartments();
  }, [addToast]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrors({});

    try {
      // Validate form
      const validationErrors = validateMemberForm(formData);
      if (Object.keys(validationErrors).length > 0) {
        setErrors(validationErrors);
        addToast('Please fix the form errors', 'error');
        setLoading(false);
        return;
      }

      // Create member
      const res = await fetch('/api/members', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          roleTitle: formData.roleTitle,
          departmentId: formData.departmentId ? parseInt(formData.departmentId) : null,
          bio: formData.bio,
          joinDate: formData.joinDate,
          socialLinkedIn: formData.socialLinkedIn,
          socialGitHub: formData.socialGitHub,
          status: formData.status,
        }),
      });

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.error || 'Failed to create member');
      }

      const newMember = await res.json();
      addToast(`${newMember.name} added successfully!`, 'success');
      router.push('/admin/members');
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to create member';
      addToast(message, 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Link href="/admin/members" className="flex items-center gap-2 text-teal hover:underline mb-6">
        <ArrowLeft size={20} />
        <span className="font-medium">Back to Members</span>
      </Link>

      <div className="max-w-2xl">
        <h1 className="font-heading text-3xl font-bold text-navy dark:text-white mb-2">Add New Member</h1>
        <p className="font-body text-gray-600 dark:text-white/70 mb-8">
          Create a new team member profile in the system.
        </p>

        <div className="bg-white dark:bg-navy rounded-lg shadow p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name */}
            <div>
              <label className="block font-semibold text-navy dark:text-white mb-2">
                Full Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={`w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-teal dark:bg-navy/50 dark:text-white ${
                  errors.name ? 'border-red-500' : 'border-gray-300 dark:border-white/10'
                }`}
                placeholder="John Doe"
              />
              {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
            </div>

            {/* Email */}
            <div>
              <label className="block font-semibold text-navy dark:text-white mb-2">
                Email <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-teal dark:bg-navy/50 dark:text-white ${
                  errors.email ? 'border-red-500' : 'border-gray-300 dark:border-white/10'
                }`}
                placeholder="john@example.com"
              />
              {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
            </div>

            {/* Phone */}
            <div>
              <label className="block font-semibold text-navy dark:text-white mb-2">Phone</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className={`w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-teal dark:bg-navy/50 dark:text-white ${
                  errors.phone ? 'border-red-500' : 'border-gray-300 dark:border-white/10'
                }`}
                placeholder="+1 (555) 000-0000"
              />
              {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
            </div>

            {/* Role Title */}
            <div>
              <label className="block font-semibold text-navy dark:text-white mb-2">
                Role Title <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="roleTitle"
                value={formData.roleTitle}
                onChange={handleChange}
                className={`w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-teal dark:bg-navy/50 dark:text-white ${
                  errors.roleTitle ? 'border-red-500' : 'border-gray-300 dark:border-white/10'
                }`}
                placeholder="e.g. Head of Data Engineering"
              />
              {errors.roleTitle && <p className="text-red-500 text-sm mt-1">{errors.roleTitle}</p>}
            </div>

            {/* Department */}
            <div>
              <label className="block font-semibold text-navy dark:text-white mb-2">
                Department <span className="text-red-500">*</span>
              </label>
              <select
                name="departmentId"
                value={formData.departmentId}
                onChange={handleChange}
                className={`w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-teal dark:bg-navy/50 dark:text-white ${
                  errors.departmentId ? 'border-red-500' : 'border-gray-300 dark:border-white/10'
                }`}
              >
                <option value="">Select a department</option>
                {departments.map((dept) => (
                  <option key={dept.id} value={dept.id.toString()}>
                    {dept.name}
                  </option>
                ))}
              </select>
              {errors.departmentId && <p className="text-red-500 text-sm mt-1">{errors.departmentId}</p>}
            </div>

            {/* Bio */}
            <div>
              <label className="block font-semibold text-navy dark:text-white mb-2">Bio</label>
              <textarea
                name="bio"
                value={formData.bio}
                onChange={handleChange}
                rows={4}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal dark:bg-navy/50 dark:text-white dark:border-white/10 resize-none"
                placeholder="Brief description of the team member..."
              />
            </div>

            {/* Join Date */}
            <div>
              <label className="block font-semibold text-navy dark:text-white mb-2">Join Date</label>
              <input
                type="date"
                name="joinDate"
                value={formData.joinDate}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal dark:bg-navy/50 dark:text-white dark:border-white/10"
              />
            </div>

            {/* LinkedIn */}
            <div>
              <label className="block font-semibold text-navy dark:text-white mb-2">LinkedIn URL</label>
              <input
                type="url"
                name="socialLinkedIn"
                value={formData.socialLinkedIn}
                onChange={handleChange}
                className={`w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-teal dark:bg-navy/50 dark:text-white ${
                  errors.socialLinkedIn ? 'border-red-500' : 'border-gray-300 dark:border-white/10'
                }`}
                placeholder="https://linkedin.com/in/johndoe"
              />
              {errors.socialLinkedIn && <p className="text-red-500 text-sm mt-1">{errors.socialLinkedIn}</p>}
            </div>

            {/* GitHub */}
            <div>
              <label className="block font-semibold text-navy dark:text-white mb-2">GitHub URL</label>
              <input
                type="url"
                name="socialGitHub"
                value={formData.socialGitHub}
                onChange={handleChange}
                className={`w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-teal dark:bg-navy/50 dark:text-white ${
                  errors.socialGitHub ? 'border-red-500' : 'border-gray-300 dark:border-white/10'
                }`}
                placeholder="https://github.com/johndoe"
              />
              {errors.socialGitHub && <p className="text-red-500 text-sm mt-1">{errors.socialGitHub}</p>}
            </div>

            {/* Submit Buttons */}
            <div className="flex gap-4 pt-4">
              <button
                type="submit"
                disabled={loading}
                className="flex-1 px-6 py-3 bg-teal text-white rounded-lg hover:bg-teal/90 disabled:opacity-50 transition-colors font-semibold"
              >
                {loading ? 'Creating...' : 'Create Member'}
              </button>
              <Link
                href="/admin/members"
                className="flex-1 px-6 py-3 bg-gray-200 text-gray-800 dark:bg-navy/50 dark:text-white rounded-lg hover:bg-gray-300 dark:hover:bg-navy/70 transition-colors font-semibold text-center"
              >
                Cancel
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

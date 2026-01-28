'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { ArrowLeft, Loader } from 'lucide-react';
import Link from 'next/link';
import { useToast } from '@/components/ui/Toast';
import { validateMemberForm, ValidationErrors } from '@/lib/validation';

interface Member {
  id: number;
  name: string;
  email: string;
  phone?: string;
  roleTitle: string;
  bio?: string;
  status: 'ACTIVE' | 'ALUMNI' | 'INACTIVE';
  departmentId: number;
  joinDate?: string;
  socialLinkedIn?: string;
  socialGitHub?: string;
}

interface Department {
  id: number;
  name: string;
}

export default function EditMember() {
  const router = useRouter();
  const params = useParams();
  const memberId = parseInt(params.id as string);
  const { addToast } = useToast();

  const [departments, setDepartments] = useState<Department[]>([]);
  const [member, setMember] = useState<Member | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [errors, setErrors] = useState<ValidationErrors>({});

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    roleTitle: '',
    departmentId: '',
    bio: '',
    status: 'ACTIVE' as 'ACTIVE' | 'ALUMNI' | 'INACTIVE',
    joinDate: '',
    socialLinkedIn: '',
    socialGitHub: '',
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [memberRes, deptRes] = await Promise.all([
          fetch(`/api/members/${memberId}`),
          fetch('/api/departments'),
        ]);

        if (!memberRes.ok || !deptRes.ok) throw new Error('Failed to fetch data');

        const memberData = await memberRes.json();
        const deptData = await deptRes.json();

        setMember(memberData);
        setDepartments(deptData);

        setFormData({
          name: memberData.name,
          email: memberData.email,
          phone: memberData.phone || '',
          roleTitle: memberData.roleTitle || '',
          departmentId: memberData.departmentId?.toString() || '',
          bio: memberData.bio || '',
          status: memberData.status,
          joinDate: memberData.joinDate ? memberData.joinDate.split('T')[0] : '',
          socialLinkedIn: memberData.socialLinkedIn || '',
          socialGitHub: memberData.socialGitHub || '',
        });
      } catch (error) {
        console.error('Error fetching data:', error);
        addToast('Failed to load member data', 'error');
        router.push('/admin/members');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [memberId, addToast, router]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error for this field
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
    setSaving(true);
    setErrors({});

    try {
      // Validate form
      const validationErrors = validateMemberForm(formData);
      if (Object.keys(validationErrors).length > 0) {
        setErrors(validationErrors);
        addToast('Please fix the form errors', 'error');
        setSaving(false);
        return;
      }

      // Update member
      const res = await fetch(`/api/members/${memberId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          roleTitle: formData.roleTitle,
          departmentId: formData.departmentId ? parseInt(formData.departmentId) : null,
          bio: formData.bio,
          status: formData.status,
          joinDate: formData.joinDate,
          socialLinkedIn: formData.socialLinkedIn,
          socialGitHub: formData.socialGitHub,
        }),
      });

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.error || 'Failed to update member');
      }

      addToast('Member updated successfully', 'success');
      router.push('/admin/members');
    } catch (err) {
      console.error('Error updating member:', err);
      addToast(err instanceof Error ? err.message : 'Failed to update member', 'error');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <Loader className="animate-spin text-teal mb-4" size={32} />
        <p className="font-body text-gray-600 dark:text-white/70">Loading member data...</p>
      </div>
    );
  }

  return (
    <div>
      <Link href="/admin/members" className="flex items-center gap-2 text-teal hover:underline mb-6">
        <ArrowLeft size={20} />
        <span className="font-heading font-medium">Back to Members</span>
      </Link>

      <div className="max-w-2xl">
        <h1 className="font-heading text-3xl font-bold text-navy dark:text-white mb-2">Edit Member</h1>
        <p className="font-body text-gray-600 dark:text-white/70 mb-8">
          Update the information for <span className="font-semibold">{member?.name}</span>
        </p>

        <div className="bg-white dark:bg-navy rounded-lg shadow p-8">

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name */}
            <div>
              <label className="block font-body font-semibold text-navy dark:text-white mb-2">
                Full Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className={`w-full px-4 py-2 rounded-lg border ${errors.name ? 'border-red-500' : 'border-gray-cool/20'} focus:outline-none focus:ring-2 focus:ring-teal dark:bg-navy/50 dark:text-white`}
              />
              {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name}</p>}
            </div>

            {/* Email */}
            <div>
              <label className="block font-body font-semibold text-navy dark:text-white mb-2">
                Email <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className={`w-full px-4 py-2 rounded-lg border ${errors.email ? 'border-red-500' : 'border-gray-cool/20'} focus:outline-none focus:ring-2 focus:ring-teal dark:bg-navy/50 dark:text-white`}
              />
              {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email}</p>}
            </div>

            {/* Phone */}
            <div>
              <label className="block font-body font-semibold text-navy dark:text-white mb-2">Phone</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className={`w-full px-4 py-2 rounded-lg border ${errors.phone ? 'border-red-500' : 'border-gray-cool/20'} focus:outline-none focus:ring-2 focus:ring-teal dark:bg-navy/50 dark:text-white`}
              />
              {errors.phone && <p className="mt-1 text-sm text-red-500">{errors.phone}</p>}
            </div>

            {/* Role Title */}
            <div>
              <label className="block font-body font-semibold text-navy dark:text-white mb-2">
                Role Title <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="roleTitle"
                value={formData.roleTitle}
                onChange={handleChange}
                required
                className={`w-full px-4 py-2 rounded-lg border ${errors.roleTitle ? 'border-red-500' : 'border-gray-cool/20'} focus:outline-none focus:ring-2 focus:ring-teal dark:bg-navy/50 dark:text-white`}
              />
              {errors.roleTitle && <p className="mt-1 text-sm text-red-500">{errors.roleTitle}</p>}
            </div>

            {/* Department */}
            <div>
              <label className="block font-body font-semibold text-navy dark:text-white mb-2">
                Department <span className="text-red-500">*</span>
              </label>
              <select
                name="departmentId"
                value={formData.departmentId}
                onChange={handleChange}
                required
                className={`w-full px-4 py-2 rounded-lg border ${errors.departmentId ? 'border-red-500' : 'border-gray-cool/20'} focus:outline-none focus:ring-2 focus:ring-teal dark:bg-navy/50 dark:text-white`}
              >
                <option value="">Select a department</option>
                {departments.map((dept) => (
                  <option key={dept.id} value={dept.id.toString()}>
                    {dept.name}
                  </option>
                ))}
              </select>
              {errors.departmentId && <p className="mt-1 text-sm text-red-500">{errors.departmentId}</p>}
            </div>

            {/* Status */}
            <div>
              <label className="block font-body font-semibold text-navy dark:text-white mb-2">Status</label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg border border-gray-cool/20 focus:outline-none focus:ring-2 focus:ring-teal dark:bg-navy/50 dark:text-white"
              >
                <option value="ACTIVE">Active</option>
                <option value="ALUMNI">Alumni</option>
                <option value="INACTIVE">Inactive</option>
              </select>
            </div>

            {/* Bio */}
            <div>
              <label className="block font-body font-semibold text-navy dark:text-white mb-2">Bio</label>
              <textarea
                name="bio"
                value={formData.bio}
                onChange={handleChange}
                rows={4}
                className={`w-full px-4 py-2 rounded-lg border ${errors.bio ? 'border-red-500' : 'border-gray-cool/20'} focus:outline-none focus:ring-2 focus:ring-teal dark:bg-navy/50 dark:text-white resize-none`}
              />
              {errors.bio && <p className="mt-1 text-sm text-red-500">{errors.bio}</p>}
            </div>

            {/* Join Date */}
            <div>
              <label className="block font-body font-semibold text-navy dark:text-white mb-2">Join Date</label>
              <input
                type="date"
                name="joinDate"
                value={formData.joinDate}
                onChange={handleChange}
                className={`w-full px-4 py-2 rounded-lg border ${errors.joinDate ? 'border-red-500' : 'border-gray-cool/20'} focus:outline-none focus:ring-2 focus:ring-teal dark:bg-navy/50 dark:text-white`}
              />
              {errors.joinDate && <p className="mt-1 text-sm text-red-500">{errors.joinDate}</p>}
            </div>

            {/* LinkedIn */}
            <div>
              <label className="block font-body font-semibold text-navy dark:text-white mb-2">LinkedIn URL</label>
              <input
                type="url"
                name="socialLinkedIn"
                value={formData.socialLinkedIn}
                onChange={handleChange}
                className={`w-full px-4 py-2 rounded-lg border ${errors.socialLinkedIn ? 'border-red-500' : 'border-gray-cool/20'} focus:outline-none focus:ring-2 focus:ring-teal dark:bg-navy/50 dark:text-white`}
              />
              {errors.socialLinkedIn && <p className="mt-1 text-sm text-red-500">{errors.socialLinkedIn}</p>}
            </div>

            {/* GitHub */}
            <div>
              <label className="block font-body font-semibold text-navy dark:text-white mb-2">GitHub URL</label>
              <input
                type="url"
                name="socialGitHub"
                value={formData.socialGitHub}
                onChange={handleChange}
                className={`w-full px-4 py-2 rounded-lg border ${errors.socialGitHub ? 'border-red-500' : 'border-gray-cool/20'} focus:outline-none focus:ring-2 focus:ring-teal dark:bg-navy/50 dark:text-white`}
              />
              {errors.socialGitHub && <p className="mt-1 text-sm text-red-500">{errors.socialGitHub}</p>}
            </div>

            {/* Submit Buttons */}
            <div className="flex gap-4 pt-4">
              <button
                type="submit"
                disabled={saving}
                className="flex-1 px-6 py-3 bg-teal text-white rounded-lg hover:bg-teal/90 disabled:opacity-50 transition-colors font-heading font-semibold"
              >
                {saving ? 'Saving...' : 'Save Changes'}
              </button>
              <Link
                href="/admin/members"
                className="flex-1 px-6 py-3 bg-gray-200 text-gray-800 dark:bg-navy/50 dark:text-white rounded-lg hover:bg-gray-300 transition-colors font-heading font-semibold text-center"
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

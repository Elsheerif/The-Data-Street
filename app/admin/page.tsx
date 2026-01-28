'use client';

import { useEffect, useState } from 'react';
import { Users, FolderOpen, FileText, Calendar, TrendingUp, Activity } from 'lucide-react';
import Link from 'next/link';

interface DashboardStats {
  totalMembers: number;
  activeMembers: number;
  totalDepartments: number;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats>({
    totalMembers: 0,
    activeMembers: 0,
    totalDepartments: 0,
  });
  const [loading, setLoading] = useState(true);
  const [activityLog, setActivityLog] = useState<any[]>([]);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch('/api/members');
        if (!res.ok) throw new Error('Failed to fetch members');
        const members = await res.json();

        const deptRes = await fetch('/api/departments');
        if (!deptRes.ok) throw new Error('Failed to fetch departments');
        const departments = await deptRes.json();

        setStats({
          totalMembers: members.length,
          activeMembers: members.filter((m: any) => m.status === 'ACTIVE').length,
          totalDepartments: departments.length,
        });
      } catch (error) {
        console.error('Error fetching stats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const statCards = [
    {
      title: 'Total Members',
      value: stats.totalMembers,
      icon: Users,
      color: 'text-blue-600 bg-blue-100 dark:bg-blue-900/20',
    },
    {
      title: 'Active Members',
      value: stats.activeMembers,
      icon: Users,
      color: 'text-emerald-600 bg-emerald-100 dark:bg-emerald-900/20',
    },
    {
      title: 'Departments',
      value: stats.totalDepartments,
      icon: FolderOpen,
      color: 'text-purple-600 bg-purple-100 dark:bg-purple-900/20',
    },
  ];

  return (
    <div>
      <h1 className="font-heading text-3xl font-bold text-navy dark:text-white mb-8">Dashboard</h1>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {statCards.map((card) => {
          const Icon = card.icon;
          return (
            <div
              key={card.title}
              className="bg-white dark:bg-navy rounded-lg shadow p-6 border-l-4 border-teal hover:shadow-lg transition-shadow"
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="font-body text-sm text-gray-600 dark:text-white/70 mb-2">
                    {card.title}
                  </p>
                  <p className="font-heading text-3xl font-bold text-navy dark:text-white">
                    {loading ? '--' : card.value}
                  </p>
                </div>
                <div className={`p-3 rounded-lg ${card.color}`}>
                  <Icon size={24} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Quick Actions */}
      <div className="bg-white dark:bg-navy rounded-lg shadow p-6 mb-6">
        <h2 className="font-heading text-xl font-bold text-navy dark:text-white mb-6">Quick Actions</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: 'Add Member', href: '/admin/members/add', icon: Users },
            { label: 'Manage Departments', href: '/admin/departments', icon: FolderOpen },
            { label: 'View All Members', href: '/admin/members', icon: Users },
            { label: 'Projects', href: '/admin/projects', icon: FileText },
          ].map((action) => {
            const Icon = action.icon;
            return (
              <Link
                key={action.label}
                href={action.href}
                className="flex items-center gap-3 p-4 rounded-lg bg-gray-50 dark:bg-navy/50 hover:bg-teal/10 hover:shadow transition-all"
              >
                <Icon className="text-teal" size={20} />
                <span className="font-body font-medium text-navy dark:text-white">{action.label}</span>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white dark:bg-navy rounded-lg shadow p-6">
        <div className="flex items-center gap-2 mb-6">
          <Activity className="text-teal" size={20} />
          <h2 className="font-heading text-xl font-bold text-navy dark:text-white">
            Recent Activity
          </h2>
        </div>

        {loading ? (
          <p className="font-body text-gray-600 dark:text-white/70">Loading...</p>
        ) : activityLog.length > 0 ? (
          <div className="space-y-4">
            {activityLog.map((log) => (
              <div key={log.id} className="flex items-start gap-4 pb-4 border-b border-gray-200 dark:border-white/10 last:border-b-0">
                <div className="w-2 h-2 rounded-full bg-teal mt-2 flex-shrink-0"></div>
                <div className="flex-1 min-w-0">
                  <p className="font-body font-medium text-navy dark:text-white">
                    {log.action}
                  </p>
                  <p className="font-body text-sm text-gray-600 dark:text-white/70">
                    {log.details}
                  </p>
                  <p className="font-body text-xs text-gray-500 dark:text-white/50 mt-1">
                    {new Date(log.timestamp).toLocaleString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="font-body text-gray-600 dark:text-white/70">
            No recent activity. Start managing your team members and departments.
          </p>
        )}
      </div>
    </div>
  );
}

'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, BarChart3, Users, Settings, FileText, Calendar, FolderOpen } from 'lucide-react';
import { ToastProvider } from '@/components/ui/Toast';

function AdminLayoutContent({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const navItems = [
    {
      label: 'Dashboard',
      href: '/admin',
      icon: BarChart3,
    },
    {
      label: 'Members',
      href: '/admin/members',
      icon: Users,
    },
    {
      label: 'Departments',
      href: '/admin/departments',
      icon: FolderOpen,
    },
    {
      label: 'Projects',
      href: '/admin/projects',
      icon: FileText,
    },
    {
      label: 'Events',
      href: '/admin/events',
      icon: Calendar,
    },
    {
      label: 'Settings',
      href: '/admin/settings',
      icon: Settings,
    },
  ];

  const isActive = (href: string) => pathname === href;

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
      {/* Sidebar */}
      <aside
        className={`fixed lg:static w-64 h-screen bg-navy dark:bg-black text-white transition-transform duration-300 z-40 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div className="p-6 border-b border-white/10">
          <h1 className="font-heading text-2xl font-bold text-teal">Data Street</h1>
          <p className="font-body text-sm text-white/70">Admin Dashboard</p>
        </div>

        <nav className="p-4 space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg font-body text-sm font-medium transition-colors ${
                  active
                    ? 'bg-teal text-white'
                    : 'text-white/80 hover:bg-white/10 hover:text-white'
                }`}
                onClick={() => setSidebarOpen(false)}
              >
                <Icon size={20} />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="absolute bottom-6 left-4 right-4 p-4 bg-white/10 rounded-lg">
          <p className="font-body text-xs text-white/70">Logged in as Admin</p>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Bar */}
        <header className="bg-white dark:bg-navy border-b border-gray-cool/20 h-16 flex items-center px-6 gap-4">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="lg:hidden text-navy dark:text-white p-2 hover:bg-gray-100 dark:hover:bg-white/10 rounded-lg"
          >
            {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          <div className="flex-1"></div>

          <div className="flex items-center gap-4">
            <p className="font-body text-sm text-gray-600 dark:text-white/70">
              {new Date().toLocaleDateString('en-US', {
                weekday: 'long',
                month: 'short',
                day: 'numeric',
              })}
            </p>
          </div>
        </header>

        {/* Content Area */}
        <main className="flex-1 overflow-auto p-6">
          {children}
        </main>
      </div>

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}
    </div>
  );
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <ToastProvider>
      <AdminLayoutContent>{children}</AdminLayoutContent>
    </ToastProvider>
  );
}

'use client';

import { useState } from 'react';
import { Plus } from 'lucide-react';
import Link from 'next/link';

export default function ProjectsAdmin() {
  const [projects] = useState([]);

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-heading text-3xl font-bold text-navy dark:text-white">Projects</h1>
          <p className="font-body text-gray-600 dark:text-white/70">Manage organization projects and initiatives</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-teal text-white rounded-lg hover:bg-teal/90 transition-colors font-medium">
          <Plus size={20} />
          <span>Add Project</span>
        </button>
      </div>

      {/* Projects Grid */}
      <div className="bg-white dark:bg-navy rounded-lg shadow p-8 text-center">
        {projects.length === 0 ? (
          <div className="py-12">
            <p className="font-body text-gray-600 dark:text-white/70 mb-4">No projects yet</p>
            <p className="font-body text-sm text-gray-500 dark:text-white/50">
              Create your first project to get started
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Project cards will go here */}
          </div>
        )}
      </div>

      {/* Additional features */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-navy rounded-lg shadow p-6">
          <h3 className="font-heading font-semibold text-navy dark:text-white mb-2">Total Projects</h3>
          <p className="font-heading text-3xl font-bold text-teal">{projects.length}</p>
        </div>
        <div className="bg-white dark:bg-navy rounded-lg shadow p-6">
          <h3 className="font-heading font-semibold text-navy dark:text-white mb-2">Active Projects</h3>
          <p className="font-heading text-3xl font-bold text-emerald-600">0</p>
        </div>
        <div className="bg-white dark:bg-navy rounded-lg shadow p-6">
          <h3 className="font-heading font-semibold text-navy dark:text-white mb-2">Completed</h3>
          <p className="font-heading text-3xl font-bold text-blue-600">0</p>
        </div>
      </div>
    </div>
  );
}

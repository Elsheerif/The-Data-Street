'use client';

import { useState } from 'react';
import { Plus, Calendar } from 'lucide-react';

export default function EventsAdmin() {
  const [events] = useState([]);

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-heading text-3xl font-bold text-navy dark:text-white">Events</h1>
          <p className="font-body text-gray-600 dark:text-white/70">Manage workshops, talks, and other events</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-teal text-white rounded-lg hover:bg-teal/90 transition-colors font-medium">
          <Plus size={20} />
          <span>Create Event</span>
        </button>
      </div>

      {/* Events List */}
      <div className="bg-white dark:bg-navy rounded-lg shadow p-8 text-center">
        {events.length === 0 ? (
          <div className="py-12">
            <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="font-body text-gray-600 dark:text-white/70 mb-2">No events yet</p>
            <p className="font-body text-sm text-gray-500 dark:text-white/50">
              Create your first event to get started
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {/* Event items will go here */}
          </div>
        )}
      </div>

      {/* Event Stats */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-navy rounded-lg shadow p-6">
          <h3 className="font-heading font-semibold text-navy dark:text-white mb-2">Total Events</h3>
          <p className="font-heading text-3xl font-bold text-teal">{events.length}</p>
        </div>
        <div className="bg-white dark:bg-navy rounded-lg shadow p-6">
          <h3 className="font-heading font-semibold text-navy dark:text-white mb-2">Upcoming</h3>
          <p className="font-heading text-3xl font-bold text-blue-600">0</p>
        </div>
        <div className="bg-white dark:bg-navy rounded-lg shadow p-6">
          <h3 className="font-heading font-semibold text-navy dark:text-white mb-2">Total Registrations</h3>
          <p className="font-heading text-3xl font-bold text-emerald-600">0</p>
        </div>
      </div>
    </div>
  );
}

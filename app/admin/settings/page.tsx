'use client';

import { useState } from 'react';
import { Save } from 'lucide-react';
import { useToast } from '@/components/ui/Toast';

export default function SettingsAdmin() {
  const [settings, setSettings] = useState({
    organizationName: 'Data Street',
    description: 'Empowering the Next Generation of Data Innovators',
    contactEmail: 'contact@datastreet.org',
    phone: '+1 (555) 123-4567',
  });
  const [saving, setSaving] = useState(false);
  const { addToast } = useToast();

  const handleChange = (field: string, value: string) => {
    setSettings(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      // Simulate saving settings
      await new Promise(resolve => setTimeout(resolve, 1000));
      addToast('Settings saved successfully', 'success');
    } catch (error) {
      addToast('Failed to save settings', 'error');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div>
      <h1 className="font-heading text-3xl font-bold text-navy dark:text-white mb-8">Settings</h1>

      {/* Organization Settings */}
      <div className="bg-white dark:bg-navy rounded-lg shadow p-6 mb-6">
        <h2 className="font-heading text-xl font-bold text-navy dark:text-white mb-6">Organization Settings</h2>

        <div className="space-y-6">
          <div>
            <label className="block font-heading font-semibold text-navy dark:text-white mb-2">
              Organization Name
            </label>
            <input
              type="text"
              value={settings.organizationName}
              onChange={(e) => handleChange('organizationName', e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal dark:bg-navy/50 dark:text-white dark:border-white/10"
            />
          </div>

          <div>
            <label className="block font-heading font-semibold text-navy dark:text-white mb-2">
              Description
            </label>
            <textarea
              value={settings.description}
              onChange={(e) => handleChange('description', e.target.value)}
              rows={4}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal dark:bg-navy/50 dark:text-white dark:border-white/10"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block font-heading font-semibold text-navy dark:text-white mb-2">
                Contact Email
              </label>
              <input
                type="email"
                value={settings.contactEmail}
                onChange={(e) => handleChange('contactEmail', e.target.value)}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal dark:bg-navy/50 dark:text-white dark:border-white/10"
              />
            </div>

            <div>
              <label className="block font-heading font-semibold text-navy dark:text-white mb-2">
                Phone
              </label>
              <input
                type="tel"
                value={settings.phone}
                onChange={(e) => handleChange('phone', e.target.value)}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal dark:bg-navy/50 dark:text-white dark:border-white/10"
              />
            </div>
          </div>

          <button
            onClick={handleSave}
            disabled={saving}
            className="flex items-center gap-2 px-6 py-2 bg-teal text-white rounded-lg hover:bg-teal/90 transition-colors disabled:opacity-50 font-medium"
          >
            <Save size={20} />
            {saving ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </div>

      {/* Feature Visibility */}
      <div className="bg-white dark:bg-navy rounded-lg shadow p-6">
        <h2 className="font-heading text-xl font-bold text-navy dark:text-white mb-6">Feature Visibility</h2>

        <div className="space-y-4">
          {[
            { name: 'Blog', enabled: true },
            { name: 'Projects', enabled: true },
            { name: 'Events', enabled: true },
            { name: 'Team Members', enabled: true },
            { name: 'Contact Form', enabled: true },
          ].map(feature => (
            <div key={feature.name} className="flex items-center justify-between">
              <span className="font-body font-medium text-navy dark:text-white">{feature.name}</span>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" defaultChecked={feature.enabled} className="sr-only peer" />
                <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-teal rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-teal"></div>
              </label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

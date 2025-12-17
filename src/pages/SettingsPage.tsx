import React, { useState } from 'react';
import { Link } from 'react-router-dom';

interface SettingSection {
  title: string;
  settings: {
    id: string;
    label: string;
    description?: string;
    type: 'toggle' | 'link';
    defaultValue?: boolean;
    linkTo?: string;
  }[];
}

const settingSections: SettingSection[] = [
  {
    title: 'Feed Settings',
    settings: [
      { id: 'sensitive', label: 'Show sensitive content', description: 'Display content that may be sensitive', type: 'toggle', defaultValue: false },
      { id: 'friends', label: 'Prioritize friends', description: 'Show posts from friends first', type: 'toggle', defaultValue: true },
      { id: 'ads', label: 'Reduce ads', description: 'See fewer promotional content', type: 'toggle', defaultValue: true },
    ],
  },
  {
    title: 'Notifications',
    settings: [
      { id: 'push', label: 'Push notifications', description: 'Receive push notifications', type: 'toggle', defaultValue: true },
      { id: 'email', label: 'Email notifications', description: 'Receive email updates', type: 'toggle', defaultValue: false },
      { id: 'sounds', label: 'Notification sounds', description: 'Play sound for notifications', type: 'toggle', defaultValue: true },
    ],
  },
  {
    title: 'Privacy',
    settings: [
      { id: 'private', label: 'Private account', description: 'Only approved followers can see your posts', type: 'toggle', defaultValue: false },
      { id: 'activity', label: 'Show activity status', description: 'Let others see when you are online', type: 'toggle', defaultValue: true },
      { id: 'read', label: 'Show read receipts', description: 'Let others know when you have read their messages', type: 'toggle', defaultValue: true },
    ],
  },
  {
    title: 'Account',
    settings: [
      { id: 'edit-profile', label: 'Edit profile', type: 'link', linkTo: '/profile/edit' },
      { id: 'change-password', label: 'Change password', type: 'link', linkTo: '/settings/password' },
      { id: 'blocked', label: 'Blocked accounts', type: 'link', linkTo: '/settings/blocked' },
      { id: 'download', label: 'Download your data', type: 'link', linkTo: '/settings/download' },
    ],
  },
];

const SettingsPage: React.FC = () => {
  const [settings, setSettings] = useState<Record<string, boolean>>(() => {
    const initial: Record<string, boolean> = {};
    settingSections.forEach(section => {
      section.settings.forEach(setting => {
        if (setting.type === 'toggle' && setting.defaultValue !== undefined) {
          initial[setting.id] = setting.defaultValue;
        }
      });
    });
    return initial;
  });

  const toggleSetting = (id: string) => {
    setSettings(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="max-w-2xl mx-auto">
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <Link to="/" className="text-gray-400 hover:text-white transition-colors p-2 -ml-2">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </Link>
        <h1 className="text-2xl lg:text-3xl font-bold text-white">Settings</h1>
      </div>

      {/* Settings Sections */}
      <div className="space-y-6">
        {settingSections.map((section) => (
          <div key={section.title} className="glass-card p-5">
            <h2 className="text-lg font-semibold text-white mb-4">{section.title}</h2>
            <div className="space-y-4">
              {section.settings.map((setting) => (
                <div key={setting.id}>
                  {setting.type === 'toggle' ? (
                    <div className="flex items-center justify-between">
                      <div className="flex-1 min-w-0 pr-4">
                        <p className="text-gray-200 font-medium">{setting.label}</p>
                        {setting.description && (
                          <p className="text-gray-500 text-sm mt-0.5">{setting.description}</p>
                        )}
                      </div>
                      <button
                        onClick={() => toggleSetting(setting.id)}
                        className={`toggle-switch flex-shrink-0 ${settings[setting.id] ? 'active' : ''}`}
                        aria-label={`Toggle ${setting.label}`}
                      />
                    </div>
                  ) : (
                    <Link
                      to={setting.linkTo || '#'}
                      className="flex items-center justify-between p-2 -mx-2 rounded-lg hover:bg-white/5 transition-colors group"
                    >
                      <p className="text-gray-200 font-medium group-hover:text-white transition-colors">{setting.label}</p>
                      <svg className="w-5 h-5 text-gray-500 group-hover:text-purple-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Save Button */}
      <div className="mt-8 flex gap-4">
        <button
          onClick={handleSave}
          className={`btn-primary flex-1 py-3 rounded-xl text-white font-medium transition-all ${
            saved ? 'bg-green-600 border-green-500' : ''
          }`}
        >
          {saved ? (
            <span className="flex items-center justify-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Saved!
            </span>
          ) : (
            'Save Changes'
          )}
        </button>
      </div>

      {/* Danger Zone */}
      <div className="mt-8 glass-card p-5 border-red-500/20">
        <h2 className="text-lg font-semibold text-red-400 mb-4">Danger Zone</h2>
        <div className="space-y-3">
          <button className="w-full p-3 rounded-lg text-left text-gray-300 hover:bg-red-500/10 hover:text-red-400 transition-colors">
            Deactivate account
          </button>
          <button className="w-full p-3 rounded-lg text-left text-gray-300 hover:bg-red-500/10 hover:text-red-400 transition-colors">
            Delete account permanently
          </button>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;


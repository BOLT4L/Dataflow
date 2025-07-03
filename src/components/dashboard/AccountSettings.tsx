import React, { useState } from 'react';
import { 
  User, 
  Mail, 
  Lock, 
  CreditCard, 
  Key, 
  Bell, 
  Shield,
  RefreshCw,
  Eye,
  EyeOff,
  Save,
  AlertCircle,
  ExternalLink
} from 'lucide-react';

const AccountSettings = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const tabs = [
    { id: 'security', name: 'Security', icon: Shield },
    { id: 'api', name: 'API Keys', icon: Key },
    { id: 'billing', name: 'Billing', icon: CreditCard },
    { id: 'notifications', name: 'Notifications', icon: Bell },
  ];

  const [profileData, setProfileData] = useState({
    firstName: 'John',
    lastName: 'Doe',
    email: 'john@example.com',
    company: 'Tech Solutions Inc.',
    timezone: 'America/New_York'
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const [notificationSettings, setNotificationSettings] = useState({
    emailReports: true,
    scrapeFailures: true,
    weeklyDigest: false,
    productUpdates: true,
    securityAlerts: true
  });

  const handleProfileSave = () => {
    console.log('Saving profile:', profileData);
  };

  const handlePasswordChange = () => {
    console.log('Changing password');
  };

  const generateNewApiKey = () => {
    console.log('Generating new API key');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="pb-4 border-b border-lovable-purple-900">
        <h1 className="text-2xl font-bold text-lovable-yellow-300">Account Settings</h1>
        <p className="text-darktext mt-1">Manage your account preferences and security settings effortlessly.</p>
      </div>

      {/* Tabs */}
      <div className="bg-darkcard rounded-xl shadow-lg border border-lovable-purple-900 p-6">
        <div className="flex border-b border-lovable-purple-800">
          <nav className="flex space-x-8">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 py-4 px-1 border-b-3 font-semibold text-base transition-all duration-300 ${activeTab === tab.id
                      ? 'border-primary text-primary'
                      : 'border-transparent text-darktext hover:text-primary hover:border-secondary'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  {tab.name}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Tab Content */}
        <div className="mt-8">
          {/* Profile Tab */}
          {activeTab === 'profile' && (
            <div className="space-y-6">
              <h2 className="text-xl font-bold text-lovable-yellow-300 mb-4">Profile Information</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-darktext mb-2">
                    First Name
                  </label>
                  <input
                    type="text"
                    value={profileData.firstName}
                    onChange={(e) => setProfileData({...profileData, firstName: e.target.value})}
                    className="w-full px-4 py-2 border border-darksurface rounded-lg focus:ring-2 focus:ring-primary focus:border-primary bg-darksurface text-darktext placeholder-darktext transition-all duration-200"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-darktext mb-2">
                    Last Name
                  </label>
                  <input
                    type="text"
                    value={profileData.lastName}
                    onChange={(e) => setProfileData({...profileData, lastName: e.target.value})}
                    className="w-full px-4 py-2 border border-darksurface rounded-lg focus:ring-2 focus:ring-primary focus:border-primary bg-darksurface text-darktext placeholder-darktext transition-all duration-200"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-darktext mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  value={profileData.email}
                  onChange={(e) => setProfileData({...profileData, email: e.target.value})}
                  className="w-full px-4 py-2 border border-darksurface rounded-lg focus:ring-2 focus:ring-primary focus:border-primary bg-darksurface text-darktext placeholder-darktext transition-all duration-200"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-darktext mb-2">
                  Company (Optional)
                </label>
                <input
                  type="text"
                  value={profileData.company}
                  onChange={(e) => setProfileData({...profileData, company: e.target.value})}
                  className="w-full px-4 py-2 border border-darksurface rounded-lg focus:ring-2 focus:ring-primary focus:border-primary bg-darksurface text-darktext placeholder-darktext transition-all duration-200"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-darktext mb-2">
                  Timezone
                </label>
                <select
                  value={profileData.timezone}
                  onChange={(e) => setProfileData({...profileData, timezone: e.target.value})}
                  className="w-full px-4 py-2 border border-darksurface rounded-lg focus:ring-2 focus:ring-primary focus:border-primary bg-darksurface text-darktext transition-all duration-200 appearance-none"
                >
                  <option value="America/New_York">Eastern Time (ET)</option>
                  <option value="America/Chicago">Central Time (CT)</option>
                  <option value="America/Denver">Mountain Time (MT)</option>
                  <option value="America/Los_Angeles">Pacific Time (PT)</option>
                  <option value="UTC">UTC</option>
                </select>
              </div>

              <div className="flex justify-end">
                <button
                  onClick={handleProfileSave}
                  className="inline-flex items-center gap-2 bg-primary text-white px-6 py-2.5 rounded-full font-semibold shadow-md hover:bg-lovable-red-600 transition-all duration-300"
                >
                  <Save className="w-5 h-5" />
                  Save Changes
                </button>
              </div>
            </div>
          )}

          {/* Security Tab */}
          {activeTab === 'security' && (
            <div className="space-y-8">
              <h2 className="text-xl font-bold text-lovable-yellow-300 mb-4">Security Settings</h2>
              <div>
                <h3 className="font-bold text-lovable-yellow-300 mb-4">Change Password</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-darktext mb-2">
                      Current Password
                    </label>
                    <div className="relative">
                      <input
                        type={showCurrentPassword ? 'text' : 'password'}
                        value={passwordData.currentPassword}
                        onChange={(e) => setPasswordData({...passwordData, currentPassword: e.target.value})}
                        className="w-full px-4 py-2 pr-12 border border-darksurface rounded-lg focus:ring-2 focus:ring-primary focus:border-primary bg-darksurface text-darktext placeholder-darktext transition-all duration-200"
                      />
                      <button
                        type="button"
                        onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-lovable-purple-400 hover:text-darktext"
                      >
                        {showCurrentPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-darktext mb-2">
                      New Password
                    </label>
                    <div className="relative">
                      <input
                        type={showNewPassword ? 'text' : 'password'}
                        value={passwordData.newPassword}
                        onChange={(e) => setPasswordData({...passwordData, newPassword: e.target.value})}
                        className="w-full px-4 py-2 pr-12 border border-darksurface rounded-lg focus:ring-2 focus:ring-primary focus:border-primary bg-darksurface text-darktext placeholder-darktext transition-all duration-200"
                      />
                      <button
                        type="button"
                        onClick={() => setShowNewPassword(!showNewPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-lovable-purple-400 hover:text-darktext"
                      >
                        {showNewPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-darktext mb-2">
                      Confirm New Password
                    </label>
                    <div className="relative">
                      <input
                        type={showConfirmPassword ? 'text' : 'password'}
                        value={passwordData.confirmPassword}
                        onChange={(e) => setPasswordData({...passwordData, confirmPassword: e.target.value})}
                        className="w-full px-4 py-2 pr-12 border border-darksurface rounded-lg focus:ring-2 focus:ring-primary focus:border-primary bg-darksurface text-darktext placeholder-darktext transition-all duration-200"
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-lovable-purple-400 hover:text-darktext"
                      >
                        {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <button
                      onClick={handlePasswordChange}
                      className="inline-flex items-center gap-2 bg-primary text-white px-6 py-2.5 rounded-full font-semibold shadow-md hover:bg-lovable-red-600 transition-all duration-300"
                    >
                      <Save className="w-5 h-5" />
                      Change Password
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* API Keys Tab */}
          {activeTab === 'api' && (
            <div className="space-y-6">
              <h2 className="text-xl font-bold text-lovable-yellow-300 mb-4">API Keys</h2>
              <div className="bg-darksurface p-8 rounded-xl border border-darksurface text-center">
                <p className="text-darktext text-lg font-semibold">Coming soon ...</p>
              </div>
            </div>
          )}

          {/* Billing Tab */}
          {activeTab === 'billing' && (
            <div className="space-y-6">
              <h2 className="text-xl font-bold text-lovable-yellow-300 mb-4">Billing</h2>
              <div className="bg-darksurface p-8 rounded-xl border border-darksurface text-center">
                <p className="text-darktext text-lg font-semibold">Coming soon ...</p>
              </div>
            </div>
          )}

          {/* Notifications Tab */}
          {activeTab === 'notifications' && (
            <div className="space-y-6">
              <h2 className="text-xl font-bold text-lovable-yellow-300 mb-4">Notification Preferences</h2>
              <div className="bg-lovable-purple-800 p-6 rounded-lg border border-lovable-purple-700 space-y-4">
                <p className="text-darktext leading-relaxed">
                  Choose which email notifications you'd like to receive.
                </p>
                <div className="space-y-3">
                  <label className="flex items-center justify-between cursor-pointer">
                    <span className="text-darktext">Email Reports</span>
                    <input
                      type="checkbox"
                      checked={notificationSettings.emailReports}
                      onChange={(e) => setNotificationSettings({...notificationSettings, emailReports: e.target.checked})}
                      className="toggle-switch"
                    />
                  </label>
                  <label className="flex items-center justify-between cursor-pointer">
                    <span className="text-darktext">Scrape Failure Alerts</span>
                    <input
                      type="checkbox"
                      checked={notificationSettings.scrapeFailures}
                      onChange={(e) => setNotificationSettings({...notificationSettings, scrapeFailures: e.target.checked})}
                      className="toggle-switch"
                    />
                  </label>
                  <label className="flex items-center justify-between cursor-pointer">
                    <span className="text-darktext">Weekly Digest</span>
                    <input
                      type="checkbox"
                      checked={notificationSettings.weeklyDigest}
                      onChange={(e) => setNotificationSettings({...notificationSettings, weeklyDigest: e.target.checked})}
                      className="toggle-switch"
                    />
                  </label>
                  <label className="flex items-center justify-between cursor-pointer">
                    <span className="text-darktext">Product Updates & News</span>
                    <input
                      type="checkbox"
                      checked={notificationSettings.productUpdates}
                      onChange={(e) => setNotificationSettings({...notificationSettings, productUpdates: e.target.checked})}
                      className="toggle-switch"
                    />
                  </label>
                  <label className="flex items-center justify-between cursor-pointer">
                    <span className="text-darktext">Security Alerts</span>
                    <input
                      type="checkbox"
                      checked={notificationSettings.securityAlerts}
                      onChange={(e) => setNotificationSettings({...notificationSettings, securityAlerts: e.target.checked})}
                      className="toggle-switch"
                    />
                  </label>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AccountSettings;
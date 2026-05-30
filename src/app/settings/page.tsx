'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  User,
  Bell,
  Shield,
  Users,
  CreditCard,
  Key,
  Save,
  Camera,
  Mail,
  Phone,
  MapPin,
  Building2,
  Eye,
  EyeOff
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Sidebar, MobileHeader } from '@/components/layout/sidebar'

const tabs = [
  { id: 'profile', label: 'Profile', icon: User },
  { id: 'notifications', label: 'Notifications', icon: Bell },
  { id: 'security', label: 'Security', icon: Shield },
  { id: 'team', label: 'Team', icon: Users },
  { id: 'billing', label: 'Billing', icon: CreditCard },
  { id: 'api', label: 'API Keys', icon: Key }
]

export default function SettingsPage() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [activeTab, setActiveTab] = useState('profile')
  const [showPassword, setShowPassword] = useState(false)

  return (
    <div className="min-h-screen bg-black">
      <Sidebar collapsed={sidebarCollapsed} onToggle={() => setSidebarCollapsed(!sidebarCollapsed)} />
      <MobileHeader onMenuToggle={() => setSidebarCollapsed(!sidebarCollapsed)} />

      <main className={cn(
        'min-h-screen transition-all duration-300 pt-14 lg:pt-0',
        sidebarCollapsed ? 'lg:pl-[72px]' : 'lg:pl-[260px]'
      )}>
        {/* Header */}
        <div className="px-6 py-6 border-b border-gray-850">
          <h1 className="font-serif text-2xl text-white">Settings</h1>
          <p className="text-sm text-gray-500">Manage your account preferences</p>
        </div>

        <div className="flex flex-col md:flex-row">
          {/* Sidebar Tabs */}
          <div className="w-64 border-r border-gray-850 p-4 hidden md:block">
            <nav className="space-y-1">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={cn(
                    'w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors',
                    activeTab === tab.id
                      ? 'bg-orange/10 text-orange'
                      : 'text-gray-400 hover:bg-gray-850 hover:text-white'
                  )}
                >
                  <tab.icon className="w-5 h-5" />
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>

          {/* Mobile Tabs */}
          <div className="md:hidden w-full px-4 py-3 border-b border-gray-850 overflow-x-auto">
            <div className="flex gap-2">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={cn(
                    'flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors',
                    activeTab === tab.id
                      ? 'bg-orange text-white'
                      : 'bg-gray-850 text-gray-400'
                  )}
                >
                  <tab.icon className="w-4 h-4" />
                </button>
              ))}
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 p-6">
            {/* Profile Tab */}
            {activeTab === 'profile' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-2xl space-y-6"
              >
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-lg font-medium text-white">Profile Information</h2>
                  <Badge variant="success">Verified</Badge>
                </div>

                {/* Avatar */}
                <div className="flex items-center gap-6">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-orange to-orange-600 flex items-center justify-center text-2xl font-medium text-white">
                    TD
                  </div>
                  <div>
                    <Button variant="outline" size="sm" leftIcon={<Camera className="w-4 h-4" />}>
                      Change Photo
                    </Button>
                    <p className="text-xs text-gray-500 mt-2">JPG, PNG or GIF. Max 2MB.</p>
                  </div>
                </div>

                {/* Form */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-gray-500 mb-2">Full Name</label>
                    <Input defaultValue="Tushar Dhokane" />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-500 mb-2">Email</label>
                    <Input type="email" defaultValue="tushar@example.com" />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-500 mb-2">Phone</label>
                    <Input type="tel" defaultValue="+91 98765 43210" />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-500 mb-2">Role</label>
                    <Input defaultValue="Admin" disabled />
                  </div>
                </div>

                <div>
                  <label className="block text-sm text-gray-500 mb-2">Organization</label>
                  <Input defaultValue="LANDGRID" />
                </div>

                <div className="flex items-center justify-between pt-4">
                  <Button variant="outline">Cancel</Button>
                  <Button leftIcon={<Save className="w-4 h-4" />}>
                    Save Changes
                  </Button>
                </div>
              </motion.div>
            )}

            {/* Notifications Tab */}
            {activeTab === 'notifications' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-2xl space-y-6"
              >
                <h2 className="text-lg font-medium text-white mb-6">Notification Preferences</h2>

                <div className="space-y-4">
                  {[
                    { label: 'New offers received', description: 'Get notified when someone makes an offer', enabled: true },
                    { label: 'Offer updates', description: 'Counter offers, acceptances, declines', enabled: true },
                    { label: 'Parcel verification complete', description: 'When a parcel you follow is verified', enabled: true },
                    { label: 'Price changes', description: 'When parcels in your watchlist change price', enabled: false },
                    { label: 'New matches', description: 'When new parcels match your saved searches', enabled: true },
                    { label: 'System announcements', description: 'Important platform updates', enabled: true }
                  ].map((item, index) => (
                    <div key={index} className="flex items-center justify-between p-4 rounded-lg bg-gray-950 border border-gray-850">
                      <div>
                        <p className="text-sm font-medium text-white">{item.label}</p>
                        <p className="text-xs text-gray-500">{item.description}</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" defaultChecked={item.enabled} className="sr-only peer" />
                        <div className="w-11 h-6 bg-gray-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange"></div>
                      </label>
                    </div>
                  ))}
                </div>

                <div className="pt-4">
                  <Button>Save Preferences</Button>
                </div>
              </motion.div>
            )}

            {/* Security Tab */}
            {activeTab === 'security' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-2xl space-y-6"
              >
                <h2 className="text-lg font-medium text-white mb-6">Security Settings</h2>

                {/* Password */}
                <div className="p-4 rounded-lg bg-gray-950 border border-gray-850">
                  <h3 className="text-sm font-medium text-white mb-4">Change Password</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm text-gray-500 mb-2">Current Password</label>
                      <div className="relative">
                        <Input type={showPassword ? 'text' : 'password'} placeholder="••••••••" />
                        <button
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                        >
                          {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm text-gray-500 mb-2">New Password</label>
                        <Input type="password" placeholder="••••••••" />
                      </div>
                      <div>
                        <label className="block text-sm text-gray-500 mb-2">Confirm Password</label>
                        <Input type="password" placeholder="••••••••" />
                      </div>
                    </div>
                    <Button>Update Password</Button>
                  </div>
                </div>

                {/* Two Factor */}
                <div className="p-4 rounded-lg bg-gray-950 border border-gray-850">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="text-sm font-medium text-white">Two-Factor Authentication</h3>
                      <p className="text-xs text-gray-500 mt-1">Add an extra layer of security</p>
                    </div>
                    <Badge variant="success">Enabled</Badge>
                  </div>
                  <Button variant="outline">Manage 2FA</Button>
                </div>

                {/* Sessions */}
                <div className="p-4 rounded-lg bg-gray-950 border border-gray-850">
                  <h3 className="text-sm font-medium text-white mb-4">Active Sessions</h3>
                  <div className="space-y-3">
                    {[
                      { device: 'Chrome on Windows', location: 'Mumbai, India', current: true, lastActive: 'Now' },
                      { device: 'Safari on iPhone', location: 'Mumbai, India', current: false, lastActive: '2 days ago' }
                    ].map((session, index) => (
                      <div key={index} className="flex items-center justify-between py-3 border-b border-gray-800 last:border-0">
                        <div>
                          <p className="text-sm text-white">{session.device}</p>
                          <p className="text-xs text-gray-500">{session.location} • {session.lastActive}</p>
                        </div>
                        {session.current ? (
                          <Badge variant="success">Current</Badge>
                        ) : (
                          <Button variant="ghost" size="sm">Revoke</Button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {/* Team Tab */}
            {activeTab === 'team' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-2xl space-y-6"
              >
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-medium text-white">Team Members</h2>
                  <Button leftIcon={<Users className="w-4 h-4" />}>Invite Member</Button>
                </div>

                <div className="space-y-4">
                  {[
                    { name: 'Tushar Dhokane', email: 'tushar@example.com', role: 'Owner', avatar: 'TD' },
                    { name: 'Rajesh Kumar', email: 'rajesh@example.com', role: 'Admin', avatar: 'RK' },
                    { name: 'Priya Sharma', email: 'priya@example.com', role: 'Member', avatar: 'PS' }
                  ].map((member, index) => (
                    <div key={index} className="flex items-center justify-between p-4 rounded-lg bg-gray-950 border border-gray-850">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-sm font-medium text-gray-400">
                          {member.avatar}
                        </div>
                        <div>
                          <p className="text-sm font-medium text-white">{member.name}</p>
                          <p className="text-xs text-gray-500">{member.email}</p>
                        </div>
                      </div>
                      <Badge variant={member.role === 'Owner' ? 'warning' : 'default'}>
                        {member.role}
                      </Badge>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Billing Tab */}
            {activeTab === 'billing' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-2xl space-y-6"
              >
                <h2 className="text-lg font-medium text-white mb-6">Billing & Subscription</h2>

                <div className="p-6 rounded-xl bg-gradient-to-br from-orange/10 to-transparent border border-orange/30">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <Badge variant="orange">Enterprise Plan</Badge>
                      <p className="text-2xl font-serif text-white mt-2">₹1,00,000<span className="text-sm text-gray-500">/month</span></p>
                    </div>
                    <Button variant="outline">Manage Plan</Button>
                  </div>
                  <p className="text-sm text-gray-500">Next billing date: June 15, 2026</p>
                </div>

                <div className="p-4 rounded-lg bg-gray-950 border border-gray-850">
                  <h3 className="text-sm font-medium text-white mb-4">Payment Method</h3>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-8 rounded bg-gray-800 flex items-center justify-center text-xs font-bold text-gray-400">VISA</div>
                      <div>
                        <p className="text-sm text-white">•••• •••• •••• 4242</p>
                        <p className="text-xs text-gray-500">Expires 12/2027</p>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm">Update</Button>
                  </div>
                </div>
              </motion.div>
            )}

            {/* API Tab */}
            {activeTab === 'api' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-2xl space-y-6"
              >
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-medium text-white">API Keys</h2>
                  <Button leftIcon={<Key className="w-4 h-4" />}>Create Key</Button>
                </div>

                <div className="space-y-4">
                  {[
                    { name: 'Production API', key: 'pa_live_xxxxxxxxxxxxxxxxxxxx', created: '2026-05-01', lastUsed: '2 hours ago' },
                    { name: 'Development API', key: 'pa_test_xxxxxxxxxxxxxxxxxxxx', created: '2026-04-15', lastUsed: '5 minutes ago' }
                  ].map((api, index) => (
                    <div key={index} className="p-4 rounded-lg bg-gray-950 border border-gray-850">
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="text-sm font-medium text-white">{api.name}</h3>
                        <Button variant="ghost" size="sm">Regenerate</Button>
                      </div>
                      <div className="flex items-center gap-2 mb-3">
                        <code className="flex-1 px-3 py-2 rounded bg-gray-900 text-xs font-mono text-gray-400">
                          {api.key}
                        </code>
                        <Button variant="outline" size="sm">Copy</Button>
                      </div>
                      <p className="text-xs text-gray-500">
                        Created {api.created} • Last used {api.lastUsed}
                      </p>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}
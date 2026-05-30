'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  Users,
  Building2,
  Shield,
  FileCheck,
  BarChart3,
  AlertTriangle,
  Clock,
  Search,
  Filter,
  MoreHorizontal,
  Check,
  X,
  Eye,
  Edit,
  Trash2,
  Plus,
  TrendingUp,
  TrendingDown,
  Activity,
  Database,
  Lock,
  EyeOff
} from 'lucide-react'
import { cn, formatDate, formatCurrency } from '@/lib/utils'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Sidebar, MobileHeader } from '@/components/layout/sidebar'

// Mock data
const stats = [
  { label: 'Total Users', value: '1,247', change: 12, icon: Users, color: 'text-orange' },
  { label: 'Active Parcels', value: '2,891', change: 8, icon: Building2, color: 'text-success' },
  { label: 'Verifications', value: '456', change: 15, icon: Shield, color: 'text-info' },
  { label: 'Transactions', value: '₹156 Cr', change: -3, icon: BarChart3, color: 'text-warning' }
]

const users = [
  { id: '1', name: 'Rajesh Kumar', email: 'rajesh@example.com', role: 'ADMIN', status: 'ACTIVE', lastLogin: '2026-05-30', organization: 'LANDGRID' },
  { id: '2', name: 'Priya Sharma', email: 'priya@example.com', role: 'BROKER', status: 'ACTIVE', lastLogin: '2026-05-29', organization: 'Sunrise Properties' },
  { id: '3', name: 'Amit Singh', email: 'amit@example.com', role: 'BUYER', status: 'PENDING', lastLogin: '2026-05-28', organization: null },
  { id: '4', name: 'Vikram Rao', email: 'vikram@example.com', role: 'INVESTOR', status: 'ACTIVE', lastLogin: '2026-05-27', organization: 'Horizon Capital' },
  { id: '5', name: 'Sneha Patel', email: 'sneha@example.com', role: 'VERIFICATION_OFFICER', status: 'ACTIVE', lastLogin: '2026-05-26', organization: 'LANDGRID' }
]

const verificationQueue = [
  { id: '1', parcelId: 'PA-2026-9L4N7X', location: 'Sarjapur, Bangalore', status: 'PENDING', submittedBy: 'Rajesh Mehta', submittedAt: '2026-05-30T10:30:00' },
  { id: '2', parcelId: 'PA-2026-8K3M2N', location: 'Electronic City', status: 'IN_REVIEW', submittedBy: 'Priya Sharma', submittedAt: '2026-05-29T14:20:00' },
  { id: '3', parcelId: 'PA-2026-7X9P4Q', location: 'Hinjewadi, Pune', status: 'PENDING', submittedBy: 'Amit Singh', submittedAt: '2026-05-29T09:15:00' }
]

const auditLogs = [
  { id: '1', action: 'USER_LOGIN', user: 'Rajesh Kumar', entity: 'System', timestamp: '2026-05-30T10:45:00', ip: '192.168.1.1' },
  { id: '2', action: 'PARCEL_VERIFIED', user: 'Sneha Patel', entity: 'PA-2026-8K3M2N', timestamp: '2026-05-30T09:30:00', ip: '192.168.1.5' },
  { id: '3', action: 'OFFER_CREATED', user: 'Amit Singh', entity: 'PA-2026-7X9P4Q', timestamp: '2026-05-29T16:45:00', ip: '10.0.0.1' },
  { id: '4', action: 'USER_ROLE_CHANGED', user: 'Admin', entity: 'Priya Sharma', timestamp: '2026-05-29T11:20:00', ip: '192.168.1.1' }
]

const roleColors: Record<string, string> = {
  SUPER_ADMIN: 'error',
  ADMIN: 'warning',
  BROKER: 'info',
  BUYER: 'success',
  SELLER: 'success',
  INVESTOR: 'orange',
  VERIFICATION_OFFICER: 'info'
}

export default function AdminPage() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [activeTab, setActiveTab] = useState('overview')
  const [searchQuery, setSearchQuery] = useState('')

  const tabs = [
    { id: 'overview', label: 'Overview', icon: Activity },
    { id: 'users', label: 'Users', icon: Users },
    { id: 'verification', label: 'Verification Queue', icon: Shield },
    { id: 'audit', label: 'Audit Logs', icon: Database }
  ]

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
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="font-serif text-2xl text-white">Admin Control Center</h1>
              <p className="text-sm text-gray-500">Enterprise management and monitoring</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-64 h-10 pl-10 pr-4 bg-gray-950 border border-gray-800 rounded-lg text-sm text-white placeholder:text-gray-500 focus:outline-none focus:border-orange"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="px-6 border-b border-gray-850">
          <div className="flex overflow-x-auto no-scrollbar">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  'flex items-center gap-2 px-6 py-4 text-sm font-medium border-b-2 transition-colors whitespace-nowrap',
                  activeTab === tab.id
                    ? 'border-orange text-orange'
                    : 'border-transparent text-gray-500 hover:text-white'
                )}
              >
                <tab.icon className="w-4 h-4" />
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              {/* Stats Grid */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {stats.map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="p-5 rounded-xl bg-gray-950 border border-gray-850"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-sm text-gray-500">{stat.label}</span>
                      <stat.icon className={cn('w-5 h-5', stat.color)} />
                    </div>
                    <p className="text-2xl font-serif text-white">{stat.value}</p>
                    <div className={cn(
                      'flex items-center gap-1 mt-2 text-xs',
                      stat.change >= 0 ? 'text-success' : 'text-error'
                    )}>
                      {stat.change >= 0 ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                      <span>{Math.abs(stat.change)}% from last month</span>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Quick Actions */}
              <div className="grid md:grid-cols-3 gap-4">
                <div className="p-6 rounded-xl bg-gray-950 border border-gray-850">
                  <h3 className="text-lg font-medium text-white mb-4">System Health</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500">Database</span>
                      <Badge variant="success">Healthy</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500">API Response</span>
                      <Badge variant="success">98ms avg</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500">Error Rate</span>
                      <Badge variant="success">0.1%</Badge>
                    </div>
                  </div>
                </div>

                <div className="p-6 rounded-xl bg-gray-950 border border-gray-850">
                  <h3 className="text-lg font-medium text-white mb-4">Pending Actions</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500">Verification Queue</span>
                      <span className="text-sm font-medium text-warning">12</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500">Flagged Parcels</span>
                      <span className="text-sm font-medium text-error">3</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500">Support Tickets</span>
                      <span className="text-sm font-medium text-info">5</span>
                    </div>
                  </div>
                </div>

                <div className="p-6 rounded-xl bg-gray-950 border border-gray-850">
                  <h3 className="text-lg font-medium text-white mb-4">Security Alerts</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500">Failed Logins</span>
                      <span className="text-sm font-medium text-gray-400">2 today</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500">Suspicious Activity</span>
                      <span className="text-sm font-medium text-success">None</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500">Data Exports</span>
                      <span className="text-sm font-medium text-gray-400">8 this week</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Users Tab */}
          {activeTab === 'users' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-medium text-white">User Management</h2>
                <Button leftIcon={<Plus className="w-4 h-4" />}>
                  Add User
                </Button>
              </div>

              <div className="rounded-xl border border-gray-850 overflow-hidden">
                <table className="w-full">
                  <thead className="bg-gray-950">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">User</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Role</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Organization</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Last Login</th>
                      <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-850">
                    {users.map((user) => (
                      <tr key={user.id} className="hover:bg-gray-900/50">
                        <td className="px-4 py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center text-sm font-medium text-gray-400">
                              {user.name.split(' ').map(n => n[0]).join('')}
                            </div>
                            <div>
                              <p className="text-sm font-medium text-white">{user.name}</p>
                              <p className="text-xs text-gray-500">{user.email}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-4">
                          <Badge variant={roleColors[user.role] as any}>
                            {user.role.replace('_', ' ')}
                          </Badge>
                        </td>
                        <td className="px-4 py-4">
                          <span className="text-sm text-gray-400">
                            {user.organization || '—'}
                          </span>
                        </td>
                        <td className="px-4 py-4">
                          <Badge variant={user.status === 'ACTIVE' ? 'success' : 'warning'}>
                            {user.status}
                          </Badge>
                        </td>
                        <td className="px-4 py-4">
                          <span className="text-sm text-gray-500">
                            {formatDate(user.lastLogin, 'relative')}
                          </span>
                        </td>
                        <td className="px-4 py-4">
                          <div className="flex items-center justify-end gap-2">
                            <button className="p-2 rounded-lg hover:bg-gray-800 text-gray-500">
                              <Eye className="w-4 h-4" />
                            </button>
                            <button className="p-2 rounded-lg hover:bg-gray-800 text-gray-500">
                              <Edit className="w-4 h-4" />
                            </button>
                            <button className="p-2 rounded-lg hover:bg-gray-800 text-gray-500 hover:text-error">
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>
          )}

          {/* Verification Tab */}
          {activeTab === 'verification' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <h2 className="text-lg font-medium text-white">Verification Queue</h2>

              <div className="space-y-4">
                {verificationQueue.map((item, index) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="p-4 rounded-xl bg-gray-950 border border-gray-850"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-lg bg-gray-900 flex items-center justify-center">
                          <Building2 className="w-6 h-6 text-orange" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-white">{item.parcelId}</p>
                          <p className="text-xs text-gray-500">{item.location}</p>
                          <p className="text-xs text-gray-600 mt-1">
                            Submitted by {item.submittedBy} • {formatDate(item.submittedAt, 'relative')}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Badge
                          variant={item.status === 'PENDING' ? 'warning' : 'info'}
                        >
                          {item.status.replace('_', ' ')}
                        </Badge>
                        <Button variant="outline" size="sm">
                          Review
                        </Button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Audit Tab */}
          {activeTab === 'audit' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-medium text-white">Audit Logs</h2>
                <Button variant="outline" size="sm">
                  Export Logs
                </Button>
              </div>

              <div className="rounded-xl border border-gray-850 overflow-hidden">
                <table className="w-full">
                  <thead className="bg-gray-950">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Action</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">User</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Entity</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">IP Address</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Timestamp</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-850">
                    {auditLogs.map((log) => (
                      <tr key={log.id} className="hover:bg-gray-900/50">
                        <td className="px-4 py-4">
                          <Badge variant="default">{log.action.replace('_', ' ')}</Badge>
                        </td>
                        <td className="px-4 py-4">
                          <span className="text-sm text-white">{log.user}</span>
                        </td>
                        <td className="px-4 py-4">
                          <span className="text-sm text-gray-400 font-mono">{log.entity}</span>
                        </td>
                        <td className="px-4 py-4">
                          <span className="text-xs text-gray-500 font-mono">{log.ip}</span>
                        </td>
                        <td className="px-4 py-4">
                          <span className="text-sm text-gray-500">{formatDate(log.timestamp, 'long')}</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>
          )}
        </div>
      </main>
    </div>
  )
}
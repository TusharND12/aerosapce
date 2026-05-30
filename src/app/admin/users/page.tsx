'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  Users,
  Search,
  Filter,
  Plus,
  MoreVertical,
  Shield,
  Mail,
  Phone,
  Calendar,
  CheckCircle,
  XCircle,
  Ban,
  Edit,
  Trash2,
  Eye,
  Download,
  ChevronDown,
  UserCheck,
  UserX
} from 'lucide-react'
import { cn, formatDate } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Sidebar, MobileHeader } from '@/components/layout/sidebar'

// Mock users data
const users = [
  {
    id: '1',
    name: 'Tushar Dhokane',
    email: 'tushar@landgrid.io',
    phone: '+91 98765 43210',
    role: 'SUPER_ADMIN',
    status: 'ACTIVE',
    lastLogin: '2026-05-30 14:32',
    createdAt: '2025-01-15',
    organization: 'LANDGRID'
  },
  {
    id: '2',
    name: 'Priya Sharma',
    email: 'priya.sharma@investor.com',
    phone: '+91 98765 43211',
    role: 'INVESTOR',
    status: 'ACTIVE',
    lastLogin: '2026-05-30 09:15',
    createdAt: '2025-03-20',
    organization: 'Blackstone Capital'
  },
  {
    id: '3',
    name: 'Rajesh Kumar',
    email: 'rajesh@gov.in',
    phone: '+91 98765 43212',
    role: 'VERIFICATION_OFFICER',
    status: 'ACTIVE',
    lastLogin: '2026-05-29 18:45',
    createdAt: '2025-02-10',
    organization: 'LANDGRID'
  },
  {
    id: '4',
    name: 'Amit Patel',
    email: 'amit@developer.com',
    phone: '+91 98765 43213',
    role: 'BROKER',
    status: 'PENDING',
    lastLogin: null,
    createdAt: '2026-05-28',
    organization: 'PropTech Solutions'
  },
  {
    id: '5',
    name: 'Sneha Reddy',
    email: 'sneha@landowner.com',
    phone: '+91 98765 43214',
    role: 'SELLER',
    status: 'ACTIVE',
    lastLogin: '2026-05-28 11:20',
    createdAt: '2025-04-05',
    organization: null
  },
  {
    id: '6',
    name: 'Vikram Mehta',
    email: 'vikram@pefund.com',
    phone: '+91 98765 43215',
    role: 'INVESTOR',
    status: 'SUSPENDED',
    lastLogin: '2026-05-20 16:00',
    createdAt: '2025-01-20',
    organization: 'PE Fund India'
  },
  {
    id: '7',
    name: 'Anita Desai',
    email: 'anita@legal.com',
    phone: '+91 98765 43216',
    role: 'LEGAL_REVIEWER',
    status: 'ACTIVE',
    lastLogin: '2026-05-30 10:00',
    createdAt: '2025-02-25',
    organization: 'LANDGRID'
  },
  {
    id: '8',
    name: 'Karthik Nair',
    email: 'karthik@nbfc.com',
    phone: '+91 98765 43217',
    role: 'INVESTOR',
    status: 'INACTIVE',
    lastLogin: '2026-04-15 09:30',
    createdAt: '2025-03-10',
    organization: 'HDFC Bank'
  },
]

const roles = [
  { id: 'SUPER_ADMIN', label: 'Super Admin', color: 'text-red-400', bg: 'bg-red-500/10' },
  { id: 'ADMIN', label: 'Admin', color: 'text-orange', bg: 'bg-orange/10' },
  { id: 'VERIFICATION_OFFICER', label: 'Verification Officer', color: 'text-green-400', bg: 'bg-green-500/10' },
  { id: 'LEGAL_REVIEWER', label: 'Legal Reviewer', color: 'text-blue-400', bg: 'bg-blue-500/10' },
  { id: 'DATA_ANALYST', label: 'Data Analyst', color: 'text-purple-400', bg: 'bg-purple-500/10' },
  { id: 'BROKER', label: 'Broker', color: 'text-yellow-400', bg: 'bg-yellow-500/10' },
  { id: 'INVESTOR', label: 'Investor', color: 'text-cyan-400', bg: 'bg-cyan-500/10' },
  { id: 'SELLER', label: 'Seller', color: 'text-pink-400', bg: 'bg-pink-500/10' },
  { id: 'BUYER', label: 'Buyer', color: 'text-gray-400', bg: 'bg-gray-500/10' },
]

const statusColors = {
  ACTIVE: { variant: 'success' as const, label: 'Active' },
  PENDING: { variant: 'warning' as const, label: 'Pending' },
  SUSPENDED: { variant: 'error' as const, label: 'Suspended' },
  INACTIVE: { variant: 'default' as const, label: 'Inactive' },
}

export default function UsersPage() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [roleFilter, setRoleFilter] = useState<string | null>(null)
  const [statusFilter, setStatusFilter] = useState<string | null>(null)
  const [selectedUsers, setSelectedUsers] = useState<string[]>([])
  const [showAddModal, setShowAddModal] = useState(false)

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesRole = !roleFilter || user.role === roleFilter
    const matchesStatus = !statusFilter || user.status === statusFilter
    return matchesSearch && matchesRole && matchesStatus
  })

  const toggleUserSelection = (userId: string) => {
    setSelectedUsers(prev =>
      prev.includes(userId)
        ? prev.filter(id => id !== userId)
        : [...prev, userId]
    )
  }

  const selectAll = () => {
    if (selectedUsers.length === filteredUsers.length) {
      setSelectedUsers([])
    } else {
      setSelectedUsers(filteredUsers.map(u => u.id))
    }
  }

  return (
    <div className="min-h-screen bg-black">
      <Sidebar collapsed={sidebarCollapsed} onToggle={() => setSidebarCollapsed(!sidebarCollapsed)} />
      <MobileHeader onMenuToggle={() => setSidebarCollapsed(!sidebarCollapsed)} />

      <main className={cn(
        'min-h-screen transition-all duration-300 pt-14 lg:pt-0',
        sidebarCollapsed ? 'lg:pl-[72px]' : 'lg:pl-[260px]'
      )}>
        <div className="p-6 lg:p-8">
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="font-serif text-2xl text-white">User Management</h1>
          <p className="text-sm text-gray-500 mt-1">
            Manage users, roles, and permissions
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm" leftIcon={<Download className="w-4 h-4" />}>
            Export
          </Button>
          <Button size="sm" leftIcon={<Plus className="w-4 h-4" />} onClick={() => setShowAddModal(true)}>
            Add User
          </Button>
        </div>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <StatCard label="Total Users" value="8" icon={<Users className="w-4 h-4" />} />
        <StatCard label="Active" value="5" icon={<UserCheck className="w-4 h-4" />} color="text-success" />
        <StatCard label="Pending" value="1" icon={<UserX className="w-4 h-4" />} color="text-warning" />
        <StatCard label="Suspended" value="1" icon={<Ban className="w-4 h-4" />} color="text-error" />
        <StatCard label="New (30d)" value="1" icon={<Calendar className="w-4 h-4" />} />
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col lg:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
          <input
            type="text"
            placeholder="Search users by name or email..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-gray-950 border border-gray-800 rounded-lg text-white placeholder:text-gray-500 focus:outline-none focus:border-orange"
          />
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          <select
            value={roleFilter || ''}
            onChange={(e) => setRoleFilter(e.target.value || null)}
            className="px-4 py-3 bg-gray-950 border border-gray-800 rounded-lg text-white text-sm focus:outline-none focus:border-orange"
          >
            <option value="">All Roles</option>
            {roles.map(role => (
              <option key={role.id} value={role.id}>{role.label}</option>
            ))}
          </select>
          <select
            value={statusFilter || ''}
            onChange={(e) => setStatusFilter(e.target.value || null)}
            className="px-4 py-3 bg-gray-950 border border-gray-800 rounded-lg text-white text-sm focus:outline-none focus:border-orange"
          >
            <option value="">All Status</option>
            <option value="ACTIVE">Active</option>
            <option value="PENDING">Pending</option>
            <option value="SUSPENDED">Suspended</option>
            <option value="INACTIVE">Inactive</option>
          </select>
        </div>
      </div>

      {/* Bulk Actions */}
      {selectedUsers.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-4 p-4 rounded-xl bg-orange/10 border border-orange/20"
        >
          <span className="text-sm text-white">{selectedUsers.length} users selected</span>
          <div className="flex items-center gap-2">
            <Button size="sm" variant="outline">Activate</Button>
            <Button size="sm" variant="outline">Suspend</Button>
            <Button size="sm" variant="outline">Change Role</Button>
            <Button size="sm" variant="ghost" onClick={() => setSelectedUsers([])}>Clear</Button>
          </div>
        </motion.div>
      )}

      {/* Users Table */}
      <div className="rounded-xl bg-gray-950 border border-gray-850 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-850">
                <th className="px-4 py-3 text-left">
                  <input
                    type="checkbox"
                    checked={selectedUsers.length === filteredUsers.length && filteredUsers.length > 0}
                    onChange={selectAll}
                    className="w-4 h-4 rounded border-gray-600 bg-gray-800 text-orange focus:ring-orange"
                  />
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Organization</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Login</th>
                <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-900">
              {filteredUsers.map((user, index) => {
                const role = roles.find(r => r.id === user.role)
                const status = statusColors[user.status as keyof typeof statusColors]
                return (
                  <motion.tr
                    key={user.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="hover:bg-gray-900/50 transition-colors"
                  >
                    <td className="px-4 py-4">
                      <input
                        type="checkbox"
                        checked={selectedUsers.includes(user.id)}
                        onChange={() => toggleUserSelection(user.id)}
                        className="w-4 h-4 rounded border-gray-600 bg-gray-800 text-orange focus:ring-orange"
                      />
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-sm font-medium text-gray-400">
                          {user.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div>
                          <p className="text-white font-medium">{user.name}</p>
                          <p className="text-xs text-gray-500">{user.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <Badge variant="default" className={cn(role?.bg, role?.color)}>
                        {role?.label || user.role}
                      </Badge>
                    </td>
                    <td className="px-4 py-4">
                      <Badge variant={status.variant} icon={user.status === 'ACTIVE' ? <CheckCircle className="w-3 h-3" /> : user.status === 'SUSPENDED' ? <Ban className="w-3 h-3" /> : undefined}>
                        {status.label}
                      </Badge>
                    </td>
                    <td className="px-4 py-4">
                      <span className="text-sm text-gray-400">{user.organization || '—'}</span>
                    </td>
                    <td className="px-4 py-4">
                      <span className="text-sm text-gray-500">
                        {user.lastLogin ? formatDate(user.lastLogin) : 'Never'}
                      </span>
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex items-center justify-end gap-1">
                        <button className="p-2 rounded-lg hover:bg-gray-800 text-gray-500 hover:text-white">
                          <Eye className="w-4 h-4" />
                        </button>
                        <button className="p-2 rounded-lg hover:bg-gray-800 text-gray-500 hover:text-white">
                          <Edit className="w-4 h-4" />
                        </button>
                        <button className="p-2 rounded-lg hover:bg-gray-800 text-gray-500 hover:text-white">
                          <MoreVertical className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                )
              })}
            </tbody>
          </table>
        </div>

        {filteredUsers.length === 0 && (
          <div className="text-center py-12">
            <Users className="w-12 h-12 text-gray-700 mx-auto mb-4" />
            <p className="text-gray-500">No users found matching your criteria</p>
          </div>
        )}

        {/* Pagination */}
        <div className="flex items-center justify-between px-4 py-3 border-t border-gray-850">
          <p className="text-sm text-gray-500">
            Showing {filteredUsers.length} of {users.length} users
          </p>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" disabled>Previous</Button>
            <Button variant="outline" size="sm">1</Button>
            <Button variant="ghost" size="sm">2</Button>
            <Button variant="ghost" size="sm">3</Button>
            <Button variant="outline" size="sm">Next</Button>
          </div>
        </div>
      </div>

      {/* Add User Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="w-full max-w-lg p-6 rounded-2xl bg-gray-950 border border-gray-800"
          >
            <h3 className="text-xl font-medium text-white mb-6">Add New User</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-gray-400 mb-2">Full Name</label>
                <input type="text" placeholder="Enter full name" className="w-full px-4 py-3 bg-gray-900 border border-gray-800 rounded-lg text-white placeholder:text-gray-500 focus:outline-none focus:border-orange" />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-2">Email Address</label>
                <input type="email" placeholder="user@company.com" className="w-full px-4 py-3 bg-gray-900 border border-gray-800 rounded-lg text-white placeholder:text-gray-500 focus:outline-none focus:border-orange" />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-2">Phone Number</label>
                <input type="tel" placeholder="+91 98765 43210" className="w-full px-4 py-3 bg-gray-900 border border-gray-800 rounded-lg text-white placeholder:text-gray-500 focus:outline-none focus:border-orange" />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-2">Role</label>
                <select className="w-full px-4 py-3 bg-gray-900 border border-gray-800 rounded-lg text-white focus:outline-none focus:border-orange">
                  <option value="">Select a role</option>
                  {roles.map(role => (
                    <option key={role.id} value={role.id}>{role.label}</option>
                  ))}
                </select>
              </div>
              <div className="flex gap-3 pt-4">
                <Button variant="outline" className="flex-1" onClick={() => setShowAddModal(false)}>Cancel</Button>
                <Button className="flex-1">Add User</Button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </motion.div>
        </div>
      </main>
    </div>
  )
}

function StatCard({ label, value, icon, color = 'text-orange' }: { label: string; value: string; icon: React.ReactNode; color?: string }) {
  return (
    <div className="p-4 rounded-xl bg-gray-950 border border-gray-850">
      <div className="flex items-center gap-3">
        <div className={cn('w-10 h-10 rounded-lg bg-gray-900 flex items-center justify-center', color)}>
          {icon}
        </div>
        <div>
          <p className="text-2xl font-medium text-white">{value}</p>
          <p className="text-xs text-gray-500">{label}</p>
        </div>
      </div>
    </div>
  )
}
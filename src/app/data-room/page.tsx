'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import {
  FolderOpen,
  Search,
  Filter,
  Grid3X3,
  List,
  ChevronRight,
  Clock,
  User,
  CheckCircle,
  Lock,
  Eye,
  Download,
  MoreVertical,
  Plus,
  Shield,
  FileText
} from 'lucide-react'
import { cn, formatDate } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Sidebar, MobileHeader } from '@/components/layout/sidebar'

// Mock data rooms
const dataRooms = [
  {
    id: '1',
    parcelId: 'PA-2026-8K3M2N',
    location: 'Sarjapur, Bangalore',
    files: 20,
    verified: 16,
    size: '45 MB',
    lastUpdated: '2026-05-30',
    status: 'verified',
    accessLevel: 'Full Access'
  },
  {
    id: '2',
    parcelId: 'PA-2026-7K2L9N',
    location: 'Hebbagodi, Bangalore',
    files: 15,
    verified: 12,
    size: '32 MB',
    lastUpdated: '2026-05-28',
    status: 'pending',
    accessLevel: 'View Only'
  },
  {
    id: '3',
    parcelId: 'PA-2026-5M1P8Q',
    location: 'Electronic City',
    files: 8,
    verified: 8,
    size: '18 MB',
    lastUpdated: '2026-05-25',
    status: 'verified',
    accessLevel: 'Full Access'
  },
  {
    id: '4',
    parcelId: 'PA-2026-9N3R7T',
    location: 'Chikkasandara',
    files: 12,
    verified: 5,
    size: '28 MB',
    lastUpdated: '2026-05-20',
    status: 'review',
    accessLevel: 'Restricted'
  },
  {
    id: '5',
    parcelId: 'PA-2026-2K8V4W',
    location: 'Jigani',
    files: 6,
    verified: 6,
    size: '15 MB',
    lastUpdated: '2026-05-18',
    status: 'verified',
    accessLevel: 'Full Access'
  },
]

const accessLogs = [
  { user: 'Vikram Mehta', action: 'Viewed', document: 'Sale Deed 1234-2020.pdf', time: '2026-05-30 14:32' },
  { user: 'Priya Sharma', action: 'Downloaded', document: 'Land Health Assessment.pdf', time: '2026-05-30 12:15' },
  { user: 'Anil Kumar', action: 'Viewed', document: 'Market Valuation Report.pdf', time: '2026-05-30 10:45' },
]

export default function DataRoomIndexPage() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [filter, setFilter] = useState<'all' | 'verified' | 'pending'>('all')

  const filteredRooms = dataRooms.filter(room => {
    const matchesSearch = room.parcelId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      room.location.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesFilter = filter === 'all' ||
      (filter === 'verified' && room.status === 'verified') ||
      (filter === 'pending' && (room.status === 'pending' || room.status === 'review'))
    return matchesSearch && matchesFilter
  })

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
          <h1 className="font-serif text-2xl text-white">Data Rooms</h1>
          <p className="text-sm text-gray-500 mt-1">
            Secure document management for your parcels
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm" leftIcon={<Download className="w-4 h-4" />}>
            Export All
          </Button>
          <Button size="sm" leftIcon={<Plus className="w-4 h-4" />}>
            New Data Room
          </Button>
        </div>
      </div>

      {/* Security Badge */}
      <div className="flex items-center gap-3 p-4 rounded-xl bg-gray-950 border border-gray-850">
        <div className="w-10 h-10 rounded-lg bg-success/20 flex items-center justify-center">
          <Shield className="w-5 h-5 text-success" />
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <span className="text-white font-medium">Bank-Grade Encryption Active</span>
            <Badge variant="success" icon={<Lock className="w-3 h-3" />}>
              AES-256
            </Badge>
          </div>
          <p className="text-sm text-gray-500 mt-0.5">
            All documents are encrypted at rest and in transit. Access is logged and audited.
          </p>
        </div>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard label="Total Data Rooms" value="5" icon={<FolderOpen className="w-4 h-4" />} />
        <StatCard label="Total Files" value="61" icon={<FileText className="w-4 h-4" />} />
        <StatCard label="Verified" value="47" icon={<CheckCircle className="w-4 h-4" />} color="text-success" />
        <StatCard label="Storage Used" value="138 MB" icon={<Download className="w-4 h-4" />} />
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
          <input
            type="text"
            placeholder="Search data rooms by parcel ID or location..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-gray-950 border border-gray-800 rounded-lg text-white placeholder:text-gray-500 focus:outline-none focus:border-orange"
          />
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant={filter === 'all' ? 'secondary' : 'ghost'}
            size="sm"
            onClick={() => setFilter('all')}
          >
            All
          </Button>
          <Button
            variant={filter === 'verified' ? 'secondary' : 'ghost'}
            size="sm"
            onClick={() => setFilter('verified')}
          >
            Verified
          </Button>
          <Button
            variant={filter === 'pending' ? 'secondary' : 'ghost'}
            size="sm"
            onClick={() => setFilter('pending')}
          >
            Pending
          </Button>
        </div>
      </div>

      {/* Data Rooms Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredRooms.map((room, index) => (
          <motion.div
            key={room.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Link href={`/parcel/${room.parcelId}/data-room`} className="block">
              <div className="h-full p-6 rounded-xl bg-gray-950 border border-gray-850 hover:border-orange/50 transition-all group">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <FolderOpen className="w-5 h-5 text-orange" />
                      <span className="text-white font-medium">{room.parcelId}</span>
                    </div>
                    <p className="text-sm text-gray-500 mt-1">{room.location}</p>
                  </div>
                  <Badge
                    variant={room.status === 'verified' ? 'success' : room.status === 'pending' ? 'warning' : 'default'}
                    icon={room.status === 'verified' ? <CheckCircle className="w-3 h-3" /> : undefined}
                  >
                    {room.status === 'verified' ? 'Verified' : room.status === 'pending' ? 'Pending' : 'In Review'}
                  </Badge>
                </div>

                <div className="grid grid-cols-3 gap-4 mb-4">
                  <div>
                    <p className="text-2xl font-medium text-white">{room.files}</p>
                    <p className="text-xs text-gray-500">Files</p>
                  </div>
                  <div>
                    <p className="text-2xl font-medium text-success">{room.verified}</p>
                    <p className="text-xs text-gray-500">Verified</p>
                  </div>
                  <div>
                    <p className="text-2xl font-medium text-gray-400">{room.size}</p>
                    <p className="text-xs text-gray-500">Size</p>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-gray-850">
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <Clock className="w-3 h-3" />
                    <span>Updated {formatDate(room.lastUpdated)}</span>
                  </div>
                  <Badge variant="default">{room.accessLevel}</Badge>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>

      {filteredRooms.length === 0 && (
        <div className="text-center py-12">
          <FolderOpen className="w-12 h-12 text-gray-700 mx-auto mb-4" />
          <p className="text-gray-500">No data rooms found matching your criteria</p>
        </div>
      )}

      {/* Recent Activity */}
      <div className="rounded-xl bg-gray-950 border border-gray-850 p-6">
        <h3 className="text-lg font-medium text-white mb-4">Recent Activity</h3>
        <div className="space-y-3">
          {accessLogs.map((log, index) => (
            <div key={index} className="flex items-center gap-4 p-3 rounded-lg bg-gray-900/50">
              <div className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center text-sm font-medium text-gray-400">
                {log.user.split(' ').map(n => n[0]).join('')}
              </div>
              <div className="flex-1">
                <p className="text-sm text-white">
                  <span className="font-medium">{log.user}</span>
                  <span className="text-gray-500"> {log.action.toLowerCase()} </span>
                  <span className="text-orange">{log.document}</span>
                </p>
                <p className="text-xs text-gray-600 mt-0.5">
                  <Clock className="w-3 h-3 inline mr-1" />
                  {log.time}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
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
'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import {
  FolderOpen,
  Clock,
  Shield,
  FileText,
  Upload,
  Download,
  Search,
  Filter,
  Grid3X3,
  List,
  ChevronRight,
  User,
  CheckCircle,
  Lock,
  Eye,
  Share2,
  MoreVertical,
  Plus
} from 'lucide-react'
import { cn, formatDate } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Sidebar, MobileHeader } from '@/components/layout/sidebar'

// Mock data for documents/data room
const recentFiles = [
  { id: '1', name: 'Land Survey Map.pdf', type: 'pdf', size: '4.5 MB', uploadedAt: '2026-05-30', category: 'Maps' },
  { id: '2', name: 'Sale Deed 1234-2020.pdf', type: 'pdf', size: '2.4 MB', uploadedAt: '2026-05-29', category: 'Legal' },
  { id: '3', name: 'Market Valuation Report.xlsx', type: 'xlsx', size: '1.8 MB', uploadedAt: '2026-05-28', category: 'Financial' },
  { id: '4', name: 'EC Extract - May 2026.pdf', type: 'pdf', size: '0.8 MB', uploadedAt: '2026-05-27', category: 'Verification' },
  { id: '5', name: 'Tax Paid Receipts 2025-26.pdf', type: 'pdf', size: '0.3 MB', uploadedAt: '2026-05-26', category: 'Financial' },
]

const categories = [
  { name: 'Legal Documents', count: 12, color: 'text-red-400' },
  { name: 'Financial Records', count: 8, color: 'text-green-400' },
  { name: 'Maps & Surveys', count: 6, color: 'text-blue-400' },
  { name: 'Verification Reports', count: 5, color: 'text-purple-400' },
  { name: 'Government Records', count: 9, color: 'text-orange' },
]

const fileTypeIcons: Record<string, React.ReactNode> = {
  pdf: <FileText className="w-5 h-5 text-red-400" />,
  xlsx: <FileText className="w-5 h-5 text-green-400" />,
  jpg: <FileText className="w-5 h-5 text-purple-400" />,
  png: <FileText className="w-5 h-5 text-purple-400" />,
}

export default function DocumentsPage() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('list')
  const [searchQuery, setSearchQuery] = useState('')

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
          <h1 className="font-serif text-2xl text-white">Documents</h1>
          <p className="text-sm text-gray-500 mt-1">
            Access all your documents and data rooms
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm" leftIcon={<Upload className="w-4 h-4" />}>
            Upload
          </Button>
          <Button size="sm" leftIcon={<FolderOpen className="w-4 h-4" />}>
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
            All documents are encrypted at rest and in transit
          </p>
        </div>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard label="Total Files" value="40" icon={<FileText className="w-4 h-4" />} />
        <StatCard label="Data Rooms" value="5" icon={<FolderOpen className="w-4 h-4" />} />
        <StatCard label="Verified" value="32" icon={<CheckCircle className="w-4 h-4" />} color="text-success" />
        <StatCard label="Storage" value="120 MB" icon={<Download className="w-4 h-4" />} />
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
          <input
            type="text"
            placeholder="Search documents..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-gray-950 border border-gray-800 rounded-lg text-white placeholder:text-gray-500 focus:outline-none focus:border-orange"
          />
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant={viewMode === 'list' ? 'secondary' : 'ghost'}
            size="icon"
            onClick={() => setViewMode('list')}
          >
            <List className="w-4 h-4" />
          </Button>
          <Button
            variant={viewMode === 'grid' ? 'secondary' : 'ghost'}
            size="icon"
            onClick={() => setViewMode('grid')}
          >
            <Grid3X3 className="w-4 h-4" />
          </Button>
          <Button variant="outline" size="sm" leftIcon={<Filter className="w-4 h-4" />}>
            Filter
          </Button>
        </div>
      </div>

      {/* Categories */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {categories.map((cat, index) => (
          <motion.div
            key={cat.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="p-4 rounded-xl bg-gray-950 border border-gray-850 hover:border-gray-750 transition-colors cursor-pointer"
          >
            <p className={cn('text-2xl font-medium', cat.color)}>{cat.count}</p>
            <p className="text-sm text-gray-500 mt-1">{cat.name}</p>
          </motion.div>
        ))}
      </div>

      {/* Recent Files */}
      <div className="rounded-xl bg-gray-950 border border-gray-850 p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-medium text-white">Recent Files</h3>
          <Button variant="ghost" size="sm" rightIcon={<ChevronRight className="w-4 h-4" />}>
            View All
          </Button>
        </div>

        <div className="space-y-2">
          {recentFiles.map((file, index) => (
            <motion.div
              key={file.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              className="flex items-center gap-4 p-3 rounded-lg hover:bg-gray-900/50 transition-colors cursor-pointer group"
            >
              {fileTypeIcons[file.type] || <FileText className="w-5 h-5 text-gray-500" />}
              <div className="flex-1 min-w-0">
                <p className="text-white text-sm font-medium truncate">{file.name}</p>
                <div className="flex items-center gap-2 text-xs text-gray-500 mt-0.5">
                  <Badge variant="default">{file.category}</Badge>
                  <span>•</span>
                  <span>{file.size}</span>
                  <span>•</span>
                  <span>{formatDate(file.uploadedAt)}</span>
                </div>
              </div>
              <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <button className="p-2 rounded-lg hover:bg-gray-800 text-gray-500 hover:text-white">
                  <Eye className="w-4 h-4" />
                </button>
                <button className="p-2 rounded-lg hover:bg-gray-800 text-gray-500 hover:text-white">
                  <Download className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Quick Access Data Rooms */}
      <div className="rounded-xl bg-gray-950 border border-gray-850 p-6">
        <h3 className="text-lg font-medium text-white mb-4">Quick Access Data Rooms</h3>
        <div className="grid md:grid-cols-3 gap-4">
          <Link href="/parcel/PA-2026-8K3M2N/data-room" className="block">
            <div className="p-4 rounded-lg bg-gray-900 border border-gray-800 hover:border-orange/50 transition-colors">
              <div className="flex items-center gap-3 mb-3">
                <FolderOpen className="w-5 h-5 text-orange" />
                <span className="text-white font-medium">PA-2026-8K3M2N</span>
              </div>
              <p className="text-sm text-gray-500">Sarjapur, Bangalore • 20 files</p>
              <div className="flex items-center gap-2 mt-3">
                <Badge variant="success" icon={<CheckCircle className="w-3 h-3" />}>
                  Verified
                </Badge>
              </div>
            </div>
          </Link>
          <div className="p-4 rounded-lg bg-gray-900 border border-gray-800 opacity-50">
            <div className="flex items-center gap-3 mb-3">
              <FolderOpen className="w-5 h-5 text-gray-500" />
              <span className="text-gray-400 font-medium">PA-2026-7K2L9N</span>
            </div>
            <p className="text-sm text-gray-600">Hebbagodi, Bangalore • 15 files</p>
            <div className="flex items-center gap-2 mt-3">
              <Badge variant="warning">Pending Review</Badge>
            </div>
          </div>
          <div className="p-4 rounded-lg bg-gray-900 border border-gray-800 opacity-50">
            <div className="flex items-center gap-3 mb-3">
              <FolderOpen className="w-5 h-5 text-gray-500" />
              <span className="text-gray-400 font-medium">PA-2026-5M1P8Q</span>
            </div>
            <p className="text-sm text-gray-600">Electronic City • 8 files</p>
            <div className="flex items-center gap-2 mt-3">
              <Badge variant="default">In Progress</Badge>
            </div>
          </div>
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
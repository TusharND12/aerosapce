'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  Shield,
  FolderOpen,
  FileText,
  Download,
  Upload,
  Search,
  Filter,
  Grid3X3,
  List,
  ChevronRight,
  ChevronDown,
  Clock,
  User,
  CheckCircle,
  Lock,
  Eye,
  Share2,
  MoreVertical,
  Plus,
  Folder,
  File,
  FileArchive,
  Image,
  FileCode
} from 'lucide-react'
import { cn, formatDate } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Sidebar, MobileHeader } from '@/components/layout/sidebar'

// Mock data room structure
const dataRoomFolders = {
  'Legal Documents': [
    { id: '1', name: 'Sale Deed 1234-2020.pdf', size: '2.4 MB', type: 'pdf', uploadedAt: '2026-05-15', uploadedBy: 'Rajesh Kumar', verified: true },
    { id: '2', name: 'Ownership Chain Document.pdf', size: '1.8 MB', type: 'pdf', uploadedAt: '2026-05-15', uploadedBy: 'Rajesh Kumar', verified: true },
    { id: '3', name: 'Mutation Certificate.pdf', size: '0.9 MB', type: 'pdf', uploadedAt: '2026-05-15', uploadedBy: 'Rajesh Kumar', verified: true },
    { id: '4', name: 'Land Conversion Order.pdf', size: '1.5 MB', type: 'pdf', uploadedAt: '2026-05-14', uploadedBy: 'Rajesh Kumar', verified: true },
    { id: '5', name: 'GIS Map Export.pdf', size: '3.2 MB', type: 'pdf', uploadedAt: '2026-05-14', uploadedBy: 'Rajesh Kumar', verified: false },
  ],
  'Financial Records': [
    { id: '6', name: 'Tax Paid Receipts 2025-26.pdf', size: '0.3 MB', type: 'pdf', uploadedAt: '2026-04-15', uploadedBy: 'Rajesh Kumar', verified: true },
    { id: '7', name: 'Property Tax Statement.xlsx', size: '0.5 MB', type: 'xlsx', uploadedAt: '2026-04-15', uploadedBy: 'Rajesh Kumar', verified: true },
    { id: '8', name: 'Market Valuation Report.pdf', size: '2.1 MB', type: 'pdf', uploadedAt: '2026-03-20', uploadedBy: 'Rajesh Kumar', verified: true },
    { id: '9', name: 'Bank Statement 2026.pdf', size: '1.2 MB', type: 'pdf', uploadedAt: '2026-03-15', uploadedBy: 'Rajesh Kumar', verified: false },
  ],
  'Maps & Surveys': [
    { id: '10', name: 'Land Survey Map.jpg', size: '4.5 MB', type: 'jpg', uploadedAt: '2025-12-01', uploadedBy: 'Rajesh Kumar', verified: true },
    { id: '11', name: 'Boundary Layout.pdf', size: '1.8 MB', type: 'pdf', uploadedAt: '2025-12-01', uploadedBy: 'Rajesh Kumar', verified: true },
    { id: '12', name: 'Topography Map.png', size: '3.2 MB', type: 'png', uploadedAt: '2025-12-01', uploadedBy: 'Rajesh Kumar', verified: true },
    { id: '13', name: 'Google Earth Image.zip', size: '15.6 MB', type: 'zip', uploadedAt: '2025-11-20', uploadedBy: 'Rajesh Kumar', verified: false },
  ],
  'Verification Reports': [
    { id: '14', name: 'Land Health Assessment.pdf', size: '2.3 MB', type: 'pdf', uploadedAt: '2026-05-20', uploadedBy: 'System', verified: true },
    { id: '15', name: 'Title Search Report.pdf', size: '1.9 MB', type: 'pdf', uploadedAt: '2026-05-18', uploadedBy: 'Rajesh Kumar', verified: true },
    { id: '16', name: 'Encumbrance Certificate.pdf', size: '0.8 MB', type: 'pdf', uploadedAt: '2026-05-20', uploadedBy: 'Rajesh Kumar', verified: true },
    { id: '17', name: 'Litigation Search Report.pdf', size: '1.1 MB', type: 'pdf', uploadedAt: '2026-05-19', uploadedBy: 'Rajesh Kumar', verified: true },
  ],
  'Government Records': [
    { id: '18', name: 'FMB Extract.pdf', size: '1.4 MB', type: 'pdf', uploadedAt: '2026-05-10', uploadedBy: 'System', verified: true },
    { id: '19', name: 'Khata Certificate.pdf', size: '0.6 MB', type: 'pdf', uploadedAt: '2026-05-10', uploadedBy: 'System', verified: true },
    { id: '20', name: 'RTC Extract.pdf', size: '1.7 MB', type: 'pdf', uploadedAt: '2026-05-10', uploadedBy: 'System', verified: true },
  ],
}

const accessLogs = [
  { user: 'Vikram Mehta', action: 'Viewed', document: 'Sale Deed 1234-2020.pdf', time: '2026-05-30 14:32' },
  { user: 'Priya Sharma', action: 'Downloaded', document: 'Land Health Assessment.pdf', time: '2026-05-30 12:15' },
  { user: 'Anil Kumar', action: 'Viewed', document: 'Market Valuation Report.pdf', time: '2026-05-30 10:45' },
  { user: 'Rajesh Kumar', action: 'Uploaded', document: 'Encumbrance Certificate.pdf', time: '2026-05-30 09:20' },
]

const fileTypeIcons: Record<string, React.ReactNode> = {
  pdf: <FileText className="w-5 h-5 text-red-400" />,
  xlsx: <FileCode className="w-5 h-5 text-green-400" />,
  docx: <FileText className="w-5 h-5 text-blue-400" />,
  jpg: <Image className="w-5 h-5 text-purple-400" />,
  png: <Image className="w-5 h-5 text-purple-400" />,
  zip: <FileArchive className="w-5 h-5 text-yellow-400" />,
}

export default function DataRoomPage() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [expandedFolders, setExpandedFolders] = useState<string[]>(['Legal Documents'])
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('list')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedFiles, setSelectedFiles] = useState<string[]>([])
  const [showUploadModal, setShowUploadModal] = useState(false)

  const toggleFolder = (folder: string) => {
    setExpandedFolders(prev =>
      prev.includes(folder)
        ? prev.filter(f => f !== folder)
        : [...prev, folder]
    )
  }

  const toggleFileSelection = (fileId: string) => {
    setSelectedFiles(prev =>
      prev.includes(fileId)
        ? prev.filter(f => f !== fileId)
        : [...prev, fileId]
    )
  }

  const selectAllInFolder = (files: { id: string }[]) => {
    const fileIds = files.map(f => f.id)
    const allSelected = fileIds.every(id => selectedFiles.includes(id))
    if (allSelected) {
      setSelectedFiles(prev => prev.filter(id => !fileIds.includes(id)))
    } else {
      setSelectedFiles(prev => [...new Set([...prev, ...fileIds])])
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
          <h1 className="font-serif text-2xl text-white">Data Room</h1>
          <p className="text-sm text-gray-500 mt-1">
            Secure document management for PA-2026-8K3M2N
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm" leftIcon={<Share2 className="w-4 h-4" />}>
            Share Data Room
          </Button>
          <Button size="sm" leftIcon={<Upload className="w-4 h-4" />} onClick={() => setShowUploadModal(true)}>
            Upload Files
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
        <StatCard label="Total Files" value="20" icon={<File className="w-4 h-4" />} />
        <StatCard label="Verified" value="16" icon={<CheckCircle className="w-4 h-4" />} color="text-success" />
        <StatCard label="Storage Used" value="45 MB" icon={<Folder className="w-4 h-4" />} />
        <StatCard label="Active Users" value="4" icon={<User className="w-4 h-4" />} />
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

      {/* Document Folders */}
      <div className="space-y-4">
        {Object.entries(dataRoomFolders).map(([folderName, files]) => (
          <div key={folderName} className="rounded-xl bg-gray-950 border border-gray-850 overflow-hidden">
            {/* Folder Header */}
            <button
              onClick={() => toggleFolder(folderName)}
              className="w-full flex items-center gap-4 p-4 hover:bg-gray-900/50 transition-colors"
            >
              <ChevronDown
                className={cn(
                  'w-5 h-5 text-gray-500 transition-transform',
                  expandedFolders.includes(folderName) ? 'rotate-0' : '-rotate-90'
                )}
              />
              <Folder className="w-5 h-5 text-orange" />
              <div className="flex-1 text-left">
                <span className="text-white font-medium">{folderName}</span>
                <span className="text-gray-500 text-sm ml-2">({files.length} files)</span>
              </div>
              <div className="flex items-center gap-2">
                <label
                  className="flex items-center gap-2 px-3 py-1.5 rounded-lg hover:bg-gray-800 cursor-pointer"
                  onClick={(e) => e.stopPropagation()}
                >
                  <input
                    type="checkbox"
                    checked={files.every(f => selectedFiles.includes(f.id))}
                    onChange={() => selectAllInFolder(files)}
                    className="w-4 h-4 rounded border-gray-600 bg-gray-800 text-orange focus:ring-orange"
                  />
                  <span className="text-xs text-gray-500">Select All</span>
                </label>
              </div>
            </button>

            {/* Folder Content */}
            {expandedFolders.includes(folderName) && (
              <div className={cn(
                'border-t border-gray-850',
                viewMode === 'grid' ? 'p-4 grid grid-cols-2 md:grid-cols-4 gap-4' : 'p-2 space-y-1'
              )}>
                {files.map((file) => (
                  <div
                    key={file.id}
                    className={cn(
                      'group flex items-center gap-4 p-3 rounded-lg hover:bg-gray-900/50 transition-colors',
                      viewMode === 'grid' && 'flex-col items-start'
                    )}
                  >
                    {viewMode === 'list' && (
                      <>
                        <input
                          type="checkbox"
                          checked={selectedFiles.includes(file.id)}
                          onChange={() => toggleFileSelection(file.id)}
                          className="w-4 h-4 rounded border-gray-600 bg-gray-800 text-orange focus:ring-orange"
                        />
                        {fileTypeIcons[file.type] || <File className="w-5 h-5 text-gray-500" />}
                        <div className="flex-1 min-w-0">
                          <p className="text-white text-sm truncate">{file.name}</p>
                          <div className="flex items-center gap-2 text-xs text-gray-500 mt-0.5">
                            <span>{file.size}</span>
                            <span>•</span>
                            <span>{formatDate(file.uploadedAt)}</span>
                            <span>•</span>
                            <span>{file.uploadedBy}</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          {file.verified ? (
                            <Badge variant="success" icon={<CheckCircle className="w-3 h-3" />}>
                              Verified
                            </Badge>
                          ) : (
                            <Badge variant="warning">Pending</Badge>
                          )}
                        </div>
                        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button className="p-2 rounded-lg hover:bg-gray-800 text-gray-500 hover:text-white">
                            <Eye className="w-4 h-4" />
                          </button>
                          <button className="p-2 rounded-lg hover:bg-gray-800 text-gray-500 hover:text-white">
                            <Download className="w-4 h-4" />
                          </button>
                          <button className="p-2 rounded-lg hover:bg-gray-800 text-gray-500 hover:text-white">
                            <MoreVertical className="w-4 h-4" />
                          </button>
                        </div>
                      </>
                    )}

                    {viewMode === 'grid' && (
                      <>
                        <div className="w-full p-4 rounded-lg bg-gray-900 border border-gray-800">
                          <div className="w-12 h-12 rounded-lg bg-gray-800 flex items-center justify-center mb-3">
                            {fileTypeIcons[file.type] || <File className="w-5 h-5 text-gray-500" />}
                          </div>
                          <p className="text-white text-sm font-medium truncate">{file.name}</p>
                          <p className="text-xs text-gray-500 mt-1">{file.size}</p>
                          <div className="flex items-center gap-2 mt-3">
                            {file.verified ? (
                              <Badge variant="success">Verified</Badge>
                            ) : (
                              <Badge variant="warning">Pending</Badge>
                            )}
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Access Logs */}
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

      {/* Upload Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="w-full max-w-lg p-6 rounded-2xl bg-gray-950 border border-gray-800"
          >
            <h3 className="text-xl font-medium text-white mb-4">Upload Documents</h3>
            <div className="border-2 border-dashed border-gray-800 rounded-xl p-8 text-center hover:border-orange/50 transition-colors cursor-pointer">
              <Upload className="w-12 h-12 text-gray-500 mx-auto mb-4" />
              <p className="text-white mb-2">Drag and drop files here</p>
              <p className="text-sm text-gray-500">or click to browse</p>
              <p className="text-xs text-gray-600 mt-4">Supports: PDF, DOCX, XLSX, JPG, PNG (max 50MB)</p>
            </div>
            <div className="flex gap-3 mt-6">
              <Button variant="outline" className="flex-1" onClick={() => setShowUploadModal(false)}>
                Cancel
              </Button>
              <Button className="flex-1">
                Upload
              </Button>
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
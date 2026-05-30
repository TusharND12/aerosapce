'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  Shield,
  Search,
  Filter,
  CheckCircle,
  XCircle,
  Clock,
  AlertTriangle,
  MapPin,
  Eye,
  Edit,
  Download,
  ChevronRight,
  User,
  Building2,
  FileText,
  Calendar,
  RefreshCw,
  Check,
  X
} from 'lucide-react'
import { cn, formatDate } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Sidebar, MobileHeader } from '@/components/layout/sidebar'

// Mock verification queue
const verificationQueue = [
  {
    id: '1',
    parcelId: 'PA-2026-9N3R7T',
    location: 'Chikkasandara, Bangalore',
    area: '45,000 sq ft',
    askingPrice: '₹1.25 Cr',
    submittedAt: '2026-05-30 09:15',
    submittedBy: 'Suresh Properties',
    priority: 'high',
    landHealthScore: 78,
    verificationStatus: 'IN_REVIEW',
    assignedTo: 'Rajesh Kumar',
    documents: 12,
    verified: 8
  },
  {
    id: '2',
    parcelId: 'PA-2026-8K3M2N',
    location: 'Sarjapur, Bangalore',
    area: '50,000 sq ft',
    askingPrice: '₹1.50 Cr',
    submittedAt: '2026-05-29 14:30',
    submittedBy: 'Prakash Reddy',
    priority: 'medium',
    landHealthScore: 92,
    verificationStatus: 'VERIFIED',
    assignedTo: 'Rajesh Kumar',
    documents: 15,
    verified: 15
  },
  {
    id: '3',
    parcelId: 'PA-2026-5M1P8Q',
    location: 'Electronic City',
    area: '1,25,000 sq ft',
    askingPrice: '₹3.75 Cr',
    submittedAt: '2026-05-29 10:00',
    submittedBy: 'Tech Park Developers',
    priority: 'high',
    landHealthScore: 65,
    verificationStatus: 'IN_REVIEW',
    assignedTo: null,
    documents: 8,
    verified: 3
  },
  {
    id: '4',
    parcelId: 'PA-2026-2K8V4W',
    location: 'Jigani Industrial Area',
    area: '75,000 sq ft',
    askingPrice: '₹2.25 Cr',
    submittedAt: '2026-05-28 16:45',
    submittedBy: 'ABC Industries',
    priority: 'low',
    landHealthScore: 85,
    verificationStatus: 'PENDING',
    assignedTo: null,
    documents: 10,
    verified: 0
  },
  {
    id: '5',
    parcelId: 'PA-2026-7K2L9N',
    location: 'Hebbagodi',
    area: '35,000 sq ft',
    askingPrice: '₹98 L',
    submittedAt: '2026-05-28 11:20',
    submittedBy: 'Hebbagodi Builders',
    priority: 'medium',
    landHealthScore: 71,
    verificationStatus: 'REJECTED',
    assignedTo: 'Rajesh Kumar',
    documents: 6,
    verified: 2
  },
]

const priorityColors = {
  high: { bg: 'bg-error/10', text: 'text-error', label: 'High' },
  medium: { bg: 'bg-warning/10', text: 'text-warning', label: 'Medium' },
  low: { bg: 'bg-success/10', text: 'text-success', label: 'Low' }
}

const statusConfig = {
  PENDING: { variant: 'default' as const, icon: Clock, label: 'Pending', color: 'text-gray-400' },
  IN_REVIEW: { variant: 'warning' as const, icon: RefreshCw, label: 'In Review', color: 'text-warning' },
  VERIFIED: { variant: 'success' as const, icon: CheckCircle, label: 'Verified', color: 'text-success' },
  REJECTED: { variant: 'error' as const, icon: XCircle, label: 'Rejected', color: 'text-error' }
}

export default function VerificationPage() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState<string | null>(null)
  const [priorityFilter, setPriorityFilter] = useState<string | null>(null)
  const [selectedParcels, setSelectedParcels] = useState<string[]>([])
  const [showVerifyModal, setShowVerifyModal] = useState<string | null>(null)

  const filteredQueue = verificationQueue.filter(item => {
    const matchesSearch = item.parcelId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.location.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = !statusFilter || item.verificationStatus === statusFilter
    const matchesPriority = !priorityFilter || item.priority === priorityFilter
    return matchesSearch && matchesStatus && matchesPriority
  })

  const stats = {
    pending: verificationQueue.filter(q => q.verificationStatus === 'PENDING').length,
    inReview: verificationQueue.filter(q => q.verificationStatus === 'IN_REVIEW').length,
    verified: verificationQueue.filter(q => q.verificationStatus === 'VERIFIED').length,
    rejected: verificationQueue.filter(q => q.verificationStatus === 'REJECTED').length,
  }

  const toggleParcelSelection = (id: string) => {
    setSelectedParcels(prev =>
      prev.includes(id)
        ? prev.filter(i => i !== id)
        : [...prev, id]
    )
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
          <h1 className="font-serif text-2xl text-white">Verification Queue</h1>
          <p className="text-sm text-gray-500 mt-1">
            Review and verify parcel records
          </p>
        </div>
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <Button variant="outline" size="sm" className="flex-1 sm:flex-initial" leftIcon={<Download className="w-4 h-4" />}>
            Export Report
          </Button>
          <Button size="sm" className="flex-1 sm:flex-initial" leftIcon={<RefreshCw className="w-4 h-4" />}>
            Refresh Data
          </Button>
        </div>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard label="Pending" value={stats.pending} icon={<Clock className="w-4 h-4" />} color="text-gray-400" />
        <StatCard label="In Review" value={stats.inReview} icon={<RefreshCw className="w-4 h-4" />} color="text-warning" />
        <StatCard label="Verified" value={stats.verified} icon={<CheckCircle className="w-4 h-4" />} color="text-success" />
        <StatCard label="Rejected" value={stats.rejected} icon={<XCircle className="w-4 h-4" />} color="text-error" />
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col lg:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
          <input
            type="text"
            placeholder="Search by parcel ID or location..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-gray-950 border border-gray-800 rounded-lg text-white placeholder:text-gray-500 focus:outline-none focus:border-orange"
          />
        </div>
        <div className="flex items-center gap-2 w-full lg:w-auto">
          <select
            value={statusFilter || ''}
            onChange={(e) => setStatusFilter(e.target.value || null)}
            className="flex-1 lg:flex-initial px-4 py-3 bg-gray-950 border border-gray-800 rounded-lg text-white text-sm focus:outline-none focus:border-orange w-full"
          >
            <option value="">All Status</option>
            <option value="PENDING">Pending</option>
            <option value="IN_REVIEW">In Review</option>
            <option value="VERIFIED">Verified</option>
            <option value="REJECTED">Rejected</option>
          </select>
          <select
            value={priorityFilter || ''}
            onChange={(e) => setPriorityFilter(e.target.value || null)}
            className="flex-1 lg:flex-initial px-4 py-3 bg-gray-950 border border-gray-800 rounded-lg text-white text-sm focus:outline-none focus:border-orange w-full"
          >
            <option value="">All Priority</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
        </div>
      </div>

      {/* Bulk Assignment */}
      {selectedParcels.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-4 p-4 rounded-xl bg-orange/10 border border-orange/20"
        >
          <span className="text-sm text-white">{selectedParcels.length} parcels selected</span>
          <div className="flex items-center gap-2">
            <Button size="sm" variant="outline">Assign to Me</Button>
            <Button size="sm" variant="outline">Mark Verified</Button>
            <Button size="sm" variant="outline">Reject</Button>
            <Button size="sm" variant="ghost" onClick={() => setSelectedParcels([])}>Clear</Button>
          </div>
        </motion.div>
      )}

      {/* Verification Queue */}
      <div className="space-y-4">
        {filteredQueue.map((item, index) => {
          const status = statusConfig[item.verificationStatus as keyof typeof statusConfig]
          const priority = priorityColors[item.priority as keyof typeof priorityColors]
          const StatusIcon = status.icon

          return (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="rounded-xl bg-gray-950 border border-gray-850 overflow-hidden hover:border-gray-750 transition-colors"
            >
              <div className="p-6">
                <div className="flex flex-col md:flex-row items-stretch md:items-start gap-4">
                  <div className="flex items-start gap-4 flex-1">
                    {/* Selection */}
                    <input
                      type="checkbox"
                      checked={selectedParcels.includes(item.id)}
                      onChange={() => toggleParcelSelection(item.id)}
                      className="w-5 h-5 rounded border-gray-600 bg-gray-800 text-orange focus:ring-orange mt-1.5"
                    />

                    {/* Main Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-4">
                        <div>
                          <div className="flex flex-wrap items-center gap-2 mb-1">
                            <h3 className="text-lg font-medium text-white">{item.parcelId}</h3>
                            <Badge variant={status.variant} icon={<StatusIcon className="w-3 h-3" />}>
                              {status.label}
                            </Badge>
                            <Badge className={cn(priority.bg, priority.text)}>
                              {priority.label} Priority
                            </Badge>
                          </div>
                          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-gray-500">
                            <span className="flex items-center gap-1">
                              <MapPin className="w-4 h-4 flex-shrink-0" />
                              {item.location}
                            </span>
                            <span>{item.area}</span>
                            <span>{item.askingPrice}</span>
                          </div>
                        </div>

                        {/* Land Health Score */}
                        <div className="text-left sm:text-right">
                          <div className={cn(
                            'text-3xl font-serif leading-none',
                            item.landHealthScore >= 80 ? 'text-success' :
                            item.landHealthScore >= 60 ? 'text-warning' : 'text-error'
                          )}>
                            {item.landHealthScore}
                          </div>
                          <p className="text-[10px] text-gray-500 mt-1">Land Health Score™</p>
                        </div>
                      </div>

                      {/* Details Row */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 p-4 rounded-lg bg-gray-900/50">
                        <div className="flex items-center gap-3">
                          <Building2 className="w-4 h-4 text-gray-500 flex-shrink-0" />
                          <div>
                            <p className="text-xs text-gray-500">Submitted By</p>
                            <p className="text-sm text-white truncate max-w-[150px]">{item.submittedBy}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <Calendar className="w-4 h-4 text-gray-500 flex-shrink-0" />
                          <div>
                            <p className="text-xs text-gray-500">Submitted</p>
                            <p className="text-sm text-white">{formatDate(item.submittedAt)}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <FileText className="w-4 h-4 text-gray-500 flex-shrink-0" />
                          <div>
                            <p className="text-xs text-gray-500">Documents</p>
                            <p className="text-sm text-white">{item.verified}/{item.documents} verified</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <User className="w-4 h-4 text-gray-500 flex-shrink-0" />
                          <div>
                            <p className="text-xs text-gray-500">Assigned To</p>
                            <p className="text-sm text-white">{item.assignedTo || 'Unassigned'}</p>
                          </div>
                        </div>
                      </div>

                      {/* Progress Bar */}
                      <div className="mt-4">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-xs text-gray-500">Verification Progress</span>
                          <span className="text-xs text-gray-500">{Math.round((item.verified / item.documents) * 100)}%</span>
                        </div>
                        <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${(item.verified / item.documents) * 100}%` }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            className={cn(
                              'h-full rounded-full',
                              item.verificationStatus === 'VERIFIED' ? 'bg-success' :
                              item.verificationStatus === 'REJECTED' ? 'bg-error' : 'bg-orange'
                            )}
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-row md:flex-col items-center justify-end md:justify-start gap-2 mt-4 md:mt-0 md:ml-4 border-t border-gray-900 md:border-0 pt-4 md:pt-0 w-full md:w-auto">
                    {item.verificationStatus === 'PENDING' && (
                      <Button
                        size="sm"
                        className="w-full md:w-auto"
                        onClick={() => setShowVerifyModal(item.id)}
                      >
                        Start Review
                      </Button>
                    )}
                    {item.verificationStatus === 'IN_REVIEW' && (
                      <Button size="sm" className="w-full md:w-auto" leftIcon={<Check className="w-4 h-4" />}>
                        Verify
                      </Button>
                    )}
                    <div className="flex gap-2">
                      <Button variant="ghost" size="icon" className="h-9 w-9 rounded-lg">
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-9 w-9 rounded-lg">
                        <Edit className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )
        })}
      </div>

      {filteredQueue.length === 0 && (
        <div className="text-center py-12 rounded-xl bg-gray-950 border border-gray-850">
          <Shield className="w-12 h-12 text-gray-700 mx-auto mb-4" />
          <p className="text-gray-500">No parcels in verification queue</p>
        </div>
      )}

      {/* Verify Modal */}
      {showVerifyModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="w-full max-w-lg p-6 rounded-2xl bg-gray-950 border border-gray-800"
          >
            <h3 className="text-xl font-medium text-white mb-4">Verify Parcel</h3>
            <p className="text-gray-400 mb-6">
              You are about to verify parcel <span className="text-orange">PA-2026-9N3R7T</span>. This will mark all documents as verified and update the Land Health Score™.
            </p>

            {/* Verification Checklist */}
            <div className="space-y-3 mb-6">
              <ChecklistItem label="Ownership Records" checked={true} />
              <ChecklistItem label="Encumbrance Certificate" checked={true} />
              <ChecklistItem label="Tax Records" checked={true} />
              <ChecklistItem label="Survey Documents" checked={false} />
              <ChecklistItem label="Government Records" checked={true} />
            </div>

            <div className="p-4 rounded-lg bg-warning/10 border border-warning/20 mb-6">
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-warning flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm text-white font-medium">Missing Documents</p>
                  <p className="text-xs text-gray-400 mt-1">Survey Documents (4 files) are pending verification</p>
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <Button variant="outline" className="flex-1" onClick={() => setShowVerifyModal(null)}>
                Cancel
              </Button>
              <Button variant="outline" className="flex-1" leftIcon={<X className="w-4 h-4" />}>
                Reject
              </Button>
              <Button className="flex-1" leftIcon={<Check className="w-4 h-4" />}>
                Verify
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

function StatCard({ label, value, icon, color = 'text-orange' }: { label: string; value: number; icon: React.ReactNode; color?: string }) {
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

function ChecklistItem({ label, checked }: { label: string; checked: boolean }) {
  return (
    <div className="flex items-center gap-3 p-3 rounded-lg bg-gray-900/50">
      <div className={cn(
        'w-5 h-5 rounded border-2 flex items-center justify-center',
        checked ? 'bg-success border-success' : 'border-gray-600'
      )}>
        {checked && <Check className="w-3 h-3 text-white" />}
      </div>
      <span className={cn('text-sm', checked ? 'text-white' : 'text-gray-500')}>{label}</span>
    </div>
  )
}
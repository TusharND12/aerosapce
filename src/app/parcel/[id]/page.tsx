'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  MapPin,
  Ruler,
  IndianRupee,
  Calendar,
  Building2,
  FileText,
  Clock,
  Shield,
  CheckCircle,
  AlertTriangle,
  ChevronRight,
  ChevronLeft,
  Download,
  Share2,
  Bookmark,
  GitBranch,
  Users,
  DollarSign,
  Scale,
  Map as MapIcon,
  ExternalLink,
  ArrowLeft,
  Plus,
  Minus
} from 'lucide-react'
import Link from 'next/link'
import { cn, formatCurrency, formatArea, formatDate } from '@/lib/utils'
import { LandHealthScore, AcquisitionReadinessIndex, ScoreBreakdown } from '@/components/ui/land-health-score'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Sidebar, MobileHeader } from '@/components/layout/sidebar'
import { Magnetic } from '@/components/ui/magnetic'

// Mock data
const parcelData = {
  id: '1',
  displayId: 'PA-2026-8K3M2N',
  state: 'Karnataka',
  district: 'Bangalore',
  tehsil: 'Anekal',
  village: 'Sarjapur',
  surveyNumber: '45/1',
  plotNumber: '12',
  khataNumber: '1234/56',
  address: 'Survey No. 45/1, Sarjapur Village, Anekal Taluk, Bangalore - 562125',
  areaSqFt: 45000,
  areaAcres: 1.03,
  marketValue: 15000000,
  askingPrice: 12500000,
  pricePerSqFt: 278,
  ownershipType: 'Freehold',
  zoning: 'Commercial',
  usageType: 'IT Park',
  roadAccess: '60 ft BT Road',
  topography: 'Flat',
  landHealthScore: 92,
  acquisitionReadiness: 'READY' as const,
  verificationStatus: 'VERIFIED' as const,
  verifiedAt: '2026-05-20',
  verifiedBy: 'Rajesh Kumar',
  listedAt: '2026-05-15',
  status: 'ACTIVE',
  currentOwner: {
    name: 'Prakash Reddy',
    type: 'Individual',
    fatherName: 'Venkat Reddy',
    sharePercentage: 100
  },
  boundaryJson: null
}

const ownershipHistory = [
  { name: 'Prakash Reddy', from: '2020-03-15', to: null, deed: 'Sale Deed 1234/2020' },
  { name: 'Venkat Reddy', from: '2015-08-22', to: '2020-03-15', deed: 'Inheritance' },
  { name: 'Govindappa', from: '1995-11-30', to: '2015-08-22', deed: 'Original Grant' }
]

const encumbrances = [
  { type: 'Bank Loan', holder: 'HDFC Bank', amount: 5000000, status: 'ACTIVE', startDate: '2022-06-15' },
  { type: 'NOC from Gram Panchayat', holder: 'Sarjapur Gram Panchayat', amount: null, status: 'CLEARED', startDate: '2023-01-10' }
]

const documents = [
  { name: 'Sale Deed 1234/2020', type: 'Ownership', category: 'LEGAL', date: '2020-03-15', size: '2.4 MB' },
  { name: 'EC Extract - May 2026', type: 'Encumbrance', category: 'VERIFICATION', date: '2026-05-20', size: '0.8 MB' },
  { name: 'Land Survey Map', type: 'Survey', category: 'MAP', date: '2025-12-01', size: '1.2 MB' },
  { name: 'Tax Paid Receipts 2025-26', type: 'Tax', category: 'FINANCIAL', date: '2026-04-15', size: '0.3 MB' },
  { name: 'Land Conversion Order', type: 'Government', category: 'LEGAL', date: '2019-05-20', size: '1.5 MB' }
]

const timelineEvents = [
  { type: 'VERIFICATION', title: 'Verification Completed', description: 'Land Health Score assigned: 92', date: '2026-05-20', icon: CheckCircle, color: 'text-success' },
  { type: 'LISTING', title: 'Listed on Platform', description: 'Parcel published for discovery', date: '2026-05-15', icon: Building2, color: 'text-orange' },
  { type: 'MUTATION', title: 'Ownership Mutation', description: 'Mutation No. 5678 completed', date: '2020-03-15', icon: GitBranch, color: 'text-info' },
  { type: 'PURCHASE', title: 'Sale Transaction', description: 'Sold to Prakash Reddy for ₹85,00,000', date: '2020-03-15', icon: DollarSign, color: 'text-warning' }
]

const scoreBreakdown = [
  { name: 'Ownership Clarity', contribution: 95, status: 'positive' as const },
  { name: 'Encumbrance Status', contribution: 88, status: 'positive' as const },
  { name: 'Record Completeness', contribution: 92, status: 'positive' as const },
  { name: 'Mutation History', contribution: 90, status: 'positive' as const },
  { name: 'Verification Confidence', contribution: 94, status: 'positive' as const }
]

export default function ParcelDetailsPage() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [activeTab, setActiveTab] = useState('overview')
  const [showOfferForm, setShowOfferForm] = useState(false)

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'ownership', label: 'Ownership' },
    { id: 'legal', label: 'Legal Status' },
    { id: 'documents', label: 'Documents' },
    { id: 'timeline', label: 'Timeline' },
    { id: 'data-room', label: 'Data Room' }
  ]

  return (
    <div className="min-h-screen bg-black">
      <Sidebar collapsed={sidebarCollapsed} onToggle={() => setSidebarCollapsed(!sidebarCollapsed)} />
      <MobileHeader onMenuToggle={() => setSidebarCollapsed(!sidebarCollapsed)} />

      <main className={cn(
        'min-h-screen transition-all duration-300 pt-14 lg:pt-0',
        sidebarCollapsed ? 'lg:pl-[72px]' : 'lg:pl-[260px]'
      )}>
        {/* Breadcrumb */}
        <div className="px-6 py-4 border-b border-gray-850">
          <div className="flex items-center gap-2 text-sm">
            <Link href="/discover" className="text-gray-500 hover:text-white flex items-center gap-1">
              <ArrowLeft className="w-4 h-4" />
              Back
            </Link>
            <span className="text-gray-700">/</span>
            <span className="text-gray-500">{parcelData.displayId}</span>
          </div>
        </div>

        {/* Hero Section - Map */}
        <div className="relative h-64 md:h-80 bg-gray-900 overflow-hidden">
          <div className="absolute inset-0 bg-grid opacity-20" />
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="w-64 h-40 rounded-xl border-2 border-orange/50 bg-orange/10 flex items-center justify-center"
            >
              <div className="text-center">
                <MapIcon className="w-12 h-12 text-orange mx-auto mb-2" />
                <p className="text-sm text-white font-medium">{parcelData.village}</p>
                <p className="text-xs text-gray-400">{parcelData.surveyNumber}</p>
              </div>
            </motion.div>
          </div>

          {/* Quick Actions */}
          <div className="absolute top-4 right-4 flex items-center gap-2">
            <button className="w-10 h-10 rounded-lg bg-gray-900/80 backdrop-blur border border-gray-800 flex items-center justify-center text-gray-400 hover:text-white hover:border-gray-700 transition-colors">
              <Bookmark className="w-5 h-5" />
            </button>
            <button className="w-10 h-10 rounded-lg bg-gray-900/80 backdrop-blur border border-gray-800 flex items-center justify-center text-gray-400 hover:text-white hover:border-gray-700 transition-colors">
              <Share2 className="w-5 h-5" />
            </button>
            <button className="w-10 h-10 rounded-lg bg-gray-900/80 backdrop-blur border border-gray-800 flex items-center justify-center text-gray-400 hover:text-white hover:border-gray-700 transition-colors">
              <Download className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Header Info */}
        <div className="px-6 py-6 border-b border-gray-850 bg-gray-950/50">
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <span className="text-xs font-mono text-gray-500">{parcelData.displayId}</span>
                <Badge variant="success" icon={<CheckCircle className="w-3 h-3" />}>
                  Verified
                </Badge>
                <Badge variant={parcelData.status === 'ACTIVE' ? 'success' : 'warning'}>
                  {parcelData.status.replace('_', ' ')}
                </Badge>
              </div>
              <h1 className="font-serif text-2xl md:text-3xl text-white mb-1">
                {parcelData.village}, {parcelData.district}
              </h1>
              <p className="text-gray-500 flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                {parcelData.address}
              </p>
            </div>

            {/* Key Metrics */}
            <div className="flex flex-col md:flex-row gap-4">
              <div className="p-4 rounded-xl bg-gray-900 border border-gray-800 text-center min-w-[120px]">
                <p className="text-xs text-gray-500 mb-1">Area</p>
                <p className="text-lg font-medium text-white">{formatArea(parcelData.areaSqFt)}</p>
                <p className="text-xs text-gray-600">{parcelData.areaAcres.toFixed(2)} acres</p>
              </div>
              <div className="p-4 rounded-xl bg-gray-900 border border-gray-800 text-center min-w-[120px]">
                <p className="text-xs text-gray-500 mb-1">Asking Price</p>
                <p className="text-lg font-medium text-white">{formatCurrency(parcelData.askingPrice)}</p>
                <p className="text-xs text-gray-600">₹{parcelData.pricePerSqFt}/sq ft</p>
              </div>
              <div className="p-4 rounded-xl bg-gray-900 border border-gray-800 text-center min-w-[120px]">
                <p className="text-xs text-gray-500 mb-1">Market Value</p>
                <p className="text-lg font-medium text-white">{formatCurrency(parcelData.marketValue)}</p>
                <p className="text-xs text-gray-600">Estimated</p>
              </div>
            </div>
          </div>
        </div>

        {/* Intelligence Panel */}
        <div className="px-6 py-6 border-b border-gray-850 bg-gray-950/30">
          <div className="grid md:grid-cols-3 gap-6">
            <div className="flex flex-col items-center p-6 rounded-xl bg-gray-950 border border-gray-850">
              <LandHealthScore score={parcelData.landHealthScore} size="lg" />
              <div className="mt-4 text-center">
                <p className="text-sm text-gray-400">Land Health Score™</p>
              </div>
            </div>

            <div className="flex flex-col items-center p-6 rounded-xl bg-gray-950 border border-gray-850">
              <AcquisitionReadinessIndex status={parcelData.acquisitionReadiness} size="lg" />
              <div className="mt-4 text-center">
                <p className="text-sm text-gray-400">Acquisition Readiness Index™</p>
              </div>
            </div>

            <div className="p-6 rounded-xl bg-gray-950 border border-gray-850">
              <h4 className="text-sm text-gray-400 mb-4">Score Breakdown</h4>
              <ScoreBreakdown factors={scoreBreakdown} />
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
                  'px-6 py-4 text-sm font-medium border-b-2 transition-colors whitespace-nowrap',
                  activeTab === tab.id
                    ? 'border-orange text-orange'
                    : 'border-transparent text-gray-500 hover:text-white'
                )}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <div className="p-6">
          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="grid lg:grid-cols-3 gap-6"
            >
              {/* Main Content */}
              <div className="lg:col-span-2 space-y-6">
                {/* Location Details */}
                <div className="rounded-xl bg-gray-950 border border-gray-850 p-6">
                  <h3 className="text-lg font-medium text-white mb-4">Location Details</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <DetailRow label="State" value={parcelData.state} />
                    <DetailRow label="District" value={parcelData.district} />
                    <DetailRow label="Taluk" value={parcelData.tehsil} />
                    <DetailRow label="Village" value={parcelData.village} />
                    <DetailRow label="Survey Number" value={parcelData.surveyNumber} mono />
                    <DetailRow label="Plot Number" value={parcelData.plotNumber} mono />
                    <DetailRow label="Khata Number" value={parcelData.khataNumber} mono />
                    <DetailRow label="Road Access" value={parcelData.roadAccess} />
                  </div>
                </div>

                {/* Physical Attributes */}
                <div className="rounded-xl bg-gray-950 border border-gray-850 p-6">
                  <h3 className="text-lg font-medium text-white mb-4">Physical Attributes</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <DetailRow label="Zoning" value={parcelData.zoning} />
                    <DetailRow label="Usage Type" value={parcelData.usageType} />
                    <DetailRow label="Topography" value={parcelData.topography} />
                    <DetailRow label="Ownership Type" value={parcelData.ownershipType} />
                    <DetailRow label="Area" value={formatArea(parcelData.areaSqFt)} />
                    <DetailRow label="Dimensions" value={`${parcelData.areaSqFt.toLocaleString()} sq ft`} />
                  </div>
                </div>

                {/* Current Owner */}
                <div className="rounded-xl bg-gray-950 border border-gray-850 p-6">
                  <h3 className="text-lg font-medium text-white mb-4">Current Owner</h3>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-gray-800 flex items-center justify-center">
                      <Users className="w-6 h-6 text-gray-500" />
                    </div>
                    <div>
                      <p className="text-lg font-medium text-white">{parcelData.currentOwner.name}</p>
                      <p className="text-sm text-gray-500">
                        S/o {parcelData.currentOwner.fatherName} • {parcelData.currentOwner.type}
                      </p>
                      <p className="text-xs text-gray-600 mt-1">
                        100% ownership since {formatDate(parcelData.verifiedAt)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Actions */}
                <div className="rounded-xl bg-gray-950 border border-gray-850 p-6">
                  <h3 className="text-sm font-medium text-gray-400 mb-4">Actions</h3>
                  <div className="space-y-3 flex flex-col">
                    <Magnetic range={50} strength={0.25} className="w-full">
                      <Button className="w-full" onClick={() => setShowOfferForm(true)}>
                        Make Offer
                      </Button>
                    </Magnetic>
                    <Magnetic range={50} strength={0.25} className="w-full">
                      <Button variant="outline" className="w-full">
                        Schedule Visit
                      </Button>
                    </Magnetic>
                    <Button variant="ghost" className="w-full">
                      Add to Compare
                    </Button>
                  </div>
                </div>

                {/* Verification Info */}
                <div className="rounded-xl bg-gray-950 border border-gray-850 p-6">
                  <h3 className="text-sm font-medium text-gray-400 mb-4">Verification</h3>
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-success" />
                      <span className="text-sm text-white">Records Verified</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Shield className="w-4 h-4 text-success" />
                      <span className="text-sm text-white">Chain of Title Clear</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <FileText className="w-4 h-4 text-success" />
                      <span className="text-sm text-white">Documents Validated</span>
                    </div>
                    <p className="text-xs text-gray-500 mt-4">
                      Verified by {parcelData.verifiedBy} on {formatDate(parcelData.verifiedAt)}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Ownership Tab */}
          {activeTab === 'ownership' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <div className="rounded-xl bg-gray-950 border border-gray-850 p-6 relative overflow-hidden bg-aurora">
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4 z-10 relative">
                  <div>
                    <h3 className="text-xl font-serif text-white">Ownership Chain Graph™</h3>
                    <p className="text-sm text-gray-500">Interactive timeline network of title records. Nodes are wiggable/draggable.</p>
                  </div>
                  <Badge variant="success" icon={<CheckCircle className="w-3 h-3" />}>
                    100% Chain Verified
                  </Badge>
                </div>

                {/* SVG Connecting Paths */}
                <div className="relative w-full min-h-[440px] flex items-center justify-center border border-gray-900 rounded-2xl bg-black/40 backdrop-blur-md p-8 overflow-hidden">
                  <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 0 }}>
                    {/* Glowing ownership chain path lines */}
                    <motion.path
                      d="M 190,75 L 190,195"
                      stroke="var(--color-orange)"
                      strokeWidth="2.5"
                      strokeDasharray="4"
                      className="draw-line"
                      style={{ transform: 'translateX(25%)' }}
                    />
                    <motion.path
                      d="M 190,195 L 190,315"
                      stroke="var(--color-gray-700)"
                      strokeWidth="2"
                      strokeDasharray="4"
                      style={{ transform: 'translateX(25%)' }}
                    />
                  </svg>

                  {/* Interactively Draggable/Hoverable Nodes */}
                  <div className="relative z-10 flex flex-col items-center gap-16 w-full max-w-sm">
                    {ownershipHistory.map((record, index) => {
                      const isCurrent = index === 0;
                      return (
                        <motion.div
                          key={index}
                          drag
                          dragConstraints={{ left: -100, right: 100, top: -15, bottom: 15 }}
                          whileDrag={{ scale: 1.04 }}
                          whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
                          className={cn(
                            'w-full p-4 rounded-xl border cursor-grab active:cursor-grabbing backdrop-blur-md select-none transition-all shadow-glow',
                            isCurrent
                              ? 'bg-black/85 border-orange/50 ring-2 ring-orange/10'
                              : 'bg-black/65 border-gray-800'
                          )}
                        >
                          <div className="flex items-center gap-4">
                            <div className={cn(
                              'w-10 h-10 rounded-lg flex items-center justify-center text-sm font-mono font-bold',
                              isCurrent ? 'bg-orange text-white' : 'bg-gray-900 text-gray-400'
                            )}>
                              {record.name.split(' ').map(n => n[0]).join('')}
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center justify-between mb-1">
                                <p className="text-white font-medium text-sm truncate">{record.name}</p>
                                <Badge variant={isCurrent ? 'success' : 'default'} className="text-[10px] px-2 py-0.5">
                                  {isCurrent ? 'Current' : 'Historical'}
                                </Badge>
                              </div>
                              <p className="text-xs text-gray-505 truncate">
                                {record.deed} • {formatDate(record.from)} {record.to ? `- ${formatDate(record.to)}` : '- Present'}
                              </p>
                            </div>
                          </div>
                        </motion.div>
                      )
                    })}
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Legal Tab */}
          {activeTab === 'legal' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <div className="rounded-xl bg-gray-950 border border-gray-850 p-6">
                <h3 className="text-lg font-medium text-white mb-6">Encumbrances & Liens</h3>
                <div className="space-y-4">
                  {encumbrances.map((enc, index) => (
                    <div key={index} className="p-4 rounded-lg bg-gray-900 border border-gray-800">
                      <div className="flex items-center justify-between mb-2">
                        <p className="text-white font-medium">{enc.type}</p>
                        <Badge variant={enc.status === 'ACTIVE' ? 'warning' : 'success'}>
                          {enc.status}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-500">
                        Holder: {enc.holder} {enc.amount && `• Amount: ${formatCurrency(enc.amount)}`}
                      </p>
                      <p className="text-xs text-gray-600 mt-1">
                        Started: {formatDate(enc.startDate)}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {/* Documents Tab */}
          {activeTab === 'documents' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <div className="rounded-xl bg-gray-950 border border-gray-850 p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-medium text-white">Documents</h3>
                  <Button variant="outline" size="sm">
                    <Plus className="w-4 h-4 mr-2" />
                    Upload Document
                  </Button>
                </div>
                <div className="space-y-3">
                  {documents.map((doc, index) => (
                    <div key={index} className="flex items-center gap-4 p-4 rounded-lg bg-gray-900 border border-gray-800 hover:border-gray-700 transition-colors cursor-pointer">
                      <div className="w-10 h-10 rounded-lg bg-gray-800 flex items-center justify-center">
                        <FileText className="w-5 h-5 text-gray-500" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-white font-medium truncate">{doc.name}</p>
                        <p className="text-xs text-gray-500">{doc.type} • {doc.size}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="default">{doc.category}</Badge>
                        <button className="p-2 rounded-lg hover:bg-gray-800 text-gray-500">
                          <Download className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {/* Timeline Tab */}
          {activeTab === 'timeline' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <div className="rounded-xl bg-gray-950 border border-gray-850 p-6 bg-aurora">
                <div className="mb-8">
                  <h3 className="text-lg font-serif text-white">Parcel Timeline™</h3>
                  <p className="text-sm text-gray-500">Chronological land registry events styled as a developer git commit tree.</p>
                </div>
                
                <div className="relative pl-12 py-4">
                  {/* Git Main Branch Line */}
                  <div className="absolute left-6 top-0 bottom-0 w-1 bg-gradient-to-b from-orange via-orange-600 to-gray-800 rounded-full" />

                  {/* Branches and Commits */}
                  {timelineEvents.map((event, index) => {
                    const isVerified = event.type === 'VERIFICATION'
                    return (
                      <motion.div 
                        key={index} 
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.08 }}
                        className="relative mb-10 last:mb-0 group cursor-pointer"
                      >
                        {/* Commit Dot */}
                        <div className={cn(
                          'absolute -left-[30px] top-1.5 w-4 h-4 rounded-full border-4 bg-black transition-all duration-300 z-10',
                          event.type === 'VERIFICATION' ? 'border-success scale-125 group-hover:bg-success' :
                          event.type === 'LISTING' ? 'border-orange scale-110 group-hover:bg-orange' :
                          event.type === 'MUTATION' ? 'border-info group-hover:bg-info' : 'border-warning group-hover:bg-warning'
                        )} />

                        {/* Git Branch Connector line for secondary events */}
                        {index % 2 === 1 && (
                          <svg className="absolute -left-[45px] top-[14px] w-5 h-8 pointer-events-none" style={{ opacity: 0.4 }}>
                            <path d="M 0,0 Q 10,10 20,10" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-gray-600" />
                          </svg>
                        )}

                        {/* Timeline Commit Card */}
                        <div className="p-5 rounded-2xl bg-black/60 border border-gray-850 hover:border-gray-700 transition-all duration-300 border-glow-hover shadow-lg ml-2">
                          <div className="flex flex-wrap items-start justify-between gap-2 mb-2">
                            <div className="flex items-center gap-2">
                              <span className={cn(
                                'text-xs font-mono px-2 py-0.5 rounded-full',
                                event.type === 'VERIFICATION' ? 'bg-success/15 text-success' :
                                event.type === 'LISTING' ? 'bg-orange/15 text-orange' :
                                event.type === 'MUTATION' ? 'bg-info/15 text-info' : 'bg-warning/15 text-warning'
                              )}>
                                {event.type}
                              </span>
                              <h4 className="text-sm font-medium text-white group-hover:text-orange transition-colors">{event.title}</h4>
                            </div>
                            <span className="text-xs text-gray-505 font-mono">{formatDate(event.date, 'long')}</span>
                          </div>
                          
                          <p className="text-sm text-gray-400 mb-2 leading-relaxed">{event.description}</p>
                          
                          {/* Animated SVG Checkmark for Verified items */}
                          {isVerified && (
                            <div className="flex items-center gap-1.5 mt-3 pt-3 border-t border-gray-900 text-xs text-success font-mono font-medium">
                              <svg className="w-4 h-4 text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                                <motion.path
                                  initial={{ pathLength: 0 }}
                                  whileInView={{ pathLength: 1 }}
                                  transition={{ duration: 0.8, ease: 'easeOut' }}
                                  d="M5 13l4 4L19 7"
                                />
                              </svg>
                              Fully Verified Ledger Record
                            </div>
                          )}
                        </div>
                      </motion.div>
                    )
                  })}
                </div>
              </div>
            </motion.div>
          )}

          {/* Data Room Tab */}
          {activeTab === 'data-room' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <div className="rounded-xl bg-gray-950 border border-gray-850 p-6">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="text-lg font-medium text-white">Secure Data Room</h3>
                    <p className="text-sm text-gray-500">M&A-style document management</p>
                  </div>
                  <Badge variant="success" icon={<Shield className="w-3 h-3" />}>
                    Bank-Grade Encryption
                  </Badge>
                </div>

                <div className="grid md:grid-cols-3 gap-4">
                  <div className="p-4 rounded-lg bg-gray-900 border border-gray-800">
                    <h4 className="text-sm font-medium text-white mb-3">Legal Documents</h4>
                    <div className="space-y-2">
                      <DocumentRow name="Sale Deed" count={3} />
                      <DocumentRow name="Ownership Records" count={5} />
                      <DocumentRow name="Government Orders" count={2} />
                    </div>
                  </div>
                  <div className="p-4 rounded-lg bg-gray-900 border border-gray-800">
                    <h4 className="text-sm font-medium text-white mb-3">Financial Records</h4>
                    <div className="space-y-2">
                      <DocumentRow name="Tax Records" count={7} />
                      <DocumentRow name="Payment Proofs" count={4} />
                      <DocumentRow name="Valuation Reports" count={2} />
                    </div>
                  </div>
                  <div className="p-4 rounded-lg bg-gray-900 border border-gray-800">
                    <h4 className="text-sm font-medium text-white mb-3">Maps & Surveys</h4>
                    <div className="space-y-2">
                      <DocumentRow name="Survey Maps" count={4} />
                      <DocumentRow name="Layout Plans" count={2} />
                      <DocumentRow name="Boundaries" count={1} />
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </main>

      {/* Offer Form Modal */}
      <AnimatePresence>
        {showOfferForm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
            onClick={() => setShowOfferForm(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-lg p-6 rounded-2xl bg-gray-950 border border-gray-800"
            >
              <h3 className="text-xl font-medium text-white mb-6">Make an Offer</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm text-gray-500 mb-2">Your Offer (₹)</label>
                  <input
                    type="number"
                    placeholder="12,500,000"
                    className="w-full h-12 px-4 bg-gray-900 border border-gray-800 rounded-lg text-white focus:outline-none focus:border-orange"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-500 mb-2">Terms & Conditions</label>
                  <textarea
                    placeholder="Add your terms..."
                    rows={4}
                    className="w-full px-4 py-3 bg-gray-900 border border-gray-800 rounded-lg text-white placeholder:text-gray-500 focus:outline-none focus:border-orange resize-none"
                  />
                </div>
                <div className="flex gap-3 pt-4">
                  <Magnetic range={40} strength={0.2} className="flex-1">
                    <Button variant="outline" className="w-full" onClick={() => setShowOfferForm(false)}>
                      Cancel
                    </Button>
                  </Magnetic>
                  <Magnetic range={40} strength={0.2} className="flex-1">
                    <Button className="w-full">
                      Submit Offer
                    </Button>
                  </Magnetic>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

function DetailRow({ label, value, mono = false }: { label: string; value: string; mono?: boolean }) {
  return (
    <div>
      <p className="text-xs text-gray-500 mb-1">{label}</p>
      <p className={cn('text-white', mono && 'font-mono')}>{value}</p>
    </div>
  )
}

function DocumentRow({ name, count }: { name: string; count: number }) {
  return (
    <div className="flex items-center justify-between py-2 border-b border-gray-800 last:border-0">
      <span className="text-sm text-gray-400">{name}</span>
      <span className="text-xs text-gray-600">{count} files</span>
    </div>
  )
}

function AnimatePresence({ children }: { children: React.ReactNode }) {
  const { AnimatePresence: _AnimatePresence } = require('framer-motion')
  return <_AnimatePresence>{children}</_AnimatePresence>
}
'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  MessageSquare,
  DollarSign,
  Clock,
  ChevronRight,
  ChevronLeft,
  Check,
  X,
  RefreshCw,
  FileText,
  Scale,
  AlertCircle,
  ArrowRight,
  Filter,
  Search
} from 'lucide-react'
import Link from 'next/link'
import { cn, formatCurrency, formatDate } from '@/lib/utils'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Sidebar, MobileHeader } from '@/components/layout/sidebar'

// Mock data
const negotiations = [
  {
    id: '1',
    parcelId: 'PA-2026-8K3M2N',
    parcelLocation: 'Sarjapur Village, Bangalore',
    buyer: 'Sunrise Developers Pvt Ltd',
    broker: 'Rajesh Mehta',
    currentAmount: 12500000,
    originalAmount: 12000000,
    status: 'COUNTERED',
    validUntil: '2026-06-05',
    createdAt: '2026-05-20',
    events: [
      { type: 'SUBMITTED', from: null, to: 'SUBMITTED', amount: 12000000, date: '2026-05-20', by: 'Buyer' },
      { type: 'COUNTERED', from: 'SUBMITTED', to: 'COUNTERED', amount: 12500000, date: '2026-05-22', by: 'Seller' }
    ]
  },
  {
    id: '2',
    parcelId: 'PA-2026-7X9P4Q',
    parcelLocation: 'Electronic City, Bangalore',
    buyer: 'Greenfield Infrastructure Ltd',
    broker: 'Priya Sharma',
    currentAmount: 26500000,
    originalAmount: 26500000,
    status: 'SUBMITTED',
    validUntil: '2026-06-10',
    createdAt: '2026-05-25',
    events: [
      { type: 'SUBMITTED', from: null, to: 'SUBMITTED', amount: 26500000, date: '2026-05-25', by: 'Buyer' }
    ]
  },
  {
    id: '3',
    parcelId: 'PA-2026-6W2R8T',
    parcelLocation: 'Bommasandra Industrial Area',
    buyer: 'Metro Properties',
    broker: 'Amit Singh',
    currentAmount: 19000000,
    originalAmount: 19500000,
    status: 'LEGAL_REVIEW',
    validUntil: '2026-06-15',
    createdAt: '2026-05-18',
    events: [
      { type: 'SUBMITTED', from: null, to: 'SUBMITTED', amount: 19500000, date: '2026-05-18', by: 'Buyer' },
      { type: 'COUNTERED', from: 'SUBMITTED', to: 'COUNTERED', amount: 19000000, date: '2026-05-20', by: 'Seller' },
      { type: 'REVISED', from: 'COUNTERED', to: 'LEGAL_REVIEW', amount: 19000000, date: '2026-05-23', by: 'Buyer' }
    ]
  },
  {
    id: '4',
    parcelId: 'PA-2026-5V1S6U',
    parcelLocation: 'Devanahalli Tech Park',
    buyer: 'Horizon Real Estate',
    broker: 'Vikram Rao',
    currentAmount: 44000000,
    originalAmount: 45000000,
    status: 'ACCEPTED',
    validUntil: '2026-06-01',
    createdAt: '2026-05-10',
    events: [
      { type: 'SUBMITTED', from: null, to: 'SUBMITTED', amount: 45000000, date: '2026-05-10', by: 'Buyer' },
      { type: 'COUNTERED', from: 'SUBMITTED', to: 'COUNTERED', amount: 44000000, date: '2026-05-15', by: 'Seller' },
      { type: 'ACCEPTED', from: 'COUNTERED', to: 'ACCEPTED', amount: 44000000, date: '2026-05-18', by: 'Buyer' }
    ]
  }
]

const statusConfig: Record<string, { color: string; bgColor: string; icon: React.ElementType }> = {
  SUBMITTED: { color: 'text-orange', bgColor: 'bg-orange/20', icon: DollarSign },
  COUNTERED: { color: 'text-warning', bgColor: 'bg-warning/20', icon: RefreshCw },
  REVISED: { color: 'text-info', bgColor: 'bg-info/20', icon: RefreshCw },
  LEGAL_REVIEW: { color: 'text-info', bgColor: 'bg-info/20', icon: Scale },
  ACCEPTED: { color: 'text-success', bgColor: 'bg-success/20', icon: Check },
  DECLINED: { color: 'text-error', bgColor: 'bg-error/20', icon: X },
  CLOSED: { color: 'text-gray-400', bgColor: 'bg-gray-800', icon: Check }
}

export default function NegotiationsPage() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [selectedNegotiation, setSelectedNegotiation] = useState<string | null>(null)
  const [filterStatus, setFilterStatus] = useState<string>('all')
  const [showCounterForm, setShowCounterForm] = useState(false)

  const filteredNegotiations = negotiations.filter(n =>
    filterStatus === 'all' || n.status === filterStatus
  )

  const selected = negotiations.find(n => n.id === selectedNegotiation)
  const config = selected ? statusConfig[selected.status] : null

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
              <h1 className="font-serif text-2xl text-white">Negotiation Center</h1>
              <p className="text-sm text-gray-500">Structured deal workflows with full audit trail</p>
            </div>
            <div className="flex items-center gap-3">
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="h-10 px-3 bg-gray-950 border border-gray-800 rounded-lg text-sm text-white focus:outline-none focus:border-orange"
              >
                <option value="all">All Status</option>
                <option value="SUBMITTED">Submitted</option>
                <option value="COUNTERED">Countered</option>
                <option value="LEGAL_REVIEW">Legal Review</option>
                <option value="ACCEPTED">Accepted</option>
              </select>
            </div>
          </div>
        </div>

        <div className="flex h-[calc(100vh-180px)]">
          {/* Negotiations List */}
          <div className="w-full md:w-1/2 lg:w-2/5 border-r border-gray-850 overflow-y-auto">
            {filteredNegotiations.map((neg) => {
              const negConfig = statusConfig[neg.status]
              return (
                <motion.div
                  key={neg.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className={cn(
                    'p-4 border-b border-gray-850 cursor-pointer transition-colors',
                    selectedNegotiation === neg.id ? 'bg-gray-900' : 'hover:bg-gray-950'
                  )}
                  onClick={() => setSelectedNegotiation(neg.id)}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-mono text-gray-500">{neg.parcelId}</span>
                    <Badge
                      variant={
                        neg.status === 'ACCEPTED' ? 'success' :
                        neg.status === 'COUNTERED' ? 'warning' :
                        neg.status === 'DECLINED' ? 'error' : 'orange'
                      }
                    >
                      {neg.status.replace('_', ' ')}
                    </Badge>
                  </div>
                  <h3 className="text-sm font-medium text-white mb-1">{neg.parcelLocation}</h3>
                  <p className="text-xs text-gray-500 mb-3">{neg.buyer}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-orange">
                      {formatCurrency(neg.currentAmount)}
                    </span>
                    <span className="text-xs text-gray-600">
                      {neg.events.length} events
                    </span>
                  </div>
                </motion.div>
              )
            })}
          </div>

          {/* Negotiation Detail */}
          {selected ? (
            <div className="hidden md:block w-1/2 lg:w-3/5 p-6 overflow-y-auto">
              <motion.div
                key={selected.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                {/* Header */}
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-xs font-mono text-gray-500">{selected.parcelId}</span>
                      <Badge
                        variant={
                          selected.status === 'ACCEPTED' ? 'success' :
                          selected.status === 'COUNTERED' ? 'warning' : 'orange'
                        }
                      >
                        {selected.status.replace('_', ' ')}
                      </Badge>
                    </div>
                    <h2 className="text-xl font-medium text-white">{selected.parcelLocation}</h2>
                    <p className="text-sm text-gray-500">{selected.buyer}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-serif text-white">{formatCurrency(selected.currentAmount)}</p>
                    <p className="text-xs text-gray-500">
                      {selected.currentAmount !== selected.originalAmount && (
                        <span className="text-warning">was {formatCurrency(selected.originalAmount)}</span>
                      )}
                    </p>
                  </div>
                </div>

                {/* Parties */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 rounded-lg bg-gray-950 border border-gray-850">
                    <p className="text-xs text-gray-500 mb-1">Buyer</p>
                    <p className="text-sm font-medium text-white">{selected.buyer}</p>
                  </div>
                  <div className="p-4 rounded-lg bg-gray-950 border border-gray-850">
                    <p className="text-xs text-gray-500 mb-1">Broker</p>
                    <p className="text-sm font-medium text-white">{selected.broker}</p>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-3">
                  {selected.status === 'SUBMITTED' && (
                    <>
                      <Button className="flex-1" onClick={() => setShowCounterForm(true)}>
                        <ChevronRight className="w-4 h-4 mr-2" />
                        Counter Offer
                      </Button>
                      <Button variant="outline" className="flex-1">
                        Decline
                      </Button>
                    </>
                  )}
                  {selected.status === 'COUNTERED' && (
                    <>
                      <Button className="flex-1">
                        Accept Offer
                      </Button>
                      <Button variant="outline" className="flex-1" onClick={() => setShowCounterForm(true)}>
                        Revise
                      </Button>
                    </>
                  )}
                  {selected.status === 'ACCEPTED' && (
                    <Button className="flex-1">
                      <Scale className="w-4 h-4 mr-2" />
                      Initiate Legal Review
                    </Button>
                  )}
                </div>

                {/* Timeline */}
                <div className="rounded-xl bg-gray-950 border border-gray-850 p-6">
                  <h3 className="text-sm font-medium text-white mb-6">Negotiation Timeline</h3>
                  <div className="relative">
                    {selected.events.map((event, index) => (
                      <div key={index} className="flex items-start gap-4 pb-6 last:pb-0">
                        <div className={cn(
                          'w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0',
                          config?.bgColor,
                          config?.color
                        )}>
                          {event.type === 'SUBMITTED' && <DollarSign className="w-4 h-4" />}
                          {event.type === 'COUNTERED' && <RefreshCw className="w-4 h-4" />}
                          {event.type === 'REVISED' && <RefreshCw className="w-4 h-4" />}
                          {event.type === 'ACCEPTED' && <Check className="w-4 h-4" />}
                          {event.type === 'LEGAL_REVIEW' && <Scale className="w-4 h-4" />}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <p className="text-sm font-medium text-white">
                              {event.type === 'SUBMITTED' && 'Offer Submitted'}
                              {event.type === 'COUNTERED' && 'Counter Offer'}
                              {event.type === 'REVISED' && 'Offer Revised'}
                              {event.type === 'ACCEPTED' && 'Offer Accepted'}
                              {event.type === 'LEGAL_REVIEW' && 'Legal Review Initiated'}
                            </p>
                          </div>
                          <p className="text-xs text-gray-500">
                            by {event.by} • {formatDate(event.date, 'long')}
                          </p>
                          {event.amount && (
                            <p className="text-sm font-medium text-orange mt-1">
                              {formatCurrency(event.amount)}
                            </p>
                          )}
                        </div>
                        {index < selected.events.length - 1 && (
                          <div className="absolute left-4 top-10 w-px h-12 bg-gray-800" />
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Valid Until */}
                <div className="p-4 rounded-lg bg-gray-900/50 border border-gray-800 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-gray-500" />
                    <span className="text-sm text-gray-400">Offer valid until</span>
                  </div>
                  <span className="text-sm font-medium text-white">{formatDate(selected.validUntil, 'long')}</span>
                </div>
              </motion.div>
            </div>
          ) : (
            <div className="hidden md:flex w-1/2 lg:w-3/5 items-center justify-center">
              <div className="text-center">
                <MessageSquare className="w-16 h-16 text-gray-800 mx-auto mb-4" />
                <p className="text-gray-500">Select a negotiation to view details</p>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
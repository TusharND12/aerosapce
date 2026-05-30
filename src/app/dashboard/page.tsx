'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  TrendingUp,
  Building2,
  FileCheck,
  Eye,
  ArrowUpRight,
  ArrowDownRight,
  Plus,
  Search,
  Bell,
  ChevronRight,
  MapPin,
  Clock,
  DollarSign
} from 'lucide-react'
import Link from 'next/link'
import { cn, formatCurrency, formatDate } from '@/lib/utils'
import { LandHealthScore } from '@/components/ui/land-health-score'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Sidebar, MobileHeader } from '@/components/layout/sidebar'

// Mock data
const stats = [
  {
    label: 'Total Parcels',
    value: '247',
    change: 12,
    icon: Building2,
    color: 'text-orange'
  },
  {
    label: 'Verified Parcels',
    value: '156',
    change: 8,
    icon: FileCheck,
    color: 'text-success'
  },
  {
    label: 'Active Offers',
    value: '23',
    change: -3,
    icon: DollarSign,
    color: 'text-info'
  },
  {
    label: 'Views This Week',
    value: '1,842',
    change: 24,
    icon: Eye,
    color: 'text-warning'
  }
]

const recentParcels = [
  {
    id: '1',
    displayId: 'PA-2026-8K3M2N',
    location: 'Sarjapur Road, Bangalore',
    state: 'Karnataka',
    district: 'Bangalore',
    area: 45000,
    price: 12500000,
    healthScore: 92,
    readiness: 'READY',
    status: 'ACTIVE',
    image: null
  },
  {
    id: '2',
    displayId: 'PA-2026-7X9P4Q',
    location: ' Electronic City, Bangalore',
    state: 'Karnataka',
    district: 'Bangalore',
    area: 120000,
    price: 28000000,
    healthScore: 78,
    readiness: 'CAUTION',
    status: 'UNDER_NEGOTIATION',
    image: null
  },
  {
    id: '3',
    displayId: 'PA-2026-6W2R8T',
    location: 'Bommasandra Industrial Area',
    state: 'Karnataka',
    district: 'Bangalore',
    area: 85000,
    price: 19500000,
    healthScore: 88,
    readiness: 'READY',
    status: 'ACTIVE',
    image: null
  },
  {
    id: '4',
    displayId: 'PA-2026-5V1S6U',
    location: 'Devanahalli Tech Park',
    state: 'Karnataka',
    district: 'Bangalore',
    area: 200000,
    price: 45000000,
    healthScore: 95,
    readiness: 'READY',
    status: 'ACTIVE',
    image: null
  }
]

const recentActivity = [
  {
    id: '1',
    type: 'offer',
    title: 'New offer received',
    description: 'Offer of ₹1.25 Cr for PA-2026-8K3M2N',
    time: '2 hours ago',
    icon: DollarSign,
    color: 'text-success'
  },
  {
    id: '2',
    type: 'verification',
    title: 'Parcel verified',
    description: 'PA-2026-5V1S6U verification completed',
    time: '4 hours ago',
    icon: FileCheck,
    color: 'text-info'
  },
  {
    id: '3',
    type: 'view',
    title: 'High interest',
    description: '15 views on PA-2026-8K3M2N today',
    time: '6 hours ago',
    icon: Eye,
    color: 'text-warning'
  },
  {
    id: '4',
    type: 'listing',
    title: 'New parcel listed',
    description: 'PA-2026-9L4N7X listed in Karnataka',
    time: '8 hours ago',
    icon: Building2,
    color: 'text-orange'
  }
]

const activeOffers = [
  {
    id: '1',
    parcelId: 'PA-2026-8K3M2N',
    amount: 12500000,
    status: 'COUNTERED',
    buyer: 'Sunrise Developers',
    date: '2026-05-28'
  },
  {
    id: '2',
    parcelId: 'PA-2026-7X9P4Q',
    amount: 26500000,
    status: 'SUBMITTED',
    buyer: 'Greenfield Infra',
    date: '2026-05-27'
  },
  {
    id: '3',
    parcelId: 'PA-2026-6W2R8T',
    amount: 19000000,
    status: 'LEGAL_REVIEW',
    buyer: 'Metro Properties',
    date: '2026-05-25'
  }
]

export default function DashboardPage() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)

  return (
    <div className="min-h-screen bg-black">
      <Sidebar collapsed={sidebarCollapsed} onToggle={() => setSidebarCollapsed(!sidebarCollapsed)} />
      <MobileHeader onMenuToggle={() => setSidebarCollapsed(!sidebarCollapsed)} />

      <main className={cn(
        'min-h-screen transition-all duration-300 pt-14 lg:pt-0',
        sidebarCollapsed ? 'lg:pl-[72px]' : 'lg:pl-[260px]'
      )}>
        <div className="p-6 lg:p-8">
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row md:items-center md:justify-between gap-4"
      >
        <div>
          <h1 className="font-serif text-3xl text-white">Dashboard</h1>
          <p className="text-gray-500 mt-1">Welcome back, Tushar</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" leftIcon={<Search className="w-4 h-4" />}>
            Search Parcels
          </Button>
          <Button leftIcon={<Plus className="w-4 h-4" />}>
            Add Parcel
          </Button>
        </div>
      </motion.div>

      {/* Stats Grid */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-2 lg:grid-cols-4 gap-4"
      >
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 + index * 0.05 }}
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
              {stat.change >= 0 ? (
                <ArrowUpRight className="w-3 h-3" />
              ) : (
                <ArrowDownRight className="w-3 h-3" />
              )}
              <span>{Math.abs(stat.change)}% from last month</span>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Main Content Grid */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Recent Parcels */}
<motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="lg:col-span-2 rounded-xl bg-gray-950 border border-gray-850"
        >
          <div className="p-5 border-b border-gray-850 flex items-center justify-between">
            <h2 className="text-lg font-medium text-white">Recent Parcels</h2>
            <Link href="/discover" className="text-sm text-orange hover:text-orange-600 flex items-center gap-1">
              View All <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="divide-y divide-gray-900">
            {recentParcels.map((parcel, index) => (
              <motion.div
                key={parcel.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + index * 0.05 }}
              >
                <Link
                  href={`/parcel/${parcel.id}`}
                  className="flex items-center gap-4 p-4 hover:bg-gray-900/50 transition-colors"
                >
                  {/* Map preview */}
                  <div className="w-16 h-16 rounded-lg bg-gray-900 flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6 text-gray-600" />
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-mono text-gray-500">{parcel.displayId}</span>
                      <Badge
                        variant={
                          parcel.readiness === 'READY' ? 'success' :
                          parcel.readiness === 'CAUTION' ? 'warning' : 'error'
                        }
                      >
                        {parcel.readiness.replace('_', ' ')}
                      </Badge>
                    </div>
                    <h3 className="text-sm font-medium text-white truncate">{parcel.location}</h3>
                    <p className="text-xs text-gray-500">{parcel.district}, {parcel.state}</p>
                  </div>

                  {/* Stats */}
                  <div className="hidden sm:flex items-center gap-6">
                    <div className="text-right">
                      <p className="text-xs text-gray-500">Area</p>
                      <p className="text-sm text-white">{(parcel.area / 1000).toFixed(0)}K sq ft</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-gray-500">Price</p>
                      <p className="text-sm text-white">{formatCurrency(parcel.price)}</p>
                    </div>
                    <div className="w-12 h-12 rounded-lg bg-gray-900 flex items-center justify-center">
                      <span className={cn(
                        'text-sm font-bold',
                        parcel.healthScore >= 90 ? 'text-success' :
                        parcel.healthScore >= 70 ? 'text-orange' : 'text-error'
                      )}>
                        {parcel.healthScore}
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Right Sidebar */}
        <div className="space-y-6">
          {/* Active Offers */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
            className="rounded-xl bg-gray-950 border border-gray-850"
          >
            <div className="p-5 border-b border-gray-850 flex items-center justify-between">
              <h2 className="text-lg font-medium text-white">Active Offers</h2>
              <Link href="/negotiations" className="text-sm text-orange hover:text-orange-600">
                View All
              </Link>
            </div>
            <div className="p-4 space-y-3">
              {activeOffers.map((offer, index) => (
                <motion.div
                  key={offer.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.35 + index * 0.05 }}
                  className="p-3 rounded-lg bg-gray-900/50 border border-gray-850"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-mono text-gray-500">{offer.parcelId}</span>
                    <Badge
                      variant={
                        offer.status === 'SUBMITTED' ? 'orange' :
                        offer.status === 'COUNTERED' ? 'warning' :
                        offer.status === 'LEGAL_REVIEW' ? 'info' : 'default'
                      }
                    >
                      {offer.status.replace('_', ' ')}
                    </Badge>
                  </div>
                  <p className="text-sm font-medium text-white">{formatCurrency(offer.amount)}</p>
                  <p className="text-xs text-gray-500">{offer.buyer}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Recent Activity */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="rounded-xl bg-gray-950 border border-gray-850"
          >
            <div className="p-5 border-b border-gray-850">
              <h2 className="text-lg font-medium text-white">Recent Activity</h2>
            </div>
            <div className="p-4 space-y-4">
              {recentActivity.map((activity, index) => (
                <motion.div
                  key={activity.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + index * 0.05 }}
                  className="flex items-start gap-3"
                >
                  <div className={cn(
                    'w-8 h-8 rounded-lg flex items-center justify-center bg-gray-900',
                    activity.color
                  )}>
                    <activity.icon className="w-4 h-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-white">{activity.title}</p>
                    <p className="text-xs text-gray-500 truncate">{activity.description}</p>
                  </div>
                  <span className="text-xs text-gray-600 flex-shrink-0">{activity.time}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
        </div>

      {/* Land Health Score Showcase */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="rounded-xl bg-gray-950 border border-gray-850 p-6"
      >
        <div className="flex flex-col md:flex-row items-center gap-8">
          <div className="flex-1">
            <h2 className="font-serif text-2xl text-white mb-2">Land Health Score™</h2>
            <p className="text-gray-500 mb-4">
              Our proprietary verification algorithm evaluates ownership clarity, encumbrance status,
              record completeness, mutation history, and verification confidence to provide a
              comprehensive health assessment.
            </p>
            <div className="flex flex-wrap gap-3">
              <Badge variant="success" icon={<FileCheck className="w-3 h-3" />}>
                Ownership Clarity
              </Badge>
              <Badge variant="success" icon={<FileCheck className="w-3 h-3" />}>
                Encumbrance Check
              </Badge>
              <Badge variant="warning" icon={<Clock className="w-3 h-3" />}>
                Mutation History
              </Badge>
            </div>
          </div>
          <div className="flex-shrink-0">
            <LandHealthScore score={92} size="lg" />
          </div>
        </div>
      </motion.div>
    </div>
      </div>
      </main>
    </div>
  )
}
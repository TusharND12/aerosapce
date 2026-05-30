'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  Building2,
  Plus,
  Search,
  Filter,
  Grid3X3,
  List,
  MapPin,
  MoreHorizontal,
  Eye,
  Edit,
  Trash2,
  DollarSign,
  Clock,
  CheckCircle,
  XCircle
} from 'lucide-react'
import { cn, formatCurrency, formatDate } from '@/lib/utils'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { LandHealthScoreMini } from '@/components/ui/land-health-score'
import { Sidebar, MobileHeader } from '@/components/layout/sidebar'

// Mock data
const myParcels = [
  {
    id: '1',
    displayId: 'PA-2026-8K3M2N',
    state: 'Karnataka',
    district: 'Bangalore',
    village: 'Sarjapur',
    areaSqFt: 45000,
    askingPrice: 12500000,
    landHealthScore: 92,
    status: 'ACTIVE',
    role: 'SELLER',
    views: 156,
    offers: 3,
    listedAt: '2026-05-15'
  },
  {
    id: '2',
    displayId: 'PA-2026-7X9P4Q',
    state: 'Karnataka',
    district: 'Bangalore',
    village: 'Electronic City',
    areaSqFt: 120000,
    askingPrice: 28000000,
    landHealthScore: 78,
    status: 'UNDER_NEGOTIATION',
    role: 'SELLER',
    views: 289,
    offers: 5,
    listedAt: '2026-05-10'
  },
  {
    id: '3',
    displayId: 'PA-2026-6W2R8T',
    state: 'Karnataka',
    district: 'Bangalore',
    village: 'Bommasandra',
    areaSqFt: 85000,
    askingPrice: 19500000,
    landHealthScore: 88,
    status: 'ACTIVE',
    role: 'BUYER',
    views: 0,
    offers: 1,
    listedAt: '2026-05-08'
  }
]

export default function MyParcelsPage() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('list')
  const [filter, setFilter] = useState('all')

  const filteredParcels = myParcels.filter(p =>
    filter === 'all' || p.role === filter
  )

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
              <h1 className="font-serif text-2xl text-white">My Parcels</h1>
              <p className="text-sm text-gray-500">Manage your land assets and interests</p>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="outline" leftIcon={<Building2 className="w-4 h-4" />}>
                Add to Portfolio
              </Button>
              <Button leftIcon={<Plus className="w-4 h-4" />}>
                List New Parcel
              </Button>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="px-6 py-4 border-b border-gray-850 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="h-10 px-3 bg-gray-950 border border-gray-800 rounded-lg text-sm text-white focus:outline-none focus:border-orange"
            >
              <option value="all">All Parcels</option>
              <option value="SELLER">Listed by Me</option>
              <option value="BUYER">Saved by Me</option>
            </select>
            <span className="text-sm text-gray-500">{filteredParcels.length} parcels</span>
          </div>

          <div className="flex items-center gap-2 p-1 bg-gray-950 rounded-lg border border-gray-800">
            <button
              onClick={() => setViewMode('list')}
              className={cn(
                'p-2 rounded-lg transition-colors',
                viewMode === 'list' ? 'bg-orange text-white' : 'text-gray-500 hover:text-white'
              )}
            >
              <List className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('grid')}
              className={cn(
                'p-2 rounded-lg transition-colors',
                viewMode === 'grid' ? 'bg-orange text-white' : 'text-gray-500 hover:text-white'
              )}
            >
              <Grid3X3 className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {viewMode === 'list' ? (
            <div className="space-y-4">
              {filteredParcels.map((parcel, index) => (
                <motion.div
                  key={parcel.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="p-5 rounded-xl bg-gray-950 border border-gray-850"
                >
                  <div className="flex flex-col md:flex-row md:items-center gap-4">
                    {/* Map Preview */}
                    <div className="w-20 h-20 rounded-lg bg-gray-900 flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-8 h-8 text-gray-600" />
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-mono text-gray-500">{parcel.displayId}</span>
                        <Badge variant={parcel.role === 'SELLER' ? 'orange' : 'info'}>
                          {parcel.role === 'SELLER' ? 'Listed' : 'Saved'}
                        </Badge>
                        <Badge
                          variant={
                            parcel.status === 'ACTIVE' ? 'success' :
                            parcel.status === 'UNDER_NEGOTIATION' ? 'warning' : 'default'
                          }
                        >
                          {parcel.status.replace('_', ' ')}
                        </Badge>
                      </div>
                      <h3 className="text-lg font-medium text-white">{parcel.village}, {parcel.district}</h3>
                      <p className="text-sm text-gray-500">{parcel.state}</p>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
                      <div className="text-center">
                        <p className="text-xs text-gray-500 mb-1">Price</p>
                        <p className="text-sm font-medium text-white">{formatCurrency(parcel.askingPrice)}</p>
                      </div>
                      <div className="text-center">
                        <p className="text-xs text-gray-500 mb-1">Area</p>
                        <p className="text-sm font-medium text-white">{(parcel.areaSqFt / 1000).toFixed(0)}K sq ft</p>
                      </div>
                      <div className="text-center">
                        <p className="text-xs text-gray-500 mb-1">Views</p>
                        <p className="text-sm font-medium text-white">{parcel.views}</p>
                      </div>
                      <div className="text-center">
                        <p className="text-xs text-gray-500 mb-1">Offers</p>
                        <p className="text-sm font-medium text-orange">{parcel.offers}</p>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-2">
                      <LandHealthScoreMini score={parcel.landHealthScore} />
                      <button className="p-2 rounded-lg hover:bg-gray-800 text-gray-500">
                        <MoreHorizontal className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredParcels.map((parcel, index) => (
                <motion.div
                  key={parcel.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.05 }}
                  className="rounded-xl bg-gray-950 border border-gray-850 overflow-hidden"
                >
                  <div className="h-32 bg-gray-900 flex items-center justify-center">
                    <MapPin className="w-12 h-12 text-gray-700" />
                  </div>
                  <div className="p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xs font-mono text-gray-500">{parcel.displayId}</span>
                      <Badge variant={parcel.role === 'SELLER' ? 'orange' : 'info'}>
                        {parcel.role === 'SELLER' ? 'Listed' : 'Saved'}
                      </Badge>
                    </div>
                    <h3 className="text-sm font-medium text-white mb-1">{parcel.village}, {parcel.district}</h3>
                    <p className="text-xs text-gray-500 mb-3">{formatCurrency(parcel.askingPrice)}</p>
                    <div className="flex items-center justify-between">
                      <LandHealthScoreMini score={parcel.landHealthScore} />
                      <span className="text-xs text-gray-600">{parcel.offers} offers</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
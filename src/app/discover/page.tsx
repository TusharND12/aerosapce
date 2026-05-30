'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Search,
  Filter,
  Map as MapIcon,
  List,
  LayoutGrid,
  SlidersHorizontal,
  X,
  ChevronDown,
  MapPin,
  Ruler,
  IndianRupee,
  Building2,
  ChevronRight,
  Grid3X3,
  Table2
} from 'lucide-react'
import { cn, formatCurrency, formatArea, indiaStates } from '@/lib/utils'
import { ParcelCard } from '@/components/ui/parcel-card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { LandHealthScoreMini } from '@/components/ui/land-health-score'
import { Sidebar, MobileHeader } from '@/components/layout/sidebar'

// Mock data
const parcels = [
  {
    id: '1',
    displayId: 'PA-2026-8K3M2N',
    state: 'Karnataka',
    district: 'Bangalore',
    tehsil: 'Anekal',
    village: 'Sarjapur',
    surveyNumber: '45/1',
    plotNumber: '12',
    khataNumber: '1234/56',
    areaSqFt: 45000,
    askingPrice: 12500000,
    landHealthScore: 92,
    acquisitionReadiness: 'READY' as const,
    verificationStatus: 'VERIFIED' as const,
    status: 'ACTIVE' as const,
    listedAt: '2026-05-15',
    ownershipType: 'Freehold',
    zoning: 'Commercial',
    usageType: 'IT Park',
    latitude: 12.8569,
    longitude: 77.7580,
    createdAt: '2026-05-15T00:00:00.000Z',
    updatedAt: '2026-05-15T00:00:00.000Z'
  },
  {
    id: '2',
    displayId: 'PA-2026-7X9P4Q',
    state: 'Karnataka',
    district: 'Bangalore',
    tehsil: 'Anekal',
    village: 'Electronic City',
    surveyNumber: '78/2',
    plotNumber: '8',
    khataNumber: '2345/67',
    areaSqFt: 120000,
    askingPrice: 28000000,
    landHealthScore: 78,
    acquisitionReadiness: 'CAUTION' as const,
    verificationStatus: 'IN_REVIEW' as const,
    status: 'UNDER_NEGOTIATION' as const,
    listedAt: '2026-05-10',
    ownershipType: 'Freehold',
    zoning: 'Industrial',
    usageType: 'Manufacturing',
    latitude: 12.8456,
    longitude: 77.6603,
    createdAt: '2026-05-10T00:00:00.000Z',
    updatedAt: '2026-05-10T00:00:00.000Z'
  },
  {
    id: '3',
    displayId: 'PA-2026-6W2R8T',
    state: 'Karnataka',
    district: 'Bangalore',
    tehsil: 'Anekal',
    village: 'Bommasandra',
    surveyNumber: '102/3',
    plotNumber: '15',
    khataNumber: '3456/78',
    areaSqFt: 85000,
    askingPrice: 19500000,
    landHealthScore: 88,
    acquisitionReadiness: 'READY' as const,
    verificationStatus: 'VERIFIED' as const,
    status: 'ACTIVE' as const,
    listedAt: '2026-05-08',
    ownershipType: 'Freehold',
    zoning: 'Commercial',
    usageType: 'Warehouse',
    latitude: 12.8234,
    longitude: 77.6712,
    createdAt: '2026-05-08T00:00:00.000Z',
    updatedAt: '2026-05-08T00:00:00.000Z'
  },
  {
    id: '4',
    displayId: 'PA-2026-5V1S6U',
    state: 'Karnataka',
    district: 'Bangalore',
    tehsil: 'Devanahalli',
    village: 'Devanahalli Town',
    surveyNumber: '156/4',
    plotNumber: '22',
    khataNumber: '4567/89',
    areaSqFt: 200000,
    askingPrice: 45000000,
    landHealthScore: 95,
    acquisitionReadiness: 'READY' as const,
    verificationStatus: 'VERIFIED' as const,
    status: 'ACTIVE' as const,
    listedAt: '2026-05-05',
    ownershipType: 'Freehold',
    zoning: 'Commercial',
    usageType: 'Tech Park',
    latitude: 13.2429,
    longitude: 77.7136,
    createdAt: '2026-05-05T00:00:00.000Z',
    updatedAt: '2026-05-05T00:00:00.000Z'
  },
  {
    id: '5',
    displayId: 'PA-2026-4T0R5V',
    state: 'Maharashtra',
    district: 'Pune',
    tehsil: 'Hinjewadi',
    village: 'Hinjewadi Phase 3',
    surveyNumber: '89/1',
    plotNumber: '45',
    khataNumber: '5678/90',
    areaSqFt: 65000,
    askingPrice: 18000000,
    landHealthScore: 85,
    acquisitionReadiness: 'READY' as const,
    verificationStatus: 'VERIFIED' as const,
    status: 'ACTIVE' as const,
    listedAt: '2026-05-01',
    ownershipType: 'Leasehold',
    zoning: 'IT',
    usageType: 'Commercial',
    latitude: 18.5989,
    longitude: 73.7396,
    createdAt: '2026-05-01T00:00:00.000Z',
    updatedAt: '2026-05-01T00:00:00.000Z'
  },
  {
    id: '6',
    displayId: 'PA-2026-3S9Q4W',
    state: 'Telangana',
    district: 'Hyderabad',
    tehsil: 'Shamirpet',
    village: 'Ghatkesar',
    surveyNumber: '201/5',
    plotNumber: '67',
    khataNumber: '6789/01',
    areaSqFt: 150000,
    askingPrice: 32000000,
    landHealthScore: 91,
    acquisitionReadiness: 'READY' as const,
    verificationStatus: 'VERIFIED' as const,
    status: 'ACTIVE' as const,
    listedAt: '2026-04-28',
    ownershipType: 'Freehold',
    zoning: 'Industrial',
    usageType: 'Manufacturing',
    latitude: 17.4510,
    longitude: 78.6798,
    createdAt: '2026-04-28T00:00:00.000Z',
    updatedAt: '2026-04-28T00:00:00.000Z'
  }
]

const viewModes = [
  { id: 'list', label: 'List', icon: List },
  { id: 'grid', label: 'Grid', icon: LayoutGrid },
  { id: 'map', label: 'Map', icon: MapIcon }
]

const filtersInitial = {
  state: '',
  district: '',
  areaMin: '',
  areaMax: '',
  priceMin: '',
  priceMax: '',
  zoning: [] as string[],
  verificationStatus: [] as string[],
  ownershipType: [] as string[]
}

export default function DiscoverPage() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [viewMode, setViewMode] = useState<'list' | 'grid' | 'map'>('list')
  const [showFilters, setShowFilters] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [filters, setFilters] = useState(filtersInitial)
  const [sortBy, setSortBy] = useState('recent')
  const [selectedParcels, setSelectedParcels] = useState<string[]>([])

  const filteredParcels = parcels.filter(parcel => {
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      if (
        !parcel.displayId.toLowerCase().includes(query) &&
        !parcel.village.toLowerCase().includes(query) &&
        !parcel.district.toLowerCase().includes(query) &&
        !parcel.surveyNumber?.toLowerCase().includes(query)
      ) {
        return false
      }
    }
    if (filters.state && parcel.state !== filters.state) return false
    if (filters.district && parcel.district !== filters.district) return false
    if (filters.areaMin && parcel.areaSqFt < parseInt(filters.areaMin)) return false
    if (filters.areaMax && parcel.areaSqFt > parseInt(filters.areaMax)) return false
    if (filters.priceMin && parcel.askingPrice < parseInt(filters.priceMin)) return false
    if (filters.priceMax && parcel.askingPrice > parseInt(filters.priceMax)) return false
    if (filters.zoning.length && !filters.zoning.includes(parcel.zoning)) return false
    if (filters.ownershipType.length && !filters.ownershipType.includes(parcel.ownershipType)) return false
    return true
  })

  const toggleParcelSelection = (id: string) => {
    setSelectedParcels(prev =>
      prev.includes(id) ? prev.filter(p => p !== id) : [...prev, id].slice(0, 4)
    )
  }

  const activeFilterCount = Object.values(filters).filter(v =>
    Array.isArray(v) ? v.length > 0 : v !== ''
  ).length

  return (
    <div className="min-h-screen bg-black">
      <Sidebar collapsed={sidebarCollapsed} onToggle={() => setSidebarCollapsed(!sidebarCollapsed)} />
      <MobileHeader onMenuToggle={() => setSidebarCollapsed(!sidebarCollapsed)} />

      <main className={cn(
        'min-h-screen transition-all duration-300 pt-14 lg:pt-0',
        sidebarCollapsed ? 'lg:pl-[72px]' : 'lg:pl-[260px]'
      )}>
        {/* Search Header */}
        <div className="sticky top-0 z-30 bg-black/90 backdrop-blur-xl border-b border-gray-850">
          <div className="p-4 lg:p-6">
            <div className="flex flex-col lg:flex-row gap-4">
              {/* Search */}
              <div className="flex-1 relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                <input
                  type="text"
                  placeholder="Search by parcel ID, location, survey number..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full h-12 pl-12 pr-4 bg-gray-950 border border-gray-800 rounded-xl text-white placeholder:text-gray-500 focus:outline-none focus:border-orange"
                />
              </div>

              {/* View Mode Toggle */}
              <div className="flex items-center gap-2 p-1 bg-gray-950 rounded-xl border border-gray-800">
                {viewModes.map((mode) => (
                  <button
                    key={mode.id}
                    onClick={() => setViewMode(mode.id as typeof viewMode)}
                    className={cn(
                      'flex items-center gap-2 px-4 py-2 rounded-lg text-sm transition-colors',
                      viewMode === mode.id
                        ? 'bg-orange text-white'
                        : 'text-gray-400 hover:text-white'
                    )}
                  >
                    <mode.icon className="w-4 h-4" />
                    <span className="hidden sm:inline">{mode.label}</span>
                  </button>
                ))}
              </div>

              {/* Filters Toggle */}
              <Button
                variant={showFilters ? 'default' : 'outline'}
                onClick={() => setShowFilters(!showFilters)}
                leftIcon={<SlidersHorizontal className="w-4 h-4" />}
              >
                Filters
                {activeFilterCount > 0 && (
                  <span className="ml-2 px-2 py-0.5 rounded-full bg-white/20 text-xs">
                    {activeFilterCount}
                  </span>
                )}
              </Button>

              {/* Compare Button */}
              {selectedParcels.length > 0 && (
                <Button
                  variant="outline"
                  onClick={() => window.location.href = `/compare?parcels=${selectedParcels.join(',')}`}
                  leftIcon={<Table2 className="w-4 h-4" />}
                >
                  Compare ({selectedParcels.length})
                </Button>
              )}
            </div>

            {/* Filters Panel */}
            <AnimatePresence>
              {showFilters && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden"
                >
                  <div className="pt-4 mt-4 border-t border-gray-850">
                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                      {/* State */}
                      <div>
                        <label className="block text-xs text-gray-500 mb-2">State</label>
                        <select
                          value={filters.state}
                          onChange={(e) => setFilters({ ...filters, state: e.target.value, district: '' })}
                          className="w-full h-10 px-3 bg-gray-950 border border-gray-800 rounded-lg text-sm text-white focus:outline-none focus:border-orange"
                        >
                          <option value="">All States</option>
                          {indiaStates.map(state => (
                            <option key={state} value={state}>{state}</option>
                          ))}
                        </select>
                      </div>

                      {/* Area Range */}
                      <div>
                        <label className="block text-xs text-gray-500 mb-2">Min Area (sq ft)</label>
                        <Input
                          type="number"
                          placeholder="0"
                          value={filters.areaMin}
                          onChange={(e) => setFilters({ ...filters, areaMin: e.target.value })}
                        />
                      </div>

                      <div>
                        <label className="block text-xs text-gray-500 mb-2">Max Area (sq ft)</label>
                        <Input
                          type="number"
                          placeholder="Any"
                          value={filters.areaMax}
                          onChange={(e) => setFilters({ ...filters, areaMax: e.target.value })}
                        />
                      </div>

                      {/* Price Range */}
                      <div>
                        <label className="block text-xs text-gray-500 mb-2">Min Price (₹)</label>
                        <Input
                          type="number"
                          placeholder="0"
                          value={filters.priceMin}
                          onChange={(e) => setFilters({ ...filters, priceMin: e.target.value })}
                        />
                      </div>

                      <div>
                        <label className="block text-xs text-gray-500 mb-2">Max Price (₹)</label>
                        <Input
                          type="number"
                          placeholder="Any"
                          value={filters.priceMax}
                          onChange={(e) => setFilters({ ...filters, priceMax: e.target.value })}
                        />
                      </div>

                      {/* Ownership Type */}
                      <div>
                        <label className="block text-xs text-gray-500 mb-2">Ownership</label>
                        <select
                          value={filters.ownershipType[0] || ''}
                          onChange={(e) => setFilters({
                            ...filters,
                            ownershipType: e.target.value ? [e.target.value] : []
                          })}
                          className="w-full h-10 px-3 bg-gray-950 border border-gray-800 rounded-lg text-sm text-white focus:outline-none focus:border-orange"
                        >
                          <option value="">Any</option>
                          <option value="Freehold">Freehold</option>
                          <option value="Leasehold">Leasehold</option>
                          <option value="Co-operative Society">Co-operative</option>
                        </select>
                      </div>
                    </div>

                    {/* Active Filters */}
                    {activeFilterCount > 0 && (
                      <div className="flex items-center gap-2 mt-4">
                        <span className="text-xs text-gray-500">Active filters:</span>
                        {filters.state && (
                          <Badge variant="orange">{filters.state}</Badge>
                        )}
                        {filters.areaMin && (
                          <Badge variant="default">{filters.areaMin}+ sq ft</Badge>
                        )}
                        {filters.areaMax && (
                          <Badge variant="default">Up to {filters.areaMax} sq ft</Badge>
                        )}
                        <button
                          onClick={() => setFilters(filtersInitial)}
                          className="text-xs text-orange hover:underline"
                        >
                          Clear all
                        </button>
                      </div>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Results */}
        <div className="p-6">
          {/* Results Header */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-medium text-white">
                {filteredParcels.length} Parcels Found
              </h2>
              <p className="text-sm text-gray-500">
                {searchQuery && `Showing results for "${searchQuery}"`}
              </p>
            </div>
            <div className="flex items-center gap-4">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="h-10 px-3 bg-gray-950 border border-gray-800 rounded-lg text-sm text-white focus:outline-none focus:border-orange"
              >
                <option value="recent">Most Recent</option>
                <option value="price_low">Price: Low to High</option>
                <option value="price_high">Price: High to Low</option>
                <option value="area_low">Area: Small to Large</option>
                <option value="area_high">Area: Large to Small</option>
                <option value="health">Land Health Score</option>
              </select>
            </div>
          </div>

          {/* List View */}
          {viewMode === 'list' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-4"
            >
              {filteredParcels.map((parcel, index) => (
                <motion.div
                  key={parcel.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <ParcelCard parcel={parcel} index={index} />
                </motion.div>
              ))}
            </motion.div>
          )}

          {/* Grid View */}
          {viewMode === 'grid' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {filteredParcels.map((parcel, index) => (
                <motion.div
                  key={parcel.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <ParcelCard parcel={parcel} index={index} variant="compact" />
                </motion.div>
              ))}
            </motion.div>
          )}

          {/* Map View */}
          {viewMode === 'map' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="rounded-xl bg-gray-950 border border-gray-850 overflow-hidden"
            >
              <div className="aspect-[16/9] bg-gray-900 relative">
                {/* Map placeholder */}
                <div className="absolute inset-0 bg-grid opacity-20" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <MapIcon className="w-16 h-16 text-gray-700 mx-auto mb-4" />
                    <p className="text-gray-500">Map View</p>
                    <p className="text-sm text-gray-600">Integrate Mapbox for live parcel visualization</p>
                  </div>
                </div>

                {/* Parcel markers */}
                <div className="absolute top-1/4 left-1/3 w-12 h-12 rounded-full bg-orange text-white flex items-center justify-center text-xs font-bold shadow-lg cursor-pointer hover:scale-110 transition-transform">
                  {filteredParcels[0]?.landHealthScore}
                </div>
                <div className="absolute top-1/3 right-1/4 w-12 h-12 rounded-full bg-orange text-white flex items-center justify-center text-xs font-bold shadow-lg cursor-pointer hover:scale-110 transition-transform">
                  {filteredParcels[1]?.landHealthScore}
                </div>
                <div className="absolute bottom-1/3 left-1/2 w-12 h-12 rounded-full bg-success text-white flex items-center justify-center text-xs font-bold shadow-lg cursor-pointer hover:scale-110 transition-transform">
                  {filteredParcels[2]?.landHealthScore}
                </div>
                <div className="absolute bottom-1/4 right-1/3 w-12 h-12 rounded-full bg-success text-white flex items-center justify-center text-xs font-bold shadow-lg cursor-pointer hover:scale-110 transition-transform">
                  {filteredParcels[3]?.landHealthScore}
                </div>
              </div>

              {/* Parcel List Below Map */}
              <div className="p-4 border-t border-gray-850">
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {filteredParcels.slice(0, 4).map((parcel) => (
                    <div
                      key={parcel.id}
                      className="p-3 rounded-lg bg-gray-900 border border-gray-800 hover:border-orange cursor-pointer transition-colors"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-mono text-gray-500">{parcel.displayId}</span>
                        <LandHealthScoreMini score={parcel.landHealthScore} />
                      </div>
                      <p className="text-sm text-white truncate">{parcel.village}, {parcel.district}</p>
                      <p className="text-xs text-gray-500 mt-1">{formatCurrency(parcel.askingPrice)}</p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </main>
    </div>
  )
}
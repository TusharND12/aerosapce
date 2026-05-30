'use client'

import { motion } from 'framer-motion'
import { MapPin, Ruler, IndianRupee, Calendar, Building2, ChevronRight } from 'lucide-react'
import Link from 'next/link'
import { cn, formatCurrency, formatArea, formatDate } from '@/lib/utils'
import { Parcel } from '@/types'
import { LandHealthScoreMini } from './land-health-score'
import { Badge } from './badge'

interface ParcelCardProps {
  parcel: Parcel
  index?: number
  variant?: 'default' | 'compact' | 'featured'
  className?: string
}

export function ParcelCard({
  parcel,
  index = 0,
  variant = 'default',
  className
}: ParcelCardProps) {
  const statusColors = {
    ACTIVE: 'success',
    UNDER_NEGOTIATION: 'warning',
    SOLD: 'error',
    PENDING: 'orange',
    DELISTED: 'default' as const,
  } as const

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.4 }}
    >
      <Link href={`/parcel/${parcel.id}`}>
        <motion.div
          whileHover={{ y: -4 }}
          transition={{ duration: 0.2 }}
          className={cn(
            'group relative rounded-xl bg-gray-950 border border-gray-850 overflow-hidden',
            'hover:border-gray-750 transition-all duration-300',
            variant === 'featured' && 'border-orange/30 bg-gradient-to-br from-orange/5 to-transparent',
            className
          )}
        >
          {/* Header with map preview placeholder */}
          <div className="relative h-40 bg-gray-900 overflow-hidden">
            {/* Grid pattern background */}
            <div className="absolute inset-0 bg-grid opacity-20" />

            {/* Placeholder map visualization */}
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div
                className="w-24 h-16 rounded border border-orange/50 bg-orange/10 flex items-center justify-center"
                whileHover={{ scale: 1.05 }}
              >
                <MapPin className="w-6 h-6 text-orange" />
              </motion.div>
            </div>

            {/* Overlay badges */}
            <div className="absolute top-3 left-3 flex items-center gap-2">
              {parcel.landHealthScore && (
                <LandHealthScoreMini score={parcel.landHealthScore} />
              )}
            </div>

            <div className="absolute top-3 right-3">
              <Badge variant={statusColors[parcel.status]}>
                {parcel.status.replace('_', ' ')}
              </Badge>
            </div>

            {/* Featured indicator */}
            {variant === 'featured' && (
              <div className="absolute bottom-3 left-3">
                <Badge variant="orange" icon={<Building2 className="w-3 h-3" />}>
                  Featured
                </Badge>
              </div>
            )}

            {/* Hover overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>

          {/* Content */}
          <div className="p-5">
            {/* Parcel ID */}
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-mono text-gray-500">{parcel.displayId}</span>
              {parcel.acquisitionReadiness && (
                <Badge
                  variant={
                    parcel.acquisitionReadiness === 'READY' ? 'success' :
                    parcel.acquisitionReadiness === 'CAUTION' ? 'warning' : 'error'
                  }
                >
                  {parcel.acquisitionReadiness.replace('_', ' ')}
                </Badge>
              )}
            </div>

            {/* Location */}
            <h3 className="text-lg font-medium text-white mb-2 line-clamp-1 group-hover:text-orange transition-colors">
              {parcel.village || parcel.district}, {parcel.state}
            </h3>

            <p className="text-sm text-gray-500 mb-4">
              {parcel.surveyNumber && `Survey No: ${parcel.surveyNumber}`}
              {parcel.surveyNumber && parcel.plotNumber && ' • '}
              {parcel.plotNumber && `Plot No: ${parcel.plotNumber}`}
            </p>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="flex items-center gap-2">
                <Ruler className="w-4 h-4 text-gray-500" />
                <span className="text-sm text-gray-400">
                  {parcel.areaSqFt ? formatArea(parcel.areaSqFt) : 'N/A'}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <IndianRupee className="w-4 h-4 text-gray-500" />
                <span className="text-sm text-gray-400">
                  {parcel.askingPrice ? formatCurrency(parcel.askingPrice) : 'Price on request'}
                </span>
              </div>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between pt-4 border-t border-gray-850">
              <div className="flex items-center gap-2 text-xs text-gray-500">
                <Calendar className="w-3 h-3" />
                {parcel.listedAt ? formatDate(parcel.listedAt, 'relative') : 'Recently added'}
              </div>
              <div className="flex items-center gap-1 text-orange text-sm font-medium group-hover:gap-2 transition-all">
                View Details
                <ChevronRight className="w-4 h-4" />
              </div>
            </div>
          </div>

          {/* Corner accent */}
          <div className="absolute top-0 right-0 w-16 h-16 opacity-0 group-hover:opacity-100 transition-opacity">
            <div className="absolute top-3 right-3 w-px h-8 bg-gradient-to-b from-orange to-transparent" />
            <div className="absolute top-3 right-3 w-8 h-px bg-gradient-to-l from-orange to-transparent" />
          </div>
        </motion.div>
      </Link>
    </motion.div>
  )
}

// Compact version for lists
export function ParcelCardCompact({
  parcel,
  index = 0,
  className
}: {
  parcel: Parcel
  index?: number
  className?: string
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.03 }}
    >
      <Link href={`/parcel/${parcel.id}`}>
        <div className={cn(
          'flex items-center gap-4 p-4 rounded-lg bg-gray-950 border border-gray-850',
          'hover:bg-gray-900 hover:border-gray-750 transition-all',
          className
        )}>
          {/* Map preview */}
          <div className="w-16 h-16 rounded-lg bg-gray-900 flex items-center justify-center flex-shrink-0">
            <MapPin className="w-6 h-6 text-gray-600" />
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-mono text-gray-500">{parcel.displayId}</span>
              {parcel.landHealthScore && (
                <LandHealthScoreMini score={parcel.landHealthScore} />
              )}
            </div>
            <h4 className="text-sm font-medium text-white truncate">
              {parcel.village || parcel.district}, {parcel.state}
            </h4>
          </div>

          {/* Price */}
          <div className="text-right flex-shrink-0">
            <p className="text-sm font-medium text-white">
              {parcel.askingPrice ? formatCurrency(parcel.askingPrice) : 'N/A'}
            </p>
            <p className="text-xs text-gray-500">
              {parcel.areaSqFt ? formatArea(parcel.areaSqFt) : 'N/A'}
            </p>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}

// Stats card for parcel metrics
interface ParcelStatCardProps {
  label: string
  value: string | number
  change?: number
  icon?: React.ReactNode
  className?: string
}

export function ParcelStatCard({
  label,
  value,
  change,
  icon,
  className
}: ParcelStatCardProps) {
  return (
    <div className={cn('p-4 rounded-xl bg-gray-950 border border-gray-850', className)}>
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm text-gray-500">{label}</span>
        {icon && <span className="text-gray-500">{icon}</span>}
      </div>
      <p className="text-2xl font-serif text-white">{value}</p>
      {change !== undefined && (
        <div className={cn(
          'flex items-center gap-1 mt-2 text-xs',
          change >= 0 ? 'text-success' : 'text-error'
        )}>
          <span>{change >= 0 ? '↑' : '↓'}</span>
          <span>{Math.abs(change)}%</span>
        </div>
      )}
    </div>
  )
}

export default ParcelCard
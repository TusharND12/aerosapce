'use client'

import { motion } from 'framer-motion'
import { Shield, TrendingUp, CheckCircle, AlertTriangle, XCircle } from 'lucide-react'
import { cn, getScoreColor, getScoreLabel } from '@/lib/utils'

interface LandHealthScoreProps {
  score: number
  showLabel?: boolean
  size?: 'sm' | 'md' | 'lg' | 'xl'
  animated?: boolean
  className?: string
}

export function LandHealthScore({
  score,
  showLabel = true,
  size = 'md',
  animated = true,
  className
}: LandHealthScoreProps) {
  const color = getScoreColor(score)
  const label = getScoreLabel(score)

  const sizeClasses = {
    sm: { ring: 'w-16 h-16', value: 'text-xl', label: 'text-xs' },
    md: { ring: 'w-24 h-24', value: 'text-3xl', label: 'text-sm' },
    lg: { ring: 'w-32 h-32', value: 'text-4xl', label: 'text-base' },
    xl: { ring: 'w-40 h-40', value: 'text-5xl', label: 'text-lg' },
  }

  const sizeClass = sizeClasses[size]

  // Calculate stroke dasharray and dashoffset
  const circumference = 2 * Math.PI * 45 // radius = 45
  const strokeDasharray = circumference
  const strokeDashoffset = circumference - (score / 100) * circumference

  // Determine color based on score
  const getStrokeColor = () => {
    if (score >= 90) return '#22C55E' // success green
    if (score >= 70) return '#FF6A00' // orange
    if (score >= 50) return '#EAB308' // warning yellow
    return '#EF4444' // error red
  }

  const IconComponent = score >= 90 ? CheckCircle : score >= 70 ? AlertTriangle : XCircle

  return (
    <div className={cn('flex flex-col items-center', className)}>
      <div className="relative">
        <svg
          className={cn(sizeClass.ring, 'transform -rotate-90')}
          viewBox="0 0 100 100"
        >
          {/* Background circle */}
          <circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            stroke="currentColor"
            strokeWidth="4"
            className="text-gray-850"
          />
          {/* Progress circle */}
          <motion.circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            stroke={getStrokeColor()}
            strokeWidth="4"
            strokeLinecap="round"
            strokeDasharray={strokeDasharray}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset }}
            transition={{ duration: animated ? 1.5 : 0, ease: 'easeOut' }}
          />
        </svg>

        {/* Center content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <motion.span
            className={cn(sizeClass.value, 'font-serif font-bold', color)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            {score}
          </motion.span>
        </div>
      </div>

      {showLabel && (
        <motion.div
          className="mt-3 text-center"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.4 }}
        >
          <p className={cn(sizeClass.label, 'text-gray-400 font-medium')}>
            {label}
          </p>
        </motion.div>
      )}
    </div>
  )
}

// Mini version for cards
export function LandHealthScoreMini({
  score,
  className
}: {
  score: number
  className?: string
}) {
  const color = getScoreColor(score)
  const circumference = 2 * Math.PI * 16
  const strokeDashoffset = circumference - (score / 100) * circumference

  return (
    <div className={cn('flex items-center gap-2', className)}>
      <div className="relative w-10 h-10">
        <svg className="w-10 h-10 transform -rotate-90" viewBox="0 0 36 36">
          <circle
            cx="18"
            cy="18"
            r="16"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="text-gray-850"
          />
          <circle
            cx="18"
            cy="18"
            r="16"
            fill="none"
            stroke={score >= 90 ? '#22C55E' : score >= 70 ? '#FF6A00' : '#EF4444'}
            strokeWidth="2"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
          />
        </svg>
        <span className={cn(
          'absolute inset-0 flex items-center justify-center text-xs font-bold',
          color
        )}>
          {score}
        </span>
      </div>
      <span className="text-xs text-gray-500">Land Health Score™</span>
    </div>
  )
}

// Score breakdown component
interface ScoreBreakdownProps {
  factors: {
    name: string
    contribution: number
    status: 'positive' | 'neutral' | 'negative'
  }[]
  className?: string
}

export function ScoreBreakdown({ factors, className }: ScoreBreakdownProps) {
  return (
    <div className={cn('space-y-3', className)}>
      {factors.map((factor, index) => (
        <motion.div
          key={factor.name}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.1 }}
          className="flex items-center justify-between"
        >
          <span className="text-sm text-gray-400">{factor.name}</span>
          <div className="flex items-center gap-2">
            <div className="w-20 h-1.5 bg-gray-850 rounded-full overflow-hidden">
              <motion.div
                className={cn(
                  'h-full rounded-full',
                  factor.status === 'positive' ? 'bg-success' :
                  factor.status === 'negative' ? 'bg-error' : 'bg-orange'
                )}
                initial={{ width: 0 }}
                animate={{ width: `${factor.contribution}%` }}
                transition={{ delay: 0.3 + index * 0.1, duration: 0.8 }}
              />
            </div>
            <span className="text-xs font-mono text-gray-500 w-8 text-right">
              {factor.contribution}%
            </span>
          </div>
        </motion.div>
      ))}
    </div>
  )
}

// Acquisition Readiness Index
interface AcquisitionReadinessIndexProps {
  status: 'READY' | 'CAUTION' | 'REQUIRES_REVIEW'
  showLabel?: boolean
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

export function AcquisitionReadinessIndex({
  status,
  showLabel = true,
  size = 'md',
  className
}: AcquisitionReadinessIndexProps) {
  const config = {
    READY: {
      icon: Shield,
      label: 'Ready for Acquisition',
      color: 'text-success',
      bgColor: 'bg-success/20',
      borderColor: 'border-success/30',
    },
    CAUTION: {
      icon: AlertTriangle,
      label: 'Review Before Acquisition',
      color: 'text-warning',
      bgColor: 'bg-warning/20',
      borderColor: 'border-warning/30',
    },
    REQUIRES_REVIEW: {
      icon: XCircle,
      label: 'Requires Due Diligence',
      color: 'text-error',
      bgColor: 'bg-error/20',
      borderColor: 'border-error/30',
    },
  }

  const { icon: Icon, label, color, bgColor, borderColor } = config[status]

  const sizeClasses = {
    sm: { icon: 'w-4 h-4', badge: 'text-xs', iconSize: 'w-3 h-3' },
    md: { icon: 'w-5 h-5', badge: 'text-sm', iconSize: 'w-4 h-4' },
    lg: { icon: 'w-6 h-6', badge: 'text-base', iconSize: 'w-5 h-5' },
  }

  const sizeClass = sizeClasses[size]

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className={cn(
        'inline-flex items-center gap-2 px-3 py-2 rounded-lg border',
        bgColor,
        borderColor,
        className
      )}
    >
      <Icon className={cn(sizeClass.icon, color)} />
      <span className={cn(sizeClass.badge, 'font-medium', color)}>
        {status}
      </span>
      {showLabel && (
        <span className={cn('text-xs text-gray-500 ml-1')}>
          {label}
        </span>
      )}
    </motion.div>
  )
}

// Verification badge component
interface VerificationBadgeProps {
  verifiedAt: string
  verifiedBy: string
  className?: string
}

export function VerificationBadge({ verifiedAt, verifiedBy, className }: VerificationBadgeProps) {
  return (
    <div className={cn(
      'inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-success/10 border border-success/20',
      className
    )}>
      <CheckCircle className="w-4 h-4 text-success" />
      <div className="flex flex-col">
        <span className="text-xs font-medium text-success">Verified</span>
        <span className="text-[10px] text-gray-500">
          {new Date(verifiedAt).toLocaleDateString('en-IN')} • {verifiedBy}
        </span>
      </div>
    </div>
  )
}

export default LandHealthScore
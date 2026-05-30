import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatCurrency(amount: number | string, currency = 'INR'): string {
  const num = typeof amount === 'string' ? parseFloat(amount) : amount
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency,
    maximumFractionDigits: 0,
  }).format(num)
}

export function formatNumber(num: number, decimals = 0): string {
  return new Intl.NumberFormat('en-IN', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(num)
}

export function formatArea(sqft: number): string {
  if (sqft >= 100000) {
    return `${(sqft / 43560).toFixed(2)} acres`
  }
  return `${formatNumber(sqft)} sq ft`
}

export function formatCompactNumber(num: number): string {
  if (num >= 10000000) {
    return `${(num / 10000000).toFixed(1)} Cr`
  }
  if (num >= 100000) {
    return `${(num / 100000).toFixed(1)} L`
  }
  if (num >= 1000) {
    return `${(num / 1000).toFixed(1)} K`
  }
  return num.toString()
}

export function formatDate(date: Date | string, style: 'short' | 'long' | 'relative' = 'short'): string {
  const d = typeof date === 'string' ? new Date(date) : date

  if (style === 'relative') {
    const now = new Date()
    const diff = now.getTime() - d.getTime()
    const seconds = Math.floor(diff / 1000)
    const minutes = Math.floor(seconds / 60)
    const hours = Math.floor(minutes / 60)
    const days = Math.floor(hours / 24)

    if (days > 30) return formatDate(d, 'short')
    if (days > 0) return `${days}d ago`
    if (hours > 0) return `${hours}h ago`
    if (minutes > 0) return `${minutes}m ago`
    return 'Just now'
  }

  return d.toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: style === 'long' ? 'numeric' : undefined,
  })
}

export function generateDisplayId(prefix = 'PA'): string {
  const year = new Date().getFullYear()
  const random = Math.random().toString(36).substring(2, 8).toUpperCase()
  return `${prefix}-${year}-${random}`
}

export function getInitials(name: string): string {
  return name
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase()
    .substring(0, 2)
}

export function truncate(str: string, length: number): string {
  if (str.length <= length) return str
  return str.substring(0, length) + '...'
}

export function slugify(str: string): string {
  return str
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}

export function debounce<T extends (...args: unknown[]) => unknown>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null
  return (...args: Parameters<T>) => {
    if (timeout) clearTimeout(timeout)
    timeout = setTimeout(() => func(...args), wait)
  }
}

export function throttle<T extends (...args: unknown[]) => unknown>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle = false
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args)
      inThrottle = true
      setTimeout(() => (inThrottle = false), limit)
    }
  }
}

export function getScoreColor(score: number): string {
  if (score >= 90) return 'text-success'
  if (score >= 70) return 'text-orange'
  if (score >= 50) return 'text-warning'
  return 'text-error'
}

export function getScoreLabel(score: number): string {
  if (score >= 90) return 'Verified Acquisition Ready'
  if (score >= 80) return 'Ready for Acquisition'
  if (score >= 70) return 'Minor Verification Needed'
  if (score >= 60) return 'Verification Recommended'
  if (score >= 40) return 'Significant Concerns'
  return 'High Risk - Not Recommended'
}

export function getReadinessStatus(status: string): {
  label: string
  color: string
  bgColor: string
} {
  switch (status) {
    case 'READY':
      return { label: 'Ready', color: 'text-success', bgColor: 'bg-success/20' }
    case 'CAUTION':
      return { label: 'Caution', color: 'text-warning', bgColor: 'bg-warning/20' }
    case 'REQUIRES_REVIEW':
      return { label: 'Requires Review', color: 'text-error', bgColor: 'bg-error/20' }
    default:
      return { label: 'Unknown', color: 'text-gray-500', bgColor: 'bg-gray-800' }
  }
}

export function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms))
}

export const indiaStates = [
  'Andhra Pradesh',
  'Delhi',
  'Gujarat',
  'Karnataka',
  'Kerala',
  'Madhya Pradesh',
  'Maharashtra',
  'Rajasthan',
  'Tamil Nadu',
  'Telangana',
  'Uttar Pradesh',
  'West Bengal',
] as const

export const propertyTypes = [
  'Agricultural',
  'Commercial',
  'Industrial',
  'Mixed Use',
  'Residential',
  'Residential Cum Commercial',
] as const

export const ownershipTypes = [
  'Freehold',
  'Leasehold',
  'Co-operative Society',
  'Private',
  'Government',
  'Package',
] as const

export const verificationStatuses = ['PENDING', 'IN_REVIEW', 'VERIFIED', 'REJECTED', 'EXPIRED'] as const

export const offerStatuses = [
  'SUBMITTED',
  'COUNTERED',
  'REVISED',
  'LEGAL_REVIEW',
  'ACCEPTED',
  'DECLINED',
  'WITHDRAWN',
  'EXPIRED',
  'CLOSED',
] as const
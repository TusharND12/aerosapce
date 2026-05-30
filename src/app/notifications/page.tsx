'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  Bell,
  DollarSign,
  FileCheck,
  MapPin,
  MessageSquare,
  AlertTriangle,
  Check,
  Trash2,
  Filter,
  Settings,
  ChevronRight,
  Eye
} from 'lucide-react'
import { cn, formatDate } from '@/lib/utils'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Sidebar, MobileHeader } from '@/components/layout/sidebar'

// Mock notifications
const notifications = [
  {
    id: '1',
    type: 'OFFER_RECEIVED',
    title: 'New Offer Received',
    message: 'Sunrise Developers made an offer of ₹1.25 Cr for PA-2026-8K3M2N',
    read: false,
    createdAt: '2026-05-30T10:30:00',
    data: { parcelId: '1', offerId: '1', amount: 12500000 }
  },
  {
    id: '2',
    type: 'PARCEL_VERIFIED',
    title: 'Parcel Verification Complete',
    message: 'PA-2026-5V1S6U has been verified with Land Health Score of 95',
    read: false,
    createdAt: '2026-05-30T08:15:00',
    data: { parcelId: '4', score: 95 }
  },
  {
    id: '3',
    type: 'OFFER_COUNTERED',
    title: 'Counter Offer Received',
    message: 'Seller countered your offer for PA-2026-6W2R8T at ₹1.90 Cr',
    read: false,
    createdAt: '2026-05-29T16:45:00',
    data: { parcelId: '3', offerId: '3', amount: 19000000 }
  },
  {
    id: '4',
    type: 'PARCEL_MATCH',
    title: 'New Parcel Match',
    message: 'A new parcel matching your criteria is available in Sarjapur',
    read: true,
    createdAt: '2026-05-29T14:20:00',
    data: { parcelId: '1' }
  },
  {
    id: '5',
    type: 'DOCUMENT_VERIFIED',
    title: 'Document Verified',
    message: 'Your uploaded Sale Deed has been verified by the platform',
    read: true,
    createdAt: '2026-05-28T11:00:00',
    data: { documentId: '1' }
  },
  {
    id: '6',
    type: 'OFFER_ACCEPTED',
    title: 'Offer Accepted',
    message: 'Your offer of ₹44 L for PA-2026-5V1S6U has been accepted',
    read: true,
    createdAt: '2026-05-28T09:30:00',
    data: { parcelId: '4', offerId: '4', amount: 44000000 }
  },
  {
    id: '7',
    type: 'SECURITY_ALERT',
    title: 'Security Alert',
    message: 'New login detected from unrecognized device',
    read: true,
    createdAt: '2026-05-27T18:00:00',
    data: {}
  }
]

const typeConfig: Record<string, { icon: React.ElementType; color: string; bgColor: string }> = {
  OFFER_RECEIVED: { icon: DollarSign, color: 'text-success', bgColor: 'bg-success/20' },
  OFFER_COUNTERED: { icon: DollarSign, color: 'text-warning', bgColor: 'bg-warning/20' },
  OFFER_ACCEPTED: { icon: Check, color: 'text-success', bgColor: 'bg-success/20' },
  PARCEL_VERIFIED: { icon: FileCheck, color: 'text-info', bgColor: 'bg-info/20' },
  PARCEL_MATCH: { icon: MapPin, color: 'text-orange', bgColor: 'bg-orange/20' },
  DOCUMENT_VERIFIED: { icon: FileCheck, color: 'text-success', bgColor: 'bg-success/20' },
  SECURITY_ALERT: { icon: AlertTriangle, color: 'text-error', bgColor: 'bg-error/20' }
}

export default function NotificationsPage() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [filter, setFilter] = useState<'all' | 'unread'>('all')
  const [notificationsList, setNotificationsList] = useState(notifications)

  const filteredNotifications = filter === 'unread'
    ? notificationsList.filter(n => !n.read)
    : notificationsList

  const unreadCount = notificationsList.filter(n => !n.read).length

  const markAsRead = (id: string) => {
    setNotificationsList(prev =>
      prev.map(n => n.id === id ? { ...n, read: true } : n)
    )
  }

  const markAllAsRead = () => {
    setNotificationsList(prev => prev.map(n => ({ ...n, read: true })))
  }

  const deleteNotification = (id: string) => {
    setNotificationsList(prev => prev.filter(n => n.id !== id))
  }

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
              <h1 className="font-serif text-2xl text-white flex items-center gap-3">
                Notifications
                {unreadCount > 0 && (
                  <span className="px-2 py-0.5 rounded-full bg-orange text-white text-sm">
                    {unreadCount}
                  </span>
                )}
              </h1>
              <p className="text-sm text-gray-500">Stay updated on your land intelligence</p>
            </div>
            <div className="flex items-center gap-3">
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value as 'all' | 'unread')}
                className="h-10 px-3 bg-gray-950 border border-gray-800 rounded-lg text-sm text-white focus:outline-none focus:border-orange"
              >
                <option value="all">All Notifications</option>
                <option value="unread">Unread Only</option>
              </select>
              {unreadCount > 0 && (
                <Button variant="outline" size="sm" onClick={markAllAsRead}>
                  <Check className="w-4 h-4 mr-2" />
                  Mark All Read
                </Button>
              )}
            </div>
          </div>
        </div>

        {/* Notifications List */}
        <div className="p-6">
          {filteredNotifications.length === 0 ? (
            <div className="text-center py-16">
              <Bell className="w-16 h-16 text-gray-800 mx-auto mb-4" />
              <p className="text-gray-500">No notifications</p>
            </div>
          ) : (
            <div className="space-y-2">
              {filteredNotifications.map((notification, index) => {
                const config = typeConfig[notification.type] || typeConfig.PARCEL_MATCH
                return (
                  <motion.div
                    key={notification.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.03 }}
                    className={cn(
                      'p-4 rounded-xl border transition-colors cursor-pointer',
                      notification.read
                        ? 'bg-gray-950 border-gray-850 hover:border-gray-750'
                        : 'bg-gray-900 border-gray-800 hover:border-orange'
                    )}
                  >
                    <div className="flex items-start gap-4">
                      {/* Icon */}
                      <div className={cn(
                        'w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0',
                        config.bgColor,
                        config.color
                      )}>
                        <config.icon className="w-5 h-5" />
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className={cn(
                            'text-sm font-medium',
                            notification.read ? 'text-gray-400' : 'text-white'
                          )}>
                            {notification.title}
                          </h3>
                          {!notification.read && (
                            <span className="w-2 h-2 rounded-full bg-orange" />
                          )}
                        </div>
                        <p className="text-sm text-gray-500">{notification.message}</p>
                        <p className="text-xs text-gray-600 mt-1">
                          {formatDate(notification.createdAt, 'relative')}
                        </p>
                      </div>

                      {/* Actions */}
                      <div className="flex items-center gap-2">
                        {!notification.read && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation()
                              markAsRead(notification.id)
                            }}
                            className="p-2 rounded-lg hover:bg-gray-800 text-gray-500"
                            title="Mark as read"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                        )}
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            deleteNotification(notification.id)
                          }}
                          className="p-2 rounded-lg hover:bg-gray-800 text-gray-500 hover:text-error"
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
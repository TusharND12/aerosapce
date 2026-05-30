'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  BarChart3,
  TrendingUp,
  TrendingDown,
  Eye,
  DollarSign,
  Building2,
  Users,
  MapPin,
  Calendar,
  Download,
  Filter,
  RefreshCw
} from 'lucide-react'
import { cn, formatCurrency } from '@/lib/utils'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Sidebar, MobileHeader } from '@/components/layout/sidebar'

// Mock data
const metrics = [
  { label: 'Total Views', value: '12,847', change: 23, icon: Eye, color: 'text-info' },
  { label: 'Total Offers', value: '156', change: 12, icon: DollarSign, color: 'text-success' },
  { label: 'Conversion Rate', value: '4.2%', change: -0.3, icon: TrendingUp, color: 'text-orange' },
  { label: 'Avg. Deal Size', value: '₹1.2 Cr', change: 8, icon: Building2, color: 'text-warning' }
]

const topParcels = [
  { id: 'PA-2026-8K3M2N', location: 'Sarjapur, Bangalore', views: 1247, offers: 5, price: '₹1.25 Cr' },
  { id: 'PA-2026-7X9P4Q', location: 'Electronic City', views: 1089, offers: 3, price: '₹2.8 Cr' },
  { id: 'PA-2026-5V1S6U', location: 'Devanahalli', views: 987, offers: 4, price: '₹4.5 Cr' }
]

const geographicData = [
  { state: 'Karnataka', parcels: 1247, value: '₹890 Cr' },
  { state: 'Maharashtra', parcels: 892, value: '₹650 Cr' },
  { state: 'Telangana', parcels: 654, value: '₹420 Cr' },
  { state: 'Tamil Nadu', parcels: 432, value: '₹310 Cr' }
]

const monthlyData = [
  { month: 'Jan', parcels: 45, value: 12.5 },
  { month: 'Feb', parcels: 52, value: 15.8 },
  { month: 'Mar', parcels: 61, value: 18.2 },
  { month: 'Apr', parcels: 58, value: 16.9 },
  { month: 'May', parcels: 72, value: 21.4 }
]

export default function AnalyticsPage() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [period, setPeriod] = useState('30d')

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
              <h1 className="font-serif text-2xl text-white">Analytics Suite</h1>
              <p className="text-sm text-gray-500">Platform performance and insights</p>
            </div>
            <div className="flex items-center gap-3">
              <select
                value={period}
                onChange={(e) => setPeriod(e.target.value)}
                className="h-10 px-3 bg-gray-950 border border-gray-800 rounded-lg text-sm text-white focus:outline-none focus:border-orange"
              >
                <option value="7d">Last 7 days</option>
                <option value="30d">Last 30 days</option>
                <option value="90d">Last 90 days</option>
                <option value="1y">Last year</option>
              </select>
              <Button variant="outline" leftIcon={<Download className="w-4 h-4" />}>
                Export
              </Button>
            </div>
          </div>
        </div>

        <div className="p-6 space-y-6">
          {/* Stats Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {metrics.map((metric, index) => (
              <motion.div
                key={metric.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="p-5 rounded-xl bg-gray-950 border border-gray-850"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm text-gray-500">{metric.label}</span>
                  <metric.icon className={cn('w-5 h-5', metric.color)} />
                </div>
                <p className="text-2xl font-serif text-white">{metric.value}</p>
                <div className={cn(
                  'flex items-center gap-1 mt-2 text-xs',
                  metric.change >= 0 ? 'text-success' : 'text-error'
                )}>
                  {metric.change >= 0 ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                  <span>{Math.abs(metric.change)}% vs last period</span>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Charts Row */}
          <div className="grid lg:grid-cols-2 gap-6">
            {/* Monthly Performance Chart */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="p-6 rounded-xl bg-gray-950 border border-gray-850"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-medium text-white">Monthly Performance</h3>
                <Badge variant="default">2026</Badge>
              </div>

              {/* Simple bar chart representation */}
              <div className="flex items-end justify-between h-48 gap-4">
                {monthlyData.map((data, index) => (
                  <div key={data.month} className="flex-1 flex flex-col items-center gap-2">
                    <div className="w-full flex flex-col items-center">
                      <span className="text-xs text-gray-500 mb-1">₹{data.value}Cr</span>
                      <motion.div
                        initial={{ height: 0 }}
                        animate={{ height: `${(data.value / 25) * 100}%` }}
                        transition={{ delay: 0.3 + index * 0.1, duration: 0.5 }}
                        className="w-full rounded-t-lg bg-orange/80 hover:bg-orange transition-colors cursor-pointer"
                      />
                    </div>
                    <span className="text-xs text-gray-500">{data.month}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Geographic Distribution */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 }}
              className="p-6 rounded-xl bg-gray-950 border border-gray-850"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-medium text-white">Geographic Distribution</h3>
                <MapPin className="w-5 h-5 text-gray-500" />
              </div>

              <div className="space-y-4">
                {geographicData.map((data, index) => (
                  <div key={data.state}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-white">{data.state}</span>
                      <span className="text-sm text-gray-500">{data.parcels} parcels</span>
                    </div>
                    <div className="h-2 bg-gray-900 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${(data.parcels / 1300) * 100}%` }}
                        transition={{ delay: 0.3 + index * 0.1, duration: 0.6 }}
                        className="h-full bg-orange rounded-full"
                      />
                    </div>
                    <p className="text-xs text-gray-600 mt-1">{data.value}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Top Performing Parcels */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="rounded-xl bg-gray-950 border border-gray-850"
          >
            <div className="p-5 border-b border-gray-850">
              <h3 className="text-lg font-medium text-white">Top Performing Parcels</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-900/50">
                  <tr>
                    <th className="px-5 py-3 text-left text-xs font-medium text-gray-500 uppercase">Parcel</th>
                    <th className="px-5 py-3 text-left text-xs font-medium text-gray-500 uppercase">Location</th>
                    <th className="px-5 py-3 text-left text-xs font-medium text-gray-500 uppercase">Views</th>
                    <th className="px-5 py-3 text-left text-xs font-medium text-gray-500 uppercase">Offers</th>
                    <th className="px-5 py-3 text-left text-xs font-medium text-gray-500 uppercase">Price</th>
                    <th className="px-5 py-3 text-right text-xs font-medium text-gray-500 uppercase">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-850">
                  {topParcels.map((parcel) => (
                    <tr key={parcel.id} className="hover:bg-gray-900/50">
                      <td className="px-5 py-4">
                        <span className="text-sm font-mono text-orange">{parcel.id}</span>
                      </td>
                      <td className="px-5 py-4">
                        <span className="text-sm text-white">{parcel.location}</span>
                      </td>
                      <td className="px-5 py-4">
                        <span className="text-sm text-gray-400">{parcel.views.toLocaleString()}</span>
                      </td>
                      <td className="px-5 py-4">
                        <Badge variant="success">{parcel.offers}</Badge>
                      </td>
                      <td className="px-5 py-4">
                        <span className="text-sm text-white">{parcel.price}</span>
                      </td>
                      <td className="px-5 py-4 text-right">
                        <Button variant="ghost" size="sm">View</Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  )
}
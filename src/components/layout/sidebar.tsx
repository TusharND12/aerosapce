'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Map,
  Search,
  Building2,
  FileCheck,
  BarChart3,
  Settings,
  Bell,
  Users,
  Shield,
  ChevronLeft,
  ChevronRight,
  Home,
  Plus,
  MessageSquare,
  Folder,
  User,
  LogOut,
  Menu,
  X,
  HelpCircle
} from 'lucide-react'
import { cn } from '@/lib/utils'

interface SidebarProps {
  collapsed: boolean
  onToggle: () => void
}

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: Home },
  { name: 'Discover', href: '/discover', icon: Search },
  { name: 'Map View', href: '/map', icon: Map },
  { name: 'My Parcels', href: '/my-parcels', icon: Building2 },
  { name: 'Negotiations', href: '/negotiations', icon: MessageSquare },
  { name: 'Data Room', href: '/data-room', icon: Folder },
  { name: 'Documents', href: '/documents', icon: FileCheck },
]

const secondaryNav = [
  { name: 'Analytics', href: '/analytics', icon: BarChart3 },
  { name: 'Notifications', href: '/notifications', icon: Bell, badge: 3 },
]

const adminNav = [
  { name: 'Users', href: '/admin/users', icon: Users },
  { name: 'Verification', href: '/admin/verification', icon: Shield },
  { name: 'Settings', href: '/settings', icon: Settings },
]

const bottomNav = [
  { name: 'Help', href: '/help', icon: HelpCircle },
  { name: 'Sign Out', href: '/', icon: LogOut },
]

export function Sidebar({ collapsed, onToggle }: SidebarProps) {
  const pathname = usePathname()
  const [mounted, setMounted] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    setMounted(true)
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024)
    }
    checkMobile()

    // On mobile, guarantee that the sidebar starts as collapsed/closed on mount
    if (window.innerWidth < 1024 && !collapsed) {
      onToggle()
    }

    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  return (
    <>
      {/* Mobile Bottom Dropup Drawer Overlay */}
      <AnimatePresence>
        {mounted && isMobile && !collapsed && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/80 backdrop-blur-md z-40 lg:hidden"
              onClick={onToggle}
            />

            {/* Bottom Dropup Drawer */}
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 220 }}
              className="fixed bottom-0 left-0 right-0 z-50 max-h-[85vh] rounded-t-3xl border-t border-gray-850 bg-gray-950/95 backdrop-blur-2xl shadow-2xl flex flex-col lg:hidden"
            >
              {/* Drag Handle & Header */}
              <div className="pt-3 pb-2 px-6 flex flex-col items-center border-b border-gray-850">
                <div className="w-12 h-1 bg-gray-800 rounded-full mb-3" />
                <div className="w-full flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-orange to-orange-600 flex items-center justify-center flex-shrink-0">
                      <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="12" cy="12" r="8" />
                        <circle cx="12" cy="12" r="3" />
                      </svg>
                    </div>
                    <span className="font-serif text-base text-white font-medium">
                      LAND<span className="text-orange">GRID</span>
                    </span>
                  </div>
                  <button
                    onClick={onToggle}
                    className="p-2 rounded-full bg-gray-900 border border-gray-800 text-gray-400 hover:text-white"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Scrollable Navigation Content */}
              <div className="flex-1 overflow-y-auto px-5 py-4 space-y-6 no-scrollbar">
                {/* Main Nav Section */}
                <div className="space-y-1">
                  <div className="text-[10px] font-semibold text-gray-500 uppercase tracking-wider px-3 mb-2">Navigation</div>
                  <div className="grid grid-cols-2 gap-2">
                    {navigation.map((item) => {
                      const Icon = item.icon
                      const active = pathname === item.href || pathname.startsWith(item.href + '/')
                      return (
                        <Link key={item.name} href={item.href} onClick={onToggle}>
                          <motion.div 
                            whileTap={{ scale: 0.97 }}
                            className={cn(
                              "flex items-center gap-3 px-4 py-3 rounded-xl border transition-all duration-200",
                              active
                                ? "bg-orange/10 border-orange/30 text-orange shadow-glow-sm"
                                : "bg-gray-900/40 border-gray-850 text-gray-400 hover:text-white"
                            )}
                          >
                            <Icon className="w-4 h-4 flex-shrink-0" />
                            <span className="text-xs font-medium">{item.name}</span>
                          </motion.div>
                        </Link>
                      )
                    })}
                  </div>
                </div>

                {/* Insights Section */}
                <div className="space-y-2">
                  <div className="text-[10px] font-semibold text-gray-500 uppercase tracking-wider px-3">Insights</div>
                  <div className="grid grid-cols-2 gap-2">
                    {secondaryNav.map((item) => {
                      const Icon = item.icon
                      const active = pathname === item.href
                      return (
                        <Link key={item.name} href={item.href} onClick={onToggle}>
                          <motion.div 
                            whileTap={{ scale: 0.97 }}
                            className={cn(
                              "flex items-center gap-3 px-4 py-3 rounded-xl border transition-all duration-200 relative",
                              active
                                ? "bg-orange/10 border-orange/30 text-orange shadow-glow-sm"
                                : "bg-gray-900/40 border-gray-850 text-gray-400 hover:text-white"
                            )}
                          >
                            <Icon className="w-4 h-4 flex-shrink-0" />
                            <span className="text-xs font-medium">{item.name}</span>
                            {item.badge && (
                              <span className="absolute top-2 right-2 w-4 h-4 rounded-full bg-orange text-white text-[9px] flex items-center justify-center font-bold">
                                {item.badge}
                              </span>
                            )}
                          </motion.div>
                        </Link>
                      )
                    })}
                  </div>
                </div>

                {/* Admin Section */}
                <div className="space-y-2">
                  <div className="text-[10px] font-semibold text-gray-500 uppercase tracking-wider px-3">Admin</div>
                  <div className="grid grid-cols-2 gap-2">
                    {adminNav.map((item) => {
                      const Icon = item.icon
                      const active = pathname === item.href
                      return (
                        <Link key={item.name} href={item.href} onClick={onToggle}>
                          <motion.div 
                            whileTap={{ scale: 0.97 }}
                            className={cn(
                              "flex items-center gap-3 px-4 py-3 rounded-xl border transition-all duration-200",
                              active
                                ? "bg-orange/10 border-orange/30 text-orange shadow-glow-sm"
                                : "bg-gray-900/40 border-gray-850 text-gray-400 hover:text-white"
                            )}
                          >
                            <Icon className="w-4 h-4 flex-shrink-0" />
                            <span className="text-xs font-medium">{item.name}</span>
                          </motion.div>
                        </Link>
                      )
                    })}
                  </div>
                </div>
              </div>

              {/* Bottom Profile Footer inside Drawer */}
              <div className="p-4 border-t border-gray-850 bg-gray-900/30 flex items-center justify-between rounded-b-3xl">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-orange/10 border border-orange/20 flex items-center justify-center text-sm font-semibold text-orange">
                    TD
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-white">Tushar Dhokane</p>
                    <p className="text-xs text-gray-500">Admin</p>
                  </div>
                </div>
                <Link href="/" onClick={onToggle} className="p-2 rounded-xl bg-gray-900 border border-gray-800 text-gray-450 hover:text-error transition-colors">
                  <LogOut className="w-4 h-4" />
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Laptop / Desktop Sidebar (stays exactly as it is) */}
      <motion.aside
        initial={false}
        animate={{ width: collapsed ? 72 : 260 }}
        transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
        className={cn(
          'fixed top-0 left-0 h-full bg-gray-950 border-r border-gray-850 z-50 hidden lg:flex',
          'flex-col',
          collapsed ? 'lg:w-[72px]' : 'lg:w-[260px]'
        )}
      >
        {/* Logo */}
        <div className="h-16 flex items-center justify-between px-4 border-b border-gray-850">
          <Link href="/dashboard" className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-orange to-orange-600 flex items-center justify-center flex-shrink-0">
              <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="8" />
                <circle cx="12" cy="12" r="3" />
              </svg>
            </div>
            {!collapsed && (
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="font-serif text-lg text-white"
              >
                LAND<span className="text-orange">GRID</span>
              </motion.span>
            )}
          </Link>
          <button
            onClick={onToggle}
            className="lg:hidden p-1.5 rounded-lg hover:bg-gray-800 text-gray-500"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          {navigation.map((item) => (
            <NavItem
              key={item.name}
              item={item}
              collapsed={collapsed}
              active={pathname === item.href || pathname.startsWith(item.href + '/')}
            />
          ))}

          <div className="pt-4 pb-2">
            <div className={cn('text-[10px] font-medium text-gray-600 uppercase tracking-wider', collapsed && 'text-center')}>
              {collapsed ? '•••' : 'Insights'}
            </div>
          </div>

          {secondaryNav.map((item) => (
            <NavItem
              key={item.name}
              item={item}
              collapsed={collapsed}
              active={pathname === item.href}
            />
          ))}

          <div className="pt-4 pb-2">
            <div className={cn('text-[10px] font-medium text-gray-600 uppercase tracking-wider', collapsed && 'text-center')}>
              {collapsed ? '•••' : 'Admin'}
            </div>
          </div>

          {adminNav.map((item) => (
            <NavItem
              key={item.name}
              item={item}
              collapsed={collapsed}
              active={pathname === item.href}
            />
          ))}
        </nav>

        {/* User section */}
        <div className="p-3 border-t border-gray-850">
          <div className={cn('flex items-center gap-3', collapsed && 'justify-center')}>
            <div className="w-9 h-9 rounded-full bg-gray-800 flex items-center justify-center text-sm font-medium text-gray-400">
              TD
            </div>
            {!collapsed && (
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-white truncate">Tushar Dhokane</p>
                <p className="text-xs text-gray-500 truncate">Admin</p>
              </div>
            )}
            {!collapsed && (
              <button className="p-1.5 rounded-lg hover:bg-gray-800 text-gray-500">
                <LogOut className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Collapse toggle */}
        <button
          onClick={onToggle}
          className="hidden lg:flex absolute -right-3 top-20 w-6 h-6 rounded-full bg-gray-800 border border-gray-700 items-center justify-center text-gray-500 hover:text-white hover:bg-gray-700 transition-colors"
        >
          {collapsed ? <ChevronRight className="w-3 h-3" /> : <ChevronLeft className="w-3 h-3" />}
        </button>
      </motion.aside>
    </>
  )
}

function NavItem({
  item,
  collapsed,
  active
}: {
  item: { name: string; href: string; icon: React.ElementType; badge?: number }
  collapsed: boolean
  active: boolean
}) {
  const Icon = item.icon

  return (
    <Link href={item.href}>
      <motion.div
        whileHover={{ x: 2 }}
        className={cn(
          'flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors',
          active
            ? 'bg-orange/10 text-orange'
            : 'text-gray-400 hover:bg-gray-850 hover:text-white',
          collapsed && 'justify-center'
        )}
      >
        <Icon className={cn('w-5 h-5 flex-shrink-0', active && 'text-orange')} />
        {!collapsed && (
          <>
            <span className="text-sm font-medium flex-1">{item.name}</span>
            {item.badge && (
              <span className="w-5 h-5 rounded-full bg-orange text-white text-xs flex items-center justify-center">
                {item.badge}
              </span>
            )}
          </>
        )}
      </motion.div>
    </Link>
  )
}

// Mobile header component
export function MobileHeader({ onMenuToggle }: { onMenuToggle: () => void }) {
  return (
    <header className="lg:hidden fixed top-0 left-0 right-0 h-14 bg-gray-950 border-b border-gray-850 z-30 flex items-center justify-between px-4">
      <button onClick={onMenuToggle} className="p-2 -ml-2">
        <Menu className="w-5 h-5 text-gray-400" />
      </button>
      <div className="flex items-center gap-2">
        <div className="w-7 h-7 rounded bg-gradient-to-br from-orange to-orange-600 flex items-center justify-center">
          <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="8" />
            <circle cx="12" cy="12" r="3" />
          </svg>
        </div>
        <span className="font-serif text-sm text-white">
          LAND<span className="text-orange">GRID</span>
        </span>
      </div>
      <button className="p-2 -mr-2 relative">
        <Bell className="w-5 h-5 text-gray-400" />
        <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-orange" />
      </button>
    </header>
  )
}

export default Sidebar
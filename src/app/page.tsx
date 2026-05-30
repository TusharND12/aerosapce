'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import {
  Shield,
  MapPin,
  FileCheck,
  TrendingUp,
  Lock,
  Zap,
  ChevronRight,
  ArrowRight,
  Check,
  Play,
  Building2,
  Users,
  Globe,
  BarChart3
} from 'lucide-react'

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0, 0, 0.2, 1] }
  }
}

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.1 }
  }
}

const scaleIn = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.6, ease: [0, 0, 0.2, 1] }
  }
}

// Counter animation component
function AnimatedCounter({ value, suffix = '' }: { value: number, suffix?: string }) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const [hasAnimated, setHasAnimated] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true)
          let start = 0
          const end = value
          const duration = 2000
          const increment = end / (duration / 16)

          const timer = setInterval(() => {
            start += increment
            if (start >= end) {
              setCount(end)
              clearInterval(timer)
            } else {
              setCount(Math.floor(start))
            }
          }, 16)
        }
      },
      { threshold: 0.5 }
    )

    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [value, hasAnimated])

  return <span ref={ref}>{count.toLocaleString()}{suffix}</span>
}

// Navigation component
function Navigation() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0, 0, 0.2, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-black/90 backdrop-blur-xl border-b border-gray-850' : ''
      }`}
    >
      <div className="container">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-orange to-orange-600 flex items-center justify-center">
              <Globe className="w-5 h-5 text-white" />
            </div>
            <div>
              <span className="font-serif text-xl text-white">LAND</span>
              <span className="font-serif text-xl text-orange ml-1">GRID</span>
            </div>
          </div>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-8">
            <NavLink href="#discover">Discover</NavLink>
            <NavLink href="#features">Platform</NavLink>
            <NavLink href="#solutions">Solutions</NavLink>
            <NavLink href="#about">About</NavLink>
          </div>

          {/* CTA */}
          <div className="hidden lg:flex items-center gap-4">
            <Link href="/dashboard" className="btn btn-ghost text-sm">Sign In</Link>
            <Link href="/dashboard" className="btn btn-primary text-sm">
              Request Demo
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <div className="w-6 h-5 flex flex-col justify-between">
              <span className={`h-0.5 bg-white transition-all ${mobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`} />
              <span className={`h-0.5 bg-white transition-all ${mobileMenuOpen ? 'opacity-0' : ''}`} />
              <span className={`h-0.5 bg-white transition-all ${mobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
            </div>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-gray-950 border-t border-gray-850"
          >
            <div className="container py-6 space-y-4">
              <MobileNavLink href="#discover">Discover</MobileNavLink>
              <MobileNavLink href="#features">Platform</MobileNavLink>
              <MobileNavLink href="#solutions">Solutions</MobileNavLink>
              <MobileNavLink href="#about">About</MobileNavLink>
              <div className="pt-4 flex flex-col gap-3">
                <Link href="/dashboard" className="btn btn-outline w-full text-center">Sign In</Link>
                <Link href="/dashboard" className="btn btn-primary w-full text-center">Request Demo</Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}

function NavLink({ href, children }: { href: string, children: React.ReactNode }) {
  return (
    <a
      href={href}
      className="text-sm text-gray-400 hover:text-white transition-colors"
    >
      {children}
    </a>
  )
}

function MobileNavLink({ href, children }: { href: string, children: React.ReactNode }) {
  return (
    <a
      href={href}
      className="block py-2 text-lg text-gray-300 hover:text-white transition-colors"
    >
      {children}
    </a>
  )
}

// Hero Section
function HeroSection() {
  const { scrollY } = useScroll()
  const y = useTransform(scrollY, [0, 500], [0, 150])
  const opacity = useTransform(scrollY, [0, 400], [1, 0])

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-grid" />
      <div className="absolute inset-0 gradient-radial" />

      {/* Floating Elements */}
      <motion.div
        style={{ y }}
        className="absolute top-1/4 left-1/4 w-96 h-96 bg-orange/5 rounded-full blur-3xl"
      />
      <motion.div
        style={{ y: useTransform(scrollY, [0, 500], [0, -100]) }}
        className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-orange/10 rounded-full blur-3xl"
      />

      {/* Content */}
      <motion.div
        style={{ opacity }}
        className="relative z-10 container text-center"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gray-950 border border-gray-800 mb-8"
        >
          <span className="w-2 h-2 rounded-full bg-success animate-pulse" />
          <span className="text-sm text-gray-400">Now verifying land across 5 Indian states</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="font-serif text-5xl md:text-6xl lg:text-7xl xl:text-8xl text-white leading-[1.1] mb-6 max-w-5xl mx-auto text-balance"
        >
          Land Intelligence.{' '}
          <span className="text-gradient-orange">Acquisition.</span>{' '}
          Trust.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-10"
        >
          India's first Land Intelligence & Transaction Operating System.
          Verify, analyze, and acquire land with institutional-grade intelligence.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link href="/discover" className="btn btn-primary btn-lg group">
            Start Discovering
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link href="/map" className="btn btn-outline btn-lg">
            <Play className="w-5 h-5" />
            Explore Interactive Map
          </Link>
        </motion.div>

        {/* Trust Badges */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-16 flex flex-wrap items-center justify-center gap-8 md:gap-12"
        >
          <TrustBadge icon={<Shield className="w-5 h-5" />} text="Bank-grade Security" />
          <TrustBadge icon={<FileCheck className="w-5 h-5" />} text="Verified Records" />
          <TrustBadge icon={<Lock className="w-5 h-5" />} text="Encrypted Data" />
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-6 h-10 rounded-full border-2 border-gray-700 flex items-start justify-center p-2"
        >
          <motion.div className="w-1.5 h-1.5 rounded-full bg-gray-500" />
        </motion.div>
      </motion.div>
    </section>
  )
}

function TrustBadge({ icon, text }: { icon: React.ReactNode, text: string }) {
  return (
    <div className="flex items-center gap-2 text-gray-500">
      <span className="text-orange">{icon}</span>
      <span className="text-sm">{text}</span>
    </div>
  )
}

// Stats Section
function StatsSection() {
  return (
    <section className="py-20 border-y border-gray-850 bg-gray-950/50">
      <div className="container">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12"
        >
          <StatCard
            value={2500}
            suffix="+"
            label="Parcels Verified"
            icon={<MapPin className="w-5 h-5" />}
          />
          <StatCard
            value={2000}
            suffix="Cr+"
            prefix="₹"
            label="Transaction Volume"
            icon={<TrendingUp className="w-5 h-5" />}
          />
          <StatCard
            value={99.9}
            suffix="%"
            label="Verification Accuracy"
            icon={<FileCheck className="w-5 h-5" />}
            decimal
          />
          <StatCard
            value={150}
            suffix="+"
            label="Institutional Clients"
            icon={<Building2 className="w-5 h-5" />}
          />
        </motion.div>
      </div>
    </section>
  )
}

function StatCard({
  value,
  suffix = '',
  prefix = '',
  label,
  icon,
  decimal = false
}: {
  value: number
  suffix?: string
  prefix?: string
  label: string
  icon: React.ReactNode
  decimal?: boolean
}) {
  return (
    <motion.div variants={fadeInUp} className="text-center">
      <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gray-900 border border-gray-800 text-orange mb-4">
        {icon}
      </div>
      <div className="font-serif text-4xl md:text-5xl text-white mb-2">
        {prefix}<AnimatedCounter value={decimal ? Math.floor(value) : value} suffix={suffix} />
        {decimal && <span className="text-lg">.{String(value).split('.')[1] || '9'}%</span>}
      </div>
      <p className="text-sm text-gray-500">{label}</p>
    </motion.div>
  )
}

// Features Section
function FeaturesSection() {
  const features = [
    {
      icon: Shield,
      title: 'Land Health Score™',
      description: 'Comprehensive verification score evaluating ownership clarity, encumbrances, record completeness, and mutation history.',
      badge: 'Proprietary'
    },
    {
      icon: TrendingUp,
      title: 'Acquisition Readiness Index™',
      description: 'Evaluate legal risk, development potential, infrastructure growth, connectivity, and market demand at a glance.',
      badge: 'Proprietary'
    },
    {
      icon: Zap,
      title: 'Real-time Verification',
      description: 'Automated verification engine integrating with government records across multiple states and jurisdictions.',
      badge: 'AI-Powered'
    },
    {
      icon: Lock,
      title: 'Secure Data Room',
      description: 'M&A-style document management with bank-grade encryption and granular access controls.',
      badge: 'Enterprise'
    },
    {
      icon: BarChart3,
      title: 'Ownership Intelligence Graph™',
      description: 'Interactive visualization of ownership relationships across time with full chain of title.',
      badge: 'Interactive'
    },
    {
      icon: FileCheck,
      title: 'Parcel Timeline™',
      description: 'GitHub-style commit history showing all parcel activity from purchase to verification.',
      badge: 'Visual'
    }
  ]

  return (
    <section id="features" className="py-32">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="badge badge-orange mb-4">Platform Features</span>
          <h2 className="font-serif text-4xl md:text-5xl text-white mb-4">
            Institutional-Grade Intelligence
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Purpose-built for serious land acquisition with features designed
            for institutional investors and enterprise clients.
          </p>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {features.map((feature, index) => (
            <FeatureCard key={index} {...feature} index={index} />
          ))}
        </motion.div>
      </div>
    </section>
  )
}

function FeatureCard({
  icon: Icon,
  title,
  description,
  badge,
  index
}: {
  icon: React.ElementType
  title: string
  description: string
  badge: string
  index: number
}) {
  const [hovered, setHovered] = useState(false)

  return (
    <motion.div
      variants={fadeInUp}
      custom={index}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="group relative p-8 rounded-2xl bg-gray-950 border border-gray-850 transition-all duration-300"
    >
      {/* Hover glow */}
      <div
        className={`absolute inset-0 rounded-2xl bg-gradient-to-br from-orange/5 to-transparent opacity-0 transition-opacity duration-300 ${
          hovered ? 'opacity-100' : ''
        }`}
      />

      {/* Content */}
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-6">
          <div className="w-12 h-12 rounded-xl bg-gray-900 border border-gray-800 flex items-center justify-center text-orange group-hover:bg-orange group-hover:text-white group-hover:border-orange transition-all duration-300">
            <Icon className="w-6 h-6" />
          </div>
          <span className="text-xs text-orange/80 bg-orange/10 px-2 py-1 rounded-full">
            {badge}
          </span>
        </div>

        <h3 className="font-serif text-xl text-white mb-3 group-hover:text-orange transition-colors">
          {title}
        </h3>
        <p className="text-gray-500 text-sm leading-relaxed">
          {description}
        </p>
      </div>

      {/* Corner accent */}
      <div
        className={`absolute top-0 right-0 w-20 h-20 transition-opacity duration-300 ${
          hovered ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <div className="absolute top-4 right-4 w-px h-8 bg-gradient-to-b from-orange to-transparent" />
        <div className="absolute top-4 right-4 w-8 h-px bg-gradient-to-l from-orange to-transparent" />
      </div>
    </motion.div>
  )
}

// Platform Preview Section
function PlatformPreviewSection() {
  return (
    <section className="py-32 bg-gray-950/50">
      <div className="container">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="badge badge-orange mb-4">Platform Preview</span>
            <h2 className="font-serif text-4xl md:text-5xl text-white mb-6">
              Command Center for Land Intelligence
            </h2>
            <p className="text-gray-400 mb-8">
              Navigate land acquisition with the precision of a Bloomberg terminal
              and the elegance of Linear. Every parcel. Every record. Every transaction.
              Unified.
            </p>

            <div className="space-y-4">
              <PreviewFeature
                title="Intelligent Search"
                description="Search across 50+ parameters with instant results"
              />
              <PreviewFeature
                title="Land Health Score™"
                description="At-a-glance verification confidence for every parcel"
              />
              <PreviewFeature
                title="Ownership Graph"
                description="Visualize complete ownership chains instantly"
              />
              <PreviewFeature
                title="Secure Negotiations"
                description="Structured deal workflows with full audit trail"
              />
            </div>

            <Link href="/dashboard" className="btn btn-primary mt-10">
              Explore Platform
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>

          {/* Preview Image */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            {/* Main Preview */}
            <div className="relative rounded-2xl overflow-hidden border border-gray-800 bg-gray-900">
              {/* Mock Interface */}
              <div className="p-4 border-b border-gray-850 flex items-center gap-3">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-error/80" />
                  <div className="w-3 h-3 rounded-full bg-warning/80" />
                  <div className="w-3 h-3 rounded-full bg-success/80" />
                </div>
                <div className="flex-1 h-8 rounded-lg bg-gray-850 mx-4" />
              </div>

              <div className="aspect-[4/3] bg-gray-950 relative">
                {/* Map Mock */}
                <div className="absolute inset-0 bg-grid opacity-30" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <motion.div
                    animate={{ scale: [1, 1.02, 1] }}
                    transition={{ duration: 4, repeat: Infinity }}
                    className="w-48 h-32 rounded-lg border-2 border-orange bg-orange/10 flex items-center justify-center"
                  >
                    <div className="text-center">
                      <MapPin className="w-8 h-8 text-orange mx-auto mb-2" />
                      <span className="text-xs text-orange font-mono">PA-2024-001</span>
                    </div>
                  </motion.div>
                </div>

                {/* Floating Cards */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 }}
                  className="absolute top-4 right-4 w-48 p-4 rounded-xl bg-gray-900/95 backdrop-blur border border-gray-800"
                >
                  <div className="flex items-center gap-2 mb-3">
                    <Shield className="w-4 h-4 text-success" />
                    <span className="text-xs font-medium text-success">Land Health Score™</span>
                  </div>
                  <div className="text-3xl font-serif text-white mb-1">92</div>
                  <div className="text-xs text-gray-500">Verified Acquisition Ready</div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.7 }}
                  className="absolute bottom-4 left-4 w-48 p-4 rounded-xl bg-gray-900/95 backdrop-blur border border-gray-800"
                >
                  <div className="text-xs text-gray-500 mb-1">Location</div>
                  <div className="text-sm text-white font-medium">Karnataka, Bangalore</div>
                  <div className="text-xs text-gray-500 mt-2">Survey No: 45/1, 45/2</div>
                </motion.div>
              </div>
            </div>

            {/* Glow Effect */}
            <div className="absolute -inset-1 bg-gradient-to-r from-orange/20 via-orange/10 to-orange/20 rounded-3xl blur-xl -z-10" />
          </motion.div>
        </div>
      </div>
    </section>
  )
}

function PreviewFeature({ title, description }: { title: string, description: string }) {
  return (
    <div className="flex items-start gap-4">
      <div className="w-6 h-6 rounded-full bg-orange/20 flex items-center justify-center flex-shrink-0 mt-0.5">
        <Check className="w-3.5 h-3.5 text-orange" />
      </div>
      <div>
        <h4 className="text-white font-medium mb-0.5">{title}</h4>
        <p className="text-sm text-gray-500">{description}</p>
      </div>
    </div>
  )
}

// User Roles Section
function UserRolesSection() {
  const roles = [
    {
      icon: Building2,
      title: 'Institutional Investors',
      description: 'PE funds, REITs, and sovereign wealth funds deploying capital at scale.',
      stats: '₹50L - ₹50Cr+ per deal'
    },
    {
      icon: Users,
      title: 'Developers',
      description: 'Top developers analyzing land for residential, commercial, and mixed-use projects.',
      stats: '₹10L - ₹5Cr per deal'
    },
    {
      icon: TrendingUp,
      title: 'HNIs & Family Offices',
      description: 'UHNIs and family offices building land portfolios for long-term wealth.',
      stats: '₹5L - ₹2Cr per deal'
    },
    {
      icon: Shield,
      title: 'Banks & NBFCs',
      description: 'Lenders requiring verified land intelligence for lending decisions.',
      stats: '₹2L - ₹20L per verification'
    }
  ]

  return (
    <section id="solutions" className="py-32">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="badge badge-orange mb-4">Solutions</span>
          <h2 className="font-serif text-4xl md:text-5xl text-white mb-4">
            Built for Every Stakeholder
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Purpose-designed interfaces and workflows for each participant
            in the land transaction ecosystem.
          </p>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {roles.map((role, index) => (
            <motion.div
              key={index}
              variants={fadeInUp}
              className="p-6 rounded-2xl bg-gray-950 border border-gray-850 hover:border-gray-750 transition-colors"
            >
              <div className="w-12 h-12 rounded-xl bg-gray-900 border border-gray-800 flex items-center justify-center text-orange mb-4">
                <role.icon className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-medium text-white mb-2">{role.title}</h3>
              <p className="text-sm text-gray-500 mb-4">{role.description}</p>
              <div className="text-xs font-mono text-orange bg-orange/10 px-2 py-1 rounded inline-block">
                {role.stats}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

// CTA Section
function CTASection() {
  return (
    <section className="py-32 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-orange/10 via-black to-black" />
      <div className="absolute inset-0 bg-grid opacity-20" />

      {/* Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-orange/20 rounded-full blur-[150px]" />

      <div className="container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl mx-auto text-center"
        >
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-white mb-6">
            Ready to Transform Your Land Intelligence?
          </h2>
          <p className="text-xl text-gray-400 mb-10">
            Join 150+ institutional investors and enterprise clients who trust
            LANDGRID for their land acquisition needs.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/dashboard" className="btn btn-primary btn-lg">
              Enter Platform
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link href="/dashboard" className="btn btn-outline btn-lg">
              Contact Sales
            </Link>
          </div>

          <p className="text-sm text-gray-600 mt-8">
            No credit card required. Setup takes less than 5 minutes.
          </p>
        </motion.div>
      </div>
    </section>
  )
}

// Footer
function Footer() {
  return (
    <footer className="py-16 border-t border-gray-850">
      <div className="container">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-orange to-orange-600 flex items-center justify-center">
                <Globe className="w-5 h-5 text-white" />
              </div>
              <div>
                <span className="font-serif text-xl text-white">LAND</span>
                <span className="font-serif text-xl text-orange ml-1">GRID</span>
              </div>
            </div>
            <p className="text-gray-500 text-sm max-w-sm mb-6">
              India's first Land Intelligence & Transaction Operating System.
              Built for institutional investors and enterprise clients.
            </p>
            <div className="flex items-center gap-4">
              <SocialLink href="#" icon="in" />
              <SocialLink href="#" icon="tw" />
              <SocialLink href="#" icon="li" />
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-white font-medium mb-4">Platform</h4>
            <ul className="space-y-2">
              <FooterLink href="#">Discover</FooterLink>
              <FooterLink href="#">Intelligence</FooterLink>
              <FooterLink href="#">Negotiations</FooterLink>
              <FooterLink href="#">Data Room</FooterLink>
              <FooterLink href="#">Analytics</FooterLink>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-medium mb-4">Company</h4>
            <ul className="space-y-2">
              <FooterLink href="#">About</FooterLink>
              <FooterLink href="#">Careers</FooterLink>
              <FooterLink href="#">Press</FooterLink>
              <FooterLink href="#">Contact</FooterLink>
              <FooterLink href="#">Legal</FooterLink>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-gray-850 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-600">
            © 2026 LANDGRID. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <span className="text-xs text-gray-600">India</span>
            <span className="text-xs text-gray-600">English</span>
          </div>
        </div>
      </div>
    </footer>
  )
}

function FooterLink({ href, children }: { href: string, children: React.ReactNode }) {
  return (
    <li>
      <a href={href} className="text-sm text-gray-500 hover:text-white transition-colors">
        {children}
      </a>
    </li>
  )
}

function SocialLink({ href, icon }: { href: string, icon: string }) {
  return (
    <a
      href={href}
      className="w-9 h-9 rounded-lg bg-gray-900 border border-gray-800 flex items-center justify-center text-gray-500 hover:text-white hover:border-gray-700 transition-all"
    >
      <span className="text-xs font-bold">{icon.toUpperCase()}</span>
    </a>
  )
}

// Main Component
export default function HomePage() {
  return (
    <main className="min-h-screen bg-black">
      <Navigation />
      <HeroSection />
      <StatsSection />
      <FeaturesSection />
      <PlatformPreviewSection />
      <UserRolesSection />
      <CTASection />
      <Footer />
    </main>
  )
}
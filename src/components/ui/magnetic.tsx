'use client'

import { useRef, useState, useEffect } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import { cn } from '@/lib/utils'

interface MagneticProps {
  children: React.ReactNode
  range?: number
  strength?: number
  className?: string
}

export function Magnetic({ children, range = 60, strength = 0.35, className }: MagneticProps) {
  const ref = useRef<HTMLDivElement>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const springConfig = { damping: 15, stiffness: 150, mass: 0.1 }
  const springX = useSpring(x, springConfig)
  const springY = useSpring(y, springConfig)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!ref.current) return
      const { clientX, clientY } = e
      const rect = ref.current.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2

      const distanceX = clientX - centerX
      const distanceY = clientY - centerY
      const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY)

      if (distance < range) {
        // Linear interpolation of pull strength based on distance
        const ratio = (range - distance) / range
        x.set(distanceX * strength * ratio)
        y.set(distanceY * strength * ratio)
      } else {
        x.set(0)
        y.set(0)
      }
    }

    const handleMouseLeave = () => {
      x.set(0)
      y.set(0)
    }

    window.addEventListener('mousemove', handleMouseMove)
    const currentRef = ref.current
    if (currentRef) {
      currentRef.addEventListener('mouseleave', handleMouseLeave)
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      if (currentRef) {
        currentRef.removeEventListener('mouseleave', handleMouseLeave)
      }
    }
  }, [range, strength])

  return (
    <motion.div
      ref={ref}
      style={{ x: springX, y: springY }}
      className={cn("inline-block", className)}
    >
      {children}
    </motion.div>
  )
}


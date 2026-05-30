'use client'

import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import {
  Map as MapIcon,
  Layers,
  ZoomIn,
  ZoomOut,
  Locate,
  Search,
  MapPin,
  X
} from 'lucide-react'
import { cn, formatCurrency } from '@/lib/utils'
import { LandHealthScoreMini } from '@/components/ui/land-health-score'
import { Badge } from '@/components/ui/badge'
import { Sidebar, MobileHeader } from '@/components/layout/sidebar'
import { Magnetic } from '@/components/ui/magnetic'

// Clustered Bangalore parcel coordinates
const mapParcels = [
  { id: '1', lat: 12.8569, lng: 77.7580, healthScore: 92, price: 12500000, location: 'Sarjapur, Bangalore', status: 'ACTIVE' },
  { id: '2', lat: 12.8456, lng: 77.6603, healthScore: 78, price: 28000000, location: 'Electronic City', status: 'UNDER_NEGOTIATION' },
  { id: '3', lat: 12.8234, lng: 77.6712, healthScore: 88, price: 19500000, location: 'Bommasandra', status: 'ACTIVE' },
  { id: '4', lat: 13.2429, lng: 77.7136, healthScore: 95, price: 45000000, location: 'Devanahalli', status: 'ACTIVE' },
  { id: '5', lat: 12.9307, lng: 77.5838, healthScore: 85, price: 18000000, location: 'Jayanagar, Bangalore', status: 'ACTIVE' },
  { id: '6', lat: 12.9719, lng: 77.6412, healthScore: 91, price: 32000000, location: 'Indiranagar, Bangalore', status: 'ACTIVE' },
  { id: '7', lat: 12.9352, lng: 77.6244, healthScore: 76, price: 9500000, location: 'Koramangala, Bangalore', status: 'PENDING' },
  { id: '8', lat: 12.9698, lng: 77.7500, healthScore: 89, price: 22000000, location: 'Whitefield', status: 'ACTIVE' }
]

const darkMapStyles = [
  { elementType: "geometry", stylers: [{ color: "#000000" }] },
  { elementType: "labels.text.stroke", stylers: [{ color: "#000000" }] },
  { elementType: "labels.text.fill", stylers: [{ color: "#737373" }] },
  {
    featureType: "administrative.locality",
    elementType: "labels.text.fill",
    stylers: [{ color: "#ff6a00" }]
  },
  {
    featureType: "poi",
    elementType: "labels.text.fill",
    stylers: [{ color: "#737373" }]
  },
  {
    featureType: "poi.park",
    elementType: "geometry",
    stylers: [{ color: "#111111" }]
  },
  {
    featureType: "road",
    elementType: "geometry",
    stylers: [{ color: "#1a1a1a" }]
  },
  {
    featureType: "road",
    elementType: "geometry.stroke",
    stylers: [{ color: "#262626" }]
  },
  {
    featureType: "road",
    elementType: "labels.text.fill",
    stylers: [{ color: "#737373" }]
  },
  {
    featureType: "road.highway",
    elementType: "geometry",
    stylers: [{ color: "#262626" }]
  },
  {
    featureType: "road.highway",
    elementType: "geometry.stroke",
    stylers: [{ color: "#404040" }]
  },
  {
    featureType: "water",
    elementType: "geometry",
    stylers: [{ color: "#0d0d0d" }]
  },
  {
    featureType: "water",
    elementType: "labels.text.fill",
    stylers: [{ color: "#404040" }]
  }
]

declare var google: any

export default function MapPage() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [selectedParcel, setSelectedParcel] = useState<string | null>(null)
  const [showLayers, setShowLayers] = useState(false)
  const [isSatellite, setIsSatellite] = useState(false)
  const [mapLoaded, setMapLoaded] = useState(false)
  const [sdkLoadingError, setSdkLoadingError] = useState(false)

  const mapContainerRef = useRef<HTMLDivElement>(null)
  const googleMapRef = useRef<any>(null)
  const overlaysRef = useRef<any[]>([])

  const selected = mapParcels.find(p => p.id === selectedParcel)

  // 1. Google Maps SDK Loader
  useEffect(() => {
    if (typeof window === 'undefined') return

    const handleSdkLoad = () => {
      if (!mapContainerRef.current || googleMapRef.current) return

      try {
        const map = new google.maps.Map(mapContainerRef.current, {
          center: { lat: 12.93, lng: 77.68 }, // Center of Bangalore cluster
          zoom: 11,
          styles: darkMapStyles,
          disableDefaultUI: true,
          zoomControl: false,
          mapTypeControl: false,
          scaleControl: false,
          streetViewControl: false,
          rotateControl: false,
          fullscreenControl: false
        })

        googleMapRef.current = map
        setMapLoaded(true)
      } catch (err) {
        console.error('Error instantiating Google Maps:', err)
        setSdkLoadingError(true)
      }
    }

    if ((window as any).google && (window as any).google.maps) {
      handleSdkLoad()
      return
    }

    const scriptId = 'google-maps-sdk'
    let script = document.getElementById(scriptId) as HTMLScriptElement

    if (!script) {
      script = document.createElement('script')
      script.id = scriptId
      script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ''}&libraries=geometry`
      script.async = true
      script.defer = true
      script.onerror = () => setSdkLoadingError(true)
      document.head.appendChild(script)
    }

    const checkInterval = setInterval(() => {
      if ((window as any).google && (window as any).google.maps) {
        clearInterval(checkInterval)
        handleSdkLoad()
      }
    }, 100)

    return () => clearInterval(checkInterval)
  }, [])

  // 2. Render custom overlay markers when SDK loads
  useEffect(() => {
    if (!mapLoaded || !googleMapRef.current || typeof window === 'undefined') return

    // Clear previous overlays
    overlaysRef.current.forEach(overlay => overlay.setMap(null))
    overlaysRef.current = []

    const google = (window as any).google

    // Custom Overlay Class
    class CustomMarkerOverlay extends google.maps.OverlayView {
      private latlng: any
      private html: string
      private onClick: () => void
      private div: HTMLDivElement | null = null

      constructor(latlng: any, html: string, onClick: () => void) {
        super()
        this.latlng = latlng
        this.html = html
        this.onClick = onClick
      }

      onAdd() {
        const div = document.createElement('div')
        div.style.position = 'absolute'
        div.style.cursor = 'pointer'
        div.style.zIndex = '10'
        div.innerHTML = this.html
        div.onclick = (e) => {
          e.stopPropagation()
          this.onClick()
        }
        this.div = div
        const panes = this.getPanes()
        if (panes) {
          panes.overlayMouseTarget.appendChild(div)
        }
      }

      draw() {
        const projection = this.getProjection()
        if (!projection || !this.div) return
        const position = projection.fromLatLngToDivPixel(this.latlng)
        if (position) {
          this.div.style.left = `${position.x - 24}px`
          this.div.style.top = `${position.y - 24}px`
        }
      }

      onRemove() {
        if (this.div && this.div.parentNode) {
          this.div.parentNode.removeChild(this.div)
          this.div = null
        }
      }
    }

    // Add markers for each parcel
    mapParcels.forEach((parcel) => {
      const isSelected = selectedParcel === parcel.id
      const rippleColor =
        parcel.status === 'ACTIVE'
          ? 'var(--color-success)'
          : parcel.status === 'UNDER_NEGOTIATION'
          ? 'var(--color-warning)'
          : 'var(--color-gray-500)'

      const markerHtml = `
        <div class="w-12 h-12 rounded-full flex flex-col items-center justify-center border shadow-glow bg-black/90 backdrop-blur-sm transition-all duration-300 ${
          isSelected
            ? 'border-orange ring-4 ring-orange/30 scale-110 pulse-ripple'
            : parcel.status === 'ACTIVE'
            ? 'border-success/45 hover:border-success hover:scale-105 pulse-ripple'
            : parcel.status === 'UNDER_NEGOTIATION'
            ? 'border-warning/45 hover:border-warning hover:scale-105 pulse-ripple'
            : 'border-gray-800 hover:border-gray-650 hover:scale-105'
        }" style="--ripple-color: ${rippleColor}; width: 48px; height: 48px; display: flex; align-items: center; justify-content: center; border-radius: 50%; position: relative;">
          <div style="display: flex; flex-direction: column; align-items: center; justify-content: center;">
            <span style="font-size: 8px; color: #737373; font-family: monospace; font-weight: bold; line-height: 1; margin-bottom: 2px;">HS</span>
            <span style="font-size: 12px; font-family: monospace; font-weight: bold; line-height: 1; color: ${
              isSelected ? '#ff6a00' :
              parcel.status === 'ACTIVE' ? '#22c55e' :
              parcel.status === 'UNDER_NEGOTIATION' ? '#eab308' : '#a3a3a3'
            }">${parcel.healthScore}</span>
          </div>
        </div>
      `

      const overlay = new CustomMarkerOverlay(
        new google.maps.LatLng(parcel.lat, parcel.lng),
        markerHtml,
        () => setSelectedParcel(parcel.id)
      )

      overlay.setMap(googleMapRef.current)
      overlaysRef.current.push(overlay)
    })
  }, [mapLoaded, selectedParcel])

  // 3. Pan to selected parcel
  useEffect(() => {
    if (!googleMapRef.current || !selected) return
    googleMapRef.current.panTo({ lat: selected.lat, lng: selected.lng })
    googleMapRef.current.setZoom(13)
  }, [selectedParcel])

  // 4. Toggle satellite/roadmap view
  useEffect(() => {
    if (!googleMapRef.current || typeof window === 'undefined') return
    const google = (window as any).google
    googleMapRef.current.setMapTypeId(
      isSatellite ? google.maps.MapTypeId.SATELLITE : google.maps.MapTypeId.ROADMAP
    )
  }, [isSatellite])

  // Map Controls functions
  const handleZoomIn = () => {
    if (!googleMapRef.current) return
    googleMapRef.current.setZoom(googleMapRef.current.getZoom()! + 1)
  }

  const handleZoomOut = () => {
    if (!googleMapRef.current) return
    googleMapRef.current.setZoom(googleMapRef.current.getZoom()! - 1)
  }

  const handleLocate = () => {
    if (!googleMapRef.current) return
    googleMapRef.current.panTo({ lat: 12.93, lng: 77.68 })
    googleMapRef.current.setZoom(11)
  }

  return (
    <div className="min-h-screen bg-black">
      <Sidebar collapsed={sidebarCollapsed} onToggle={() => setSidebarCollapsed(!sidebarCollapsed)} />
      <MobileHeader onMenuToggle={() => setSidebarCollapsed(!sidebarCollapsed)} />

      <main className={cn(
        'min-h-screen transition-all duration-300 pt-14 lg:pt-0',
        sidebarCollapsed ? 'lg:pl-[72px]' : 'lg:pl-[260px]'
      )}>
        <div className="h-[calc(100vh-56px)] lg:h-screen flex flex-col relative overflow-hidden bg-aurora">
          {/* Map Header */}
          <div className="px-6 py-4 border-b border-gray-850 bg-black/60 backdrop-blur-xl flex items-center justify-between z-10">
            <div className="flex items-center gap-4">
              <h1 className="text-xl font-serif text-white flex items-center gap-2">
                <MapIcon className="w-5 h-5 text-orange" />
                Land Intelligence Map
              </h1>
              <span className="text-xs font-mono text-orange/80 bg-orange/10 px-2 py-0.5 rounded-full">{mapParcels.length} parcels</span>
            </div>

            <div className="flex items-center gap-3">
              {/* Layers Toggle */}
              <Magnetic range={40}>
                <button
                  onClick={() => setShowLayers(!showLayers)}
                  className={cn(
                    'w-9 h-9 rounded-lg flex items-center justify-center transition-colors border',
                    showLayers ? 'bg-orange border-orange text-white' : 'bg-gray-950/85 text-gray-400 hover:text-white border-gray-850'
                  )}
                >
                  <Layers className="w-4 h-4" />
                </button>
              </Magnetic>
            </div>
          </div>

          {/* Map Container */}
          <div className="flex-1 relative overflow-hidden">
            {/* Live Google Map Container */}
            <div ref={mapContainerRef} className="absolute inset-0 w-full h-full bg-black" />

            {/* Loading/Error Screens */}
            {!mapLoaded && !sdkLoadingError && (
              <div className="absolute inset-0 z-30 flex items-center justify-center bg-black/80 backdrop-blur-md">
                <div className="text-center">
                  <div className="w-10 h-10 border-4 border-orange border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                  <p className="text-sm font-mono text-gray-500">Loading Google Maps API...</p>
                </div>
              </div>
            )}

            {sdkLoadingError && (
              <div className="absolute inset-0 z-30 flex items-center justify-center bg-black/80 backdrop-blur-md">
                <div className="text-center p-6 glass max-w-sm rounded-2xl border border-error/20">
                  <p className="text-sm font-mono text-error font-medium mb-2">Google Maps SDK Error</p>
                  <p className="text-xs text-gray-500">Could not initialize Google Maps. Please verify your internet connection or Google API key.</p>
                </div>
              </div>
            )}

            {/* Map Controls wrapped in Magnetic */}
            <div className="absolute top-4 right-4 flex flex-col gap-2 z-10">
              <Magnetic range={40}>
                <button
                  onClick={handleZoomIn}
                  className="w-10 h-10 rounded-lg bg-black/80 backdrop-blur border border-gray-850 flex items-center justify-center text-gray-400 hover:text-white hover:border-gray-700 transition-colors"
                >
                  <ZoomIn className="w-5 h-5" />
                </button>
              </Magnetic>
              <Magnetic range={40}>
                <button
                  onClick={handleZoomOut}
                  className="w-10 h-10 rounded-lg bg-black/80 backdrop-blur border border-gray-850 flex items-center justify-center text-gray-400 hover:text-white hover:border-gray-700 transition-colors"
                >
                  <ZoomOut className="w-5 h-5" />
                </button>
              </Magnetic>
              <Magnetic range={40}>
                <button
                  onClick={handleLocate}
                  className="w-10 h-10 rounded-lg bg-black/80 backdrop-blur border border-gray-850 flex items-center justify-center text-gray-400 hover:text-white hover:border-gray-700 transition-colors"
                >
                  <Locate className="w-5 h-5" />
                </button>
              </Magnetic>
            </div>

            {/* Premium Glassmorphic Selected Parcel Card */}
            {selected && (
              <div className="absolute bottom-4 left-0 right-0 z-20 flex justify-center px-4 pointer-events-none md:bottom-6 md:left-6 md:right-auto md:px-0">
                <motion.div
                  initial={{ opacity: 0, y: 25 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="w-full max-w-sm md:w-80 p-3.5 md:p-5 rounded-2xl glass border-glow-hover shadow-glow pointer-events-auto"
                >
                  <button
                    onClick={() => setSelectedParcel(null)}
                    className="absolute top-2.5 right-2.5 md:top-4 md:right-4 p-1.5 rounded-lg hover:bg-gray-900 text-gray-550 transition-colors"
                  >
                    <X className="w-3.5 h-3.5 md:w-4 md:h-4 text-gray-500" />
                  </button>

                  <div className="flex items-center gap-2.5 mb-3 md:gap-3 md:mb-4">
                    <div className="w-9 h-9 md:w-12 md:h-12 rounded-lg md:rounded-xl bg-orange/10 border border-orange/20 flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-4 h-4 md:w-6 md:h-6 text-orange animate-pulse" />
                    </div>
                    <div className="min-w-0">
                      <h3 className="text-white font-medium text-xs md:text-sm leading-tight truncate">{selected.location}</h3>
                      <div className="mt-0.5 scale-90 md:scale-100 origin-left">
                        <LandHealthScoreMini score={selected.healthScore} />
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between mb-4 md:mb-5">
                    <div>
                      <p className="text-[9px] md:text-[10px] text-gray-550 font-mono uppercase tracking-wider">Asking Price</p>
                      <p className="text-base md:text-lg font-serif text-white font-semibold">{formatCurrency(selected.price)}</p>
                    </div>
                    <div className="scale-90 md:scale-100 origin-right">
                      <Badge
                        variant={
                          selected.status === 'ACTIVE' ? 'success' :
                          selected.status === 'UNDER_NEGOTIATION' ? 'warning' : 'default'
                        }
                      >
                        {selected.status.replace('_', ' ')}
                      </Badge>
                    </div>
                  </div>

                  {/* Responsive Button Wrapper */}
                  <div className="w-full">
                    {/* Laptop/Desktop: wrapped in Magnetic spring physics */}
                    <div className="hidden md:block w-full">
                      <Magnetic range={50} strength={0.3} className="w-full block">
                        <a
                          href={`/parcel/${selected.id}`}
                          className="block w-full py-2.5 rounded-xl bg-gradient-to-r from-orange to-orange-600 text-white text-sm font-medium text-center hover:shadow-glow transition-all duration-300"
                        >
                          View Intelligence Details
                        </a>
                      </Magnetic>
                    </div>

                    {/* Mobile: clean, full-width native link (no magnetic wrapper to prevent layout shift) */}
                    <div className="block md:hidden w-full">
                      <a
                        href={`/parcel/${selected.id}`}
                        className="block w-full py-2 rounded-xl bg-gradient-to-r from-orange to-orange-600 text-white text-xs font-medium text-center hover:shadow-glow transition-all duration-300"
                      >
                        View Intelligence Details
                      </a>
                    </div>
                  </div>
                </motion.div>
              </div>
            )}

            {/* Glassmorphic Layers Panel */}
            {showLayers && (
              <motion.div
                initial={{ opacity: 0, x: 25 }}
                animate={{ opacity: 1, x: 0 }}
                className="absolute top-16 right-4 w-64 p-5 rounded-2xl glass z-20"
              >
                <h3 className="text-sm font-serif text-white mb-4">Map Intelligence Layers</h3>
                <div className="space-y-3">
                  <label className="flex items-center gap-3 cursor-pointer select-none group">
                    <input
                      type="checkbox"
                      checked={isSatellite}
                      onChange={(e) => setIsSatellite(e.target.checked)}
                      className="w-4 h-4 rounded border-gray-800 bg-gray-950 text-orange focus:ring-orange/40"
                    />
                    <span className="text-sm text-gray-400 group-hover:text-white transition-colors">Satellite View</span>
                  </label>
                  <label className="flex items-center gap-3 cursor-pointer select-none group">
                    <input
                      type="checkbox"
                      defaultChecked={true}
                      className="w-4 h-4 rounded border-gray-800 bg-gray-950 text-orange focus:ring-orange/40"
                    />
                    <span className="text-sm text-gray-400 group-hover:text-white transition-colors">Parcel Markers</span>
                  </label>
                  <label className="flex items-center gap-3 cursor-pointer select-none group">
                    <input
                      type="checkbox"
                      defaultChecked={true}
                      className="w-4 h-4 rounded border-gray-800 bg-gray-950 text-orange focus:ring-orange/40"
                    />
                    <span className="text-sm text-gray-400 group-hover:text-white transition-colors">Boundaries</span>
                  </label>
                </div>
              </motion.div>
            )}

            {/* Glassmorphic Legend */}
            <div className="absolute bottom-6 right-4 p-5 rounded-2xl glass z-10 hidden sm:block">
              <h3 className="text-[10px] font-mono font-bold text-gray-500 uppercase tracking-wider mb-3">Legend</h3>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <div className="w-3.5 h-3.5 rounded-full bg-success/20 border border-success pulse-ripple" style={{ '--ripple-color': 'var(--color-success)' } as React.CSSProperties} />
                  <span className="text-xs text-gray-450 font-mono">Active (Clear Title)</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3.5 h-3.5 rounded-full bg-warning/20 border border-warning pulse-ripple" style={{ '--ripple-color': 'var(--color-warning)' } as React.CSSProperties} />
                  <span className="text-xs text-gray-450 font-mono">Under Negotiation</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3.5 h-3.5 rounded-full bg-gray-900 border border-gray-700" />
                  <span className="text-xs text-gray-450 font-mono">Pending Records</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
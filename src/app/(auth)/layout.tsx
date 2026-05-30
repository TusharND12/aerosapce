export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-black flex">
      {/* Left side - Branding */}
<div className="hidden lg:flex lg:w-1/2 bg-gray-950 relative overflow-hidden">
        {/* Grid pattern */}
        <div className="absolute inset-0 bg-grid opacity-30" />

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-orange/10 via-transparent to-transparent" />

        {/* Content */}
        <div className="relative z-10 flex flex-col justify-between p-12">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-orange to-orange-600 flex items-center justify-center">
              <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10" />
                <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
                <path d="M2 12h20" />
              </svg>
            </div>
            <div>
              <span className="font-serif text-xl text-white font-medium">LAND</span>
              <span className="font-serif text-xl text-orange">GRID</span>
            </div>
          </div>

          {/* Main content */}
          <div className="space-y-8">
            <h1 className="font-serif text-4xl lg:text-5xl text-white leading-tight">
              India's First Land Intelligence & Transaction Operating System
            </h1>
            <p className="text-lg text-gray-400 max-w-md">
              Verify, analyze, and acquire land with institutional-grade intelligence.
              Built for serious investors and enterprise clients.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 pt-8">
              <div>
                <div className="font-serif text-3xl text-white">2,500+</div>
                <div className="text-sm text-gray-500">Parcels Verified</div>
              </div>
              <div>
                <div className="font-serif text-3xl text-white">₹2000Cr+</div>
                <div className="text-sm text-gray-500">Transaction Volume</div>
              </div>
              <div>
                <div className="font-serif text-3xl text-white">99.9%</div>
                <div className="text-sm text-gray-500">Verification Accuracy</div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="text-sm text-gray-600">
            © 2026 LANDGRID. All rights reserved.
          </div>
        </div>
      </div>

      {/* Right side - Auth form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          {children}
        </div>
      </div>
    </div>
  )
}

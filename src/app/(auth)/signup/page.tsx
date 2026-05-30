'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Eye, EyeOff, ArrowRight, Globe, Mail, Lock, User, Phone, Building2, Shield, Check } from 'lucide-react'
import { Button } from '@/components/ui/button'

const roles = [
  { id: 'investor', label: 'Institutional Investor', description: 'PE funds, REITs, sovereign wealth funds' },
  { id: 'developer', label: 'Developer', description: 'Residential, commercial, mixed-use projects' },
  { id: 'hni', label: 'HNI / Family Office', description: 'High net worth individuals' },
  { id: 'broker', label: 'Broker / Intermediary', description: 'Real estate brokers and agents' },
  { id: 'lender', label: 'Bank / NBFC', description: 'Lenders requiring land verification' },
]

export default function SignUpPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    password: '',
    confirmPassword: '',
    role: '',
 })
  const [acceptTerms, setAcceptTerms] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleNext = () => {
    if (step === 1 && formData.name && formData.email) {
      setStep(2)
    } else if (step === 2 && formData.role) {
      setStep(3)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (formData.password !== formData.confirmPassword) {
      return
    }
    setIsLoading(true)
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      window.location.href = '/discover'
    }, 1500)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-8"
    >
      {/* Mobile logo */}
      <div className="lg:hidden flex items-center gap-3 mb-8">
        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-orange to-orange-600 flex items-center justify-center">
          <Globe className="w-5 h-5 text-white" />
        </div>
        <div>
          <span className="font-serif text-xl text-white font-medium">LAND</span>
          <span className="font-serif text-xl text-orange">GRID</span>
        </div>
      </div>

      {/* Progress indicator */}
      <div className="flex items-center gap-2">
        {[1, 2, 3].map((s) => (
          <div key={s} className="flex items-center gap-2">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors ${
              step >= s ? 'bg-orange text-white' : 'bg-gray-850 text-gray-500'
            }`}>
              {step > s ? <Check className="w-4 h-4" /> : s}
            </div>
            {s < 3 && (
              <div className={`w-12 h-0.5 transition-colors ${step > s ? 'bg-orange' : 'bg-gray-850'}`} />
            )}
          </div>
        ))}
      </div>

      {/* Step headers */}
      <div className="space-y-2">
        <h2 className="font-serif text-3xl text-white">
          {step === 1 && 'Create your account'}
          {step === 2 && 'Select your role'}
          {step === 3 && 'Set up password'}
        </h2>
        <p className="text-gray-400">
          {step === 1 && 'Enter your basic information to get started'}
          {step === 2 && 'Choose how you plan to use LANDGRID'}
          {step === 3 && 'Create a secure password for your account'}
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {step === 1 && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            {/* Name */}
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-medium text-gray-300">
                Full name
              </label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                <input
                  id="name"
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="John Doe"
                  required
                  className="input pl-12"
                />
              </div>
            </div>

            {/* Email */}
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium text-gray-300">
                Work email
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="you@company.com"
                  required
                  className="input pl-12"
                />
              </div>
            </div>

            {/* Phone */}
            <div className="space-y-2">
              <label htmlFor="phone" className="text-sm font-medium text-gray-300">
                Phone number <span className="text-gray-500">(optional)</span>
              </label>
              <div className="relative">
                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="+91 98765 43210"
                  className="input pl-12"
                />
              </div>
            </div>

            {/* Company */}
            <div className="space-y-2">
              <label htmlFor="company" className="text-sm font-medium text-gray-300">
                Company <span className="text-gray-500">(optional)</span>
              </label>
              <div className="relative">
                <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                <input
                  id="company"
                  name="company"
                  type="text"
                  value={formData.company}
                  onChange={handleInputChange}
                  placeholder="Your company name"
                  className="input pl-12"
                />
              </div>
            </div>

            <Button
              type="button"
              className="w-full"
              size="lg"
              onClick={handleNext}
              disabled={!formData.name || !formData.email}
              rightIcon={<ArrowRight className="w-4 h-4" />}
            >
              Continue
            </Button>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-4"
          >
            {roles.map((role) => (
              <button
                key={role.id}
                type="button"
                onClick={() => setFormData({ ...formData, role: role.id })}
                className={`w-full p-4 rounded-lg border-2 text-left transition-all ${
                  formData.role === role.id
                    ? 'border-orange bg-orange/5'
                    : 'border-gray-850 bg-gray-950 hover:border-gray-750'
                }`}
              >
                <div className="flex items-start gap-4">
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-0.5 ${
                    formData.role === role.id
                      ? 'border-orange bg-orange'
                      : 'border-gray-600'
                  }`}>
                    {formData.role === role.id && (
                      <Check className="w-3 h-3 text-white" />
                    )}
                  </div>
                  <div>
                    <div className="font-medium text-white">{role.label}</div>
                    <div className="text-sm text-gray-500">{role.description}</div>
                  </div>
                </div>
              </button>
            ))}

            <div className="flex gap-4 pt-4">
              <Button
                type="button"
                variant="outline"
                className="flex-1"
                size="lg"
                onClick={() => setStep(1)}
              >
                Back
              </Button>
              <Button
                type="button"
                className="flex-1"
                size="lg"
                onClick={handleNext}
                disabled={!formData.role}
                rightIcon={<ArrowRight className="w-4 h-4" />}
              >
                Continue
              </Button>
            </div>
          </motion.div>
        )}

        {step === 3 && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            {/* Password */}
            <div className="space-y-2">
              <label htmlFor="password" className="text-sm font-medium text-gray-300">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="Create a strong password"
                  required
                  minLength={8}
                  className="input pl-12 pr-12"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              {/* Password strength */}
              <div className="space-y-2">
                <div className="flex gap-1">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className={`h-1 flex-1 rounded-full transition-colors ${
                        formData.password.length >= 8
                          ? i <= (formData.password.length >= 12 ? 4 : formData.password.length >= 8 ? 3 : 2)
                            ? 'bg-success'
                            : 'bg-gray-800'
                          : 'bg-gray-800'
                      }`}
                    />
                  ))}
                </div>
                <p className="text-xs text-gray-500">
                  Use 8+ characters with a mix of letters, numbers & symbols
                </p>
              </div>
            </div>

            {/* Confirm Password */}
            <div className="space-y-2">
              <label htmlFor="confirmPassword" className="text-sm font-medium text-gray-300">
                Confirm password
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirmPassword ? 'text' : 'password'}
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  placeholder="Confirm your password"
                  required
                  className="input pl-12 pr-12"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white transition-colors"
                >
                  {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              {formData.confirmPassword && formData.password !== formData.confirmPassword && (
                <p className="text-xs text-error">Passwords don't match</p>
              )}
            </div>

            {/* Terms */}
            <div className="flex items-start gap-3 p-4 rounded-lg bg-gray-950 border border-gray-850">
              <button
                type="button"
                onClick={() => setAcceptTerms(!acceptTerms)}
                className={`w-5 h-5 rounded border-2 flex items-center justify-center flex-shrink-0 mt-0.5 transition-all ${
                  acceptTerms
                    ? 'bg-orange border-orange'
                    : 'border-gray-600 hover:border-gray-500'
                }`}
              >
                {acceptTerms && <Check className="w-3 h-3 text-white" />}
              </button>
              <p className="text-sm text-gray-400">
                I agree to the{' '}
                <Link href="/terms" className="text-orange hover:underline">Terms of Service</Link>
                {' '}and{' '}
                <Link href="/privacy" className="text-orange hover:underline">Privacy Policy</Link>
              </p>
            </div>

            <div className="flex gap-4">
              <Button
                type="button"
                variant="outline"
                className="flex-1"
                size="lg"
                onClick={() => setStep(2)}
              >
                Back
              </Button>
              <Button
                type="submit"
                className="flex-1"
                size="lg"
                loading={isLoading}
                disabled={!acceptTerms || formData.password !== formData.confirmPassword}
                rightIcon={<ArrowRight className="w-4 h-4" />}
              >
                Create account
              </Button>
            </div>
          </motion.div>
        )}
      </form>

      {/* Sign in link */}
      <p className="text-center text-gray-400">
        Already have an account?{' '}
        <Link href="/signin" className="text-orange hover:text-orange-600 transition-colors font-medium">
          Sign in
        </Link>
      </p>

      {/* Security notice */}
      <div className="flex items-center gap-3 p-4 rounded-lg bg-gray-950 border border-gray-850">
        <Shield className="w-5 h-5 text-success flex-shrink-0" />
        <p className="text-xs text-gray-500">
          Your data is protected with bank-grade encryption. We never share your information with third parties.
        </p>
      </div>
    </motion.div>
  )
}

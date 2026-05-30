// User Types
export type Role =
  | 'SUPER_ADMIN'
  | 'ADMIN'
  | 'VERIFICATION_OFFICER'
  | 'LEGAL_REVIEWER'
  | 'DATA_ANALYST'
  | 'SUPPORT_SPECIALIST'
  | 'BROKER'
  | 'BUYER'
  | 'SELLER'
  | 'INVESTOR'
  | 'OBSERVER'

export type UserStatus = 'ACTIVE' | 'INACTIVE' | 'SUSPENDED' | 'PENDING'

export interface User {
  id: string
  email: string
  name: string
  phone?: string
  avatarUrl?: string
  role: Role
  status: UserStatus
  emailVerifiedAt?: string
  lastLoginAt?: string
  organizationId?: string
  createdAt: string
  updatedAt: string
}

export interface Organization {
  id: string
  name: string
  type?: string
  pan?: string
  gst?: string
  address?: string
  createdAt: string
  updatedAt: string
}

// Parcel Types
export type ParcelStatus = 'ACTIVE' | 'UNDER_NEGOTIATION' | 'SOLD' | 'DELISTED' | 'PENDING'
export type VerificationStatus = 'PENDING' | 'IN_REVIEW' | 'VERIFIED' | 'REJECTED' | 'EXPIRED'
export type ReadinessStatus = 'READY' | 'CAUTION' | 'REQUIRES_REVIEW'

export interface ParcelLocation {
  state: string
  district: string
  tehsil?: string
  village?: string
  surveyNumber?: string
  plotNumber?: string
  khataNumber?: string
  address?: string
  latitude?: number
  longitude?: number
}

export interface ParcelPhysical {
  areaSqFt?: number
  areaSqM?: number
  areaAcres?: number
  areaHectares?: number
  zoning?: string
  usageType?: string
  topography?: string
  roadAccess?: string
}

export interface ParcelPricing {
  marketValue?: number
  askingPrice?: number
  pricePerSqFt?: number
}

export interface Parcel {
  id: string
  displayId: string
  state: string
  district: string
  tehsil?: string
  village?: string
  surveyNumber?: string
  plotNumber?: string
  khataNumber?: string
  boundaryJson?: GeoJSON.Geometry
  address?: string
  latitude?: number
  longitude?: number
  areaSqFt?: number
  areaSqM?: number
  areaAcres?: number
  areaHectares?: number
  zoning?: string
  usageType?: string
  topography?: string
  roadAccess?: string
  marketValue?: number
  askingPrice?: number
  pricePerSqFt?: number
  ownershipType?: string
  currentOwnerId?: string
  currentOwner?: User
  landHealthScore?: number
  acquisitionReadiness?: ReadinessStatus
  verificationStatus: VerificationStatus
  verifiedAt?: string
  verifiedById?: string
  status: ParcelStatus
  listedAt?: string
  closedAt?: string
  organizationId?: string
  createdAt: string
  updatedAt: string
  // Computed
  _count?: {
    offers: number
    documents: number
  }
}

export interface OwnershipRecord {
  id: string
  parcelId: string
  ownerName: string
  ownerType?: string
  ownershipPercentage?: number
  acquisitionDate?: string
  deedNumber?: string
  registryDate?: string
  registryOffice?: string
  fatherName?: string
  sharePercentage?: number
  isCurrent: boolean
  createdAt: string
}

export interface Encumbrance {
  id: string
  parcelId: string
  type: string
  description?: string
  amount?: number
  holderName?: string
  startDate?: string
  endDate?: string
  status: 'ACTIVE' | 'RELEASED' | 'DISPUTED'
  documentRef?: string
  createdAt: string
}

// Offer Types
export type OfferStatus =
  | 'SUBMITTED'
  | 'COUNTERED'
  | 'REVISED'
  | 'LEGAL_REVIEW'
  | 'ACCEPTED'
  | 'DECLINED'
  | 'WITHDRAWN'
  | 'EXPIRED'
  | 'CLOSED'

export interface OfferTerms {
  paymentSchedule?: {
    milestone: string
    amount: number
    date?: string
  }[]
  conditions?: string[]
  contingencies?: string[]
}

export interface Offer {
  id: string
  parcelId: string
  parcel?: Parcel
  buyerId: string
  buyer?: User
  brokerId?: string
  broker?: User
  amount: number
  terms?: OfferTerms
  status: OfferStatus
  validUntil?: string
  currentAmount?: number
  createdAt: string
  updatedAt: string
}

export interface NegotiationEvent {
  id: string
  offerId: string
  type: string
  fromStatus?: string
  toStatus?: string
  amount?: number
  terms?: OfferTerms
  notes?: string
  createdById?: string
  createdBy?: User
  createdAt: string
}

// Document Types
export type DocumentCategory = 'LEGAL' | 'FINANCIAL' | 'MAP' | 'SURVEY' | 'VERIFICATION'

export interface Document {
  id: string
  parcelId?: string
  offerId?: string
  userId?: string
  name: string
  type?: string
  category?: DocumentCategory
  description?: string
  fileUrl: string
  fileSize?: number
  mimeType?: string
  s3Key?: string
  status: 'UPLOADED' | 'VERIFIED' | 'REJECTED' | 'EXPIRED'
  verifiedAt?: string
  verifiedById?: string
  dataRoomAccess: boolean
  createdAt: string
}

// Timeline Types
export type TimelineEventType =
  | 'PURCHASE'
  | 'MUTATION'
  | 'TAX_UPDATE'
  | 'VERIFICATION'
  | 'LISTING'
  | 'OFFER'
  | 'CLOSURE'
  | 'REGISTRY'

export interface TimelineEvent {
  id: string
  parcelId: string
  type: TimelineEventType
  title: string
  description?: string
  metadata?: Record<string, unknown>
  createdById?: string
  createdAt: string
}

// Notification Types
export type NotificationType =
  | 'OFFER_RECEIVED'
  | 'OFFER_COUNTERED'
  | 'OFFER_ACCEPTED'
  | 'OFFER_DECLINED'
  | 'PARCEL_MATCH'
  | 'PARCEL_VERIFIED'
  | 'PARCEL_PRICE_DROP'
  | 'DOCUMENT_UPLOADED'
  | 'DOCUMENT_VERIFIED'
  | 'SYSTEM_ANNOUNCEMENT'
  | 'SECURITY_ALERT'

export interface Notification {
  id: string
  userId: string
  type: NotificationType
  title: string
  message?: string
  data?: Record<string, unknown>
  readAt?: string
  createdAt: string
}

// Search Types
export interface SearchFilters {
  state?: string[]
  district?: string[]
  tehsil?: string[]
  village?: string[]
  surveyNumber?: string
  areaMin?: number
  areaMax?: number
  priceMin?: number
  priceMax?: number
  zoning?: string[]
  usageType?: string[]
  verificationStatus?: VerificationStatus[]
  ownershipType?: string[]
  landHealthScoreMin?: number
  acquisitionReadiness?: ReadinessStatus[]
  geoBounds?: {
    north: number
    south: number
    east: number
    west: number
  }
}

export interface SavedSearch {
  id: string
  userId: string
  name?: string
  filters: SearchFilters
  notify: boolean
  createdAt: string
}

// Pagination
export interface PaginationParams {
  page?: number
  limit?: number
  sort?: string
  order?: 'asc' | 'desc'
}

export interface PaginatedResponse<T> {
  data: T[]
  meta: {
    page: number
    limit: number
    total: number
    totalPages: number
  }
}

// API Response
export interface ApiResponse<T> {
  success: boolean
  data?: T
  error?: {
    code: string
    message: string
    details?: { field: string; message: string }[]
  }
}

// Analytics Types
export interface PlatformMetrics {
  totalTransactionVolume: number
  transactionVolumeTrend: number
  averageDealSize: number
  averageTimeToClose: number
  totalParcels: number
  parcelsVerified: number
  verificationRate: number
  averageLandHealthScore: number
  totalUsers: number
  activeUsers: number
  userGrowthRate: number
  retentionRate: number
  totalOffers: number
  offerConversionRate: number
}

// GeoJSON Types
export namespace GeoJSON {
  export interface Position {
    0: number // longitude
    1: number // latitude
  }

  export interface Geometry {
    type: 'Point' | 'LineString' | 'Polygon' | 'MultiPoint' | 'MultiLineString' | 'MultiPolygon'
    coordinates: Position | Position[] | Position[][] | Position[][][]
  }

  export interface Feature {
    type: 'Feature'
    geometry: Geometry
    properties: Record<string, unknown>
  }

  export interface FeatureCollection {
    type: 'FeatureCollection'
    features: Feature[]
  }
}
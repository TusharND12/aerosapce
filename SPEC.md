# LANDGRID
## Land Intelligence & Transaction Operating System

---

# PRODUCT STRATEGY

## Vision

**LANDGRID** is India's first **Land Intelligence & Transaction Operating System** — a mission-critical platform that transforms how institutional investors, developers, and enterprises acquire, verify, and manage land assets at scale.

We are building the Bloomberg Terminal for Indian land transactions — a platform where every parcel of land has a digital identity, every transaction is traceable, every record is verifiable, and every deal flows through a secure, auditable pipeline.

---

## Market Opportunity

### The Problem

Indian land transactions are broken:

- **Opaque ownership records** — Chain of title often unclear, spanning generations
- **Manual verification processes** — Weeks of legwork, multiple government offices
- **Fragmented data** — Land records scattered across tehsils, districts, and states
- **High fraud risk** — 1 in 4 land deals face legal challenges
- **No standardized format** — Same data exists in different forms across jurisdictions
- **Institutional capital locked** — Foreign and domestic institutional investors cannot deploy capital efficiently

### The Solution

LANDGRID creates a **single source of truth** for Indian land:

1. **Intelligence Layer** — Aggregate, verify, and normalize land records from multiple government sources
2. **Transaction OS** — Orchestrate the entire acquisition workflow from discovery to closure
3. **Trust Infrastructure** — Build institutional-grade verification and audit systems
4. **Data Room** — M&A-style document management for every parcel

---

## Target Market

### Primary Segments

| Segment | Description | ACV Range |
|---------|-------------|-----------|
| **Institutional Investors** | PE funds, REITs, sovereign wealth funds | ₹50L - ₹50Cr+ per deal |
| **Developers** | Top 50 Indian developers by revenue | ₹10L - ₹5Cr per deal |
| **HNIs / Family Offices** | UHNIs looking to deploy capital in land | ₹5L - ₹2Cr per deal |
| **Banks & NBFCs** | Lenders needing land verification | ₹2L - ₹20L per verification |
| **Government Bodies** | Land acquisition for infrastructure | ₹1Cr - ₹500Cr per project |

### Secondary Segments

- **Brokers & Intermediaries** — Premium subscription for deal flow
- **Legal Firms** — Due diligence as a service
- **Surveyors & Consultants** — Platform monetization

---

## Business Model

### Revenue Streams

1. **Transaction Fee** — 0.5% - 1.5% of deal value on successful transactions
2. **Verification Services** — ₹5,000 - ₹50,000 per parcel verification package
3. **Subscription Tiers** — Pro (₹25K/month), Enterprise (₹1L/month), Institutional (Custom)
4. **Data API** — Access to verified land intelligence data
5. **Document Services** — E-stamping, registry assistance, legal review

### Unit Economics

- **CAC** — ₹15,000 (Enterprise sales motion)
- **LTV** — ₹8,00,000 (5-year institutional relationship)
- **LTV:CAC** — 53:1
- **Payback Period** — 3 months

---

## Competitive Landscape

| Competitor | Strength | Weakness |
|------------|----------|----------|
| NoBroker | Consumer focus, volume | No verification, no enterprise |
| 99Acres | Listings only | No intelligence, no trust |
| MagicBricks | Traffic | No institutional tools |
| SquareYards | Consumer focus | No enterprise workflow |
| **LANDGRID** | **Intelligence + Trust + Enterprise** | **New to market** |

---

## Strategic Moats

1. **Data Moat** — Aggregated land intelligence data becomes more valuable with scale
2. **Trust Moat** — Verification reputation takes years to build
3. **Network Effects** — More buyers/sellers = more transactions = more data
4. **Workflow Moat** — Institutional acquisition workflows are deeply integrated
5. **Regulatory Moat** — Government partnerships create barriers to entry

---

# FULL PRODUCT REQUIREMENTS DOCUMENT (PRD)

## 1. Concept & Vision

LANDGRID is the operating system for institutional land acquisition in India. It combines the data density of Palantir Foundry, the transactional elegance of Stripe, the information architecture of Bloomberg, and the design sensibility of Linear into a single, cohesive platform.

The experience should feel like stepping into a high-security trading floor — every element communicates precision, trust, and institutional-grade sophistication. This is not a website; it is a command center for land intelligence.

---

## 2. Design Language

### 2.1 Aesthetic Direction

**Reference Points:**
- Bloomberg Terminal — Information density, dark mode, real-time data
- Palantir Foundry — Data visualization, intelligence graphs, maps
- Linear — Minimal UI, keyboard shortcuts, speed
- Stripe Dashboard — Clarity, progressive disclosure, micro-interactions
- Apple — Typography, spacing, restraint

**Personality:**
- Precise
- Authoritative
- Trustworthy
- Advanced
- Minimal but information-rich

### 2.2 Color Palette

```
Primary Colors:
- Black:        #000000    (Backgrounds, primary text)
- White:        #FFFFFF    (Text on dark, cards on light)
- Orange:       #FF6A00    (CTAs, active states, important metrics)

Neutrals:
- #171717       (Elevated surfaces, cards)
- #262626       (Borders, dividers)
- #404040       (Disabled states, muted text)
- #737373       (Secondary text)
- #E5E5E5       (Light borders, subtle dividers)
- #F5F5F5       (Light backgrounds)

Semantic Colors:
- Success:      #22C55E    (Verified, Complete)
- Warning:      #EAB308 (Caution, Pending Review)
- Error:        #EF4444    (Issues, Rejected)
- Info:         #3B82F6    (Neutral information)

Gradients:
- Primary:      linear-gradient(135deg, #FF6A00 0%, #FF8A00 100%)
- Dark:         linear-gradient(180deg, #171717 0%, #000000 100%)
```

### 2.3 Typography

**Primary Font:** Inter (for UI elements)
**Display Font:** Instrument Serif (for headings and hero text)

```
Type Scale:
- Display:      72px / 80px line-height / -0.02em tracking
- H1:          48px / 56px line-height / -0.02em tracking
- H2:          36px / 44px line-height / -0.01em tracking
- H3:          24px / 32px line-height / -0.01em tracking
- H4:          20px / 28px line-height / 0 tracking
- Body Large:   18px / 28px line-height / 0 tracking
- Body:        16px / 24px line-height / 0 tracking
- Body Small:  14px / 20px line-height / 0.01em tracking
- Caption:      12px / 16px line-height / 0.02em tracking
- Mono:        14px / 20px line-height / (for data/IDs)
```

### 2.4 Spacing System

```
Base Unit: 4px

Scale:
- 0:    0px
- 1:    4px
- 2:    8px
- 3:    12px
- 4:    16px
- 5:    20px
- 6:    24px
- 8:    32px
- 10:   40px
- 12:   48px
- 16:   64px
- 20:   80px
- 24:   96px
- 32:   128px
- 40:   160px
- 48:   192px
- 64:   256px
```

### 2.5 Grid System

```
Desktop Grid:
- Columns: 12
- Gutter: 24px
- Margin: 64px (desktop), 24px (mobile)
- Max Width: 1440px

Breakpoints:
- Mobile:  0 - 639px
- Tablet:  640 - 1023px
- Desktop: 1024 - 1439px
- Wide:    1440px+
```

### 2.6 Motion Philosophy

**Core Principles:**
- Motion communicates state change, not decoration
- Every animation has a functional purpose
- Speed communicates efficiency
- Elegance communicates premium

**Animation Tokens:**
```
- Duration Fast:     150ms
- Duration Normal: 300ms
- Duration Slow:    500ms
- Duration Page:800ms

- Easing Default:   cubic-bezier(0.4, 0, 0.2, 1)
- Easing Enter:     cubic-bezier(0, 0, 0.2, 1)
- Easing Exit:      cubic-bezier(0.4, 0, 1, 1)
- Easing Spring:   cubic-bezier(0.175, 0.885, 0.32, 1.275)
```

**Animation Patterns:**
1. **Page Transitions** — Fade + subtle slide (300ms)
2. **Staggered Reveals** — Items enter with 50ms delay between each
3. **Hover Elevation** — Cards lift 4px with shadow expansion
4. **Data Loading** — Skeleton pulse with subtle shimmer
5. **Map Animations** — Parcel boundaries draw progressively
6. **Counter Animations** — Numbers count up on reveal
7. **Graph Drawing** — Lines draw from left to right

---

## 3. User Roles& Permissions

### 3.1 Role Hierarchy

```
ADMIN
├── SUPER_ADMIN
│   ├── ADMIN
│   │   ├── VERIFICATION_OFFICER
│   │   ├── LEGAL_REVIEWER
│   │   ├── DATA_ANALYST
│   │   └── SUPPORT_SPECIALIST
│   │       ├── BROKER
│   │       │   ├── BUYER
│   │       │   │   └── SELLER
│   │       │   └── INVESTOR
│   │       │       └── OBSERVER
```

### 3.2 Role Definitions

| Role | Description | Key Permissions |
|------|-------------|-----------------|
| **SUPER_ADMIN** | Full system access | All permissions |
| **ADMIN** | Platform operations | User management, analytics, config |
| **VERIFICATION_OFFICER** | Record verification | Verify parcels, flag issues |
| **LEGAL_REVIEWER** | Legal assessment | Legal review, document approval |
| **DATA_ANALYST** | Data operations | Import data, run reports |
| **SUPPORT_SPECIALIST** | User support | View data, create tickets |
| **BROKER** | Deal facilitation | Create listings, manage offers |
| **BUYER** | Land acquisition | Search, save, make offers |
| **SELLER** | Land disposal | List parcels, review offers |
| **INVESTOR** | Institutional access | Full data access, API |
| **OBSERVER** | Read-only access | View approved data |

### 3.3 Permissions Matrix

| Permission | Super Admin | Admin | Broker | Buyer | Seller | Investor |
|------------|:-----------:|:-----:|:-------:|:-----:|:------:|:--------:|
| Manage Users | ✓ | ✓ | - | - | - | - |
| View All Parcels | ✓ | ✓ | - | - | - | ✓ |
| Verify Records | ✓ | ✓ | ✓ | - | - | - |
| Create Listings | ✓ | ✓ | ✓ | - | ✓ | - |
| Make Offers | ✓ | ✓ | ✓ | ✓ | - | ✓ |
| Accept Offers | ✓ | ✓ | ✓ | - | ✓ | - |
| Access Data Room | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| API Access | ✓ | ✓ | - | - | - | ✓ |
| View Analytics | ✓ | ✓ | ✓ | - | - | ✓ |
| Export Data | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| Legal Review | ✓ | ✓ | - | - | - | - |
| Audit Logs | ✓ | ✓ | - | - | - | - |

---

## 4. Information Architecture

### 4.1 Data Model

```
PARCEL (Core Entity)
├── Location
│   ├── State
│   ├── District
│   ├── Tehsil
│   ├── Village
│   ├── Survey Number
│   ├── Plot Number
│   ├── Khata Number
│   └── Boundaries (GeoJSON)
├── Physical Attributes
│   ├── Area (sq ft / sq m / acres / hectares)
│   ├── Zoning
│   ├── Usage Type
│   ├── Topography
│   └── Access
├── Ownership
│   ├── Current Owner(s)
│   ├── Ownership Type
│   ├── Chain of Title
│   └── Beneficial Owners
├── Legal Status
│   ├── Encumbrances
│   ├── Litigation Status
│   ├── Government Acquisition
│   └── Approvals
├── Financial
│   ├── Market Value
│   ├── Asking Price
│   ├── Tax Records
│   └── Payment History
├── Verification
│   ├── Record Completeness
│   ├── Data Sources
│   ├── Verification Date
│   └── Verified By
└── Metrics
    ├── Land Health Score™
    ├── Acquisition Readiness Index™
    └── Risk Assessment
```

### 4.2 Entity Relationships

```
USER (1) ──────< (M) PARCEL (as owner/buyer/broker)
USER (1) ──────< (M) OFFER
USER (1) ──────< (M) DOCUMENT
USER (1) ──────< (M) SEARCH
USER (1) ──────< (M) NOTIFICATION

PARCEL (1) ────< (M) DOCUMENT
PARCEL (1) ────< (M) OFFER
PARCEL (1) ────< (M) TIMELINE_EVENT
PARCEL (1) ────< (M) VERIFICATION_RECORD
PARCEL (1) ────< (M) ENCUMBRANCE
PARCEL (1) ────< (M) OWNERSHIP_RECORD

OFFER (1) ─────< (M) NEGOTIATION_EVENT
OFFER (1) ─────< (M) DOCUMENT

ORGANIZATION (1) ────< (M) USER
ORGANIZATION (1) ────< (M) PARCEL
```

---

## 5. Complete Sitemap

```
LANDGRID
│
├── PUBLIC
│   ├── Landing Page
│   ├── Authentication
│   │   ├── Sign In
│   │   ├── Sign Up
│   │   ├── Forgot Password
│   │   └── Verify Email
│   └── Onboarding
│       ├── Role Selection
│       ├── Profile Setup
│       └── Platform Tour
│
├── DISCOVERY
│   ├── Land Discovery (/)
│   ├── Map View (/map)
│   ├── Intelligence View (/intelligence)
│   ├── Saved Searches (/saved-searches)
│   └── Search Results (/search)
│
├── PARCEL
│   ├── Parcel Details (/parcel/[id])
│   ├── Government Records (/parcel/[id]/records)
│   ├── Ownership Analysis (/parcel/[id]/ownership)
│   ├── Legal Status (/parcel/[id]/legal)
│   ├── Documents (/parcel/[id]/documents)
│   ├── Timeline (/parcel/[id]/timeline)
│   └── Data Room (/parcel/[id]/data-room)
│
├── WORKSPACE
│   ├── Comparison Workspace (/compare)
│   ├── Negotiation Center (/negotiations)
│   └── My Parcels (/my-parcels)
│
├── DASHBOARDS
│   ├── Buyer Dashboard (/dashboard/buyer)
│   ├── Seller Dashboard (/dashboard/seller)
│   ├── Broker Dashboard (/dashboard/broker)
│   └── Investor Dashboard (/dashboard/investor)
│
├── TRANSACTION
│   ├── Active Deals (/deals)
│   ├── Offer History (/deals/history)
│   └── Transaction Details (/deals/[id])
│
├── ADMIN (Role-restricted)
│   ├── Control Center (/admin)
│   ├── User Management (/admin/users)
│   ├── Parcel Management (/admin/parcels)
│   ├── Verification Queue (/admin/verification)
│   ├── Legal Reviews (/admin/legal)
│   ├── Lead Pipeline (/admin/leads)
│   ├── Analytics Suite (/admin/analytics)
│   ├── Fraud Detection (/admin/fraud)
│   ├── Audit Logs (/admin/audit)
│   ├── Permissions (/admin/permissions)
│   └── System Config (/admin/config)
│
├── SETTINGS
│   ├── Profile (/settings/profile)
│   ├── Notifications (/settings/notifications)
│   ├── Security (/settings/security)
│   ├── Team (/settings/team)
│   ├── Billing (/settings/billing)
│   └── API Keys (/settings/api)
│
└── UTILITY
    ├── Notifications (/notifications)
    ├── Help Center (/help)
    └── Status Page (/status)
```

---

## 6. UX Flows

### 6.1 Buyer Acquisition Flow

```
[1. DISCOVER]
Landing → Search → Filters → Results (List/Map/Intelligence)
    ↓
[2. EVALUATE]
Parcel Card → Parcel Details → Land Health Score → Readiness Index
    ↓
[3. VERIFY]
Documents → Government Records → Legal Status → Ownership Graph
    ↓
[4. COMPARE]
Add to Compare → Comparison Workspace → Side-by-side Analysis
    ↓
[5. NEGOTIATE]
Make Offer → Negotiation Center → Counter → Terms → Acceptance
    ↓
[6. TRANSACT]
Data Room → Document Upload → Legal Review → E-Registry
    ↓
[7. CLOSE]
Final Verification → Payment → Registry → Asset in Portfolio
```

### 6.2 Seller Listing Flow

```
[1. LIST]
Dashboard → Create Listing → Parcel Details → Pricing
    ↓
[2. VERIFY]
Platform Verification → Document Collection → Record Update
    ↓
[3. PUBLISH]
Listing Published → Buyer Interest → Offers
    ↓
[4. NEGOTIATE]
Review Offers → Counter → Terms Agreement
    ↓
[5. TRANSACT]
Data Room Access → Document Signing → Registry
    ↓
[6. CLOSE]
Payment Received → Registry Complete → Funds Released
```

### 6.3 Verification Flow

```
[1. QUEUE]
Parcel Listed → Verification Queue → Priority Assignment
    ↓
[2. DATA COLLECTION]
Fetch Records → Government APIs → Document Upload
    ↓
[3. ANALYSIS]
Ownership Chain → Encumbrance Check → Litigation Search
    ↓
[4. SCORING]
Land Health Score™ → Readiness Index™ → Risk Assessment
    ↓
[5. REVIEW]
Officer Review → Legal Review → Approval/Rejection
    ↓
[6. PUBLISH]
Verified Badge → Score Display → Update Timeline
```

---

## 7. Wireframe Descriptions

### 7.1 Landing Page

**Hero Section:**
- Full-width dark background with subtle grid pattern
- Large serif headline: "Land Intelligence. Acquisition. Trust."
- Subheadline explaining the platform value proposition
- Primary CTA: "Start Discovering" (orange, prominent)
- Secondary CTA: "Request Demo" (outline)
- Abstract 3D visualization of land parcels with connecting data streams

**Trust Indicators:**
- Scrolling logos of institutional clients/partners
- Statistics: "500+ Parcels Verified", "₹2000Cr+ Transactions", "99.9% Verification Accuracy"

**Features Grid:**
- 3-column grid with icon + headline + description
- Cards with subtle hover elevation
- Dark surfaces with orange accent icons

**Product Preview:**
- Split layout: text left, interface mockup right
- Animated preview of the intelligence map
- Parcel cards with Land Health Score visible

**Testimonials:**
- Institutional client quotes
- Minimal, text-focused presentation
- Black background, white text

**CTA Section:**
- Full-width orange gradient
- Bold headline
- Form for demo request

### 7.2 Land Discovery Page

**Header:**
- Logo left
- Search bar center (expandable)
- User menu right

**Filter Sidebar (Left):**
- Collapsible filter groups
- State → District → Village (cascading)
- Survey Number (text input)
- Area (range slider)
- Budget (range slider)
- Zoning (multi-select)
- Usage (multi-select)
- Verification Status (toggle)
- Ownership Type (radio)
- Availability (toggle)

**Results Area (Center):**
- View toggle: List | Map | Intelligence
- Sort dropdown
- Results count
- Parcel cards in list view
- Map with parcel overlays in map view
- Intelligence cards with mini-charts in intelligence view

**Map View:**
- Dark Mapbox base
- Parcel boundaries in orange (available) / gray (unavailable)
- Cluster markers at zoom-out
- Hover shows parcel preview
- Click opens parcel details

### 7.3 Parcel Details Page

**Hero Section:**
- Full-width map showing parcel boundary
- Parcel ID overlay
- Quick actions: Save, Share, Compare
- Land Health Score badge (prominent)

**Intelligence Panel (Right):**
- Land Health Score: 92/100
- Acquisition Readiness: READY
- Key metrics in cards
- Owner preview

**Tab Navigation:**
- Overview
- Government Data
- Ownership
- Legal Status
- Documents
- Timeline
- Negotiation
- Data Room

**Overview Tab:**
- Parcel details in structured layout
- Photo gallery (if available)
- Location map
- Key facts sidebar

**Government Data Tab:**
- Record viewer with source badges
- Document previews
- Verification status per record
- Last updated timestamp

**Ownership Tab:**
- Ownership Intelligence Graph™
- Interactive node-link diagram
- Current owner highlighted
- Historical owners in timeline

**Legal Status Tab:**
- Encumbrance list
- Litigation status
- Government acquisition status
- Risk indicators

**Documents Tab:**
- Categorized document list
- Upload capability
- Preview on click
- Download option

**Timeline Tab:**
- Parcel Timeline™ visualization
- Vertical timeline with icons
- Events: Purchase, Mutation, Tax, Verification, Listing, Offers, Closure
- GitHub-style commit visualization

**Negotiation Tab:**
- Active offers list
- Offer submission form
- Negotiation history
- Current terms

**Data Room Tab:**
- M&A-style document room
- Folder structure
- Access controls
- Upload/download

### 7.4 Comparison Workspace

**Header:**
- "Comparison Workspace" title
- Clear all button
- Export comparison button

**Parcel Columns:**
- Side-by-side parcel cards
- Up to 4 parcels
- Remove parcel button
- Synchronized scrolling

**Comparison Matrix:**
- Attribute rows
- Parcel columns
- Highlight differences
- Ranking indicators

**Metrics Panel:**
- Aggregated Land Health Scores
- Price comparison
- Area comparison
- Verification status comparison

### 7.5 Negotiation Center

**Structure:**
- NOT a chat interface
- Timeline-based workflow
- Each step is a distinct state

**Workflow States:**
```
[OFFER_SUBMITTED] → [COUNTER_OFFER] → [REVISION] → [LEGAL_REVIEW] → [ACCEPTED] → [CLOSED]
                      ↓
                 [DECLINED] ← [WITHDRAWN]
```

**Timeline View:**
- Vertical timeline with states
- Current state highlighted
- Action buttons for current state
- History of all events

**Offer Card:**
- Amount
- Terms
- Conditions
- Validity period
- Actions: Accept, Counter, Decline

**Counter Offer Form:**
- Revised amount
- Modified terms
- Additional conditions
- Explanation field

### 7.6 Admin Control Center

**Dashboard:**
- Key metrics cards
- Activity feed
- Alerts queue
- Quick actions

**User Management:**
- User table with filters
- Role assignment
- Status toggle
- Bulk actions

**Verification Queue:**
- Queue table
- Priority indicators
- Assign to officer
- Batch process

**Analytics Suite:**
- Transaction volume charts
- Verification metrics
- User activity
- Geographic distribution

**Audit Logs:**
- Searchable log table
- Filter by action type
- Filter by user
- Filter by date range
- Export capability

---

## 8. Design System

### 8.1 Component Categories

**Navigation:**
- TopNav
- Sidebar
- Breadcrumbs
- Tabs
- Pagination

**Data Display:**
- DataTable
- StatCard
- MetricCard
- Timeline
- Badge
- Tag
- Avatar
- Tooltip

**Forms:**
- Input
- Select
- MultiSelect
- DatePicker
- RangeSlider
- Checkbox
- Radio
- Toggle
- FormSection

**Feedback:**
- Toast
- Alert
- Modal
- Drawer
- Skeleton
- Progress
- Spinner

**Layout:**
- Container
- Grid
- Stack
- Divider
- Card
- Section

**Maps:**
- MapView
- ParcelOverlay
- ClusterMarker
- DrawingTools

**Charts:**
- LineChart
- BarChart
- PieChart
- AreaChart
- RadarChart

### 8.2 Component States

Every component supports:
- **Default** — Normal resting state
- **Hover** — Elevated, highlighted
- **Active** — Pressed, selected
- **Focus** — Keyboard focus ring
- **Disabled** — Grayed out, non-interactive
- **Loading** — Skeleton or spinner
- **Error** — Red border, error message
- **Success** — Green indicator

### 8.3 Animation Tokens

```css
:root {
  /* Durations */
  --duration-fast: 150ms;
  --duration-normal: 300ms;
  --duration-slow: 500ms;
  --duration-page: 800ms;

  /* Easings */
  --ease-default: cubic-bezier(0.4, 0, 0.2, 1);
  --ease-enter: cubic-bezier(0, 0, 0.2, 1);
  --ease-exit: cubic-bezier(0.4, 0, 1, 1);
  --ease-spring: cubic-bezier(0.175, 0.885, 0.32, 1.275);

  /* Transitions */
  --transition-fast: var(--duration-fast) var(--ease-default);
  --transition-normal: var(--duration-normal) var(--ease-default);
  --transition-slow: var(--duration-slow) var(--ease-default);
}
```

---

## 9. Database Schema

### 9.1 Core Tables

```sql
-- Users and Authentication
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255),
    name VARCHAR(255) NOT NULL,
    phone VARCHAR(20),
    avatar_url TEXT,
    role VARCHAR(50) NOT NULL DEFAULT 'BUYER',
    status VARCHAR(20) DEFAULT 'ACTIVE',
    email_verified_at TIMESTAMP,
    last_login_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE organizations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    type VARCHAR(50),
    pan VARCHAR(10),
    gst VARCHAR(15),
    address TEXT,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE organization_members (
    user_id UUID REFERENCES users(id),
    organization_id UUID REFERENCES organizations(id),
    role VARCHAR(50) DEFAULT 'MEMBER',
    invited_by UUID REFERENCES users(id),
    joined_at TIMESTAMP DEFAULT NOW(),
    PRIMARY KEY (user_id, organization_id)
);

-- Parcels
CREATE TABLE parcels (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    display_id VARCHAR(50) UNIQUE NOT NULL,
    
    -- Location
    state VARCHAR(100) NOT NULL,
    district VARCHAR(100) NOT NULL,
    tehsil VARCHAR(100),
    village VARCHAR(100),
    survey_number VARCHAR(50),
    plot_number VARCHAR(50),
    khata_number VARCHAR(50),
    boundary_json JSONB,
    address TEXT,
    
    -- Physical
    area_sq_ft DECIMAL(15,2),
    area_sq_m DECIMAL(15,2),
    area_acres DECIMAL(10,4),
    area_hectares DECIMAL(10,4),
    zoning VARCHAR(100),
    usage_type VARCHAR(100),
    topography VARCHAR(100),
    road_access VARCHAR(100),
    
    -- Pricing
    market_value DECIMAL(15,2),
    asking_price DECIMAL(15,2),
    price_per_sq_ft DECIMAL(10,2),
    
    -- Ownership
    ownership_type VARCHAR(50),
    current_owner_id UUID,
    
    -- Verification
    land_health_score INTEGER,
    acquisition_readiness VARCHAR(20),
    verification_status VARCHAR(20) DEFAULT 'PENDING',
    verified_at TIMESTAMP,
    verified_by UUID REFERENCES users(id),
    
    -- Status
    status VARCHAR(20) DEFAULT 'ACTIVE',
    listed_at TIMESTAMP,
    closed_at TIMESTAMP,
    
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Ownership Chain
CREATE TABLE ownership_records (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    parcel_id UUID REFERENCES parcels(id),
    owner_name VARCHAR(255) NOT NULL,
    owner_type VARCHAR(50),
    ownership_percentage DECIMAL(5,2),
    acquisition_date DATE,
    deed_number VARCHAR(100),
    registry_date DATE,
    registry_office VARCHAR(255),
    father_name VARCHAR(255),
    share_percentage DECIMAL(5,2),
    is_current BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT NOW()
);

-- Encumbrances
CREATE TABLE encumbrances (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    parcel_id UUID REFERENCES parcels(id),
    type VARCHAR(100) NOT NULL,
    description TEXT,
    amount DECIMAL(15,2),
    holder_name VARCHAR(255),
    start_date DATE,
    end_date DATE,
    status VARCHAR(20) DEFAULT 'ACTIVE',
    document_ref VARCHAR(255),
    created_at TIMESTAMP DEFAULT NOW()
);

-- Offers
CREATE TABLE offers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    parcel_id UUID REFERENCES parcels(id),
    buyer_id UUID REFERENCES users(id),
    broker_id UUID REFERENCES users(id),
    amount DECIMAL(15,2) NOT NULL,
    terms JSONB,
    status VARCHAR(30) DEFAULT 'SUBMITTED',
    valid_until DATE,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Negotiation
CREATE TABLE negotiation_events (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    offer_id UUID REFERENCES offers(id),
    type VARCHAR(50) NOT NULL,
    from_status VARCHAR(30),
    to_status VARCHAR(30),
    amount DECIMAL(15,2),
    terms JSONB,
    notes TEXT,
    created_by UUID REFERENCES users(id),
    created_at TIMESTAMP DEFAULT NOW()
);

-- Documents
CREATE TABLE documents (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    parcel_id UUID REFERENCES parcels(id),
    offer_id UUID REFERENCES offers(id),
    user_id UUID REFERENCES users(id),
    name VARCHAR(255) NOT NULL,
    type VARCHAR(100),
    category VARCHAR(100),
    file_url TEXT NOT NULL,
    file_size INTEGER,
    mime_type VARCHAR(100),
    s3_key TEXT,
    status VARCHAR(20) DEFAULT 'UPLOADED',
    verified_at TIMESTAMP,
    verified_by UUID REFERENCES users(id),
    created_at TIMESTAMP DEFAULT NOW()
);

-- Timeline Events
CREATE TABLE timeline_events (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    parcel_id UUID REFERENCES parcels(id),
    type VARCHAR(50) NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    metadata JSONB,
    created_by UUID REFERENCES users(id),
    created_at TIMESTAMP DEFAULT NOW()
);

-- Saved Searches
CREATE TABLE saved_searches (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id),
    name VARCHAR(255),
    filters JSONB NOT NULL,
    notify BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT NOW()
);

-- Notifications
CREATE TABLE notifications (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id),
    type VARCHAR(50) NOT NULL,
    title VARCHAR(255) NOT NULL,
    message TEXT,
    data JSONB,
    read_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT NOW()
);

-- Audit Logs
CREATE TABLE audit_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id),
    action VARCHAR(100) NOT NULL,
    entity_type VARCHAR(50),
    entity_id UUID,
    old_values JSONB,
    new_values JSONB,
    ip_address INET,
    user_agent TEXT,
    created_at TIMESTAMP DEFAULT NOW()
);

-- Verification Records
CREATE TABLE verification_records (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    parcel_id UUID REFERENCES parcels(id),
    source VARCHAR(100) NOT NULL,
    source_id VARCHAR(255),
    record_type VARCHAR(100),
    data JSONB,
    verified_at TIMESTAMP,
    verified_by UUID REFERENCES users(id),
    status VARCHAR(20) DEFAULT 'PENDING',
    notes TEXT,
    created_at TIMESTAMP DEFAULT NOW()
);
```

---

## 10. Prisma Models

```prisma
// Core Models

model User {
    id              String    @id @default(uuid())
    email String    @unique
    passwordHash    String?   @map("password_hash")
    name String
    phone           String?
    avatarUrl       String?   @map("avatar_url")
    role            Role @default(BUYER)
    status          UserStatus @default(ACTIVE)
    emailVerifiedAt DateTime? @map("email_verified_at")
    lastLoginAt     DateTime? @map("last_login_at")
    
    organizationMemberships OrganizationMember[]
    parcelsOwned        Parcel[] @relation("ParcelOwner")
    parcelsVerified     Parcel[]          @relation("ParcelVerifier")
    offers Offer[]           @relation("OfferBuyer")
    offersBrokered      Offer[]           @relation("OfferBroker")
    documents Document[]
    savedSearches        SavedSearch[]
    notifications       Notification[]
    auditLogs           AuditLog[]
    verificationRecords VerificationRecord[]
    negotiationEvents   NegotiationEvent[]
    
    createdAt DateTime @default(now()) @map("created_at")
    updatedAt DateTime @updatedAt @map("updated_at")
    
    @@map("users")
}

model Organization {
    id String   @id @default(uuid())
    name      String
    type      String?
    pan       String?  @unique
    gst       String?
    address   String?
    
    members   OrganizationMember[]
    parcels   Parcel[]
    
    createdAt DateTime @default(now()) @map("created_at")
    updatedAt DateTime @updatedAt @map("updated_at")
    
    @@map("organizations")
}

model OrganizationMember {
    userId         String   @map("user_id")
    organizationId String   @map("organization_id")
    role           OrgRole  @default(MEMBER)
    invitedBy      String?  @map("invited_by")
    joinedAt       DateTime @default(now()) @map("joined_at")
    
    user         User         @relation(fields: [userId], references: [id])
    organization Organization @relation(fields: [organizationId], references: [id])
    
    @@id([userId, organizationId])
    @@map("organization_members")
}

model Parcel {
    id              String @id @default(uuid())
    displayId       String    @unique @map("display_id")
    
    // Location
    state           String
    district        String
    tehsil          String?
    village         String?
    surveyNumber    String?   @map("survey_number")
    plotNumber      String?   @map("plot_number")
    khataNumber     String?   @map("khata_number")
    boundaryJson    Json?     @map("boundary_json")
    address         String?
    
    // Physical
    areaSqFt        Decimal?  @map("area_sq_ft") @db.Decimal(15,2)
    areaSqM         Decimal?  @map("area_sq_m") @db.Decimal(15,2)
    areaAcres       Decimal?  @map("area_acres") @db.Decimal(10,4)
    areaHectares    Decimal?  @map("area_hectares") @db.Decimal(10,4)
    zoning String?
    usageType       String?   @map("usage_type")
    topography     String?
    roadAccess      String?   @map("road_access")
    
    // Pricing
    marketValue     Decimal?  @map("market_value") @db.Decimal(15,2)
    askingPrice     Decimal?  @map("asking_price") @db.Decimal(15,2)
    pricePerSqFt    Decimal?  @map("price_per_sq_ft") @db.Decimal(10,2)
    
    // Ownership
    ownershipType   String?   @map("ownership_type")
    currentOwnerId  String?   @map("current_owner_id")
    currentOwner    User?     @relation("ParcelOwner", fields: [currentOwnerId], references: [id])
    
    // Verification
    landHealthScore Int?      @map("land_health_score")
    acquisitionReadiness VerificationStatus? @map("acquisition_readiness")
    verificationStatus VerificationStatus @default(PENDING) @map("verification_status")
    verifiedAt      DateTime? @map("verified_at")
    verifiedBy      String?   @map("verified_by")
    verifiedByUser  User?    @relation("ParcelVerifier", fields: [verifiedBy], references: [id])
    
    // Status
    status          ParcelStatus @default(ACTIVE)
    listedAt        DateTime? @map("listed_at")
    closedAt        DateTime? @map("closed_at")
    
    // Relations
    ownershipRecords OwnershipRecord[]
    encumbrances     Encumbrance[]
    offers           Offer[]
    documents        Document[]
    timelineEvents   TimelineEvent[]
    verificationRecords VerificationRecord[]
    
    createdAt DateTime @default(now()) @map("created_at")
    updatedAt DateTime @updatedAt @map("updated_at")
    
    @@map("parcels")
}

model OwnershipRecord {
    id                  String   @id @default(uuid())
    parcelId            String   @map("parcel_id")
    parcel              Parcel   @relation(fields: [parcelId], references: [id])
    ownerName           String   @map("owner_name")
    ownerType           String?  @map("owner_type")
    ownershipPercentage Decimal? @map("ownership_percentage") @db.Decimal(5,2)
    acquisitionDate     DateTime? @map("acquisition_date")
    deedNumber         String?  @map("deed_number")
    registryDate       DateTime? @map("registry_date")
    registryOffice     String?  @map("registry_office")
    fatherName         String?  @map("father_name")
    sharePercentage    Decimal? @map("share_percentage") @db.Decimal(5,2)
    isCurrent          Boolean  @default(false) @map("is_current")
    
    createdAt DateTime @default(now()) @map("created_at")
    
    @@map("ownership_records")
}

model Encumbrance {
    id          String   @id @default(uuid())
    parcelId    String   @map("parcel_id")
    parcel      Parcel   @relation(fields: [parcelId], references: [id])
    type        String
    description String?
    amount      Decimal? @db.Decimal(15,2)
    holderName  String?  @map("holder_name")
    startDate   DateTime? @map("start_date")
    endDate     DateTime? @map("end_date")
    status      String   @default("ACTIVE")
    documentRef String?  @map("document_ref")
    
    createdAt DateTime @default(now()) @map("created_at")
    
    @@map("encumbrances")
}

model Offer {
    id          String   @id @default(uuid())
    parcelId    String   @map("parcel_id")
    parcel      Parcel   @relation(fields: [parcelId], references: [id])
    buyerId     String   @map("buyer_id")
    buyer       User     @relation("OfferBuyer", fields: [buyerId], references: [id])
    brokerId    String?  @map("broker_id")
    broker User?    @relation("OfferBroker", fields: [brokerId], references: [id])
    amount      Decimal  @db.Decimal(15,2)
    terms       Json?
    status      OfferStatus @default(SUBMITTED)
    validUntil  DateTime? @map("valid_until")
    
    negotiationEvents NegotiationEvent[]
    documents        Document[]
    
    createdAt DateTime @default(now()) @map("created_at")
    updatedAt DateTime @updatedAt @map("updated_at")
    
    @@map("offers")
}

model NegotiationEvent {
    id          String   @id @default(uuid())
    offerId     String   @map("offer_id")
    offer Offer    @relation(fields: [offerId], references: [id])
    type        String
    fromStatus  String?  @map("from_status")
    toStatus    String?  @map("to_status")
    amount      Decimal? @db.Decimal(15,2)
    terms       Json?
    notes       String?
    createdBy   String?  @map("created_by")
    createdByUser User?  @relation(fields: [createdBy], references: [id])
    
    createdAt DateTime @default(now()) @map("created_at")
    
    @@map("negotiation_events")
}

model Document {
    id          String   @id @default(uuid())
    parcelId    String?  @map("parcel_id")
    parcel      Parcel?  @relation(fields: [parcelId], references: [id])
    offerId     String?  @map("offer_id")
    offer       Offer?   @relation(fields: [offerId], references: [id])
    userId      String?  @map("user_id")
    user        User?    @relation(fields: [userId], references: [id])
    name        String
    type        String?
    category    String?
    fileUrl     String   @map("file_url")
    fileSize    Int?     @map("file_size")
    mimeType    String?  @map("mime_type")
    s3Key       String?  @map("s3_key")
    status      String   @default("UPLOADED")
    verifiedAt  DateTime? @map("verified_at")
    verifiedBy  String?  @map("verified_by")
    
    createdAt DateTime @default(now()) @map("created_at")
    
    @@map("documents")
}

model TimelineEvent {
    id          String   @id @default(uuid())
    parcelId    String   @map("parcel_id")
    parcel      Parcel   @relation(fields: [parcelId], references: [id])
    type        String
    title       String
    description String?
    metadata    Json?
    createdBy   String?  @map("created_by")
    
    createdAt DateTime @default(now()) @map("created_at")
    
    @@map("timeline_events")
}

model SavedSearch {
    id String   @id @default(uuid())
    userId    String   @map("user_id")
    user      User     @relation(fields: [userId], references: [id])
    name      String?
    filters   Json
    notify    Boolean  @default(false)
    
    createdAt DateTime @default(now()) @map("created_at")
    
    @@map("saved_searches")
}

model Notification {
    id        String   @id @default(uuid())
    userId    String   @map("user_id")
    user      User     @relation(fields: [userId], references: [id])
    type      String
    title     String
    message   String?
    data      Json?
    readAt    DateTime? @map("read_at")
    
    createdAt DateTime @default(now()) @map("created_at")
    
    @@map("notifications")
}

model AuditLog {
    id          String   @id @default(uuid())
    userId      String?  @map("user_id")
    user        User?    @relation(fields: [userId], references: [id])
    action      String
    entityType  String?  @map("entity_type")
    entityId    String?  @map("entity_id")
    oldValues   Json?    @map("old_values")
    newValues   Json?    @map("new_values")
    ipAddress   String?  @map("ip_address")
    userAgent   String?  @map("user_agent")
    
    createdAt DateTime @default(now()) @map("created_at")
    
    @@map("audit_logs")
}

model VerificationRecord {
    id          String   @id @default(uuid())
    parcelId    String   @map("parcel_id")
    parcel      Parcel   @relation(fields: [parcelId], references: [id])
    source      String
    sourceId    String?  @map("source_id")
    recordType  String?  @map("record_type")
    data        Json?
    verifiedAt  DateTime? @map("verified_at")
    verifiedBy  String?  @map("verified_by")
    verifiedByUser User?  @relation(fields: [verifiedBy], references: [id])
    status      String   @default("PENDING")
    notes       String?
    
    createdAt DateTime @default(now()) @map("created_at")
    
    @@map("verification_records")
}

// Enums
enum Role {
    SUPER_ADMIN
    ADMIN
    VERIFICATION_OFFICER
    LEGAL_REVIEWER
    DATA_ANALYST
    SUPPORT_SPECIALIST
    BROKER
    BUYER
    SELLER
    INVESTOR
    OBSERVER
}

enum UserStatus {
    ACTIVE
    INACTIVE
    SUSPENDED
    PENDING
}

enum OrgRole {
    OWNER
    ADMIN
    MEMBER
    VIEWER
}

enum ParcelStatus {
    ACTIVE
    UNDER_NEGOTIATION
    SOLD
    DELISTED
    PENDING
}

enum VerificationStatus {
    PENDING
    IN_REVIEW
    VERIFIED
    REJECTED
    EXPIRED
}

enum OfferStatus {
    SUBMITTED
    COUNTERED
    REVISED
    LEGAL_REVIEW
    ACCEPTED
    DECLINED
    WITHDRAWN
    EXPIRED
    CLOSED
}
```

---

## 11. API Architecture

### 11.1 REST API Endpoints

```
Authentication:
POST   /api/auth/signin
POST   /api/auth/signup
POST   /api/auth/signout
POST   /api/auth/forgot-password
POST   /api/auth/reset-password
POST   /api/auth/verify-email
GET    /api/auth/session

Users:
GET    /api/users/me
PATCH  /api/users/me
POST   /api/users/invite
GET    /api/users
GET    /api/users/:id
PATCH  /api/users/:id
DELETE /api/users/:id

Organizations:
GET    /api/organizations
POST   /api/organizations
GET    /api/organizations/:id
PATCH  /api/organizations/:id
POST   /api/organizations/:id/members
DELETE /api/organizations/:id/members/:userId

Parcels:
GET    /api/parcels
POST   /api/parcels
GET    /api/parcels/:id
PATCH  /api/parcels/:id
DELETE /api/parcels/:id
GET    /api/parcels/:id/ownership
GET    /api/parcels/:id/encumbrances
GET    /api/parcels/:id/documents
GET    /api/parcels/:id/timeline
GET    /api/parcels/:id/verification
POST   /api/parcels/:id/verify
GET    /api/parcels/search
GET    /api/parcels/nearby
GET    /api/parcels/compare

Offers:
GET    /api/offers
POST   /api/offers
GET    /api/offers/:id
PATCH  /api/offers/:id
POST   /api/offers/:id/counter
POST   /api/offers/:id/accept
POST   /api/offers/:id/decline
POST   /api/offers/:id/withdraw

Negotiations:
GET    /api/negotiations
GET    /api/negotiations/:id
GET    /api/negotiations/:id/events
POST   /api/negotiations/:id/events

Documents:
GET    /api/documents
POST   /api/documents/upload
GET    /api/documents/:id
DELETE /api/documents/:id
GET    /api/documents/:id/download

Search:
POST   /api/search/parcels
GET    /api/search/suggestions
POST   /api/search/saved
GET    /api/search/saved/:id

Notifications:
GET    /api/notifications
PATCH  /api/notifications/:id/read
PATCH  /api/notifications/read-all

Admin:
GET    /api/admin/analytics
GET    /api/admin/audit-logs
GET    /api/admin/verification-queue
POST /api/admin/verification-queue/:id/assign
POST   /api/admin/verification-queue/:id/verify
GET    /api/admin/fraud-detection
```

### 11.2 API Response Format

```typescript
// Success Response
{
  "success": true,
  "data": { ... },
  "meta": {
    "page": 1,
    "limit": 20,
    "total": 100,
    "totalPages": 5
  }
}

// Error Response
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid input",
    "details": [
      { "field": "email", "message": "Invalid email format" }
    ]
  }
}
```

### 11.3 GraphQL Schema (Optional)

```graphql
type Query {
  parcels(filter: ParcelFilter, pagination: Pagination): ParcelConnection!
  parcel(id: ID!): Parcel
  myOffers: [Offer!]!
  myParcels: [Parcel!]!
  notifications(unread: Boolean): [Notification!]!
}

type Mutation {
  createOffer(input: CreateOfferInput!): Offer!
  counterOffer(offerId: ID!, input: CounterOfferInput!): Offer!
  acceptOffer(offerId: ID!): Offer!
  uploadDocument(input: UploadDocumentInput!): Document!
}

type Parcel {
  id: ID!
  displayId: String!
  location: ParcelLocation!
  physical: ParcelPhysical!
  pricing: ParcelPricing!
  ownership: OwnershipInfo!
  verification: VerificationInfo!
  landHealthScore: Int
  acquisitionReadiness: ReadinessStatus
  documents: [Document!]!
  timeline: [TimelineEvent!]!
  offers: [Offer!]!
}
```

---

## 12. Folder Structure

```
landgrid/
├── src/
│   ├── app/
│   │   ├── (auth)/
│   │   │   ├── signin/
│   │   │   ├── signup/
│   │   │   └── forgot-password/
│   │   ├── (dashboard)/
│   │   │   ├── dashboard/
│   │   │   │   ├── buyer/
│   │   │   │   ├── seller/
│   │   │   │   ├── broker/
│   │   │   │   └── investor/
│   │   │   ├── parcel/
│   │   │   │   └── [id]/
│   │   │   │       ├── records/
│   │   │   │       ├── ownership/
│   │   │   │       ├── legal/
│   │   │   │       ├── documents/
│   │   │   │       ├── timeline/
│   │   │   │       └── data-room/
│   │   │   ├── discover/
│   │   │   ├── map/
│   │   │   ├── compare/
│   │   │   ├── negotiations/
│   │   │   ├── deals/
│   │   │   └── admin/
│   │   │       ├── users/
│   │   │       ├── parcels/
│   │   │       ├── verification/
│   │   │       ├── legal/
│   │   │       ├── leads/
│   │   │       ├── analytics/
│   │   │       ├── fraud/
│   │   │       ├── audit/
│   │   │       ├── permissions/
│   │   │       └── config/
│   │   ├── settings/
│   │   │   ├── profile/
│   │   │   ├── notifications/
│   │   │   ├── security/
│   │   │   ├── team/
│   │   │   ├── billing/
│   │   │   └── api/
│   │   ├── notifications/
│   │   ├── help/
│   │   ├── page.tsx (Landing)
│   │   ├── layout.tsx
│   │   └── globals.css
│   │
│   ├── components/
│   │   ├── ui/                    # Shadcn components
│   │   │   ├── button.tsx
│   │   │   ├── input.tsx
│   │   │   ├── select.tsx
│   │   │   ├── dialog.tsx
│   │   │   ├── drawer.tsx
│   │   │   ├── tabs.tsx
│   │   │   ├── badge.tsx
│   │   │   ├── card.tsx
│   │   │   ├── table.tsx
│   │   │   ├── skeleton.tsx
│   │   │   └── ...
│   │   │
│   │   ├── layout/
│   │   │   ├── header.tsx
│   │   │   ├── sidebar.tsx
│   │   │   ├── footer.tsx
│   │   │   └── mobile-nav.tsx
│   │   │
│   │   ├── discovery/
│   │   │   ├── search-filters.tsx
│   │   │   ├── parcel-card.tsx
│   │   │   ├── parcel-grid.tsx
│   │   │   ├── map-view.tsx
│   │   │   └── intelligence-view.tsx
│   │   │
│   │   ├── parcel/
│   │   │   ├── parcel-header.tsx
│   │   │   ├── parcel-map.tsx
│   │   │   ├── land-health-score.tsx
│   │   │   ├── readiness-index.tsx
│   │   │   ├── ownership-graph.tsx
│   │   │   ├── parcel-timeline.tsx
│   │   │   └── offer-form.tsx
│   │   │
│   │   ├── negotiation/
│   │   │   ├── negotiation-timeline.tsx
│   │   │   ├── offer-card.tsx
│   │   │   └── counter-form.tsx
│   │   │
│   │   ├── dashboard/
│   │   │   ├── stat-card.tsx
│   │   │   ├── activity-feed.tsx
│   │   │   ├── recent-parcels.tsx
│   │   │   └── pipeline-chart.tsx
│   │   │
│   │   ├── admin/
│   │   │   ├── user-table.tsx
│   │   │   ├── verification-queue.tsx
│   │   │   ├── audit-log-table.tsx
│   │   │   └── analytics-charts.tsx
│   │   │
│   │   └── shared/
│   │       ├── loading.tsx
│   │       ├── error-boundary.tsx
│   │       ├── empty-state.tsx
│   │       └── page-header.tsx
│   │
│   ├── lib/
│   │   ├── utils.ts
│   │   ├── cn.ts
│   │   ├── formatters.ts
│   │   ├── validators.ts
│   │   └── constants.ts
│   │
│   ├── hooks/
│   │   ├── use-auth.ts
│   │   ├── use-parcels.ts
│   │   ├── use-offers.ts
│   │   ├── use-search.ts
│   │   └── use-notifications.ts
│   │
│   ├── services/
│   │   ├── api.ts
│   │   ├── auth.service.ts
│   │   ├── parcel.service.ts
│   │   ├── offer.service.ts
│   │   ├── search.service.ts
│   │   └── notification.service.ts
│   │
│   ├── store/
│   │   ├── auth-store.ts
│   │   ├── parcel-store.ts
│   │   ├── search-store.ts
│   │   └── notification-store.ts
│   │
│   ├── types/
│   │   ├── user.ts
│   │   ├── parcel.ts
│   │   ├── offer.ts
│   │   ├── document.ts
│   │   └── api.ts
│   │
│   └── animations/
│       ├── fade-in.tsx
│       ├── slide-in.tsx
│       ├── stagger-container.tsx
│       └── counter.tsx
│
├── prisma/
│   ├── schema.prisma
│   ├── migrations/
│   └── seed.ts
│
├── public/
│   ├── fonts/
│   └── images/
│
├── tests/
│   ├── unit/
│   ├── integration/
│   └── e2e/
│
├── .env.example
├── .env.local
├── package.json
├── tsconfig.json
├── tailwind.config.ts
├── next.config.js
└── README.md
```

---

## 13. Backend Architecture

### 13.1 NestJS Module Structure

```
src/
├── main.ts
├── app.module.ts
│
├── modules/
│   ├── auth/
│   │   ├── auth.module.ts
│   │   ├── auth.controller.ts
│   │   ├── auth.service.ts
│   │   ├── strategies/
│   │   │   └── jwt.strategy.ts
│   │   ├── guards/
│   │   │   └── jwt-auth.guard.ts
│   │   └── dto/
│   │
│   ├── users/
│   │   ├── users.module.ts
│   │   ├── users.controller.ts
│   │   ├── users.service.ts
│   │   └── dto/
│   │
│   ├── parcels/
│   │   ├── parcels.module.ts
│   │   ├── parcels.controller.ts
│   │   ├── parcels.service.ts
│   │   ├── parcels.service.ts
│   │   └── dto/
│   │
│   ├── offers/
│   │   ├── offers.module.ts
│   │   ├── offers.controller.ts
│   │   ├── offers.service.ts
│   │   └── dto/
│   │
│   ├── documents/
│   │   ├── documents.module.ts
│   │   ├── documents.controller.ts
│   │   ├── documents.service.ts
│   │   └── dto/
│   │
│   ├── search/
│   │   ├── search.module.ts
│   │   ├── search.controller.ts
│   │   ├── search.service.ts
│   │   └── dto/
│   │
│   ├── notifications/
│   │   ├── notifications.module.ts
│   │   ├── notifications.controller.ts
│   │   ├── notifications.service.ts
│   │   └── dto/
│   │
│   ├── verification/
│   │   ├── verification.module.ts
│   │   ├── verification.controller.ts
│   │   ├── verification.service.ts
│   │   └── dto/
│   │
│   ├── analytics/
│   │   ├── analytics.module.ts
│   │   ├── analytics.controller.ts
│   │   └── analytics.service.ts
│   │
│   ├── admin/
│   │   ├── admin.module.ts
│   │   ├── admin.controller.ts
│   │   ├── admin.service.ts
│   │   └── guards/
│   │       └── admin.guard.ts
│   │
│   └── audit/
│       ├── audit.module.ts
│       ├── audit.service.ts
│       └── interceptors/
│           └── audit.interceptor.ts
│
├── common/
│   ├── decorators/
│   ├── filters/
│   ├── guards/
│   ├── interceptors/
│   ├── pipes/
│   └── utils/
│
├── config/
│   ├── database.config.ts
│   ├── jwt.config.ts
│   ├── s3.config.ts
│   └── redis.config.ts
│
└── database/
    ├── prisma.service.ts
    └── prisma.module.ts
```

### 13.2 Government API Adapter Layer

```typescript
// modules/government-api/
// adapters/

interface GovernmentRecord {
  source: string;
  recordType: string;
  data: Record<string, any>;
  verifiedAt: Date;
  confidence: number;
}

interface GovernmentAdapter {
  fetchLandRecords(state: string, surveyNumber: string): Promise<GovernmentRecord[]>;
  fetchOwnershipChain(parcelId: string): Promise<OwnershipRecord[]>;
  fetchEncumbrances(parcelId: string): Promise<Encumbrance[]>;
  fetchLitigationStatus(parcelId: string): Promise<LitigationStatus>;
  fetchMarketValue(parcelId: string): Promise<MarketValue>;
}

// Adapters for different state APIs
class KarnatakaLandRecordsAdapter implements GovernmentAdapter {
  // Integration with B-Kindle API
}

class MaharashtraLandRecordsAdapter implements GovernmentAdapter {
  // Integration with Mahabhulekh API
}

class TamilNaduLandRecordsAdapter implements GovernmentAdapter {
  // Integration with TN Reg API
}

// Factory to get appropriate adapter
class GovernmentAPIFactory {
  static getAdapter(state: string): GovernmentAdapter {
    const adapters: Record<string, GovernmentAdapter> = {
      'Karnataka': new KarnatakaLandRecordsAdapter(),
      'Maharashtra': new MaharashtraLandRecordsAdapter(),
      'Tamil Nadu': new TamilNaduLandRecordsAdapter(),
      // ... more states
    };
 return adapters[state] || new DefaultLandRecordsAdapter();
  }
}
```

---

## 14. Security Architecture

### 14.1 Authentication& Authorization

```
┌─────────────────────────────────────────────────────────────┐
│                     AUTHENTICATION FLOW                      │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  User ──► Login Form ──► Credentials ──► Auth Service       │
│                                      │                       │
│                                      ▼                       │
│                              ┌───────────────┐               │
│                              │ Verify with   │               │
│                              │ Prisma + JWT │               │
│                              └───────┬───────┘               │
│                                      │                       │
│              ┌───────────────────────┼───────────────────┐  │
│              │                       │                   │  │
│              ▼                       ▼                   ▼  │
│        [Success]              [Invalid]           [Locked]   │
│              │                       │                   │   │
│              ▼                       ▼                   ▼   │
│      Generate JWT              Show Error         Track     │
│      Set HTTPOnly              + CAPTCHA         Attempts    │
│      Cookie + Refresh                                 │      │
│      Token                                              │      │
│              │                                    Lock     │
│              ▼                                    Account  │
│      Redirect to                                      │      │
│      Dashboard                                    After 5  │
│                                                      Fails  │
└─────────────────────────────────────────────────────────────┘
```

### 14.2 Role-Based Access Control

```typescript
// common/decorators/roles.decorator.ts
export const ROLES_KEY = 'roles';
export const Roles = (...roles: Role[]) => SetMetadata(ROLES_KEY, roles);

// common/guards/roles.guard.ts
@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllOf<Role>(ROLES_KEY, context);
    const { user } = context.switchToHttp().getRequest();
    return requiredRoles.some(role => user.role === role);
  }
}

// Usage in controllers
@Roles(Role.ADMIN, Role.SUPER_ADMIN)
@Controller('admin')
export class AdminController {}
```

### 14.3 API Security Measures

1. **Rate Limiting** — 100 requests/minute per user
2. **Input Validation** — Zod schemas for all inputs
3. **SQL Injection Prevention** — Prisma parameterized queries
4. **XSS Prevention** — React's built-in escaping + CSP headers
5. **CSRF Protection** — SameSite cookies + CSRF tokens
6. **File Upload Security** — Type validation, size limits, virus scanning
7. **Sensitive Data Encryption** — AES-256 for documents at rest
8. **TLS 1.3** — All traffic encrypted in transit

---

## 15. Audit Logging Architecture

### 15.1 Audit Event Types

```typescript
enum AuditAction {
  // Authentication
  USER_LOGIN = 'USER_LOGIN',
  USER_LOGOUT = 'USER_LOGOUT',
  LOGIN_FAILED = 'LOGIN_FAILED',
  
  // Parcels
  PARCEL_CREATED = 'PARCEL_CREATED',
  PARCEL_UPDATED = 'PARCEL_UPDATED',
  PARCEL_DELETED = 'PARCEL_DELETED',
  PARCEL_VIEWED = 'PARCEL_VIEWED',
  
  // Verification
  VERIFICATION_STARTED = 'VERIFICATION_STARTED',
  VERIFICATION_COMPLETED = 'VERIFICATION_COMPLETED',
  VERIFICATION_FAILED = 'VERIFICATION_FAILED',
  
  // Offers
  OFFER_CREATED = 'OFFER_CREATED',
  OFFER_COUNTERED = 'OFFER_COUNTERED',
  OFFER_ACCEPTED = 'OFFER_ACCEPTED',
  OFFER_DECLINED = 'OFFER_DECLINED',
  
  // Documents
  DOCUMENT_UPLOADED = 'DOCUMENT_UPLOADED',
  DOCUMENT_DOWNLOADED = 'DOCUMENT_DOWNLOADED',
  DOCUMENT_DELETED = 'DOCUMENT_DELETED',
  
  // Admin
  USER_CREATED = 'USER_CREATED',
  USER_UPDATED = 'USER_UPDATED',
  USER_ROLE_CHANGED = 'USER_ROLE_CHANGED',
  PERMISSION_CHANGED = 'PERMISSION_CHANGED',
}
```

### 15.2 Audit Logging Service

```typescript
// modules/audit/audit.service.ts
@Injectable()
export class AuditService {
  async log(event: AuditLogCreateInput) {
    return this.prisma.auditLog.create({
      data: {
        userId: event.userId,
        action: event.action,
        entityType: event.entityType,
        entityId: event.entityId,
        oldValues: event.oldValues,
        newValues: event.newValues,
        ipAddress: event.ipAddress,
        userAgent: event.userAgent,
      }
    });
  }
}

// Audit Interceptor for automatic logging
@Injectable()
export class AuditInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const method = request.method;
    const path = request.route.path;
    
    return next.handle().pipe(
      tap(response => {
        this.auditService.log({
          userId: request.user?.id,
          action: this.getActionFromMethod(method),
          entityType: this.getEntityFromPath(path),
          entityId: request.params?.id,
          ipAddress: request.ip,
          userAgent: request.headers['user-agent'],
        });
      })
    );
  }
}
```

---

## 16. Verification Engine Design

### 16.1 Land Health Score™ Algorithm

```typescript
interface HealthScoreInput {
  ownershipClarity: number;      // 0-100
  encumbranceStatus: number;     // 0-100
  recordCompleteness: number;    // 0-100
  mutationHistory: number;       // 0-100
  verificationConfidence: number; // 0-100
}

interface HealthScoreOutput {
  score: number;                // 0-100
  grade: 'A+' | 'A' | 'B+' | 'B' | 'C' | 'D';
  label: string;                // e.g., "Verified Acquisition Ready"
  factors: {
    name: string;
    contribution: number;
    status: 'positive' | 'neutral' | 'negative';
  }[];
  recommendations: string[];
}

function calculateLandHealthScore(input: HealthScoreInput): HealthScoreOutput {
  // Weighted scoring
  const weights = {
    ownershipClarity: 0.30,
    encumbranceStatus: 0.25,
    recordCompleteness: 0.20,
    mutationHistory: 0.15,
    verificationConfidence: 0.10,
  };
  
  const score = Object.entries(input).reduce((total, [key, value]) => {
    return total + (value * weights[key]);
  }, 0);
  
  // Determine grade
  let grade: HealthScoreOutput['grade'];
  let label: string;
  
  if (score >= 90) { grade = 'A+'; label = 'Verified Acquisition Ready'; }
  else if (score >= 80) { grade = 'A'; label = 'Ready for Acquisition'; }
  else if (score >= 70) { grade = 'B+'; label = 'Minor Verification Needed'; }
  else if (score >= 60) { grade = 'B'; label = 'Verification Recommended'; }
  else if (score >= 40) { grade = 'C'; label = 'Significant Concerns'; }
  else { grade = 'D'; label = 'High Risk - Not Recommended'; }
  
  return { score: Math.round(score), grade, label, factors: [], recommendations: [] };
}
```

### 16.2 Acquisition Readiness Index™

```typescript
type ReadinessStatus = 'READY' | 'CAUTION' | 'REQUIRES_REVIEW';

interface ReadinessInput {
  legalRisk: 'LOW' | 'MEDIUM' | 'HIGH';
  developmentPotential: 'LOW' | 'MEDIUM' | 'HIGH';
  infrastructureGrowth: 'LOW' | 'MEDIUM' | 'HIGH';
  connectivity: 'LOW' | 'MEDIUM' | 'HIGH';
  marketDemand: 'LOW' | 'MEDIUM' | 'HIGH';
}

function calculateReadinessIndex(input: ReadinessInput): ReadinessStatus {
  const scoreMap = { LOW: 3, MEDIUM: 2, HIGH: 1 };
  
  const scores = Object.values(input).map(v => scoreMap[v]);
  const total = scores.reduce((a, b) => a + b, 0);
  const average = total / scores.length;
  
  if (average >= 2.5) return 'READY';
  if (average >= 1.5) return 'CAUTION';
  return 'REQUIRES_REVIEW';
}
```

---

## 17. Search Architecture

### 17.1 Elasticsearch Index

```json
{
  "mappings": {
    "properties": {
      "id": { "type": "keyword" },
      "displayId": { "type": "keyword" },
      "state": { "type": "keyword" },
      "district": { "type": "keyword" },
      "tehsil": { "type": "keyword" },
      "village": { "type": "keyword" },
      "surveyNumber": { "type": "keyword" },
      "plotNumber": { "type": "keyword" },
      "khataNumber": { "type": "keyword" },
      "location": { "type": "geo_point" },
      "areaSqFt": { "type": "float" },
      "areaAcres": { "type": "float" },
      "zoning": { "type": "keyword" },
      "usageType": { "type": "keyword" },
      "askingPrice": { "type": "float" },
      "pricePerSqFt": { "type": "float" },
      "ownershipType": { "type": "keyword" },
      "landHealthScore": { "type": "integer" },
      "acquisitionReadiness": { "type": "keyword" },
      "verificationStatus": { "type": "keyword" },
      "status": { "type": "keyword" },
      "createdAt": { "type": "date" },
      "updatedAt": { "type": "date" },
      "textSearch": { "type": "text", "analyzer": "standard" }
    }
  }
}
```

### 17.2 Search Query Builder

```typescript
interface SearchFilters {
  state?: string[];
  district?: string[];
  tehsil?: string[];
  village?: string[];
  surveyNumber?: string;
  areaMin?: number;
  areaMax?: number;
  priceMin?: number;
  priceMax?: number;
  zoning?: string[];
  usageType?: string[];
  verificationStatus?: string[];
  ownershipType?: string[];
  landHealthScoreMin?: number;
  acquisitionReadiness?: string[];
  geoBounds?: {
    north: number;
    south: number;
    east: number;
    west: number;
  };
}

function buildSearchQuery(filters: SearchFilters) {
  const must: any[] = [];
  const filter: any[] = [];
  
  if (filters.state?.length) {
    filter.push({ terms: { state: filters.state } });
  }
  
  if (filters.district?.length) {
    filter.push({ terms: { district: filters.district } });
  }
  
  if (filters.areaMin || filters.areaMax) {
    filter.push({
      range: {
        areaSqFt: {
          gte: filters.areaMin,
          lte: filters.areaMax,
        }
      }
    });
  }
  
  if (filters.priceMin || filters.priceMax) {
    filter.push({
      range: {
        askingPrice: {
          gte: filters.priceMin,
          lte: filters.priceMax,
        }
      }
    });
  }
  
  if (filters.geoBounds) {
    filter.push({
      geo_bounding_box: {
        location: filters.geoBounds
      }
    });
  }
  
  return {
    bool: {
      must: must.length ? must : [{ match_all: {} }],
      filter,
    }
  };
}
```

---

## 18. Notification Architecture

### 18.1 Notification Types

```typescript
enum NotificationType {
  // Offers
  OFFER_RECEIVED = 'OFFER_RECEIVED',
  OFFER_COUNTERED = 'OFFER_COUNTERED',
  OFFER_ACCEPTED = 'OFFER_ACCEPTED',
  OFFER_DECLINED = 'OFFER_DECLINED',
  
  // Parcels
  PARCEL_MATCH = 'PARCEL_MATCH',
  PARCEL_VERIFIED = 'PARCEL_VERIFIED',
  PARCEL_PRICE_DROP = 'PARCEL_PRICE_DROP',
  
  // Documents
  DOCUMENT_UPLOADED = 'DOCUMENT_UPLOADED',
  DOCUMENT_VERIFIED = 'DOCUMENT_VERIFIED',
  
  // System
  SYSTEM_ANNOUNCEMENT = 'SYSTEM_ANNOUNCEMENT',
  SECURITY_ALERT = 'SECURITY_ALERT',
}
```

### 18.2 Notification Service

```typescript
@Injectable()
export class NotificationService {
  async send(notification: NotificationCreateInput) {
    // Store in database
    const dbNotification = await this.prisma.notification.create({
      data: notification
    });
    
    // Send email via Resend
    if (notification.type !== NotificationType.SECURITY_ALERT) {
      await this.emailService.send({
        to: notification.user.email,
        template: notification.type,
        data: notification.data,
      });
    }
    
    // Send push via Firebase
    await this.firebaseService.send({
      userId: notification.userId,
      title: notification.title,
      body: notification.message,
      data: notification.data,
    });
    
    return dbNotification;
  }
}
```

---

## 19. CRM Architecture

### 19.1 Lead Status Pipeline

```typescript
enum LeadStatus {
  NEW = 'NEW',
  CONTACTED = 'CONTACTED',
  QUALIFIED = 'QUALIFIED',
  MEETING_SCHEDULED = 'MEETING_SCHEDULED',
  PROPOSAL_SENT = 'PROPOSAL_SENT',
  NEGOTIATION = 'NEGOTIATION',
  CLOSED_WON = 'CLOSED_WON',
  CLOSED_LOST = 'CLOSED_LOST',
}

interface Lead {
  id: string;
  userId?: string;
  email: string;
  name: string;
  phone?: string;
  company?: string;
  type: 'BUYER' | 'SELLER' | 'BROKER' | 'INVESTOR';
  status: LeadStatus;
  source: string;
  assignedTo?: string;
  notes: string[];
  createdAt: Date;
  updatedAt: Date;
}
```

### 19.2 Activity Tracking

```typescript
interface Activity {
  id: string;
  leadId: string;
  type: 'CALL' | 'EMAIL' | 'MEETING' | 'NOTE' | 'OFFER';
  description: string;
  metadata: Record<string, any>;
  createdBy: string;
  createdAt: Date;
}
```

---

## 20. Analytics Architecture

### 20.1 Key Metrics

```typescript
interface PlatformMetrics {
  // Transaction Metrics
  totalTransactionVolume: number;
  transactionVolumeTrend: number; // % change
  averageDealSize: number;
  averageTimeToClose: number;           // days
  
  // Parcel Metrics
  totalParcels: number;
  parcelsVerified: number;
  verificationRate: number;
  averageLandHealthScore: number;
  
  // User Metrics
  totalUsers: number;
  activeUsers: number;
  userGrowthRate: number;
  retentionRate: number;
  
  // Offer Metrics
  totalOffers: number;
  offerConversionRate: number;
  averageOfferToAccepted: number;
  
  // Geographic Distribution
  topStates: { state: string; count: number }[];
  topDistricts: { district: string; count: number }[];
}
```

### 20.2 PostHog Integration

```typescript
// analytics/posthog.service.ts
import PostHog from 'posthog-node';

@Injectable()
export class AnalyticsService {
  private client: PostHog;
  
  constructor() {
    this.client = new PostHog(process.env.POSTHOG_API_KEY, {
      host: process.env.POSTHOG_HOST,
    });
  }
  
  track(event: string, properties?: Record<string, any>) {
    this.client.capture({
      event,
      properties: {
        ...properties,
        timestamp: new Date().toISOString(),
      },
    });
  }
  
  identify(user: User) {
    this.client.identify({
      userId: user.id,
      properties: {
        email: user.email,
        name: user.name,
        role: user.role,
      },
    });
  }
  
  // Page views
  trackPageView(path: string, userId?: string) {
    this.track('page_view', { path, userId });
  }
  
  // Parcel interactions
  trackParcelView(parcelId: string, userId?: string) {
    this.track('parcel_view', { parcelId, userId });
  }
  
  trackOfferMade(parcelId: string, amount: number, userId: string) {
    this.track('offer_made', { parcelId, amount, userId });
  }
  
  trackDealClosed(parcelId: string, amount: number, userId: string) {
    this.track('deal_closed', { parcelId, amount, userId });
  }
}
```

---

## 21. Mobile Strategy

### 21.1 Responsive Breakpoints

```css
/* Mobile First Approach */

/* Base styles (mobile) */
.container { padding: 16px; }

/* Tablet */
@media (min-width: 640px) {
  .container { padding: 24px; }
}

/* Desktop */
@media (min-width: 1024px) {
  .container { padding: 32px; }
}

/* Wide */
@media (min-width: 1440px) {
  .container { padding: 48px; max-width: 1440px; margin: 0 auto; }
}
```

### 21.2 Mobile-First Components

1. **Navigation** — Bottom tab bar on mobile, sidebar on desktop
2. **Search** — Full-screen search modal on mobile
3. **Maps** — Native map experience with gesture support
4. **Cards** — Stacked layout on mobile, grid on desktop
5. **Forms** — Native input styling, large touch targets
6. **Data Tables** — Horizontal scroll or card transformation

### 21.3 PWA Features

- Offline support for saved parcels
- Push notifications
- Biometric authentication
- Camera integration for document upload
- GPS for nearby parcel discovery

---

## 22. Development Roadmap

### Phase 1: MVP (Months 1-3)

**Goal:** Launch core discovery and verification experience

- [ ] Authentication system
- [ ] Basic parcel search and filtering
- [ ] Parcel details page
- [ ] Land Health Score™ calculation
- [ ] Document upload system
- [ ] Basic offer workflow
- [ ] User dashboard

### Phase 2: Transaction Layer (Months 4-6)

**Goal:** Complete transaction and negotiation workflows

- [ ] Full negotiation center
- [ ] Secure data room
- [ ] Legal review workflow
- [ ] E-signature integration
- [ ] Payment processing
- [ ] Email notifications

### Phase 3: Intelligence Layer (Months 7-9)

**Goal:** Advanced intelligence and analytics

- [ ] Ownership Intelligence Graph™
- [ ] Parcel Timeline™
- [ ] Acquisition Readiness Index™
- [ ] Analytics dashboard
- [ ] Custom reports
- [ ] Data export

### Phase 4: Scale (Months 10-12)

**Goal:** Scale to multiple states and enterprise features

- [ ] Multi-state support
- [ ] Government API integrations
- [ ] API access for enterprise
- [ ] Advanced admin controls
- [ ] Mobile app
- [ ] White-label options

---

## 23. MVP Plan

### Core Features for Launch

1. **Authentication**
   - Email/password signup and signin
   - Email verification
   - Password reset

2. **Land Discovery**
   - Search by state, district, village
   - Filter by area, price, zoning
   - List view, map view
   - Parcel cards with Land Health Score

3. **Parcel Details**
   - Full parcel information
   - Land Health Score display
   - Document viewer
   - Ownership preview
   - Offer submission

4. **User Dashboard**
   - Saved parcels
   - Active offers
   - Recent activity
   - Notifications

5. **Basic Verification**
   - Document upload
   - Admin verification queue
   - Verification status updates

### Excluded from MVP

- Complex negotiation workflows
- Legal review system
- Payment processing
- Multi-state support
- API access
- Mobile app
- Advanced analytics

---

## 24. Phase 2 Scaling Plan

### Infrastructure Scaling

1. **Database** — Read replicas, sharding by state
2. **Search** — Elasticsearch cluster with failover
3. **File Storage** — S3 with CloudFront CDN
4. **Compute** — Auto-scaling Kubernetes cluster
5. **Caching** — Redis cluster for session and API cache

### Feature Scaling

1. **Government APIs** — Adapter layer for each state
2. **Multi-tenancy** — Organization-level isolation
3. **Custom Roles** — Admin-configurable permissions
4. **Webhooks** — Event-based integrations
5. **API Access** — Public API for enterprise clients

### Team Scaling

1. **Engineering** — 8-12 engineers
2. **Product** — 2-3 product managers
3. **Design** — 2-3 designers
4. **Operations** — Verification team, support team
5. **Sales** — Enterprise sales team

---

## 25. Technical Implementation Notes

### 25.1 Next.js 15 App Router Structure

```
app/
├── (auth)/
│   └── layout.tsx      # Auth-specific layout (no sidebar)
├── (dashboard)/
│   └── layout.tsx      # Dashboard layout (with sidebar)
├── api/
│   └── [...proxy]/ # API routes
├── page.tsx            # Landing page
├── layout.tsx          # Root layout
└── globals.css         # Global styles + CSS variables
```

### 25.2 State Management

- **Server State** — TanStack Query for API data
- **UI State** — Zustand for global UI state
- **Form State** — React Hook Form + Zod
- **URL State** — nuqs for search filters in URL

### 25.3 Performance Targets

- **LCP** — < 2.5s
- **FID** — < 100ms
- **CLS** — < 0.1
- **TTI** — < 5s
- **Bundle Size** — < 200KB initial JS

---

*This document is the comprehensive specification for LANDGRID. All implementation must adhere to these guidelines. Updates to this document require review and approval from the product team.*

# LANDGRID - Land Intelligence & Transaction Operating System

<div align="center">
  <img src="public/logo.svg" alt="LANDGRID" width="200"/>
  
  **Land Intelligence. Acquisition. Trust.**
  
  India's first Land Intelligence & Transaction Operating System
</div>

---

## 🚀 Tech Stack

### Frontend
- **Next.js 15** - React 19 framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling
- **Shadcn UI** - High-quality component library
- **Framer Motion** - Premium animations

### Backend
- **NestJS** - Enterprise-grade Node.js framework
- **Prisma** - Type-safe database ORM
- **PostgreSQL** - Relational database
- **Auth.js** - Authentication

### Infrastructure
- **AWS S3** - Document storage
- **Elasticsearch** - Search engine
- **Mapbox** - Mapping solutions
- **Resend** - Email delivery
- **Firebase** - Push notifications
- **PostHog** - Analytics

---

## 📁 Project Structure

```
landgrid/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── (auth)/            # Auth routes
│   │   ├── (dashboard)/       # Dashboard routes
│   │   ├── api/              # API routes
│   │   ├── page.tsx          # Landing page
│   │   ├── layout.tsx        # Root layout
│   │   └── globals.css       # Global styles
│   │
│   ├── components/
│   │   ├── ui/               # Shadcn components
│   │   ├── layout/           # Layout components
│   │   ├── discovery/        # Discovery components
│   │   ├── parcel/           # Parcel components
│   │   ├── negotiation/      # Negotiation components
│   │   ├── dashboard/        # Dashboard components
│   │   ├── admin/            # Admin components
│   │   └── animations/       # Animation components
│   │
│   ├── lib/                  # Utilities
│   ├── hooks/                # Custom hooks
│   ├── services/             # API services
│   ├── store/                # State management
│   ├── types/                # TypeScript types
│   └── animations/           # Animation utilities
│
├── prisma/
│   ├── schema.prisma         # Database schema
│   └── seed.ts               # Seed data
│
└── server/                   # NestJS backend
```

---

## 🎨 Design System

### Colors

| Color | Hex | Usage |
|-------|-----|-------|
| Black | `#000000` | Primary background |
| White | `#FFFFFF` | Text, cards |
| Orange | `#FF6A00` | CTAs, active states |
| Gray 100 | `#171717` | Elevated surfaces |
| Gray 200 | `#262626` | Borders |
| Gray 300 | `#404040` | Disabled states |
| Gray 500 | `#737373` | Secondary text |
| Gray 150 | `#E5E5E5` | Light borders |
| Gray 50 | `#F5F5F5` | Light backgrounds |

### Typography

- **Display**: Instrument Serif, 72px
- **Headings**: Instrument Serif, 48/36/24px
- **Body**: Inter, 18/16/14px
- **Mono**: JetBrains Mono, 14px

---

## ✨ Key Features

### 1. Land Health Score™
Comprehensive score (0-100) evaluating:
- Ownership clarity
- Encumbrance status
- Record completeness
- Mutation history
- Verification confidence

### 2. Acquisition Readiness Index™
Status indicator:
- **READY** - Low risk, high potential
- **CAUTION** - Review required
- **REQUIRES REVIEW** - High risk, significant concerns

### 3. Ownership Intelligence Graph™
Interactive visualization of ownership relationships across time.

### 4. Parcel Timeline™
GitHub-style commit history showing all parcel activity.

### 5. Secure Data Room
M&A-style document management for each parcel.

---

## 🛠️ Getting Started

### Prerequisites

- Node.js 20+
- pnpm 8+
- PostgreSQL 15+
- Redis 7+

### Installation

```bash
# Clone the repository
git clone https://github.com/landgrid-platform/platform.git
cd landgrid

# Install dependencies
pnpm install

# Set up environment variables
cp .env.example .env.local

# Generate Prisma client
pnpm prisma generate

# Run migrations
pnpm prisma migrate dev

# Start development server
pnpm dev
```

### Environment Variables

```env
# Database
DATABASE_URL="postgresql://..."

# Auth
AUTH_SECRET="..."

# AWS S3
AWS_ACCESS_KEY_ID="..."
AWS_SECRET_ACCESS_KEY="..."
AWS_S3_BUCKET="..."
AWS_REGION="..."

# Mapbox
NEXT_PUBLIC_MAPBOX_TOKEN="..."

# Resend
RESEND_API_KEY="..."

# PostHog
NEXT_PUBLIC_POSTHOG_KEY="..."
POSTHOG_API_KEY="..."
```

---

## 📱 Pages Overview

| Route | Description |
|-------|-------------|
| `/` | Landing page |
| `/signin` | User authentication |
| `/signup` | User registration |
| `/discover` | Land discovery |
| `/map` | Map view |
| `/parcel/[id]` | Parcel details |
| `/parcel/[id]/data-room` | Secure data room |
| `/negotiations` | Negotiation center |
| `/dashboard/buyer` | Buyer dashboard |
| `/dashboard/seller` | Seller dashboard |
| `/dashboard/broker` | Broker dashboard |
| `/admin` | Admin control center |
| `/settings` | User settings |

---

## 🔐 Security

- **Authentication**: JWT with refresh tokens
- **Authorization**: Role-based access control (RBAC)
- **Data Protection**: AES-256 encryption at rest
- **Transport**: TLS 1.3
- **Audit**: Comprehensive logging of all actions

---

## 📊 License

MIT License - See [LICENSE](LICENSE) for details.

---

<div align="center">
  <p>
    Built with precision. Designed for trust.
  </p>
  <p>
    <strong>LANDGRID</strong>
  </p>
</div>
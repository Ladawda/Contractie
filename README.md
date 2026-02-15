# Contractie

A marketplace connecting verified contractors with serious homeowners.

## The Problem

- Homeowners struggle to find trustworthy, licensed contractors
- Contractors waste time on unqualified leads
- Existing platforms are flooded with unverified workers

## The Solution

Contractie is a marketplace where:
- **Contractors** create verified profiles with licenses, past work, and photos (free)
- **Homeowners** post jobs with a $25 fee + deposit (ensures serious inquiries)
- **Matching** happens by location and trade

## MVP Scope

**What's In:**
- Contractor signup with license upload
- Homeowner job posting with Stripe payment
- Browse jobs by zip code
- Express interest (no messaging yet)
- Manual license verification

**What's Out (for now):**
- In-app messaging
- Reviews/ratings
- Escrow payments
- Mobile apps
- Automated matching

## Business Model

- Homeowners pay $25 to post a job
- Contractors join free
- Future: percentage of completed jobs

## Tech Stack

- **Frontend**: Next.js 14 + Tailwind CSS
- **Backend**: Next.js API routes
- **Database**: Supabase (PostgreSQL + Auth + Storage)
- **Payments**: Stripe Checkout
- **Hosting**: Vercel

## Documentation

### Product Docs (`/docs`)
- [PROJECT_OVERVIEW.md](./docs/PROJECT_OVERVIEW.md) - Problem, solution, market
- [MVP_FEATURES.md](./docs/MVP_FEATURES.md) - What's in/out of scope
- [USER_FLOWS.md](./docs/USER_FLOWS.md) - Step-by-step user journeys
- [DATABASE_SCHEMA.md](./docs/DATABASE_SCHEMA.md) - SQL tables
- [PAGE_LIST.md](./docs/PAGE_LIST.md) - All pages needed
- [MANUAL_PROCESSES.md](./docs/MANUAL_PROCESSES.md) - What you'll handle by hand
- [LAUNCH_CHECKLIST.md](./docs/LAUNCH_CHECKLIST.md) - 4-week launch plan

### Technical Docs (`/tech`)
- [QUICK_START.md](./tech/QUICK_START.md) - Setup commands
- [FILE_STRUCTURE.md](./tech/FILE_STRUCTURE.md) - Folder organization
- [KEY_COMPONENTS.md](./tech/KEY_COMPONENTS.md) - Component pseudocode
- [SUPABASE_SETUP.md](./tech/SUPABASE_SETUP.md) - Database SQL
- [STRIPE_SETUP.md](./tech/STRIPE_SETUP.md) - Payment setup
- [DEPLOY.md](./tech/DEPLOY.md) - Vercel deployment

## Quick Start

```bash
# 1. Create project
npx create-next-app@latest contractie --typescript --tailwind --app

# 2. Install dependencies
npm install @supabase/supabase-js @supabase/auth-helpers-nextjs stripe

# 3. Setup environment variables
# See tech/QUICK_START.md for full list

# 4. Run dev server
npm run dev
```

## Launch Timeline

**Week 1**: Setup + Database + Auth
**Week 2**: Core pages + Stripe
**Week 3**: Polish + Test
**Week 4**: Launch + First contractors

See [LAUNCH_CHECKLIST.md](./docs/LAUNCH_CHECKLIST.md) for daily tasks.

## Manual Processes (MVP)

You'll handle these by hand initially (~5 hrs/week):
- License verification (check state databases)
- Contractor approval
- Dispute resolution
- Customer support

## License

Proprietary - All rights reserved

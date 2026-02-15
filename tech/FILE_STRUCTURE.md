# Contractie MVP - File Structure

```
contractie/
├── app/                          # Next.js App Router
│   ├── page.tsx                  # Landing page
│   ├── layout.tsx                # Root layout with providers
│   ├── globals.css               # Global styles
│   │
│   ├── contractors/              # Contractor routes
│   │   ├── signup/
│   │   │   └── page.tsx          # Contractor registration
│   │   ├── profile/
│   │   │   └── page.tsx          # Edit contractor profile
│   │   └── browse-jobs/
│   │       └── page.tsx          # Job listing for contractors
│   │
│   ├── homeowners/               # Homeowner routes
│   │   ├── signup/
│   │   │   └── page.tsx          # Homeowner registration
│   │   └── post-job/
│   │       └── page.tsx          # Create job + payment
│   │
│   ├── jobs/                     # Public job routes
│   │   ├── page.tsx              # Job board (public)
│   │   └── [id]/
│   │       └── page.tsx          # Job detail page
│   │
│   └── api/                      # API routes
│       ├── auth/
│       │   ├── callback/
│       │   │   └── route.ts      # OAuth callback
│       │   └── signup/
│       │       └── route.ts      # Signup handler
│       ├── jobs/
│       │   ├── route.ts          # Create/List jobs
│       │   └── [id]/
│       │       ├── route.ts      # Get/Update job
│       │       └── apply/
│       │           └── route.ts  # Express interest
│       └── payments/
│           ├── checkout/
│           │   └── route.ts      # Create Stripe checkout
│           └── webhook/
│               └── route.ts      # Stripe webhook handler
│
├── components/                   # React components
│   ├── ui/                       # Base UI components
│   │   ├── Button.tsx
│   │   ├── Input.tsx
│   │   ├── Card.tsx
│   │   └── Badge.tsx
│   │
│   ├── forms/                    # Form components
│   │   ├── ContractorSignupForm.tsx
│   │   ├── HomeownerSignupForm.tsx
│   │   ├── JobPostForm.tsx
│   │   └── ProfileForm.tsx
│   │
│   └── cards/                    # Card components
│       ├── JobCard.tsx
│       ├── ContractorCard.tsx
│       └── JobDetailCard.tsx
│
├── lib/                          # Utilities & clients
│   ├── supabase.ts               # Supabase client
│   ├── supabase-server.ts        # Server-side Supabase
│   ├── stripe.ts                 # Stripe client
│   └── utils.ts                  # Helper functions
│
├── types/                        # TypeScript types
│   └── index.ts                  # All type definitions
│
├── public/                       # Static assets
│   └── images/
│
├── .env.local                    # Environment variables
├── next.config.js                # Next.js config
├── tailwind.config.ts            # Tailwind config
└── tsconfig.json                 # TypeScript config
```

## Key Files Explained

| File | Purpose |
|------|---------|
| `app/page.tsx` | Landing with CTA for homeowners/contractors |
| `app/layout.tsx` | Root layout, Supabase provider setup |
| `lib/supabase.ts` | Browser + server Supabase clients |
| `lib/stripe.ts` | Stripe SDK initialization |
| `types/index.ts` | TypeScript interfaces for all data |
| `app/api/payments/webhook/route.ts` | Stripe webhook for payment confirmation |

## Route Map

| URL | Purpose | Auth Required |
|-----|---------|---------------|
| `/` | Landing page | No |
| `/contractors/signup` | Contractor registration | No |
| `/contractors/profile` | Edit profile | Yes (contractor) |
| `/contractors/browse-jobs` | Browse jobs | Yes (contractor) |
| `/homeowners/signup` | Homeowner registration | No |
| `/homeowners/post-job` | Post a job + pay | Yes (homeowner) |
| `/jobs` | Public job board | No |
| `/jobs/[id]` | Job detail | No |

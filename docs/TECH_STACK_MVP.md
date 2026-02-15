# Tech Stack - MVP

> **Philosophy**: Ship fast. No premature optimization. One person can build this in 2 weeks.

## Frontend
- **Next.js 14** (App Router)
- **Tailwind CSS** (styling)
- **shadcn/ui** or **Headless UI** (components)
- **React Hook Form** (forms)
- **Zod** (validation)

## Backend
- **Next.js API Routes** (no separate server)
- **Server Actions** for form submissions
- **NextAuth.js** or **Supabase Auth** (authentication)

## Database
- **Supabase** (PostgreSQL)
  - Auth included
  - Row Level Security (RLS)
  - Real-time subscriptions (if needed later)

## Payments
- **Stripe Checkout**
  - Hosted payment page
  - Webhooks for confirmation
  - No complex payment UI to build

## File Storage
- **Supabase Storage**
  - Contractor photos
  - License documents (if uploaded)

## Hosting
- **Vercel**
  - Deploy from GitHub
  - Automatic preview deployments
  - Edge functions if needed

## Email (Optional for MVP)
- **Resend** or **SendGrid**
- Or skip: manual email for first users

---

## ❌ NOT USING (Keep It Simple)

| Technology | Why Not |
|------------|---------|
| Redis | No caching needed yet |
| Queue (Bull, etc.) | Process sync for MVP |
| Microservices | Monolith all the way |
| Kubernetes | Vercel handles infra |
| GraphQL | REST is fine |
| Separate API server | Next.js API routes sufficient |
| WebSocket server | Polling or manual refresh |
| Elasticsearch | Postgres text search |
| CDN (CloudFront, etc.) | Vercel edge is enough |

---

## Project Structure

```
contractie/
├── app/
│   ├── (marketing)/
│   │   ├── page.tsx           # Landing page
│   │   └── layout.tsx
│   ├── (auth)/
│   │   ├── login/
│   │   ├── signup/
│   │   └── contractor/
│   ├── dashboard/
│   │   ├── homeowner/
│   │   └── contractor/
│   ├── jobs/
│   │   ├── page.tsx           # Job board
│   │   └── [id]/
│   ├── api/
│   │   ├── auth/
│   │   ├── stripe/
│   │   └── webhooks/
│   └── admin/
├── components/
│   └── ui/
├── lib/
│   ├── supabase.ts
│   ├── stripe.ts
│   └── utils.ts
├── types/
└── public/
```

---

## Environment Variables

```bash
# Supabase
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=

# Stripe
STRIPE_SECRET_KEY=
STRIPE_PUBLISHABLE_KEY=
STRIPE_WEBHOOK_SECRET=
NEXT_PUBLIC_STRIPE_PRICE_ID=

# App
NEXT_PUBLIC_APP_URL=
```

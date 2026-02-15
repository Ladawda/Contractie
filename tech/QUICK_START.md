# Contractie MVP - Quick Start

## Step 1: Create Project

```bash
npx create-next-app@latest contractie --typescript --tailwind --app
```

Select these options:
- TypeScript: Yes
- ESLint: Yes
- Tailwind CSS: Yes
- `src/` directory: No
- App Router: Yes
- Import alias: Yes (default `@/*`)

## Step 2: Install Dependencies

```bash
cd contractie
npm install @supabase/supabase-js @supabase/auth-helpers-nextjs stripe
npm install -D @types/node
```

## Step 3: Setup Supabase

1. Go to https://supabase.com
2. Click "New Project"
3. Name it "contractie"
4. Choose a region close to you
5. Wait for project creation (~2 min)
6. Go to Project Settings → API
7. Copy:
   - `Project URL` → `NEXT_PUBLIC_SUPABASE_URL`
   - `anon public` → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `service_role secret` → `SUPABASE_SERVICE_ROLE_KEY`

## Step 4: Setup Stripe

1. Go to https://dashboard.stripe.com
2. Create account (use test mode)
3. Go to Developers → API keys
4. Copy:
   - `Publishable key` → `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
   - `Secret key` → `STRIPE_SECRET_KEY`
5. Go to Products → Add Product
   - Name: "Job Posting"
   - Price: $25.00 (one-time)
   - Copy Price ID → `STRIPE_PRICE_ID`
6. Go to Developers → Webhooks → Add endpoint
   - Endpoint URL: `https://your-domain.com/api/payments/webhook` (local: use Stripe CLI)
   - Events: `checkout.session.completed`
   - Copy Signing secret → `STRIPE_WEBHOOK_SECRET`

## Step 5: Environment Variables

Create `.env.local` in project root:

```bash
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# Stripe
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...
STRIPE_PRICE_ID=price_...
STRIPE_WEBHOOK_SECRET=whsec_...

# App
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

## Step 6: Run Dev

```bash
npm run dev
```

Open http://localhost:3000

## Quick Test

1. Visit `/homeowners/signup` → create homeowner account
2. Visit `/homeowners/post-job` → post a job (test card: `4242 4242 4242 4242`)
3. Visit `/contractors/signup` → create contractor account
4. Visit `/jobs` → browse jobs
5. Click "Express Interest" on a job

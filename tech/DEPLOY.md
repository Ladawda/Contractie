# Contractie MVP - Deployment Guide

## 1. Prepare for Production

### Update next.config.js

```js
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*.supabase.co',
        pathname: '/storage/v1/object/public/**'
      }
    ]
  }
}

module.exports = nextConfig
```

### Update Environment Variables for Production

Create `.env.production` (don't commit secrets):

```bash
# Supabase (production project)
NEXT_PUBLIC_SUPABASE_URL=https://your-prod-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-prod-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-prod-service-role-key

# Stripe (live mode)
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_...
STRIPE_SECRET_KEY=sk_live_...
STRIPE_PRICE_ID=price_live_...
STRIPE_WEBHOOK_SECRET=whsec_live_...

# App
NEXT_PUBLIC_APP_URL=https://your-domain.com
```

## 2. Push to GitHub

```bash
# Initialize git (if not already)
git init
git add .
git commit -m "Initial commit - Contractie MVP"

# Create repo on GitHub, then:
git remote add origin https://github.com/YOUR_USERNAME/contractie.git
git branch -M main
git push -u origin main
```

## 3. Deploy to Vercel

### Option A: Vercel Dashboard (Recommended)

1. Go to https://vercel.com/new
2. Import your GitHub repository
3. Configure project:
   - Framework Preset: Next.js
   - Root Directory: ./ (or contractie/ if monorepo)
4. Add Environment Variables (copy from `.env.production`):
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`
   - `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
   - `STRIPE_SECRET_KEY`
   - `STRIPE_PRICE_ID`
   - `STRIPE_WEBHOOK_SECRET`
   - `NEXT_PUBLIC_APP_URL` (set to your Vercel domain)
5. Click "Deploy"

### Option B: Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy
vercel --prod

# Follow prompts to link project
```

## 4. Update Stripe Webhook

After deployment:

1. Go to https://dashboard.stripe.com/webhooks
2. Edit your webhook endpoint
3. Update URL to: `https://your-vercel-domain.com/api/payments/webhook`
4. Test the endpoint

## 5. Update Supabase Auth Redirects

1. Go to Supabase Dashboard → Authentication → URL Configuration
2. Add your production domain to:
   - Site URL: `https://your-vercel-domain.com`
   - Redirect URLs: `https://your-vercel-domain.com/**`

## 6. Custom Domain (Optional)

1. In Vercel Dashboard → Project → Settings → Domains
2. Add your custom domain
3. Follow DNS configuration instructions
4. Update `NEXT_PUBLIC_APP_URL` env var to custom domain
5. Update Stripe webhook URL
6. Update Supabase auth redirects

## 7. Post-Deploy Checklist

- [ ] Landing page loads
- [ ] Contractor signup works
- [ ] Homeowner signup works
- [ ] Job posting + payment flows end-to-end
- [ ] Stripe webhook receiving events (check Stripe dashboard)
- [ ] Jobs appear in browse page after payment
- [ ] Contractor can express interest
- [ ] Images upload to Supabase Storage

## 8. Monitoring

### Vercel Analytics
Enable in Vercel Dashboard → Analytics

### Supabase Logs
Dashboard → Database → Logs

### Stripe Dashboard
https://dashboard.stripe.com/payments

## 9. Quick Rollback

If something breaks:

```bash
# Via Vercel CLI
vercel --version <previous-deployment-id>

# Or in Vercel Dashboard → Deployments → Click "..." → Promote to Production
```

## 10. Environment Summary

| Environment | URL | Stripe Mode | Supabase Project |
|-------------|-----|-------------|------------------|
| Local | localhost:3000 | Test | Dev project |
| Preview | *.vercel.app | Test | Dev project |
| Production | your-domain.com | Live | Prod project |

---

**You're live!** 🚀

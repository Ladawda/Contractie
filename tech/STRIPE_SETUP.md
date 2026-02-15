# Contractie MVP - Stripe Setup

## 1. Create Stripe Account

1. Go to https://dashboard.stripe.com/register
2. Sign up (use test mode for development)
3. Complete basic profile

## 2. Get API Keys

1. Go to https://dashboard.stripe.com/test/apikeys
2. Copy keys to `.env.local`:

```bash
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...
```

## 3. Create Product & Price

### Option A: Via Dashboard
1. Go to https://dashboard.stripe.com/test/products
2. Click "Add product"
3. Name: "Job Posting"
4. Description: "Post your home improvement job and get matched with contractors"
5. Price: $25.00 USD
6. Pricing model: Standard pricing
7. Click "Save product"
8. Copy the **Price ID** (starts with `price_`)

### Option B: Via API

```bash
curl https://api.stripe.com/v1/products \
  -u sk_test_YOUR_SECRET_KEY: \
  -d name="Job Posting" \
  -d description="Post your home improvement job"

# Then create price for that product
curl https://api.stripe.com/v1/prices \
  -u sk_test_YOUR_SECRET_KEY: \
  -d product=prod_YOUR_PRODUCT_ID \
  -d unit_amount=2500 \
  -d currency=usd
```

Add to `.env.local`:
```bash
STRIPE_PRICE_ID=price_...
```

## 4. Checkout Session API

```ts
// app/api/payments/checkout/route.ts
import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { createServerClient } from '@/lib/supabase'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16'
})

export async function POST(req: NextRequest) {
  try {
    const { job_id } = await req.json()
    const supabase = createServerClient()

    // Get job details
    const { data: job } = await supabase
      .from('jobs')
      .select('*')
      .eq('id', job_id)
      .single()

    if (!job) {
      return NextResponse.json({ error: 'Job not found' }, { status: 404 })
    }

    // Create checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price: process.env.STRIPE_PRICE_ID!,
          quantity: 1
        }
      ],
      mode: 'payment',
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/jobs/${job_id}?success=true`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/homeowners/post-job?canceled=true`,
      metadata: {
        job_id: job_id
      }
    })

    // Save session ID to payments table
    await supabase.from('payments').insert({
      job_id: job_id,
      stripe_session_id: session.id,
      amount: 2500, // $25.00 in cents
      status: 'pending'
    })

    return NextResponse.json({ url: session.url })
  } catch (error) {
    console.error('Checkout error:', error)
    return NextResponse.json(
      { error: 'Failed to create checkout session' },
      { status: 500 }
    )
  }
}
```

## 5. Webhook Handler

```ts
// app/api/payments/webhook/route.ts
import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { createServerClient } from '@/lib/supabase'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16'
})

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!

export async function POST(req: NextRequest) {
  const payload = await req.text()
  const signature = req.headers.get('stripe-signature')!

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(payload, signature, webhookSecret)
  } catch (err: any) {
    console.error('Webhook signature verification failed:', err.message)
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
  }

  const supabase = createServerClient()

  switch (event.type) {
    case 'checkout.session.completed': {
      const session = event.data.object as Stripe.Checkout.Session
      const jobId = session.metadata?.job_id

      if (jobId) {
        // Update payment status
        await supabase
          .from('payments')
          .update({
            status: 'succeeded',
            stripe_payment_intent_id: session.payment_intent as string
          })
          .eq('stripe_session_id', session.id)

        // Activate the job
        await supabase
          .from('jobs')
          .update({ status: 'open' })
          .eq('id', jobId)

        console.log(`Payment succeeded for job ${jobId}`)
      }
      break
    }

    case 'checkout.session.expired': {
      const session = event.data.object as Stripe.Checkout.Session
      
      await supabase
        .from('payments')
        .update({ status: 'failed' })
        .eq('stripe_session_id', session.id)
      
      break
    }

    case 'charge.refunded': {
      const charge = event.data.object as Stripe.Charge
      
      await supabase
        .from('payments')
        .update({ status: 'refunded' })
        .eq('stripe_payment_intent_id', charge.payment_intent as string)
      
      break
    }
  }

  return NextResponse.json({ received: true })
}

// Disable body parsing for webhook
export const config = {
  api: {
    bodyParser: false
  }
}
```

## 6. Webhook Setup

### Production (Vercel)

1. Deploy your app first
2. Go to https://dashboard.stripe.com/webhooks
3. Click "Add endpoint"
4. Endpoint URL: `https://your-domain.com/api/payments/webhook`
5. Select events:
   - `checkout.session.completed`
   - `checkout.session.expired`
   - `charge.refunded` (optional)
6. Click "Add endpoint"
7. Copy "Signing secret" → `STRIPE_WEBHOOK_SECRET`

### Local Development

Use Stripe CLI to forward webhooks:

```bash
# Install Stripe CLI
brew install stripe/stripe-cli/stripe  # macOS
# or download from https://stripe.com/docs/stripe-cli

# Login
stripe login

# Forward webhooks to local dev server
stripe listen --forward-to localhost:3000/api/payments/webhook

# This will output a webhook signing secret, copy it:
# > Ready! Your webhook signing secret is whsec_xxx
```

Add to `.env.local`:
```bash
STRIPE_WEBHOOK_SECRET=whsec_...  # From stripe listen command
```

## 7. Test Cards

Use these test cards in Stripe test mode:

| Card Number | Scenario |
|-------------|----------|
| `4242 4242 4242 4242` | Success |
| `4000 0000 0000 0002` | Declined |
| `4000 0000 0000 9995` | Insufficient funds |

Use any future expiry date, any 3-digit CVC, any ZIP.

## 8. Complete .env.local

```bash
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://...
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
SUPABASE_SERVICE_ROLE_KEY=eyJ...

# Stripe
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...
STRIPE_PRICE_ID=price_...
STRIPE_WEBHOOK_SECRET=whsec_...

# App
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

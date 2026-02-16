# Contractie - Client User Flow

## Overview

Complete user journey for **Clients** (anyone posting jobs) — homeowners, property managers, business owners, real estate investors, or anyone needing contractor work.

---

## Pricing

| Tier | Price | Features |
|------|-------|----------|
| **Launch Promo** | **FREE** | First month free for all job posts |
| **Regular** | **$10 per job post** | One-time fee, no recurring charges |

---

## Phase 1: Discovery

### Entry Points

| Source | Search Query | Landing Experience |
|--------|--------------|-------------------|
| Google SEO | "flooring contractor near me" | Local contractor directory |
| Google SEO | "licensed plumber [city]" | City-specific landing page |
| Google SEO | "property management contractors" | Commercial focus page |
| Referral | Direct link | Generic landing |
| Social | Facebook/Nextdoor post | Campaign landing |

### Landing Page (`/`)

**Hero Section:**
- Headline: "Find Verified Contractors for Any Project"
- Subheadline: "Property managers, homeowners, businesses — get quotes from licensed pros in your area."
- CTAs:
  - Primary: "Post a Job" (for job posters)
  - Secondary: "Join as Contractor" (for contractors)

**Launch Promo Banner:**
🎉 **GRAND OPENING** — Post your first job FREE this month!

**Trust Signals:**
- "Join 1,000+ property managers finding reliable contractors"
- "Verified licenses • No middleman fees • Direct contact"

---

## Phase 2: Onboarding

### Step 1: Account Creation

**Route**: `/signup?type=client`

**Options:**
- Email + Password
- Continue with Google
- Continue with Apple

**Fields:**
- Email
- Password
- Account Type (can change later):
  - Homeowner
  - Property Manager
  - Business Owner
  - Real Estate Investor
  - Other (text input)

### Step 2: Email Verification
Same flow as before.

### Step 3: Profile Setup

**Route**: `/onboarding/client/profile`

**Fields:**
```typescript
{
  fullName: string;           // Required
  companyName: string;        // Optional (for PMs/businesses)
  phone: string;              // Required
  preferredContact: 'phone' | 'text' | 'email';
  primaryZipCode: string;     // Required
  accountType: string;        // From signup, editable
}
```

---

## Phase 3: Job Posting

### Job Post Wizard

**Route**: `/post-job`

**Step 1: Job Basics**
```typescript
{
  title: string;              // e.g., "Bathroom renovation - 2 units"
  trade: string;              // Select from list
  description: string;        // Textarea, min 50 chars
  jobType: 'residential' | 'commercial' | 'multi-family';
}
```

**Step 2: Location**
```typescript
{
  address: string;            // Street address
  city: string;
  state: string;
  zipCode: string;
  // Pre-filled from profile, editable
}
```

**Step 3: Timeline & Budget**
```typescript
{
  timeline: 'asap' | 'within-week' | 'within-month' | 'flexible';
  budgetMin: number;          // Optional
  budgetMax: number;          // Optional
  budgetType: 'fixed' | 'hourly' | 'not-sure';
}
```

**Step 4: Photos (Optional)**
- Upload up to 5 photos
- Drag & drop

**Step 5: Review & Payment**

**Review Card:**
```
+------------------------+
| Job Summary            |
| Title: [title]         |
| Trade: [trade]         |
| Location: [address]    |
| Budget: [range]        |
| Photos: [count]        |
+------------------------+
| Payment                |
| Job posting fee: $10   |
| [Pay with Stripe]      |
+------------------------+
```

**Launch Promo:** "FREE — Grand Opening Offer"

**Success:**
- Job posted
- Confirmation email
- Redirect to dashboard

---

## Phase 4: Contractor Matching

### Client Dashboard

**URL**: `/dashboard`

**Sections:**

**Active Jobs:**
```
+------------------------+
| [Job Title]            |
| Status: [Open/Filled]  |
| 3 contractors interested|
| [Review Applicants]    |
+------------------------+
```

**Applicant Review:**
- Contractor cards with:
  - Name, photo
  - License verified badge
  - Years experience
  - Past job photos
  - "View Profile" button
  - "Contact" button

**Contact Flow:**
1. Client clicks "Contact" on contractor
2. System emails both parties with intro
3. They communicate off-platform
4. Client marks job as "Contractor Selected"

---

## Phase 5: Project Execution

### Job Status Tracking

**Statuses:**
- Open (accepting interest)
- Reviewing (evaluating contractors)
- Contractor Selected
- In Progress
- Completed
- Cancelled

**Client Actions:**
- Mark as "Contractor Selected"
- Mark as "In Progress"
- Mark as "Completed"
- Cancel job (if no contractor selected, refund issued)

---

## Refund Policy

If no contractor expresses interest in 7 days:
- Automatic credit for another free post
- Email notification with option to boost visibility

---

## Summary

The **Client** flow supports:
- ✅ Homeowners with single projects
- ✅ Property managers with portfolios
- ✅ Business owners with commercial needs
- ✅ Real estate investors with flips/renovations
- ✅ Anyone else needing contractor work

**Key Differentiator:** $10 flat fee (FREE launch month) vs $50-100/lead on competitor platforms.

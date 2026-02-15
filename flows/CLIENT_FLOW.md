# Contractie - Client User Flow

## Overview

Complete user journey for **Clients** (anyone posting jobs) — homeowners, property managers, business owners, real estate investors, or anyone needing contractor work.

---

## Terminology

| Old Term | New Term | Description |
|----------|----------|-------------|
| Homeowner | **Client** | Anyone posting a job |
| Homeowner Dashboard | **Client Dashboard** | Job poster interface |
| Post a Job | **Post a Job** | (same, but open to all) |

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

**Audience Selector (Optional):**
```
I am a... [dropdown]
- Homeowner
- Property Manager
- Business Owner
- Real Estate Investor
- Other
```

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

**Why Account Type Matters:**
- Determines default job settings
- Shows relevant testimonials
- Future: Commercial vs residential features

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

**Conditional Fields:**
- If Property Manager: "Number of units managed" (optional)
- If Business: "Industry" (optional)
- If Investor: "Portfolio size" (optional)

**Purpose:**
- Helps contractors understand the client
- Used for matching (future feature)
- Analytics on user base

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
- Help text: "Photos help contractors provide accurate quotes"

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
| Job posting fee: $25   |
| [Pay with Stripe]      |
+------------------------+
```

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

### Follow-up Emails

**Day 7:** "How's your project going?"
**Day 30:** "Mark your job as complete?"
**Day 60:** "Leave a testimonial for your contractor?"

---

## Phase 6: Completion

### Mark Complete

**Modal:**
- "Was this job completed successfully?"
- Yes / No / Still in Progress

**If Yes:**
- Optional: Upload completion photos
- Optional: Leave testimonial for contractor
- Job archived

**If No:**
- Reason: "Contractor never started" / "Project cancelled" / "Other"
- Support contact offered

---

## Client Types - Specific Flows

### Property Managers

**Specific Needs:**
- Often have multiple jobs
- Need recurring services
- Care about reliability over price

**Features:**
- "Post Similar Job" button (duplicate with edits)
- Bulk operations (future)
- Vendor list (favorite contractors)

**Onboarding:**
- Ask: "How many units do you manage?"
- Show PM-specific testimonials

### Business Owners

**Specific Needs:**
- Commercial licenses required
- After-hours work preference
- Insurance requirements

**Features:**
- "Commercial only" filter
- Business hours preference
- Insurance verification badge

### Real Estate Investors

**Specific Needs:**
- Fast turnaround
- Multiple properties
- Before/after photos important

**Features:**
- Property portfolio (future)
- Quick-post for common jobs
- ROI calculator (future)

---

## Free vs Paid Tiers

### Free Tier (All Client Types)
- 1 job post per month
- Contact up to 3 contractors per job
- Basic listing

### Pro Tier ($25/month or $250/year)
- Unlimited job posts
- Unlimited contractor contacts
- Priority listing (appears first)
- "Verified Client" badge
- Priority support

---

## Error States

### No Contractors in Area
**Message:** "We don't have contractors in your area yet. We're expanding fast — want to be notified when we arrive?"

### Job Posted but No Interest (7 days)
**Email:** "Boost your job visibility" — tips for better description, photos, budget range

### Payment Failed
**Same as before** — retry, different method, save draft

---

## Analytics by Client Type

| Metric | Homeowner | Property Manager | Business |
|--------|-----------|------------------|----------|
| Avg job value | $2,500 | $8,000 | $15,000 |
| Time to hire | 5 days | 3 days | 7 days |
| Repeat rate | 15% | 60% | 40% |
| Pro upgrade rate | 8% | 45% | 35% |

---

## Mobile Considerations

### Quick Post Flow
- Pre-filled from previous jobs
- Voice-to-text for description
- Camera access for photos
- One-tap re-post for similar jobs

---

## Email Templates by Type

### Homeowner
Subject: "Your job is live — here's what to expect"

### Property Manager
Subject: "Find reliable contractors for your properties"

### Business
Subject: "Licensed commercial contractors ready to quote"

---

## Summary

The **Client** flow supports:
- ✅ Homeowners with single projects
- ✅ Property managers with portfolios
- ✅ Business owners with commercial needs
- ✅ Real estate investors with flips/renovations
- ✅ Anyone else needing contractor work

All flows converge on the same job posting and contractor matching system, with optional type-specific customization.

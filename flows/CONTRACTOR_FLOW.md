# Contractie - Contractor User Flow

## Overview

Complete journey for contractors from discovery to getting hired and completing jobs.

---

## Pricing

| Tier | Price | Features |
|------|-------|----------|
| **Founding Member** | **$25/month** | Unlimited applications, lifetime rate (first 100 only) |
| **Regular** | **$49/month** | Unlimited applications |

---

## Phase 1: Discovery

### Entry Points
| Source | Experience |
|--------|------------|
| Google Search | "Find local contractor jobs" → SEO landing page |
| Referral | Link from friend/other contractor |
| Direct | contractie.com/contractors |

### Landing Page (Contractor Focus)
**URL**: `/contractors`

**Hero Section:**
- Headline: "Find Work. Keep 100%."
- Subheadline: "Stop paying $50-100 for leads that ghost you. One flat fee, unlimited opportunities."
- CTA: "Create Free Profile"
- Trust badges: "No Lead Fees", "No Commission", "Direct Connection"

**Launch Promo Banner:**
🎉 **GRAND OPENING** — First 100 contractors get $25/month forever (50% off!)

**Social Proof:**
- "Join 500+ contractors already finding work"
- Testimonial carousel from contractors

**How It Works (3 steps):**
1. Create your profile (5 min)
2. Browse jobs in your area
3. Get contacted by clients

**FAQ Preview:**
- Is it really $25/month? → Yes, for founding members
- How do I get paid? → Directly by client, we take 0%
- What trades are accepted? → All licensed trades

**CTA**: "Get Started" button → Signup modal

---

## Phase 2: Signup & Onboarding

### Step 1: Account Creation
**Screen**: Signup modal/page

**Options:**
- Email + Password
- Continue with Google
- Continue with Apple

**Fields:**
- Email (validated)
- Password (min 8 chars, strength indicator)
- Terms acceptance checkbox

**After Signup:**
- Verification email sent
- Screen: "Check your email" with resend option
- Auto-redirect to onboarding after verification

### Step 2: Profile Wizard

**Progress Indicator**: Step X of 7

#### Step 2.1: Personal Information
**Fields:**
- Full Name (text input)
- Business Name (optional, text input)
- Phone Number (with country code)
- Preferred contact method (radio: Phone/Text/Email)

#### Step 2.2: Trade Selection
**Screen**: Trade selector

**Options (checkboxes, select all that apply):**
- Plumbing
- Electrical
- HVAC
- Roofing
- Flooring
- Painting
- Carpentry
- Masonry
- Landscaping
- General Contracting
- Other (text input)

#### Step 2.3: License Information
**Screen**: License verification

**Fields:**
- License Number (text input)
- State (dropdown)
- License Type (dropdown: Residential, Commercial, Both)
- Upload License Photo (file picker)

**Help Text**: 
- "Why we need this: Clients trust verified contractors. We manually verify every license."
- "Don't have a license yet? [Learn about licensing requirements]"

**File Upload:**
- Drag & drop or click to browse
- Accepted: JPG, PNG, PDF
- Max size: 5MB

#### Step 2.4: Service Area
**Screen**: Location setup

**Options:**
- Option A: Enter ZIP codes (comma separated)
- Option B: Set radius from address
  - Address input
  - Radius slider: 5, 10, 25, 50 miles

#### Step 2.5: Portfolio Photos
**Screen**: Photo upload

**Instructions**: "Show clients your best work. Upload 3-10 photos of completed projects."

**Requirements:**
- Minimum 3 photos
- Maximum 10 photos
- Format: JPG, PNG
- Max per file: 5MB

#### Step 2.6: Bio & Description
**Screen**: About you

**Fields:**
- Headline (60 chars max): "e.g., Expert Plumber with 15 Years Experience"
- Bio (500 chars max): Textarea with character counter
- Years of Experience (number input)

#### Step 2.7: Review & Submit
**Screen**: Profile preview

**Sections:**
- Personal Info (editable)
- Trades (editable)
- License (status: pending verification)
- Service Area (map preview)
- Portfolio (photo grid)
- Bio (editable)

**Checkbox**: "I confirm all information is accurate and I hold valid licenses for my trade(s)."

**CTA**: "Submit for Approval"

**After Submit:**
- Success screen: "Profile Submitted!"
- Message: "We're verifying your license. This usually takes 24-48 hours."
- Email confirmation sent
- "While you wait, browse available jobs" (optional)

---

## Phase 3: Pending Approval

### State: contractor.status = "pending"

**Dashboard View:**
- Banner: "Your profile is being reviewed"
- Progress indicator: Step 3 of 3 - Verification
- Estimated time: "24-48 hours"
- What happens next explanation

**Available Actions:**
- Edit profile (changes reset approval timer)
- Browse jobs (view only, can't express interest)
- Help/FAQ

**Notifications:**
- Email: "Profile received, verifying license"
- Email (24 hours): "Still reviewing, here's what to expect"

---

## Phase 4: Approved & Active

### Approval Email
**Subject**: "You're approved! Start finding jobs on Contractie"

**Content:**
- Congratulations message
- "Your license has been verified"
- CTA: "Browse Jobs Now"
- Quick tips for success

### Subscription Step
**Screen**: Choose your plan

**Options:**
```
+------------------------+
| FOUNDING MEMBER        |
| $25/month              |
| Unlimited applications |
| Lifetime rate          |
| [Subscribe]            |
| (First 100 only!)      |
+------------------------+
| REGULAR                |
| $49/month              |
| Unlimited applications |
| [Subscribe]            |
+------------------------+
```

**Payment:**
- Stripe checkout
- Monthly billing
- Cancel anytime

### First Login (Post-Approval)
**Screen**: Welcome back

**Onboarding Checklist:**
- [x] Create profile
- [x] Verify license
- [ ] Subscribe
- [ ] Complete first job

**Quick Tour Modal:**
1. "This is your dashboard" - shows job feed
2. "Filter by your trades" - shows filter bar
3. "Express interest in jobs" - shows button
4. "Client contacts you directly" - explains process

**CTA**: "Start Browsing Jobs"

---

## Phase 5: Browsing & Applying to Jobs

### Dashboard
**URL**: `/contractor/dashboard`

**Layout:**
- Header: Logo, navigation, profile menu
- Sidebar: Filters
- Main: Job feed

**Job Card:**
```
+------------------------+
| [Trade Badge]          |
| Job Title              |
| Location: ZIP Code     |
| Budget: $X - $Y        |
| Posted: 2 hours ago    |
| [View Details]         |
+------------------------+
```

**Filters (Sidebar):**
- Trade (checkboxes of contractor's trades)
- Distance (5, 10, 25, 50 miles)
- Budget (min/max sliders)
- Posted (last 24h, 7 days, 30 days)

### Job Detail View
**URL**: `/jobs/[id]`

**Content:**
- Job title
- Trade type
- Full description
- Location (ZIP, approximate area)
- Budget range (if provided)
- Photos (if client uploaded)
- Posted date
- "Express Interest" button

**Express Interest Modal:**
- Pre-filled message: "Hi, I'm [Name], a licensed [Trade] with [X] years of experience. I'd love to discuss your project."
- Editable message (500 chars)
- "Send Interest" button

**After Expressing Interest:**
- Success toast: "Interest sent! Client will review your profile."
- Job marked as "Interest Expressed" in feed
- Email notification to client

---

## Phase 6: Getting Selected

### Notification: Client Selected You
**Email Subject**: "[Client Name] wants to connect about [Job Title]"

**Email Content:**
- Client name and contact info
- Job details
- Your next step: "Contact them within 24 hours"
- Tips for first contact

**Dashboard Notification:**
- Badge on "My Applications"
- Entry in applications list

### Applications Dashboard
**URL**: `/contractor/applications`

**Tabs:**
- Active (client hasn't decided)
- Selected (you're chosen, awaiting contact)
- Completed (job done)
- Declined (client chose someone else)

**Selected Job Card:**
```
+------------------------+
| 🎉 SELECTED            |
| Job Title              |
| Client: [Name]         |
| Phone: [Number]        |
| Email: [Email]         |
| [Mark as Contacted]    |
+------------------------+
```

**After Contact:**
- Contractor clicks "Mark as Contacted"
- Optional: Add notes (private)
- Status changes to "In Discussion"

---

## Phase 7: Job Execution

### Marking Job Status

**Status Options:**
- In Discussion (initial contact made)
- Scheduled (appointment set)
- In Progress (work started)
- Completed (work done)

**Completion Flow:**
1. Contractor marks "Complete"
2. Uploads completion photos (optional, 0-5)
3. Adds final notes
4. Requests client mark as complete

---

## Summary

The **Contractor** flow supports:
- ✅ All licensed trades
- ✅ Multiple service areas
- ✅ Portfolio showcasing
- ✅ Direct client connection

**Key Differentiator:** $25-49/month unlimited vs $25-120/lead on competitor platforms. Keep 100% of earnings.

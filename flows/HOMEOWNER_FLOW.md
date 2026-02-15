# Homeowner User Flow - Contractie

> **Document Purpose:** Complete user journey documentation for homeowners from discovery to job completion. Developer reference for building exact flows.

---

## Table of Contents
1. [Phase 1: Discovery](#phase-1-discovery)
2. [Phase 2: Onboarding](#phase-2-onboarding)
3. [Phase 3: Job Posting](#phase-3-job-posting)
4. [Phase 4: Contractor Matching](#phase-4-contractor-matching)
5. [Phase 5: Project Execution](#phase-5-project-execution)
6. [Phase 6: Completion](#phase-6-completion)
7. [Error States & Recovery](#error-states--recovery)
8. [Mobile Variations](#mobile-variations)

---

## Phase 1: Discovery

### Entry Point: SEO Landing Page

**Context:** Homeowner searches Google for "flooring contractor near me" or "licensed plumber [city]"

#### Screen: SEO Landing Page (`/`)

**Desktop Layout:**
- Hero section with headline: "Find Verified Contractors in [City]"
- Subheadline: "No more guessing. No more unlicensed handymen. Just qualified pros ready for your project."
- **Primary CTA Button:** "Post Your Job - Free" (green, prominent)
- **Secondary CTA:** "See How It Works" (text link, scrolls to section)
- Map preview showing local contractors (if geolocation available)
- 3-step process explanation
- Social proof section (testimonials)
- Pricing cards (Free vs Pro)

**Mobile Layout:**
- Stacked layout, headline smaller
- CTA button full-width, sticky at bottom
- Map becomes list view of "Contractors Near You"
- Swipeable testimonial cards

**Data Collected:** None (anonymous visitor)

**Decision Point:**
- Clicks "Post Your Job" → Goes to `/post-job` (redirects to signup if not logged in)
- Clicks "Browse Contractors" → Goes to `/contractors` (view-only mode)
- Clicks "How It Works" → Smooth scroll to section

---

### Alternative Entry: Contractor Directory (`/contractors`)

**Desktop Layout:**
- Filter sidebar: Trade type, Distance radius, Rating
- Map view (left 60%) + List view (right 40%)
- Contractor cards with:
  - Profile photo
  - Business name
  - Trade badge (Plumbing, Electrical, etc.)
  - "Verified" checkmark
  - Years in business
  - "View Profile" button

**Mobile Layout:**
- Toggle between Map/List view
- Bottom sheet for contractor details
- Filter button opens modal

**Decision Point:**
- Clicks "View Profile" → Contractor detail page with "Post a Job to Contact" CTA
- Clicks "Post Your Job" → Job posting flow

---

## Phase 2: Onboarding

### Screen: Signup Options (`/signup/homeowner`)

**URL:** `/signup/homeowner?redirect=/post-job`

**Copy:**
- Headline: "Get Started in 30 Seconds"
- Subheadline: "Join thousands of homeowners who found verified contractors"

**Signup Options (stacked vertically):**

1. **Continue with Google**
   - Icon: Google "G" logo
   - Button: White background, gray border
   - Action: OAuth redirect to Google

2. **Continue with Apple**
   - Icon: Apple logo
   - Button: Black background, white text
   - Action: OAuth redirect to Apple

3. **Continue with Email**
   - Icon: Envelope
   - Button: Primary brand color
   - Action: Reveals email form inline

**Email Form Fields:**
- Email: `input[type="email"]`
  - Placeholder: "you@example.com"
  - Validation: Required, valid email format
  - Error: "Please enter a valid email address"
- Password: `input[type="password"]`
  - Placeholder: "Create a password"
  - Validation: Min 8 characters, 1 number
  - Error: "Password must be at least 8 characters with 1 number"
- **Button:** "Create Account"

**Footer:**
- "Already have an account? [Log In](#)"
- "By signing up, you agree to our [Terms](#) and [Privacy Policy](#)"

**Data Collected:**
- `email` (unique, required)
- `password_hash` (required)
- `auth_provider` (google|apple|email)
- `created_at` (timestamp)

**Error States:**
- Email already exists → "An account with this email already exists. [Log in instead](#)"
- OAuth fails → "Something went wrong. Please try again or use email signup."
- Rate limited → "Too many attempts. Please try again in 5 minutes."

---

### Screen: Email Verification (`/verify-email`)

**Context:** User signed up with email (not OAuth)

**Copy:**
- Headline: "Check Your Email"
- Subheadline: "We sent a verification link to **{email}**"
- Illustration: Email inbox with notification

**Content:**
- "Click the link in the email to continue posting your job"
- **Button:** "Resend Email" (disabled for 60 seconds, shows countdown)
- "Wrong email? [Change it](#)"

**Technical:**
- Verification token sent via email (expires in 24 hours)
- Token format: `https://contractie.com/verify?token=xyz123`

**Decision Point:**
- Clicks verification link → Account verified, redirected to `/onboarding/profile`
- Token expired → "This link has expired. [Request a new one](#)"

**Edge Case - OAuth Users:**
- Skip this screen entirely
- Go directly to profile setup

---

### Screen: Basic Profile Setup (`/onboarding/profile`)

**Progress Indicator:** Step 1 of 2 (33%)

**Copy:**
- Headline: "Tell Us About Yourself"
- Subheadline: "This helps us match you with the right contractors"

**Form Fields:**

1. **Full Name** (required)
   - Label: "Your Name"
   - Placeholder: "John Smith"
   - Validation: Min 2 characters
   - Error: "Please enter your name"

2. **Phone Number** (required)
   - Label: "Phone Number"
   - Placeholder: "(555) 123-4567"
   - Input mask: Auto-format as (XXX) XXX-XXXX
   - Validation: 10 digits
   - Error: "Please enter a valid 10-digit phone number"
   - Helper text: "Contractors will use this to contact you"

3. **ZIP Code** (required)
   - Label: "Your ZIP Code"
   - Placeholder: "90210"
   - Validation: 5 digits, valid US ZIP
   - Error: "Please enter a valid 5-digit ZIP code"
   - Auto-detect: "Use my current location" link (requests geolocation)

**Navigation:**
- **Primary Button:** "Continue" (disabled until all fields valid)
- **Secondary:** "Skip for now" (saves progress, goes to dashboard)

**Data Collected:**
- `full_name`
- `phone`
- `zip_code`
- `onboarding_completed` = false

**Mobile Variation:**
- Number pad for phone/ZIP fields
- "Use my location" button prominent

---

### Screen: Welcome Tutorial (Modal)

**Triggers:** After profile completion, first-time users only

**Modal Content:**

**Slide 1: Welcome**
- Illustration: Happy homeowner + contractor shaking hands
- Headline: "Welcome to Contractie!"
- Body: "We're here to help you find verified, licensed contractors for your project."
- Button: "Next"

**Slide 2: How It Works**
- 3 icons with short descriptions:
  1. "Post your job details"
  2. "Get matched with 2-3 verified contractors"
  3. "Connect directly and hire"
- Button: "Next"

**Slide 3: You're Ready**
- Headline: "Let's Find Your Contractor"
- Body: "Post your first job—it takes just 2 minutes."
- **Primary Button:** "Post a Job Now"
- **Secondary:** "Explore First" (goes to dashboard)

**Technical:**
- Dots indicator (3 dots, current highlighted)
- Can close via X (top right) at any time
- Sets `tutorial_seen` = true in user record

---

## Phase 3: Job Posting

### Wizard Overview

**URL Pattern:** `/post-job/step/{1-5}`
**State Management:** Form state persisted in localStorage (key: `job_draft_{user_id}`)

**Progress Bar (all steps):**
```
[Step 1] — [Step 2] — [Step 3] — [Step 4] — [Step 5]
 Details    Location   Budget    Photos    Review
```

**Navigation Pattern:**
- Can go back to previous steps
- Can save and exit (returns to dashboard with draft)
- Validates current step before allowing next

---

### Step 1: Job Details (`/post-job/step/1`)

**Progress:** 20% complete

**Copy:**
- Headline: "What Do You Need Done?"
- Subheadline: "Be specific—contractors use this to decide if they're a good fit"

**Form Fields:**

1. **Job Title** (required)
   - Label: "Job Title"
   - Placeholder: "e.g., Install hardwood flooring in living room"
   - Character limit: 100
   - Validation: Min 10 characters
   - Error: "Please be more specific (at least 10 characters)"
   - Helper text: "{X}/100 characters"

2. **Trade Type** (required)
   - Label: "What type of work is this?"
   - Input: Dropdown select
   - Options:
     - Plumbing
     - Electrical
     - HVAC
     - Roofing
     - Flooring
     - Painting
     - Carpentry
     - General Contracting
     - Landscaping
     - Other
   - Validation: Required
   - Error: "Please select a trade type"

3. **Job Description** (required)
   - Label: "Describe Your Project"
   - Placeholder: "Tell us about the scope of work, materials needed, timeline, and any special requirements..."
   - Input: Textarea, 5 rows
   - Character limit: 2000
   - Validation: Min 50 characters
   - Error: "Please provide more details (at least 50 characters)"
   - Helper text: "{X}/2000 characters • Include: room size, materials preference, timeline"

**Navigation:**
- **Primary Button:** "Continue to Location →"
- Disabled until all fields valid

**Data Collected:**
- `title`
- `category` (trade type)
- `description`

**Auto-Save:** Every 5 seconds, saves to localStorage

---

### Step 2: Location (`/post-job/step/2`)

**Progress:** 40% complete

**Copy:**
- Headline: "Where's the Job?"
- Subheadline: "We'll show your job to contractors in this area"

**Form Fields:**

1. **ZIP Code** (pre-filled from profile, editable)
   - Label: "ZIP Code"
   - Placeholder: "90210"
   - Validation: 5 digits
   - Error: "Please enter a valid ZIP code"

2. **Street Address** (optional but recommended)
   - Label: "Street Address (optional)"
   - Placeholder: "123 Main St"
   - Helper text: "Only shared with contractors you select"

3. **City & State** (auto-populated from ZIP)
   - Display only: "Los Angeles, CA"
   - Shows "Verifying location..." while looking up

**Map Preview:**
- Shows approximate location (ZIP centroid)
- Circle radius indicating service area (20 miles)
- Text: "Contractors within 20 miles will see your job"

**Navigation:**
- **Secondary:** "← Back to Details"
- **Primary:** "Continue to Budget →"

**Data Collected:**
- `zip_code`
- `address` (optional)
- `city` (derived)
- `state` (derived)

---

### Step 3: Budget (`/post-job/step/3`)

**Progress:** 60% complete

**Copy:**
- Headline: "What's Your Budget?"
- Subheadline: "This helps contractors know if the job is a good fit"

**Form Fields:**

1. **Budget Range** (optional)
   - Label: "Expected Budget Range (optional)"
   - Two inputs side by side:
     - "Min: $" `input[type="number"]`
     - "Max: $" `input[type="number"]`
   - Validation: Max > Min (if both provided)
   - Error: "Maximum budget must be greater than minimum"

2. **Budget Preference** (radio buttons)
   - Label: "Or select a range:"
   - Options:
     - "Under $1,000"
     - "$1,000 - $5,000"
     - "$5,000 - $10,000"
     - "$10,000 - $25,000"
     - "$25,000+"
     - "Rather not say"
   - Default: "Rather not say" selected

3. **Timeline** (required)
   - Label: "When do you need this done?"
   - Options:
     - "As soon as possible"
     - "Within 2 weeks"
     - "Within 1 month"
     - "1-3 months"
     - "Just planning / flexible"

**Helper Box:**
- Icon: Lightbulb
- Text: "Don't worry—this is just a starting point. You'll discuss final pricing directly with contractors."

**Navigation:**
- **Secondary:** "← Back to Location"
- **Primary:** "Continue to Photos →"

**Data Collected:**
- `budget_min` (optional)
- `budget_max` (optional)
- `budget_preference`
- `timeline`

---

### Step 4: Photos (`/post-job/step/4`)

**Progress:** 80% complete

**Copy:**
- Headline: "Add Photos (Optional)"
- Subheadline: "Photos help contractors understand the scope and provide accurate quotes"

**Upload Area:**
- Drag & drop zone (dashed border)
- Icon: Camera/upload icon
- Text: "Drag photos here or click to browse"
- Subtext: "JPG, PNG up to 10MB each"

**Or:**
- **Button:** "Take Photo" (mobile only, opens camera)

**Photo Preview Grid:**
- Thumbnails with remove button (X)
- Max 5 photos
- Caption input per photo (optional)

**Constraints:**
- Max file size: 10MB per photo
- Accepted formats: JPG, JPEG, PNG
- Max count: 5 photos

**Error States:**
- File too large: "Photo must be under 10MB"
- Wrong format: "Please upload JPG or PNG files only"
- Too many: "Maximum 5 photos allowed. Remove one to add another."

**Helper Box:**
- "Tip: Photos of the work area, any existing damage, and access points help contractors prepare."

**Navigation:**
- **Secondary:** "← Back to Budget"
- **Secondary:** "Skip Photos" (goes to review)
- **Primary:** "Review & Post →"

**Data Collected:**
- `photos[]` (array of file references)
- `photo_captions[]` (optional)

**Mobile Variation:**
- "Take Photo" button prominent
- Camera opens directly
- Can select from gallery

---

### Step 5: Review & Payment (`/post-job/step/5`)

**Progress:** 100% complete

**Copy:**
- Headline: "Review & Post Your Job"
- Subheadline: "One-time fee of $25 to post your job"

**Review Card:**
```
┌─────────────────────────────────────┐
│ JOB DETAILS                         │
│ ─────────────────────────────────── │
│ Title: {title}                      │
│ Trade: {category}                   │
│ Location: {city}, {state} {zip}     │
│ Timeline: {timeline}                │
│ Budget: {budget_range}              │
│                                     │
│ [Edit Details]                      │
└─────────────────────────────────────┘
```

**Photos Preview:**
- Horizontal scroll of thumbnails
- "{X} photos attached"

**Pricing Card:**
```
┌─────────────────────────────────────┐
│ POSTING FEE                         │
│ ─────────────────────────────────── │
│ Job posting              $25.00     │
│ ─────────────────────────────────── │
│ Total                    $25.00     │
│                                     │
│ [Post Job - $25]                    │
│                                     │
│ 🔒 Secure payment via Stripe        │
└─────────────────────────────────────┘
```

**Payment Button:**
- **Primary:** "Post Job - Pay $25"
- Icon: Lock
- Subtext: "One-time fee. No subscription required."

**Trust Signals:**
- "🔒 Your payment is secure"
- "✓ 30-day satisfaction guarantee"
- "✓ Only verified contractors will see your contact info"

**Navigation:**
- **Secondary:** "← Back to Photos"
- **Secondary:** "Save as Draft" (saves, goes to dashboard)

---

### Screen: Stripe Checkout

**Integration:** Stripe Checkout (redirect)

**Flow:**
1. User clicks "Post Job - Pay $25"
2. System creates Stripe Checkout Session
3. Redirect to `https://checkout.stripe.com/...`
4. User completes payment
5. Redirect back to `/post-job/success?session_id=xxx`

**Stripe Configuration:**
- Mode: Payment (not subscription)
- Amount: $25.00 USD
- Product name: "Job Posting Fee"
- Success URL: `/post-job/success?session_id={CHECKOUT_SESSION_ID}`
- Cancel URL: `/post-job/step/5?canceled=true`

---

### Screen: Payment Success (`/post-job/success`)

**Copy:**
- Icon: Large green checkmark (animated)
- Headline: "Job Posted Successfully!"
- Subheadline: "Your job is now live and visible to verified contractors"

**Job ID Card:**
```
┌─────────────────────────────────────┐
│ YOUR JOB ID: #JOB-12345             │
│ Save this for your records          │
│                                     │
│ [Copy ID] [Share Job]               │
└─────────────────────────────────────┘
```

**What Happens Next:**
1. "Verified contractors in your area will see your job"
2. "Interested contractors will be reviewed by our team"
3. "You'll receive an email introduction within 24-48 hours"

**CTAs:**
- **Primary:** "Go to My Dashboard"
- **Secondary:** "Post Another Job"

**Email Triggered:**
- "Job Posted" confirmation email sent immediately

**Data Updated:**
- Job status: `open`
- Payment status: `paid`
- `posted_at` timestamp

---

### Screen: Payment Canceled (`/post-job/step/5?canceled=true`)

**Copy:**
- Headline: "Payment Canceled"
- Body: "Your job has been saved as a draft. You can complete payment anytime."

**CTAs:**
- **Primary:** "Try Payment Again"
- **Secondary:** "Go to Dashboard"

**State:**
- Job saved as draft
- Photos uploaded to storage
- All data preserved

---

## Phase 4: Contractor Matching

### Screen: Homeowner Dashboard (`/dashboard`)

**URL:** `/dashboard`
**Default View:** Active jobs tab

**Header:**
- Welcome: "Welcome back, {first_name}"
- **Button:** "+ Post New Job"

**Tabs:**
- "Active Jobs" (default)
- "Past Jobs"
- "Saved Contractors"

**Active Jobs List:**

Each job card:
```
┌─────────────────────────────────────┐
│ {Job Title}                    [▸] │
│ {Category} • Posted {date}          │
│                                     │
│ Status: {status_badge}              │
│                                     │
│ {X} contractors interested    [View]│
└─────────────────────────────────────┘
```

**Status Badges:**
- "Open" (blue) - Job live, accepting interest
- "Reviewing" (yellow) - Has interested contractors
- "In Progress" (green) - Contractor selected, working
- "Completed" (gray) - Job done

**Empty State:**
- Illustration: Empty clipboard
- Headline: "No Active Jobs"
- Body: "Post your first job to get matched with verified contractors"
- **Button:** "Post a Job"

---

### Screen: Job Detail - Homeowner View (`/jobs/{job_id}`)

**URL:** `/jobs/{job_id}`

**Job Header:**
- Title
- Category badge
- Posted date
- Status badge

**Job Details:**
- Description (full text)
- Location
- Timeline
- Budget (if shared)
- Photos (gallery view)

**Contractors Interested Section:**

If no interest yet:
- "Waiting for contractors..."
- "We'll notify you when contractors express interest"

If contractors interested:
```
┌─────────────────────────────────────┐
│ INTERESTED CONTRACTORS ({count})    │
│ ─────────────────────────────────── │
│                                     │
│ [Contractor Card 1]                 │
│ [Contractor Card 2]                 │
│ [Contractor Card 3]                 │
└─────────────────────────────────────┘
```

**Contractor Card:**
```
┌─────────────────────────────────────┐
│ [Photo]  {Business Name}     ✓ Verified│
│          {Trade} • {Years} years    │
│          {City}, {State}            │
│                                     │
│ "{Optional message from contractor}"│
│                                     │
│ [View Full Profile] [Select]        │
└─────────────────────────────────────┘
```

**Selection Limit:**
- Can select up to 3 contractors
- Counter: "{X} of 3 selected"

**Decision Point:**
- Clicks "View Full Profile" → Contractor profile page
- Clicks "Select" → Adds to selection (button changes to "Selected ✓")

---

### Screen: Contractor Profile - Homeowner View (`/contractors/{id}`)

**Header:**
- Profile photo (large)
- Business name
- "Verified Pro" badge (if applicable)
- Trade tags

**About Section:**
- Bio/description
- Years in business
- License number (display only): "License #{number} - {State}"
- Insurance: "Verified" checkmark

**Portfolio:**
- Photo gallery (3-10 photos)
- Click to enlarge (lightbox)

**Past Jobs:**
- List of completed projects
- Before/after photos if available

**Service Area:**
- Map showing ZIP codes served
- "Serves: {city}, {city}, {city}"

**CTA Section (sticky on mobile):**
- **Primary:** "Select This Contractor"
- **Secondary:** "Back to Job"

**Decision Point:**
- Clicks "Select" → Confirmation modal

---

### Modal: Confirm Contractor Selection

**Copy:**
- Headline: "Select {Contractor Name}?"
- Body: "We'll introduce you via email with your contact information. You can select up to 3 contractors total."

**Your Contact Info (display only):**
- Name: {full_name}
- Phone: {phone}
- Email: {email}

**Buttons:**
- **Secondary:** "Cancel"
- **Primary:** "Yes, Select Contractor"

**After Selection:**
- Success toast: "Contractor selected! We'll send an introduction email within 24 hours."
- Returns to job detail
- Selected contractor marked with "Selected ✓"

**Email Triggered:**
- Admin notification: "New match: {homeowner} + {contractor}"
- Manual intro email sent by admin within 4 hours

---

## Phase 5: Project Execution

### Off-Platform Coordination

**Email Introduction Sent:**
- Subject: "Introduction: {Contractor} ↔ {Homeowner} for {Job Type}"
- Contains both parties' contact info
- Project details
- Next steps

**Homeowner Dashboard Updates:**
- Job status changes to "In Progress"
- Shows: "Connected with {Contractor Name}"
- Shows contractor contact info
- **Button:** "Mark as Completed" (disabled until 24 hours after connection)

**Check-in Reminders (Email):**

**Day 2 Email:**
- Subject: "How's it going with {Contractor Name}?"
- Body: "Just checking in. Have you two connected? Reply and let us know if you need anything."

**Day 7 Email:**
- Subject: "Quick check-in: {Job Title}"
- Body: "It's been a week since we introduced you. How's the project going?"
- Links to mark job as complete

---

## Phase 6: Completion

### Screen: Mark Job Complete (Modal)

**Trigger:** User clicks "Mark as Completed" from dashboard

**Copy:**
- Headline: "Mark Job as Completed?"
- Body: "Confirm that your project with {Contractor Name} is finished."

**Form:**
- Radio: "Did you hire {Contractor Name}?"
  - "Yes, they completed the work"
  - "Yes, but we didn't move forward"
  - "No, I found someone else"
  - "Project is on hold"

**Buttons:**
- **Secondary:** "Cancel"
- **Primary:** "Confirm Completion"

---

### Screen: Leave Testimonial (Optional)

**Copy:**
- Headline: "How Did It Go?"
- Subheadline: "Your feedback helps other homeowners (optional)"

**Form:**
- Star rating: 1-5 stars
- Review title: "Headline for your review"
- Review text: "Tell others about your experience"
- Would recommend: "Would you recommend this contractor?" (Yes/No)

**Buttons:**
- **Secondary:** "Skip"
- **Primary:** "Submit Review"

**After Submission:**
- "Thanks for your feedback!"
- Returns to dashboard

---

### Dashboard: Completed Jobs Tab

**Job Card:**
```
┌─────────────────────────────────────┐
│ {Job Title}                         │
│ Completed on {date}                 │
│                                     │
│ Contractor: {Name}                  │
│ [View Contractor Profile]           │
│                                     │
│ Your Review: ⭐⭐⭐⭐⭐              │
│ [Edit Review]                       │
└─────────────────────────────────────┘
```

---

## Error States & Recovery

### Network Errors

**Toast Notification:**
- "Something went wrong. Please try again."
- **Button:** "Retry"

**Full Page Error:**
- If critical error on job posting:
- "Oops! We couldn't save your progress."
- "Your data is saved locally. [Retry] or [Contact Support]"

### Validation Errors

**Inline validation:**
- Red border on field
- Error message below: "{specific error}"
- Shake animation on submit attempt with errors

### Payment Failures

**Stripe Error Redirect:**
- Return to `/post-job/step/5?error=payment_failed`
- Show alert: "Payment failed: {stripe_error_message}"
- Preserve form data
- Allow retry

### No Contractors in Area

**Detection:**
- After job posted, check if any contractors serve that ZIP
- If none, show banner on dashboard

**Banner Copy:**
- "We're new in your area! We don't have contractors in {ZIP} yet, but we're actively recruiting. Your job will be visible as soon as contractors join."
- **Button:** "Get Notified When Contractors Join"

**Alternative:**
- Email homeowner after 48 hours if no contractors
- Offer to extend search radius or refund

---

## Mobile Variations

### Key Differences

**Navigation:**
- Bottom tab bar (Home, Jobs, Messages, Profile)
- Instead of side navigation

**Forms:**
- Full-screen steps instead of sidebar layout
- Larger touch targets (min 44px)
- Number pads for ZIP/phone
- Date pickers native

**Photos:**
- "Take Photo" primary option
- Camera access direct
- Gallery selection secondary

**Buttons:**
- Sticky at bottom of screen
- Full-width primary CTAs

**Maps:**
- Full-screen map view
- Bottom sheet for details
- Swipe up to expand

**Modals:**
- Full-screen on mobile
- Slide up animation
- Swipe down to dismiss

---

## Data Collection Summary

| Phase | Data | Required | Storage |
|-------|------|----------|---------|
| Signup | email, password | Yes | `users` table |
| Profile | full_name, phone, zip | Yes | `users` table |
| Job Step 1 | title, category, description | Yes | `jobs` table |
| Job Step 2 | zip_code, address | Partial | `jobs` table |
| Job Step 3 | budget, timeline | Partial | `jobs` table |
| Job Step 4 | photos | No | Storage + `job_photos` table |
| Job Step 5 | payment | Yes | `payments` table |

---

## Analytics Events

```javascript
// Signup
signup_started { method: 'email'|'google'|'apple' }
signup_completed { method, has_error }
email_verified { time_to_verify }

// Onboarding
profile_step_1_completed
profile_step_2_completed
tutorial_completed | tutorial_skipped

// Job Posting
job_posting_started
job_step_1_completed { title_length, description_length }
job_step_2_completed
job_step_3_completed
job_step_4_completed { photo_count }
job_step_5_viewed
payment_initiated
payment_completed { time_to_complete }
payment_failed { error_code }
job_posted_successfully

// Matching
contractor_viewed { contractor_id }
contractor_selected { contractor_id, job_id }
job_marked_complete { had_review }
review_submitted { rating, has_text }
```

---

**Document Version:** 1.0  
**Last Updated:** 2026-02-16  
**Owner:** UX Flow Designer

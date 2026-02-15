# Contractie - Contractor User Flow

## Overview

Complete journey for contractors from discovery to getting hired and completing jobs.

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
- Headline: "Find Quality Jobs in Your Area"
- Subheadline: "Connect with homeowners who need your skills. No bidding wars, no middleman fees."
- CTA: "Create Free Profile"
- Trust badges: "Free to Join", "Keep 100% of Earnings", "Verified Leads"

**Social Proof:**
- "Join 500+ contractors already finding work"
- Testimonial carousel from contractors

**How It Works (3 steps):**
1. Create your profile (5 min)
2. Browse jobs in your area
3. Get contacted by homeowners

**FAQ Preview:**
- Is it really free? → Yes, contractors pay nothing
- How do I get paid? → Directly by homeowner
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

**Validation:**
- Phone: Valid format
- Name: Required

**CTA**: "Continue"

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

**Display**: Icon + label for each trade

**CTA**: "Continue"

#### Step 2.3: License Information
**Screen**: License verification

**Fields:**
- License Number (text input)
- State (dropdown)
- License Type (dropdown: Residential, Commercial, Both)
- Upload License Photo (file picker)

**Help Text**: 
- "Why we need this: Homeowners trust verified contractors. We manually verify every license."
- "Don't have a license yet? [Learn about licensing requirements]"

**File Upload:**
- Drag & drop or click to browse
- Accepted: JPG, PNG, PDF
- Max size: 5MB
- Preview thumbnail after upload

**CTA**: "Continue"

#### Step 2.4: Service Area
**Screen**: Location setup

**Options:**
- Option A: Enter ZIP codes (comma separated)
- Option B: Set radius from address
  - Address input
  - Radius slider: 5, 10, 25, 50 miles

**Visual**: Map preview showing coverage area (if using radius)

**Help Text**: "You'll see jobs within this area. You can change this later."

**CTA**: "Continue"

#### Step 2.5: Portfolio Photos
**Screen**: Photo upload

**Instructions**: "Show homeowners your best work. Upload 3-10 photos of completed projects."

**Upload Interface:**
- Grid of upload slots
- Drag & drop multiple files
- Each photo:
  - Image preview
  - Caption input (optional)
  - Delete button
  - Reorder handle (drag to reorder)

**Requirements:**
- Minimum 3 photos
- Maximum 10 photos
- Format: JPG, PNG
- Max per file: 5MB

**Progress**: "3 of 10 photos uploaded"

**Tips Sidebar:**
- "Good photos show: Before/after, details, completed spaces"
- "Avoid: Blurry photos, stock images, unrelated work"

**CTA**: "Continue" (disabled until 3+ photos)

#### Step 2.6: Bio & Description
**Screen**: About you

**Fields:**
- Headline (60 chars max): "e.g., Expert Plumber with 15 Years Experience"
- Bio (500 chars max): Textarea with character counter
- Years of Experience (number input)

**Help Text**: "This appears on your public profile. Be specific about your specialties."

**Example Bio**: 
> "Licensed master plumber specializing in bathroom renovations, emergency repairs, and new construction. Serving the greater Austin area for over 15 years. Fast, reliable service with upfront pricing."

**CTA**: "Continue"

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

### First Login (Post-Approval)
**Screen**: Welcome back

**Onboarding Checklist:**
- [x] Create profile
- [x] Verify license
- [ ] Complete first job
- [ ] Get first review

**Quick Tour Modal:**
1. "This is your dashboard" - shows job feed
2. "Filter by your trades" - shows filter bar
3. "Express interest in jobs" - shows button
4. "Homeowner contacts you directly" - explains process

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

**Empty State:**
- "No jobs match your filters"
- Suggestion: "Try expanding your service area or trades"

### Job Detail View
**URL**: `/jobs/[id]`

**Content:**
- Job title
- Trade type
- Full description
- Location (ZIP, approximate area)
- Budget range (if provided)
- Photos (if homeowner uploaded)
- Posted date
- "Express Interest" button

**Express Interest Modal:**
- Pre-filled message: "Hi, I'm [Name], a licensed [Trade] with [X] years of experience. I'd love to discuss your project."
- Editable message (500 chars)
- "Send Interest" button

**After Expressing Interest:**
- Success toast: "Interest sent! Homeowner will review your profile."
- Job marked as "Interest Expressed" in feed
- Email notification to homeowner

---

## Phase 6: Getting Selected

### Notification: Homeowner Selected You
**Email Subject**: "[Homeowner Name] wants to connect about [Job Title]"

**Email Content:**
- Homeowner name and contact info
- Job details
- Your next step: "Contact them within 24 hours"
- Tips for first contact

**Dashboard Notification:**
- Badge on "My Applications"
- Entry in applications list

### Applications Dashboard
**URL**: `/contractor/applications`

**Tabs:**
- Active (homeowner hasn't decided)
- Selected (you're chosen, awaiting contact)
- Completed (job done)
- Declined (homeowner chose someone else)

**Selected Job Card:**
```
+------------------------+
| 🎉 SELECTED            |
| Job Title              |
| Homeowner: [Name]      |
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
4. Requests homeowner mark as complete

### Follow-up

**If homeowner doesn't respond (7 days):**
- Reminder email to homeowner
- Contractor can "nudge" (one time)

**If homeowner marks complete:**
- Contractor receives notification
- Asked to leave testimonial about homeowner
- Job moves to "Completed"

---

## Phase 8: Building Reputation

### Profile Stats
**Public Profile Shows:**
- Member since [Date]
- Jobs completed: X
- Response rate: X%
- Average response time: X hours
- Portfolio photos
- Past job history (with photos)

### Completed Jobs Section
- List of past jobs
- Completion photos
- Homeowner testimonials (if provided)

### Trust Badges
- ✅ License Verified
- ⭐ Top Contractor (if high completion rate)
- 🏆 10+ Jobs Completed
- ⚡ Fast Responder (avg < 2 hours)

---

## Edge Cases & Error States

### License Rejection
**Trigger**: License invalid or expired

**Email**: "Action needed: License verification failed"

**Dashboard:**
- Red banner: "License couldn't be verified"
- Reason: "License not found in [State] database" or "License expired"
- CTA: "Update License Information"

**Options:**
- Upload different license
- Contact support
- Appeal decision

### No Jobs in Area
**Screen**: Empty state

**Message**: "No jobs in your service area yet"

**Suggestions:**
- Expand service radius
- Check back tomorrow
- Share Contractie with homeowners you know

### Account Suspension
**Triggers:**
- Multiple homeowner complaints
- Fake license
- Inappropriate behavior

**Process:**
- Email notification with reason
- Appeal form
- 7-day review process

### Inactive Account
**Trigger**: No login for 90 days

**Email**: "We miss you! New jobs are waiting"

**Reactivation**: Simple login, no additional steps

---

## Mobile Considerations

### Mobile-Specific Adaptations

**Onboarding:**
- Single column layout
- Larger touch targets (48px min)
- Camera access for license/photo upload
- Simplified forms (fewer fields per screen)

**Job Browsing:**
- Swipeable job cards (Tinder-style)
- Bottom sheet for filters
- Tap to call from job detail

**Photo Upload:**
- Direct camera access
- Quick crop/rotate
- Multiple select from gallery

---

## Notifications Summary

| Trigger | Channel | Content |
|---------|---------|---------|
| Profile submitted | Email | Confirmation, timeline |
| Profile approved | Email + Push | You're approved, browse jobs |
| Profile rejected | Email | Reason, next steps |
| New job in area | Email (daily digest) | Job summary, CTA to view |
| Homeowner selected you | Email + Push | Contact info, next steps |
| Homeowner marked complete | Email + Push | Please leave testimonial |
| Account inactive (30d) | Email | We miss you |
| Account inactive (90d) | Email | Account will be paused |

---

## Analytics to Track

| Metric | Target |
|--------|--------|
| Signup completion rate | >60% |
| Profile approval rate | >80% |
| Time to first job application | <7 days |
| Express interest → selected rate | >20% |
| Selected → hired rate | >50% |
| 30-day retention | >40% |

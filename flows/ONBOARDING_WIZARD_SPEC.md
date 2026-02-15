# Contractie - Onboarding Wizard Technical Spec

## Overview

Technical specification for both homeowner and contractor onboarding wizards.

---

## Homeowner Onboarding Wizard

### Wizard Structure

**Steps:**
1. Account Creation (auth)
2. Email Verification (auth)
3. Profile Setup (name, phone, location)
4. Complete → Go to dashboard

**Total Steps:** 4 (can complete in 2-3 minutes)

### Step 1: Account Creation

**Route**: `/signup?type=homeowner`

**Fields:**
```typescript
{
  email: string;      // Required, email validation
  password: string;   // Required, min 8 chars, strength meter
  confirmPassword: string; // Must match password
}
```

**Validation:**
- Email: Valid format, not already registered
- Password: 8+ chars, 1 uppercase, 1 number
- Confirm: Must match password

**API Call:**
```typescript
POST /api/auth/signup
{
  email: string;
  password: string;
  type: 'homeowner';
}
```

**Success:**
- Create user in Supabase Auth
- Create homeowner_profile record
- Send verification email
- Redirect to `/verify-email?email={email}`

**Error Handling:**
- Email exists → "This email is already registered. Sign in?"
- Weak password → Show strength requirements
- Network error → "Please check your connection and try again"

### Step 2: Email Verification

**Route**: `/verify-email`

**Screen:**
- Icon: Email envelope
- Title: "Verify your email"
- Message: "We sent a link to {email}. Click it to continue."
- Button: "Resend email" (disabled 60s after click)
- Link: "Use different email"

**Auto-redirect:**
- Poll every 5 seconds for `email_verified = true`
- On verify → Auto-redirect to Step 3

**Resend Logic:**
- Max 3 resends per hour
- Rate limit: 1 per minute

### Step 3: Profile Setup

**Route**: `/onboarding/homeowner/profile`

**Fields:**
```typescript
{
  fullName: string;      // Required
  phone: string;         // Required, phone validation
  zipCode: string;       // Required, 5 digits
}
```

**Validation:**
- Full name: Min 2 chars
- Phone: Valid US phone format
- ZIP: 5 digits, validate exists

**Auto-fill:**
- Try to detect ZIP from IP (optional)

**API Call:**
```typescript
PATCH /api/homeowner/profile
{
  fullName: string;
  phone: string;
  zipCode: string;
}
```

**Success:**
- Update homeowner_profiles table
- Mark onboarding complete
- Redirect to `/dashboard`

**Welcome Modal:**
- "Welcome to Contractie!"
- Quick tutorial (3 slides)
- CTA: "Post your first job"

---

## Contractor Onboarding Wizard

### Wizard Structure

**Steps:**
1. Account Creation
2. Email Verification
3. Personal Info
4. Trade Selection
5. License Info
6. Service Area
7. Portfolio Photos
8. Bio
9. Review & Submit
10. Pending Approval

**Total Steps:** 10 (takes 8-12 minutes)

### Step 1: Account Creation

Same as homeowner, but `type: 'contractor'`

### Step 2: Email Verification

Same as homeowner

### Step 3: Personal Information

**Route**: `/onboarding/contractor/personal`

**Fields:**
```typescript
{
  fullName: string;           // Required
  businessName: string;       // Optional
  phone: string;              // Required
  preferredContact: 'phone' | 'text' | 'email';
}
```

**Progress**: Step 3 of 9

**Save Progress:**
- Auto-save to localStorage every 10 seconds
- Can resume later

### Step 4: Trade Selection

**Route**: `/onboarding/contractor/trades`

**UI:**
- Grid of trade cards (icon + label)
- Multi-select (checkboxes)
- Minimum 1 required

**Options:**
```typescript
const TRADES = [
  { id: 'plumbing', label: 'Plumbing', icon: 'Droplet' },
  { id: 'electrical', label: 'Electrical', icon: 'Zap' },
  { id: 'hvac', label: 'HVAC', icon: 'Wind' },
  { id: 'roofing', label: 'Roofing', icon: 'Home' },
  { id: 'flooring', label: 'Flooring', icon: 'Grid' },
  { id: 'painting', label: 'Painting', icon: 'Paintbrush' },
  { id: 'carpentry', label: 'Carpentry', icon: 'Hammer' },
  { id: 'masonry', label: 'Masonry', icon: 'BrickWall' },
  { id: 'landscaping', label: 'Landscaping', icon: 'TreePine' },
  { id: 'general', label: 'General Contracting', icon: 'Wrench' },
];
```

**Other Option:**
- Text input appears if "Other" selected
- Admin review required for custom trades

### Step 5: License Information

**Route**: `/onboarding/contractor/license`

**Fields:**
```typescript
{
  licenseNumber: string;      // Required
  licenseState: string;       // Required, dropdown
  licenseType: 'residential' | 'commercial' | 'both';
  licenseDocument: File;      // Required
}
```

**File Upload:**
- Component: `react-dropzone`
- Max size: 5MB
- Accepted: .jpg, .jpeg, .png, .pdf
- Preview thumbnail

**Validation:**
- License number: Non-empty
- State: Valid US state
- File: Required, size check

**Upload Process:**
```typescript
// 1. Upload to Supabase Storage
const { data, error } = await supabase.storage
  .from('license-documents')
  .upload(`${userId}/${fileName}`, file);

// 2. Save URL to profile
await supabase
  .from('contractor_profiles')
  .update({ license_document_url: data.path });
```

**Help Text:**
> "We verify every license manually. This usually takes 24-48 hours."

### Step 6: Service Area

**Route**: `/onboarding/contractor/service-area`

**Options:**
- Option A: ZIP codes (comma-separated input)
- Option B: Radius from address

**ZIP Code Input:**
```typescript
{
  zipCodes: string[];  // Array of 5-digit strings
}
```
- Validation: Each must be 5 digits
- Deduplicate
- Max 20 ZIP codes

**Radius Input:**
```typescript
{
  address: string;      // Street address
  city: string;
  state: string;
  zipCode: string;
  radiusMiles: 5 | 10 | 25 | 50;
}
```

**Map Preview:**
- Show circle on map (if using radius)
- List ZIP codes covered

### Step 7: Portfolio Photos

**Route**: `/onboarding/contractor/photos`

**UI:**
- Drag & drop zone
- Grid of uploaded photos
- Each photo: preview, caption input, delete, reorder handle

**Requirements:**
- Min: 3 photos
- Max: 10 photos
- Format: JPG, PNG
- Max per file: 5MB

**Upload Process:**
```typescript
// Multiple parallel uploads
const uploads = files.map(file => 
  supabase.storage
    .from('contractor-photos')
    .upload(`${userId}/${uuid()}`, file)
);

const results = await Promise.all(uploads);

// Save URLs to database
await supabase
  .from('contractor_photos')
  .insert(results.map((r, i) => ({
    contractor_id: userId,
    photo_url: r.data.path,
    caption: captions[i],
    order: i,
  })));
```

**Progress Indicator:**
- "3 of 10 photos uploaded"
- Upload progress bar per file

**Tips Sidebar:**
- "Show your best work"
- "Before/after photos work great"
- "Include detail shots"

### Step 8: Bio

**Route**: `/onboarding/contractor/bio`

**Fields:**
```typescript
{
  headline: string;      // Required, max 60 chars
  bio: string;           // Required, max 500 chars
  yearsExperience: number; // Optional
}
```

**Character Counters:**
- Show "45/60" for headline
- Show "320/500" for bio

**Example Bio (placeholder):**
> "Licensed master plumber with 15+ years experience. Specializing in bathroom renovations, emergency repairs, and new construction. Fast, reliable service with upfront pricing. Serving [City] and surrounding areas."

### Step 9: Review & Submit

**Route**: `/onboarding/contractor/review`

**Sections:**
1. Personal Info (editable)
2. Trades (editable)
3. License (status: pending verification)
4. Service Area (map or ZIP list)
5. Photos (grid)
6. Bio (editable)

**Each section:**
- Display current values
- "Edit" link returns to that step

**Confirmation Checkbox:**
> "I confirm all information is accurate and I hold valid licenses for my trade(s)."

**Submit Button:**
- Disabled until checkbox checked
- On click: "Submitting..." spinner

**API Call:**
```typescript
POST /api/contractor/submit-profile
{
  // All profile data
}
```

**Success:**
- Create contractor_profile record
- Status: 'pending'
- Send confirmation email
- Redirect to Step 10

### Step 10: Pending Approval

**Route**: `/onboarding/contractor/pending`

**Screen:**
- Icon: Clock or CheckCircle (pending)
- Title: "Profile Submitted!"
- Message: "We're verifying your license. This usually takes 24-48 hours."
- Timeline:
  - [x] Profile created
  - [x] License uploaded
  - [⏳] Under review
  - [ ] Approved

**Available Actions:**
- "Browse Jobs" (view only)
- "Edit Profile" (resets review timer)
- "Help & FAQ"

**Email Notifications:**
- Immediate: "Profile received"
- 24 hours: "Still reviewing"
- On approval: "You're approved!"
- On rejection: "Action needed"

---

## Technical Implementation

### State Management

**Local Storage Key:** `contractie_onboarding_progress`

```typescript
interface OnboardingState {
  userType: 'homeowner' | 'contractor';
  currentStep: number;
  data: Partial<ProfileData>;
  lastSaved: string;
}
```

**Auto-save:**
```typescript
useEffect(() => {
  const interval = setInterval(() => {
    localStorage.setItem('contractie_onboarding_progress', JSON.stringify(state));
  }, 10000); // Every 10 seconds
  
  return () => clearInterval(interval);
}, [state]);
```

**Resume on load:**
```typescript
useEffect(() => {
  const saved = localStorage.getItem('contractie_onboarding_progress');
  if (saved) {
    const parsed = JSON.parse(saved);
    // Restore state, check if still valid
  }
}, []);
```

### Validation Schema (Zod)

```typescript
import { z } from 'zod';

const homeownerProfileSchema = z.object({
  fullName: z.string().min(2, 'Name is required'),
  phone: z.string().regex(/^\+?1?\d{10,}$/, 'Invalid phone number'),
  zipCode: z.string().regex(/^\d{5}$/, 'Invalid ZIP code'),
});

const contractorProfileSchema = z.object({
  fullName: z.string().min(2),
  phone: z.string().regex(/^\+?1?\d{10,}$/),
  businessName: z.string().optional(),
  preferredContact: z.enum(['phone', 'text', 'email']),
  trades: z.array(z.string()).min(1, 'Select at least one trade'),
  licenseNumber: z.string().min(1),
  licenseState: z.string().length(2),
  licenseType: z.enum(['residential', 'commercial', 'both']),
  zipCodes: z.array(z.string().regex(/^\d{5}$/)).optional(),
  serviceRadius: z.object({
    address: z.string(),
    radiusMiles: z.number().min(5).max(50),
  }).optional(),
  photos: z.array(z.object({
    url: z.string(),
    caption: z.string().optional(),
  })).min(3, 'Upload at least 3 photos'),
  headline: z.string().min(10).max(60),
  bio: z.string().min(50).max(500),
  yearsExperience: z.number().optional(),
});
```

### Progress Calculation

```typescript
const CONTRACTOR_STEPS = 9;

function calculateProgress(currentStep: number): number {
  return Math.round((currentStep / CONTRACTOR_STEPS) * 100);
}

// Display: "Step 4 of 9 (44%)"
```

### Navigation Guards

```typescript
// Prevent accessing future steps
function canAccessStep(targetStep: number, currentStep: number): boolean {
  return targetStep <= currentStep + 1;
}

// Redirect if trying to skip ahead
useEffect(() => {
  if (!canAccessStep(stepParam, completedSteps)) {
    router.push(`/onboarding/contractor/step-${completedSteps + 1}`);
  }
}, [stepParam]);
```

---

## Mobile Considerations

### Touch Targets
- All buttons: Min 48px height
- Form inputs: Min 44px height
- Spacing: 16px between elements

### Keyboard Handling
- Auto-focus first input on step change
- "Next" button on keyboard for forms
- Scroll to error on validation fail

### Camera Integration
```typescript
// For license and photo upload
const input = document.createElement('input');
input.type = 'file';
input.accept = 'image/*';
input.capture = 'environment'; // Rear camera
input.click();
```

### Offline Support
- Save form data to localStorage
- Queue submissions if offline
- Sync when connection restored

---

## Analytics Events

```typescript
// Track onboarding funnel
analytics.track('Onboarding Started', { userType });
analytics.track('Step Completed', { step, userType });
analytics.track('Step Abandoned', { step, timeSpent, userType });
analytics.track('Onboarding Completed', { userType, totalTime });
analytics.track('Verification Email Sent');
analytics.track('Verification Email Opened');
analytics.track('Profile Submitted', { userType });
```

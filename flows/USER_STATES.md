# Contractie - User States & Permissions

## Overview

All possible user states and what each state can see/do in the application.

---

## State Matrix

| State | Can Browse | Can Post Job | Can Apply | Can Message | Dashboard |
|-------|------------|--------------|-----------|-------------|-----------|
| Anonymous | ✅ Public only | ❌ | ❌ | ❌ | ❌ |
| Unverified Email | ✅ | ❌ | ❌ | ❌ | ⚠️ Limited |
| Homeowner (Free) | ✅ | ⚠️ 1/month | ❌ | ❌ | ✅ |
| Homeowner (Paid) | ✅ | ✅ Unlimited | ❌ | ❌ | ✅ |
| Contractor (Pending) | ✅ View only | ❌ | ❌ | ❌ | ⚠️ Limited |
| Contractor (Approved) | ✅ | ❌ | ✅ | ❌ | ✅ |
| Contractor (Busy) | ✅ | ❌ | ⚠️ Limited | ❌ | ✅ |
| Admin | ✅ | ✅ | ✅ | ✅ | ✅ |

---

## Detailed State Definitions

### 1. Anonymous Visitor
**Identifier**: No session

**Can Access:**
- Landing page
- Public contractor directory (limited info)
- Job board (titles only, no details)
- Pricing page
- About/FAQ pages

**CTAs Shown:**
- "Post a Job" → Login modal
- "Join as Contractor" → Signup
- "Sign In" / "Sign Up"

**Blocked Actions:**
- Viewing full job details
- Contacting contractors
- Posting jobs
- Any dashboard access

---

### 2. Unverified Email
**Identifier**: `user.email_verified = false`

**Can Access:**
- Same as Anonymous
- Profile settings (limited)
- Resend verification email

**Shown:**
- Persistent banner: "Please verify your email to continue"
- "Resend verification email" button

**Blocked:**
- Posting jobs
- Expressing interest (contractors)
- Full dashboard access

**Transition To:**
- Verified (click email link)

---

### 3. Homeowner (Free Tier)
**Identifier**: `user.type = 'homeowner'`, `user.plan = 'free'`

**Can Access:**
- Full dashboard
- Post 1 job per month
- View contractor profiles
- See who expressed interest
- Contact contractors (via email intro)

**Limitations:**
- Max 1 active job at a time
- Can only contact 3 contractors per job
- No priority listing
- Basic support

**Upgrade Prompts:**
- After posting 1 job: "Upgrade for unlimited postings"
- When trying to post 2nd job: Modal with pricing
- In dashboard: "Pro features" banner

**CTAs:**
- "Upgrade to Pro" (persistent but not intrusive)

---

### 4. Homeowner (Paid Tier)
**Identifier**: `user.type = 'homeowner'`, `user.plan = 'pro'`

**Can Access:**
- Everything in Free tier
- Unlimited job postings
- Unlimited contractor contacts
- Priority job listing (appears higher in search)
- Priority support

**Badge:**
- "Pro" badge on profile
- "Priority Poster" on jobs

**Subscription Management:**
- View in Settings
- Cancel anytime
- Billing history

---

### 5. Contractor (Pending Approval)
**Identifier**: `user.type = 'contractor'`, `contractor.status = 'pending'`

**Can Access:**
- Dashboard (limited)
- Browse jobs (view only)
- Edit profile
- View approval status

**Cannot:**
- Express interest in jobs
- Contact homeowners
- Appear in public directory

**Dashboard Shows:**
- Progress: "Step 3 of 3 - Verification"
- Status: "Under Review"
- Estimated time: "24-48 hours"
- License upload status

**Notifications:**
- Email on status changes
- Reminder if pending >48 hours

**Transition To:**
- Approved (admin approves)
- Rejected (admin rejects with reason)

---

### 6. Contractor (Approved - Active)
**Identifier**: `user.type = 'contractor'`, `contractor.status = 'approved'`, `contractor.availability = 'available'`

**Can Access:**
- Full dashboard
- Browse and filter jobs
- Express interest in jobs
- View full job details
- Manage profile
- See application history

**Public Profile:**
- Visible in directory
- Shows license verified badge
- Portfolio photos
- Contact button (reveals email)

**Status:**
- "Available for work" badge
- Appears in search results
- Can receive homeowner contacts

---

### 7. Contractor (Approved - Busy)
**Identifier**: `user.type = 'contractor'`, `contractor.status = 'approved'`, `contractor.availability = 'busy'`

**Can Access:**
- Same as Active
- Limited job browsing (can view, not apply)

**Triggers:**
- Manually sets "Busy" status
- Automatically when job marked "in progress"
- Automatically after accepting job

**Public Profile:**
- Shows "Currently Busy" badge
- Still visible in directory
- Contact button disabled with tooltip: "This contractor is currently busy"

**Auto-Reset:**
- After 30 days of busy status
- Or when manually set back to available

---

### 8. Contractor (Suspended)
**Identifier**: `user.type = 'contractor'`, `contractor.status = 'suspended'`

**Can Access:**
- Login
- Appeal form
- Read-only view of profile

**Cannot:**
- Browse jobs
- Express interest
- Edit profile
- Appear in directory

**Reasons:**
- Fake license
- Multiple complaints
- Terms of service violation

**Appeal Process:**
- Submit appeal form
- 7-day review
- Email notification of decision

---

### 9. Admin
**Identifier**: `user.role = 'admin'`

**Can Access:**
- All dashboards
- Contractor approval queue
- User management
- Job moderation
- Payment records
- Analytics
- Support tickets

**Admin Dashboard Sections:**
- Approval Queue
- User Management
- Job Moderation
- Payments & Refunds
- Support Tickets
- Analytics
- Settings

---

## State Transitions

### Homeowner Flow
```
Anonymous → Signup → Unverified → Verified (Free)
                              ↓
                         Upgrade
                              ↓
                         Paid (Pro)
```

### Contractor Flow
```
Anonymous → Signup → Unverified → Verified → Pending
                                                  ↓
                                           [Admin Review]
                                                  ↓
                                    ┌─────────┴─────────┐
                                    ↓                   ↓
                                 Approved           Rejected
                                    ↓                   ↓
                              ┌─────┴─────┐      Appeal/Exit
                              ↓           ↓
                          Available    Suspended
                              ↓
                           Busy
                              ↓
                         (auto-reset)
```

---

## Permission Matrix by Page

### Landing Page
| State | Can View | Can Search | Can See Prices |
|-------|----------|------------|----------------|
| All | ✅ | ✅ | ✅ |

### Job Board
| State | View List | View Detail | Express Interest |
|-------|-----------|-------------|------------------|
| Anonymous | ✅ Limited | ❌ | ❌ |
| Homeowner | ✅ | ✅ | ❌ |
| Contractor (Pending) | ✅ | ✅ | ❌ |
| Contractor (Approved) | ✅ | ✅ | ✅ |

### Job Detail Page
| State | Full Details | Contact Poster | See Applicants |
|-------|--------------|----------------|----------------|
| Anonymous | ❌ | ❌ | ❌ |
| Homeowner (Own Job) | ✅ | N/A | ✅ |
| Homeowner (Other's Job) | ⚠️ Limited | ❌ | ❌ |
| Contractor | ✅ | ❌ | N/A |

### Contractor Profile
| State | View Public | View Full | Contact |
|-------|-------------|-----------|---------|
| Anonymous | ⚠️ Limited | ❌ | ❌ |
| Homeowner | ✅ | ✅ | ✅ |
| Contractor (Own) | N/A | ✅ (Edit) | N/A |
| Contractor (Other) | ✅ | ⚠️ Limited | ❌ |

### Dashboard
| State | Access | Features |
|-------|--------|----------|
| Anonymous | ❌ | Redirect to login |
| Unverified | ⚠️ Limited | Verify email prompt |
| Homeowner | ✅ | Jobs posted, applicants |
| Contractor (Pending) | ⚠️ Limited | Status, browse only |
| Contractor (Approved) | ✅ | Jobs, applications, profile |
| Admin | ✅ | Full admin panel |

---

## Feature Flags by State

### Homeowner Features
| Feature | Free | Pro | Implementation |
|---------|------|-----|----------------|
| Post job | 1/month | Unlimited | Count check |
| Contact contractors | 3/job | Unlimited | Count check |
| Priority listing | ❌ | ✅ | Sort order |
| Support | Basic | Priority | Response time SLA |
| Analytics | Basic | Advanced | Data depth |

### Contractor Features
| Feature | Pending | Approved | Implementation |
|---------|---------|----------|----------------|
| Browse jobs | ✅ View only | ✅ Full | Status check |
| Express interest | ❌ | ✅ | Status check |
| Public profile | ❌ | ✅ | Visibility flag |
| Contact info visible | ❌ | ✅ | Privacy setting |
| Badge: Verified | ❌ | ✅ | Status badge |
| Badge: Available | N/A | ✅ | Availability toggle |

---

## Database Schema for States

```sql
-- Users table
CREATE TABLE users (
  id UUID PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  email_verified BOOLEAN DEFAULT FALSE,
  type TEXT CHECK (type IN ('homeowner', 'contractor')),
  role TEXT DEFAULT 'user' CHECK (role IN ('user', 'admin')),
  plan TEXT DEFAULT 'free' CHECK (plan IN ('free', 'pro')),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Contractor profiles
CREATE TABLE contractor_profiles (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES users(id),
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected', 'suspended')),
  availability TEXT DEFAULT 'available' CHECK (availability IN ('available', 'busy')),
  license_verified BOOLEAN DEFAULT FALSE,
  rejection_reason TEXT,
  suspended_reason TEXT,
  suspended_until TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Homeowner profiles
CREATE TABLE homeowner_profiles (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES users(id),
  jobs_posted_this_month INTEGER DEFAULT 0,
  plan_expires_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Track state changes
CREATE TABLE state_logs (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES users(id),
  from_state TEXT,
  to_state TEXT,
  reason TEXT,
  changed_by UUID REFERENCES users(id),
  created_at TIMESTAMP DEFAULT NOW()
);
```

---

## Edge Cases

### Multiple Roles
**Scenario**: User wants to be both homeowner and contractor

**Decision**: Not supported in MVP
**Workaround**: Separate email accounts
**Future**: Add role switching or combined profile

### Plan Expiration
**Scenario**: Pro subscription expires

**Behavior:**
- Grace period: 7 days
- Downgrade to Free
- Existing jobs remain active
- New posts limited to 1/month

### Account Deletion
**Scenario**: User wants to delete account

**Behavior:**
- Soft delete (mark as deleted)
- Remove from public directory
- Keep records for legal/compliance
- 30-day recovery window
- Permanent deletion after 30 days

### Duplicate Accounts
**Scenario**: Same person creates multiple accounts

**Detection:**
- Same phone number
- Same license number
- Similar name + address

**Action:**
- Flag for admin review
- Merge accounts or suspend duplicates

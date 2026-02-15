# Contractie Flow Critique

> **Reviewer:** UX Flow Critic  
> **Date:** 2026-02-16  
> **Scope:** Review of existing flow documentation in `/docs/USER_FLOWS.md` and related design docs  
> **Goal:** Identify gaps, blockers, and improvements for 1-week MVP launch

---

## Executive Summary

**Overall Assessment: ⚠️ NEEDS REFINEMENT**

The existing flow documentation provides a solid foundation but has **significant gaps** that could derail a 1-week MVP launch. The current USER_FLOWS.md is high-level and optimistic—it doesn't account for real-world friction points, payment failures, or the manual workflow complexity.

**Critical Finding:** The documentation describes an "ideal" flow but doesn't address what happens when things go wrong. For a marketplace MVP, edge cases aren't edge cases—they're the majority of your support burden.

**Key Risks:**
1. **Payment flow is underspecified** — Stripe integration complexity is glossed over
2. **Manual approval bottleneck** — No UI for the admin workflow
3. **Missing error states** — Every form submission needs failure paths
4. **Subscription confusion** — README mentions subscriptions, USER_FLOWS mentions per-job $25 fee

---

## Section-by-Section Feedback

### 1. Contractor Journey (USER_FLOWS.md)

#### ✅ What's Good
- Clear 7-step progression from discovery to match
- License verification step acknowledges manual process
- "Express Interest" is appropriately simple (no messaging)

#### ❌ Critical Issues

**Issue 1.1: Photo Upload Flow Missing**
- Current: "Uploads: 3 photos of past work"
- Problem: No specification for upload UI, progress indicators, file size limits, or failure handling
- Risk: Users will abandon if uploads fail silently or take too long
- **Fix:** Add explicit upload flow with progress states

**Issue 1.2: "Pending Approval" is a Dead End**
- Current: Contractor sees "Under Review" page and waits
- Problem: No indication of timeline, no email confirmation shown, no "what happens next"
- Risk: Contractors think the app is broken and don't return
- **Fix:** Add timeline expectation ("24-48 hours"), email confirmation, and "while you wait" content

**Issue 1.3: No Rejection Flow**
- Current: Only shows approval path
- Problem: What happens when license is invalid?
- Risk: Rejected contractors are confused and may spam support
- **Fix:** Document rejection email flow and re-submission path

**Issue 1.4: Browse Jobs Before Approval?**
- Current: Flow shows browsing after approval
- Problem: Can pending contractors browse? Should they see jobs to stay engaged?
- Risk: 24-48 hour wait kills momentum
- **Fix:** Decide—either let them browse (read-only) or give them preview content

#### 🔧 Recommendations

| Priority | Fix | Effort |
|----------|-----|--------|
| High | Add photo upload specifications | 2 hrs |
| High | Design "Pending Approval" state with expectations | 2 hrs |
| Medium | Document rejection flow | 1 hr |
| Low | Decide on pre-approval browsing | 30 min |

---

### 2. Homeowner Journey (USER_FLOWS.md)

#### ✅ What's Good
- Simple signup (minimal fields)
- Clear job posting steps
- Payment integrated at right moment (before job goes live)

#### ❌ Critical Issues

**Issue 2.1: PAYMENT CONFUSION — BLOCKER**
- USER_FLOWS.md says: "$25 payment via Stripe Checkout" (per job)
- README.md says: "Stripe subscriptions ($25/month for unlimited access)"
- REVISED_MVP.md says: Both free tier (1 post/month) AND paid tier ($25/month)
- **Problem:** Three different pricing models documented!
- **Risk:** Building the wrong payment flow could waste days
- **Fix:** DECIDE NOW: Per-job fee OR subscription. For 1-week MVP, recommend per-job fee (simpler)

**Issue 2.2: No Payment Failure Path**
- Current: "Payment success" → "Job Live"
- Problem: What about declined cards, 3DS authentication, network errors?
- Risk: Homeowners lose their job draft if payment fails
- **Fix:** Add explicit error states and retry mechanism

**Issue 2.3: "Mark as Completed" is Underspecified**
- Current: "Marks job as 'Completed'"
- Problem: Why would they do this? What's the incentive?
- Risk: Homeowners ghost after hiring; no data on match success
- **Fix:** Add email reminder to complete, explain benefit (helps other homeowners)

**Issue 2.4: No Job Edit/Delete Flow**
- Current: Job is posted and live
- Problem: What if they made a typo? What if they want to cancel?
- Risk: Support burden from simple requests
- **Fix:** Document edit and cancellation flows

#### 🔧 Recommendations

| Priority | Fix | Effort |
|----------|-----|--------|
| **BLOCKER** | Resolve payment model confusion | 1 hr (decision) |
| High | Add payment failure states | 3 hrs |
| Medium | Add job edit/cancel flow | 2 hrs |
| Low | Add completion incentive | 1 hr |

---

### 3. Admin Journey (USER_FLOWS.md)

#### ✅ What's Good
- Acknowledges manual license verification
- Shows basic approval/reject workflow

#### ❌ Critical Issues

**Issue 3.1: No Admin UI Specifications**
- Current: "Logs into /admin" → "Sees '5 pending approvals'"
- Problem: No wireframes, no component references from COMPONENT_LIBRARY.md
- Risk: Admin dashboard gets built ad-hoc, inconsistent with design system
- **Fix:** Reference existing components; specify table layout, actions, bulk operations

**Issue 3.2: License Verification is Vague**
- Current: "Copies license number, opens state contractor board website, verifies"
- Problem: No UI for recording verification result, no notes field for rejections
- Risk: No audit trail, inconsistent decisions
- **Fix:** Add verification form with: Approve/Reject toggle, notes field, state board URL field

**Issue 3.3: Missing "Send Intro Email" Step**
- Current: Admin flow stops at approve/reject
- Problem: The COMMUNICATION_FLOW.md describes manual email intros, but it's not in the admin flow
- Risk: Admin doesn't know they need to send intros
- **Fix:** Add "Pending Intros" section to admin dashboard

**Issue 3.4: No Dispute Handling UI**
- Current: "Handles disputes via email"
- Problem: How are disputes reported? Where's the UI?
- Risk: Disputes handled in personal email, no tracking
- **Fix:** Add simple dispute flagging mechanism

#### 🔧 Recommendations

| Priority | Fix | Effort |
|----------|-----|--------|
| High | Design admin dashboard with components | 4 hrs |
| High | Add verification form specifications | 2 hrs |
| Medium | Add "Pending Intros" queue to admin | 2 hrs |
| Low | Add dispute flagging | 2 hrs |

---

### 4. User States (Missing Document)

**Status:** USER_STATES.md does not exist, but is needed.

**Problem:** No unified view of user lifecycle states.

**Required States to Document:**

#### Contractor States
```
Anonymous → Signed Up → Profile Started → Pending Verification → Approved/Rejected → Active → Inactive
                ↓              ↓                ↓                      ↓
           Abandoned    Incomplete      Under Review           Suspended
```

#### Homeowner States
```
Anonymous → Signed Up → Free Tier → Job Posted → Paid → Matched → Completed
                ↓           ↓           ↓          ↓        ↓
           Abandoned   Upgraded   Draft Saved  Failed   Cancelled
```

#### Job States
```
Draft → Posted → Open → In Progress → Completed/Cancelled
          ↓        ↓         ↓
       Payment   Active   Paused
       Pending
```

**Recommendation:** Create USER_STATES.md with state diagrams and transition triggers.

---

### 5. Edge Cases (Missing Document)

**Status:** EDGE_CASES.md does not exist. This is a **critical gap**.

**Critical Edge Cases to Document:**

| Scenario | Current State | Risk | Mitigation |
|----------|---------------|------|------------|
| Contractor applies to job, then gets rejected by admin | Undefined | Confused contractor | Email notification required |
| Homeowner posts job, no contractors apply | Undefined | Homeowner churn | Email after 48h: "Boost your visibility" |
| Contractor approved but no jobs in area | Undefined | Contractor churn | Email: "Expand your service area" |
| Payment succeeds but webhook fails | Undefined | Job not activated | Manual reconciliation process |
| Duplicate contractor accounts | Undefined | Fraud | Email verification + manual review |
| Homeowner posts inappropriate content | Undefined | Legal risk | Report button + admin moderation |
| Contractor license expires | Undefined | Compliance risk | Annual re-verification email |
| Job posted to wrong zip code | Undefined | Bad matches | Edit flow + admin override |

**Recommendation:** Create EDGE_CASES.md with at least these 8 scenarios before launch.

---

## Business Alignment Review

### Conversion Funnel Analysis

| Step | Conversion Goal | Current Flow Risk | Recommendation |
|------|-----------------|-------------------|----------------|
| Landing → Signup | 10% conversion | No guest browsing, immediate signup wall | Allow job preview before signup |
| Signup → Complete Profile | 80% completion | Contractor form is long | Split into 2 steps: basic + details |
| Profile → Approved | 100% (manual) | 24-48h wait kills momentum | Email engagement during wait |
| Job Post → Payment | 90% completion | No saved drafts | Auto-save drafts |
| Payment → Match | 50% match rate | No contractor guarantee | Set expectations: "2-3 contractors typical" |

### Trust Signals Assessment

| Moment | Trust Signal | Present? | Gap |
|--------|--------------|----------|-----|
| Landing | Verified badge | ✅ Yes | — |
| Landing | Review count | ✅ Yes | — |
| Contractor Signup | License verification explained | ❌ No | Add: "We verify every license" |
| Job Posting | Secure payment badge | ❌ No | Add Stripe/secure icons |
| Match | Contractor credentials visible | ✅ Yes | — |
| Post-Match | Support contact | ❌ No | Add: "Questions? Email us" |

### Pricing Clarity

**Current Issue:** Pricing is confusing across documents.

**Recommendation for MVP:**
- Homeowners: **$25 per job post** (simplest to implement)
- Contractors: **Free** for first 10, then manual review for paid tier
- No subscriptions for MVP (too complex for 1 week)

---

## Technical Feasibility Review

### Next.js + Supabase Assessment

| Feature | Feasibility | Complexity | Notes |
|---------|-------------|------------|-------|
| Contractor signup + profile | ✅ Easy | Low | Standard forms |
| Photo upload (3 photos) | ⚠️ Medium | Medium | Supabase Storage, need progress UI |
| Homeowner signup | ✅ Easy | Low | Minimal fields |
| Job posting | ✅ Easy | Low | Standard form |
| Payment (Stripe Checkout) | ⚠️ Medium | Medium | Webhook handling critical |
| Job browse + filter | ✅ Easy | Low | Simple queries |
| "Express Interest" | ✅ Easy | Low | Single button, insert row |
| Admin dashboard | ⚠️ Medium | Medium | Needs table components |
| Manual email intros | ✅ Easy | Low | External to app |
| License verification UI | ✅ Easy | Low | Status toggle only |

### Over-Engineering Risks

**Risk 1: Real-time Features**
- MAIN_INTERFACE_DESIGN.md shows "Messages" with badges
- MVP scope says "no in-app messaging"
- **Verdict:** Remove Messages from MVP UI to avoid confusion

**Risk 2: Map Integration**
- LANDING_PAGE_DESIGN.md has extensive map specifications
- MVP scope says "simple list view" for jobs
- **Verdict:** Map is nice-to-have; list view is MVP

**Risk 3: Complex Matching Algorithm**
- USER_FLOWS.md mentions "matching zip codes"
- No complex geo needed per MVP_FEATURES.md
- **Verdict:** Simple zip code equality match is sufficient

**Risk 4: Subscription Management**
- README mentions Stripe subscriptions
- USER_FLOWS mentions per-job payment
- **Verdict:** Subscriptions add billing portal, cancel flows, proration—skip for MVP

---

## User Experience Review

### Step Count Analysis

#### Contractor Signup
| Step | Action | Drop-off Risk |
|------|--------|---------------|
| 1 | Email, password, name, phone | Low |
| 2 | License number, trade | Low |
| 3 | Service zip codes | Medium (unclear how many) |
| 4 | Upload 3 photos | **High** (file selection friction) |
| 5 | Past job description | Medium (writer's block) |
| 6 | Submit → Pending | **High** (no immediate gratification) |

**Total: 6 steps**
**Recommendation:** Combine steps 1-2, make photos optional for initial submission, add progress indicator.

#### Homeowner Job Post
| Step | Action | Drop-off Risk |
|------|--------|---------------|
| 1 | Job title | Low |
| 2 | Category | Low |
| 3 | Description | Medium (writer's block) |
| 4 | Zip code | Low |
| 5 | Budget range | Low (optional) |
| 6 | Timeline | Low |
| 7 | Review | Low |
| 8 | Payment | **High** (credit card friction) |

**Total: 8 steps**
**Recommendation:** Combine review + payment, add progress indicator, allow save & continue.

### Mobile Experience

**Issues Identified:**

1. **Photo Upload on Mobile**
   - No specification for mobile camera integration
   - Risk: Users can't easily upload from phone
   - Fix: Ensure `<input type="file" accept="image/*" capture>` works

2. **Form Input on Mobile**
   - No specification for mobile keyboard types
   - Risk: Zip code shows alphabetical keyboard
   - Fix: Use `inputmode="numeric"` for zip codes, phone numbers

3. **Map on Mobile**
   - LANDING_PAGE_DESIGN.md shows map-heavy UI
   - Risk: Map interactions are clunky on mobile
   - Fix: List-first mobile view, map as toggle

---

## Consistency with Design System

### Component Library Usage

| Flow Element | Component Library Reference | Status |
|--------------|----------------------------|--------|
| Primary buttons | ✅ Primary Button defined | Used correctly |
| Contractor cards | ✅ Contractor Card defined | Used correctly |
| Job cards | ✅ Job Card defined | Used correctly |
| Forms | ✅ Text Input, Select defined | Need mobile specs |
| Modals | ✅ Modal defined | Not mentioned in flows |
| Empty states | ✅ Empty State defined | Not mentioned in flows |
| Loading states | ❌ Skeleton Loader defined | Not mentioned in flows |
| Toast notifications | ✅ Alert/Toast defined | Not mentioned in flows |

### Gaps

1. **No Loading States in Flows**
   - Every async action needs a loading state
   - Component library has Skeleton Loader, but flows don't reference it

2. **No Error States in Flows**
   - Forms need error messages
   - Component library has error states, but flows don't reference them

3. **No Success States in Flows**
   - After signup, job post, interest expression—what does user see?
   - Toast notifications exist but aren't specified

---

## Priority Fixes

### 🔴 BLOCKERS (Must Fix Before Building)

| # | Issue | Action | Owner |
|---|-------|--------|-------|
| 1 | **Payment model confusion** | Decide: per-job OR subscription. Document decision. | Product |
| 2 | **No payment failure flow** | Design error states for declined cards, network errors | UX |
| 3 | **No rejection flow for contractors** | Document what happens when license is invalid | UX |
| 4 | **No admin UI specifications** | Design admin dashboard using COMPONENT_LIBRARY.md | UX |

### 🟡 HIGH PRIORITY (Fix During Build)

| # | Issue | Action | Effort |
|---|-------|--------|--------|
| 5 | Photo upload flow missing | Add upload UI with progress, error states | 4 hrs |
| 6 | "Pending Approval" is dead end | Add timeline expectations, email confirmation | 3 hrs |
| 7 | No job edit/cancel flow | Document edit and cancellation paths | 2 hrs |
| 8 | No edge case documentation | Create EDGE_CASES.md with top 8 scenarios | 3 hrs |
| 9 | Contractor signup too long | Split into 2 steps, add progress indicator | 3 hrs |
| 10 | No loading states specified | Add skeleton loaders to all async actions | 2 hrs |

### 🟢 MEDIUM PRIORITY (Fix After Launch)

| # | Issue | Action | Effort |
|---|-------|--------|--------|
| 11 | No user states documented | Create USER_STATES.md diagram | 2 hrs |
| 12 | No pre-approval browsing | Decide policy, implement if needed | 2 hrs |
| 13 | No dispute handling UI | Add simple flagging mechanism | 3 hrs |
| 14 | Mobile map interactions | Optimize map for touch | 4 hrs |
| 15 | No completion incentive | Add email reminder with benefit explanation | 1 hr |

---

## Questions for the Designer

### Critical Questions

1. **Payment Model:** Are we doing per-job ($25) OR subscription ($25/month)? The documents contradict each other. This is a **blocker**.

2. **Contractor Browsing:** Can pending contractors browse jobs? If yes, they stay engaged during the 24-48h wait. If no, we lose momentum.

3. **Photo Uploads:** Are photos required before submission or can they be added later? Required = higher drop-off, higher quality profiles.

4. **Admin Dashboard:** Is this a separate page or a modal/panel? What's the URL structure?

5. **Email Automation:** Are we using Resend/webhooks for transactional emails, or truly manual copy-paste? The COMMUNICATION_FLOW.md says manual, but some emails (signup confirmation) should be automated.

### Clarification Questions

6. **Job Expiration:** Do jobs expire? If so, after how long? What notification does the homeowner get?

7. **Contractor Limits:** Free contractors get "5 interest expressions/month"—is this enforced in code or just honor system for MVP?

8. **Multiple Interest:** Can a contractor express interest in multiple jobs? (Assume yes, but should be explicit.)

9. **Homeowner Visibility:** Can homeowners see contractor profiles before posting a job? (SEO implications.)

10. **Refund Policy:** If a homeowner pays $25 but gets no contractors, what's the refund policy?

---

## Recommendations Summary

### What to Build (MVP Scope)

**Keep:**
- ✅ Contractor signup with license field
- ✅ Photo upload (3 photos, with progress UI)
- ✅ Homeowner signup (minimal)
- ✅ Job posting form
- ✅ Stripe payment (per-job, NOT subscription)
- ✅ Simple job browse (list view, no map)
- ✅ "Express Interest" button
- ✅ Simple admin dashboard (approve/reject, send intros)

**Cut for MVP:**
- ❌ In-app messaging (use email)
- ❌ Map view (list only)
- ❌ Subscriptions (per-job only)
- ❌ Reviews/ratings (manual testimonials)
- ❌ Real-time notifications (email digest)
- ❌ Calendar integration
- ❌ Quote system

### Revised Timeline Estimate

| Day | Original Plan | Revised Plan (with fixes) |
|-----|---------------|---------------------------|
| Day 1 | Setup project, database schema | Setup + resolve payment model |
| Day 2 | Landing page + contractor signup | Landing + contractor signup + photo upload |
| Day 3 | Homeowner signup + job posting | Homeowner signup + job posting + payment flow |
| Day 4 | Job browse + "Express Interest" | Job browse + interest + admin dashboard |
| Day 5 | Stripe + admin dashboard | Stripe integration + error states |
| Day 6 | Email templates + testing | Email templates + edge case handling |
| Day 7 | Deploy + soft launch | Testing + deploy |

**Verdict:** Still achievable in 1 week if payment model is decided immediately and edge cases are documented upfront.

---

## Conclusion

The existing flow documentation is a **good starting point** but needs refinement before development begins. The biggest risks are:

1. **Payment model confusion** — Fix this first
2. **Missing error states** — Every happy path needs a failure path
3. **Underspecified admin workflow** — This is your daily workflow; it needs to be smooth
4. **No edge case handling** — These will dominate your support time

**Next Steps:**
1. Designer resolves payment model question
2. Create EDGE_CASES.md with top failure scenarios
3. Add error states to all form flows
4. Design admin dashboard using existing components
5. Then proceed with development

**Confidence Level:** 7/10 for 1-week launch if blockers are resolved. Drops to 4/10 if payment model remains ambiguous.

---

*End of Critique*

# MVP Features - Contractie

> **Rule**: If it's not essential for launch, it's not in the MVP.

## ✅ IN SCOPE

### 1. Contractor Signup & Profile
- Name, phone, email
- License number (text field, verified manually later)
- Trade/category (dropdown: Plumbing, Electrical, HVAC, etc.)
- Service area (zip codes)
- 3 photos of past work
- 1 past job description (text)

### 2. Homeowner Signup
- Name, phone, email
- Home address (zip code for matching)

### 3. Job Posting (Paid)
- Job title, description
- Category
- Location (zip code)
- Budget range (optional)
- Timeline
- **$25 payment via Stripe Checkout**

### 4. Job Board
- Contractors browse open jobs
- Filter by: category, location (zip code)
- Simple list view

### 5. Express Interest
- Contractor clicks "I'm Interested"
- Homeowner sees: contractor name, license #, photos, past job
- **No messaging** - contact info exchanged after match

### 6. Basic Matching
- Contractors see jobs in their service zip codes
- Simple radius/zip matching (no complex geo)

### 7. Admin Dashboard
- List of contractors pending approval
- View license numbers
- Approve/reject contractors
- View all jobs and payments

---

## ❌ OUT OF SCOPE (Post-MVP)

| Feature | Why Not MVP | Manual Alternative |
|---------|-------------|-------------------|
| Escrow | Too complex | Handle payments offline |
| In-app messaging | Adds complexity | Exchange phone numbers |
| Reviews/ratings | Network effect needed | Ask for testimonials manually |
| Real-time chat | Not essential | Phone/email |
| Automated license verification | API costs, complexity | Check state websites manually |
| Calendar/scheduling | Nice to have | Coordinate offline |
| Quote system | Complex | Contractors quote offline |
| Mobile app | Web first | Responsive web app |
| Notifications | Email sufficient | Manual email for now |
| Search/SEO | Launch first | Direct outreach |

---

## Manual Processes (Do It By Hand)

1. **License verification** → Check state contractor board website
2. **Contractor approval** → Click approve in admin dashboard
3. **Disputes** → Email/phone support
4. **Refunds** → Process in Stripe dashboard
5. **Matching** → System shows by zip, but no auto-matching
6. **Onboarding** → Personal calls to first 10 contractors

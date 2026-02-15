# User Flows - Contractie MVP

## Flow 1: Contractor Journey

```
┌─────────────────────────────────────────────────────────────┐
│  1. DISCOVER                                                │
│     └── Lands on homepage                                   │
│         └── Clicks "Join as Contractor"                     │
├─────────────────────────────────────────────────────────────┤
│  2. SIGNUP                                                  │
│     └── /signup/contractor                                  │
│         ├── Enters: email, password, name, phone            │
│         ├── Enters: license number, trade                   │
│         ├── Selects: service zip codes                      │
│         ├── Uploads: 3 photos of past work                  │
│         └── Adds: 1 past job description                    │
├─────────────────────────────────────────────────────────────┤
│  3. PENDING APPROVAL                                        │
│     └── Submits application                                 │
│         └── Sees: "Under Review" page                       │
│             └── (Admin manually verifies license)           │
├─────────────────────────────────────────────────────────────┤
│  4. APPROVED                                                │
│     └── Receives email: "You're approved!"                  │
│         └── Logs in → Dashboard                             │
├─────────────────────────────────────────────────────────────┤
│  5. BROWSE JOBS                                             │
│     └── Clicks "Browse Jobs"                                │
│         └── Sees jobs matching their zip codes              │
│             └── Filters by category                         │
├─────────────────────────────────────────────────────────────┤
│  6. EXPRESS INTEREST                                        │
│     └── Finds interesting job                               │
│         └── Clicks "I'm Interested"                         │
│             └── (Optional: adds short message)              │
│                 └── Confirms interest                       │
├─────────────────────────────────────────────────────────────┤
│  7. MATCHED                                                 │
│     └── Homeowner sees their profile                        │
│         └── Homeowner contacts them directly                │
│             └── (Work happens offline)                      │
└─────────────────────────────────────────────────────────────┘
```

---

## Flow 2: Homeowner Journey

```
┌─────────────────────────────────────────────────────────────┐
│  1. DISCOVER                                                │
│     └── Lands on homepage                                   │
│         └── Clicks "Post a Job"                             │
├─────────────────────────────────────────────────────────────┤
│  2. SIGNUP (if new)                                         │
│     └── /signup/homeowner                                   │
│         ├── Enters: email, password, name, phone            │
│         └── Enters: home zip code                           │
├─────────────────────────────────────────────────────────────┤
│  3. POST JOB                                                │
│     └── /post-job                                           │
│         ├── Enters: job title                               │
│         ├── Selects: category (Plumbing, Electrical, etc.)  │
│         ├── Enters: description                             │
│         ├── Enters: zip code                                │
│         ├── Selects: budget range (optional)                │
│         └── Selects: timeline                               │
├─────────────────────────────────────────────────────────────┤
│  4. PAYMENT                                                 │
│     └── Reviews job details                                 │
│         └── Clicks "Pay & Post Job"                         │
│             └── Stripe Checkout ($25)                       │
│                 └── Payment success                         │
├─────────────────────────────────────────────────────────────┤
│  5. JOB LIVE                                                │
│     └── Job appears on job board                            │
│         └── Contractors can express interest                │
├─────────────────────────────────────────────────────────────┤
│  6. SEE INTERESTED CONTRACTORS                              │
│     └── Dashboard shows "X contractors interested"          │
│         └── Clicks to view list                             │
│             └── Sees: name, license, photos, past job       │
├─────────────────────────────────────────────────────────────┤
│  7. CONTACT                                                 │
│     └── Clicks "View Contact Info"                          │
│         └── Gets: phone number                              │
│             └── (Calls contractor offline)                  │
├─────────────────────────────────────────────────────────────┤
│  8. COMPLETE                                                │
│     └── Returns to dashboard                                │
│         └── Marks job as "Completed"                        │
└─────────────────────────────────────────────────────────────┘
```

---

## Flow 3: Admin Journey

```
┌─────────────────────────────────────────────────────────────┐
│  1. CHECK PENDING CONTRACTORS                               │
│     └── Logs into /admin                                    │
│         └── Sees "5 pending approvals"                      │
│             └── Clicks to review                            │
├─────────────────────────────────────────────────────────────┤
│  2. VERIFY LICENSE                                          │
│     └── Opens contractor detail                             │
│         ├── Copies license number                           │
│         ├── Opens state contractor board website            │
│         └── Verifies license is valid                       │
├─────────────────────────────────────────────────────────────┤
│  3. APPROVE OR REJECT                                       │
│     └── If valid: clicks "Approve"                          │
│         └── If invalid: clicks "Reject" with note           │
│             └── Contractor receives email                   │
├─────────────────────────────────────────────────────────────┤
│  4. MONITOR                                                 │
│     └── Checks /admin/jobs for new postings                 │
│         └── Checks /admin/payments for issues               │
│             └── Handles disputes via email                  │
└─────────────────────────────────────────────────────────────┘
```

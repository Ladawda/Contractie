# Contractie - Simplified MVP

## Overview

This is the ultra-lean MVP approach designed to launch in **1 week** with minimal tech complexity.

---

## Core Philosophy

**Launch FAST. Validate demand. Automate later.**

We're stripping out all complex features and replacing them with manual processes that you handle via email.

---

## What's In The MVP

### Client Pricing

| Tier | Price | Features |
|------|-------|----------|
| **Launch Promo** | **FREE** | First month free for all job posts |
| **Regular** | **$10 per job post** | One-time fee, no recurring charges |

### Contractor Pricing

| Tier | Price | Features |
|------|-------|----------|
| **Founding Member** | **$25/month** | Unlimited applications, lifetime rate (first 100 only) |
| **Regular** | **$49/month** | Unlimited applications |

---

## Features

### For Clients (Homeowners/Businesses)
- Post jobs for **FREE** (launch month), then $10/post
- Browse verified contractor profiles
- Receive contractor applications
- Direct email connection

### For Contractors
- Create verified profile (manual verification)
- Browse jobs in their area
- Express interest on unlimited jobs (with subscription)
- Direct email connection with clients

---

## What's NOT In The MVP (And Why)

| Feature | Why It's Out | Replacement |
|---------|--------------|-------------|
| In-app messaging | Complex to build, moderate, secure | Manual email intros |
| Escrow payments | Legal complexity, compliance overhead | Off-platform payments |
| Automated license verification | API costs, state-by-state complexity | You manually check state databases |
| Reviews/ratings | Can be gamed, moderation needed | Manual reference checks |
| Mobile apps | 3x dev time | Responsive web only |
| Real-time notifications | Complex infrastructure | Daily email digest |

---

## Your Weekly Workflow (as Admin)

**Daily (15 mins):**
- Check new contractor signups
- Verify licenses (check state contractor board websites)
- Approve/reject contractors

**When Matches Happen (5 mins each):**
- Review contractor profile
- Send intro email to both parties
- Add to tracking spreadsheet

**Weekly (30 mins):**
- Follow up on active matches for outcomes
- Update tracking spreadsheet
- Send weekly digest to all users

---

## Tech Stack (Minimal)

- **Frontend**: Next.js + Tailwind (basic pages)
- **Database**: Supabase (users, jobs, simple matches table)
- **Payments**: Stripe (subscription only)
- **Email**: Resend or your personal email for intros
- **Hosting**: Vercel

**Total pages needed:** 6
1. Landing page
2. Contractor signup
3. Client signup
4. Job posting form
5. Job browse page
6. Simple admin dashboard (just for you)

---

## Launch Timeline: 1 Week

| Day | Task |
|-----|------|
| Day 1 | Setup project, database schema, auth |
| Day 2 | Landing page + contractor signup |
| Day 3 | Client signup + job posting |
| Day 4 | Job browse + "Express Interest" button |
| Day 5 | Stripe subscriptions + admin dashboard |
| Day 6 | Email templates + testing |
| Day 7 | Deploy + soft launch |

---

## Success Metrics (First 30 Days)

- **10 contractors** signed up and verified
- **10 job posts** from clients
- **5 successful matches** (intro emails sent)
- **2 paid subscriptions** (either side)

---

## Next Steps After Launch

1. **Week 2-4**: Gather feedback, fix bugs, refine email templates
2. **Month 2**: If 10+ matches made, build simple in-app messaging
3. **Month 3**: Add automated license verification (if volume justifies cost)
4. **Month 4+**: Add reviews, escrow, mobile app (only if proven demand)

---

## Key Principle

**Don't build it until it hurts NOT to have it.**

Manual processes are fine. Unvalidated features are waste.

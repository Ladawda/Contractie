# Contractie - Edge Cases & Error Handling

## Overview

Comprehensive handling of unusual situations, errors, and failure modes.

---

## Onboarding Edge Cases

### 1. User Abandons Signup Mid-Way

**Detection:**
- User created but profile incomplete
- No activity for 24 hours

**Recovery:**
- Email: "Complete your profile in 2 minutes"
- Deep link to last completed step
- Progress saved automatically

**Prevention:**
- Auto-save every field change
- "Finish later" button on each step
- Progress indicator showing "almost done"

### 2. Email Verification Link Expires

**Scenario:**
- User clicks link after 24 hours
- Link shows "Expired"

**Recovery:**
- "Resend verification email" button
- Option to change email if typo
- Support contact for issues

### 3. License Upload Fails

**Errors:**
- File too large (>5MB)
- Wrong format (not JPG/PNG/PDF)
- Upload interrupted

**Handling:**
- Clear error message: "File must be under 5MB"
- Format validation before upload
- Retry button
- Alternative: Email license to support

### 4. Contractor License Verification Fails

**Reasons:**
- License number not found in state database
- License expired
- License belongs to different person
- State not supported yet

**User Experience:**
- Email: "We couldn't verify your license"
- Reason provided
- Option to:
  - Upload different license
  - Contact support
  - Appeal with additional documentation

**Admin Workflow:**
- Manual review queue
- Approve/Reject with reason
- Bulk actions for common issues

### 5. Photo Upload Issues

**Problems:**
- User has no portfolio photos
- Photos are blurry/low quality
- Wrong file types

**Handling:**
- Minimum 3 photos required
- Quality check (resolution warning)
- Sample good photos shown
- Option to skip and add later (with reminder)

---

## Payment Edge Cases

### 1. Card Declined During Job Posting

**Error Types:**
- Insufficient funds
- Card expired
- Bank declined
- Fraud suspicion

**User Experience:**
- Clear error: "Your card was declined. Please try another payment method."
- Don't lose form data
- Offer:
  - Try different card
  - Pay with different method
  - Save draft and retry later

**Recovery Email:**
- "Your job is saved as a draft"
- "Complete payment to post"
- Direct link to payment

### 2. Payment Succeeds but Job Not Created

**Scenario:**
- Webhook failure
- Database error after payment

**Handling:**
- Idempotent payment processing
- Retry job creation automatically
- If fails after 3 retries:
  - Refund automatically
  - Email user with apology
  - Support ticket created

### 3. Refund Requests

**Scenarios:**
- Homeowner posted job by mistake
- No contractors available in area
- Job no longer needed

**Policy:**
- Within 24 hours: Full refund, no questions
- After 24 hours but no contractor interest: Full refund
- After contractor interest: Case by case

**Process:**
- Self-service refund button (if eligible)
- Otherwise: Contact support
- Admin approves/denies with reason

### 4. Duplicate Charges

**Detection:**
- Same user, same amount, within 5 minutes
- Stripe webhook logs

**Handling:**
- Automatic refund of duplicate
- Email explanation
- Flag for investigation

---

## Matching Edge Cases

### 1. No Contractors in Homeowner's Area

**Detection:**
- Job posted in ZIP code with 0 contractors
- After 24 hours, no views

**Homeowner Experience:**
- Email: "We're expanding to your area"
- Option to:
  - Expand search radius
  - Get notified when contractors join
  - Share with contractor they know
- Refund offered if no contractors within 7 days

**Business Action:**
- Flag ZIP code for contractor recruitment
- Add to "Coming Soon" list

### 2. Contractor Expresses Interest but Homeowner Doesn't Respond

**Timeline:**
- Day 1: Contractor expresses interest
- Day 3: Reminder email to homeowner
- Day 7: Final reminder
- Day 14: Auto-decline, notify contractor

**Contractor Experience:**
- Status: "Awaiting response"
- Can withdraw interest anytime
- After auto-decline: "Homeowner didn't respond, try other jobs"

### 3. Multiple Contractors Express Interest

**Homeowner Options:**
- Contact all (recommended up to 3)
- Contact one at a time
- Decline some, keep others

**UX:**
- "3 contractors interested" badge
- Compare view (side-by-side profiles)
- "Contact Selected" button

### 4. Homeowner Selects Contractor Who Becomes Unavailable

**Scenario:**
- Contractor marked "Busy" after selection
- Contractor suspended
- Contractor deletes account

**Handling:**
- Email homeowner: "This contractor is no longer available"
- Suggest other interested contractors
- Or reopen job to new interest

---

## Geographic Edge Cases

### 1. ZIP Code Not Recognized

**Causes:**
- New ZIP code
- Typo
- Non-US location

**Handling:**
- Suggest corrections
- Allow manual city/state entry
- Flag for database update

### 2. Contractor Moves/Changes Service Area

**Process:**
- Edit profile → Update ZIP codes
- Immediate effect on job visibility
- No impact on existing applications

### 3. Job Posted in Rural Area (No Coverage)

**Similar to "No Contractors"**
- Special messaging: "Rural areas may have limited contractors"
- Suggest larger radius
- Recruitment priority

---

## Communication Edge Cases

### 1. Email Delivery Fails

**Detection:**
- Bounce notification
- User reports not receiving emails

**Handling:**
- Retry with different provider
- In-app notification backup
- SMS fallback (if phone provided)
- Prompt user to check spam

### 2. User Reports Spam/Abuse

**Scenarios:**
- Contractor spamming homeowner
- Homeowner harassing contractor
- Fake job postings

**Process:**
- Report button on every interaction
- Admin review within 24 hours
- Temporary suspension if credible
- Permanent ban if confirmed

### 3. Wrong Contact Info

**Scenario:**
- Homeowner provides wrong phone
- Contractor can't reach them

**Handling:**
- "Mark as unreachable" button
- 3 strikes = job closed
- Homeowner prompted to verify contact info

---

## Data Integrity Edge Cases

### 1. Duplicate Accounts

**Detection:**
- Same email (blocked at signup)
- Same phone number
- Same license number

**Handling:**
- Block duplicate creation
- Suggest password reset if forgot account
- Merge accounts (admin only)

### 2. Account Takeover

**Signs:**
- Login from unusual location
- Password changed, user didn't do it
- Profile info changed unexpectedly

**Response:**
- Immediate password reset required
- Email notification to original email
- 2FA prompt on next login
- Support ticket auto-created

### 3. Data Loss

**Prevention:**
- Daily database backups
- Soft deletes (never hard delete)
- Audit logs for all changes

**Recovery:**
- Restore from backup if needed
- Reconstruct from audit logs
- Notify affected users

---

## Performance Edge Cases

### 1. Search Returns Too Many Results

**Scenario:**
- Major city, popular trade
- 500+ contractors or jobs

**Handling:**
- Pagination (20 per page)
- Infinite scroll option
- Better filtering suggestions
- "Refine your search" prompts

### 2. Image Upload Timeout

**Causes:**
- Slow connection
- Large files
- Server overload

**Handling:**
- Progress indicator
- Retry button
- Background upload option
- Compression before upload

### 3. Map Doesn't Load

**Fallback:**
- Show list view instead
- "Map unavailable" message
- Retry button
- Report issue link

---

## Business Logic Edge Cases

### 1. Contractor Wants to Switch to Homeowner (or vice versa)

**MVP:** Not supported
**Response:** "Create a separate account with different email"
**Future:** Account type switching

### 2. Company/Team Accounts

**Scenario:**
- Multiple employees need access
- One license, multiple users

**MVP:** Not supported
**Workaround:** Shared login (not recommended)
**Future:** Team/organization accounts

### 3. Recurring Jobs

**Scenario:**
- Homeowner wants same contractor monthly
- Property manager with multiple properties

**MVP:** Post new job each time
**Future:** Recurring job scheduling

---

## Error Messages Reference

### User-Friendly Errors

| Technical Error | User Message |
|-----------------|--------------|
| Database timeout | "Something went wrong. Please try again." |
| 404 Not Found | "This page doesn't exist or was removed." |
| 403 Forbidden | "You don't have permission to view this." |
| 500 Server Error | "We're experiencing issues. Please try again shortly." |
| Validation failed | "Please check the highlighted fields and try again." |
| Rate limited | "Too many attempts. Please wait a moment." |
| Session expired | "Your session expired. Please sign in again." |

### Form Validation Messages

| Field | Error | Message |
|-------|-------|---------|
| Email | Invalid format | "Please enter a valid email address" |
| Email | Already exists | "This email is already registered. Sign in?" |
| Password | Too short | "Password must be at least 8 characters" |
| Phone | Invalid | "Please enter a valid phone number" |
| ZIP | Invalid | "Please enter a valid ZIP code" |
| License | Invalid format | "License number doesn't match expected format" |
| File | Too large | "File must be under 5MB" |
| File | Wrong type | "Please upload JPG, PNG, or PDF" |
| Required | Missing | "This field is required" |

---

## Monitoring & Alerts

### Critical Errors (Alert Immediately)
- Payment processing down
- Database connection failures
- Authentication system down
- Email delivery failing

### High Priority (Alert Within 1 Hour)
- >5% error rate on any endpoint
- Contractor approval queue >24 hours
- Failed webhooks >10 in 1 hour

### Medium Priority (Daily Digest)
- User-reported issues
- Slow queries
- Failed logins >100 in 1 hour

---

## Support Escalation

### Level 1: Self-Service
- FAQ
- Help articles
- Automated troubleshooting

### Level 2: Email Support
- General questions
- Account issues
- Refund requests

### Level 3: Admin Intervention
- License verification disputes
- Account suspensions
- Payment failures
- Abuse reports

### Level 4: Emergency
- Security incidents
- Data breaches
- Legal issues

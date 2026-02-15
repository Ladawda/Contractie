# Page List - Contractie MVP

> Every page needed for launch. No more, no less.

## Public Pages

### `/` - Home/Landing
- Hero: "Find verified contractors in your area"
- How it works (3 steps)
- For homeowners / For contractors (toggle)
- CTA: Post a Job / Join as Contractor
- Footer with basic links

### `/jobs` - Job Board (Public)
- List of open jobs
- Filters: Category, Zip code
- Each job card: Title, category, location, posted date
- Click to view detail

### `/jobs/[id]` - Job Detail (Public)
- Job title, description
- Location, timeline, budget
- **If contractor logged in**: "I'm Interested" button
- **If not logged in**: "Sign up as contractor to apply"

---

## Auth Pages

### `/signup/contractor` - Contractor Signup
- Email, password
- Full name, phone
- License number
- Trade/category
- Service zip codes
- Upload 3 photos
- Add 1 past job
- Submit → Pending approval page

### `/signup/homeowner` - Homeowner Signup
- Email, password
- Full name, phone
- Home zip code
- Submit → Go to post job

### `/login` - Login
- Email, password
- Forgot password link

---

## Contractor Dashboard

### `/dashboard/contractor` - Contractor Home
- Profile status (pending/approved)
- Edit profile
- Browse jobs button
- My applications (jobs they expressed interest in)

### `/dashboard/contractor/profile` - Edit Profile
- Update license, trade, service area
- Add/remove photos
- Add past jobs

### `/dashboard/contractor/jobs` - Browse Jobs
- Same as public job board but with "I'm Interested" buttons
- Filter by matching zip codes

---

## Homeowner Dashboard

### `/dashboard/homeowner` - Homeowner Home
- "Post a New Job" button
- My posted jobs list
- Each job shows: status, interested contractors count

### `/dashboard/homeowner/jobs/[id]` - My Job Detail
- Job details
- List of interested contractors
- Each contractor: name, license #, photos, past job
- Contact info (shown after viewing)
- Mark job as completed/cancelled

### `/post-job` - Post a Job (Paid)
- Job form (title, description, category, zip, budget, timeline)
- Review page
- Stripe Checkout for $25
- Success/confirmation page

---

## Admin Pages

### `/admin` - Admin Dashboard
- Stats: Total users, pending contractors, open jobs, revenue
- Quick links to sections

### `/admin/contractors` - Contractor Approvals
- Table of pending contractors
- Columns: Name, license #, trade, applied date
- Actions: View profile, Approve, Reject

### `/admin/contractors/[id]` - Contractor Detail
- Full profile
- License number (for manual verification)
- Photos
- Approve/Reject buttons

### `/admin/jobs` - All Jobs
- List of all jobs
- Filter by status
- View details

### `/admin/payments` - Payments
- List of all payments
- Stripe links for refunds

---

## Utility Pages

### `/pending-approval` - Contractor Pending
- Message: "Your application is under review"
- Contact support link

### `/payment/success` - Payment Success
- Confirmation message
- Link to dashboard

### `/payment/cancelled` - Payment Cancelled
- Message: Payment not completed
- Link to try again

### `/404` - Not Found
- Simple 404 page with home link

# Manual Processes - Contractie MVP

> **Rule**: If a computer CAN do it but a human can do it FASTER for MVP, do it manually.

## 1. License Verification

### Process
1. Contractor submits license number during signup
2. Admin receives notification (email or dashboard)
3. Admin visits relevant state contractor board website:
   - Example: California → CSLB.ca.gov
   - Texas → TDLR.texas.gov
   - Florida → MyFloridaLicense.com
4. Admin searches license number
5. Admin verifies:
   - License is active
   - Name matches
   - Trade/category matches
6. Admin clicks "Approve" or "Reject" in dashboard

### Time Estimate
- 2-3 minutes per contractor
- First 50 contractors: ~2 hours total

### Tools Needed
- Bookmark folder with state contractor board URLs
- Spreadsheet backup (optional)

---

## 2. Contractor Approval

### Process
1. New contractor signs up
2. Appears in /admin/contractors with "Pending" status
3. Admin reviews:
   - License verification (above)
   - Photos quality (not spam/fake)
   - Past job description (reasonable)
4. Admin clicks:
   - ✅ Approve → Contractor can browse jobs
   - ❌ Reject → Contractor gets email with reason

### Auto-Email on Approval
```
Subject: You're approved on Contractie!

Hi [Name],

Your contractor profile has been approved. You can now browse and apply to jobs in your area.

[Browse Jobs Button]

Thanks,
Contractie Team
```

---

## 3. Dispute Resolution

### Common Issues & Responses

| Issue | Manual Response |
|-------|-----------------|
| Contractor didn't show up | Email both parties, request explanation, mediate |
| Homeowner ghosted | Follow up with homeowner, nudge to close job |
| Payment dispute | Direct to Stripe support, provide transaction ID |
| Fake contractor | Suspend account, refund homeowner if applicable |
| Job posted in wrong category | Edit job manually, notify poster |

### Process
1. Receive complaint via email/support form
2. Look up job in admin dashboard
3. Contact both parties via email
4. Document resolution in notes
5. Take action (refund, suspend, etc.)

---

## 4. Refunds

### When to Refund
- Job posted by mistake
- No contractors available in area (rare)
- Technical issue prevented posting
- Customer complaint with merit

### Process
1. Receive refund request
2. Review in admin dashboard (/admin/payments)
3. Find Stripe payment ID
4. Log into Stripe Dashboard
5. Issue refund (full or partial)
6. Update payment status in database manually
7. Email customer confirmation

### Time Estimate
- 5 minutes per refund

---

## 5. Customer Support

### Channels
- Email: support@contractie.com
- No chat, no phone for MVP

### Response Template
```
Hi [Name],

Thanks for reaching out about [issue].

[Specific answer or action taken]

Let me know if you need anything else!

Best,
[Your name]
Contractie Support
```

### SLA (Manual)
- Respond within 24 hours (business days)
- Urgent issues (payment failures) within 4 hours

---

## 6. Content Moderation

### What to Watch For
- Fake contractor profiles
- Spam job postings
- Inappropriate photos
- Offensive language

### Process
1. Daily check of new profiles and jobs
2. Flag suspicious content
3. Delete/suspend if confirmed spam
4. Email user if accidental removal

---

## 7. Onboarding First Contractors

### Personal Outreach (First 10)
1. Make list of contractors in your network
2. Call or text personally
3. Walk them through signup
4. Approve immediately after verification
5. Ask for feedback

### Why Manual?
- Get early feedback
- Ensure quality for first users
- Build relationships

---

## Summary: Time Commitment

| Task | Frequency | Time/Week |
|------|-----------|-----------|
| License verification | Per signup | ~1 hour |
| Support emails | Daily | ~2 hours |
| Disputes | As needed | ~1 hour |
| Content moderation | Daily | 30 min |
| **Total** | | **~5 hours/week** |

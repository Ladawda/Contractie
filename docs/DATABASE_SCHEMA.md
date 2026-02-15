# Database Schema - MVP

> **Rule**: Minimal tables. No over-engineering. Add fields as needed.

## Tables

### 1. `users`
Both contractors and homeowners. Differentiated by `role`.

```sql
create table users (
  id uuid primary key default gen_random_uuid(),
  email text unique not null,
  phone text,
  full_name text not null,
  role text not null check (role in ('contractor', 'homeowner', 'admin')),
  created_at timestamp default now(),
  updated_at timestamp default now()
);
```

### 2. `contractor_profiles`
Extended profile for contractors only.

```sql
create table contractor_profiles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references users(id) on delete cascade,
  license_number text not null,
  trade text not null, -- Plumbing, Electrical, HVAC, etc.
  service_zip_codes text[], -- array of zip codes they serve
  bio text,
  status text default 'pending' check (status in ('pending', 'approved', 'rejected')),
  approved_at timestamp,
  created_at timestamp default now(),
  updated_at timestamp default now()
);
```

### 3. `contractor_photos`
Photos of past work (separate table for flexibility).

```sql
create table contractor_photos (
  id uuid primary key default gen_random_uuid(),
  contractor_id uuid references contractor_profiles(id) on delete cascade,
  storage_path text not null,
  caption text,
  created_at timestamp default now()
);
```

### 4. `past_jobs`
Previous work examples.

```sql
create table past_jobs (
  id uuid primary key default gen_random_uuid(),
  contractor_id uuid references contractor_profiles(id) on delete cascade,
  title text not null,
  description text,
  completed_date date,
  created_at timestamp default now()
);
```

### 5. `jobs`
Job postings by homeowners.

```sql
create table jobs (
  id uuid primary key default gen_random_uuid(),
  homeowner_id uuid references users(id) on delete cascade,
  title text not null,
  description text not null,
  category text not null,
  zip_code text not null,
  budget_min integer,
  budget_max integer,
  timeline text,
  status text default 'open' check (status in ('open', 'in_progress', 'completed', 'cancelled')),
  payment_status text default 'pending' check (payment_status in ('pending', 'paid', 'refunded')),
  created_at timestamp default now(),
  updated_at timestamp default now()
);
```

### 6. `job_applications`
Contractors expressing interest in jobs.

```sql
create table job_applications (
  id uuid primary key default gen_random_uuid(),
  job_id uuid references jobs(id) on delete cascade,
  contractor_id uuid references contractor_profiles(id) on delete cascade,
  message text, -- optional short message
  status text default 'pending' check (status in ('pending', 'accepted', 'declined')),
  created_at timestamp default now(),
  unique(job_id, contractor_id) -- one application per contractor per job
);
```

### 7. `payments`
Stripe payment records.

```sql
create table payments (
  id uuid primary key default gen_random_uuid(),
  job_id uuid references jobs(id) on delete set null,
  user_id uuid references users(id) on delete set null,
  stripe_payment_intent_id text,
  stripe_checkout_session_id text,
  amount integer not null, -- in cents
  status text not null check (status in ('pending', 'succeeded', 'failed', 'refunded')),
  created_at timestamp default now()
);
```

---

## Indexes (Add as Needed)

```sql
-- Job lookups
CREATE INDEX idx_jobs_zip_code ON jobs(zip_code);
CREATE INDEX idx_jobs_status ON jobs(status);
CREATE INDEX idx_jobs_category ON jobs(category);

-- Contractor lookups
CREATE INDEX idx_contractor_profiles_status ON contractor_profiles(status);
CREATE INDEX idx_contractor_profiles_trade ON contractor_profiles(trade);

-- Applications
CREATE INDEX idx_job_applications_job_id ON job_applications(job_id);
CREATE INDEX idx_job_applications_contractor_id ON job_applications(contractor_id);
```

---

## Row Level Security (RLS) Policies

```sql
-- Users can read their own data
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read own profile" 
  ON users FOR SELECT 
  USING (auth.uid() = id);

-- Contractors can browse approved contractor profiles
CREATE POLICY "Public can view approved contractors" 
  ON contractor_profiles FOR SELECT 
  USING (status = 'approved');

-- Jobs are visible to approved contractors in matching zip codes
-- (Simplified - actual policy may need function)
CREATE POLICY "Open jobs are visible" 
  ON jobs FOR SELECT 
  USING (status = 'open');
```

# Contractie MVP - Supabase Setup

## 1. Create Tables

Run this SQL in Supabase SQL Editor (https://supabase.com/dashboard/project/_/sql/new)

```sql
-- Enable RLS (Row Level Security)
alter table auth.users enable row level security;

-- ============================================
-- PROFILES TABLE (extends Supabase Auth)
-- ============================================
create table profiles (
  id uuid references auth.users on delete cascade primary key,
  type text not null check (type in ('contractor', 'homeowner')),
  full_name text not null,
  phone text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- RLS: Users can read their own profile
alter table profiles enable row level security;

create policy "Users can view own profile"
  on profiles for select
  using (auth.uid() = id);

create policy "Users can update own profile"
  on profiles for update
  using (auth.uid() = id);

-- Trigger: Create profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (id, type, full_name)
  VALUES (
    new.id,
    new.raw_user_meta_data->>'type',
    new.raw_user_meta_data->>'full_name'
  );
  RETURN new;
END;
$$ LANGUAGE plpgsql security definer;

CREATE OR REPLACE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- ============================================
-- CONTRACTORS TABLE
-- ============================================
create table contractors (
  id uuid default gen_random_uuid() primary key,
  profile_id uuid references profiles(id) on delete cascade not null,
  license_number text,
  license_verified boolean default false,
  trade text not null, -- plumbing, electrical, hvac, carpentry, painting, roofing
  bio text,
  photos text[] default '{}',
  zip_code text not null,
  is_approved boolean default false,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- RLS
alter table contractors enable row level security;

create policy "Contractors are viewable by everyone"
  on contractors for select
  using (true);

create policy "Contractors can update own profile"
  on contractors for update
  using (auth.uid() = profile_id);

create policy "Contractors can insert own profile"
  on contractors for insert
  with check (auth.uid() = profile_id);

-- ============================================
-- JOBS TABLE
-- ============================================
create table jobs (
  id uuid default gen_random_uuid() primary key,
  homeowner_id uuid references profiles(id) on delete cascade not null,
  title text not null,
  description text not null,
  trade text not null,
  zip_code text not null,
  budget_min integer,
  budget_max integer,
  status text default 'pending_payment' check (status in ('pending_payment', 'open', 'closed', 'filled')),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- RLS
alter table jobs enable row level security;

create policy "Jobs are viewable by everyone"
  on jobs for select
  using (true);

create policy "Homeowners can create jobs"
  on jobs for insert
  with check (auth.uid() = homeowner_id);

create policy "Homeowners can update own jobs"
  on jobs for update
  using (auth.uid() = homeowner_id);

create policy "Homeowners can delete own jobs"
  on jobs for delete
  using (auth.uid() = homeowner_id);

-- ============================================
-- APPLICATIONS TABLE (contractor expresses interest)
-- ============================================
create table applications (
  id uuid default gen_random_uuid() primary key,
  job_id uuid references jobs(id) on delete cascade not null,
  contractor_id uuid references contractors(id) on delete cascade not null,
  message text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  unique(job_id, contractor_id) -- Prevent duplicate applications
);

-- RLS
alter table applications enable row level security;

create policy "Homeowners can view applications for their jobs"
  on applications for select
  using (
    auth.uid() in (
      select homeowner_id from jobs where id = job_id
    )
  );

create policy "Contractors can view own applications"
  on applications for select
  using (
    auth.uid() in (
      select profile_id from contractors where id = contractor_id
    )
  );

create policy "Contractors can create applications"
  on applications for insert
  with check (
    auth.uid() in (
      select profile_id from contractors where id = contractor_id
    )
  );

-- ============================================
-- PAYMENTS TABLE
-- ============================================
create table payments (
  id uuid default gen_random_uuid() primary key,
  job_id uuid references jobs(id) on delete cascade not null,
  stripe_payment_intent_id text,
  stripe_session_id text,
  amount integer not null, -- cents
  status text default 'pending' check (status in ('pending', 'succeeded', 'failed', 'refunded')),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- RLS
alter table payments enable row level security;

create policy "Homeowners can view own payments"
  on payments for select
  using (
    auth.uid() in (
      select homeowner_id from jobs where id = job_id
    )
  );

-- Only service role can insert/update payments (via webhook)
create policy "Service role can manage payments"
  on payments for all
  using (false)
  with check (false);
```

## 2. Create Storage Bucket

Run in SQL Editor:

```sql
-- Create storage bucket for contractor photos
insert into storage.buckets (id, name, public) 
values ('contractor-photos', 'contractor-photos', true);

-- Allow authenticated users to upload
CREATE POLICY "Authenticated users can upload photos"
  ON storage.objects FOR INSERT
  TO authenticated
  WITH CHECK (bucket_id = 'contractor-photos');

-- Allow public to view photos
CREATE POLICY "Public can view photos"
  ON storage.objects FOR SELECT
  TO anon, authenticated
  USING (bucket_id = 'contractor-photos');

-- Allow users to delete own photos
CREATE POLICY "Users can delete own photos"
  ON storage.objects FOR DELETE
  TO authenticated
  USING (bucket_id = 'contractor-photos' AND auth.uid()::text = (storage.foldername(name))[1]);
```

## 3. Environment Variables

Add to `.env.local`:

```bash
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

## 4. Client Setup

```ts
// lib/supabase.ts
import { createClient } from '@supabase/supabase-js'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

// Browser client
export const supabase = createClientComponentClient()

// Server client (for API routes)
export const createServerClient = () => {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    {
      auth: {
        autoRefreshToken: false,
        persistSession: false
      }
    }
  )
}
```

## 5. Types

```ts
// types/index.ts
export interface Profile {
  id: string;
  type: 'contractor' | 'homeowner';
  full_name: string;
  phone?: string;
  created_at: string;
}

export interface Contractor {
  id: string;
  profile_id: string;
  license_number?: string;
  license_verified: boolean;
  trade: string;
  bio?: string;
  photos: string[];
  zip_code: string;
  is_approved: boolean;
  created_at: string;
}

export interface Job {
  id: string;
  homeowner_id: string;
  title: string;
  description: string;
  trade: string;
  zip_code: string;
  budget_min?: number;
  budget_max?: number;
  status: 'pending_payment' | 'open' | 'closed' | 'filled';
  created_at: string;
}

export interface Application {
  id: string;
  job_id: string;
  contractor_id: string;
  message?: string;
  created_at: string;
}

export interface Payment {
  id: string;
  job_id: string;
  stripe_payment_intent_id?: string;
  amount: number;
  status: 'pending' | 'succeeded' | 'failed' | 'refunded';
  created_at: string;
}
```

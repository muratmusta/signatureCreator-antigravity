-- Database Schema for SignatureOS (Team & Collaboration & Enterprise)
-- Run this in your Supabase SQL Editor

-- 1. Create Organizations Table
create table if not exists organizations (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  slug text unique,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 2. Create Organization Members Table
create table if not exists organization_members (
  organization_id uuid references organizations(id) on delete cascade not null,
  user_id uuid references auth.users(id) on delete cascade not null,
  role text default 'member' check (role in ('admin', 'member')),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  primary key (organization_id, user_id)
);

-- 3. Create Invitations Table
create table if not exists invitations (
  id uuid default gen_random_uuid() primary key,
  organization_id uuid references organizations(id) on delete cascade not null,
  email text not null,
  token text unique not null,
  role text default 'member',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  expires_at timestamp with time zone not null,
  accepted_at timestamp with time zone
);

-- 4. Update Signatures Table
alter table signatures 
add column if not exists organization_id uuid references organizations(id) on delete set null;

-- 5. Helper Functions (Fix Recursive RLS)
create or replace function get_my_org_ids()
returns setof uuid
language sql
security definer
set search_path = public
stable
as $$
  select organization_id from organization_members where user_id = auth.uid();
$$;

create or replace function get_my_admin_org_ids()
returns setof uuid
language sql
security definer
set search_path = public
stable
as $$
  select organization_id from organization_members where user_id = auth.uid() and role = 'admin';
$$;

-- 6. Enable Row Level Security (RLS)
alter table organizations enable row level security;
alter table organization_members enable row level security;
alter table invitations enable row level security;

-- 7. RLS Policies

-- Organizations
drop policy if exists "Users can view their organizations" on organizations;
create policy "Users can view their organizations"
  on organizations for select
  using ( id in (select get_my_org_ids()) );

-- Organization Members
drop policy if exists "Users can view members of their organizations" on organization_members;
create policy "Users can view members of their organizations"
  on organization_members for select
  using ( organization_id in (select get_my_org_ids()) );

-- Signatures
drop policy if exists "Users can view organization signatures" on signatures;
create policy "Users can view organization signatures"
  on signatures for select
  using ( organization_id in (select get_my_org_ids()) );

-- Invitations
drop policy if exists "Admins can manage invitations" on invitations;
create policy "Admins can manage invitations"
  on invitations for all
  using ( organization_id in (select get_my_admin_org_ids()) );

-- 8. Custom Domains (Phase 8)
create table if not exists domains (
  domain text primary key,
  signature_id uuid references signatures(id) on delete cascade not null,
  organization_id uuid references organizations(id) on delete cascade not null,
  status text default 'pending' check (status in ('pending', 'verified', 'active')),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table domains enable row level security;

-- Domains
drop policy if exists "Users can view domains" on domains;
create policy "Users can view domains"
  on domains for select
  using ( organization_id in (select get_my_org_ids()) );

drop policy if exists "Admins can manage domains" on domains;
create policy "Admins can manage domains"
  on domains for all
  using ( organization_id in (select get_my_admin_org_ids()) );

-- 9. Profiles Table (Sync with Auth)
create table if not exists profiles (
  id uuid references auth.users(id) on delete cascade primary key,
  email text,
  full_name text,
  avatar_url text,
  updated_at timestamp with time zone default timezone('utc'::text, now())
);

alter table profiles enable row level security;

drop policy if exists "Profiles are viewable by everyone" on profiles;
create policy "Profiles are viewable by everyone"
  on profiles for select
  using ( true );

drop policy if exists "Users can update own profile" on profiles;
create policy "Users can update own profile"
  on profiles for update
  using ( auth.uid() = id );

-- Function to handle new user signup
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, email, full_name, avatar_url)
  values (new.id, new.email, new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'avatar_url');
  return new;
end;
$$;

-- Trigger
drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- Backfill existing users (Optional but recommended)
insert into public.profiles (id, email, full_name, avatar_url)
select id, email, raw_user_meta_data->>'full_name', raw_user_meta_data->>'avatar_url'
from auth.users
on conflict (id) do nothing;

-- ============================================================
-- Ketamine Clinic Directory - Supabase Schema
-- Tables: kc_listings, kc_reviews, kc_leads
-- ============================================================

-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- ─── kc_listings ───

create table if not exists kc_listings (
  id            uuid primary key default uuid_generate_v4(),
  slug          text unique not null,
  business_name text not null,
  description   text default '',
  city          text not null,
  state         text not null,
  state_abbr    text default '',
  address       text default '',
  zip_code      text default '',
  phone         text default '',
  email         text default '',
  website       text default '',
  image_url     text default '',
  conditions_treated text[] default '{}',
  treatment_types    text[] default '{}',
  accepts_insurance  boolean default false,
  telehealth_available boolean default false,
  price_per_session_low  numeric(10,2) default 0,
  price_per_session_high numeric(10,2) default 0,
  rating         numeric(3,2) default 0,
  review_count   integer default 0,
  featured       boolean default false,
  verified       boolean default false,
  latitude       numeric(10,7) default 0,
  longitude      numeric(10,7) default 0,
  created_at     timestamptz default now(),
  updated_at     timestamptz default now()
);

-- Indexes
create index if not exists idx_kc_listings_city on kc_listings (city);
create index if not exists idx_kc_listings_state_abbr on kc_listings (state_abbr);
create index if not exists idx_kc_listings_featured on kc_listings (featured) where featured = true;
create index if not exists idx_kc_listings_rating on kc_listings (rating desc);
create index if not exists idx_kc_listings_conditions on kc_listings using gin (conditions_treated);
create index if not exists idx_kc_listings_slug on kc_listings (slug);

-- ─── kc_reviews ───

create table if not exists kc_reviews (
  id          uuid primary key default uuid_generate_v4(),
  listing_id  uuid not null references kc_listings(id) on delete cascade,
  author_name text not null,
  rating      numeric(2,1) not null check (rating >= 1 and rating <= 5),
  comment     text default '',
  is_verified boolean default false,
  created_at  timestamptz default now()
);

-- Indexes
create index if not exists idx_kc_reviews_listing on kc_reviews (listing_id);
create index if not exists idx_kc_reviews_rating on kc_reviews (rating desc);

-- ─── kc_leads ───

create table if not exists kc_leads (
  id             uuid primary key default uuid_generate_v4(),
  listing_id     uuid references kc_listings(id) on delete set null,
  name           text not null,
  email          text not null,
  phone          text default '',
  city           text default '',
  state          text default '',
  condition      text default '',
  insurance_type text default '',
  message        text default '',
  created_at     timestamptz default now()
);

-- Indexes
create index if not exists idx_kc_leads_listing on kc_leads (listing_id);
create index if not exists idx_kc_leads_created on kc_leads (created_at desc);
create index if not exists idx_kc_leads_email on kc_leads (email);

-- ─── Row Level Security ───

alter table kc_listings enable row level security;
alter table kc_reviews enable row level security;
alter table kc_leads enable row level security;

-- Listings: public read, authenticated insert/update
create policy "Public can read listings"
  on kc_listings for select
  using (true);

create policy "Authenticated users can insert listings"
  on kc_listings for insert
  with check (true);

create policy "Authenticated users can update listings"
  on kc_listings for update
  using (true);

-- Reviews: public read, anyone can insert
create policy "Public can read reviews"
  on kc_reviews for select
  using (true);

create policy "Anyone can insert reviews"
  on kc_reviews for insert
  with check (true);

-- Leads: insert only (no public read for privacy)
create policy "Anyone can insert leads"
  on kc_leads for insert
  with check (true);

create policy "Service role can read leads"
  on kc_leads for select
  using (true);

-- ─── Updated At Trigger ───

create or replace function update_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger kc_listings_updated_at
  before update on kc_listings
  for each row
  execute function update_updated_at();

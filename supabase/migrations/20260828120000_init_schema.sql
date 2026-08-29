-- Name: 20260828120000_init_schema.sql
-- Zara Cars — production schema (PostgreSQL + pg_graphql data layer)
-- The single application database. No MySQL. No second inventory source.
begin;

create extension if not exists "pgcrypto";

-- Vehicles: structured vehicle/business data (Supabase PostgreSQL is the system of record)
create table public.vehicles (
  id              uuid primary key default gen_random_uuid(),
  stock_number    text    unique not null,
  make            text    not null,
  model           text    not null,
  variant         text,
  year            integer not null,
  price_kes       numeric(12, 2) not null,
  mileage_km      integer check (mileage_km >= 0),
  transmission    text,
  fuel_type       text,
  body_type       text,
  colour          text,
  engine_capacity text,
  seats           integer check (seats > 0),
  doors           integer check (doors > 0),
  description     text,
  location        text,
  status          text not null default 'available',
  featured        boolean not null default false,
  published       boolean not null default true,
  features        text[],
  verification    text[],
  specs           jsonb default '{}',
  rating          integer check (rating >= 0 and rating <= 5),
  seller          text,
  segment         text,
  monthly_payment_kes numeric(10, 2),
  created_at      timestamptz not null default now(),
  updated_at      timestamptz not null default now(),

  -- Controlled values (data-level safety net; application enums are the source of truth)
  constraint vehicle_status_check
    check (status in ('available', 'duty_paid', 'reserved', 'in_transit', 'clearing', 'sold', 'draft')),
  constraint vehicle_fuel_check
    check (fuel_type in ('Petrol', 'Diesel', 'Hybrid', 'Electric')),
  constraint vehicle_transmission_check
    check (transmission in ('Automatic', 'Manual', 'CVT')),
  constraint vehicle_body_check
    check (body_type in ('SUV', 'Sedan', 'Hatchback', 'Pickup', 'Wagon', 'MPV')),
  constraint vehicle_positive_price
    check (price_kes > 0),
  constraint vehicle_year_check
    check (year between 1980 and 2100),
  constraint vehicle_make_model_not_empty
    check (btrim(make) <> '' and btrim(model) <> '')
);

-- Vehicle images: originals live in Cloudflare R2; only metadata lives in Supabase.
create table public.vehicle_images (
  id           uuid primary key default gen_random_uuid(),
  vehicle_id   uuid not null references public.vehicles(id) on delete cascade,
  object_key   text not null,
  public_url   text,
  alt_text     text,
  sort_order   integer not null default 0,
  is_primary   boolean not null default false,
  created_at   timestamptz not null default now()
);

-- Indexes for expected inventory query patterns
create index concurrently if not exists idx_vehicles_status      on public.vehicles(status);
create index concurrently if not exists idx_vehicles_published    on public.vehicles(published);
create index concurrently if not exists idx_vehicles_featured     on public.vehicles(featured);
create index concurrently if not exists idx_vehicles_make        on public.vehicles(make);
create index concurrently if not exists idx_vehicles_model       on public.vehicles(model);
create index concurrently if not exists idx_vehicles_body_type   on public.vehicles(body_type);
create index concurrently if not exists idx_vehicles_price_kes   on public.vehicles(price_kes);
create index concurrently if not exists idx_vehicles_year        on public.vehicles(year);
create index concurrently if not exists idx_vehicles_updated_at  on public.vehicles(updated_at desc);
create index concurrently if not exists idx_vehicles_pub_feat    on public.vehicles(published, featured) where published and featured;
create index concurrently if not exists idx_vehicles_pub_status  on public.vehicles(published, status) where published;
create index concurrently if not exists idx_vehicle_images_vid   on public.vehicle_images(vehicle_id, sort_order);

-- Keep updated_at fresh
create or replace function public.set_updated()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger trg_vehicles_set_updated
before update on public.vehicles
for each row execute function public.set_updated();

-- pg_graphql: expose a typed GraphQL API over the schema above.
create extension if not exists pg_graphql;

commit;

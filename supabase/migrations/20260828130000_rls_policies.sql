-- Name: 20260828130000_rls_policies.sql
-- Zara Cars — Row Level Security: public read access + dealer write access.
-- Authorization is enforced at the data layer. Route hiding is NOT a security control.
begin;

-- Authentication model:
--   anon          -> public visitors (no session)
--   authenticated -> signed-in dealer with a JWT `role` claim = 'dealer'
--
-- Public visitors may read published vehicles + approved public image metadata.
-- They may NOT modify inventory.
-- Dealers may create/update/delete their inventory.

-- ===== vehicles =====
alter table public.vehicles enable row level security;
alter table public.vehicles force row level security;

-- Public: read-only, published, listed-for-sale vehicles.
create policy "public can read published vehicles"
  on public.vehicles for select
  using (
    published = true
    and status in ('available', 'duty_paid', 'reserved', 'in_transit', 'clearing')
  );

-- Dealer: full management of inventory they are authorized to manage.
create policy "dealer can create vehicles"
  on public.vehicles for insert
  with check (
    auth.role() = 'authenticated'
    and (auth.jwt() ->> 'role') = 'dealer'
  );

create policy "dealer can update vehicles"
  on public.vehicles for update
  using (
    auth.role() = 'authenticated'
    and (auth.jwt() ->> 'role') = 'dealer'
  )
  with check (
    auth.role() = 'authenticated'
    and (auth.jwt() ->> 'role') = 'dealer'
  );

create policy "dealer can delete vehicles"
  on public.vehicles for delete
  using (
    auth.role() = 'authenticated'
    and (auth.jwt() ->> 'role') = 'dealer'
  );

-- ===== vehicle_images =====
alter table public.vehicle_images enable row level security;
alter table public.vehicle_images force row level security;

-- Public: approved image metadata only (public_url populated for R2 delivery).
create policy "public can read approved images"
  on public.vehicle_images for select
  using (public_url is not null);

create policy "dealer can manage images"
  on public.vehicle_images for all
  using (
    auth.role() = 'authenticated'
    and (auth.jwt() ->> 'role') = 'dealer'
  )
  with check (
    auth.role() = 'authenticated'
    and (auth.jwt() ->> 'role') = 'dealer'
  );

-- Default deny for anything not explicitly allowed (defense in depth).
revoke all on public.vehicles from public;
revoke all on public.vehicle_images from public;
grant usage on schema public to anon, authenticated;
grant select on public.vehicles to anon;
grant select on public.vehicle_images to anon;

commit;

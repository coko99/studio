-- Caffe Bar Studio: menu, schedule, featured items + admin-only writes

create extension if not exists "pgcrypto";

create table if not exists public.menu_items (
  id uuid primary key default gen_random_uuid(),
  category text not null,
  name text not null,
  day_price integer,
  night_price integer,
  sort_order integer not null default 0,
  active boolean not null default true,
  updated_at timestamptz not null default now(),
  unique (category, name)
);

create table if not exists public.menu_schedule (
  id integer primary key default 1 check (id = 1),
  night_start_hour integer not null default 20 check (night_start_hour between 0 and 23),
  night_end_hour integer not null default 3 check (night_end_hour between 0 and 23),
  night_weekdays integer[] not null default '{5,6}',
  timezone text not null default 'Europe/Belgrade',
  updated_at timestamptz not null default now()
);

create table if not exists public.featured_items (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  tag text not null default '',
  description text not null default '',
  image_url text not null default '',
  day_price integer not null default 0,
  night_price integer not null default 0,
  sort_order integer not null default 0,
  active boolean not null default true,
  updated_at timestamptz not null default now()
);

insert into public.menu_schedule (id)
values (1)
on conflict (id) do nothing;

create index if not exists menu_items_category_sort_idx
  on public.menu_items (category, sort_order);

create index if not exists featured_items_sort_idx
  on public.featured_items (sort_order);

alter table public.menu_items enable row level security;
alter table public.menu_schedule enable row level security;
alter table public.featured_items enable row level security;

create or replace function public.is_studio_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select coalesce(
    lower(auth.jwt() ->> 'email') = lower('admin@studio-caffe-bar.rs'),
    false
  );
$$;

revoke all on function public.is_studio_admin() from public;
grant execute on function public.is_studio_admin() to authenticated, anon;

drop policy if exists "Public read menu_items" on public.menu_items;
create policy "Public read menu_items"
  on public.menu_items for select
  to anon, authenticated
  using (true);

drop policy if exists "Admin write menu_items" on public.menu_items;
create policy "Admin write menu_items"
  on public.menu_items for all
  to authenticated
  using (public.is_studio_admin())
  with check (public.is_studio_admin());

drop policy if exists "Public read menu_schedule" on public.menu_schedule;
create policy "Public read menu_schedule"
  on public.menu_schedule for select
  to anon, authenticated
  using (true);

drop policy if exists "Admin write menu_schedule" on public.menu_schedule;
create policy "Admin write menu_schedule"
  on public.menu_schedule for all
  to authenticated
  using (public.is_studio_admin())
  with check (public.is_studio_admin());

drop policy if exists "Public read featured_items" on public.featured_items;
create policy "Public read featured_items"
  on public.featured_items for select
  to anon, authenticated
  using (true);

drop policy if exists "Admin write featured_items" on public.featured_items;
create policy "Admin write featured_items"
  on public.featured_items for all
  to authenticated
  using (public.is_studio_admin())
  with check (public.is_studio_admin());

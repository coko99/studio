-- Lock write access to the single admin account only.

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

drop policy if exists "Admin write menu_items" on public.menu_items;
create policy "Admin write menu_items"
  on public.menu_items for all
  to authenticated
  using (public.is_studio_admin())
  with check (public.is_studio_admin());

drop policy if exists "Admin write menu_schedule" on public.menu_schedule;
create policy "Admin write menu_schedule"
  on public.menu_schedule for all
  to authenticated
  using (public.is_studio_admin())
  with check (public.is_studio_admin());

drop policy if exists "Admin write featured_items" on public.featured_items;
create policy "Admin write featured_items"
  on public.featured_items for all
  to authenticated
  using (public.is_studio_admin())
  with check (public.is_studio_admin());

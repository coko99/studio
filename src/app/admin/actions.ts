"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { ADMIN_EMAIL, isAdminEmail } from "@/lib/admin";
import { createClient } from "@/lib/supabase/server";
import { parseRsd } from "@/lib/types/menu-db";

async function requireAdmin() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user || !isAdminEmail(user.email)) {
    if (user) {
      await supabase.auth.signOut();
    }
    redirect("/admin/login?error=Nemaš+pristup+admin+panelu.");
  }

  return { supabase, user };
}

function revalidatePublic() {
  revalidatePath("/");
  revalidatePath("/karta-pica");
  revalidatePath("/admin");
  revalidatePath("/admin/cene");
  revalidatePath("/admin/istaknuti");
  revalidatePath("/admin/raspored");
}

export async function loginAction(formData: FormData) {
  const email = ADMIN_EMAIL;
  const password = String(formData.get("password") ?? "");
  const next = String(formData.get("next") ?? "/admin");

  const supabase = await createClient();
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    redirect(`/admin/login?error=${encodeURIComponent(error.message)}`);
  }

  if (!isAdminEmail(data.user?.email)) {
    await supabase.auth.signOut();
    redirect("/admin/login?error=Nemaš+pristup+admin+panelu.");
  }

  redirect(next.startsWith("/admin") ? next : "/admin");
}

export async function logoutAction() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/admin/login");
}

export async function updateMenuItemAction(formData: FormData) {
  const { supabase } = await requireAdmin();

  const id = String(formData.get("id") ?? "");
  const name = String(formData.get("name") ?? "").trim();
  const category = String(formData.get("category") ?? "").trim();
  const dayPrice = parseRsd(String(formData.get("day_price") ?? ""));
  const nightPrice = parseRsd(String(formData.get("night_price") ?? ""));
  const sortOrder = parseInt(String(formData.get("sort_order") ?? "0"), 10);
  const active = formData.get("active") === "on";

  if (!id || !name || !category) {
    redirect("/admin/cene?error=Nedostaju+obavezna+polja");
  }

  const { error } = await supabase
    .from("menu_items")
    .update({
      name,
      category,
      day_price: dayPrice,
      night_price: nightPrice,
      sort_order: Number.isFinite(sortOrder) ? sortOrder : 0,
      active,
      updated_at: new Date().toISOString(),
    })
    .eq("id", id);

  if (error) {
    redirect(`/admin/cene?error=${encodeURIComponent(error.message)}`);
  }

  revalidatePublic();
  redirect("/admin/cene?ok=1");
}

export async function createMenuItemAction(formData: FormData) {
  const { supabase } = await requireAdmin();

  const name = String(formData.get("name") ?? "").trim();
  const category = String(formData.get("category") ?? "").trim();
  const dayPrice = parseRsd(String(formData.get("day_price") ?? ""));
  const nightPrice = parseRsd(String(formData.get("night_price") ?? ""));
  const sortOrder = parseInt(String(formData.get("sort_order") ?? "0"), 10);

  if (!name || !category) {
    redirect("/admin/cene?error=Nedostaju+obavezna+polja");
  }

  const { error } = await supabase.from("menu_items").insert({
    name,
    category,
    day_price: dayPrice,
    night_price: nightPrice,
    sort_order: Number.isFinite(sortOrder) ? sortOrder : 0,
    active: true,
  });

  if (error) {
    redirect(`/admin/cene?error=${encodeURIComponent(error.message)}`);
  }

  revalidatePublic();
  redirect("/admin/cene?ok=1");
}

export async function deleteMenuItemAction(formData: FormData) {
  const { supabase } = await requireAdmin();
  const id = String(formData.get("id") ?? "");

  if (!id) redirect("/admin/cene?error=Nedostaje+ID");

  const { error } = await supabase.from("menu_items").delete().eq("id", id);
  if (error) {
    redirect(`/admin/cene?error=${encodeURIComponent(error.message)}`);
  }

  revalidatePublic();
  redirect("/admin/cene?ok=1");
}

export async function updateScheduleAction(formData: FormData) {
  const { supabase } = await requireAdmin();

  const nightStartHour = parseInt(String(formData.get("night_start_hour") ?? "20"), 10);
  const nightEndHour = parseInt(String(formData.get("night_end_hour") ?? "3"), 10);
  const weekdays = formData
    .getAll("night_weekdays")
    .map((value) => parseInt(String(value), 10))
    .filter((value) => Number.isFinite(value));

  const { error } = await supabase
    .from("menu_schedule")
    .update({
      night_start_hour: nightStartHour,
      night_end_hour: nightEndHour,
      night_weekdays: weekdays.length > 0 ? weekdays : [5, 6],
      updated_at: new Date().toISOString(),
    })
    .eq("id", 1);

  if (error) {
    redirect(`/admin/raspored?error=${encodeURIComponent(error.message)}`);
  }

  revalidatePublic();
  redirect("/admin/raspored?ok=1");
}

export async function upsertFeaturedItemAction(formData: FormData) {
  const { supabase } = await requireAdmin();

  const id = String(formData.get("id") ?? "").trim();
  const name = String(formData.get("name") ?? "").trim();
  const tag = String(formData.get("tag") ?? "").trim();
  const description = String(formData.get("description") ?? "").trim();
  const imageUrl = String(formData.get("image_url") ?? "").trim();
  const dayPrice = parseRsd(String(formData.get("day_price") ?? "")) ?? 0;
  const nightPrice = parseRsd(String(formData.get("night_price") ?? "")) ?? 0;
  const sortOrder = parseInt(String(formData.get("sort_order") ?? "0"), 10);
  const active = formData.get("active") === "on" || formData.get("active") === "true";

  if (!name) {
    redirect("/admin/istaknuti?error=Ime+je+obavezno");
  }

  const payload = {
    name,
    tag,
    description,
    image_url: imageUrl,
    day_price: dayPrice,
    night_price: nightPrice,
    sort_order: Number.isFinite(sortOrder) ? sortOrder : 0,
    active,
    updated_at: new Date().toISOString(),
  };

  const { error } = id
    ? await supabase.from("featured_items").update(payload).eq("id", id)
    : await supabase.from("featured_items").insert(payload);

  if (error) {
    redirect(`/admin/istaknuti?error=${encodeURIComponent(error.message)}`);
  }

  revalidatePublic();
  redirect("/admin/istaknuti?ok=1");
}

export async function deleteFeaturedItemAction(formData: FormData) {
  const { supabase } = await requireAdmin();
  const id = String(formData.get("id") ?? "");

  if (!id) redirect("/admin/istaknuti?error=Nedostaje+ID");

  const { error } = await supabase.from("featured_items").delete().eq("id", id);
  if (error) {
    redirect(`/admin/istaknuti?error=${encodeURIComponent(error.message)}`);
  }

  revalidatePublic();
  redirect("/admin/istaknuti?ok=1");
}

import { unstable_noStore as noStore } from "next/cache";
import {
  dayMenuCategories,
  nightMenuCategories,
} from "@/lib/menus";
import {
  cocktails,
  featuredSliderCocktails,
} from "@/lib/data";
import {
  getActiveMenuType as getStaticActiveMenuType,
  isNightMenuActive as isStaticNightMenuActive,
  sortMenuCategories,
  type MenuCategory,
} from "@/lib/menu";
import { createClient, isSupabaseConfigured } from "@/lib/supabase/server";
import {
  formatRsd,
  type FeaturedCocktail,
  type FeaturedItemRow,
  type MenuItemRow,
  type MenuScheduleRow,
} from "@/lib/types/menu-db";
import { isNightMenuActiveWithSchedule } from "@/lib/menu-schedule";

export { isNightMenuActiveWithSchedule } from "@/lib/menu-schedule";

export const MENU_CACHE_TAG = "menu";

const DEFAULT_SCHEDULE: MenuScheduleRow = {
  id: 1,
  night_start_hour: 20,
  night_end_hour: 3,
  night_weekdays: [5, 6],
  timezone: "Europe/Belgrade",
};

function mapFeaturedRow(row: FeaturedItemRow): FeaturedCocktail {
  return {
    id: row.id,
    name: row.name,
    tag: row.tag,
    description: row.description,
    image: row.image_url,
    dayPrice: formatRsd(row.day_price),
    nightPrice: formatRsd(row.night_price),
    price: formatRsd(row.day_price),
  };
}

function buildCategoriesFromItems(
  items: MenuItemRow[],
  mode: "regular" | "night"
): MenuCategory[] {
  const byCategory = new Map<string, MenuCategory>();

  for (const item of items) {
    if (!item.active) continue;
    const priceValue = mode === "night" ? item.night_price : item.day_price;
    if (priceValue == null) continue;

    const existing = byCategory.get(item.category) ?? {
      name: item.category,
      items: [],
    };

    existing.items.push({
      name: item.name,
      price: formatRsd(priceValue),
    });
    byCategory.set(item.category, existing);
  }

  return sortMenuCategories([...byCategory.values()]);
}

export async function getMenuSchedule(): Promise<MenuScheduleRow> {
  noStore();

  if (!isSupabaseConfigured()) return DEFAULT_SCHEDULE;

  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("menu_schedule")
      .select("*")
      .eq("id", 1)
      .maybeSingle();

    if (error || !data) return DEFAULT_SCHEDULE;
    return data as MenuScheduleRow;
  } catch {
    return DEFAULT_SCHEDULE;
  }
}

export async function getMenuItems(): Promise<MenuItemRow[]> {
  noStore();

  if (!isSupabaseConfigured()) return [];

  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("menu_items")
      .select("*")
      .eq("active", true)
      .order("sort_order", { ascending: true });

    if (error || !data) return [];
    return data as MenuItemRow[];
  } catch {
    return [];
  }
}

export async function getMenuCategoriesForMode(
  mode: "regular" | "night"
): Promise<MenuCategory[]> {
  const items = await getMenuItems();

  if (items.length === 0) {
    return mode === "night" ? nightMenuCategories : dayMenuCategories;
  }

  return buildCategoriesFromItems(items, mode);
}

export async function getFeaturedItems(): Promise<FeaturedCocktail[]> {
  noStore();

  if (!isSupabaseConfigured()) {
    return featuredSliderCocktails.map((item) => ({
      ...item,
      price: item.dayPrice,
    }));
  }

  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("featured_items")
      .select("*")
      .eq("active", true)
      .order("sort_order", { ascending: true });

    if (error || !data || data.length === 0) {
      return featuredSliderCocktails.map((item) => ({
        ...item,
        price: item.dayPrice,
      }));
    }

    return (data as FeaturedItemRow[]).map(mapFeaturedRow);
  } catch {
    return featuredSliderCocktails.map((item) => ({
      ...item,
      price: item.dayPrice,
    }));
  }
}

export async function getHomepageFeatured(): Promise<FeaturedCocktail[]> {
  const items = await getFeaturedItems();
  if (items.length > 0) return items;

  return cocktails.map((item) => ({
    name: item.name,
    tag: item.tag,
    description: item.description,
    image: item.image,
    dayPrice: item.price,
    nightPrice: item.price,
    price: item.price,
  }));
}

export async function getLiveMenuType(
  date: Date = new Date()
): Promise<"regular" | "night"> {
  if (!isSupabaseConfigured()) {
    return getStaticActiveMenuType(date);
  }

  const schedule = await getMenuSchedule();
  return isNightMenuActiveWithSchedule(schedule, date) ? "night" : "regular";
}

export async function getPublicMenuBundle() {
  const [schedule, dayCategories, nightCategories, featured] =
    await Promise.all([
      getMenuSchedule(),
      getMenuCategoriesForMode("regular"),
      getMenuCategoriesForMode("night"),
      getFeaturedItems(),
    ]);

  return {
    schedule,
    dayCategories,
    nightCategories,
    featured,
    initialMenuType: isNightMenuActiveWithSchedule(schedule)
      ? ("night" as const)
      : ("regular" as const),
  };
}

export { isStaticNightMenuActive };

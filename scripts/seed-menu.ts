import { createClient } from "@supabase/supabase-js";
import { dayMenuCategories } from "../src/lib/menus/day";
import { nightMenuCategories } from "../src/lib/menus/night";
import { cocktails, featuredSliderCocktails } from "../src/lib/data";
import { parseRsd } from "../src/lib/types/menu-db";

function loadEnvFile(fileName: string) {
  try {
    const fs = require("node:fs") as typeof import("node:fs");
    const path = require("node:path") as typeof import("node:path");
    const envPath = path.resolve(process.cwd(), fileName);
    if (!fs.existsSync(envPath)) return false;
    const text = fs.readFileSync(envPath, "utf8");
    for (const line of text.split(/\r?\n/)) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith("#")) continue;
      const eq = trimmed.indexOf("=");
      if (eq === -1) continue;
      const key = trimmed.slice(0, eq).trim();
      let value = trimmed.slice(eq + 1).trim();
      if (
        (value.startsWith('"') && value.endsWith('"')) ||
        (value.startsWith("'") && value.endsWith("'"))
      ) {
        value = value.slice(1, -1);
      }
      if (!process.env[key]) process.env[key] = value;
    }
    return true;
  } catch {
    return false;
  }
}

const loadedLocal = loadEnvFile(".env.local");
const loadedExample = loadEnvFile(".env.local.example");

const url =
  process.env.NEXT_PUBLIC_SUPABASE_URL ||
  process.env.SUPABASE_URL ||
  "";
const key =
  process.env.SUPABASE_SERVICE_ROLE_KEY ||
  process.env.SUPABASE_SECRET_KEY ||
  "";

if (!url || !key || url.includes("YOUR_PROJECT")) {
  console.error(
    "Missing Supabase env. Need NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in .env.local"
  );
  console.error(
    `Checked .env.local=${loadedLocal}, .env.local.example=${loadedExample}`
  );
  process.exit(1);
}

const supabase = createClient(url, key, {
  auth: { persistSession: false, autoRefreshToken: false },
});

type MergedItem = {
  category: string;
  name: string;
  day_price: number | null;
  night_price: number | null;
  sort_order: number;
};

function mergeMenus(): MergedItem[] {
  const map = new Map<string, MergedItem>();

  dayMenuCategories.forEach((category, catIndex) => {
    category.items.forEach((item, itemIndex) => {
      const keyName = `${category.name}::${item.name}`;
      map.set(keyName, {
        category: category.name,
        name: item.name,
        day_price: parseRsd(item.price),
        night_price: null,
        sort_order: catIndex * 1000 + itemIndex,
      });
    });
  });

  nightMenuCategories.forEach((category, catIndex) => {
    category.items.forEach((item, itemIndex) => {
      const keyName = `${category.name}::${item.name}`;
      const existing = map.get(keyName);
      const nightPrice = parseRsd(item.price);
      if (existing) {
        existing.night_price = nightPrice;
      } else {
        map.set(keyName, {
          category: category.name,
          name: item.name,
          day_price: null,
          night_price: nightPrice,
          sort_order: catIndex * 1000 + itemIndex + 50000,
        });
      }
    });
  });

  return [...map.values()];
}

async function seedMenuItems() {
  const rows = mergeMenus().map((row) => ({
    ...row,
    active: true,
    updated_at: new Date().toISOString(),
  }));

  const { error: clearError } = await supabase
    .from("menu_items")
    .delete()
    .neq("id", "00000000-0000-0000-0000-000000000000");

  if (clearError) throw clearError;

  const chunkSize = 100;
  for (let i = 0; i < rows.length; i += chunkSize) {
    const chunk = rows.slice(i, i + chunkSize);
    const { error } = await supabase.from("menu_items").insert(chunk);
    if (error) throw error;
  }

  console.log(`Seeded ${rows.length} menu items`);
}

async function seedSchedule() {
  const { error } = await supabase.from("menu_schedule").upsert({
    id: 1,
    night_start_hour: 20,
    night_end_hour: 3,
    night_weekdays: [5, 6],
    timezone: "Europe/Belgrade",
    updated_at: new Date().toISOString(),
  });

  if (error) throw error;
  console.log("Seeded menu schedule");
}

async function seedFeatured() {
  const source =
    featuredSliderCocktails.length > 0
      ? featuredSliderCocktails
      : cocktails.map((c) => ({
          ...c,
          dayPrice: c.price,
          nightPrice: c.price,
        }));

  const rows = source.map((item, index) => ({
    name: item.name,
    tag: item.tag,
    description: item.description,
    image_url: item.image,
    day_price: parseRsd(item.dayPrice) ?? 0,
    night_price: parseRsd(item.nightPrice) ?? 0,
    sort_order: index,
    active: true,
    updated_at: new Date().toISOString(),
  }));

  const { error: clearError } = await supabase
    .from("featured_items")
    .delete()
    .neq("id", "00000000-0000-0000-0000-000000000000");

  if (clearError) throw clearError;

  const { error } = await supabase.from("featured_items").insert(rows);
  if (error) throw error;

  console.log(`Seeded ${rows.length} featured items`);
}

async function main() {
  await seedSchedule();
  await seedMenuItems();
  await seedFeatured();
  console.log("Done.");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});

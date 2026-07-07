export type MenuItem = { name: string; price: string };
export type MenuCategory = { name: string; items: MenuItem[] };

/** Zajednički redosled kategorija na karti pića. */
export const MENU_CATEGORY_ORDER = [
  "Kafe",
  "Topli napici",
  "Hladni napici",
  "Gazirani",
  "Energy",
  "Vode",
  "Piva",
  "Vina & cideri",
  "Whisky",
  "Ceđeni sokovi",
  "Nektar",
  "Likeri",
  "Alkohol",
  "Rakije",
  "Kokteli",
] as const;

export function sortMenuCategories(categories: MenuCategory[]): MenuCategory[] {
  const order = new Map<string, number>(
    MENU_CATEGORY_ORDER.map((name, index) => [name, index])
  );
  return [...categories].sort((a, b) => {
    const ai = order.get(a.name) ?? Number.MAX_SAFE_INTEGER;
    const bi = order.get(b.name) ?? Number.MAX_SAFE_INTEGER;
    return ai - bi;
  });
}

export const NIGHT_MENU_START_HOUR = 20;
export const NIGHT_MENU_END_HOUR = 3;
const SERBIA_TIMEZONE = "Europe/Belgrade";

const WEEKDAY_INDEX: Record<string, number> = {
  Sun: 0,
  Mon: 1,
  Tue: 2,
  Wed: 3,
  Thu: 4,
  Fri: 5,
  Sat: 6,
};

export function getSerbiaLocalTime(date: Date = new Date()) {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: SERBIA_TIMEZONE,
    weekday: "short",
    hour: "2-digit",
    hour12: false,
  }).formatToParts(date);

  const weekday = parts.find((part) => part.type === "weekday")?.value ?? "Sun";
  const hour = parseInt(
    parts.find((part) => part.type === "hour")?.value ?? "0",
    10
  );

  return {
    day: WEEKDAY_INDEX[weekday] ?? 0,
    hour,
  };
}

export function isNightMenuActive(date: Date = new Date()): boolean {
  const { day, hour } = getSerbiaLocalTime(date);

  // Petak i subota od 20h
  if ((day === 5 || day === 6) && hour >= NIGHT_MENU_START_HOUR) return true;

  // Posle ponoći do 03h — nastavak petka/subote
  if (hour < NIGHT_MENU_END_HOUR) {
    if (day === 6) return true; // subota ujutru = petak noć
    if (day === 0) return true; // nedelja ujutru = subota noć
  }

  return false;
}

export function getActiveMenuType(date: Date = new Date()): "regular" | "night" {
  return isNightMenuActive(date) ? "night" : "regular";
}

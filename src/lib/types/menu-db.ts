export type MenuItemRow = {
  id: string;
  category: string;
  name: string;
  day_price: number | null;
  night_price: number | null;
  sort_order: number;
  active: boolean;
};

export type MenuScheduleRow = {
  id: number;
  night_start_hour: number;
  night_end_hour: number;
  night_weekdays: number[];
  timezone: string;
};

export type FeaturedItemRow = {
  id: string;
  name: string;
  tag: string;
  description: string;
  image_url: string;
  day_price: number;
  night_price: number;
  sort_order: number;
  active: boolean;
};

export type FeaturedCocktail = {
  id?: string;
  name: string;
  tag: string;
  description: string;
  image: string;
  dayPrice: string;
  nightPrice: string;
  price?: string;
};

export function formatRsd(amount: number | null | undefined): string {
  if (amount == null || Number.isNaN(amount)) return "—";
  return `${amount} RSD`;
}

export function parseRsd(value: string | number | null | undefined): number | null {
  if (typeof value === "number") {
    return Number.isFinite(value) ? Math.round(value) : null;
  }
  if (!value) return null;
  const digits = String(value).replace(/[^\d]/g, "");
  if (!digits) return null;
  return parseInt(digits, 10);
}

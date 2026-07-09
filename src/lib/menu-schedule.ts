import type { MenuScheduleRow } from "@/lib/types/menu-db";

export function isNightMenuActiveWithSchedule(
  schedule: MenuScheduleRow,
  date: Date = new Date()
): boolean {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: schedule.timezone || "Europe/Belgrade",
    weekday: "short",
    hour: "2-digit",
    hour12: false,
  }).formatToParts(date);

  const weekdayLabel =
    parts.find((part) => part.type === "weekday")?.value ?? "Sun";
  const hour = parseInt(
    parts.find((part) => part.type === "hour")?.value ?? "0",
    10
  );

  const WEEKDAY_INDEX: Record<string, number> = {
    Sun: 0,
    Mon: 1,
    Tue: 2,
    Wed: 3,
    Thu: 4,
    Fri: 5,
    Sat: 6,
  };

  const day = WEEKDAY_INDEX[weekdayLabel] ?? 0;
  const start = schedule.night_start_hour;
  const end = schedule.night_end_hour;
  const nights = schedule.night_weekdays ?? [5, 6];

  if (nights.includes(day) && hour >= start) return true;

  if (hour < end) {
    const previousDay = (day + 6) % 7;
    if (nights.includes(previousDay)) return true;
  }

  return false;
}

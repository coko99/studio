import Link from "next/link";
import {
  getFeaturedItems,
  getMenuItems,
  getMenuSchedule,
  getLiveMenuType,
} from "@/lib/menu-data";
import { isSupabaseConfigured } from "@/lib/supabase/server";

export default async function AdminDashboardPage() {
  const configured = isSupabaseConfigured();
  const [schedule, items, featured, menuType] = await Promise.all([
    getMenuSchedule(),
    getMenuItems(),
    getFeaturedItems(),
    getLiveMenuType(),
  ]);

  const cards = [
    {
      href: "/admin/cene",
      title: "Cene",
      text: `${items.length || "fallback"} artikala na karti pića`,
    },
    {
      href: "/admin/istaknuti",
      title: "Istaknuti",
      text: `${featured.length} istaknutih koktela`,
    },
    {
      href: "/admin/raspored",
      title: "Raspored",
      text: `Noćni: ${schedule.night_start_hour}:00–${String(schedule.night_end_hour).padStart(2, "0")}:00`,
    },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold font-[family-name:var(--font-montserrat)]">
          Pregled
        </h2>
        <p className="mt-2 text-sm text-muted">
          Trenutni režim na sajtu:{" "}
          <span className="text-gold-light font-semibold">
            {menuType === "night" ? "Noćni cenovnik" : "Dnevni cenovnik"}
          </span>
        </p>
        {!configured && (
          <p className="mt-3 rounded-xl border border-amber-500/30 bg-amber-500/10 px-4 py-3 text-sm text-amber-100">
            Supabase env nije setovan — sajt koristi lokalni fallback. Posle
            podešavanja pokreni `npm run seed:menu`.
          </p>
        )}
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        {cards.map((card) => (
          <Link
            key={card.href}
            href={card.href}
            className="rounded-2xl border border-gold-mid/15 bg-surface p-5 transition-colors hover:border-gold-mid/35"
          >
            <h3 className="text-lg font-semibold gold-text">{card.title}</h3>
            <p className="mt-2 text-sm text-muted">{card.text}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}

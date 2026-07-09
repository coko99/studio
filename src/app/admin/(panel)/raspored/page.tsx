import { updateScheduleAction } from "@/app/admin/actions";
import { getMenuSchedule } from "@/lib/menu-data";

const WEEKDAYS = [
  { value: 0, label: "Nedelja" },
  { value: 1, label: "Ponedeljak" },
  { value: 2, label: "Utorak" },
  { value: 3, label: "Sreda" },
  { value: 4, label: "Četvrtak" },
  { value: 5, label: "Petak" },
  { value: 6, label: "Subota" },
];

export default async function AdminSchedulePage({
  searchParams,
}: {
  searchParams: Promise<{ ok?: string; error?: string }>;
}) {
  const params = await searchParams;
  const schedule = await getMenuSchedule();

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold font-[family-name:var(--font-montserrat)]">
          Raspored cenovnika
        </h2>
        <p className="mt-2 text-sm text-muted">
          Noćni cenovnik važi od početnog sata izabranih dana, pa do krajnjeg
          sata narednog jutra (vreme: {schedule.timezone}).
        </p>
      </div>

      {params.ok && (
        <p className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-100">
          Raspored sačuvan.
        </p>
      )}
      {params.error && (
        <p className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-200">
          {params.error}
        </p>
      )}

      <form
        action={updateScheduleAction}
        className="max-w-xl space-y-6 rounded-2xl border border-gold-mid/15 bg-surface p-6"
      >
        <label className="block text-sm">
          <span className="mb-1.5 block text-xs uppercase tracking-wider text-muted">
            Početak noćnog (sat)
          </span>
          <input
            type="number"
            min={0}
            max={23}
            name="night_start_hour"
            defaultValue={schedule.night_start_hour}
            className="w-full rounded-xl border border-gold-mid/20 bg-background px-4 py-3 text-sm"
          />
        </label>

        <label className="block text-sm">
          <span className="mb-1.5 block text-xs uppercase tracking-wider text-muted">
            Kraj noćnog (sat narednog jutra)
          </span>
          <input
            type="number"
            min={0}
            max={23}
            name="night_end_hour"
            defaultValue={schedule.night_end_hour}
            className="w-full rounded-xl border border-gold-mid/20 bg-background px-4 py-3 text-sm"
          />
        </label>

        <fieldset>
          <legend className="mb-3 text-xs uppercase tracking-wider text-muted">
            Dani noćnog cenovnika
          </legend>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
            {WEEKDAYS.map((day) => (
              <label
                key={day.value}
                className="flex items-center gap-2 rounded-xl border border-gold-mid/15 bg-background/60 px-3 py-2 text-sm"
              >
                <input
                  type="checkbox"
                  name="night_weekdays"
                  value={day.value}
                  defaultChecked={schedule.night_weekdays.includes(day.value)}
                />
                {day.label}
              </label>
            ))}
          </div>
        </fieldset>

        <button type="submit" className="btn-gold rounded-xl px-5 py-3 text-sm">
          Sačuvaj raspored
        </button>
      </form>
    </div>
  );
}

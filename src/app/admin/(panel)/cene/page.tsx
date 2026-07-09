import {
  createMenuItemAction,
  deleteMenuItemAction,
  updateMenuItemAction,
} from "@/app/admin/actions";
import { createClient, isSupabaseConfigured } from "@/lib/supabase/server";
import type { MenuItemRow } from "@/lib/types/menu-db";
import { MENU_CATEGORY_ORDER } from "@/lib/menu";

async function loadItems(): Promise<MenuItemRow[]> {
  if (!isSupabaseConfigured()) return [];
  const supabase = await createClient();
  const { data } = await supabase
    .from("menu_items")
    .select("*")
    .order("category", { ascending: true })
    .order("sort_order", { ascending: true });
  return (data as MenuItemRow[]) ?? [];
}

export default async function AdminPricesPage({
  searchParams,
}: {
  searchParams: Promise<{ ok?: string; error?: string }>;
}) {
  const params = await searchParams;
  const items = await loadItems();
  const categories = [
    ...MENU_CATEGORY_ORDER,
    ...items
      .map((item) => item.category)
      .filter((name) => !(MENU_CATEGORY_ORDER as readonly string[]).includes(name)),
  ];
  const uniqueCategories = [...new Set(categories)];

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold font-[family-name:var(--font-montserrat)]">
          Cene
        </h2>
        <p className="mt-2 text-sm text-muted">
          Menjaj dnevnu i noćnu cenu za svaki artikal. Ostavi prazno ako artikal
          ne postoji u tom režimu.
        </p>
      </div>

      {params.ok && (
        <p className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-100">
          Sačuvano.
        </p>
      )}
      {params.error && (
        <p className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-200">
          {params.error}
        </p>
      )}

      {!isSupabaseConfigured() && (
        <p className="rounded-xl border border-amber-500/30 bg-amber-500/10 px-4 py-3 text-sm text-amber-100">
          Supabase nije podešen — nema stavki za edit.
        </p>
      )}

      <section className="rounded-2xl border border-gold-mid/15 bg-surface p-5">
        <h3 className="mb-4 text-lg font-semibold">Dodaj artikal</h3>
        <form action={createMenuItemAction} className="grid gap-3 md:grid-cols-6">
          <input
            name="name"
            required
            placeholder="Naziv"
            className="rounded-xl border border-gold-mid/20 bg-background px-3 py-2 text-sm md:col-span-2"
          />
          <select
            name="category"
            required
            className="rounded-xl border border-gold-mid/20 bg-background px-3 py-2 text-sm"
            defaultValue={uniqueCategories[0] ?? "Kafe"}
          >
            {uniqueCategories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
          <input
            name="day_price"
            placeholder="Dnevna"
            className="rounded-xl border border-gold-mid/20 bg-background px-3 py-2 text-sm"
          />
          <input
            name="night_price"
            placeholder="Noćna"
            className="rounded-xl border border-gold-mid/20 bg-background px-3 py-2 text-sm"
          />
          <button type="submit" className="btn-gold rounded-xl px-3 py-2 text-sm">
            Dodaj
          </button>
        </form>
      </section>

      <div className="space-y-6">
        {uniqueCategories.map((category) => {
          const categoryItems = items.filter((item) => item.category === category);
          if (categoryItems.length === 0) return null;

          return (
            <section
              key={category}
              className="overflow-hidden rounded-2xl border border-gold-mid/15 bg-surface"
            >
              <div className="border-b border-gold-mid/10 px-5 py-3">
                <h3 className="font-semibold gold-text">{category}</h3>
              </div>
              <div className="divide-y divide-gold-mid/10">
                {categoryItems.map((item) => (
                  <form
                    key={item.id}
                    action={updateMenuItemAction}
                    className="grid gap-3 p-4 md:grid-cols-[1.4fr_1fr_0.7fr_0.7fr_0.5fr_auto] md:items-end"
                  >
                    <input type="hidden" name="id" value={item.id} />
                    <label className="block text-xs text-muted">
                      Naziv
                      <input
                        name="name"
                        defaultValue={item.name}
                        className="mt-1 w-full rounded-xl border border-gold-mid/20 bg-background px-3 py-2 text-sm text-foreground"
                      />
                    </label>
                    <label className="block text-xs text-muted">
                      Kategorija
                      <select
                        name="category"
                        defaultValue={item.category}
                        className="mt-1 w-full rounded-xl border border-gold-mid/20 bg-background px-3 py-2 text-sm"
                      >
                        {uniqueCategories.map((cat) => (
                          <option key={cat} value={cat}>
                            {cat}
                          </option>
                        ))}
                      </select>
                    </label>
                    <label className="block text-xs text-muted">
                      Dnevna
                      <input
                        name="day_price"
                        defaultValue={item.day_price ?? ""}
                        className="mt-1 w-full rounded-xl border border-gold-mid/20 bg-background px-3 py-2 text-sm"
                      />
                    </label>
                    <label className="block text-xs text-muted">
                      Noćna
                      <input
                        name="night_price"
                        defaultValue={item.night_price ?? ""}
                        className="mt-1 w-full rounded-xl border border-gold-mid/20 bg-background px-3 py-2 text-sm"
                      />
                    </label>
                    <label className="block text-xs text-muted">
                      Redosled
                      <input
                        name="sort_order"
                        defaultValue={item.sort_order}
                        className="mt-1 w-full rounded-xl border border-gold-mid/20 bg-background px-3 py-2 text-sm"
                      />
                    </label>
                    <div className="flex items-center gap-2">
                      <label className="flex items-center gap-2 text-xs text-muted">
                        <input
                          type="checkbox"
                          name="active"
                          defaultChecked={item.active}
                        />
                        Aktivan
                      </label>
                      <button
                        type="submit"
                        className="rounded-xl border border-gold-mid/30 px-3 py-2 text-sm text-gold-light hover:bg-gold-mid/10"
                      >
                        Sačuvaj
                      </button>
                      <button
                        formAction={deleteMenuItemAction}
                        type="submit"
                        className="rounded-xl border border-red-500/30 px-3 py-2 text-sm text-red-200 hover:bg-red-500/10"
                      >
                        Obriši
                      </button>
                    </div>
                  </form>
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}

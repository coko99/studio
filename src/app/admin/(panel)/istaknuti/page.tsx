import {
  deleteFeaturedItemAction,
  upsertFeaturedItemAction,
} from "@/app/admin/actions";
import { createClient, isSupabaseConfigured } from "@/lib/supabase/server";
import type { FeaturedItemRow } from "@/lib/types/menu-db";

async function loadFeatured(): Promise<FeaturedItemRow[]> {
  if (!isSupabaseConfigured()) return [];
  const supabase = await createClient();
  const { data } = await supabase
    .from("featured_items")
    .select("*")
    .order("sort_order", { ascending: true });
  return (data as FeaturedItemRow[]) ?? [];
}

export default async function AdminFeaturedPage({
  searchParams,
}: {
  searchParams: Promise<{ ok?: string; error?: string }>;
}) {
  const params = await searchParams;
  const items = await loadFeatured();

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold font-[family-name:var(--font-montserrat)]">
          Istaknuti kokteli
        </h2>
        <p className="mt-2 text-sm text-muted">
          Ovi artikli se prikazuju na početnoj i u slajderu na karti pića.
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

      <section className="rounded-2xl border border-gold-mid/15 bg-surface p-5">
        <h3 className="mb-4 text-lg font-semibold">Dodaj istaknuti</h3>
        <form action={upsertFeaturedItemAction} className="grid gap-3 md:grid-cols-2">
          <input
            name="name"
            required
            placeholder="Naziv"
            className="rounded-xl border border-gold-mid/20 bg-background px-3 py-2 text-sm"
          />
          <input
            name="tag"
            placeholder="Tag (npr. voćni)"
            className="rounded-xl border border-gold-mid/20 bg-background px-3 py-2 text-sm"
          />
          <input
            name="image_url"
            placeholder="/images/cocktails/mojito.png"
            className="rounded-xl border border-gold-mid/20 bg-background px-3 py-2 text-sm md:col-span-2"
          />
          <textarea
            name="description"
            placeholder="Opis"
            rows={3}
            className="rounded-xl border border-gold-mid/20 bg-background px-3 py-2 text-sm md:col-span-2"
          />
          <input
            name="day_price"
            placeholder="Dnevna cena"
            className="rounded-xl border border-gold-mid/20 bg-background px-3 py-2 text-sm"
          />
          <input
            name="night_price"
            placeholder="Noćna cena"
            className="rounded-xl border border-gold-mid/20 bg-background px-3 py-2 text-sm"
          />
          <input
            name="sort_order"
            placeholder="Redosled"
            defaultValue={items.length}
            className="rounded-xl border border-gold-mid/20 bg-background px-3 py-2 text-sm"
          />
          <label className="flex items-center gap-2 text-sm text-muted">
            <input type="checkbox" name="active" defaultChecked />
            Aktivan
          </label>
          <button
            type="submit"
            className="btn-gold rounded-xl px-4 py-2 text-sm md:col-span-2"
          >
            Dodaj
          </button>
        </form>
      </section>

      <div className="space-y-4">
        {items.map((item) => (
          <form
            key={item.id}
            action={upsertFeaturedItemAction}
            className="grid gap-3 rounded-2xl border border-gold-mid/15 bg-surface p-5 md:grid-cols-2"
          >
            <input type="hidden" name="id" value={item.id} />
            <input
              name="name"
              defaultValue={item.name}
              className="rounded-xl border border-gold-mid/20 bg-background px-3 py-2 text-sm"
            />
            <input
              name="tag"
              defaultValue={item.tag}
              className="rounded-xl border border-gold-mid/20 bg-background px-3 py-2 text-sm"
            />
            <input
              name="image_url"
              defaultValue={item.image_url}
              className="rounded-xl border border-gold-mid/20 bg-background px-3 py-2 text-sm md:col-span-2"
            />
            <textarea
              name="description"
              defaultValue={item.description}
              rows={3}
              className="rounded-xl border border-gold-mid/20 bg-background px-3 py-2 text-sm md:col-span-2"
            />
            <input
              name="day_price"
              defaultValue={item.day_price}
              className="rounded-xl border border-gold-mid/20 bg-background px-3 py-2 text-sm"
            />
            <input
              name="night_price"
              defaultValue={item.night_price}
              className="rounded-xl border border-gold-mid/20 bg-background px-3 py-2 text-sm"
            />
            <input
              name="sort_order"
              defaultValue={item.sort_order}
              className="rounded-xl border border-gold-mid/20 bg-background px-3 py-2 text-sm"
            />
            <label className="flex items-center gap-2 text-sm text-muted">
              <input type="checkbox" name="active" defaultChecked={item.active} />
              Aktivan
            </label>
            <div className="flex gap-2 md:col-span-2">
              <button
                type="submit"
                className="rounded-xl border border-gold-mid/30 px-4 py-2 text-sm text-gold-light hover:bg-gold-mid/10"
              >
                Sačuvaj
              </button>
              <button
                formAction={deleteFeaturedItemAction}
                type="submit"
                className="rounded-xl border border-red-500/30 px-4 py-2 text-sm text-red-200 hover:bg-red-500/10"
              >
                Obriši
              </button>
            </div>
          </form>
        ))}
      </div>
    </div>
  );
}

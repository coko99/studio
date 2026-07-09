import { ADMIN_EMAIL } from "@/lib/admin";
import { loginAction } from "@/app/admin/actions";
import { isSupabaseConfigured } from "@/lib/supabase/server";

export default async function AdminLoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string; next?: string }>;
}) {
  const params = await searchParams;
  const configured = isSupabaseConfigured();

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="w-full max-w-md rounded-2xl border border-gold-mid/15 bg-surface p-8 shadow-[0_0_40px_rgba(212,164,41,0.08)]">
        <p className="text-[11px] uppercase tracking-[0.3em] text-muted">
          Caffe Bar Studio
        </p>
        <h1 className="mt-2 text-2xl font-bold gold-text font-[family-name:var(--font-montserrat)]">
          Admin prijava
        </h1>
        <p className="mt-2 text-sm text-muted">
          Uloguj se da menjaš cene, istaknute koktele i raspored cenovnika.
        </p>

        {!configured && (
          <p className="mt-4 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-200">
            Supabase nije podešen. Popuni `.env.local` iz `.env.local.example`.
          </p>
        )}

        {params.error && (
          <p className="mt-4 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-200">
            {params.error}
          </p>
        )}

        <form action={loginAction} className="mt-6 space-y-4">
          <input type="hidden" name="next" value={params.next || "/admin"} />
          <div>
            <span className="mb-1.5 block text-xs uppercase tracking-wider text-muted">
              Korisnik
            </span>
            <div className="w-full rounded-xl border border-gold-mid/20 bg-background/60 px-4 py-3 text-sm text-gold-light">
              {ADMIN_EMAIL}
            </div>
          </div>
          <label className="block">
            <span className="mb-1.5 block text-xs uppercase tracking-wider text-muted">
              Lozinka
            </span>
            <input
              type="password"
              name="password"
              required
              autoComplete="current-password"
              className="w-full rounded-xl border border-gold-mid/20 bg-background px-4 py-3 text-sm outline-none focus:border-gold-mid/50"
            />
          </label>
          <button
            type="submit"
            disabled={!configured}
            className="btn-gold w-full rounded-xl px-4 py-3 text-sm font-semibold disabled:opacity-50"
          >
            Uloguj se
          </button>
        </form>
      </div>
    </div>
  );
}

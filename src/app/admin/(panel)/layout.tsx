import Link from "next/link";
import { logoutAction } from "@/app/admin/actions";

const links = [
  { href: "/admin", label: "Pregled" },
  { href: "/admin/cene", label: "Cene" },
  { href: "/admin/istaknuti", label: "Istaknuti" },
  { href: "/admin/raspored", label: "Raspored" },
];

export default function AdminPanelLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="border-b border-gold-mid/15 bg-surface/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-4 py-4 sm:px-6">
          <div>
            <p className="text-[11px] uppercase tracking-[0.3em] text-muted">
              Caffe Bar Studio
            </p>
            <h1 className="text-lg font-bold gold-text font-[family-name:var(--font-montserrat)]">
              Admin panel
            </h1>
          </div>
          <nav className="flex flex-wrap items-center gap-2">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-full border border-gold-mid/20 px-3 py-1.5 text-sm text-muted transition-colors hover:border-gold-mid/40 hover:text-gold-light"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/"
              className="rounded-full border border-gold-mid/20 px-3 py-1.5 text-sm text-muted transition-colors hover:border-gold-mid/40 hover:text-gold-light"
            >
              Sajt
            </Link>
            <form action={logoutAction}>
              <button
                type="submit"
                className="rounded-full bg-gold-mid/15 px-3 py-1.5 text-sm text-gold-light transition-colors hover:bg-gold-mid/25"
              >
                Odjavi se
              </button>
            </form>
          </nav>
        </div>
      </header>
      <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6">{children}</main>
    </div>
  );
}

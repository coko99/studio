"use client";

import { useEffect, useState, type ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { navLinks } from "@/lib/data";

const navIcons: Record<string, ReactNode> = {
  "/": (
    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.75}
        d="M3 10.5L12 4l9 6.5V20a1 1 0 01-1 1h-5v-6H9v6H4a1 1 0 01-1-1v-9.5z"
      />
    </svg>
  ),
  "/karta-pica": (
    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.75}
        d="M6 4h12l-4 8v8h-4v-8L6 4zm6 4v2"
      />
    </svg>
  ),
  "/dogadjaji": (
    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.75}
        d="M9 19V6l10-2v13M9 19a3 3 0 11-6 0 3 3 0 016 0zm10-2a3 3 0 11-6 0 3 3 0 016 0z"
      />
    </svg>
  ),
  "/kontakt": (
    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.75}
        d="M17.657 16.657L13.414 20.9a2 2 0 01-2.828 0l-4.243-4.243a8 8 0 1111.314 0z"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.75}
        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
      />
    </svg>
  ),
};

function MobileMenu({
  open,
  onClose,
  pathname,
}: {
  open: boolean;
  onClose: () => void;
  pathname: string;
}) {
  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    document.addEventListener("keydown", handleEscape);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleEscape);
    };
  }, [open, onClose]);

  return (
    <div
      className={`fixed inset-0 z-[60] lg:hidden transition-opacity duration-300 ${
        open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
      }`}
      aria-hidden={!open}
    >
      <button
        type="button"
        aria-label="Zatvori meni"
        onClick={onClose}
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
      />

      <aside
        className={`absolute right-0 top-0 flex h-full w-[min(88vw,360px)] flex-col border-l border-gold-mid/15 bg-surface/95 shadow-[-12px_0_40px_rgba(0,0,0,0.45)] backdrop-blur-xl transition-transform duration-300 ease-out ${
          open ? "mobile-menu-open translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between border-b border-gold-mid/10 px-5 py-5">
          <div>
            <p className="text-[11px] uppercase tracking-[0.3em] text-muted">
              Navigacija
            </p>
            <p className="gold-text text-lg font-bold font-[family-name:var(--font-montserrat)]">
              Studio meni
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Zatvori"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-gold-mid/20 text-gold-light transition-colors hover:border-gold-mid/40 hover:bg-gold-mid/10"
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.75}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto px-4 py-5">
          <ul key={open ? "open" : "closed"} className="space-y-2">
            {navLinks.map((link, index) => {
              const active = pathname === link.href;
              return (
                <li
                  key={link.href}
                  className="mobile-nav-item"
                  style={{ animationDelay: `${index * 70}ms` }}
                >
                  <Link
                    href={link.href}
                    onClick={onClose}
                    className={`group flex items-center gap-3 rounded-2xl border px-4 py-3.5 transition-all ${
                      active
                        ? "border-gold-mid/35 bg-gold-mid/10 text-gold-light"
                        : "border-gold-mid/10 bg-surface-light/30 text-foreground hover:border-gold-mid/25 hover:bg-surface-light/60"
                    }`}
                  >
                    <span
                      className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl transition-colors ${
                        active
                          ? "bg-gold-mid/20 text-gold-light"
                          : "bg-gold-mid/8 text-gold-mid group-hover:bg-gold-mid/15"
                      }`}
                    >
                      {navIcons[link.href]}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block text-base font-semibold">{link.label}</span>
                      <span className="text-xs text-muted">
                        {active ? "Trenutna stranica" : "Otvori stranicu"}
                      </span>
                    </span>
                    <svg
                      className={`h-4 w-4 shrink-0 transition-transform ${
                        active ? "text-gold-mid" : "text-muted group-hover:translate-x-0.5"
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="border-t border-gold-mid/10 p-4">
          <Link
            href="/kontakt"
            onClick={onClose}
            className="btn-gold flex w-full items-center justify-center gap-2 rounded-2xl px-5 py-3.5 text-sm font-semibold"
          >
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            Rezerviši mesto
          </Link>
        </div>
      </aside>
    </div>
  );
}

export default function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-gold-mid/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-24">
          <Link href="/" className="flex items-center gap-3">
            <Image
              src="/images/logo.png"
              alt="Caffe Bar Studio"
              width={240}
              height={84}
              className="h-[4.5rem] w-auto"
              priority
            />
          </Link>

          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm transition-colors duration-300 ${
                  pathname === link.href
                    ? "text-gold-light font-semibold"
                    : "text-muted hover:text-gold-light"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/kontakt"
              className="btn-gold px-5 py-2 rounded-full text-sm"
            >
              Rezerviši mesto
            </Link>
          </nav>

          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-label={open ? "Zatvori meni" : "Otvori meni"}
            aria-expanded={open}
            className="lg:hidden relative flex h-11 w-11 items-center justify-center rounded-xl border border-gold-mid/20 bg-surface-light/40 transition-colors hover:border-gold-mid/35"
          >
            <span className="sr-only">Meni</span>
            <span
              className={`absolute block h-0.5 w-5 bg-gold-light transition-all duration-300 ${
                open ? "rotate-45" : "-translate-y-1.5"
              }`}
            />
            <span
              className={`absolute block h-0.5 w-5 bg-gold-light transition-all duration-300 ${
                open ? "opacity-0 scale-0" : "opacity-100"
              }`}
            />
            <span
              className={`absolute block h-0.5 w-5 bg-gold-light transition-all duration-300 ${
                open ? "-rotate-45" : "translate-y-1.5"
              }`}
            />
          </button>
        </div>
      </header>

      <MobileMenu open={open} onClose={() => setOpen(false)} pathname={pathname} />
    </>
  );
}

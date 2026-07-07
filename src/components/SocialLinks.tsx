import { siteInfo } from "@/lib/data";
import type { ReactNode } from "react";

type SocialItem = {
  key: string;
  href: string;
  label: string;
  handle: string;
  icon: ReactNode;
  accent: string;
  hover: string;
};

const socialItems: SocialItem[] = [
  {
    key: "instagram",
    href: siteInfo.instagram,
    label: "Instagram",
    handle: "@studio_caffe_bar",
    accent: "from-[#f09433]/20 via-[#e6683c]/15 to-[#bc1888]/20",
    hover: "hover:border-[#e6683c]/40 hover:shadow-[0_0_24px_rgba(230,104,60,0.15)]",
    icon: (
      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
      </svg>
    ),
  },
  {
    key: "facebook",
    href: siteInfo.facebook,
    label: "Facebook",
    handle: "studio_caffe_bar",
    accent: "from-[#1877f2]/20 to-[#1877f2]/5",
    hover: "hover:border-[#1877f2]/40 hover:shadow-[0_0_24px_rgba(24,119,242,0.15)]",
    icon: (
      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
      </svg>
    ),
  },
  {
    key: "google",
    href: siteInfo.googleReviews,
    label: "Google",
    handle: "Ostavi recenziju",
    accent: "from-[#ea4335]/15 via-[#fbbc05]/10 to-[#34a853]/15",
    hover: "hover:border-gold-mid/40 hover:shadow-[0_0_24px_rgba(212,164,41,0.12)]",
    icon: (
      <svg className="h-5 w-5" viewBox="0 0 24 24" aria-hidden="true">
        <path fill="#FBBC05" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
        <path fill="#4A90E2" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" />
        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
      </svg>
    ),
  },
];

function SocialCards() {
  return (
    <div className="rounded-2xl border border-gold-mid/10 bg-surface/60 p-5 neon-border">
      <div className="text-center mb-5">
        <span className="tag mb-3">Društvene mreže</span>
        <p className="text-sm text-muted">Prati najave, događaje i ostavi utisak</p>
      </div>
      <div className="grid gap-3">
        {socialItems.map((item) => (
          <a
            key={item.key}
            href={item.href}
            target="_blank"
            rel="noopener noreferrer"
            className={`group flex items-center gap-4 rounded-2xl border border-gold-mid/15 bg-gradient-to-r ${item.accent} p-4 transition-all ${item.hover}`}
          >
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-gold-mid/20 bg-background/70 text-gold-light transition-transform group-hover:scale-105">
              {item.icon}
            </span>
            <span className="min-w-0 flex-1 text-left">
              <span className="block text-base font-semibold text-foreground">
                {item.label}
              </span>
              <span className="block text-sm text-muted">{item.handle}</span>
            </span>
            <svg
              className="h-4 w-4 shrink-0 text-gold-mid transition-transform group-hover:translate-x-0.5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </a>
        ))}
      </div>
    </div>
  );
}

function SocialCompact({ align = "center" }: { align?: "center" | "end" }) {
  const alignClass =
    align === "end"
      ? "items-center md:items-end"
      : "items-center";

  return (
    <div className={`flex flex-col gap-3 ${alignClass}`}>
      <p className="text-[11px] uppercase tracking-[0.3em] text-muted/60">
        Društvene mreže
      </p>
      <div className="flex flex-wrap justify-center md:justify-end gap-3">
        {socialItems.map((item) => (
          <a
            key={item.key}
            href={item.href}
            target="_blank"
            rel="noopener noreferrer"
            title={item.label}
            className={`group flex flex-col items-center gap-2 rounded-2xl border border-gold-mid/15 bg-surface-light/40 px-4 py-3 transition-all ${item.hover}`}
          >
            <span className="flex h-11 w-11 items-center justify-center rounded-full border border-gold-mid/20 bg-background/80 text-gold-light transition-transform group-hover:scale-110">
              {item.icon}
            </span>
            <span className="text-xs font-medium text-muted group-hover:text-gold-light transition-colors">
              {item.label}
            </span>
          </a>
        ))}
      </div>
    </div>
  );
}

export function SocialLinks({
  variant = "cards",
  align = "center",
}: {
  variant?: "cards" | "compact";
  align?: "center" | "end";
}) {
  if (variant === "compact") {
    return <SocialCompact align={align} />;
  }

  return <SocialCards />;
}

"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import type { MenuCategory } from "@/lib/menu";

function IconWrap({ children }: { children: ReactNode }) {
  return (
    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gold-mid/10 text-gold-mid">
      {children}
    </span>
  );
}

const categoryIcons: Record<string, ReactNode> = {
  Kafe: (
    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.75}
        d="M4 8h12v6a4 4 0 01-4 4H8a4 4 0 01-4-4V8zm12 2h2a2 2 0 012 2v1a2 2 0 01-2 2h-2"
      />
    </svg>
  ),
  "Topli napici": (
    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.75}
        d="M8 4h8l-1 14H9L8 4zm4 3v3"
      />
    </svg>
  ),
  "Hladni napici": (
    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.75}
        d="M12 3v18M8 7l4-4 4 4M8 17l4 4 4-4"
      />
    </svg>
  ),
  Gazirani: (
    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.75}
        d="M8 10c0-2 1.5-3 4-3s4 1 4 3-1.5 3-4 3-4-1-4-3zm0 4c0 2 1.5 3 4 3s4-1 4-3"
      />
    </svg>
  ),
  Energy: (
    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.75}
        d="M13 2L5 14h6l-1 8 8-12h-6l1-8z"
      />
    </svg>
  ),
  Vode: (
    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.75}
        d="M12 3c3 4 6 7 6 10a6 6 0 11-12 0c0-3 3-6 6-10z"
      />
    </svg>
  ),
  Piva: (
    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.75}
        d="M8 4h9a2 2 0 012 2v11a3 3 0 01-3 3H8V4zm0 4h9M6 7H4v13h4"
      />
    </svg>
  ),
  "Vina & cideri": (
    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.75}
        d="M8 4h8l-2 8v8h-4v-8L8 4z"
      />
    </svg>
  ),
  Whisky: (
    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.75}
        d="M9 4h6l2 6v10H7V10l2-6zm3 6v4"
      />
    </svg>
  ),
  "Ceđeni sokovi": (
    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.75}
        d="M12 3c-3 4-6 7-6 10a6 6 0 1012 0c0-3-3-6-6-10z"
      />
    </svg>
  ),
  Nektar: (
    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.75}
        d="M9 4h6v4l4 12H5L9 8V4z"
      />
    </svg>
  ),
  Likeri: (
    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.75}
        d="M10 3h4v6l5 12H5l5-12V3z"
      />
    </svg>
  ),
  Alkohol: (
    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.75}
        d="M8 4h8v6a4 4 0 01-8 0V4zm4 10v6"
      />
    </svg>
  ),
  Rakije: (
    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.75}
        d="M10 3h4l3 7v11H7V10l3-7z"
      />
    </svg>
  ),
  Kokteli: (
    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.75}
        d="M6 4h12l-4 8v8h-4v-8L6 4zm6 4v2"
      />
    </svg>
  ),
};

function CategoryIcon({ name }: { name: string }) {
  return (
    <IconWrap>
      {categoryIcons[name] ?? (
        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.75}
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      )}
    </IconWrap>
  );
}

function Chevron({ open }: { open: boolean }) {
  return (
    <svg
      className={`h-5 w-5 shrink-0 text-muted transition-transform duration-200 ${
        open ? "rotate-180" : ""
      }`}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
    </svg>
  );
}

type Props = {
  categories: MenuCategory[];
  active: number;
  onChange: (index: number) => void;
};

function CategoryOption({
  category,
  selected,
  onSelect,
}: {
  category: MenuCategory;
  selected: boolean;
  onSelect: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className={`flex w-full items-center gap-3 px-3 py-2.5 text-left transition-colors ${
        selected
          ? "bg-gold-mid/15 text-gold-light"
          : "text-foreground hover:bg-surface-light/60"
      }`}
    >
      <CategoryIcon name={category.name} />
      <span className="min-w-0 flex-1">
        <span className="block truncate text-sm font-medium">{category.name}</span>
        <span className="text-xs text-muted">{category.items.length} stavki</span>
      </span>
      {selected && (
        <svg className="h-4 w-4 shrink-0 text-gold-mid" fill="currentColor" viewBox="0 0 20 20">
          <path
            fillRule="evenodd"
            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
            clipRule="evenodd"
          />
        </svg>
      )}
    </button>
  );
}

export function MenuCategoryDropdown({ categories, active, onChange }: Props) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const selected = categories[active];

  useEffect(() => {
    if (!open) return;

    function handleClickOutside(event: MouseEvent) {
      if (rootRef.current && !rootRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }

    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [open]);

  if (!selected) return null;

  return (
    <div ref={rootRef} className="relative lg:hidden">
      <button
        type="button"
        aria-expanded={open}
        aria-haspopup="listbox"
        onClick={() => setOpen((value) => !value)}
        className="flex w-full items-center gap-3 rounded-2xl border border-gold-mid/25 bg-surface-light/80 px-3 py-3 shadow-[0_8px_30px_rgba(0,0,0,0.25)] transition-all hover:border-gold-mid/40"
      >
        <CategoryIcon name={selected.name} />
        <span className="min-w-0 flex-1 text-left">
          <span className="block truncate text-sm font-semibold text-foreground">
            {selected.name}
          </span>
          <span className="text-xs text-muted">{selected.items.length} stavki</span>
        </span>
        <Chevron open={open} />
      </button>

      {open && (
        <div
          role="listbox"
          className="absolute z-30 mt-2 max-h-72 w-full overflow-hidden overflow-y-auto rounded-2xl border border-gold-mid/20 bg-surface/95 shadow-[0_16px_40px_rgba(0,0,0,0.45)] backdrop-blur-md"
        >
          <div className="border-b border-gold-mid/10 px-4 py-2.5">
            <p className="text-[11px] font-semibold uppercase tracking-wider text-muted">
              Izaberi kategoriju
            </p>
          </div>
          <div className="p-1.5">
            {categories.map((category, index) => (
              <CategoryOption
                key={category.name}
                category={category}
                selected={active === index}
                onSelect={() => {
                  onChange(index);
                  setOpen(false);
                }}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export function MenuCategorySidebar({ categories, active, onChange }: Props) {
  return (
    <nav className="hidden lg:flex flex-col gap-1">
      {categories.map((category, index) => (
        <button
          key={category.name}
          type="button"
          onClick={() => onChange(index)}
          className={`flex items-center gap-3 rounded-xl px-2.5 py-2.5 text-left transition-all ${
            active === index
              ? "bg-gold-mid/15 text-gold-light border border-gold-mid/25"
              : "text-muted hover:border hover:border-gold-mid/10 hover:bg-surface-light/50 hover:text-foreground"
          }`}
        >
          <CategoryIcon name={category.name} />
          <span className="min-w-0">
            <span className="block truncate text-sm font-medium">{category.name}</span>
            <span className="text-xs opacity-60">{category.items.length} stavki</span>
          </span>
        </button>
      ))}
    </nav>
  );
}

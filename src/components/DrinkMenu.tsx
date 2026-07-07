"use client";

import { useState, useEffect, useMemo } from "react";
import { regularMenuCategories, nightMenuCategories } from "@/lib/data";
import type { MenuCategory } from "@/lib/menu";
import {
  getActiveMenuType,
} from "@/lib/menu";
import CocktailSlider from "@/components/CocktailSlider";
import {
  MenuCategoryDropdown,
  MenuCategorySidebar,
} from "@/components/MenuCategoryPicker";

type MenuType = "regular" | "night";

function MenuItemRow({ name, price }: { name: string; price: string }) {
  return (
    <div className="flex items-baseline gap-2 py-2 px-3 rounded-lg hover:bg-surface-light/40 transition-colors">
      <span className="text-sm text-foreground leading-snug">{name}</span>
      <span className="flex-1 border-b border-dotted border-gold-mid/25 mb-1 min-w-[12px]" />
      <span className="text-sm font-semibold text-gold-mid whitespace-nowrap">
        {price}
      </span>
    </div>
  );
}

export default function DrinkMenu() {
  const [menuType, setMenuType] = useState<MenuType>("regular");
  const [active, setActive] = useState(0);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const update = () => setMenuType(getActiveMenuType());
    update();
    const interval = setInterval(update, 60_000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    setActive(0);
  }, [menuType]);

  const categories: MenuCategory[] =
    menuType === "night" ? nightMenuCategories : regularMenuCategories;

  const filteredCategories = useMemo(() => {
    if (!search.trim()) return null;
    const q = search.toLowerCase().trim();
    return categories
      .map((cat) => ({
        ...cat,
        items: cat.items.filter((item) =>
          item.name.toLowerCase().includes(q)
        ),
      }))
      .filter((cat) => cat.items.length > 0);
  }, [categories, search]);

  const displayItems = filteredCategories
    ? filteredCategories
    : [categories[active]];

  return (
    <section className="pt-28 md:pt-32 pb-24 md:pb-32 bg-background">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-10">
          <span className="tag mb-6">Karta pića</span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-[family-name:var(--font-montserrat)] gold-text gold-glow mb-4">
            Karta pića
          </h2>
          <p className="text-muted max-w-2xl mx-auto text-base sm:text-lg">
            Bilo da si za kafu, pivo, žestinu ili koktel, Studio ima izbor za
            svaki deo dana i svaku vrstu izlaska.
          </p>
        </div>

        <CocktailSlider menuType={menuType} />

        <div className="relative mb-6 max-w-md mx-auto">
          <input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Pretraži piće..."
            className="w-full bg-surface/80 border border-gold-mid/20 rounded-full px-5 py-3 pl-11 text-sm text-foreground placeholder:text-muted focus:outline-none focus:border-gold-mid/50 transition-colors"
          />
          <svg
            className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>

        <div className="bg-surface/50 backdrop-blur-sm rounded-2xl border border-gold-mid/10 neon-border overflow-hidden">
          <div className="flex flex-col lg:flex-row min-h-[480px]">
            {!search.trim() && (
              <aside className="lg:w-52 shrink-0 border-b lg:border-b-0 lg:border-r border-gold-mid/10 bg-surface/30">
                <div className="lg:sticky lg:top-24 p-3 lg:max-h-[70vh] lg:overflow-y-auto">
                  <p className="hidden lg:block text-xs text-muted uppercase tracking-wider px-3 py-2 mb-1">
                    Kategorije
                  </p>
                  <MenuCategoryDropdown
                    categories={categories}
                    active={active}
                    onChange={setActive}
                  />
                  <MenuCategorySidebar
                    categories={categories}
                    active={active}
                    onChange={setActive}
                  />
                </div>
              </aside>
            )}

            <div className="flex-1 p-4 md:p-6 lg:max-h-[70vh] lg:overflow-y-auto">
              {displayItems.map((cat) => (
                <div key={cat.name} className="mb-8 last:mb-0">
                  <div className="flex items-center justify-between mb-4 pb-3 border-b border-gold-mid/15">
                    <h3 className="text-xl font-bold font-[family-name:var(--font-montserrat)] gold-text">
                      {cat.name}
                    </h3>
                    <span className="text-xs text-muted">
                      {cat.items.length} stavki
                    </span>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6">
                    {cat.items.map((item, idx) => (
                      <MenuItemRow
                        key={`${cat.name}-${idx}-${item.name}`}
                        name={item.name}
                        price={item.price}
                      />
                    ))}
                  </div>
                </div>
              ))}

              {search.trim() && filteredCategories?.length === 0 && (
                <p className="text-center text-muted py-12">
                  Nema rezultata za &ldquo;{search}&rdquo;
                </p>
              )}
            </div>
          </div>
        </div>

        <p className="text-center text-muted/60 text-xs mt-8">
          * Cene su informativnog karaktera.
        </p>
      </div>
    </section>
  );
}

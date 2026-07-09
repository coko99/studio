import Image from "next/image";
import Link from "next/link";
import type { FeaturedCocktail } from "@/lib/types/menu-db";

export default function FeaturedCocktails({
  items,
}: {
  items: FeaturedCocktail[];
}) {
  return (
    <section id="kokteli" className="py-24 md:py-32 bg-surface border-y border-gold-mid/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-16">
          <span className="tag mb-6">Letnji fazon</span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-[family-name:var(--font-montserrat)] gold-text gold-glow mb-4">
            Kokteli za vruće letnje večeri
          </h2>
          <p className="text-muted max-w-2xl mx-auto text-base sm:text-lg">
            Voćni, lagani i ledeni — savršen izbor za duge dane, terasu i
            opušteno druženje dok sunce polako zalazi.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {items.map((cocktail) => (
            <div
              key={cocktail.id ?? cocktail.name}
              className="group bg-surface/80 backdrop-blur-sm rounded-2xl overflow-hidden border border-gold-mid/10 hover:border-gold-mid/30 transition-all duration-500 neon-border"
            >
              <div className="relative h-56 sm:h-64 overflow-hidden">
                <Image
                  src={cocktail.image}
                  alt={cocktail.name}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-surface via-transparent to-transparent" />
                <span className="tag absolute top-4 left-4">
                  {cocktail.tag}
                </span>
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-xl font-bold font-[family-name:var(--font-montserrat)] text-foreground">
                    {cocktail.name}
                  </h3>
                  <span className="text-gold-mid font-semibold">
                    {cocktail.price ?? cocktail.dayPrice}
                  </span>
                </div>
                <p className="text-muted text-sm leading-relaxed">
                  {cocktail.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            href="/karta-pica"
            className="btn-outline px-8 py-3 rounded-full text-base inline-block"
          >
            Pogledaj koktele
          </Link>
        </div>
      </div>
    </section>
  );
}

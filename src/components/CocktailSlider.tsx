"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Image from "next/image";
import { featuredSliderCocktails } from "@/lib/data";

type MenuType = "regular" | "night";

const INTERVAL_MS = 2000;

function CocktailCard({
  name,
  tag,
  description,
  image,
  price,
}: {
  name: string;
  tag: string;
  description: string;
  image: string;
  price: string;
}) {
  return (
    <div className="h-full bg-surface/80 backdrop-blur-sm rounded-2xl overflow-hidden border border-gold-mid/15 neon-border">
      <div className="relative h-44 sm:h-48 md:h-52">
        <Image
          src={image}
          alt={name}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 85vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-surface via-transparent to-transparent" />
        <span className="tag absolute top-3 left-3">{tag}</span>
      </div>
      <div className="p-4">
        <div className="flex items-center justify-between mb-1.5 gap-2">
          <h4 className="text-base font-bold font-[family-name:var(--font-montserrat)] leading-tight">
            {name}
          </h4>
          <span className="text-gold-mid font-semibold text-sm shrink-0">
            {price}
          </span>
        </div>
        <p className="text-muted text-xs sm:text-sm leading-relaxed line-clamp-2">
          {description}
        </p>
      </div>
    </div>
  );
}

export default function CocktailSlider({ menuType }: { menuType: MenuType }) {
  const [active, setActive] = useState(0);
  const [visible, setVisible] = useState(3);
  const touchStartX = useRef(0);
  const touchDeltaX = useRef(0);
  const paused = useRef(false);

  const count = featuredSliderCocktails.length;
  const maxIndex = Math.max(0, count - visible);

  const goTo = useCallback(
    (index: number) => {
      setActive(Math.max(0, Math.min(index, maxIndex)));
    },
    [maxIndex]
  );

  const prev = () => goTo(active <= 0 ? maxIndex : active - 1);
  const next = () => goTo(active >= maxIndex ? 0 : active + 1);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const update = () => setVisible(mq.matches ? 3 : 1);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (active > maxIndex) setActive(maxIndex);
  }, [active, maxIndex]);

  useEffect(() => {
    const timer = setInterval(() => {
      if (paused.current) return;
      setActive((prev) => (prev >= maxIndex ? 0 : prev + 1));
    }, INTERVAL_MS);
    return () => clearInterval(timer);
  }, [maxIndex]);

  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchDeltaX.current = 0;
    paused.current = true;
  };

  const onTouchMove = (e: React.TouchEvent) => {
    touchDeltaX.current = e.touches[0].clientX - touchStartX.current;
  };

  const onTouchEnd = () => {
    if (touchDeltaX.current < -50) next();
    else if (touchDeltaX.current > 50) prev();
    touchDeltaX.current = 0;
    setTimeout(() => {
      paused.current = false;
    }, 3000);
  };

  const slidePercent = 100 / count;

  return (
    <div className="mb-12 w-full max-w-6xl mx-auto">
      <div className="text-center mb-8">
        <span className="tag mb-4">Letnji fazon</span>
        <h3 className="text-2xl sm:text-3xl font-extrabold font-[family-name:var(--font-montserrat)] gold-text">
          Osvežavajući kokteli za leto
        </h3>
      </div>

      <div
        className="relative px-10 sm:px-12"
        onMouseEnter={() => {
          paused.current = true;
        }}
        onMouseLeave={() => {
          paused.current = false;
        }}
      >
        <button
          onClick={prev}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-gold-mid/30 bg-background/90 backdrop-blur-sm flex items-center justify-center text-gold-light hover:border-gold-mid/60 transition-all"
          aria-label="Prethodni"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <button
          onClick={next}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-gold-mid/30 bg-background/90 backdrop-blur-sm flex items-center justify-center text-gold-light hover:border-gold-mid/60 transition-all"
          aria-label="Sledeći"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>

        <div
          className="overflow-hidden w-full"
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
        >
          <div
            className="flex transition-transform duration-700 ease-in-out"
            style={{
              width: `${(count / visible) * 100}%`,
              transform: `translateX(-${active * slidePercent}%)`,
            }}
          >
            {featuredSliderCocktails.map((item) => (
              <div
                key={item.name}
                className="shrink-0 px-2"
                style={{ width: `${slidePercent}%` }}
              >
                <CocktailCard
                  name={item.name}
                  tag={item.tag}
                  description={item.description}
                  image={item.image}
                  price={
                    menuType === "night" ? item.nightPrice : item.dayPrice
                  }
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex justify-center gap-2 mt-5">
        {Array.from({ length: maxIndex + 1 }).map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              i === active
                ? "w-8 bg-gold-mid"
                : "w-1.5 bg-gold-mid/30 hover:bg-gold-mid/50"
            }`}
            aria-label={`Pozicija ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

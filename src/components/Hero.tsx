"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";

const slides = [
  { src: "/images/photo-17.png", alt: "Caffe Bar Studio šank" },
  { src: "/images/photo-22.png", alt: "Studio enterijer" },
  { src: "/images/photo-21.png", alt: "Blue Curacao koktel" },
  { src: "/images/photo-16.png", alt: "Kokteli na šanku" },
  { src: "/images/photo-12.png", alt: "Večernja atmosfera" },
  { src: "/images/photo-6.png", alt: "Kafa u Studiju" },
  { src: "/images/photo-3.png", alt: "Letnji koktel" },
];

const INTERVAL = 5000;

export default function Hero() {
  const [current, setCurrent] = useState(0);

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % slides.length);
  }, []);

  const prev = useCallback(() => {
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
  }, []);

  useEffect(() => {
    const timer = setInterval(next, INTERVAL);
    return () => clearInterval(timer);
  }, [next]);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {slides.map((slide, i) => (
        <Image
          key={slide.src}
          src={slide.src}
          alt={slide.alt}
          fill
          className={`object-cover blur-sm md:blur-md brightness-[0.55] md:brightness-[0.25] scale-105 transition-opacity duration-1000 ${
            i === current ? "opacity-100" : "opacity-0"
          }`}
          priority={i === 0}
          sizes="100vw"
        />
      ))}

      <div className="absolute inset-0 bg-gradient-to-b from-background/45 via-background/55 to-background/75 md:from-background/70 md:via-background/80 md:to-background" />

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 text-center pt-24">
        <Image
          src="/images/logo.png"
          alt="Caffe Bar Studio logo"
          width={320}
          height={120}
          className="mx-auto mb-8 w-48 sm:w-64 md:w-80 h-auto animate-fade-in-up"
          priority
        />

        <p className="text-lg sm:text-xl md:text-2xl text-muted max-w-2xl mx-auto mb-4 animate-fade-in-up font-[family-name:var(--font-playfair)] italic">
          Kafa, kokteli, muzika i provod u srcu Kruševca.
        </p>

        <p className="text-sm sm:text-base text-muted/70 max-w-xl mx-auto mb-10">
          Tvoje mesto za dnevnu kafu, večernji koktel i noć za pamćenje.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up">
          <Link
            href="/karta-pica"
            className="btn-gold px-8 py-3.5 rounded-full text-base"
          >
            Pogledaj kartu pića
          </Link>
          <Link
            href="/kontakt"
            className="btn-outline px-8 py-3.5 rounded-full text-base"
          >
            Rezerviši mesto
          </Link>
        </div>
      </div>

      <button
        onClick={prev}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full border border-gold-mid/30 bg-background/40 backdrop-blur-sm flex items-center justify-center text-gold-light hover:border-gold-mid/60 hover:bg-background/60 transition-all"
        aria-label="Prethodna slika"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      <button
        onClick={next}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full border border-gold-mid/30 bg-background/40 backdrop-blur-sm flex items-center justify-center text-gold-light hover:border-gold-mid/60 hover:bg-background/60 transition-all"
        aria-label="Sledeća slika"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      <div className="absolute bottom-20 left-1/2 -translate-x-1/2 z-20 flex gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`h-1.5 rounded-full transition-all duration-500 ${
              i === current
                ? "w-8 bg-gold-mid"
                : "w-1.5 bg-gold-mid/30 hover:bg-gold-mid/50"
            }`}
            aria-label={`Slajd ${i + 1}`}
          />
        ))}
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 animate-bounce">
        <svg
          className="w-6 h-6 text-gold-mid/50"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 14l-7 7m0 0l-7-7m7 7V3"
          />
        </svg>
      </div>
    </section>
  );
}

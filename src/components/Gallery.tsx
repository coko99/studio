"use client";

import { useState } from "react";
import Image from "next/image";
import { galleryImages } from "@/lib/data";

export default function Gallery() {
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <section id="galerija" className="relative py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-16">
          <span className="tag mb-6">Galerija</span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-[family-name:var(--font-montserrat)] gold-text gold-glow mb-4">
            Atmosfera Studija
          </h2>
          <p className="text-muted max-w-2xl mx-auto">
            Kokteli, enterijer, večernja atmosfera i dobra energija.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
          {galleryImages.map((src, i) => (
            <button
              key={src}
              onClick={() => setSelected(src)}
              className={`relative overflow-hidden rounded-xl group cursor-pointer ${
                i === 0 ? "col-span-2 row-span-2 aspect-square" : "aspect-square"
              }`}
            >
              <Image
                src={src}
                alt={`Studio galerija ${i + 1}`}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-700 brightness-75 group-hover:brightness-100"
                sizes={
                  i === 0
                    ? "(max-width: 768px) 100vw, 50vw"
                    : "(max-width: 768px) 50vw, 25vw"
                }
              />
              <div className="absolute inset-0 bg-gold-mid/0 group-hover:bg-gold-mid/10 transition-colors duration-500" />
            </button>
          ))}
        </div>
      </div>

      {selected && (
        <div
          className="fixed inset-0 z-[100] bg-background/95 flex items-center justify-center p-4"
          onClick={() => setSelected(null)}
        >
          <button
            className="absolute top-6 right-6 text-gold-light text-3xl hover:text-gold-mid transition-colors"
            onClick={() => setSelected(null)}
            aria-label="Zatvori"
          >
            &times;
          </button>
          <div className="relative w-full max-w-4xl aspect-[4/3]">
            <Image
              src={selected}
              alt="Studio galerija"
              fill
              className="object-contain"
              sizes="(max-width: 1024px) 100vw, 80vw"
            />
          </div>
        </div>
      )}
    </section>
  );
}

"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { galleryImages } from "@/lib/data";

const SCROLL_SPEED = 0.9;

export default function Gallery() {
  const trackRef = useRef<HTMLDivElement>(null);
  const offsetRef = useRef(0);
  const frameRef = useRef(0);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) return;

    let active = true;

    const tick = () => {
      if (!active) return;

      const loopWidth = track.scrollWidth / 2;
      if (loopWidth > 0) {
        offsetRef.current += SCROLL_SPEED;
        if (offsetRef.current >= loopWidth) {
          offsetRef.current -= loopWidth;
        }
        track.style.transform = `translate3d(-${offsetRef.current}px, 0, 0)`;
      }

      frameRef.current = requestAnimationFrame(tick);
    };

    frameRef.current = requestAnimationFrame(tick);

    return () => {
      active = false;
      cancelAnimationFrame(frameRef.current);
    };
  }, []);

  const items = [...galleryImages, ...galleryImages];

  return (
    <section
      id="galerija"
      className="relative py-24 md:py-32 bg-surface border-y border-gold-mid/10"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 mb-12">
        <div className="text-center">
          <span className="tag mb-6">Galerija</span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-[family-name:var(--font-montserrat)] gold-text gold-glow mb-4">
            Enterijer Studija
          </h2>
          <p className="text-muted max-w-2xl mx-auto">
            Šank, salon, dekor i atmosfera koja čini Studio posebnim mestom u
            gradu.
          </p>
        </div>
      </div>

      <div className="relative w-full overflow-hidden">
        <div
          className="pointer-events-none absolute inset-y-0 left-0 z-10 w-12 bg-gradient-to-r from-surface to-transparent sm:w-20"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute inset-y-0 right-0 z-10 w-12 bg-gradient-to-l from-surface to-transparent sm:w-20"
          aria-hidden
        />

        <div
          ref={trackRef}
          className="flex w-max gap-4 px-4 will-change-transform"
        >
          {items.map((image, i) => (
            <div
              key={`${image.src}-${i}`}
              className="gallery-flicker-item relative h-28 w-44 shrink-0 overflow-hidden rounded-md border border-white/15 sm:h-32 sm:w-52 md:h-36 md:w-60"
              style={{
                animationDelay: `${(i % galleryImages.length) * 0.4}s`,
              }}
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                className="object-cover"
                sizes="240px"
                draggable={false}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { galleryImages } from "@/lib/data";

const PX_PER_MS = 0.055;
const SLOT_MS = 4500;
const FADE_RATIO = 0.38;

function spotlightIntensity(slotProgress: number) {
  let wave = 0;

  if (slotProgress < FADE_RATIO) {
    wave = slotProgress / FADE_RATIO;
  } else if (slotProgress > 1 - FADE_RATIO) {
    wave = (1 - slotProgress) / FADE_RATIO;
  } else {
    wave = 1;
  }

  return wave * wave * (3 - 2 * wave);
}

function seededRandom(seed: number) {
  let state = seed >>> 0;

  return () => {
    state = (state * 1664525 + 1013904223) >>> 0;
    return state / 0xffffffff;
  };
}

function pickRandomSpotlight(slotIndex: number, total: number) {
  const rng = seededRandom(slotIndex * 9973 + total * 17);
  const count = 2 + Math.floor(rng() * 2);
  const picked = new Set<number>();

  while (picked.size < count) {
    picked.add(Math.floor(rng() * total));
  }

  return picked;
}

export default function Gallery() {
  const trackRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const offsetRef = useRef(0);
  const frameRef = useRef(0);
  const loopWidthRef = useRef(0);

  const items = [...galleryImages, ...galleryImages];

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    let active = true;
    let lastTime = performance.now();

    const updateLoopWidth = () => {
      loopWidthRef.current = track.scrollWidth / 2;
    };

    const resizeObserver = new ResizeObserver(updateLoopWidth);
    resizeObserver.observe(track);

    let cachedSlot = -1;
    let cachedSpotlight = new Set<number>();

    const getSpotlight = (slotIndex: number, total: number) => {
      if (cachedSlot !== slotIndex) {
        cachedSlot = slotIndex;
        cachedSpotlight = pickRandomSpotlight(slotIndex, total);
      }
      return cachedSpotlight;
    };

    const setFlicker = (now: number) => {
      const total = galleryImages.length;
      const slot = now / SLOT_MS;
      const slotIndex = Math.floor(slot);
      const slotProgress = slot - slotIndex;
      const activeSet = getSpotlight(slotIndex, total);
      const intensity = spotlightIntensity(slotProgress);

      itemRefs.current.forEach((el, index) => {
        if (!el) return;

        const sourceIndex = index % total;
        const wave = activeSet.has(sourceIndex) ? intensity : 0;

        const grayscale = 1 - wave;
        const brightness = 0.32 + wave * 0.68;
        const opacity = 0.3 + wave * 0.7;

        el.style.opacity = String(opacity);
        el.style.filter = `grayscale(${grayscale}) brightness(${brightness})`;
      });
    };

    const tick = (now: number) => {
      if (!active) return;

      const delta = now - lastTime;
      lastTime = now;

      const loopWidth = loopWidthRef.current;
      if (loopWidth > 0) {
        offsetRef.current += PX_PER_MS * delta;
        if (offsetRef.current >= loopWidth) {
          offsetRef.current %= loopWidth;
        }
        track.style.transform = `translate3d(-${offsetRef.current}px, 0, 0)`;
      }

      setFlicker(now);
      frameRef.current = requestAnimationFrame(tick);
    };

    const start = () => {
      updateLoopWidth();
      lastTime = performance.now();
      frameRef.current = requestAnimationFrame(tick);
    };

    const imgs = Array.from(track.querySelectorAll("img"));
    if (imgs.length === 0) {
      start();
    } else {
      let remaining = imgs.length;
      const onReady = () => {
        remaining -= 1;
        if (remaining <= 0) start();
      };

      imgs.forEach((img) => {
        if (img.complete) onReady();
        else {
          img.addEventListener("load", onReady, { once: true });
          img.addEventListener("error", onReady, { once: true });
        }
      });
    }

    return () => {
      active = false;
      cancelAnimationFrame(frameRef.current);
      resizeObserver.disconnect();
    };
  }, []);

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
          style={{ transform: "translate3d(0, 0, 0)" }}
        >
          {items.map((image, i) => (
            <div
              key={`${image.src}-${i}`}
              ref={(el) => {
                itemRefs.current[i] = el;
              }}
              className="relative h-28 w-44 shrink-0 overflow-hidden rounded-md border border-white/15 transition-none sm:h-32 sm:w-52 md:h-36 md:w-60"
              style={{
                opacity: 0.3,
                filter: "grayscale(1) brightness(0.32)",
              }}
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                className="object-cover"
                sizes="240px"
                loading="eager"
                draggable={false}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

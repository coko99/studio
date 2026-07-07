"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";

const MIN_DURATION_MS = 1800;
const EXIT_MS = 500;

type PageTransitionContextValue = {
  startTransition: () => void;
};

const PageTransitionContext = createContext<PageTransitionContextValue | null>(
  null
);

function isInternalHref(href: string | null) {
  if (!href) return false;
  if (href.startsWith("#")) return false;
  if (href.startsWith("http") || href.startsWith("mailto:") || href.startsWith("tel:")) {
    return false;
  }
  return href.startsWith("/");
}

export function PageTransitionProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const [active, setActive] = useState(true);
  const [exiting, setExiting] = useState(false);
  const startedAt = useRef(Date.now());
  const isFirstRender = useRef(true);
  const pendingNavigation = useRef(false);
  const hideTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const exitTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearTimers = useCallback(() => {
    if (hideTimer.current) clearTimeout(hideTimer.current);
    if (exitTimer.current) clearTimeout(exitTimer.current);
  }, []);

  const finishTransition = useCallback(() => {
    const elapsed = Date.now() - startedAt.current;
    const remaining = Math.max(0, MIN_DURATION_MS - elapsed);

    hideTimer.current = setTimeout(() => {
      setExiting(true);
      exitTimer.current = setTimeout(() => {
        setActive(false);
        setExiting(false);
      }, EXIT_MS);
    }, remaining);
  }, []);

  const startTransition = useCallback(() => {
    clearTimers();
    pendingNavigation.current = true;
    startedAt.current = Date.now();
    setExiting(false);
    setActive(true);
  }, [clearTimers]);

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      const target = event.target as Element | null;
      const anchor = target?.closest("a");
      if (!anchor) return;

      const href = anchor.getAttribute("href");
      if (!isInternalHref(href)) return;
      if (href === pathname) return;

      startTransition();
    };

    document.addEventListener("click", handleClick, true);
    return () => document.removeEventListener("click", handleClick, true);
  }, [pathname, startTransition]);

  useEffect(() => {
    clearTimers();

    if (isFirstRender.current) {
      isFirstRender.current = false;
      startedAt.current = Date.now();
      finishTransition();
      return;
    }

    setExiting(false);
    setActive(true);

    if (pendingNavigation.current) {
      pendingNavigation.current = false;
    } else {
      startedAt.current = Date.now();
    }

    finishTransition();
  }, [pathname, clearTimers, finishTransition]);

  useEffect(() => () => clearTimers(), [clearTimers]);

  return (
    <PageTransitionContext.Provider value={{ startTransition }}>
      {children}
      {active && <PreloaderOverlay exiting={exiting} />}
    </PageTransitionContext.Provider>
  );
}

function PreloaderOverlay({ exiting }: { exiting: boolean }) {
  return (
    <div
      aria-hidden="true"
      className={`fixed inset-0 z-[200] flex flex-col items-center justify-between bg-[#050505] px-6 py-10 transition-opacity duration-500 ${
        exiting ? "pointer-events-none opacity-0" : "opacity-100"
      }`}
    >
      <div className="pt-4 text-center">
        <p className="studio-shimmer text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-[0.35em] font-[family-name:var(--font-bebas)]">
          STUDIO
        </p>
        <p className="mt-2 text-xs uppercase tracking-[0.4em] text-gold-mid/60">
          Caffe Bar
        </p>
      </div>

      <div className="cocktail-pour-scene">
        <div className="cocktail-shaker" />
        <div className="cocktail-pour-stream" />
        <div className="cocktail-glass">
          <div className="cocktail-liquid" />
          <div className="cocktail-bubbles" />
        </div>
        <div className="cocktail-glass-stem" />
        <div className="cocktail-glass-base" />
      </div>

      <a
        href="https://cokoladni.photo"
        target="_blank"
        rel="noopener noreferrer"
        className="pb-2 flex flex-col items-center gap-2 pointer-events-auto"
        onClick={(event) => event.stopPropagation()}
      >
        <span className="text-[10px] uppercase tracking-[0.25em] text-muted/35">
          powered by
        </span>
        <span className="flex items-center gap-2.5">
          <Image
            src="/images/cokoladni-aj-tim.png"
            alt=""
            width={28}
            height={28}
            className="h-7 w-7 animate-pulse-turquoise neon-turquoise-glow"
          />
          <span className="text-sm font-semibold tracking-wide neon-turquoise font-[family-name:var(--font-montserrat)]">
            čokoladni aj ti
          </span>
        </span>
      </a>
    </div>
  );
}

export function usePageTransition() {
  const context = useContext(PageTransitionContext);
  if (!context) {
    throw new Error("usePageTransition must be used within PageTransitionProvider");
  }
  return context;
}

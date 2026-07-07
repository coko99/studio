"use client";

import { useState } from "react";
import { siteInfo } from "@/lib/data";

export default function FloatingContact() {
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col-reverse items-end gap-3">
      {open && (
        <div className="flex flex-col gap-2 animate-fade-in-up">
          <a
            href={`tel:${siteInfo.phoneRaw}`}
            className="flex items-center gap-3 bg-surface border border-gold-mid/30 rounded-full pl-4 pr-5 py-3 shadow-lg neon-border hover:border-gold-mid/60 transition-all group"
          >
            <span className="w-9 h-9 rounded-full btn-gold flex items-center justify-center shrink-0">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                />
              </svg>
            </span>
            <span className="text-sm font-semibold text-foreground whitespace-nowrap">
              Poziv
            </span>
          </a>

          <a
            href={siteInfo.sms}
            className="flex items-center gap-3 bg-surface border border-gold-mid/30 rounded-full pl-4 pr-5 py-3 shadow-lg neon-border hover:border-gold-mid/60 transition-all group"
          >
            <span className="w-9 h-9 rounded-full btn-gold flex items-center justify-center shrink-0">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                />
              </svg>
            </span>
            <span className="text-sm font-semibold text-foreground whitespace-nowrap">
              SMS
            </span>
          </a>
        </div>
      )}

      <button
        onClick={() => setOpen(!open)}
        className={`w-14 h-14 rounded-full btn-gold flex items-center justify-center shadow-lg animate-pulse-glow transition-transform duration-300 ${open ? "rotate-0" : ""}`}
        aria-label={open ? "Zatvori kontakt meni" : "Otvori kontakt meni"}
      >
        {open ? (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
            />
          </svg>
        )}
      </button>
    </div>
  );
}

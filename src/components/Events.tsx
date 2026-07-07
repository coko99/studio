import { events, siteInfo } from "@/lib/data";

export default function Events() {
  return (
    <section className="pt-28 md:pt-32 pb-24 md:pb-32 bg-surface border-y border-gold-mid/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-16">
          <span className="tag mb-6">Događaji</span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-[family-name:var(--font-bebas)] tracking-wide gold-text gold-glow mb-4">
            Događaji u Studiju
          </h2>
          <p className="text-muted max-w-2xl mx-auto text-base sm:text-lg mb-6">
            Studio je mesto gde se okuplja ekipa, slavi vikend i uživa u dobroj
            muzici. Prati najave za DJ večeri, live svirke i specijalne
            događaje.
          </p>
          <p className="inline-flex items-center rounded-full border border-gold-mid/25 bg-gold-mid/10 px-5 py-2.5 text-sm sm:text-base text-gold-light font-medium">
            Svakog petka i subote u Studiju — muzika i provod do kasno u noć
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {events.map((event) => (
            <div
              key={event.title}
              className="bg-surface/70 backdrop-blur-sm rounded-2xl p-6 border border-gold-mid/10 hover:border-gold-mid/30 transition-all duration-500 text-center neon-border"
            >
              <span className="tag mb-4">{event.tag}</span>
              <h3 className="text-xl font-bold font-[family-name:var(--font-bebas)] tracking-wide text-gold-light mb-3">
                {event.title}
              </h3>
              <p className="text-muted text-sm leading-relaxed">
                {event.description}
              </p>
            </div>
          ))}
        </div>

        <div className="text-center">
          <p className="text-muted text-sm">
            U Studiju se vikend ne čeka — on se pravi. Prati najave događaja,
            rezerviši svoje mesto i uživaj u večerima uz muziku, koktele i
            društvo.
          </p>
        </div>

        <div className="text-center mt-12">
          <a
            href={siteInfo.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-gold px-8 py-3 rounded-full text-base inline-flex items-center gap-2"
          >
            <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
            </svg>
            Pogledaj najave događaja
          </a>
        </div>
      </div>
    </section>
  );
}

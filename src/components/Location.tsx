import { siteInfo } from "@/lib/data";

export default function Location() {
  return (
    <section className="relative py-16 md:py-24 bg-surface">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <span className="tag mb-6">Lokacija</span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-[family-name:var(--font-montserrat)] gold-text gold-glow mb-4">
            Pronađi nas
          </h2>
          <p className="text-muted text-lg">
            {siteInfo.name} — {siteInfo.address}
          </p>
        </div>

        <div className="rounded-2xl overflow-hidden border border-gold-mid/20 neon-border aspect-video max-w-5xl mx-auto">
          <iframe
            src="https://maps.google.com/maps?q=%C5%BEelezni%C4%8Dka+42,+Kru%C5%A1evac,+Serbia&hl=sr&z=16&output=embed"
            width="100%"
            height="100%"
            style={{ border: 0, minHeight: "400px" }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Caffe Bar Studio lokacija"
          />
        </div>

        <div className="text-center mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
          <a
            href="https://maps.google.com/?q=Železnička+42+Kruševac"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-outline px-8 py-3 rounded-full text-base inline-block"
          >
            Otvori u Google Maps
          </a>
          <a
            href={siteInfo.googleReviews}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-gold px-8 py-3 rounded-full text-base inline-block"
          >
            Ostavi recenziju
          </a>
        </div>
      </div>
    </section>
  );
}

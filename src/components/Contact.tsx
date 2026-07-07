import { siteInfo } from "@/lib/data";
import { SocialLinks } from "@/components/SocialLinks";

const contactOptions = [
  {
    label: "Poziv",
    description: "Pozovi nas direktno",
    href: `tel:${siteInfo.phoneRaw}`,
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
        />
      </svg>
    ),
    style: "btn-gold",
  },
  {
    label: "WhatsApp",
    description: "Pošalji poruku na WhatsApp",
    href: siteInfo.whatsapp,
    icon: (
      <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.881 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
      </svg>
    ),
    style: "btn-outline",
  },
  {
    label: "Viber",
    description: "Kontaktiraj nas na Viberu",
    href: siteInfo.viber,
    icon: (
      <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
        <path d="M11.398.002C9.473.028 5.331.344 3.014 2.467 1.294 4.177.693 6.698.623 9.82c-.06 2.642-.13 7.615 4.635 8.96h.004l-.004 2.072 2.355-1.282 2.555 1.313c.96.27 1.94.402 2.916.402 4.9 0 8.054-3.947 8.054-8.86C20.542 4.153 16.918.018 11.398.002zm.623 1.728c4.755.02 7.796 3.588 7.796 8.17 0 4.117-2.67 7.132-6.916 7.132-.79 0-1.574-.11-2.33-.33l-1.66-.85-1.72.936.003-1.68-.34-.15C2.71 15.06 2.77 10.5 2.82 9.86 2.88 7.06 3.41 4.9 4.89 3.42c1.98-1.96 5.73-1.72 7.13-1.69zm.28 3.18c-.167 0-.302.135-.302.302v4.358c0 .167.135.302.302.302h.604c.167 0 .302-.135.302-.302V5.212c0-.167-.135-.302-.302-.302h-.604zm2.416 0c-.167 0-.302.135-.302.302v4.358c0 .167.135.302.302.302h.604c.167 0 .302-.135.302-.302V5.212c0-.167-.135-.302-.302-.302h-.604zm2.416 0c-.167 0-.302.135-.302.302v4.358c0 .167.135.302.302.302h.604c.167 0 .302-.135.302-.302V5.212c0-.167-.135-.302-.302-.302h-.604z" />
      </svg>
    ),
    style: "btn-outline",
  },
  {
    label: "SMS",
    description: "Pošalji SMS poruku",
    href: siteInfo.sms,
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
        />
      </svg>
    ),
    style: "btn-outline",
  },
];

export default function Contact() {
  return (
    <section className="pt-28 md:pt-32 pb-24 md:pb-32 bg-background">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <span className="tag mb-6">Rezervacije</span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-[family-name:var(--font-montserrat)] gold-text gold-glow mb-4">
            Rezerviši mesto
          </h2>
          <p className="text-muted max-w-2xl mx-auto text-base sm:text-lg">
            Planiraš izlazak? Rezerviši svoje mesto na vreme i uživaj u večeri
            bez čekanja.
          </p>
        </div>

        <a
          href={`tel:${siteInfo.phoneRaw}`}
          className="block text-center mb-10 group"
        >
          <span className="text-3xl sm:text-4xl md:text-5xl font-bold font-[family-name:var(--font-montserrat)] gold-text gold-glow group-hover:opacity-80 transition-opacity">
            {siteInfo.phone}
          </span>
        </a>

        <div className="grid grid-cols-2 gap-4 mb-8">
          {contactOptions.map((option) => (
            <a
              key={option.label}
              href={option.href}
              target={option.label === "Poziv" || option.label === "SMS" ? undefined : "_blank"}
              rel={option.label === "Poziv" || option.label === "SMS" ? undefined : "noopener noreferrer"}
              className={`${option.style} flex flex-col items-center gap-3 p-6 rounded-2xl text-center transition-all duration-300`}
            >
              {option.icon}
              <div>
                <span className="block font-bold text-base">{option.label}</span>
                <span className={`block text-xs mt-1 ${option.style === "btn-gold" ? "text-background/70" : "text-muted"}`}>
                  {option.description}
                </span>
              </div>
            </a>
          ))}
        </div>

        <div className="bg-surface/60 backdrop-blur-sm rounded-2xl p-6 border border-gold-mid/10 neon-border text-center mb-6">
          <p className="text-muted text-sm mb-1">Adresa</p>
          <p className="text-foreground font-medium">{siteInfo.address}</p>
        </div>

        <SocialLinks variant="cards" />
      </div>
    </section>
  );
}

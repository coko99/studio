import Image from "next/image";
import { siteInfo } from "@/lib/data";
import { SocialLinks } from "@/components/SocialLinks";

export default function Footer() {
  return (
    <footer className="bg-surface border-t border-gold-mid/10 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="text-center md:text-left">
            <Image
              src="/images/logo.png"
              alt="Caffe Bar Studio"
              width={720}
              height={252}
              className="h-[9rem] md:h-[7.5rem] w-auto mx-auto md:mx-0 mb-4"
            />
            <p className="text-muted text-sm max-w-md">
              Caffe Bar Studio Kruševac je urbano mesto za kafu, koktele,
              muziku i večernji izlazak. Bilo da dolazite na dnevnu kafu,
              večernji koktel ili vikend provod, Studio je mesto za
              opuštanje, druženje i dobar ritam.
            </p>
          </div>

          <div className="text-center md:text-right">
            <p className="text-gold-light font-semibold mb-2">
              {siteInfo.address}
            </p>
            <p className="text-muted text-sm mb-5">
              Kokteli, muzika i atmosfera koja pokreće grad.
            </p>
            <SocialLinks variant="compact" align="end" />
            <p className="gold-text font-bold text-lg font-[family-name:var(--font-playfair)] italic mt-5">
              Vidimo se u Studiju.
            </p>
          </div>
        </div>

        <div className="divider-gold my-8" />

        <p className="text-center text-muted/50 text-xs">
          &copy; {new Date().getFullYear()} {siteInfo.name}. Sva prava zadržana.
        </p>

        <div className="mt-8 flex flex-col items-center gap-3">
          <span className="text-[10px] uppercase tracking-[0.25em] text-muted/40">
            powered by
          </span>
          <a
            href="https://cokoladni.photo"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-3 rounded-full border border-cyan-400/20 bg-black/40 px-4 py-2 transition-all hover:border-cyan-400/40 hover:shadow-[0_0_24px_rgba(62,232,220,0.2)]"
          >
            <Image
              src="/images/cokoladni-aj-tim.png"
              alt="čokoladni aj ti"
              width={36}
              height={36}
              className="h-9 w-9 animate-pulse-turquoise neon-turquoise-glow"
            />
            <span className="font-semibold tracking-wide neon-turquoise font-[family-name:var(--font-montserrat)]">
              čokoladni aj ti
            </span>
          </a>
        </div>
      </div>
    </footer>
  );
}

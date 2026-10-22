import Image from "next/image";
import { SocialLinks } from "@/components/SocialLinks";
import { siteInfo } from "@/lib/data";

export default function ComingSoon() {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden px-4 py-16">
      <Image
        src="/images/photo-17.png"
        alt=""
        fill
        priority
        className="scale-105 object-cover blur-md brightness-[0.28]"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/80 to-background" />

      <div className="relative z-10 mx-auto flex w-full max-w-xl flex-col items-center text-center">
        <Image
          src="/images/logo.png"
          alt="Caffe Bar Studio"
          width={320}
          height={120}
          priority
          className="mb-8 h-auto w-44 sm:w-56"
        />

        <p className="tag mb-6">Uskoro</p>

        <h1 className="gold-text gold-glow mb-4 font-[family-name:var(--font-bebas)] text-6xl font-extrabold tracking-[0.12em] sm:text-7xl md:text-8xl">
          Coming Soon
        </h1>

        <p className="mb-8 max-w-md font-[family-name:var(--font-playfair)] text-lg italic text-muted sm:text-xl">
          {siteInfo.tagline}
        </p>

        <div className="divider-gold mb-8 w-24" />

        <p className="text-sm tracking-wide text-foreground/90">{siteInfo.address}</p>
        <a
          href={`tel:${siteInfo.phoneRaw}`}
          className="mt-2 text-sm text-gold-light transition-colors hover:text-gold-mid"
        >
          {siteInfo.phone}
        </a>

        <div className="mt-10">
          <SocialLinks variant="compact" />
        </div>
      </div>
    </section>
  );
}

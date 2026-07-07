import type { Metadata } from "next";
import SiteShell from "@/components/SiteShell";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Gallery from "@/components/Gallery";
import FeaturedCocktails from "@/components/FeaturedCocktails";

export const metadata: Metadata = {
  title: "Caffe Bar Studio Kruševac | Početna",
  description:
    "Kafa, kokteli, muzika i provod u srcu Kruševca. Tvoje mesto za dnevnu kafu, večernji koktel i noć za pamćenje.",
};

export default function Home() {
  return (
    <SiteShell>
      <Hero />
      <About />
      <Gallery />
      <FeaturedCocktails />
    </SiteShell>
  );
}

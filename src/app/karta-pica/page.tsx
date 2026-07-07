import type { Metadata } from "next";
import SiteShell from "@/components/SiteShell";
import DrinkMenu from "@/components/DrinkMenu";

export const metadata: Metadata = {
  title: "Karta pića | Caffe Bar Studio Kruševac",
  description:
    "Cenovnik Caffe Bar Studio — kafa, pivo, žestoka pića, kokteli i više.",
};

export default function KartaPicaPage() {
  return (
    <SiteShell>
      <DrinkMenu />
    </SiteShell>
  );
}

import type { Metadata } from "next";
import SiteShell from "@/components/SiteShell";
import DrinkMenu from "@/components/DrinkMenu";
import { getPublicMenuBundle } from "@/lib/menu-data";

export const metadata: Metadata = {
  title: "Karta pića | Caffe Bar Studio Kruševac",
  description:
    "Cenovnik Caffe Bar Studio — kafa, pivo, žestoka pića, kokteli i više.",
};

export default async function KartaPicaPage() {
  const {
    dayCategories,
    nightCategories,
    featured,
    schedule,
    initialMenuType,
  } = await getPublicMenuBundle();

  return (
    <SiteShell>
      <DrinkMenu
        dayCategories={dayCategories}
        nightCategories={nightCategories}
        featured={featured}
        schedule={schedule}
        initialMenuType={initialMenuType}
      />
    </SiteShell>
  );
}

import type { Metadata } from "next";
import SiteShell from "@/components/SiteShell";
import Contact from "@/components/Contact";
import Location from "@/components/Location";

export const metadata: Metadata = {
  title: "Kontakt | Caffe Bar Studio Kruševac",
  description:
    "Rezerviši mesto u Caffe Bar Studio. Železnička 42, Kruševac. Poziv, SMS, WhatsApp i Viber.",
};

export default function KontaktPage() {
  return (
    <SiteShell>
      <Contact />
      <Location />
    </SiteShell>
  );
}

import type { Metadata } from "next";
import SiteShell from "@/components/SiteShell";
import Events from "@/components/Events";

export const metadata: Metadata = {
  title: "Događaji | Caffe Bar Studio Kruševac",
  description:
    "DJ party, live muzika, tematske večeri i žurke u Caffe Bar Studio Kruševac.",
};

export default function DogadjajiPage() {
  return (
    <SiteShell>
      <Events />
    </SiteShell>
  );
}

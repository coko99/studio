import type { Metadata } from "next";
import ComingSoon from "@/components/ComingSoon";

export const metadata: Metadata = {
  title: "Caffe Bar Studio Kruševac | Coming Soon",
  description:
    "Caffe Bar Studio Kruševac uskoro otvara sajt. Kafa, kokteli, muzika i provod — Železnička 42.",
  robots: { index: false, follow: false },
};

export default function UskoroPage() {
  return <ComingSoon />;
}

import type { Metadata } from "next";
import {
  Montserrat,
  Inter,
  Playfair_Display,
  Bebas_Neue,
} from "next/font/google";
import { PageTransitionProvider } from "@/components/PagePreloader";
import "./globals.css";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin", "latin-ext"],
  weight: ["400", "600", "700", "800"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "latin-ext"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin", "latin-ext"],
  weight: ["400", "700"],
});

const bebas = Bebas_Neue({
  variable: "--font-bebas",
  subsets: ["latin", "latin-ext"],
  weight: ["400"],
});

export const metadata: Metadata = {
  title: "Caffe Bar Studio Kruševac | Kafa, Kokteli, Muzika i Provod",
  description:
    "Caffe Bar Studio Kruševac je urbano mesto za kafu, koktele, muziku i večernji izlazak. Železnička 42 — DJ žurke, live svirke i bogata ponuda pića.",
  keywords: [
    "Caffe Bar Studio Kruševac",
    "Studio Caffe Bar",
    "kafić Kruševac",
    "kokteli Kruševac",
    "izlazak Kruševac",
    "DJ party Kruševac",
    "muzika uživo Kruševac",
    "bar Kruševac",
    "karta pića Kruševac",
    "Železnička 42 Kruševac",
  ],
  openGraph: {
    title: "Caffe Bar Studio Kruševac",
    description:
      "Kafa, kokteli, muzika i provod u srcu Kruševca. Tvoje mesto za dnevnu kafu, večernji koktel i noć za pamćenje.",
    type: "website",
    locale: "sr_RS",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="sr"
      className={`${montserrat.variable} ${inter.variable} ${playfair.variable} ${bebas.variable} scroll-smooth overflow-x-hidden`}
    >
      <body className="min-h-screen bg-background text-foreground antialiased overflow-x-hidden">
        <PageTransitionProvider>{children}</PageTransitionProvider>
      </body>
    </html>
  );
}

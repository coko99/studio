export const siteInfo = {
  name: "Caffe Bar Studio",
  tagline: "Kafa, kokteli, muzika i provod u srcu Kruševca.",
  address: "Železnička 42, Kruševac",
  phone: "065/28-21-280",
  phoneRaw: "+381652821280",
  instagram: "https://www.instagram.com/studio_caffe_bar/",
  facebook: "https://www.facebook.com/p/studio_caffe_bar-100093212943449/?locale=sr_RS",
  googleReviews: "https://share.google/jQfD1t6IaGw0709iT",
  whatsapp: "https://wa.me/381652821280",
  viber: "viber://chat?number=%2B381652821280",
  sms: "sms:+381652821280",
};

export const cocktails = [
  {
    name: "Long Island",
    price: "550 RSD",
    tag: "jak",
    description:
      "Jak, poznat i uvek spreman da pokrene veče. Idealno piće za one koji žele koktel sa karakterom.",
    image: "/images/cocktails/long-island.png",
  },
  {
    name: "Sex on the Beach",
    price: "550 RSD",
    tag: "voćni",
    description:
      "Voćni, osvežavajući i lagan koktel, savršen za opušteno veče i druženje.",
    image: "/images/cocktails/sex-on-the-beach.png",
  },
  {
    name: "Blue Curacao",
    price: "550 RSD",
    tag: "premium",
    description:
      "Atraktivan plavi koktel koji vizuelno privlači pažnju i odličan je za fotografije i Instagram story.",
    image: "/images/cocktails/blue-curacao.png",
  },
  {
    name: "Aperol Spritz",
    price: "550 RSD",
    tag: "osvežavajući",
    description:
      "Elegantno, osvežavajuće piće za lagan početak večeri.",
    image: "/images/cocktails/aperol-spritz.png",
  },
  {
    name: "Mojito",
    price: "550 RSD",
    tag: "klasik",
    description:
      "Svež klasik sa mentom i limetom, idealan za letnju atmosferu.",
    image: "/images/cocktails/mojito.png",
  },
  {
    name: "Mai Tai",
    price: "580 RSD",
    tag: "premium",
    description:
      "Tropski koktel bogatog ukusa, dobar za premium predstavljanje na sajtu.",
    image: "/images/cocktails/mai-tai.png",
  },
];

export const featuredSliderCocktails = [
  {
    name: "Long Island",
    tag: "jak",
    description:
      "Jak, poznat i uvek spreman da pokrene veče. Idealno piće za one koji žele koktel sa karakterom.",
    image: "/images/cocktails/long-island.png",
    dayPrice: "750 RSD",
    nightPrice: "990 RSD",
  },
  {
    name: "Sex on the Beach",
    tag: "voćni",
    description:
      "Voćni, osvežavajući i lagan koktel, savršen za opušteno veče i druženje.",
    image: "/images/cocktails/sex-on-the-beach.png",
    dayPrice: "650 RSD",
    nightPrice: "900 RSD",
  },
  {
    name: "Blue Curacao",
    tag: "premium",
    description:
      "Atraktivan plavi koktel koji vizuelno privlači pažnju i odličan je za fotografije.",
    image: "/images/cocktails/blue-curacao.png",
    dayPrice: "600 RSD",
    nightPrice: "890 RSD",
  },
  {
    name: "Aperol Spritz",
    tag: "osvežavajući",
    description:
      "Elegantno, osvežavajuće piće za lagan početak večeri.",
    image: "/images/cocktails/aperol-spritz.png",
    dayPrice: "650 RSD",
    nightPrice: "790 RSD",
  },
  {
    name: "Mojito",
    tag: "klasik",
    description:
      "Svež klasik sa mentom i limetom, idealan za letnju atmosferu.",
    image: "/images/cocktails/mojito.png",
    dayPrice: "490 RSD",
    nightPrice: "850 RSD",
  },
];

export {
  dayMenuCategories as regularMenuCategories,
  nightMenuCategories,
} from "./menus";

/** @deprecated use regularMenuCategories */
export { dayMenuCategories as menuCategories } from "./menus";

export const events = [
  {
    title: "DJ Party",
    description: "Vikend žurke sa najboljim DJ setovima i energijom do zore.",
    tag: "DJ",
  },
  {
    title: "Live muzika",
    description: "Nastupi bendova i akustične svirke za nezaboravne večeri.",
    tag: "Live",
  },
  {
    title: "Tematske večeri",
    description: "Specijalni programi, praznici i večeri sa pevačima.",
    tag: "Specijal",
  },
  {
    title: "Žurka napolju",
    description: "Letnji provod pod zvezdama sa koktelima i dobrom muzikom.",
    tag: "Outdoor",
  },
];

export const galleryImages = [
  { src: "/images/photo-1.png", alt: "Šank i enterijer Caffe Bar Studio" },
  { src: "/images/photo-8.png", alt: "Salon sa sedištem i dekorom" },
  { src: "/images/photo-18.png", alt: "Dekorativni zid sa lusterom" },
  { src: "/images/photo-4.png", alt: "Police sa biljkama i zlatnim osvetljenjem" },
  { src: "/images/photo-5.png", alt: "STUDIO natpis i zelenilo" },
  { src: "/images/photo-2.png", alt: "Šank sa koktelima" },
  { src: "/images/photo-13.png", alt: "Enterijer sa zvezdastim lusterima" },
  { src: "/images/photo-6.png", alt: "Sečenje sa zlatnim ivicama" },
  { src: "/images/photo-17.png", alt: "Kafa u Studiju" },
  { src: "/images/photo-14.png", alt: "Desert u enterijeru Studija" },
  { src: "/images/photo-15.png", alt: "Espresso koktel na stolu" },
  { src: "/images/photo-10.png", alt: "STUDIO natpis na zelenoj pozadini" },
];

export const navLinks = [
  { label: "Početna", href: "/" },
  { label: "Karta pića", href: "/karta-pica" },
  { label: "Događaji", href: "/dogadjaji" },
  { label: "Kontakt", href: "/kontakt" },
];

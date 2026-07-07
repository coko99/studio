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
    image: "/images/photo-3.png",
  },
  {
    name: "Sex on the Beach",
    price: "550 RSD",
    tag: "voćni",
    description:
      "Voćni, osvežavajući i lagan koktel, savršen za opušteno veče i druženje.",
    image: "/images/photo-10.png",
  },
  {
    name: "Blue Curacao",
    price: "550 RSD",
    tag: "premium",
    description:
      "Atraktivan plavi koktel koji vizuelno privlači pažnju i odličan je za fotografije i Instagram story.",
    image: "/images/photo-21.png",
  },
  {
    name: "Aperol Spritz",
    price: "550 RSD",
    tag: "osvežavajući",
    description:
      "Elegantno, osvežavajuće piće za lagan početak večeri.",
    image: "/images/photo-16.png",
  },
  {
    name: "Mojito",
    price: "550 RSD",
    tag: "klasik",
    description:
      "Svež klasik sa mentom i limetom, idealan za letnju atmosferu.",
    image: "/images/photo-16.png",
  },
  {
    name: "Mai Tai",
    price: "580 RSD",
    tag: "premium",
    description:
      "Tropski koktel bogatog ukusa, dobar za premium predstavljanje na sajtu.",
    image: "/images/photo-2.png",
  },
];

export const featuredSliderCocktails = [
  {
    name: "Long Island",
    tag: "jak",
    description:
      "Jak, poznat i uvek spreman da pokrene veče. Idealno piće za one koji žele koktel sa karakterom.",
    image: "/images/photo-3.png",
    dayPrice: "750 RSD",
    nightPrice: "990 RSD",
  },
  {
    name: "Sex on the Beach",
    tag: "voćni",
    description:
      "Voćni, osvežavajući i lagan koktel, savršen za opušteno veče i druženje.",
    image: "/images/photo-10.png",
    dayPrice: "650 RSD",
    nightPrice: "900 RSD",
  },
  {
    name: "Blue Curacao",
    tag: "premium",
    description:
      "Atraktivan plavi koktel koji vizuelno privlači pažnju i odličan je za fotografije.",
    image: "/images/photo-21.png",
    dayPrice: "600 RSD",
    nightPrice: "890 RSD",
  },
  {
    name: "Aperol Spritz",
    tag: "osvežavajući",
    description:
      "Elegantno, osvežavajuće piće za lagan početak večeri.",
    image: "/images/photo-16.png",
    dayPrice: "650 RSD",
    nightPrice: "790 RSD",
  },
  {
    name: "Mojito",
    tag: "klasik",
    description:
      "Svež klasik sa mentom i limetom, idealan za letnju atmosferu.",
    image: "/images/photo-19.png",
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
  "/images/photo-17.png",
  "/images/photo-22.png",
  "/images/photo-21.png",
  "/images/photo-16.png",
  "/images/photo-6.png",
  "/images/photo-11.png",
  "/images/photo-12.png",
  "/images/photo-19.png",
  "/images/photo-18.png",
  "/images/photo-4.png",
  "/images/photo-8.png",
  "/images/photo-9.png",
];

export const navLinks = [
  { label: "Početna", href: "/" },
  { label: "Karta pića", href: "/karta-pica" },
  { label: "Događaji", href: "/dogadjaji" },
  { label: "Kontakt", href: "/kontakt" },
];

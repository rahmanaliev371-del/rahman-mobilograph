/**
 * Language-independent site configuration.
 * All visible texts live in src/i18n/dictionaries/{en,ru,kk}.ts.
 */
import type { Locale } from "@/i18n/config";

export const site = {
  brand: "RAHMAN MOBILOGRAPH",
  coordinates: "43.24° N — 76.89° E",
  instagram: {
    handle: "@raha_mobi_00",
    url: "https://www.instagram.com/raha_mobi_00/",
  },
  whatsapp: {
    display: "+7 747 141 42 05",
    /** International format without "+" or spaces, as wa.me expects. */
    number: "77471414205",
  },
  tiktok: {
    handle: "@raha.log_02",
    url: "https://www.tiktok.com/@raha.log_02",
  },
} as const;

/** WhatsApp chat link, optionally with a pre-filled message. */
export const whatsappUrl = (message?: string) =>
  `https://wa.me/${site.whatsapp.number}${message ? `?text=${encodeURIComponent(message)}` : ""}`;

export const sectionIds = ["about", "work", "services", "process", "pricing", "contact"] as const;
export type SectionId = (typeof sectionIds)[number];

/* ------------------------------------------------------------------ */
/* Portfolio                                                           */
/* ------------------------------------------------------------------ */

export const categories = ["restaurant", "sport", "wedding", "product", "store", "travel"] as const;
export type Category = (typeof categories)[number];

/** Colour "grade" used by placeholders until real footage is added. */
export const categoryGrades: Record<Category, { from: string; to: string }> = {
  restaurant: { from: "#3a2414", to: "#0d0806" },
  sport: { from: "#14263a", to: "#06090d" },
  wedding: { from: "#3a302a", to: "#0e0c0b" },
  product: { from: "#2b2b2e", to: "#0a0a0b" },
  store: { from: "#2c1834", to: "#0b070d" },
  travel: { from: "#16302a", to: "#060c0a" },
};

export type Project = {
  id: string;
  category: Category;
  /** Vertical reels are 9:16, wide films are 16:9. */
  format: "9:16" | "16:9";
  /** Optional real title per language. Without it a generic one is shown ("Restaurant Reel 01"). */
  title?: Partial<Record<Locale, string>>;
  /** Optional: path to a video in /public, e.g. "/videos/restaurant-01.mp4". */
  video?: string;
  /** Optional: poster image in /public, e.g. "/images/restaurant-01.jpg". */
  poster?: string;
};

/**
 * Placeholder projects. Add `video` / `poster` (and optionally `title`)
 * once real work is ready — the cards will pick them up automatically.
 */
export const projects: Project[] = [
  { id: "restaurant-01", category: "restaurant", format: "9:16" },
  { id: "sport-01", category: "sport", format: "9:16" },
  { id: "wedding-01", category: "wedding", format: "16:9" },
  { id: "product-01", category: "product", format: "9:16" },
  { id: "store-01", category: "store", format: "9:16" },
  { id: "travel-01", category: "travel", format: "16:9" },
  { id: "restaurant-02", category: "restaurant", format: "9:16" },
  { id: "sport-02", category: "sport", format: "16:9" },
  { id: "wedding-02", category: "wedding", format: "9:16" },
  { id: "product-02", category: "product", format: "9:16" },
  { id: "store-02", category: "store", format: "9:16" },
  { id: "travel-02", category: "travel", format: "9:16" },
];

/* ------------------------------------------------------------------ */
/* Services                                                            */
/* ------------------------------------------------------------------ */

export const services = [
  { key: "reels", icon: "smartphone" },
  { key: "events", icon: "calendar" },
  { key: "editing", icon: "scissors" },
  { key: "grading", icon: "palette" },
  { key: "cinematic", icon: "clapperboard" },
  { key: "ads", icon: "megaphone" },
] as const;

export type ServiceKey = (typeof services)[number]["key"];
export type ServiceIcon = (typeof services)[number]["icon"];

/* ------------------------------------------------------------------ */
/* Pricing                                                             */
/* ------------------------------------------------------------------ */

export type PlanKey = "single" | "pack" | "event";

export const pricingPlans: {
  key: PlanKey;
  /** Starting price in tenge, e.g. 30000. `null` shows "On request". */
  priceFrom: number | null;
  featured?: boolean;
}[] = [
  { key: "single", priceFrom: null },
  { key: "pack", priceFrom: null, featured: true },
  { key: "event", priceFrom: null },
];

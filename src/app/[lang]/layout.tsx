import type { Metadata, Viewport } from "next";
import {
  Anton,
  Cormorant_Garamond,
  Geist,
  Geist_Mono,
  Instrument_Serif,
  Oswald,
} from "next/font/google";
import { notFound } from "next/navigation";
import { isLocale, locales, ogLocales } from "@/i18n/config";
import { getDictionary } from "@/i18n/getDictionary";
import { site } from "@/lib/data";
import "../globals.css";

const geist = Geist({ variable: "--font-geist", subsets: ["latin", "cyrillic", "cyrillic-ext"] });
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin", "cyrillic", "cyrillic-ext"],
});

/*
 * Anton and Instrument Serif only cover Latin, so RU/KZ pages switch the display
 * and serif faces to Oswald / Cormorant Garamond (see globals.css). These two are
 * not preloaded: the browser fetches them only on pages that use Cyrillic.
 */
const anton = Anton({ variable: "--font-anton", weight: "400", subsets: ["latin"] });
const instrument = Instrument_Serif({
  variable: "--font-instrument",
  weight: "400",
  style: ["normal", "italic"],
  subsets: ["latin"],
});
const oswald = Oswald({
  variable: "--font-oswald",
  weight: "700",
  subsets: ["cyrillic", "cyrillic-ext"],
  preload: false,
});
const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  weight: "500",
  style: ["normal", "italic"],
  subsets: ["cyrillic", "cyrillic-ext"],
  preload: false,
});

/**
 * Absolute site address for social previews and canonical links.
 * NEXT_PUBLIC_SITE_URL wins if set; on Vercel the production domain is provided
 * automatically (and follows a custom domain once one is added).
 */
function siteUrl() {
  if (process.env.NEXT_PUBLIC_SITE_URL) return process.env.NEXT_PUBLIC_SITE_URL;
  if (process.env.VERCEL_PROJECT_PRODUCTION_URL) return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`;
  return "http://localhost:3000";
}

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: LayoutProps<"/[lang]">): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const t = await getDictionary(lang);

  return {
    metadataBase: new URL(siteUrl()),
    title: t.meta.title,
    description: t.meta.description,
    alternates: {
      canonical: `/${lang}`,
      languages: Object.fromEntries(locales.map((l) => [l, `/${l}`])),
    },
    openGraph: {
      title: site.brand,
      description: t.meta.description,
      images: ["/images/rahman.png"],
      locale: ogLocales[lang],
      type: "website",
    },
  };
}

export const viewport: Viewport = {
  themeColor: "#080808",
};

export default async function RootLayout({ children, params }: LayoutProps<"/[lang]">) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();

  return (
    <html
      lang={lang}
      className={`${geist.variable} ${geistMono.variable} ${anton.variable} ${instrument.variable} ${oswald.variable} ${cormorant.variable}`}
    >
      <body className="min-h-dvh bg-ink text-paper antialiased">
        {children}
        <div aria-hidden className="grain" />
      </body>
    </html>
  );
}

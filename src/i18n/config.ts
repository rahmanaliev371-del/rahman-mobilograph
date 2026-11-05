export const locales = ["en", "ru", "kk"] as const;
export type Locale = (typeof locales)[number];

/** Used when the visitor's browser language is not one of ours. */
export const defaultLocale: Locale = "en";

/** Remembers the visitor's manual choice (read by src/proxy.ts). */
export const LOCALE_COOKIE = "NEXT_LOCALE";

/** Short labels shown in the language switcher. */
export const localeLabels: Record<Locale, string> = {
  en: "EN",
  ru: "RU",
  kk: "KZ",
};

/** Full names, used for accessibility labels. */
export const localeNames: Record<Locale, string> = {
  en: "English",
  ru: "Русский",
  kk: "Қазақша",
};

export const ogLocales: Record<Locale, string> = {
  en: "en_US",
  ru: "ru_RU",
  kk: "kk_KZ",
};

export const isLocale = (value: string): value is Locale =>
  (locales as readonly string[]).includes(value);

/** Stores the visitor's language choice for a year (browser only). */
export function rememberLocale(locale: Locale) {
  document.cookie = `${LOCALE_COOKIE}=${locale}; path=/; max-age=31536000; samesite=lax`;
}

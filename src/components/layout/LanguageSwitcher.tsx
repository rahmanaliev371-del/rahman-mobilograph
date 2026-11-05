"use client";

import Link from "next/link";
import { localeLabels, localeNames, locales, rememberLocale, type Locale } from "@/i18n/config";

type LanguageSwitcherProps = {
  locale: Locale;
  label: string;
  className?: string;
  onSelect?: () => void;
};

/** EN / RU / KZ segmented control. Keeps the scroll position and remembers the choice. */
export function LanguageSwitcher({ locale, label, className = "", onSelect }: LanguageSwitcherProps) {
  const remember = (next: Locale) => {
    rememberLocale(next);
    onSelect?.();
  };

  return (
    <div
      role="group"
      aria-label={label}
      className={`flex items-center rounded-full border border-white/15 p-1 font-mono text-[11px] tracking-widest ${className}`}
    >
      {locales.map((l) => {
        const active = l === locale;
        return (
          <Link
            key={l}
            href={`/${l}`}
            scroll={false}
            hrefLang={l}
            lang={l}
            aria-label={localeNames[l]}
            aria-current={active ? "true" : undefined}
            onClick={() => remember(l)}
            className={`rounded-full px-2.5 py-1.5 leading-none transition-colors duration-300 ${
              active ? "bg-paper text-ink" : "text-mute hover:text-paper"
            }`}
          >
            {localeLabels[l]}
          </Link>
        );
      })}
    </div>
  );
}

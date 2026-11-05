import { ArrowUp } from "lucide-react";
import { CurrentYear } from "@/components/ui/CurrentYear";
import { FitText } from "@/components/ui/FitText";
import type { Dictionary } from "@/i18n/getDictionary";
import { sectionIds, site } from "@/lib/data";

export function Footer({ t }: { t: Dictionary }) {
  return (
    <footer className="relative overflow-hidden border-t border-line pt-16 pb-8">
      <div className="mx-auto max-w-[1600px] px-5 md:px-10">
        <div className="flex flex-col justify-between gap-10 md:flex-row md:items-start">
          <nav aria-label={t.footer.nav}>
            <ul className="grid grid-cols-2 gap-x-12 gap-y-3 text-sm sm:grid-cols-3">
              {sectionIds.map((id) => (
                <li key={id}>
                  <a href={`#${id}`} className="text-mute transition-colors hover:text-paper">
                    {t.nav.items[id]}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <a
            href="#top"
            className="group inline-flex items-center gap-3 self-start text-sm text-mute transition-colors hover:text-paper"
          >
            {t.footer.backToTop}
            <span className="flex size-10 items-center justify-center rounded-full border border-white/15 transition-colors duration-500 group-hover:border-paper group-hover:bg-paper group-hover:text-ink">
              <ArrowUp size={16} className="transition-transform duration-500 group-hover:-translate-y-0.5" />
            </span>
          </a>
        </div>

        <div aria-hidden className="mt-16 select-none md:mt-24">
          <FitText text="Mobilograph" className="text-outline font-brand leading-[0.8] uppercase" />
        </div>

        <div className="mt-8 flex flex-col justify-between gap-3 border-t border-line pt-6 font-mono text-[11px] tracking-widest text-dim uppercase sm:flex-row">
          <span>
            © <CurrentYear /> {site.brand}
          </span>
          <span>
            {t.location.city}, {t.location.country}
          </span>
        </div>
      </div>
    </footer>
  );
}

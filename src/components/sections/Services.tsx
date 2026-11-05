import {
  ArrowUpRight,
  CalendarHeart,
  Clapperboard,
  Megaphone,
  Palette,
  Scissors,
  Smartphone,
  type LucideIcon,
} from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { Dictionary } from "@/i18n/getDictionary";
import { services, type ServiceIcon } from "@/lib/data";

const icons: Record<ServiceIcon, LucideIcon> = {
  smartphone: Smartphone,
  calendar: CalendarHeart,
  scissors: Scissors,
  palette: Palette,
  clapperboard: Clapperboard,
  megaphone: Megaphone,
};

export function Services({ t }: { t: Dictionary }) {
  return (
    <section id="services" className="relative border-t border-line py-28 md:py-40">
      <div className="mx-auto max-w-[1600px] px-5 md:px-10">
        <SectionHeading
          index="03"
          label={t.services.label}
          title={t.services.title}
          accent={t.services.accent}
          aside={<p>{t.services.aside}</p>}
        />

        <ul className="mt-16 border-b border-line md:mt-24">
          {services.map((service, i) => {
            const Icon = icons[service.icon];
            const copy = t.services.items[service.key];
            return (
              <Reveal as="li" key={service.key} delay={i * 0.05} y={20}>
                <a
                  href="#contact"
                  className="group relative grid grid-cols-[1fr_auto] items-center gap-x-5 gap-y-4 overflow-hidden border-t border-line px-1 py-7 md:grid-cols-12 md:gap-x-8 md:px-4 md:py-9"
                >
                  {/* Hover fill */}
                  <span
                    aria-hidden
                    className="absolute inset-0 origin-bottom scale-y-0 bg-paper transition-transform duration-700 ease-cinema group-hover:scale-y-100"
                  />

                  <span className="relative font-mono text-xs text-dim transition-colors duration-500 group-hover:text-ink/50 col-start-1 row-start-1 md:col-span-1 md:row-start-auto">
                    0{i + 1}
                  </span>

                  <h3 className="relative font-display col-span-2 text-[clamp(1.9rem,4.6vw,4.25rem)] leading-[0.95] uppercase [overflow-wrap:anywhere] transition-[color,transform] duration-700 ease-cinema group-hover:translate-x-2 group-hover:text-ink md:col-span-6 md:row-start-auto">
                    {copy.title}
                  </h3>

                  <span className="relative col-start-2 row-start-1 flex size-11 items-center justify-center rounded-full border border-white/15 transition-all duration-500 group-hover:border-ink/20 group-hover:text-ink md:order-last md:col-span-1 md:col-start-auto md:row-start-auto md:justify-self-end">
                    <Icon size={18} className="transition-opacity duration-300 group-hover:opacity-0" />
                    <ArrowUpRight
                      size={18}
                      className="absolute opacity-0 transition-all duration-500 group-hover:rotate-45 group-hover:opacity-100"
                    />
                  </span>

                  <p className="relative col-span-2 max-w-md text-sm leading-relaxed text-mute transition-colors duration-500 group-hover:text-ink/70 md:col-span-4 md:col-start-8">
                    {copy.description}
                  </p>
                </a>
              </Reveal>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

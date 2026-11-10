import { ArrowUpRight, Check } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { Dictionary } from "@/i18n/getDictionary";
import { pricingPlans, whatsappUrl } from "@/lib/data";

/** 30000 → "30 000" (thin-space grouping, same in every language). */
const formatTenge = (amount: number) => new Intl.NumberFormat("ru-RU").format(amount);

export function Pricing({ t }: { t: Dictionary }) {
  const { pricing } = t;

  return (
    <section id="pricing" className="relative border-t border-line py-28 md:py-40">
      <div className="mx-auto max-w-[1600px] px-5 md:px-10">
        <SectionHeading
          index="05"
          label={pricing.label}
          title={pricing.title}
          accent={pricing.accent}
          aside={<p>{pricing.aside}</p>}
        />

        <div className="mt-16 grid gap-4 md:mt-24 lg:grid-cols-3">
          {pricingPlans.map((plan, i) => {
            const copy = pricing.plans[plan.key];
            const featured = plan.featured ?? false;
            const price =
              plan.priceFrom === null
                ? null
                : pricing.priceFrom.replace("{price}", formatTenge(plan.priceFrom));

            return (
              <Reveal key={plan.key} delay={i * 0.1} className="h-full">
                <article
                  className={`group relative flex h-full flex-col overflow-hidden rounded-sm border p-7 transition-[transform,border-color] duration-700 ease-cinema hover:-translate-y-1.5 md:p-9 ${
                    featured ? "border-paper bg-paper text-ink" : "border-line bg-ink-soft hover:border-white/30"
                  }`}
                >
                  <div className="flex items-center justify-between gap-4">
                    <span className={`label ${featured ? "text-ink/50" : ""}`}>
                      {pricing.package} 0{i + 1}
                    </span>
                    <span className={`label ${featured ? "text-ink/50" : ""}`}>{copy.tag}</span>
                  </div>

                  <h3 className="mt-10 font-display text-[clamp(2.5rem,4.2vw,3.75rem)] leading-[0.95] uppercase">
                    {copy.name}
                  </h3>
                  <p className={`mt-4 text-sm leading-relaxed ${featured ? "text-ink/65" : "text-mute"}`}>
                    {copy.summary}
                  </p>

                  <ul className={`mt-8 flex-1 space-y-3.5 border-t pt-8 ${featured ? "border-ink/10" : "border-line"}`}>
                    {copy.includes.map((item) => (
                      <li key={item} className="flex items-start gap-3 text-sm">
                        <Check size={16} className={`mt-0.5 shrink-0 ${featured ? "text-ink/60" : "text-mute"}`} />
                        {item}
                      </li>
                    ))}
                  </ul>

                  {/* Price sits between what's included and the call to action */}
                  <div className={`mt-10 border-t pt-6 ${featured ? "border-ink/10" : "border-line"}`}>
                    <p className="font-serif text-4xl italic">{price ?? pricing.onRequest}</p>
                    {price === null ? (
                      <p className={`mt-1 text-xs ${featured ? "text-ink/50" : "text-dim"}`}>{pricing.quoted}</p>
                    ) : null}
                  </div>

                  <a
                    href={whatsappUrl(t.contact.whatsappMessage)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`mt-6 inline-flex items-center justify-between gap-4 rounded-full px-6 py-4 text-sm font-medium transition-colors duration-500 ${
                      featured
                        ? "bg-ink text-paper hover:bg-ink-raised"
                        : "border border-white/15 hover:border-paper hover:bg-paper hover:text-ink"
                    }`}
                  >
                    {pricing.cta}
                    <ArrowUpRight size={16} className="transition-transform duration-500 group-hover:rotate-45" />
                  </a>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

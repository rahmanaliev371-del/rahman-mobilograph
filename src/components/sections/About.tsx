import { Reveal } from "@/components/ui/Reveal";
import { ScrollRevealText } from "@/components/ui/ScrollRevealText";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { Dictionary } from "@/i18n/getDictionary";
import { site } from "@/lib/data";

export function About({ t }: { t: Dictionary }) {
  const { about } = t;
  const facts = [
    { label: about.facts.name, value: t.name },
    { label: about.facts.basedIn, value: `${t.location.city}, ${t.location.country}` },
    { label: about.facts.shootsOn, value: about.facts.shootsOnValue },
    { label: about.facts.formats, value: about.facts.formatsValue },
  ];

  return (
    <section id="about" className="relative mx-auto max-w-[1600px] px-5 py-28 md:px-10 md:py-40">
      <SectionHeading index="01" label={about.label} title={about.title} accent={about.accent} />

      <ScrollRevealText
        text={about.statement}
        className="mt-16 max-w-6xl text-[clamp(1.6rem,3.6vw,3.4rem)] leading-[1.15] font-light tracking-tight md:mt-24"
      />

      <div className="mt-20 grid gap-16 md:mt-32 md:grid-cols-12">
        <Reveal className="md:col-span-5">
          <dl className="divide-y divide-line border-y border-line">
            {facts.map((fact) => (
              <div key={fact.label} className="flex items-baseline justify-between gap-6 py-4">
                <dt className="label shrink-0">{fact.label}</dt>
                <dd className="text-right text-sm md:text-base">{fact.value}</dd>
              </div>
            ))}
            <div className="flex items-baseline justify-between gap-6 py-4">
              <dt className="label">{about.facts.instagram}</dt>
              <dd>
                <a
                  href={site.instagram.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm underline decoration-white/25 underline-offset-4 transition-colors hover:decoration-paper md:text-base"
                >
                  {site.instagram.handle}
                </a>
              </dd>
            </div>
          </dl>
        </Reveal>

        <ol className="grid gap-10 sm:grid-cols-3 md:col-span-7 md:gap-8">
          {about.principles.map((p, i) => (
            <Reveal as="li" key={p.title} delay={i * 0.12} className="border-t border-line pt-5">
              <span className="label">0{i + 1}</span>
              <h3 className="mt-4 font-serif text-3xl leading-tight italic">{p.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-mute">{p.text}</p>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}

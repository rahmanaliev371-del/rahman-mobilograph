import { ScrollRevealText } from "@/components/ui/ScrollRevealText";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { Dictionary } from "@/i18n/getDictionary";

export function About({ t }: { t: Dictionary }) {
  const { about } = t;

  return (
    <section id="about" className="relative mx-auto max-w-[1600px] px-5 py-28 md:px-10 md:py-40">
      <SectionHeading index="01" label={about.label} title={about.title} accent={about.accent} />

      <ScrollRevealText
        text={about.statement}
        className="mt-16 max-w-6xl text-[clamp(1.6rem,3.6vw,3.4rem)] leading-[1.15] font-light tracking-tight md:mt-24"
      />
    </section>
  );
}

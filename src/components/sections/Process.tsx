"use client";

import { motion, useScroll, useSpring } from "framer-motion";
import { useRef } from "react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { Dictionary } from "@/i18n/getDictionary";
import { EASE } from "@/lib/motion";

export function Process({ t }: { t: Dictionary }) {
  const listRef = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({ target: listRef, offset: ["start 70%", "end 60%"] });
  const line = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });

  return (
    <section id="process" className="relative border-t border-line py-28 md:py-40">
      <div className="mx-auto grid max-w-[1600px] gap-16 px-5 md:grid-cols-12 md:px-10">
        <div className="md:col-span-5">
          <div className="md:sticky md:top-32">
            <SectionHeading
              index="04"
              label={t.process.label}
              title={t.process.title}
              accent={t.process.accent}
              stacked
            />
            <p className="mt-8 max-w-sm text-sm leading-relaxed text-mute">
              {t.process.text}
            </p>
          </div>
        </div>

        <ol ref={listRef} className="relative md:col-span-7 md:col-start-6">
          {/* Track + progress */}
          <span aria-hidden className="absolute top-2 bottom-2 left-[11px] w-px bg-line md:left-[15px]" />
          <motion.span
            aria-hidden
            style={{ scaleY: line }}
            className="absolute top-2 bottom-2 left-[11px] w-px origin-top bg-paper md:left-[15px]"
          />

          {t.process.steps.map((step, i) => (
            <motion.li
              key={step.title}
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-15% 0px" }}
              transition={{ duration: 0.9, ease: EASE }}
              className="group relative grid grid-cols-[24px_1fr] gap-6 pb-14 last:pb-0 md:grid-cols-[32px_1fr] md:gap-10 md:pb-20"
            >
              <span className="relative z-10 mt-2 flex size-6 items-center justify-center rounded-full border border-white/25 bg-ink transition-colors duration-500 group-hover:border-paper md:size-8">
                <span className="size-1.5 rounded-full bg-paper transition-transform duration-500 group-hover:scale-150" />
              </span>
              <div>
                <div className="flex items-baseline gap-5">
                  <span className="text-outline font-display text-5xl leading-none md:text-7xl">
                    0{i + 1}
                  </span>
                  <h3 className="font-display text-3xl leading-none uppercase md:text-5xl">{step.title}</h3>
                </div>
                <p className="mt-5 max-w-lg leading-relaxed text-mute">{step.description}</p>
              </div>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}

"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { maskUp, stagger } from "@/lib/motion";

type SectionHeadingProps = {
  index: string;
  label: string;
  /** Main title, set in the display face. */
  title: string;
  /** Optional words after the title, set in serif italic. */
  accent?: string;
  aside?: ReactNode;
  /** Keep title and aside in one column (for narrow layouts). */
  stacked?: boolean;
  className?: string;
};

/**
 * Editorial section header: "02 — Work" index line, a large display title
 * that slides up from a mask, and an optional aside paragraph.
 */
export function SectionHeading({
  index,
  label,
  title,
  accent,
  aside,
  stacked = false,
  className = "",
}: SectionHeadingProps) {
  return (
    <motion.header
      className={`grid gap-8 ${stacked ? "" : "md:grid-cols-12 md:items-end"} ${className}`}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-10% 0px" }}
      variants={stagger(0.1)}
    >
      <div className={stacked ? "" : "md:col-span-8"}>
        <div className="mb-6 flex items-center gap-4">
          <span className="label text-paper">{index}</span>
          <span className="h-px w-10 bg-line" />
          <span className="label">{label}</span>
        </div>
        <h2 className="-mt-[0.18em] overflow-hidden pt-[0.18em] pb-2 font-display text-[clamp(3rem,9vw,8.5rem)] leading-[0.88] uppercase tracking-tight [&_em]:font-serif [&_em]:font-normal [&_em]:normal-case [&_em]:italic [&_em]:tracking-normal [&_em]:text-mute">
          <motion.span variants={maskUp} className="block">
            {title}
            {accent ? <> <em>{accent}</em></> : null}
          </motion.span>
        </h2>
      </div>
      {aside ? (
        <motion.div
          variants={{ hidden: { opacity: 0 }, show: { opacity: 1, transition: { duration: 1 } } }}
          className="max-w-sm text-sm leading-relaxed text-mute md:col-span-4 md:justify-self-end"
        >
          {aside}
        </motion.div>
      ) : null}
    </motion.header>
  );
}

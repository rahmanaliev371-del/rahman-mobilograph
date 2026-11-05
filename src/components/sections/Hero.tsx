"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import Image from "next/image";
import { useRef } from "react";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { InstagramIcon } from "@/components/ui/SocialIcons";
import { Timecode } from "@/components/ui/Timecode";
import { useFitText } from "@/hooks/useFitText";
import { useSkipIntro } from "@/hooks/useSkipIntro";
import type { Dictionary } from "@/i18n/getDictionary";
import { site } from "@/lib/data";
import { EASE } from "@/lib/motion";

const INTRO = 0.9; // seconds before the title starts revealing (after the letterbox opens)

export function Hero({ t }: { t: Dictionary }) {
  const skip = useSkipIntro();
  const sectionRef = useRef<HTMLElement>(null);
  const { containerRef, textRef } = useFitText<HTMLHeadingElement, HTMLSpanElement>();

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end start"] });
  const photoY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const photoScale = useTransform(scrollYProgress, [0, 1], [1, 1.08]);
  const titleY = useTransform(scrollYProgress, [0, 1], ["0%", "-30%"]);
  const fade = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section
      id="top"
      ref={sectionRef}
      aria-label="Introduction"
      className="relative flex min-h-[100svh] flex-col overflow-hidden"
    >
      {/* Ambient light */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute top-1/4 left-1/2 size-[70vmax] -translate-x-1/2 animate-drift rounded-full bg-[radial-gradient(circle,rgb(255_255_255/0.07)_0%,transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,#080808_95%)]" />
      </div>

      {/* Letterbox intro: two bars that open like a shutter */}
      <motion.div
        aria-hidden
        initial={skip ? false : { scaleY: 1 }}
        animate={{ scaleY: 0 }}
        transition={{ duration: 1.3, ease: EASE, delay: 0.15 }}
        className="absolute inset-x-0 top-0 z-30 h-1/2 origin-top bg-ink"
      />
      <motion.div
        aria-hidden
        initial={skip ? false : { scaleY: 1 }}
        animate={{ scaleY: 0 }}
        transition={{ duration: 1.3, ease: EASE, delay: 0.15 }}
        className="absolute inset-x-0 bottom-0 z-30 h-1/2 origin-bottom bg-ink"
      />

      <motion.div
        style={{ opacity: fade }}
        className="relative mx-auto flex w-full max-w-[1600px] flex-1 flex-col px-5 pt-20 pb-6 md:px-10 md:pt-28 md:pb-10"
      >
        {/* Camera HUD */}
        <motion.div
          initial={skip ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: INTRO + 0.6 }}
          className="label relative z-20 flex items-center justify-between gap-4"
        >
          <span className="flex items-center gap-2 text-paper">
            <span className="size-2 animate-blink rounded-full bg-rec" />
            REC <Timecode className="text-mute" />
          </span>
          <span className="hidden md:inline">{site.coordinates}</span>
          <span>9:16 / 16:9</span>
        </motion.div>

        {/*
          Portrait in a viewfinder.
          Mobile: centred above the title. Desktop: on the right, clear of "RAHMAN",
          so the face is never covered — only "MOBILOGRAPH" crosses the lower part.
          Its width is capped by the viewport height so it never reaches the bottom row.
        */}
        <motion.div
          initial={skip ? false : { opacity: 0, scale: 1.08 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.8, ease: EASE, delay: 0.35 }}
          className="absolute top-28 bottom-[40%] left-1/2 aspect-[9/16] max-w-[70vw] -translate-x-1/2 md:top-44 md:bottom-auto md:left-auto md:right-10 md:w-[min(30vw,calc((100svh-20rem)*9/16))] md:max-w-none md:translate-x-0"
        >
          <div className="relative size-full overflow-hidden">
            <motion.div style={{ y: photoY, scale: photoScale }} className="absolute inset-0">
              <Image
                src="/images/rahman.jpg"
                alt={t.hero.portraitAlt}
                fill
                preload
                sizes="(min-width: 768px) 30vw, 70vw"
                className="object-cover object-[50%_40%] brightness-[0.95] contrast-[1.05] grayscale-[0.6]"
              />
            </motion.div>
            <div className="absolute inset-0 bg-gradient-to-b from-ink/15 via-transparent to-ink/60" />
          </div>
          <div className="viewfinder absolute -inset-3 md:-inset-4" />
          <span className="label absolute -top-8 left-0 hidden md:block">
            {t.location.city}, {t.location.country}
          </span>
          <span className="label absolute -top-8 right-0 hidden md:block">{t.hero.portraitLabel}</span>
        </motion.div>

        {/* Spacer; on desktop it holds the tagline in the empty space left of the portrait */}
        <div className="flex min-h-[46svh] flex-1 items-end pb-[3vw] md:min-h-[18vh] md:pt-10">
          <motion.p
            initial={skip ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: EASE, delay: INTRO + 0.5 }}
            className="hidden max-w-[22ch] font-serif text-[clamp(1.4rem,2.6vw,2.75rem)] leading-tight italic md:block"
          >
            {t.hero.tagline}
          </motion.p>
        </div>

        {/* Title — sits over the portrait and inverts against it */}
        <motion.h1
          ref={containerRef}
          style={{ y: titleY }}
          className="relative z-10 font-brand leading-[0.8] uppercase mix-blend-difference"
        >
          <span className="sr-only">
            {site.brand} — {t.hero.role}, {t.location.city}
          </span>
          <span aria-hidden className="block">
            <span className="block w-max overflow-hidden">
              <motion.span
                initial={skip ? false : { y: "105%" }}
                animate={{ y: "0%" }}
                transition={{ duration: 1.2, ease: EASE, delay: INTRO }}
                className="block text-[length:var(--fit,16vw)]"
              >
                Rahman
              </motion.span>
            </span>
            <span className="block overflow-hidden">
              <motion.span
                ref={textRef}
                initial={skip ? false : { y: "105%" }}
                animate={{ y: "0%" }}
                transition={{ duration: 1.2, ease: EASE, delay: INTRO + 0.1 }}
                className="block w-max text-[length:var(--fit,16vw)] whitespace-nowrap"
              >
                Mobilograph
              </motion.span>
            </span>
          </span>
        </motion.h1>

        {/* Intro + actions */}
        <motion.div
          initial={skip ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: EASE, delay: INTRO + 0.7 }}
          className="relative z-20 mt-6 grid gap-6 md:mt-8 md:grid-cols-12 md:items-end"
        >
          <p className="max-w-md text-sm leading-relaxed text-mute md:col-span-5 md:text-base">
            <span className="font-serif text-lg text-paper italic md:hidden">
              {t.hero.tagline}{" "}
            </span>
            {t.hero.intro}
          </p>
          <div className="flex flex-wrap gap-3 md:col-span-5">
            <ButtonLink href="#work" icon={<ArrowUpRight size={16} />}>
              {t.hero.viewWork}
            </ButtonLink>
            <ButtonLink
              href={site.instagram.url}
              variant="ghost"
              external
              icon={<InstagramIcon size={16} />}
            >
              {site.instagram.handle}
            </ButtonLink>
          </div>
          <a
            href="#about"
            className="label group hidden items-center gap-3 justify-self-end transition-colors hover:text-paper md:col-span-2 md:flex"
          >
            {t.hero.scroll}
            <span className="relative flex h-10 w-6 justify-center overflow-hidden rounded-full border border-white/20">
              <ArrowDown size={12} className="mt-2 animate-bounce" />
            </span>
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
}

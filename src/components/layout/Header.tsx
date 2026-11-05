"use client";

import { AnimatePresence, motion, useScroll, useSpring } from "framer-motion";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { LanguageSwitcher } from "@/components/layout/LanguageSwitcher";
import { InstagramIcon, TikTokIcon, WhatsAppIcon } from "@/components/ui/SocialIcons";
import { useActiveSection } from "@/hooks/useActiveSection";
import { useSkipIntro } from "@/hooks/useSkipIntro";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/getDictionary";
import { sectionIds, site, whatsappUrl } from "@/lib/data";
import { EASE } from "@/lib/motion";

export function Header({ t, locale }: { t: Dictionary; locale: Locale }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const skip = useSkipIntro();
  const active = useActiveSection(sectionIds);
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 30, mass: 0.3 });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock page scroll and allow closing with Escape while the mobile menu is open.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.documentElement.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.documentElement.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <>
      <motion.header
        initial={skip ? false : { y: -24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, ease: EASE, delay: 1.2 }}
        className={`fixed inset-x-0 top-0 z-50 transition-[background-color,backdrop-filter,border-color] duration-500 ${
          scrolled && !open
            ? "border-b border-line bg-ink/70 backdrop-blur-xl"
            : "border-b border-transparent"
        }`}
      >
        <div className="mx-auto flex h-16 max-w-[1600px] items-center justify-between gap-4 px-5 md:h-20 md:px-10">
          <a href="#top" className="group flex items-baseline gap-2" onClick={() => setOpen(false)}>
            <span className="font-brand text-xl tracking-wide md:text-2xl">RAHMAN</span>
            <span className="label hidden transition-colors duration-500 group-hover:text-paper min-[400px]:inline">
              Mobilograph
            </span>
          </a>

          <nav aria-label={t.nav.mainNav} className="hidden xl:block">
            <ul className="flex items-center gap-1">
              {sectionIds.map((id, i) => {
                const isActive = active === id;
                return (
                  <li key={id}>
                    <a
                      href={`#${id}`}
                      aria-current={isActive ? "true" : undefined}
                      className={`group relative flex items-center gap-1.5 px-3 py-2 text-sm whitespace-nowrap transition-colors duration-300 ${
                        isActive ? "text-paper" : "text-mute hover:text-paper"
                      }`}
                    >
                      <span className="font-mono text-[10px] text-dim">0{i + 1}</span>
                      {t.nav.items[id]}
                      {isActive ? (
                        <motion.span
                          layoutId="nav-dot"
                          className="absolute -bottom-0.5 left-1/2 size-1 -translate-x-1/2 rounded-full bg-rec"
                          transition={{ type: "spring", stiffness: 400, damping: 32 }}
                        />
                      ) : null}
                    </a>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="flex items-center gap-2 md:gap-3">
            <LanguageSwitcher locale={locale} label={t.nav.language} />
            <a
              href={whatsappUrl(t.contact.whatsappMessage)}
              target="_blank"
              rel="noopener noreferrer"
              className="group hidden items-center gap-2 rounded-full border border-white/15 px-5 py-2.5 text-sm whitespace-nowrap transition-colors duration-500 hover:border-paper hover:bg-paper hover:text-ink md:inline-flex"
            >
              <WhatsAppIcon size={16} />
              {t.nav.bookShoot}
              <ArrowUpRight
                size={16}
                className="transition-transform duration-500 group-hover:rotate-45"
              />
            </a>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? t.nav.closeMenu : t.nav.openMenu}
              className="relative flex size-11 shrink-0 items-center justify-center rounded-full border border-white/15 xl:hidden"
            >
              {open ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>

        <motion.div
          aria-hidden
          style={{ scaleX: progress }}
          className="absolute inset-x-0 bottom-0 h-px origin-left bg-paper/60"
        />
      </motion.header>

      <AnimatePresence>
        {open ? (
          <motion.div
            id="mobile-menu"
            key="menu"
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.7, ease: EASE }}
            className="fixed inset-0 z-40 flex flex-col justify-between overflow-y-auto bg-ink px-5 pt-24 pb-10 xl:hidden"
          >
            <nav aria-label={t.nav.mainNav}>
              <motion.ul
                initial="hidden"
                animate="show"
                variants={{ show: { transition: { staggerChildren: 0.06, delayChildren: 0.25 } } }}
                className="space-y-1"
              >
                {sectionIds.map((id, i) => (
                  <li key={id} className="-my-[0.1em] overflow-hidden py-[0.1em]">
                    <motion.a
                      href={`#${id}`}
                      onClick={() => setOpen(false)}
                      variants={{
                        hidden: { y: "100%" },
                        show: { y: "0%", transition: { duration: 0.8, ease: EASE } },
                      }}
                      className={`flex items-baseline gap-4 py-1 font-display text-[clamp(2.5rem,12vw,5rem)] leading-none uppercase ${
                        active === id ? "text-paper" : "text-paper/45"
                      }`}
                    >
                      <span className="font-mono text-xs text-dim">0{i + 1}</span>
                      {t.nav.items[id]}
                    </motion.a>
                  </li>
                ))}
              </motion.ul>
            </nav>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, transition: { delay: 0.6 } }}
              className="mt-10 space-y-6"
            >
              <a
                href={whatsappUrl(t.contact.whatsappMessage)}
                target="_blank"
                rel="noopener noreferrer"
                className="flex w-full items-center justify-between rounded-full bg-paper px-6 py-4 text-sm font-medium text-ink"
              >
                <span className="flex items-center gap-3">
                  <WhatsAppIcon size={18} />
                  {t.nav.bookShoot}
                </span>
                <ArrowUpRight size={18} />
              </a>

              <div className="flex flex-wrap items-end justify-between gap-6 border-t border-line pt-6">
                <div>
                  <p className="label">{t.nav.basedIn}</p>
                  <p className="mt-1 text-sm">
                    {t.location.city}, {t.location.country}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  {[
                    { href: site.instagram.url, label: "Instagram", Icon: InstagramIcon },
                    { href: site.tiktok.url, label: "TikTok", Icon: TikTokIcon },
                  ].map(({ href, label, Icon }) => (
                    <a
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={label}
                      className="flex size-11 items-center justify-center rounded-full border border-white/15"
                    >
                      <Icon size={18} />
                    </a>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}

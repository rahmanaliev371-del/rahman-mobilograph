"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, MapPin } from "lucide-react";
import type { ReactNode } from "react";
import { InstagramIcon, TikTokIcon, WhatsAppIcon } from "@/components/ui/SocialIcons";
import type { Dictionary } from "@/i18n/getDictionary";
import { site, whatsappUrl } from "@/lib/data";
import { EASE, maskUp, stagger } from "@/lib/motion";

export function Contact({ t }: { t: Dictionary }) {
  const channels = [
    {
      key: "whatsapp",
      href: whatsappUrl(t.contact.whatsappMessage),
      label: t.contact.channels.whatsapp,
      value: site.whatsapp.display,
      icon: WhatsAppIcon,
    },
    {
      key: "instagram",
      href: site.instagram.url,
      label: t.contact.channels.instagram,
      value: site.instagram.handle,
      icon: InstagramIcon,
    },
    {
      key: "tiktok",
      href: site.tiktok.url,
      label: t.contact.channels.tiktok,
      value: site.tiktok.handle,
      icon: TikTokIcon,
    },
  ];

  return (
    <section id="contact" className="relative overflow-hidden border-t border-line py-28 md:py-44">
      {/* Soft spotlight */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-1/3 left-1/2 size-[80vmax] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgb(255_255_255/0.06)_0%,transparent_55%)]"
      />

      <div className="relative mx-auto max-w-[1600px] px-5 md:px-10">
        <div className="mb-10 flex items-center gap-4">
          <span className="label text-paper">06</span>
          <span className="h-px w-10 bg-line" />
          <span className="label">{t.contact.label}</span>
        </div>

        {/* Headline + text on the left, channels on the right — on one level from tablet up */}
        <div className="grid gap-14 md:grid-cols-12 md:items-center md:gap-10">
          <div className="md:col-span-6">
            <motion.h2
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-10% 0px" }}
              variants={stagger(0.12)}
              className="font-display text-[clamp(3.25rem,6.5vw,8rem)] leading-[0.86] uppercase"
            >
              {t.contact.headline.map((line, i) => (
                // Masks are padded so italic overhangs, descenders and accents (Й, Ё) are not clipped.
                <span key={i} className="-mx-[0.08em] -mt-[0.18em] block overflow-hidden px-[0.08em] pt-[0.18em] pb-[0.06em] [&:nth-child(2)]:-mb-[0.1em] [&:nth-child(2)]:pb-[0.16em]">
                  <motion.span variants={maskUp} className="block">
                    {i === 1 ? (
                      <span className="font-serif font-normal normal-case italic text-mute">{line}</span>
                    ) : (
                      line
                    )}
                  </motion.span>
                </span>
              ))}
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, ease: EASE }}
              className="mt-10 max-w-md leading-relaxed text-mute"
            >
              {t.contact.text}
            </motion.p>
          </div>

          <ul className="md:col-span-6 md:justify-self-end">
            {channels.map((channel, i) => (
              <motion.li
                key={channel.key}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.9, ease: EASE, delay: 0.15 + i * 0.1 }}
                className="border-b border-line py-5 first:pt-0 last:border-b-0 last:pb-0 md:py-7"
              >
                <ChannelLink
                  href={channel.href}
                  label={channel.label}
                  value={channel.value}
                  icon={channel.icon}
                />
              </motion.li>
            ))}
          </ul>
        </div>

        <div className="mt-20 flex flex-wrap items-center gap-x-10 gap-y-4 border-t border-line pt-8 text-sm text-mute">
          <span className="flex items-center gap-2">
            <MapPin size={15} />
            {t.location.city}, {t.location.country}
          </span>
          {channels.map(({ key, href, value, icon: Icon }) => (
            <a
              key={key}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 transition-colors hover:text-paper"
            >
              <Icon size={15} />
              {value}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

type ChannelLinkProps = {
  href: string;
  label: string;
  value: string;
  icon: (props: { size?: number; className?: string }) => ReactNode;
};

/** Big contact row: round icon, small label, and the handle / number in display type. */
function ChannelLink({ href, label, value, icon: Icon }: ChannelLinkProps) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className="group flex items-center gap-5 md:gap-8">
      <span className="relative flex size-14 shrink-0 items-center justify-center overflow-hidden rounded-full border border-white/20 md:size-20">
        <span className="absolute inset-0 scale-0 rounded-full bg-paper transition-transform duration-700 ease-cinema group-hover:scale-100" />
        <Icon size={24} className="relative transition-colors duration-500 group-hover:text-ink" />
      </span>
      <span className="min-w-0">
        <span className="label block">{label}</span>
        <span className="relative mt-1 flex items-center gap-2 pb-1 font-brand text-[clamp(1.6rem,3.4vw,3.5rem)] leading-tight whitespace-nowrap">
          {value}
          <ArrowUpRight className="size-[0.6em] shrink-0 transition-transform duration-500 ease-cinema group-hover:translate-x-1 group-hover:-translate-y-1" />
          <span className="absolute -bottom-1 left-0 h-px w-full origin-right scale-x-0 bg-paper transition-transform duration-700 ease-cinema group-hover:origin-left group-hover:scale-x-100" />
        </span>
      </span>
    </a>
  );
}

"use client";

import { AnimatePresence, LayoutGroup, motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useMemo, useState } from "react";
import { ProjectCard } from "@/components/portfolio/ProjectCard";
import { InstagramIcon } from "@/components/ui/SocialIcons";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/getDictionary";
import { categories, projects, site, type Category, type Project } from "@/lib/data";
import { EASE } from "@/lib/motion";

type Filter = "all" | Category;
const filters: Filter[] = ["all", ...categories];

/** Running number of a project inside its category: restaurant-01, restaurant-02… */
const numberInCategory = (project: Project) =>
  String(projects.filter((p) => p.category === project.category).indexOf(project) + 1).padStart(2, "0");

export function Portfolio({ t, locale }: { t: Dictionary; locale: Locale }) {
  const { portfolio } = t;
  const [active, setActive] = useState<Filter>("all");

  const visible = useMemo(
    () => (active === "all" ? projects : projects.filter((p) => p.category === active)),
    [active],
  );

  const countFor = (filter: Filter) =>
    filter === "all" ? projects.length : projects.filter((p) => p.category === filter).length;

  const titleFor = (project: Project) =>
    project.title?.[locale] ?? `${portfolio.itemNames[project.category]} ${numberInCategory(project)}`;

  return (
    <section id="work" className="relative border-t border-line py-28 md:py-40">
      <div className="mx-auto max-w-[1600px] px-5 md:px-10">
        <SectionHeading
          index="02"
          label={portfolio.label}
          title={portfolio.title}
          accent={portfolio.accent}
          aside={<p>{portfolio.aside}</p>}
        />

        {/* Filters */}
        <LayoutGroup id="portfolio-filters">
          <div
            role="tablist"
            aria-label={portfolio.filterLabel}
            className="-mx-5 mt-14 flex gap-2 overflow-x-auto px-5 pb-2 [scrollbar-width:none] md:mx-0 md:mt-20 md:flex-wrap md:px-0 [&::-webkit-scrollbar]:hidden"
          >
            {filters.map((filter) => {
              const isActive = filter === active;
              return (
                <button
                  key={filter}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  aria-controls="portfolio-grid"
                  onClick={() => setActive(filter)}
                  className={`relative shrink-0 rounded-full border px-5 py-2.5 text-sm whitespace-nowrap transition-colors duration-500 ${
                    isActive
                      ? "border-paper text-ink"
                      : "border-white/15 text-mute hover:border-white/40 hover:text-paper"
                  }`}
                >
                  {isActive ? (
                    <motion.span
                      layoutId="filter-pill"
                      className="absolute inset-0 rounded-full bg-paper"
                      transition={{ type: "spring", stiffness: 380, damping: 34 }}
                    />
                  ) : null}
                  <span className="relative">
                    {filter === "all" ? portfolio.all : portfolio.categories[filter]}
                    <sup className="ml-1 font-mono text-[9px] opacity-60">{countFor(filter)}</sup>
                  </span>
                </button>
              );
            })}
          </div>
        </LayoutGroup>

        {/* Grid */}
        <motion.div
          id="portfolio-grid"
          role="tabpanel"
          layout
          className="mt-8 grid grid-cols-2 gap-3 md:mt-10 md:grid-cols-3 md:gap-4 xl:grid-cols-4"
        >
          <AnimatePresence mode="popLayout" initial={false}>
            {visible.map((project, i) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.94, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.94 }}
                transition={{ duration: 0.6, ease: EASE, delay: i * 0.03 }}
              >
                <ProjectCard
                  project={project}
                  index={projects.indexOf(project)}
                  title={titleFor(project)}
                  categoryLabel={portfolio.categories[project.category]}
                  comingSoonLabel={portfolio.comingSoon}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        <div className="mt-14 flex flex-col items-start justify-between gap-6 border-t border-line pt-8 sm:flex-row sm:items-center">
          <p className="max-w-md text-sm text-mute">{portfolio.instagramNote}</p>
          <a
            href={site.instagram.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-3 text-sm"
          >
            <InstagramIcon size={18} />
            <span className="relative">
              {portfolio.moreOnInstagram}
              <span className="absolute -bottom-1 left-0 h-px w-full origin-right scale-x-0 bg-paper transition-transform duration-500 ease-cinema group-hover:origin-left group-hover:scale-x-100" />
            </span>
            <ArrowUpRight size={16} className="transition-transform duration-500 group-hover:rotate-45" />
          </a>
        </div>
      </div>
    </section>
  );
}

"use client";

import { Play } from "lucide-react";
import { useRef } from "react";
import { categoryGrades, type Project } from "@/lib/data";

/**
 * A portfolio tile. Shows a graded placeholder until `project.video` or
 * `project.poster` is provided; real videos play muted on hover.
 */
type ProjectCardProps = {
  project: Project;
  index: number;
  /** Already-localized texts. */
  title: string;
  categoryLabel: string;
  comingSoonLabel: string;
};

export function ProjectCard({ project, index, title, categoryLabel, comingSoonLabel }: ProjectCardProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const grade = categoryGrades[project.category];
  const isVertical = project.format === "9:16";
  const hasMedia = Boolean(project.video || project.poster);

  const play = () => void videoRef.current?.play().catch(() => {});
  const pause = () => {
    const v = videoRef.current;
    if (v) {
      v.pause();
      v.currentTime = 0;
    }
  };

  return (
    <article
      onMouseEnter={play}
      onMouseLeave={pause}
      onFocus={play}
      onBlur={pause}
      tabIndex={0}
      aria-label={`${title} — ${categoryLabel}`}
      className="group relative isolate cursor-pointer overflow-hidden rounded-sm bg-ink-raised outline-none"
    >
      <div className="relative aspect-[3/4]">
        {/* Media layer — wide (16:9) work is letterboxed inside the frame */}
        <div className="absolute inset-0 flex items-center bg-black transition-transform duration-[1.4s] ease-cinema group-hover:scale-[1.06]">
          <div className={`relative w-full ${isVertical ? "h-full" : "aspect-video"}`}>
            {project.video ? (
              <video
                ref={videoRef}
                src={project.video}
                poster={project.poster}
                muted
                loop
                playsInline
                preload="metadata"
                className="size-full object-cover"
              />
            ) : project.poster ? (
              // eslint-disable-next-line @next/next/no-img-element -- user-supplied posters of unknown size
              <img src={project.poster} alt="" className="size-full object-cover" loading="lazy" />
            ) : (
              <Placeholder from={grade.from} to={grade.to} seed={index} />
            )}
          </div>
        </div>

        {/* Gradient for legibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-black/30" />

        {/* Viewfinder that tightens on hover */}
        <div className="viewfinder absolute inset-4 opacity-0 transition-all duration-700 ease-cinema [--vf-size:14px] group-hover:inset-3 group-hover:opacity-100 group-focus-visible:opacity-100" />

        {/* Top meta */}
        <div className="absolute inset-x-0 top-0 flex items-center justify-between p-4">
          <span className="label text-paper/70">{String(index + 1).padStart(2, "0")}</span>
          <span className="rounded-full border border-white/15 px-2 py-0.5 font-mono text-[10px] tracking-widest text-paper/70">
            {project.format}
          </span>
        </div>

        {/* Play button */}
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="flex size-16 scale-75 items-center justify-center rounded-full border border-white/30 bg-white/5 opacity-0 backdrop-blur-md transition-all duration-700 ease-cinema group-hover:scale-100 group-hover:opacity-100 group-focus-visible:scale-100 group-focus-visible:opacity-100">
            <Play size={18} className="translate-x-px fill-paper" />
          </span>
        </div>

        {/* Bottom meta */}
        <div className="absolute inset-x-0 bottom-0 p-4 md:p-5">
          <p className="label mb-2 text-paper/60">{categoryLabel}</p>
          <h3 className="font-display text-2xl leading-none uppercase md:text-[1.7rem]">
            {title}
          </h3>
          {!hasMedia ? (
            <p className="mt-3 max-h-0 overflow-hidden font-mono text-[10px] tracking-widest text-mute uppercase opacity-0 transition-all duration-700 ease-cinema group-hover:max-h-6 group-hover:opacity-100">
              {comingSoonLabel}
            </p>
          ) : null}
        </div>
      </div>
    </article>
  );
}

/** Abstract, softly moving "light" that stands in for missing footage. */
function Placeholder({ from, to, seed }: { from: string; to: string; seed: number }) {
  const x = 20 + ((seed * 37) % 60);
  const y = 15 + ((seed * 53) % 50);
  return (
    <div
      className="relative size-full overflow-hidden"
      style={{ background: `linear-gradient(160deg, ${from} 0%, ${to} 85%)` }}
    >
      <div
        className="absolute -inset-1/4 animate-drift opacity-70 blur-3xl"
        style={{
          background: `radial-gradient(circle at ${x}% ${y}%, ${from} 0%, transparent 45%), radial-gradient(circle at ${100 - x}% ${100 - y}%, rgb(255 255 255 / 0.06) 0%, transparent 40%)`,
          animationDelay: `${-seed * 1.7}s`,
        }}
      />
      {/* Letterbox scan lines */}
      <div className="absolute inset-0 bg-[repeating-linear-gradient(0deg,rgb(255_255_255/0.025)_0px,rgb(255_255_255/0.025)_1px,transparent_1px,transparent_4px)]" />
    </div>
  );
}

import { Fragment } from "react";

type MarqueeProps = {
  items: readonly string[];
  className?: string;
};

/** Endless horizontal ticker. Content is duplicated so the loop is seamless. */
export function Marquee({ items, className = "" }: MarqueeProps) {
  const row = (hidden: boolean) => (
    <div aria-hidden={hidden} className="flex shrink-0 items-center">
      {items.map((item) => (
        <Fragment key={item}>
          <span className="px-6 md:px-10">{item}</span>
          <span className="text-dim">✦</span>
        </Fragment>
      ))}
    </div>
  );

  return (
    <div className={`group flex overflow-hidden whitespace-nowrap select-none ${className}`}>
      <div className="flex w-max animate-marquee group-hover:[animation-play-state:paused]">
        {row(false)}
        {row(true)}
      </div>
    </div>
  );
}

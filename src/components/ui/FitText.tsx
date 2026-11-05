"use client";

import { useFitText } from "@/hooks/useFitText";

/** One line of display text, scaled to exactly fill its container's width. */
export function FitText({ text, className = "" }: { text: string; className?: string }) {
  const { containerRef, textRef } = useFitText<HTMLDivElement, HTMLSpanElement>();
  return (
    <div ref={containerRef} className={className}>
      <span ref={textRef} className="block w-max text-[length:var(--fit,15vw)] whitespace-nowrap">
        {text}
      </span>
    </div>
  );
}

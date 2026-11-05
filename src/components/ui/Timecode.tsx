"use client";

import { useEffect, useRef } from "react";

const FPS = 25;
const pad = (n: number) => String(n).padStart(2, "0");

/**
 * A running camera timecode (HH:MM:SS:FF). Writes straight to the DOM
 * on each animation frame to avoid re-rendering React 25 times a second.
 */
export function Timecode({ className = "" }: { className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const start = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const totalFrames = Math.floor(((now - start) / 1000) * FPS);
      const frames = totalFrames % FPS;
      const seconds = Math.floor(totalFrames / FPS);
      if (ref.current) {
        ref.current.textContent = `${pad(Math.floor(seconds / 3600))}:${pad(
          Math.floor(seconds / 60) % 60,
        )}:${pad(seconds % 60)}:${pad(frames)}`;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <span ref={ref} className={`tabular-nums ${className}`}>
      00:00:00:00
    </span>
  );
}

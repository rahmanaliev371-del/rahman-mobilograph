"use client";

import { useLayoutEffect, useRef } from "react";

/**
 * Scales a single line of text so it exactly fills its container's width.
 * The computed size is exposed as the `--fit` CSS variable on the container,
 * so sibling lines can share the same size.
 */
export function useFitText<C extends HTMLElement, T extends HTMLElement>() {
  const containerRef = useRef<C>(null);
  const textRef = useRef<T>(null);

  useLayoutEffect(() => {
    const container = containerRef.current;
    const text = textRef.current;
    if (!container || !text) return;

    const fit = () => {
      const probe = 100;
      container.style.setProperty("--fit", `${probe}px`);
      const textWidth = text.scrollWidth;
      const available = container.clientWidth;
      if (textWidth > 0) {
        container.style.setProperty("--fit", `${(available / textWidth) * probe}px`);
      }
    };

    fit();
    const observer = new ResizeObserver(fit);
    observer.observe(container);
    document.fonts?.ready.then(fit).catch(() => {});
    return () => observer.disconnect();
  }, []);

  return { containerRef, textRef };
}

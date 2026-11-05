"use client";

import { useSyncExternalStore } from "react";

const BUILD_YEAR = 2026;
const subscribe = () => () => {};

/**
 * Current year. Next.js forbids reading the clock while prerendering,
 * so the server snapshot is a fixed year and the browser reads the real one.
 */
export function CurrentYear() {
  const year = useSyncExternalStore(
    subscribe,
    () => new Date().getFullYear(),
    () => BUILD_YEAR,
  );
  return <>{year}</>;
}

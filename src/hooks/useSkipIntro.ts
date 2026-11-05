"use client";

import { useEffect, useState } from "react";

// Lives for the whole browser session (survives client-side language switches).
let introPlayed = false;

/**
 * True when the page-load intro has already been shown in this session, so
 * components can render in their final state instead of replaying it
 * (e.g. after switching EN → RU). Always false on the first render after a
 * full page load, which keeps server and client markup identical.
 */
export function useSkipIntro() {
  const [skip] = useState(() => introPlayed);
  useEffect(() => {
    introPlayed = true;
  }, []);
  return skip;
}

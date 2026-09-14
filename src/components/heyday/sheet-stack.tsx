"use client";

import { useEffect } from "react";

/* ==================================================================== *
 *  SheetStack — the wiring behind <Sheet>.
 *
 *  Ported from kit.js. One effect, run once, that does two jobs:
 *
 *  1. **Stacking.** Gives each sheet a z-index in document order, so a
 *     later sheet always covers the one before. Source order alone gets
 *     this right for positioned elements, but anything inside a sheet that
 *     creates its own stacking context — a transform, an isolate, a
 *     sticky child — can break it, and when it breaks the symptom is a
 *     card strip poking through a section, which is hard to attribute.
 *     Being explicit costs one line.
 *
 *  2. **The colour fade.** Each sheet is told the colour of the one before
 *     it and held there (`.is-pre`) until it scrolls into view; releasing
 *     the class lets CSS transition it to its own colour over 0.9s. It is
 *     put back when the sheet leaves downwards, so scrolling up plays the
 *     fade in reverse rather than snapping.
 *
 *  Reading the previous colour from the DOM rather than being told it in
 *  props is deliberate: a page that reorders its sections cannot then get
 *  the fade out of step with itself.
 * ==================================================================== */

export function SheetStack({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const sheets = Array.from(
      document.querySelectorAll<HTMLElement>("[data-sheet]")
    );
    if (!sheets.length) return;

    sheets.forEach((s, i) => {
      s.style.zIndex = String(i + 1);
      if (i === 0) return;
      const prev = getComputedStyle(sheets[i - 1]).getPropertyValue("--c");
      if (prev.trim()) {
        s.style.setProperty("--prev", prev.trim());
        s.classList.add("is-pre");
      }
    });

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          const el = e.target as HTMLElement;
          if (e.isIntersecting) {
            el.classList.remove("is-pre");
          } else if (
            e.boundingClientRect.top > 0 &&
            el.style.getPropertyValue("--prev")
          ) {
            el.classList.add("is-pre");
          }
        });
      },
      { threshold: 0.18 }
    );

    sheets.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, []);

  return <>{children}</>;
}

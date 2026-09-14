"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";

/* ==================================================================== *
 *  Statement — the one big sentence, lit word by word as you scroll.
 *
 *  Ported from kit.js's `[data-words]`. The words sit at 14% opacity and
 *  come up to full as the section passes; scrolling back up puts them out
 *  again.
 *
 *  Two details that are easy to get wrong and both matter:
 *
 *  - The dim state is OPACITY, not a lighter colour. The sentence has to
 *    be readable to a screen reader and to anyone who never scrolls, and
 *    it has to survive reduced motion, where every word is simply on.
 *  - The whole sentence is one text node to assistive technology. Splitting
 *    it into nineteen spans is a visual device; `aria-label` on the
 *    paragraph keeps it a sentence.
 * ==================================================================== */

export function Statement({
  text,
  className = "",
}: {
  text: string;
  className?: string;
}) {
  const ref = useRef<HTMLElement | null>(null);
  const still = useReducedMotion();
  const words = text.split(" ");
  const [lit, setLit] = useState(0);

  /* Under reduced motion every word is simply on. That is derived at
     render rather than pushed into state by an effect — setting state in
     an effect to reach a value you already know is a cascading render,
     and the React compiler rejects it. */
  const shown = still ? words.length : lit;

  useEffect(() => {
    if (still) return;
    const el = ref.current;
    if (!el) return;

    let frame = 0;
    const measure = () => {
      frame = 0;
      const r = el.getBoundingClientRect();
      const p = Math.min(
        1,
        Math.max(0, (window.innerHeight * 0.85 - r.top) / (r.height * 0.9))
      );
      setLit(Math.round(p * words.length));
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(measure);
    };

    measure();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [still, words.length]);

  return (
    <p
      ref={ref as React.Ref<HTMLParagraphElement>}
      aria-label={text}
      className={`m-0 max-w-[24ch] font-display font-bold leading-[1.08] tracking-[-0.03em] ${className}`}
      style={{ fontSize: "clamp(34px, 4.6vw, 64px)" }}
    >
      {words.map((w, i) => (
        <span
          key={`${w}-${i}`}
          aria-hidden
          className="transition-opacity duration-200"
          style={{ opacity: i < shown ? 1 : 0.14 }}
        >
          {w}{i < words.length - 1 ? " " : ""}
        </span>
      ))}
    </p>
  );
}

"use client";

import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";

/* ==================================================================== *
 *  The two text effects gsap.com is actually built out of.
 *
 *  Measured off the live site rather than guessed at:
 *
 *  - The hero is one word per line at 221px, weight 600, and every letter
 *    is its own element — that is what lets them arrive one at a time.
 *    Setting a headline in 300-weight and calling it large was the reason
 *    ours was hard to read: light weights thin out as they scale up, and
 *    on a pale ground there is nothing left to catch.
 *
 *  - The statement below it is not revealed all at once. Each word starts
 *    nearly invisible and comes up to full strength as the section crosses
 *    the screen, so the sentence writes itself while you scroll. This is
 *    the single most recognisable thing on the page and we had none of it.
 * ==================================================================== */

/* -------------------------------------------------------------- *
 *  Letter-by-letter arrival
 * -------------------------------------------------------------- */

/**
 * Splits a line into letters and flips each one up into place.
 *
 * Each letter sits in an `overflow-hidden` box so it is genuinely masked
 * rather than faded — the letter rises out of nothing, which is what gives
 * the movement weight. Spaces are rendered as their own non-breaking box so
 * word gaps survive the split.
 */
export function LetterReveal({
  text,
  delay = 0,
  className = "",
}: {
  text: string;
  delay?: number;
  className?: string;
}) {
  return (
    <span className={`inline-flex flex-wrap ${className}`} aria-label={text}>
      {text.split("").map((ch, i) => (
        <span
          key={`${ch}-${i}`}
          aria-hidden
          className="inline-block overflow-hidden align-bottom"
          // Leading is clipped by overflow-hidden, so the box needs a little
          // slack below the baseline or descenders get sheared off.
          style={{ paddingBottom: "0.12em", marginBottom: "-0.12em" }}
        >
          <motion.span
            className="inline-block"
            initial={{ y: "110%", rotateX: -55, opacity: 0 }}
            animate={{ y: "0%", rotateX: 0, opacity: 1 }}
            transition={{
              duration: 0.85,
              delay: delay + i * 0.045,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            {ch === " " ? " " : ch}
          </motion.span>
        </span>
      ))}
    </span>
  );
}

/* -------------------------------------------------------------- *
 *  Word-by-word reveal on scroll
 * -------------------------------------------------------------- */

/** One word, lit by its own slice of the container's scroll progress. */
function Word({
  children,
  progress,
  from,
  to,
}: {
  children: string;
  progress: MotionValue<number>;
  from: number;
  to: number;
}) {
  const opacity = useTransform(progress, [from, to], [0.15, 1]);
  return (
    <span className="relative mr-[0.25em] inline-block">
      {/* The dim copy stays put so the line never reflows and the block of
          text holds its shape before it is read. Hidden from assistive tech,
          or every word is announced twice. */}
      <span aria-hidden className="absolute left-0 top-0 opacity-15">
        {children}
      </span>
      <motion.span style={{ opacity }}>{children}</motion.span>
    </span>
  );
}

/**
 * A sentence that writes itself as the section crosses the screen.
 *
 * The window runs from the block entering the lower part of the viewport to
 * it leaving the upper part, so the reveal finishes while the sentence is
 * still comfortably on screen rather than completing as it exits. Each word
 * gets an overlapping slice of that range — overlapping, because a hard
 * hand-off word to word reads as a cursor rather than as light arriving.
 */
export function WordReveal({
  text,
  className = "",
}: {
  text: string;
  className?: string;
}) {
  const ref = useRef<HTMLParagraphElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.85", "end 0.45"],
  });

  const words = text.split(" ");
  // Each word lights over a window twice the width of its own step, so
  // neighbours overlap and the sweep reads as continuous.
  const step = 1 / words.length;

  return (
    <p ref={ref} className={className}>
      {words.map((w, i) => (
        <Word
          key={`${w}-${i}`}
          progress={scrollYProgress}
          from={i * step}
          to={Math.min(1, i * step + step * 2)}
        >
          {w}
        </Word>
      ))}
    </p>
  );
}

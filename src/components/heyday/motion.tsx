"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";

/* ==================================================================== *
 *  The rise, the stagger and the parallax — design brief A6.
 *
 *  From mariamontessori.org. The distinguishing detail is that content
 *  rises in, SINKS AWAY on the way back up, and rises again on the way
 *  down: `once: false`. Most reveal components fire once and are done,
 *  which makes a page feel finished the second time you scroll it. This one
 *  stays alive.
 *
 *  The old `section-reveal.tsx` was once:true, 40px and 0.8s. This replaces
 *  it to spec: 32px, 0.75s, and the sink-back.
 * ==================================================================== */

/** cubic-bezier(.215,.61,.355,1) — A6. */
const EASE = [0.215, 0.61, 0.355, 1] as const;
const DURATION = 0.75;
/** 2em. */
const RISE = 32;

/** Fires when the element's top passes 90% of the viewport height. */
const VIEWPORT = { once: false, margin: "0px 0px -10% 0px" } as const;

export function SectionReveal({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const still = useReducedMotion();
  if (still) return <div className={className}>{children}</div>;

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: RISE }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={VIEWPORT}
      transition={{ duration: DURATION, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

/**
 * Staggered siblings.
 *
 * The stagger is capped at the seventh item — `Math.min(i, 6) * 0.15` — so
 * a grid of twenty features does not make the last one arrive three seconds
 * after the first. Without the cap, long grids feel broken rather than
 * choreographed.
 */
export function RevealGroup({
  children,
  className = "",
  step = 0.15,
  cap = 6,
}: {
  children: React.ReactNode;
  className?: string;
  step?: number;
  cap?: number;
}) {
  const items = Array.isArray(children) ? children : [children];
  return (
    <div className={className}>
      {items.map((child, i) => (
        <SectionReveal key={i} delay={Math.min(i, cap) * step}>
          {child}
        </SectionReveal>
      ))}
    </div>
  );
}

/**
 * Parallax — pictures move a little faster than the page.
 *
 * Capped at ±60px and only for images and illustrations. Never text: text
 * that drifts against its own heading is the fastest way to make a page
 * feel unreliable to read. Never the hero either, which has to be readable
 * on the first frame.
 */
export function Parallax({
  children,
  amount = 60,
  className = "",
}: {
  children: React.ReactNode;
  amount?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const still = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [amount, -amount]);

  return (
    <div ref={ref} className={className}>
      <motion.div style={still ? undefined : { y }}>{children}</motion.div>
    </div>
  );
}

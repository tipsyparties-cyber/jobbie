"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { CREAM, SAGE, BLUE, YELLOW, LAVENDER } from "@/lib/palette";

/* ==================================================================== *
 *  The hero's moving parts.
 *
 *  Measured off gsap.com rather than guessed at, and what is there is not
 *  what it looks like in a screenshot:
 *
 *  Every letter of "Animate Anything" sits in its own `overflow: hidden`
 *  box and is pushed out of it — some down 115px, some up 202px, some
 *  sideways, one flipped a full 180 degrees in 3D. The transforms do not
 *  change over time. They change with SCROLL. At the top of the page the
 *  headline is in pieces, and scrolling assembles it.
 *
 *  Scattered among the letters are four small shapes, roughly 100-160px,
 *  at odd positions including one mostly off the left edge.
 *
 *  What we do differently, deliberately: ours assembles on load and
 *  scatters as you leave. Same device, reversed. gsap can afford an
 *  unreadable headline at rest because everybody arriving already knows
 *  what the site is; a business whose visitors are deciding whether to
 *  trust it cannot.
 * ==================================================================== */

/** Deterministic per-letter jitter. Index-seeded rather than random, so the
 *  server and the client agree and React does not throw a hydration error. */
function seeded(i: number) {
  const x = Math.sin(i * 12.9898 + 78.233) * 43758.5453;
  return x - Math.floor(x);
}

/** One letter: a clip box, a scroll-driven outer transform, and a mount
 *  arrival on the inner. Two elements because framer-motion cannot take
 *  `animate` and a scroll `style` on the same property of one node. */
function Letter({
  ch,
  i,
  delay,
  stagger,
  progress,
}: {
  ch: string;
  i: number;
  delay: number;
  stagger: number;
  progress: MotionValue<number>;
}) {
  const r = seeded(i);
  // Mirrors gsap's own numbers: mostly vertical, a quarter of them sideways,
  // magnitudes around 1-2x the cap height rather than a timid 20px.
  const goesSideways = r > 0.75;
  const dist = 110 + r * 130;
  const sign = i % 2 === 0 ? 1 : -1;

  const y = useTransform(progress, [0, 1], [0, goesSideways ? 0 : dist * sign]);
  const x = useTransform(progress, [0, 1], [0, goesSideways ? dist * sign : 0]);
  // One letter in six takes the 180-degree flip gsap gives its "n".
  const rotateY = useTransform(progress, [0, 1], [0, i % 6 === 2 ? 180 : 0]);

  return (
    <span
      aria-hidden
      className="inline-block overflow-hidden align-bottom"
      // overflow-hidden clips the leading, so the box needs slack below the
      // baseline or descenders get sheared off.
      style={{ paddingBottom: "0.12em", marginBottom: "-0.12em" }}
    >
      <motion.span className="inline-block" style={{ y, x, rotateY }}>
        <motion.span
          className="inline-block"
          initial={{ y: "110%", rotateX: -55, opacity: 0 }}
          animate={{ y: "0%", rotateX: 0, opacity: 1 }}
          transition={{
            duration: 0.85,
            delay: delay + i * stagger,
            ease: [0.16, 1, 0.3, 1],
          }}
        >
          {ch === " " ? " " : ch}
        </motion.span>
      </motion.span>
    </span>
  );
}

/**
 * The headline. Assembles on load, comes apart as you scroll away.
 *
 * The scroll window ends before the section does, so the letters are fully
 * scattered by the time the hero leaves rather than still drifting as the
 * next section arrives.
 */
export function HeroHeadline({
  lines,
  className = "",
}: {
  lines: string[];
  className?: string;
}) {
  const ref = useRef<HTMLHeadingElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  let n = 0;
  return (
    <h1 ref={ref} className={className} aria-label={lines.join(" ")}>
      {lines.map((line, li) => (
        <span key={line} className="block">
          <span className="inline-flex flex-wrap">
            {line.split("").map((ch, ci) => {
              const i = n++;
              return (
                <Letter
                  key={`${li}-${ci}`}
                  ch={ch}
                  i={i}
                  delay={0.15 + li * 0.5}
                  stagger={0.03}
                  progress={scrollYProgress}
                />
              );
            })}
          </span>
        </span>
      ))}
    </h1>
  );
}

/* -------------------------------------------------------------- *
 *  The decorative shapes
 * -------------------------------------------------------------- */

/**
 * Four shapes, sized and placed like gsap's: small, scattered, one of them
 * hanging off the left edge. Each drifts on its own slow loop and moves at
 * its own rate on scroll, which is what stops them reading as a pattern.
 *
 * Percentages rather than pixels, so the arrangement survives a phone.
 */
const SHAPES = [
  { top: "12%", left: "-4%", size: 130, tint: SAGE, dur: 11, drift: 26, rate: -140, radius: "58% 42% 47% 53% / 51% 46% 54% 49%" },
  { top: "6%", left: "78%", size: 104, tint: BLUE, dur: 14, drift: -20, rate: -90, radius: "50%" },
  { top: "62%", left: "86%", size: 152, tint: LAVENDER, dur: 9, drift: 22, rate: -190, radius: "46% 54% 58% 42% / 53% 48% 52% 47%" },
  { top: "74%", left: "8%", size: 86, tint: YELLOW, dur: 13, drift: -26, rate: -60, radius: "52% 48% 43% 57% / 44% 56% 44% 56%" },
  { top: "40%", left: "62%", size: 70, tint: CREAM, dur: 16, drift: 18, rate: -120, radius: "50%" },
];

export function HeroShapes({ progress }: { progress: MotionValue<number> }) {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {SHAPES.map((s, i) => (
        <Shape key={i} s={s} progress={progress} />
      ))}
    </div>
  );
}

function Shape({
  s,
  progress,
}: {
  s: (typeof SHAPES)[number];
  progress: MotionValue<number>;
}) {
  // Scroll parallax on the outer node, the endless drift on the inner — same
  // reason as the letters, two properties cannot share one node.
  const y = useTransform(progress, [0, 1], [0, s.rate]);

  return (
    <motion.div className="absolute" style={{ top: s.top, left: s.left, y }}>
      <motion.div
        animate={{ y: [0, s.drift, 0], rotate: [0, s.drift > 0 ? 8 : -8, 0] }}
        transition={{ duration: s.dur, repeat: Infinity, ease: "easeInOut" }}
        style={{
          width: s.size,
          height: s.size,
          borderRadius: s.radius,
          background: `linear-gradient(145deg, ${s.tint} 0%, ${s.tint}99 100%)`,
        }}
      />
    </motion.div>
  );
}

/** Shared scroll progress for the hero, so the letters and the shapes move
 *  against the same clock. */
export function useHeroProgress(ref: React.RefObject<HTMLElement | null>) {
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  return scrollYProgress;
}

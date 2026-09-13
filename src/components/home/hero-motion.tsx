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
      /* The descender fix.
       *
       * Plus Jakarta Sans has an em box about 1.25em tall (ascent 1.0,
       * descent 0.25). At `leading-[0.9]` the content box is 0.9em, so the
       * half-leading is (0.9 − 1.25) / 2 = −0.175em at each end: the box
       * bottom sits 0.175em ABOVE where the descender actually reaches, and
       * `overflow: hidden` cuts straight through the tail of every y, g and
       * p. 0.12em of padding was not enough to clear it.
       *
       * 0.3em clears it with room to spare, and the negative margin keeps
       * the line box the same height so nothing below shifts.
       */
      style={{ paddingBottom: "0.3em", marginBottom: "-0.3em" }}
    >
      <motion.span className="inline-block" style={{ y, x, rotateY }}>
        <motion.span
          className="inline-block"
          /* 150%, not 110%. The mask is now 1.2em deep (0.9em box plus
           * 0.3em of descender padding) while the letter is 0.9em tall, so
           * it has to start at least 133% of its own height below the top
           * to stay hidden. At 110% the top of every letter was already
           * peeking into the padded area before it moved. */
          initial={{ y: "150%", rotateX: -55, opacity: 0 }}
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
          {/* Letters are grouped into words, and each word is nowrap.
              Without that, every letter is its own inline-block and the
              flex container will happily break a line in the middle of
              "love" on a narrow screen. The word gap is a flex gap rather
              than a space character, so there is no stray clip box to
              account for. */}
          <span className="inline-flex flex-wrap gap-x-[0.26em]">
            {line.split(" ").map((word, wi) => (
              <span key={`${li}-${wi}`} className="inline-flex whitespace-nowrap">
                {word.split("").map((ch, ci) => {
                  const i = n++;
                  return (
                    <Letter
                      key={`${li}-${wi}-${ci}`}
                      ch={ch}
                      i={i}
                      delay={0.15 + li * 0.34}
                      stagger={0.028}
                      progress={scrollYProgress}
                    />
                  );
                })}
              </span>
            ))}
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

"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { HeydayMark } from "@/components/heyday/heyday-mark";
import { SAGE, BLUE, SKY, LAVENDER } from "@/lib/palette";

/* ==================================================================== *
 *  Decorative suns — design brief A10, added in pack 4.
 *
 *  These replace the blurred orbs and blobs the old site used. The
 *  difference matters more than it sounds: a blurred circle is any SaaS
 *  site's background, while the same shape as the brand mark, drawn in one
 *  flat colour, ties the decoration to the logo.
 *
 *  The brief's rules, all of which are easy to break by accident:
 *
 *  - Different sizes, each in ONE colour (A11), three per screen at most.
 *  - One may cross a section edge, to link two sections.
 *  - They sit BEHIND text and never make it harder to read. That is why
 *    they are low-opacity and pointer-events-none, and why nothing here
 *    ever lands on top of a headline.
 *  - They turn slowly, and drift on a gentle parallax.
 *  - With reduced motion, they are still.
 * ==================================================================== */

export type DecorSun = {
  /** Percentages, so the arrangement survives a phone. */
  top: string;
  left: string;
  size: number;
  colour: string;
  /** How far it drifts against the scroll. */
  drift: number;
  /** Degrees per full section pass. The "dial click" turn, slowed right
   *  down so it reads as weather rather than as a spinner. */
  turn: number;
};

/** A default arrangement: three, different sizes, one crossing the edge. */
export const HERO_SUNS: DecorSun[] = [
  { top: "6%", left: "-5%", size: 190, colour: SAGE, drift: -90, turn: 14 },
  { top: "4%", left: "80%", size: 130, colour: BLUE, drift: -140, turn: -20 },
  // Sits low and hangs past the bottom, linking the hero to the section
  // under it.
  { top: "78%", left: "88%", size: 240, colour: LAVENDER, drift: -60, turn: 10 },
];

export const SECTION_SUNS: DecorSun[] = [
  { top: "12%", left: "86%", size: 150, colour: SKY, drift: -110, turn: 16 },
  { top: "70%", left: "-4%", size: 120, colour: SAGE, drift: -70, turn: -12 },
];

export function DecorSuns({ suns = HERO_SUNS }: { suns?: DecorSun[] }) {
  const ref = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  return (
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      {suns.map((s, i) => (
        <Sun key={i} sun={s} progress={scrollYProgress} />
      ))}
    </div>
  );
}

function Sun({
  sun,
  progress,
}: {
  sun: DecorSun;
  progress: ReturnType<typeof useScroll>["scrollYProgress"];
}) {
  const still = useReducedMotion();
  const y = useTransform(progress, [0, 1], [0, sun.drift]);
  const rotate = useTransform(progress, [0, 1], [0, sun.turn]);

  return (
    <motion.div
      className="absolute"
      style={{
        top: sun.top,
        left: sun.left,
        ...(still ? {} : { y, rotate }),
        // Well back, because the rule is that they never make text harder
        // to read and a full-strength mark behind a headline does.
        opacity: 0.28,
      }}
    >
      <HeydayMark shape="sun" sun={sun.colour} size={sun.size} />
    </motion.div>
  );
}

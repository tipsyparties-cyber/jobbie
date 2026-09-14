"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { HeydayLogo } from "@/components/heyday/heyday-logo";
import { SAGE, SKY, LAVENDER } from "@/lib/palette";

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

/**
 * The hero's three, matching the prototype: a large lavender one hanging
 * off the left edge behind the label, a small sky one above the gap
 * between the columns, and a big sage one low on the left that crosses
 * into the section below.
 *
 * Positions are the prototype's, in the prototype's units — the first two
 * are pinned to the left edge in pixels rather than percentages because
 * they are anchored to the headline, not to the width of the page.
 */
export const HERO_SUNS: DecorSun[] = [
  { top: "40px", left: "-50px", size: 150, colour: LAVENDER, drift: -90, turn: 14 },
  { top: "56px", left: "calc(50% - 96px)", size: 62, colour: SKY, drift: -140, turn: -20 },
];

/**
 * The big one in the sheet under the hero, hanging in from the top-left
 * corner. This is the brief's "one crossing into the next section" (A10):
 * at 520px it reads as part of the page's construction rather than as
 * decoration dropped on top.
 */
export const WHAT_SUNS: DecorSun[] = [
  { top: "-150px", left: "-190px", size: 520, colour: SAGE, drift: -40, turn: 8 },
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
      className="pointer-events-none absolute inset-0"
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
        // Full strength, as the prototype draws them. These are pale
        // colours already; dimming them further turned the sage one grey
        // and made it read as a rendering fault rather than as a mark.
        // They stay behind the text by z-index, not by fading.
        zIndex: 0,
      }}
    >
      <HeydayLogo size={sun.size} colour={sun.colour} />
    </motion.div>
  );
}

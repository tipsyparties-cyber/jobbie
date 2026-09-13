"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { HeydayLine } from "@/components/heyday/heyday-line";
import { PAPER, ORANGE } from "@/lib/palette";

/* ==================================================================== *
 *  The hero's rising cards — design brief A9.
 *
 *  anyone.com's hero has tall cards rising one at a time through a rounded
 *  panel. The brief is explicit that we copy THE PATTERN AND THE TIMING,
 *  never their Lottie file or their artwork — so this is DOM plus
 *  framer-motion, and every card is ours.
 *
 *  The timing is theirs, measured: rise 680px over 1.67s, hold 0.83s, leave
 *  upward 730px over 2.5s, a new card every 3s. Expressed as keyframes at
 *  0 / 33% / 50% / 100% of a 5s cycle, which is what those four numbers add
 *  up to.
 *
 *  Pack 4 took the extras out: no ripple, no pop-in, no sun peeking in.
 *  Each card shows all its details the whole time and simply scrolls up and
 *  away. The restraint is the point — the cards are the content, and three
 *  effects layered on a moving card is where a hero starts to look like a
 *  demo reel.
 *
 *  Three things the brief asks for that are easy to skip and matter:
 *
 *  - It pauses when the hero is off screen or the tab is hidden. An
 *    animation looping behind a footer is pure battery.
 *  - Below 1280px one card sits still with the line under it. A loop this
 *    tall does not survive a narrow column.
 *  - The moving cards are aria-hidden and the panel carries one label. A
 *    screen reader should hear what the picture shows, once, not five
 *    cards cycling forever.
 * ==================================================================== */

/** The workflow, one card per step. */
export type RisingCard = {
  step: string;
  title: string;
  line: string;
  tint: string;
};

const CYCLE = 5;
const EASE = [0.333, 0, 0.667, 1] as const;

export function RisingCards({
  cards,
  className = "",
  ground = PAPER,
}: {
  cards: RisingCard[];
  className?: string;
  /** The panel's ground, so the faint outlines behind can be paper on it. */
  ground?: string;
}) {
  const still = useReducedMotion();
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const [running, setRunning] = useState(false);
  const [wide, setWide] = useState(false);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1280px)");
    const sync = () => setWide(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  // Only while visible, and only while the tab is.
  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    let onScreen = false;
    const update = () => setRunning(onScreen && !document.hidden);

    const io = new IntersectionObserver(([e]) => {
      onScreen = e.isIntersecting;
      update();
    });
    io.observe(el);
    document.addEventListener("visibilitychange", update);
    return () => {
      io.disconnect();
      document.removeEventListener("visibilitychange", update);
    };
  }, []);

  const animate = running && wide && !still;

  // Which card has just landed, for the step indicator underneath.
  useEffect(() => {
    if (!animate) return;
    const t = setInterval(
      () => setIndex((i) => (i + 1) % cards.length),
      CYCLE * 1000
    );
    return () => clearInterval(t);
  }, [animate, cards.length]);

  return (
    <div ref={wrapRef} className={className}>
      <div
        role="img"
        aria-label="Example workflow: an enquiry becomes a booked, paid, staffed and reviewed job"
        className="relative overflow-hidden rounded-t-[56px] border border-ink/10"
        style={{ backgroundColor: ground, height: 520 }}
      >
        {/* The faint outlines behind the cards. */}
        <div aria-hidden className="pointer-events-none absolute inset-0">
          {[0, 1, 2, 3].map((i) => (
            <div
              key={i}
              className="absolute left-1/2 rounded-2xl border"
              style={{
                width: 300 - i * 18,
                height: 420 - i * 24,
                bottom: 40 + i * 14,
                transform: "translateX(-50%)",
                borderColor: PAPER,
                opacity: 0.55,
              }}
            />
          ))}
        </div>

        {animate ? (
          cards.map((card, i) => (
            <motion.div
              key={card.step}
              aria-hidden
              className="absolute left-1/2"
              style={{ width: 300, marginLeft: -150, bottom: 0 }}
              initial={{ y: 680, opacity: 0 }}
              animate={{
                // 0 → rise → hold → leave, over one cycle per card.
                y: [680, 0, 0, -730],
                opacity: [0, 1, 1, 0],
              }}
              transition={{
                duration: CYCLE,
                times: [0, 0.334, 0.5, 1],
                ease: EASE,
                repeat: Infinity,
                repeatDelay: (cards.length - 1) * CYCLE,
                delay: i * CYCLE,
              }}
            >
              <CardFace card={card} />
            </motion.div>
          ))
        ) : (
          // Narrow, reduced motion, or off screen: one card, still.
          <div className="absolute left-1/2 bottom-12" style={{ width: 300, marginLeft: -150 }}>
            <CardFace card={cards[0]} />
          </div>
        )}

      </div>

      <div className="mt-6 flex justify-center">
        <HeydayLine steps={cards.map((c) => c.step)} current={animate ? index : 0} />
      </div>
    </div>
  );
}

function CardFace({ card }: { card: RisingCard }) {
  return (
    <div className="relative">
      <div
        className="rounded-2xl border-2 border-ink p-6"
        style={{
          height: 420,
          backgroundColor: PAPER,
          boxShadow: "11px 11px 0 0 rgba(10,10,10,0.08)",
        }}
      >
        <span className="font-mono text-[12px] tracking-[0.02em]" style={{ color: ORANGE }}>
          {card.step}
        </span>
        <p className="mt-4 font-display text-2xl font-semibold leading-tight">
          {card.title}
        </p>
        <p className="mt-3 font-body text-sm leading-relaxed text-ink/65">{card.line}</p>
        <div
          aria-hidden
          className="mt-6 h-40 w-full rounded-xl"
          style={{ backgroundColor: card.tint }}
        />
      </div>
    </div>
  );
}

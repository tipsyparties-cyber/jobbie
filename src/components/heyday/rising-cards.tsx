"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { HeydayLine } from "@/components/heyday/heyday-line";
import { Icon } from "@/components/heyday/icon";
import { PAPER, ORANGE, CREAM } from "@/lib/palette";

/* ==================================================================== *
 *  The hero's rising cards — design brief A9.
 *
 *  A CHAIN, not a window.
 *
 *  The first build had each card rise into a clipped panel, hold, and leave
 *  on its own, which reads as a slideshow in a box. anyone.com and
 *  getjobber.com both do the opposite: the cards are joined in one strip
 *  that travels, so you see the one before and the one after. That is what
 *  makes it say "these are steps in a sequence" rather than "here are some
 *  unrelated screens" — and the sequence IS the argument the hero is
 *  making.
 *
 *  So the whole set is one track, stepped up by exactly one card at a time
 *  and holding for a beat. The move is quick and the hold is long, because
 *  the hold is where the card is actually read; a constant crawl gives the
 *  eye nowhere to land.
 *
 *  The loop is seamless because the first card is rendered again at the
 *  end: the track travels the full length and, by the time it snaps back to
 *  zero, it is already showing that same card, so the reset cannot be seen.
 *
 *  Masked top and bottom with a gradient rather than a hard edge, so cards
 *  arrive and leave instead of being cut off by a frame.
 * ==================================================================== */

export type RisingCard = {
  /** "STEP 2". Geist Mono. */
  step: string;
  title: string;
  /** Two or three label-and-value rows. Example data, and the panel's label
   *  says so — nothing here is a real booking. */
  rows: [string, string][];
  /** The orange status pill. */
  pill: string;
  /** The step icon, shown in a cream tile. */
  icon: string;
};

const CARD_H = 360;
const GAP = 24;
const STEP = CARD_H + GAP;
/** Quick move, long hold. The hold is where the card is read. */
const MOVE = 0.55;
const HOLD = 1.15;

export function RisingCards({
  cards,
  className = "",
}: {
  cards: RisingCard[];
  className?: string;
}) {
  const still = useReducedMotion();
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const [running, setRunning] = useState(false);
  const [wide, setWide] = useState(false);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const sync = () => setWide(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  /* Only while visible, and only while the tab is. An animation looping
     behind a footer is pure battery. */
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
  const n = cards.length;

  /* One keyframe pair per card — arrive, then hold there. The final
     keyframe is one card beyond the end, which is the duplicate. */
  const { values, times, duration } = (() => {
    const v: number[] = [];
    const t: number[] = [];
    let clock = 0;
    for (let i = 0; i <= n; i++) {
      v.push(-i * STEP);
      t.push(clock);
      if (i < n) {
        clock += HOLD;
        v.push(-i * STEP);
        t.push(clock);
        clock += MOVE;
      }
    }
    return { values: v, times: t.map((x) => x / clock), duration: clock };
  })();

  /** Which card is at the centre, for the line underneath. */
  useEffect(() => {
    if (!animate) return;
    const t = setInterval(
      () => setIndex((i) => (i + 1) % n),
      (HOLD + MOVE) * 1000
    );
    return () => clearInterval(t);
  }, [animate, n]);

  const chain = [...cards, cards[0]];
  const MASK =
    "linear-gradient(to bottom, transparent 0, #000 15%, #000 85%, transparent 100%)";

  return (
    <div ref={wrapRef} className={className}>
      <div
        role="img"
        aria-label="Example workflow, with example data: an enquiry becomes a quote, a booking, a staffed job, a payment, a review and a rebooking"
        className="relative overflow-hidden"
        style={{
          height: CARD_H + STEP,
          maskImage: MASK,
          WebkitMaskImage: MASK,
        }}
      >
        {animate ? (
          <motion.div
            aria-hidden
            className="absolute inset-x-0 flex flex-col items-center"
            style={{ gap: GAP, top: STEP / 2 }}
            animate={{ y: values }}
            transition={{
              duration,
              times,
              ease: "easeInOut",
              repeat: Infinity,
              repeatType: "loop",
            }}
          >
            {chain.map((card, i) => (
              <CardFace key={`${card.step}-${i}`} card={card} />
            ))}
          </motion.div>
        ) : (
          /* Narrow, reduced motion, or off screen: the first card, still. */
          <div
            className="absolute inset-x-0 flex justify-center"
            style={{ top: STEP / 2 }}
          >
            <CardFace card={cards[0]} />
          </div>
        )}
      </div>

      <div className="mt-6 flex justify-center">
        <HeydayLine
          steps={cards.map((c) => c.step)}
          current={animate ? index : 0}
        />
      </div>
    </div>
  );
}

function CardFace({ card }: { card: RisingCard }) {
  return (
    <div
      className="flex w-[320px] shrink-0 flex-col rounded-2xl border-2 border-ink p-6"
      style={{
        height: CARD_H,
        backgroundColor: PAPER,
        boxShadow: "11px 11px 0 0 rgba(10,10,10,0.08)",
      }}
    >
      <div className="flex items-start justify-between gap-3">
        <span className="font-mono text-[12px] tracking-[0.02em] text-ink/55">
          {card.step}
        </span>
        <span
          className="inline-block shrink-0 rounded-full px-3 py-1 font-mono text-[11px] tracking-[0.02em] text-ink"
          style={{ backgroundColor: ORANGE }}
        >
          {card.pill}
        </span>
      </div>

      <span
        aria-hidden
        className="mt-5 inline-flex h-12 w-12 items-center justify-center rounded-xl"
        style={{ backgroundColor: CREAM }}
      >
        <Icon name={card.icon} size={28} ground={CREAM} />
      </span>

      <p className="mt-4 font-display text-2xl font-semibold leading-tight">
        {card.title}
      </p>

      <dl className="mt-auto flex flex-col gap-2.5 border-t border-ink/12 pt-4">
        {card.rows.map(([k, v]) => (
          <div key={k} className="flex items-baseline justify-between gap-4">
            <dt className="font-mono text-[11px] tracking-[0.02em] text-ink/50">
              {k}
            </dt>
            <dd className="text-right font-body text-sm text-ink/85">{v}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

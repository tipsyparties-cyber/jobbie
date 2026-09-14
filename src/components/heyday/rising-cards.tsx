"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { Icon } from "@/components/heyday/icon";
import { PAPER, ORANGE, CREAM, BLUE } from "@/lib/palette";

/* ==================================================================== *
 *  The hero's rising cards — design brief A9, B5, and the prototype's
 *  `.cards-panel` at docs/heyday/reference/site/index.html.
 *
 *  A blue panel with hard edges. The eight cards rise through it one at a
 *  time: up from below, a pause at reading height, then out of the top.
 *  Three seconds apart on a 24-second loop, so one card is always at rest
 *  in the middle while the next is on its way.
 *
 *  THIS REPLACES THE CHAIN. Russell asked earlier for one connected strip
 *  that stepped up a card at a time, clipped by the header above and the
 *  next section below; he has now seen the prototype and asked for that
 *  instead. The prototype's panel is a deliberate frame — a bordered blue
 *  window with faint outline shapes behind the cards — rather than a
 *  strip that needs page furniture to clip it, so the occlusion problem
 *  the chain was solving does not arise here at all.
 *
 *  The motion is CSS keyframes, matching kit.css exactly: the timing is
 *  fixed, so there is nothing for JavaScript to decide and the browser
 *  can run it off the main thread. The only thing React does is move the
 *  dots underneath, which have to stay in step with a loop they cannot
 *  observe.
 * ==================================================================== */

export type RisingCard = {
  /** "STEP 2". Geist Mono. */
  step: string;
  title: string;
  /** Two or three label-and-value rows. Example data, and the panel says
   *  so — nothing here is a real booking. */
  rows: [string, string][];
  /** The orange status pill. */
  pill: string;
  /** The step icon, shown in a cream tile. */
  icon: string;
};

/** One card every three seconds, matching the CSS loop. */
const STEP_MS = 3000;

export function RisingCards({
  cards,
  className = "",
}: {
  cards: RisingCard[];
  className?: string;
}) {
  const still = useReducedMotion();
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const [index, setIndex] = useState(0);
  const [running, setRunning] = useState(false);

  /* Only tick while the panel is on screen and the tab is visible. The
     cards themselves are CSS and the browser pauses those for us; the
     dots are ours to stop. */
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

  useEffect(() => {
    if (!running || still) return;
    const t = setInterval(
      () => setIndex((i) => (i + 1) % cards.length),
      STEP_MS
    );
    return () => clearInterval(t);
  }, [running, still, cards.length]);

  return (
    <div ref={wrapRef} className={className}>
      <div
        className="hd-cards-panel"
        role="img"
        aria-label="Example workflow, with example data: an enquiry becomes a quote, a booking, a staffed job, a payment, a review and a rebooking"
        style={{ backgroundColor: BLUE }}
      >
        {/* Faint outline shapes behind the cards (A10, B1), giving the
            panel depth without competing with the card in front. */}
        <div className="hd-outline-rects" aria-hidden>
          <i style={{ left: -120, top: 120, width: 420, height: 560 }} />
          <i style={{ left: 220, top: -160, width: 460, height: 380 }} />
          <i style={{ left: 300, top: 380, width: 420, height: 420 }} />
        </div>

        {cards.map((card, i) => (
          <div
            key={card.step}
            aria-hidden
            className="hd-rc rounded-2xl border-2 border-ink"
            style={
              {
                "--n": i + 1,
                backgroundColor: PAPER,
                boxShadow: "11px 11px 0 0 rgba(10,10,10,0.08)",
              } as React.CSSProperties
            }
          >
            <span className="font-mono text-xs font-medium tracking-[0.08em] text-ink/55">
              {card.step}
            </span>

            <span
              className="grid h-16 w-16 place-items-center rounded-2xl"
              style={{ backgroundColor: CREAM }}
            >
              <Icon name={card.icon} size={46} ground={CREAM} />
            </span>

            <b className="font-display text-[26px] font-extrabold leading-[1.1] tracking-[-0.01em]">
              {card.title}
            </b>

            <dl className="m-0 grid gap-2">
              {card.rows.map(([k, v]) => (
                <div
                  key={k}
                  className="flex justify-between border-b border-ink/10 pb-1.5 text-[14.5px]"
                >
                  <dt className="text-ink/55">{k}</dt>
                  <dd className="m-0 font-semibold">{v}</dd>
                </div>
              ))}
            </dl>

            <span
              className="mt-auto self-start rounded-full border-[1.5px] border-ink px-3.5 py-[7px] font-display text-sm font-bold text-ink"
              style={{ backgroundColor: ORANGE }}
            >
              {card.pill}
            </span>
          </div>
        ))}

        {/* The panel says its own contents are made up, in the corner,
            where a screenshot would carry a caption. */}
        <span className="absolute bottom-[18px] left-6 font-mono text-[11.5px] text-ink/70">
          Example data
        </span>
      </div>

      {/* The eight step dots. */}
      <div className="hd-hline" aria-hidden>
        {cards.map((card, i) => (
          <span key={card.step} className="contents">
            {i > 0 ? <b /> : null}
            <i className={!still && i === index ? "is-on" : undefined} />
          </span>
        ))}
      </div>
    </div>
  );
}

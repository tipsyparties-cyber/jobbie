"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { HeydayMark } from "@/components/heyday/heyday-mark";
import { Wordmark } from "@/components/ui/wordmark";
import { PAPER, CREAM, INK, ORANGE, SKY, SAGE } from "@/lib/palette";

/* ==================================================================== *
 *  The old way / the Heyday way — after anyone.com's comparison.
 *
 *  Russell's idea, and the strongest argument on the homepage, because it
 *  makes his own hero copy watchable rather than assertable. "Always on,
 *  always instant" is a claim; a panel where the work stops at sunset
 *  beside one where it does not is the same claim you can watch happen.
 *
 *  THE SKY IS THE SECTION, NOT THE CARDS. The first version put a sky
 *  inside each panel, which put blue on blue and made the whole cycle
 *  invisible. The day now runs behind the entire section — heading
 *  included — and the two panels sit on it as ordinary paper cards, the
 *  way every other card on the site does. So the sun and moon have room
 *  to cross, and when night falls the section goes dark around the work
 *  rather than inside it.
 *
 *  THE NIGHT IS THE POINT. Both sides move through the same day. At dusk
 *  the old way dims and its work stalls where it stopped — the enquiries
 *  still arrive, they just wait. The Heyday side stays lit and counts
 *  what it handled while nobody was awake.
 *
 *  THE DAY IS TIED TO THE SCROLL, not to a clock. On a timer you could
 *  scroll past at the wrong moment and see nothing happen at all, which
 *  is the one outcome that wastes the section entirely. The section holds
 *  for about one extra screen of scrolling, and the whole cycle plays out
 *  across it, so sunset is something you cause rather than something you
 *  have to wait for.
 *
 *  It holds by going sticky, not by taking the scroll away: the page
 *  keeps moving at exactly the speed the reader is moving it, and the
 *  section simply stays put while they pass. Below 760px it does none of
 *  this — a full-height sticky section on a phone is a section you have
 *  to fight past.
 *
 *  Two things deliberately not copied from anyone.com:
 *
 *  - **No other companies' logos.** Theirs is a wall of Gmail, Zillow and
 *    Realtor marks. The brief forbids using another company's logo until
 *    Jem confirms, so the chips name the CHANNEL. That is the honest
 *    version and the truer one: the problem is six channels, not six
 *    brands.
 *  - **No time claims.** Theirs is "60–90 days" against "~3 weeks".
 *    Heyday has no customers and so no such figure.
 * ==================================================================== */

/**
 * How far past the section you scroll before the day is over. One extra
 * screen: enough to watch the sun cross, short enough that it never feels
 * like the page has stopped working.
 */
const SCROLL_SCREENS = 1.1;

/** Where in the scroll dusk falls, and where the sun and moon hand over. */
const DUSK = 0.58;
const NIGHT_FROM = 0.62;

/**
 * The sky, as stops along the scroll. Every colour is the palette's:
 * pale blue, blue, lavender at dusk, then ink tinted with the brand blue.
 * Nothing reaches for a colour the site does not otherwise use, and
 * nothing reaches for orange — orange is the action colour, and a sunset
 * in it would pull the eye off the workflow in front of it.
 */
const SKY_STOPS: [number, string][] = [
  [0, "#C2D5EE"],
  [0.16, "#93B7E8"],
  [0.44, "#93B7E8"],
  [DUSK, "#D6D0F5"],
  [0.74, "#232932"],
  [1, "#232932"],
];

const clamp01 = (n: number) => Math.min(1, Math.max(0, n));

/** Sample the sky at a point in the scroll. */
function skyAt(t: number): string {
  let i = 0;
  while (i < SKY_STOPS.length - 2 && t > SKY_STOPS[i + 1][0]) i++;
  const [t0, c0] = SKY_STOPS[i];
  const [t1, c1] = SKY_STOPS[i + 1];
  const k = t1 === t0 ? 0 : clamp01((t - t0) / (t1 - t0));
  const hex = (c: string) => [1, 3, 5].map((n) => parseInt(c.slice(n, n + 2), 16));
  const [r0, g0, b0] = hex(c0);
  const [r1, g1, b1] = hex(c1);
  const mix = (a: number, b: number) => Math.round(a + (b - a) * k);
  return `rgb(${mix(r0, r1)}, ${mix(g0, g1)}, ${mix(b0, b1)})`;
}

/**
 * Where a body sits at time `t`, across a window of the scroll.
 *
 * Left to right, arcing over the top — which is the direction a reader
 * already takes as time passing, whatever a compass would say about it.
 */
function arc(t: number, from: number, to: number) {
  const k = (t - from) / (to - from);
  if (k < -0.08 || k > 1.08) return null;
  return {
    left: `${-6 + k * 112}%`,
    top: `${64 - Math.sin(clamp01(k) * Math.PI) * 52}%`,
    opacity: k < 0 ? 1 + k / 0.08 : k > 1 ? 1 - (k - 1) / 0.08 : 1,
  };
}

/** The messy side. Channels, never brands. */
const MESSY: { text: string; via: string; unread?: number; lost?: boolean }[] = [
  { text: "Is the date still free?", via: "Email", unread: 12 },
  { text: "What would 80 guests cost?", via: "WhatsApp", unread: 6 },
  { text: "Can you do a class instead?", via: "Booking form" },
  { text: "No answer — try calling?", via: "Phone", lost: true },
  { text: "Who's working Saturday?", via: "Group chat", unread: 9 },
  { text: "Did they ever sign the terms?", via: "Email" },
  { text: "Where's that deposit email?", via: "Email", lost: true },
];

/** The Heyday side. What it is doing, all night included. */
const DOING = [
  "Replying to an enquiry",
  "Sending a quote",
  "Taking the deposit",
  "Offering Saturday's shift",
  "Chasing a balance",
  "Asking for the review",
];

export function OldWayNewWay() {
  const still = useReducedMotion();
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const [t, setT] = useState(0);
  /* Sticky only where there is room for it. Below 760px the section is an
     ordinary block and holds at midday. */
  const [pinned, setPinned] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 760px)");
    const sync = () => setPinned(mq.matches && !still);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, [still]);

  /* The day, read off the scroll. One listener, rAF-throttled: the whole
     section is derived from this number, so the sky, the sun and the work
     cannot drift out of step with each other. */
  useEffect(() => {
    const el = wrapRef.current;
    /* Nothing to do when the section is not playing. `t` is never read in
       that case — every value below is guarded on `pinned` — so there is
       no state to reset, and resetting it here would be a setState in an
       effect body, which the React compiler rejects. */
    if (!el || !pinned) return;
    let frame = 0;
    const measure = () => {
      frame = 0;
      const r = el.getBoundingClientRect();
      const travel = el.offsetHeight - window.innerHeight;
      setT(travel > 0 ? clamp01(-r.top / travel) : 0);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(measure);
    };
    /* The first measurement goes through the same frame as every other
       one, rather than running synchronously inside the effect. */
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [pinned]);

  const night = pinned && t >= NIGHT_FROM;

  /* The old way only works in daylight. Its progress is measured against
     the daylight part of the scroll, so it fills as the sun crosses and
     stops dead the moment the sun goes down. */
  const messyDone = !pinned
    ? MESSY.length
    : Math.floor(clamp01(t / DUSK) * (MESSY.length + 0.999));

  /* Heyday's does not stop, so this one runs on the whole scroll. */
  const doingIndex = !pinned
    ? 0
    : Math.floor(t * DOING.length * 2.5) % DOING.length;
  const overnight = night
    ? Math.max(1, Math.round(((t - NIGHT_FROM) / (1 - NIGHT_FROM)) * 23))
    : 0;

  /* On ink, cream. The heading and the section's own copy sit directly on
     the sky, so they have to turn over with it. The panels are paper, so
     everything inside them stays ink throughout. */
  const onSky = night ? CREAM : INK;

  return (
    /* The tall outer block is the scroll distance the day is played
       across. The screen inside it sticks, so the page keeps moving at
       exactly the speed the reader is moving it while the sun crosses. */
    <div
      ref={wrapRef}
      className="relative"
      style={
        pinned
          ? { height: `calc(100vh + ${SCROLL_SCREENS * 100}vh)` }
          : undefined
      }
    >
      <div
        className={
          pinned
            ? "sticky top-0 flex h-screen flex-col justify-center overflow-hidden"
            : "relative overflow-hidden py-[120px]"
        }
        style={{
          backgroundColor: pinned ? skyAt(t) : "#93B7E8",
          /* No transition: the colour is driven by the scroll, and a
             transition on top of that lags behind the sun. */
        }}
      >
        <Sky t={t} pinned={pinned} />

        <div className="relative z-[1] mx-auto w-full max-w-[1280px] px-[clamp(16px,4vw,48px)]">
        {/* The heading turns over with the sky. */}
        <div
          className="text-center"
          style={{ color: onSky, transition: "color .8s ease" }}
        >
          <p
            className="hd-label justify-center"
            style={{ color: night ? "#CFC7BC" : undefined }}
          >
            the difference
          </p>
          <h2 className="hd-h2 mx-auto max-w-[22ch]">
            Same day. <span className="hd-hl text-ink">Same night.</span>
          </h2>
          <p
            className="mx-auto mb-12 max-w-[60ch] text-[18px]"
            style={{ color: night ? "#D9D1C6" : "#57514A", transition: "color .8s ease" }}
          >
            Watch what happens to each of them when the sun goes down.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {/* ---- The old way ---- */}
          <Panel
            heading="The old way"
            line="Six apps, a group chat, and it stops when you sleep."
            onSky={onSky}
            night={night}
            dim={night}
          >
            <div className="grid gap-2.5">
              {MESSY.map((m, i) => {
                const done = i < messyDone;
                return (
                  <div
                    key={m.text}
                    className="flex items-center gap-2.5"
                    style={{
                      opacity: done ? 1 : 0.22,
                      transition: still ? "none" : "opacity .5s ease",
                    }}
                  >
                    <span
                      className="w-[92px] flex-none rounded-full border border-ink px-2 py-0.5 text-center font-mono text-[10px] font-semibold"
                      style={{ backgroundColor: CREAM }}
                    >
                      {m.via}
                    </span>
                    <span
                      className="min-w-0 flex-1 truncate rounded-xl border-2 border-ink px-3 py-2 text-[13.5px]"
                      style={{
                        backgroundColor: PAPER,
                        boxShadow: "3px 3px 0 0 rgba(10,10,10,0.08)",
                      }}
                    >
                      {m.text}
                    </span>
                    {m.unread ? (
                      <span
                        aria-hidden
                        className="grid h-5 w-5 flex-none place-items-center rounded-full border border-ink font-mono text-[10px] font-bold"
                        style={{ backgroundColor: ORANGE }}
                      >
                        {m.unread}
                      </span>
                    ) : (
                      <span aria-hidden className="w-5 flex-none" />
                    )}
                    {m.lost ? (
                      <span
                        aria-hidden
                        className="w-3 flex-none font-mono text-sm font-bold text-ink/40"
                      >
                        ✕
                      </span>
                    ) : (
                      <span aria-hidden className="w-3 flex-none" />
                    )}
                  </div>
                );
              })}
            </div>

            <Verdict
              night={night}
              dayText="You, doing all of it, between jobs."
              nightText="Asleep. The enquiries still arrive — they just wait."
              stopped
            />
          </Panel>

          {/* ---- The Heyday way ---- */}
          <Panel
            heading="The Heyday way"
            line="One workflow. It doesn’t stop."
            onSky={onSky}
            night={night}
          >
            <div className="flex flex-col items-center gap-4 py-6">
              <Chip>You</Chip>
              <Arrow />

              <div
                className="flex items-center gap-2.5 rounded-full border-2 border-ink px-6 py-3"
                style={{
                  backgroundColor: PAPER,
                  boxShadow: "8px 8px 0 0 rgba(10,10,10,0.14)",
                }}
              >
                <HeydayMark size={26} sun={SKY} />
                <Wordmark height={20} asLink={false} className="text-ink" />
              </div>

              {/* What it is doing right now — and it keeps saying
                  something after dark, which is the whole argument in one
                  line of text. */}
              <p
                aria-live="off"
                className="m-0 flex items-center gap-2 rounded-full border border-ink px-3 py-1 font-mono text-[11px]"
                style={{ backgroundColor: CREAM }}
              >
                <span
                  aria-hidden
                  className="h-1.5 w-1.5 rounded-full"
                  style={{ backgroundColor: SAGE }}
                />
                {DOING[doingIndex]}…
              </p>

              <Arrow />
              <Chip solid>Booked</Chip>
            </div>

            <Verdict
              night={night}
              dayText="Quoting, booking and chasing while you work."
              nightText={
                overnight
                  ? `Still going. ${overnight} things handled since sunset.`
                  : "Still going."
              }
            />
          </Panel>
          </div>
        </div>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------- */

/**
 * One side: a heading that sits on the sky, and a paper card that does
 * not. Everything inside the card stays ink whatever the sky is doing,
 * which is why the card is paper rather than tinted.
 */
function Panel({
  heading,
  line,
  onSky,
  night,
  dim = false,
  children,
}: {
  heading: string;
  line: string;
  onSky: string;
  night: boolean;
  /** Dim the work at night. True on the old way, never on Heyday's. */
  dim?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div>
      <div style={{ color: onSky, transition: "color .8s ease" }}>
        <h3 className="m-0 font-display text-[22px] font-bold">{heading}</h3>
        <p
          className="mb-4 mt-1 text-[15px]"
          style={{
            color: night ? "#D9D1C6" : "#57514A",
            transition: "color .8s ease",
          }}
        >
          {line}
        </p>
      </div>

      {/* The brand's own panel: paper, one ink hairline, 40px corners and
          a hard shadow that never blurs. */}
      <div
        className="rounded-[40px] border border-ink p-6"
        style={{
          backgroundColor: PAPER,
          boxShadow: "6px 10px 0 0 rgba(10,10,10,0.18)",
          /* The lights going off on the old way. Not so far that it
             becomes unreadable — the point is that the work has stopped,
             not that you cannot see it. */
          opacity: dim ? 0.5 : 1,
          transition: "opacity .8s ease",
        }}
      >
        {children}
      </div>
    </div>
  );
}

/** The sun, the moon and a few clouds, across the whole section. */
function Sky({ t, pinned }: { t: number; pinned: boolean }) {
  /* Midday when the section is not playing: the sun up, no moon. */
  const sun = pinned ? arc(t, 0, DUSK + 0.06) : { left: "46%", top: "18%", opacity: 1 };
  const moon = pinned ? arc(t, DUSK, 1.06) : null;

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {[
        { top: "8%", size: 54, dur: "52s" },
        { top: "26%", size: 34, dur: "74s" },
        { top: "62%", size: 44, dur: "64s" },
      ].map((row) => (
        <div
          key={row.top}
          className="hd-cloud-drift absolute flex w-[200%] gap-[14%]"
          style={{ top: row.top, animationDuration: row.dur }}
        >
          {Array.from({ length: 10 }).map((_, i) => (
            <span
              key={i}
              className="block flex-none rounded-full"
              style={{
                width: row.size * 2.6,
                height: row.size,
                backgroundColor: PAPER,
                opacity: 0.4,
              }}
            />
          ))}
        </div>
      ))}

      {/* The sun is the Heyday mark itself, in paper — never black and
          never orange, per A11, and paper is its colour on a blue
          ground. */}
      {sun ? (
        <span
          className="absolute block h-20 w-20"
          style={{ left: sun.left, top: sun.top, opacity: sun.opacity }}
        >
          <HeydayMark size={80} sun={PAPER} />
        </span>
      ) : null}

      {/* The moon: a disc with a bite out of it, in sky on the dark. */}
      {moon ? (
        <span
          className="absolute block h-14 w-14"
          style={{ left: moon.left, top: moon.top, opacity: moon.opacity }}
        >
        <svg viewBox="0 0 56 56" width={56} height={56}>
          <defs>
            <mask id="hd-moon-mask">
              <rect width="56" height="56" fill="#fff" />
              <circle cx="38" cy="19" r="21" fill="#000" />
            </mask>
          </defs>
          <circle cx="28" cy="28" r="21" fill={SKY} mask="url(#hd-moon-mask)" />
          </svg>
        </span>
      ) : null}
    </div>
  );
}

/** The line at the foot of each panel that changes at dusk. */
function Verdict({
  night,
  dayText,
  nightText,
  stopped = false,
}: {
  night: boolean;
  dayText: string;
  nightText: string;
  stopped?: boolean;
}) {
  const off = night && stopped;
  return (
    <p
      className="m-0 mt-4 flex items-center gap-2 rounded-xl border px-3 py-2 font-mono text-[11.5px]"
      style={{
        backgroundColor: off ? CREAM : PAPER,
        borderColor: off ? "rgba(10,10,10,0.2)" : INK,
        color: off ? "rgba(10,10,10,0.5)" : INK,
        transition: "all .6s ease",
      }}
    >
      <span
        aria-hidden
        className="h-2 w-2 flex-none rounded-full"
        style={{ backgroundColor: off ? "rgba(10,10,10,0.25)" : SAGE }}
      />
      {night ? nightText : dayText}
    </p>
  );
}

function Chip({
  children,
  solid = false,
}: {
  children: React.ReactNode;
  solid?: boolean;
}) {
  return (
    <span
      className="rounded-full border-2 border-ink px-5 py-2 font-display text-sm font-bold"
      style={{
        backgroundColor: solid ? INK : PAPER,
        color: solid ? CREAM : INK,
        boxShadow: "4px 4px 0 0 rgba(10,10,10,0.12)",
      }}
    >
      {children}
    </span>
  );
}

function Arrow() {
  return (
    <span aria-hidden className="font-mono text-lg text-ink/40">
      ↓
    </span>
  );
}

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
 *  makes his own hero copy visible. "Always on, always instant" is a
 *  claim; a panel where the work stops at sunset beside one where it does
 *  not is the same claim you can watch happen.
 *
 *  THE NIGHT IS THE POINT. Both sides move through the same day. At dusk
 *  the old way greys out and nothing more happens until dawn — the
 *  enquiries still arrive, they just sit there. The Heyday side keeps
 *  going and counts what it did while nobody was awake.
 *
 *  Two things this does NOT copy from anyone.com:
 *
 *  - **No other companies' logos.** Theirs is a wall of Gmail, Zillow and
 *    Realtor marks. The brief forbids using another company's logo until
 *    Jem confirms it is allowed, so the chips name the CHANNEL — email,
 *    WhatsApp, a text, the phone — which is the honest version and also
 *    the true one: the problem is six channels, not six brands.
 *  - **No time claims.** Theirs says "60–90 days" against "~3 weeks".
 *    Heyday has no customers and therefore no such figure, so this
 *    section argues from shape rather than from numbers.
 *
 *  One 32-second cycle, driven by CSS for the sky and by a single
 *  interval here for the work. The work advances on the old side only in
 *  daylight, which is the whole idea expressed in about four lines.
 * ==================================================================== */

/** The 32s sky cycle, and where dusk falls in it. */
const CYCLE_MS = 32_000;
const NIGHT_FROM = 0.52;
const NIGHT_TO = 0.96;

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

/** The Heyday side. What it is doing, one at a time, all night included. */
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
  const ref = useRef<HTMLDivElement | null>(null);
  const [running, setRunning] = useState(false);
  const [t, setT] = useState(0);

  useEffect(() => {
    const el = ref.current;
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

  /* One clock. Everything below is derived from it, so the two panels can
     never drift out of step with the sky above them. */
  useEffect(() => {
    if (!running || still) return;
    const start = performance.now();
    const id = setInterval(() => {
      setT(((performance.now() - start) % CYCLE_MS) / CYCLE_MS);
    }, 120);
    return () => clearInterval(id);
  }, [running, still]);

  const night = !still && t >= NIGHT_FROM && t < NIGHT_TO;

  /* The old way only works in daylight. Progress is measured against the
     daylight part of the cycle, so it stalls the moment the sun goes
     down and picks up at dawn exactly where it stopped. */
  const daylight = Math.min(1, t / NIGHT_FROM);
  const messyDone = still ? MESSY.length : Math.floor(daylight * (MESSY.length + 1));

  /* Heyday's clock never stops, so this one runs on the whole cycle. */
  const doingIndex = still ? 0 : Math.floor(t * DOING.length * 4) % DOING.length;
  /* What it got through overnight. Counts only while it is dark. */
  const overnight = night
    ? Math.max(1, Math.floor(((t - NIGHT_FROM) / (NIGHT_TO - NIGHT_FROM)) * 23))
    : 0;

  return (
    <div ref={ref} className="grid gap-6 lg:grid-cols-2">
      {/* ---- The old way ---- */}
      <Panel
        heading="The old way"
        line="Six apps, a group chat, and it stops when you sleep."
        dim={night}
      >
        <div className="relative z-[1] grid gap-2.5">
          {MESSY.map((m, i) => {
            const done = i < messyDone;
            return (
              <div
                key={m.text}
                className="flex items-center gap-2.5"
                style={{
                  opacity: done ? 1 : 0.25,
                  transition: still ? "none" : "opacity .5s ease",
                }}
              >
                <span
                  className="flex-none rounded-full border border-ink px-2 py-0.5 font-mono text-[10px] font-semibold"
                  style={{ backgroundColor: CREAM }}
                >
                  {m.via}
                </span>
                <span
                  className="min-w-0 flex-1 truncate rounded-xl border border-ink px-3 py-2 text-[13.5px]"
                  style={{ backgroundColor: PAPER }}
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
                ) : null}
                {m.lost ? (
                  <span
                    aria-hidden
                    className="flex-none font-mono text-sm font-bold text-ink/45"
                    title="Nothing happened"
                  >
                    ✕
                  </span>
                ) : null}
              </div>
            );
          })}
        </div>

        {/* At dusk the whole side stops, and says so. */}
        <Verdict
          night={night}
          dayText="You, doing all of it, between jobs."
          nightText="Asleep. The enquiries still arrive — they just wait."
          nightTone="stopped"
        />
      </Panel>

      {/* ---- The Heyday way ---- */}
      <Panel
        heading="The Heyday way"
        line="One workflow. It doesn’t stop."
      >
        <div className="relative z-[1] flex flex-col items-center gap-4 py-2">
          <Chip>You</Chip>
          <Arrow />

          {/* The one pill everything goes through. */}
          <div
            className="flex items-center gap-2.5 rounded-full border-2 border-ink px-6 py-3"
            style={{
              backgroundColor: PAPER,
              boxShadow: "6px 6px 0 0 rgba(10,10,10,0.14)",
            }}
          >
            <HeydayMark size={26} sun={SKY} />
            <Wordmark height={20} asLink={false} className="text-ink" />
          </div>

          {/* What it is doing right now. Changes whether it is day or
              night, which is the entire argument in one line of text. */}
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
          nightTone="running"
        />
      </Panel>
    </div>
  );
}

/* -------------------------------------------------------------------- */

/** One side, with its own sky behind it. */
function Panel({
  heading,
  line,
  dim = false,
  children,
}: {
  heading: string;
  line: string;
  /** Dim the work at night. True on the old way, never on Heyday's. */
  dim?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div>
      <h3 className="m-0 font-display text-[22px] font-bold">{heading}</h3>
      <p className="mb-4 mt-1 text-[15px] text-ink/60">{line}</p>

      <div
        className="hd-sky relative overflow-hidden rounded-[40px] border border-ink p-6"
        style={{ boxShadow: "6px 10px 0 0 rgba(10,10,10,0.08)", minHeight: 340 }}
      >
        <Sky />
        {/* Everything in front of the sky sits on its own card, so the
            text stays readable at every point in the cycle rather than
            fighting a background that changes under it. */}
        <div
          className="relative z-[1] rounded-3xl border border-ink/15 p-4"
          style={{
            backgroundColor: PAPER,
            /* The lights going off on the old way. Not so far that it
               becomes unreadable — the point is that the work has
               stopped, not that you cannot see it. */
            opacity: dim ? 0.55 : 1,
            transition: "opacity .8s ease",
          }}
        >
          {children}
        </div>
      </div>
    </div>
  );
}

/** The sun, the moon and a few clouds. */
function Sky() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0">
      {/* Clouds. Two rows, drifting, doubled so the loop has no seam. */}
      {[
        { top: "12%", size: 46, dur: "46s" },
        { top: "34%", size: 30, dur: "62s" },
      ].map((row) => (
        <div
          key={row.top}
          className="hd-cloud-drift absolute flex w-[200%] gap-[18%]"
          style={{ top: row.top, animationDuration: row.dur }}
        >
          {Array.from({ length: 8 }).map((_, i) => (
            <span
              key={i}
              className="block flex-none rounded-full"
              style={{
                width: row.size * 2.4,
                height: row.size,
                backgroundColor: PAPER,
                opacity: 0.45,
              }}
            />
          ))}
        </div>
      ))}

      {/* The sun is the Heyday mark, in paper — never orange, per A11,
          and paper is the sun's colour on a blue ground. */}
      <span className="hd-sun-arc absolute left-0 top-[18%] block h-14 w-14">
        <HeydayMark size={56} sun={PAPER} />
      </span>

      {/* The moon: a plain disc with a bite out of it, in sky on ink. */}
      <span className="hd-moon-arc absolute left-0 top-[18%] block h-10 w-10">
        <svg viewBox="0 0 40 40" width={40} height={40}>
          <defs>
            <mask id="hd-moon-mask">
              <rect width="40" height="40" fill="#fff" />
              <circle cx="27" cy="14" r="15" fill="#000" />
            </mask>
          </defs>
          <circle cx="20" cy="20" r="15" fill={SKY} mask="url(#hd-moon-mask)" />
        </svg>
      </span>
    </div>
  );
}

/** The line under each panel that changes at dusk. */
function Verdict({
  night,
  dayText,
  nightText,
  nightTone,
}: {
  night: boolean;
  dayText: string;
  nightText: string;
  nightTone: "stopped" | "running";
}) {
  const stopped = night && nightTone === "stopped";
  return (
    <p
      className="relative z-[1] m-0 mt-4 flex items-center gap-2 rounded-xl border px-3 py-2 font-mono text-[11.5px]"
      style={{
        backgroundColor: stopped ? CREAM : PAPER,
        borderColor: stopped ? "rgba(10,10,10,0.2)" : INK,
        color: stopped ? "rgba(10,10,10,0.5)" : INK,
        transition: "all .6s ease",
      }}
    >
      <span
        aria-hidden
        className="h-2 w-2 flex-none rounded-full"
        style={{
          backgroundColor: stopped
            ? "rgba(10,10,10,0.25)"
            : night
              ? SAGE
              : SAGE,
        }}
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
      }}
    >
      {children}
    </span>
  );
}

function Arrow() {
  return (
    <span aria-hidden className="font-mono text-lg text-ink/45">
      ↓
    </span>
  );
}

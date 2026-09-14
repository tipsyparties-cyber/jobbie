"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { PAPER, CREAM, ORANGE, SAGE, BLUE, LAVENDER } from "@/lib/palette";

/* ==================================================================== *
 *  The one-inbox animation — the hero picture on /features/inbox.
 *
 *  Russell asked for anyone.com's "Keep every chat in one place": a card
 *  of conversations that arrive one at a time, each with the channel it
 *  came in on and an unread count.
 *
 *  Built from his screenshot rather than from the live site — the browser
 *  extension was not connected, so this is not a measured copy. The
 *  arrangement is theirs; the content is ours.
 *
 *  **Nobody in it has a name.** anyone.com's version lists people —
 *  Arnold Aldridge, Emily Carter — and it works for them because their
 *  product is about named agents and sellers. Spec A7 forbids it here:
 *  people in Heyday's pictures are shown by role, never by an invented
 *  name, because an invented name in a product screenshot is an invented
 *  customer.
 *
 *  That turns out to suit the feature better anyway. The thing One inbox
 *  actually does is sort messages by WHO is getting in touch — a new
 *  enquiry, a booked customer, a missed caller — so the row's first line
 *  being the lead type rather than a name is the feature, not a
 *  compromise.
 * ==================================================================== */

type Row = {
  /** The lead type. This is what the feature sorts by. */
  who: string;
  /** What they said, in the fewest words that carry it. */
  about: string;
  /** Which channel it arrived on. */
  channel: "Email" | "WhatsApp" | "Text" | "Call" | "Booking page";
  /** Unread count. Undefined where there is nothing waiting. */
  unread?: number;
};

const ROWS: Row[] = [
  { who: "New enquiry", about: "Saturday, 80 guests", channel: "Email", unread: 2 },
  { who: "Current customer", about: "Can we add ten more?", channel: "WhatsApp", unread: 1 },
  { who: "Missed call", about: "Called twice, 9:42am", channel: "Call", unread: 1 },
  { who: "Past customer", about: "Booking again for March", channel: "Text" },
  { who: "New enquiry", about: "A class for ten", channel: "Booking page", unread: 3 },
];

/** One flat colour per channel, from the palette. Never orange: orange is
 *  the action colour, and a channel dot is not an action. */
const CHANNEL_COLOUR: Record<Row["channel"], string> = {
  Email: BLUE,
  WhatsApp: SAGE,
  Text: LAVENDER,
  Call: CREAM,
  "Booking page": BLUE,
};

/** How long each row waits before the next arrives. */
const STEP_MS = 620;
/** How long the full list rests before it plays again. */
const REST_MS = 3200;

export function InboxAnimation() {
  const still = useReducedMotion();
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const [shown, setShown] = useState(0);
  const [running, setRunning] = useState(false);

  /* Under reduced motion, and before the effect has run, every row is
     there. A picture that starts empty and needs JavaScript to fill is a
     picture that is sometimes just empty. */
  const visible = still || !running ? ROWS.length : shown;

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
    let cancelled = false;
    let timer: ReturnType<typeof setTimeout>;

    const tick = (n: number) => {
      if (cancelled) return;
      setShown(n);
      /* Fill the list one row at a time, hold it, then start again. The
         rest is what makes it read as "here is your inbox" rather than as
         a loading spinner. */
      const wait = n >= ROWS.length ? REST_MS : STEP_MS;
      timer = setTimeout(() => tick(n >= ROWS.length ? 0 : n + 1), wait);
    };

    tick(0);
    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, [running, still]);

  return (
    <div ref={wrapRef} className="w-full">
      <p className="mb-6 text-center font-display text-[26px] font-bold leading-tight tracking-[-0.02em]">
        Keep every message <span className="hd-hl">in one place</span>
      </p>

      <div
        className="relative mx-auto w-full max-w-[380px] rounded-2xl border-2 border-ink p-3"
        style={{
          backgroundColor: PAPER,
          boxShadow: "11px 11px 0 0 rgba(10,10,10,0.14)",
        }}
      >
        {/* One list, described once for a screen reader. The rows arriving
            is decoration; the list is the content. */}
        <ul
          className="m-0 list-none p-0"
          aria-label="Example inbox: five conversations from five different channels, in one list"
        >
          {ROWS.map((r, i) => {
            const on = i < visible;
            return (
              <li
                key={`${r.who}-${r.about}`}
                className="flex items-center gap-3 border-b border-ink/10 px-1 py-2.5 last:border-b-0"
                style={{
                  opacity: on ? 1 : 0,
                  transform: on ? "none" : "translateY(10px)",
                  transition: still
                    ? "none"
                    : "opacity .45s cubic-bezier(.215,.61,.355,1), transform .45s cubic-bezier(.215,.61,.355,1)",
                }}
              >
                {/* The avatar. A flat tile rather than a face: there is no
                    real person here and a stock portrait would imply one. */}
                <span className="relative flex-none" aria-hidden>
                  <span
                    className="grid h-11 w-11 place-items-center rounded-full border-2 border-ink font-display text-sm font-bold"
                    style={{ backgroundColor: CREAM }}
                  >
                    {r.who.slice(0, 1)}
                  </span>
                  {/* The channel badge, bottom-right of the avatar. */}
                  <span
                    className="absolute -bottom-0.5 -right-0.5 grid h-[18px] w-[18px] place-items-center rounded-full border-[1.5px] border-ink font-mono text-[9px] font-bold"
                    style={{ backgroundColor: CHANNEL_COLOUR[r.channel] }}
                  >
                    {r.channel.slice(0, 1)}
                  </span>
                </span>

                <span className="min-w-0 flex-1">
                  <b className="block truncate font-display text-[15px] font-bold leading-tight">
                    {r.who}
                  </b>
                  <span className="block truncate text-[13px] text-ink/55">
                    {r.channel} · {r.about}
                  </span>
                </span>

                {r.unread ? (
                  <span
                    aria-hidden
                    className="grid h-6 w-6 flex-none place-items-center rounded-full border-[1.5px] border-ink font-mono text-[11px] font-bold text-ink"
                    style={{
                      backgroundColor: ORANGE,
                      /* The badge lands a beat after its row, which is
                         what makes a message feel like it arrived rather
                         than like it was always there. */
                      transform: on ? "scale(1)" : "scale(0)",
                      transition: still
                        ? "none"
                        : "transform .35s cubic-bezier(.34,1.56,.64,1) .2s",
                    }}
                  >
                    {r.unread}
                  </span>
                ) : null}
              </li>
            );
          })}
        </ul>
      </div>

      <p className="mt-4 text-center font-mono text-[11px] text-ink/55">
        Illustration · example data
      </p>
    </div>
  );
}

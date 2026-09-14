"use client";

import { useId, useRef, useState } from "react";
import Link from "next/link";
import { GOALS, GOAL_QUOTE } from "@/lib/home-goals";
import { statByRow } from "@/lib/stats-bank";
import { HoldingImage } from "@/components/heyday/holding-image";
import {
  Screen,
  ScreenRow,
  ScreenAction,
  FloatingStat,
} from "@/components/heyday/screen";
import { PAPER } from "@/lib/palette";

/* ==================================================================== *
 *  GoalTabs — spec part 1, homepage section 3a.
 *
 *  Five pills, one panel. Picking a pill swaps the picture, the floating
 *  stat cards and the words. getjobber.com's device, in Heyday's clothes.
 *
 *  It is a real tab list, not five buttons that look like one: roving
 *  tabindex, left and right arrows, `aria-controls` pointing at panels
 *  that are genuinely hidden when they are not chosen. A visitor using a
 *  keyboard reaches five things here, not five hundred.
 *
 *  The swap animation runs off a key change rather than a class toggle, so
 *  React remounts the panel's children and the CSS animation restarts —
 *  the same effect kit.js gets by forcing a reflow.
 * ==================================================================== */

export function GoalTabs() {
  const [active, setActive] = useState(0);
  const base = useId().replace(/:/g, "");
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const move = (dir: number) => {
    const next = (active + dir + GOALS.length) % GOALS.length;
    setActive(next);
    tabRefs.current[next]?.focus();
  };

  return (
    <>
      <div
        role="tablist"
        aria-label="What do you want more of?"
        className="mb-[30px] mt-2 flex flex-wrap justify-center gap-2.5"
      >
        {GOALS.map((g, i) => {
          const on = i === active;
          return (
            <button
              key={g.id}
              ref={(el) => {
                tabRefs.current[i] = el;
              }}
              role="tab"
              id={`${base}-tab-${g.id}`}
              aria-selected={on}
              aria-controls={`${base}-panel-${g.id}`}
              tabIndex={on ? 0 : -1}
              onClick={() => setActive(i)}
              onKeyDown={(e) => {
                if (e.key === "ArrowRight") {
                  e.preventDefault();
                  move(1);
                } else if (e.key === "ArrowLeft") {
                  e.preventDefault();
                  move(-1);
                }
              }}
              className="h-12 cursor-pointer border border-ink px-5 font-display text-[15px] font-semibold text-ink transition-[border-radius,background-color,color] duration-200 hover:rounded-[28px] focus-visible:rounded-[28px] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[3px] focus-visible:outline-ink"
              style={{
                borderRadius: on ? 28 : 8,
                backgroundColor: on ? "#0A0A0A" : PAPER,
                color: on ? "#F2E9E1" : "#0A0A0A",
              }}
            >
              {g.pill}
            </button>
          );
        })}
      </div>

      {GOALS.map((g, i) => {
        const on = i === active;
        const stat = g.stat ? statByRow(g.stat) : null;
        return (
          <div
            key={g.id}
            role="tabpanel"
            id={`${base}-panel-${g.id}`}
            aria-labelledby={`${base}-tab-${g.id}`}
            hidden={!on}
            className="hd-goal-panel grid overflow-hidden rounded-[40px] border border-ink text-left lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]"
            style={{
              backgroundColor: PAPER,
              boxShadow: "6px 10px 0 0 rgba(10,10,10,0.08)",
            }}
          >
            {/* The picture half. Its ground is the goal's colour, so the
                panel changes mood with the pill. */}
            <div
              key={`${g.id}-pic-${active}`}
              className="relative min-h-[430px] overflow-hidden lg:min-h-[470px]"
              style={{ backgroundColor: g.colour }}
            >
              <HoldingImage
                art={g.art}
                ratio="auto"
                tint={g.colour}
                radius={0}
                className="!absolute right-0 top-11 bottom-0 w-[64%] !border-2 !border-b-0 !border-r-0"
                style={{ borderRadius: "16px 0 0 0" }}
              />

              <div className="hd-goal-in absolute left-6 top-7 z-[2] grid gap-3">
                {g.cards.map((c, j) => (
                  <div key={c.label} style={{ ["--i" as string]: j }}>
                    <FloatingStat
                      label={c.label}
                      value={c.value}
                      change={c.change}
                    />
                  </div>
                ))}
              </div>

              <div
                className="hd-goal-in absolute bottom-8 right-7 z-[1] w-[min(62%,330px)]"
                style={{ ["--i" as string]: 3 }}
              >
                <Screen title={g.screen.title} caption="Illustration · example data">
                  {g.screen.rows.map((r) => (
                    <ScreenRow key={r.text} meta={r.meta} hot={r.hot}>
                      {r.text}
                    </ScreenRow>
                  ))}
                  <ScreenAction>{g.screen.action}</ScreenAction>
                </Screen>
              </div>

              <p className="absolute bottom-3.5 left-6 z-[2] m-0 font-mono text-[11px] text-ink/75">
                Illustration · example data
              </p>
            </div>

            {/* The words half. */}
            <div
              key={`${g.id}-txt-${active}`}
              className="hd-goal-in flex flex-col items-start gap-3.5 px-6 py-8 lg:px-10 lg:py-11"
            >
              <h3
                className="m-0 font-display font-bold leading-[1.1] tracking-[-0.02em]"
                style={{ ["--i" as string]: 0, fontSize: "clamp(26px, 2.6vw, 34px)" }}
              >
                {g.heading}
              </h3>
              <p className="m-0 text-ink/65" style={{ ["--i" as string]: 1 }}>
                {g.line}
              </p>
              <Link
                href={g.cta.href}
                style={{ ["--i" as string]: 2 }}
                className="inline-flex h-[54px] items-center gap-2 rounded-lg border border-ink bg-ink px-[22px] font-display text-base font-semibold text-cream transition-[border-radius] duration-200 hover:rounded-[28px] focus-visible:rounded-[28px] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[3px] focus-visible:outline-ink"
              >
                {g.cta.label} →
              </Link>

              <hr
                className="my-3 w-full border-0 border-t-[1.5px] border-ink/20"
                style={{ ["--i" as string]: 3 }}
              />

              {stat ? (
                <div style={{ ["--i" as string]: 4 }}>
                  <b className="mb-1 block font-display text-base font-bold leading-[1.35]">
                    {stat.claim}
                  </b>
                  <small className="font-mono text-[11.5px] leading-[1.4] text-ink/55">
                    {stat.source} · {stat.covers} · {stat.kind}
                  </small>
                </div>
              ) : (
                <p
                  className="m-0 font-mono text-[11.5px] leading-[1.4] text-ink/55"
                  style={{ ["--i" as string]: 4 }}
                >
                  No credible published figure for this one yet, so there
                  isn&rsquo;t one here.
                </p>
              )}

              <div
                className="mt-1.5 flex items-center gap-3.5"
                style={{ ["--i" as string]: 5 }}
              >
                <span
                  aria-hidden
                  className="h-14 w-14 flex-none rounded-full border-2 border-ink"
                  style={{
                    background: `color-mix(in srgb, ${g.colour} 55%, ${PAPER})`,
                  }}
                />
                <p className="m-0 text-[15px] text-ink/65">
                  {GOAL_QUOTE(g.pill.toLowerCase())}
                  <b className="block font-display text-sm font-semibold text-ink">
                    Placeholder
                  </b>
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
}

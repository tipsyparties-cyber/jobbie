"use client";

import { useEffect, useRef, useState } from "react";
import { Panel, Card } from "@/components/ui/surfaces";
import { Button } from "@/components/ui/button";
import { ScreenAction } from "@/components/heyday/screen";
import { SectionReveal } from "@/components/heyday/motion";
import { SheetLabel } from "@/components/heyday/sheet";
import { AI_DIAL } from "@/lib/home-content";
import { INK, CREAM, PAPER, SAGE, BLUE, LAVENDER } from "@/lib/palette";
import s from "./ai-dial.module.css";

/* ==================================================================== *
 *  AiDial — homepage section 9, "How much it does for you".
 *
 *  Built from Russell's section 9 pack (docs/heyday/reference/section-9).
 *  Jobber and HoneyBook sell automation as all-or-nothing; in Heyday every
 *  product runs at a level the owner sets. A dial you can turn, and one
 *  real task shown three ways beside it, is the argument in one screen.
 *
 *  Only the dial is new. The bordered container is Panel, the task card
 *  is Card, the level buttons are the goal tabs' pills, the card's action
 *  is ScreenAction — so the section reads as the same designer's work as
 *  its neighbours.
 *
 *  Things the pack says will be got wrong, and how each is handled:
 *
 *  - The levels are BUTTONS with aria-pressed, not a drag-only control.
 *  - It rests on semi-automatic, the approve-and-go story.
 *  - The card never changes height: all three cards (and sentences) sit
 *    in one grid cell, so the cell is always as tall as the tallest, and
 *    only the live one is visible.
 *  - The opening sweep runs once, from an IntersectionObserver at 40%, and
 *    not at all under reduced motion. Picking a level mid-sweep cancels
 *    the rest of it, so the dial never overrides what you just chose.
 *
 *  ONE CORRECTION to the reference build. It rotates the needle by
 *  level × 90° from a line drawn pointing right, which sends it right,
 *  down and left — so at "assistant" it points away from the assistant
 *  stop, and at "semi-auto" it points below the dial. The fill arc in the
 *  same build is right. Here the needle starts at −180°, so it points
 *  left, up and right, at the stop each level names.
 * ==================================================================== */

const COLOURS = [SAGE, BLUE, LAVENDER];
/** Left, top, right, on a 300×200 viewBox with centre (150,158), r 108. */
const STOPS: [number, number][] = [
  [42, 158],
  [150, 50],
  [258, 158],
];
const ARC_PATH = "M42 158 A108 108 0 0 1 258 158";
/** Half the circumference of r 108. */
const ARC = Math.PI * 108;
/** The opening sweep: assistant, fully auto, then back to rest. */
const SWEEP: [number, number][] = [
  [0, 260],
  [2, 1150],
  [1, 2100],
];

export function AiDial() {
  const [level, setLevel] = useState(AI_DIAL.defaultLevel);
  /** Counts changes. Keys the sentence, the card and the pulse, so each
   *  remounts and its animation restarts on every change — and nothing
   *  animates on first paint. */
  const [tick, setTick] = useState(0);
  const stageRef = useRef<HTMLDivElement | null>(null);
  const timers = useRef<number[]>([]);

  useEffect(() => {
    const el = stageRef.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const pending = timers.current;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        for (const [n, ms] of SWEEP) {
          pending.push(
            window.setTimeout(() => {
              setLevel(n);
              setTick((t) => t + 1);
            }, ms)
          );
        }
      },
      { threshold: 0.4 }
    );
    io.observe(el);
    return () => {
      io.disconnect();
      pending.forEach(clearTimeout);
    };
  }, []);

  function choose(n: number) {
    timers.current.forEach(clearTimeout);
    timers.current.length = 0;
    setLevel(n);
    setTick((t) => t + 1);
  }

  const live = AI_DIAL.levels[level];

  return (
    <div>
      <SectionReveal>
        <SheetLabel>{AI_DIAL.label}</SheetLabel>
        <h2 className="hd-h2 max-w-[17ch]">{AI_DIAL.heading}</h2>
        <p className="hd-sub">{AI_DIAL.line}</p>
      </SectionReveal>

      <SectionReveal delay={0.15}>
        <div ref={stageRef}>
          <Panel className="grid items-center gap-[clamp(20px,4vw,46px)] min-[760px]:grid-cols-[minmax(0,340px)_minmax(0,1fr)] lg:px-10">
            {/* ---- The dial, and the three levels ---- */}
            <div className="flex flex-col items-center gap-4">
              <svg
                viewBox="0 0 300 200"
                className={s.dial}
                role="img"
                aria-label={`A dial with three positions: assistant, semi-automatic and fully automatic. It is set to ${live.name.toLowerCase()}.`}
              >
                <path className={s.track} d={ARC_PATH} />
                <path
                  className={s.fill}
                  d={ARC_PATH}
                  style={{
                    stroke: COLOURS[level],
                    strokeDasharray: ARC,
                    strokeDashoffset: ARC * (1 - level / 2),
                  }}
                />
                {STOPS.map(([x, y], i) => (
                  <circle
                    key={i}
                    className={`${s.stop} ${i === level ? s.on : ""}`}
                    cx={x}
                    cy={y}
                    r={7}
                    fill={i === level ? COLOURS[level] : PAPER}
                    stroke={INK}
                    strokeWidth={2.5}
                    style={{ transformOrigin: `${x}px ${y}px` }}
                  />
                ))}
                <g
                  className={s.needle}
                  style={{ transform: `rotate(${-180 + level * 90}deg)` }}
                >
                  <line
                    x1="150"
                    y1="158"
                    x2="232"
                    y2="158"
                    stroke={INK}
                    strokeWidth={6}
                    strokeLinecap="round"
                  />
                </g>
                <circle
                  key={`pulse-${tick}`}
                  className={`${s.pulse} ${tick > 0 ? s.go : ""}`}
                  cx="150"
                  cy="158"
                  r="14"
                  fill="none"
                  stroke={INK}
                  strokeWidth={2.5}
                />
                <circle cx="150" cy="158" r="14" fill={PAPER} stroke={INK} strokeWidth={3} />
                {AI_DIAL.levels.map((l, i) => (
                  <text
                    key={l.stop}
                    x={STOPS[i][0]}
                    y={i === 1 ? 28 : 188}
                    textAnchor="middle"
                    fontSize="12.5"
                    className="font-mono"
                    fill="rgba(10,10,10,0.6)"
                  >
                    {l.stop}
                  </text>
                ))}
              </svg>

              <div
                role="group"
                aria-label="Choose a level"
                className="flex flex-wrap justify-center gap-2"
              >
                {AI_DIAL.levels.map((l, i) => {
                  const on = i === level;
                  return (
                    <button
                      key={l.name}
                      type="button"
                      aria-pressed={on}
                      onClick={() => choose(i)}
                      className="inline-flex h-10 cursor-pointer items-center gap-2 border border-ink px-4 font-display text-sm font-semibold transition-[border-radius,background-color,color] duration-200 hover:rounded-[28px] focus-visible:rounded-[28px] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[3px] focus-visible:outline-ink"
                      style={{
                        borderRadius: on ? 28 : 8,
                        backgroundColor: on ? INK : PAPER,
                        color: on ? CREAM : INK,
                      }}
                    >
                      <span
                        aria-hidden
                        className="h-2.5 w-2.5 rounded-full border-[1.5px]"
                        style={{
                          backgroundColor: COLOURS[i],
                          borderColor: on ? CREAM : INK,
                        }}
                      />
                      {l.name}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* ---- The same task, three ways ---- */}
            <div>
              {/* Every sentence and every card share one grid cell, so the
                  cell is always the height of the tallest and nothing
                  jumps under the pointer. */}
              <div className="grid">
                {AI_DIAL.levels.map((l, i) => {
                  const on = i === level;
                  return (
                    <p
                      key={on ? `say-${i}-${tick}` : `say-${i}`}
                      className={`col-start-1 row-start-1 m-0 mb-5 max-w-[46ch] text-[16.5px] text-ink/65 ${
                        on && tick > 0 ? s.in : ""
                      } ${on ? "" : "invisible"}`}
                      aria-hidden={!on}
                    >
                      <b className="font-semibold text-ink">{l.name}.</b> {l.say}
                      <span className="mt-1.5 block text-sm">{l.beneath}</span>
                    </p>
                  );
                })}
              </div>

              <div className="grid">
                {AI_DIAL.levels.map((l, i) => {
                  const on = i === level;
                  const c = l.card;
                  return (
                    <div
                      key={on ? `card-${i}-${tick}` : `card-${i}`}
                      className={`col-start-1 row-start-1 ${on && tick > 0 ? s.in : ""} ${
                        on ? "" : "invisible"
                      }`}
                      aria-hidden={!on}
                    >
                      <Card className="px-5 py-[18px]" style={{ backgroundColor: CREAM }}>
                        <span
                          className={`${s.flag} inline-block rounded-full border-[1.5px] border-ink px-2.5 py-0.5 font-mono text-[11px] font-semibold uppercase tracking-[0.06em]`}
                          style={{ backgroundColor: COLOURS[i] }}
                        >
                          {c.flag}
                        </span>
                        <h3 className="mb-1 mt-2.5 font-display text-[19px] font-bold leading-tight">
                          {c.title}
                        </h3>
                        <p className="m-0 text-sm text-ink/65">{c.sub}</p>

                        <div className="mt-4 flex flex-wrap items-center gap-2">
                          {c.lead ? (
                            <span className="mr-0.5 text-[13px] text-ink/65">{c.lead}</span>
                          ) : null}
                          {c.controls.map((label, j) =>
                            j === 0 ? (
                              <ScreenAction key={label}>{label}</ScreenAction>
                            ) : (
                              <span
                                key={label}
                                className="rounded-lg border-[1.5px] border-ink px-3.5 py-2 font-display text-sm font-bold"
                                style={{ backgroundColor: PAPER }}
                              >
                                {label}
                              </span>
                            )
                          )}
                        </div>

                        {c.trust ? (
                          <p className="mb-0 mt-4 border-t-[1.5px] border-dashed border-ink/25 pt-3 text-[13.5px] text-ink/65">
                            <b className="font-semibold text-ink">{c.trust.bold}</b>{" "}
                            {c.trust.rest}
                          </p>
                        ) : null}
                      </Card>
                    </div>
                  );
                })}
              </div>
              <p className="mb-0 mt-4 font-mono text-[11px] text-ink/55">
                Illustration · example data
              </p>
            </div>
          </Panel>
        </div>
      </SectionReveal>

      <SectionReveal delay={0.3}>
        <p className="mb-6 mt-8 max-w-[70ch] text-ink/65">
          <b className="font-semibold text-ink">{AI_DIAL.closing.bold}</b>{" "}
          {AI_DIAL.closing.rest}
        </p>
        <Button href={AI_DIAL.button.href} variant="ghost" arrow>
          {AI_DIAL.button.label}
        </Button>
      </SectionReveal>
    </div>
  );
}

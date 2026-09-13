"use client";

import { ORANGE, INK } from "@/lib/palette";

/* ==================================================================== *
 *  The Heyday line — design brief A8.
 *
 *  The visual form of "one workflow". A 2px ink line with 10px dots at each
 *  step; the current dot fills orange and grows to 14px; connectors carry a
 *  small orange "+".
 *
 *  It belongs anywhere steps or order matter — hero step indicator, the
 *  sideways-scroll progress, group next-and-previous, grows-with-you, the
 *  switching plan, quiz progress, the AI levels, the How-it-works timeline.
 *  It does NOT belong on a plain list: on something with no order it is
 *  decoration pretending to be information.
 * ==================================================================== */

export function HeydayLine({
  steps,
  current = 0,
  vertical = false,
  labels = false,
  className = "",
}: {
  /** Step labels. Used for the accessible name even when not shown. */
  steps: string[];
  current?: number;
  vertical?: boolean;
  /** Show the labels beside the dots. */
  labels?: boolean;
  className?: string;
}) {
  return (
    <ol
      className={`flex ${vertical ? "flex-col" : "flex-row items-center"} ${className}`}
      aria-label="Steps"
    >
      {steps.map((label, i) => {
        const active = i === current;
        const done = i < current;
        return (
          <li
            key={label}
            className={`flex ${vertical ? "flex-col" : "flex-row"} items-center ${
              i === steps.length - 1 ? "" : vertical ? "flex-1" : "flex-1"
            }`}
            aria-current={active ? "step" : undefined}
          >
            <span className={`flex ${vertical ? "flex-row" : "flex-col"} items-center gap-2`}>
              <span
                aria-hidden
                className="block shrink-0 rounded-full transition-all duration-300"
                style={{
                  width: active ? 14 : 10,
                  height: active ? 14 : 10,
                  backgroundColor: active || done ? ORANGE : INK,
                }}
              />
              {labels && (
                <span className="whitespace-nowrap font-mono text-[12px] tracking-[0.02em] text-ink/60">
                  {label}
                </span>
              )}
              {!labels && <span className="sr-only">{label}</span>}
            </span>

            {/* The connector, with the small orange "+" from the workflow
                builder. It sits between steps, so the last one has none. */}
            {i < steps.length - 1 && (
              <span
                aria-hidden
                className={`relative flex ${
                  vertical ? "h-10 w-0.5 flex-col" : "h-0.5 flex-1"
                } items-center justify-center`}
                style={{ backgroundColor: INK, minWidth: vertical ? undefined : 24 }}
              >
                <span
                  className="absolute font-mono text-[11px] leading-none"
                  style={{ color: ORANGE }}
                >
                  +
                </span>
              </span>
            )}
          </li>
        );
      })}
    </ol>
  );
}

"use client";

import { useMemo, useState } from "react";
import { Panel } from "@/components/ui/surfaces";
import { statByRow } from "@/lib/stats-bank";
import { CREAM } from "@/lib/palette";

/* ==================================================================== *
 *  "Work out yours" — the Quotes page's calculator, SaaS brief 3.9.
 *
 *  The worked example beside it uses one business's numbers. This lets a
 *  reader put in their own, which is the difference between a claim they
 *  read and a number they believe.
 *
 *  **The booking rates are not ours.** They are Flashquotes' published
 *  figures — stats bank row 1, a direct rival's own data — and the panel
 *  says so under the result. Presenting a competitor's numbers as the
 *  engine of our own calculator without crediting them would be the worst
 *  kind of borrowing, because it is the part doing the persuading.
 *
 *  Nothing is saved or sent. No email wall.
 * ==================================================================== */

/* Flashquotes' published booking rates by reply speed (stats bank row 1). */
const RATES = {
  fast: 0.22, // within 4 hours
  sameDay: 0.18,
  nextDay: 0.16,
} as const;

type Speed = keyof typeof RATES;

export function QuoteLeakCalculator() {
  const [quotes, setQuotes] = useState(40);
  const [value, setValue] = useState(1200);
  const [speed, setSpeed] = useState<Speed>("nextDay");

  const stat = statByRow(1)!;

  const sums = useMemo(() => {
    const now = quotes * RATES[speed];
    const fast = quotes * RATES.fast;
    const extra = fast - now;
    return {
      now,
      fast,
      extra,
      month: extra * value,
      year: extra * value * 12,
      alreadyFast: speed === "fast",
    };
  }, [quotes, value, speed]);

  const money = (n: number) =>
    `$${Math.round(n).toLocaleString("en-US")}`;

  return (
    <Panel className="!p-[30px]" aria-live="polite">
      <b className="block font-display text-base font-semibold">
        Work out yours
      </b>

      <div className="mt-4 grid gap-3.5">
        <div className="grid gap-3 sm:grid-cols-2">
          <Field label="Quotes a month" value={quotes} onChange={setQuotes} />
          <Field
            label="Average booking ($)"
            value={value}
            onChange={setValue}
            step={50}
          />
        </div>

        <fieldset className="m-0 grid gap-2 rounded-xl border border-ink/25 px-3.5 py-3">
          <legend className="px-1.5 font-display text-sm font-semibold">
            How fast you quote now
          </legend>
          <div className="inline-flex flex-wrap overflow-hidden rounded-[10px] border border-ink">
            {(
              [
                ["nextDay", "The next day or later"],
                ["sameDay", "Later the same day"],
                ["fast", "Within 4 hours"],
              ] as [Speed, string][]
            ).map(([k, label]) => (
              <button
                key={k}
                type="button"
                aria-pressed={speed === k}
                onClick={() => setSpeed(k)}
                className="cursor-pointer border-0 px-3.5 py-2.5 font-display text-sm font-semibold"
                style={{
                  backgroundColor: speed === k ? "#0A0A0A" : "#FBF9F6",
                  color: speed === k ? "#F2E9E1" : "#0A0A0A",
                }}
              >
                {label}
              </button>
            ))}
          </div>
        </fieldset>
      </div>

      <div className="mt-5">
        {sums.alreadyFast ? (
          <p className="m-0 font-display text-[22px] font-bold leading-tight">
            You&rsquo;re already quoting inside four hours, so there is
            nothing here to win back. The rest of this page is about keeping
            it that way when you&rsquo;re busy.
          </p>
        ) : (
          <>
            <p
              className="m-0 font-display font-extrabold leading-none tracking-[-0.03em]"
              style={{ fontSize: "clamp(36px, 4vw, 56px)" }}
            >
              {money(sums.month)}
            </p>
            <p className="mt-2 font-display text-lg font-semibold">
              a month, or {money(sums.year)} a year, on quotes that go out
              too slowly.
            </p>
            <pre
              className="mt-3.5 whitespace-pre-wrap rounded-xl px-4 py-3.5 font-mono text-[13px] leading-[1.7]"
              style={{ backgroundColor: CREAM }}
            >
{`Now       ${quotes} × ${Math.round(RATES[speed] * 100)}%  = ${sums.now.toFixed(1)} bookings
Within 4h ${quotes} × ${Math.round(RATES.fast * 100)}%  = ${sums.fast.toFixed(1)} bookings
                        ─────────
Difference              = ${sums.extra.toFixed(1)} bookings
                × ${money(value)}  = ${money(sums.month)} a month`}
            </pre>
          </>
        )}
      </div>

      {/* Whose numbers these are. Said under the result, not in a footnote
          nobody reaches — they are the part doing the persuading. */}
      <p className="mt-4 font-mono text-[11.5px] leading-relaxed text-ink/55">
        Uses Flashquotes&rsquo; published booking rates: 22% within 4 hours,
        18% the same day, 16% the next day. {stat.kind}, stats bank row{" "}
        {stat.row}. Nothing you type is saved or sent.
      </p>
    </Panel>
  );
}

function Field({
  label,
  value,
  onChange,
  step = 1,
}: {
  label: string;
  value: number;
  onChange: (n: number) => void;
  step?: number;
}) {
  return (
    <label className="grid gap-1.5 font-display text-sm font-semibold">
      {label}
      <input
        type="number"
        inputMode="numeric"
        min={0}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value) || 0)}
        className="h-[52px] rounded-lg border border-ink bg-paper px-3.5 font-body text-base text-ink focus:outline focus:outline-2 focus:outline-offset-2 focus:outline-ink"
      />
    </label>
  );
}

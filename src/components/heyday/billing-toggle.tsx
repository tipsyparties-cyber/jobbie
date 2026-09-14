"use client";

import { useState } from "react";
import { TBC } from "@/lib/site";
import { INK, CREAM, PAPER } from "@/lib/palette";

/* ==================================================================== *
 *  The monthly / yearly toggle — spec T8.
 *
 *  It is built and it changes nothing, because there are no prices for it
 *  to change: every plan says [PRICE TBC] on both settings. That is the
 *  honest state, and building the control now means the day prices are
 *  decided they drop into a page that already works.
 *
 *  It says so out loud rather than looking broken. A toggle that visibly
 *  does nothing reads as a bug; a toggle that says why reads as a page
 *  that is being straight with you.
 * ==================================================================== */

export function BillingToggle() {
  const [yearly, setYearly] = useState(false);

  return (
    <div className="flex flex-wrap items-center gap-4">
      <div
        role="group"
        aria-label="Billing period"
        className="inline-flex gap-1 rounded-full border border-ink p-1"
        style={{ backgroundColor: PAPER }}
      >
        {[
          { on: false, label: "Monthly" },
          { on: true, label: `Yearly: save ${TBC.generic}` },
        ].map((opt) => (
          <button
            key={opt.label}
            type="button"
            aria-pressed={yearly === opt.on}
            onClick={() => setYearly(opt.on)}
            className="cursor-pointer rounded-full border-0 px-4 py-2 font-display text-sm font-semibold transition-colors"
            style={{
              backgroundColor: yearly === opt.on ? INK : "transparent",
              color: yearly === opt.on ? CREAM : INK,
            }}
          >
            {opt.label}
          </button>
        ))}
      </div>

      <p className="m-0 font-mono text-xs text-ink/55">
        Both show {TBC.price} until prices are decided.
      </p>
    </div>
  );
}

import type { CSSProperties } from "react";
import { MARK_OUTER, MARK_BURST, MARK_INNER } from "@/lib/heyday-logo-paths";
import { BLUE } from "@/lib/palette";

/* ==================================================================== *
 *  HeydayLogo — Jem's master mark, per docs/heyday/logo/HEYDAY-LOGO-SPEC.md.
 *
 *  This replaces the eight-ray sun. Russell's decision, and it is
 *  everywhere, not alongside.
 *
 *  Every animation in the spec acts on the three sub-paths, so the markup
 *  has to expose them as `.outer`, `.inner` and `.burst` inside a
 *  `<g class="all">`. That is the whole reason this is a component rather
 *  than an `<img>`: a PNG cannot assemble.
 *
 *  ----------------------------------------------------------------
 *  `size` is the MARK, not the box.
 *
 *  The spec asks for a viewBox of -16 -16 132 132 so that Beat and Spin
 *  have room and do not clip at the corners. That padding is 32% of the
 *  box, so a 28px box draws a 21px mark — which is how the header ended up
 *  with a mark that read as mush beside the word, and why every small mark
 *  on the site was a quarter smaller than the number next to it said.
 *
 *  So the box is grown by the padding rather than the mark being shrunk by
 *  it: ask for 24 and you get a 24px mark, with the spec's room around it.
 *  A string size (e.g. "100%") is passed straight through, because a
 *  percentage cannot be scaled here and those callers want the box filled.
 *
 *  ----------------------------------------------------------------
 *  Do not draw it below 20px.
 *
 *  The arcs and the gaps between the rays close up, and it stops being a
 *  drawing. The pack's own 28px favicon keeps the arcs and reads cleanly;
 *  its 16px one drops them and is the burst alone, which is the pack
 *  saying the same thing.
 *
 *  So 20 is the floor on the site, and a browser tab — which is the only
 *  place the mark appears at 16 — uses the pack's PNG rather than this.
 *  The old eight-ray sun survived at 16 because it was eight thick
 *  strokes; this one has a 2px arc at that size and cannot.
 * ==================================================================== */

/** viewBox -16 -16 132 132 ÷ the mark's own 100 units. */
const BOX = 1.32;

/** The animations from the spec's section 6. */
export type MarkMotion =
  | "assemble"
  | "signal"
  | "click"
  | "together"
  | "spin"
  | "sunrise"
  | "beat";

export function HeydayLogo({
  size = 28,
  colour = BLUE,
  motion,
  /** Play a once-only animation when the pointer enters. Hover is "click
   *  round" in the spec. */
  hoverMotion,
  className = "",
  label,
  style,
}: {
  size?: number | string;
  colour?: string;
  motion?: MarkMotion;
  hoverMotion?: MarkMotion;
  className?: string;
  /** Give it a label where it carries meaning; omit where it is
   *  decoration and let it be hidden. */
  label?: string;
  style?: CSSProperties;
}) {
  const classes = [
    "hd-logo",
    motion ? `a-${motion}` : "",
    hoverMotion ? `hd-logo-hover-${hoverMotion}` : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const box = typeof size === "number" ? size * BOX : size;

  return (
    <span
      className={classes}
      style={{ width: box, height: box, display: "inline-block", ...style }}
      role={label ? "img" : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
    >
      <svg
        viewBox="-16 -16 132 132"
        width="100%"
        height="100%"
        overflow="visible"
        style={{ display: "block" }}
      >
        {/* Order is the spec's own: outer, burst, inner. They are one
            colour and do not overlap, so this is only about matching the
            document a future redraw will be checked against. */}
        <g className="all">
          <path className="outer" d={MARK_OUTER} fill={colour} fillRule="evenodd" />
          <path className="burst" d={MARK_BURST} fill={colour} fillRule="evenodd" />
          <path className="inner" d={MARK_INNER} fill={colour} fillRule="evenodd" />
        </g>
      </svg>
    </span>
  );
}

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
 *  The viewBox is -16 -16 132 132 rather than 0 0 100 100. The spec is
 *  explicit that Beat and Spin clip without the margin, and a single
 *  viewBox everywhere is one less thing to get wrong later.
 *
 *  Assemble runs once per page load and settles into the resting mark, so
 *  the header is right from the first frame and there is never an empty
 *  state. It is not looped and not replayed on navigation — once is the
 *  whole effect.
 * ==================================================================== */

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

  return (
    <span
      className={classes}
      style={{ width: size, height: size, display: "inline-block", ...style }}
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
        <g className="all">
          {/* Order matters: the arcs sit behind the burst, which is what
              Assemble's stagger reads as — the burst springs up and the
              arcs arrive behind it. */}
          <path className="outer" d={MARK_OUTER} fill={colour} fillRule="evenodd" />
          <path className="inner" d={MARK_INNER} fill={colour} fillRule="evenodd" />
          <path className="burst" d={MARK_BURST} fill={colour} fillRule="evenodd" />
        </g>
      </svg>
    </span>
  );
}

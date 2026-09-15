import type { CSSProperties } from "react";
import { HeydayLogo } from "@/components/heyday/heyday-logo";
import { INK, PAPER } from "@/lib/palette";

/* ==================================================================== *
 *  HoldingImage — spec A6.
 *
 *  Every photo slot on the site until real photographs exist. It is a
 *  visible placeholder on purpose: the brief's rule is that placeholders
 *  stay visible exactly as written, and a grey box that looks like a
 *  design decision is how a site ships with no photographs in it by
 *  accident.
 *
 *  The art direction is printed on the box AND stored in `data-art`, so
 *  every slot on the site can be listed with one query when it is time to
 *  brief a photographer:
 *
 *      document.querySelectorAll("[data-art]")
 *
 *  It is also the alt text, so the page reads correctly today rather than
 *  announcing "image" nineteen times.
 * ==================================================================== */

const RATIOS = {
  "16:9": "16 / 9",
  "4:3": "4 / 3",
  "1:1": "1 / 1",
  "3:4": "3 / 4",
  "4:5": "4 / 5",
  auto: undefined,
} as const;

export function HoldingImage({
  art,
  ratio = "4:3",
  /** The section's ground colour. The box is that colour mixed 35% with
   *  paper, so it belongs to its section rather than sitting on it. */
  tint,
  /** Card corners are 16px, panel corners 40px. */
  radius = 16,
  className = "",
  style,
}: {
  art: string;
  ratio?: keyof typeof RATIOS;
  tint?: string;
  radius?: number;
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <div
      data-art={art}
      role="img"
      aria-label={art}
      className={`relative grid place-items-center overflow-hidden border border-ink ${className}`}
      style={{
        aspectRatio: RATIOS[ratio],
        borderRadius: radius,
        background: tint
          ? `color-mix(in srgb, ${tint} 35%, ${PAPER})`
          : PAPER,
        ...style,
      }}
    >
      <span aria-hidden className="w-[36%] opacity-[0.12]">
        <HeydayLogo size="100%" colour={INK} />
      </span>
      <span
        aria-hidden
        className="absolute inset-x-3 bottom-2.5 font-mono text-[11px] leading-[1.35] text-ink/75"
      >
        Holding image · {art}
      </span>
    </div>
  );
}

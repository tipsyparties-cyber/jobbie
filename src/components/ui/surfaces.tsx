"use client";

/* ==================================================================== *
 *  Panels, cards and stickers — design brief A5.
 *
 *  Measured from themagic8.co.uk. These replace `neo-card.tsx`, whose soft
 *  neumorphic shadows belong to the old site.
 *
 *  The rule that makes the set work: SHADOWS NEVER BLUR. A hard offset
 *  block of ink at 8% reads as printed, which is the techy-but-warm note
 *  the brief is after; the moment it blurs it becomes every other SaaS
 *  site's drop shadow.
 *
 *  Hovering a card does not move it. Only stickers respond to hover, and
 *  only by straightening. If everything moves, nothing is a signal.
 * ==================================================================== */

type Props = {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
};

/**
 * Panel — big content blocks: the sticky-scroll frame, the workflow-builder
 * frame, the pricing plans.
 *
 * 1px border, 40px radius, paper, shadow 6px 10px.
 */
export function Panel({ children, className = "", style }: Props) {
  return (
    <div
      className={`rounded-[40px] border border-ink bg-paper px-6 py-10 ${className}`}
      style={{ boxShadow: "6px 10px 0 0 rgba(10,10,10,0.08)", ...style }}
    >
      {children}
    </div>
  );
}

/**
 * Card — feature cards, sideways-scroll cards, story cards, hero cards.
 *
 * A heavier 2px border and a longer 11px shadow than the panel, because a
 * card is usually smaller and needs the weight to hold its own in a row.
 */
export function Card({ children, className = "", style }: Props) {
  return (
    <div
      className={`rounded-2xl border-2 border-ink ${className}`}
      style={{ boxShadow: "11px 11px 0 0 rgba(10,10,10,0.08)", ...style }}
    >
      {children}
    </div>
  );
}

/**
 * Sticker — the playful moments: outcome callouts, "Most popular", "Only on
 * Heyday", stat callouts.
 *
 * A card tilted −8°, straightening on hover over 0.5s. Magic8 tilts to −12°;
 * the brief calls −8° calmer and it is right — at −12° a row of three reads
 * as a mistake rather than a device.
 *
 * Three per screen at most. They stop being playful at four.
 */
export function Sticker({
  children,
  className = "",
  style,
  tilt = -8,
}: Props & { tilt?: number }) {
  return (
    <div
      className={`inline-block rounded-2xl border-2 border-ink transition-transform duration-500 hover:rotate-0 motion-reduce:transform-none motion-reduce:transition-none ${className}`}
      style={{
        boxShadow: "11px 11px 0 0 rgba(10,10,10,0.08)",
        transform: `rotate(${tilt}deg)`,
        transitionTimingFunction: "cubic-bezier(.4,0,.2,1)",
        ...style,
      }}
    >
      {children}
    </div>
  );
}

/**
 * A status chip. Every feature says "Coming soon" until Jem and Russell
 * decide otherwise (prompt section 8), so this defaults to that rather than
 * to the flattering option.
 */
export function StatusChip({
  status = "Coming soon",
  className = "",
}: {
  status?: "Live" | "Coming soon" | string;
  className?: string;
}) {
  const live = status === "Live";
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border border-ink/25 px-3 py-1 font-mono text-[12px] tracking-[0.02em] text-ink/70 ${className}`}
    >
      <span
        aria-hidden
        className="h-1.5 w-1.5 rounded-full"
        style={{ backgroundColor: live ? "#9AAD92" : "rgba(10,10,10,0.3)" }}
      />
      {status}
    </span>
  );
}

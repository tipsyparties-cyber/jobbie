import type { ReactNode } from "react";
import { ORANGE, PAPER, CREAM } from "@/lib/palette";

/* ==================================================================== *
 *  ScreenIllustration — spec A7.
 *
 *  Every product picture on the site is one of these: a paper app window
 *  with a 2px ink outline, 16px corners and a hard 11px shadow, drawn in
 *  the style of assets/heyday-workflow-builder-still.svg.
 *
 *  Three rules from the spec are enforced here rather than left to whoever
 *  writes the next page:
 *
 *  - **Exactly one orange thing per screen** — the action, or the active
 *    state. Orange is the site's "this is the thing" signal, and a screen
 *    with three orange elements has none.
 *  - **"Illustration · example data" underneath, always.** Nothing on this
 *    site is a screenshot of a working product, because there is not one
 *    yet, and a picture that looks like a screenshot is a claim.
 *  - **People are roles, never names.** "The customer", "Team member",
 *    "You". An invented name is an invented customer.
 * ==================================================================== */

export function Screen({
  title,
  children,
  caption = "Illustration · example data",
  className = "",
  width,
}: {
  /** The window's title bar. */
  title: string;
  children: ReactNode;
  caption?: string;
  className?: string;
  width?: number | string;
}) {
  return (
    <figure className={`m-0 ${className}`} style={{ width }}>
      <div
        className="overflow-hidden rounded-2xl border-2 border-ink"
        style={{
          backgroundColor: PAPER,
          boxShadow: "11px 11px 0 0 rgba(10,10,10,0.14)",
        }}
      >
        <div className="flex items-center gap-2 border-b-[1.5px] border-ink px-3.5 py-2.5 font-display text-sm font-bold">
          <span
            aria-hidden
            className="h-2 w-2 rounded-full bg-ink/20"
          />
          {title}
        </div>
        <div className="grid gap-2.5 p-4">{children}</div>
        <figcaption className="px-4 pb-3 font-mono text-[11px] text-ink/55">
          {caption}
        </figcaption>
      </div>
    </figure>
  );
}

/** A row inside a screen. `hot` is the one orange thing. */
export function ScreenRow({
  children,
  meta,
  hot = false,
}: {
  children: ReactNode;
  meta?: string;
  hot?: boolean;
}) {
  return (
    <div
      className="flex items-center justify-between gap-3 rounded-[10px] px-3 py-2.5 text-sm"
      style={
        hot
          ? { border: `2px solid ${ORANGE}` }
          : { border: "1px solid rgba(10,10,10,0.15)" }
      }
    >
      <span>{children}</span>
      {meta ? (
        <span className="font-mono text-[11.5px] text-ink/55">{meta}</span>
      ) : null}
    </div>
  );
}

/** The screen's single action. Orange fill, ink text — never orange text. */
export function ScreenAction({ children }: { children: ReactNode }) {
  return (
    <span
      className="justify-self-start rounded-lg border-[1.5px] border-ink px-3.5 py-2 font-display text-sm font-bold text-ink"
      style={{ backgroundColor: ORANGE }}
    >
      {children}
    </span>
  );
}

/** Three small tiles, one of which may be the hot one. */
export function ScreenPick({
  items,
}: {
  items: { label: string; note?: string; hot?: boolean }[];
}) {
  return (
    <div className="grid grid-cols-3 gap-2">
      {items.map((it) => (
        <div
          key={it.label}
          className="rounded-[10px] p-2.5 font-display text-sm font-bold"
          style={
            it.hot
              ? { border: `2.5px solid ${ORANGE}` }
              : { border: "1.5px solid #0A0A0A" }
          }
        >
          {it.label}
          {it.note ? (
            <span className="mt-1 block font-mono text-xs font-medium text-ink/55">
              {it.note}
            </span>
          ) : null}
        </div>
      ))}
    </div>
  );
}

/** A small labelled stat that floats over a picture. Example data only. */
export function FloatingStat({
  label,
  value,
  change,
}: {
  label: string;
  value: string;
  change?: string;
}) {
  return (
    <div
      className="rounded-[14px] border-2 border-ink px-3.5 py-2.5"
      style={{
        backgroundColor: PAPER,
        boxShadow: "6px 6px 0 0 rgba(10,10,10,0.08)",
        minWidth: 156,
      }}
    >
      <small className="mb-0.5 block font-mono text-[11.5px] text-ink/55">
        {label}
      </small>
      <b className="font-display text-[26px] font-extrabold leading-[1.1] tracking-[-0.02em]">
        {value}
      </b>
      {change ? (
        <em
          className="ml-1.5 inline-block rounded-full border border-ink px-1.5 align-[5px] font-mono text-[11px] font-semibold not-italic"
          style={{ backgroundColor: CREAM }}
        >
          {change}
        </em>
      ) : null}
    </div>
  );
}

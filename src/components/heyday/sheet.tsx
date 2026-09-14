import type { CSSProperties, ReactNode } from "react";

/* ==================================================================== *
 *  Sheet — one marketing section.
 *
 *  Ported from the reference kit's `.sheet` (docs/heyday/reference/site,
 *  kit.css and kit.js). A sheet is an opaque block of one colour with a
 *  56px rounded top that sits 56px over the sheet before it.
 *
 *  Two things fall out of that, and both matter:
 *
 *  1. Because each sheet is opaque and later ones paint over earlier ones,
 *     a sheet COVERS the bottom of whatever came before. The hero's card
 *     strip runs under the next section for the same reason it runs under
 *     the header: real page furniture is on top of it. No gradient, no
 *     mask, no fade to mist.
 *
 *  2. The colour fade still works, because it happens inside the sheet
 *     rather than behind it: SheetStack holds each sheet at the previous
 *     sheet's colour until it arrives, then lets it transition to its own.
 *
 *  This is a server component on purpose. The sections are static copy and
 *  most of the site's search value is in them; only the wiring below needs
 *  to run in the browser.
 * ==================================================================== */

export function Sheet({
  colour,
  children,
  className = "",
  style,
  id,
  label,
  ink = false,
  flush = false,
}: {
  /** The sheet's ground colour. Use the constants in lib/palette. */
  colour: string;
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  id?: string;
  /** aria-label, for sections whose heading does not name them. */
  label?: string;
  /** Ink grounds invert the text colours. */
  ink?: boolean;
  /** Drops the 120/150px padding — for sections that manage their own,
   *  like the pinned sideways scroll and the feature rows. */
  flush?: boolean;
}) {
  return (
    <section
      id={id}
      aria-label={label}
      data-sheet
      className={`hd-sheet ${ink ? "hd-sheet-ink" : ""} ${className}`}
      style={
        {
          "--c": colour,
          ...(flush ? { padding: 0 } : null),
          ...style,
        } as CSSProperties
      }
    >
      {children}
    </section>
  );
}

/** The 1280px column every sheet's content sits in. */
export function Wrap({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`mx-auto w-full max-w-[1280px] px-[clamp(16px,4vw,48px)] ${className}`}
    >
      {children}
    </div>
  );
}

/** The { braced } Geist Mono label that opens most sections. */
export function SheetLabel({ children }: { children: ReactNode }) {
  return <p className="hd-label">{children}</p>;
}

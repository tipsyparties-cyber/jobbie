"use client";

/* ==================================================================== *
 *  The icon family — design brief A7.
 *
 *  Every feature icon is the Heyday sun with one part turned orange and
 *  reshaped into the feature, so the whole set is visibly one family. They
 *  live in one sprite, `public/icons/heyday-family.svg`.
 *
 *  Two rules that are easy to get wrong:
 *
 *  - SIZE decides which version. The full icon at 40px and up; the `-small`
 *    version — the orange piece on its own — at 24px and under. At menu size
 *    the full icon is eight strokes in a 24px box and turns to mush, which
 *    is exactly why the small set exists. This component picks for you.
 *
 *  - The orange piece has a halo in the colour BEHIND the icon, set through
 *    `--hd-ko`. Pass the ground it sits on; on a paper card that is
 *    #FBF9F6. Leave it wrong and the halo cuts a hole of the wrong colour.
 *
 *  The ink arrows take `currentColor`, so the icon follows the text colour
 *  of whatever it sits in.
 * ==================================================================== */

/** Below this, use the `-small` version. */
const SMALL_AT = 24;

export function Icon({
  name,
  size = 40,
  ground = "#FBF9F6",
  className = "",
  label,
}: {
  /** The slug from data/features.json, with or without the `hd-` prefix. */
  name: string;
  size?: number;
  /** The colour behind the icon, for the orange piece's halo. */
  ground?: string;
  className?: string;
  /** Set only where the icon carries meaning on its own. */
  label?: string;
}) {
  const base = name.startsWith("hd-") ? name : `hd-${name}`;
  const id = size <= SMALL_AT ? `${base}-small` : base;

  return (
    <svg
      width={size}
      height={size}
      className={className}
      style={{ ["--hd-ko" as string]: ground }}
      role={label ? "img" : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
    >
      <use href={`/icons/heyday-family.svg#${id}`} />
    </svg>
  );
}

import Link from "next/link";
import { SITE } from "@/lib/site";

/**
 * The wordmark — logo spec § 2.
 *
 * **Live text, not an image.** DM Sans Bold, lowercase, −0.02em tracking.
 * That is the spec's first line about the word and it rules out the PNG
 * this used to be: the old file was a mask of the word set with a capital
 * H, which the spec forbids in as many words — "Always lowercase: heyday.
 * Not Heyday, not HeyDay."
 *
 * Live text also means it takes `currentColor` for free, stays selectable,
 * scales without a second file, and is read out as text rather than as an
 * image with a label. The ready-made lockup SVGs in the pack are for
 * everywhere that is not a web page.
 *
 * Size is given as a height so a caller can size the lockup with one
 * number, the way it could when this was an image. DM Sans's cap height is
 * about 0.7 of its em, and the word is all lowercase with a descender in
 * the y, so the font-size that fills a given height is close to the height
 * itself — the spec's own lockup proportions are a 24px mark against a
 * 26px word, and this keeps that relationship.
 */
export function Wordmark({
  className = "",
  /** Type size. A number is px, per the spec's lockup proportions; a
   *  string is passed through, for the giant one in the footer. */
  height = 26,
  href = "/",
  asLink = true,
}: {
  className?: string;
  height?: number | string;
  href?: string;
  asLink?: boolean;
}) {
  const mark = (
    <span
      className={`inline-block select-none align-middle ${className}`}
      style={{
        font: `700 ${typeof height === "number" ? `${height}px` : height}/1 var(--font-logo), var(--font-sans), system-ui, sans-serif`,
        letterSpacing: "-0.02em",
      }}
    >
      heyday
    </span>
  );

  if (!asLink) return mark;

  return (
    <Link href={href} aria-label={`${SITE.name}, home`} className="inline-block">
      {mark}
    </Link>
  );
}

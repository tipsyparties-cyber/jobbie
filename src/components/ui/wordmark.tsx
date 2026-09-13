import Link from "next/link";
import { SITE } from "@/lib/site";

/**
 * The wordmark — design brief A1.
 *
 * Jem's Heyday wordmark, drawn as a CSS mask rather than an `<img>`. The
 * PNG is a solid shape with an alpha channel, so masking a coloured box
 * with it means the mark takes `currentColor` and can sit in ink on cream,
 * paper on blue, or anything else a section needs. An `<img>` would be
 * locked to whatever colour the file was exported at, and we would end up
 * with a second file per colour.
 *
 * It stays a single component, so a rename or a redraw is one edit rather
 * than a hunt through the header, the footer and every page that repeated
 * the markup. That was the reason the last one was collapsed into here.
 *
 * The aspect ratio is the file's own: 1493 × 427, or 3.497:1. Width is
 * derived from the height so the mark can be sized by a single number and
 * cannot be squashed.
 */

const RATIO = 1493 / 427;

export function Wordmark({
  className = "",
  /** Height in px. Width follows from the file's aspect ratio. */
  height = 26,
  href = "/",
  asLink = true,
}: {
  className?: string;
  height?: number;
  href?: string;
  asLink?: boolean;
}) {
  const mark = (
    <span
      role="img"
      aria-label={SITE.name}
      className={`inline-block bg-current align-middle ${className}`}
      style={{
        height,
        width: height * RATIO,
        WebkitMaskImage: "url(/brand/heyday-wordmark.png)",
        maskImage: "url(/brand/heyday-wordmark.png)",
        WebkitMaskRepeat: "no-repeat",
        maskRepeat: "no-repeat",
        WebkitMaskSize: "contain",
        maskSize: "contain",
        WebkitMaskPosition: "center",
        maskPosition: "center",
      }}
    />
  );

  if (!asLink) return mark;

  return (
    <Link href={href} aria-label={`${SITE.name}, home`} className="inline-block">
      {mark}
    </Link>
  );
}

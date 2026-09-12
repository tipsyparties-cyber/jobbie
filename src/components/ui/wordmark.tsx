import Link from "next/link";

/**
 * The wordmark.
 *
 * There were five hand-written copies of this across the header, both
 * footers, the navbar and the home page, each with its own slightly
 * different classes. Renaming meant finding all five and getting all five
 * right — so it lives in one place now. Same reasoning as `lib/palette.ts`:
 * a mark that drifts between the header and the footer is the sort of bug
 * that does not show up in a diff.
 *
 * `size` is the only knob. Everything else scales from it in `em`, so the
 * mark holds its proportions wherever it is used.
 */
export function Wordmark({
  className = "",
  size = "text-2xl",
  href = "/",
  asLink = true,
}: {
  className?: string;
  size?: string;
  href?: string;
  asLink?: boolean;
}) {
  const mark = (
    <span className={`${size} leading-none tracking-tight ${className}`}>
      <span className="font-body font-medium">jobbie</span>
    </span>
  );

  if (!asLink) return mark;

  return (
    <Link href={href} aria-label="jobbie — home" className="inline-block">
      {mark}
    </Link>
  );
}

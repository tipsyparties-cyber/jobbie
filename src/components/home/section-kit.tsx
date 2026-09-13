"use client";

import Link from "next/link";

/* ==================================================================== *
 *  The shared styling primitives for the home page.
 *
 *  Lifted out of gsap-structure.tsx unchanged, so the new product sections
 *  are built from the same parts as the existing ones rather than from
 *  look-alikes. Two copies of a pill button drift — one gets a padding
 *  tweak, the other does not, and nobody notices for a month.
 *
 *  Nothing here is new. If any of it renders differently from before,
 *  that is a bug, not a redesign.
 * ==================================================================== */

/** Content column, matching gsap's ~6vw gutter. */
export const SHELL = "mx-auto w-full max-w-[1400px] px-6";

/** The hairline that bounds most sections. */
export function Rule() {
  return (
    <div className={SHELL}>
      <div className="h-px w-full bg-ink/12" />
    </div>
  );
}

/**
 * The bracketed label. Small bold text held inside a pair of thin outline
 * braces — 13px, measured off gsap.com.
 */
export function Braced({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-stretch gap-2 font-body text-[13px] font-medium tracking-tight text-ink/80">
      <span
        aria-hidden
        className="font-body text-3xl font-extralight leading-none text-ink/50"
      >
        {"{"}
      </span>
      <span className="self-center">{children}</span>
      <span
        aria-hidden
        className="font-body text-3xl font-extralight leading-none text-ink/50"
      >
        {"}"}
      </span>
    </span>
  );
}

/** The pill button. Outline, fully rounded, medium weight. */
export function Pill({
  href,
  children,
  solid = false,
}: {
  href: string;
  children: React.ReactNode;
  solid?: boolean;
}) {
  return (
    <Link
      href={href}
      className={
        solid
          ? "inline-block rounded-full bg-ink px-7 py-3 font-body text-sm font-medium text-cream transition-opacity hover:opacity-85"
          : "inline-block rounded-full border border-ink/70 px-7 py-3 font-body text-sm font-medium text-ink transition-colors hover:bg-ink hover:text-cream"
      }
    >
      {children}
    </Link>
  );
}

/** The section heading scale, so every new section matches the statement. */
export const HEAD =
  "font-body text-[clamp(1.9rem,5.6vw,4.6rem)] font-normal leading-[1.14] tracking-[-0.02em]";

/** The sub-heading scale, matching the feature rows. */
export const SUBHEAD =
  "font-body text-[clamp(1.25rem,2.2vw,1.85rem)] font-medium leading-[1.15] tracking-[-0.02em]";

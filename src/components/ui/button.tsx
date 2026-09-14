"use client";

import Link from "next/link";

/* ==================================================================== *
 *  Buttons — design brief A4.
 *
 *  Measured from allinnhomeofstudents.com, and the whole idea is that ONLY
 *  the corner radius changes: 8px to a full pill in 0.2s. Nothing lifts,
 *  glows or changes colour. A button that does four things on hover reads
 *  as a demo; one that does a single unexpected thing reads as considered.
 *
 *  Gone from the old version: the glass fill, the uppercase text, the
 *  `whileHover y: -2` lift and the caret.
 *
 *  The radius change is also the focus state, because a keyboard user
 *  should get the same affordance a mouse user does — plus a real outline,
 *  since a radius change alone is not a visible focus indicator.
 * ==================================================================== */

export type ButtonVariant = "primary" | "dark" | "ghost";

const BASE = [
  "inline-flex items-center justify-center gap-2",
  "h-12 px-[22px] md:h-[54px]",
  "font-display text-base font-semibold",
  "border border-ink",
  // The one thing that moves.
  "rounded-lg hover:rounded-[28px] focus-visible:rounded-[28px]",
  "transition-[border-radius] duration-200 ease-in-out",
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[3px] focus-visible:outline-ink",
  "cursor-pointer",
].join(" ");

/**
 * `primary` is orange with INK text, never white: ink on orange passes AA at
 * about 6:1, white on orange does not.
 *
 * `dark` exists for yellow grounds, where an orange button would sit next to
 * yellow — which A2 forbids.
 */
const VARIANTS: Record<ButtonVariant, string> = {
  primary: "bg-orange text-ink",
  dark: "bg-ink text-cream",
  ghost: "bg-transparent text-ink",
};

type Props = {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  type?: "button" | "submit";
  /** Only meaningful on a real button. A disabled link is not a thing. */
  disabled?: boolean;
  variant?: ButtonVariant;
  /** A static arrow. The main call to action only — A4. */
  arrow?: boolean;
  className?: string;
  "aria-expanded"?: boolean;
  "aria-controls"?: string;
};

export function Button({
  children,
  href,
  onClick,
  disabled = false,
  type = "button",
  variant = "primary",
  arrow = false,
  className = "",
  ...aria
}: Props) {
  const cls = `${BASE} ${VARIANTS[variant]} ${className}`;
  const inner = (
    <>
      {children}
      {arrow && (
        <span aria-hidden className="text-[0.95em] leading-none">
          →
        </span>
      )}
    </>
  );

  if (href) {
    return (
      <Link href={href} className={cls} {...aria}>
        {inner}
      </Link>
    );
  }
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${cls} disabled:cursor-not-allowed disabled:opacity-40`}
      {...aria}
    >
      {inner}
    </button>
  );
}

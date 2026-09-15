import type { CSSProperties, ReactNode } from "react";
import Link from "next/link";
import { Sheet, Wrap } from "@/components/heyday/sheet";
import { SectionReveal } from "@/components/heyday/motion";
import { HeydayLogo } from "@/components/heyday/heyday-logo";
import { Button } from "@/components/ui/button";
import { HeydayLogoInView } from "@/components/heyday/heyday-logo-in-view";
import { CTA } from "@/lib/site";
import { PAPER, SAGE, ORANGE } from "@/lib/palette";

/* ==================================================================== *
 *  The page furniture every inner page shares — spec A1, and the
 *  reference kit's `.page-hero`, `.closing`, `.faq` and `.lsteps`.
 *
 *  Every page on the site is the same three things: a hero on the page's
 *  own ground, a stack of sheets, and the ink closing block. Building
 *  that once is what keeps forty pages looking like one site rather than
 *  forty pages that were each given the same instructions.
 * ==================================================================== */

/**
 * The page hero.
 *
 * Not a sheet: it is the bottom of the stack, so the first sheet covers
 * its foot the way the homepage's first sheet covers the hero's cards.
 */
export function PageHero({
  label,
  crumbs,
  h1,
  highlight,
  sub,
  chips,
  actions,
  aside,
  ground = PAPER,
}: {
  label?: string;
  crumbs?: ReactNode;
  h1: string;
  /** The phrase inside the H1 that takes the yellow marker. */
  highlight?: string;
  sub?: ReactNode;
  /** Status chips, "Only on Heyday" stickers and the like. */
  chips?: ReactNode;
  actions?: ReactNode;
  /** A picture, on the right at desktop width. */
  aside?: ReactNode;
  ground?: string;
}) {
  return (
    <section
      className="relative pb-[150px] pt-14"
      style={{ backgroundColor: ground }}
    >
      <Wrap>
        <div
          className={
            aside
              ? "grid items-center gap-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]"
              : ""
          }
        >
          <div>
            {crumbs}
            {label ? <p className="hd-label">{label}</p> : null}
            <h1
              className="mb-4 max-w-[18ch] font-hero font-extrabold leading-none tracking-[-0.035em]"
              style={{ fontSize: "clamp(40px, 5vw, 72px)", textWrap: "balance" }}
            >
              {highlight ? <Marked text={h1} phrase={highlight} /> : h1}
            </h1>
            {chips ? <div className="mb-4 flex flex-wrap items-center gap-3">{chips}</div> : null}
            {sub ? <div className="hd-sub text-[19px]">{sub}</div> : null}
            {actions ? <div className="flex flex-wrap gap-3">{actions}</div> : null}
          </div>
          {aside}
        </div>
      </Wrap>
    </section>
  );
}

/**
 * A headline with one phrase behind the yellow marker.
 *
 * The highlight is passed as a phrase rather than the headline being
 * split at the call site, so the copy stays one readable string in the
 * data file and the marker cannot drift off the words it was meant for.
 */
export function Marked({ text, phrase }: { text: string; phrase?: string }) {
  if (!phrase || !text.includes(phrase)) return <>{text}</>;
  const [before, ...rest] = text.split(phrase);
  return (
    <>
      {before}
      <span className="hd-hl">{phrase}</span>
      {rest.join(phrase)}
    </>
  );
}

/** Features › group › feature. The group's mark sits small and still. */
export function Breadcrumbs({
  items,
}: {
  items: { label: string; href?: string; mark?: boolean; colour?: string }[];
}) {
  return (
    <nav
      aria-label="Breadcrumb"
      className="mb-4 flex flex-wrap gap-2 font-mono text-[13px] text-ink/55"
    >
      {items.map((it, i) => (
        <span key={it.label} className="inline-flex items-center gap-1.5">
          {i > 0 ? <span aria-hidden>›</span> : null}
          {it.mark ? <HeydayLogo size={20} colour={it.colour} /> : null}
          {it.href ? (
            <Link href={it.href} className="text-ink/55 hover:underline">
              {it.label}
            </Link>
          ) : (
            <span aria-current="page">{it.label}</span>
          )}
        </span>
      ))}
    </nav>
  );
}

/**
 * The closing call to action that ends every marketing page.
 *
 * Sage, on Russell's call — it was ink, and an ink block sitting directly
 * on top of an ink footer made the bottom of every page one continuous
 * black slab about two screens tall. Sage rather than orange because the
 * primary button IS orange: an orange button on an orange ground is
 * invisible, and the palette's rule would force it to ink, which takes
 * the site's action colour out of its most important call to action.
 */
export function CTABlock({
  heading = "Ready for your Heyday?",
  highlight = "your Heyday?",
  line = "Join early access, or book a demo and we’ll show you round.",
  note,
}: {
  heading?: string;
  highlight?: string;
  line?: string;
  note?: ReactNode;
}) {
  return (
    <Sheet colour={SAGE}>
      <Wrap className="text-center">
        <SectionReveal>
          <div className="mb-6 flex justify-center">
            {/* Together: the arcs and the burst meet as you reach the ask.
                Paper on sage — the mark takes the ground's opposite, and
                sky would disappear into it. */}
            <HeydayLogoInView size={64} colour={PAPER} motion="together" />
          </div>
          <h2 className="hd-h2 mx-auto max-w-[18ch]">
            <Marked text={heading} phrase={highlight} />
          </h2>
          <p className="hd-sub mx-auto">{line}</p>
          <div className="flex flex-wrap justify-center gap-3">
            <Button href={CTA.primary.href} variant="primary" arrow>
              {CTA.primary.label}
            </Button>
            <Button href={CTA.secondary.href} variant="ghost">
              {CTA.secondary.label}
            </Button>
          </div>
          {note ? (
            <div className="mx-auto mt-6 max-w-[52ch] font-mono text-xs text-ink/60">
              {note}
            </div>
          ) : null}
        </SectionReveal>
      </Wrap>
    </Sheet>
  );
}

/**
 * The FAQ.
 *
 * Native `<details>`, so it works before hydration, with the keyboard,
 * and with find-in-page — all three of which a hand-rolled accordion
 * gives up in exchange for an animation nobody asked for.
 */
export function FAQ({
  items,
  heading,
}: {
  items: { q: string; a: ReactNode }[];
  heading?: string;
}) {
  return (
    <div className="max-w-[820px]">
      {heading ? <h2 className="hd-h2">{heading}</h2> : null}
      {items.map((it, i) => (
        <details
          key={it.q}
          className={`border-t border-ink/20 py-[18px] ${
            i === items.length - 1 ? "border-b" : ""
          }`}
        >
          <summary className="hd-faq-summary flex cursor-pointer justify-between gap-4 font-display text-[19px] font-bold leading-[1.3]">
            {it.q}
          </summary>
          <div className="mt-2.5 max-w-[64ch] text-ink/65">{it.a}</div>
        </details>
      ))}
    </div>
  );
}

/**
 * Steps on the Heyday line — spec A8.
 *
 * An ink rule with an orange dot per step. Only where order actually
 * matters; on an unordered list it is decoration pretending to be
 * information.
 */
export function LineSteps({
  steps,
  columns,
  className = "",
}: {
  steps: { eyebrow?: string; title: string; body?: ReactNode; extra?: ReactNode }[];
  columns?: number;
  className?: string;
}) {
  const n = columns ?? Math.min(steps.length, 4);
  return (
    <ol
      className={`relative mt-10 grid list-none gap-[22px] p-0 ${className}`}
      style={
        {
          gridTemplateColumns: `repeat(var(--hd-steps, ${n}), minmax(0, 1fr))`,
        } as CSSProperties
      }
    >
      <span
        aria-hidden
        className="absolute left-[3%] right-[3%] top-[21px] hidden h-0.5 bg-ink/25 lg:block"
      />
      {steps.map((s) => (
        <li key={s.title} className="relative pt-[52px]">
          <span
            aria-hidden
            className="absolute left-0 top-[13px] h-4 w-4 rounded-full border-2 border-ink"
            style={{ backgroundColor: ORANGE }}
          />
          {s.eyebrow ? (
            <small className="mb-1.5 block font-mono text-xs text-ink/55">
              {s.eyebrow}
            </small>
          ) : null}
          <b className="mb-1.5 block font-display text-[19px] font-bold leading-[1.25]">
            {s.title}
          </b>
          {s.body ? (
            <div className="m-0 text-[15.5px] text-ink/60">{s.body}</div>
          ) : null}
          {s.extra}
        </li>
      ))}
    </ol>
  );
}

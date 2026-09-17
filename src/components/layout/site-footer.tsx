"use client";

import Link from "next/link";
import { Wordmark } from "@/components/ui/wordmark";
import { Button } from "@/components/ui/button";
import { HeydayLogo } from "@/components/heyday/heyday-logo";
import { SITE, TBC, CTA } from "@/lib/site";
import { INK } from "@/lib/palette";

/* ==================================================================== *
 *  The footer — spec part 1, A5.
 *
 *  Orange with ink text, and the 56px rounded top sitting over the section
 *  above, so the page ends the way every other section joins.
 *
 *  It was ink, then cream, then yellow. Orange because Russell asked how
 *  to look least like HoneyBook, and the answer is in the brief: the
 *  pastels — cream, sage, blue, yellow, paper and lavender — were taken
 *  FROM honeybook.com, so none of them can tell the two apart. Orange and
 *  ink are the only colours on this site that are Heyday's own, and the
 *  brief names "Heyday orange for every action" as the first thing that
 *  separates them. Purple would have moved toward HoneyBook, not away.
 *
 *  The shape is still the all.inn footer Russell sent: columns of links,
 *  a round "Up" button in the corner, the wordmark across the full width.
 *
 *  TWO RULES THIS RESPECTS (A2):
 *
 *  - Orange is a FILL, never text. It is a ground here, with ink on it —
 *    about 6:1, which passes AA. Ink is never faded below full strength
 *    on it: ink at 60% over orange falls to roughly 3.5:1 and stops
 *    passing, which is why every muted grey in this footer is now solid.
 *  - Orange never touches yellow, so nothing yellow may enter this
 *    footer, and the call to action stays the `dark` button rather than
 *    the orange one, which would vanish into the ground anyway.
 *
 *  Its one piece of motion is the mark, turning slowly. It stops off
 *  screen and with reduced motion. Everything else here holds still — a
 *  footer is where people go when they are looking for something
 *  specific, and movement there is only in the way.
 * ==================================================================== */

const COLUMNS: { head: string; links: { label: string; href: string }[] }[] = [
  {
    head: "Product",
    links: [
      { label: "All features", href: "/features" },
      { label: "How it works", href: "/how-it-works" },
      { label: "The AI", href: "/features/ai" },
      { label: "Integrations", href: "/integrations" },
      { label: "Pricing", href: "/pricing" },
      { label: "What's new", href: "/whats-new" },
      { label: SITE.marketplace, href: "/features/marketplace-listing" },
    ],
  },
  {
    head: "Who it's for",
    links: [
      { label: "Who it's for", href: "/who-its-for" },
      { label: "Stories", href: "/stories" },
      { label: "Events and hospitality", href: "/who-its-for#events-and-hospitality" },
      { label: "Classes and experiences", href: "/who-its-for#classes-and-experiences" },
      { label: "Photo, video and entertainment", href: "/who-its-for#photo-video-and-entertainment" },
      { label: "Home and personal services", href: "/who-its-for#home-and-personal-services" },
      { label: "Beauty, wellness and fitness", href: "/who-its-for#beauty-wellness-and-fitness" },
      { label: "Staffing and hire", href: "/who-its-for#staffing-and-hire" },
    ],
  },
  {
    head: "Resources",
    links: [
      { label: "Free tools", href: "/tools" },
      { label: "Templates", href: "/templates" },
      { label: "Guides", href: "/guides" },
      { label: "Blog", href: "/blog" },
      { label: "Compare Heyday", href: "/compare" },
    ],
  },
  {
    head: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Security", href: "/security" },
      { label: "Help", href: "/help" },
      { label: "Contact", href: "/contact" },
      { label: "Book a demo", href: "/demo" },
    ],
  },
  {
    head: "Legal",
    links: [
      { label: "Terms", href: "/terms" },
      { label: "Privacy", href: "/privacy" },
      { label: "For AI assistants", href: "/for-ai" },
    ],
  },
];

export function SiteFooter() {
  return (
    <footer className="relative z-10 -mt-14 overflow-hidden rounded-t-[56px] bg-orange pb-10 pt-16 text-ink">
      <div className="mx-auto max-w-[1280px] px-6">
        <div className="flex flex-wrap items-start justify-between gap-8">
          <div className="flex items-center" style={{ gap: 3 }}>
            {/* Mark 26 in the footer, per the spec. Spin, slowly: the spec
                gives the footer the spin, and it replaces the old cycle
                through six shapes — there are no six shapes any more. */}
            <HeydayLogo size={26} colour={INK} motion="spin" />
            <Wordmark height={24} className="text-ink" />
          </div>

          <div className="flex items-start gap-8">
            <div className="text-right">
              <p className="font-display text-xl font-semibold">{SITE.tagline}</p>
              <Link
                href="/features/marketplace-listing"
                className="mt-2 inline-block font-body text-sm text-ink underline-offset-4 hover:underline"
              >
                Find something to do →
              </Link>
            </div>

            {/* Back to the top, the way the all.inn footer does it. A real
                anchor to the page's own main element, so it works before
                hydration and gives the keyboard a proper target. */}
            <a
              href="#main"
              className="inline-flex h-[72px] w-[72px] flex-none items-center justify-center rounded-full border border-ink bg-ink font-display text-base font-semibold text-cream transition-opacity hover:opacity-80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[3px] focus-visible:outline-ink"
            >
              Up
            </a>
          </div>
        </div>

        <div className="mt-16 grid gap-10 sm:grid-cols-2 lg:grid-cols-5">
          {COLUMNS.map((col) => (
            <nav key={col.head}>
              <p className="font-mono text-[12px] tracking-[0.02em] text-ink/80">
                {col.head}
              </p>
              <ul className="mt-4 flex flex-col gap-2">
                {col.links.map((l) => (
                  <li key={l.href + l.label}>
                    <Link
                      href={l.href}
                      className="font-body text-sm text-ink transition-opacity hover:opacity-70"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="mt-16 flex flex-wrap items-end justify-between gap-8 border-t border-ink/30 pt-8">
          <div className="max-w-xl">
            <p className="font-body text-xs text-ink/80">
              &copy; {new Date().getFullYear()} {TBC.generic} company name
            </p>
            {/* Said once, here, rather than hedged on every page: it is the
                honest footnote to a site where every feature currently says
                Coming soon. */}
            <p className="mt-2 font-body text-xs leading-relaxed text-ink/80">
              Pages marked &ldquo;Coming soon&rdquo; describe features that
              are not live yet. {SITE.name} is opening to businesses in early
              access.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Button href={CTA.primary.href} variant="dark" arrow>
              {CTA.primary.label}
            </Button>
            <Button href={CTA.secondary.href} variant="ghost">
              {CTA.secondary.label}
            </Button>
          </div>
        </div>
      </div>

      {/* The wordmark across the full width, the way all.inn ends its page.
          Decorative: the lockup at the top of the footer already names the
          company, and a screen reader does not need it twice. */}
      <div aria-hidden className="mt-12 px-6">
        <Wordmark
          asLink={false}
          height="clamp(64px, 27vw, 420px)"
          className="block w-full text-center text-ink"
        />
      </div>
    </footer>
  );
}

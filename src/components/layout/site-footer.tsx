"use client";

import Link from "next/link";
import { Wordmark } from "@/components/ui/wordmark";
import { Button } from "@/components/ui/button";
import { HeydayLogo } from "@/components/heyday/heyday-logo";
import { SITE, TBC, CTA } from "@/lib/site";
import { SKY } from "@/lib/palette";

/* ==================================================================== *
 *  The footer — spec part 1, A5.
 *
 *  Ink with cream text, and the 56px rounded top sitting over the section
 *  above, so the page ends the way every other section joins.
 *
 *  Its one piece of motion is the sun, slowly cycling through the six
 *  shapes. It stops off screen and with reduced motion. Everything else
 *  here holds still — a footer is where people go when they are looking
 *  for something specific, and movement there is only in the way.
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
    <footer className="relative z-10 -mt-14 rounded-t-[56px] bg-ink pb-12 pt-16 text-cream">
      <div className="mx-auto max-w-[1280px] px-6">
        <div className="flex flex-wrap items-start justify-between gap-8">
          <div className="flex items-center gap-3">
            {/* Spin, slowly. The spec gives the footer the spin, and it
                replaces the old cycle through six shapes — there are no
                six shapes any more. */}
            <HeydayLogo size={40} colour={SKY} motion="spin" />
            <Wordmark height={24} className="text-cream" />
          </div>

          <div className="text-right">
            <p className="font-display text-xl font-semibold">{SITE.tagline}</p>
            <Link
              href="/features/marketplace-listing"
              className="mt-2 inline-block font-body text-sm text-cream/70 underline-offset-4 hover:underline"
            >
              Find something to do →
            </Link>
          </div>
        </div>

        <div className="mt-16 grid gap-10 sm:grid-cols-2 lg:grid-cols-5">
          {COLUMNS.map((col) => (
            <nav key={col.head}>
              <p className="font-mono text-[12px] tracking-[0.02em] text-cream/45">
                {col.head}
              </p>
              <ul className="mt-4 flex flex-col gap-2">
                {col.links.map((l) => (
                  <li key={l.href + l.label}>
                    <Link
                      href={l.href}
                      className="font-body text-sm text-cream/80 transition-opacity hover:opacity-60"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="mt-16 flex flex-wrap items-end justify-between gap-8 border-t border-cream/15 pt-8">
          <div className="max-w-xl">
            <p className="font-body text-xs text-cream/45">
              &copy; {new Date().getFullYear()} {TBC.generic} company name
            </p>
            {/* Said once, here, rather than hedged on every page: it is the
                honest footnote to a site where every feature currently says
                Coming soon. */}
            <p className="mt-2 font-body text-xs leading-relaxed text-cream/45">
              Pages marked &ldquo;Coming soon&rdquo; describe features that
              are not live yet. {SITE.name} is opening to businesses in early
              access.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Button href={CTA.primary.href} variant="primary" arrow>
              {CTA.primary.label}
            </Button>
            <Button
              href={CTA.secondary.href}
              variant="ghost"
              className="border-cream text-cream"
            >
              {CTA.secondary.label}
            </Button>
          </div>
        </div>
      </div>
    </footer>
  );
}

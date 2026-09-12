"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { Button } from "@/components/ui/button";
import { SynergyBrain } from "@/components/home/synergy-brain";
import { CREAM, SAGE, BLUE, YELLOW, LAVENDER } from "@/lib/palette";

/* ==================================================================== *
 *  The six sections of gsap.com, rebuilt for up+up.
 *
 *  gsap.com runs: hero (one enormous line) → a single statement → a
 *  horizontally-travelling band → feature rows → a showcase rail → a
 *  multi-column footer. That order is the whole shape of the page, and
 *  four of the six only work because the document scrolls.
 *
 *  The content spine is getjobber.com/features, which sorts everything it
 *  sells into four outcomes rather than into a feature list: Get Noticed,
 *  Win Jobs, Work Smarter, Boost Profits. The same sort applied to what
 *  up+up builds puts all nine agents and all three tools somewhere a
 *  business owner would look for them, which an A-Z of capabilities never
 *  does.
 *
 *  Copy here is up+up's own, written to the structure. Images are still to
 *  come — every tile below is a colour field sized and placed where the
 *  image goes, so swapping them in is a src attribute and nothing else.
 * ==================================================================== */

/** The bracketed label from gsap.com. */
function Braced({ children }: { children: React.ReactNode }) {
  return (
    <span className="flex max-w-md items-stretch gap-3 font-body text-sm font-light leading-snug text-ink/70">
      <span aria-hidden className="font-display text-4xl leading-none text-ink/35">
        {"{"}
      </span>
      <span className="self-center">{children}</span>
      <span aria-hidden className="font-display text-4xl leading-none text-ink/35">
        {"}"}
      </span>
    </span>
  );
}

/* -------------------------------------------------------------- *
 *  1. Hero
 * -------------------------------------------------------------- */

export function GsapHero() {
  return (
    <div className="mx-auto grid w-full max-w-[1400px] items-center gap-8 px-6 lg:grid-cols-[1.1fr_1fr]">
      <div>
        {/* Sized in vw so the line fills the screen at any width instead of
            stepping between breakpoints — the reason gsap's hero reads as
            large on a laptop and still large on a phone. */}
        <h1 className="font-body text-[clamp(3rem,10.5vw,9rem)] font-light leading-[0.86] tracking-[-0.045em]">
          Automate
          <br />
          anything
        </h1>
        <p className="mt-8 max-w-xl font-body text-lg font-light leading-relaxed text-ink/70">
          up+up builds AI agents and automation around how your business
          already runs — not around how software thinks it should.
        </p>
        <div className="mt-10 flex flex-wrap gap-4">
          <Button href="/contact">Start a conversation</Button>
          <Button href="/services" variant="outline">
            See what we build
          </Button>
        </div>
      </div>

      {/* The decorative graphic slot. gsap.com puts an animated form beside
          the headline; ours is the synergy brain, which carries meaning as
          well as movement. Hidden below lg — at phone width it would take
          the whole screen and push the headline off it. */}
      <div className="hidden lg:block">
        <div className="scale-[0.82] origin-center">
          <SynergyBrain />
        </div>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------- *
 *  2. The statement
 * -------------------------------------------------------------- */

export function GsapStatement() {
  return (
    <div className="mx-auto w-full max-w-[1400px] px-6">
      <Braced>Why now</Braced>
      <h2 className="mt-14 max-w-[18ch] font-body text-[clamp(2.25rem,7vw,6.25rem)] font-light leading-[0.95] tracking-[-0.035em]">
        The best businesses aren&apos;t run by super humans working 24/7.
        They&apos;re run by smart people with smarter systems.
      </h2>
    </div>
  );
}

/* -------------------------------------------------------------- *
 *  3. The sideways band
 * -------------------------------------------------------------- */

/**
 * getjobber sorts everything into four outcomes. These are the same four,
 * named for a business that sells time rather than jobs, with every agent
 * and tool up+up builds placed under the outcome it produces.
 */
const BANDS = [
  {
    n: "01",
    title: "Get found",
    copy: "The work that brings people to you, running whether or not anyone remembered to do it.",
    items: ["Marketing agent", "Reporting & insights"],
    tint: CREAM,
  },
  {
    n: "02",
    title: "Win the work",
    copy: "Quote in minutes, answer at midnight, follow up without being chased.",
    items: ["Sales agent", "Receptionist agent", "Quotes & Bookings"],
    tint: BLUE,
  },
  {
    n: "03",
    title: "Run it without you",
    copy: "The day-to-day that eats your week — scheduling, answering, chasing, filing — handled.",
    items: [
      "Customer Service agent",
      "Operations agent",
      "HR agent",
      "Unified Inbox",
      "CRM",
    ],
    tint: SAGE,
  },
  {
    n: "04",
    title: "Keep more of it",
    copy: "Know what each job actually made you, and stay on the right side of the paperwork.",
    items: ["Finance agent", "Compliance agent"],
    tint: LAVENDER,
  },
];

/**
 * The horizontal band.
 *
 * The section is four viewports tall and its contents are sticky, so
 * scrolling down moves the track sideways. Travel is measured from the
 * track's real width rather than assumed as a percentage — the panels size
 * themselves from their copy, so a hardcoded -75% would either stop short
 * or run past the last panel at some widths.
 */
export function GsapSideways() {
  const section = useRef<HTMLDivElement | null>(null);
  const track = useRef<HTMLDivElement | null>(null);
  const [travel, setTravel] = useState(0);

  const { scrollYProgress } = useScroll({
    target: section,
    offset: ["start start", "end end"],
  });
  const x = useTransform(scrollYProgress, [0, 1], [0, -travel]);

  useEffect(() => {
    const measure = () => {
      const el = track.current;
      if (!el) return;
      setTravel(Math.max(0, el.scrollWidth - window.innerWidth));
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  return (
    <div ref={section} className="relative h-[400vh]">
      <div className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden">
        <div className="mx-auto w-full max-w-[1400px] px-6 pb-10">
          <Braced>What we do</Braced>
        </div>

        <motion.div ref={track} style={{ x }} className="flex gap-6 pl-6 pr-[25vw]">
          {BANDS.map((b) => (
            <article
              key={b.n}
              className="flex w-[86vw] shrink-0 flex-col justify-between rounded-3xl p-10 md:w-[46vw] lg:w-[34vw]"
              style={{ backgroundColor: b.tint }}
            >
              <div>
                <span className="font-display text-sm text-ink/45">{b.n}</span>
                <h3 className="mt-5 font-body text-[clamp(1.9rem,3.4vw,3.1rem)] font-light leading-[1.02] tracking-[-0.03em]">
                  {b.title}
                </h3>
                <p className="mt-5 max-w-sm font-body text-base font-light leading-relaxed text-ink/70">
                  {b.copy}
                </p>
              </div>
              <ul className="mt-12 flex flex-col gap-1.5 border-t border-ink/15 pt-6">
                {b.items.map((i) => (
                  <li key={i} className="font-body text-sm font-light text-ink/75">
                    {i}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </motion.div>

        <div className="mx-auto mt-10 w-full max-w-[1400px] px-6">
          <p className="font-body text-xs font-light uppercase tracking-[0.18em] text-ink/35">
            Keep scrolling →
          </p>
        </div>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------- *
 *  4. Feature rows
 * -------------------------------------------------------------- */

const ROWS = [
  {
    lead: "Nine agents,",
    accent: "one system",
    accentColour: BLUE,
    copy: "Every agent shares the same view of your business. The one that answers the phone knows what the one that sent the quote said yesterday.",
    href: "/services",
    cta: "How it fits together",
  },
  {
    lead: "Built for how",
    accent: "you already work",
    accentColour: YELLOW,
    copy: "We map your process before we build anything. The system learns your rules — your pricing, your exceptions, the things only you knew.",
    href: "/about",
    cta: "Our approach",
  },
  {
    lead: "It gets sharper",
    accent: "the longer it runs",
    accentColour: SAGE,
    copy: "We do not hand over software and disappear. The system keeps improving as your business changes, and it keeps running when people move on.",
    href: "/contact",
    cta: "Talk to us",
  },
];

/** One feature row. Reveals and parallaxes from its own position. */
function FeatureRow({ row, flip }: { row: (typeof ROWS)[number]; flip: boolean }) {
  const ref = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  // The blob drifts further than the text, which is what makes the pairing
  // read as two planes rather than one card.
  const blobY = useTransform(scrollYProgress, [0, 1], [90, -90]);
  const textY = useTransform(scrollYProgress, [0, 1], [30, -30]);

  return (
    <div
      ref={ref}
      className={`grid items-center gap-12 py-24 lg:grid-cols-2 ${
        flip ? "lg:[&>*:first-child]:order-2" : ""
      }`}
    >
      <motion.div style={{ y: textY }}>
        <h3 className="max-w-[14ch] font-body text-[clamp(2rem,5vw,4.25rem)] font-light leading-[0.98] tracking-[-0.035em]">
          {row.lead}{" "}
          <span
            className="rounded-lg px-2 decoration-clone"
            style={{ backgroundColor: row.accentColour }}
          >
            {row.accent}
          </span>
        </h3>
        <p className="mt-8 max-w-md font-body text-base font-light leading-relaxed text-ink/70">
          {row.copy}
        </p>
        <div className="mt-8">
          <Link
            href={row.href}
            className="inline-flex items-center gap-2 rounded-full border border-ink/20 px-6 py-3 font-body text-sm font-light transition-colors hover:border-ink/50"
          >
            {row.cta}
            <span className="text-xs">→</span>
          </Link>
        </div>
      </motion.div>

      {/* The gradient form. gsap pairs each feature with a soft shape rather
          than a screenshot; it carries the colour without having to be
          truthful about a UI that is still being built. */}
      <motion.div style={{ y: blobY }} className="flex justify-center">
        <div
          aria-hidden
          className="aspect-square w-full max-w-[26rem] rounded-full blur-[2px]"
          style={{
            background: `radial-gradient(circle at 35% 30%, ${row.accentColour} 0%, ${row.accentColour}cc 42%, transparent 72%)`,
          }}
        />
      </motion.div>
    </div>
  );
}

export function GsapFeatures() {
  return (
    <div className="mx-auto w-full max-w-[1400px] px-6">
      <Braced>Why up+up</Braced>
      {ROWS.map((r, i) => (
        <FeatureRow key={r.accent} row={r} flip={i % 2 === 1} />
      ))}
    </div>
  );
}

/* -------------------------------------------------------------- *
 *  5. The showcase rail
 * -------------------------------------------------------------- */

/**
 * Real systems from the Tipsy Parties build — not invented clients and not
 * borrowed logos. Each tile is a colour field where the screenshot goes.
 */
const SHOWCASE = [
  {
    name: "Instant quoting",
    note: "A quote in under a minute, priced from the same rules a human would apply.",
    tint: CREAM,
  },
  {
    name: "Live booking",
    note: "Customers book themselves in against real availability.",
    tint: BLUE,
  },
  {
    name: "Staff allocation",
    note: "The right people to the right job, with clashes caught before they happen.",
    tint: SAGE,
  },
  {
    name: "Unified inbox",
    note: "Email, WhatsApp and forms in one thread per customer.",
    tint: LAVENDER,
  },
  {
    name: "Automated payouts",
    note: "Hours in, pay out, no spreadsheet in between.",
    tint: CREAM,
  },
  {
    name: "ID verification",
    note: "Right-to-work checks handled at sign-up, not chased later.",
    tint: BLUE,
  },
];

export function GsapShowcase() {
  return (
    <div className="w-full">
      <div className="mx-auto w-full max-w-[1400px] px-6">
        <Braced>Built and running</Braced>
        <h2 className="mt-10 max-w-[16ch] font-body text-[clamp(2rem,5.5vw,4.75rem)] font-light leading-[0.96] tracking-[-0.035em]">
          One business, six systems, one connected operation.
        </h2>
      </div>

      {/* A free rail rather than a second pinned band — two pinned horizontal
          sections in one page reads as a trick repeated. This one you push
          yourself, and it snaps. */}
      <div className="mt-14 flex snap-x snap-mandatory gap-5 overflow-x-auto px-6 pb-6 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {SHOWCASE.map((s) => (
          <figure
            key={s.name}
            className="w-[80vw] shrink-0 snap-start sm:w-[46vw] lg:w-[30vw]"
          >
            <div
              aria-hidden
              className="aspect-[4/3] w-full rounded-2xl"
              style={{ backgroundColor: s.tint }}
            />
            <figcaption className="mt-4">
              <p className="font-body text-base font-light">{s.name}</p>
              <p className="mt-1 max-w-xs font-body text-sm font-light leading-relaxed text-ink/55">
                {s.note}
              </p>
            </figcaption>
          </figure>
        ))}
      </div>

      <div className="mx-auto mt-10 w-full max-w-[1400px] px-6">
        <Button href="/projects/tipsy-parties">Read the case study</Button>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------- *
 *  6. Footer
 * -------------------------------------------------------------- */

const FOOTER_COLS = [
  {
    head: "What we do",
    links: [
      { label: "AI agents", href: "/services" },
      { label: "Automation", href: "/services" },
      { label: "Custom systems", href: "/services" },
      { label: "Integrations", href: "/services" },
    ],
  },
  {
    head: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Projects", href: "/projects" },
      { label: "Blog", href: "/blog" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    head: "Legal",
    links: [
      { label: "Privacy Policy", href: "/privacy-policy" },
      { label: "Terms of Service", href: "/terms-of-service" },
    ],
  },
];

export function GsapFooter() {
  return (
    <div className="mx-auto w-full max-w-[1400px] px-6 pb-16 pt-28">
      <h2 className="max-w-[14ch] font-body text-[clamp(2.25rem,7vw,6rem)] font-light leading-[0.95] tracking-[-0.035em]">
        Ready to see what&apos;s possible?
      </h2>
      <div className="mt-10">
        <Button href="/contact">Start a conversation</Button>
      </div>

      <div className="mt-24 grid gap-10 border-t border-ink/15 pt-12 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <span className="text-2xl tracking-tight">
            <span className="font-body font-light">up</span>
            <span className="font-display text-[1.15em]">+up</span>
            <span className="relative -top-[0.35em] -ml-[0.15em] font-body text-[0.7em] leading-none">
              ^
            </span>
          </span>
          <p className="mt-4 max-w-xs font-body text-sm font-light leading-relaxed text-ink/55">
            AI agents and automation for businesses that would rather grow than
            hire.
          </p>
        </div>

        {FOOTER_COLS.map((col) => (
          <nav key={col.head}>
            <p className="font-body text-xs font-light uppercase tracking-[0.18em] text-ink/40">
              {col.head}
            </p>
            <ul className="mt-4 flex flex-col gap-2">
              {col.links.map((l) => (
                <li key={l.label}>
                  <Link
                    href={l.href}
                    className="font-body text-sm font-light text-ink/70 transition-colors hover:text-ink"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </div>

      <p className="mt-14 font-body text-xs font-light text-ink/30">
        &copy; {new Date().getFullYear()} up+up
      </p>
    </div>
  );
}

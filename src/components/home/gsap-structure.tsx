"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { SynergyBrain } from "@/components/home/synergy-brain";
import { LetterReveal, WordReveal } from "@/components/home/reveal-text";
import { CREAM, SAGE, BLUE, YELLOW, LAVENDER } from "@/lib/palette";

/* ==================================================================== *
 *  The six sections of gsap.com, rebuilt for up+up.
 *
 *  Second pass. The first was written to a description of gsap.com; this
 *  one is written to measurements taken off the live page, which turned
 *  out to disagree with the description in the places that mattered most:
 *
 *  - Its hero is 221px at weight 600, split into individual letters that
 *    arrive one at a time. Ours was 144px at weight 300 and arrived all at
 *    once. Light weights thin out as they scale, which is why it was hard
 *    to read rather than merely quiet.
 *  - Its statement reveals word by word as you scroll. Ours just sat there.
 *  - It has an ordinary fixed header with real navigation. We had a
 *    floating wordmark and a hamburger.
 *  - Its feature rows put the coloured keyword ABOVE the heading as a small
 *    label, keep the shape on the left every time, and separate rows with a
 *    hairline. Ours highlighted a word inside the heading and alternated
 *    sides, which reads as a different pattern entirely.
 *  - Nearly every section is bounded top and bottom by a hairline rule.
 *
 *  The content spine stays getjobber.com/features: everything sorted by
 *  outcome rather than listed as features.
 * ==================================================================== */

/** Content column, matching gsap's ~6vw gutter. */
const SHELL = "mx-auto w-full max-w-[1400px] px-6";

/** The hairline that bounds most sections. */
function Rule() {
  return <div className={SHELL}><div className="h-px w-full bg-ink/12" /></div>;
}

/**
 * The bracketed label. Small bold text held inside a pair of thin outline
 * braces — 13px on the live site, not the 14px-in-a-serif-brace we had.
 */
function Braced({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-stretch gap-2 font-body text-[13px] font-medium tracking-tight text-ink/80">
      <span aria-hidden className="font-body text-3xl font-extralight leading-none text-ink/50">
        {"{"}
      </span>
      <span className="self-center">{children}</span>
      <span aria-hidden className="font-body text-3xl font-extralight leading-none text-ink/50">
        {"}"}
      </span>
    </span>
  );
}

/** The pill button. Outline, fully rounded, medium weight. */
function Pill({
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

/* -------------------------------------------------------------- *
 *  1. Hero
 * -------------------------------------------------------------- */

export function GsapHero() {
  return (
    <div className={`${SHELL} relative`}>
      {/* The decorative element. gsap pairs its headline with something that
          moves; ours is the synergy brain, held behind the type and well
          back in contrast so it reads as motion in the room rather than as
          a second thing to look at. */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-24 top-1/2 hidden -translate-y-1/2 opacity-40 lg:block"
      >
        <div className="origin-center scale-[0.72]">
          <SynergyBrain />
        </div>
      </div>

      <div className="relative">
        {/* 16vw against gsap's 19vw — ours is two eight-letter words rather
            than "Animate/Anything", so the same proportion would run off the
            side at narrow widths. Weight 600 exactly as measured. */}
        <h1 className="font-body text-[clamp(2.75rem,16vw,13rem)] font-semibold leading-[0.84] tracking-[-0.045em]">
          <span className="block">
            <LetterReveal text="Automate" delay={0.15} />
          </span>
          <span className="block">
            <LetterReveal text="anything" delay={0.5} />
          </span>
        </h1>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.15, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="mt-10 max-w-xl font-body text-lg leading-relaxed text-ink/75">
            up+up builds AI agents and automation around how your business
            already runs — not around how software thinks it should.
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <Pill href="/contact" solid>
              Start a conversation
            </Pill>
            <Pill href="/services">See what we build</Pill>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------- *
 *  2. The statement
 * -------------------------------------------------------------- */

export function GsapStatement() {
  return (
    <div className="w-full">
      <Rule />
      <div className={`${SHELL} py-24`}>
        <Braced>Why now</Braced>
        {/* 5.6vw at weight 400, matching the measured 65px at a 1148px
            viewport. The words light one after another as the section
            crosses the screen. */}
        <WordReveal
          className="mt-14 max-w-[19ch] font-body text-[clamp(1.9rem,5.6vw,4.6rem)] font-normal leading-[1.14] tracking-[-0.02em]"
          text="The best businesses aren't run by super humans working 24/7. They're run by smart people with smarter systems."
        />
      </div>
      <Rule />
    </div>
  );
}

/* -------------------------------------------------------------- *
 *  3. The sideways band
 * -------------------------------------------------------------- */

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
 * Four viewports tall with sticky contents, so scrolling down moves the
 * track sideways. Travel is measured from the track's real width rather
 * than assumed as a percentage — the panels size themselves from their
 * copy, so a hardcoded -75% would stop short or overrun at some widths.
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
        <div className={`${SHELL} pb-10`}>
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
                <span className="font-body text-sm font-medium text-ink/45">
                  {b.n}
                </span>
                <h3 className="mt-5 font-body text-[clamp(1.9rem,3.4vw,3.1rem)] font-medium leading-[1.02] tracking-[-0.03em]">
                  {b.title}
                </h3>
                <p className="mt-5 max-w-sm font-body text-base leading-relaxed text-ink/70">
                  {b.copy}
                </p>
              </div>
              <ul className="mt-12 flex flex-col gap-1.5 border-t border-ink/20 pt-6">
                {b.items.map((i) => (
                  <li key={i} className="font-body text-sm text-ink/75">
                    {i}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </motion.div>

        <div className={`${SHELL} mt-10`}>
          <p className="font-body text-xs font-medium uppercase tracking-[0.18em] text-ink/40">
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
    kicker: "Agents",
    tint: BLUE,
    head: "Nine agents that share one view of your business.",
    copy: "The one that answers the phone knows what the one that sent the quote said yesterday.",
    href: "/services",
    cta: "Explore agents",
  },
  {
    kicker: "Fit",
    tint: YELLOW,
    head: "Built for how you already work.",
    copy: "We map your process before we build anything, so the system learns your pricing, your exceptions, and the things only you knew.",
    href: "/about",
    cta: "Explore our approach",
  },
  {
    kicker: "Longevity",
    tint: SAGE,
    head: "It gets sharper the longer it runs.",
    copy: "We do not hand over software and disappear. It keeps improving as the business changes, and it keeps running when people move on.",
    href: "/contact",
    cta: "Explore working with us",
  },
];

function FeatureRow({ row, last }: { row: (typeof ROWS)[number]; last: boolean }) {
  const ref = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  // The shape drifts further than the text, which is what makes the pair
  // read as two planes rather than one block.
  const blobY = useTransform(scrollYProgress, [0, 1], [60, -60]);

  return (
    <div ref={ref}>
      <div className="grid items-center gap-8 py-20 md:grid-cols-[1fr_2fr]">
        {/* The shape. Small — 130px on the live site, not a half-screen
            gradient — and on the left in every row. Alternating sides was an
            invention and it broke the rhythm. */}
        <motion.div style={{ y: blobY }} className="flex md:justify-start">
          <div
            aria-hidden
            className="h-32 w-32 md:h-40 md:w-40"
            style={{
              background: `linear-gradient(150deg, ${row.tint} 0%, ${row.tint}88 100%)`,
              borderRadius: "56% 44% 49% 51% / 47% 52% 48% 53%",
            }}
          />
        </motion.div>

        <div>
          <p
            className="font-body text-lg font-semibold"
            style={{ color: row.tint }}
          >
            {/* The keyword sits above the heading as its own label. A colour
                this pale needs a dark edge to stay legible on a pale ground,
                so it carries a subtle outline rather than relying on fill. */}
            <span
              style={{
                WebkitTextStroke: "0.4px rgba(10,10,10,0.55)",
              }}
            >
              {row.kicker}
            </span>
          </p>
          <h3 className="mt-5 max-w-[22ch] font-body text-[clamp(1.5rem,2.9vw,2.5rem)] font-normal leading-[1.15] tracking-[-0.02em]">
            {row.head}
          </h3>
          <p className="mt-5 max-w-lg font-body text-base leading-relaxed text-ink/65">
            {row.copy}
          </p>
          <div className="mt-8">
            <Pill href={row.href}>{row.cta}</Pill>
          </div>
        </div>
      </div>
      {!last && <div className="h-px w-full bg-ink/12" />}
    </div>
  );
}

export function GsapFeatures() {
  return (
    <div className="w-full">
      <Rule />
      <div className={`${SHELL} py-20`}>
        <Braced>Why up+up</Braced>
        <div className="mt-8">
          {ROWS.map((r, i) => (
            <FeatureRow key={r.kicker} row={r} last={i === ROWS.length - 1} />
          ))}
        </div>
      </div>
      <Rule />
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
    <div className="w-full py-20">
      <div className={SHELL}>
        <Braced>Built and running</Braced>
        {/* gsap sets its showcase heading at weight 600, much heavier than
            the statement above it — the section is a change of gear. */}
        <h2 className="mt-10 font-body text-[clamp(2.5rem,6.5vw,5.5rem)] font-semibold leading-[0.95] tracking-[-0.04em]">
          Showcase
        </h2>
        <p className="mt-6 max-w-xl font-body text-lg leading-relaxed text-ink/70">
          One business, six systems, one connected operation.
        </p>
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
              <p className="font-body text-base font-medium">{s.name}</p>
              <p className="mt-1 max-w-xs font-body text-sm leading-relaxed text-ink/55">
                {s.note}
              </p>
            </figcaption>
          </figure>
        ))}
      </div>

      <div className={`${SHELL} mt-10`}>
        <Pill href="/projects/tipsy-parties">Read the case study</Pill>
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
    tint: BLUE,
    links: [
      { label: "AI agents", href: "/services" },
      { label: "Automation", href: "/services" },
      { label: "Custom systems", href: "/services" },
      { label: "Integrations", href: "/services" },
    ],
  },
  {
    head: "Company",
    tint: SAGE,
    links: [
      { label: "About", href: "/about" },
      { label: "Projects", href: "/projects" },
      { label: "Blog", href: "/blog" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    head: "Legal",
    tint: LAVENDER,
    links: [
      { label: "Privacy Policy", href: "/privacy-policy" },
      { label: "Terms of Service", href: "/terms-of-service" },
    ],
  },
];

export function GsapFooter() {
  return (
    <div className={`${SHELL} pb-16 pt-28`}>
      <h2 className="max-w-[14ch] font-body text-[clamp(2.25rem,7vw,6rem)] font-semibold leading-[0.92] tracking-[-0.04em]">
        Ready to see what&apos;s possible?
      </h2>
      <div className="mt-10">
        <Pill href="/contact" solid>
          Start a conversation
        </Pill>
      </div>

      {/* gsap's link farm colours each column head and leaves the links
          plain. It is the one place a lot of colour sits together without
          shouting. */}
      <div className="mt-24 grid gap-10 border-t border-ink/15 pt-12 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <span className="text-2xl leading-none tracking-tight">
            <span className="font-body font-medium">up</span>
            <span className="font-display text-[1.15em] font-medium">+up</span>
            <span className="relative -top-[0.35em] -ml-[0.15em] font-body text-[0.7em] font-medium leading-none">
              ^
            </span>
          </span>
          <p className="mt-4 max-w-xs font-body text-sm leading-relaxed text-ink/55">
            AI agents and automation for businesses that would rather grow than
            hire.
          </p>
        </div>

        {FOOTER_COLS.map((col) => (
          <nav key={col.head}>
            <p
              className="font-body text-sm font-semibold"
              style={{
                color: col.tint,
                WebkitTextStroke: "0.4px rgba(10,10,10,0.55)",
              }}
            >
              {col.head}
            </p>
            <ul className="mt-4 flex flex-col gap-2">
              {col.links.map((l) => (
                <li key={l.label}>
                  <Link
                    href={l.href}
                    className="font-body text-sm text-ink/70 transition-colors hover:text-ink"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </div>

      <p className="mt-14 font-body text-xs text-ink/35">
        &copy; {new Date().getFullYear()} up+up
      </p>
    </div>
  );
}

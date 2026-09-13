"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  GsapHero,
  GsapStatement,
  GsapSideways,
  GsapFeatures,
  GsapShowcase,
} from "@/components/home/gsap-structure";
import {
  ProductSurface,
  AiSection,
  IndustriesSection,
  SupportSection,
} from "@/components/home/product-sections";
import { CREAM, PAPER, LAVENDER } from "@/lib/palette";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";

/**
 * Ground colour per section. The page blends between these as you scroll,
 * so colour signals where you are rather than decorating.
 *
 * Keyed by section id rather than set on each section object, so the whole
 * mapping can be read and retuned in one place.
 */
const GROUNDS: Record<string, string> = {
  // The six sections of gsap.com, in order. Yellow is deliberately absent
  // as a ground — it appears once, as a keyword highlight in a feature row.
  "g-hero": CREAM,
  "g-statement": PAPER,
  "g-sideways": PAPER,
  "g-features": PAPER,
  // The product sections stay on paper. They are the reading part of the
  // page — four colour changes in a row would make it feel like a brochure.
  "g-surface": PAPER,
  "g-ai": PAPER,
  "g-industries": PAPER,
  "g-support": PAPER,
  "g-showcase": LAVENDER,

};

/**
 * The running order of the page, top to bottom.
 *
 * Ten sections: the six from gsap.com’s structure, with the four product
 * sections slotted between the feature rows and the showcase.
 */
const sections = [
  /* raw: the hero manages its own height and reads its own scroll
     position to scatter the headline. Wrapping it in the standard
     one-screen frame would fade it out against its own animation. */
  { id: "g-hero", raw: true, content: () => <GsapHero /> },
  { id: "g-statement", content: () => <GsapStatement /> },
  { id: "g-sideways", raw: true, content: () => <GsapSideways /> },
  { id: "g-features", raw: true, content: () => <GsapFeatures /> },
  /* The product sections. They sit here deliberately — after the feature
     rows have said what Heyday is for, and before the showcase says who has
     used it. This is where the page stops selling the idea and explains the
     software. Running order taken from getjobber.com's home page: product
     surface, then the AI, then breadth, then what switching involves. */
  { id: "g-surface", raw: true, content: () => <ProductSurface /> },
  { id: "g-ai", raw: true, content: () => <AiSection /> },
  { id: "g-industries", raw: true, content: () => <IndustriesSection /> },
  { id: "g-support", raw: true, content: () => <SupportSection /> },

  { id: "g-showcase", content: () => <GsapShowcase /> },

];


/* ------------------------------------------------------------------ *
 *  The scrolling document.
 *
 *  An ordinary tall page: every section is a block in normal flow, with
 *  the ground colour pinned behind and driven by scroll position. Sections
 *  flagged `raw` opt out of the standard one-screen parallax frame because
 *  they manage their own height — the sideways band is four viewports
 *  tall, the footer is shorter than one.
 * ------------------------------------------------------------------ */

/**
 * The rail. Labelled chapters rather than one dot per section — a dot
 * column tells you how far through you are but not what is there.
 */
const CHAPTERS: { label: string; index: number }[] = [
  { label: "Top", index: 0 },
  { label: "Why now", index: sections.findIndex((s) => s.id === "g-statement") },
  { label: "What we do", index: sections.findIndex((s) => s.id === "g-sideways") },
  { label: "Why Heyday", index: sections.findIndex((s) => s.id === "g-features") },
  { label: "What it does", index: sections.findIndex((s) => s.id === "g-surface") },
  { label: "The agents", index: sections.findIndex((s) => s.id === "g-ai") },
  { label: "Who it's for", index: sections.findIndex((s) => s.id === "g-industries") },
  { label: "Getting started", index: sections.findIndex((s) => s.id === "g-support") },
  { label: "Built", index: sections.findIndex((s) => s.id === "g-showcase") },
].filter((c) => c.index >= 0);

/* --- colour blending, so the ground moves with the scroll rather than
       crossfading on a timer after the fact --- */

function hexToRgb(hex: string): [number, number, number] {
  const h = hex.replace("#", "");
  return [
    parseInt(h.slice(0, 2), 16),
    parseInt(h.slice(2, 4), 16),
    parseInt(h.slice(4, 6), 16),
  ];
}

function mixHex(a: string, b: string, t: number): string {
  if (t <= 0) return a;
  if (t >= 1) return b;
  const [r1, g1, b1] = hexToRgb(a);
  const [r2, g2, b2] = hexToRgb(b);
  const m = (x: number, y: number) => Math.round(x + (y - x) * t);
  return `rgb(${m(r1, r2)}, ${m(g1, g2)}, ${m(b1, b2)})`;
}

/**
 * One section of the document.
 *
 * The parallax and the reveal both come from this section's own position in
 * the viewport, not from a global clock — content rises as it arrives and
 * keeps rising as it leaves, so the page reads as continuous travel rather
 * than as a series of arrivals. `offset` runs from "this section's top hits
 * the bottom of the screen" to "its bottom hits the top", which is the whole
 * time any part of it is visible.
 */
function ScrollSection({
  id,
  children,
  register,
  raw = false,
}: {
  id: string;
  children: React.ReactNode;
  register: (el: HTMLElement | null) => void;
  raw?: boolean;
}) {
  const ref = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  // Travels 70px against the scroll. Small enough to read as depth rather
  // than as the text sliding independently of the page.
  const y = useTransform(scrollYProgress, [0, 1], [70, -70]);
  const opacity = useTransform(scrollYProgress, [0, 0.28, 0.72, 1], [0, 1, 1, 0]);

  // A raw section is still registered — the ground map and the chapter rail
  // both index by section — but it is handed the page as-is. Applying the
  // one-screen frame to a sticky, four-viewport band would pin the parallax
  // wrapper instead of the band, and fade the whole thing out halfway
  // through its own horizontal travel.
  if (raw) {
    return (
      <section
        id={id}
        ref={(el) => {
          ref.current = el;
          register(el);
        }}
        className="relative w-full"
      >
        {children}
      </section>
    );
  }

  return (
    <section
      id={id}
      ref={(el) => {
        ref.current = el;
        register(el);
      }}
      className="relative flex min-h-screen w-full items-center py-24"
    >
      <motion.div style={{ y, opacity }} className="w-full">
        {children}
      </motion.div>
    </section>
  );
}

export default function Home() {
  const els = useRef<(HTMLElement | null)[]>([]);
  const [active, setActive] = useState(0);
  const [ground, setGround] = useState<string>(GROUNDS[sections[0].id] ?? PAPER);

  useEffect(() => {
    let frame = 0;

    const measure = () => {
      frame = 0;
      const mid = window.scrollY + window.innerHeight / 2;

      // Which section owns the middle of the screen, and how far through it
      // we are. Measured from live offsets rather than assuming every section
      // is exactly one viewport — several carry enough copy to be taller.
      let i = 0;
      for (let k = 0; k < els.current.length; k++) {
        const el = els.current[k];
        if (!el) continue;
        if (mid >= el.offsetTop) i = k;
        else break;
      }
      const el = els.current[i];
      if (!el) return;
      const f = Math.min(1, Math.max(0, (mid - el.offsetTop) / el.offsetHeight));

      setActive(i);

      // Ground. Held for the first two thirds of a section, then blended into
      // the next — the colour change lands as you leave, not as you arrive,
      // so you never read a statement against a colour that is still moving.
      const cur = GROUNDS[sections[i].id] ?? PAPER;
      const nxt = GROUNDS[sections[Math.min(i + 1, sections.length - 1)].id] ?? PAPER;
      setGround(mixHex(cur, nxt, f < 0.66 ? 0 : (f - 0.66) / 0.34));

    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(measure);
    };

    measure();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  const activeChapter = CHAPTERS.reduce(
    (best, c, n) => (active >= c.index ? n : best),
    0
  );

  return (
    <div className="relative text-ink">
      {/* Pinned backdrop. Everything here stays still while the document
          moves over it; all of it is driven by scroll position. */}
      <div aria-hidden className="pointer-events-none fixed inset-0 z-0">
        <div className="absolute inset-0" style={{ backgroundColor: ground }} />
      </div>

      {/* The header. A fixed bar with real navigation and one call to
          action, replacing the floating wordmark, the stray "Contact" link
          and the hamburger that used to stand in for it. */}
      <SiteHeader />

      {/* The document. */}
      <div className="relative z-10 pt-[7.2rem]">
        {sections.map((s, i) => (
          <ScrollSection
            key={s.id}
            id={s.id}
            raw={"raw" in s && Boolean((s as { raw?: boolean }).raw)}
            register={(el) => {
              els.current[i] = el;
            }}
          >
            {s.content()}
          </ScrollSection>
        ))}
      </div>

      <SiteFooter />

      {/* Chapter rail. Labels appear on hover — a bare dot column tells you
          how far through you are but not what is there. */}
      <nav className="fixed right-6 top-1/2 z-50 hidden -translate-y-1/2 flex-col items-end gap-3 md:flex">
        {CHAPTERS.map((c, n) => (
          <button
            key={c.label}
            onClick={() =>
              els.current[c.index]?.scrollIntoView({ behavior: "smooth" })
            }
            className="group flex items-center gap-2"
            aria-label={c.label}
          >
            <span className="font-body text-[11px] font-light uppercase tracking-[0.14em] text-ink/0 transition-colors group-hover:text-ink/60">
              {c.label}
            </span>
            <span
              className={`h-1.5 w-1.5 rounded-full transition-all duration-300 ${
                n === activeChapter
                  ? "scale-150 bg-ink"
                  : "bg-ink/25 group-hover:bg-ink/50"
              }`}
            />
          </button>
        ))}
      </nav>

      {/* Scroll hint, first screen only. */}
      <motion.div
        className="pointer-events-none fixed bottom-8 left-1/2 z-50 -translate-x-1/2 text-ink/40"
        animate={{ opacity: active === 0 ? 1 : 0, y: [0, 8, 0] }}
        transition={{
          opacity: { duration: 0.4 },
          y: { duration: 2, repeat: Infinity, ease: "easeInOut" },
        }}
      >
        <span className="text-5xl font-light">^</span>
      </motion.div>
    </div>
  );
}

"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { RotatingWord } from "@/components/home/rotating-word";
import { glyphs } from "@/components/glyphs";
import { ChaosGlyph } from "@/components/home/chaos-glyph";
import { HarmonyGlyph } from "@/components/home/harmony-glyph";
import { ParticleCanvas, type ParticleShape } from "@/components/home/particle-canvas";
import { ContactForm } from "@/components/contact/contact-form";
import { ServiceCarousel } from "@/components/home/service-carousel";
import { Flock } from "@/components/home/flock";
import { NeuralOrb } from "@/components/home/neural-orb";
import { Button } from "@/components/ui/button";
import { SynergyBrain } from "@/components/home/synergy-brain";

function seededRandom(seed: number) {
  const x = Math.sin(seed * 9301 + 49297) * 49297;
  return x - Math.floor(x);
}

function FloatingWords({ text, startDelay = 0 }: { text: string; startDelay?: number }) {
  const words = text.split(" ");
  return (
    <>
      {words.map((word, i) => {
        const seed = startDelay * 100 + i;
        const duration = 0.8 + seededRandom(seed) * 0.5;
        const delay = startDelay + seededRandom(seed + 1) * 0.3;
        return (
          <motion.span
            key={i}
            initial={{ y: "100vh", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: "-100vh", opacity: 0 }}
            transition={{
              duration,
              delay,
              ease: [0.15, 0.8, 0.3, 1],
              opacity: { duration: duration * 0.6, delay: delay + duration * 0.1, ease: "easeIn" },
            }}
            className="inline-block mr-[0.3em]"
          >
            {word}
          </motion.span>
        );
      })}
    </>
  );
}

/**
 * Ground colour per section. The page crossfades between these as you move,
 * so colour signals where you are rather than decorating.
 *
 * Keyed by section id rather than set on each section object, so the mapping
 * can be read and retuned in one place.
 *
 * Note what a mid-tone ground buys: on off-white nothing can out-brighten
 * white, which is why the comet could not glow, the plane could not catch
 * light and the orb's lattice had to be ink. On sage, white finally reads.
 */
const CREAM = "#EDE7DA";
const SAGE = "#A7B4A1";
const PERIWINKLE = "#C6CDE8";
const MIST = "#C3D0DE";
const PAPER = "#F4F6F8";

const GROUNDS: Record<string, string> = {
  "new-synergy": PAPER,
  // New sections, in the gsap structure.
  "new-positioning": CREAM,
  "new-what": MIST,
  "new-outcomes": PAPER,
  "new-why": SAGE,
  "new-proof": PERIWINKLE,
  "new-start": CREAM,

  // The flight sequence gets the mid-tone, where white can glow.
  "flock-1": SAGE,
  "flock-2": SAGE,
  "flock-3": SAGE,
  "flock-4": SAGE,
  "flock-5": SAGE,
  "flock-6": SAGE,
  "flock-converge": SAGE,
  "orb-1": SAGE,
  "orb-2": SAGE,
  "orb-3": SAGE,
  "orb-4": SAGE,

  hero: CREAM,
  positioning: PAPER,
  benefits: MIST,
  stats: CREAM,
  comparison: PERIWINKLE,
  "ai-team": PAPER,
  "automation-tools": PAPER,
  "why-us-intro": SAGE,
  "why-us-knowledge": SAGE,
  "why-us-continuity": SAGE,
  "why-us-bespoke": SAGE,
  "why-us-evolution": SAGE,
  "how-it-works": MIST,
  cta: CREAM,
};

/**
 * The bracketed label from gsap.com — a small supporting line held inside a
 * pair of oversized curly braces. Cheap, distinctive, and it gives secondary
 * copy somewhere to live without competing with the headline.
 */
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

/** Shared frame for the new sections: full height, left-aligned, wide gutter. */
function Frame({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto flex h-full w-full max-w-[1400px] flex-col justify-center px-6">
      {children}
    </div>
  );
}

/** The one statement a section is allowed to make. Sized in vw so it fills the
 *  screen at any width rather than stepping between rem breakpoints. */
function Statement({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="max-w-[18ch] font-body text-[clamp(2.25rem,7vw,6.25rem)] font-light leading-[0.95] tracking-[-0.035em]">
      {children}
    </h2>
  );
}

const AGENTS = [
  "Customer Service", "Sales", "Receptionist", "Operations", "HR",
  "Finance", "Marketing", "Compliance", "Reporting",
];

const TOOLS = ["Quotes & Bookings", "CRM", "Unified Inbox"];

const OUTCOMES = [
  "Time saving", "Speed", "Lower costs", "Accuracy", "Scalability",
  "Data insights", "24/7 service", "Competitive edge", "Happier staff",
  "Happier owners",
];

/**
 * NEW sections, in the gsap.com structure — one statement per screen, large
 * type, generous space, braced labels. Placed ahead of the originals so both
 * can be seen in one pass. Copy is taken from the existing sections.
 */
const sections = [
  {
    id: "new-synergy",
    content: () => (
      <div className="mx-auto flex h-full w-full max-w-[1400px] flex-col items-center justify-center px-6">
        <SynergyBrain />
      </div>
    ),
  },
  {
    id: "new-positioning",
    content: () => (
      <Frame>
        <Braced>Why now</Braced>
        <div className="mt-14">
          <Statement>
            The best businesses aren&apos;t run by super humans working 24/7.
            They&apos;re run by smart people with smarter systems.
          </Statement>
        </div>
      </Frame>
    ),
  },
  {
    id: "new-what",
    content: () => (
      <Frame>
        <Braced>What we do</Braced>
        <div className="mt-14">
          <Statement>Nine agents and three tools, built around your operation.</Statement>
        </div>
        <div className="mt-12 grid max-w-4xl grid-cols-2 gap-x-10 gap-y-2 md:grid-cols-3">
          {AGENTS.map((a) => (
            <span key={a} className="font-body text-sm font-light text-ink/70">
              {a}
            </span>
          ))}
          {TOOLS.map((t) => (
            <span key={t} className="font-body text-sm font-light text-ink/40">
              {t}
            </span>
          ))}
        </div>
      </Frame>
    ),
  },
  {
    id: "new-outcomes",
    content: () => (
      <Frame>
        <Braced>Outcomes</Braced>
        <div className="mt-14">
          <Statement>What changes when the systems run themselves.</Statement>
        </div>
        {/* Text only — no cards. The original used ten glass panels, which at
            this type scale would fight the statement rather than support it. */}
        <div className="mt-12 grid max-w-4xl grid-cols-2 gap-x-10 gap-y-3 md:grid-cols-3">
          {OUTCOMES.map((o) => (
            <span key={o} className="font-body text-sm font-light text-ink/70">
              {o}
            </span>
          ))}
        </div>
      </Frame>
    ),
  },
  {
    id: "new-why",
    content: () => (
      <Frame>
        <Braced>Why up+up</Braced>
        <div className="mt-14">
          <Statement>
            We don&apos;t hand over software and disappear.
          </Statement>
        </div>
        <div className="mt-12 grid max-w-3xl gap-6 md:grid-cols-2">
          {[
            ["Knowledge", "Your business logic, captured — not guessed at."],
            ["Continuity", "The system keeps running when people move on."],
            ["Bespoke", "Built for how you work, not how software thinks you should."],
            ["Evolution", "It gets sharper the longer it runs."],
          ].map(([t, d]) => (
            <div key={t}>
              <p className="font-body text-sm font-medium text-ink">{t}</p>
              <p className="mt-1 font-body text-sm font-light leading-relaxed text-ink/55">
                {d}
              </p>
            </div>
          ))}
        </div>
      </Frame>
    ),
  },
  {
    id: "new-proof",
    content: () => (
      <Frame>
        <Braced>Proof</Braced>
        <div className="mt-14">
          <Statement>
            Tipsy Parties: instant quoting, live booking, one connected system.
          </Statement>
        </div>
        <div className="mt-10">
          <Button href="/projects/tipsy-parties">Read the case study</Button>
        </div>
      </Frame>
    ),
  },
  {
    id: "new-start",
    content: () => (
      <Frame>
        <Braced>Start</Braced>
        <div className="mt-14">
          <Statement>Ready to see what&apos;s possible?</Statement>
        </div>
        <div className="mt-10">
          <Button href="/contact">Start a conversation</Button>
        </div>
      </Frame>
    ),
  },

  // ---- ORIGINAL SECTIONS BELOW, unchanged ----

  // The flock. Each stage brings one more trail in from the left; the last
  // stage converges them. The canvas itself is a persistent layer below,
  // driven by flockStage — these sections only carry the copy.
  {
    id: "flock-1",
    flockStage: 1,
    content: () => (
      <div className="w-full max-w-6xl mx-auto px-4">
        <div className="ml-auto max-w-sm text-right">
          <p className="font-display text-2xl font-light leading-snug md:text-4xl">
            Every process starts as a single thread.
          </p>
        </div>
      </div>
    ),
  },
  {
    id: "flock-2",
    flockStage: 2,
    content: () => (
      <div className="w-full max-w-6xl mx-auto px-4">
        <div className="ml-auto max-w-sm text-right">
          <p className="font-display text-2xl font-light leading-snug md:text-4xl">
            Then another. Then another.
          </p>
        </div>
      </div>
    ),
  },
  {
    id: "flock-3",
    flockStage: 3,
    content: () => (
      <div className="w-full max-w-6xl mx-auto px-4">
        <div className="ml-auto max-w-sm text-right">
          <p className="font-display text-2xl font-light leading-snug md:text-4xl">
            Soon every corner of the business has one.
          </p>
        </div>
      </div>
    ),
  },
  {
    id: "flock-4",
    flockStage: 4,
    content: () => (
      <div className="w-full max-w-6xl mx-auto px-4">
        <div className="ml-auto max-w-sm text-right">
          <p className="font-display text-2xl font-light leading-snug md:text-4xl">
            Most companies run every one of them separately.
          </p>
        </div>
      </div>
    ),
  },
  {
    id: "flock-5",
    flockStage: 5,
    content: () => (
      <div className="w-full max-w-6xl mx-auto px-4">
        <div className="ml-auto max-w-sm text-right">
          <p className="font-display text-2xl font-light leading-snug md:text-4xl">
            Six systems. Six directions. Nothing joined up.
          </p>
        </div>
      </div>
    ),
  },
  {
    id: "flock-6",
    flockStage: 6,
    content: () => (
      <div className="w-full max-w-6xl mx-auto px-4">
        <div className="ml-auto max-w-sm text-right">
          <p className="font-display text-2xl font-light leading-snug md:text-4xl">
            Each one solving its own problem, alone.
          </p>
        </div>
      </div>
    ),
  },
  {
    id: "flock-converge",
    flockStage: 7,
    content: () => (
      <div className="w-full max-w-6xl mx-auto px-4">
        <div className="ml-auto max-w-md text-right">
          <h2 className="font-display text-3xl font-light leading-tight md:text-5xl">
            We bring them together.
          </h2>
          <p className="mt-5 font-body text-sm font-light leading-relaxed text-ink/60 md:text-base">
            One connected system, built around how your business actually runs.
          </p>
        </div>
      </div>
    ),
  },
  // The orb. Grows out of the convergence point, brightening and swelling
  // until it fills the screen and whites out. Across these stages the trails
  // angle upward and are absorbed into it.
  {
    id: "orb-1",
    flockStage: 8,
    content: () => (
      <div className="w-full max-w-6xl mx-auto px-4">
        <div className="ml-auto max-w-sm text-right">
          <p className="font-display text-2xl font-light leading-snug md:text-4xl">
            And then it starts to learn.
          </p>
        </div>
      </div>
    ),
  },
  {
    id: "orb-2",
    flockStage: 9,
    content: () => (
      <div className="w-full max-w-6xl mx-auto px-4">
        <div className="ml-auto max-w-sm text-right">
          <p className="font-display text-2xl font-light leading-snug md:text-4xl">
            Every process it touches makes it sharper.
          </p>
        </div>
      </div>
    ),
  },
  {
    id: "orb-3",
    flockStage: 10,
    content: () => (
      <div className="w-full max-w-6xl mx-auto px-4">
        <div className="ml-auto max-w-sm text-right">
          <p className="font-display text-2xl font-light leading-snug md:text-4xl">
            Until it understands how the whole business runs.
          </p>
        </div>
      </div>
    ),
  },
  {
    id: "orb-4",
    flockStage: 11,
    content: () => (
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="font-display text-3xl font-light leading-tight md:text-5xl lg:text-6xl">
          This is what we build.
        </h2>
        <div className="mt-10 flex justify-center">
          <Button href="/contact">Start a conversation</Button>
        </div>
      </div>
    ),
  },
  {
    id: "hero",
    content: (onReady: () => void) => (
      // Type-led, gsap.com's structure: the headline IS the hero, filling the
      // viewport, left-aligned. Supporting copy sits in braces bottom-left and
      // the CTA bottom-right, so nothing competes with the statement.
      //
      // Sized in vw rather than rem breakpoints so it fills the screen at every
      // width instead of stepping between three fixed sizes.
      <div className="mx-auto flex h-full w-full max-w-[1400px] flex-col justify-center px-6">
        <h1 className="font-light leading-[0.86] tracking-[-0.035em]">
          <motion.span
            className="block font-body text-[clamp(2.5rem,10.5vw,9rem)]"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          >
            Make your
          </motion.span>
          <motion.span
            className="block font-body text-[clamp(2.5rem,10.5vw,9rem)]"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
          >
            business
          </motion.span>
          <motion.span
            className="block font-display text-[clamp(2.5rem,10.5vw,9rem)]"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.16, ease: [0.16, 1, 0.3, 1] }}
            onAnimationComplete={onReady}
          >
            <RotatingWord />
          </motion.span>
        </h1>

        <motion.div
          className="mt-14 flex flex-wrap items-end justify-between gap-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.5 }}
        >
          <Braced>
            up+up — we design and build bespoke AI &amp; automation systems for
            how your business actually runs
          </Braced>
          <Button href="/contact">Start a conversation</Button>
        </motion.div>
      </div>
    ),
  },
  {
    id: "positioning",
    content: (onReady: () => void) => (
      <div className="max-w-4xl mx-auto text-center">
        <p className="font-display text-3xl font-light leading-tight md:text-5xl lg:text-[4rem]">
          <FloatingWords text="The best businesses aren't run by" startDelay={0} />
          <br />
          <FloatingWords text="super humans working 24/7." startDelay={0.15} />
        </p>
        <p className="font-body text-3xl font-light leading-tight md:text-4xl lg:text-[3rem] mt-8">
          <FloatingWords text="They're run by smart people" startDelay={0.3} />
          <br />
          <FloatingWords text="with smarter systems." startDelay={0.45} />
        </p>
        <motion.p
          className="font-display text-2xl font-light md:text-4xl lg:text-[3rem] mt-12 text-ink/70"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1.2 }}
          onAnimationComplete={onReady}
        >
          We design and build those systems.
        </motion.p>
      </div>
    ),
  },
  {
    id: "benefits",
    content: (onReady: () => void) => (
      <div className="max-w-6xl mx-auto text-center px-4">
        <h2 className="font-display text-2xl font-light md:text-4xl lg:text-5xl">
          <FloatingWords text="What we achieve with ai & automation" startDelay={0} />
        </h2>
        <motion.div
          className="grid grid-cols-2 md:grid-cols-5 gap-4 mt-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          onAnimationComplete={onReady}
        >
          {glyphs.map(({ Glyph, title, description }, i) => (
            <motion.div
              key={title}
              className="text-center rounded-2xl border border-ink/10 bg-white/55 backdrop-blur-2xl p-5 shadow-[0_8px_32px_rgba(10,10,10,0.06),0_2px_8px_rgba(10,10,10,0.05),inset_0_1px_0_rgba(255,255,255,0.9)]"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 + i * 0.1, duration: 0.5 }}
            >
              <Glyph className="mx-auto mb-3 h-10 w-10 text-ink/50" />
              <h3 className="font-body text-sm md:text-base font-medium text-ink leading-tight">{title}</h3>
              <p className="font-body text-[11px] md:text-xs text-ink/40 mt-2 leading-snug">{description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    ),
  },
  {
    id: "stats",
    content: (onReady: () => void) => (
      <div className="max-w-5xl mx-auto text-center">
        <h2 className="font-display text-2xl font-light md:text-4xl lg:text-5xl mb-12">
          <FloatingWords text="The numbers speak for themselves" startDelay={0} />
        </h2>
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          onAnimationComplete={onReady}
        >
          {[
            { stat: "40%", label: "reduction in operational costs with AI automation", source: "McKinsey" },
            { stat: "90%", label: "of repetitive tasks can be fully automated", source: "Deloitte" },
            { stat: "3x", label: "faster customer response times with AI agents", source: "Salesforce" },
            { stat: "65%", label: "of businesses will adopt AI by 2026", source: "Gartner" },
            { stat: "80%", label: "reduction in manual data entry errors", source: "IBM" },
            { stat: "2.5x", label: "more leads captured with 24/7 automated responses", source: "HubSpot" },
            { stat: "50%", label: "less time spent on admin and scheduling", source: "Accenture" },
            { stat: "73%", label: "of customers prefer instant responses over waiting", source: "Forrester" },
          ].map(({ stat, label, source }, i) => (
            <motion.div
              key={stat + label}
              className="text-left rounded-2xl border border-ink/10 bg-white/55 backdrop-blur-2xl p-5 shadow-[0_8px_32px_rgba(10,10,10,0.06),0_2px_8px_rgba(10,10,10,0.05),inset_0_1px_0_rgba(255,255,255,0.9)]"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 + i * 0.12, duration: 0.6 }}
            >
              <p className="font-body text-4xl md:text-5xl lg:text-6xl font-light text-ink">{stat}</p>
              <p className="font-body text-xs md:text-sm text-ink/70 mt-2 leading-snug">{label}</p>
              <p className="font-body text-[9px] md:text-[10px] text-ink/30 mt-1">{source}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    ),
  },
  {
    id: "comparison",
    content: (onReady: () => void) => (
      <div className="max-w-6xl mx-auto">
        <h2 className="font-display text-2xl font-light md:text-4xl lg:text-5xl mb-12 text-center">
          <FloatingWords text={"Same business. Different operation."} startDelay={0} />
        </h2>
        <div className="grid md:grid-cols-2 gap-8 md:gap-16 mt-8">
          {/* Without */}
          <motion.div
            className="flex flex-col items-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            <ChaosGlyph />
            <h3 className="font-body text-sm uppercase tracking-widest text-ink/40 mt-6 mb-4">Without us</h3>
            <div className="w-full grid gap-2">
              {["Slow response times", "Missed enquiries", "Manual everything", "Inconsistent service", "Limited by working hours", "Growth = more chaos"].map((item, i) => (
                <motion.div key={item} className="rounded-xl border border-ink/8 bg-white/45 backdrop-blur-xl px-4 py-2.5 flex items-center gap-3 shadow-[0_4px_16px_rgba(10,10,10,0.05),inset_0_1px_0_rgba(255,255,255,0.1)]"
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 + i * 0.1, duration: 0.4 }}>
                  <svg className="w-3 h-3 shrink-0 text-ink/40" viewBox="0 0 12 12" fill="none">
                    <line x1="2" y1="2" x2="10" y2="10" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
                    <line x1="10" y1="2" x2="2" y2="10" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
                  </svg>
                  <span className="text-ink/40 text-xs md:text-sm uppercase tracking-wider">{item}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
          {/* With */}
          <motion.div
            className="flex flex-col items-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.8 }}
          >
            <HarmonyGlyph />
            <h3 className="font-body text-sm uppercase tracking-widest text-ink/70 mt-6 mb-4">With us</h3>
            <div className="w-full grid gap-2">
              {["Instant responses, 24/7", "Every lead captured", "Fully automated", "Consistent every time", "Always on, 365 days", "Growth = more freedom"].map((item, i) => (
                <motion.div key={item} className="rounded-xl border border-ink/10 bg-white/55 backdrop-blur-xl px-4 py-2.5 flex items-center gap-3 shadow-[0_4px_16px_rgba(0,0,0,0.1),inset_0_1px_0_rgba(255,255,255,0.9)]"
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                  transition={{ delay: 1.7 + i * 0.1, duration: 0.4 }}
                  {...(i === 5 ? { onAnimationComplete: onReady } : {})}>
                  <svg className="w-3 h-3 shrink-0 text-ink" viewBox="0 0 12 12" fill="none">
                    <path d="M2 6L5 9L10 3" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <span className="text-ink text-xs md:text-sm uppercase tracking-wider">{item}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    ),
  },
  {
    id: "ai-team",
    content: (onReady: () => void) => {
      setTimeout(() => onReady(), 2000);
      return (
      <div className="w-full h-full flex flex-col">
        <div className="text-center pt-8">
          <h2 className="font-display text-3xl font-light md:text-5xl lg:text-[4.5rem]">
            <FloatingWords text="Your AI Team" startDelay={0} />
          </h2>
        </div>
        <ServiceCarousel filter="AGENT" />
      </div>
      );
    },
  },
  {
    id: "automation-tools",
    content: (onReady: () => void) => {
      setTimeout(() => onReady(), 2000);
      return (
      <div className="w-full h-full flex flex-col">
        <div className="text-center pt-8">
          <h2 className="font-display text-3xl font-light md:text-5xl lg:text-[4.5rem]">
            <FloatingWords text="Your Automation Tools" startDelay={0} />
          </h2>
        </div>
        <ServiceCarousel filter="TOOL" />
      </div>
      );
    },
  },
  {
    id: "why-us-intro",
    particleShape: "question" as ParticleShape,
    content: (onReady: () => void) => (
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <motion.h2 className="font-display text-4xl md:text-6xl lg:text-[5rem] font-light text-ink whitespace-nowrap"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          transition={{ duration: 1.2, delay: 0.3 }} onAnimationComplete={onReady}>
          Why work with us
        </motion.h2>
      </div>
    ),
  },
  {
    id: "why-us-knowledge",
    particleShape: "brain" as ParticleShape,
    content: (onReady: () => void) => (
      <div className="flex flex-col items-center justify-center text-center px-8">
        <motion.h3 className="absolute top-16 left-8 font-body text-lg md:text-2xl font-light text-ink/80 whitespace-nowrap"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8 }}>Why work with us</motion.h3>
        <motion.h2 className="font-display text-5xl md:text-7xl lg:text-[6rem] font-light"
          initial={{ opacity: 0 }} animate={{ opacity: 0.9 }} transition={{ duration: 1.2 }}>Knowledge</motion.h2>
        <motion.p className="font-body text-xs md:text-sm lg:text-base text-ink/60 leading-relaxed max-w-2xl mt-8"
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }} onAnimationComplete={onReady}>
          We&apos;re entrepreneurs &times; coders. A decade of founding, scaling and automating real businesses has given us something no agency can replicate &mdash; our lived experience of every problem we solve, the knowledge to foresee them before they happen + the technical skill to solve them.
        </motion.p>
      </div>
    ),
  },
  {
    id: "why-us-continuity",
    particleShape: "orb" as ParticleShape,
    content: (onReady: () => void) => (
      <div className="flex flex-col items-center justify-center text-center px-8">
        <motion.h3 className="absolute top-16 left-8 font-body text-lg md:text-2xl font-light text-ink/80 whitespace-nowrap"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8 }}>Why work with us</motion.h3>
        <motion.h2 className="font-display text-5xl md:text-7xl lg:text-[6rem] font-light"
          initial={{ opacity: 0 }} animate={{ opacity: 0.9 }} transition={{ duration: 1.2 }}>Continuity</motion.h2>
        <motion.p className="font-body text-xs md:text-sm lg:text-base text-ink/60 leading-relaxed max-w-2xl mt-8"
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }} onAnimationComplete={onReady}>
          One connected system with one voice. No stack of disconnected apps talking different languages. Everything speaks to everything, instantly, one entity, unified.
        </motion.p>
      </div>
    ),
  },
  {
    id: "why-us-bespoke",
    particleShape: "head" as ParticleShape,
    content: (onReady: () => void) => (
      <div className="flex flex-col items-center justify-center text-center px-8">
        <motion.h3 className="absolute top-16 left-8 font-body text-lg md:text-2xl font-light text-ink/80 whitespace-nowrap"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8 }}>Why work with us</motion.h3>
        <motion.h2 className="font-display text-5xl md:text-7xl lg:text-[6rem] font-light"
          initial={{ opacity: 0 }} animate={{ opacity: 0.9 }} transition={{ duration: 1.2 }}>Bespoke</motion.h2>
        <motion.p className="font-body text-xs md:text-sm lg:text-base text-ink/60 leading-relaxed max-w-2xl mt-8"
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }} onAnimationComplete={onReady}>
          No two businesses are built the same way. Your systems are designed around how you work now and where you want to go. You don&apos;t adapt to the tech, the tech adapts to you.
        </motion.p>
      </div>
    ),
  },
  {
    id: "why-us-evolution",
    particleShape: "infinity" as ParticleShape,
    content: (onReady: () => void) => (
      <div className="flex flex-col items-center justify-center text-center px-8">
        <motion.h3 className="absolute top-16 left-8 font-body text-lg md:text-2xl font-light text-ink/80 whitespace-nowrap"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8 }}>Why work with us</motion.h3>
        <motion.h2 className="font-display text-5xl md:text-7xl lg:text-[6rem] font-light"
          initial={{ opacity: 0 }} animate={{ opacity: 0.9 }} transition={{ duration: 1.2 }}>Evolution</motion.h2>
        <motion.p className="font-body text-xs md:text-sm lg:text-base text-ink/60 leading-relaxed max-w-2xl mt-8"
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }} onAnimationComplete={onReady}>
          We don&apos;t build and disappear. Start with what you need, add what you want when you&apos;re ready. Your automation grows as your business grows &mdash; no big bang, no rip and replace, just steady progress on your terms. Growing with you.
        </motion.p>
      </div>
    ),
  },
  {
    id: "how-it-works",
    content: (onReady: () => void) => (
      <div className="max-w-5xl mx-auto w-full px-8">
        <h2 className="font-display text-3xl font-light md:text-5xl lg:text-[4.5rem] text-center mb-16">
          <FloatingWords text="How we work together" startDelay={0} />
        </h2>
        <div className="grid md:grid-cols-5 gap-5">
          {[
            {
              glyph: (<svg viewBox="0 0 40 40" className="w-16 h-16 text-ink/30"><circle cx="20" cy="20" r="2" fill="currentColor" /></svg>),
              title: "Let\u2019s see how we can help",
              desc: "Tell us about your business \u2014 your pain points, where it gets complicated, where time or money gets lost and where you want to take things.",
            },
            {
              glyph: (<svg viewBox="0 0 40 40" className="w-16 h-16 text-ink/30"><circle cx="20" cy="20" r="2" fill="currentColor" /><circle cx="20" cy="20" r="7" stroke="currentColor" strokeWidth="1" fill="none" /></svg>),
              title: "We plan",
              desc: "A considered, tailored blueprint built around your business. The right solutions, in the right order, at the right investment. Honest, transparent and designed specifically for where you are and where you want to go.",
            },
            {
              glyph: (<svg viewBox="0 0 40 40" className="w-16 h-16 text-ink/30"><circle cx="20" cy="20" r="2" fill="currentColor" /><circle cx="20" cy="20" r="7" stroke="currentColor" strokeWidth="1" fill="none" /><circle cx="20" cy="20" r="12" stroke="currentColor" strokeWidth="0.8" fill="none" /></svg>),
              title: "You choose",
              desc: "No pressure to do everything at once. Start with what matters most, what will have the biggest immediate impact, or simply what fits right now. Your budget. Your priorities. Your choice.",
            },
            {
              glyph: (<svg viewBox="0 0 40 40" className="w-16 h-16 text-ink/30"><circle cx="20" cy="20" r="2" fill="currentColor" /><circle cx="20" cy="20" r="7" stroke="currentColor" strokeWidth="1" fill="none" /><circle cx="20" cy="20" r="12" stroke="currentColor" strokeWidth="0.8" fill="none" /><circle cx="20" cy="20" r="17" stroke="currentColor" strokeWidth="0.6" fill="none" /></svg>),
              title: "We build",
              desc: "We handle everything \u2014 design, build, integrate, test and launch. You stay focused on your business while we do the work. No disruption, no confusion, no technical headaches.",
            },
            {
              glyph: (<svg viewBox="0 0 40 40" className="w-16 h-16 text-ink/30"><circle cx="20" cy="20" r="2" fill="currentColor" /><circle cx="20" cy="20" r="7" stroke="currentColor" strokeWidth="1" fill="none" /><circle cx="20" cy="20" r="12" stroke="currentColor" strokeWidth="0.8" fill="none" /><circle cx="20" cy="20" r="17" stroke="currentColor" strokeWidth="0.6" fill="none" /><circle cx="20" cy="20" r="19.5" stroke="currentColor" strokeWidth="0.4" fill="none" /></svg>),
              title: "You breathe, grow and evolve",
              desc: "And so do we. As your needs change and new opportunities emerge we are still here. Add what you need, adapt what you have, build what comes next. At your pace, on your terms.",
            },
          ].map(({ glyph, title, desc }, i) => (
            <motion.div
              key={title}
              className="rounded-2xl border border-ink/10 bg-white/55 backdrop-blur-2xl p-5 shadow-[0_8px_32px_rgba(10,10,10,0.06),0_2px_8px_rgba(10,10,10,0.05),inset_0_1px_0_rgba(255,255,255,0.9)]"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 + i * 0.2, duration: 0.7, ease: [0.15, 0.8, 0.3, 1] }}
              {...(i === 4 ? { onAnimationComplete: onReady } : {})}
            >
              <div className="mb-4">{glyph}</div>
              <h3 className="font-body text-xs md:text-sm font-medium text-ink uppercase tracking-wider">{title}</h3>
              <p className="font-body text-[9px] md:text-[10px] text-ink/50 mt-3 leading-relaxed font-light">{desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    ),
  },
  {
    id: "cta",
    content: (onReady: () => void) => {
      setTimeout(() => onReady(), 1000);
      return (
      <div className="w-full h-full flex flex-col overflow-y-auto" style={{scrollbarWidth:"none"}}>
        <div className="max-w-3xl mx-auto w-full px-6 py-12">
          <h2 className="font-display text-3xl font-light md:text-5xl text-center">
            Ready to see what&apos;s possible?
          </h2>
          <p className="text-ink/50 text-center mt-4 font-light text-sm">
            Tell us a bit about your business, what you&apos;ve built and what you&apos;re looking for.
          </p>
          <div className="mt-8">
            <ContactForm />
          </div>
        </div>
      </div>
      );
    },
  },
];

import Link from "next/link";

const menuLinks = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/about", label: "About" },
  { href: "/projects", label: "Projects" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
];

function HomeMenu() {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <div className="fixed top-4 right-6 z-[100]"
      onMouseEnter={() => setMenuOpen(true)}
      onMouseLeave={() => setMenuOpen(false)}
    >
      <button onClick={() => setMenuOpen(!menuOpen)} className="flex flex-col gap-1.5 p-2" aria-label="Menu">
        <span className="block h-px w-6 bg-ink" />
        <span className="block h-px w-6 bg-ink" />
      </button>
      <AnimatePresence>
        {menuOpen && (
          <motion.div className="absolute right-0 top-full mt-2"
            initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -5 }}
            transition={{ duration: 0.2 }}>
            <nav className="flex flex-col items-end gap-1 py-2">
              {menuLinks.map((link, i) => (
                <motion.div key={link.href} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.04 }}>
                  <Link href={link.href} onClick={() => setMenuOpen(false)}
                    className="block py-1 font-body text-sm font-light text-ink/60 hover:text-ink transition-colors">
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function Home() {
  const [currentSection, setCurrentSection] = useState(0);
    const [transitioning, setTransitioning] = useState(false);
  
  const navigate = useCallback(
    (dir: 1 | -1) => {
      if (transitioning) return;
      const next = currentSection + dir;
      setTransitioning(true);
      setTimeout(() => {
        setCurrentSection(next);
        setTransitioning(false);
      }, 600);
    },
    [transitioning, currentSection]
  );

  useEffect(() => {
    let lastNav = 0;
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      const now = Date.now();
      if (now - lastNav < 1500) return;
      if (Math.abs(e.deltaY) < 30) return;
      lastNav = now;
      navigate(e.deltaY > 0 ? 1 : -1);
    };

    let touchY = 0;
    const handleTouchStart = (e: TouchEvent) => { touchY = e.touches[0].clientY; };
    const handleTouchEnd = (e: TouchEvent) => {
      const diff = touchY - e.changedTouches[0].clientY;
      const now = Date.now();
      if (now - lastNav < 1500) return;
      if (Math.abs(diff) < 50) return;
      lastNav = now;
      navigate(diff > 0 ? 1 : -1);
    };

    // Keyboard
    const handleKey = (e: KeyboardEvent) => {
      const now = Date.now();
      if (now - lastNav < 1500) return;
      if (e.key === "ArrowDown" || e.key === " ") { lastNav = now; navigate(1); }
      if (e.key === "ArrowUp") { lastNav = now; navigate(-1); }
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchend", handleTouchEnd, { passive: true });
    // Deliberately no mousemove handler. There used to be one that advanced a
    // section whenever the cursor came within 40px of the bottom of the
    // window, which meant the page walked forward on its own without any
    // scroll — and the scroll-hint chevron sits inside that zone, so reaching
    // for it made the page run away. Progression is now scroll, touch, key or
    // an explicit click only.

    window.addEventListener("keydown", handleKey);
    return () => {
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchend", handleTouchEnd);
      window.removeEventListener("keydown", handleKey);
    };
  }, [navigate]);

  const ground =
    currentSection >= 0 ? GROUNDS[sections[currentSection].id] ?? PAPER : PAPER;

  return (
    <div className="fixed inset-0 overflow-hidden text-ink">
      {/* Ground. Crossfades between section colours — slower than the section
          swap itself (1.1s against 0.5s) so the colour reads as the page
          turning rather than as part of the content change. First in the DOM,
          so everything else paints over it. */}
      <motion.div
        aria-hidden="true"
        className="absolute inset-0"
        initial={false}
        animate={{ backgroundColor: ground }}
        transition={{ duration: 1.1, ease: "easeInOut" }}
      />


      {/* Logo, fixed in the header. */}
      <motion.div
        className="pointer-events-none fixed left-1/2 top-[1.1rem] z-[100] -translate-x-1/2 text-2xl tracking-tight text-ink"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.35, ease: "easeOut" }}
      >
        <span className="font-body font-light">up</span>
        <span className="font-display text-[1.15em]">+up</span>
        <span className="text-[0.7em] leading-none font-body -ml-[0.15em] relative -top-[0.35em]">^</span>
      </motion.div>

      {/* Contact — takes the top-left slot the logo used to occupy */}
      <motion.div
        className="fixed top-4 left-6 z-[100]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <Link
          href="/contact"
          className="font-body text-sm font-light tracking-wide text-ink/70 transition-colors hover:text-ink"
        >
          Contact
        </Link>
      </motion.div>

      {/* Hamburger menu — top right. Held back during the intro, where its
          white bars would sit invisible on the off-white ground. */}
      {<HomeMenu />}

      {/* Flock — persistent layer so trails survive the section swap and
          accumulate as you step, rather than restarting each time. */}
      {(() => {
        const sec = currentSection >= 0 ? sections[currentSection] : null;
        const flockStage = (sec && "flockStage" in sec ? sec.flockStage : 0) as number;
        return (
          <div
            className="absolute inset-0 z-0 pointer-events-none transition-opacity duration-700"
            style={{ opacity: flockStage > 0 ? 1 : 0 }}
          >
            <Flock stage={flockStage} />
            <NeuralOrb stage={flockStage} />
          </div>
        );
      })()}

      {/* Particle Canvas — persistent layer, shape changes with section */}
      {(() => {
        const sec = currentSection >= 0 ? sections[currentSection] : null;
        const shape = (sec && 'particleShape' in sec ? sec.particleShape : "none") as ParticleShape;
        return shape !== "none" ? (
          <div className="absolute inset-0 flex items-center justify-center z-0 pointer-events-none">
            <ParticleCanvas shape={shape} />
          </div>
        ) : null;
      })()}

      {/* Sections */}
      <AnimatePresence mode="wait">
        {currentSection >= 0 && (
          <motion.div
            key={sections[currentSection].id}
            className="absolute inset-0 flex items-center justify-center px-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            {sections[currentSection].content(() => {})}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Dots */}
      {(
        <div className="fixed right-6 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-2">
          {sections.map((s, i) => (
            <button
              key={s.id}
              onClick={() => { if (!transitioning) { setTransitioning(true); setTimeout(() => { setCurrentSection(i); setTransitioning(false); }, 400); } }}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${i === currentSection ? "bg-ink scale-125" : "bg-ink/25 hover:bg-ink/50"}`}
              aria-label={`Section `}
            />
          ))}
        </div>
      )}

      {/* Scroll hint */}
      {currentSection >= 0 && currentSection < sections.length - 1 && (
        <motion.button
          key={`arrow-${currentSection}`}
          className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 text-ink/40 hover:text-ink/80 transition-colors cursor-none"
          onClick={() => navigate(1)}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, y: [0, 8, 0] }}
          transition={{ opacity: { duration: 0.4 }, y: { duration: 2, repeat: Infinity, ease: "easeInOut" } }}
          aria-label="Scroll down"
        >
          <span className="text-5xl font-light">^</span>
        </motion.button>
      )}
    </div>
  );
}

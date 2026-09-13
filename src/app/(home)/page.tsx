"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
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
import {
  GsapHero,
  GsapStatement,
  GsapSideways,
  GsapFeatures,
  GsapShowcase,
  GsapFooter,
} from "@/components/home/gsap-structure";
import {
  ProductSurface,
  AiSection,
  IndustriesSection,
  SupportSection,
} from "@/components/home/product-sections";
import { CREAM, SAGE, BLUE, PAPER, LAVENDER } from "@/lib/palette";
import { SiteHeader } from "@/components/home/site-header";

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
  "g-footer": CREAM,

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
  benefits: BLUE,
  stats: CREAM,
  comparison: BLUE,
  "ai-team": PAPER,
  "automation-tools": PAPER,
  "why-us-intro": SAGE,
  "why-us-knowledge": SAGE,
  "why-us-continuity": SAGE,
  "why-us-bespoke": SAGE,
  "why-us-evolution": SAGE,
  "how-it-works": CREAM,
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

/**
 * The running order of the page, top to bottom.
 *
 * The six gsap sections come first, then everything from the original site
 * below them, so the new build and the copy it is replacing can be read in
 * one pass. The originals come out once their content has been moved up.
 */
const sections = [
  /* The six sections of gsap.com, rebuilt for up+up. Each one is a thin
     wrapper here; the markup lives in components/home/gsap-structure.tsx so
     this file stays a running order rather than a second implementation.

     "raw" means the section manages its own height and scroll and must not
     be wrapped in the standard one-screen parallax frame — the sideways band
     is four viewports tall, and the footer is shorter than one. */
  { id: "g-hero", content: () => <GsapHero /> },
  { id: "g-statement", content: () => <GsapStatement /> },
  { id: "g-sideways", raw: true, content: () => <GsapSideways /> },
  { id: "g-features", raw: true, content: () => <GsapFeatures /> },
  /* The product sections. They sit here deliberately — after the feature
     rows have said what jobbie is for, and before the showcase says who has
     used it. This is where the page stops selling the idea and explains the
     software. Running order taken from getjobber.com's home page: product
     surface, then the AI, then breadth, then what switching involves. */
  { id: "g-surface", raw: true, content: () => <ProductSurface /> },
  { id: "g-ai", raw: true, content: () => <AiSection /> },
  { id: "g-industries", raw: true, content: () => <IndustriesSection /> },
  { id: "g-support", raw: true, content: () => <SupportSection /> },

  { id: "g-showcase", content: () => <GsapShowcase /> },
  { id: "g-footer", raw: true, content: () => <GsapFooter /> },

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


/* ------------------------------------------------------------------ *
 *  The scrolling document.
 *
 *  This page used to be a stepper: `fixed inset-0`, the wheel event
 *  cancelled, one section swapped for the next by AnimatePresence. It
 *  looked like a deck, and — more to the point — it had no scroll offset,
 *  so none of the things the design actually depends on were possible:
 *  parallax, sideways travel, scroll-linked reveals, a showcase rail, the
 *  flock growing continuously rather than in eleven jumps.
 *
 *  It is now an ordinary tall document. Every section is a `min-h-screen`
 *  block in normal flow; the animated layers (ground, flock, orb,
 *  particles) are pinned behind it and read scroll position. The section
 *  list, the copy and the geometry components are untouched — only the
 *  *source* of their progress number changed, from an integer stage to a
 *  continuous value derived from where you are on the page.
 * ------------------------------------------------------------------ */

/** Sections carry `flockStage` as metadata; pull it out once. */
const STAGES: number[] = sections.map((s) =>
  "flockStage" in s ? ((s as { flockStage: number }).flockStage as number) : 0
);

const SHAPES: ParticleShape[] = sections.map((s) =>
  "particleShape" in s
    ? ((s as { particleShape: ParticleShape }).particleShape as ParticleShape)
    : "none"
);

/**
 * The rail. One dot per section meant thirty-two dots, which reads as a
 * progress bar with a stutter rather than as navigation. Grouped into
 * chapters instead: each is the first section of a run, and the rail
 * highlights the chapter containing the section you are in.
 */
const CHAPTERS: { label: string; index: number }[] = [
  { label: "Top", index: 0 },
  { label: "Why now", index: sections.findIndex((s) => s.id === "g-statement") },
  { label: "What we do", index: sections.findIndex((s) => s.id === "g-sideways") },
  { label: "Why up+up", index: sections.findIndex((s) => s.id === "g-features") },
  { label: "What it does", index: sections.findIndex((s) => s.id === "g-surface") },
  { label: "The agents", index: sections.findIndex((s) => s.id === "g-ai") },
  { label: "Who it's for", index: sections.findIndex((s) => s.id === "g-industries") },
  { label: "Getting started", index: sections.findIndex((s) => s.id === "g-support") },
  { label: "Built", index: sections.findIndex((s) => s.id === "g-showcase") },
  { label: "Start", index: sections.findIndex((s) => s.id === "g-footer") },
  { label: "Flight", index: sections.findIndex((s) => s.id === "flock-1") },
  { label: "Origin", index: sections.findIndex((s) => s.id === "hero") },
  { label: "Detail", index: sections.findIndex((s) => s.id === "benefits") },
  { label: "Method", index: sections.findIndex((s) => s.id === "how-it-works") },
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
  const [flockStage, setFlockStage] = useState(0);
  const [flockAlpha, setFlockAlpha] = useState(0);

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

      // Flock stage, now continuous. The eleven flight sections used to step
      // it by whole numbers; between them the geometry eased on its own clock,
      // which is why it never felt tied to the scroll. Both Flock and
      // NeuralOrb already clamp and normalise whatever number they are given,
      // so a fraction needs no change inside them.
      const a = STAGES[i] ?? 0;
      const b = STAGES[i + 1] ?? 0;
      if (a > 0 && b > 0) {
        setFlockStage(a + (b - a) * f);
        setFlockAlpha(1);
      } else if (a === 0 && b > 0) {
        // Approaching the flight: ramp in across the section before it.
        setFlockStage(Math.max(0, b - 1) + f);
        setFlockAlpha(f);
      } else if (a > 0 && b === 0) {
        // Leaving it: hold the final stage and fade, so the orb does not
        // deflate backwards through its own growth.
        setFlockStage(a);
        setFlockAlpha(1 - f);
      } else {
        setFlockAlpha(0);
      }
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

  const shape = SHAPES[active] ?? "none";
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

        {/* Flock and orb. One layer, so the trails accumulate across the
            flight rather than restarting whenever the copy changes. */}
        <div className="absolute inset-0" style={{ opacity: flockAlpha }}>
          {flockAlpha > 0.001 && (
            <>
              <Flock stage={flockStage} />
              <NeuralOrb stage={flockStage} />
            </>
          )}
        </div>

        {shape !== "none" && (
          <div className="absolute inset-0 flex items-center justify-center">
            <ParticleCanvas shape={shape} />
          </div>
        )}
      </div>

      {/* The header. A fixed bar with real navigation and one call to
          action, replacing the floating wordmark, the stray "Contact" link
          and the hamburger that used to stand in for it. */}
      <SiteHeader />

      {/* The document. */}
      <div className="relative z-10 pt-[4.5rem]">
        {sections.map((s, i) => (
          <ScrollSection
            key={s.id}
            id={s.id}
            raw={"raw" in s && Boolean((s as { raw?: boolean }).raw)}
            register={(el) => {
              els.current[i] = el;
            }}
          >
            {s.content(() => {})}
          </ScrollSection>
        ))}
      </div>

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

"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { RotatingWord } from "./rotating-word";
import { ScrollChevron } from "@/components/ui/scroll-chevron";

const line1 = "We use ai & automation";
const line2 = "to make your business";

// Seeded random so each word gets a consistent but unique drift
function seededRandom(seed: number) {
  const x = Math.sin(seed * 9301 + 49297) * 49297;
  return x - Math.floor(x);
}

function FloatingWords({ text, startDelay }: { text: string; startDelay: number }) {
  const words = text.split(" ");
  return (
    <>
      {words.map((word, i) => {
        const seed = startDelay * 100 + i;
        const duration = 2.5 + seededRandom(seed) * 2;
        const delay = startDelay + seededRandom(seed + 1) * 1.2;

        return (
          <motion.span
            key={i}
            initial={{ y: "100vh", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{
              duration,
              delay,
              ease: [0.15, 0.8, 0.3, 1],
              opacity: {
                duration: duration * 0.7,
                delay: delay + duration * 0.15,
                ease: "easeIn",
              },
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

export function Hero() {
  const [logoDone, setLogoDone] = useState(false);

  return (
    <section className="relative flex min-h-screen items-center justify-center px-6 overflow-hidden">
      {/* Decorative thin lines */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-1/4 top-0 h-full w-px bg-ink/8" />
        <div className="absolute left-2/4 top-0 h-full w-px bg-ink/8" />
        <div className="absolute left-3/4 top-0 h-full w-px bg-ink/8" />
        <svg className="absolute right-12 top-1/4 h-48 w-48 text-ink/5" viewBox="0 0 200 200" fill="none" data-parallax="0.3">
          <circle cx="100" cy="100" r="80" stroke="currentColor" strokeWidth="0.5" />
          <circle cx="100" cy="100" r="60" stroke="currentColor" strokeWidth="0.5" />
        </svg>
      </div>

      {/* Stage 1: Logo fades in centre then animates to top-left */}
      <motion.div
        className="fixed z-[100] tracking-tight text-ink pointer-events-none"
        initial={{
          top: "50%",
          left: "50%",
          x: "-50%",
          y: "-50%",
          fontSize: "6rem",
          opacity: 0,
        }}
        animate={logoDone ? {
          top: "1.1rem",
          left: "1.5rem",
          x: "0%",
          y: "0%",
          fontSize: "1.5rem",
          opacity: 1,
        } : {
          top: "50%",
          left: "50%",
          x: "-50%",
          y: "-50%",
          fontSize: "6rem",
          opacity: 1,
        }}
        transition={logoDone ? {
          duration: 1.2,
          delay: 0.3,
          ease: [0.25, 0.1, 0.25, 1],
        } : {
          duration: 1,
          delay: 0.5,
          ease: "easeOut",
        }}
        onAnimationComplete={() => {
          if (!logoDone) {
            setTimeout(() => setLogoDone(true), 1500);
          }
        }}
      >
        <span className="font-body font-light">up</span>
        <span className="font-display text-[1.15em]">+up</span>
        <span className="text-ink text-[0.7em] leading-none font-body -ml-[0.15em] relative -top-[0.35em]">^</span>
      </motion.div>

      {/* Stage 2: Headline letters float up into position */}
      {logoDone && (
        <div className="relative z-10 mx-auto w-full text-center text-ink px-4">
          <h1 className="text-3xl font-light leading-tight tracking-tight md:text-5xl lg:text-[4.5rem]">
            <span className="block font-body">
              <FloatingWords text={line1} startDelay={0} />
            </span>
            <span className="relative block font-display mt-2 text-4xl md:text-6xl lg:text-[5.5rem] whitespace-nowrap" style={{ marginLeft: "-0.5em" }}>
              <FloatingWords text={line2} startDelay={0.4} />
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.8,
                  delay: 6,
                  ease: [0.25, 0.1, 0.25, 1],
                }}
                className="absolute top-0"
              >
                <RotatingWord />
              </motion.span>
            </span>
          </h1>
        </div>
      )}

      {logoDone && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8, duration: 0.6 }}
        >
          <ScrollChevron />
        </motion.div>
      )}
    </section>
  );
}

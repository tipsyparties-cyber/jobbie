"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { WhyUsCanvas } from "./why-us-canvas";

// Phase 1: Just particles in a cluster — no text
// Phase 2: Words float in + particles form question mark
// Phase 3: Words fly off to heading, particles morph to brain

export function WhyUsSection({ onReady }: { onReady: () => void }) {
  const [phase, setPhase] = useState<1 | 2 | 3>(1);

  useEffect(() => {
    // Phase 1: Just particles for 3 seconds
    const t1 = setTimeout(() => setPhase(2), 3000);
    // Phase 2: Words + question mark for 5 seconds
    const t2 = setTimeout(() => setPhase(3), 8000);
    // Ready for scroll after brain has formed
    const t3 = setTimeout(() => onReady(), 11000);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, [onReady]);

  const canvasPhase = phase === 1 ? "cluster" : phase === 2 ? "question" : "brain";

  return (
    <div className="w-full h-full relative overflow-hidden">
      {/* Heading — appears in phase 3, settles top-left */}
      <AnimatePresence>
        {phase >= 3 && (
          <motion.h2
            className="absolute top-6 left-8 font-body text-lg md:text-2xl font-light text-ink/80 z-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            Why work with us
          </motion.h2>
        )}
      </AnimatePresence>

      {/* Canvas — particles forming shapes */}
      <div className="absolute inset-0 flex items-center justify-center">
        <WhyUsCanvas phase={canvasPhase} />
      </div>

      {/* Phase 2: Large words floating in from edges */}
      <AnimatePresence>
        {phase === 2 && (
          <>
            <motion.span
              className="absolute font-body text-5xl md:text-7xl lg:text-[6rem] font-light text-ink z-10"
              style={{ top: "2%", left: "3%" }}
              initial={{ x: "-60vw", y: "30vh", opacity: 0 }}
              animate={{ x: 0, y: 0, opacity: 1 }}
              exit={{ x: 0, y: "-80vh", opacity: 0, scale: 0.2, transition: { duration: 1.2, ease: [0.6, 0, 0.4, 1] } }}
              transition={{ duration: 2, delay: 0.3, ease: [0.15, 0.8, 0.3, 1] }}
            >
              Why
            </motion.span>
            <motion.span
              className="absolute font-body text-5xl md:text-7xl lg:text-[6rem] font-light text-ink z-10"
              style={{ top: "20%", left: "10%" }}
              initial={{ x: "-50vw", y: "25vh", opacity: 0 }}
              animate={{ x: 0, y: 0, opacity: 1 }}
              exit={{ x: "-30vw", y: "-70vh", opacity: 0, scale: 0.2, transition: { duration: 1.2, delay: 0.1, ease: [0.6, 0, 0.4, 1] } }}
              transition={{ duration: 2, delay: 0.6, ease: [0.15, 0.8, 0.3, 1] }}
            >
              work
            </motion.span>
            <motion.span
              className="absolute font-body text-5xl md:text-7xl lg:text-[6rem] font-light text-ink z-10"
              style={{ bottom: "22%", right: "10%" }}
              initial={{ x: "50vw", y: "25vh", opacity: 0 }}
              animate={{ x: 0, y: 0, opacity: 1 }}
              exit={{ x: "30vw", y: "-70vh", opacity: 0, scale: 0.2, transition: { duration: 1.2, delay: 0.15, ease: [0.6, 0, 0.4, 1] } }}
              transition={{ duration: 2, delay: 0.9, ease: [0.15, 0.8, 0.3, 1] }}
            >
              with
            </motion.span>
            <motion.span
              className="absolute font-body text-5xl md:text-7xl lg:text-[6rem] font-light text-ink z-10"
              style={{ bottom: "2%", right: "3%" }}
              initial={{ x: "60vw", y: "30vh", opacity: 0 }}
              animate={{ x: 0, y: 0, opacity: 1 }}
              exit={{ x: "40vw", y: "-80vh", opacity: 0, scale: 0.2, transition: { duration: 1.2, delay: 0.2, ease: [0.6, 0, 0.4, 1] } }}
              transition={{ duration: 2, delay: 1.2, ease: [0.15, 0.8, 0.3, 1] }}
            >
              us
            </motion.span>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

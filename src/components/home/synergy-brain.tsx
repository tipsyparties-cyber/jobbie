"use client";

import { motion } from "framer-motion";

/**
 * The synergy brain.
 *
 * Inverts nominal.so's hero, where agents shrink *into* the header. Here they
 * burst *out* of a central core and hold in a ring, so you can read what is
 * inside the system — and the fact that they belong to one thing is the point.
 *
 * NOTE: this animates on mount, which in the current stepper means on section
 * entry. The intended behaviour is scroll-driven — out as you scroll in, back
 * in as you scroll on — which needs a scroll offset the stepper does not have.
 * Swapping the `animate` targets for a scroll progress value is the only change
 * required once the page scrolls.
 */

const AGENTS = [
  "Customer Service",
  "Sales",
  "Receptionist",
  "Operations",
  "HR",
  "Finance",
  "Marketing",
  "Compliance",
  "Reporting",
];

const TOOLS = ["Quotes & Bookings", "CRM", "Unified Inbox"];

const ITEMS = [...AGENTS, ...TOOLS];
/** Ring radius in px, against the 640px square below. */
const R = 236;

export function SynergyBrain() {
  return (
    <div className="relative mx-auto h-[640px] w-[640px] max-w-full">
      {/* Spokes, drawn first so the labels sit over them. Each fades in with
          its own label so the connection reads as the agent being extruded
          from the core rather than the ring being drawn separately. */}
      <svg
        aria-hidden
        viewBox="-320 -320 640 640"
        className="absolute inset-0 h-full w-full overflow-visible"
      >
        {ITEMS.map((label, i) => {
          const a = (i / ITEMS.length) * Math.PI * 2 - Math.PI / 2;
          return (
            <motion.line
              key={label}
              x1={0}
              y1={0}
              x2={Math.cos(a) * R}
              y2={Math.sin(a) * R}
              stroke="currentColor"
              strokeWidth={0.6}
              className="text-ink/25"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{
                duration: 1.1,
                delay: 0.3 + i * 0.07,
                ease: [0.16, 1, 0.3, 1],
              }}
            />
          );
        })}
      </svg>

      {/* The core. Slow pulse so it reads as alive rather than a dot. */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <motion.div
          className="h-28 w-28 rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(10,10,10,0.22) 0%, rgba(10,10,10,0.06) 45%, transparent 72%)",
          }}
          animate={{ scale: [1, 1.14, 1], opacity: [0.85, 1, 0.85] }}
          transition={{ duration: 3.4, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      {/* Labels. Each starts at the core and travels out to its place on the
          ring — the brainstorm. Staggered so they leave one at a time. */}
      {ITEMS.map((label, i) => {
        const a = (i / ITEMS.length) * Math.PI * 2 - Math.PI / 2;
        const isTool = i >= AGENTS.length;
        return (
          <div
            key={label}
            className="pointer-events-none absolute left-1/2 top-1/2"
          >
            <motion.span
              className={`block -translate-x-1/2 -translate-y-1/2 whitespace-nowrap font-body text-[11px] uppercase tracking-[0.14em] ${
                isTool ? "text-ink/45" : "text-ink/75"
              }`}
              initial={{ x: 0, y: 0, opacity: 0, scale: 0.5 }}
              animate={{ x: Math.cos(a) * R, y: Math.sin(a) * R, opacity: 1, scale: 1 }}
              transition={{
                duration: 1.2,
                delay: 0.3 + i * 0.07,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              {label}
            </motion.span>
          </div>
        );
      })}
    </div>
  );
}

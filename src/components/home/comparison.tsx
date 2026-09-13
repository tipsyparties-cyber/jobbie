"use client";

import { motion } from "framer-motion";
import { GlassPanel } from "@/components/ui/glass-panel";
import { SectionReveal } from "@/components/ui/section-reveal";

const without = [
  "Slow response times",
  "Missed enquiries",
  "Manual quotes & invoices",
  "Inconsistent service",
  "Prone to human error",
  "Limited by working hours",
  "High operational costs",
  "Repetitive manual tasks",
  "Gut feel decisions",
  "Growth = more chaos",
  "Business needs you there",
];

const withUpUp = [
  "Instant responses, 24/7",
  "Every lead captured",
  "Fully automated",
  "Consistent every time",
  "Accurate & reliable",
  "Always on, 365 days",
  "Leaner, more profitable",
  "Systems do the work",
  "Data-driven decisions",
  "Growth = more freedom",
  "Runs itself",
];

export function Comparison() {
  return (
    <section className="py-32 px-6">
      <div className="mx-auto max-w-[1280px]">
        <SectionReveal>
          <h2 className="text-center font-display text-4xl font-light md:text-5xl">
            &ldquo;Same business. Completely different operation.&rdquo;
          </h2>
        </SectionReveal>

        <div className="mt-16 grid gap-8 md:grid-cols-2">
          <SectionReveal delay={0.1}>
            <GlassPanel className="h-full">
              <h3 className="mb-6 text-center font-sans text-sm font-medium uppercase tracking-widest text-mid-grey">
                Without Heyday
              </h3>
              <ul className="space-y-3">
                {without.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-warm-grey/70">
                    <span className="mt-0.5 text-red-400 shrink-0">&times;</span>
                    {item}
                  </li>
                ))}
              </ul>
            </GlassPanel>
          </SectionReveal>

          <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <GlassPanel className="h-full border-accent/20">
              <h3 className="mb-6 text-center font-sans text-sm font-medium uppercase tracking-widest text-accent">
                With Heyday
              </h3>
              <ul className="space-y-3">
                {withUpUp.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-warm-grey">
                    <span className="mt-0.5 text-accent shrink-0">&#10003;</span>
                    {item}
                  </li>
                ))}
              </ul>
            </GlassPanel>
          </motion.div>
        </div>

        <SectionReveal delay={0.2}>
          <p className="mt-12 text-center font-sans text-sm italic text-mid-grey">
            &ldquo;What running a smarter business actually looks like.&rdquo;
          </p>
        </SectionReveal>
      </div>
    </section>
  );
}

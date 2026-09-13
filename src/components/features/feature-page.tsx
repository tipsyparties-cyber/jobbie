"use client";

import Link from "next/link";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { SHELL, Rule, Braced, Pill, HEAD, SUBHEAD } from "@/components/home/section-kit";
import { BUCKETS, relatedTo, type Feature } from "@/lib/features";
import { CTA, SITE } from "@/lib/site";

/* ==================================================================== *
 *  The feature page.
 *
 *  One component for all twenty. getjobber's feature pages are the same
 *  page with different words, so this is that page — in Heyday's styling,
 *  built from the same section-kit parts as the home page so the two cannot
 *  drift apart.
 *
 *  Running order, straight off getjobber:
 *    breadcrumb → H1 + intro + CTA → "How it works" with jump links →
 *    blocks (kicker, heading, copy) → customer quote → related → CTA
 *
 *  The visual slot beside each block is a tinted panel where the screenshot
 *  goes. Sized and placed, so swapping in an image later is a src and
 *  nothing else.
 * ==================================================================== */

function Rise({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "center center"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [40, 0]);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [0, 1]);
  return (
    <motion.div ref={ref} style={{ y, opacity }}>
      {children}
    </motion.div>
  );
}

/** Turns a block heading into a stable anchor id for the jump links. */
const anchorId = (kicker: string) =>
  kicker.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

export function FeaturePage({ feature }: { feature: Feature }) {
  const bucket = BUCKETS.find((b) => b.id === feature.bucket)!;
  const related = relatedTo(feature);

  return (
    <div className="text-ink">
      {/* ---- Hero. The feature's tint is the ground, which is what makes
              twenty pages feel like one family rather than one template. ---- */}
      <header style={{ backgroundColor: feature.tint }}>
        <div className={`${SHELL} pb-24 pt-16`}>
          <nav
            aria-label="Breadcrumb"
            className="font-body text-sm text-ink/55"
          >
            <Link href="/" className="transition-colors hover:text-ink">
              Home
            </Link>
            <span className="px-2">/</span>
            <Link href="/features" className="transition-colors hover:text-ink">
              All features
            </Link>
            <span className="px-2">/</span>
            <span className="text-ink/80">{feature.name}</span>
          </nav>

          <div className="mt-12">
            <Braced>{bucket.title}</Braced>
          </div>

          <h1
            className={`mt-10 max-w-[18ch] font-body text-[clamp(2.1rem,6vw,4.75rem)] font-semibold leading-[0.98] tracking-[-0.035em]`}
          >
            {feature.h1}
          </h1>

          <p className="mt-8 max-w-2xl font-body text-lg leading-relaxed text-ink/75">
            {feature.intro}
          </p>

          <div className="mt-10 flex flex-wrap gap-3">
            <Pill href={CTA.primary.href} solid>
              {CTA.primary.label}
            </Pill>
            <Pill href="/features">See all features</Pill>
          </div>
        </div>
      </header>

      {/* ---- How it works, with jump links ---- */}
      <section className={`${SHELL} py-20`}>
        <h2 className={`max-w-[20ch] ${HEAD}`}>
          How does {SITE.name}&apos;s {feature.name.toLowerCase()} work?
        </h2>
        <ul className="mt-10 flex flex-wrap gap-2.5">
          {feature.blocks.map((b) => (
            <li key={b.kicker}>
              <a
                href={`#${anchorId(b.kicker)}`}
                className="inline-block rounded-full border border-ink/25 px-5 py-2.5 font-body text-sm text-ink/75 transition-colors hover:border-ink/60 hover:text-ink"
              >
                {b.kicker}
              </a>
            </li>
          ))}
        </ul>
      </section>

      {/* ---- The blocks ---- */}
      {feature.blocks.map((b, i) => (
        <section key={b.kicker} id={anchorId(b.kicker)}>
          <Rule />
          <div className={`${SHELL} py-20`}>
            <Rise>
              <div
                className={`grid items-center gap-12 lg:grid-cols-2 ${
                  i % 2 === 1 ? "lg:[&>*:first-child]:order-2" : ""
                }`}
              >
                <div>
                  <p className="font-body text-xs font-semibold uppercase tracking-[0.18em] text-ink/45">
                    {b.kicker}
                  </p>
                  <h3 className={`mt-5 max-w-[20ch] ${SUBHEAD}`}>{b.head}</h3>
                  <p className="mt-5 max-w-lg font-body text-base leading-relaxed text-ink/70">
                    {b.copy}
                  </p>
                  <div className="mt-8">
                    <Pill href={CTA.primary.href}>{CTA.primary.label}</Pill>
                  </div>
                </div>

                {/* Where the screenshot goes. */}
                <div
                  aria-hidden
                  className="aspect-[4/3] w-full rounded-3xl"
                  style={{ backgroundColor: feature.tint }}
                />
              </div>
            </Rise>
          </div>
        </section>
      ))}

      {/* ---- Customer quote ---- */}
      {feature.quote && (
        <section>
          <Rule />
          <div className={`${SHELL} py-24`}>
            <Rise>
              <figure className="max-w-4xl">
                <blockquote
                  className={`max-w-[24ch] font-body text-[clamp(1.5rem,3.4vw,2.75rem)] font-normal leading-[1.2] tracking-[-0.02em]`}
                >
                  &ldquo;{feature.quote.text}&rdquo;
                </blockquote>
                <figcaption className="mt-8 font-body text-sm text-ink/60">
                  {feature.quote.who} · {feature.quote.org}
                </figcaption>
              </figure>
            </Rise>
          </div>
        </section>
      )}

      {/* ---- Related features ---- */}
      <section>
        <Rule />
        <div className={`${SHELL} py-24`}>
          <Braced>Goes well with</Braced>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {related.map((r) => (
              <Link
                key={r.slug}
                href={`/features/${r.slug}`}
                className="group flex flex-col rounded-3xl p-8 transition-transform hover:-translate-y-1"
                style={{ backgroundColor: r.tint }}
              >
                <p className={SUBHEAD}>{r.name}</p>
                <p className="mt-3 flex-1 font-body text-sm leading-relaxed text-ink/70">
                  {r.promise}
                </p>
                <span className="mt-6 font-body text-sm font-medium text-ink">
                  Learn more{" "}
                  <span aria-hidden className="inline-block transition-transform group-hover:translate-x-1">
                    →
                  </span>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ---- Closing ---- */}
      <section>
        <Rule />
        <div className={`${SHELL} py-28`}>
          <h2 className="max-w-[14ch] font-body text-[clamp(2rem,6vw,4.75rem)] font-semibold leading-[0.95] tracking-[-0.04em]">
            Ready to see what&apos;s possible?
          </h2>
          <div className="mt-10">
            <Pill href={CTA.primary.href} solid>
              {CTA.primary.label}
            </Pill>
          </div>
        </div>
      </section>
    </div>
  );
}

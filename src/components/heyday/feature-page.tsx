"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Panel, Card, Sticker, StatusChip } from "@/components/ui/surfaces";
import { SectionReveal, RevealGroup } from "@/components/heyday/motion";
import { SectionMark } from "@/components/heyday/heyday-mark";
import { Icon } from "@/components/heyday/icon";
import { HeydayLine } from "@/components/heyday/heyday-line";
import { DecorSuns, SECTION_SUNS } from "@/components/heyday/decor-suns";
import { groupById } from "@/lib/groups";
import { featureBySlug, statusLabel, type HeydayFeature } from "@/lib/heyday-features";
import { statByRow } from "@/lib/stats-bank";
import { CTA, TBC } from "@/lib/site";
import { PAPER, CREAM, INK } from "@/lib/palette";
import type { ShapeName } from "@/lib/heyday-mark";

/* ==================================================================== *
 *  The feature page — template T2.
 *
 *  One template for all forty-six. The running order is Jobber's, plus
 *  Jem's additions and HoneyBook's FAQ:
 *
 *    breadcrumb → hero → saves/increases/reduces → the proof →
 *    what it's costing you → how it works → for your kind of business →
 *    a customer quote → FAQ → related → closing
 *
 *  Two rules the template enforces rather than trusting a page to honour:
 *
 *  - The H1 is the owner's PAIN, not the feature name. "Stop losing
 *    bookings while you work out the price" is what someone searches for;
 *    "Instant quotes" is what we call it, and that goes in the line under,
 *    in the words people actually type.
 *  - A statistic can only come from the stats bank, by row number, and
 *    always prints its source and what kind of evidence it is. Row 1 is a
 *    direct rival's own marketing data, and a page that hides that is
 *    passing off a competitor's sales copy as a finding.
 * ==================================================================== */

type HowItWorks = { label: string; heading: string; line: string; screen: string };
type Situation = { business: string; situation: string };
type Faq = { q: string; a: string };
type Example = { inputs: string; maths: string; result: string };

export function FeaturePage({ feature }: { feature: HeydayFeature }) {
  const group = groupById(feature.group)!;
  const how = (feature.howItWorks ?? []) as HowItWorks[];
  const situations = (feature.situations ?? []) as Situation[];
  const faq = (feature.faq ?? []) as Faq[];
  const example = feature.example as Example | undefined;
  const stats = (feature.stats ?? []) as { statsBankRow: number }[];
  const related = (feature.related ?? [])
    .map(featureBySlug)
    .filter(Boolean)
    .slice(0, 6) as HeydayFeature[];

  const comingSoon = feature.status !== "live";
  const cta = comingSoon ? CTA.comingSoon : CTA.primary;

  return (
    <div className="text-ink">
      {/* ---- Hero ---- */}
      <header className="relative" style={{ backgroundColor: group.ground }}>
        <DecorSuns suns={SECTION_SUNS} />
        <div className="relative mx-auto max-w-[1280px] px-6 pb-20 pt-10">
          <nav aria-label="Breadcrumb" className="font-mono text-[12px] tracking-[0.02em] text-ink/55">
            <Link href="/features" className="hover:text-ink">Features</Link>
            <span className="px-2">›</span>
            <Link href={`/how-it-works/${group.id}`} className="inline-flex items-center gap-1.5 hover:text-ink">
              <SectionMark shape={group.shape as ShapeName} size={14} colour={group.colour} />
              {group.name}
            </Link>
            <span className="px-2">›</span>
            <span className="text-ink/80">{feature.name}</span>
          </nav>

          <div className="mt-10 grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
            <div>
              <div className="flex flex-wrap items-center gap-3">
                <StatusChip status={statusLabel(feature.status)} />
                {feature.onlyOnHeyday && (
                  <Sticker className="bg-paper px-3 py-1.5" tilt={-6}>
                    <span className="font-mono text-[11px] tracking-[0.02em]">
                      Only on Heyday
                    </span>
                  </Sticker>
                )}
              </div>

              {/* The pain, not the feature name. */}
              <h1 className="mt-7 max-w-[18ch] font-display text-[clamp(2rem,5vw,3.6rem)] font-semibold leading-[1.03] tracking-[-0.03em]">
                {feature.pain ?? feature.name}
              </h1>

              {/* The feature in search words — the same words as the title. */}
              <p className="mt-5 max-w-xl font-body text-lg leading-relaxed text-ink/70">
                {feature.searchLine}
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <Button href={cta.href} variant="primary" arrow>
                  {cta.label}
                </Button>
                <Button href={CTA.secondary.href} variant="ghost">
                  {CTA.secondary.label}
                </Button>
              </div>
            </div>

            {/* The product screen. A tinted panel where the illustration
                goes, labelled so nobody mistakes it for a screenshot. */}
            <div className="relative">
              <Panel className="!px-0 !py-0 overflow-hidden">
                <div
                  aria-hidden
                  className="flex aspect-[4/3] w-full items-center justify-center"
                  style={{ backgroundColor: CREAM }}
                >
                  <Icon name={feature.icon} size={72} ground={CREAM} />
                </div>
                <p className="px-6 py-4 font-mono text-[11px] tracking-[0.02em] text-ink/45">
                  Illustration · example data
                </p>
              </Panel>
            </div>
          </div>
        </div>
      </header>

      {feature.intro && (
        <section className="mx-auto max-w-[1280px] px-6 py-20">
          <SectionReveal>
            <p className="max-w-[65ch] font-body text-xl leading-relaxed text-ink/80">
              {feature.intro}
            </p>
          </SectionReveal>
        </section>
      )}

      {/* ---- Saves / Increases / Reduces ---- */}
      {feature.outcomes && (
        <section className="mx-auto max-w-[1280px] px-6 pb-20">
          <RevealGroup className="grid gap-6 md:grid-cols-3">
            {([
              ["Saves", feature.outcomes.saves],
              ["Increases", feature.outcomes.increases],
              ["Reduces", feature.outcomes.reduces],
            ].filter(([, v]) => v) as [string, string][]).map(([k, v]) => (
              <Card key={k} className="bg-paper p-7">
                <p className="font-mono text-[12px] tracking-[0.02em] text-ink/50">{k}</p>
                <p className="mt-3 font-body text-base leading-relaxed">{v}</p>
              </Card>
            ))}
          </RevealGroup>
        </section>
      )}

      {/* ---- The proof ---- */}
      {stats.length > 0 && (
        <section className="mx-auto max-w-[1280px] px-6 pb-20">
          {stats.map(({ statsBankRow }) => {
            const s = statByRow(statsBankRow);
            if (!s) return null;
            return (
              <SectionReveal key={statsBankRow}>
                <Panel className="max-w-3xl">
                  <p className="font-display text-[clamp(1.3rem,2.6vw,2rem)] font-semibold leading-snug">
                    {s.claim}
                  </p>
                  {/* Always printed. The kind matters as much as the source:
                      row 1 is a rival's own marketing data. */}
                  <p className="mt-5 font-mono text-[12px] leading-relaxed tracking-[0.02em] text-ink/50">
                    {s.source} · {s.covers} · {s.kind}
                  </p>
                </Panel>
              </SectionReveal>
            );
          })}
        </section>
      )}

      {/* ---- What it's costing you ---- */}
      {example && (
        <section className="mx-auto max-w-[1280px] px-6 pb-20">
          <SectionReveal>
            <h2 className="font-display text-[clamp(1.6rem,3.4vw,2.6rem)] font-semibold tracking-[-0.02em]">
              What it&apos;s costing you
            </h2>
            <Panel className="mt-8 max-w-3xl">
              <p className="font-body text-sm leading-relaxed text-ink/65">{example.inputs}</p>
              <p className="mt-5 font-mono text-[13px] leading-relaxed tracking-[0.02em]">
                {example.maths}
              </p>
              <p className="mt-5 font-display text-lg font-semibold">{example.result}</p>
            </Panel>
          </SectionReveal>
        </section>
      )}

      {/* ---- How it works ---- */}
      {how.length > 0 && (
        <section className="relative" style={{ backgroundColor: PAPER }}>
          <div className="mx-auto max-w-[1280px] px-6 py-20">
            <h2 className="font-display text-[clamp(1.6rem,3.4vw,2.6rem)] font-semibold tracking-[-0.02em]">
              How it works
            </h2>

            <ul className="mt-8 flex flex-wrap gap-2.5">
              {how.map((b) => (
                <li key={b.label}>
                  <a
                    href={`#${slugify(b.label)}`}
                    className="inline-block rounded-lg border border-ink/25 px-4 py-2 font-body text-sm transition-[border-radius] duration-200 hover:rounded-[28px] hover:border-ink"
                  >
                    {b.label}
                  </a>
                </li>
              ))}
            </ul>

            <div className="mt-14 flex flex-col gap-20">
              {how.map((b, i) => (
                <div key={b.label} id={slugify(b.label)}>
                  <SectionReveal>
                    <div
                      className={`grid items-center gap-10 lg:grid-cols-2 ${
                        i % 2 === 1 ? "lg:[&>*:first-child]:order-2" : ""
                      }`}
                    >
                      <div>
                        <p className="font-mono text-[12px] tracking-[0.02em] text-ink/50">
                          {String(i + 1).padStart(2, "0")} · {b.label}
                        </p>
                        <h3 className="mt-4 max-w-[20ch] font-display text-[clamp(1.3rem,2.4vw,1.9rem)] font-semibold leading-snug">
                          {b.heading}
                        </h3>
                        <p className="mt-4 max-w-lg font-body text-base leading-relaxed text-ink/70">
                          {b.line}
                        </p>
                      </div>
                      <Card className="bg-cream p-6">
                        <p className="font-mono text-[11px] tracking-[0.02em] text-ink/45">
                          Illustration · example data
                        </p>
                        <p className="mt-3 font-body text-sm leading-relaxed text-ink/60">
                          {b.screen}
                        </p>
                      </Card>
                    </div>
                  </SectionReveal>
                </div>
              ))}
            </div>

            <div className="mt-16">
              <HeydayLine steps={how.map((b) => b.label)} current={how.length - 1} labels />
            </div>
          </div>
        </section>
      )}

      {/* ---- For your kind of business ---- */}
      {situations.length > 0 && (
        <section className="mx-auto max-w-[1280px] px-6 py-20">
          <h2 className="font-display text-[clamp(1.6rem,3.4vw,2.6rem)] font-semibold tracking-[-0.02em]">
            For your kind of business
          </h2>
          <RevealGroup className="mt-10 grid gap-6 md:grid-cols-3">
            {situations.map((s) => (
              <Card key={s.business} className="bg-paper p-7">
                <p className="font-mono text-[12px] tracking-[0.02em] text-ink/50">
                  {s.business}
                </p>
                <p className="mt-3 font-body text-base leading-relaxed">{s.situation}</p>
              </Card>
            ))}
          </RevealGroup>
        </section>
      )}

      {/* ---- A customer quote ---- */}
      <section className="mx-auto max-w-[1280px] px-6 pb-20">
        <SectionReveal>
          <figure className="max-w-3xl">
            <blockquote className="font-display text-[clamp(1.4rem,3vw,2.2rem)] font-semibold leading-snug text-ink/30">
              A customer&apos;s words go here.
            </blockquote>
            {/* Signed Placeholder until a real one is approved. Nothing on
                this site quotes a customer it does not have. */}
            <figcaption className="mt-5 font-mono text-[12px] tracking-[0.02em] text-ink/45">
              {TBC.confirm} · Placeholder
            </figcaption>
          </figure>
        </SectionReveal>
      </section>

      {/* ---- FAQ ---- */}
      {faq.length > 0 && (
        <section className="mx-auto max-w-[1280px] px-6 pb-20">
          <h2 className="font-display text-[clamp(1.6rem,3.4vw,2.6rem)] font-semibold tracking-[-0.02em]">
            Questions
          </h2>
          <div className="mt-8 max-w-3xl">
            {faq.map((f) => (
              <details key={f.q} className="border-b border-ink/12 py-5">
                <summary className="cursor-pointer list-none font-display text-base font-semibold">
                  {f.q}
                </summary>
                <p className="mt-3 max-w-[65ch] font-body text-base leading-relaxed text-ink/70">
                  {f.a}
                </p>
              </details>
            ))}
          </div>
        </section>
      )}

      {/* ---- Related ---- */}
      {related.length > 0 && (
        <section className="mx-auto max-w-[1280px] px-6 pb-20">
          <h2 className="font-display text-[clamp(1.6rem,3.4vw,2.6rem)] font-semibold tracking-[-0.02em]">
            Goes well with
          </h2>
          <RevealGroup className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((r) => {
              const g = groupById(r.group)!;
              return (
                <Link key={r.slug} href={`/features/${r.slug}`} className="group block">
                  <Card className="h-full bg-paper p-6">
                    <Icon name={r.icon} size={36} ground={PAPER} />
                    <p className="mt-4 font-display text-base font-semibold">{r.name}</p>
                    <p className="mt-2 font-mono text-[11px] tracking-[0.02em] text-ink/45">
                      {g.name} · {statusLabel(r.status)}
                    </p>
                  </Card>
                </Link>
              );
            })}
          </RevealGroup>
        </section>
      )}

      {/* ---- Closing ---- */}
      <section className="mx-auto max-w-[1280px] px-6 pb-24">
        <div
          className="rounded-[40px] px-8 py-16 text-center md:px-16"
          style={{ backgroundColor: INK }}
        >
          <h2 className="mx-auto max-w-[20ch] font-display text-[clamp(1.8rem,4vw,3rem)] font-semibold leading-tight text-cream">
            {group.promise}
          </h2>
          <div className="mt-9 flex flex-wrap justify-center gap-3">
            <Button href={cta.href} variant="primary" arrow>
              {cta.label}
            </Button>
            <Button href={CTA.secondary.href} variant="ghost" className="border-cream text-cream">
              {CTA.secondary.label}
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}

const slugify = (s: string) =>
  s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

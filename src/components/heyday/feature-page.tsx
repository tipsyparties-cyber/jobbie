import type { ReactNode } from "react";
import Link from "next/link";
import {
  PageHero,
  CTABlock,
  FAQ,
  Breadcrumbs,
  Marked,
} from "@/components/heyday/page-shell";
import { Sheet, Wrap, SheetLabel } from "@/components/heyday/sheet";
import { SectionReveal, RevealGroup } from "@/components/heyday/motion";
import { StickyScroll, type StickyBlock } from "@/components/heyday/sticky-scroll";
import { Icon } from "@/components/heyday/icon";
import { HoldingImage } from "@/components/heyday/holding-image";
import { Screen, ScreenRow, ScreenAction } from "@/components/heyday/screen";
import { Card, Panel, Sticker, StatusChip } from "@/components/ui/surfaces";
import { Button } from "@/components/ui/button";
import { QuoteLeakCalculator } from "@/components/heyday/quote-leak-calculator";
import { InboxAnimation } from "@/components/heyday/inbox-animation";
import {
  featureBySlug,
  featureHref,
  statusLabel,
  type HeydayFeature,
} from "@/lib/heyday-features";
import { groupById } from "@/lib/groups";
import { statByRow, sourceLine } from "@/lib/stats-bank";
import { CTA, SITE, TBC } from "@/lib/site";
import { PAPER, CREAM, SKY, LAVENDER, INK } from "@/lib/palette";

/* ==================================================================== *
 *  The feature page — template T2, and the working page at
 *  docs/heyday/reference/site/feature-quotes.html.
 *
 *  One template, forty-six pages. Which means every decision here is made
 *  forty-six times, and a section that is merely adequate is adequate
 *  forty-six times over.
 *
 *  The running order is Jobber's, plus Jem's additions and HoneyBook's
 *  FAQ: breadcrumb, hero, saves/increases/reduces, the proof, what it is
 *  costing you, how it works, who it suits, a quote, the questions, what
 *  pairs with it, the ask.
 *
 *  Three rules the template enforces rather than trusting each page to:
 *
 *  - **The H1 is the PAIN, not the feature name.** "Stop losing bookings
 *    while you work out the price", not "Instant quotes". The name goes
 *    underneath in the words people search for, and the same words go in
 *    the page title.
 *  - **A statistic comes from the stats bank by row number** and prints
 *    its source, who it covers and what kind of evidence it is. A feature
 *    with no approved figure shows nothing rather than borrowing one.
 *  - **Nothing is drawn as a screenshot.** The data describes what each
 *    illustration shows; the page renders that description, labelled. A
 *    convincing fake screenshot of software that does not exist yet is
 *    the most persuasive lie a page like this could tell.
 * ==================================================================== */

/**
 * Features whose hero picture is drawn rather than described.
 *
 * The rest of the site's illustrations are descriptions of a screen,
 * labelled as illustrations — which is the honest default when the
 * software does not exist yet. A few features earn a real drawing because
 * the picture IS the argument, and this is the list.
 *
 * Follow-ups is the other one the brief names explicitly (T2, "two
 * special pages"): it uses the workflow-builder still.
 */
const HERO_PICTURE: Record<string, ReactNode> = {
  inbox: <InboxAnimation />,
};

export function FeaturePage({ feature }: { feature: HeydayFeature }) {
  const group = groupById(feature.group)!;
  const stat = feature.stats?.[0]
    ? statByRow(feature.stats[0].statsBankRow)
    : null;

  const related = (feature.related ?? [])
    .map((s) => featureBySlug(s))
    .filter(Boolean)
    .slice(0, 4) as HeydayFeature[];

  const blocks: StickyBlock[] = (feature.howItWorks ?? []).map((b, i) => ({
    id: `how-${i}`,
    label: b.label.toLowerCase(),
    title: b.heading,
    colour: [SKY, LAVENDER, CREAM, group.ground][i % 4],
    body: (
      <>
        <p className="m-0">{b.line}</p>
        <p className="mt-3">
          <Link
            href={CTA.comingSoon.href}
            className="font-display text-sm font-semibold underline underline-offset-[3px]"
          >
            {CTA.comingSoon.label} →
          </Link>
        </p>
      </>
    ),
    picture: (
      <Screen title={b.heading}>
        <ScreenRow meta="illustration">{b.screen}</ScreenRow>
        <ScreenAction>{CTA.comingSoon.label}</ScreenAction>
      </Screen>
    ),
  }));

  /* Ink is the group colour for Run the day, and an ink panel behind an
     ink-outlined screen disappears. Sky stands in, the way A11 does for
     the sun in the same situation. */
  const heroPanel = group.colour === INK ? SKY : group.colour;

  return (
    <>
      <PageHero
        crumbs={
          <Breadcrumbs
            items={[
              { label: "Features", href: "/features" },
              {
                label: group.name,
                href: `/how-it-works/${group.id}`,
                shape: group.shape,
                colour: group.sun,
              },
              { label: feature.name },
            ]}
          />
        }
        label={feature.name.toLowerCase()}
        h1={feature.pain ?? feature.name}
        chips={
          <>
            <StatusChip status={statusLabel(feature.status)} />
            {feature.onlyOnHeyday ? (
              <Sticker
                className="px-3 py-1.5 font-display text-[13px] font-bold"
                tilt={-6}
                style={{
                  backgroundColor: LAVENDER,
                  boxShadow: "6px 6px 0 0 rgba(10,10,10,0.08)",
                }}
              >
                Only on Heyday
              </Sticker>
            ) : null}
          </>
        }
        sub={
          <>
            <b className="mb-3 block font-display text-xl font-bold text-ink">
              {feature.searchLine}
            </b>
            {feature.intro}
          </>
        }
        actions={
          <>
            <Button href={CTA.comingSoon.href} variant="primary" arrow>
              {CTA.comingSoon.label}
            </Button>
            <Button href={CTA.secondary.href} variant="ghost">
              {CTA.secondary.label}
            </Button>
          </>
        }
        aside={
          <div className="relative">
            {/* The feature's own icon, tilted onto the picture (T2, 2). */}
            <Sticker
              className="absolute -left-4 -top-6 z-[2] grid h-[86px] w-[86px] place-items-center p-3"
              tilt={-8}
              style={{ backgroundColor: PAPER }}
            >
              <Icon name={feature.icon} size={56} ground={PAPER} />
            </Sticker>
            <Panel className="!p-6" style={{ backgroundColor: heroPanel }}>
              {/* A few features have a picture worth drawing properly
                  rather than describing. Everything else gets the
                  labelled description, which is honest and which nobody
                  will mistake for a screenshot. */}
              {HERO_PICTURE[feature.slug] ?? (
                <Screen title={feature.name}>
                  <ScreenRow meta={group.name}>{feature.pain}</ScreenRow>
                  <ScreenRow meta="illustration" hot>
                    {feature.howItWorks?.[0]?.screen ?? feature.searchLine}
                  </ScreenRow>
                  <ScreenAction>{CTA.comingSoon.label}</ScreenAction>
                </Screen>
              )}
            </Panel>
          </div>
        }
      />

      {/* Saves / Increases / Reduces, on the Heyday line. */}
      {feature.outcomes ? (
        <Sheet colour={PAPER}>
          <Wrap>
            <SectionReveal>
              <SheetLabel>what it does for you</SheetLabel>
            </SectionReveal>
            <div className="relative">
              <span
                aria-hidden
                className="absolute left-[4%] right-[4%] top-1/2 -z-10 hidden h-0.5 bg-ink/25 lg:block"
              />
              <RevealGroup className="grid gap-5 lg:grid-cols-3">
                {(
                  [
                    ["SAVES", feature.outcomes.saves],
                    ["INCREASES", feature.outcomes.increases],
                    ["REDUCES", feature.outcomes.reduces],
                  ] as [string, string | undefined][]
                ).map(([k, v]) =>
                  v ? (
                    <Card
                      key={k}
                      className="h-full p-[22px]"
                      style={{ backgroundColor: PAPER }}
                    >
                      <b className="mb-1.5 block font-mono text-xs tracking-[0.08em] text-ink/55">
                        {k}
                      </b>
                      <p className="m-0 font-display text-lg font-semibold leading-[1.35]">
                        {v}
                      </p>
                    </Card>
                  ) : null
                )}
              </RevealGroup>
            </div>
          </Wrap>
        </Sheet>
      ) : null}

      {/* The proof. Only where a row is approved for this feature. */}
      {stat ? (
        <Sheet colour={CREAM}>
          <Wrap>
            <SectionReveal>
              <SheetLabel>the proof</SheetLabel>
              <div className="grid items-center gap-6 lg:grid-cols-[auto_minmax(0,1fr)]">
                <p
                  className="m-0 font-display font-extrabold leading-none tracking-[-0.04em]"
                  style={{ fontSize: "clamp(56px, 7vw, 96px)" }}
                >
                  {stat.headline?.value ?? `Row ${stat.row}`}
                </p>
                <div>
                  <p className="m-0 font-display text-xl font-bold leading-[1.35]">
                    {stat.claim}
                  </p>
                  <p className="mt-2 font-mono text-xs leading-relaxed text-ink/55">
                    {sourceLine(stat)}
                    {stat.kind.includes("direct rival")
                      ? " [crediting a rival: Jem and Russell to decide]"
                      : ""}
                  </p>
                </div>
              </div>
            </SectionReveal>
          </Wrap>
        </Sheet>
      ) : null}

      {/* What it's costing you: the worked example, with the maths shown. */}
      {feature.example ? (
        <Sheet colour={PAPER}>
          <Wrap>
            <SectionReveal>
              <SheetLabel>what it&rsquo;s costing you</SheetLabel>
              <h2 className="hd-h2 max-w-[24ch]">
                What it&rsquo;s <span className="hd-hl">costing you</span>.
              </h2>
            </SectionReveal>

            <div className="grid gap-10 lg:grid-cols-2">
              <SectionReveal>
                <Panel className="!p-[30px]">
                  <b className="block font-display text-base font-semibold">
                    Example numbers
                  </b>
                  <p className="mt-2 text-[15px] text-ink/65">
                    {feature.example.inputs}
                  </p>
                  {/* The maths is shown, not asserted. A total with no
                      working is just another claim, and the point of this
                      section is that a reader can check it against their
                      own numbers. */}
                  <pre
                    className="my-3.5 whitespace-pre-wrap rounded-xl px-[18px] py-4 font-mono text-[15px] leading-[1.7]"
                    style={{ backgroundColor: CREAM }}
                  >
                    {feature.example.maths}
                  </pre>
                  <p className="m-0 font-display text-[22px] font-bold">
                    {feature.example.result?.split(". Then")[0]}
                  </p>
                </Panel>
              </SectionReveal>

              {/* The Quotes page gets the live calculator, per SaaS brief
                  3.9. Everywhere else the worked example stands alone. */}
              {feature.slug === "quotes" ? (
                <SectionReveal delay={0.15}>
                  <QuoteLeakCalculator />
                </SectionReveal>
              ) : null}
            </div>
          </Wrap>
        </Sheet>
      ) : null}

      {/* How it works — the sticky scroll, with jump links above it. */}
      {blocks.length ? (
        <Sheet colour={CREAM}>
          <Wrap>
            <SectionReveal>
              <SheetLabel>how it works</SheetLabel>
              <h2 className="hd-h2 max-w-[26ch]">
                From the question to the deposit,{" "}
                <span className="hd-hl">in one step</span>.
              </h2>
              <nav
                aria-label="Jump to a step"
                className="mb-10 flex flex-wrap gap-2"
              >
                {(feature.howItWorks ?? []).map((b, i) => (
                  <a
                    key={b.label}
                    href={`#how-${i}`}
                    className="rounded-full border border-ink px-3.5 py-1.5 font-display text-sm font-semibold"
                    style={{ backgroundColor: PAPER }}
                  >
                    {b.heading}
                  </a>
                ))}
              </nav>
            </SectionReveal>
            <StickyScroll blocks={blocks} />
          </Wrap>
        </Sheet>
      ) : null}

      {/* For your kind of business. */}
      {feature.situations?.length ? (
        <Sheet colour={PAPER}>
          <Wrap>
            <SectionReveal>
              <SheetLabel>for your kind of business</SheetLabel>
              <h2 className="hd-h2 max-w-[26ch]">
                <Marked
                  text="However you sell your time, it fits."
                  phrase="However you sell your time"
                />
              </h2>
            </SectionReveal>
            <RevealGroup className="grid gap-[22px] lg:grid-cols-3">
              {feature.situations.map((s) => (
                <Card
                  key={s.business}
                  className="flex h-full flex-col overflow-hidden"
                  style={{ backgroundColor: PAPER }}
                >
                  <HoldingImage
                    art={`${s.business.toLowerCase()} at work`}
                    ratio="4:3"
                    tint={group.ground}
                    shape={group.shape}
                    radius={0}
                    className="!border-0 !border-b-2"
                  />
                  <div className="p-5">
                    <b className="block font-mono text-[11px] font-semibold tracking-[0.04em] text-ink/55">
                      {s.business.toUpperCase()}
                    </b>
                    <p className="mt-1.5 text-[15.5px] text-ink/70">
                      {s.situation}
                    </p>
                  </div>
                </Card>
              ))}
            </RevealGroup>
          </Wrap>
        </Sheet>
      ) : null}

      {/* A customer quote, signed Placeholder, because there are none. */}
      <Sheet colour={SKY}>
        <Wrap>
          <SectionReveal>
            <SheetLabel>a customer&rsquo;s view</SheetLabel>
            <blockquote className="m-0 max-w-[40ch]">
              <p
                className="m-0 font-display font-bold leading-[1.25]"
                style={{ fontSize: "clamp(26px, 3vw, 38px)" }}
              >
                &ldquo;Placeholder: a real customer quote goes here once one
                is approved.&rdquo;
              </p>
              <footer className="mt-4 font-mono text-xs text-ink/55">
                Placeholder · name and business {TBC.generic}. {SITE.name} has
                no customers yet, so there is nobody real to quote.
              </footer>
            </blockquote>
          </SectionReveal>
        </Wrap>
      </Sheet>

      {/* FAQ. */}
      {feature.faq?.length ? (
        <Sheet colour={CREAM}>
          <Wrap>
            <SectionReveal>
              <SheetLabel>faq</SheetLabel>
              <FAQ
                heading={`Questions about ${feature.name.toLowerCase()}.`}
                items={feature.faq}
              />
            </SectionReveal>
          </Wrap>
        </Sheet>
      ) : null}

      {/* Related features. */}
      {related.length ? (
        <Sheet colour={PAPER}>
          <Wrap>
            <SectionReveal>
              <SheetLabel>related features</SheetLabel>
              <h2 className="hd-h2">
                Works even better <span className="hd-hl">with these</span>.
              </h2>
            </SectionReveal>
            <RevealGroup className="grid gap-[22px] sm:grid-cols-2 lg:grid-cols-4">
              {related.map((r) => (
                <Card
                  key={r.slug}
                  className="flex h-full flex-col gap-2 p-6"
                  style={{ backgroundColor: PAPER }}
                >
                  <Icon name={r.icon} size={40} ground={PAPER} />
                  <b className="font-display text-[17px] font-bold leading-tight">
                    {r.name}
                  </b>
                  <p className="m-0 text-[15px] text-ink/60">{r.pain}</p>
                  <div className="mt-auto flex items-center justify-between gap-2 pt-3">
                    <StatusChip status={statusLabel(r.status)} />
                    <Link
                      href={featureHref(r.slug)}
                      className="font-display text-sm font-semibold underline underline-offset-[3px]"
                    >
                      See it →
                    </Link>
                  </div>
                </Card>
              ))}
            </RevealGroup>
          </Wrap>
        </Sheet>
      ) : null}

      <CTABlock
        note={
          <>
            Pick the plan that fits. {TBC.price} ·{" "}
            <Link href="/pricing" className="underline underline-offset-2">
              See pricing →
            </Link>
          </>
        }
      />
    </>
  );
}

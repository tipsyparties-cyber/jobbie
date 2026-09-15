import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  PageHero,
  CTABlock,
  LineSteps,
  Marked,
} from "@/components/heyday/page-shell";
import { Sheet, Wrap, SheetLabel } from "@/components/heyday/sheet";
import { SectionReveal, RevealGroup } from "@/components/heyday/motion";
import { HeydayLogoInView } from "@/components/heyday/heyday-logo-in-view";
import { Icon } from "@/components/heyday/icon";
import { HoldingImage } from "@/components/heyday/holding-image";
import { MoreInfoSection } from "@/components/heyday/more-info-section";
import { Card, StatusChip } from "@/components/ui/surfaces";
import { Button } from "@/components/ui/button";
import { GROUPS, groupById, nextGroup, type GroupId } from "@/lib/groups";
import {
  featuresInGroup,
  featureHref,
  statusLabel,
} from "@/lib/heyday-features";
import { stepsInGroup } from "@/lib/flow";
import { GROUP_PAGES } from "@/lib/group-pages";
import { statByRow, sourceLine } from "@/lib/stats-bank";
import { CTA, SITE } from "@/lib/site";
import { PAPER, CREAM, SKY, LAVENDER, INK } from "@/lib/palette";

/* ==================================================================== *
 *  The six group pages — template T3, and the working page at
 *  docs/heyday/reference/site/group-win-the-client.html.
 *
 *  Each one is a chapter of the twelve-step flow: the steps it covers on
 *  the Heyday line, its features, one more-info section that grows into
 *  the page, one statistic, two real situations, and then the next group.
 *
 *  Get rebooked points back to Get ahead, which is why the flow is a loop
 *  rather than a list — and why the Loop mark sits on that group.
 * ==================================================================== */

export function generateStaticParams() {
  return GROUPS.map((g) => ({ group: g.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ group: string }>;
}): Promise<Metadata> {
  const { group } = await params;
  const g = groupById(group);
  const page = GROUP_PAGES[group as GroupId];
  if (!g || !page) return {};
  return {
    title: page.title,
    description: g.promise,
  };
}

export default async function GroupPage({
  params,
}: {
  params: Promise<{ group: string }>;
}) {
  const { group } = await params;
  const g = groupById(group);
  const page = GROUP_PAGES[group as GroupId];
  if (!g || !page) notFound();

  const steps = stepsInGroup(g.id);
  const features = featuresInGroup(g.id);
  const next = nextGroup(g.id);
  const stat = statByRow(page.statRow);
  const headline = features.find((f) => f.slug === page.headlineFeature);
  const dark = g.colour === INK;

  return (
    <>
      <PageHero
        label={g.name.toLowerCase()}
        h1={page.headline}
        highlight={page.highlight}
        sub={g.promise}
        actions={
          <>
            <Button href={CTA.primary.href} variant="primary" arrow>
              {CTA.primary.label}
            </Button>
            <Button href={CTA.secondary.href} variant="ghost">
              {CTA.secondary.label}
            </Button>
          </>
        }
        aside={
          <div className="flex justify-center lg:justify-end">
            {/* The mark in this group's colour, arriving on Together —
                the arcs from the left, the burst from the lower right. A
                group is told apart by its colour, not by a shape of its
                own; the six shapes went with the old sun. */}
            <HeydayLogoInView
              size={260}
              colour={g.markColour}
              motion="together"
              label={`The Heyday mark, in ${g.name} colours`}
            />
          </div>
        }
      />

      {/* The steps this group covers, on the Heyday line. */}
      <Sheet colour={PAPER}>
        <Wrap>
          <SectionReveal>
            <SheetLabel>
              steps {steps[0]?.n} to {steps[steps.length - 1]?.n} of 12
            </SheetLabel>
            <h2 className="hd-h2">
              <Marked text={page.stepsHeading} phrase={page.stepsHighlight} />
            </h2>
          </SectionReveal>
          <LineSteps
            columns={Math.min(steps.length, 4)}
            steps={steps.map((s) => ({
              eyebrow: `Step ${s.n}`,
              title: s.title,
              body: s.heyday,
            }))}
          />
        </Wrap>
      </Sheet>

      {/* Every feature in the group. */}
      <Sheet colour={CREAM}>
        <Wrap>
          <SectionReveal>
            <SheetLabel>features</SheetLabel>
            <h2 className="hd-h2 max-w-[24ch]">
              <Marked
                text={page.featuresHeading}
                phrase={page.featuresHighlight}
              />
            </h2>
          </SectionReveal>
          <RevealGroup className="grid gap-[22px] sm:grid-cols-2 lg:grid-cols-3">
            {features.map((f) => (
              <Card
                key={f.slug}
                className="flex h-full flex-col gap-2 p-6"
                style={{ backgroundColor: PAPER }}
              >
                <Icon name={f.icon} size={40} ground={PAPER} />
                {f.onlyOnHeyday ? (
                  <span className="font-mono text-[11px] font-semibold tracking-[0.04em] text-ink/55">
                    ONLY ON HEYDAY
                  </span>
                ) : null}
                <b className="font-display text-[19px] font-bold leading-tight">
                  {f.name}
                </b>
                <p className="m-0 text-[15px] text-ink/60">{f.pain}</p>
                <div className="mt-auto flex items-center justify-between gap-2 pt-3">
                  <StatusChip status={statusLabel(f.status)} />
                  <Link
                    href={featureHref(f.slug)}
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

      {/* One more-info section, for the group's headline feature (A12). */}
      {headline ? (
        <Sheet colour={PAPER} flush label={g.name}>
          <MoreInfoSection
            group={g}
            headline={headline.pain ?? headline.name}
            highlight={page.rowHighlight}
            line={headline.searchLine ?? ""}
            detail={
              <div className={dark ? "text-cream" : undefined}>
                <p className="hd-label">{g.name.toLowerCase()}</p>
                <h3 className="hd-h2 max-w-[22ch]">{page.rowDetailHeading}</h3>
                <div className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                  {features.slice(0, 4).map((f) => (
                    <Card
                      key={f.slug}
                      className="flex gap-3 p-4 text-ink"
                      style={{ backgroundColor: PAPER }}
                    >
                      <Icon name={f.icon} size={40} ground={PAPER} />
                      <div>
                        <b className="font-display text-base font-bold">
                          {f.name}
                        </b>
                        <p className="mt-1 text-[14.5px] text-ink/60">
                          {f.pain}
                        </p>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            }
          />
        </Sheet>
      ) : null}

      {/* One statistic, with its whole provenance. */}
      {stat ? (
        <Sheet colour={SKY}>
          <Wrap>
            <SectionReveal>
              <SheetLabel>why it matters</SheetLabel>
              <div className="grid items-center gap-6 lg:grid-cols-[auto_minmax(0,1fr)]">
                <p
                  className="m-0 font-display font-extrabold leading-none tracking-[-0.04em]"
                  style={{ fontSize: "clamp(48px, 6vw, 84px)" }}
                >
                  {page.statBig}
                </p>
                <div>
                  <p className="m-0 font-display text-xl font-bold leading-[1.35]">
                    {stat.claim}
                  </p>
                  <p className="mt-2 font-mono text-xs leading-relaxed text-ink/55">
                    {sourceLine(stat)}
                  </p>
                </div>
              </div>
            </SectionReveal>
          </Wrap>
        </Sheet>
      ) : null}

      {/* Two real situations. */}
      <Sheet colour={PAPER}>
        <Wrap>
          <SectionReveal>
            <SheetLabel>for example</SheetLabel>
            <h2 className="hd-h2 max-w-[26ch]">
              <Marked
                text={page.examplesHeading}
                phrase={page.examplesHighlight}
              />
            </h2>
          </SectionReveal>
          <RevealGroup className="grid gap-6 lg:grid-cols-2">
            {page.examples.map((e) => (
              <Card
                key={e.who}
                className="flex h-full flex-col overflow-hidden"
                style={{ backgroundColor: PAPER }}
              >
                <HoldingImage
                  art={e.art}
                  ratio="16:9"
                  tint={g.ground}
                  radius={0}
                  className="!border-0 !border-b-2"
                />
                <div className="p-5">
                  <b className="block font-mono text-[11px] font-semibold tracking-[0.04em] text-ink/55">
                    EXAMPLE
                  </b>
                  <p className="mt-1.5 text-[15.5px] text-ink/70">
                    <b className="font-display text-base font-bold text-ink">
                      {e.who}
                    </b>{" "}
                    {e.situation}
                  </p>
                </div>
              </Card>
            ))}
          </RevealGroup>
        </Wrap>
      </Sheet>

      {/* The next group, on the Heyday line. */}
      <Sheet colour={LAVENDER}>
        <Wrap>
          <SectionReveal>
            <SheetLabel>
              next · steps {stepsInGroup(next.id)[0]?.n} to{" "}
              {stepsInGroup(next.id).slice(-1)[0]?.n}
            </SheetLabel>
            <h2 className="hd-h2">
              Next: <span className="hd-hl">{next.name}</span> →
            </h2>
            <p className="hd-sub">{next.promise}</p>
            <Button href={`/how-it-works/${next.id}`} variant="ghost">
              See {next.name} →
            </Button>
            {/* Get rebooked loops back to Get ahead, and the Loop mark
                spins there — the flow is a circle, not a list. */}
            {g.id === "get-rebooked" ? (
              <p className="mt-6 font-mono text-xs text-ink/55">
                {SITE.name}&rsquo;s flow is a loop, not a list. A happy
                customer is the start of the next booking, which is why this
                group points back at the first.
              </p>
            ) : null}
          </SectionReveal>
        </Wrap>
      </Sheet>

      <CTABlock />
    </>
  );
}

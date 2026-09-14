import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  PageHero,
  CTABlock,
  Marked,
  Breadcrumbs,
} from "@/components/heyday/page-shell";
import { Sheet, Wrap, SheetLabel } from "@/components/heyday/sheet";
import { SectionReveal, RevealGroup } from "@/components/heyday/motion";
import { StickyScroll, type StickyBlock } from "@/components/heyday/sticky-scroll";
import { HoldingImage } from "@/components/heyday/holding-image";
import { Icon } from "@/components/heyday/icon";
import { Card, Sticker, StatusChip } from "@/components/ui/surfaces";
import { Button } from "@/components/ui/button";
import { Screen, ScreenRow, ScreenAction } from "@/components/heyday/screen";
import { STORIES, storyBySlug } from "@/lib/stories";
import { featureBySlug, featureHref, onlyOnHeyday } from "@/lib/heyday-features";
import { GROUPS } from "@/lib/groups";
import { CTA, SITE } from "@/lib/site";
import { PAPER, CREAM, SKY } from "@/lib/palette";

/* ==================================================================== *
 *  /stories/[slug] — template T7, spec part 4, and the working page at
 *  reference/site/story-mobile-bartender.html.
 *
 *  Seven pages from one template, all labelled Example.
 *
 *  The label is the point, not a disclaimer. Jobber's customer stories
 *  are real named businesses with real quotes; the same page shape filled
 *  with invented detail would be a fabricated customer, which the brief
 *  forbids outright. So these carry no names, no quotes, no logos and no
 *  figures — "[example]" stands where a number would go, visibly.
 *
 *  What is genuinely useful survives that: which features a business of
 *  this shape switches on, and in what order, as it grows through the
 *  four stages. That answers "would this work for me?" without inventing
 *  anybody.
 * ==================================================================== */

export function generateStaticParams() {
  return STORIES.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const story = storyBySlug(slug);
  if (!story) return {};
  return {
    title: `How ${story.kind} could run on ${SITE.name}`,
    description: `${story.headline} An example, not a customer: ${SITE.name} is not open to other businesses yet.`,
  };
}

export default async function StoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const story = storyBySlug(slug);
  if (!story) notFound();

  const onlySlugs = new Set(onlyOnHeyday().map((f) => f.slug));
  const used = Array.from(
    new Set(story.stages.flatMap((s) => s.features))
  );

  const blocks: StickyBlock[] = story.stages.map((st, i) => ({
    id: `stage-${i}`,
    label: st.stage,
    title: st.title,
    colour: GROUPS[i * 2]?.ground ?? SKY,
    body: (
      <>
        <p className="m-0">{st.line}</p>
        <div className="mt-3 flex flex-col gap-1.5">
          {st.features.map((fs) => {
            const f = featureBySlug(fs);
            return (
              <Link
                key={fs}
                href={featureHref(fs)}
                className="flex items-center gap-2 font-display text-[14.5px] font-semibold"
              >
                <Icon name={f?.icon ?? "hd-mark"} size={24} />
                {f?.name ?? fs}
              </Link>
            );
          })}
        </div>
      </>
    ),
    picture: (
      <Screen title={st.screen.title}>
        {st.screen.rows.map((r) => (
          <ScreenRow key={r.label} meta={r.value} hot={r.hot}>
            {r.label}
          </ScreenRow>
        ))}
        <ScreenAction>{st.screen.action}</ScreenAction>
      </Screen>
    ),
  }));

  return (
    <>
      <PageHero
        crumbs={
          <Breadcrumbs
            items={[
              { label: "Stories", href: "/stories" },
              { label: story.kind },
            ]}
          />
        }
        label={story.kind}
        h1={story.headline}
        highlight={story.highlight}
        chips={
          <Sticker
            className="px-3 py-1.5 font-mono text-xs font-bold"
            tilt={-6}
            style={{
              backgroundColor: CREAM,
              boxShadow: "6px 6px 0 0 rgba(10,10,10,0.08)",
            }}
          >
            EXAMPLE
          </Sticker>
        }
        sub={
          <>
            <span className="mb-3 block">
              {story.kind.replace(/^an? /, "A ")} sells{" "}
              {story.sells.service} and {story.sells.experience}.
            </span>
            <span className="flex flex-wrap gap-2 font-mono text-[13px] text-ink/55">
              <span className="rounded-full border border-ink px-3 py-1">
                The service: {story.sells.service}
              </span>
              <span className="rounded-full border border-ink px-3 py-1">
                The experience: {story.sells.experience}
              </span>
            </span>
          </>
        }
        actions={
          <Button href={CTA.comingSoon.href} variant="primary" arrow>
            {CTA.comingSoon.label}
          </Button>
        }
        aside={
          <HoldingImage art={story.art} ratio="4:3" tint={SKY} radius={40} />
        }
      />

      {/* What hurt most. One sentence, big, because it is the sentence a
          reader of this shape of business recognises themselves in. */}
      <Sheet colour={PAPER}>
        <Wrap>
          <SectionReveal>
            <SheetLabel>what hurt most</SheetLabel>
            <p
              className="m-0 max-w-[24ch] font-display font-bold leading-[1.08] tracking-[-0.03em]"
              style={{ fontSize: "clamp(28px, 3.6vw, 48px)" }}
            >
              <Marked text={story.hurt} phrase={story.hurtHighlight} />
            </p>
          </SectionReveal>
        </Wrap>
      </Sheet>

      {/* The four stages. */}
      <Sheet colour={CREAM}>
        <Wrap>
          <SectionReveal>
            <SheetLabel>growth stages</SheetLabel>
            <h2 className="hd-h2">
              Four stages, <span className="hd-hl">one system.</span>
            </h2>
          </SectionReveal>
          <div className="mt-14">
            <StickyScroll blocks={blocks} />
          </div>
        </Wrap>
      </Sheet>

      {/* The features behind the story. */}
      <Sheet colour={PAPER}>
        <Wrap>
          <SectionReveal>
            <SheetLabel>what they use</SheetLabel>
            <h2 className="hd-h2">
              The features <span className="hd-hl">behind the story.</span>
            </h2>
          </SectionReveal>
          <RevealGroup className="mt-8 grid gap-[22px] sm:grid-cols-2 lg:grid-cols-3">
            {used.map((fs) => {
              const f = featureBySlug(fs);
              if (!f) return null;
              return (
                <Card
                  key={fs}
                  className="flex h-full flex-col gap-2 p-6"
                  style={{ backgroundColor: PAPER }}
                >
                  <Icon name={f.icon} size={40} ground={PAPER} />
                  {onlySlugs.has(fs) ? (
                    <span className="font-mono text-[11px] font-semibold tracking-[0.04em] text-ink/55">
                      ONLY ON HEYDAY
                    </span>
                  ) : null}
                  <b className="font-display text-[19px] font-bold">{f.name}</b>
                  <p className="m-0 text-[15px] text-ink/60">{f.pain}</p>
                  <div className="mt-auto flex items-center justify-between gap-2 pt-3">
                    <StatusChip />
                    <Link
                      href={featureHref(fs)}
                      className="font-display text-sm font-semibold underline underline-offset-[3px]"
                    >
                      See it →
                    </Link>
                  </div>
                </Card>
              );
            })}
          </RevealGroup>
        </Wrap>
      </Sheet>

      <CTABlock
        heading={`Ready for your Heyday?`}
        line="This is an example of how a business like this could run. Join early access and help shape the real thing."
        note={
          <>
            No part of this story is a customer. {SITE.name} is not open to
            other businesses yet, so there are no names, quotes or figures
            here — the numbers in the pictures are example data.
          </>
        }
      />
    </>
  );
}

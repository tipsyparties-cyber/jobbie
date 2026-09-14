import type { Metadata } from "next";
import Link from "next/link";
import { PageHero, CTABlock } from "@/components/heyday/page-shell";
import { Sheet, Wrap, SheetLabel } from "@/components/heyday/sheet";
import { SectionReveal, RevealGroup } from "@/components/heyday/motion";
import { HoldingImage } from "@/components/heyday/holding-image";
import { Card } from "@/components/ui/surfaces";
import { Button } from "@/components/ui/button";
import { STORIES } from "@/lib/stories";
import { KINDS } from "@/lib/who-its-for";
import { CTA, SITE } from "@/lib/site";
import { PAPER, SKY } from "@/lib/palette";

/* ==================================================================== *
 *  /stories — the index for template T7.
 *
 *  Jobber's equivalent page is a wall of named customers with numbers.
 *  Ours says, at the top and in plain words, that these are examples and
 *  why. Putting that first rather than in small print under each card is
 *  the difference between an honest page and a page with a disclaimer.
 * ==================================================================== */

export const metadata: Metadata = {
  title: `Example stories: how businesses like yours could run on ${SITE.name} | ${SITE.name}`,
  description:
    "Seven shapes of business, from a mobile bartender to a staffing agency, and the features each would switch on as it grows. Examples, not customers.",
};

export default function StoriesPage() {
  return (
    <>
      <PageHero
        label="stories"
        h1="How businesses like yours could run on Heyday."
        highlight="could run on Heyday"
        sub={
          <>
            Seven shapes of business, and the features each one switches on
            as it grows. Every one is an <b>example, not a customer</b>:{" "}
            {SITE.name} is not open to other businesses yet, so there is
            nobody real to quote. No names, no invented numbers, no logos.
          </>
        }
        actions={
          <>
            <Button href={CTA.primary.href} variant="primary" arrow>
              {CTA.primary.label}
            </Button>
            <Button href="/who-its-for" variant="ghost">
              See who it&rsquo;s for →
            </Button>
          </>
        }
      />

      <Sheet colour={PAPER}>
        <Wrap>
          <SectionReveal>
            <SheetLabel>seven examples</SheetLabel>
            <h2 className="hd-h2">
              Pick the one <span className="hd-hl">closest to yours.</span>
            </h2>
          </SectionReveal>

          <RevealGroup className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {STORIES.map((s) => {
              const kind = KINDS.find((k) => k.slug === s.kindSlug);
              return (
                <Card
                  key={s.slug}
                  className="flex h-full flex-col overflow-hidden"
                  style={{ backgroundColor: PAPER }}
                >
                  <HoldingImage
                    art={s.art}
                    ratio="4:3"
                    tint={SKY}
                    radius={0}
                    className="!border-0 !border-b-2"
                  />
                  <div className="flex flex-1 flex-col px-5 pb-5 pt-4">
                    <span className="font-mono text-[11px] font-semibold tracking-[0.04em] text-ink/55">
                      EXAMPLE · {kind?.name ?? "Heyday"}
                    </span>
                    <b className="mt-1 block font-display text-lg font-bold capitalize leading-[1.25]">
                      {s.kind}
                    </b>
                    <p className="mt-1.5 text-[15px] text-ink/60">
                      {s.headline}
                    </p>
                    <Link
                      href={`/stories/${s.slug}`}
                      className="mt-auto pt-4 font-display text-sm font-semibold underline underline-offset-[3px]"
                    >
                      Read the story →
                    </Link>
                  </div>
                </Card>
              );
            })}
          </RevealGroup>
        </Wrap>
      </Sheet>

      <CTABlock line="Join early access, or book a demo and we’ll show you round." />
    </>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import { PageHero, CTABlock, Marked } from "@/components/heyday/page-shell";
import { Sheet, Wrap, SheetLabel } from "@/components/heyday/sheet";
import { SectionReveal, RevealGroup } from "@/components/heyday/motion";
import { StickyScroll, type StickyBlock } from "@/components/heyday/sticky-scroll";
import { SectionMark } from "@/components/heyday/heyday-mark";
import { Card, Sticker } from "@/components/ui/surfaces";
import { Button } from "@/components/ui/button";
import { Screen, ScreenRow, ScreenAction } from "@/components/heyday/screen";
import { STEPS, VARIATIONS } from "@/lib/flow";
import { GROUPS, groupById } from "@/lib/groups";
import { statByRow } from "@/lib/stats-bank";
import { CTA } from "@/lib/site";
import { PAPER, CREAM, SKY, LAVENDER } from "@/lib/palette";

/* ==================================================================== *
 *  /how-it-works — template T5, spec part 2, and the working page at
 *  reference/site/how-it-works.html.
 *
 *  Jobber organises its site around four pillars and explains them
 *  separately. Heyday's claim is that the twelve steps are ONE thing, so
 *  this page has to read as one continuous movement rather than twelve
 *  entries — which is what the sticky scroll does: the copy moves, the
 *  picture stays put and changes under it, and nothing ever looks like a
 *  new page starting.
 *
 *  Each step is told from three sides, and the middle column is the one
 *  that does the work. "YOU: are mid-job, and some calls get missed" is
 *  not a feature claim; it is the reader's Tuesday, and it is what makes
 *  the third column land.
 * ==================================================================== */

export const metadata: Metadata = {
  title: "How Heyday works: one workflow from enquiry to rebooking | Heyday",
  description:
    "Twelve steps, in the order they really happen: what your customer does, what you do, and what Heyday does for you. From the first hello to the next booking.",
};

export default function HowItWorksPage() {
  const blocks: StickyBlock[] = STEPS.map((s) => {
    const group = groupById(s.group)!;
    return {
      id: `step-${s.n}`,
      label: `step ${s.n} · ${group.name.toLowerCase()}`,
      title: s.title,
      colour: group.ground,
      body: (
        <div className="mt-1.5 grid gap-3.5 sm:grid-cols-3">
          {[
            ["YOUR CUSTOMER", s.customer],
            ["YOU", s.you],
            ["HEYDAY", s.heyday],
          ].map(([head, text]) => (
            <div key={head} className="border-t-[1.5px] border-ink pt-2">
              <b className="mb-1 block font-mono text-[11.5px] font-medium tracking-[0.04em] text-ink">
                {head}
              </b>
              <span className="text-[14.5px] text-ink/65">{text}</span>
            </div>
          ))}
        </div>
      ),
      picture: (
        <Screen title={s.screen.title}>
          {s.screen.rows.map((r) => (
            <ScreenRow key={r.label} meta={r.value} hot={r.hot}>
              {r.label}
            </ScreenRow>
          ))}
          <ScreenAction>{s.screen.action}</ScreenAction>
        </Screen>
      ),
    };
  });

  const stat = statByRow(3)!;

  return (
    <>
      <PageHero
        label="how it works"
        h1="One workflow for your whole business, from the first hello to the next booking."
        highlight="from the first hello to the next booking"
        sub={
          <>
            Twelve steps, in the order they really happen. Here&rsquo;s what
            your customer does, what you do, and what Heyday does for you.
          </>
        }
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
      />

      {/* The twelve steps. */}
      <Sheet colour={PAPER}>
        <Wrap>
          <SectionReveal>
            <SheetLabel>the whole flow</SheetLabel>
            <h2 className="hd-h2">
              Twelve steps. <span className="hd-hl">One workflow.</span>
            </h2>
          </SectionReveal>
          <div className="mt-14">
            <StickyScroll blocks={blocks} />
          </div>
        </Wrap>
      </Sheet>

      {/* What runs underneath all twelve. */}
      <Sheet colour={SKY}>
        <Wrap>
          <SectionReveal>
            <SheetLabel>throughout</SheetLabel>
            <h2 className="hd-h2 max-w-[22ch]">
              <Marked
                text="From doing every step to overseeing the exceptions."
                phrase="overseeing the exceptions"
              />
            </h2>
            <p className="hd-sub">
              Tasks that chase themselves, a Command Centre that shows what
              needs you today, reports and profit per job, and AI that drafts
              or sends, only as much as you allow.
            </p>
            <Button href="/features/ai" variant="ghost">
              See the AI →
            </Button>
          </SectionReveal>
        </Wrap>
      </Sheet>

      {/* The variations. Four stickers, per the motion table. */}
      <Sheet colour={CREAM}>
        <Wrap>
          <SectionReveal>
            <SheetLabel>variations</SheetLabel>
            <h2 className="hd-h2 max-w-[22ch]">
              <Marked
                text="The same flow, bent to fit you."
                phrase="bent to fit you"
              />
            </h2>
          </SectionReveal>
          <RevealGroup className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {VARIATIONS.map((v) => (
              <Sticker
                key={v.title}
                className="block w-full p-[22px]"
                style={{ backgroundColor: "#fff" }}
              >
                <b className="block font-display text-[19px] font-bold leading-[1.25]">
                  {v.title}
                </b>
                <p className="mt-1.5 text-[15px] text-ink/60">{v.line}</p>
              </Sticker>
            ))}
          </RevealGroup>
        </Wrap>
      </Sheet>

      {/* The six groups. */}
      <Sheet colour={PAPER}>
        <Wrap>
          <SectionReveal>
            <SheetLabel>the six groups</SheetLabel>
            <h2 className="hd-h2">
              Six groups. <span className="hd-hl">One workflow.</span>
            </h2>
          </SectionReveal>
          <RevealGroup className="mt-10 grid gap-[22px] sm:grid-cols-2 lg:grid-cols-3">
            {GROUPS.map((g) => (
              <Card
                key={g.id}
                className="flex h-full flex-col gap-2 p-6"
                style={{ backgroundColor: PAPER }}
              >
                <SectionMark shape={g.shape} size={48} colour={g.sun} />
                <b className="font-display text-[22px] font-bold">{g.name}</b>
                <p className="m-0 text-ink/60">{g.promise}</p>
                <Link
                  href={`/how-it-works/${g.id}`}
                  className="mt-auto font-display text-sm font-semibold underline underline-offset-[3px]"
                >
                  See how →
                </Link>
              </Card>
            ))}
          </RevealGroup>
        </Wrap>
      </Sheet>

      {/* One statistic, and it prints its whole provenance. */}
      <Sheet colour={LAVENDER}>
        <Wrap>
          <SectionReveal>
            <SheetLabel>why it matters</SheetLabel>
            <div className="grid items-center gap-6 lg:grid-cols-[auto_minmax(0,1fr)]">
              <p
                className="m-0 font-display font-extrabold leading-none tracking-[-0.04em]"
                style={{ fontSize: "clamp(56px, 7vw, 96px)" }}
              >
                42 hours
              </p>
              <div>
                <p className="m-0 text-lg">{stat.claim}</p>
                <p className="mt-2 font-mono text-xs text-ink/55">
                  {stat.source}. {stat.covers}. {stat.kind}. Stats bank row{" "}
                  {stat.row}.
                </p>
              </div>
            </div>
          </SectionReveal>
        </Wrap>
      </Sheet>

      <CTABlock line="Join early access, or book a demo and we’ll walk you through your own workflow." />
    </>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import { PageHero, CTABlock } from "@/components/heyday/page-shell";
import { Sheet, Wrap, SheetLabel } from "@/components/heyday/sheet";
import { SectionReveal, RevealGroup } from "@/components/heyday/motion";
import { Card } from "@/components/ui/surfaces";
import { Button } from "@/components/ui/button";
import { RIVALS, CHECKED } from "@/lib/compare";
import { CTA, SITE } from "@/lib/site";
import { PAPER } from "@/lib/palette";

/* ==================================================================== *
 *  /compare — the hub for template T9.
 *
 *  Jobber's comparison hub is a sales asset. Ours has to be something
 *  else, because Heyday cannot win a feature count against a product
 *  that ships: every rival here is available today and Heyday is not.
 *
 *  So the hub leads with the date each page was checked, and every card
 *  says when to choose the OTHER tool first. That is not modesty — a
 *  comparison page that cannot name a single reason to pick the rival is
 *  one nobody believes, and disbelieving the comparison means
 *  disbelieving the rest of the site.
 * ==================================================================== */

export const metadata: Metadata = {
  title: `${SITE.name} vs HoneyBook, Jobber and the rest`,
  description:
    "Honest comparisons with the date we checked them, including where the other tool is better. Heyday is coming soon; they’re here today.",
};

export default function ComparePage() {
  return (
    <>
      <PageHero
        label="compare"
        h1="Heyday vs the tools you’re weighing up."
        highlight="the tools you’re weighing up"
        sub={
          <>
            Honest comparisons with the date we checked them, including
            where the other tool is better. {SITE.name} is coming soon;
            they&rsquo;re here today.
          </>
        }
        actions={
          <Button href={CTA.primary.href} variant="primary" arrow>
            {CTA.primary.label}
          </Button>
        }
      />

      <Sheet colour={PAPER}>
        <Wrap>
          <SectionReveal>
            <SheetLabel>five comparisons</SheetLabel>
          </SectionReveal>

          <RevealGroup className="grid gap-6 lg:grid-cols-2">
            {RIVALS.map((r) => (
              <Card
                key={r.slug}
                className="flex h-full flex-col gap-3 p-6"
                style={{ backgroundColor: PAPER }}
              >
                <h2 className="m-0 font-display text-[22px] font-bold">
                  {SITE.name} vs {r.name}
                </h2>
                {/* Their case first, then ours. In that order, on purpose. */}
                <p className="m-0 text-ink/70">{r.chooseThem}</p>
                <p className="m-0 text-ink/70">{r.chooseUs}</p>
                <div className="mt-auto flex flex-wrap items-center justify-between gap-3 pt-3">
                  <span className="font-mono text-xs text-ink/55">
                    Checked {CHECKED}
                  </span>
                  <Link
                    href={`/compare/${r.slug}`}
                    className="font-display text-sm font-semibold underline underline-offset-[3px]"
                  >
                    See the comparison →
                  </Link>
                </div>
              </Card>
            ))}
          </RevealGroup>

          {/* How these pages are written, said once, here. */}
          <p className="mt-10 max-w-[70ch] font-mono text-xs leading-relaxed text-ink/55">
            We check every rival&rsquo;s own pages on the date shown and link
            to them. Where they&rsquo;re better, we say so.
            {" "}{SITE.name}&rsquo;s features are coming soon, and we mark
            them that way. Anything we haven&rsquo;t verified says
            &ldquo;check on the day&rdquo; rather than being guessed at.
            Spotted something out of date? Tell us and we&rsquo;ll fix it.
          </p>
        </Wrap>
      </Sheet>

      <CTABlock line="Join early access and help shape it." />
    </>
  );
}

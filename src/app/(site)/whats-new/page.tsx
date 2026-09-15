import type { Metadata } from "next";
import { PageHero, CTABlock } from "@/components/heyday/page-shell";
import { Sheet, Wrap, SheetLabel } from "@/components/heyday/sheet";
import { SectionReveal } from "@/components/heyday/motion";
import { HeydayLogo } from "@/components/heyday/heyday-logo";
import { Button } from "@/components/ui/button";
import { UPDATES } from "@/lib/articles";
import { CTA, SITE } from "@/lib/site";
import { PAPER, BLUE } from "@/lib/palette";

/* ==================================================================== *
 *  /whats-new — template T15 as a list, after Jobber's Product Updates.
 *
 *  IT IS EMPTY, AND THAT IS THE POINT.
 *
 *  A product-updates page with entries on it is a claim that a product
 *  exists and has been improved. Neither is true yet, so the page says
 *  what it is waiting for instead — which is also exactly the empty state
 *  the spec describes in A8: the small sun, one line saying what will
 *  appear here and when, and a link to somewhere useful.
 * ==================================================================== */

export const metadata: Metadata = {
  title: `What's new in ${SITE.name}`,
  description:
    "Product updates for Heyday. The first ones arrive with early access.",
};

export default function WhatsNewPage() {
  return (
    <>
      <PageHero
        label="what's new"
        h1="What's new in Heyday."
        highlight="new"
        sub="Every change worth knowing about, as it ships."
      />

      <Sheet colour={PAPER}>
        <Wrap>
          {UPDATES.length === 0 ? (
            <SectionReveal>
              <div className="mx-auto max-w-[52ch] py-10 text-center">
                <div className="mb-6 flex justify-center">
                  <HeydayLogo size={72} colour={BLUE} motion="assemble" />
                </div>
                <h2 className="hd-h2">Nothing yet.</h2>
                <p className="hd-sub mx-auto">
                  {SITE.name} isn&rsquo;t open to other businesses yet, so
                  there is nothing to report. The first updates arrive with
                  early access, and there is nothing invented here to fill
                  the gap in the meantime.
                </p>
                <div className="flex flex-wrap justify-center gap-3">
                  <Button href={CTA.comingSoon.href} variant="primary" arrow>
                    {CTA.comingSoon.label}
                  </Button>
                  <Button href="/features" variant="ghost">
                    See what&rsquo;s being built →
                  </Button>
                </div>
              </div>
            </SectionReveal>
          ) : (
            <>
              <SectionReveal>
                <SheetLabel>updates</SheetLabel>
              </SectionReveal>
              <ol className="m-0 list-none p-0">
                {UPDATES.map((u) => (
                  <li key={u.date} className="border-t border-ink/15 py-6">
                    <p className="m-0 font-mono text-xs text-ink/55">{u.date}</p>
                    <h2 className="mt-1 font-display text-[22px] font-bold">
                      {u.title}
                    </h2>
                    <p className="mt-1.5 text-ink/65">{u.body}</p>
                  </li>
                ))}
              </ol>
            </>
          )}
        </Wrap>
      </Sheet>

      <CTABlock />
    </>
  );
}

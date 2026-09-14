import type { Metadata } from "next";
import { PageHero } from "@/components/heyday/page-shell";
import { Sheet, Wrap, SheetLabel } from "@/components/heyday/sheet";
import { SectionReveal } from "@/components/heyday/motion";
import { Panel, Card } from "@/components/ui/surfaces";
import { Button } from "@/components/ui/button";
import { SITE, TBC, CTA } from "@/lib/site";
import { PAPER, CREAM } from "@/lib/palette";

/* ==================================================================== *
 *  /demo — template T16, after Jobber's demo page.
 *
 *  The calendar is a placeholder, and it looks like one. An embedded
 *  booking widget is the obvious thing to reach for, but there is nobody
 *  to book a slot with yet and a working calendar would take real
 *  appointments nobody would turn up to.
 * ==================================================================== */

export const metadata: Metadata = {
  title: `Book a ${SITE.name} demo`,
  description:
    "See Heyday walked through your own workflow, not a canned one.",
};

export default function DemoPage() {
  return (
    <>
      <PageHero
        label="book a demo"
        h1="See it run your workflow, not ours."
        highlight="your workflow"
        sub={
          <>
            Tell us what you sell and we&rsquo;ll walk through how a booking
            would actually run — your prices, your team, your aftercare.
          </>
        }
      />

      <Sheet colour={PAPER}>
        <Wrap>
          <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.8fr)]">
            <SectionReveal>
              <SheetLabel>pick a time</SheetLabel>
              {/* A visible placeholder rather than a working calendar.
                  There is nobody to book with yet, and a real widget would
                  take appointments nobody would turn up to. */}
              <Panel className="!px-7 !py-10">
                <p className="m-0 font-mono text-sm text-ink/55">
                  [Calendar to be embedded]
                </p>
                <p className="mt-3 text-ink/70">
                  The booking calendar goes here once demos are running.
                  Until then, join early access and we&rsquo;ll come to you
                  when there is something to show.
                </p>
                <div className="mt-6">
                  <Button href={CTA.comingSoon.href} variant="primary" arrow>
                    {CTA.comingSoon.label}
                  </Button>
                </div>
              </Panel>
            </SectionReveal>

            <SectionReveal delay={0.15}>
              <Card className="p-6" style={{ backgroundColor: CREAM }}>
                <h2 className="m-0 font-display text-[22px] font-bold">
                  What a demo covers
                </h2>
                <ul className="m-0 mt-3 list-disc pl-[18px] text-ink/65">
                  <li className="my-2">
                    How a quote for your kind of job would be priced
                  </li>
                  <li className="my-2">
                    What happens between the booking and the day
                  </li>
                  <li className="my-2">
                    How your team get offered the work, and how they get paid
                  </li>
                  <li className="my-2">
                    Which parts you would want on autopilot, and which you
                    would not
                  </li>
                </ul>
                <p className="mt-4 font-mono text-xs text-ink/55">
                  {TBC.supportHours}
                </p>
              </Card>
            </SectionReveal>
          </div>
        </Wrap>
      </Sheet>
    </>
  );
}

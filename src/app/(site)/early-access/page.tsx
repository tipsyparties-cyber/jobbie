import type { Metadata } from "next";
import { PageHero } from "@/components/heyday/page-shell";
import { Sheet, Wrap, SheetLabel } from "@/components/heyday/sheet";
import { SectionReveal } from "@/components/heyday/motion";
import { Card } from "@/components/ui/surfaces";
import { EarlyAccessForm } from "@/components/heyday/early-access-form";
import { SITE, TBC } from "@/lib/site";
import { PAPER } from "@/lib/palette";

/* ==================================================================== *
 *  /early-access — spec T16.
 *
 *  What "Start free trial" opens, everywhere on the site, because there
 *  is no trial to start. The honesty lives on this page rather than in a
 *  weaker button, which is the brief's decision and the right one: a
 *  button that says "join the waitlist" gets fewer clicks from people who
 *  would have been glad to join.
 * ==================================================================== */

export const metadata: Metadata = {
  title: `Join ${SITE.name} early access | ${SITE.name}`,
  description:
    "Heyday is opening to businesses a few at a time. Join early access and we’ll let you know when it’s your turn.",
};

export default function EarlyAccessPage() {
  return (
    <>
      <PageHero
        label="early access"
        h1="Be one of the first in."
        highlight="the first in"
        sub={`${SITE.name} is opening to businesses a few at a time.`}
      />

      <Sheet colour={PAPER}>
        <Wrap>
          <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.8fr)]">
            <SectionReveal>
              <SheetLabel>join</SheetLabel>
              <EarlyAccessForm />
            </SectionReveal>

            <SectionReveal delay={0.15}>
              <Card className="p-6" style={{ backgroundColor: PAPER }}>
                <h2 className="m-0 font-display text-[22px] font-bold">
                  What you&rsquo;ll get
                </h2>
                <ul className="m-0 mt-3 list-disc pl-[18px] text-ink/65">
                  <li className="my-2">An invite when it opens</li>
                  <li className="my-2">Help setting up {TBC.confirm}</li>
                  <li className="my-2">
                    A say in what gets built, while it still changes easily
                  </li>
                </ul>
                <p className="mt-4 font-mono text-xs leading-relaxed text-ink/55">
                  Every feature on this site says &ldquo;Coming soon&rdquo;
                  because none of it is open to other businesses yet. Pricing
                  is {TBC.price}, and the trial is {TBC.trial}.
                </p>
              </Card>
            </SectionReveal>
          </div>
        </Wrap>
      </Sheet>
    </>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/heyday/page-shell";
import { Sheet, Wrap } from "@/components/heyday/sheet";
import { SectionReveal } from "@/components/heyday/motion";
import { Card } from "@/components/ui/surfaces";
import { Button } from "@/components/ui/button";
import { SITE, TBC, CTA } from "@/lib/site";
import { PAPER } from "@/lib/palette";

/* ==================================================================== *
 *  /contact — template T16.
 *
 *  There is no contact form here, on purpose. A form that stores and
 *  sends nothing — which is all any form on this site may do until the
 *  privacy notice is agreed — is worse than no form: someone types a
 *  real question into it and never hears back.
 *
 *  So the page says what it can honestly offer instead, and points at the
 *  one place a message genuinely goes somewhere: early access.
 * ==================================================================== */

export const metadata: Metadata = {
  title: `Contact ${SITE.name}`,
  description:
    "How to get in touch with Heyday while it is being built.",
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        label="contact"
        h1="Get in touch."
        highlight="touch"
        sub={
          <>
            {SITE.name} is being built by a small team, and the people
            building it are the people who answer.
          </>
        }
      />

      <Sheet colour={PAPER}>
        <Wrap>
          <div className="grid gap-[22px] lg:grid-cols-3">
            <SectionReveal>
              <Card className="h-full p-6" style={{ backgroundColor: PAPER }}>
                <b className="block font-display text-[19px] font-bold">
                  Want to use it
                </b>
                <p className="mt-2 text-[15.5px] text-ink/60">
                  Join early access and tell us what you sell. That is the
                  one place a message actually reaches us today.
                </p>
                <div className="mt-4">
                  <Button href={CTA.comingSoon.href} variant="primary" arrow>
                    {CTA.comingSoon.label}
                  </Button>
                </div>
              </Card>
            </SectionReveal>

            <SectionReveal delay={0.15}>
              <Card className="h-full p-6" style={{ backgroundColor: PAPER }}>
                <b className="block font-display text-[19px] font-bold">
                  Want to see it
                </b>
                <p className="mt-2 text-[15.5px] text-ink/60">
                  Book a demo and we&rsquo;ll walk you through your own
                  workflow rather than a canned one.
                </p>
                <div className="mt-4">
                  <Button href="/demo" variant="ghost">
                    {CTA.secondary.label}
                  </Button>
                </div>
              </Card>
            </SectionReveal>

            <SectionReveal delay={0.3}>
              <Card className="h-full p-6" style={{ backgroundColor: PAPER }}>
                <b className="block font-display text-[19px] font-bold">
                  Something else
                </b>
                <p className="mt-2 text-[15.5px] text-ink/60">
                  Press, partnerships, or something on this site that
                  isn&rsquo;t right.
                </p>
                <p className="mt-3 font-mono text-sm text-ink/70">
                  {TBC.generic} — the contact address is being set up.
                </p>
              </Card>
            </SectionReveal>
          </div>

          {/* Why there is no form. Said plainly rather than left as an
              absence somebody has to interpret. */}
          <p className="mt-12 max-w-[70ch] font-mono text-xs leading-relaxed text-ink/55">
            There is no contact form on this page yet. Until the privacy
            notice and consent wording are agreed, no form on this site may
            store or send anything — and a form that silently drops what you
            typed is worse than no form at all. The{" "}
            <Link href="/early-access" className="underline underline-offset-2">
              early access page
            </Link>{" "}
            is where that changes first.
          </p>
        </Wrap>
      </Sheet>
    </>
  );
}

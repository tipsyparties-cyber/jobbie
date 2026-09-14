import type { Metadata } from "next";
import Link from "next/link";
import { PageHero, CTABlock } from "@/components/heyday/page-shell";
import { Sheet, Wrap, SheetLabel } from "@/components/heyday/sheet";
import { SectionReveal, RevealGroup } from "@/components/heyday/motion";
import { Card, StatusChip } from "@/components/ui/surfaces";
import { Button } from "@/components/ui/button";
import {
  INTEGRATIONS,
  CATEGORIES,
  CATEGORY_LABELS,
} from "@/lib/integrations";
import { CTA, SITE } from "@/lib/site";
import { PAPER, CREAM } from "@/lib/palette";

/* ==================================================================== *
 *  /integrations — template T10, spec part 2.
 *
 *  Grouped by category, and every single one says "Coming soon", because
 *  none of them is connected. A page of integration cards with no status
 *  on them would read as a list of things that work.
 *
 *  No logos. The brief forbids using another company's mark until Jem
 *  confirms it is allowed, and for several of these the permission is
 *  exactly what is still to be agreed — so the page uses names and says
 *  why, rather than leaving tiles that look like images failed to load.
 * ==================================================================== */

export const metadata: Metadata = {
  title: `${SITE.name} integrations: payments, accounts, calendars, ads and marketplaces | ${SITE.name}`,
  description:
    "Heyday connects to the tools you already use: Stripe, QuickBooks, Xero, Google Calendar, Google and Microsoft Ads, WhatsApp, and the marketplaces you already sell on.",
};

export default function IntegrationsPage() {
  return (
    <>
      <PageHero
        label="integrations"
        h1="Stop typing the same thing into three apps."
        highlight="three apps"
        sub={
          <>
            {SITE.name} connects to the tools you already use. Everything
            here is on the way, and marked that way. We use their names,
            not their logos, until we have permission.
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

      <Sheet colour={PAPER}>
        <Wrap>
          {CATEGORIES.map((cat) => {
            const items = INTEGRATIONS.filter((i) => i.category === cat);
            if (!items.length) return null;
            return (
              <div key={cat} id={cat} className="mb-14 scroll-mt-28 last:mb-0">
                <SectionReveal>
                  <SheetLabel>{CATEGORY_LABELS[cat].toLowerCase()}</SheetLabel>
                  <h2 className="hd-h2 !text-[30px]">
                    {CATEGORY_LABELS[cat]}
                  </h2>
                </SectionReveal>
                <RevealGroup className="grid gap-[22px] sm:grid-cols-2 lg:grid-cols-3">
                  {items.map((i) => (
                    <Card
                      key={i.slug}
                      className="flex h-full flex-col gap-2 p-6"
                      style={{ backgroundColor: PAPER }}
                    >
                      {/* The name set as the mark would be, since the mark
                          cannot be used yet. */}
                      <span
                        aria-hidden
                        className="mb-1 grid h-12 w-12 place-items-center rounded-xl border border-ink font-display text-lg font-bold"
                        style={{ backgroundColor: CREAM }}
                      >
                        {i.name.slice(0, 1)}
                      </span>
                      <b className="font-display text-[19px] font-bold">
                        {i.name}
                      </b>
                      <p className="m-0 text-[15px] text-ink/60">{i.line}</p>
                      <div className="mt-auto flex items-center justify-between gap-2 pt-3">
                        <StatusChip />
                        <Link
                          href={`/integrations/${i.slug}`}
                          className="font-display text-sm font-semibold underline underline-offset-[3px]"
                        >
                          See it →
                        </Link>
                      </div>
                    </Card>
                  ))}
                </RevealGroup>
              </div>
            );
          })}

          <p className="mt-12 max-w-[70ch] font-mono text-xs leading-relaxed text-ink/55">
            Nothing here is connected yet. Marketplace connections depend on
            each platform&rsquo;s own rules about what may be connected and
            how, so those are the ones most likely to change. Need something
            that isn&rsquo;t on this list?{" "}
            <Link href="/contact" className="underline underline-offset-2">
              Tell us
            </Link>
            .
          </p>
        </Wrap>
      </Sheet>

      <CTABlock />
    </>
  );
}

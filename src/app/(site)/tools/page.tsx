import type { Metadata } from "next";
import Link from "next/link";
import { PageHero, CTABlock } from "@/components/heyday/page-shell";
import { Sheet, Wrap, SheetLabel } from "@/components/heyday/sheet";
import { SectionReveal, RevealGroup } from "@/components/heyday/motion";
import { Card } from "@/components/ui/surfaces";
import { TOOLS } from "@/lib/tools";
import { SITE } from "@/lib/site";
import { PAPER } from "@/lib/palette";

/* ==================================================================== *
 *  /tools — the index for templates T13 and T14.
 *
 *  Three tools, all free, none behind an email wall. That last part is
 *  the whole reason to build them: a calculator that asks for an address
 *  before it shows you a number is an ad with arithmetic in it, and
 *  people can tell.
 * ==================================================================== */

export const metadata: Metadata = {
  title: `Free tools for event, class and service businesses`,
  description:
    "A pricing calculator, a quote template and a 16-question leak check. Free, no email needed, and nothing you type is saved or sent.",
};

export default function ToolsPage() {
  return (
    <>
      <PageHero
        label="free tools"
        h1="Work it out in two minutes."
        highlight="two minutes"
        sub={
          <>
            Three free tools for businesses that sell their time. No email
            needed, and nothing you type is saved or sent.
          </>
        }
      />

      <Sheet colour={PAPER}>
        <Wrap>
          <SectionReveal>
            <SheetLabel>three tools</SheetLabel>
          </SectionReveal>
          <RevealGroup className="grid gap-[22px] lg:grid-cols-3">
            {TOOLS.map((t) => (
              <Card
                key={t.slug}
                className="flex h-full flex-col gap-2.5 p-6"
                style={{ backgroundColor: PAPER }}
              >
                <b className="font-display text-[19px] font-bold leading-tight">
                  {t.name}
                </b>
                <p className="m-0 text-[15.5px] text-ink/60">{t.line}</p>
                <Link
                  href={`/tools/${t.slug}`}
                  className="mt-auto pt-3 font-display text-sm font-semibold underline underline-offset-[3px]"
                >
                  {t.verb} →
                </Link>
              </Card>
            ))}
          </RevealGroup>
        </Wrap>
      </Sheet>

      <CTABlock />
    </>
  );
}

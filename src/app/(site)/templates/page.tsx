import type { Metadata } from "next";
import { PageHero, CTABlock, Marked } from "@/components/heyday/page-shell";
import { Sheet, Wrap, SheetLabel } from "@/components/heyday/sheet";
import { SectionReveal } from "@/components/heyday/motion";
import { Card, StatusChip } from "@/components/ui/surfaces";
import { Button } from "@/components/ui/button";
import { TEMPLATES } from "@/lib/tools";
import { PAPER, CREAM } from "@/lib/palette";

/* ==================================================================== *
 *  /templates — template T13, HoneyBook's template gallery.
 *
 *  Each one lists what is IN it before anything is opened. HoneyBook's
 *  gallery shows thumbnails, which look good and tell you nothing; what
 *  someone actually needs to know is whether the thing covers the four
 *  lines that stop the arguments.
 *
 *  The quote template is live now, because it is a working tool. The
 *  other two are coming soon and say so.
 * ==================================================================== */

export const metadata: Metadata = {
  title: `Free quote, follow-up and invoice templates`,
  description:
    "A quote template, four follow-up messages and an invoice template, for businesses that sell their time. Free, and no email needed.",
};

export default function TemplatesPage() {
  return (
    <>
      <PageHero
        label="templates"
        h1="Start from something that works."
        highlight="something that works"
        sub="Three templates for the messages that decide whether you get paid. Free, and no email needed."
      />

      <Sheet colour={PAPER}>
        <Wrap>
          <SectionReveal>
            <SheetLabel>three templates</SheetLabel>
          </SectionReveal>

          <div className="grid gap-6 lg:grid-cols-3">
            {TEMPLATES.map((t) => {
              const live = t.slug === "quote";
              return (
                <Card
                  key={t.slug}
                  id={t.slug}
                  className="flex h-full scroll-mt-28 flex-col gap-3 p-6"
                  style={{ backgroundColor: PAPER }}
                >
                  <b className="font-display text-[19px] font-bold leading-tight">
                    {t.name}
                  </b>
                  <p className="m-0 text-[15.5px] text-ink/60">{t.line}</p>

                  {/* What's in it, before anything is opened. */}
                  <ul className="m-0 list-disc pl-[18px] text-[14.5px] text-ink/60">
                    {t.contains.map((c) => (
                      <li key={c} className="my-1">
                        {c}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-auto pt-3">
                    {live ? (
                      <Button href="/tools/quote-template" variant="ghost">
                        Make a quote →
                      </Button>
                    ) : (
                      <StatusChip />
                    )}
                  </div>
                </Card>
              );
            })}
          </div>
        </Wrap>
      </Sheet>

      <Sheet colour={CREAM}>
        <Wrap>
          <SectionReveal>
            <h2 className="hd-h2 max-w-[24ch]">
              <Marked
                text="Or let Heyday send them for you."
                phrase="send them for you"
              />
            </h2>
            <p className="hd-sub">
              The same templates, filled in from the booking and sent at the
              right moment, with the chasing stopping the second somebody
              replies.
            </p>
            <div className="mb-6">
              <StatusChip />
            </div>
            <Button href="/features/follow-ups" variant="ghost">
              See follow-ups and automations →
            </Button>
          </SectionReveal>
        </Wrap>
      </Sheet>

      <CTABlock />
    </>
  );
}

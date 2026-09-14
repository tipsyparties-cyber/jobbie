import type { Metadata } from "next";
import Link from "next/link";
import { PageHero, CTABlock, Marked } from "@/components/heyday/page-shell";
import { Sheet, Wrap, SheetLabel } from "@/components/heyday/sheet";
import { SectionReveal, RevealGroup } from "@/components/heyday/motion";
import { HoldingImage } from "@/components/heyday/holding-image";
import { Card, StatusChip } from "@/components/ui/surfaces";
import { Button } from "@/components/ui/button";
import { TOOLS, TEMPLATES } from "@/lib/tools";
import { GUIDES } from "@/lib/articles";
import { SITE, TBC } from "@/lib/site";
import { PAPER, CREAM, SKY, LAVENDER } from "@/lib/palette";

/* ==================================================================== *
 *  /resources — template T12, spec part 5.
 *
 *  The hub. Tools and templates first, because those are the things that
 *  are genuinely finished and free; guides and the blog after, because
 *  they are seeds and say so.
 * ==================================================================== */

export const metadata: Metadata = {
  title: `Free tools, templates and guides for event, class and service businesses | ${SITE.name}`,
  description:
    "Tools, templates and guides for businesses that sell their time. No email needed.",
};

export default function ResourcesPage() {
  return (
    <>
      <PageHero
        label="resources"
        h1="Free help for businesses that sell their time."
        highlight="that sell their time"
        sub="Tools, templates and guides for event, class and service businesses. No email needed."
        actions={
          <>
            {TOOLS.map((t) => (
              <Button key={t.slug} href={`/tools/${t.slug}`} variant="ghost">
                {t.name}
              </Button>
            ))}
          </>
        }
      />

      {/* Tools. */}
      <Sheet colour={PAPER}>
        <Wrap>
          <SectionReveal>
            <SheetLabel>free tools</SheetLabel>
            <h2 className="hd-h2">
              <Marked text="Work it out in two minutes." phrase="two minutes" />
            </h2>
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

      {/* Templates. */}
      <Sheet colour={CREAM}>
        <Wrap>
          <SectionReveal>
            <SheetLabel>templates</SheetLabel>
            <h2 className="hd-h2">
              <Marked
                text="Start from something that works."
                phrase="something that works"
              />
            </h2>
          </SectionReveal>
          <RevealGroup className="grid gap-[22px] lg:grid-cols-3">
            {TEMPLATES.map((t) => (
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
                  href={`/templates#${t.slug}`}
                  className="mt-auto pt-3 font-display text-sm font-semibold underline underline-offset-[3px]"
                >
                  Open →
                </Link>
              </Card>
            ))}
          </RevealGroup>
          <div className="mt-8">
            <Button href="/templates" variant="ghost">
              See all templates →
            </Button>
          </div>
        </Wrap>
      </Sheet>

      {/* Guides. Seeds, and they say so. */}
      <Sheet colour={SKY}>
        <Wrap>
          <SectionReveal>
            <SheetLabel>guides</SheetLabel>
            <h2 className="hd-h2 max-w-[26ch]">
              <Marked
                text="Guides from people who run an events business."
                phrase="who run an events business"
              />
            </h2>
          </SectionReveal>
          <RevealGroup className="grid gap-[22px] lg:grid-cols-3">
            {GUIDES.map((g) => (
              <Card
                key={g.slug}
                className="flex h-full flex-col overflow-hidden"
                style={{ backgroundColor: PAPER }}
              >
                <HoldingImage
                  art={g.art}
                  ratio="16:9"
                  tint={SKY}
                  radius={0}
                  className="!border-0 !border-b-2"
                />
                <div className="flex flex-1 flex-col gap-2 p-5">
                  <b className="font-display text-[19px] font-bold leading-tight">
                    {g.title}
                  </b>
                  <div className="mt-auto pt-3">
                    <StatusChip />
                  </div>
                </div>
              </Card>
            ))}
          </RevealGroup>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button href="/guides" variant="ghost">
              All guides →
            </Button>
            <Button href="/blog" variant="ghost">
              Read the blog →
            </Button>
          </div>
        </Wrap>
      </Sheet>

      {/* Help and What's new. */}
      <Sheet colour={LAVENDER}>
        <Wrap>
          <div className="grid gap-[22px] lg:grid-cols-2">
            <Card className="p-6" style={{ backgroundColor: PAPER }}>
              <h3 className="m-0 font-display text-[22px] font-bold">
                Need a person?
              </h3>
              <p className="mt-2 text-ink/65">
                Real people, at the hours you work. {TBC.supportHours}
              </p>
              <Link
                href="/help"
                className="mt-3 inline-block font-display text-sm font-semibold underline underline-offset-[3px]"
              >
                Get help →
              </Link>
            </Card>
            <Card className="p-6" style={{ backgroundColor: PAPER }}>
              <h3 className="m-0 font-display text-[22px] font-bold">
                What&rsquo;s new
              </h3>
              <p className="mt-2 text-ink/65">
                Product updates start when early access does. There is nothing
                here yet, and nothing invented to fill it.
              </p>
              <Link
                href="/whats-new"
                className="mt-3 inline-block font-display text-sm font-semibold underline underline-offset-[3px]"
              >
                See what&rsquo;s new →
              </Link>
            </Card>
          </div>
        </Wrap>
      </Sheet>

      <CTABlock />
    </>
  );
}

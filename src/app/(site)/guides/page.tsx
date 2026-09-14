import type { Metadata } from "next";
import Link from "next/link";
import { PageHero, CTABlock } from "@/components/heyday/page-shell";
import { Sheet, Wrap, SheetLabel } from "@/components/heyday/sheet";
import { SectionReveal, RevealGroup } from "@/components/heyday/motion";
import { HoldingImage } from "@/components/heyday/holding-image";
import { Card, StatusChip } from "@/components/ui/surfaces";
import { GUIDES, SAMPLE } from "@/lib/articles";
import { PAPER, SKY } from "@/lib/palette";

/* ==================================================================== *
 *  /guides — the index for template T15.
 *
 *  The titles are planned, not written, and every card says so. Naming a
 *  planned guide is honest; writing it on Jem's behalf so the page looks
 *  full is not — and a guide about pricing a class, written by someone
 *  who has never priced one, is exactly the kind of filler the brief's
 *  first rule exists to stop.
 * ==================================================================== */

export const metadata: Metadata = {
  title: `Guides for event, class and service businesses`,
  description:
    "Guides on pricing, staffing and running an events, class or service business. Written by people who run one.",
};

export default function GuidesPage() {
  return (
    <>
      <PageHero
        label="guides"
        h1="Guides from people who run an events business."
        highlight="who run an events business"
        sub={
          <>
            These are the guides we&rsquo;re writing. None is published yet,
            and there is nothing here written to fill the page.
          </>
        }
      />

      <Sheet colour={PAPER}>
        <Wrap>
          <SectionReveal>
            <SheetLabel>planned</SheetLabel>
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
                  <p className="m-0 text-[15px] text-ink/60">{g.line}</p>
                  <div className="mt-auto pt-3">
                    <StatusChip />
                  </div>
                </div>
              </Card>
            ))}
          </RevealGroup>

          {/* The one sample, so the template can be looked at. */}
          <p className="mt-12 font-mono text-xs text-ink/55">
            The article template can be seen on{" "}
            <Link
              href={`/guides/${SAMPLE.slug}`}
              className="underline underline-offset-2"
            >
              a sample page
            </Link>
            . It is clearly labelled and is not indexed.
          </p>
        </Wrap>
      </Sheet>

      <CTABlock />
    </>
  );
}

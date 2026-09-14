import type { Metadata } from "next";
import Link from "next/link";
import { PageHero, CTABlock } from "@/components/heyday/page-shell";
import { Sheet, Wrap, SheetLabel } from "@/components/heyday/sheet";
import { SectionReveal, RevealGroup } from "@/components/heyday/motion";
import { HoldingImage } from "@/components/heyday/holding-image";
import { Card, StatusChip } from "@/components/ui/surfaces";
import { POSTS, SAMPLE } from "@/lib/articles";
import { SITE } from "@/lib/site";
import { PAPER, SKY } from "@/lib/palette";

/* ==================================================================== *
 *  /blog — the index for template T15.
 *
 *  This replaces the old agency blog, which section 3 of the prompt says
 *  to remove. Same rule as the guides: the titles are planned, none is
 *  written, and nothing has been produced to make the page look
 *  inhabited.
 * ==================================================================== */

export const metadata: Metadata = {
  title: `The ${SITE.name} blog`,
  description:
    "Notes on running an events, class or service business: pricing, replying fast, staffing and getting paid.",
};

export default function BlogPage() {
  return (
    <>
      <PageHero
        label="blog"
        h1="Notes from building it."
        highlight="building it"
        sub={
          <>
            What we&rsquo;re learning about running an events, class or
            service business, and about building software for one. Nothing
            is published yet.
          </>
        }
      />

      <Sheet colour={PAPER}>
        <Wrap>
          <SectionReveal>
            <SheetLabel>planned</SheetLabel>
          </SectionReveal>
          <RevealGroup className="grid gap-[22px] lg:grid-cols-2">
            {POSTS.map((p) => (
              <Card
                key={p.slug}
                className="flex h-full flex-col overflow-hidden"
                style={{ backgroundColor: PAPER }}
              >
                <HoldingImage
                  art={p.art}
                  ratio="16:9"
                  tint={SKY}
                  radius={0}
                  className="!border-0 !border-b-2"
                />
                <div className="flex flex-1 flex-col gap-2 p-5">
                  <b className="font-display text-[19px] font-bold leading-tight">
                    {p.title}
                  </b>
                  <p className="m-0 text-[15px] text-ink/60">{p.line}</p>
                  <div className="mt-auto pt-3">
                    <StatusChip />
                  </div>
                </div>
              </Card>
            ))}
          </RevealGroup>

          <p className="mt-12 font-mono text-xs text-ink/55">
            The article template can be seen on{" "}
            <Link
              href={`/blog/${SAMPLE.slug}`}
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

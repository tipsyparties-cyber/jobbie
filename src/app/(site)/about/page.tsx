import type { Metadata } from "next";
import { PageHero, CTABlock, LineSteps, Marked } from "@/components/heyday/page-shell";
import { Sheet, Wrap, SheetLabel } from "@/components/heyday/sheet";
import { SectionReveal, RevealGroup } from "@/components/heyday/motion";
import { HoldingImage } from "@/components/heyday/holding-image";
import { Card } from "@/components/ui/surfaces";
import { BELIEFS } from "@/lib/company";
import { GROWTH } from "@/lib/who-its-for";
import { SITE, TBC } from "@/lib/site";
import { PAPER, CREAM, SKY, LAVENDER } from "@/lib/palette";

/* ==================================================================== *
 *  /about — template T16, spec part 5.
 *
 *  The story is Jem and Russell's to write, and the brief is explicit
 *  that it must not mention Tipsy Parties unless they decide it should.
 *  So the headings are here with the placeholder in them, rather than a
 *  plausible founding story written on their behalf — which would be both
 *  invented and, on this particular subject, a decision that is not
 *  mine to make.
 *
 *  The one thing this page can say honestly today is what the product
 *  believes, because that is visible in every decision across the site:
 *  the AI that drafts rather than sends, the export that makes leaving
 *  easy, the defaults you can change.
 * ==================================================================== */

export const metadata: Metadata = {
  title: `About ${SITE.name}`,
  description:
    "Software that runs the whole business, for anyone who sells their time, their skills or an experience.",
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        label="about"
        h1="Software that runs the whole business."
        highlight="the whole business"
        sub={
          <>
            For anyone who sells their time, their skills or an experience.
            <span className="mt-3 block font-mono text-[13px] text-ink/55">
              [Who&rsquo;s behind {SITE.name}: Jem and Russell to write.]
            </span>
          </>
        }
      />

      {/* The story. A placeholder, kept visible. */}
      <Sheet colour={PAPER}>
        <Wrap>
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <SectionReveal>
              <SheetLabel>where it comes from</SheetLabel>
              <h2 className="hd-h2">[Headline TBC]</h2>
              <p className="hd-sub">
                [{SITE.name}&rsquo;s story: Jem and Russell to write. It
                doesn&rsquo;t mention Tipsy Parties unless they decide it
                should.]
              </p>
            </SectionReveal>
            <SectionReveal delay={0.15}>
              <HoldingImage
                art="[TBC, to match the story]"
                ratio="4:3"
                tint={SKY}
                radius={40}
              />
            </SectionReveal>
          </div>
        </Wrap>
      </Sheet>

      {/* Grows with you. */}
      <Sheet colour={CREAM}>
        <Wrap>
          <SectionReveal>
            <SheetLabel>grows with you</SheetLabel>
            <h2 className="hd-h2 max-w-[26ch]">
              <Marked
                text="From doing it all to a business that runs itself."
                phrase="to a business that runs itself"
              />
            </h2>
          </SectionReveal>
          <LineSteps
            steps={GROWTH.map((g) => ({ title: g.title, body: g.line }))}
          />
        </Wrap>
      </Sheet>

      {/* What we believe. The one section that can be written today. */}
      <Sheet colour={PAPER}>
        <Wrap>
          <SectionReveal>
            <SheetLabel>what we believe</SheetLabel>
            <h2 className="hd-h2 max-w-[24ch]">
              <Marked
                text="Software that works the way you do."
                phrase="the way you do"
              />
            </h2>
          </SectionReveal>
          <RevealGroup className="grid gap-[22px] sm:grid-cols-2">
            {BELIEFS.map((b) => (
              <Card
                key={b.title}
                className="h-full p-6"
                style={{ backgroundColor: PAPER }}
              >
                <b className="block font-display text-[19px] font-bold leading-[1.3]">
                  {b.title}
                </b>
                <p className="mt-2 text-[15.5px] text-ink/60">{b.line}</p>
              </Card>
            ))}
          </RevealGroup>
        </Wrap>
      </Sheet>

      {/* The people. Placeholders, and they stay. */}
      <Sheet colour={LAVENDER}>
        <Wrap>
          <SectionReveal>
            <SheetLabel>the people</SheetLabel>
            <h2 className="hd-h2 max-w-[26ch]">
              [Names, roles and photos: TBC by Jem and Russell]
            </h2>
          </SectionReveal>
          <RevealGroup className="grid gap-[22px] sm:grid-cols-2 lg:grid-cols-3">
            {[0, 1, 2].map((i) => (
              <Card
                key={i}
                className="overflow-hidden"
                style={{ backgroundColor: PAPER }}
              >
                <HoldingImage
                  art="a portrait, looking at the camera"
                  ratio="1:1"
                  tint={LAVENDER}
                  radius={0}
                  className="!border-0 !border-b-2"
                />
                <div className="p-5">
                  <b className="block font-display text-[17px] font-bold">
                    [Name {TBC.generic}]
                  </b>
                  <p className="mt-1 font-mono text-xs text-ink/55">
                    [Role {TBC.generic}]
                  </p>
                </div>
              </Card>
            ))}
          </RevealGroup>
        </Wrap>
      </Sheet>

      <CTABlock />
    </>
  );
}

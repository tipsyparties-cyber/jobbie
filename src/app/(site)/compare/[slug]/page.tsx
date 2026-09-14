import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  PageHero,
  CTABlock,
  FAQ,
  LineSteps,
  Breadcrumbs,
} from "@/components/heyday/page-shell";
import { Sheet, Wrap, SheetLabel } from "@/components/heyday/sheet";
import { SectionReveal, RevealGroup } from "@/components/heyday/motion";
import { Card, Sticker } from "@/components/ui/surfaces";
import { Button } from "@/components/ui/button";
import { RIVALS, rivalBySlug, CHECKED, SWITCHING_STEPS } from "@/lib/compare";
import { CTA, SITE } from "@/lib/site";
import { PAPER, CREAM, SKY, LAVENDER } from "@/lib/palette";

/* ==================================================================== *
 *  /compare/[slug] — template T9, spec part 4, and the working page at
 *  reference/site/compare-honeybook.html.
 *
 *  The riskiest pages on the site, because they make claims about named
 *  competitors. Three things are structural rather than editorial:
 *
 *  - **The checked date is printed twice**, in the hero and again in the
 *    table header, and it comes from one constant. The brief says the
 *    research is a starting point and not a source to quote from, so
 *    every page also says to check again before publishing.
 *  - **"Where they're better" is a section, not a sentence**, and for the
 *    mature products it is longer than ours. It has to be: they ship and
 *    Heyday does not, and a comparison that cannot name a single
 *    advantage of a working product is one no reader trusts.
 *  - **Nothing is guessed.** Where the research says "not stated", the
 *    page says "not stated" — a fact about their marketing, not a claim
 *    about their product. Everything unverified says [check on the day].
 *
 *  No rival logos anywhere. The brief forbids them until Jem confirms it
 *  is allowed, so these pages use names.
 * ==================================================================== */

export function generateStaticParams() {
  return RIVALS.map((r) => ({ slug: r.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const r = rivalBySlug(slug);
  if (!r) return {};
  return {
    title: `${SITE.name} vs ${r.name}: an honest comparison`,
    description: r.intro.slice(0, 155),
  };
}

export default async function ComparePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const r = rivalBySlug(slug);
  if (!r) notFound();

  return (
    <>
      <PageHero
        crumbs={
          <Breadcrumbs
            items={[
              { label: "Compare", href: "/compare" },
              { label: r.name },
            ]}
          />
        }
        label={`heyday vs ${r.name.toLowerCase()}`}
        h1={r.headline}
        highlight={r.highlight}
        sub={r.intro}
        chips={
          <Sticker
            className="px-3 py-1.5 font-mono text-xs font-semibold"
            tilt={-5}
            style={{
              backgroundColor: CREAM,
              boxShadow: "6px 6px 0 0 rgba(10,10,10,0.08)",
            }}
          >
            Checked {CHECKED} · check again before publishing
          </Sticker>
        }
        actions={
          <>
            <Button href={CTA.comingSoon.href} variant="primary" arrow>
              {CTA.comingSoon.label}
            </Button>
            <Button href="/compare" variant="ghost">
              See all comparisons
            </Button>
          </>
        }
      />

      {/* At a glance. */}
      <Sheet colour={PAPER}>
        <Wrap>
          <SectionReveal>
            <SheetLabel>at a glance</SheetLabel>
          </SectionReveal>
          <Table
            checked
            head={["", r.name, SITE.name]}
            rows={r.glance.map((g) => [g.row, g.them, g.us])}
          />
        </Wrap>
      </Sheet>

      {/* Feature by feature, by group. */}
      <Sheet colour={CREAM}>
        <Wrap>
          <SectionReveal>
            <SheetLabel>feature by feature</SheetLabel>
            <h2 className="hd-h2">
              Feature by <span className="hd-hl">feature</span>.
            </h2>
          </SectionReveal>

          <div
            className="overflow-x-auto rounded-3xl border border-ink"
            style={{
              backgroundColor: PAPER,
              boxShadow: "6px 10px 0 0 rgba(10,10,10,0.08)",
            }}
          >
            <table className="w-full min-w-[640px] border-separate border-spacing-0 text-[15px]">
              <caption className="sr-only">
                Feature by feature. {r.name}&rsquo;s column records what
                their own pages said on {CHECKED}; anything unverified says
                &ldquo;check on the day&rdquo;.
              </caption>
              <thead>
                <tr>
                  {["Feature", `${r.name} (checked ${CHECKED})`, SITE.name].map(
                    (h, i) => (
                      <th
                        key={h}
                        scope="col"
                        className="sticky top-[72px] z-10 border-b-[1.5px] border-ink px-[18px] py-3.5 text-left font-display text-[15px] font-bold"
                        style={{
                          backgroundColor: PAPER,
                          width: i === 0 ? "26%" : undefined,
                        }}
                      >
                        {h}
                      </th>
                    )
                  )}
                </tr>
              </thead>
              <tbody>
                {r.matrix.map((g) => (
                  <>
                    <tr key={g.group}>
                      <th
                        scope="colgroup"
                        colSpan={3}
                        className="border-b border-ink/10 px-[18px] py-3 text-left font-mono text-xs font-bold tracking-[0.06em]"
                        style={{ backgroundColor: CREAM }}
                      >
                        {g.group.toUpperCase()}
                      </th>
                    </tr>
                    {g.rows.map((row) => (
                      <tr key={row.feature}>
                        <th
                          scope="row"
                          className="border-b border-ink/10 px-[18px] py-3.5 text-left font-display text-[15px] font-semibold"
                        >
                          {row.feature}
                        </th>
                        <td className="border-b border-ink/10 px-[18px] py-3.5 align-top text-ink/70">
                          {row.them}
                        </td>
                        <td className="border-b border-ink/10 px-[18px] py-3.5 align-top">
                          {row.us}
                        </td>
                      </tr>
                    ))}
                  </>
                ))}
              </tbody>
            </table>
          </div>
        </Wrap>
      </Sheet>

      {/* Where they are better. */}
      <Sheet colour={SKY}>
        <Wrap>
          <SectionReveal>
            <SheetLabel>where they&rsquo;re ahead</SheetLabel>
            <h2 className="hd-h2">{r.betterHeading}</h2>
          </SectionReveal>
          <RevealGroup className="grid gap-[22px] sm:grid-cols-2">
            {r.better.map((b) => (
              <Card
                key={b}
                className="h-full p-6 text-[16px] leading-relaxed"
                style={{ backgroundColor: PAPER }}
              >
                {b}
              </Card>
            ))}
          </RevealGroup>
        </Wrap>
      </Sheet>

      {/* Where Heyday differs. */}
      <Sheet colour={PAPER}>
        <Wrap>
          <SectionReveal>
            <SheetLabel>where heyday&rsquo;s different</SheetLabel>
            <h2 className="hd-h2 max-w-[24ch]">{r.differentHeading}</h2>
          </SectionReveal>
          <RevealGroup className="grid gap-[22px] sm:grid-cols-2">
            {r.different.map((d) => (
              <Card
                key={d}
                className="h-full p-6 text-[16px] leading-relaxed"
                style={{ backgroundColor: PAPER }}
              >
                {d}
              </Card>
            ))}
          </RevealGroup>
          <p className="mt-6 font-mono text-xs text-ink/55">
            All coming soon.
          </p>
        </Wrap>
      </Sheet>

      {/* The switching plan, on the Heyday line. */}
      <Sheet colour={LAVENDER}>
        <Wrap>
          <SectionReveal>
            <SheetLabel>switching</SheetLabel>
            <h2 className="hd-h2 max-w-[26ch]">
              Switching is the part everyone dreads.{" "}
              <span className="hd-hl">So we made it easy.</span>
            </h2>
          </SectionReveal>
          <LineSteps
            steps={SWITCHING_STEPS.map((s, i) => ({
              eyebrow: `Step ${i + 1}`,
              title: s.title,
              body: s.body,
            }))}
          />
        </Wrap>
      </Sheet>

      <Sheet colour={CREAM}>
        <Wrap>
          <SectionReveal>
            <SheetLabel>faq</SheetLabel>
            <FAQ heading="Questions, answered" items={r.faq} />
          </SectionReveal>
          <p className="mt-8 font-mono text-xs text-ink/55">
            Comparing something else?{" "}
            <Link href="/compare" className="underline underline-offset-2">
              See all comparisons
            </Link>
            .
          </p>
        </Wrap>
      </Sheet>

      <CTABlock
        line="Join early access and help shape it."
        note={
          <>
            Every fact about {r.name} on this page was read from their own
            pages on {CHECKED} and is marked with that date. Where we
            haven&rsquo;t verified something it says so rather than being
            guessed at, and where they are better we say that too.
          </>
        }
      />
    </>
  );
}

/** The at-a-glance table: two columns, theirs then ours. */
function Table({
  head,
  rows,
  checked,
}: {
  head: string[];
  rows: string[][];
  checked?: boolean;
}) {
  return (
    <div
      className="overflow-x-auto rounded-3xl border border-ink"
      style={{
        backgroundColor: PAPER,
        boxShadow: "6px 10px 0 0 rgba(10,10,10,0.08)",
      }}
    >
      <table className="w-full min-w-[640px] border-separate border-spacing-0 text-[15px]">
        {checked ? (
          <caption className="sr-only">
            At a glance, checked {CHECKED}.
          </caption>
        ) : null}
        <thead>
          <tr>
            {head.map((h, i) => (
              <th
                key={h || `col-${i}`}
                scope="col"
                className="border-b-[1.5px] border-ink px-[18px] py-3.5 text-left font-display text-[15px] font-bold"
                style={{ backgroundColor: PAPER, width: i === 0 ? "22%" : undefined }}
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row[0]}>
              <th
                scope="row"
                className="border-b border-ink/10 px-[18px] py-3.5 text-left font-display text-[15px] font-semibold"
              >
                {row[0]}
              </th>
              {row.slice(1).map((cell, i) => (
                <td
                  key={i}
                  className="border-b border-ink/10 px-[18px] py-3.5 align-top text-ink/70"
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

import type { ReactNode } from "react";
import Link from "next/link";
import { Sheet, Wrap } from "@/components/heyday/sheet";
import { HoldingImage } from "@/components/heyday/holding-image";
import { Card, Sticker } from "@/components/ui/surfaces";
import { Button } from "@/components/ui/button";
import { SAMPLE, type ArticleStub } from "@/lib/articles";
import { CTA, SITE } from "@/lib/site";
import { PAPER, CREAM, SKY, LAVENDER } from "@/lib/palette";

/* ==================================================================== *
 *  The article template — T15, for guides, the blog and What's new.
 *
 *  A reading column about 65 characters wide, which is roughly the width
 *  most people read fastest at. The motion table says no rise and no
 *  parallax on body text in articles, and this obeys it: an article is
 *  for reading, and text that moves as you read it is text you read
 *  twice.
 *
 *  Sheets and rounded tops are out too, for the same reason. Articles sit
 *  on paper, flat, start to finish.
 * ==================================================================== */

export function Article({
  stub,
  kind,
  children,
  related,
}: {
  stub: ArticleStub | typeof SAMPLE;
  kind: "Guide" | "Blog";
  children: ReactNode;
  related: ArticleStub[];
}) {
  const isSample = stub.slug === SAMPLE.slug;

  return (
    <>
      <article className="bg-paper pb-[150px] pt-14">
        <Wrap>
          <div className="mx-auto max-w-[68ch]">
            <p className="mb-4 font-mono text-[13px] text-ink/55">
              <Link href={kind === "Guide" ? "/guides" : "/blog"}>
                {kind === "Guide" ? "Guides" : "Blog"}
              </Link>
            </p>

            {/* The sample says so, loudly and at the top. A convincing
                sample is worse than an obvious one: filler that looks
                like an article gets linked and quoted, and by then nobody
                remembers it was filler. */}
            {isSample ? (
              <Sticker
                className="mb-5 px-3 py-1.5 font-mono text-xs font-semibold"
                tilt={-4}
                style={{ backgroundColor: LAVENDER }}
              >
                Sample post · layout only · not published, not indexed
              </Sticker>
            ) : null}

            <h1
              className="mb-4 font-hero font-extrabold leading-none tracking-[-0.035em]"
              style={{ fontSize: "clamp(36px, 4.4vw, 60px)", textWrap: "balance" }}
            >
              {stub.title}
            </h1>
            <p className="mb-5 text-lg leading-relaxed text-ink/70">
              {stub.line}
            </p>
            <p className="mb-7 font-mono text-[13px] text-ink/55">
              {isSample && "byline" in stub ? stub.byline : SITE.name}
            </p>

            <HoldingImage art={stub.art} ratio="16:9" tint={SKY} radius={16} />

            <div className="hd-article mt-7">{children}</div>
          </div>
        </Wrap>
      </article>

      {/* One call-to-action box, and the related articles. */}
      <Sheet colour={CREAM}>
        <Wrap>
          <div className="mx-auto max-w-[68ch]">
            <Card className="p-7" style={{ backgroundColor: PAPER }}>
              <h2 className="m-0 font-display text-[22px] font-bold">
                One workflow for your whole business
              </h2>
              <p className="mt-2 text-ink/65">
                {SITE.name} runs the lot, from the first hello to the next
                booking. It isn&rsquo;t open to other businesses yet.
              </p>
              <div className="mt-4">
                <Button href={CTA.comingSoon.href} variant="primary" arrow>
                  {CTA.comingSoon.label}
                </Button>
              </div>
            </Card>

            {related.length ? (
              <>
                <h2 className="mb-4 mt-12 font-display text-[22px] font-bold">
                  More like this
                </h2>
                <div className="grid gap-4 sm:grid-cols-2">
                  {related.map((r) => (
                    <Card
                      key={r.slug}
                      className="p-5"
                      style={{ backgroundColor: PAPER }}
                    >
                      <b className="block font-display text-[17px] font-bold leading-tight">
                        {r.title}
                      </b>
                      <p className="mt-1.5 text-[14.5px] text-ink/60">
                        {r.line}
                      </p>
                      <p className="mt-2 font-mono text-[11px] text-ink/45">
                        Coming soon
                      </p>
                    </Card>
                  ))}
                </div>
              </>
            ) : null}
          </div>
        </Wrap>
      </Sheet>
    </>
  );
}

/** Renders the sample's blocks. */
export function ArticleBody({
  blocks,
}: {
  blocks: typeof SAMPLE.body;
}) {
  return (
    <>
      {blocks.map((b, i) => {
        if (b.kind === "h2")
          return (
            <h2
              key={i}
              className="mb-3 mt-11 font-display font-bold"
              style={{ fontSize: "clamp(26px, 3vw, 34px)" }}
            >
              {b.text}
            </h2>
          );
        if (b.kind === "quote")
          return (
            <blockquote
              key={i}
              className="my-7 rounded-r-2xl border-l-4 border-orange bg-paper px-6 py-[18px] font-display text-xl font-semibold leading-[1.45]"
            >
              {b.text}
            </blockquote>
          );
        if (b.kind === "list")
          return (
            <ul key={i} className="my-4 list-disc pl-5">
              {b.items?.map((it) => (
                <li key={it} className="my-1.5 text-[18.5px] leading-[1.7]">
                  {it}
                </li>
              ))}
            </ul>
          );
        return (
          <p key={i} className="my-4 text-[18.5px] leading-[1.7]">
            {b.text}
          </p>
        );
      })}
    </>
  );
}

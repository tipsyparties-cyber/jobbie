import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  PageHero,
  CTABlock,
  FAQ,
  Breadcrumbs,
} from "@/components/heyday/page-shell";
import { Sheet, Wrap, SheetLabel } from "@/components/heyday/sheet";
import { SectionReveal, RevealGroup } from "@/components/heyday/motion";
import { Card, StatusChip } from "@/components/ui/surfaces";
import { Button } from "@/components/ui/button";
import { Screen, ScreenRow, ScreenAction } from "@/components/heyday/screen";
import { PricingCalculator } from "@/components/heyday/pricing-calculator";
import { QuoteBuilder } from "@/components/heyday/quote-builder";
import { QuizEngine } from "@/components/heyday/quiz-engine";
import { TOOLS, toolBySlug } from "@/lib/tools";
import { featureHref } from "@/lib/heyday-features";
import { CTA, SITE } from "@/lib/site";
import { PAPER, CREAM, SKY } from "@/lib/palette";

/* ==================================================================== *
 *  /tools/[slug] — templates T13 and T14, spec part 5.
 *
 *  The order on this page is the spec's and it matters: the tool comes
 *  FIRST, with no email wall; then the result; and only then the upsell.
 *  Putting the pitch before the tool is what turns a free tool into a
 *  lead magnet, and the difference is obvious to anyone who lands on it.
 *
 *  Nothing any of these touches leaves the browser. No network calls, no
 *  storage. Every page says so, twice — once by the tool and once at the
 *  end — because it is the question anyone sensible asks before typing
 *  their costs into a stranger's website.
 * ==================================================================== */

export function generateStaticParams() {
  return TOOLS.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const t = toolBySlug(slug);
  if (!t) return {};
  return {
    title: `${t.name} (free) | ${SITE.name}`,
    description: t.sub,
  };
}

const FAQS: Record<string, { q: string; a: string }[]> = {
  "pricing-calculator": [
    {
      q: "Is anything I type saved?",
      a: "No. It stays on this page and disappears when you leave. There are no network calls in this tool at all.",
    },
    {
      q: "Why include my own time?",
      a: "If you don’t pay yourself in the price, the business only works while you do it for free. That is the single most common reason a booked-out diary makes no money.",
    },
    {
      q: "What if I sell on a marketplace too?",
      a: "Put its commission in. The calculator shows what that costs on each booking — and because commission and card fees come off the price rather than the cost, it is more than most people expect.",
    },
    {
      q: "Is this financial advice?",
      a: "No. It’s a starting point. Check your own costs and taxes.",
    },
  ],
  "quote-template": [
    {
      q: "Is anything I type saved?",
      a: "No. It stays on this page and disappears when you leave.",
    },
    {
      q: "Why does it say what isn’t included?",
      a: "Because that is where the arguments come from. A quote that only lists what you’re doing leaves the customer to assume the rest.",
    },
    {
      q: "Why put a date on the balance rather than “30 days”?",
      a: "A date gets paid. A period gets worked out later, and later is after the event.",
    },
  ],
  "leak-check": [
    {
      q: "Is anything I answer saved?",
      a: "No. Nothing is stored and nothing is sent. Closing the page loses it, which is why there’s a print button.",
    },
    {
      q: "How is the score worked out?",
      a: "Each answer scores 0 to 3, worst to best, and each group’s score is the plain percentage of what was available. No weighting and no curve.",
    },
    {
      q: "Do I have to give an email to see the result?",
      a: "No. The result is on the page.",
    },
  ],
};

export default async function ToolPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const tool = toolBySlug(slug);
  if (!tool) notFound();

  const others = TOOLS.filter((t) => t.slug !== tool.slug);
  const isQuiz = tool.slug === "leak-check";

  return (
    <>
      <PageHero
        crumbs={
          <Breadcrumbs
            items={[
              { label: "Resources", href: "/resources" },
              { label: "Free tools", href: "/tools" },
              { label: tool.name },
            ]}
          />
        }
        label={isQuiz ? "the leak check" : "free tool"}
        h1={tool.headline}
        highlight={tool.highlight}
        sub={tool.sub}
      />

      {/* The tool itself, first, with nothing in front of it. */}
      <Sheet colour={PAPER}>
        <Wrap>
          {tool.slug === "pricing-calculator" ? <PricingCalculator /> : null}
          {tool.slug === "quote-template" ? <QuoteBuilder /> : null}
          {isQuiz ? <QuizEngine /> : null}
        </Wrap>
      </Sheet>

      {/* Only now, the upsell. */}
      <Sheet colour={CREAM}>
        <Wrap>
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <SectionReveal>
              <SheetLabel>put it into action</SheetLabel>
              <h2 className="hd-h2">
                {tool.slug === "pricing-calculator" ? (
                  <>
                    Put those prices into action on{" "}
                    <span className="hd-hl">every quote</span>.
                  </>
                ) : tool.slug === "quote-template" ? (
                  <>
                    Or let it write <span className="hd-hl">every quote</span>{" "}
                    for you.
                  </>
                ) : (
                  <>
                    Fix the leaks <span className="hd-hl">once</span>, and let
                    it run.
                  </>
                )}
              </h2>
              <p className="hd-sub">
                {SITE.name} prices every enquiry from your own rules: guests,
                hours, travel and date, with your margin shown.
              </p>
              <div className="mb-6">
                <StatusChip />
              </div>
              <div className="flex flex-wrap gap-3">
                <Button href={CTA.comingSoon.href} variant="primary" arrow>
                  {CTA.comingSoon.label}
                </Button>
                <Button href={featureHref("quotes")} variant="ghost">
                  See instant quotes →
                </Button>
              </div>
            </SectionReveal>

            <SectionReveal delay={0.15}>
              <Screen title="Quote · Saturday, 80 guests, 4 hours">
                <ScreenRow meta="$1,200">Signature package</ScreenRow>
                <ScreenRow meta="$80">Add-on · glassware</ScreenRow>
                <ScreenRow meta="$120">Add-on · mocktails</ScreenRow>
                <ScreenRow meta="$50">Travel</ScreenRow>
                <ScreenRow meta="34%" hot>
                  Margin
                </ScreenRow>
                <ScreenAction>Send the quote</ScreenAction>
              </Screen>
            </SectionReveal>
          </div>
        </Wrap>
      </Sheet>

      {/* Related tools. */}
      <Sheet colour={SKY}>
        <Wrap>
          <SectionReveal>
            <SheetLabel>related tools</SheetLabel>
          </SectionReveal>
          <RevealGroup className="grid gap-[22px] lg:grid-cols-2">
            {others.map((t) => (
              <Card
                key={t.slug}
                className="flex h-full flex-col gap-2 p-6"
                style={{ backgroundColor: PAPER }}
              >
                <b className="font-display text-[19px] font-bold">{t.name}</b>
                <p className="m-0 text-[15px] text-ink/60">{t.line}</p>
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

      <Sheet colour={PAPER}>
        <Wrap>
          <SectionReveal>
            <SheetLabel>faq</SheetLabel>
            <FAQ heading="Questions, answered" items={FAQS[tool.slug] ?? []} />
          </SectionReveal>
        </Wrap>
      </Sheet>

      <CTABlock
        heading={
          tool.slug === "pricing-calculator"
            ? "Stop working out prices one enquiry at a time."
            : "Ready for your Heyday?"
        }
        highlight={
          tool.slug === "pricing-calculator"
            ? "one enquiry at a time"
            : "your Heyday?"
        }
      />
    </>
  );
}

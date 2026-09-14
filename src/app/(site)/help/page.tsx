import type { Metadata } from "next";
import Link from "next/link";
import { PageHero, CTABlock, FAQ, Marked } from "@/components/heyday/page-shell";
import { Sheet, Wrap, SheetLabel } from "@/components/heyday/sheet";
import { SectionReveal, RevealGroup } from "@/components/heyday/motion";
import { Card } from "@/components/ui/surfaces";
import { HELP } from "@/lib/company";
import { SITE, TBC } from "@/lib/site";
import { PAPER, CREAM } from "@/lib/palette";

/* ==================================================================== *
 *  /help — template T16, spec part 5.
 *
 *  How to reach a person, and what the setup call is. Both rivals bury
 *  this behind a help centre; the brief asks for the person first.
 *
 *  Almost every answer here is a placeholder, because support hours and
 *  the free setup call are not decided. They stay exactly as written.
 * ==================================================================== */

export const metadata: Metadata = {
  title: `Help and getting set up`,
  description:
    "How to reach a person at Heyday, what the free setup call covers, and how moving from another tool works.",
};

export default function HelpPage() {
  return (
    <>
      <PageHero
        label="help"
        h1="Talk to a person."
        highlight="a person"
        sub={
          <>
            Not a help centre you have to search first. {TBC.supportHours}
          </>
        }
      />

      <Sheet colour={PAPER}>
        <Wrap>
          <SectionReveal>
            <SheetLabel>three ways</SheetLabel>
          </SectionReveal>
          <RevealGroup className="grid gap-[22px] lg:grid-cols-3">
            {HELP.map((h) => (
              <Card
                key={h.title}
                className="h-full p-6"
                style={{ backgroundColor: PAPER }}
              >
                <b className="block font-display text-[19px] font-bold leading-[1.3]">
                  {h.title}
                </b>
                <p className="mt-2 text-[15.5px] text-ink/60">{h.line}</p>
              </Card>
            ))}
          </RevealGroup>
        </Wrap>
      </Sheet>

      <Sheet colour={CREAM}>
        <Wrap>
          <SectionReveal>
            <SheetLabel>faq</SheetLabel>
            <FAQ
              heading="Getting set up"
              items={[
                {
                  q: "How long does setting up take?",
                  a: `The AI setup assistant reads your website, price list and old emails and fills in your settings for you to check. It is coming soon, and how long that saves is ${TBC.generic} until people have used it.`,
                },
                {
                  q: "Can I bring my clients and bookings across?",
                  a: `Yes. ${TBC.importMethod}`,
                },
                {
                  q: "What does the free setup call cover?",
                  a: `Your prices, packages and rules, set up with someone on the call. ${TBC.confirm}`,
                },
                {
                  q: "When can I actually start?",
                  a: (
                    <>
                      {SITE.name} is opening to businesses a few at a time.{" "}
                      <Link
                        href="/early-access"
                        className="underline underline-offset-2"
                      >
                        Join early access
                      </Link>{" "}
                      and we&rsquo;ll let you know when it&rsquo;s your turn.
                    </>
                  ),
                },
              ]}
            />
          </SectionReveal>
        </Wrap>
      </Sheet>

      <Sheet colour={PAPER}>
        <Wrap>
          <SectionReveal>
            <h2 className="hd-h2 max-w-[26ch]">
              <Marked
                text="No help centre yet, because there is nothing to document."
                phrase="nothing to document"
              />
            </h2>
            <p className="hd-sub">
              A searchable help centre arrives when there is a working
              product to write one about. Until then, the people building it
              answer the questions themselves.
            </p>
            <Link
              href="/contact"
              className="font-display text-sm font-semibold underline underline-offset-[3px]"
            >
              Get in touch →
            </Link>
          </SectionReveal>
        </Wrap>
      </Sheet>

      <CTABlock />
    </>
  );
}

import type { Metadata } from "next";
import { PageHero, CTABlock, Marked } from "@/components/heyday/page-shell";
import { Sheet, Wrap, SheetLabel } from "@/components/heyday/sheet";
import { SectionReveal, RevealGroup } from "@/components/heyday/motion";
import { Card, StatusChip } from "@/components/ui/surfaces";
import { SECURITY } from "@/lib/company";
import { SITE } from "@/lib/site";
import { PAPER, CREAM } from "@/lib/palette";

/* ==================================================================== *
 *  /security — template T16, spec part 5.
 *
 *  The brief says "better than both", and the way to be better is not to
 *  list certifications: it is to answer, in plain words, the four things
 *  a small business owner actually worries about — where their card
 *  details go, who can sign in, who can see what, and whether they can
 *  leave.
 *
 *  The export promise is the one that matters and the one rivals bury.
 *  Leaving should be as easy as arriving, and a page that says so is
 *  making a commitment it can be held to.
 *
 *  Where something is undecided it says so rather than reaching for
 *  reassuring language. "Where it is kept, and for how long" is genuinely
 *  not settled, and a vague sentence there would be worse than the
 *  placeholder.
 * ==================================================================== */

export const metadata: Metadata = {
  title: `Security at ${SITE.name}, in plain words`,
  description:
    "Where your card details go, who can sign in, who can see what, and how to get your data out. In plain words, with the undecided parts marked.",
};

export default function SecurityPage() {
  return (
    <>
      <PageHero
        label="security"
        h1="Your business, your data, in plain words."
        highlight="in plain words"
        sub={
          <>
            No certification logos and no reassuring adjectives. Here is
            where things actually go, and what is still being decided.
          </>
        }
      />

      <Sheet colour={PAPER}>
        <Wrap>
          <SectionReveal>
            <SheetLabel>the four that matter</SheetLabel>
          </SectionReveal>
          <RevealGroup className="grid gap-[22px] lg:grid-cols-2">
            {SECURITY.map((s) => (
              <Card
                key={s.title}
                className="flex h-full flex-col gap-2 p-6"
                style={{ backgroundColor: PAPER }}
              >
                <b className="font-display text-[19px] font-bold leading-[1.3]">
                  {s.title}
                </b>
                <p className="m-0 text-[15.5px] text-ink/60">{s.line}</p>
                <div className="mt-auto pt-3">
                  {s.status === "Coming soon" ? (
                    <StatusChip />
                  ) : (
                    <span className="font-mono text-xs text-ink/55">
                      {s.status}
                    </span>
                  )}
                </div>
              </Card>
            ))}
          </RevealGroup>
        </Wrap>
      </Sheet>

      <Sheet colour={CREAM}>
        <Wrap>
          <SectionReveal>
            <h2 className="hd-h2 max-w-[24ch]">
              <Marked
                text="Leaving should be as easy as arriving."
                phrase="as easy as arriving"
              />
            </h2>
            <p className="hd-sub">
              Software that makes it hard to leave is software that has
              stopped trying to be worth staying for. Your clients, bookings
              and payments export in a format another system can read,
              whenever you want, without asking anyone.
            </p>
            <p className="max-w-[70ch] font-mono text-xs leading-relaxed text-ink/55">
              {SITE.name} is not open to other businesses yet, so none of
              this is live. It is on this page because it is a commitment we
              want to be held to, not because it is finished.
            </p>
          </SectionReveal>
        </Wrap>
      </Sheet>

      <CTABlock />
    </>
  );
}

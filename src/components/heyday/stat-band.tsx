import { statByRow } from "@/lib/stats-bank";
import { SectionReveal } from "@/components/heyday/motion";

/* ==================================================================== *
 *  StatBand — spec part 1, homepage section 4a.
 *
 *  Three headline numbers: time, money, customers. honeybook.com's stats
 *  band and the idea behind getjobber.com's "12 hours+ saved a week", but
 *  in Heyday's colours and type — lavender, not dark; big ink numbers
 *  divided by thin ink rules; no cards, no tape, no highlight behind the
 *  numbers.
 *
 *  The important part is the note underneath. Jobber's band prints its own
 *  customers' results. Heyday has no customers, so these are sourced
 *  industry figures standing in, and the note says exactly that, in the
 *  open, where a visitor reads it. Quietly printing industry figures in
 *  the shape a rival uses for its own results would read as a claim about
 *  Heyday, which is the thing the brief's first rule forbids.
 *
 *  No orange anywhere in this band: the ground is lavender, and yellow and
 *  orange never touch.
 * ==================================================================== */

const BAND: { cat: string; row: number }[] = [
  { cat: "TIME", row: 20 },
  { cat: "MONEY", row: 1 },
  { cat: "CUSTOMERS", row: 18 },
];

export function StatBand() {
  return (
    <div className="text-center">
      <div className="mx-0 my-12 grid md:grid-cols-3">
        {BAND.map(({ cat, row }, i) => {
          const stat = statByRow(row);
          if (!stat?.headline) return null;
          return (
            <SectionReveal key={cat} delay={i * 0.15}>
              {/* The divider is a thin ink rule: across the top when the
                  three stack on a phone, down the left when they sit in a
                  row. Never a card and never a box — the brief is explicit
                  that this band is not honeybook.com's tape-and-cards
                  treatment. */}
              <div
                className={
                  "h-full px-0 py-7 md:px-8 md:py-1.5 " +
                  (i === 0
                    ? ""
                    : "border-t-[1.5px] border-ink md:border-l-[1.5px] md:border-t-0")
                }
              >
                <p className="mb-3 font-mono text-xs font-medium tracking-[0.12em] text-ink/55">
                  {cat}
                </p>
                <p
                  className="mb-3.5 font-display font-extrabold leading-none tracking-[-0.04em] text-ink"
                  style={{ fontSize: "clamp(56px, 6vw, 88px)" }}
                >
                  {stat.headline.value}
                </p>
                <p className="mx-auto mb-3 max-w-[26ch] font-display text-[17px] font-semibold leading-[1.35] text-ink">
                  {stat.headline.line}
                </p>
                <p className="mx-auto max-w-[32ch] font-mono text-[11.5px] font-medium leading-[1.4] text-ink/55">
                  {stat.source}. {stat.covers}. {stat.kind}.
                </p>
              </div>
            </SectionReveal>
          );
        })}
      </div>

      <p className="mx-auto max-w-[72ch] rounded-xl border border-dashed border-ink/35 px-4 py-3 font-mono text-[12.5px] font-medium leading-[1.5] text-ink/55">
        Heyday&rsquo;s own results go here once early-access customers have
        them: [X] hours saved a week · [X]% more revenue in the first year ·
        [X] average customer rating. Until then, these sourced figures stand
        in. [needs approval]
      </p>
    </div>
  );
}

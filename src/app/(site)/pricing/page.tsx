import type { Metadata } from "next";
import { PageHero, CTABlock, FAQ, Marked } from "@/components/heyday/page-shell";
import { Sheet, Wrap, SheetLabel } from "@/components/heyday/sheet";
import { SectionReveal, RevealGroup } from "@/components/heyday/motion";
import { HeydayLogo } from "@/components/heyday/heyday-logo";
import { Icon } from "@/components/heyday/icon";
import { Panel, Card, Sticker, StatusChip } from "@/components/ui/surfaces";
import { Button } from "@/components/ui/button";
import { BillingToggle } from "@/components/heyday/billing-toggle";
import {
  PLANS,
  FEES,
  FEES_NOTE,
  ADDONS,
  PLAN_MATRIX,
  MATRIX_NOTE,
  REASSURANCE,
  PRICING_FAQ,
} from "@/lib/pricing";
import { GROUPS } from "@/lib/groups";
import { featuresInGroup } from "@/lib/heyday-features";
import { SITE, TBC, CTA } from "@/lib/site";
import { PAPER, CREAM, SKY, LAVENDER } from "@/lib/palette";

/* ==================================================================== *
 *  /pricing — template T8, spec part 4.
 *
 *  "Try Heyday free. Pick a plan later." — Jobber's framing, and the only
 *  one available here, because there is nothing to buy yet.
 *
 *  Every price on this page is [PRICE TBC] and every fee is [TBC], shown
 *  rather than hidden. Card fees in particular are shown BEFORE sign-up,
 *  which is the one thing getjobber.com does that honeybook.com does not,
 *  and it is worth copying: the fee a customer discovers at checkout is
 *  the fee they remember.
 *
 *  The "Most popular" sticker is built and switched off. It goes on the
 *  middle plan the day there are enough customers for the words to mean
 *  something; until then it would be the cheapest possible lie.
 * ==================================================================== */

export const metadata: Metadata = {
  title: `Pricing: a plan for each stage of your business`,
  description:
    "Try Heyday free, pick a plan later. Three plans for where your business is now, with card fees shown before you sign up. Prices are being finalized.",
};

/** How a matrix cell prints. */
function Cell({ value }: { value: string }) {
  if (value === "yes") return <span aria-label="Included">✓</span>;
  if (value === "no") return <span aria-label="Not included">–</span>;
  if (value === "suggested-yes" || value === "suggested-no") {
    return (
      <span>
        <span aria-label={value === "suggested-yes" ? "Included" : "Not included"}>
          {value === "suggested-yes" ? "✓" : "–"}
        </span>
        <span className="block font-mono text-[11px] text-ink/55">
          suggested
        </span>
      </span>
    );
  }
  return <span className="font-mono text-[12px]">{value}</span>;
}

export default function PricingPage() {
  return (
    <>
      <PageHero
        label="pricing"
        h1="Try Heyday free. Pick a plan later."
        highlight="Pick a plan later"
        sub={
          <>
            Join early access today. When {SITE.name} opens, you choose the
            plan that fits the stage you&rsquo;re at, and move up when you
            grow. [trial length and card requirement to confirm]
          </>
        }
        actions={<BillingToggle />}
      />

      {/* The three plans. */}
      <Sheet colour={PAPER}>
        <Wrap>
          <RevealGroup className="grid items-stretch gap-[22px] lg:grid-cols-3">
            {PLANS.map((p) => (
              <Panel
                key={p.id}
                className="relative flex h-full flex-col gap-3.5 !px-[26px] !py-[30px]"
              >
                {p.mostPopular ? (
                  <Sticker
                    className="absolute -top-3.5 left-[22px] px-3 py-1 font-mono text-[11px] font-semibold"
                    style={{ backgroundColor: LAVENDER }}
                  >
                    Most popular
                  </Sticker>
                ) : (
                  /* The sticker slot stays visible and says why it is
                     empty, rather than the row quietly not having one. */
                  <p className="m-0 font-mono text-[11px] text-ink/45">
                    [&ldquo;Most popular&rdquo; sticker: hidden until it&rsquo;s
                    true]
                  </p>
                )}

                <h2 className="m-0 font-display text-[22px] font-bold">
                  {p.name}{" "}
                  <span className="font-mono text-[11px] font-medium text-ink/45">
                    (suggested name)
                  </span>
                </h2>
                <p className="m-0 text-ink/60">{p.tagline}</p>

                <p className="m-0 font-display text-[40px] font-extrabold leading-none tracking-[-0.03em]">
                  {TBC.price}
                </p>
                <p className="m-0 font-mono text-xs text-ink/55">
                  / month, billed monthly
                </p>

                <Button href={p.cta.href} variant={p.id === "operator" ? "ghost" : "primary"} arrow>
                  {p.cta.label}
                </Button>

                <p className="mb-0 mt-2 font-display text-sm font-semibold">
                  {p.inherits ? `Everything in ${p.inherits}, plus:` : "Includes:"}
                </p>
                <ul className="m-0 list-disc pl-[18px] text-[15px] text-ink/60">
                  {p.includes.map((f) => (
                    <li key={f} className="my-1.5">
                      {f}
                    </li>
                  ))}
                </ul>
              </Panel>
            ))}
          </RevealGroup>

          <p className="mt-8 font-mono text-xs text-ink/55">
            Plans, names and prices are being finalized. Every feature is
            coming soon.
          </p>
        </Wrap>
      </Sheet>

      {/* Branches and franchises. */}
      <Sheet colour={CREAM}>
        <Wrap>
          <SectionReveal>
            <h2 className="hd-h2">
              Running branches or a <span className="hd-hl">franchise</span>?
            </h2>
            <p className="hd-sub">
              Areas, branches and partners on one system, with a setup
              specialist. [Group plan to confirm]
            </p>
            <Button href="/demo" variant="ghost">
              {CTA.secondary.label}
            </Button>
          </SectionReveal>
        </Wrap>
      </Sheet>

      {/* Card fees, up front. */}
      <Sheet colour={PAPER}>
        <Wrap>
          <SectionReveal>
            <SheetLabel>fees, up front</SheetLabel>
            <h2 className="hd-h2 max-w-[24ch]">
              <Marked
                text="Card fees, shown before you sign up."
                phrase="before you sign up"
              />
            </h2>
          </SectionReveal>
          <RevealGroup className="grid gap-[18px] sm:grid-cols-2 lg:grid-cols-4">
            {FEES.map((f) => (
              <Card
                key={f.label}
                className="h-full p-5"
                style={{ backgroundColor: PAPER }}
              >
                <b className="block font-display text-base font-semibold">
                  {f.label}
                </b>
                <p className="mt-2 font-display text-2xl font-bold">{f.value}</p>
              </Card>
            ))}
          </RevealGroup>
          <p className="mt-6 font-mono text-xs text-ink/55">{FEES_NOTE}</p>
        </Wrap>
      </Sheet>

      {/* Add-ons. */}
      <Sheet colour={SKY}>
        <Wrap>
          <SectionReveal>
            <SheetLabel>add-ons</SheetLabel>
            <h2 className="hd-h2 max-w-[24ch]">
              <Marked
                text="Add what you need, when you need it."
                phrase="when you need it"
              />
            </h2>
          </SectionReveal>
          <RevealGroup className="grid gap-[22px] lg:grid-cols-3">
            {ADDONS.map((a) => (
              <Card
                key={a.label}
                className="flex h-full flex-col gap-2 p-6"
                style={{ backgroundColor: PAPER }}
              >
                <p className="m-0 text-[15px]">{a.label}</p>
                <p className="m-0 font-display text-xl font-bold">{a.price}</p>
                <div className="mt-auto pt-2">
                  <StatusChip />
                </div>
              </Card>
            ))}
          </RevealGroup>
        </Wrap>
      </Sheet>

      {/* The whole feature table, grouped by the six groups. The header row
          sticks; nothing else about this table moves. */}
      <Sheet colour={PAPER}>
        <Wrap>
          <SectionReveal>
            <SheetLabel>every feature</SheetLabel>
            <h2 className="hd-h2">
              Compare <span className="hd-hl">every feature</span>.
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
                Every feature, by plan. Values marked &ldquo;suggested&rdquo;
                show the plan structure being tested; the rest are still to
                be confirmed.
              </caption>
              <thead>
                <tr>
                  <th
                    scope="col"
                    className="sticky top-[72px] z-10 border-b-[1.5px] border-ink px-[18px] py-3.5 text-left font-display text-[15px] font-bold"
                    style={{ backgroundColor: PAPER }}
                  >
                    Group and feature
                  </th>
                  {PLANS.map((p) => (
                    <th
                      key={p.id}
                      scope="col"
                      className="sticky top-[72px] z-10 border-b-[1.5px] border-ink px-[18px] py-3.5 text-center font-display text-[15px] font-bold"
                      style={{ backgroundColor: PAPER }}
                    >
                      {p.name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {GROUPS.map((g) => (
                  <>
                    <tr key={g.id}>
                      <th
                        scope="colgroup"
                        colSpan={4}
                        className="border-b border-ink/10 px-[18px] py-3.5 text-left font-mono text-xs font-bold tracking-[0.06em]"
                        style={{ backgroundColor: CREAM }}
                      >
                        <span className="inline-flex items-center gap-2">
                          <HeydayLogo size={20} colour={g.markColour} />
                          {g.name.toUpperCase()}
                        </span>
                      </th>
                    </tr>
                    {featuresInGroup(g.id).map((f) => {
                      const row = PLAN_MATRIX[f.slug] ?? [
                        TBC.generic,
                        TBC.generic,
                        TBC.generic,
                      ];
                      return (
                        <tr key={f.slug}>
                          <th
                            scope="row"
                            className="border-b border-ink/10 px-[18px] py-3.5 text-left font-normal"
                          >
                            <span className="inline-flex items-center gap-2">
                              <Icon name={f.icon} size={22} ground={PAPER} />
                              {f.name}
                            </span>
                          </th>
                          {row.map((cell, i) => (
                            <td
                              key={PLANS[i].id}
                              className="border-b border-ink/10 px-[18px] py-3.5 text-center"
                            >
                              <Cell value={cell} />
                            </td>
                          ))}
                        </tr>
                      );
                    })}
                  </>
                ))}
              </tbody>
            </table>
          </div>

          <p className="mt-6 font-mono text-xs text-ink/55">{MATRIX_NOTE}</p>
        </Wrap>
      </Sheet>

      {/* Reassurance. */}
      <Sheet colour={CREAM}>
        <Wrap>
          <SectionReveal>
            <SheetLabel>no catch</SheetLabel>
            <h2 className="hd-h2 max-w-[22ch]">
              <Marked
                text="Try it without the risk."
                phrase="without the risk"
              />
            </h2>
          </SectionReveal>
          <RevealGroup className="grid gap-[22px] sm:grid-cols-2 lg:grid-cols-4">
            {REASSURANCE.map((r) => (
              <Card
                key={r.title}
                className="h-full p-6"
                style={{ backgroundColor: PAPER }}
              >
                <b className="block font-display text-[17px] font-bold leading-[1.3]">
                  {r.title}
                </b>
                <p className="mt-2 font-mono text-xs text-ink/55">{r.note}</p>
              </Card>
            ))}
          </RevealGroup>
        </Wrap>
      </Sheet>

      <Sheet colour={PAPER}>
        <Wrap>
          <SectionReveal>
            <SheetLabel>faq</SheetLabel>
            <FAQ
              heading="Pricing questions."
              items={PRICING_FAQ.map((f) => ({ q: f.q, a: f.a }))}
            />
          </SectionReveal>
        </Wrap>
      </Sheet>

      <CTABlock
        note={
          <>
            Nothing on this page is a final price. {SITE.name} is not open to
            other businesses yet, and plans, names and fees are still being
            decided — the placeholders show where the answers will go.
          </>
        }
      />
    </>
  );
}

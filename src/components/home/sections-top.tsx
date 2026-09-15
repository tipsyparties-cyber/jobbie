import Link from "next/link";
import { Wrap, SheetLabel } from "@/components/heyday/sheet";
import { SectionReveal, RevealGroup } from "@/components/heyday/motion";
import { Icon } from "@/components/heyday/icon";
import { HeydayLogo } from "@/components/heyday/heyday-logo";
import { SideScroll, SideCard } from "@/components/heyday/side-scroll";
import { DecorSuns, WHAT_SUNS } from "@/components/heyday/decor-suns";
import { WHAT_CHIPS, BUSINESS_TYPES, FLOW } from "@/lib/home-content";
import { GROUPS } from "@/lib/groups";
import { PAPER, CREAM, INK } from "@/lib/palette";

/* ==================================================================== *
 *  Homepage sections 3 and 5 — spec part 1.
 * ==================================================================== */

/* ---- 3. What Heyday is ---------------------------------------------- */

/**
 * Straight after the hero, in plain words, what Heyday is and who for.
 *
 * This is also where the homepage's SEARCH wording lives, and that split
 * is deliberate. The hero headline is the owner's pain — "You didn't start
 * a business to have an admin job" — which is what makes someone stop, and
 * is not a phrase anyone types into Google. This H2 carries the words they
 * do type: all-in-one software, events, class, service business.
 */
export function WhatHeydayIs() {
  return (
    <>
      <DecorSuns suns={WHAT_SUNS} />
      <Wrap className="relative text-center">
      <SectionReveal>
        <div className="flex justify-center">
          <SheetLabel>what heyday is</SheetLabel>
        </div>
        <h2 className="hd-h2 mx-auto max-w-[22ch]">
          The all-in-one software that runs your{" "}
          <span className="hd-hl">events, class or service business</span>.
        </h2>
        <p className="hd-sub mx-auto">
          Enquiries, instant quotes, bookings and payments, your team&rsquo;s
          shifts and pay, client messages, follow-ups, reviews and
          rebookings, all in one automated workflow. For anyone who sells
          their time, skills or an experience, from one-person businesses to
          growing teams.
        </p>
      </SectionReveal>

      <RevealGroup className="mb-10 flex flex-wrap justify-center gap-2.5">
        {WHAT_CHIPS.map((c) => (
          <Link
            key={c.href}
            href={c.href}
            className="inline-flex items-center gap-2 rounded-full border border-ink py-1.5 pl-2 pr-3.5 font-display text-sm font-semibold text-ink transition-[border-radius] duration-200 hover:rounded-lg"
            style={{ backgroundColor: PAPER }}
          >
            <Icon name={c.icon} size={26} ground={PAPER} />
            {c.label}
          </Link>
        ))}
      </RevealGroup>

      {/* The marquee. The first copy is the real one: real links, read by
          search engines and screen readers. The second is aria-hidden and
          carries no links, and exists only so the loop has something to
          scroll into. Without that split every business type is announced
          twice. */}
      <div className="hd-marquee -mx-[clamp(16px,4vw,48px)]">
        <div className="hd-marquee-track">
          <span>
            {BUSINESS_TYPES.map((b, i) => (
              <span key={b.label}>
                {i > 0 ? <span aria-hidden> · </span> : null}
                <Link
                  href={`/who-its-for#${b.anchor}`}
                  className="hover:underline"
                >
                  {b.label}
                </Link>
              </span>
            ))}
            <span> · and anyone who sells their time, skills or an experience · </span>
          </span>
          <span aria-hidden>
            {BUSINESS_TYPES.map((b) => b.label).join(" · ")} · and anyone who
            sells their time, skills or an experience ·{" "}
          </span>
        </div>
        </div>
      </Wrap>
    </>
  );
}

/* ---- 5. How Heyday runs your day (sideways scroll 1) ---------------- */

/**
 * The whole-workflow idea, which is the one thing a visitor must not
 * miss — it is what separates Heyday from every rival that runs the
 * paperwork and stops there. So it takes the scroll: the section pins and
 * the twelve steps travel sideways.
 *
 * Twice on the homepage and nowhere else. Taking someone's scroll is a
 * strong move and it stops working the third time.
 */
export function WorkflowScroll() {
  return (
    <SideScroll
      head={
        <SectionReveal>
          <SheetLabel>how heyday runs your day</SheetLabel>
          <h2 className="hd-h2 max-w-[24ch]">
            One workflow for your whole business,{" "}
            <span className="hd-hl">from the first hello to the next booking.</span>
          </h2>
        </SectionReveal>
      }
    >
      {FLOW.map((s) => {
        const group = GROUPS.find((g) => g.id === s.group)!;
        return (
          <SideCard
            key={`${s.group}-${s.step}`}
            group={group.name.toUpperCase()}
            title={s.step}
            style={{ backgroundColor: PAPER }}
          >
            <span className="flex items-center gap-2">
              <HeydayLogo size={24} colour={group.markColour} />
              <Icon name={s.icon} size={26} ground={PAPER} />
            </span>
            <p className="m-0 text-[15.5px] text-ink/60">{s.line}</p>
          </SideCard>
        );
      })}

      {/* The end card carries the thread that runs through all six groups.
          Ink, so it reads as the conclusion rather than a thirteenth step. */}
      <SideCard
        title="It runs itself"
        className="justify-center"
        style={{ backgroundColor: INK, color: CREAM }}
      >
        <HeydayLogo size={40} colour={CREAM} motion="spin" />
        <p className="m-0 text-[15.5px] text-cream/80">
          You oversee the exceptions. Heyday does the rest.
        </p>
        <Link
          href="/how-it-works"
          className="font-display text-sm font-semibold text-cream underline underline-offset-[3px]"
        >
          See how it works →
        </Link>
      </SideCard>
    </SideScroll>
  );
}

/* ---- 4. The statement, and 4a's heading ----------------------------- */

export function StatementHead() {
  return (
    <SectionReveal>
      <SheetLabel>why Heyday</SheetLabel>
    </SectionReveal>
  );
}

export function StatBandHead() {
  return (
    <SectionReveal>
      <div className="flex justify-center">
        <SheetLabel>what a business cares about most</SheetLabel>
      </div>
      <h2 className="hd-h2 mx-auto max-w-[24ch]">
        Time back. Money in. <span className="hd-hl">Happy customers.</span>
      </h2>
    </SectionReveal>
  );
}


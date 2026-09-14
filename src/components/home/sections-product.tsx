import Link from "next/link";
import { Wrap, SheetLabel } from "@/components/heyday/sheet";
import { SectionReveal, RevealGroup, Parallax } from "@/components/heyday/motion";
import { Icon } from "@/components/heyday/icon";
import { SectionMark } from "@/components/heyday/heyday-mark";
import { MoreInfoSection } from "@/components/heyday/more-info-section";
import { StickyScroll, type StickyBlock } from "@/components/heyday/sticky-scroll";
import { SideScroll, SideCard } from "@/components/heyday/side-scroll";
import { Card, Sticker, StatusChip } from "@/components/ui/surfaces";
import { Button } from "@/components/ui/button";
import { Screen, ScreenRow, ScreenAction, ScreenPick } from "@/components/heyday/screen";
import { FEATURE_ROWS, ONLY_ON_HEYDAY, BUILDER_POINTS, AI_LEVELS } from "@/lib/home-content";
import { GROUPS, groupById } from "@/lib/groups";
import { statByRow } from "@/lib/stats-bank";
import { PAPER, CREAM, INK, BLUE, SKY } from "@/lib/palette";

/* ==================================================================== *
 *  Homepage sections 6 to 10 — the product itself.
 * ==================================================================== */

/* ---- 6. The four "Stop…" feature rows -------------------------------- */

/**
 * The four biggest everyday pains, each one fixed.
 *
 * This keeps Russell's treatment from Addendum 34 — the highlighted phrase
 * inside the headline, alternating sides, no dividers — rather than the
 * gsap-faithful version I once replaced it with. He was right and it is
 * recorded as a deliberate divergence. What the brief adds on top is the
 * section mark: each row's shape is its group's, and it grows to fill the
 * row when you ask for more.
 *
 * Each row is its own sheet on the page, so they alternate colour as well
 * as side.
 */
export function FeatureRow({ index }: { index: number }) {
  const row = FEATURE_ROWS[index];
  const group = groupById(row.group)!;
  const stat = row.stat ? statByRow(row.stat) : null;
  const dark = group.colour === INK;

  return (
    <MoreInfoSection
      group={group}
      headline={row.headline}
      highlight={row.highlight}
      line={row.line}
      detail={
        <div className={dark ? "text-cream" : undefined}>
          <h3 className="hd-h2">{row.detailHeading}</h3>
          <div className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {row.cards.map((c) => (
              <Card
                key={c.title}
                className="flex gap-3 p-4 text-ink"
                style={{ backgroundColor: PAPER }}
              >
                <Icon name={c.icon} size={40} ground={PAPER} />
                <div>
                  <b className="font-display text-base font-bold">{c.title}</b>
                  <p className="mt-1 text-[14.5px] text-ink/60">{c.body}</p>
                </div>
              </Card>
            ))}
          </div>

          {/* A statistic appears only where one is approved for this row.
              Three of the four rows have none, and they say nothing rather
              than borrowing a number from a neighbouring claim. */}
          {stat ? (
            <p className="mb-5 text-[15px]">
              {stat.claim}
              <small className="ml-1.5 font-mono text-xs opacity-75">
                {stat.source} · {stat.covers} · {stat.kind}
              </small>
            </p>
          ) : null}
        </div>
      }
    />
  );
}

/* ---- 7. What it does (the sticky scroll) ----------------------------- */

/**
 * The whole product in one scroll, one block per group: the copy moves,
 * the picture changes to match. HoneyBook's device, which is the one thing
 * their site does better than Jobber's.
 */
export function WhatItDoes() {
  const blocks: StickyBlock[] = [
    {
      id: "get-ahead",
      label: "get ahead",
      title: "Ready before the first enquiry.",
      colour: GROUPS[0].ground,
      body: (
        <>
          Set up your prices, packages, rules and team once, with AI filling
          in the hard parts (coming soon).
        </>
      ),
      links: [
        { label: "AI setup assistant", href: "/features/ai-setup-assistant" },
        { label: "Policies and procedures", href: "/features/policies-and-procedures" },
        { label: "Integrations", href: "/features/integrations" },
      ],
      picture: (
        <Screen title="Setting you up">
          <ScreenRow meta="done">Read your website</ScreenRow>
          <ScreenRow meta="8 packages" hot>
            Drafted your price list
          </ScreenRow>
          <ScreenRow meta="waiting">Your rules and policies</ScreenRow>
          <ScreenAction>Check and save</ScreenAction>
        </Screen>
      ),
    },
    {
      id: "get-found",
      label: "get found",
      title: "Be the one they find.",
      colour: GROUPS[1].ground,
      body: (
        <>
          Your own booking page with the instant quote built in, a listing on
          the Heyday marketplace, and every other platform in one diary.
        </>
      ),
      links: [
        { label: "Booking page", href: "/features/booking-page" },
        { label: "Get listed", href: "/features/marketplace-listing" },
        { label: "Sell everywhere", href: "/features/sell-everywhere" },
      ],
      picture: (
        <Screen title="[Your business name]">
          <ScreenRow meta="Saturday">Date</ScreenRow>
          <ScreenRow meta="40">Guests</ScreenRow>
          <ScreenRow meta="4 hours">How long</ScreenRow>
          <ScreenRow meta="example data" hot>
            Your price, straight away
          </ScreenRow>
          <ScreenAction>Book now</ScreenAction>
        </Screen>
      ),
    },
    {
      id: "win-the-client",
      label: "win the client",
      title: "Every enquiry caught, priced and booked.",
      colour: GROUPS[2].ground,
      body: (
        <>
          Instant quotes, online booking, classes and tickets, and follow-ups
          that stop when they reply.
        </>
      ),
      links: [
        { label: "Instant quotes", href: "/features/quotes" },
        { label: "Online booking", href: "/features/online-booking" },
        { label: "Classes and tickets", href: "/features/classes-and-tickets" },
        { label: "Follow-ups", href: "/features/follow-ups" },
      ],
      picture: (
        <Screen title="Your quote">
          <ScreenRow meta="40">Guests</ScreenRow>
          <ScreenPick
            items={[
              { label: "Good" },
              { label: "Better", hot: true },
              { label: "Best" },
            ]}
          />
          <ScreenRow meta="example data">Total</ScreenRow>
          <ScreenRow meta="example data">Deposit today</ScreenRow>
          <ScreenAction>Book and pay deposit</ScreenAction>
        </Screen>
      ),
    },
    {
      id: "run-the-day",
      label: "run the day",
      title: "The planning, the team and the day itself, handled.",
      colour: GROUPS[3].ground,
      body: (
        <>
          Scheduling, shift offers, client records, one inbox, and hiring and
          onboarding.
        </>
      ),
      links: [
        { label: "Scheduling", href: "/features/scheduling" },
        { label: "Shift offers", href: "/features/shift-offers" },
        { label: "One inbox", href: "/features/inbox" },
        { label: "Hiring and onboarding", href: "/features/hiring-and-onboarding" },
      ],
      picture: (
        <Screen title="The customer">
          <ScreenRow meta="email">&ldquo;Can we move it to the 14th?&rdquo;</ScreenRow>
          <ScreenRow meta="WhatsApp">&ldquo;And two more guests&rdquo;</ScreenRow>
          <ScreenRow meta="call note">Asked about parking</ScreenRow>
          <ScreenRow meta="ready to approve" hot>
            Draft reply, with the booking in it
          </ScreenRow>
          <ScreenAction>Approve and send</ScreenAction>
        </Screen>
      ),
    },
    {
      id: "get-paid",
      label: "get paid",
      title: "Every payment in. Every payout out.",
      colour: GROUPS[4].ground,
      body: (
        <>
          Deposits and balances, invoices and chasing, team pay, and profit
          per job.
        </>
      ),
      links: [
        { label: "Payments and deposits", href: "/features/payments" },
        { label: "Invoicing and chasing", href: "/features/invoicing" },
        { label: "Profit per job", href: "/features/profit-per-job" },
        { label: "Reports", href: "/features/reporting" },
      ],
      picture: (
        <Screen title="Payments">
          <ScreenRow meta="paid">Deposit</ScreenRow>
          <ScreenRow meta="due in 7 days">Balance</ScreenRow>
          <ScreenRow meta="sent by WhatsApp" hot>
            Reminder
          </ScreenRow>
          <ScreenAction>Pay the team</ScreenAction>
        </Screen>
      ),
    },
    {
      id: "get-rebooked",
      label: "get rebooked",
      title: "Happy customers come back, and bring their friends.",
      colour: GROUPS[5].ground,
      body: (
        <>
          Next-day feedback, a referral code before the review ask, gift
          vouchers and loyalty.
        </>
      ),
      links: [
        { label: "Reviews", href: "/features/reviews" },
        { label: "Referrals", href: "/features/referrals" },
        { label: "Gift vouchers", href: "/features/gift-vouchers" },
        { label: "Loyalty", href: "/features/loyalty" },
      ],
      picture: (
        <Screen title="The day after">
          <ScreenRow meta="next morning">How did we do?</ScreenRow>
          <ScreenRow meta="before the review ask">
            Their referral code
          </ScreenRow>
          <ScreenAction>Leave a review</ScreenAction>
        </Screen>
      ),
    },
  ];

  return (
    <Wrap>
      <SectionReveal>
        <SheetLabel>what it does</SheetLabel>
        <h2 className="hd-h2 max-w-[24ch]">
          One place for the whole job,{" "}
          <span className="hd-hl">from first hello to five stars.</span>
        </h2>
      </SectionReveal>
      <div className="mt-16">
        <StickyScroll blocks={blocks} />
      </div>
    </Wrap>
  );
}

/* ---- 8. Build it your way -------------------------------------------- */

export function BuildYourWay() {
  return (
    <Wrap>
      <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)]">
        <SectionReveal>
          <SheetLabel>build it your way</SheetLabel>
          <h2 className="hd-h2">
            Build it <span className="hd-hl">your way</span>.
          </h2>
          <p className="hd-sub">
            Drag in a step. Click it to make it yours. Heyday runs it every
            time.
          </p>
          <ul className="mb-6 grid list-none gap-3.5 p-0">
            {BUILDER_POINTS.map((p) => (
              <li key={p.line} className="flex items-center gap-3 font-medium">
                <Icon name={p.icon} size={40} ground={BLUE} />
                {p.line}
              </li>
            ))}
          </ul>
          <Button href="/features/follow-ups" variant="ghost">
            See follow-ups and automations →
          </Button>
        </SectionReveal>

        {/* The picture is the workflow-builder still from the pack. A demo
            video replaces it later; until then the chip says so rather than
            leaving a poster that looks like a video that will not play. */}
        <Parallax amount={30}>
          <div
            className="relative rounded-[40px] border border-ink p-5"
            style={{
              backgroundColor: BLUE,
              boxShadow: "6px 10px 0 0 rgba(10,10,10,0.08)",
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/placeholders/workflow-builder.svg"
              alt="The workflow builder: steps dragged into a workflow, each one saying in plain words what it does"
              className="block w-full rounded-[22px]"
            />
            <span
              className="absolute right-8 top-8 rounded-full border border-ink px-3 py-1.5 font-mono text-xs font-semibold"
              style={{ backgroundColor: PAPER }}
            >
              Demo video coming soon
            </span>
          </div>
        </Parallax>
      </div>
    </Wrap>
  );
}

/* ---- 9. The AI -------------------------------------------------------- */

/**
 * Three levels, joined by the Heyday line, which is the whole argument: the
 * levels go UP, and the owner decides how far. The line filling left to
 * right is the picture of that.
 */
export function AiLevels() {
  return (
    <Wrap>
      <SectionReveal>
        <SheetLabel>the ai</SheetLabel>
        <h2 className="hd-h2 max-w-[24ch]">
          AI that works the way you do,{" "}
          <span className="hd-hl">and only as much as you want.</span>
        </h2>
        <p className="hd-sub">
          It reads the booking, your prices and your policies before it
          writes a word. You decide what it sends.
        </p>
      </SectionReveal>

      <div className="relative">
        {/* The line behind the three panels. */}
        <span
          aria-hidden
          className="absolute left-[8%] right-[8%] top-[58px] -z-10 hidden h-0.5 lg:block"
          style={{ backgroundColor: "#F26B2A" }}
        />
        <RevealGroup className="grid gap-5 lg:grid-cols-3">
          {AI_LEVELS.map((l) => (
            <div
              key={l.title}
              className="flex flex-col gap-3 rounded-[32px] border border-ink px-6 py-7"
              style={{
                backgroundColor: PAPER,
                boxShadow: "6px 10px 0 0 rgba(10,10,10,0.08)",
              }}
            >
              <SectionMark shape={l.shape} size={60} colour={BLUE} />
              <b className="font-display text-[22px] font-bold">{l.title}</b>
              <p className="m-0 text-ink/60">{l.line}</p>
              {l.soon ? <StatusChip /> : null}
            </div>
          ))}
        </RevealGroup>
      </div>

      <div className="mt-8">
        <Button href="/features/ai" variant="ghost">
          How the AI works →
        </Button>
      </div>
    </Wrap>
  );
}

/* ---- 10. Only on Heyday (sideways scroll 2) --------------------------- */

export function OnlyOnHeyday() {
  return (
    <SideScroll
      head={
        <SectionReveal>
          <div className="flex flex-wrap items-center gap-4">
            <SheetLabel>only on heyday</SheetLabel>
            <Sticker
              className="px-3 py-1.5 font-display text-[13px] font-bold"
              tilt={-6}
              style={{ backgroundColor: "#D6D0F5", boxShadow: "6px 6px 0 0 rgba(10,10,10,0.08)" }}
            >
              Only on Heyday
            </Sticker>
          </div>
          <h2 className="hd-h2 max-w-[20ch]">
            The things <span className="hd-hl">neither of them</span> does.
          </h2>
        </SectionReveal>
      }
    >
      {ONLY_ON_HEYDAY.map((c) => (
        <SideCard
          key={c.title}
          title={c.title}
          style={{ backgroundColor: PAPER }}
        >
          <Icon name={c.icon} size={40} ground={PAPER} />
          <p className="m-0 text-[15.5px] text-ink/60">{c.line}</p>
          <div className="mt-auto flex items-center justify-between gap-3">
            <StatusChip />
            <Link
              href={c.href}
              className="font-display text-sm font-semibold underline underline-offset-[3px]"
            >
              See it →
            </Link>
          </div>
        </SideCard>
      ))}

      <SideCard
        title="See every feature"
        className="justify-center"
        style={{ backgroundColor: INK, color: CREAM }}
      >
        <SectionMark shape="inf" size={40} colour={SKY} />
        <Link
          href="/features?filter=only-on-heyday"
          className="font-display text-sm font-semibold text-cream underline underline-offset-[3px]"
        >
          See every feature →
        </Link>
      </SideCard>
    </SideScroll>
  );
}

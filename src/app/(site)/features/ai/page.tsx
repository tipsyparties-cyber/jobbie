import type { Metadata } from "next";
import Link from "next/link";
import {
  PageHero,
  CTABlock,
  FAQ,
  Breadcrumbs,
} from "@/components/heyday/page-shell";
import { Sheet, Wrap, SheetLabel } from "@/components/heyday/sheet";
import { SectionReveal, RevealGroup } from "@/components/heyday/motion";
import { StickyScroll, type StickyBlock } from "@/components/heyday/sticky-scroll";
import { Icon } from "@/components/heyday/icon";
import { Card, Sticker, StatusChip } from "@/components/ui/surfaces";
import { Button } from "@/components/ui/button";
import { Screen, ScreenRow, ScreenAction } from "@/components/heyday/screen";
import { statByRow } from "@/lib/stats-bank";
import { featureBySlug, featureHref } from "@/lib/heyday-features";
import { CTA, TBC } from "@/lib/site";
import { PAPER, CREAM, SKY, LAVENDER } from "@/lib/palette";

/* ==================================================================== *
 *  /features/ai — template T11, spec part 2, and the working page at
 *  reference/site/ai.html.
 *
 *  The page leads with what the owner controls, not with what the AI can
 *  do, and that ordering is the whole argument. Every rival's AI page
 *  opens by listing capabilities, which is exactly the thing that worries
 *  a small business owner: software that answers customers in their name
 *  without asking. So the first sentence on this page is the limit, not
 *  the promise.
 *
 *  The three levels run as a sticky scroll on ONE email, so you watch the
 *  same message being drafted, corrected and then sent alone. The mark
 *  climbs with it: sun, Loop, Infinity.
 *
 *  Level 3 says "Coming soon" and so does every AI feature, because none
 *  of it is live. The safeguards are listed in full even though nothing
 *  is switched on yet — they are the reason to believe, and hiding them
 *  until launch would mean the page argues for trust without earning it.
 * ==================================================================== */

export const metadata: Metadata = {
  title:
    "Heyday AI: replies, setup and a receptionist, only as much as you want | Heyday",
  description:
    "You choose how much the AI does. It drafts, you approve — or at level 3 it sends the types of message you switch on, inside your rules. Turn it off with one switch.",
};

const AI_FEATURES: { slug: string; line: string }[] = [
  {
    slug: "replies-that-write-themselves",
    line: "Drafts every reply from the conversation, the client’s record, the booking, your policies and your availability.",
  },
  {
    slug: "enquiries",
    line: "Sorts every message by who sent it, and spots when it belongs to an enquiry already open.",
  },
  {
    slug: "call-notes",
    line: "Every call summarized in the inbox, and a recap email drafted in one click. Voicemails arrive as text.",
  },
  {
    slug: "missed-call-capture",
    line: "Works out who called, adds the call-back to your list, and sends a “Sorry we missed your call” written for who they are.",
  },
  {
    slug: "ai-receptionist",
    line: "Answers calls and texts, takes messages and books.",
  },
  {
    slug: "ai-setup-assistant",
    line: "Reads your website, price list, old emails and policies, and fills in your settings for you to check.",
  },
];

const SAFEGUARDS = [
  {
    title: "One type at a time",
    line: "You switch autopilot on for one type of message at a time.",
  },
  {
    title: "Unsure means draft",
    line: "Anything it isn’t confident about goes back to being a draft for you.",
  },
  {
    title: "A daily list, one off switch",
    line: "See everything it sent each day, and stop it with one switch.",
  },
  {
    title: "People for the big things",
    line: "Refunds, complaints, prices outside your rules and promises always need a person.",
  },
];

export default function AiPage() {
  const stat = statByRow(18)!;

  /* One email, three times. The picture is the same conversation at each
     level, which is what makes "levels" mean something concrete rather
     than being three tiers on a pricing table. */
  const levels: StickyBlock[] = [
    {
      id: "level-1",
      label: "level 1 · ai assistant",
      title: "Level 1: Draft.",
      colour: SKY,
      body: <>The AI writes the reply. A person reads it and presses send.</>,
      picture: (
        <Screen title="Inbox · The customer">
          <ScreenRow meta="the customer">
            &ldquo;Can we add 10 guests?&rdquo;
          </ScreenRow>
          <ScreenRow meta="AI draft" hot>
            &ldquo;Yes! 90 guests comes to $1,610…&rdquo;
          </ScreenRow>
          <ScreenRow meta="booking · price list · policy">It read</ScreenRow>
          <ScreenAction>Send</ScreenAction>
        </Screen>
      ),
    },
    {
      id: "level-2",
      label: "level 2 · ai assistant that learns",
      title: "Level 2: Draft and train.",
      colour: LAVENDER,
      body: (
        <>
          You correct the draft, and each correction becomes a rule it
          follows from then on. It keeps getting closer to how you&rsquo;d
          answer.
        </>
      ),
      picture: (
        <Screen title="AI draft, corrected">
          <ScreenRow meta="you changed it">
            &ldquo;We can’t go over 80 guests.&rdquo;
          </ScreenRow>
          <ScreenRow>
            &ldquo;We can, and the next package up adds a second
            bartender.&rdquo;
          </ScreenRow>
          <ScreenRow meta="always offer the next package up" hot>
            Saved as a rule
          </ScreenRow>
          <ScreenAction>Send</ScreenAction>
        </Screen>
      ),
    },
    {
      id: "level-3",
      label: "level 3 · ai agent",
      title: "Level 3: Autopilot.",
      colour: CREAM,
      body: (
        <>
          <span className="mb-2 inline-block">
            <StatusChip />
          </span>
          <br />
          For the types of message you switch on (where do I park, payment
          reminders, sorry we missed your call), it writes and sends by
          itself, within your rules. It hands over to a person when it
          isn&rsquo;t sure, when a rule would be broken, or when money or a
          promise is involved.
        </>
      ),
      picture: (
        <Screen title="Sent today">
          <ScreenRow meta="sent ✓">&ldquo;Where do I park?&rdquo;</ScreenRow>
          <ScreenRow meta="sent ✓">Payment reminder</ScreenRow>
          <ScreenRow meta="sent ✓">Sorry we missed your call</ScreenRow>
          <ScreenRow meta="handed to you" hot>
            Refund request
          </ScreenRow>
          <ScreenAction>See the day’s list</ScreenAction>
        </Screen>
      ),
    },
  ];

  return (
    <>
      <PageHero
        label="the ai"
        crumbs={
          <Breadcrumbs
            items={[
              { label: "Features", href: "/features" },
              { label: "The AI" },
            ]}
          />
        }
        h1="You choose how much the AI does."
        highlight="how much"
        sub={
          <>
            It reads the booking, your prices and your policies before it
            writes a word. You decide what it sends.
          </>
        }
        actions={
          <>
            <Button href={CTA.primary.href} variant="primary" arrow>
              {CTA.primary.label}
            </Button>
            <Button href={CTA.secondary.href} variant="ghost">
              {CTA.secondary.label}
            </Button>
          </>
        }
      />

      {/* The three levels. */}
      <Sheet colour={PAPER}>
        <Wrap>
          <SectionReveal>
            <SheetLabel>three levels</SheetLabel>
            <h2 className="hd-h2 max-w-[24ch]">
              Start safe.{" "}
              <span className="hd-hl">Hand over more as trust grows.</span>
            </h2>
          </SectionReveal>
          <div className="mt-14">
            <StickyScroll blocks={levels} />
          </div>
        </Wrap>
      </Sheet>

      {/* Assistant or agent, in plain words. */}
      <Sheet colour={LAVENDER}>
        <Wrap>
          <SectionReveal>
            <SheetLabel>in plain words</SheetLabel>
            <h2 className="hd-h2">
              Assistant or <span className="hd-hl">agent</span>?
            </h2>
            <div className="grid max-w-[900px] gap-6 lg:grid-cols-2">
              <p className="m-0 text-lg">
                <b className="block font-display font-bold">
                  AI assistant (levels 1 and 2):
                </b>
                it suggests, and you decide.
              </p>
              <p className="m-0 text-lg">
                <b className="block font-display font-bold">
                  AI agent (level 3):
                </b>
                it decides and acts, inside the rules you set. That&rsquo;s
                what people mean by &ldquo;agentic&rdquo;.
              </p>
            </div>
            <p className="mt-6 max-w-[60ch] text-ink/65">
              An AI agent is software that does a job for you.
              &ldquo;Agentic&rdquo; describes how much it acts on its own,
              rather than only suggesting.
            </p>
          </SectionReveal>
        </Wrap>
      </Sheet>

      {/* The promise and the safeguards. */}
      <Sheet colour={CREAM}>
        <Wrap>
          <SectionReveal>
            <SheetLabel>the promise</SheetLabel>
            <div className="flex flex-wrap items-center gap-4">
              <h2 className="hd-h2 mb-0">
                The AI drafts. <span className="hd-hl">You approve.</span>
              </h2>
              <Sticker
                className="px-3 py-1.5 font-display text-[13px] font-bold"
                tilt={-6}
                style={{
                  backgroundColor: LAVENDER,
                  boxShadow: "6px 6px 0 0 rgba(10,10,10,0.08)",
                }}
              >
                Only on Heyday
              </Sticker>
            </div>
            <p className="hd-sub mt-4">
              That&rsquo;s the promise at levels 1 and 2. If you choose level
              3, these safeguards are always on:
            </p>
          </SectionReveal>

          <RevealGroup className="grid gap-[22px] sm:grid-cols-2 lg:grid-cols-4">
            {SAFEGUARDS.map((s) => (
              <Card
                key={s.title}
                className="h-full p-6"
                style={{ backgroundColor: PAPER }}
              >
                <b className="block font-display text-[19px] font-bold leading-[1.25]">
                  {s.title}
                </b>
                <p className="mt-1.5 text-[15px] text-ink/60">{s.line}</p>
              </Card>
            ))}
          </RevealGroup>
        </Wrap>
      </Sheet>

      {/* The AI features. */}
      <Sheet colour={PAPER}>
        <Wrap>
          <SectionReveal>
            <SheetLabel>ai features</SheetLabel>
            <h2 className="hd-h2 max-w-[22ch]">
              AI where it <span className="hd-hl">saves you time</span>.
            </h2>
          </SectionReveal>
          <RevealGroup className="mt-8 grid gap-[22px] sm:grid-cols-2 lg:grid-cols-3">
            {AI_FEATURES.map((f) => {
              const feature = featureBySlug(f.slug);
              return (
                <Card
                  key={f.slug}
                  className="flex h-full flex-col gap-2 p-6"
                  style={{ backgroundColor: PAPER }}
                >
                  <Icon
                    name={feature?.icon ?? "hd-ai-replies"}
                    size={40}
                    ground={PAPER}
                  />
                  <b className="font-display text-[19px] font-bold">
                    {feature?.name ?? f.slug}
                  </b>
                  <p className="m-0 text-[15px] text-ink/60">{f.line}</p>
                  <div className="mt-auto flex items-center justify-between gap-2 pt-3">
                    <StatusChip />
                    <Link
                      href={featureHref(f.slug)}
                      className="font-display text-sm font-semibold underline underline-offset-[3px]"
                    >
                      See it →
                    </Link>
                  </div>
                </Card>
              );
            })}
          </RevealGroup>
        </Wrap>
      </Sheet>

      {/* One statistic, with its whole provenance. */}
      <Sheet colour={SKY}>
        <Wrap>
          <SectionReveal>
            <SheetLabel>why it matters</SheetLabel>
            <div className="grid items-center gap-6 lg:grid-cols-[auto_minmax(0,1fr)]">
              <p
                className="m-0 font-display font-extrabold leading-none tracking-[-0.04em]"
                style={{ fontSize: "clamp(56px, 7vw, 96px)" }}
              >
                {stat.headline?.value}
              </p>
              <div>
                <p className="m-0 text-lg">{stat.claim}</p>
                <p className="mt-2 font-mono text-xs text-ink/55">
                  {stat.source}. {stat.covers}. {stat.kind}. Stats bank row{" "}
                  {stat.row}.
                </p>
              </div>
            </div>
          </SectionReveal>
        </Wrap>
      </Sheet>

      {/* The FAQ. Only questions the briefs can answer honestly — the two
          about plans and cost say [TBC], because they are. */}
      <Sheet colour={CREAM}>
        <Wrap>
          <SectionReveal>
            <SheetLabel>faq</SheetLabel>
            <FAQ
              heading="Questions about the AI."
              items={[
                {
                  q: "Does the AI send anything without me?",
                  a: "Not at levels 1 and 2. Only at level 3, and only for the types of message you switch on.",
                },
                {
                  q: "What does it read before it writes?",
                  a: "The conversation so far, the client’s record, the booking’s live situation, your policies and procedures, your prices and your availability.",
                },
                {
                  q: "Can I turn it off?",
                  a: "Yes. Level 3 has one switch to stop it, and each type of message is switched on separately.",
                },
                {
                  q: "Which plans include which level?",
                  a: `${TBC.generic}. Plans aren’t decided yet.`,
                },
                {
                  q: "What does it cost to run?",
                  a: `${TBC.generic}. The cost controls will show it.`,
                },
              ]}
            />
          </SectionReveal>
        </Wrap>
      </Sheet>

      <CTABlock />
    </>
  );
}

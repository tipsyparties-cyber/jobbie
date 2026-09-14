"use client";

import { Button } from "@/components/ui/button";
import { Panel, Card, Sticker, StatusChip } from "@/components/ui/surfaces";
import { HeydayMark, SectionMark } from "@/components/heyday/heyday-mark";
import { HeydayLine } from "@/components/heyday/heyday-line";
import { Icon } from "@/components/heyday/icon";
import { RisingCards } from "@/components/heyday/rising-cards";
import { MoreInfoSection } from "@/components/heyday/more-info-section";
import { SectionReveal, RevealGroup, Parallax } from "@/components/heyday/motion";
import { Wordmark } from "@/components/ui/wordmark";
import { GROUPS, RUNS_ITSELF } from "@/lib/groups";
import { HERO_CARDS } from "@/lib/hero-cards";
import {
  INK,
  ORANGE,
  CREAM,
  PAPER,
  SAGE,
  BLUE,
  SKY,
  LAVENDER,
  YELLOW,
} from "@/lib/palette";

/* ==================================================================== *
 *  The style guide.
 *
 *  One page holding every component and every kind of motion from Part A,
 *  with the brief's section reference beside each so a disagreement can be
 *  settled by looking it up rather than by arguing.
 * ==================================================================== */

const SWATCHES: [string, string, string][] = [
  ["ink", INK, "Text, outlines, shadows"],
  ["orange", ORANGE, "Actions only. A fill, never text"],
  ["cream", CREAM, "Resting ground"],
  ["paper", PAPER, "Cards"],
  ["sage", SAGE, "Ground"],
  ["blue", BLUE, "Ground"],
  ["sky", SKY, "Ground"],
  ["lavender", LAVENDER, "Ground. Too pale for a mark on paper"],
  ["yellow", YELLOW, "Highlight only. Never beside orange"],
];

function Ref({ children }: { children: React.ReactNode }) {
  return (
    <span className="ml-3 font-mono text-[12px] tracking-[0.02em] text-ink/40">
      {children}
    </span>
  );
}

function Section({
  title,
  refs,
  children,
}: {
  title: string;
  refs: string;
  children: React.ReactNode;
}) {
  return (
    <section className="border-t border-ink/12 py-14">
      <h2 className="font-display text-2xl font-semibold tracking-[-0.02em]">
        {title}
        <Ref>{refs}</Ref>
      </h2>
      <div className="mt-8">{children}</div>
    </section>
  );
}

export function StyleguideBody() {
  return (
    <main className="mx-auto max-w-[1200px] px-6 py-16" style={{ backgroundColor: PAPER }}>
      <header className="pb-10">
        <Wordmark height={32} asLink={false} />
        <h1 className="mt-8 font-display text-4xl font-semibold tracking-[-0.03em]">
          Style guide
        </h1>
        <p className="mt-4 max-w-2xl font-body text-base leading-relaxed text-ink/65">
          Every component and every kind of motion from Part A of the design
          brief, with its section reference. Not indexed, not linked from the
          site.
        </p>
      </header>

      {/* ---- Colour ---- */}
      <Section title="Colour" refs="A2">
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {SWATCHES.map(([name, hex, use]) => (
            <div key={name}>
              <div
                className="h-20 w-full rounded-xl border border-ink/15"
                style={{ backgroundColor: hex }}
              />
              <p className="mt-2 font-mono text-[12px] tracking-[0.02em]">{name}</p>
              <p className="font-mono text-[11px] text-ink/45">{hex}</p>
              <p className="mt-1 font-body text-xs leading-snug text-ink/55">{use}</p>
            </div>
          ))}
        </div>
        <p className="mt-6 max-w-2xl font-body text-sm leading-relaxed text-ink/60">
          Orange is a fill and never a text colour — orange text on cream fails
          contrast. Buttons are orange with ink text, which is about 6:1 and
          passes AA; white on orange does not. Orange and yellow never touch;
          where they would meet, the button goes ink.
        </p>
      </Section>

      {/* ---- Type ---- */}
      <Section title="Type" refs="A3">
        <div className="space-y-6">
          <div>
            <p className="font-mono text-[12px] text-ink/40">font-hero · Plus Jakarta Sans</p>
            <p className="font-hero text-5xl font-semibold tracking-[-0.04em]">
              Hero headline
            </p>
          </div>
          <div>
            <p className="font-mono text-[12px] text-ink/40">
              font-display · Schibsted Grotesk, standing in for Cabinet Grotesk
            </p>
            <p className="font-display text-3xl font-semibold tracking-[-0.02em]">
              Headings, buttons and card titles
            </p>
          </div>
          <div>
            <p className="font-mono text-[12px] text-ink/40">font-body · Inter</p>
            <p className="max-w-2xl font-body text-base leading-relaxed">
              Body copy. Everything a visitor actually reads at length sits
              here, at a measure of about sixty-five characters.
            </p>
          </div>
          <div>
            <p className="font-mono text-[12px] text-ink/40">font-mono · Geist Mono</p>
            <p className="font-mono text-[13px] tracking-[0.02em]">
              {"{ small labels, step numbers, stat sources }"}
            </p>
          </div>
          <p className="max-w-2xl font-body text-sm text-ink/55">
            No serif. Cormorant Garamond reads wedding-soft, which is
            HoneyBook&apos;s territory.
          </p>
        </div>
      </Section>

      {/* ---- Buttons ---- */}
      <Section title="Buttons" refs="A4">
        <div className="flex flex-wrap items-center gap-4">
          <Button variant="primary" arrow>
            Start free trial
          </Button>
          <Button variant="ghost">Book a demo</Button>
          <span className="inline-block rounded-xl p-4" style={{ backgroundColor: YELLOW }}>
            <Button variant="dark">On yellow, the button goes ink</Button>
          </span>
        </div>
        <p className="mt-6 max-w-2xl font-body text-sm leading-relaxed text-ink/60">
          Hover or tab to one: only the corner radius changes, 8px to a pill
          in 0.2s. Nothing lifts, glows or changes colour.
        </p>
      </Section>

      {/* ---- Surfaces ---- */}
      <Section title="Panels, cards and stickers" refs="A5">
        <div className="grid gap-8 md:grid-cols-3">
          <Panel>
            <p className="font-display text-lg font-semibold">Panel</p>
            <p className="mt-2 font-body text-sm text-ink/65">
              1px border, 40px radius, shadow 6px 10px. Big content blocks.
            </p>
          </Panel>
          <Card className="bg-paper p-6">
            <p className="font-display text-lg font-semibold">Card</p>
            <p className="mt-2 font-body text-sm text-ink/65">
              2px border, 16px radius, shadow 11px 11px. Hovering does not
              move it.
            </p>
          </Card>
          <div>
            <Sticker className="bg-paper p-6">
              <p className="font-display text-lg font-semibold">Sticker</p>
              <p className="mt-2 font-body text-sm text-ink/65">
                Tilted −8°. Straightens on hover. Three per screen at most.
              </p>
            </Sticker>
          </div>
        </div>
        <div className="mt-8 flex gap-3">
          <StatusChip status="Coming soon" />
          <StatusChip status="Live" />
        </div>
      </Section>

      {/* ---- The mark ---- */}
      <Section title="The Heyday sun, and the section marks" refs="A11">
        <div className="flex flex-wrap items-end gap-10">
          <div>
            <HeydayMark shape="sun" sun={BLUE} size={120} label="The Heyday sun" />
            <p className="mt-2 font-mono text-[12px] text-ink/45">sun · blue on paper</p>
          </div>
          {GROUPS.map((g) => (
            <div key={g.id}>
              <HeydayMark shape={g.shape} sun={g.sun} size={120} morphInView />
              <p className="mt-2 font-mono text-[12px] text-ink/45">
                {g.shape} · {g.name}
              </p>
            </div>
          ))}
          <div>
            <HeydayMark shape={RUNS_ITSELF.shape} sun={RUNS_ITSELF.sun} size={120} morphInView />
            <p className="mt-2 font-mono text-[12px] text-ink/45">inf · It runs itself</p>
          </div>
        </div>
        <p className="mt-8 max-w-2xl font-body text-sm leading-relaxed text-ink/60">
          Each starts as the sun and folds into its shape as it scrolls in, so
          you see where every shape comes from. The sun is always one colour,
          never black and never orange — where a group&apos;s own colour is
          one of those, it falls back to blue.
        </p>

        <p className="mt-10 font-mono text-[12px] text-ink/40">
          Still versions, for menus and breadcrumbs
        </p>
        <div className="mt-3 flex flex-wrap items-center gap-6">
          {GROUPS.map((g) => (
            <span key={g.id} className="flex items-center gap-2">
              <SectionMark shape={g.shape} size={24} colour={g.colour} />
              <span className="font-body text-sm text-ink/70">{g.name}</span>
            </span>
          ))}
        </div>
      </Section>

      {/* ---- Icons ---- */}
      <Section title="The icon family" refs="A7">
        <div className="flex flex-wrap items-end gap-8">
          {GROUPS.map((g) => (
            <div key={g.id}>
              <Icon name={g.icon} size={40} ground={PAPER} />
              <p className="mt-2 font-mono text-[11px] text-ink/45">{g.icon}</p>
            </div>
          ))}
        </div>
        <div className="mt-8 flex flex-wrap items-center gap-6">
          {GROUPS.slice(0, 4).map((g) => (
            <span key={g.id} className="flex items-center gap-2">
              <Icon name={g.icon} size={24} ground={PAPER} />
              <span className="font-body text-sm text-ink/70">small, at 24px</span>
            </span>
          ))}
        </div>
        <p className="mt-6 max-w-2xl font-body text-sm leading-relaxed text-ink/60">
          Full icon at 40px and up, the small version at 24px and under. The
          orange piece carries a halo in the colour behind it, so the ground
          has to be passed in.
        </p>
      </Section>

      {/* ---- The line ---- */}
      <Section title="The Heyday line" refs="A8">
        <HeydayLine
          steps={["Enquiry", "Quote", "Booked", "Staffed", "Paid", "Rebooked"]}
          current={2}
          labels
        />
        <p className="mt-6 max-w-2xl font-body text-sm leading-relaxed text-ink/60">
          Anywhere order matters. Never on a plain list, where it would be
          decoration pretending to be information.
        </p>
      </Section>

      {/* ---- Rise, stagger, parallax ---- */}
      <Section title="The rise, the stagger and the parallax" refs="A6">
        <SectionReveal>
          <p className="font-display text-xl font-semibold">
            This rises in, and sinks away again when you scroll back up.
          </p>
        </SectionReveal>
        <RevealGroup className="mt-8 grid gap-4 sm:grid-cols-3">
          {[1, 2, 3, 4, 5, 6].map((n) => (
            <Card key={n} className="bg-paper p-5">
              <p className="font-mono text-[12px] text-ink/45">Item {n}</p>
              <p className="mt-1 font-body text-sm">Stepped 150ms, capped at the seventh.</p>
            </Card>
          ))}
        </RevealGroup>
        <Parallax className="mt-10">
          <div
            className="h-40 w-full rounded-2xl border border-ink/15"
            style={{ backgroundColor: SKY }}
          />
        </Parallax>
        <p className="mt-4 max-w-2xl font-body text-sm leading-relaxed text-ink/60">
          Parallax stays within ±60px and only on pictures, never on text and
          never on the hero, which has to be readable on the first frame.
        </p>
      </Section>

      {/* ---- Rising cards ---- */}
      <Section title="The hero's rising cards" refs="A9">
        <div className="max-w-xl">
          <RisingCards
            cards={HERO_CARDS.slice(0, 4)}
          />
        </div>
        <p className="mt-6 max-w-2xl font-body text-sm leading-relaxed text-ink/60">
          The pattern and the timing are anyone.com&apos;s; the artwork is
          ours. It pauses off screen and when the tab is hidden, and below
          1280px one card sits still with the line under it.
        </p>
      </Section>

      {/* ---- More info ---- */}
      <Section title="More info: the shape grows into the page" refs="A12">
        <MoreInfoSection
          group={GROUPS[4]}
          headline="Every payment in, every payout out."
          highlight="every payout out"
          line="Deposits, balances, tips and team pay, without a spreadsheet in between."
          detail={
            <div>
              <p className="font-display text-2xl font-semibold">Get paid</p>
              <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {["Payments", "Invoicing", "Tips", "Team pay"].map((t) => (
                  <div key={t} className="rounded-xl border border-current/20 p-4">
                    <p className="font-display text-base font-semibold">{t}</p>
                    <p className="mt-1 font-body text-sm opacity-70">Coming soon</p>
                  </div>
                ))}
              </div>
            </div>
          }
        />
        <p className="mt-6 max-w-2xl font-body text-sm leading-relaxed text-ink/60">
          Press the button: the shape grows around its own core while the core
          swells to close the gaps, until the section is its colour. Escape
          closes it, and focus goes to Back and then returns.
        </p>
      </Section>

      <section className="border-t border-ink/12 py-14">
        <p className="font-body text-sm text-ink/55">
          Reduced motion switches every movement here off, and everything
          stays readable.
        </p>
      </section>
    </main>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import { PageHero, CTABlock, Marked, LineSteps } from "@/components/heyday/page-shell";
import { Sheet, Wrap, SheetLabel } from "@/components/heyday/sheet";
import { SectionReveal, RevealGroup } from "@/components/heyday/motion";
import { SectionMark } from "@/components/heyday/heyday-mark";
import { Icon } from "@/components/heyday/icon";
import { HoldingImage } from "@/components/heyday/holding-image";
import { RotatingLine } from "@/components/heyday/rotating-line";
import { Card, Sticker, StatusChip } from "@/components/ui/surfaces";
import { Button } from "@/components/ui/button";
import { KINDS, TWO_WAYS, GROWTH, ROTATING } from "@/lib/who-its-for";
import { STORIES } from "@/lib/home-content";
import { GROUPS } from "@/lib/groups";
import {
  featuresInGroup,
  featureBySlug,
  featureHref,
} from "@/lib/heyday-features";
import { CTA, SITE } from "@/lib/site";
import { PAPER, CREAM, SKY, LAVENDER } from "@/lib/palette";

/* ==================================================================== *
 *  /who-its-for — template T6, spec part 4, and the working page at
 *  reference/site/who-its-for.html.
 *
 *  One page, six kinds, seven example stories. Not a page per trade:
 *  Jobber's ~1,700 pages are the thing the brief names as NOT to copy,
 *  and the honest answer to "is it for me?" is a rule rather than a list.
 *
 *  The section that earns this page its keep is "one skill, two ways".
 *  Every rival makes an owner choose between proposals for the service
 *  and tickets for the class, so anyone who does both runs two systems
 *  and keeps one diary by hand. That table is the clearest statement on
 *  the site of what Heyday is for, and no rival has a page for it.
 * ==================================================================== */

export const metadata: Metadata = {
  title:
    "Who it's for: events, classes, services and staffing",
  description:
    "For businesses that sell time, skills and experiences: mobile bars, caterers, photographers, class hosts, cleaners, beauty and staffing agencies.",
};

export default function WhoItsForPage() {
  return (
    <>
      <PageHero
        label="who it’s for"
        h1="Built for businesses that sell time, skills and experiences."
        highlight="time, skills and experiences"
        sub={
          <>
            <RotatingLine
              prefix="Built for"
              words={ROTATING}
              className="mb-4 font-display text-2xl font-bold"
            />
            From one person doing every job to a crew on every weekend,
            Heyday runs the whole business, from the first enquiry to the
            next booking.
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

      {/* One skill, two ways. */}
      <Sheet colour={PAPER}>
        <Wrap>
          <SectionReveal>
            <SheetLabel>one skill, two ways</SheetLabel>
            <h2 className="hd-h2 max-w-[24ch]">
              <Marked
                text="Sell the service and the experience, from one diary."
                phrase="from one diary"
              />
            </h2>
          </SectionReveal>

          <div className="mt-8 grid gap-3">
            <div
              className="hidden grid-cols-[170px_1fr_1fr] gap-4 px-[22px] font-mono text-xs tracking-[0.06em] text-ink/55 lg:grid"
              aria-hidden
            >
              <span />
              <span>THE SERVICE</span>
              <span>THE EXPERIENCE</span>
            </div>
            {TWO_WAYS.map((r) => (
              <Card
                key={r.trade}
                className="grid items-center gap-4 px-5 py-3.5 lg:grid-cols-[170px_1fr_1fr]"
                style={{ backgroundColor: PAPER }}
              >
                <b className="font-display text-base font-semibold">{r.trade}</b>
                <span className="text-[15px] text-ink/70">
                  <span className="font-mono text-[11px] text-ink/45 lg:hidden">
                    THE SERVICE{" "}
                  </span>
                  {r.service}
                </span>
                <span className="text-[15px] text-ink/70">
                  <span className="font-mono text-[11px] text-ink/45 lg:hidden">
                    THE EXPERIENCE{" "}
                  </span>
                  {r.experience}
                </span>
              </Card>
            ))}
          </div>

          <p className="mt-6 flex flex-wrap items-center gap-3 text-ink/70">
            Other tools make you choose: proposals for the service, tickets
            for the class. Heyday runs both, plus the team who deliver them.
            <StatusChip />
          </p>
        </Wrap>
      </Sheet>

      {/* The six kinds. Each has the anchor the header menu links to. */}
      <Sheet colour={SKY}>
        <Wrap>
          <SectionReveal>
            <SheetLabel>who it suits</SheetLabel>
            <h2 className="hd-h2 max-w-[24ch]">
              <Marked
                text="If you sell your time, you’ll find yourself here."
                phrase="you’ll find yourself here"
              />
            </h2>
          </SectionReveal>

          <RevealGroup className="mt-10 grid gap-6 lg:grid-cols-2">
            {KINDS.map((k) => (
              <Card
                key={k.slug}
                id={k.slug}
                className="overflow-hidden scroll-mt-28"
                style={{ backgroundColor: PAPER }}
              >
                <HoldingImage
                  art={k.art}
                  ratio="16:9"
                  tint={SKY}
                  radius={0}
                  className="!border-0 !border-b-2"
                />
                <div className="px-5 pb-5 pt-4">
                  <h3 className="m-0 font-display text-[22px] font-bold">
                    {k.name}
                  </h3>
                  <p className="mt-1 text-ink/60">{k.who}</p>
                  {/* The pain in the owner's own words, marked as a quote
                      of the reader rather than of a customer — there are
                      no customers to quote. */}
                  <p className="mt-3 font-display text-lg font-semibold">
                    &ldquo;{k.pain}&rdquo;
                  </p>
                  <div className="mt-3 flex flex-col gap-1.5">
                    {/* The icon comes from the feature's own record, not
                        from a name typed in beside the link — the label
                        here is the plain-words one from the spec, and the
                        icon has to keep following the feature. */}
                    {k.features.map((f) => (
                      <Link
                        key={f.slug}
                        href={featureHref(f.slug)}
                        className="flex items-center gap-2 font-display text-[14.5px] font-semibold"
                      >
                        <Icon
                          name={featureBySlug(f.slug)?.icon ?? "hd-mark"}
                          size={24}
                          ground={PAPER}
                        />
                        {f.label}
                      </Link>
                    ))}
                  </div>
                </div>
              </Card>
            ))}
          </RevealGroup>
        </Wrap>
      </Sheet>

      {/* Not on the list. */}
      <Sheet colour={PAPER}>
        <Wrap>
          <SectionReveal>
            <SheetLabel>not on the list?</SheetLabel>
            <h2 className="hd-h2 max-w-[26ch]">
              <Marked
                text="If you sell your time, your skills or an experience, it’s for you."
                phrase="it’s for you"
              />
            </h2>
            <p className="hd-sub">
              Selling on Togather, ClassBento, Airbnb Experiences, LetsBatch
              or Yuup too? Bring those bookings into the same diary, and win
              customers back to book with you directly.
            </p>
            <div className="flex flex-wrap items-center gap-3">
              <StatusChip />
              <Button href={featureHref("sell-everywhere")} variant="ghost">
                See Sell everywhere →
              </Button>
            </div>
          </SectionReveal>
        </Wrap>
      </Sheet>

      {/* What it fixes, by group. */}
      <Sheet colour={CREAM}>
        <Wrap>
          <SectionReveal>
            <SheetLabel>what it fixes</SheetLabel>
            <h2 className="hd-h2 max-w-[24ch]">
              <Marked
                text="Everything between the enquiry and the encore."
                phrase="the enquiry and the encore"
              />
            </h2>
          </SectionReveal>
          <RevealGroup className="mt-10 grid gap-[22px] sm:grid-cols-2 lg:grid-cols-3">
            {GROUPS.map((g) => (
              <Card
                key={g.id}
                className="flex h-full flex-col gap-2 p-6"
                style={{ backgroundColor: PAPER }}
              >
                <SectionMark shape={g.shape} size={48} colour={g.sun} />
                <b className="font-display text-[22px] font-bold">{g.name}</b>
                <p className="m-0 text-ink/60">{g.promise}</p>
                <div className="mt-2 flex flex-col gap-1.5">
                  {featuresInGroup(g.id)
                    .slice(0, 3)
                    .map((f) => (
                      <Link
                        key={f.slug}
                        href={featureHref(f.slug)}
                        className="flex items-center gap-2 font-display text-[14.5px] font-semibold"
                      >
                        <Icon name={f.icon} size={24} ground={PAPER} />
                        {f.name}
                      </Link>
                    ))}
                </div>
                <Link
                  href={`/how-it-works/${g.id}`}
                  className="mt-auto pt-3 font-display text-sm font-semibold underline underline-offset-[3px]"
                >
                  See how →
                </Link>
              </Card>
            ))}
          </RevealGroup>
        </Wrap>
      </Sheet>

      {/* Grows with you. */}
      <Sheet colour={LAVENDER}>
        <Wrap>
          <SectionReveal>
            <SheetLabel>grows with you</SheetLabel>
            <h2 className="hd-h2 max-w-[26ch]">
              <Marked
                text="From doing it all yourself to a business that runs itself."
                phrase="to a business that runs itself"
              />
            </h2>
          </SectionReveal>
          <LineSteps
            steps={GROWTH.map((s) => ({ title: s.title, body: s.line }))}
          />
          <p className="mt-8 text-ink/70">
            Every business on {SITE.name} can grow this way, from one person
            doing every job to a team run from one system.
          </p>
        </Wrap>
      </Sheet>

      {/* The stories. */}
      <Sheet colour={PAPER}>
        <Wrap>
          <SectionReveal>
            <SheetLabel>stories</SheetLabel>
            <h2 className="hd-h2 max-w-[24ch]">
              <Marked
                text="See how it works for businesses like yours."
                phrase="businesses like yours"
              />
            </h2>
            <p className="hd-sub">
              Every one is an example, not a customer. Heyday is not open to
              other businesses yet, so there is nobody real to quote — these
              are shapes of business, with no invented names, numbers or
              quotes in them.
            </p>
          </SectionReveal>

          <div className="-mx-[clamp(16px,4vw,48px)] flex snap-x snap-mandatory gap-5 overflow-x-auto px-[clamp(16px,4vw,48px)] pb-8 pt-2.5">
            {STORIES.map((s) => (
              <Card
                key={s.slug}
                className="w-[300px] flex-none snap-start overflow-hidden"
                style={{ backgroundColor: PAPER }}
              >
                <HoldingImage art={s.art} ratio="4:3" tint={SKY} radius={0} className="!border-0 !border-b-2" />
                <div className="px-4 pb-[18px] pt-3.5">
                  <span className="font-mono text-[11px] font-semibold text-ink/55">
                    EXAMPLE
                  </span>
                  <b className="mt-1 block font-display text-[17px] font-bold leading-[1.25]">
                    {s.title}
                  </b>
                  <Link
                    href={`/stories/${s.slug}`}
                    className="mt-2 inline-block font-display text-sm font-semibold underline underline-offset-[3px]"
                  >
                    Read the story →
                  </Link>
                </div>
              </Card>
            ))}
          </div>

          <Sticker
            className="mt-2 px-3 py-1.5 font-mono text-xs font-semibold"
            style={{ backgroundColor: LAVENDER }}
          >
            Swipe →
          </Sticker>
        </Wrap>
      </Sheet>

      <CTABlock line="Join early access and help shape it." />
    </>
  );
}

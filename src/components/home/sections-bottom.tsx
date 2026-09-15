import Link from "next/link";
import { Wrap, SheetLabel } from "@/components/heyday/sheet";
import { SectionReveal, RevealGroup, Parallax } from "@/components/heyday/motion";
import { Icon } from "@/components/heyday/icon";
import { HeydayLogoInView } from "@/components/heyday/heyday-logo-in-view";
import { HoldingImage } from "@/components/heyday/holding-image";
import { Card, Sticker, StatusChip } from "@/components/ui/surfaces";
import { Button } from "@/components/ui/button";
import { Screen, ScreenRow } from "@/components/heyday/screen";
import { STORIES, STAGES, SWITCHING, BUSINESS_TYPES } from "@/lib/home-content";
import { SITE, CTA, TBC } from "@/lib/site";
import { PAPER, SKY, ORANGE } from "@/lib/palette";

/* ==================================================================== *
 *  Homepage sections 11 to 15 — who it's for, and the way out.
 * ==================================================================== */

/* ---- 11. Who it's for, and the example stories ----------------------- */

/**
 * Who it suits, told through stories rather than a list of industries.
 *
 * Every card says Example. That is not hedging: Heyday has no customers,
 * and Jobber's equivalent row is real named businesses. A row of
 * story-shaped cards with invented names in them would be the single most
 * dishonest thing on the site, so the cards describe SHAPES of business
 * and carry no names, quotes, logos or numbers.
 *
 * A plain swipe row, not a pinned one — the two pinned scrolls are spent
 * by this point in the page.
 */
export function WhoAndStories() {
  const kinds = Array.from(new Set(BUSINESS_TYPES.map((b) => b.anchor)));
  const KIND_LABELS: Record<string, string> = {
    "events-and-hospitality": "Events and hospitality",
    "classes-and-experiences": "Classes and experiences",
    "photo-video-and-entertainment": "Photo, video and entertainment",
    "home-and-personal-services": "Home and personal services",
    "beauty-wellness-and-fitness": "Beauty, wellness and fitness",
    "staffing-and-hire": "Staffing and hire",
  };

  return (
    <Wrap>
      <SectionReveal>
        <SheetLabel>who it&rsquo;s for</SheetLabel>
        <h2 className="hd-h2 max-w-[24ch]">
          Built for businesses that sell{" "}
          <span className="hd-hl">time, skills and experiences.</span>
        </h2>
        <p className="hd-sub">
          If you sell your time, your skills or an experience, it&rsquo;s for
          you.
        </p>
      </SectionReveal>

      <div className="mb-4 flex flex-wrap gap-2.5">
        {kinds.map((k) => (
          <Link
            key={k}
            href={`/who-its-for#${k}`}
            className="inline-flex items-center rounded-full border border-ink px-3.5 py-1.5 font-display text-sm font-semibold text-ink transition-[border-radius] duration-200 hover:rounded-lg"
            style={{ backgroundColor: PAPER }}
          >
            {KIND_LABELS[k] ?? k}
          </Link>
        ))}
      </div>

      <div className="-mx-[clamp(16px,4vw,48px)] flex snap-x snap-mandatory gap-5 overflow-x-auto px-[clamp(16px,4vw,48px)] pb-8 pt-2.5">
        {STORIES.map((s) => (
          <Card
            key={s.slug}
            className="w-[300px] flex-none snap-start overflow-hidden"
            style={{ backgroundColor: PAPER }}
          >
            <HoldingImage
              art={s.art}
              ratio="4:3"
              tint={SKY}
              radius={0}
              className="!border-0 !border-b-2"
            />
            <div className="px-4 pb-[18px] pt-3.5">
              <span className="flex items-center justify-between gap-2">
                <span className="font-mono text-[11px] font-semibold text-ink/55">
                  Example
                </span>
                <Icon name={s.icon} size={26} ground={PAPER} />
              </span>
              <b className="mt-1 block font-display text-[17px] font-bold leading-[1.25]">
                <Link href={`/stories/${s.slug}`}>{s.title}</Link>
              </b>
            </div>
          </Card>
        ))}
      </div>

      <Button href="/who-its-for" variant="ghost">
        See who it&rsquo;s for →
      </Button>
    </Wrap>
  );
}

/* ---- 12. Grows with you ---------------------------------------------- */

export function GrowsWithYou() {
  return (
    <Wrap>
      <SectionReveal>
        <SheetLabel>grows with you</SheetLabel>
        <h2 className="hd-h2 max-w-[24ch]">
          From doing it all yourself{" "}
          <span className="hd-hl">to a business that runs itself.</span>
        </h2>
      </SectionReveal>

      <div className="relative mt-10">
        <span
          aria-hidden
          className="absolute left-[4%] right-[4%] top-1/2 -z-10 hidden h-0.5 bg-ink/25 lg:block"
        />
        <RevealGroup className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {STAGES.map((s) => (
            <Sticker
              key={s.title}
              className="block w-full p-[22px]"
              style={{ backgroundColor: "#fff" }}
            >
              <Icon name={s.icon} size={40} ground="#fff" />
              <b className="mt-2 block font-display text-[19px] font-bold leading-[1.25]">
                {s.title}
              </b>
              <p className="mt-1.5 text-[15px] text-ink/60">{s.line}</p>
            </Sticker>
          ))}
        </RevealGroup>
      </div>
    </Wrap>
  );
}

/* ---- 13. Sell everywhere --------------------------------------------- */

/**
 * The marketplaces they already sell on are not a rival to argue with —
 * they are bookings the owner has already won. Saying "keep them" is the
 * whole point: Heyday's claim is the one diary, not the one channel.
 */
export function SellEverywhere() {
  const WEEK = [
    { day: "Mon", items: [] as { what: string; from: string; clash?: boolean }[] },
    { day: "Tue", items: [{ what: "Cocktail class", from: "the marketplace" }] },
    { day: "Wed", items: [] },
    { day: "Thu", items: [{ what: "Private party", from: "your booking page" }] },
    {
      day: "Fri",
      items: [
        { what: "Workshop", from: "another platform" },
        { what: "Corporate bar", from: "repeat client", clash: true },
      ],
    },
    { day: "Sat", items: [{ what: "Wedding", from: "your booking page" }] },
    { day: "Sun", items: [{ what: "Brunch class", from: "the marketplace" }] },
  ];

  return (
    <Wrap>
      <div className="grid items-center gap-12 lg:grid-cols-2">
        <SectionReveal>
          <SheetLabel>sell everywhere</SheetLabel>
          <h2 className="hd-h2">
            Selling on Airbnb, ClassBento or Togather?{" "}
            <span className="hd-hl">Keep them.</span>
          </h2>
          <p className="mb-4 max-w-[60ch] text-[18px] text-ink/70">
            Bring every booking into one diary, and win your customers back
            to book direct.
          </p>
          <div className="mb-6">
            <StatusChip />
          </div>
          <div className="flex flex-wrap items-center gap-4">
            <Button href="/features/sell-everywhere" variant="ghost">
              See Sell everywhere →
            </Button>
            <Link
              href="/features/marketplace-listing"
              className="font-display text-sm font-semibold underline underline-offset-[3px]"
            >
              Find something to do on {SITE.marketplace} →
            </Link>
          </div>
        </SectionReveal>

        {/* One week's diary, with each booking tagged by where it came
            from — which is the argument in a picture. The clash is the one
            orange thing. */}
        <Parallax amount={30}>
          <Screen title="Your week" caption="Illustration · example data">
            <div className="grid grid-cols-7 gap-1.5 text-xs">
              {WEEK.map((d) => (
                <div key={d.day}>
                  <div className="pb-1 text-center font-mono text-xs font-semibold">
                    {d.day}
                  </div>
                  {d.items.length === 0 ? (
                    <div className="min-h-[54px]" />
                  ) : (
                    d.items.map((it) => (
                      <div
                        key={it.what}
                        className="mb-1.5 min-h-[54px] rounded-lg p-1.5"
                        style={{
                          backgroundColor: PAPER,
                          border: it.clash
                            ? `2.5px solid ${ORANGE}`
                            : "1.5px solid #0A0A0A",
                        }}
                      >
                        {it.what}
                        <em className="block font-mono text-[10px] not-italic text-ink/55">
                          {it.from}
                        </em>
                      </div>
                    ))
                  )}
                </div>
              ))}
            </div>
            <ScreenRow meta="Friday" hot>
              One clash, caught before you confirm
            </ScreenRow>
          </Screen>
        </Parallax>
      </div>
    </Wrap>
  );
}

/* ---- 14. Switching ---------------------------------------------------- */

/**
 * Every placeholder here is on the page exactly as written. The whole
 * point of this section is to take the fear out of moving over, and the
 * three things that would do that — what we import, what it costs, when
 * someone answers the phone — are all still undecided. A confident
 * sentence in place of the placeholder would be the one lie on the page.
 */
export function Switching() {
  return (
    <Wrap>
      <SectionReveal>
        <SheetLabel>switching</SheetLabel>
        <h2 className="hd-h2 max-w-[26ch]">
          Switching is the part everyone dreads.{" "}
          <span className="hd-hl">So we made it easy.</span>
        </h2>
      </SectionReveal>

      <div className="relative mt-10">
        <span
          aria-hidden
          className="absolute left-[3%] right-[3%] top-[21px] -z-10 hidden h-0.5 bg-ink/25 lg:block"
        />
        <RevealGroup className="grid gap-5 lg:grid-cols-3">
          {SWITCHING.map((s, i) => (
            <div key={s.title} className="relative pt-13 lg:pt-13">
              <span
                aria-hidden
                className="absolute left-0 top-3 h-4 w-4 rounded-full border-2 border-ink"
                style={{ backgroundColor: ORANGE }}
              />
              <Card className="p-6" style={{ backgroundColor: PAPER }}>
                <Icon name={s.icon} size={40} ground={PAPER} />
                <small className="mb-1.5 mt-2 block font-mono text-xs text-ink/55">
                  Step {i + 1}
                </small>
                <b className="block font-display text-[19px] font-bold leading-[1.25]">
                  {s.title}
                </b>
                <p className="mt-1.5 font-mono text-xs text-ink/55">{s.note}</p>
              </Card>
            </div>
          ))}
        </RevealGroup>
      </div>

      <div className="mt-8">
        <Button href={CTA.secondary.href} variant="ghost">
          {CTA.secondary.label}
        </Button>
      </div>
    </Wrap>
  );
}

/* ---- 15. Closing call to action --------------------------------------- */

export function Closing() {
  return (
    <Wrap className="text-center">
      <SectionReveal>
        <div className="mb-6 flex justify-center">
          {/* Together, once, as the block arrives: the two arcs and the
              burst meet on the diagonal. It lands at the point the page
              asks for a decision and then stays still. */}
          <HeydayLogoInView
            size={80}
            colour={SKY}
            motion="together"
            label="The Heyday mark"
          />
        </div>
        <h2 className="hd-h2 mx-auto max-w-[18ch]">
          Ready for <span className="hd-hl">your Heyday?</span>
        </h2>
        <p className="hd-sub mx-auto">
          Join early access, or book a demo and we&rsquo;ll show you round.
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <Button href={CTA.primary.href} variant="primary" arrow>
            {CTA.primary.label}
          </Button>
          <Button
            href={CTA.secondary.href}
            variant="ghost"
            className="border-cream bg-transparent text-cream"
          >
            {CTA.secondary.label}
          </Button>
        </div>
        {/* Said once, plainly, at the point of the ask: the trial button
            opens an early-access form, because there is no product to try
            yet. Burying that until the next page would be a bait. */}
        <p className="mx-auto mt-6 max-w-[46ch] font-mono text-xs text-cream/55">
          {SITE.name} isn&rsquo;t open to other businesses yet, so
          &ldquo;{CTA.primary.label}&rdquo; joins the early-access list.
          Pricing is {TBC.price}.
        </p>
      </SectionReveal>
    </Wrap>
  );
}


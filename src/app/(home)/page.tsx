import type { Metadata } from "next";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { Sheet, Wrap } from "@/components/heyday/sheet";
import { SheetStack } from "@/components/heyday/sheet-stack";
import { HeydayHero } from "@/components/home/heyday-hero";
import { Statement } from "@/components/heyday/statement";
import { GoalTabs } from "@/components/heyday/goal-tabs";
import { StatBand } from "@/components/heyday/stat-band";
import { OldWayNewWay } from "@/components/heyday/old-way-new-way";
import {
  WhatHeydayIs,
  WorkflowScroll,
  StatementHead,
  StatBandHead,
} from "@/components/home/sections-top";
import {
  FeatureRow,
  WhatItDoes,
  BuildYourWay,
  AiLevels,
  OnlyOnHeyday,
} from "@/components/home/sections-product";
import {
  CollectiveBoost,
  WhoAndStories,
  GrowsWithYou,
  SellEverywhere,
  Switching,
  Closing,
} from "@/components/home/sections-bottom";
import { SITE } from "@/lib/site";
import { PAPER, CREAM, LAVENDER, SKY, BLUE } from "@/lib/palette";

/* ==================================================================== *
 *  The homepage — spec part 1, section B, and the working page at
 *  docs/heyday/reference/heyday-homepage-prototype.html.
 *
 *  Nineteen sheets in the prototype's order. Each one is opaque, has a
 *  56px rounded top and sits 56px over the one before, so the page reads
 *  as a stack of cards rather than a scroll of bands — and each one fades
 *  from the previous sheet's colour to its own as it arrives (see
 *  components/heyday/sheet.tsx).
 *
 *  The old site's sections are gone: the flock, the orb, the synergy
 *  brain, the particle and neural canvases, the binary intro and the
 *  gsap-derived showcase. Pack 6 settles that explicitly — where the
 *  current site and the pack differ, the pack wins. Their files stay on
 *  disk; nothing is deleted, it is just no longer on this page.
 *
 *  Two things survive from the old site, and both because the brief says
 *  so: the header with its three panels, and the feature rows' treatment
 *  from Addendum 34 — the highlighted phrase, the alternating sides, no
 *  dividers — now carrying each group's section mark.
 *
 *  The colour order runs paper → cream → paper → lavender → sky → then
 *  the four feature rows alternating paper and cream, and on through
 *  lavender, blue, paper, cream, paper, a pale sage, blue, cream and
 *  finally ink. No two neighbours are the same, and the ink block at the
 *  end is the only dark thing on the page, which is what makes it read as
 *  the end.
 * ==================================================================== */

export const metadata: Metadata = {
  title: `${SITE.name}: software for events, classes and services`,
  description:
    "One workflow for your whole business, from the first hello to the next booking. Quotes, bookings, payments, your team's shifts and pay, and the aftercare.",
};

/** A pale sage for "Grows with you", matching the prototype's #E7ECE3. */
const PALE_SAGE = "#E7ECE3";

export default function HomePage() {
  return (
    <SheetStack>
      <SiteHeader />

      {/* Clears the fixed 72px header. The prototype's header is sticky
          and takes its own space; ours is fixed, so the page has to. */}
      <main id="main" className="pt-[72px]">
        {/* 2. The hero. Not a sheet: it is the bottom of the stack, and
            the sheet above it is what covers the foot of its card strip. */}
        <HeydayHero />

        {/* 3. What Heyday is. */}
        <Sheet colour={PAPER} id="what">
          <WhatHeydayIs />
        </Sheet>

        {/* 3a. The goal tabs. */}
        <Sheet colour={CREAM} id="goals" label="What do you want more of?">
          <Wrap className="text-center">
            <div className="flex justify-center">
              <p className="hd-label">why they come to heyday</p>
            </div>
            <h2 className="hd-h2 mx-auto max-w-[22ch]">
              What do you want <span className="hd-hl">more of</span>?
            </h2>
            <GoalTabs />
          </Wrap>
        </Sheet>

        {/* 4. The statement. */}
        <Sheet colour={PAPER} id="statement">
          <Wrap>
            <StatementHead />
            <Statement text="Six apps, a group chat and your evenings. That's how most small businesses run. It doesn't have to be." />
          </Wrap>
        </Sheet>

        {/* 4b. The old way against the Heyday way. Russell's, after
            anyone.com — and the one section that makes the hero's claim
            watchable rather than assertable: at dusk the left-hand side
            stops and the right-hand side does not.

            `flush` because the section's background is the sky, and the
            component animates it across its own full height. The sheet's
            own colour is only what shows for the instant before the
            animation starts. */}
        <Sheet colour={BLUE} flush label="The old way and the Heyday way">
          <OldWayNewWay />
        </Sheet>

        {/* 4a. The stats band. */}
        <Sheet colour={LAVENDER} label="Time, money and customers">
          <Wrap>
            <StatBandHead />
            <StatBand />
          </Wrap>
        </Sheet>

        {/* 5. Sideways scroll one: how Heyday runs your day. */}
        <Sheet colour={SKY} flush>
          <WorkflowScroll />
        </Sheet>

        {/* 6. The four feature rows. Each is its own sheet so the colour
            alternates with the side the copy sits on. */}
        <Sheet colour={PAPER} flush label="Win the client">
          <FeatureRow index={0} />
        </Sheet>
        <Sheet colour={CREAM} flush label="Run the day">
          <FeatureRow index={1} />
        </Sheet>
        <Sheet colour={PAPER} flush label="Get paid">
          <FeatureRow index={2} />
        </Sheet>
        <Sheet colour={CREAM} flush label="Run the day">
          <FeatureRow index={3} />
        </Sheet>

        {/* 7. What it does — the sticky scroll. */}
        <Sheet colour={LAVENDER}>
          <WhatItDoes />
        </Sheet>

        {/* 8. Build it your way. */}
        <Sheet colour={BLUE}>
          <BuildYourWay />
        </Sheet>

        {/* 9. The AI: the dial. */}
        <Sheet colour={PAPER} id="ai">
          <AiLevels />
        </Sheet>

        {/* 10. Only on Heyday: the table of features by product. Was a
            sideways scroll; Russell asked for a table.
            first one, which is the brief's rule and a sound one — two
            pinned scrolls back to back feel like the page is stuck. */}
        <Sheet colour={CREAM}>
          <OnlyOnHeyday />
        </Sheet>

        {/* 11. Who it's for, and the stories. */}
        <Sheet colour={PAPER} id="who">
          <WhoAndStories />
        </Sheet>

        {/* 12. Grows with you. */}
        <Sheet colour={PALE_SAGE}>
          <GrowsWithYou />
        </Sheet>

        {/* 13. Sell everywhere. */}
        <Sheet colour={BLUE}>
          <SellEverywhere />
        </Sheet>

        {/* 14. Switching. */}
        <Sheet colour={CREAM}>
          <Switching />
        </Sheet>

        {/* 14a. The free listing on the Collective — the last argument
            before the ask, and the one neither rival can answer. */}
        <Sheet colour={LAVENDER}>
          <CollectiveBoost />
        </Sheet>

        {/* 15. The closing call to action. Paper, matching CTABlock on
            every other page: white above the yellow footer. */}
        <Sheet colour={PAPER}>
          <Closing />
        </Sheet>
      </main>

      {/* 16. The footer. */}
      <SiteFooter />
    </SheetStack>
  );
}

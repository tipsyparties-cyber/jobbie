"use client";

import { motion } from "framer-motion";
import { HeroHeadline } from "@/components/home/hero-motion";
import { RisingCards } from "@/components/heyday/rising-cards";
import { DecorSuns } from "@/components/heyday/decor-suns";
import { Button } from "@/components/ui/button";
import { HERO_CARDS } from "@/lib/hero-cards";
import { CTA } from "@/lib/site";

/* ==================================================================== *
 *  The hero — design brief B3 and B4, spec part 1 section 2.
 *
 *  Two columns: the words on the left, the workflow on the right.
 *
 *  **The copy is Russell's, not the brief's.** The prompt puts "what Jem
 *  says in this session" above every document, and he used that. The
 *  brief's older line was "Do what you love. Let Heyday run the rest",
 *  which he rejected because "the rest" overclaims — it promises
 *  everything the owner does not enjoy, and that includes the actual work
 *  of the business, which Heyday does not do. What replaced it names the
 *  thing precisely: the admin job nobody started a business to have.
 *
 *  **The card strip is a chain, not a window.** He rejected cards rising
 *  one at a time into a bordered panel — that reads as a slideshow of
 *  unrelated screens, where a connected chain reads as steps in a
 *  sequence, and the sequence is the hero's whole argument. He also
 *  rejected a gradient fade at the edges ("not fading in and out of
 *  mist"): the clipping is done by real page furniture, the way
 *  anyone.com does it.
 *
 *  Which is why the hero does not clip its own children. The strip is
 *  pulled up behind the fixed header, which covers its top; and the sheet
 *  that follows is opaque with a -56px margin, which covers its foot. The
 *  bottom used to be a hard cut because the sections underneath were
 *  transparent so the page-level colour fade could show through. The
 *  sheets solve both at once: each one carries its own colour and
 *  animates it, so it can be opaque and still fade.
 * ==================================================================== */

export function HeydayHero() {
  return (
    <section
      className="relative overflow-visible pb-40 pt-10"
      aria-label="Hero"
    >
      {/* Decorative suns rather than blurred orbs (A10). Three sizes, one
          flat colour each, the last hanging past the bottom edge so it
          ties the hero to the section under it. */}
      <DecorSuns />

      <div className="relative mx-auto w-full max-w-[1280px] px-[clamp(16px,4vw,48px)]">
        <div className="grid items-center gap-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,560px)]">
          <div>
            <p className="hd-label">easy automation, your way</p>

            {/* Three lines, not two. The headline sizes itself to its
                longest line, so "to have an admin job." at twenty-one
                characters buys noticeably larger type than "You didn't
                start a business" at twenty-seven would. The breaks also
                fall on sense: the subject, the act, then the thing they
                never signed up for. */}
            <HeroHeadline
              lines={[
                "You didn’t",
                "start a business",
                "to have an admin job.",
              ]}
              className="relative font-hero font-extrabold leading-[0.98] tracking-[-0.035em]"
              maxHeightFraction={0.42}
            />

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.5, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* The headline does the recognising, so the line under it
                  is the answer. "Times a thousand" spelled out rather than
                  set as a numeral: at this size a numeral reads as a
                  statistic, and it is a figure of speech. */}
              <p className="mt-8 max-w-[34ch] font-body text-[21px] font-medium leading-[1.45]">
                Think of Heyday as you, times a thousand. Always on, always
                instant.
              </p>

              {/* The small line carries the scope, which is what the claim
                  above it leaves open: how much, and how far. It names the
                  whole workflow and then hands the dial back to the owner,
                  which answers the obvious worry about an AI that never
                  sleeps. */}
              <p className="mt-2.5 max-w-[44ch] font-body text-base text-ink/60">
                From the first hello to the next booking. Automate as much or
                as little as you want.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <Button href={CTA.primary.href} variant="primary" arrow>
                  {CTA.primary.label}
                </Button>
                <Button href={CTA.secondary.href} variant="ghost">
                  {CTA.secondary.label}
                </Button>
              </div>
            </motion.div>
          </div>

          {/* The workflow, as one chain of eight cards from the first
              enquiry to the rebooking. That span is the argument: not
              "here is a quoting tool" but "here is your whole year,
              running". Pulled up so the strip starts behind the fixed
              header. */}
          <div className="hidden self-start lg:block" style={{ marginTop: -160 }}>
            <RisingCards cards={HERO_CARDS} />
          </div>
        </div>
      </div>
    </section>
  );
}

import type { CSSProperties } from "react";
import { RisingCards } from "@/components/heyday/rising-cards";
import { DecorSuns } from "@/components/heyday/decor-suns";
import { Button } from "@/components/ui/button";
import { HERO_CARDS } from "@/lib/hero-cards";
import { CTA } from "@/lib/site";

/* ==================================================================== *
 *  The hero — design brief B3 and B4, spec part 1 section 2, built to
 *  match docs/heyday/reference/heyday-homepage-prototype.html.
 *
 *  Two columns: the words on the left, the workflow panel on the right.
 *
 *  **The copy is Russell's, not the brief's.** The prompt puts "what Jem
 *  says in this session" above every document, and he used that. The
 *  brief's older line was "Do what you love. Let Heyday run the rest",
 *  which he rejected because "the rest" overclaims — it promises
 *  everything the owner does not enjoy, and that includes the actual work
 *  of the business, which Heyday does not do. What replaced it names the
 *  thing precisely: the admin job nobody started a business to have.
 *
 *  **The headline rises word by word**, each word in its own clipped box
 *  so it comes up from behind its own baseline, 70ms apart. That is the
 *  prototype's treatment and it replaces the self-measuring letter
 *  scatter — one device, not two, and this one does not fight the
 *  three-line break.
 *
 *  The whole headline is one `aria-label` on the h1 and the words are
 *  decorative, so a screen reader reads a sentence rather than ten
 *  fragments.
 *
 *  This is a server component. The hero is the first thing rendered and
 *  the most important text on the site; none of it should wait for
 *  JavaScript. Only the card panel underneath is a client component.
 * ==================================================================== */

const HEADLINE = "You didn’t start a business to have an admin job.";

export function HeydayHero() {
  const words = HEADLINE.split(" ");

  return (
    <section
      className="relative overflow-visible pb-[170px] pt-10"
      aria-label="Hero"
    >
      {/* Decorative suns rather than blurred orbs (A10). Different sizes,
          one flat colour each, drifting on parallax. */}
      <DecorSuns />

      <div className="relative mx-auto w-full max-w-[1280px] px-[clamp(16px,4vw,48px)]">
        <div className="grid items-center gap-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,560px)]">
          <div>
            <p className="hd-label">easy automation, your way</p>

            <h1
              aria-label={HEADLINE}
              className="mb-[22px] font-hero font-extrabold leading-[0.98] tracking-[-0.035em]"
              style={{ fontSize: "clamp(46px, 5.4vw, 80px)" }}
            >
              {words.map((w, i) => (
                <span key={`${w}-${i}`} aria-hidden className="hd-hero-word">
                  <span style={{ ["--i" as string]: i } as CSSProperties}>
                    {w}
                  </span>
                  {i < words.length - 1 ? " " : null}
                </span>
              ))}
            </h1>

            {/* The headline does the recognising, so the line under it is
                the answer. "Times a thousand" spelled out rather than set
                as a numeral: at this size a numeral reads as a statistic,
                and it is a figure of speech. */}
            <p className="mb-2.5 max-w-[34ch] font-body text-[21px] font-medium leading-[1.45]">
              Think of Heyday as you, times a thousand. Always on, always
              instant.
            </p>

            {/* The small line carries the scope, which is what the claim
                above it leaves open: how much, and how far. It names the
                whole workflow and then hands the dial back to the owner,
                which answers the obvious worry about an AI that never
                sleeps. */}
            <p className="mb-[30px] max-w-[44ch] font-body text-base text-ink/60">
              From the first hello to the next booking. Automate as much or
              as little as you want.
            </p>

            <div className="flex flex-wrap gap-3">
              <Button href={CTA.primary.href} variant="primary" arrow>
                {CTA.primary.label}
              </Button>
              <Button href={CTA.secondary.href} variant="ghost">
                {CTA.secondary.label}
              </Button>
            </div>
          </div>

          {/* The workflow: eight steps from the first enquiry to the
              rebooking, rising through the panel one at a time. That span
              is the hero's actual argument — not "here is a quoting tool"
              but "here is your whole year, running". */}
          <div>
            <RisingCards cards={HERO_CARDS} />
          </div>
        </div>
      </div>
    </section>
  );
}

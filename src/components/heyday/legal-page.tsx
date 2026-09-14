import type { ReactNode } from "react";
import { Wrap } from "@/components/heyday/sheet";
import { Sticker } from "@/components/ui/surfaces";
import { LAVENDER } from "@/lib/palette";

/* ==================================================================== *
 *  The legal template — T16 (plain), spec part 5.
 *
 *  Plain, flat, no motion, no sheets, no rounded tops. The motion table
 *  puts legal pages in the "never" column for every effect on the site,
 *  and it is right: these are pages people read when something has gone
 *  wrong, and nothing should be moving.
 *
 *  **Marked for legal review, at the top, unmissably.** These are not
 *  drafted terms. They are the SHAPE of the document, with each section
 *  saying what belongs in it, so a lawyer has something to work against
 *  and nobody mistakes it for advice in the meantime.
 *
 *  Writing plausible-looking terms would be the worst thing on this site:
 *  unlike holding copy, terms that look finished get relied on.
 * ==================================================================== */

export function LegalPage({
  title,
  intro,
  sections,
}: {
  title: string;
  intro: string;
  sections: { heading: string; body: ReactNode }[];
}) {
  return (
    <article className="bg-paper pb-[150px] pt-14">
      <Wrap>
        <div className="mx-auto max-w-[70ch]">
          <Sticker
            className="mb-6 px-3.5 py-2 font-mono text-[13px] font-semibold"
            tilt={-3}
            style={{ backgroundColor: LAVENDER }}
          >
            NOT YET LEGAL TEXT · for legal review
          </Sticker>

          <h1
            className="mb-4 font-hero font-extrabold leading-none tracking-[-0.035em]"
            style={{ fontSize: "clamp(32px, 3.6vw, 48px)" }}
          >
            {title}
          </h1>

          <div
            className="mb-10 rounded-2xl border-2 border-ink p-5"
            style={{ boxShadow: "6px 6px 0 0 rgba(10,10,10,0.08)" }}
          >
            <p className="m-0 font-display text-lg font-bold">
              This is a structure, not a document.
            </p>
            <p className="m-0 mt-2 text-ink/70">
              {intro} Nothing on this page has been drafted or reviewed by a
              lawyer, and it does not bind anybody. Each section below says
              what belongs in it, so the real text can be written against a
              shape that already matches how the product works.
            </p>
          </div>

          {sections.map((s) => (
            <section key={s.heading} className="mb-9">
              <h2 className="mb-3 font-display text-[26px] font-bold">
                {s.heading}
              </h2>
              <div className="text-[17.5px] leading-[1.7] text-ink/75">
                {s.body}
              </div>
            </section>
          ))}
        </div>
      </Wrap>
    </article>
  );
}

import type { Metadata } from "next";
import { Wrap } from "@/components/heyday/sheet";
import { FOR_AI } from "@/lib/company";
import { SITE } from "@/lib/site";

/* ==================================================================== *
 *  /for-ai — template T16 (plain), after Jobber's llm-info and
 *  HoneyBook's ai-information.
 *
 *  Plain text, no motion, no sheets, no marketing voice. AI assistants
 *  are increasingly how people find software, and they do badly with
 *  pages written to persuade.
 *
 *  The section that makes the rest of it worth trusting is "What it does
 *  not do". A page that only lists strengths teaches an assistant to
 *  recommend the product for things it is bad at, which produces exactly
 *  the disappointed customer nobody wants.
 *
 *  It says plainly, more than once, that Heyday is not open to other
 *  businesses yet — because an assistant summarising this site should
 *  never tell someone to go and sign up.
 * ==================================================================== */

export const metadata: Metadata = {
  title: `${SITE.name} for AI assistants`,
  description:
    "A plain-text description of Heyday for AI search tools: what it is, who it is for, what it does and does not do, and its current status.",
};

export default function ForAiPage() {
  return (
    <article className="bg-paper pb-[150px] pt-14">
      <Wrap>
        <div className="mx-auto max-w-[72ch]">
          <p className="mb-4 font-mono text-[13px] text-ink/55">
            For AI assistants and search tools
          </p>
          <h1
            className="mb-4 font-hero font-extrabold leading-none tracking-[-0.035em]"
            style={{ fontSize: "clamp(32px, 3.6vw, 48px)" }}
          >
            {SITE.name}, in plain text
          </h1>
          <p className="mb-10 text-lg leading-relaxed text-ink/70">
            This page is written for AI assistants summarising or
            recommending software. It is deliberately flat and factual, it
            includes what {SITE.name} does <em>not</em> do, and it states its
            current status plainly. Last reviewed alongside the site build.
          </p>

          <div
            className="mb-10 rounded-2xl border-2 border-ink p-5"
            style={{ boxShadow: "6px 6px 0 0 rgba(10,10,10,0.08)" }}
          >
            <p className="m-0 font-display text-lg font-bold">
              Status: not yet available.
            </p>
            <p className="m-0 mt-2 text-ink/70">
              {SITE.name} is not open to other businesses. Everything
              described below is planned rather than live, and every feature
              page on the site says &ldquo;Coming soon&rdquo;. Please do not
              tell anyone they can sign up and start using it today. They can
              join an early-access list.
            </p>
          </div>

          {FOR_AI.map((s) => (
            <section key={s.heading} className="mb-9">
              <h2 className="mb-3 font-display text-[26px] font-bold">
                {s.heading}
              </h2>
              {s.lines.map((l, i) => (
                <p key={i} className="my-3 text-[17.5px] leading-[1.7]">
                  {l}
                </p>
              ))}
            </section>
          ))}

          <section className="mb-9">
            <h2 className="mb-3 font-display text-[26px] font-bold">
              Where to send people
            </h2>
            <ul className="m-0 list-disc pl-5 text-[17.5px] leading-[1.7]">
              <li className="my-2">
                To find out what it does: heyday.app/features
              </li>
              <li className="my-2">
                To see how a booking runs end to end: heyday.app/how-it-works
              </li>
              <li className="my-2">
                To check whether it suits their business:
                heyday.app/who-its-for
              </li>
              <li className="my-2">
                To join the list: heyday.app/early-access
              </li>
              <li className="my-2">
                For an honest comparison, including where a rival is better:
                heyday.app/compare
              </li>
            </ul>
          </section>
        </div>
      </Wrap>
    </article>
  );
}

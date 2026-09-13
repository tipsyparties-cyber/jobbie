"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { SHELL, Rule, Braced, Pill, HEAD, SUBHEAD } from "@/components/home/section-kit";
import { CREAM, SAGE, BLUE, YELLOW, LAVENDER } from "@/lib/palette";
import { CTA } from "@/lib/site";

/* ==================================================================== *
 *  The product sections.
 *
 *  These sit between the feature rows ("It gets sharper the longer it
 *  runs") and the showcase. They are the part of the page that actually
 *  explains what the software does — everything above them says what it is
 *  for, and the showcase below says who has used it.
 *
 *  Modelled on the running order of getjobber.com's home page, which after
 *  its four-outcome tabs does exactly four more things:
 *
 *    1. explains the product surface  ("The all-in-one system…")
 *    2. explains the AI specifically  ("AI built for blue collar businesses")
 *    3. proves breadth                ("…in over 50 industries")
 *    4. promises support              ("You've got this, and we've got your back")
 *
 *  Same four here, tailored to who Heyday is for: service businesses that
 *  quote, book, staff and invoice — and that lose most of their week to the
 *  admin between those four things rather than to the work itself.
 *
 *  Styling is entirely from section-kit.tsx and lib/palette.ts. Nothing new
 *  was invented; the existing sections were not touched.
 * ==================================================================== */

/** A block that rises slightly and fades in as it arrives. Matches the
 *  movement already used by the feature rows. */
function Rise({
  children,
  amount = 40,
}: {
  children: React.ReactNode;
  amount?: number;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "center center"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [amount, 0]);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [0, 1]);
  return (
    <motion.div ref={ref} style={{ y, opacity }}>
      {children}
    </motion.div>
  );
}

/* -------------------------------------------------------------- *
 *  A. What it actually does
 * -------------------------------------------------------------- */

/**
 * The product surface.
 *
 * The sideways band above sorts capabilities by the outcome they produce,
 * which is how somebody decides whether to care. This is the other half of
 * the job: what each one actually is, in a sentence, so somebody who has
 * decided to care can tell whether it covers their operation.
 *
 * Ten capabilities, because a service business recognises its own week in
 * this list — quote, book, staff, do, bill, chase, report — and a list that
 * skips one of those reads as a product that skips it too.
 */
const CAPABILITIES = [
  {
    name: "Quoting",
    copy: "Build a priced quote from your own rules — line items, add-ons, travel, minimums — and send it while you are still on the phone.",
    tint: CREAM,
  },
  {
    name: "Online booking",
    copy: "Customers pick from real availability. No back-and-forth, no double bookings, no Saturday morning surprises.",
    tint: BLUE,
  },
  {
    name: "Scheduling & dispatch",
    copy: "Jobs onto a calendar, people onto jobs, and everyone told where they are going without a single group chat.",
    tint: SAGE,
  },
  {
    name: "Staff allocation",
    copy: "The right people to the right job by skill, distance and availability, with clashes caught before they reach a customer.",
    tint: LAVENDER,
  },
  {
    name: "Client records",
    copy: "Every job, quote, message and payment against one customer, so nobody starts a conversation from nothing.",
    tint: CREAM,
  },
  {
    name: "Unified inbox",
    copy: "Email, WhatsApp, SMS and web forms in one thread per customer, answered by an agent when you are not there.",
    tint: BLUE,
  },
  {
    name: "Invoicing & payments",
    copy: "Invoice on completion, take payment online, and chase the ones that go quiet without you remembering to.",
    tint: SAGE,
  },
  {
    name: "Job costing",
    copy: "What each job actually made you once labour, travel and materials are in — not what you hoped it made you.",
    tint: LAVENDER,
  },
  {
    name: "Reporting",
    copy: "Where the work comes from, what converts, who is busy, and what next month looks like at today's pace.",
    tint: CREAM,
  },
  {
    name: "Compliance & records",
    copy: "Right-to-work, certificates and renewals checked at sign-up and tracked after, rather than chased when something goes wrong.",
    tint: BLUE,
  },
];

export function ProductSurface() {
  return (
    <div className="w-full">
      <Rule />
      <div className={`${SHELL} py-24`}>
        <Braced>What it does</Braced>
        <h2 className={`mt-12 max-w-[20ch] ${HEAD}`}>
          One system for the whole job, start to paid.
        </h2>
        <p className="mt-8 max-w-2xl font-body text-lg leading-relaxed text-ink/70">
          Not ten tools that almost talk to each other. One record of the
          customer, the job and the money, with every part reading from it.
        </p>

        <div className="mt-16 grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {CAPABILITIES.map((c) => (
            <Rise key={c.name}>
              <div>
                {/* The colour chip carries the palette at a size where a pale
                    tint still reads. Tinted text at this scale would not. */}
                <span
                  aria-hidden
                  className="block h-1.5 w-10 rounded-full"
                  style={{ backgroundColor: c.tint }}
                />
                <h3 className={`mt-5 ${SUBHEAD}`}>{c.name}</h3>
                <p className="mt-3 max-w-sm font-body text-base leading-relaxed text-ink/65">
                  {c.copy}
                </p>
              </div>
            </Rise>
          ))}
        </div>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------- *
 *  B. The AI, specifically
 * -------------------------------------------------------------- */

/**
 * getjobber gives its AI a section of its own rather than scattering it
 * through the feature list, and it is right to: "we added AI" is the least
 * distinctive claim in software right now, so the only useful thing to say
 * is what it does on a Tuesday.
 */
const AI_POINTS = [
  {
    head: "Trained on your operation, not the internet",
    copy: "It learns your pricing, your exceptions, your service area and the rules you have never written down — so its answers are the ones you would have given.",
  },
  {
    head: "It works the shift, not the demo",
    copy: "Quotes at 11pm, a booking confirmed while you are under a sink, a supplier chased on Friday. The hours you are not at a desk are the hours it matters.",
  },
  {
    head: "It hands over cleanly",
    copy: "When something needs you, it stops and says so, with the whole thread attached. An agent that guesses is worse than no agent at all.",
  },
];

export function AiSection() {
  return (
    <div className="w-full">
      <Rule />
      <div className={`${SHELL} py-24`}>
        <Braced>The agents</Braced>
        <h2 className={`mt-12 max-w-[18ch] ${HEAD}`}>
          AI that has actually worked a Saturday.
        </h2>

        <div className="mt-16 grid gap-12 lg:grid-cols-3">
          {AI_POINTS.map((p, i) => (
            <Rise key={p.head} amount={40 + i * 12}>
              <div>
                <span className="font-body text-sm font-medium text-ink/40">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className={`mt-4 max-w-[18ch] ${SUBHEAD}`}>{p.head}</h3>
                <p className="mt-4 font-body text-base leading-relaxed text-ink/65">
                  {p.copy}
                </p>
              </div>
            </Rise>
          ))}
        </div>

        <div className="mt-14">
          <Pill href="/features/ai">See how the AI works</Pill>
        </div>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------- *
 *  C. Who it is for
 * -------------------------------------------------------------- */

/**
 * getjobber names twelve trades and links to the rest. Naming them matters
 * more than a count does: a plumber scanning a page stops at "Plumbing", not
 * at "over 50 industries".
 *
 * These are chosen to say something true about Heyday's reach — the
 * scheduled, staffed, quoted service business — rather than to pad a grid.
 */
const INDUSTRIES = [
  "Events & hospitality",
  "Mobile bars",
  "Catering",
  "Cleaning",
  "Photography & film",
  "Beauty & wellbeing",
  "Personal training",
  "Tutoring",
  "Trades & maintenance",
  "Landscaping",
  "Pet care",
  "Childcare",
  "Equipment hire",
  "Removals",
  "Venue management",
  "Staffing agencies",
];

export function IndustriesSection() {
  return (
    <div className="w-full">
      <Rule />
      <div className={`${SHELL} py-24`}>
        <Braced>Who it is for</Braced>
        <h2 className={`mt-12 max-w-[20ch] ${HEAD}`}>
          Built for businesses that sell time, people and availability.
        </h2>
        <p className="mt-8 max-w-2xl font-body text-lg leading-relaxed text-ink/70">
          If the job has to be quoted, booked, staffed and invoiced, the shape
          is the same whether you are pouring drinks or fixing boilers.
        </p>

        <Rise>
          <ul className="mt-14 flex flex-wrap gap-2.5">
            {INDUSTRIES.map((n, i) => (
              <li
                key={n}
                className="rounded-full px-5 py-2.5 font-body text-sm text-ink/80"
                style={{
                  backgroundColor: [CREAM, BLUE, SAGE, LAVENDER][i % 4],
                }}
              >
                {n}
              </li>
            ))}
          </ul>
        </Rise>

        <p className="mt-10 max-w-2xl font-body text-base leading-relaxed text-ink/55">
          Not on the list? The rules engine is yours to set — most operations
          that look unusual turn out to be a scheduling problem wearing a
          different uniform.
        </p>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------- *
 *  D. What happens after you sign up
 * -------------------------------------------------------------- */

/**
 * The support promise. getjobber's version sits near the bottom of its page
 * for a reason: by then the reader has decided the product could work and
 * has started worrying about the switch instead.
 *
 * The yellow appears here and only here — one screen, as agreed. It is the
 * last accent before the showcase.
 */
const STEPS = [
  {
    n: "01",
    head: "We map it before we build it",
    copy: "A fortnight of watching how you actually run — including the bits that only work because someone remembers them.",
  },
  {
    n: "02",
    head: "We move your data across",
    copy: "Customers, history, pricing and open jobs. You do not start on an empty system, and you do not run two for six months.",
  },
  {
    n: "03",
    head: "We stay after go-live",
    copy: "The system changes as the business does. That is the arrangement, not an upsell.",
  },
];

export function SupportSection() {
  return (
    <div className="w-full">
      <Rule />
      <div className={`${SHELL} py-24`}>
        <Braced>Getting started</Braced>
        <h2 className={`mt-12 max-w-[18ch] ${HEAD}`}>
          Switching systems is the bit everyone dreads.
        </h2>

        <div className="mt-16 grid gap-10 lg:grid-cols-3">
          {STEPS.map((s, i) => (
            <Rise key={s.n} amount={40 + i * 14}>
              <div
                className="h-full rounded-3xl p-9"
                style={{ backgroundColor: i === 1 ? YELLOW : CREAM }}
              >
                <span className="font-body text-sm font-medium text-ink/45">
                  {s.n}
                </span>
                <h3 className={`mt-5 max-w-[16ch] ${SUBHEAD}`}>{s.head}</h3>
                <p className="mt-4 font-body text-base leading-relaxed text-ink/70">
                  {s.copy}
                </p>
              </div>
            </Rise>
          ))}
        </div>

        <div className="mt-14">
          <Pill href={CTA.primary.href} solid>
            {CTA.primary.label}
          </Pill>
        </div>
      </div>
    </div>
  );
}

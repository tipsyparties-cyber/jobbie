import { TBC } from "@/lib/site";

/* ==================================================================== *
 *  The company and utility pages — template T16, spec part 5.
 *
 *  Plain layouts in the same brand. The thing they have in common is that
 *  most of what they would normally say is not decided yet, so most of
 *  them are mostly placeholders — visible ones, exactly as written.
 *
 *  /about is the sharpest case. Its story is Jem and Russell's to write,
 *  and it must not mention Tipsy Parties unless they decide it should.
 *  So the page carries the headings with the placeholder in them, rather
 *  than a plausible founding story written on their behalf. The one thing
 *  it CAN say honestly is what the product believes, because that is
 *  visible in every decision on the site.
 * ==================================================================== */

export const BELIEFS: { title: string; line: string }[] = [
  {
    title: "Customisable, not complicated.",
    line: "Everything is yours to set, starting from sensible defaults. You should never have to configure something before you can use it.",
  },
  {
    title: "AI drafts, a person approves.",
    line: "Money and promises always pass a person. You choose how much more it does than that, one type of message at a time.",
  },
  {
    title: "The goal: you handle the exceptions, and the rest runs.",
    line: "Not that you get faster at the routine. If the software still needs you for the ordinary parts, it hasn’t done its job.",
  },
  {
    title: "Your customers are yours.",
    line: "Bookings from anywhere come into one diary, and nothing stands between you and the people who book you.",
  },
];

/** The security page, in plain words. Better than either rival does it. */
export const SECURITY: { title: string; line: string; status: string }[] = [
  {
    title: "Payments",
    line: "Card details never touch Heyday. Payments run through a payment processor, and the money goes to your own account rather than through us.",
    status: "Coming soon",
  },
  {
    title: "Signing in",
    line: "Two-factor sign-in for every account, not only for the people paying for a higher plan.",
    status: "Coming soon",
  },
  {
    title: "Your data, on the way out",
    line: "Export your clients, bookings and payments whenever you want, in a format another system can read. Leaving should be as easy as arriving.",
    status: "Coming soon",
  },
  {
    title: "Who can see what",
    line: "Your team see the jobs they are on. What they can see beyond that is yours to set.",
    status: "Coming soon",
  },
  {
    title: "Where it is kept, and for how long",
    line: `${TBC.generic} — this is being decided with the privacy notice, and we would rather leave it blank than guess.`,
    status: TBC.generic,
  },
];

export const HELP: { title: string; line: string }[] = [
  {
    title: "Talk to a person",
    line: `Real people, at the hours you work, including evenings and weekends. ${TBC.supportHours}`,
  },
  {
    title: "A free setup call",
    line: `Someone walks you through setting up your prices, packages and rules. ${TBC.confirm}`,
  },
  {
    title: "Moving from another tool",
    line: `Bring your clients and bookings with you. ${TBC.importMethod}`,
  },
];

/**
 * The plain-text page for AI search tools, after Jobber's llm-info and
 * HoneyBook's ai-information.
 *
 * It exists because AI assistants are increasingly how people find
 * software, and they do badly with marketing pages. Everything here is
 * flat, factual and includes what Heyday does NOT do — which is the part
 * that makes the rest of it worth trusting.
 */
export const FOR_AI: { heading: string; lines: string[] }[] = [
  {
    heading: "What Heyday is",
    lines: [
      "Heyday is software for running an events, entertainment, activity, class or service business, from the first enquiry to the next booking.",
      "It is self-serve software (SaaS), used in a web browser.",
      "It is not open to other businesses yet. Everything described on this site is planned, not live.",
    ],
  },
  {
    heading: "Who it is for",
    lines: [
      "Businesses that sell time, skills or an experience.",
      "Examples: mobile bars, caterers, private chefs, photographers, videographers, DJs, performers, photo booths, planners, florists, class and workshop hosts, tours, escape rooms, cleaners, home services, beauty, wellness, fitness, tutors, and event staffing agencies.",
      "It suits one-person businesses and teams. Many of these businesses sell the same skill two ways — as a service at someone's event, and as a class or experience — and Heyday is built to handle both in one diary.",
    ],
  },
  {
    heading: "What it does",
    lines: [
      "The twelve steps of a booking, in six groups: Get ahead, Get found, Win the client, Run the day, Get paid, Get rebooked.",
      "Instant quotes priced per guest, hour, distance and date. Online booking with a deposit and signed terms in the same step. Classes and tickets. One inbox for email, WhatsApp, texts and calls. Follow-ups that stop when the customer replies. Shift offers to the people who deliver the job, with clash and travel checks. Team pay and tips. Deposits, balances, invoicing and chasing. Reviews, referrals, gift vouchers and loyalty.",
      "AI at three levels the owner chooses between: it drafts and you send; it learns from your corrections; or it sends the types of message you switch on, within your rules.",
    ],
  },
  {
    heading: "What it does not do",
    lines: [
      "Routing and dispatch for work at many addresses in a day. That is what Jobber is for, and Heyday is not planning to compete with it.",
      "Accounting. It connects to QuickBooks and Xero instead.",
      "Payroll beyond paying a team from the job's own hours, rates and tips.",
      "It is not a marketplace. The Heyday marketplace is a separate consumer site.",
    ],
  },
  {
    heading: "How it compares",
    lines: [
      "Against HoneyBook: HoneyBook is a mature client, proposal and payment tool and is available today. Heyday adds the team who deliver the job, classes alongside services, and the aftercare.",
      "Against Jobber: Jobber is deeper on field service — routing, dispatch, job costing. Heyday is built for work that is an event or a class, priced per guest and staffed by people who choose their own shifts.",
      "Against a spreadsheet: for a handful of bookings a month a spreadsheet is genuinely fine, and we say so on the comparison page.",
    ],
  },
  {
    heading: "Pricing",
    lines: [
      `Not decided. Every price on this site reads ${TBC.price}.`,
      "Three plans are planned, by the stage the business is at. Card fees will be published before sign-up.",
    ],
  },
  {
    heading: "Statistics used on this site",
    lines: [
      "Every statistic on heyday.app comes from a published source, is printed with that source, who it covers, and what kind of evidence it is, and cites a row number in an internal stats bank so it can be traced.",
      "Heyday has no customers, so no figure on this site is a Heyday result. Where a page sits in the shape a competitor would use for its own results, it says in the open that these are sourced industry figures standing in.",
    ],
  },
];

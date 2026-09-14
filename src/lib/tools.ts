/* ==================================================================== *
 *  Free tools and templates — templates T13 and T14, spec part 5.
 *
 *  Jobber's free tools have no email wall, and that is the part worth
 *  copying. A calculator that asks for an address before it shows you a
 *  number is an ad with arithmetic in it, and everybody can tell. These
 *  work, in full, for someone who never signs up.
 *
 *  Nothing any of them touches leaves the browser. Every page says so,
 *  and the tools genuinely have no network calls in them — which is also
 *  why the honest answer to "is my data safe?" is "there is no data".
 *
 *  The upsell comes AFTER the result, never before it. That ordering is
 *  in the spec and it is the whole difference between a useful page and
 *  a lead magnet.
 * ==================================================================== */

export type Tool = {
  slug: string;
  name: string;
  /** What it does, on the card. */
  line: string;
  /** The verb on the button. Never "Submit". */
  verb: string;
  /** The H1. */
  headline: string;
  highlight: string;
  sub: string;
};

export const TOOLS: Tool[] = [
  {
    slug: "pricing-calculator",
    name: "Class and event pricing calculator",
    line: "Find the price that covers your costs and pays you properly.",
    verb: "Work out my price",
    headline: "What should you charge?",
    highlight: "should you charge",
    sub: "Put in your costs and the calculator does the rest. Nothing is saved or sent.",
  },
  {
    slug: "quote-template",
    name: "Quote template",
    line: "Fill in the details and copy a clear, professional quote.",
    verb: "Make a quote",
    headline: "A quote they can say yes to.",
    highlight: "say yes to",
    sub: "Fill in the details and copy the result straight into an email. Nothing is saved or sent.",
  },
  {
    slug: "leak-check",
    name: "The leak check",
    line: "Sixteen quick questions that show where bookings and money slip away.",
    verb: "Start the check",
    headline: "Where is your business leaking?",
    highlight: "leaking",
    sub: "16 questions, about three minutes. You’ll get a score for each part of the business, and what to fix first. Nothing is saved or sent.",
  },
];

export const toolBySlug = (slug: string) => TOOLS.find((t) => t.slug === slug);

/* ---- Templates (T13) ------------------------------------------------ */

export type Template = {
  slug: string;
  name: string;
  line: string;
  /** What's in it, so the page is useful before anything is downloaded. */
  contains: string[];
};

export const TEMPLATES: Template[] = [
  {
    slug: "quote",
    name: "Quote template",
    line: "A clear quote with the price broken down, so nobody has to ask what's included.",
    contains: [
      "What's included, itemised",
      "What isn't, said plainly",
      "The deposit and when the balance falls due",
      "How long the price holds",
      "What happens if they cancel",
    ],
  },
  {
    slug: "follow-ups",
    name: "Follow-up messages (email and WhatsApp)",
    line: "Four messages for a quote that has gone quiet, written to be sent by a person.",
    contains: [
      "Two days later: a short nudge",
      "A week later: one useful thing, no pressure",
      "Two weeks later: the date is going",
      "A month later: the door stays open",
    ],
  },
  {
    slug: "invoice",
    name: "Invoice template",
    line: "An invoice that gets paid, with the terms where people actually read them.",
    contains: [
      "What was delivered, in their words not yours",
      "The deposit already paid, deducted",
      "The due date as a date, not “30 days”",
      "How to pay, with fewer steps than they expect",
    ],
  },
];

export const templateBySlug = (slug: string) =>
  TEMPLATES.find((t) => t.slug === slug);

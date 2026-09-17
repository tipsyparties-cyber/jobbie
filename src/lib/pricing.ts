import { SITE, TBC } from "@/lib/site";

/* ==================================================================== *
 *  Pricing — template T8, spec part 4, and the working page at
 *  reference/site/pricing.html.
 *
 *  Almost everything on this page is a placeholder, and every one of them
 *  stays visible exactly as written. That is the brief's rule, and here
 *  it is also the only honest option: prices are not decided, the plan
 *  names are suggestions, the trial length is unknown and the card fees
 *  have not been negotiated. A pricing page that filled those in would be
 *  making up the single thing visitors came to find out.
 *
 *  The comparison table carries a third state beyond yes and no:
 *  "suggested". Those are the rows the plan structure is being tested on
 *  — they show the SHAPE of the plans without claiming the shape is
 *  settled. Everything else is [TBC], and the note under the table says
 *  which is which.
 *
 *  The "Most popular" sticker exists in the code and is switched off,
 *  because it is not true yet. It goes on the middle plan the day there
 *  are enough customers for "popular" to mean something.
 * ==================================================================== */

export type PlanCell = "yes" | "no" | "suggested-yes" | "suggested-no" | string;

export type Plan = {
  id: "solo" | "crew" | "operator";
  /** Suggested, not decided. The page says so. */
  name: string;
  tagline: string;
  /** The one-line "everything in X, plus". */
  inherits?: string;
  includes: string[];
  cta: { label: string; href: string };
  /** Only once it is true. See the comment above. */
  mostPopular: boolean;
};

export const PLANS: Plan[] = [
  {
    id: "solo",
    name: "Solo",
    tagline: "For the business that does it all itself.",
    includes: [
      "Instant quotes the customer can adjust",
      "Online booking and payments",
      "One inbox for email, WhatsApp, texts and calls",
      "Follow-ups and reminders",
      "Reviews and referrals",
      "AI replies as drafts you approve (AI level 1)",
      // The one thing neither Jobber nor HoneyBook can offer: they sell
      // software, they do not send you customers. Free listing is
      // Russell's ruling; the commission is not decided and says so.
      `A free listing on ${SITE.marketplace} (${TBC.commission.replace(/[[\]]/g, "")})`,
    ],
    cta: { label: "Join early access", href: "/early-access" },
    mostPopular: false,
  },
  {
    id: "crew",
    name: "Crew",
    tagline: "For owners who deliver with a few helpers.",
    inherits: "Solo",
    includes: [
      "Shift offers and staffing",
      "Team pay and tips",
      "Hiring and onboarding",
      "Checklists and kit lists",
      "The client portal",
      "AI that learns from your corrections (AI level 2)",
    ],
    cta: { label: "Join early access", href: "/early-access" },
    mostPopular: false,
  },
  {
    id: "operator",
    name: "Operator",
    tagline: "For a team that runs without you in the room.",
    inherits: "Crew",
    includes: [
      "The Command Centre and reports",
      "Profit per job",
      "Advanced pricing: busy-date and off-peak prices",
      "The AI control panel",
      `AI autopilot for simple messages (AI level 3) [or as an add-on: ${TBC.confirm.replace(/[[\]]/g, "")}]`,
    ],
    cta: { label: "Book a demo", href: "/demo" },
    mostPopular: false,
  },
];

/** Card and payment fees, shown before sign-up the way Jobber does. */
export const FEES: { label: string; value: string }[] = [
  { label: "Card payments", value: TBC.generic },
  { label: "Pay by bank", value: TBC.generic },
  { label: "Tap to pay (coming soon)", value: TBC.generic },
  { label: "Payouts to your team", value: TBC.generic },
];

export const FEES_NOTE =
  "Bookings you bring in from other marketplaces: [fee to confirm; the suggestion is no fee].";

export const ADDONS: { label: string; price: string }[] = [
  {
    label: "AI receptionist: answers calls and texts, takes messages, books.",
    price: TBC.price,
  },
  { label: "Extra phone and WhatsApp numbers.", price: TBC.price },
  {
    label: "Message bundles: more texts and WhatsApps each month.",
    price: TBC.price,
  },
];

/**
 * The comparison table.
 *
 * Keyed by feature slug. A slug missing from here gets [TBC] in all three
 * columns, which is the honest default — most of the plan split is not
 * decided, and defaulting to a tick would quietly invent it.
 */
export const PLAN_MATRIX: Record<string, [PlanCell, PlanCell, PlanCell]> = {
  // Get ahead
  team: ["suggested-no", "suggested-yes", "suggested-yes"],
  // Get found
  "booking-page": ["suggested-yes", "yes", "yes"],
  "ads-that-know-which-bookings-pay": [TBC.generic, TBC.generic, "suggested-yes"],
  // Win the client
  quotes: ["suggested-yes", "yes", "yes"],
  "online-booking": ["suggested-yes", "yes", "yes"],
  "follow-ups": ["suggested-yes", "yes", "yes"],
  "replies-that-write-themselves": [
    "Level 1 (suggested)",
    "Levels 1–2 (suggested)",
    "Levels 1–3 (suggested)",
  ],
  "ai-receptionist": ["Add-on (suggested)", "Add-on", "Add-on"],
  // Run the day
  inbox: ["suggested-yes", "yes", "yes"],
  "client-portal": [TBC.generic, "suggested-yes", "yes"],
  "client-records": ["suggested-yes", "yes", "yes"],
  scheduling: ["suggested-yes", "yes", "yes"],
  "shift-offers": ["suggested-no", "suggested-yes", "yes"],
  "checklists-and-kit-lists": [TBC.generic, "suggested-yes", "yes"],
  "hiring-and-onboarding": ["suggested-no", "suggested-yes", "yes"],
  // Get paid
  payments: ["suggested-yes", "yes", "yes"],
  tips: [TBC.generic, "suggested-yes", "yes"],
  invoicing: ["suggested-yes", "yes", "yes"],
  "team-pay-and-expenses": ["suggested-no", "suggested-yes", "yes"],
  "profit-per-job": ["suggested-no", "suggested-no", "suggested-yes"],
  reporting: ["suggested-no", "suggested-no", "suggested-yes"],
  // Get rebooked
  reviews: ["suggested-yes", "yes", "yes"],
};

export const MATRIX_NOTE =
  "Every feature is coming soon. “Suggested” marks follow the plan structure we’re testing; nothing is final.";

/** The reassurance row. Four claims, four placeholders. */
export const REASSURANCE: { title: string; note: string }[] = [
  { title: "Money back if it’s not for you.", note: "[guarantee to confirm]" },
  { title: "A free setup call for everyone.", note: TBC.confirm },
  { title: "Your price, locked.", note: "[price lock to confirm]" },
  {
    title:
      "Real people to help, at the hours you work, including evenings and weekends.",
    note: TBC.supportHours,
  },
];

export const PRICING_FAQ: { q: string; a: string }[] = [
  {
    q: "Can I try Heyday for free?",
    a: "Heyday opens with early access. Join now and we’ll let you know when you can start. [trial length to confirm]",
  },
  { q: "Do I need a card to start?", a: TBC.generic },
  {
    q: "Which plan is right for me?",
    a: "Pick by the stage you’re at: Solo if you do it all yourself, Crew if you deliver with helpers, Operator if a team delivers and you run the business. You can move up as you grow. [plan names to confirm]",
  },
  { q: "Can I change plans later?", a: TBC.generic },
  {
    q: "What are the card fees?",
    a: "They’re shown on this page before you sign up. [rates TBC]",
  },
  {
    q: "Do you charge on bookings from other marketplaces?",
    a: "[to confirm: the suggestion is no fee on bookings you bring in from other platforms]",
  },
  {
    q: "Is the AI extra?",
    a: "Every plan drafts replies for you to approve. Higher plans add AI that learns from your corrections, and AI that handles simple messages on its own within your rules. [plan split to confirm]",
  },
  {
    q: "Can you help me move from the tool I use now?",
    a: "Yes: bring your clients and bookings with you, and talk to a real person when you need one. [to confirm]",
  },
];

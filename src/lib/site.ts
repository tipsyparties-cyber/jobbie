/* ==================================================================== *
 *  Site-wide constants.
 *
 *  The product name lives in one place (prompt section 1) so a rename is a
 *  single edit rather than a search across ninety-four routes.
 *
 *  The placeholders are the ones listed in DECISIONS-NEEDED.md. They are
 *  constants rather than literals typed into pages for one reason: when Jem
 *  and Russell answer one, it gets answered everywhere at once, and until
 *  they do it is impossible to accidentally ship a guess in place of one.
 *  They must appear on the page exactly as written.
 * ==================================================================== */

/**
 * The PROJECT's name, which is not the product's name.
 *
 * The product is Heyday, one word, and that is what every page says —
 * the brief decided that and nothing here changes it.
 *
 * "Heyday Jobbie" exists only so this repo can be told apart from the
 * Heyday marketplace project, which is a different site with its own
 * look. They share a brand and nothing else, and two tabs both reading
 * "Heyday" on localhost has already sent Russell to the wrong one.
 *
 * It appears in the dev browser tab, in package.json and in the README.
 * It must never appear on a page.
 */
export const PROJECT = "Heyday Jobbie" as const;

export const SITE = {
  /** The brand. One word (prompt section 1). */
  name: "Heyday",
  /** Where customers find these businesses. */
  marketplace: "the Heyday marketplace",
  tagline: "Make your day a Heyday.",
  /** The positioning line, used in metadata and on /for-ai. */
  promise:
    "One workflow for your whole business, from the first hello to the next booking.",
  description:
    "Heyday runs a whole events, classes or services business — from the first enquiry to the rebooking. Quotes, bookings, the team who deliver, getting paid and getting rebooked, in one workflow.",
} as const;

/**
 * Still to be decided. Rendered verbatim.
 *
 * Do not fill these in, and do not write a "sensible default" next to one.
 * A placeholder on a live page is embarrassing for an afternoon; an invented
 * price or support hour is a promise the business then has to keep.
 */
export const TBC = {
  price: "[PRICE TBC]",
  phone: "[PHONE TBC]",
  supportHours: "[support hours to confirm]",
  /** Money-back guarantee, free setup call, and anything else promised. */
  confirm: "[to confirm]",
  trial: "[trial to confirm]",
  importMethod: "[import method to confirm]",
  /** Rival facts. Re-check on the day the page goes live. */
  checkOnTheDay: "[check on the day]",
  /** Figures Russell has not yet approved. Leave the claim out. */
  needsApproval: "[needs approval]",
  generic: "[TBC]",
  /** The marketplace has its own site; the address is not settled here. */
  marketplaceUrl: "[marketplace URL]",
} as const;

/**
 * What the buttons do today.
 *
 * The product is not open to other businesses yet, so "Start free trial"
 * collects early-access sign-ups. The words stay as they are because that is
 * what a visitor expects to click; the honesty lives on the page it opens,
 * which says plainly that Heyday is in early access.
 */
export const CTA = {
  primary: { label: "Start free trial", href: "/early-access" },
  secondary: { label: "Book a demo", href: "/demo" },
  /** Used where the feature itself is not live yet. */
  comingSoon: { label: "Join early access", href: "/early-access" },
  login: { label: "Log in", href: "/login" },
} as const;

/** Every feature says this until Jem and Russell decide otherwise. */
export const DEFAULT_STATUS = "Coming soon" as const;

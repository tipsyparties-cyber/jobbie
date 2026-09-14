/* ==================================================================== *
 *  Who it's for — spec part 4, and reference/site/who-its-for.html.
 *
 *  Jobber has an industries page per trade, and about 1,700 pages as a
 *  result. Heyday has one page and six kinds, because the brief is
 *  explicit that the scale is the thing NOT to copy — and because the
 *  honest answer to "is it for me?" is a rule, not a list: if you sell
 *  your time, your skills or an experience, it's for you.
 *
 *  The six kinds have anchors, and the header's Who it's for panel links
 *  straight to them. Change a slug here and the menu follows.
 * ==================================================================== */

export type Kind = {
  /** The anchor the header menu links to. */
  slug: string;
  name: string;
  /** Who that means, in plain words. */
  who: string;
  /** The pain, in the owner's words. */
  pain: string;
  /** Three features, by slug. */
  features: { label: string; slug: string }[];
  art: string;
};

export const KINDS: Kind[] = [
  {
    slug: "events-and-hospitality",
    name: "Events and hospitality",
    who: "Mobile bars, caterers, private chefs, planners, florists and more.",
    pain: "Stop working out every quote by hand.",
    features: [
      { label: "Instant quotes", slug: "quotes" },
      { label: "Shift offers and staffing", slug: "shift-offers" },
      { label: "Payments and deposits", slug: "payments" },
    ],
    art: "a caterer plating canapés at a pass, staff moving past",
  },
  {
    slug: "classes-and-experiences",
    name: "Classes and experiences",
    who: "Workshop and class hosts, team-building, tours and escape rooms.",
    pain: "Stop running your classes from a spreadsheet.",
    features: [
      { label: "Classes, tickets and private groups", slug: "classes-and-tickets" },
      { label: "Gift vouchers", slug: "gift-vouchers" },
      { label: "Reviews", slug: "reviews" },
    ],
    art: "a class of six at a painting night, the host leaning in to help",
  },
  {
    slug: "photo-video-and-entertainment",
    name: "Photo, video and entertainment",
    who: "Photographers, videographers, DJs and musicians, performers and photo booths.",
    pain: "Stop losing enquiries while you’re working.",
    features: [
      { label: "Missed-call capture", slug: "missed-call-capture" },
      { label: "Replies that write themselves", slug: "replies-that-write-themselves" },
      { label: "Contracts and e-signatures", slug: "contracts-and-e-signatures" },
    ],
    art: "a photographer crouched mid-shot at a first dance",
  },
  {
    slug: "home-and-personal-services",
    name: "Home and personal services",
    who: "Cleaners, landscapers, handymen, removals, pet care, tutors and more.",
    pain: "Stop chasing clients for payment.",
    features: [
      { label: "Online booking and instant book", slug: "online-booking" },
      { label: "Invoicing and chasing", slug: "invoicing" },
      { label: "One inbox", slug: "inbox" },
    ],
    art: "a landscaper’s hands and a van tailgate, tools laid out",
  },
  {
    slug: "beauty-wellness-and-fitness",
    name: "Beauty, wellness and fitness",
    who: "Hair and make-up artists, therapists, trainers and wellness hosts.",
    pain: "Stop starting from zero every month.",
    features: [
      { label: "Packages, memberships and regulars", slug: "packages-and-memberships" },
      { label: "Loyalty", slug: "loyalty" },
      { label: "Follow-ups and autoresponders", slug: "follow-ups" },
    ],
    art: "a make-up artist working on a bride by a window",
  },
  {
    slug: "staffing-and-hire",
    name: "Staffing and hire",
    who: "Event staffing agencies, rentals and anyone who supplies people or kit.",
    pain: "Stop texting your whole team to fill one shift.",
    features: [
      { label: "Shift offers and staffing", slug: "shift-offers" },
      { label: "Hiring and onboarding", slug: "hiring-and-onboarding" },
      { label: "Team pay and expenses", slug: "team-pay-and-expenses" },
    ],
    art: "a line of servers in uniform getting a briefing before an event",
  },
];

/**
 * The same skill sold two ways.
 *
 * This is the single clearest statement of what Heyday is for, and no
 * rival has a page for it: other tools make you choose between proposals
 * for the service and tickets for the class, so anyone who does both runs
 * two systems and one diary they keep by hand.
 */
export const TWO_WAYS: { trade: string; service: string; experience: string }[] = [
  {
    trade: "Bartender",
    service: "Bar service at a wedding",
    experience: "A cocktail-making class",
  },
  {
    trade: "Photographer",
    service: "Shooting an event",
    experience: "A photography workshop",
  },
  {
    trade: "Chef or caterer",
    service: "Private dining or catering",
    experience: "A cooking class",
  },
  {
    trade: "Florist",
    service: "Event flowers",
    experience: "A flower-arranging workshop",
  },
  {
    trade: "Magician or entertainer",
    service: "A show",
    experience: "A magic workshop",
  },
];

/** The four stages, in the fuller form this page uses. */
export const GROWTH: { title: string; line: string }[] = [
  {
    title: "Doing it all yourself",
    line: "One person selling and delivering. Instant quotes, online booking, one inbox and follow-ups stop the admin eating your evenings.",
  },
  {
    title: "Owner-operator",
    line: "You still deliver, with a few helpers. Shift offers, your team’s pay and tips, checklists and a client portal.",
  },
  {
    title: "A team",
    line: "You run the business and a team delivers. Hiring and onboarding, the Command Centre, reports and AI replies.",
  },
  {
    title: "It runs itself",
    line: "You handle the exceptions. Automations you set, AI that drafts and asks, and alerts when something needs a person.",
  },
];

/** The kinds of business the hero's line rotates through, ending on "you". */
export const ROTATING = [
  "caterers",
  "class hosts",
  "photographers",
  "mobile bars",
  "DJs",
  "cleaners",
  "trainers",
  "staffing agencies",
  "you",
];

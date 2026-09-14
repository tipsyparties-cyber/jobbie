/* ==================================================================== *
 *  Integrations — template T10, spec part 2, and the working page at
 *  reference/site/integrations.html.
 *
 *  Two rules, both from the brief, both easy to break by accident:
 *
 *  1. **Names, not logos.** No rival or partner logo appears anywhere on
 *     this site until Jem confirms it is allowed. Using a company's mark
 *     implies a relationship that does not exist yet, and for several of
 *     these the relationship is exactly what is still to be agreed. The
 *     page says so out loud rather than leaving blank tiles.
 *
 *  2. **Everything is "Coming soon"** until Heyday is live. None of these
 *     is connected. A page of integration cards with no status on them
 *     would read as a list of things that work.
 *
 *  The marketplace connectors carry one extra clause — "following their
 *  rules" — because bringing bookings across from another platform is
 *  subject to that platform's terms, and promising it unconditionally
 *  would be a promise Heyday is not in a position to make.
 * ==================================================================== */

export type IntegrationCategory =
  | "payments"
  | "automation"
  | "accounting"
  | "calendar"
  | "advertising"
  | "messaging"
  | "marketplaces";

export const CATEGORY_LABELS: Record<IntegrationCategory, string> = {
  payments: "Payments",
  automation: "Automation",
  accounting: "Accounting",
  calendar: "Calendar",
  advertising: "Advertising",
  messaging: "Messaging",
  marketplaces: "Marketplaces",
};

export type Integration = {
  slug: string;
  name: string;
  category: IntegrationCategory;
  /** One line: what it connects, on the card. */
  line: string;
  /** The fuller explanation on its own page. */
  what: string;
  /** How it connects, in plain words. */
  how: string;
  /** Feature slugs this integration serves. */
  features: string[];
};

export const INTEGRATIONS: Integration[] = [
  {
    slug: "stripe",
    name: "Stripe",
    category: "payments",
    line: "Takes card payments for deposits, balances and invoices.",
    what: "Stripe processes the card payments Heyday asks for: the deposit when someone books, the balance before the day, invoices afterwards, and the payouts to your team.",
    how: "You connect your own Stripe account, so the money goes to you and not through Heyday. Card rates are Stripe’s plus anything Heyday adds, and both are shown on the pricing page before you sign up.",
    features: ["payments", "invoicing", "team-pay-and-expenses", "tips"],
  },
  {
    slug: "zapier",
    name: "Zapier",
    category: "automation",
    line: "Connects Heyday to other apps you use, so information moves between them.",
    what: "Zapier lets Heyday send information to, and take it from, thousands of other apps — the ones too specific to your business for Heyday to build a connector for.",
    how: "A Heyday event, such as a new booking, starts a Zap. A Zap can also create something in Heyday.",
    features: ["integrations", "tasks", "follow-ups"],
  },
  {
    slug: "quickbooks",
    name: "QuickBooks",
    category: "accounting",
    line: "Sends your clients, invoices and payments to your accounts.",
    what: "Your clients, invoices and payments go across to QuickBooks, so your accounts are not a second job at the end of the quarter.",
    how: "You connect your QuickBooks account and choose which records travel.",
    features: ["invoicing", "payments", "reporting", "profit-per-job"],
  },
  {
    slug: "xero",
    name: "Xero",
    category: "accounting",
    line: "Sends your clients, invoices and payments to your accounts.",
    what: "The same as QuickBooks, for businesses that use Xero: clients, invoices and payments go across to your accounts.",
    how: "You connect your Xero account and choose which records travel.",
    features: ["invoicing", "payments", "reporting", "profit-per-job"],
  },
  {
    slug: "google-calendar",
    name: "Google Calendar",
    category: "calendar",
    line: "Keeps your Heyday diary and your Google Calendar in step.",
    what: "Bookings appear in your Google Calendar, and anything already in it blocks the times Heyday offers, so you cannot be booked while you are somewhere else.",
    how: "Two-way, so a change in either place shows in the other.",
    features: ["scheduling", "online-booking", "booking-page"],
  },
  {
    slug: "google-ads",
    name: "Google Ads",
    category: "advertising",
    line: "Sends the real value of each booking back to Google Ads, so your ads learn which clicks book.",
    what: "Most advertising optimises for a form being filled in. This sends back what the booking was actually worth, so the ads learn to find the customers who book and spend, not the ones who enquire and vanish.",
    how: "Conversions are sent back when a booking is confirmed and again when it is paid.",
    features: ["ads-that-know-which-bookings-pay", "booking-page", "enquiries"],
  },
  {
    slug: "microsoft-ads",
    name: "Microsoft Ads",
    category: "advertising",
    line: "Sends the real value of each booking back to Microsoft Ads.",
    what: "The same as Google Ads, for businesses advertising on Microsoft.",
    how: "Conversions are sent back when a booking is confirmed and again when it is paid.",
    features: ["ads-that-know-which-bookings-pay", "booking-page"],
  },
  {
    slug: "whatsapp",
    name: "WhatsApp",
    category: "messaging",
    line: "Brings WhatsApp messages into the one inbox, and sends WhatsApp reminders and nudges.",
    what: "WhatsApp is where a lot of these conversations actually happen, and it is the channel most rivals leave out. Messages land in the same thread as the email and the call note, with the booking beside them.",
    how: "Through a WhatsApp Business account, following WhatsApp’s rules on what may be sent and when.",
    features: ["inbox", "follow-ups", "replies-that-write-themselves", "on-the-day"],
  },
  {
    slug: "airbnb-experiences",
    name: "Airbnb Experiences",
    category: "marketplaces",
    line: "Brings your Airbnb Experiences bookings into the same diary, following Airbnb Experiences’s rules.",
    what: "Bookings you win on Airbnb Experiences appear in the same diary as your direct ones, so the same date cannot be sold twice.",
    how: "Following Airbnb Experiences’s own rules on what may be connected and how.",
    features: ["sell-everywhere", "scheduling", "client-records"],
  },
  {
    slug: "classbento",
    name: "ClassBento",
    category: "marketplaces",
    line: "Brings your ClassBento bookings into the same diary, following ClassBento’s rules.",
    what: "Class bookings from ClassBento appear alongside your direct ones, with the same seats and the same capacity.",
    how: "Following ClassBento’s own rules on what may be connected and how.",
    features: ["sell-everywhere", "classes-and-tickets", "scheduling"],
  },
  {
    slug: "togather",
    name: "Togather",
    category: "marketplaces",
    line: "Brings your Togather bookings into the same diary, following Togather’s rules.",
    what: "Event bookings from Togather appear in the same diary, so staffing and kit are planned from one place.",
    how: "Following Togather’s own rules on what may be connected and how.",
    features: ["sell-everywhere", "scheduling", "shift-offers"],
  },
  {
    slug: "letsbatch",
    name: "LetsBatch",
    category: "marketplaces",
    line: "Brings your LetsBatch bookings into the same diary, following LetsBatch’s rules.",
    what: "Bookings from LetsBatch appear alongside your direct ones.",
    how: "Following LetsBatch’s own rules on what may be connected and how.",
    features: ["sell-everywhere", "classes-and-tickets"],
  },
  {
    slug: "yuup",
    name: "Yuup",
    category: "marketplaces",
    line: "Brings your Yuup bookings into the same diary, following Yuup’s rules.",
    what: "Bookings from Yuup appear alongside your direct ones.",
    how: "Following Yuup’s own rules on what may be connected and how.",
    features: ["sell-everywhere", "classes-and-tickets"],
  },
];

export const integrationBySlug = (slug: string) =>
  INTEGRATIONS.find((i) => i.slug === slug);

export const CATEGORIES = Object.keys(CATEGORY_LABELS) as IntegrationCategory[];

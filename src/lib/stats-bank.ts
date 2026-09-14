/* ==================================================================== *
 *  The stats bank — the only statistics the site may use.
 *
 *  Transcribed from docs/heyday/STATS-BANK.md, checked 13 September 2026.
 *  A page references a row BY NUMBER, so nothing on the site can quote a
 *  figure that is not in here, and changing a row changes it everywhere at
 *  once.
 *
 *  Every row carries its source, who it covers, and what KIND of evidence
 *  it is. The kind is the field that matters and the one usually left off:
 *  row 1 is a direct rival's own marketing data, and a page that prints it
 *  without saying so is passing a competitor's sales copy off as a
 *  finding. `StatBlock` prints all three, every time.
 *
 *  The brief's rules, kept here so they travel with the data:
 *  - Order of preference: Heyday's own approved figures, then independent
 *    studies, then a vendor's own data labelled as that vendor's.
 *  - Don't stretch a figure. Say what was measured, not more — row 2
 *    measured leads QUALIFIED, not bookings.
 *  - Say when a study is from another industry or country.
 *  - Anything in DO_NOT_USE below is out, however often it is quoted.
 * ==================================================================== */

export type StatKind =
  | "Peer-reviewed"
  | "Independent study"
  | "Independent research"
  | "Systematic review"
  | "Industry report"
  | "Industry survey"
  | "Vendor data"
  | "Vendor data, from a direct rival"
  | "Vendor research";

export type Stat = {
  row: number;
  /** The claim, written as the site may state it and no stronger. */
  claim: string;
  /** A short form for headline use: the number and its one line. */
  headline?: { value: string; line: string };
  source: string;
  url?: string;
  covers: string;
  kind: StatKind;
};

export const STATS: Stat[] = [
  {
    row: 1,
    claim:
      "Quotes sent within 4 hours book 25% more often. Booking rates run 22% when the quote is sent within four hours, 18% later the same day, and 16% the next day or later.",
    headline: {
      value: "25%",
      line: "more bookings when the quote goes out within 4 hours. Heyday's instant quotes are built to go out in seconds.",
    },
    source:
      "Flashquotes homepage, from 32,000+ quoted leads across 100+ established operators over twelve months. Rechecked 13 September 2026.",
    url: "https://flashquotes.com/",
    covers: "Flashquotes customers: mobile bars, coffee carts, photo booths and DJs",
    kind: "Vendor data, from a direct rival",
  },
  {
    row: 2,
    claim:
      "Firms that contacted a lead within an hour were nearly seven times as likely to qualify the lead as those that waited even an hour longer, and more than sixty times as likely as those that waited 24 hours or more.",
    source:
      "Harvard Business Review, Oldroyd, McElheran and Elkington, “The Short Life of Online Sales Leads”, March 2011",
    url: "https://hbr.org/2011/03/the-short-life-of-online-sales-leads",
    covers: "1.25 million sales leads, US",
    kind: "Independent study",
  },
  {
    row: 3,
    claim:
      "Of 2,241 US companies audited, the average time to respond to a lead was 42 hours, and 23% never responded at all.",
    source: "Harvard Business Review, “The Short Life of Online Sales Leads”, March 2011",
    url: "https://hbr.org/2011/03/the-short-life-of-online-sales-leads",
    covers: "2,241 US companies",
    kind: "Independent study",
  },
  {
    row: 4,
    claim:
      "62% of calls to small businesses went unattended: 37.8% went to voicemail and 24.3% got no response.",
    source: "411 Locals, “SMBs Don’t Answer 62% Of Phone Calls”, January 2016",
    url: "https://411locals.us/small-business-owners-dont-answer-62-of-phone-calls/",
    covers: "85 US businesses over 30 days — a small and older sample; say so",
    kind: "Independent study",
  },
  {
    row: 5,
    claim: "56% of calls to businesses are answered by a person.",
    source: "Invoca, Lead Conversion Benchmarks Report 2026",
    url: "https://www.invoca.com/reports/the-invoca-lead-conversion-benchmarks-report-2026",
    covers: "Invoca call-tracking data",
    kind: "Vendor data",
  },
  {
    row: 6,
    claim:
      "59% of small businesses have invoices overdue by 30+ days, up from 47%. Those owed money are owed $17.7K on average.",
    headline: {
      value: "59%",
      line: "of small businesses are owed money 30 days past due. Heyday collects before the day instead.",
    },
    source: "Intuit QuickBooks, 2026 Small Business Late Payments Report, July 2026",
    url: "https://quickbooks.intuit.com/r/small-business-data/small-business-late-payments-report-2026/",
    covers: "About 5,000 small businesses a quarter, across the US, Canada, UK and Australia",
    kind: "Industry report",
  },
  {
    row: 7,
    claim:
      "39% of owners say one late payment made it hard to cover payroll or bills in the past year.",
    source: "Intuit QuickBooks, 2026 Small Business Late Payments Report, July 2026",
    url: "https://quickbooks.intuit.com/r/small-business-data/small-business-late-payments-report-2026/",
    covers: "About 5,000 small businesses a quarter, across the US, Canada, UK and Australia",
    kind: "Industry report",
  },
  {
    row: 8,
    claim:
      "Increasing customer retention by 5% increases profits by 25% to 95%.",
    headline: {
      value: "25–95%",
      line: "more profit from a 5% lift in customer retention. Heyday is built to turn one booking into a regular.",
    },
    source:
      "Bain & Company research (Frederick Reichheld), as summarised by Harvard Business Review, “The Value of Keeping the Right Customers”, October 2014",
    url: "https://hbr.org/2014/10/the-value-of-keeping-the-right-customers",
    covers: "Cross-industry",
    kind: "Independent research",
  },
  {
    row: 9,
    claim:
      "92% of consumers trust recommendations from friends and family above all other advertising, and 70% trust online reviews.",
    source: "Nielsen, Global Trust in Advertising, 2012",
    url: "https://www.nielsen.com/insights/2012/consumer-trust-in-online-social-and-mobile-advertising-grows/",
    covers: "28,000+ people across 56 countries",
    kind: "Independent study",
  },
  {
    row: 10,
    claim:
      "A referred customer is worth at least 16% more than a non-referred one, and stays longer.",
    source:
      "Schmitt, Skiera and Van den Bulte, “Referral Programs and Customer Value”, Journal of Marketing, 2011",
    url: "https://journals.sagepub.com/doi/10.1509/jm.75.1.46",
    covers: "About 10,000 bank customers, Germany",
    kind: "Peer-reviewed",
  },
  {
    row: 11,
    claim: "97% of consumers read reviews for local businesses.",
    source: "BrightLocal, Local Consumer Review Survey 2026",
    url: "https://www.brightlocal.com/research/local-consumer-review-survey/",
    covers: "1,002 US adults",
    kind: "Industry survey",
  },
  {
    row: 12,
    claim:
      "78% of consumers were asked for a review in the past year, and 83% of those asked left one.",
    source: "BrightLocal, Local Consumer Review Survey 2026",
    url: "https://www.brightlocal.com/research/local-consumer-review-survey/",
    covers: "1,002 US adults",
    kind: "Industry survey",
  },
  {
    row: 13,
    claim: "47% of consumers won’t use a business with fewer than 20 reviews.",
    source: "BrightLocal, Local Consumer Review Survey 2026",
    url: "https://www.brightlocal.com/research/local-consumer-review-survey/",
    covers: "1,002 US adults",
    kind: "Industry survey",
  },
  {
    row: 14,
    claim: "Text reminders raised attendance from 67.8% to 78.6%.",
    source:
      "Cochrane systematic review, Gurol-Urganci et al., 2013",
    url: "https://www.cochranelibrary.com/cdsr/doi/10.1002/14651858.CD007458.pub3/full",
    covers:
      "8 trials, 6,615 people, healthcare appointments — a different setting; say so",
    kind: "Systematic review",
  },
  {
    row: 15,
    claim:
      "No-show rates were 0.9% with prepayment, 1.7% with deposits and 3% with card holds.",
    source: "Tock, December 2023 to March 2024",
    url: "https://www.exploretock.com/join/resources/eliminate-no-shows-3-tock-tools/",
    covers:
      "Tock restaurants, wineries and bars. No no-deposit baseline was given, so the figures compare methods, not the presence of a deposit",
    kind: "Vendor data",
  },
  {
    row: 16,
    claim:
      "Americans schedule 60% of their appointments with businesses online, and 33% by phone.",
    source: "Eliciting Insights, Consumer Scheduling Study, March 2023",
    url: "https://elicitinginsights.com/wp-content/uploads/2023/03/Eliciting-Insights-Consumer-Scheduling-Study-2023.pdf",
    covers: "384 US healthcare consumers — a different setting; say so",
    kind: "Industry survey",
  },
  {
    row: 17,
    claim: "40% of online bookings happen outside business hours.",
    source: "SimplyBook.me, own platform data, 2025",
    url: "https://simplybook.me/en/blog/online-booking-statistics",
    covers: "The SimplyBook.me platform",
    kind: "Vendor data",
  },
  {
    row: 18,
    claim:
      "90% of customers rate an immediate response as important, and 60% define immediate as 10 minutes or less.",
    headline: {
      value: "90%",
      line: "of customers want an immediate reply. Heyday answers day and night, in your words.",
    },
    source:
      "HubSpot Research (2018), cited in HubSpot’s State of Service Report 2022",
    url: "https://www.hubspot.com/hubfs/assets/flywheel%20campaigns/HubSpot%20Annual%20State%20of%20Service%20Report%20-%202022.pdf",
    covers: "Not stated by the publisher",
    kind: "Vendor research",
  },
  {
    row: 19,
    claim: "70.22% of online shopping carts are abandoned on average.",
    source: "Baymard Institute, average of 50 studies, updated September 2025",
    url: "https://baymard.com/lists/cart-abandonment-rate",
    covers: "Online retail — a different setting; say so",
    kind: "Independent research",
  },
  {
    row: 20,
    claim:
      "Small business owners spend 11 hours a week on admin and finance tasks.",
    headline: {
      value: "11 hours",
      line: "a week on admin for the average small business owner. Heyday is built to hand it back.",
    },
    source:
      "American Express and Small Business Saturday UK, SME Business Barometer, July 2026, reported by Retail Times",
    url: "https://retailtimes.co.uk/amex-sme-barometer-small-business-owners-spend-nearly-twice-the-time-on-admin-than-growing-their-business/",
    covers: "1,000 UK business owners — a different country; say so",
    kind: "Industry survey",
  },
  {
    row: 21,
    claim:
      "43% of US adults have at least one unused gift card, worth about $27 billion in total.",
    source: "Bankrate (YouGov), Gift Card Survey, September 2024",
    url: "https://www.bankrate.com/f/102997/x/c53caa68d4/gift-card-survey-press-release.pdf",
    covers: "2,373 US adults",
    kind: "Industry survey",
  },
  {
    row: 22,
    claim:
      "61% of shoppers spent more than the value of the gift card when using it.",
    source: "Gift Card and Voucher Association, State of the Nation 2024 Vol. 2",
    url: "https://www.gcva.co.uk/knowledge-hub/gcva-state-of-the-nation-2024-vol-2",
    covers: "2,000 UK consumers — a different country; say so",
    kind: "Industry survey",
  },
];

/**
 * Rows that look useful and are not. Kept in code rather than only in the
 * markdown, because the failure mode is someone reaching for a figure they
 * half-remember from a rival's homepage — and this is the list that says
 * why each one is out.
 */
export const DO_NOT_USE = [
  "“Quotes sent within 4 hours book 25% more often” credited to Jobber. It is Flashquotes' figure, row 1.",
  "Jobber's “get paid 4x faster”, “80% of campaigns lead to new work” (70% elsewhere on the same site) and “90% say reviews influence their decision”. No source, and two of them disagree with each other.",
  "Jobber's “Marketing Tools customers grow 2x faster”. It compares users with non-users, so it is correlation, not cause.",
  "“85% of callers won't call back” and “62% call a competitor instead”. Only found on AI-receptionist sellers' pages, with no study behind them.",
  "“Fewer than 3% of callers leave a voicemail”. Only found in secondary copies.",
  "“67% prefer to book online (GetApp 2024)”. The original cannot be found.",
  "“Managers spend 8+ hours a week on scheduling (Deputy)”. The original cannot be found.",
  "“Good, better, best raises the average ticket 15 to 25%”. Vendor blogs with no source.",
  "Nielsen 2015's “83% trust recommendations”. The page is gone; use the 2012 figure, row 9.",
  "“68% of gift card users spend more than the value”. It conflicts with the same body's 61%, row 22.",
  "“Time spent chasing late payments”, credited to QuickBooks. It is in neither report.",
] as const;

/**
 * Pages with no credible statistic yet: good/better/best options,
 * scheduling time, deposits, tips, kit lists and hiring. Those pages use
 * the worked example alone rather than borrowing a number from a
 * neighbouring claim.
 */
export const statByRow = (row: number) => STATS.find((s) => s.row === row);

/**
 * The source line, written out.
 *
 * Always ends with the row number. That is not bureaucracy: it is what
 * lets anyone reading the site trace a figure back to STATS-BANK.md and
 * see what was actually measured, which is the difference between citing
 * a study and gesturing at one.
 *
 * `short` drops "who it covers" for places with no room — the homepage's
 * goal tabs — but never drops the row number or the kind of evidence,
 * because those are the two that change how the number should be read.
 */
export function sourceLine(stat: Stat, short = false): string {
  const parts = [stat.source];
  if (!short) parts.push(stat.covers);
  parts.push(stat.kind);
  return `Source: ${parts.join(". ")}. (Stats bank row ${stat.row})`;
}

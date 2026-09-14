/* ==================================================================== *
 *  Guides, the blog and What's new — template T15, spec part 5.
 *
 *  THE SEED RULE, and it is the whole of this file.
 *
 *  The brief says: build each template with one clearly labelled sample
 *  that isn't published and isn't indexed. Jem writes the real ones.
 *
 *  So there is exactly one sample article, it says SAMPLE at the top, it
 *  carries `noindex`, and its content is about how the template works
 *  rather than being a plausible-looking article about pricing a class.
 *  A convincing sample is worse than an obvious one: it ends up quoted,
 *  linked and eventually believed, and nobody ever remembers it was
 *  filler.
 *
 *  The guide and blog LISTS name the titles Jem plans to write, each
 *  marked "Coming soon". Those are plans, not content — naming a planned
 *  article is honest; writing it on her behalf is not.
 *
 *  What's new starts empty, on purpose. A product-updates page with
 *  invented entries is a claim that a product exists and has been
 *  improved.
 * ==================================================================== */

export type ArticleStub = {
  slug: string;
  title: string;
  /** One line, for the card. */
  line: string;
  art: string;
};

/** Planned, not written. Every one shows "Coming soon". */
export const GUIDES: ArticleStub[] = [
  {
    slug: "how-to-price-a-class",
    title: "How to price a class",
    line: "Covering your costs, paying yourself, and what a marketplace's cut really costs you.",
    art: "a host setting out a class table before guests arrive",
  },
  {
    slug: "running-a-mobile-bar",
    title: "Running a mobile bar",
    line: "Kit, staffing, licensing and the maths of a per-guest price.",
    art: "a bartender stocking a bar before an event",
  },
  {
    slug: "hiring-event-staff",
    title: "Hiring event staff",
    line: "Finding them, checking them, and paying them without a spreadsheet.",
    art: "a team briefing before an event",
  },
];

export const POSTS: ArticleStub[] = [
  {
    slug: "why-reply-speed-decides-the-booking",
    title: "Why reply speed decides the booking",
    line: "What the research actually says, and what it doesn't.",
    art: "an owner answering a message between set-ups",
  },
  {
    slug: "the-quote-that-answers-itself",
    title: "The quote that answers itself",
    line: "What to put in a quote so nobody has to ask a follow-up question.",
    art: "a laptop open on a kitchen table, a quote on screen",
  },
];

/**
 * The one sample, for both templates.
 *
 * It is deliberately about the template rather than about a subject, so
 * it cannot be mistaken for real content or quoted as if it were.
 */
export const SAMPLE = {
  slug: "sample-article",
  title: "Sample post: layout only",
  line: "One or two sentences saying what the reader gets from the post. Jem writes the real ones; this shows the layout.",
  art: "a host setting out a class table before guests arrive",
  byline: "Author [TBC] · Date [TBC] · [X] min read",
  body: [
    {
      kind: "p" as const,
      text: "This page exists so the article template can be looked at before anything real is written. It is not published, it is not in the sitemap, and search engines are told not to index it. The subject below is a plausible one — how to price a class so it pays you properly — but the words are holding copy, and each section says what a real one would do rather than doing it.",
    },
    { kind: "h2" as const, text: "A heading for the first section" },
    {
      kind: "p" as const,
      text: "Holding copy. Each section of a real post answers one question a business owner has, in plain words, with the maths shown where there is maths. The reading column is about 65 characters wide, which is roughly where most people read fastest.",
    },
    {
      kind: "quote" as const,
      text: "A pull quote sits here, in the display face with an orange rule on the left.",
    },
    { kind: "h2" as const, text: "A heading for the second section" },
    {
      kind: "p" as const,
      text: "Holding copy. Only the header rises in; the body text never moves. The motion table puts articles in the \"never\" column for the rise and the parallax, and it is right — text that shifts while you are reading it is text you read twice.",
    },
    {
      kind: "list" as const,
      items: [
        "A list item, kept short.",
        "Another list item.",
        "A third, linking to a free tool.",
      ],
    },
    { kind: "h2" as const, text: "Why it says SAMPLE so loudly" },
    {
      kind: "p" as const,
      text: "Because a convincing sample is worse than an obvious one. Filler that reads like a finished article gets linked, quoted and eventually believed, and by then nobody remembers it was filler. The brief's first rule is that nothing on this site claims more than is true, and that applies to the writing as much as to the features.",
    },
    { kind: "h2" as const, text: "What goes here instead" },
    {
      kind: "p" as const,
      text: "Real guides and posts, written by people who have run this kind of business. The titles planned so far are on the guides and blog pages, each marked coming soon.",
    },
  ],
};

export const guideBySlug = (slug: string) =>
  slug === SAMPLE.slug ? SAMPLE : GUIDES.find((g) => g.slug === slug);

export const postBySlug = (slug: string) =>
  slug === SAMPLE.slug ? SAMPLE : POSTS.find((p) => p.slug === slug);

/** What's new. Empty, and it stays empty until there is something. */
export const UPDATES: { date: string; title: string; body: string }[] = [];

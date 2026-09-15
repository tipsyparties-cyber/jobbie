import { BLUE, LAVENDER } from "@/lib/palette";
import { GROUPS } from "@/lib/groups";
import { FEATURES, featuresInGroup } from "@/lib/heyday-features";
import { CTA, TBC } from "@/lib/site";

/* ==================================================================== *
 *  The header's navigation — spec part 1, A3.
 *
 *  The three panels keep their different shapes, which is the thing worth
 *  copying from honeybook: each menu is laid out for what is actually in
 *  it. Only the contents change.
 *
 *  The Product panel is GENERATED from the feature data, not typed out.
 *  Six columns of up to eleven links is sixty lines of hand-written markup
 *  that would drift from the pages it points at the first time a feature is
 *  renamed.
 *
 *  Long columns show six and then link to the rest, because Win the client
 *  and Run the day have eleven features each and a menu column that tall
 *  stops being scannable.
 * ==================================================================== */

export type NavLink = { label: string; href: string; desc?: string; icon?: string };

export type NavPanel =
  | {
      kind: "cards";
      items: NavLink[];
      featured: { label: string; desc: string; href: string; tint: string }[];
      footnote?: string;
    }
  | {
      kind: "columns";
      columns: {
        head: string;
        /** The group's section mark, small and still. */
        colour: string;
        links: NavLink[];
        more?: NavLink;
      }[];
      bottom: NavLink[];
      promo: {
        label: string;
        desc: string;
        href: string;
        tint: string;
        image?: string;
      };
    }
  | { kind: "list"; items: NavLink[] };

export type NavItem = { label: string; href: string; panel?: NavPanel };

/** Six visible, then a link to the rest of the group. */
const COLUMN_CAP = 6;

const PRODUCT_COLUMNS = GROUPS.map((g) => {
  const all = featuresInGroup(g.id);
  return {
    head: g.name,
    colour: g.colour,
    links: all.slice(0, COLUMN_CAP).map((f) => ({
      label: f.name,
      href: `/features/${f.slug}`,
      icon: f.icon,
    })),
    more:
      all.length > COLUMN_CAP
        ? { label: `All ${g.name} features`, href: `/how-it-works/${g.id}` }
        : undefined,
  };
});

/**
 * Who it's for. Each names the category and then says who that means in
 * plain words, which does more work than the label alone — a mobile
 * bartender does not scan for "Events and hospitality", they scan for
 * "mobile bars".
 */
const BUSINESS_TYPES: NavLink[] = [
  {
    label: "Events and hospitality",
    desc: "Mobile bars, caterers, private chefs, venues, planners, and more.",
    href: "/who-its-for#events-and-hospitality",
  },
  {
    label: "Classes and experiences",
    desc: "Workshops, cooking and cocktail classes, tours, escape rooms, team-building.",
    href: "/who-its-for#classes-and-experiences",
  },
  {
    label: "Photo, video and entertainment",
    desc: "Photographers, videographers, DJs, musicians, performers, photo booths.",
    href: "/who-its-for#photo-video-and-entertainment",
  },
  {
    label: "Home and personal services",
    desc: "Cleaners, trades, landscapers, pet care, tutors, childcare.",
    href: "/who-its-for#home-and-personal-services",
  },
  {
    label: "Beauty, wellness and fitness",
    desc: "Mobile beauty, therapists, personal trainers, instructors.",
    href: "/who-its-for#beauty-wellness-and-fitness",
  },
  {
    label: "Staffing and hire",
    desc: "Event staffing agencies, rentals and equipment hire.",
    href: "/who-its-for#staffing-and-hire",
  },
];

export const NAV: NavItem[] = [
  {
    label: "Product",
    href: "/features",
    panel: {
      kind: "columns",
      columns: PRODUCT_COLUMNS,
      bottom: [
        { label: "All features", href: "/features" },
        { label: "How it works", href: "/how-it-works" },
        { label: "The AI", href: "/features/ai" },
        { label: "Integrations", href: "/integrations" },
        { label: "What's new", href: "/whats-new" },
      ],
      promo: {
        label: "Build it your way",
        desc: "Drag in a step. Click it to make it yours.",
        href: "/features/follow-ups",
        tint: BLUE,
        image: "/placeholders/workflow-builder.svg",
      },
    },
  },
  {
    label: "Who it's for",
    href: "/who-its-for",
    panel: {
      kind: "cards",
      items: BUSINESS_TYPES,
      /* Both labelled Example. Nothing on this site claims a customer it
         does not have, and no real business is named (prompt, pack 4). */
      featured: [
        {
          label: "How a mobile bartender could run on Heyday",
          desc: "Example",
          href: "/stories/mobile-bartender",
          tint: BLUE,
        },
        {
          label: "How a class host could run on Heyday",
          desc: "Example",
          href: "/stories/class-host",
          tint: LAVENDER,
        },
      ],
      footnote:
        "Not on the list? If you sell your time, your skills or an experience, it's for you.",
    },
  },
  {
    label: "Resources",
    href: "/resources",
    panel: {
      kind: "list",
      items: [
        { label: "Free tools", href: "/tools" },
        { label: "Templates", href: "/templates" },
        { label: "Guides", href: "/guides" },
        { label: "Blog", href: "/blog" },
        { label: "Compare Heyday", href: "/compare" },
        { label: "Help", href: "/help" },
        { label: "What's new", href: "/whats-new" },
      ],
    },
  },
  { label: "Pricing", href: "/pricing" },
];

/**
 * The right-hand side. The phone is rendered only once it stops being a
 * placeholder — a header that says [PHONE TBC] to a visitor is worse than
 * a header with no phone at all.
 */
export const HEADER_ACTIONS = {
  login: CTA.login,
  phone: TBC.phone,
  demo: CTA.secondary,
  trial: CTA.primary,
};

export const FEATURE_COUNT = FEATURES.length;

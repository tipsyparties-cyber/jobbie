import { CREAM, SAGE, BLUE, LAVENDER } from "@/lib/palette";
import { BUCKETS, featuresIn } from "@/lib/features";

/* ==================================================================== *
 *  The header's navigation, modelled on honeybook.com.
 *
 *  Measured off the live site. Their bar is 72px, white, with the logo hard
 *  left, the navigation centred, and "Log in" plus one dark pill hard
 *  right. Three of the five items open a panel and two are plain links.
 *
 *  The panels are not all the same shape, which is the part worth copying:
 *
 *    "Business types"  a grid of title + one-line description, then a strip
 *                      of two tinted feature cards along the bottom
 *    "Product"         columns under muted headings, plain links, plus one
 *                      featured promo card on the right
 *    "Resources"       a plain single list
 *
 *  Using one panel shape for all three would be easier and would lose the
 *  thing that makes their header feel considered — each menu is laid out
 *  for what is actually in it.
 *
 *  Product's columns are generated from lib/features.ts rather than typed
 *  out again, so adding a feature puts it in the menu automatically.
 * ==================================================================== */

export type NavLink = { label: string; href: string; desc?: string };

export type NavPanel =
  | {
      kind: "cards";
      items: NavLink[];
      /** The strip along the bottom. */
      featured: { label: string; desc: string; href: string; tint: string }[];
    }
  | {
      kind: "columns";
      columns: { head: string; links: NavLink[] }[];
      promo: { label: string; desc: string; href: string; tint: string };
    }
  | { kind: "list"; items: NavLink[] };

export type NavItem = { label: string; href: string; panel?: NavPanel };

/**
 * Business types. honeybook names the trade and then says who that means in
 * plain words underneath — "Planners, photographers, DJs, florists" — which
 * does more work than the category label on its own.
 *
 * These all point at /features for now. Per-industry pages are the obvious
 * next build; the menu is ready for them.
 */
const BUSINESS_TYPES: NavLink[] = [
  {
    label: "Events & hospitality",
    desc: "Mobile bars, caterers, venues, planners, and more.",
    href: "/features",
  },
  {
    label: "Photo & video",
    desc: "Wedding and portrait photographers, videographers, and more.",
    href: "/features",
  },
  {
    label: "Beauty & wellbeing",
    desc: "Salons, mobile therapists, trainers, clinics, and more.",
    href: "/features",
  },
  {
    label: "Trades & maintenance",
    desc: "Plumbers, electricians, landscapers, cleaners, and more.",
    href: "/features",
  },
  {
    label: "Personal services",
    desc: "Tutors, dog walkers, childcare, drivers, and more.",
    href: "/features",
  },
  {
    label: "Staffing & hire",
    desc: "Agencies, equipment hire, removals, and more.",
    href: "/features",
  },
];

const BUSINESS_FEATURED = [
  {
    label: "Mobile bars",
    desc: "Quote an event, staff it, and invoice it without a spreadsheet.",
    href: "/stories",
    tint: BLUE,
  },
  {
    label: "Venues",
    desc: "Tours, contracts, clients and payments in one place.",
    href: "/features",
    tint: LAVENDER,
  },
];

/** Four columns, one per outcome, built from the feature list itself. Capped
 *  at five so the tallest column cannot run away with the panel. */
const PRODUCT_COLUMNS = BUCKETS.map((b) => ({
  head: b.title,
  links: featuresIn(b.id)
    .slice(0, 5)
    .map((f) => ({ label: f.name, href: `/features/${f.slug}` })),
}));

export const NAV: NavItem[] = [
  {
    label: "Business types",
    href: "/features",
    panel: {
      kind: "cards",
      items: BUSINESS_TYPES,
      featured: BUSINESS_FEATURED,
    },
  },
  {
    label: "Product",
    href: "/features",
    panel: {
      kind: "columns",
      columns: PRODUCT_COLUMNS,
      promo: {
        label: "See everything it does",
        desc: "Twenty features, sorted by what they fix rather than alphabetically.",
        href: "/features",
        tint: SAGE,
      },
    },
  },
  { label: "Pricing", href: "/contact" },
  {
    label: "Resources",
    href: "/blog",
    panel: {
      kind: "list",
      items: [
        { label: "Blog", href: "/blog" },
        { label: "Stories", href: "/stories" },
        { label: "About us", href: "/about" },
        { label: "Contact", href: "/contact" },
      ],
    },
  },
];

/** The tint behind an open nav item, and behind the promo card. */
export const NAV_ACTIVE_TINT = CREAM;

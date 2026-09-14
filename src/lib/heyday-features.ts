import data from "../../docs/heyday/data/features.json";
import type { GroupId } from "@/lib/groups";

/* ==================================================================== *
 *  The 46 features.
 *
 *  Read straight from `docs/heyday/data/features.json`, which is the pack's
 *  own file and the one Jem edits. Retyping it into a .ts would create two
 *  sources for the same forty-six pages and they would disagree within a
 *  week — the menu would say one thing and the page another.
 *
 *  This module only types it and adds the small lookups. It is not a copy.
 * ==================================================================== */

export type FeatureStatus = "coming-soon" | "live";

export type HeydayFeature = {
  slug: string;
  name: string;
  group: GroupId;
  status: FeatureStatus;
  onlyOnHeyday?: boolean;
  /** The page in the old feature set this one replaces, where there is one. */
  existingJobbieSlug?: string;
  icon: string;
  /** The owner's pain. The H1 on the feature page. */
  pain?: string;
  /** The feature named in search words. The line under the H1, and the title. */
  searchLine?: string;
  intro?: string;
  outcomes?: { saves?: string; increases?: string; reduces?: string };
  /** Row numbers in lib/stats-bank. Never a figure typed in here. */
  stats?: { statsBankRow: number }[];
  /**
   * "What it's costing you": the worked example.
   *
   * The maths is shown rather than asserted, because the point of the
   * section is that the reader can check it against their own numbers —
   * a total with no working is just another claim.
   */
  example?: { inputs?: string; maths?: string; result?: string };
  /** The sticky scroll: three or four blocks, each with a screen. */
  howItWorks?: {
    label: string;
    heading: string;
    line: string;
    /** What the illustration shows. Drawn as a ScreenIllustration. */
    screen: string;
  }[];
  /** Three short situations, from different kinds of business. */
  situations?: { business: string; situation: string }[];
  /** Only questions the briefs can answer honestly. */
  faq?: { q: string; a: string }[];
  related?: string[];
  /** Jem's internal note. Never rendered. */
  atTipsyToday?: string;
};

type Pack = {
  generated?: string;
  note?: string;
  groups?: unknown;
  features: HeydayFeature[];
};

export const FEATURES: HeydayFeature[] = (data as unknown as Pack).features;

export const featureBySlug = (slug: string) =>
  FEATURES.find((f) => f.slug === slug);

export const featuresInGroup = (group: GroupId) =>
  FEATURES.filter((f) => f.group === group);

/** Everything the brief calls "Only on Heyday" — 18 of the 46. */
export const onlyOnHeyday = () => FEATURES.filter((f) => f.onlyOnHeyday);

/** Every feature says "Coming soon" until Jem and Russell decide otherwise
 *  (prompt section 8), which is what the data already says for all 46. */
export const statusLabel = (s: FeatureStatus) =>
  s === "live" ? "Live" : "Coming soon";

/* ==================================================================== *
 *  A build-time guard on feature links.
 *
 *  Seven of the homepage's links were written from the spec's prose names
 *  — "instant quotes", "one inbox", "reports" — and the data's slugs are
 *  `quotes`, `inbox` and `reporting`. Those would have shipped as seven
 *  404s that nothing would have caught, because a wrong href is still a
 *  valid href.
 *
 *  Every hand-written link to a feature page goes through here instead.
 *  The pages are statically generated, so a bad slug stops the build with
 *  the slug printed, rather than becoming a dead link on a live site.
 * ==================================================================== */
export function featureHref(slug: string): string {
  if (!FEATURES.some((f) => f.slug === slug)) {
    throw new Error(
      `featureHref: no feature with the slug "${slug}". ` +
        `Check docs/heyday/data/features.json — the spec's prose names and ` +
        `the data's slugs are not always the same word.`
    );
  }
  return `/features/${slug}`;
}

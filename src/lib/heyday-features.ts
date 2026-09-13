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
  stats?: unknown;
  example?: unknown;
  howItWorks?: unknown;
  situations?: unknown;
  faq?: unknown;
  related?: string[];
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

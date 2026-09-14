import type { MetadataRoute } from "next";
import { FEATURES } from "@/lib/heyday-features";
import { GROUPS } from "@/lib/groups";
import { STORIES } from "@/lib/stories";
import { RIVALS } from "@/lib/compare";
import { INTEGRATIONS } from "@/lib/integrations";
import { TOOLS } from "@/lib/tools";

/* ==================================================================== *
 *  sitemap.xml — Phase 8.
 *
 *  Generated from the same data the pages are, so it cannot list a route
 *  that does not exist or miss one that does. A hand-written sitemap on a
 *  site with 96 routes is a list that goes stale on the first change.
 *
 *  What is deliberately NOT in here:
 *
 *  - The sample article, which is holding content and carries noindex.
 *  - /login, which is a placeholder with nothing behind it.
 *  - /terms and /privacy, which are structures for legal review rather
 *    than documents; listing them would invite them to be indexed and
 *    quoted while they say "not yet legal text".
 *  - /styleguide, which is for Jem.
 *
 *  Spec A9: holding and sample pages are noindex until they are real.
 * ==================================================================== */

const BASE = "https://heyday.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const entry = (
    path: string,
    priority: number,
    changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"] = "monthly"
  ) => ({
    url: `${BASE}${path}`,
    lastModified: now,
    changeFrequency,
    priority,
  });

  return [
    entry("/", 1, "weekly"),

    /* The spine: how it works, the groups, every feature. */
    entry("/how-it-works", 0.9),
    ...GROUPS.map((g) => entry(`/how-it-works/${g.id}`, 0.8)),
    entry("/features", 0.9),
    entry("/features/ai", 0.9),
    ...FEATURES.map((f) => entry(`/features/${f.slug}`, 0.7)),

    /* Who it is for, and the example stories. */
    entry("/who-its-for", 0.9),
    entry("/stories", 0.7),
    ...STORIES.map((s) => entry(`/stories/${s.slug}`, 0.6)),

    /* Deciding. */
    entry("/pricing", 0.9),
    entry("/compare", 0.8),
    ...RIVALS.map((r) => entry(`/compare/${r.slug}`, 0.7)),
    entry("/integrations", 0.7),
    ...INTEGRATIONS.map((i) => entry(`/integrations/${i.slug}`, 0.5)),

    /* Resources. The tools are genuinely finished, so they rank higher
       than the article indexes, which are still empty. */
    entry("/resources", 0.7),
    entry("/tools", 0.7),
    ...TOOLS.map((t) => entry(`/tools/${t.slug}`, 0.7)),
    entry("/templates", 0.6),
    entry("/guides", 0.4),
    entry("/blog", 0.4),
    entry("/whats-new", 0.4, "weekly"),

    /* Company and utility. */
    entry("/about", 0.5),
    entry("/security", 0.5),
    entry("/help", 0.5),
    entry("/contact", 0.5),
    entry("/demo", 0.6),
    entry("/early-access", 0.8),
    entry("/for-ai", 0.5),
  ];
}

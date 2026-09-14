/* ==================================================================== *
 *  Link check — Phase 8, "every link works".
 *
 *  Walks every internal href in src/ and checks it against the routes the
 *  app actually has, including the dynamic ones expanded from their data.
 *
 *  This exists because a wrong href is still a valid href: nothing in a
 *  typecheck, a lint or a build catches a link to a page that was renamed
 *  or never built. Seven of them shipped on the homepage before
 *  `featureHref()` started throwing, and that only covers feature pages.
 *
 *  Run: node scripts/check-links.mjs
 * ==================================================================== */

import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const SRC = path.join(ROOT, "src");

/* ---- 1. Every route the app has ------------------------------------- */

const routes = new Set();

/** Walk src/app and collect every page.tsx as a route. */
function collectRoutes(dir, segments = []) {
  for (const name of fs.readdirSync(dir)) {
    const full = path.join(dir, name);
    if (fs.statSync(full).isDirectory()) {
      // (groups) are organisational and contribute no path segment.
      const next =
        name.startsWith("(") && name.endsWith(")")
          ? segments
          : [...segments, name];
      collectRoutes(full, next);
    } else if (name === "page.tsx") {
      routes.add("/" + segments.join("/"));
    }
  }
}
collectRoutes(path.join(SRC, "app"));

/* Expand the dynamic segments from the data that generates them. */
const data = (file) => fs.readFileSync(path.join(SRC, "lib", file), "utf8");
const slugsFrom = (src, key = "slug") =>
  [...src.matchAll(new RegExp(`${key}:\\s*"([a-z0-9-]+)"`, "g"))].map(
    (m) => m[1]
  );

const features = JSON.parse(
  fs.readFileSync(path.join(ROOT, "docs/heyday/data/features.json"), "utf8")
);
const featureSlugs = (Array.isArray(features) ? features : features.features).map(
  (f) => f.slug
);

const expansions = {
  "/features/[slug]": featureSlugs.map((s) => `/features/${s}`),
  "/how-it-works/[group]": [
    "get-ahead",
    "get-found",
    "win-the-client",
    "run-the-day",
    "get-paid",
    "get-rebooked",
  ].map((g) => `/how-it-works/${g}`),
  "/stories/[slug]": slugsFrom(data("stories.ts")).map((s) => `/stories/${s}`),
  "/compare/[slug]": slugsFrom(data("compare.ts")).map((s) => `/compare/${s}`),
  "/integrations/[slug]": slugsFrom(data("integrations.ts")).map(
    (s) => `/integrations/${s}`
  ),
  "/tools/[slug]": slugsFrom(data("tools.ts")).map((s) => `/tools/${s}`),
  "/guides/[slug]": ["/guides/sample-article"],
  "/blog/[slug]": ["/blog/sample-article"],
};

for (const [dynamic, concrete] of Object.entries(expansions)) {
  if (routes.delete(dynamic)) concrete.forEach((r) => routes.add(r));
}

/* Redirects count as working links. */
const config = fs.readFileSync(path.join(ROOT, "next.config.ts"), "utf8");
for (const m of config.matchAll(/source:\s*"([^"]+)"/g)) routes.add(m[1]);

/* ---- 2. Every internal href in the source --------------------------- */

const problems = [];
const seen = new Map();

function walk(dir) {
  for (const name of fs.readdirSync(dir)) {
    const full = path.join(dir, name);
    if (fs.statSync(full).isDirectory()) walk(full);
    else if (/\.tsx?$/.test(name)) check(full);
  }
}

function check(file) {
  const src = fs.readFileSync(file, "utf8");
  for (const m of src.matchAll(/href=(?:"|\{")(\/[^"'`{}\s]*)(?:"|"\})/g)) {
    let href = m[1];
    // Drop the query and the fragment — the route is what matters.
    const clean = href.split("#")[0].split("?")[0].replace(/\/$/, "") || "/";
    if (!seen.has(clean)) seen.set(clean, []);
    seen.get(clean).push(path.relative(ROOT, file));
  }
}
walk(SRC);

for (const [href, files] of seen) {
  if (!routes.has(href)) {
    problems.push({ href, files: [...new Set(files)] });
  }
}

/* ---- 3. Report ------------------------------------------------------- */

console.log(`Routes: ${routes.size}`);
console.log(`Distinct internal links: ${seen.size}`);

if (problems.length === 0) {
  console.log("\nEvery internal link resolves to a route.");
  process.exit(0);
}

console.log(`\n${problems.length} broken link(s):\n`);
for (const p of problems) {
  console.log(`  ${p.href}`);
  for (const f of p.files) console.log(`      ${f}`);
}
process.exit(1);

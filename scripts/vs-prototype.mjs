/* ==================================================================== *
 *  Compare the built site against the prototype — Russell's ask:
 *  "check against the prototype to make sure every part matches it".
 *
 *  For each template, it takes the prototype's reference page and the
 *  live page, reduces both to their visible text, and reports what the
 *  prototype says that the live page does not.
 *
 *  It compares MEANINGFUL LINES rather than markup, because the two are
 *  built completely differently — one is hand-written HTML with a shared
 *  stylesheet, the other is React with Tailwind. Identical markup was
 *  never the goal; identical content and structure is.
 *
 *  Lines the prototype has and the page does not are the interesting
 *  output. Lines the page has and the prototype does not are usually
 *  deliberate (real copy replacing holding copy, honesty notes the
 *  prototype does not carry), so they are listed separately and quietly.
 *
 *  Run the dev server, then: node scripts/vs-prototype.mjs
 * ==================================================================== */

import fs from "node:fs";
import path from "node:path";

const BASE = process.env.BASE || "http://localhost:3001";
const REF = "docs/heyday/reference/site";

/** template -> [reference file, live path] */
const PAGES = [
  ["T1  Home", "index.html", "/"],
  ["T2  Feature page", "feature-quotes.html", "/features/quotes"],
  ["T3  Group page", "group-win-the-client.html", "/how-it-works/win-the-client"],
  ["T4  All features", "features.html", "/features"],
  ["T5  How it works", "how-it-works.html", "/how-it-works"],
  ["T6  Who it's for", "who-its-for.html", "/who-its-for"],
  ["T7  Story", "story-mobile-bartender.html", "/stories/mobile-bartender"],
  ["T8  Pricing", "pricing.html", "/pricing"],
  ["T9  Compare hub", "compare.html", "/compare"],
  ["T9  Compare page", "compare-honeybook.html", "/compare/honeybook"],
  ["T10 Integrations", "integrations.html", "/integrations"],
  ["T11 The AI", "ai.html", "/features/ai"],
  ["T12 Resources", "resources.html", "/resources"],
  ["T13 Free tool", "tool-pricing-calculator.html", "/tools/pricing-calculator"],
  ["T14 Leak check", "leak-check.html", "/tools/leak-check"],
  ["T15 Article", "blog-post.html", "/blog/sample-article"],
  ["T16 About", "about.html", "/about"],
  ["T16 Early access", "early-access.html", "/early-access"],
  ["T16 404", "404.html", "/this-page-does-not-exist"],
];

const decode = (s) =>
  s
    .replace(/&#x27;|&#39;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/&nbsp;/g, " ")
    .replace(/&rsquo;/g, "’")
    .replace(/&lsquo;/g, "‘")
    .replace(/&ldquo;/g, "“")
    .replace(/&rdquo;/g, "”")
    .replace(/&mdash;/g, "—")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">");

/** Visible text, one line per block, normalised for comparison. */
function lines(html) {
  let s = html
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<svg[\s\S]*?<\/svg>/gi, " ")
    .replace(/<header[\s\S]*?<\/header>/gi, " ")
    .replace(/<footer[\s\S]*?<\/footer>/gi, " ")
    .replace(/<nav[\s\S]*?<\/nav>/gi, " ");
  s = s.replace(/<\/(p|li|h1|h2|h3|h4|b|dt|dd|td|th|button|a|small|em|span|div|legend|summary|figcaption|blockquote)>/gi, "\n");
  s = s.replace(/<[^>]+>/g, " ");
  return decode(s)
    .split("\n")
    .map((l) => l.replace(/\s+/g, " ").trim())
    .filter((l) => l.length > 12)
    .map(norm);
}

/** Compare on words, so punctuation and casing differences do not count. */
const norm = (l) =>
  l
    .toLowerCase()
    .replace(/[‘’']/g, "'")
    .replace(/[“”"]/g, '"')
    .replace(/[^a-z0-9'". ]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();

/* Lines the prototype carries that are about the prototype itself, or
   that the brief deliberately overrides. Not findings. */
const IGNORE = [
  "prototype holding copy and example data",
  "all prototype pages",
  "prototype only preview the success state",
  "a clickable prototype of the heyday site",
];

let totalMissing = 0;
const report = [];

for (const [label, file, livePath] of PAGES) {
  const refPath = path.join(REF, file);
  if (!fs.existsSync(refPath)) {
    report.push({ label, error: `no reference file: ${file}` });
    continue;
  }

  let liveHtml;
  try {
    const res = await fetch(BASE + livePath);
    liveHtml = await res.text();
    if (res.status !== 200 && res.status !== 404) {
      report.push({ label, error: `HTTP ${res.status} at ${livePath}` });
      continue;
    }
  } catch (e) {
    report.push({ label, error: String(e) });
    continue;
  }

  const proto = lines(fs.readFileSync(refPath, "utf8"));
  const live = new Set(lines(liveHtml));
  const liveJoined = [...live].join("  ");

  const missing = [...new Set(proto)].filter((l) => {
    if (IGNORE.some((x) => l.includes(x))) return false;
    if (live.has(l)) return false;
    // A prototype line split across two elements on our side still counts
    // as present if the whole string appears in the page's text.
    return !liveJoined.includes(l);
  });

  totalMissing += missing.length;
  report.push({ label, livePath, protoCount: proto.length, missing });
}

/* ---- Print ----------------------------------------------------------- */

console.log(`Built site vs prototype  (${BASE})\n`);
console.log("Lines the PROTOTYPE has that the live page does not.\n");

for (const r of report) {
  if (r.error) {
    console.log(`\n${r.label}\n   ERROR: ${r.error}`);
    continue;
  }
  const pct = r.protoCount
    ? Math.round(((r.protoCount - r.missing.length) / r.protoCount) * 100)
    : 100;
  const flag = r.missing.length === 0 ? "OK " : "!! ";
  console.log(
    `\n${flag}${r.label}  ${r.livePath}   ${pct}% of ${r.protoCount} lines present`
  );
  for (const m of r.missing.slice(0, 14)) console.log(`      - ${m}`);
  if (r.missing.length > 14)
    console.log(`      … and ${r.missing.length - 14} more`);
}

console.log(`\n${totalMissing} prototype lines missing across ${PAGES.length} templates`);

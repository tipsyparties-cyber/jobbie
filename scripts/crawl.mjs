/* ==================================================================== *
 *  Crawl — Phase 8, "every link works", checked against reality.
 *
 *  The static link checker can only see hrefs written as literals, and
 *  most of this site's links are template literals built from data. This
 *  one asks the running server instead: start at /, follow every internal
 *  link it finds, and report anything that is not a 200.
 *
 *  It also collects the things Phase 8 asks about and a machine can
 *  actually judge: pages with no <title>, no meta description, no h1, or
 *  more than one h1.
 *
 *  Run the dev server, then: node scripts/crawl.mjs
 * ==================================================================== */

const BASE = process.env.BASE || "http://localhost:3001";

const queue = ["/"];
const seen = new Set(queue);
const results = [];
const linkedFrom = new Map();

const decode = (s) =>
  s
    .replace(/&#x27;|&#39;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&nbsp;/g, " ")
    .replace(/&rsquo;/g, "’")
    .replace(/&ldquo;/g, "“")
    .replace(/&rdquo;/g, "”")
    .replace(/&amp;/g, "&");

/* Counts are taken on the DECODED text, because that is what a person and
   a search engine see. An apostrophe written as &#x27; is one character,
   not six, and counting the escape makes a page that is inside the limit
   look over it. */
const text = (html, re) => {
  const m = html.match(re);
  return m ? decode(m[1]).replace(/\s+/g, " ").trim() : null;
};

while (queue.length) {
  const path = queue.shift();
  let res, html = "";
  try {
    res = await fetch(BASE + path, { redirect: "manual" });
    if (res.status < 300 || res.status >= 400) html = await res.text();
  } catch (e) {
    results.push({ path, status: "FETCH FAILED", note: String(e) });
    continue;
  }

  const row = {
    path,
    status: res.status,
    title: text(html, /<title[^>]*>([\s\S]*?)<\/title>/i),
    desc: text(html, /<meta name="description" content="([^"]*)"/i),
    h1s: [...html.matchAll(/<h1[^>]*>([\s\S]*?)<\/h1>/gi)].length,
  };
  results.push(row);

  if (res.status !== 200) continue;

  for (const m of html.matchAll(/href="(\/[^"#?]*)/g)) {
    const next = m[1].replace(/\/$/, "") || "/";
    if (next.startsWith("/_next") || next.startsWith("/icons")) continue;
    if (/\.(svg|png|ico|xml|txt|json|webmanifest)$/.test(next)) continue;
    if (!linkedFrom.has(next)) linkedFrom.set(next, new Set());
    linkedFrom.get(next).add(path);
    if (!seen.has(next)) {
      seen.add(next);
      queue.push(next);
    }
  }
}

/* ---- Report ---------------------------------------------------------- */

const bad = results.filter((r) => r.status !== 200);
const noTitle = results.filter((r) => r.status === 200 && !r.title);
const noDesc = results.filter((r) => r.status === 200 && !r.desc);
const badH1 = results.filter((r) => r.status === 200 && r.h1s !== 1);
const longTitle = results.filter(
  (r) => r.status === 200 && r.title && r.title.length > 70
);
const longDesc = results.filter(
  (r) => r.status === 200 && r.desc && r.desc.length > 155
);

console.log(`Crawled ${results.length} pages from ${BASE}\n`);

const section = (label, rows, render) => {
  if (!rows.length) {
    console.log(`OK  ${label}: none`);
    return;
  }
  console.log(`\n!!  ${label}: ${rows.length}`);
  rows.forEach((r) => console.log("      " + render(r)));
};

section("Non-200", bad, (r) => {
  const from = [...(linkedFrom.get(r.path) ?? [])].join(", ") || "entry";
  return `${r.status}  ${r.path}   (linked from: ${from})`;
});
section("Missing <title>", noTitle, (r) => r.path);
section("Missing meta description", noDesc, (r) => r.path);
section("Not exactly one <h1>", badH1, (r) => `${r.h1s} h1  ${r.path}`);
section(
  "Title over 70 chars",
  longTitle,
  (r) => `${r.title.length}  ${r.path}  "${r.title}"`
);
section(
  "Description over 155 chars",
  longDesc,
  (r) => `${r.desc.length}  ${r.path}`
);

console.log(
  `\n${bad.length ? "FAIL" : "PASS"} — ${results.length - bad.length}/${results.length} pages returned 200`
);
process.exit(bad.length ? 1 : 0);

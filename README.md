# Heyday Jobbie

The marketing site for **Heyday**, the host software: quotes, bookings,
payments, the team who deliver the job, and the aftercare, in one workflow.

> **This is not the Heyday marketplace.** That is a separate project with
> its own site and its own look — the consumer side, where customers find
> and book these businesses. The two share a brand and nothing else.
>
> The repo is called *Heyday Jobbie* so the two can be told apart at a
> glance. The product on every page is **Heyday**, one word. The project
> name never appears on the site.

## Running it

```bash
npm run dev:fresh      # port 3001 — use this one
```

`dev:fresh` clears `.next` first. Plain `npm run dev` can serve a **stale
stylesheet** after `globals.css` changes: the page renders with markup that
has no rules behind it, which looks like broken HTML rather than a caching
problem. That has cost real time twice. See AGENTS.md.

```bash
npm run build:safe     # build without killing a running dev server
npm run build          # for CI, where nothing else is running
```

`next build` deletes the directory a dev server reads from, so a plain
build while the preview is open leaves it serving a 500. `build:safe`
builds elsewhere.

## Checking it

With the dev server running:

```bash
node scripts/crawl.mjs          # every page: status, title, description, h1
node scripts/vs-prototype.mjs   # each page against its reference page
node scripts/check-links.mjs    # hrefs against routes, no server needed
```

`crawl.mjs` is the one that catches a broken link, because a wrong href is
still a valid href and nothing else on the stack looks at them.

## Where things are

| | |
|---|---|
| `docs/heyday/` | Jem's brief pack: the briefs, the spec, the research, the assets |
| `docs/heyday/reference/site/` | **The prototype.** Every template as a working page. Open `pages.html` |
| `docs/heyday/SITE-PLAN.md` | Every route, its template and its status |
| `docs/heyday/QUESTIONS-FOR-RUSSELL.md` | What is waiting on a decision, and why |
| `docs/heyday/STATS-BANK.md` | The only statistics the site may use |
| `AGENTS.md` | Next.js version notes, and the stale-CSS trap |

## The rules that are not negotiable

From the brief, and they shape most of the code:

- **Nothing claims more than is true.** No invented customers, numbers,
  prices, ratings or quotes. Every statistic comes from the stats bank by
  row number and prints its source, who it covers and what kind of
  evidence it is.
- **Every feature says "Coming soon"** until Jem and Russell decide
  otherwise. The product is not open to other businesses.
- **Placeholders stay visible,** exactly as written. They live in
  `src/lib/site.ts`.
- **Tipsy Parties is never named on the site.**
- **No other company's logo** until Jem confirms it is allowed. Use names.
- **Orange `#F26B2A` is a fill, never text,** and never touches yellow.

## The shape of the code

Words live in data; pages come from templates. Forty-six feature pages are
one component and one JSON file, so the menu and the pages cannot disagree.

| | |
|---|---|
| `src/lib/` | The data: features, groups, the flow, stats, compare, integrations |
| `src/components/heyday/` | The design system and the page furniture |
| `src/app/(home)/` | The homepage |
| `src/app/(site)/` | Everything else, sharing one shell |

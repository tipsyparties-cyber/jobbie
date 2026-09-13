Claude Code: you're building the whole Heyday host software website in this repo (jobbie, branch `redesign/mono-binary-intro`).
- Build every page and feature we've planned, set out the way getjobber.com and honeybook.com set out theirs.
- Use the Heyday brand, colours, marks, icons, transitions and animations across the whole site, but only where they make sense.
- Keep everything already designed. Nothing gets dropped or simplified; you're expanding on it.

Read "What we're trying to achieve" and section 0 first, then follow the build order in section 7. Commit at the end of every phase.

# Heyday: build the whole host software website

**From:** Jem, with Claude, 13 September 2026.

---

## What we're trying to achieve

**What Heyday is:** self-serve software (SaaS) that runs a whole events, entertainment, activity, services or class business, from the first enquiry to the rebooking.

**Who it's for:** anyone who sells their time, their skills or an experience. That includes:
- mobile bars, caterers and private chefs;
- photographers, planners, DJs, performers and photo booths;
- class and workshop hosts, tours and escape rooms;
- cleaners and home services, beauty and wellness, and tutors;
- one-person businesses as well as teams.

Many sell the same skill two ways: as a service at someone's event, and as an experience or class. Heyday handles both.

**Background, not for the site:** the ideas behind Heyday come from how Tipsy Parties runs its own business, but Heyday isn't built by Tipsy Parties. Don't mention Tipsy Parties anywhere on the site unless Jem and Russell decide otherwise (`DECISIONS-NEEDED.md`). Heyday grows with each business: from doing everything yourself, to running it as an owner, to a team, to a business that runs itself. Customers can also find these businesses on the Heyday marketplace, which has its own site and its own look.

**What makes it different:** HoneyBook and Jobber both say "all-in-one". Heyday runs **the whole workflow, not just the paperwork**:
- the team who deliver the job, their shifts and their pay;
- classes alongside services;
- the aftercare;
- the marketplace.

The line is: "One workflow for your whole business, from the first hello to the next booking."

**What the site has to do:** for these businesses, what getjobber.com does for home services.
- Explain every feature in depth.
- Show who it's for through example stories.
- Prove it honestly.
- Turn visitors into early-access sign-ups and demos.

It should feel fun, positive and bright, because that's what "Heyday" sounds like. It should be techy but warm, and it must never look like HoneyBook.

**Be honest:** the product isn't open to other businesses yet. So "Start free trial" collects early-access sign-ups, and every feature says "Coming soon" until Jem and Russell decide otherwise.

**What to take from getjobber.com and honeybook.com, and what to leave.** The detail is in `research/` and in section 6.1 of the SaaS brief.

| | Take | Leave |
|---|---|---|
| **getjobber.com** | **The shape of the site:**<ul><li>One framework across everything: their four pillars become our six groups.</li><li>One page per feature, all from one template: the pain, the proof, how it works, related features.</li><li>A Product menu, Industries (which becomes our one Who it's for page plus stories), Pricing and Resources.</li><li>Pricing that says "try free now, pick a plan later", with card fees shown openly.</li><li>Honest, dated comparison pages with a switching plan.</li><li>Free tools with no email wall, and a score quiz.</li><li>A page written for AI search tools.</li></ul> | <ul><li>The scale (about 1,700 pages).</li><li>Examples that are only trades.</li><li>Headline numbers that disagree with each other.</li><li>The look.</li></ul> |
| **honeybook.com** | **How it tells the product story:**<ul><li>The header with three panels, each laid out for what's in it. This repo already has one, modelled on theirs.</li><li>Product stories told as a sticky scroll, with the picture changing to match the copy.</li><li>A page for each integration.</li><li>A template gallery.</li><li>Business types named in plain words ("Planners, photographers, DJs, florists").</li><li>FAQs on product pages.</li><li>An AI page that says you can switch it off.</li><li>Free setup and account moving, offered openly.</li></ul> | <ul><li>The look: soft, feminine, serif and pastel-only. Heyday's orange, ink outlines, hard shadows and sun marks keep it clearly ours (design brief, "What makes it look like Heyday and not HoneyBook").</li><li>Headline statistics with no source.</li></ul> |

---

## 0. Before you start

**Get the pack into this repo first.** Jem has downloaded `heyday-brief-pack.zip` onto this computer from the build page. The pack holds:
- every brief, and the research;
- the wordmark, the sun mark and its shapes, and the icons;
- the workflow-builder picture;
- working copies of the design pages.

To get it in:
1. **Find the zip.** On a Mac or Linux, try `ls ~/Downloads/heyday-brief-pack*.zip`. On Windows, look in the Downloads folder in the user's home. If it isn't there, ask Jem where it saved.
2. **Unzip it into `docs/heyday/`** at the top of this repo. You should end up with `docs/heyday/README.md`, `docs/heyday/HEYDAY-SITES-DESIGN-BRIEF.md`, `docs/heyday/assets/` and so on.
3. **Commit it on its own:** "docs: the Heyday brief pack".

If this session runs on the Mac where `~/Projects/heyday-upandup-brief` exists, the same files are there too, but use the pack.

**Two things about the documents:**
- **The claude.ai links in them are for Jem.** You can't open them, because they're private to Jem's account. Everything they show is in the pack.
- **Where a document says `~/Projects/heyday-upandup-brief/`,** read `docs/heyday/` instead.

**Read these, in this order:**
1. `AGENTS.md` in this repo. This Next.js version has breaking changes.
2. `docs/heyday/README.md`: what's in the pack.
3. **`docs/heyday/spec/` and `docs/heyday/data/features.json`: the page-by-page spec.** It covers every page, section by section: what each section is for, its layout, holding copy, image slots, icons and marks, motion and colours.
   - Build every page from it, in full, with holding copy and holding images. You're building a finished structure, like honeybook.com and getjobber.com, ready for Jem to swap in the real words and pictures.
   - Start with `spec/01-global-and-home.md`.
4. `docs/heyday/HEYDAY-SITES-DESIGN-BRIEF.md`: the look, colours, type, buttons, cards, marks, icons and motion. All of it applies to this site.
5. `docs/heyday/BUILD-NEXT-HEYDAY-SAAS.md`: every page and feature, the headline for each page, the statuses and the rules.
6. `docs/heyday/HEYDAY-SAAS-WEBSITE-BRIEF.md`: the copy and the research. Read these sections most closely:
   - 1 (who it's for and the growth path)
   - 3.3 (the 12-step flow and the six groups)
   - 3.7 (the site plan and the homepage copy)
   - 3.8 (the AI levels, and features only Heyday has)
   - 3.9 (the Quotes page)
   - 5.5 (the feature-page template)
   - 6.1 (how getjobber.com is built)
   - Appendix C (every Jobber feature page)
7. `docs/heyday/STATS-BANK.md`: the only statistics you may use, each with its source.
8. `docs/heyday/research/`:
   - what Jobber and HoneyBook offer, page by page, checked on 13 September 2026;
   - the measurements taken from the reference sites (anyone.com, allinnhomeofstudents.com, themagic8.co.uk).

   Use it for the comparison pages, and check every rival fact again on the day you publish it.
9. `docs/heyday/reference/heyday-sun-mark.html`: a working page from the design sessions. Open it in a browser.
   - It runs every shape, the morph, the bounce and the more-info grow. Its script is the reference for `HeydayMark` and `MoreInfoSection`.
10. `docs/heyday/assets/`: the files you'll copy in (section 6).
11. In this repo, `docs/superpowers/specs/2026-09-10-mono-reskin-binary-intro-design.md`: read the "Do not re-propose" table, Addendum 34 and "Environment gotchas".

**Then, before building anything:**
1. Write `docs/heyday/SITE-PLAN.md`, listing every route with its template, data file and status, from sections 3 to 5 below. Commit it.
2. Send Jem the route list in plain words, then carry on. Only wait if Jem replies with changes.

---

## 1. Which document wins

When two instructions disagree, follow the first one on this list:
1. **What Jem says** in this session, and in this prompt.
2. **`HEYDAY-SITES-DESIGN-BRIEF.md`** for anything about looks and motion.
   - It replaces rule 3 of `BUILD-NEXT-HEYDAY-SAAS.md` ("keep the look as it is") and the "Look" default in its Phase 0. The look is decided now.
   - It also replaces anything in the older design record that it contradicts, with two exceptions that still stand:
     - the **"Do not re-propose" table**;
     - **Addendum 34**, on the feature rows. The design brief's homepage item 6 keeps Addendum 34's treatment and adds Jem's section marks to it.
3. **`BUILD-NEXT-HEYDAY-SAAS.md` and `HEYDAY-SAAS-WEBSITE-BRIEF.md`** for the words: pages, features, headlines, statuses, statistics and what's true.
4. **This prompt, and the spec files in `spec/`,** for the site map, the page templates, each page's sections and holding copy, and where each kind of motion goes. Where the two differ, the spec files are the more detailed version.
5. **Anything else:** ask Jem.

**Already decided:**
- **The name:** the brand is **Heyday**, one word.
  - Put the product name in one constant.
  - Make the wordmark component show Jem's Heyday wordmark (section 6). It still says "jobbie" now.
- **The six groups** organise the whole site: Get ahead, Get found, Win the client, Run the day, Get paid, Get rebooked. "It runs itself" is the thread through all six.
  - Use them instead of the four groups `features.ts` has now; `BUILD-NEXT-HEYDAY-SAAS.md` Phase 3 has the regrouping table.
  - The section marks and their colours are built on these six.
- **jobbie's colours don't change:** cream, sage, blue, sky, lavender, yellow and paper, plus Heyday orange #F26B2A for actions.
- **The mark is the Heyday sun.** It's always one colour, never black or orange, and suits the section it sits in. Its shapes, the small icons and the more-info grow are all in the design brief (A1, A7, A11 and A12).
- **Who it's for:** one Who it's for page plus example stories. No page for each type of business.
- **English:** US English, dollars and US terms.

**Still open. Use these defaults and don't invent answers:**

| Question | Default |
|---|---|
| Prices | `[PRICE TBC]` |
| Which features are live at launch | Every feature says "Coming soon" |
| Phone number | `[PHONE TBC]` |
| Support hours | `[support hours to confirm]` |
| Money-back guarantee and free setup call | `[to confirm]` |
| What "Start free trial" does | It opens the early-access form (section 4, T16) |
| Numbers marked `[needs approval]` in the briefs | Leave them out |

---

## 2. Nothing we designed gets lost

Tick every item before you call the build finished. The detail for each one is in the design brief section shown.

**Brand**
- [ ] Jem's Heyday wordmark, in the one wordmark component (A1)
- [ ] The Heyday sun as the favicon and app icon, and in the header and footer (A1, A11)
- [ ] The sun always in one colour that suits its section, and never black or orange (A11)
- [ ] The six section marks plus Infinity, each in its group colour (A11)
- [ ] The small icon family: ink arrows plus one orange piece, with `-small` versions at 24px and under (A7)
- [ ] The Heyday line: an ink line with orange dots, used wherever steps appear (A8)

**Colour and type**
- [ ] jobbie's palette unchanged. Orange only for actions and never as text. Yellow only as a highlight, never touching orange (A2, B2)
- [ ] Plus Jakarta Sans for the hero, Cabinet Grotesk (or Schibsted Grotesk) for headings and buttons, Inter for body, and Geist Mono for small labels and `{ braced }` labels. No serif (A3)
- [ ] The highlighted phrase inside headlines (the jobbie look, and Addendum 34)

**Components**
- [ ] Buttons: 8px corners that round to a pill on hover and focus, in 0.2s. Nothing else moves (A4)
- [ ] Panels, cards and stickers: thin ink outlines and hard offset shadows with no blur. Stickers straighten on hover (A5)
- [ ] Sections that overlap with 56px rounded tops, with faint outline shapes behind (A10, B1)
- [ ] Decorative suns of different sizes instead of blurred orbs, with one crossing into the next section (A10)

**Motion**
- [ ] The rise and parallax (A6)
- [ ] The background colour fading between sections, on jobbie (B2)
- [ ] The hero with its new copy (label, headline, line and small line), the letter scatter from `hero-motion.tsx`, and "Start free trial" and "Book a demo" (B3, B4)
- [ ] The rising workflow cards on the right of the hero, scrolling up one at a time (A9, B5)
- [ ] The sticky scroll: the copy scrolls and the picture changes (B7)
- [ ] Two sideways scrolls, kept apart: "How Heyday runs your day" and "Only on Heyday" (B6)
- [ ] The workflow builder section, with its placeholder still, ready for a video (B8)
- [ ] More info: the section's shape grows until the section is its colour (A12)
- [ ] The mark morphing and bouncing (A11)
- [ ] Reduced motion switches every movement off, and everything stays readable

**Every page**
- [ ] Every page and section in `spec/` built, with its holding copy, holding images and product illustrations

**Kept from the current site**
- [ ] The HoneyBook-style header with its three dropdown panels, each laid out for what's in it (commit 8aebdb3)
- [ ] The feature rows: highlighted phrase, alternating sides, no dividers (Addendum 34), now with section marks

---

## 3. The site map

It has the same shape as getjobber.com and honeybook.com, at a size a small team can keep up. Nothing at launch claims more than is true.

**Header** (keep the current header and its three differently shaped panels; change what's in them):
- **Product:** a columns panel.
  - Six columns, one per group. Each column's heading has the group's section mark (small and still), then the group name. Under it are that group's feature pages, each with its small icon.
  - Along the bottom: All features, How it works, The AI, Integrations and What's new.
  - The promo card: "Build it your way" (the workflow builder).
- **Who it's for:** the cards panel.
  - Six cards: Events and hospitality; Classes and experiences; Photo, video and entertainment; Home and personal services; Beauty, wellness and fitness; Staffing and hire. Each has a one-line "who that means" and links to the matching part of `/who-its-for`.
  - The featured strip: two example story cards.
  - The panel ends with "Not on the list? If you sell your time, your skills or an experience, it's for you."
  - Retire the old business-type links that all pointed at `/features`.
- **Resources:** the list panel: Free tools, Templates, Guides, Blog, Compare, Help, and What's new.
- **Pricing:** a plain link.
- **Right-hand side:** Log in, `[PHONE TBC]` (shown only once there's a real number), "Book a demo" (ghost button) and "Start free trial" (primary button).

**Footer:**
- **Columns:** Product (features, how it works, pricing, integrations, the Heyday marketplace), Who it's for (the page and the stories), Resources, Company (about, security, help, contact), and Legal.
- **Also:** the Heyday sun slowly cycling through the six shapes, "Make your day a Heyday.", and a link to the Heyday marketplace.

**Routes:**

| Route | Page | Template | Modelled on |
|---|---|---|---|
| `/` | Home | T1 | Design brief B4 |
| `/how-it-works` | How it works: the 12 steps in the six groups | T5 | Jobber's four pillars; SaaS brief 3.3 |
| `/how-it-works/[group]` | Six group pages: get-ahead, get-found, win-the-client, run-the-day, get-paid, get-rebooked | T3 | Jobber's pillars; HoneyBook's product categories |
| `/features` | All features | T4 | Jobber's /features/ index |
| `/features/[slug]` | One page per feature: every page in `BUILD-NEXT-HEYDAY-SAAS.md` Phase 3, including the "Heyday only" pages | T2 | Jobber's feature pages (Appendix C); HoneyBook's /product pages |
| `/features/ai` | The AI | T11 | Jobber AI; HoneyBook AI |
| `/integrations` and `/integrations/[slug]` | Integrations | T10 | HoneyBook's integration pages; Jobber's App Marketplace |
| `/whats-new` | Product updates | T15 (list) | Jobber Product Updates |
| `/who-its-for` | Who it's for | T6 | HoneyBook's business types; Jobber's industries, as one page |
| `/stories` and `/stories/[slug]` | The seven example stories, all labelled Example | T7 | Jobber's customer stories |
| `/pricing` | Pricing | T8 | Both sites' pricing pages |
| `/compare` and `/compare/[slug]` | vs HoneyBook, vs Jobber, vs Check Cherry, vs Flashquotes, vs spreadsheets | T9 | Jobber's comparison hub |
| `/resources` | The resources hub | T12 | Both sites' resources menus |
| `/tools` and `/tools/[slug]` | Class and event pricing calculator; quote template; the "leak check" score | T13, T14 | Jobber's free tools and Home Service Score |
| `/templates` | Quote template, follow-up message templates, invoice template | T13 | HoneyBook's template gallery |
| `/guides`, `/guides/[slug]`, `/blog` and `/blog/[slug]` | Guides and blog | T15 | Jobber Academy; HoneyBook blog |
| `/about` | About: who's behind Heyday, with the story [TBC] | T16 | Both |
| `/security` | Security, in plain words: payments, two-factor login, data export | T16 | Better than both |
| `/help` | Help and onboarding: how to reach a person, `[support hours to confirm]`, the setup call `[to confirm]` | T16 | Both |
| `/contact` | Contact | T16 | Both |
| `/demo` | Book a demo, with a calendar placeholder | T16 | Jobber's demo page |
| `/early-access` | What "Start free trial" opens for now | T16 | Jobber's one-step signup |
| `/login` | Log in placeholder: Heyday opens with early access | T16 | Both |
| `/for-ai` | Plain text about Heyday, for AI search tools | T16 (plain) | Jobber's llm-info; HoneyBook's ai-information |
| `/terms` and `/privacy` | Legal, marked for legal review | T16 (plain) | Both |
| `not-found` | 404 | T16 | Our own |

**Later, not at launch** (both rivals have these; add them when they're real):
- a reviews page, once there are real reviews
- a referral or partner programme, once the policy is decided
- careers
- a status page
- a full help centre
- more free tools (an invoice generator, a profit margin calculator)

**Where jobbie already has a page,** rewrite it rather than adding a duplicate. That includes the 20 feature pages, `/features`, `/about`, `/contact`, `/blog`, `/privacy` and `/terms`.

**Remove the agency pages:** `/services`, `/projects`, `/projects/tipsy-parties` and the old blog post. Redirect each old URL to its nearest new page.

---

## 4. Page templates

Build each template once and fill it from a data file. Every page follows the rules in section 5 for what moves.

This section summarises the templates. The spec files in `spec/` write out every page in full, section by section, with holding copy. Build from those.

### T1. Home

Build it exactly as `HEYDAY-SITES-DESIGN-BRIEF.md`, B4, sets out, with the copy from SaaS brief 3.7 ("Homepage copy"). The hero uses Jem's new copy in `spec/01-global-and-home.md`, not the SaaS brief's.
- Take the old site's sections off the homepage: the flock, orb, synergy brain, particle and neural canvases, and the binary intro. Leave their files on disk.

### T2. Feature page

This is Jobber's template (SaaS brief 5.5 and Appendix C), plus Jem's additions from `BUILD-NEXT-HEYDAY-SAAS.md` Phase 3, plus HoneyBook's FAQ.
1. **Breadcrumb:** Features › group › feature. The group's section mark sits small beside the group name.
2. **Hero:**
   - The H1 is the owner's pain, from the headline bank.
   - The line under it names the feature in search words. Use the same words in the page title.
   - A status chip: "Live" or "Coming soon".
   - Two buttons: "Start free trial" (or "Join early access" when the feature is coming soon) and "Book a demo".
   - On the right, a product screen in a panel, drawn in the style of the workflow-builder still and labelled "Illustration · example data". The feature's small icon sits on it as a tilted sticker.
3. **Saves / Increases / Reduces:** three short lines, as three cards on the Heyday line.
4. **The proof:** `StatBlock`, which always prints the source, year and who it covers.
5. **What it's costing you:** a worked example with the maths shown, or a small calculator. The Quotes page follows SaaS brief 3.9 exactly, including the interactive quote.
6. **How it works:** a sticky scroll with three or four blocks. Jump links go above it.
7. **For your kind of business:** three short real situations from different kinds of business, for example a caterer, a class host and a cleaner.
8. **A customer quote:** signed "Placeholder" until a real one is approved.
9. **FAQ:** only questions the briefs can answer honestly.
10. **Related features:** cards with the small icons.
11. **Closing call to action:** an ink block with the two buttons.

**Two special pages:**
- The Follow-ups and autoresponders page (`/features/follow-ups`), which also covers automations, uses the workflow-builder still as its hero picture.
- "Only on Heyday" pages carry an "Only on Heyday" sticker by the H1.

### T3. Group page (the six groups)

1. **Hero:** the group name, and its promise from SaaS brief 3.3. On the right, the group's section mark, which morphs out of the sun on load.
2. **The steps in this group:** from the 12-step flow, on the Heyday line.
3. **The group's features:** cards with small icons and status chips, linking to each feature page.
4. **One more-info section** (A12) for the group's headline feature. Its shape grows into the page.
5. **One statistic** from the stats bank.
6. **Two real situations.**
7. **The next group,** on the Heyday line ("Next: Get paid →"). Get rebooked loops back to Get ahead, and the Loop mark spins there.
8. **Closing call to action.**

### T4. All features

- **Opening:** a short headline, then a filter row: the six groups, "Only on Heyday", and Live or Coming soon.
- **The six groups in order:** each heading has its section mark and promise, then the feature cards.
- **Jump links** stay pinned under the header while you scroll. This is a normal sticky element, not the picture-changing sticky scroll.

### T5. How it works

1. **Hero:** "One workflow for your whole business, from the first hello to the next booking."
2. **The 12 steps as a sticky scroll** (B7 mechanics):
   - On the left, one block per step. Each block has three short columns: what the customer does, what the business does, and what Heyday does.
   - On the right, the picture changes with each step: the customer's phone, then the owner's screen.
   - The Heyday line runs down the side and fills orange as you go.
3. **The variations** (SaaS brief 3.3): classes skip the quote, some trades need a visit first, recurring work loops back, and marketplace bookings arrive already won. Show them as four stickers.
4. **Links to the six group pages,** each card with its section mark.
5. **Closing call to action.**

### T6. Who it's for

1. **Hero:** "Built for businesses that sell time, skills and experiences." A rotating line underneath names kinds of business and ends on "you".
2. **Who it suits:** the six kinds, written as examples (SaaS brief 1 and 3.2), each with an anchor for the header menu.
   - End with: "If you sell your time, your skills or an experience, it's for you."
3. **The solutions,** by group: six cards, each with its section mark and colour, linking to the group page.
4. **Grows with you:** the four stages as stickers on the Heyday line.
5. **The seven story cards,** in a swipeable row.
6. **Closing call to action.**

### T7. Story page

Like Jobber's customer stories, set out as an article.
1. **Hero:** the kind of business and what it sells, labelled "Example", with a line naming the chore that hurts most.
2. **The four growth stages as a sticky scroll:** the picture shows the features switching on at each stage.
3. **The features used:** small icon cards, linking to each feature page.
4. **The early-access box.**

**Rules:**
- Every story is labelled Example until real customers replace them.
- The others use no invented names, quotes, logos or numbers.

### T8. Pricing

The structure is Jobber's and HoneyBook's.
1. **Headline:** "Try Heyday free. Pick a plan later."
2. **A monthly and yearly toggle.**
3. **Three plan cards** (panels):
   - Each has a one-line "for the business that…" tagline, `[PRICE TBC]`, and "Everything in [the plan below], plus".
   - The middle plan has a "Most popular" sticker, but only once that's true.
4. **Card fees,** shown openly as `[TBC]`.
5. **Add-ons,** if any.
6. **A full comparison table,** grouped by the six groups, with a header row that stays in view. The table doesn't move otherwise.
7. **Reassurance:** the money-back guarantee and the free setup call, both `[to confirm]`.
8. **FAQ.**
9. **Closing call to action.**

### T9. Compare hub and compare pages

**Hub:** one card per rival.

**Each page:**
1. A summary table, with the date it was checked.
2. A feature grid, grouped by the six groups.
3. An honest list of where the rival is better.
4. A four-step switching plan, on the Heyday line.
5. FAQ.
6. Closing call to action.

Check every rival fact on the day you write it. `research/` is a starting point from 13 September 2026, not a source to quote from.

### T10. Integrations

**Index:** by category.

**Each page:**
- what it connects, and how;
- related features;
- its status.

**Status:** every integration says "Coming soon" until Heyday is live (the briefs name QuickBooks, Xero, Google Calendar, Google and Microsoft Ads, WhatsApp, and Airbnb Experiences, ClassBento, Togather, LetsBatch and Yuup).

**Logos:** don't use other companies' logos until Jem confirms it's allowed. Use their names.

### T11. The AI (`/features/ai`)

1. **Lead with:** "You choose how much the AI does."
2. **The three levels** (SaaS brief 3.8) as a sticky scroll. The picture shows one email:
   - drafted for approval;
   - corrected, so the AI learns;
   - sent on its own within the owner's rules.
   The mark goes from the sun, to the Loop, to Infinity as the levels rise.
3. **The plain-words explainer:** levels 1 and 2 are an assistant; level 3 is an agent acting within the owner's rules.
4. **The promise:** "The AI drafts. You approve."
5. **The safeguards.**
6. **The AI features,** each linking to its page.
7. **FAQ and closing call to action.**

### T12. Resources hub

Cards for tools, templates, guides, the blog, compare and help, then a closing call to action.

### T13. Free tool and template page

Like Jobber's free tools.
1. The tool comes first, with no email wall. Buttons are verbs ("Work out my price").
2. The result.
3. Only then the upsell ("Put those prices into action…").
4. Related tools.
5. FAQ.

### T14. The "leak check" score

A short quiz built on the six groups.
- The Heyday line shows progress.
- The results give one score per group, each with its section mark, and link to the features that fix the gaps.
- No email wall.

### T15. Guide, blog and What's new

- A reading layout about 65 characters wide, with related articles and one call-to-action box.
- **Seed content:** build each template with one clearly labelled sample that isn't published and isn't indexed. Jem writes the real ones.
- **What's new** starts with no made-up entries. The first ones arrive with early access.

### T16. Company and utility pages

**Plain layouts, in the same brand:**
- About, Security, Help, Contact and Demo.
- **Early access:** a form with name, email, kind of business and what they sell.
  - Store and send nothing until the privacy notice and consent wording are agreed.
  - On success, the sun bounces.
- **Log in:** a placeholder.
- **For AI:** plain text, with no motion.
- **Legal:** plain, with no motion, marked for legal review.
- **404:** the sun bounces and turns into the Loop, with links to Home, Features and Pricing.

---

## 5. Where the motion goes, and where it doesn't

"Only where they make sense" means this table. If a place isn't listed, keep it still.

| Element | Use it on | Never on |
|---|---|---|
| Rising cards (A9) | The homepage hero | Anywhere else on this site |
| The sun, animated (A11) | Header (one bounce on load), footer (slow cycle through the six shapes), 404, early-access success, loading states (spinning Loop) | Inside forms and tables, and legal pages |
| Section marks (A11) | Group pages, the features index, the homepage feature rows, the Who it's for solutions, quiz results, the Product menu (small and still), feature breadcrumbs (small and still) | As decoration with no group behind it |
| Small icons (A7) | Feature cards, menu links, related features, pricing table rows, stories' "features used" | Section heroes, which use section marks |
| More info, growing into the page (A12) | Homepage feature rows, one per group page | Feature pages, pricing, compare, legal, articles |
| Sticky scroll, with the picture changing (B7) | Homepage "What it does", feature pages ("How it works"), How it works, story pages, the AI page | Pricing, compare, tools, articles, legal |
| Pinned sideways scroll (B6) | The homepage only, twice | Everywhere else. Use normal swipe rows instead |
| Workflow builder (B8) | Homepage; the Follow-ups and autoresponders feature page | Anywhere else |
| The Heyday line (A8) | Anywhere steps or order matter: hero steps, sideways progress, group next-and-previous, grows with you, switching plans, quiz progress, the AI levels, the How it works timeline | Plain lists |
| Rise and parallax (A6) | Section headings, cards and pictures on marketing pages | Body text in articles, form fields, table rows, legal pages |
| Stickers (A5) | Three at most per screen: outcomes, "Most popular", stat callouts, grows with you, "Only on Heyday" | Buttons, forms, tables |
| Background fades between sections (B2) | Marketing pages | Articles, tools, legal and forms, which stay on paper |
| 56px overlapping rounded tops (A10) | Marketing pages | Inside articles and legal pages |

**On every page:**
- Buttons (A4), with orange as the main action and ghost as the second.
- Panels and cards (A5).
- The type scale (A3).
- Reduced motion switches all movement off.

---

## 6. Components, data and files

**Copy in:**

| From `docs/heyday/assets/` | To |
|---|---|
| `heyday-wordmark.png` | `public/brand/heyday-wordmark.png`. Show it in `wordmark.tsx` as a CSS mask, so it can take a colour, with the label "Heyday, home" |
| `heyday-mark.svg` | `public/brand/heyday-mark.svg`, plus the favicon and app icons made from it |
| `heyday-mark-motion.js` | `src/lib/heyday-mark-motion.js`, ported into `HeydayMark` |
| `heyday-section-marks.svg` | `public/icons/heyday-section-marks.svg` |
| `heyday-family-sprite.svg` | `public/icons/heyday-family.svg` |
| `heyday-workflow-builder-still.svg` | `public/placeholders/workflow-builder.svg` |
| `heyday-hero-still.svg` | Reference only |

**Components** (one each, reused everywhere):
- **Page structure:** `PageShell` (the section stacking and background fades), `SiteHeader` and its three panels, `SiteFooter`.
- **Basics:** `Button`, `Panel`, `Card`, `Sticker`, `Icon`, `SectionMark`, `StatusChip`, `Breadcrumbs`, `FAQ`, `CTABlock`.
- **Motion:** `HeydayMark`, `HeydayLine`, `SectionReveal`, `RevealGroup`, `Parallax`, `RisingCards`, `SideScroll`, `StickyScroll`, `MoreInfoSection`, `WorkflowDemo`.
- **Content blocks:** `StatBlock`, `OutcomeTrio`, `WorkedExample`, `RelatedFeatures`, `StoryCard`, `PlanCard`, `ComparisonTable`, `FilterChips`, `QuizEngine`, `EarlyAccessForm`.
- **Pictures:** `ScreenIllustration`, the product screens drawn in SVG.

**Data** (words live in data, pages come from templates):
- `groups.ts`: the six groups, each with its name, promise, steps, colour and shape.
- `features.ts`, extended as in `BUILD-NEXT-HEYDAY-SAAS.md` Phase 3: status, pain, searchLine, outcomes, stats, example, group and icon.
- `stories.ts`, `compare.ts`, `integrations.ts`, `tools.ts`, `faqs.ts`, `nav.ts`, `updates.ts`.
- `site.ts`: the product name, `[PHONE TBC]` and the other placeholders.

**A style guide route,** `/styleguide`, not indexed. It shows every component and every kind of motion on one page, so Jem can check them in one go.

---

## 7. Build order

Commit at the end of every phase. Before each commit, check that the typecheck, the linter (the baseline is 7 existing warnings) and the build all pass.

| Phase | What | Checkpoint |
|---|---|---|
| 0 | Copy the docs in, write `SITE-PLAN.md`, clear out the old site's leftovers (`BUILD-NEXT-HEYDAY-SAAS.md` Phase 1), set the tokens and fonts | |
| 1 | The design system: every component and kind of motion in Part A of the design brief, and `/styleguide` | **Ask Jem for screenshots of `/styleguide`** |
| 2 | Header, footer and the homepage (B4) | **Ask Jem for homepage screenshots at 1440px and 400px** |
| 3 | `groups.ts` and `features.ts`, the features index, the six group pages, the feature template, then every feature page (rewrite the existing ones first) | **After the Instant quotes page and the index, ask Jem for screenshots** |
| 4 | The AI page, How it works, Who it's for, and the stories | |
| 5 | Pricing, the compare hub and pages, and integrations | |
| 6 | The resources hub, the three tools and the quiz, templates, and the guide and blog templates | |
| 7 | Company and utility pages, `/for-ai`, legal, 404, What's new, redirects from the old URLs | |
| 8 | A whole-site pass (below) | **Send Jem the list of pages to screenshot** |

**The whole-site pass:**
- Every link works, and every page links on to the next thing.
- **Search:** page titles (using each feature's search line), meta descriptions, `sitemap.xml`, `robots.txt`, and share images showing the section mark on its colour.
- **Keyboard:** everything can be reached and has a visible focus.
- **Contrast and reduced motion:** both pass.
- **Hidden sections:** no motion runs off screen.
- **Phones:** nothing scrolls sideways at 400px, apart from the swipe rows.

**At each checkpoint,** carry on with the next phase while you wait, unless Jem asks you to stop.

---

## 8. Rules that still apply

- **Honest claims only** (`BUILD-NEXT-HEYDAY-SAAS.md` rule 1):
  - Every feature is "Coming soon" until Jem and Russell decide.
  - Don't invent customers, numbers, prices, ratings, awards or quotes.
  - Every statistic comes from `STATS-BANK.md` and shows its source.
- **Placeholders stay visible.** Every placeholder listed in `DECISIONS-NEEDED.md` stays on the page exactly as written until Jem or Russell gives the answer.
- **"Start free trial"** opens early access. The form stores and sends nothing yet.
- **Tipsy Parties:** don't mention Tipsy Parties anywhere on the site, and never say it built Heyday, unless Jem and Russell decide otherwise (`DECISIONS-NEEDED.md`).
- **Never touch the Tipsy system.** Only this repo.
- **Don't re-propose** anything in the design record's "Do not re-propose" table.
- **You can't see the running site.** The design record says Claude's browser is on another machine. So:
  - Don't claim how anything looks. Check with the typecheck, the linter, HTTP status and measured numbers.
  - Ask Jem for screenshots at the checkpoints.
- **Turbopack can serve stale CSS** after `globals.css` changes. Stop the server, delete `.next`, restart, then hard-reload.
- **US English** throughout.

---

## 9. Done when

**Every page:**
- It uses its template and follows the motion table in section 5.
- Its H1 and title follow the headline bank.
- Its status shows.
- Every number is approved or clearly a placeholder.
- It works at 400px and with reduced motion.

**The whole site:**
- Every route in section 3 exists.
- Every box in section 2 is ticked.
- The header menus and the footer link to every section.
- The typecheck, the linter and the build pass.
- Jem has seen the screenshots at each checkpoint.

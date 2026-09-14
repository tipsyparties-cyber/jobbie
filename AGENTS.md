<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

## The Turbopack stale-CSS trap

Editing `src/app/globals.css` while the dev server is running serves the
**old** stylesheet under an unchanged chunk hash. The page then renders
with markup that has no rules behind it, which looks like broken HTML
rather than a caching problem — so the time goes on hunting a layout bug
that isn't there.

This has cost time twice. Both times the symptom was a section whose
elements had lost their sizing and stacked full-width.

**If a page suddenly looks unstyled, check the served CSS before the
markup:**

```bash
# the stylesheet the page actually asked for
curl -s http://localhost:3001/ | grep -o '/_next/static/[^"]*\.css' | head -1
# then grep it for a class you just added
curl -s "http://localhost:3001<that path>" | grep -c my-new-class
```

Zero matches means stale CSS, not broken markup.

**The fix:** `npm run dev:fresh` — it deletes `.next` first. Then hard
reload (Ctrl+Shift+R), because the browser caches the stylesheet too.

Running `next build` also deletes `.next`, so a production build while
the dev server is up leaves the dev server serving from a directory that
no longer exists. Restart it afterwards.

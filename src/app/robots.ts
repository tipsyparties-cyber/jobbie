import type { MetadataRoute } from "next";

/* ==================================================================== *
 *  robots.txt — Phase 8.
 *
 *  AI crawlers are allowed, deliberately. Increasingly, how a small
 *  business finds software is by asking an assistant, and /for-ai exists
 *  to be read by exactly those crawlers — blocking them and then writing
 *  a page for them would be working against ourselves.
 *
 *  What is disallowed is the holding content: the sample article, the
 *  legal structures that say "not yet legal text", the login placeholder
 *  and the style guide. None of those should be the first thing anyone
 *  sees of Heyday, and two of them would be actively misleading if they
 *  were quoted.
 * ==================================================================== */

const BASE = "https://heyday.app";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          /* Holding content, which is clearly labelled on the page but
             would not be in a search result. */
          "/guides/sample-article",
          "/blog/sample-article",
          /* Structures for legal review, not documents. Indexing these
             would let a page that says "not yet legal text" be found by
             somebody looking for the actual terms. */
          "/terms",
          "/privacy",
          /* Nothing behind it. */
          "/login",
          /* For Jem. */
          "/styleguide",
        ],
      },
    ],
    sitemap: `${BASE}/sitemap.xml`,
  };
}

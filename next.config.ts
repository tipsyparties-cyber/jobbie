import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /**
   * `next build` deletes the build directory it is about to write, and by
   * default that is the same `.next` a running dev server is reading from
   * — so a production build leaves the local preview serving a 500 until
   * someone restarts it. That has bitten twice.
   *
   * `npm run build:safe` sets NEXT_DIST_DIR, so the build goes somewhere
   * else and the dev server is untouched. CI leaves it unset and gets the
   * normal `.next`.
   */
  distDir: process.env.NEXT_DIST_DIR || ".next",

  images: {
    formats: ["image/avif", "image/webp"],
  },

  /**
   * The agency pages are gone (BUILD-NEXT Phase 1). They presented Heyday's
   * software as an agency's service and Tipsy as an agency's client project,
   * which is the opposite of what this site now says.
   *
   * Permanent, because these URLs are the old site's and nothing should keep
   * asking for them — but each one points at the page that actually answers
   * what the visitor wanted, rather than dumping everyone on the homepage.
   */
  async redirects() {
    return [
      { source: "/services", destination: "/features", permanent: true },
      { source: "/projects", destination: "/stories", permanent: true },
      /**
       * This used to point at /stories/tipsy-parties, which was wrong twice
       * over: there is no such page, so the redirect landed on a 404; and
       * the brief forbids naming Tipsy Parties anywhere on this site unless
       * Jem and Russell decide otherwise. It goes to the stories index.
       */
      {
        source: "/projects/tipsy-parties",
        destination: "/stories",
        permanent: true,
      },
      {
        source: "/blog/demystifying-ai-automation",
        destination: "/blog",
        permanent: true,
      },
      /* The old site's legal URLs. The new ones are /terms and /privacy,
         which is what every link on the site now uses. */
      {
        source: "/terms-of-service",
        destination: "/terms",
        permanent: true,
      },
      {
        source: "/privacy-policy",
        destination: "/privacy",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
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
      {
        source: "/projects/tipsy-parties",
        destination: "/stories/tipsy-parties",
        permanent: true,
      },
      {
        source: "/blog/demystifying-ai-automation",
        destination: "/blog",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;

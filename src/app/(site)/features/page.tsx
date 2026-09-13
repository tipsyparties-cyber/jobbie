import type { Metadata } from "next";
import Link from "next/link";
import { SHELL, Rule } from "@/components/home/section-kit";
import { BUCKETS, featuresIn, FEATURES } from "@/lib/features";
import { CTA, SITE } from "@/lib/site";

/**
 * The features index — Heyday's equivalent of getjobber.com/features.
 *
 * Sorted by outcome rather than alphabetically, the same way the home page's
 * sideways band is, because that is the sort a business owner is actually
 * doing in their head: not "what does it have" but "what will it fix".
 *
 * A server component. Nothing here moves, so nothing here needs to ship as
 * client JavaScript.
 */

export const metadata: Metadata = {
  title: "Features",
  description:
    "Everything Heyday does, sorted by what it fixes: getting found, winning the work, running it without you, and keeping more of it.",
};

export default function FeaturesIndex() {
  return (
    <div className="text-ink">
      <header className={`${SHELL} pb-20 pt-16`}>
        <nav aria-label="Breadcrumb" className="font-body text-sm text-ink/55">
          <Link href="/" className="transition-colors hover:text-ink">
            Home
          </Link>
          <span className="px-2">/</span>
          <span className="text-ink/80">All features</span>
        </nav>

        <h1 className="mt-12 max-w-[16ch] font-body text-[clamp(2.25rem,7vw,5.5rem)] font-semibold leading-[0.94] tracking-[-0.04em]">
          Everything {SITE.name} does.
        </h1>
        <p className="mt-8 max-w-2xl font-body text-lg leading-relaxed text-ink/75">
          {FEATURES.length} features, sorted by what they fix rather than
          alphabetically — because nobody has ever gone looking for software by
          feature name.
        </p>
      </header>

      {BUCKETS.map((bucket) => (
        <section key={bucket.id} id={bucket.id}>
          <Rule />
          <div className={`${SHELL} py-20`}>
            <div className="grid gap-10 lg:grid-cols-[1fr_2fr]">
              <div>
                <span className="font-body text-sm font-medium text-ink/45">
                  {bucket.n}
                </span>
                <h2 className="mt-4 font-body text-[clamp(1.9rem,3.4vw,3rem)] font-medium leading-[1.02] tracking-[-0.03em]">
                  {bucket.title}
                </h2>
                <p className="mt-5 max-w-sm font-body text-base leading-relaxed text-ink/70">
                  {bucket.copy}
                </p>
              </div>

              <ul className="grid gap-5 sm:grid-cols-2">
                {featuresIn(bucket.id).map((f) => (
                  <li key={f.slug}>
                    <Link
                      href={`/features/${f.slug}`}
                      className="group flex h-full flex-col rounded-3xl p-7 transition-transform hover:-translate-y-1"
                      style={{ backgroundColor: f.tint }}
                    >
                      <p className="font-body text-lg font-medium leading-snug">
                        {f.name}
                      </p>
                      <p className="mt-2 flex-1 font-body text-sm leading-relaxed text-ink/70">
                        {f.promise}
                      </p>
                      <span className="mt-5 font-body text-sm font-medium text-ink">
                        Learn more{" "}
                        <span
                          aria-hidden
                          className="inline-block transition-transform group-hover:translate-x-1"
                        >
                          →
                        </span>
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      ))}

      <Rule />
      <section className={`${SHELL} py-28`}>
        <h2 className="max-w-[14ch] font-body text-[clamp(2rem,6vw,4.75rem)] font-semibold leading-[0.95] tracking-[-0.04em]">
          Ready to see what&apos;s possible?
        </h2>
        <div className="mt-10">
          <Link
            href={CTA.primary.href}
            className="inline-block rounded-full bg-ink px-7 py-3 font-body text-sm font-medium text-cream transition-opacity hover:opacity-85"
          >
            {CTA.primary.label}
          </Link>
        </div>
      </section>
    </div>
  );
}

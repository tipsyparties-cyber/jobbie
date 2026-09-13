import Link from "next/link";
import { NeoCard } from "@/components/ui/neo-card";
import { SectionReveal } from "@/components/ui/section-reveal";

export function ProjectTeaser() {
  return (
    <section className="py-32 px-6">
      <div className="mx-auto max-w-[1280px]">
        <SectionReveal>
          <div className="grid items-center gap-12 md:grid-cols-2">
            <div>
              <p className="font-sans text-xs font-medium uppercase tracking-widest text-accent">
                Featured Project
              </p>
              <h2 className="mt-4 font-display text-4xl font-light md:text-5xl">
                Tipsy Parties
              </h2>
              <p className="mt-6 text-mid-grey leading-relaxed">
                A fully autonomous operations system &mdash; from instant quoting and
                live booking to automated staff allocation, inventory management,
                AI customer service, and recruitment. The entire business runs
                itself.
              </p>
              <Link
                href="/stories/tipsy-parties"
                className="mt-8 inline-flex items-center gap-2 font-sans text-sm font-medium text-accent transition-colors hover:text-accent-hover"
              >
                View case study
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M8 14V2M8 2L3 7M8 2L13 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
            </div>

            <NeoCard className="aspect-[4/3] flex items-center justify-center bg-gradient-to-br from-peach/30 to-coral/20">
              <p className="font-display text-6xl font-light text-warm-grey/20">TP</p>
            </NeoCard>
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}

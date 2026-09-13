import type { Metadata } from "next";
import { SectionReveal } from "@/components/ui/section-reveal";
import { ArticleCard } from "@/components/blog/article-card";

export const metadata: Metadata = {
  title: "Blog",
  description: "Insights on AI & automation for businesses — practical guides, industry analysis, and honest advice from Heyday.",
};

export default function BlogPage() {
  return (
    <div className="pt-32 pb-20 text-ink">
      <section className="px-6">
        <div className="mx-auto max-w-[1280px]">
          <SectionReveal>
            <p className="font-sans text-xs font-medium uppercase tracking-widest text-ink/50">Insights</p>
          </SectionReveal>

          <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            <SectionReveal>
              <ArticleCard
                slug="demystifying-ai-automation"
                title="Demystifying AI Automation: How It's Revolutionising Industries and What It Actually Means for Your Business"
                description="Cut through the jargon. We explain what AI automation actually is, how it's changing industries, and what it could mean for your specific business."
                date="March 2026"
                readTime="15 min read"
              />
            </SectionReveal>
          </div>
        </div>
      </section>
    </div>
  );
}

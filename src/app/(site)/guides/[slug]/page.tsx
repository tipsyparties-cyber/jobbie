import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Article, ArticleBody } from "@/components/heyday/article";
import { GUIDES, SAMPLE, guideBySlug } from "@/lib/articles";
import { SITE } from "@/lib/site";

/* ==================================================================== *
 *  /guides/[slug] — template T15.
 *
 *  Only the sample has a page, because only the sample has been written.
 *  A guide that is planned but not written gets a card on the index that
 *  says "Coming soon" — not a page with nothing on it.
 * ==================================================================== */

export function generateStaticParams() {
  return [{ slug: SAMPLE.slug }];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const g = guideBySlug(slug);
  if (!g) return {};
  return {
    title: `${g.title}`,
    description: g.line,
    // The sample is never indexed. It exists so the template can be seen.
    robots: { index: false, follow: false },
  };
}

export default async function GuidePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  if (slug !== SAMPLE.slug) notFound();

  return (
    <Article stub={SAMPLE} kind="Guide" related={GUIDES}>
      <ArticleBody blocks={SAMPLE.body} />
    </Article>
  );
}

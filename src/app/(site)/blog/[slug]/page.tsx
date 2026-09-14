import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Article, ArticleBody } from "@/components/heyday/article";
import { POSTS, SAMPLE, postBySlug } from "@/lib/articles";
import { SITE } from "@/lib/site";

/* ==================================================================== *
 *  /blog/[slug] — template T15.
 *
 *  Only the sample has a page, because only the sample has been written.
 *  A post that is planned but not written gets a card on the index saying
 *  "Coming soon", not a page with nothing on it.
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
  const p = postBySlug(slug);
  if (!p) return {};
  return {
    title: `${p.title}`,
    description: p.line,
    // The sample is never indexed. It exists so the template can be seen.
    robots: { index: false, follow: false },
  };
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  if (slug !== SAMPLE.slug) notFound();

  return (
    <Article stub={SAMPLE} kind="Blog" related={POSTS}>
      <ArticleBody blocks={SAMPLE.body} />
    </Article>
  );
}

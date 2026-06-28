import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MarketingNav } from "@/components/marketing/nav";
import { MarketingFooter } from "@/components/marketing/footer";
import { BLOG_POSTS, getBlogPost, getRelatedPosts, CATEGORIES } from "@/lib/blog/posts";
import { RichParagraph } from "@/components/marketing/rich-paragraph";
import { ButtonLink } from "@/components/ui/button";

const SITE_URL = "https://virello.app";

export function generateStaticParams() {
  return BLOG_POSTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) return {};

  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: `/blog/${slug}` },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.excerpt,
      publishedTime: post.publishedAt,
      authors: [post.author],
    },
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) notFound();

  const related = getRelatedPosts(post);
  const categoryLabel = CATEGORIES.find((c) => c.id === post.category)?.label;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    datePublished: post.publishedAt,
    author: { "@type": "Organization", name: post.author },
    publisher: { "@type": "Organization", name: "Virello" },
    mainEntityOfPage: `${SITE_URL}/blog/${slug}`,
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <MarketingNav />
      <main className="flex-1">
        <article className="mx-auto max-w-2xl px-6 py-16">
          <Link
            href="/blog"
            className="text-xs uppercase tracking-wide text-cyan transition-opacity hover:opacity-80"
          >
            {categoryLabel}
          </Link>
          <h1 className="mt-3 font-display text-3xl font-semibold leading-tight tracking-tight sm:text-4xl">
            {post.title}
          </h1>
          <div className="mt-4 flex items-center gap-2 text-sm text-text-dim">
            <span>{post.author}</span>
            <span>·</span>
            <time dateTime={post.publishedAt}>
              {new Date(post.publishedAt).toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </time>
          </div>

          <div className="mt-8 rounded-xl border border-border bg-ink-card p-4">
            <p className="text-sm text-text-dim">
              <span className="font-medium text-text">TL;DR</span> — {post.body[0].replace("TL;DR: ", "")}
            </p>
          </div>

          <div className="mt-8 space-y-5">
            {post.body.slice(1).map((para, i) => (
              <RichParagraph key={i} text={para} />
            ))}
          </div>

          <div className="mt-12 rounded-2xl border border-violet/30 bg-violet/5 p-7 text-center">
            <p className="font-display text-lg font-medium">Write once, publish to 7 platforms</p>
            <ButtonLink href="/signup" className="mt-4">
              Try Virello free
            </ButtonLink>
          </div>

          {related.length > 0 && (
            <div className="mt-14">
              <h2 className="font-display text-lg font-medium">Related</h2>
              <div className="mt-4 space-y-3">
                {related.map((r) => (
                  <Link
                    key={r.slug}
                    href={`/blog/${r.slug}`}
                    className="block rounded-lg p-3 transition-colors hover:bg-ink-card"
                  >
                    <p className="font-medium">{r.title}</p>
                    <p className="mt-0.5 text-sm text-text-dim">{r.excerpt}</p>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </article>
      </main>
      <MarketingFooter />
    </>
  );
}

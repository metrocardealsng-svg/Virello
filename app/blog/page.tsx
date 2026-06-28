import type { Metadata } from "next";
import Link from "next/link";
import { MarketingNav } from "@/components/marketing/nav";
import { MarketingFooter } from "@/components/marketing/footer";
import { BLOG_POSTS, CATEGORIES } from "@/lib/blog/posts";

export const metadata: Metadata = {
  title: "Blog — social media strategy, platform guides, and growth",
  description:
    "Practical, honest writing on cross-posting, platform algorithms, content calendars, and growing a social presence without burning out.",
  alternates: { canonical: "/blog" },
};

export default function BlogIndexPage() {
  const sorted = [...BLOG_POSTS].sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );

  return (
    <>
      <MarketingNav />
      <main className="flex-1">
        <section className="border-b border-border py-16">
          <div className="mx-auto max-w-4xl px-6 text-center">
            <h1 className="font-display text-4xl font-semibold tracking-tight">Blog</h1>
            <p className="mt-4 text-text-dim">
              Strategy, platform guides, and growth notes, written for people actually doing the
              posting.
            </p>
          </div>
        </section>

        <section className="py-16">
          <div className="mx-auto max-w-4xl px-6">
            <div className="flex flex-wrap gap-2">
              {CATEGORIES.map((c) => (
                <span
                  key={c.id}
                  className="rounded-full border border-border px-3 py-1 text-xs text-text-dim"
                >
                  {c.label}
                </span>
              ))}
            </div>

            <div className="mt-8 space-y-1">
              {sorted.map((post) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="block rounded-xl p-4 transition-colors hover:bg-ink-card"
                >
                  <div className="flex items-center gap-2 text-xs text-text-dim">
                    <span className="uppercase tracking-wide text-cyan">
                      {CATEGORIES.find((c) => c.id === post.category)?.label}
                    </span>
                    <span>·</span>
                    <span>{new Date(post.publishedAt).toLocaleDateString()}</span>
                  </div>
                  <h2 className="mt-1.5 font-display text-lg font-medium">{post.title}</h2>
                  <p className="mt-1 text-sm text-text-dim">{post.excerpt}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
      <MarketingFooter />
    </>
  );
}

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getPostByShareId, incrementShareViews } from "@/lib/posts/engine";
import { PlatformIcon } from "@/components/icons/platforms";
import { PLATFORMS, type Platform } from "@/lib/platforms";
import { VirelloLogo } from "@/components/icons/logo";
import { ShareButtons } from "@/components/marketing/share-buttons";
import { ButtonLink } from "@/components/ui/button";

const SITE_URL = "https://virello.app";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ shareId: string }>;
}): Promise<Metadata> {
  const { shareId } = await params;
  const result = await getPostByShareId(shareId);
  if (!result) return {};

  const post = result.post;
  const description = post.body.slice(0, 160);
  const ogImage = `${SITE_URL}/api/og?id=${shareId}`;

  return {
    title: "A post, reaching everywhere",
    description,
    alternates: { canonical: `/r/${shareId}` },
    openGraph: {
      title: "Posted with Virello",
      description,
      images: [{ url: ogImage, width: 1200, height: 630 }],
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      images: [ogImage],
    },
  };
}

export default async function SharePage({ params }: { params: Promise<{ shareId: string }> }) {
  const { shareId } = await params;
  const result = await getPostByShareId(shareId);
  if (!result) notFound();

  const post = result.post;
  const targets = result.targets as { platform: Platform; status: string; published_url: string | null }[];

  // Counted once per real page render, not during metadata generation, which both
  // run on every request but would otherwise double the count per visit.
  await incrementShareViews(post.id);

  const pageUrl = `${SITE_URL}/r/${shareId}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    headline: post.body.slice(0, 110),
    datePublished: post.created_at,
    url: pageUrl,
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <main className="flex min-h-screen flex-col items-center px-6 py-16">
        <Link href="/">
          <VirelloLogo size={28} />
        </Link>

        <div className="mt-10 w-full max-w-xl rounded-2xl border border-border bg-ink-card p-8">
          <p className="whitespace-pre-wrap text-lg leading-relaxed text-text">{post.body}</p>

          <div className="mt-6 flex flex-wrap gap-2 border-t border-border pt-5">
            {targets.map((t, i) => (
              <span
                key={i}
                className="flex items-center gap-1.5 rounded-full bg-ink px-3 py-1.5 text-xs text-text-dim"
              >
                <PlatformIcon platform={t.platform} size={13} />
                {PLATFORMS[t.platform]?.name}
              </span>
            ))}
          </div>

          <div className="mt-5 flex items-center justify-between text-xs text-text-dim">
            <span>{new Date(post.created_at).toLocaleDateString()}</span>
            <span>{post.share_views} views</span>
          </div>
        </div>

        <div className="mt-6">
          <ShareButtons url={pageUrl} title={post.body.slice(0, 100)} />
        </div>

        <div className="mt-14 rounded-2xl border border-violet/30 bg-violet/5 p-8 text-center">
          <p className="font-display text-xl font-medium">Make your own</p>
          <p className="mt-2 text-sm text-text-dim">
            Write one post, publish it natively across 7 platforms in under a minute.
          </p>
          <ButtonLink href="/signup" className="mt-5">
            Try it free
          </ButtonLink>
        </div>
      </main>
    </>
  );
}

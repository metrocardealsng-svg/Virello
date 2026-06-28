import Link from "next/link";
import { getCurrentUser } from "@/lib/auth";
import { listUserPosts } from "@/lib/posts/engine";
import { PlatformIcon } from "@/components/icons/platforms";
import type { Platform } from "@/lib/platforms";
import { ButtonLink } from "@/components/ui/button";

export const metadata = { title: "History" };

export default async function HistoryPage() {
  const user = await getCurrentUser();
  if (!user) return null;

  const posts = (await listUserPosts(user.id, 100)) as {
    id: string;
    body: string;
    status: string;
    created_at: string;
    share_id: string;
    share_views: number;
    targets: { platform: Platform; status: string }[];
  }[];

  return (
    <div className="max-w-5xl">
      <div className="flex items-center justify-between">
        <h1 className="font-display text-2xl font-semibold">Post history</h1>
        <ButtonLink href="/dashboard/compose" size="sm">
          New post
        </ButtonLink>
      </div>

      {posts.length === 0 ? (
        <div className="mt-8 rounded-xl border border-dashed border-border p-10 text-center">
          <p className="text-text-dim">No posts yet.</p>
        </div>
      ) : (
        <div className="mt-6 space-y-3">
          {posts.map((post) => (
            <div key={post.id} className="rounded-xl border border-border bg-ink-card p-5">
              <div className="flex items-start justify-between gap-4">
                <p className="line-clamp-2 flex-1 text-sm text-text">{post.body}</p>
                <span
                  className={`shrink-0 rounded-full px-2.5 py-0.5 text-xs font-medium ${
                    post.status === "published"
                      ? "bg-emerald/15 text-emerald"
                      : post.status === "scheduled"
                        ? "bg-amber/15 text-amber"
                        : "bg-border text-text-dim"
                  }`}
                >
                  {post.status}
                </span>
              </div>
              <div className="mt-3 flex items-center gap-2">
                {post.targets.map((t, i) => (
                  <span
                    key={i}
                    title={`${t.platform}: ${t.status}`}
                    className={`flex items-center gap-1 rounded-md px-1.5 py-1 ${
                      t.status === "published" ? "text-emerald" : "text-text-dim"
                    }`}
                  >
                    <PlatformIcon platform={t.platform} size={13} />
                  </span>
                ))}
              </div>
              <div className="mt-3 flex items-center justify-between border-t border-border pt-3 text-xs text-text-dim">
                <span>{new Date(post.created_at).toLocaleString()}</span>
                <div className="flex items-center gap-4">
                  <span>{post.share_views} views</span>
                  <Link href={`/r/${post.share_id}`} className="text-cyan hover:underline">
                    View result page
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

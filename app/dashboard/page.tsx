import Link from "next/link";
import { getCurrentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { getUsage } from "@/lib/billing/usage";
import { PLANS } from "@/lib/billing/plans";
import type { PlanId } from "@/lib/billing/plans";
import { ButtonLink } from "@/components/ui/button";
import { PlatformIcon } from "@/components/icons/platforms";
import type { Platform } from "@/lib/platforms";
import { PLATFORMS } from "@/lib/platforms";

export const metadata = { title: "Dashboard" };

export default async function DashboardOverview() {
  const user = await getCurrentUser();
  if (!user) return null;

  const plan = PLANS[user.plan as PlanId];
  const { postsUsed } = getUsage(user.id);
  const limit = plan.postsPerMonth;

  const recentPosts = db
    .prepare(`SELECT * FROM posts WHERE user_id = ? ORDER BY created_at DESC LIMIT 5`)
    .all(user.id) as { id: string; body: string; status: string; created_at: string; share_id: string }[];

  const connectedCount = (
    db
      .prepare(`SELECT COUNT(*) as c FROM connected_accounts WHERE user_id = ? AND status = 'connected'`)
      .get(user.id) as { c: number }
  ).c;

  const platformBreakdown = db
    .prepare(
      `SELECT platform, COUNT(*) as c FROM post_targets pt
       JOIN posts p ON p.id = pt.post_id
       WHERE p.user_id = ? GROUP BY platform`
    )
    .all(user.id) as { platform: Platform; c: number }[];

  return (
    <div className="max-w-5xl">
      <h1 className="font-display text-2xl font-semibold">Welcome back, {user.name.split(" ")[0]}</h1>
      <p className="mt-1 text-sm text-text-dim">Here's how your posting is going.</p>

      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        <StatCard
          label="Posts this period"
          value={limit === "unlimited" ? `${postsUsed}` : `${postsUsed} / ${limit}`}
        />
        <StatCard label="Connected accounts" value={`${connectedCount}`} />
        <StatCard label="Current plan" value={plan.name} />
      </div>

      {limit !== "unlimited" && postsUsed >= limit && (
        <div className="mt-6 rounded-xl border border-amber/30 bg-amber/10 p-4">
          <p className="text-sm text-amber">
            You've used all {limit} posts on the Free plan this month.{" "}
            <Link href="/dashboard/billing" className="underline">
              Upgrade to Creator
            </Link>{" "}
            for unlimited posts.
          </p>
        </div>
      )}

      <div className="mt-10 flex items-center justify-between">
        <h2 className="font-display text-lg font-medium">Recent posts</h2>
        <ButtonLink href="/dashboard/compose" size="sm">
          New post
        </ButtonLink>
      </div>

      {recentPosts.length === 0 ? (
        <div className="mt-4 rounded-xl border border-dashed border-border p-10 text-center">
          <p className="text-text-dim">Nothing posted yet. Your first post takes about a minute.</p>
          <ButtonLink href="/dashboard/compose" className="mt-4">
            Write your first post
          </ButtonLink>
        </div>
      ) : (
        <div className="mt-4 divide-y divide-border rounded-xl border border-border">
          {recentPosts.map((post) => (
            <Link
              key={post.id}
              href={`/r/${post.share_id}`}
              className="flex items-center justify-between gap-4 p-4 transition-colors hover:bg-ink-card"
            >
              <p className="line-clamp-1 flex-1 text-sm text-text">{post.body}</p>
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
            </Link>
          ))}
        </div>
      )}

      {platformBreakdown.length > 0 && (
        <div className="mt-10">
          <h2 className="font-display text-lg font-medium">Posts by platform</h2>
          <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {platformBreakdown.map((row) => (
              <div key={row.platform} className="rounded-xl border border-border bg-ink-card p-4">
                <div className="flex items-center gap-2 text-text-dim">
                  <PlatformIcon platform={row.platform} size={16} />
                  <span className="text-xs">{PLATFORMS[row.platform]?.name}</span>
                </div>
                <p className="mt-2 font-display text-xl font-semibold">{row.c}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-border bg-ink-card p-5">
      <p className="text-xs text-text-dim">{label}</p>
      <p className="mt-1 font-display text-2xl font-semibold">{value}</p>
    </div>
  );
}

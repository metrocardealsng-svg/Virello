import { db } from "@/lib/db";
import { PLANS, type PlanId } from "@/lib/billing/plans";

export function getUsage(userId: string): { postsUsed: number; periodStart: string } {
  const row = db
    .prepare(`SELECT * FROM usage_counters WHERE user_id = ?`)
    .get(userId) as { posts_used: number; period_start: string } | undefined;

  if (!row) {
    db.prepare(
      `INSERT INTO usage_counters (user_id, period_start, posts_used) VALUES (?, datetime('now'), 0)`
    ).run(userId);
    return { postsUsed: 0, periodStart: new Date().toISOString() };
  }

  const periodStart = new Date(row.period_start);
  const now = new Date();
  const daysSince = (now.getTime() - periodStart.getTime()) / (1000 * 60 * 60 * 24);

  if (daysSince > 30) {
    db.prepare(
      `UPDATE usage_counters SET period_start = datetime('now'), posts_used = 0 WHERE user_id = ?`
    ).run(userId);
    return { postsUsed: 0, periodStart: new Date().toISOString() };
  }

  return { postsUsed: row.posts_used, periodStart: row.period_start };
}

export function canCreatePost(userId: string, plan: PlanId): { allowed: boolean; reason?: string } {
  const limit = PLANS[plan].postsPerMonth;
  if (limit === "unlimited") return { allowed: true };

  const { postsUsed } = getUsage(userId);
  if (postsUsed >= limit) {
    return {
      allowed: false,
      reason: `You've used all ${limit} posts on the Free plan this month. Upgrade to Creator for unlimited posts.`,
    };
  }
  return { allowed: true };
}

export function incrementUsage(userId: string) {
  getUsage(userId);
  db.prepare(`UPDATE usage_counters SET posts_used = posts_used + 1 WHERE user_id = ?`).run(userId);
}

export function canConnectAccount(
  userId: string,
  plan: PlanId
): { allowed: boolean; reason?: string } {
  const limit = PLANS[plan].connectedAccounts;
  if (limit === "unlimited") return { allowed: true };

  const count = db
    .prepare(`SELECT COUNT(*) as c FROM connected_accounts WHERE user_id = ? AND status = 'connected'`)
    .get(userId) as { c: number };

  if (count.c >= limit) {
    return {
      allowed: false,
      reason: `You've connected ${limit} accounts, the limit on your current plan. Upgrade to connect more.`,
    };
  }
  return { allowed: true };
}

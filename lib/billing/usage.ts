import { query, queryOne } from "@/lib/db";
import { PLANS, type PlanId } from "@/lib/billing/plans";

export async function getUsage(userId: string): Promise<{ postsUsed: number; periodStart: string }> {
  const row = await queryOne<{ posts_used: number; period_start: string }>(
    `SELECT * FROM usage_counters WHERE user_id = $1`,
    [userId]
  );

  if (!row) {
    await query(`INSERT INTO usage_counters (user_id, period_start, posts_used) VALUES ($1, now(), 0)`, [
      userId,
    ]);
    return { postsUsed: 0, periodStart: new Date().toISOString() };
  }

  const periodStart = new Date(row.period_start);
  const now = new Date();
  const daysSince = (now.getTime() - periodStart.getTime()) / (1000 * 60 * 60 * 24);

  if (daysSince > 30) {
    await query(`UPDATE usage_counters SET period_start = now(), posts_used = 0 WHERE user_id = $1`, [
      userId,
    ]);
    return { postsUsed: 0, periodStart: new Date().toISOString() };
  }

  return { postsUsed: row.posts_used, periodStart: row.period_start };
}

export async function canCreatePost(
  userId: string,
  plan: PlanId
): Promise<{ allowed: boolean; reason?: string }> {
  const limit = PLANS[plan].postsPerMonth;
  if (limit === "unlimited") return { allowed: true };

  const { postsUsed } = await getUsage(userId);
  if (postsUsed >= limit) {
    return {
      allowed: false,
      reason: `You've used all ${limit} posts on the Free plan this month. Upgrade to Creator for unlimited posts.`,
    };
  }
  return { allowed: true };
}

export async function incrementUsage(userId: string) {
  await getUsage(userId);
  await query(`UPDATE usage_counters SET posts_used = posts_used + 1 WHERE user_id = $1`, [userId]);
}

export async function canConnectAccount(
  userId: string,
  plan: PlanId
): Promise<{ allowed: boolean; reason?: string }> {
  const limit = PLANS[plan].connectedAccounts;
  if (limit === "unlimited") return { allowed: true };

  const row = await queryOne<{ c: string }>(
    `SELECT COUNT(*) as c FROM connected_accounts WHERE user_id = $1 AND status = 'connected'`,
    [userId]
  );
  const count = row ? parseInt(row.c, 10) : 0;

  if (count >= limit) {
    return {
      allowed: false,
      reason: `You've connected ${limit} accounts, the limit on your current plan. Upgrade to connect more.`,
    };
  }
  return { allowed: true };
}

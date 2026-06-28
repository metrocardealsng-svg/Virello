import { getCurrentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { PLANS, formatNaira } from "@/lib/billing/plans";
import type { PlanId } from "@/lib/billing/plans";
import { UpgradeFlow } from "@/components/dashboard/upgrade-flow";

export const metadata = { title: "Billing" };

export default async function BillingPage() {
  const user = await getCurrentUser();
  if (!user) return null;

  const plan = PLANS[user.plan as PlanId];
  const requests = db
    .prepare(`SELECT * FROM billing_requests WHERE user_id = ? ORDER BY created_at DESC`)
    .all(user.id) as {
    id: string;
    plan: string;
    billing_cycle: string;
    amount_kobo: number;
    status: string;
    created_at: string;
  }[];

  return (
    <div className="max-w-3xl">
      <h1 className="font-display text-2xl font-semibold">Billing</h1>
      <p className="mt-1 text-sm text-text-dim">
        You're on the <span className="text-text">{plan.name}</span> plan.
      </p>

      {user.plan === "free" ? (
        <div className="mt-8">
          <UpgradeFlow currentPlan={user.plan as PlanId} />
        </div>
      ) : (
        <div className="mt-8 rounded-xl border border-border bg-ink-card p-5">
          <p className="font-display font-medium">{plan.name} plan active</p>
          <p className="mt-1 text-sm text-text-dim">
            Renews {user.planRenewsAt ? new Date(user.planRenewsAt).toLocaleDateString() : "automatically"}.
          </p>
        </div>
      )}

      {requests.length > 0 && (
        <div className="mt-10">
          <h2 className="font-display text-lg font-medium">Payment history</h2>
          <div className="mt-3 divide-y divide-border rounded-xl border border-border">
            {requests.map((r) => (
              <div key={r.id} className="flex items-center justify-between p-4 text-sm">
                <div>
                  <p className="text-text">
                    {PLANS[r.plan as PlanId]?.name} — {r.billing_cycle}
                  </p>
                  <p className="text-xs text-text-dim">{new Date(r.created_at).toLocaleString()}</p>
                </div>
                <div className="text-right">
                  <p className="font-mono text-text">{formatNaira(r.amount_kobo)}</p>
                  <span
                    className={`text-xs ${
                      r.status === "approved"
                        ? "text-emerald"
                        : r.status === "rejected"
                          ? "text-rose"
                          : "text-amber"
                    }`}
                  >
                    {r.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

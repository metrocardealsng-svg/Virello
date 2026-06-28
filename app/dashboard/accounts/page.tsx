import { getCurrentUser } from "@/lib/auth";
import { query } from "@/lib/db";
import { AccountsManager } from "@/components/dashboard/accounts-manager";
import type { Platform } from "@/lib/platforms";

export const metadata = { title: "Connected accounts" };

export default async function AccountsPage() {
  const user = await getCurrentUser();
  if (!user) return null;

  const accounts = await query<{ id: string; platform: Platform; handle: string }>(
    `SELECT id, platform, handle FROM connected_accounts WHERE user_id = $1 AND status = 'connected'`,
    [user.id]
  );

  return (
    <div className="max-w-4xl">
      <h1 className="font-display text-2xl font-semibold">Connected accounts</h1>
      <p className="mt-1 text-sm text-text-dim">
        Link the accounts you want to publish to.
      </p>
      <div className="mt-8">
        <AccountsManager initialAccounts={accounts} />
      </div>
    </div>
  );
}

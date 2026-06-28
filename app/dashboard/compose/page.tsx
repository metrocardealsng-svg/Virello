import { getCurrentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { ComposeBox } from "@/components/dashboard/compose-box";
import type { Platform } from "@/lib/platforms";

export const metadata = { title: "Compose" };

export default async function ComposePage() {
  const user = await getCurrentUser();
  if (!user) return null;

  const accounts = db
    .prepare(`SELECT id, platform, handle FROM connected_accounts WHERE user_id = ? AND status = 'connected'`)
    .all(user.id) as { id: string; platform: Platform; handle: string }[];

  return (
    <div className="max-w-5xl">
      <h1 className="font-display text-2xl font-semibold">Compose</h1>
      <p className="mt-1 text-sm text-text-dim">
        Write once. We'll adapt it for every platform you select.
      </p>
      <div className="mt-8">
        <ComposeBox connectedAccounts={accounts} />
      </div>
    </div>
  );
}

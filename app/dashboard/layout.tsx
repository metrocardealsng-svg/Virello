import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { getAdminUser } from "@/lib/auth/admin";
import { DashboardSidebar } from "@/components/dashboard/sidebar";
import { PLANS } from "@/lib/billing/plans";
import type { PlanId } from "@/lib/billing/plans";

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const user = await getCurrentUser();
  if (!user) redirect("/login");

  const planLabel = PLANS[user.plan as PlanId]?.name ?? "Free";
  const admin = await getAdminUser();

  return (
    <div className="flex min-h-screen">
      <DashboardSidebar planLabel={planLabel} isAdmin={Boolean(admin)} />
      <main className="flex-1 overflow-y-auto bg-ink px-8 py-8">{children}</main>
    </div>
  );
}

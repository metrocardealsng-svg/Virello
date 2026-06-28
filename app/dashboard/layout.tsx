import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { DashboardSidebar } from "@/components/dashboard/sidebar";
import { PLANS } from "@/lib/billing/plans";
import type { PlanId } from "@/lib/billing/plans";

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const user = await getCurrentUser();
  if (!user) redirect("/login");

  const planLabel = PLANS[user.plan as PlanId]?.name ?? "Free";

  return (
    <div className="flex min-h-screen">
      <DashboardSidebar planLabel={planLabel} />
      <main className="flex-1 overflow-y-auto bg-ink px-8 py-8">{children}</main>
    </div>
  );
}

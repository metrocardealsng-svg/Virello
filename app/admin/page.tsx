import { redirect } from "next/navigation";
import { getAdminUser } from "@/lib/auth/admin";
import { query } from "@/lib/db";
import { AdminBillingReview } from "@/components/dashboard/admin-billing-review";

export const metadata = { title: "Admin · Billing review" };

interface BillingRequestRow {
  id: string;
  user_id: string;
  email: string;
  name: string;
  plan: string;
  billing_cycle: string;
  amount_kobo: number;
  method: string;
  status: string;
  created_at: string;
}

export default async function AdminPage() {
  const admin = await getAdminUser();
  if (!admin) redirect("/dashboard");

  const requests = await query<BillingRequestRow>(
    `SELECT br.*, u.email, u.name
     FROM billing_requests br
     JOIN users u ON u.id = br.user_id
     ORDER BY
       CASE br.status WHEN 'pending' THEN 0 ELSE 1 END,
       br.created_at DESC`
  );

  return (
    <div className="min-h-screen bg-ink px-6 py-10 text-text">
      <div className="mx-auto max-w-3xl">
        <h1 className="font-display text-2xl font-semibold">Billing review</h1>
        <p className="mt-1 text-sm text-text-dim">
          Check your Moniepoint/GTBank account for the matching transfer before approving.
        </p>
        <div className="mt-8">
          <AdminBillingReview initialRequests={requests} />
        </div>
      </div>
    </div>
  );
}

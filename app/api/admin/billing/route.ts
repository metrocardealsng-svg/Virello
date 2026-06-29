import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { getAdminUser } from "@/lib/auth/admin";
import { query, queryOne } from "@/lib/db";

const actionSchema = z.object({
  requestId: z.string(),
  action: z.enum(["approve", "reject"]),
});

export async function GET() {
  const admin = await getAdminUser();
  if (!admin) return NextResponse.json({ error: "Not authorized" }, { status: 403 });

  const requests = await query(
    `SELECT br.*, u.email, u.name
     FROM billing_requests br
     JOIN users u ON u.id = br.user_id
     ORDER BY
       CASE br.status WHEN 'pending' THEN 0 ELSE 1 END,
       br.created_at DESC`
  );

  return NextResponse.json({ requests });
}

export async function POST(req: NextRequest) {
  const admin = await getAdminUser();
  if (!admin) return NextResponse.json({ error: "Not authorized" }, { status: 403 });

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Bad request body" }, { status: 400 });
  }

  const parsed = actionSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const { requestId, action } = parsed.data;

  const billingRequest = await queryOne<{
    id: string;
    user_id: string;
    plan: string;
    billing_cycle: string;
    status: string;
  }>(`SELECT * FROM billing_requests WHERE id = $1`, [requestId]);

  if (!billingRequest) {
    return NextResponse.json({ error: "Request not found" }, { status: 404 });
  }
  if (billingRequest.status !== "pending") {
    return NextResponse.json({ error: "This request was already reviewed" }, { status: 409 });
  }

  if (action === "approve") {
    const renewsAt = new Date();
    if (billingRequest.billing_cycle === "annual") {
      renewsAt.setFullYear(renewsAt.getFullYear() + 1);
    } else {
      renewsAt.setMonth(renewsAt.getMonth() + 1);
    }

    await query(`UPDATE users SET plan = $1, plan_renews_at = $2 WHERE id = $3`, [
      billingRequest.plan,
      renewsAt.toISOString(),
      billingRequest.user_id,
    ]);
    await query(
      `UPDATE billing_requests SET status = 'approved', reviewed_at = now() WHERE id = $1`,
      [requestId]
    );
  } else {
    await query(
      `UPDATE billing_requests SET status = 'rejected', reviewed_at = now() WHERE id = $1`,
      [requestId]
    );
  }

  return NextResponse.json({ ok: true });
}

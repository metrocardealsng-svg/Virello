import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { nanoid } from "nanoid";
import { getCurrentUser } from "@/lib/auth";
import { query } from "@/lib/db";
import { PLANS, type PlanId, type BillingCycle } from "@/lib/billing/plans";

const billingSchema = z.object({
  plan: z.enum(["creator", "agency"]),
  cycle: z.enum(["monthly", "annual"]),
  method: z.enum(["moniepoint", "gtbank"]),
  referenceNote: z.string().max(200).optional(),
});

export async function POST(req: NextRequest) {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: "Not signed in" }, { status: 401 });

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Bad request body" }, { status: 400 });
  }

  const parsed = billingSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const plan = PLANS[parsed.data.plan as PlanId];
  const cycle = parsed.data.cycle as BillingCycle;
  const amount = cycle === "annual" ? plan.annualPriceKobo : plan.monthlyPriceKobo;

  const id = nanoid();
  await query(
    `INSERT INTO billing_requests (id, user_id, plan, billing_cycle, amount_kobo, method, reference_note, status)
     VALUES ($1, $2, $3, $4, $5, $6, $7, 'pending')`,
    [id, user.id, plan.id, cycle, amount, parsed.data.method, parsed.data.referenceNote ?? null]
  );

  return NextResponse.json({ ok: true, requestId: id });
}

export async function GET() {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: "Not signed in" }, { status: 401 });

  const requests = await query(`SELECT * FROM billing_requests WHERE user_id = $1 ORDER BY created_at DESC`, [
    user.id,
  ]);

  return NextResponse.json({ requests });
}

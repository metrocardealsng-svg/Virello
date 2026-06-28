import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { nanoid } from "nanoid";
import { getCurrentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { canConnectAccount } from "@/lib/billing/usage";
import type { PlanId } from "@/lib/billing/plans";
import { PLATFORMS } from "@/lib/platforms";

const connectSchema = z.object({
  platform: z.string(),
  handle: z.string().min(1).max(60),
});

export async function GET() {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: "Not signed in" }, { status: 401 });

  const accounts = db
    .prepare(`SELECT * FROM connected_accounts WHERE user_id = ? ORDER BY connected_at DESC`)
    .all(user.id);

  return NextResponse.json({ accounts });
}

export async function POST(req: NextRequest) {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: "Not signed in" }, { status: 401 });

  const gate = canConnectAccount(user.id, user.plan as PlanId);
  if (!gate.allowed) {
    return NextResponse.json({ error: gate.reason }, { status: 402 });
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Bad request body" }, { status: 400 });
  }

  const parsed = connectSchema.safeParse(body);
  if (!parsed.success || !(parsed.data.platform in PLATFORMS)) {
    return NextResponse.json({ error: "Invalid platform" }, { status: 400 });
  }

  const id = nanoid();
  const handle = parsed.data.handle.replace(/^@/, "");
  db.prepare(
    `INSERT INTO connected_accounts (id, user_id, platform, handle, display_name, avatar_seed) VALUES (?, ?, ?, ?, ?, ?)`
  ).run(id, user.id, parsed.data.platform, `@${handle}`, handle, nanoid(8));

  return NextResponse.json({ ok: true, id });
}

export async function DELETE(req: NextRequest) {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: "Not signed in" }, { status: 401 });

  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  if (!id) return NextResponse.json({ error: "Missing id" }, { status: 400 });

  db.prepare(`DELETE FROM connected_accounts WHERE id = ? AND user_id = ?`).run(id, user.id);
  return NextResponse.json({ ok: true });
}

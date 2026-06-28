import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { createSession, findUserByEmail, verifyPassword } from "@/lib/auth";

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

export async function POST(req: NextRequest) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Bad request body" }, { status: 400 });
  }

  const parsed = loginSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Enter a valid email and password" }, { status: 400 });
  }

  const { email, password } = parsed.data;
  const user = findUserByEmail(email);

  if (!user || !user.password_hash) {
    return NextResponse.json({ error: "No account found with that email" }, { status: 401 });
  }

  const valid = await verifyPassword(password, user.password_hash);
  if (!valid) {
    return NextResponse.json({ error: "Wrong password" }, { status: 401 });
  }

  await createSession(user.id);
  return NextResponse.json({ ok: true });
}

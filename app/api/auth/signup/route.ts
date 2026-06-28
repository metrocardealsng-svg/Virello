import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { createUser, createSession, findUserByEmail, hashPassword } from "@/lib/auth";

const signupSchema = z.object({
  name: z.string().min(2, "Name needs at least 2 characters").max(80),
  email: z.string().email("That email doesn't look right"),
  password: z.string().min(8, "Password needs at least 8 characters"),
});

export async function POST(req: NextRequest) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Bad request body" }, { status: 400 });
  }

  const parsed = signupSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message ?? "Invalid input" },
      { status: 400 }
    );
  }

  const { name, email, password } = parsed.data;

  if (await findUserByEmail(email)) {
    return NextResponse.json(
      { error: "An account with this email already exists. Try signing in instead." },
      { status: 409 }
    );
  }

  const passwordHash = await hashPassword(password);
  const userId = await createUser(email, name, passwordHash);
  await createSession(userId);

  return NextResponse.json({ ok: true });
}

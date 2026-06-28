import bcrypt from "bcryptjs";
import { nanoid } from "nanoid";
import { cookies } from "next/headers";
import { query, queryOne } from "@/lib/db";

const SESSION_COOKIE = "virello_session";
const SESSION_DAYS = 30;

export interface SessionUser {
  id: string;
  email: string;
  name: string;
  plan: string;
  planRenewsAt: string | null;
  avatarSeed: string;
}

interface UserRow {
  id: string;
  email: string;
  name: string;
  password_hash: string | null;
  plan: string;
  plan_renews_at: string | null;
  avatar_seed: string;
}

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 12);
}

export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

export async function createUser(
  email: string,
  name: string,
  passwordHash: string | null,
  provider = "email"
): Promise<string> {
  const id = nanoid();
  const avatarSeed = nanoid(8);
  await query(
    `INSERT INTO users (id, email, name, password_hash, auth_provider, avatar_seed) VALUES ($1, $2, $3, $4, $5, $6)`,
    [id, email.toLowerCase().trim(), name, passwordHash, provider, avatarSeed]
  );
  await query(`INSERT INTO usage_counters (user_id, period_start, posts_used) VALUES ($1, now(), 0)`, [
    id,
  ]);
  return id;
}

export async function findUserByEmail(email: string): Promise<UserRow | undefined> {
  return queryOne<UserRow>(`SELECT * FROM users WHERE email = $1`, [email.toLowerCase().trim()]);
}

export async function findUserById(id: string): Promise<UserRow | undefined> {
  return queryOne<UserRow>(`SELECT * FROM users WHERE id = $1`, [id]);
}

export async function createSession(userId: string) {
  const sessionId = nanoid(32);
  const expiresAt = new Date(Date.now() + SESSION_DAYS * 24 * 60 * 60 * 1000);
  await query(`INSERT INTO sessions (id, user_id, expires_at) VALUES ($1, $2, $3)`, [
    sessionId,
    userId,
    expiresAt.toISOString(),
  ]);
  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE, sessionId, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    expires: expiresAt,
    path: "/",
  });
}

export async function destroySession() {
  const cookieStore = await cookies();
  const sessionId = cookieStore.get(SESSION_COOKIE)?.value;
  if (sessionId) {
    await query(`DELETE FROM sessions WHERE id = $1`, [sessionId]);
  }
  cookieStore.delete(SESSION_COOKIE);
}

export async function getCurrentUser(): Promise<SessionUser | null> {
  const cookieStore = await cookies();
  const sessionId = cookieStore.get(SESSION_COOKIE)?.value;
  if (!sessionId) return null;

  const session = await queryOne<{ user_id: string }>(
    `SELECT * FROM sessions WHERE id = $1 AND expires_at > now()`,
    [sessionId]
  );
  if (!session) return null;

  const user = await findUserById(session.user_id);
  if (!user) return null;

  return {
    id: user.id,
    email: user.email,
    name: user.name,
    plan: user.plan,
    planRenewsAt: user.plan_renews_at,
    avatarSeed: user.avatar_seed,
  };
}

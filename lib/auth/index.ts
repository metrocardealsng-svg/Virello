import bcrypt from "bcryptjs";
import { nanoid } from "nanoid";
import { cookies } from "next/headers";
import { db } from "@/lib/db";

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

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 12);
}

export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

export function createUser(email: string, name: string, passwordHash: string | null, provider = "email") {
  const id = nanoid();
  const avatarSeed = nanoid(8);
  db.prepare(
    `INSERT INTO users (id, email, name, password_hash, auth_provider, avatar_seed) VALUES (?, ?, ?, ?, ?, ?)`
  ).run(id, email.toLowerCase().trim(), name, passwordHash, provider, avatarSeed);
  db.prepare(
    `INSERT INTO usage_counters (user_id, period_start, posts_used) VALUES (?, datetime('now'), 0)`
  ).run(id);
  return id;
}

export function findUserByEmail(email: string) {
  return db
    .prepare(`SELECT * FROM users WHERE email = ?`)
    .get(email.toLowerCase().trim()) as
    | {
        id: string;
        email: string;
        name: string;
        password_hash: string | null;
        plan: string;
        plan_renews_at: string | null;
        avatar_seed: string;
      }
    | undefined;
}

export function findUserById(id: string) {
  return db.prepare(`SELECT * FROM users WHERE id = ?`).get(id) as
    | {
        id: string;
        email: string;
        name: string;
        plan: string;
        plan_renews_at: string | null;
        avatar_seed: string;
      }
    | undefined;
}

export async function createSession(userId: string) {
  const sessionId = nanoid(32);
  const expiresAt = new Date(Date.now() + SESSION_DAYS * 24 * 60 * 60 * 1000).toISOString();
  db.prepare(`INSERT INTO sessions (id, user_id, expires_at) VALUES (?, ?, ?)`).run(
    sessionId,
    userId,
    expiresAt
  );
  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE, sessionId, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    expires: new Date(expiresAt),
    path: "/",
  });
}

export async function destroySession() {
  const cookieStore = await cookies();
  const sessionId = cookieStore.get(SESSION_COOKIE)?.value;
  if (sessionId) {
    db.prepare(`DELETE FROM sessions WHERE id = ?`).run(sessionId);
  }
  cookieStore.delete(SESSION_COOKIE);
}

export async function getCurrentUser(): Promise<SessionUser | null> {
  const cookieStore = await cookies();
  const sessionId = cookieStore.get(SESSION_COOKIE)?.value;
  if (!sessionId) return null;

  const session = db
    .prepare(`SELECT * FROM sessions WHERE id = ? AND expires_at > datetime('now')`)
    .get(sessionId) as { user_id: string } | undefined;
  if (!session) return null;

  const user = findUserById(session.user_id);
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

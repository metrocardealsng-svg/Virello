import { Pool } from "pg";

declare global {
  // eslint-disable-next-line no-var
  var __virelloPool: Pool | undefined;
}

function createPool(): Pool {
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) {
    throw new Error(
      "DATABASE_URL is not set. Add your Supabase connection string as an environment variable."
    );
  }

  // The pg library expects a well-formed connection URI, but passwords containing
  // reserved URL characters (@, :, /, ?, #, etc.) break naive parsing if not
  // percent-encoded. Rather than requiring the password to be pre-encoded wherever
  // it's configured (easy to get wrong by hand), we parse the pieces out manually
  // and percent-encode just the password before handing the URI to pg.
  const match = connectionString.match(
    /^postgresql:\/\/([^:]+):(.+)@([^@/]+):(\d+)\/([^?]+)(\?.*)?$/
  );

  let config: { connectionString: string };
  if (match) {
    const [, user, password, host, port, database, query] = match;
    const safeUri = `postgresql://${encodeURIComponent(user)}:${encodeURIComponent(
      password
    )}@${host}:${port}/${database}${query ?? ""}`;
    config = { connectionString: safeUri };
  } else {
    // Already well-formed (or some other format), pass through as-is.
    config = { connectionString };
  }

  return new Pool({
    ...config,
    ssl: { rejectUnauthorized: false },
    max: 5,
  });
}

function getPool(): Pool {
  if (globalThis.__virelloPool) return globalThis.__virelloPool;
  const pool = createPool();
  globalThis.__virelloPool = pool;
  return pool;
}

let migrated = false;

export async function migrate() {
  if (migrated) return;
  const pool = getPool();
  await pool.query(`
    CREATE TABLE IF NOT EXISTS users (
      id TEXT PRIMARY KEY,
      email TEXT UNIQUE NOT NULL,
      name TEXT NOT NULL,
      password_hash TEXT,
      auth_provider TEXT NOT NULL DEFAULT 'email',
      plan TEXT NOT NULL DEFAULT 'free',
      plan_renews_at TIMESTAMPTZ,
      created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
      avatar_seed TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS sessions (
      id TEXT PRIMARY KEY,
      user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
      expires_at TIMESTAMPTZ NOT NULL
    );

    CREATE TABLE IF NOT EXISTS connected_accounts (
      id TEXT PRIMARY KEY,
      user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      platform TEXT NOT NULL,
      handle TEXT NOT NULL,
      display_name TEXT NOT NULL,
      avatar_seed TEXT NOT NULL,
      connected_at TIMESTAMPTZ NOT NULL DEFAULT now(),
      status TEXT NOT NULL DEFAULT 'connected'
    );

    CREATE TABLE IF NOT EXISTS posts (
      id TEXT PRIMARY KEY,
      user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      body TEXT NOT NULL,
      media_url TEXT,
      media_type TEXT,
      status TEXT NOT NULL DEFAULT 'draft',
      scheduled_at TIMESTAMPTZ,
      created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
      published_at TIMESTAMPTZ,
      share_id TEXT UNIQUE,
      share_views INTEGER NOT NULL DEFAULT 0
    );

    CREATE TABLE IF NOT EXISTS post_targets (
      id TEXT PRIMARY KEY,
      post_id TEXT NOT NULL REFERENCES posts(id) ON DELETE CASCADE,
      platform TEXT NOT NULL,
      adapted_body TEXT NOT NULL,
      status TEXT NOT NULL DEFAULT 'pending',
      published_url TEXT,
      error_message TEXT,
      published_at TIMESTAMPTZ
    );

    CREATE TABLE IF NOT EXISTS billing_requests (
      id TEXT PRIMARY KEY,
      user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      plan TEXT NOT NULL,
      billing_cycle TEXT NOT NULL,
      amount_kobo INTEGER NOT NULL,
      method TEXT NOT NULL,
      reference_note TEXT,
      status TEXT NOT NULL DEFAULT 'pending',
      created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
      reviewed_at TIMESTAMPTZ
    );

    CREATE TABLE IF NOT EXISTS usage_counters (
      user_id TEXT PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
      period_start TIMESTAMPTZ NOT NULL DEFAULT now(),
      posts_used INTEGER NOT NULL DEFAULT 0
    );

    CREATE INDEX IF NOT EXISTS idx_posts_user ON posts(user_id);
    CREATE INDEX IF NOT EXISTS idx_post_targets_post ON post_targets(post_id);
    CREATE INDEX IF NOT EXISTS idx_connected_accounts_user ON connected_accounts(user_id);
    CREATE INDEX IF NOT EXISTS idx_sessions_user ON sessions(user_id);
  `);
  migrated = true;
}

/** Run a query, ensuring migrations have applied first. */
export async function query<T = Record<string, unknown>>(
  text: string,
  params: unknown[] = []
): Promise<T[]> {
  await migrate();
  const pool = getPool();
  const result = await pool.query(text, params);
  return result.rows as T[];
}

/** Run a query and return only the first row, or undefined. */
export async function queryOne<T = Record<string, unknown>>(
  text: string,
  params: unknown[] = []
): Promise<T | undefined> {
  const rows = await query<T>(text, params);
  return rows[0];
}

import { DatabaseSync } from "node:sqlite";
import path from "node:path";
import fs from "node:fs";

const DATA_DIR = path.join(process.cwd(), "data");
if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });

const DB_PATH = path.join(DATA_DIR, "virello.db");

declare global {
  // eslint-disable-next-line no-var
  var __virelloDb: DatabaseSync | undefined;
}

function createConnection(): DatabaseSync {
  const db = new DatabaseSync(DB_PATH);
  db.exec("PRAGMA journal_mode = WAL;");
  db.exec("PRAGMA foreign_keys = ON;");
  return db;
}

export const db: DatabaseSync = globalThis.__virelloDb ?? createConnection();
if (process.env.NODE_ENV !== "production") globalThis.__virelloDb = db;

export function migrate() {
  db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id TEXT PRIMARY KEY,
      email TEXT UNIQUE NOT NULL,
      name TEXT NOT NULL,
      password_hash TEXT,
      auth_provider TEXT NOT NULL DEFAULT 'email',
      plan TEXT NOT NULL DEFAULT 'free',
      plan_renews_at TEXT,
      created_at TEXT NOT NULL DEFAULT (datetime('now')),
      avatar_seed TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS sessions (
      id TEXT PRIMARY KEY,
      user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      created_at TEXT NOT NULL DEFAULT (datetime('now')),
      expires_at TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS connected_accounts (
      id TEXT PRIMARY KEY,
      user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      platform TEXT NOT NULL,
      handle TEXT NOT NULL,
      display_name TEXT NOT NULL,
      avatar_seed TEXT NOT NULL,
      connected_at TEXT NOT NULL DEFAULT (datetime('now')),
      status TEXT NOT NULL DEFAULT 'connected'
    );

    CREATE TABLE IF NOT EXISTS posts (
      id TEXT PRIMARY KEY,
      user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      body TEXT NOT NULL,
      media_url TEXT,
      media_type TEXT,
      status TEXT NOT NULL DEFAULT 'draft',
      scheduled_at TEXT,
      created_at TEXT NOT NULL DEFAULT (datetime('now')),
      published_at TEXT,
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
      published_at TEXT
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
      created_at TEXT NOT NULL DEFAULT (datetime('now')),
      reviewed_at TEXT
    );

    CREATE TABLE IF NOT EXISTS usage_counters (
      user_id TEXT PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
      period_start TEXT NOT NULL,
      posts_used INTEGER NOT NULL DEFAULT 0
    );

    CREATE INDEX IF NOT EXISTS idx_posts_user ON posts(user_id);
    CREATE INDEX IF NOT EXISTS idx_post_targets_post ON post_targets(post_id);
    CREATE INDEX IF NOT EXISTS idx_connected_accounts_user ON connected_accounts(user_id);
    CREATE INDEX IF NOT EXISTS idx_sessions_user ON sessions(user_id);
  `);
}

migrate();

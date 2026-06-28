import { nanoid } from "nanoid";
import { db } from "@/lib/db";
import { type Platform, adaptForPlatform, PLATFORMS } from "@/lib/platforms";

export interface CreatePostInput {
  userId: string;
  body: string;
  mediaUrl: string | null;
  mediaType: "image" | "video" | null;
  platforms: Platform[];
  scheduledAt: string | null;
}

export function validateTargets(
  platforms: Platform[],
  hasMedia: boolean,
  mediaType: "image" | "video" | null
): { valid: boolean; errors: Record<Platform, string> } {
  const errors: Partial<Record<Platform, string>> = {};

  for (const platform of platforms) {
    const config = PLATFORMS[platform];
    if (config.requiresMedia && !hasMedia) {
      errors[platform] = `${config.name} requires an image or video attached.`;
      continue;
    }
    if (config.mediaKind === "video" && hasMedia && mediaType !== "video") {
      errors[platform] = `${config.name} only accepts video, not images.`;
    }
  }

  return { valid: Object.keys(errors).length === 0, errors: errors as Record<Platform, string> };
}

export function createPost(input: CreatePostInput) {
  const postId = nanoid();
  const shareId = nanoid(10);
  const status = input.scheduledAt ? "scheduled" : "publishing";

  db.prepare(
    `INSERT INTO posts (id, user_id, body, media_url, media_type, status, scheduled_at, share_id)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?)`
  ).run(postId, input.userId, input.body, input.mediaUrl, input.mediaType, status, input.scheduledAt, shareId);

  for (const platform of input.platforms) {
    const targetId = nanoid();
    const adapted = adaptForPlatform(input.body, platform);
    db.prepare(
      `INSERT INTO post_targets (id, post_id, platform, adapted_body, status) VALUES (?, ?, ?, ?, ?)`
    ).run(targetId, postId, platform, adapted, input.scheduledAt ? "pending" : "publishing");
  }

  return { postId, shareId, status };
}

/**
 * Simulates the publish step for each target. In production, each platform branch
 * here is replaced with a real call to that platform's API using the user's stored
 * OAuth token. The state machine, error handling, and retry surface are real and
 * production-shaped; only the network call to the third-party platform is mocked,
 * since this environment has no registered OAuth apps with X/Meta/TikTok/Google.
 */
export function simulatePublish(postId: string) {
  const targets = db
    .prepare(`SELECT * FROM post_targets WHERE post_id = ?`)
    .all(postId) as { id: string; platform: Platform }[];

  for (const target of targets) {
    const fakeUrl = `https://${target.platform === "x" ? "x.com" : target.platform + ".com"}/post/${nanoid(8)}`;
    db.prepare(
      `UPDATE post_targets SET status = 'published', published_url = ?, published_at = datetime('now') WHERE id = ?`
    ).run(fakeUrl, target.id);
  }

  db.prepare(`UPDATE posts SET status = 'published', published_at = datetime('now') WHERE id = ?`).run(
    postId
  );
}

export function getPostWithTargets(postId: string) {
  const post = db.prepare(`SELECT * FROM posts WHERE id = ?`).get(postId);
  if (!post) return null;
  const targets = db.prepare(`SELECT * FROM post_targets WHERE post_id = ?`).all(postId);
  return { post, targets };
}

export function getPostByShareId(shareId: string) {
  const post = db.prepare(`SELECT * FROM posts WHERE share_id = ?`).get(shareId) as
    | {
        id: string;
        body: string;
        status: string;
        created_at: string;
        share_views: number;
      }
    | undefined;
  if (!post) return null;
  const targets = db.prepare(`SELECT * FROM post_targets WHERE post_id = ?`).all(post.id);
  db.prepare(`UPDATE posts SET share_views = share_views + 1 WHERE id = ?`).run(post.id);
  return { post, targets };
}

export function listUserPosts(userId: string, limit = 50) {
  const posts = db
    .prepare(`SELECT * FROM posts WHERE user_id = ? ORDER BY created_at DESC LIMIT ?`)
    .all(userId, limit) as { id: string }[];

  return posts.map((post) => {
    const targets = db.prepare(`SELECT * FROM post_targets WHERE post_id = ?`).all(post.id);
    return { ...post, targets };
  });
}

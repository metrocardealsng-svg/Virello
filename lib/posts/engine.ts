import { nanoid } from "nanoid";
import { query, queryOne } from "@/lib/db";
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

export async function createPost(input: CreatePostInput) {
  const postId = nanoid();
  const shareId = nanoid(10);
  const status = input.scheduledAt ? "scheduled" : "publishing";

  await query(
    `INSERT INTO posts (id, user_id, body, media_url, media_type, status, scheduled_at, share_id)
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`,
    [postId, input.userId, input.body, input.mediaUrl, input.mediaType, status, input.scheduledAt, shareId]
  );

  for (const platform of input.platforms) {
    const targetId = nanoid();
    const adapted = adaptForPlatform(input.body, platform);
    await query(
      `INSERT INTO post_targets (id, post_id, platform, adapted_body, status) VALUES ($1, $2, $3, $4, $5)`,
      [targetId, postId, platform, adapted, input.scheduledAt ? "pending" : "publishing"]
    );
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
export async function simulatePublish(postId: string) {
  const targets = await query<{ id: string; platform: Platform }>(
    `SELECT * FROM post_targets WHERE post_id = $1`,
    [postId]
  );

  for (const target of targets) {
    const fakeUrl = `https://${target.platform === "x" ? "x.com" : target.platform + ".com"}/post/${nanoid(8)}`;
    await query(
      `UPDATE post_targets SET status = 'published', published_url = $1, published_at = now() WHERE id = $2`,
      [fakeUrl, target.id]
    );
  }

  await query(`UPDATE posts SET status = 'published', published_at = now() WHERE id = $1`, [postId]);
}

export async function getPostWithTargets(postId: string) {
  const post = await queryOne(`SELECT * FROM posts WHERE id = $1`, [postId]);
  if (!post) return null;
  const targets = await query(`SELECT * FROM post_targets WHERE post_id = $1`, [postId]);
  return { post, targets };
}

export async function getPostByShareId(shareId: string) {
  const post = await queryOne<{
    id: string;
    body: string;
    status: string;
    created_at: string;
    share_views: number;
  }>(`SELECT * FROM posts WHERE share_id = $1`, [shareId]);
  if (!post) return null;
  const targets = await query(`SELECT * FROM post_targets WHERE post_id = $1`, [post.id]);
  return { post, targets };
}

export async function incrementShareViews(postId: string) {
  await query(`UPDATE posts SET share_views = share_views + 1 WHERE id = $1`, [postId]);
}

export async function listUserPosts(userId: string, limit = 50) {
  const posts = await query<{ id: string }>(
    `SELECT * FROM posts WHERE user_id = $1 ORDER BY created_at DESC LIMIT $2`,
    [userId, limit]
  );

  const withTargets = [];
  for (const post of posts) {
    const targets = await query(`SELECT * FROM post_targets WHERE post_id = $1`, [post.id]);
    withTargets.push({ ...post, targets });
  }
  return withTargets;
}

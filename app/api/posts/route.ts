import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { getCurrentUser } from "@/lib/auth";
import { createPost, listUserPosts, simulatePublish, validateTargets } from "@/lib/posts/engine";
import { canCreatePost, incrementUsage } from "@/lib/billing/usage";
import type { PlanId } from "@/lib/billing/plans";
import type { Platform } from "@/lib/platforms";

const createPostSchema = z.object({
  body: z.string().min(1, "Write something first").max(10000),
  mediaUrl: z.string().nullable().optional(),
  mediaType: z.enum(["image", "video"]).nullable().optional(),
  platforms: z.array(z.string()).min(1, "Pick at least one platform"),
  scheduledAt: z.string().nullable().optional(),
});

export async function GET() {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: "Not signed in" }, { status: 401 });

  const posts = await listUserPosts(user.id);
  return NextResponse.json({ posts });
}

export async function POST(req: NextRequest) {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: "Not signed in" }, { status: 401 });

  const gate = await canCreatePost(user.id, user.plan as PlanId);
  if (!gate.allowed) {
    return NextResponse.json({ error: gate.reason }, { status: 402 });
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Bad request body" }, { status: 400 });
  }

  const parsed = createPostSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message ?? "Invalid input" },
      { status: 400 }
    );
  }

  const platforms = parsed.data.platforms as Platform[];
  const hasMedia = Boolean(parsed.data.mediaUrl);
  const validation = validateTargets(platforms, hasMedia, parsed.data.mediaType ?? null);

  if (!validation.valid) {
    return NextResponse.json(
      { error: "Some platforms can't take this post", details: validation.errors },
      { status: 422 }
    );
  }

  const { postId, shareId, status } = await createPost({
    userId: user.id,
    body: parsed.data.body,
    mediaUrl: parsed.data.mediaUrl ?? null,
    mediaType: parsed.data.mediaType ?? null,
    platforms,
    scheduledAt: parsed.data.scheduledAt ?? null,
  });

  await incrementUsage(user.id);

  if (status === "publishing") {
    await simulatePublish(postId);
  }

  return NextResponse.json({ postId, shareId, status: status === "publishing" ? "published" : status });
}
